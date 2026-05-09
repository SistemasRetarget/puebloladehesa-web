/**
 * init-db.mjs
 * Creates Payload CMS tables in SQLite using better-sqlite3.
 * Runs before Next.js starts to ensure tables exist on first request.
 * All CREATE TABLE statements use IF NOT EXISTS — safe to run multiple times.
 */
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const dbUrl = process.env.DATABASE_URL || 'file:/tmp/cms.db';
const dbPath = dbUrl.replace(/^file:/, '');

console.log('[init-db] Opening database at:', dbPath);

const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const statements = [
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    role TEXT DEFAULT 'user',
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    email TEXT NOT NULL UNIQUE,
    reset_password_token TEXT,
    reset_password_expiration TEXT,
    salt TEXT,
    hash TEXT,
    login_attempts NUMERIC DEFAULT 0,
    lock_until TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS users_sessions (
    _order INTEGER NOT NULL,
    _parent_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    id TEXT PRIMARY KEY,
    created_at TEXT,
    expires_at TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alt TEXT,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    url TEXT,
    thumbnail_u_r_l TEXT,
    filename TEXT,
    mime_type TEXT,
    filesize NUMERIC,
    width NUMERIC,
    height NUMERIC,
    focal_x NUMERIC,
    focal_y NUMERIC
  )`,
  `CREATE TABLE IF NOT EXISTS houses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  )`,
  `CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  )`,
  `CREATE TABLE IF NOT EXISTS payload_locked_documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    global_slug TEXT,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  )`,
  `CREATE TABLE IF NOT EXISTS payload_locked_documents_rels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_col INTEGER,
    parent_id INTEGER NOT NULL REFERENCES payload_locked_documents(id) ON DELETE CASCADE,
    path TEXT NOT NULL,
    users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    media_id INTEGER REFERENCES media(id) ON DELETE CASCADE,
    houses_id INTEGER REFERENCES houses(id) ON DELETE CASCADE,
    pages_id INTEGER REFERENCES pages(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS payload_preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT,
    value TEXT,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  )`,
  `CREATE TABLE IF NOT EXISTS payload_preferences_rels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_col INTEGER,
    parent_id INTEGER NOT NULL REFERENCES payload_preferences(id) ON DELETE CASCADE,
    path TEXT NOT NULL,
    users_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS payload_migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    batch NUMERIC,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  )`,
];

try {
  const runAll = db.transaction(() => {
    for (const sql of statements) {
      db.prepare(sql).run();
    }
  });
  runAll();
  console.log('[init-db] ✅ All tables created/verified successfully');
} catch (err) {
  console.error('[init-db] ❌ Error creating tables:', err.message);
  process.exit(1);
} finally {
  db.close();
}
