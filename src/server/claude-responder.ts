import { spawn } from 'child_process';
import { getComments, addComment } from './reviews';
import { emitRefresh } from './bus';

const CLAUDE_BIN = process.env.CLAUDE_CODE_EXECPATH ?? 'claude';

const SYSTEM_PROMPT = `You are Claude, a QA test design assistant embedded in
the Poppa test case review tool. You respond to @mentions in comment threads.

Reply format — always open with one of these tags:
[UPDATE] Short title
[DECISION] Short summary
[NOTE] Short observation or answer
[QUESTION] Clarifying question

Then body:
Purpose : why this action is needed
Actual  : current state or what was requested
Action  : specific next step

Rules: under 180 words. Never include @Claude in your response.
If request is vague, use [QUESTION].`;

function runClaude(userMessage: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      CLAUDE_BIN,
      [
        '--print',
        '--model', 'sonnet',
        '--system-prompt', SYSTEM_PROMPT,
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
      if (code !== 0) reject(new Error(`claude exited ${code ?? '?'}: ${err.slice(0, 300)}`));
      else resolve(out.trim());
    });
    proc.on('error', reject);
  });
}

export async function triggerClaudeResponse(
  storyId: string,
  tcId: string,
  trigger: { author: string; content: string },
): Promise<void> {
  const allComments = await getComments(storyId);
  const tcComments = allComments[tcId] ?? [];

  let tcContext = '';
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod = await import(`@/data/${storyId}/testcases`) as { TC_SECTIONS: any[] };
    for (const section of mod.TC_SECTIONS ?? []) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const row = (section.rows ?? []).find((r: any) => r.id === tcId);
      if (row) {
        tcContext = `TC ${row.id}: ${row.summary}\nType: ${row.type} | Priority: ${row.priority}`;
        break;
      }
    }
  } catch { /* data file not bundled for this story */ }

  const history = tcComments
    .map((c) => `[${c.author}]: ${c.content}`)
    .join('\n\n---\n\n');

  const userMessage = [
    `Story: ${storyId} | Test Case: ${tcId}`,
    tcContext ? `\n${tcContext}` : '',
    `\n--- Prior comments ---\n${history || '(none)'}`,
    `--- Mention triggering this response ---`,
    `[${trigger.author}]: ${trigger.content}`,
    `\nRespond as Claude.`,
  ].join('\n');

  const text = await runClaude(userMessage);
  if (!text) return;

  await addComment(storyId, tcId, 'Claude', text);
  emitRefresh(storyId);
}
