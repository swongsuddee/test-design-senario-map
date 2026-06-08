import { ALL_STORIES } from '@/data/stories';

// Maps a URL slug (e.g. 'pp4', 'user-auth') → Jira story id (e.g. 'PP-4', 'USER-AUTH').
// If the input already matches a story id directly, returns it unchanged.
export function normalizeStoryId(raw: string): string {
  if (!raw) return raw;
  if (ALL_STORIES.some(s => s.id === raw)) return raw;
  const bySlug = ALL_STORIES.find(s => s.href.slice(1) === raw);
  return bySlug ? bySlug.id : raw;
}
