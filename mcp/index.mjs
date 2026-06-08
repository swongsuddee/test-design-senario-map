#!/usr/bin/env node
/**
 * Poppa MCP Server
 *
 * Exposes test-case review tools to Claude (or any MCP client).
 * Requires the Next.js app to be running at POPPA_URL (default http://localhost:3000).
 *
 * Register with Claude Code:
 *   claude mcp add poppa -- node /absolute/path/to/presentation/mcp/index.mjs
 */

import { McpServer }          from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const BASE = process.env.POPPA_URL ?? 'http://localhost:3000';

async function api(path, opts) {
  const res = await fetch(`${BASE}${path}`, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API ${path} → ${res.status}: ${text}`);
  }
  return res.json();
}

// ─── Server ───────────────────────────────────────────────────────────────────

const server = new McpServer({
  name:    'poppa-reviews',
  version: '1.0.0',
});

// ── list_stories ─────────────────────────────────────────────────────────────
server.tool(
  'list_stories',
  'List all available stories (Jira keys, slugs, titles). Use this first to find the storyId you need.',
  {},
  async () => {
    const stories = await api('/api/stories');
    const text = stories
      .map(s => `${s.id.padEnd(14)} ${s.title}  [slug: ${s.slug}]`)
      .join('\n');
    return { content: [{ type: 'text', text }] };
  },
);

// ── list_test_cases ───────────────────────────────────────────────────────────
server.tool(
  'list_test_cases',
  'List all test cases for a story. Returns TC id, summary, priority, and automation status.',
  { storyId: z.string().describe('Jira story key, e.g. "ORG-AUTH" or "PP-4"') },
  async ({ storyId }) => {
    const data = await api(`/api/testcases?storyId=${encodeURIComponent(storyId)}`);
    const lines = data.tcs.map(tc =>
      `${tc.id.padEnd(20)} [${tc.priority ?? '?'}] [${tc.auto ?? '?'}]  ${tc.summary}`
    );
    return { content: [{ type: 'text', text: `${data.tcs.length} test cases for ${storyId}:\n\n${lines.join('\n')}` }] };
  },
);

// ── get_review_state ──────────────────────────────────────────────────────────
server.tool(
  'get_review_state',
  'Get current review state for a story: which TCs are reviewed/codex/implemented/testrun/rejected, all comments, and rejection reasons.',
  { storyId: z.string().describe('Jira story key') },
  async ({ storyId }) => {
    const data = await api(`/api/reviews?storyId=${encodeURIComponent(storyId)}`);

    const sections = [];

    const flags = ['reviewed', 'codex', 'implemented', 'testrun', 'rejected'];
    for (const flag of flags) {
      if (data[flag]?.length) {
        sections.push(`${flag.toUpperCase()}: ${data[flag].join(', ')}`);
      }
    }

    if (Object.keys(data.rejections ?? {}).length) {
      const rLines = Object.entries(data.rejections).map(([id, r]) => `  ${id}: ${r}`);
      sections.push(`REJECTION REASONS:\n${rLines.join('\n')}`);
    }

    if (Object.keys(data.comments ?? {}).length) {
      const cLines = Object.entries(data.comments).flatMap(([id, comments]) =>
        comments.map(c => `  [${id}] ${c.author} (${c.createdAt.slice(0, 10)}): ${c.content}`)
      );
      sections.push(`COMMENTS:\n${cLines.join('\n')}`);
    }

    const text = sections.length ? sections.join('\n\n') : 'No reviews recorded yet.';
    return { content: [{ type: 'text', text }] };
  },
);

// ── set_review ────────────────────────────────────────────────────────────────
server.tool(
  'set_review',
  'Set or clear a review flag on a test case. type must be one of: reviewed | codex | implemented | testrun | rejected.',
  {
    storyId: z.string().describe('Jira story key'),
    tcId:    z.string().describe('Test case ID, e.g. "OA-TC-001"'),
    type:    z.enum(['reviewed', 'codex', 'implemented', 'testrun', 'rejected']).describe('Review type'),
    checked: z.boolean().describe('true to mark, false to unmark'),
  },
  async ({ storyId, tcId, type, checked }) => {
    await api('/api/reviews', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ storyId, tcId, type, checked }),
    });
    const action = checked ? 'marked' : 'cleared';
    return { content: [{ type: 'text', text: `✓ ${tcId} ${action} as ${type}` }] };
  },
);

// ── add_comment ───────────────────────────────────────────────────────────────
server.tool(
  'add_comment',
  'Add a review comment to a test case. author is typically "GPT" for AI reviews.',
  {
    storyId: z.string().describe('Jira story key'),
    tcId:    z.string().describe('Test case ID'),
    author:  z.string().default('GPT').describe('Comment author, defaults to "GPT"'),
    content: z.string().describe('Comment text'),
  },
  async ({ storyId, tcId, author, content }) => {
    const data = await api('/api/comments', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ storyId, tcId, author, content }),
    });
    return { content: [{ type: 'text', text: `✓ Comment #${data.comment.id} added to ${tcId}` }] };
  },
);

// ── set_rejection ─────────────────────────────────────────────────────────────
server.tool(
  'set_rejection',
  'Set or clear a rejection reason for a test case. Pass empty string to clear the reason.',
  {
    storyId: z.string().describe('Jira story key'),
    tcId:    z.string().describe('Test case ID'),
    reason:  z.string().describe('Rejection reason, or empty string to clear'),
  },
  async ({ storyId, tcId, reason }) => {
    await api('/api/rejections', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ storyId, tcId, reason }),
    });
    const action = reason ? `set to: "${reason}"` : 'cleared';
    return { content: [{ type: 'text', text: `✓ ${tcId} rejection ${action}` }] };
  },
);

// ─── Start ────────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
