import { getDb, persist } from '../db/client';
import type { TcRow, TcSectionDef, AutoCls, PriCls } from '../types';

// ── Row types ─────────────────────────────────────────────────────────────────

export type StoryRow = {
  id: string;
  slug: string;
  title: string;
  href: string;
  pending: number;
};

export type TcSectionRow = {
  id: string;
  storyId: string;
  num: string;
  title: string;
  subtitle: string;
  cols: Array<'module' | 'type' | 'labels'>;
  sortOrder: number;
};

export type TestCaseRow = {
  id: string;
  sectionId: string;
  storyId: string;
  isNew: boolean;
  module: string | null;
  summary: string;
  type: string | null;
  priority: PriCls;
  auto: AutoCls;
  sortOrder: number;
};

export type TcLabelRow = {
  id?: number;
  tcId: string;
  cls: string;
  label: string;
  sortOrder: number;
};

// ── Story ─────────────────────────────────────────────────────────────────────

export async function getAllStories(): Promise<StoryRow[]> {
  const db  = await getDb();
  const res = db.exec('SELECT id, slug, title, href, pending FROM story ORDER BY id');
  if (!res.length) return [];
  return (res[0].values as [string, string, string, string, number][]).map(
    ([id, slug, title, href, pending]) => ({ id, slug, title, href, pending }),
  );
}

export async function getStory(id: string): Promise<StoryRow | null> {
  const db  = await getDb();
  const res = db.exec('SELECT id, slug, title, href, pending FROM story WHERE id = ?', [id]);
  if (!res.length || !res[0].values.length) return null;
  const [sid, slug, title, href, pending] = res[0].values[0] as [string, string, string, string, number];
  return { id: sid, slug, title, href, pending };
}

export async function upsertStory(row: StoryRow): Promise<void> {
  const db = await getDb();
  db.run(
    `INSERT INTO story (id, slug, title, href, pending) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET slug=excluded.slug, title=excluded.title,
       href=excluded.href, pending=excluded.pending`,
    [row.id, row.slug, row.title, row.href, row.pending],
  );
  await persist();
}

export async function upsertStories(rows: StoryRow[]): Promise<void> {
  const db = await getDb();
  for (const row of rows) {
    db.run(
      `INSERT INTO story (id, slug, title, href, pending) VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET slug=excluded.slug, title=excluded.title,
         href=excluded.href, pending=excluded.pending`,
      [row.id, row.slug, row.title, row.href, row.pending],
    );
  }
  await persist();
}

// ── TC Section ────────────────────────────────────────────────────────────────

export async function getSections(storyId: string): Promise<TcSectionRow[]> {
  const db  = await getDb();
  const res = db.exec(
    'SELECT id, story_id, num, title, subtitle, cols_json, sort_order FROM tc_section WHERE story_id = ? ORDER BY sort_order',
    [storyId],
  );
  if (!res.length) return [];
  return (res[0].values as [string, string, string, string, string, string, number][]).map(
    ([id, stId, num, title, subtitle, cols_json, sortOrder]) => ({
      id, storyId: stId, num, title, subtitle,
      cols: JSON.parse(cols_json) as Array<'module' | 'type' | 'labels'>,
      sortOrder,
    }),
  );
}

export async function upsertSection(row: TcSectionRow): Promise<void> {
  const db = await getDb();
  db.run(
    `INSERT INTO tc_section (id, story_id, num, title, subtitle, cols_json, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET story_id=excluded.story_id, num=excluded.num,
       title=excluded.title, subtitle=excluded.subtitle,
       cols_json=excluded.cols_json, sort_order=excluded.sort_order`,
    [row.id, row.storyId, row.num, row.title, row.subtitle, JSON.stringify(row.cols), row.sortOrder],
  );
  await persist();
}

// ── Test Case ─────────────────────────────────────────────────────────────────

