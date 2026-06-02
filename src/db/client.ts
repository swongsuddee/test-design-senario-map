import fs from 'fs';
import path from 'path';

const DB_DIR  = path.join(process.cwd(), 'db');
const DB_PATH = path.join(DB_DIR, 'reviews.db');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SqlJsDb = any;

let _ready: Promise<SqlJsDb> | null = null;

function migrate(db: SqlJsDb) {
  const info = db.exec('PRAGMA table_info(reviews)');
  if (!info.length || !info[0].values.length) return;
  const cols = (info[0].values as [number, string, ...unknown[]][]).map(r => r[1]);
  if (cols.includes('type')) return;
  // v1 → v2: add `type` column to primary key
  db.run('ALTER TABLE reviews RENAME TO reviews_v1');
  db.run(`CREATE TABLE reviews (
    story_id TEXT NOT NULL,
    tc_id    TEXT NOT NULL,
    type     TEXT NOT NULL DEFAULT 'reviewed',
    PRIMARY KEY (story_id, tc_id, type)
  )`);
  db.run("INSERT INTO reviews (story_id, tc_id, type) SELECT story_id, tc_id, 'reviewed' FROM reviews_v1");
  db.run('DROP TABLE reviews_v1');
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

  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    story_id TEXT NOT NULL,
    tc_id    TEXT NOT NULL,
    type     TEXT NOT NULL DEFAULT 'reviewed',
    PRIMARY KEY (story_id, tc_id, type)
  )`);

  return db;
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
