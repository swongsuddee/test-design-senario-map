# Test Design Portal

A Next.js app for viewing and reviewing QA test design artifacts — requirements, flows, test cases, and scenario maps. Serves as a single source of truth for a project's test design, with a built-in review workflow backed by a local SQLite database.

## Prerequisites

- Node.js 18+
- npm (or pnpm / yarn / bun)

## Run

There is **one process** — Next.js serves both the API routes (server) and the React UI (client) together.

```bash
# Install dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

---

## Adding data for a new story

### 1. Create the page

Add a route under `src/app/{slug}/` with `page.tsx` and `layout.tsx`. The slug convention is the Jira key lowercased with the hyphen removed (`PP-42` → `pp42`; `ORG-AUTH` → `org-auth`).

### 2. Write a seed file

Create `db/seed-{slug}.sql` with `INSERT OR IGNORE` statements for all story data. The seed is auto-loaded on first startup — no manual migration needed.

Key tables to populate:

| Table | Purpose |
|---|---|
| `story` | Story ID, slug, title, href |
| `story_hero` | Hero section badge and description text |
| `story_hero_stat` | Hero stat cards (test count, coverage %, etc.) |
| `story_meta` | Meta card grid (platform, framework, status, etc.) |
| `story_technique` | Technique selection table |
| `story_coverage_row` | Coverage summary table rows |
| `story_coverage_stat` | Coverage stat cards |
| `story_coverage_note` | Coverage subtitle, totals, recommendation |
| `story_missing_coverage` | Uncovered state/transition notes |
| `story_test_data` | Test data requirements table |
| `story_automation_card` | Automation notes cards |
| `story_automation_item` | Items within automation cards (supports HTML) |
| `story_contract_endpoint` | API contract endpoint table |
| `story_scenario_section` | Scenario map section metadata |

End every seed file with:
```sql
INSERT OR IGNORE INTO story_seed (story_id) VALUES ('YOUR-STORY-ID');
```

### 3. Add TypeScript data files (flows + scenario maps)

Create `src/data/{slug}/` with:

| File | Contents |
|---|---|
| `flows.ts` | `MASTER_FLOW_SECTION` + `FLOW_SECTIONS` (Mermaid charts) |
| `testcases.ts` | `TC_SECTIONS` (test case rows) |
| `conflicts.ts` | `CONFLICT_ITEMS` (clarifications) |
| `phone.ts`, `otp.ts`, … | DAG nodes, edges, scenarios per module |

### 4. Register the story

Add an entry to `src/data/stories.ts` so it appears in the home page navigation.

### 5. Add a requirements doc

Drop a Markdown file under `src/requirements/{KEY}_{Slug}/` — the `RequirementSection` component renders it automatically.

---

## MCP Server (Claude Code integration)

The `mcp/` folder contains an MCP server that lets Claude review test cases directly — no copy-paste JSON needed.

### Setup

```bash
cd mcp
npm install

# Register with Claude Code (once, survives restarts)
claude mcp add --scope user test-design-portal -- node /absolute/path/to/mcp/index.mjs
```

### Usage

1. Start the Next.js app (`npm run dev`) — the MCP server calls it at `http://localhost:3000`
2. Ask Claude: *"Review the test cases for STORY-123"* — it will call `list_test_cases`, `set_review`, `add_comment` automatically

Available tools: `list_stories` · `list_test_cases` · `get_review_state` · `set_review` · `add_comment` · `set_rejection`

Override the base URL: `POPPA_URL=http://localhost:3001 node mcp/index.mjs`

---

## Project structure

```
src/
├── app/                  # Next.js routes (pages + API handlers)
│   └── api/              #   /api/reviews  /api/comments  /api/testcases
├── client/
│   ├── components/       # React UI components (FlowSection, ScenarioSection, …)
│   └── hooks/            # React hooks (useReviews)
├── db/
│   ├── client.ts         # sql.js (WASM SQLite) — schema + seed auto-loader
│   └── queries/
│       └── story.ts      # Typed query functions for all story page data
├── data/                 # Per-story TypeScript artifacts (flows, test cases, scenario maps)
├── requirements/         # Markdown requirement docs
└── types/                # Shared TypeScript types
db/
└── seed-{slug}.sql       # One SQL seed file per story — idempotent, auto-loaded
```

**Database:** Uses [sql.js](https://github.com/sql-js/sql.js) (SQLite compiled to WASM). Data persists to `db/reviews.db` on disk. Story data is seeded once from `db/seed-*.sql` files; user interactions (reviews, comments, rejections) are persisted across restarts.
