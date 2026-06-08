import { getDb, persist } from '../db/client';
import type { ClarifyItem, ClarifyType, ClarifyStatus } from '../types';

// ── Row type ──────────────────────────────────────────────────────────────────

export type ConflictRow = {
  id: string;
  storyId: string;
  type: ClarifyType;
  status: ClarifyStatus;
  title: string;
  body: string;
  resolution: string | null;
  date: string | null;
  sortOrder: number;
};

// ── Queries ───────────────────────────────────────────────────────────────────

export async function getConflicts(storyId: string): Promise<ConflictRow[]> {
  const db  = await getDb();
  const res = db.exec(
    `SELECT id, story_id, type, status, title, body, resolution, date, sort_order
     FROM conflict WHERE story_id = ? ORDER BY sort_order`,
    [storyId],
  );
  if (!res.length) return [];
  return (res[0].values as [string, string, string, string, string, string, string | null, string | null, number][]).map(
    ([id, sId, type, status, title, body, resolution, date, sortOrder]) => ({
      id, storyId: sId,
      type: type as ClarifyType,
      status: status as ClarifyStatus,
      title, body,
      resolution: resolution ?? null,
      date: date ?? null,
      sortOrder,
    }),
  );
}

export async function getConflictTcIds(conflictId: string): Promise<string[]> {
  const db  = await getDb();
  const res = db.exec('SELECT tc_id FROM conflict_tc WHERE conflict_id = ?', [conflictId]);
  if (!res.length) return [];
  return (res[0].values as [string][]).map(([tc_id]) => tc_id);
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export async function upsertConflict(row: ConflictRow): Promise<void> {
  const db = await getDb();
  db.run(
    `INSERT INTO conflict (id, story_id, type, status, title, body, resolution, date, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET story_id=excluded.story_id, type=excluded.type,
       status=excluded.status, title=excluded.title, body=excluded.body,
       resolution=excluded.resolution, date=excluded.date, sort_order=excluded.sort_order`,
    [row.id, row.storyId, row.type, row.status, row.title, row.body,
     row.resolution, row.date, row.sortOrder],
  );
  await persist();
}

export async function setConflictTcIds(conflictId: string, tcIds: string[]): Promise<void> {
  const db = await getDb();
  db.run('DELETE FROM conflict_tc WHERE conflict_id = ?', [conflictId]);
  for (const tcId of tcIds) {
    db.run(
      'INSERT OR IGNORE INTO conflict_tc (conflict_id, tc_id) VALUES (?, ?)',
      [conflictId, tcId],
    );
  }
  await persist();
}

// ── Bulk import from static ClarifyItem[] ────────────────────────────────────

export async function importConflicts(storyId: string, items: ClarifyItem[]): Promise<void> {
  const db = await getDb();
  items.forEach((item, i) => {
    db.run(
      `INSERT INTO conflict (id, story_id, type, status, title, body, resolution, date, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET type=excluded.type, status=excluded.status,
         title=excluded.title, body=excluded.body, resolution=excluded.resolution,
         date=excluded.date, sort_order=excluded.sort_order`,
      [item.id, storyId, item.type, item.status, item.title, item.body,
       item.resolution ?? null, item.date ?? null, i],
    );
    // Parse affectedTc: "PP2-TC-001, PP2-TC-002" → ['PP2-TC-001', 'PP2-TC-002']
    if (item.affectedTc) {
      const tcIds = item.affectedTc.split(',').map(s => s.trim()).filter(Boolean);
      db.run('DELETE FROM conflict_tc WHERE conflict_id = ?', [item.id]);
      for (const tcId of tcIds) {
        db.run(
          'INSERT OR IGNORE INTO conflict_tc (conflict_id, tc_id) VALUES (?, ?)',
          [item.id, tcId],
        );
      }
    }
  });
  await persist();
}