export async function getTestCases(storyId: string): Promise<TestCaseRow[]> {
  const db  = await getDb();
  const res = db.exec(
    `SELECT id, section_id, story_id, is_new, module, summary, type, priority, auto, sort_order
     FROM test_case WHERE story_id = ? ORDER BY sort_order`,
    [storyId],
  );
  if (!res.length) return [];
  return (res[0].values as [string, string, string, number, string | null, string, string | null, string, string, number][]).map(
    ([id, sectionId, sId, is_new, module, summary, type, priority, auto, sortOrder]) => ({
      id, sectionId, storyId: sId,
      isNew: Boolean(is_new),
      module: module ?? null,
      summary,
      type: type ?? null,
      priority: priority as PriCls,
      auto: auto as AutoCls,
      sortOrder,
    }),
  );
}

export async function upsertTestCase(row: TestCaseRow): Promise<void> {
  const db = await getDb();
  db.run(
    `INSERT INTO test_case (id, section_id, story_id, is_new, module, summary, type, priority, auto, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET section_id=excluded.section_id, story_id=excluded.story_id,
       is_new=excluded.is_new, module=excluded.module, summary=excluded.summary,
       type=excluded.type, priority=excluded.priority, auto=excluded.auto,
       sort_order=excluded.sort_order`,
    [row.id, row.sectionId, row.storyId, row.isNew ? 1 : 0, row.module,
     row.summary, row.type, row.priority, row.auto, row.sortOrder],
  );
  await persist();
}

// ── TC Labels ─────────────────────────────────────────────────────────────────

export async function getLabels(tcId: string): Promise<TcLabelRow[]> {
  const db  = await getDb();
  const res = db.exec(
    'SELECT id, tc_id, cls, label, sort_order FROM tc_label WHERE tc_id = ? ORDER BY sort_order',
    [tcId],
  );
  if (!res.length) return [];
  return (res[0].values as [number, string, string, string, number][]).map(
    ([id, tid, cls, label, sortOrder]) => ({ id, tcId: tid, cls, label, sortOrder }),
  );
}

export async function replaceLabels(tcId: string, labels: Array<[string, string]>): Promise<void> {
  const db = await getDb();
  db.run('DELETE FROM tc_label WHERE tc_id = ?', [tcId]);
  labels.forEach(([cls, label], i) => {
    db.run(
      'INSERT INTO tc_label (tc_id, cls, label, sort_order) VALUES (?, ?, ?, ?)',
      [tcId, cls, label, i],
    );
  });
  await persist();
}

// ── Bulk import from static TcSectionDef[] ───────────────────────────────────

export async function importTcSections(storyId: string, sections: TcSectionDef[]): Promise<void> {
  const db = await getDb();
  sections.forEach((sec, si) => {
    db.run(
      `INSERT INTO tc_section (id, story_id, num, title, subtitle, cols_json, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET num=excluded.num, title=excluded.title,
         subtitle=excluded.subtitle, cols_json=excluded.cols_json, sort_order=excluded.sort_order`,
      [sec.sectionId, storyId, sec.num, sec.title, sec.subtitle ?? '', JSON.stringify(sec.cols), si],
    );
    sec.rows.forEach((tc: TcRow, ti) => {
      db.run(
        `INSERT INTO test_case (id, section_id, story_id, is_new, module, summary, type, priority, auto, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET section_id=excluded.section_id, is_new=excluded.is_new,
           module=excluded.module, summary=excluded.summary, type=excluded.type,
           priority=excluded.priority, auto=excluded.auto, sort_order=excluded.sort_order`,
        [tc.id, sec.sectionId, storyId, tc.isNew ? 1 : 0, tc.module ?? null,
         tc.summary, tc.type ?? null, tc.priority, tc.auto, ti],
      );
      if (tc.labels?.length) {
        db.run('DELETE FROM tc_label WHERE tc_id = ?', [tc.id]);
        tc.labels.forEach(([cls, label], li) => {
          db.run(
            'INSERT INTO tc_label (tc_id, cls, label, sort_order) VALUES (?, ?, ?, ?)',
            [tc.id, cls, label, li],
          );
        });
      }
    });
  });
  await persist();
}
