import { getDb, persist } from './client';

export type ReviewType = 'reviewed' | 'gpt' | 'testrun';
export type ReviewMap  = Record<ReviewType, string[]>;

export async function getAllReviewed(storyId: string): Promise<ReviewMap> {
  const db  = await getDb();
  const out: ReviewMap = { reviewed: [], gpt: [], testrun: [] };
  const res = db.exec('SELECT tc_id, type FROM reviews WHERE story_id = ?', [storyId]);
  if (!res.length) return out;
  for (const [tc_id, type] of res[0].values as [string, string][]) {
    if (type in out) out[type as ReviewType].push(tc_id);
  }
  return out;
}

export async function toggleReviewed(
  storyId: string, tcId: string, type: ReviewType, checked: boolean,
): Promise<void> {
  const db = await getDb();
  if (checked) {
    db.run('INSERT OR IGNORE INTO reviews (story_id, tc_id, type) VALUES (?, ?, ?)', [storyId, tcId, type]);
  } else {
    db.run('DELETE FROM reviews WHERE story_id = ? AND tc_id = ? AND type = ?', [storyId, tcId, type]);
  }
  await persist();
}
