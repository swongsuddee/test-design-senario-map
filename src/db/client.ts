import fs from 'fs';
import path from 'path';

const DB_DIR  = path.join(process.cwd(), 'db');
const DB_PATH = path.join(DB_DIR, 'reviews.db');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SqlJsDb = any;

let _ready: Promise<SqlJsDb> | null = null;

function migrate(db: SqlJsDb) {
  // If tc_reviews already exists → already on new schema, skip
  const tcReviewsInfo = db.exec('PRAGMA table_info(tc_reviews)');
  if (tcReviewsInfo.length && tcReviewsInfo[0].values.length) return;

  // If old `reviews` table exists → rename it to tc_reviews
  const reviewsInfo = db.exec('PRAGMA table_info(reviews)');
  if (reviewsInfo.length && reviewsInfo[0].values.length) {
    // Old reviews table has column `type`, new tc_reviews uses `review_type`
    db.run(`CREATE TABLE tc_reviews (
      story_id    TEXT NOT NULL,
      tc_id       TEXT NOT NULL,
      review_type TEXT NOT NULL,
      PRIMARY KEY (story_id, tc_id, review_type)
    )`);
    db.run("INSERT INTO tc_reviews (story_id, tc_id, review_type) SELECT story_id, tc_id, type FROM reviews");
    db.run('DROP TABLE reviews');
  }

  // If old `tc_notes` table exists → migrate reject_reason rows into tc_rejections, then drop
  const tcNotesInfo = db.exec('PRAGMA table_info(tc_notes)');
  if (tcNotesInfo.length && tcNotesInfo[0].values.length) {
    db.run(`CREATE TABLE IF NOT EXISTS tc_rejections (
      story_id   TEXT NOT NULL,
      tc_id      TEXT NOT NULL,
      reason     TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (story_id, tc_id)
    )`);
    db.run(
      "INSERT OR IGNORE INTO tc_rejections (story_id, tc_id, reason) " +
      "SELECT story_id, tc_id, content FROM tc_notes WHERE note_key = 'reject_reason'"
    );
    db.run('DROP TABLE tc_notes');
  }
}

