// story.ts — typed query functions for all story pages

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rows(res: any[]): any[][] {
  return res.length ? (res[0].values ?? []) : [];
}

export type MetaCard = { label: string; value: string; cls: string };
export type TechniqueRow = { module: string; badges: [string, string][]; rationale: string };
export type CoverageRow = {
  mod: string;
  badges: [string, string][];
  existing: string;
  newTc: string | null;
  risk: [string, string];
  pct: number;
};
export type CoverageStatCard = { cls: string; num: string; lbl: string };
export type HeroData = { badge: string; description: string; stats: [string, string][] };
export type CoverageNote = {
  recommendation: string;
  subtitle: string;
  origTotal: string;
  newTotal: string;
};
export type AutomationCard = { title: string; items: string[] };
export type ScenarioSectionMeta = {
  id: string;
  letter: string;
  title: string;
  subtitle: string;
  overviewTitle: string;
  techniqueBadge?: { label: string; cls: string };
  dataKey: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getHero(db: any, storyId: string): HeroData {
  const heroRows = rows(
    db.exec('SELECT badge, description FROM story_hero WHERE story_id = ?', [storyId])
  );
  const badge = heroRows.length ? String(heroRows[0][0]) : '';
  const description = heroRows.length ? String(heroRows[0][1]) : '';

  const statRows = rows(
    db.exec(
      'SELECT value, label FROM story_hero_stat WHERE story_id = ? ORDER BY sort_order',
      [storyId]
    )
  );
  const stats: [string, string][] = statRows.map(r => [String(r[0]), String(r[1])]);

  return { badge, description, stats };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMetaCards(db: any, storyId: string): MetaCard[] {
  return rows(
    db.exec(
      'SELECT label, value, cls FROM story_meta WHERE story_id = ? ORDER BY sort_order',
      [storyId]
    )
  ).map(r => ({ label: String(r[0]), value: String(r[1]), cls: String(r[2]) }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTechniqueRows(db: any, storyId: string): TechniqueRow[] {
  return rows(
    db.exec(
      'SELECT module, badges_json, rationale FROM story_technique WHERE story_id = ? ORDER BY sort_order',
      [storyId]
    )
  ).map(r => ({
    module: String(r[0]),
    badges: JSON.parse(String(r[1])) as [string, string][],
    rationale: String(r[2]),
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCoverageRows(db: any, storyId: string): CoverageRow[] {
  return rows(
    db.exec(
      `SELECT module, badges_json, existing_tcs, new_tc, risk_cls, risk_label, pct
       FROM story_coverage_row WHERE story_id = ? ORDER BY sort_order`,
      [storyId]
    )
  ).map(r => ({
    mod: String(r[0]),
    badges: JSON.parse(String(r[1])) as [string, string][],
    existing: String(r[2]),
    newTc: r[3] != null ? String(r[3]) : null,
    risk: [String(r[4]), String(r[5])] as [string, string],
    pct: Number(r[6]),
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCoverageStatCards(db: any, storyId: string): CoverageStatCard[] {
  return rows(
    db.exec(
      'SELECT cls, num, lbl FROM story_coverage_stat WHERE story_id = ? ORDER BY sort_order',
      [storyId]
    )
  ).map(r => ({ cls: String(r[0]), num: String(r[1]), lbl: String(r[2]) }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCoverageNote(db: any, storyId: string): CoverageNote {
  const r = rows(
    db.exec(
      'SELECT recommendation, coverage_subtitle, orig_total, new_total FROM story_coverage_note WHERE story_id = ?',
      [storyId]
    )
  );
  if (!r.length) return { recommendation: '', subtitle: '', origTotal: '', newTotal: '' };
  return {
    recommendation: String(r[0][0]),
    subtitle: String(r[0][1]),
    origTotal: String(r[0][2]),
    newTotal: String(r[0][3]),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMissingCoverage(db: any, storyId: string): string[] {
  return rows(
    db.exec(
      'SELECT message FROM story_missing_coverage WHERE story_id = ? ORDER BY sort_order',
      [storyId]
    )
  ).map(r => String(r[0]));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTestDataRows(db: any, storyId: string): [string, string][] {
  return rows(
    db.exec(
      'SELECT data_label, value_source FROM story_test_data WHERE story_id = ? ORDER BY sort_order',
      [storyId]
    )
  ).map(r => [String(r[0]), String(r[1])]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAutomationCards(db: any, storyId: string): AutomationCard[] {
  const cardRows = rows(
    db.exec(
      'SELECT id, title FROM story_automation_card WHERE story_id = ? ORDER BY sort_order',
      [storyId]
    )
  );

  return cardRows.map(card => {
    const cardId = String(card[0]);
    const title = String(card[1]);
    const itemRows = rows(
      db.exec(
        'SELECT content FROM story_automation_item WHERE card_id = ? ORDER BY sort_order',
        [cardId]
      )
    );
    return { title, items: itemRows.map(i => String(i[0])) };
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getScenarioSections(db: any, storyId: string): ScenarioSectionMeta[] {
  return rows(
    db.exec(
      `SELECT id, letter, title, subtitle, overview_title, technique_label, technique_cls, data_key
       FROM story_scenario_section WHERE story_id = ? ORDER BY sort_order`,
      [storyId]
    )
  ).map(r => {
    const techLabel = r[5] != null ? String(r[5]) : null;
    const techCls = r[6] != null ? String(r[6]) : null;
    return {
      id: String(r[0]),
      letter: String(r[1]),
      title: String(r[2]),
      subtitle: String(r[3]),
      overviewTitle: String(r[4]),
      techniqueBadge:
        techLabel && techCls ? { label: techLabel, cls: techCls } : undefined,
      dataKey: String(r[7]),
    };
  });
}

export type ContractEndpoint = { method: string; path: string; reqNote: string; resNote: string; methodCls: string | null };
export type ContractReqRow = { field: string; fieldType: string; constraintText: string; requiredText: string };
export type ContractResRow = { statusCode: string; body: string; keyFields: string };
export type StoryNote = { id: string; title: string; content: string; noteType: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getContractEndpoints(db: any, storyId: string): ContractEndpoint[] {
  const res = db.exec('SELECT method, path, req_note, res_note, method_cls FROM story_contract_endpoint WHERE story_id = ? ORDER BY sort_order', [storyId]);
  return rows(res).map((r: any[]) => ({ method: String(r[0]), path: String(r[1]), reqNote: String(r[2]), resNote: String(r[3]), methodCls: r[4] ? String(r[4]) : null }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getContractReqRows(db: any, storyId: string): ContractReqRow[] {
  const res = db.exec('SELECT field, field_type, constraint_text, required_text FROM story_contract_req_row WHERE story_id = ? ORDER BY sort_order', [storyId]);
  return rows(res).map((r: any[]) => ({ field: String(r[0]), fieldType: String(r[1]), constraintText: String(r[2]), requiredText: String(r[3]) }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getContractResRows(db: any, storyId: string): ContractResRow[] {
  const res = db.exec('SELECT status_code, body, key_fields FROM story_contract_res_row WHERE story_id = ? ORDER BY sort_order', [storyId]);
  return rows(res).map((r: any[]) => ({ statusCode: String(r[0]), body: String(r[1]), keyFields: String(r[2]) }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNote(db: any, storyId: string, noteType: string): StoryNote | null {
  const res = db.exec('SELECT id, title, content, note_type FROM story_note WHERE story_id = ? AND note_type = ? ORDER BY sort_order LIMIT 1', [storyId, noteType]);
  const r = rows(res)[0];
  return r ? { id: String(r[0]), title: String(r[1]), content: String(r[2]), noteType: String(r[3]) } : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNoteItems(db: any, noteId: string): string[] {
  const res = db.exec('SELECT content FROM story_note_item WHERE note_id = ? ORDER BY sort_order', [noteId]);
  return rows(res).map((r: any[]) => String(r[0]));
}

export type StoryBasic = { id: string; slug: string; title: string; href: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getStory(db: any, slug: string): StoryBasic | null {
  const r = rows(db.exec('SELECT id, slug, title, href FROM story WHERE slug = ?', [slug]));
  if (!r.length) return null;
  return { id: String(r[0][0]), slug: String(r[0][1]), title: String(r[0][2]), href: String(r[0][3]) };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getStoryPlatformMeta(db: any, storyId: string): { platform: string; framework: string } {
  const map: Record<string, string> = {};
  for (const c of getMetaCards(db, storyId)) map[c.label] = c.value;
  return { platform: map['Platform'] ?? '', framework: map['Framework'] ?? '' };
}
