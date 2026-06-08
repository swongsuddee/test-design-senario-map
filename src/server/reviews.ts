import { getDb, persist } from '../db/client';

export type ReviewType = 'reviewed' | 'codex' | 'implemented' | 'testrun' | 'rejected';
export type ReviewMap  = Record<ReviewType, string[]>;

export type Comment = {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
export type CommentsMap   = Record<string, Comment[]>;  // tcId → Comment[]
export type RejectionsMap = Record<string, string>;      // tcId → reason

// ── Review toggles ─────────────────────────────────────────────────────────────

export async function getAllReviewed(storyId: string): Promise<ReviewMap> {
  const db  = await getDb();
  const out: ReviewMap = { reviewed: [], codex: [], implemented: [], testrun: [], rejected: [] };
  const res = db.exec('SELECT tc_id, review_type FROM tc_reviews WHERE story_id = ?', [storyId]);
  if (!res.length) return out;
  for (const [tc_id, review_type] of res[0].values as [string, string][]) {
    if (review_type in out) out[review_type as ReviewType].push(tc_id);
  }
  return out;
}

export async function toggleReviewed(
  storyId: string, tcId: string, type: ReviewType, checked: boolean,
): Promise<void> {
  const db = await getDb();
  if (checked) {
    db.run(
      'INSERT OR IGNORE INTO tc_reviews (story_id, tc_id, review_type) VALUES (?, ?, ?)',
      [storyId, tcId, type],
    );
  } else {
    db.run(
      'DELETE FROM tc_reviews WHERE story_id = ? AND tc_id = ? AND review_type = ?',
      [storyId, tcId, type],
    );
  }
  await persist();
}

// ── Comments ───────────────────────────────────────────────────────────────────

export async function getComments(storyId: string): Promise<CommentsMap> {
  const db  = await getDb();
  const out: CommentsMap = {};
  const res = db.exec(
    'SELECT id, tc_id, author, content, created_at, updated_at FROM tc_comments WHERE story_id = ? ORDER BY created_at ASC',
    [storyId],
  );
  if (!res.length) return out;
  for (const [id, tc_id, author, content, created_at, updated_at] of res[0].values as [number, string, string, string, string, string][]) {
    if (!out[tc_id]) out[tc_id] = [];
    out[tc_id].push({ id, author, content, createdAt: created_at, updatedAt: updated_at });
  }
  return out;
}

export async function addComment(
  storyId: string, tcId: string, author: string, content: string,
): Promise<Comment> {
  const db = await getDb();
  db.run(
    'INSERT INTO tc_comments (story_id, tc_id, author, content) VALUES (?, ?, ?, ?)',
    [storyId, tcId, author, content],
  );
  const res = db.exec('SELECT id, author, content, created_at, updated_at FROM tc_comments WHERE id = last_insert_rowid()');
  await persist();
  const [id, auth, cont, created_at, updated_at] = res[0].values[0] as [number, string, string, string, string];
  return { id, author: auth, content: cont, createdAt: created_at, updatedAt: updated_at };
}

export async function editComment(id: number, content: string): Promise<void> {
  const db = await getDb();
  db.run(
    "UPDATE tc_comments SET content = ?, updated_at = datetime('now') WHERE id = ?",
    [content, id],
  );
  await persist();
}

export async function deleteComment(id: number): Promise<void> {
  const db = await getDb();
  db.run('DELETE FROM tc_comments WHERE id = ?', [id]);
  await persist();
}

export async function getCommentStoryId(id: number): Promise<string | null> {
  const db = await getDb();
  const res = db.exec('SELECT story_id FROM tc_comments WHERE id = ?', [id]);
  if (!res.length || !res[0].values.length) return null;
  return res[0].values[0][0] as string;
}

// ── Rejections ─────────────────────────────────────────────────────────────────

export async function getRejections(storyId: string): Promise<RejectionsMap> {
  const db  = await getDb();
  const out: RejectionsMap = {};
  const res = db.exec(
    'SELECT tc_id, reason FROM tc_rejections WHERE story_id = ?',
    [storyId],
  );
  if (!res.length) return out;
  for (const [tc_id, reason] of res[0].values as [string, string][]) {
    out[tc_id] = reason;
  }
  return out;
}

export async function setRejection(
  storyId: string, tcId: string, reason: string,
): Promise<void> {
  const db = await getDb();
  if (reason === '') {
    db.run('DELETE FROM tc_rejections WHERE story_id = ? AND tc_id = ?', [storyId, tcId]);
  } else {
    db.run(
      "INSERT OR REPLACE INTO tc_rejections (story_id, tc_id, reason, updated_at) VALUES (?, ?, ?, datetime('now'))",
      [storyId, tcId, reason],
    );
  }
  await persist();
}
