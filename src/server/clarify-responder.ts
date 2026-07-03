import { spawn } from 'child_process';
import { getClarifyComments, addClarifyComment } from './reviews';
import { emitRefresh } from './bus';

const CLAUDE_BIN = process.env.CLAUDE_CODE_EXECPATH ?? 'claude';

function makeSystemPrompt(persona: 'Claude' | 'GPT') {
  return `You are ${persona}, a QA test design assistant embedded in
the Poppa test case review tool. You respond to @mentions in requirement clarification threads.

Reply format — always open with one of these tags:
[UPDATE] Short title
[DECISION] Short summary
[NOTE] Short observation or answer
[QUESTION] Clarifying question

Then body:
Purpose : why this action is needed
Actual  : current state or what was requested
Action  : specific next step

Rules: under 180 words. Never include @${persona} in your response.
If request is vague, use [QUESTION].`;
}

function runModel(systemPrompt: string, userMessage: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      CLAUDE_BIN,
      [
        '--print',
        '--model', 'sonnet',
        '--system-prompt', systemPrompt,
        '--output-format', 'text',
        '--no-session-persistence',
        userMessage,
      ],
      { env: process.env },
    );
    let out = '';
    let err = '';
    proc.stdout.on('data', (d: Buffer) => { out += d.toString(); });
    proc.stderr.on('data', (d: Buffer) => { err += d.toString(); });
    proc.on('close', (code: number | null) => {
      if (code !== 0) reject(new Error(`exited ${code ?? '?'}: ${err.slice(0, 300)}`));
      else resolve(out.trim());
    });
    proc.on('error', reject);
  });
}

async function triggerResponse(
  persona: 'Claude' | 'GPT',
  storyId: string,
  clarifyId: string,
  trigger: { author: string; content: string },
): Promise<void> {
  const allComments = await getClarifyComments(storyId);
  const history = (allComments[clarifyId] ?? [])
    .map(c => `[${c.author}]: ${c.content}`)
    .join('\n\n---\n\n');

  const userMessage = [
    `Story: ${storyId} | Conflict/Clarification Item: ${clarifyId}`,
    `\n--- Prior comments ---\n${history || '(none)'}`,
    `--- Mention triggering this response ---`,
    `[${trigger.author}]: ${trigger.content}`,
    `\nRespond as ${persona}.`,
  ].join('\n');

  const text = await runModel(makeSystemPrompt(persona), userMessage);
  if (!text) return;

  await addClarifyComment(storyId, clarifyId, persona, text);
  emitRefresh(storyId);
}

export function triggerClarifyClaudeResponse(
  storyId: string, clarifyId: string, trigger: { author: string; content: string },
): Promise<void> {
  return triggerResponse('Claude', storyId, clarifyId, trigger);
}

export function triggerClarifyGptResponse(
  storyId: string, clarifyId: string, trigger: { author: string; content: string },
): Promise<void> {
  return triggerResponse('GPT', storyId, clarifyId, trigger);
}