async function init(): Promise<SqlJsDb> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const initSqlJs = require('sql.js');
  const SQL = await initSqlJs({
    locateFile: (file: string) =>
      path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', file),
  });

  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

  const db: SqlJsDb = fs.existsSync(DB_PATH)
    ? new SQL.Database(fs.readFileSync(DB_PATH))
    : new SQL.Database();

  migrate(db);

  db.run(`CREATE TABLE IF NOT EXISTS tc_reviews (
    story_id    TEXT NOT NULL,
    tc_id       TEXT NOT NULL,
    review_type TEXT NOT NULL,
    PRIMARY KEY (story_id, tc_id, review_type)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tc_comments (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    story_id    TEXT NOT NULL,
    tc_id       TEXT NOT NULL,
    author      TEXT NOT NULL DEFAULT 'Me',
    content     TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
  )`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_tc_comments ON tc_comments (story_id, tc_id)`);

  db.run(`CREATE TABLE IF NOT EXISTS tc_rejections (
    story_id   TEXT NOT NULL,
    tc_id      TEXT NOT NULL,
    reason     TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (story_id, tc_id)
  )`);

  // ── New catalog tables ──────────────────────────────────────────────────────
  db.run(`CREATE TABLE IF NOT EXISTS story (
    id        TEXT PRIMARY KEY,
    slug      TEXT NOT NULL UNIQUE,
    title     TEXT NOT NULL,
    href      TEXT NOT NULL,
    pending   INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tc_section (
    id         TEXT PRIMARY KEY,
    story_id   TEXT NOT NULL REFERENCES story(id),
    num        TEXT NOT NULL,
    title      TEXT NOT NULL,
    subtitle   TEXT NOT NULL DEFAULT '',
    cols_json  TEXT NOT NULL DEFAULT '[]',
    sort_order INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS test_case (
    id         TEXT PRIMARY KEY,
    section_id TEXT NOT NULL REFERENCES tc_section(id),
    story_id   TEXT NOT NULL REFERENCES story(id),
    is_new     INTEGER NOT NULL DEFAULT 0,
    module     TEXT,
    summary    TEXT NOT NULL,
    type       TEXT,
    priority   TEXT NOT NULL DEFAULT 'medium',
    auto       TEXT NOT NULL DEFAULT 'manual',
    sort_order INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tc_label (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    tc_id      TEXT NOT NULL REFERENCES test_case(id),
    cls        TEXT NOT NULL,
    label      TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS conflict (
    id         TEXT PRIMARY KEY,
    story_id   TEXT NOT NULL REFERENCES story(id),
    type       TEXT NOT NULL,
    status     TEXT NOT NULL DEFAULT 'pending',
    title      TEXT NOT NULL,
    body       TEXT NOT NULL,
    resolution TEXT,
    date       TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS conflict_tc (
    conflict_id TEXT NOT NULL REFERENCES conflict(id),
    tc_id       TEXT NOT NULL REFERENCES test_case(id),
    PRIMARY KEY (conflict_id, tc_id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS clarify_comments (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    story_id    TEXT NOT NULL,
    clarify_id  TEXT NOT NULL,
    author      TEXT NOT NULL DEFAULT 'Me',
    content     TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
  )`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_clarify_comments ON clarify_comments (story_id, clarify_id)`);

  db.run(`CREATE TABLE IF NOT EXISTS scenario_map (
    id         TEXT PRIMARY KEY,
    story_id   TEXT NOT NULL REFERENCES story(id),
    name       TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS dag_node (
    id       TEXT PRIMARY KEY,
    map_id   TEXT NOT NULL REFERENCES scenario_map(id),
    node_id  TEXT NOT NULL,
    col      INTEGER NOT NULL DEFAULT 0,
    row      INTEGER NOT NULL DEFAULT 0,
    name     TEXT NOT NULL,
    type     TEXT NOT NULL,
    shape    TEXT,
    details  TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS dag_edge (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    map_id    TEXT NOT NULL REFERENCES scenario_map(id),
    from_node TEXT NOT NULL,
    to_node   TEXT NOT NULL,
    label     TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS scenario (
    id                TEXT PRIMARY KEY,
    map_id            TEXT NOT NULL REFERENCES scenario_map(id),
    tc_id             TEXT NOT NULL REFERENCES test_case(id),
    name              TEXT NOT NULL,
    type              TEXT NOT NULL,
    type_cls          TEXT NOT NULL,
    active_path_json  TEXT NOT NULL DEFAULT '[]',
    active_edges_json TEXT NOT NULL DEFAULT '[]'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS test_step (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    scenario_id TEXT NOT NULL REFERENCES scenario(id),
    action      TEXT NOT NULL,
    data        TEXT NOT NULL DEFAULT '',
    expect      TEXT NOT NULL,
    sort_order  INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE INDEX IF NOT EXISTS idx_tc_section_story   ON tc_section  (story_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_test_case_section  ON test_case   (section_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_test_case_story    ON test_case   (story_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_tc_label_tc        ON tc_label    (tc_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_conflict_story     ON conflict    (story_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_conflict_tc_tc     ON conflict_tc (tc_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_scenario_map_story ON scenario_map(story_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_dag_node_map       ON dag_node    (map_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_dag_edge_map       ON dag_edge    (map_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_scenario_map_id    ON scenario    (map_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_scenario_tc        ON scenario    (tc_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_test_step_scenario ON test_step   (scenario_id)`);

  db.run(`CREATE TABLE IF NOT EXISTS story_contract_endpoint (
    id          TEXT PRIMARY KEY,
    story_id    TEXT NOT NULL REFERENCES story(id),
    method      TEXT NOT NULL,
    path        TEXT NOT NULL,
    req_note    TEXT NOT NULL DEFAULT '',
    res_note    TEXT NOT NULL DEFAULT '',
    method_cls  TEXT,
    sort_order  INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_contract_req_row (
    id              TEXT PRIMARY KEY,
    story_id        TEXT NOT NULL REFERENCES story(id),
    field           TEXT NOT NULL,
    field_type      TEXT NOT NULL DEFAULT '',
    constraint_text TEXT NOT NULL DEFAULT '',
    required_text   TEXT NOT NULL DEFAULT '',
    sort_order      INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_contract_res_row (
    id          TEXT PRIMARY KEY,
    story_id    TEXT NOT NULL REFERENCES story(id),
    status_code TEXT NOT NULL,
    body        TEXT NOT NULL DEFAULT '',
    key_fields  TEXT NOT NULL DEFAULT '',
    sort_order  INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_note (
    id         TEXT PRIMARY KEY,
    story_id   TEXT NOT NULL REFERENCES story(id),
    title      TEXT NOT NULL DEFAULT '',
    content    TEXT NOT NULL DEFAULT '',
    note_type  TEXT NOT NULL DEFAULT 'note',
    sort_order INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_note_item (
    id         TEXT PRIMARY KEY,
    note_id    TEXT NOT NULL REFERENCES story_note(id),
    content    TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`);

  // ── PP-2 story page tables ──────────────────────────────────────────────────
  db.run(`CREATE TABLE IF NOT EXISTS story_seed (
    story_id  TEXT PRIMARY KEY,
    seeded_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_hero (
    story_id    TEXT PRIMARY KEY REFERENCES story(id),
    badge       TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT ''
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_hero_stat (
    id         TEXT PRIMARY KEY,
    story_id   TEXT NOT NULL REFERENCES story(id),
    value      TEXT NOT NULL,
    label      TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_meta (
    story_id   TEXT NOT NULL REFERENCES story(id),
    label      TEXT NOT NULL,
    value      TEXT NOT NULL,
    cls        TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (story_id, label)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_technique (
    id          TEXT PRIMARY KEY,
    story_id    TEXT NOT NULL REFERENCES story(id),
    module      TEXT NOT NULL,
    badges_json TEXT NOT NULL DEFAULT '[]',
    rationale   TEXT NOT NULL,
    sort_order  INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_coverage_row (
    id           TEXT PRIMARY KEY,
    story_id     TEXT NOT NULL REFERENCES story(id),
    module       TEXT NOT NULL,
    badges_json  TEXT NOT NULL DEFAULT '[]',
    existing_tcs TEXT NOT NULL DEFAULT '',
    new_tc       TEXT,
    risk_cls     TEXT NOT NULL DEFAULT 'low',
    risk_label   TEXT NOT NULL DEFAULT 'Low',
    pct          INTEGER NOT NULL DEFAULT 0,
    sort_order   INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_coverage_stat (
    id         TEXT PRIMARY KEY,
    story_id   TEXT NOT NULL REFERENCES story(id),
    cls        TEXT NOT NULL,
    num        TEXT NOT NULL,
    lbl        TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_coverage_note (
    story_id          TEXT PRIMARY KEY REFERENCES story(id),
    recommendation    TEXT NOT NULL DEFAULT '',
    coverage_subtitle TEXT NOT NULL DEFAULT '',
    orig_total        TEXT NOT NULL DEFAULT '',
    new_total         TEXT NOT NULL DEFAULT ''
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_missing_coverage (
    id         TEXT PRIMARY KEY,
    story_id   TEXT NOT NULL REFERENCES story(id),
    message    TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_test_data (
    id           TEXT PRIMARY KEY,
    story_id     TEXT NOT NULL REFERENCES story(id),
    data_label   TEXT NOT NULL,
    value_source TEXT NOT NULL,
    sort_order   INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_automation_card (
    id         TEXT PRIMARY KEY,
    story_id   TEXT NOT NULL REFERENCES story(id),
    title      TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_automation_item (
    id         TEXT PRIMARY KEY,
    card_id    TEXT NOT NULL REFERENCES story_automation_card(id),
    content    TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS story_scenario_section (
    id              TEXT PRIMARY KEY,
    story_id        TEXT NOT NULL REFERENCES story(id),
    letter          TEXT NOT NULL,
    title           TEXT NOT NULL,
    subtitle        TEXT NOT NULL DEFAULT '',
    overview_title  TEXT NOT NULL DEFAULT '',
    technique_label TEXT,
    technique_cls   TEXT,
    data_key        TEXT NOT NULL,
    sort_order      INTEGER NOT NULL DEFAULT 0
  )`);

  // Rename legacy review_type 'gpt' → 'codex'
  db.run(`INSERT OR IGNORE INTO tc_reviews (story_id, tc_id, review_type)
    SELECT story_id, tc_id, 'codex' FROM tc_reviews WHERE review_type = 'gpt'`);
  db.run(`DELETE FROM tc_reviews WHERE review_type = 'gpt'`);

  seedAll(db);

  // Normalize any slug-format story_ids (e.g. 'user-auth') → Jira key format ('USER-AUTH')
  const SLUG_TO_JIRA: Record<string, string> = {
    'pp2': 'PP-2', 'pp3': 'PP-3', 'pp4': 'PP-4', 'pp5': 'PP-5',
    'pp12': 'PP-12', 'pp13': 'PP-13', 'pp20': 'PP-20', 'pp35': 'PP-35',
    'pp36': 'PP-36', 'pp51': 'PP-51', 'pp61': 'PP-61', 'pp65': 'PP-65',
    'pp90': 'PP-90', 'pp104': 'PP-104', 'pp105': 'PP-105', 'pp122': 'PP-122',
    'pp136': 'PP-136', 'pp170': 'PP-170', 'pp171': 'PP-171', 'pp201': 'PP-201',
    'pp209': 'PP-209', 'pp210': 'PP-210', 'pp222': 'PP-222', 'pp226': 'PP-226',
    'pp227': 'PP-227', 'pp228': 'PP-228', 'pp231': 'PP-231', 'pp234': 'PP-234',
    'pp235': 'PP-235', 'pp236': 'PP-236', 'pp237': 'PP-237', 'pp244': 'PP-244',
    'pp268': 'PP-268', 'pp277': 'PP-277', 'pp296': 'PP-296', 'pp302': 'PP-302',
    'pp303': 'PP-303', 'pp304': 'PP-304', 'pp317': 'PP-317', 'pp318': 'PP-318',
    'pp337': 'PP-337', 'pp342': 'PP-342', 'pp350': 'PP-350', 'pp444': 'PP-444',
    'pp445': 'PP-445', 'pp447': 'PP-447', 'pp448': 'PP-448', 'pp449': 'PP-449',
    'pp451': 'PP-451', 'pp492': 'PP-492',
    'org-auth': 'ORG-AUTH', 'user-auth': 'USER-AUTH',
    'user-profile': 'USER-PROFILE', 'user-events': 'USER-EVENTS',
  };
  for (const [slug, jiraId] of Object.entries(SLUG_TO_JIRA)) {
    for (const tbl of ['tc_reviews', 'tc_comments', 'tc_rejections', 'clarify_comments']) {
      const exists = db.exec(`SELECT 1 FROM ${tbl} WHERE story_id = ? LIMIT 1`, [slug]);
      if (!exists.length || !exists[0].values.length) continue;
      if (tbl === 'tc_reviews') {
        db.run(`INSERT OR IGNORE INTO tc_reviews (story_id, tc_id, review_type)
          SELECT ?, tc_id, review_type FROM tc_reviews WHERE story_id = ?`, [jiraId, slug]);
      } else if (tbl === 'tc_comments' || tbl === 'clarify_comments') {
        db.run(`UPDATE ${tbl} SET story_id = ? WHERE story_id = ?`, [jiraId, slug]);
      } else {
        db.run(`INSERT OR REPLACE INTO tc_rejections (story_id, tc_id, reason, updated_at)
          SELECT ?, tc_id, reason, updated_at FROM tc_rejections WHERE story_id = ?`, [jiraId, slug]);
      }
      db.run(`DELETE FROM ${tbl} WHERE story_id = ?`, [slug]);
    }
  }

  return db;
}

function seedAll(db: SqlJsDb) {
  const seedDir = path.join(process.cwd(), 'db');
  if (!fs.existsSync(seedDir)) return;
  const files = fs.readdirSync(seedDir)
    .filter((f: string) => /^seed-.+\.sql$/.test(f))
    .sort();
  let dirty = false;
  for (const file of files) {
    const content = fs.readFileSync(path.join(seedDir, file), 'utf8');
    const match = content.match(/INSERT OR IGNORE INTO story_seed[^;]+VALUES\s*\('([^']+)'\)/);
    if (!match) continue;
    const storyId = match[1];
    const already = db.exec(`SELECT 1 FROM story_seed WHERE story_id = ? LIMIT 1`, [storyId]);
    if (already.length && already[0].values.length) continue;
    db.exec(content);
    dirty = true;
  }
  if (dirty) {
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
    fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
  }
}

export function getDb(): Promise<SqlJsDb> {
  if (!_ready) _ready = init();
  return _ready;
}

export async function persist(): Promise<void> {
  if (!_ready) return;
  const db = await _ready;
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
}
