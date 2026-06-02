@AGENTS.md

# Presentation — Single Source of Truth

The `presentation/` Next.js project is the **single source of truth** for all test design artifacts in this project. Any agent that produces requirements, diagrams, test cases, or conflict/clarification items **must write to this project** — not to separate markdown files elsewhere.

---

## Slug Rule

Convert a Jira key to a directory slug:

| Jira Key | Slug | Path |
|---|---|---|
| PP-4 | `pp4` | `src/data/pp4/` |
| PP-104 | `pp104` | `src/data/pp104/` |
| ORG-AUTH | `org-auth` | `src/data/org-auth/` |

**Formula:** lowercase → remove the `-` between `PP` and the number (e.g. `PP-4` → `pp4`). For non-PP keys keep the hyphen lowercase (e.g. `ORG-AUTH` → `org-auth`).

---

## Data File Map

| Artifact | File | Agent Responsible |
|---|---|---|
| Requirements doc | `presentation/src/requirements/{KEY}_{Slug}/` | requirement-agent |
| Flow diagrams | `presentation/src/data/{slug}/flows.ts` | explorer-agent |
| Test cases | `presentation/src/data/{slug}/testcases.ts` | qa-designer-agent |
| Conflicts & clarifications | `presentation/src/data/{slug}/conflicts.ts` | requirement-agent, reporter-agent |

> **Requirements docs** are Markdown files in `presentation/src/requirements/`. The `RequirementSection` component reads them from there. All other artifacts live in `presentation/src/data/`.

---

## TypeScript Type Reference

All types are defined in `presentation/src/types/index.ts`. Import them correctly.

### `conflicts.ts` — `ClarifyItem[]`

```typescript
import type { ClarifyItem } from '@/types';

export const CONFLICT_ITEMS: ClarifyItem[] = [
  {
    id: 'C1',                    // sequential: C1, C2… for conflicts; Q1, Q2… for questions
    type: 'conflict',            // 'conflict' | 'question' | 'suggestion'
    status: 'pending',           // 'pending' | 'on-hold' | 'resolved' | 'closed'
    title: 'Short title',
    body: 'Full description of the conflict or question.',
    resolution: 'How it was resolved.',  // omit if unresolved
    affectedTc: 'PP4-TC-001',           // omit if not applicable
    date: '2026-05-01',                  // YYYY-MM-DD, when the item was found
  },
];
```

**Status rules:**
- `pending` — awaiting answer from stakeholders
- `on-hold` — deferred (blocked, future sprint, STG not ready)
- `resolved` — answered and closed; always include `resolution`
- `closed` — suggestion type with no TC impact; always include `resolution`

**When to update:**
- requirement-agent writes initial items after `ba-analysis`
- reporter-agent appends or updates items whenever new conflicts or answers are found
- Never delete existing items — update `status` and `resolution` instead

---

### `flows.ts` — `FlowSectionDef[]`

```typescript
import type { FlowSectionDef } from '@/types';

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow',
  subtitle: 'Requirements-based',
  chart: `flowchart TD
    A([Start]) --> B[Step]`,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-login',   // must start with 'flow-'
    num: '2',
    title: 'Sub-Flow 1: Login',
    subtitle: 'Observed STG behavior',
    chart: `flowchart TD
    ...`,
    states: [['S1', 'Logged Out'], ['S2', 'Logged In']],       // optional
    transitions: [['T1', 'Submit valid credentials']],          // optional
  },
];
```

**Mermaid safety rules (mandatory):**
- Node IDs must not be Mermaid reserved words: `LINE`, `END`, `START`, `GRAPH`, `DEFAULT`, `CLASS`, `STYLE`
- Rename reserved words: `LINE` → `LINE_AUTH`, `END` → `END_STATE`
- No box-drawing characters (`──`, `│`, `┌`) inside node labels
- Use `["text"]` for labels with special characters, not `[("text")]` for non-cylinders
- No em-dashes (`—`) in edge labels; use `-` or `/` instead

---

### `testcases.ts` — `TcSectionDef[]`

```typescript
import type { TcSectionDef } from '@/types';

export const TC_SECTIONS: TcSectionDef[] = [
  {
    sectionId: 'tc-login',     // must start with 'tc-'
    num: '7',
    title: 'Test Cases · Login',
    subtitle: 'TC-001–005',
    cols: ['type', 'labels'],  // columns to show beyond id/summary/priority/auto
    rows: [
      {
        id: 'PP4-TC-001',
        summary: 'Login: happy path — valid credentials → /dashboard',
        type: 'Functional',    // 'Functional' | 'Negative' | 'Boundary' | 'Security' | 'Performance'
        priority: 'high',      // 'high' | 'medium' | 'low'
        auto: 'auto',          // 'auto' | 'partial' | 'manual' | 'no'
        labels: [['smoke', 'Smoke'], ['web-ui', 'Web UI']],
      },
    ],
  },
];
```

**`auto` values:**
- `auto` — fully automatable with Playwright / Appium
- `partial` — most steps automatable, one step requires manual action
- `manual` — cannot be automated (biometric, hardware, OAuth WebView)
- `no` — out of automation scope

**`labels` — `[string, string][]`** (CSS class, display text):
`smoke`, `regression`, `negative`, `boundary`, `state-transition`, `decision-table`, `ep`, `bva`, `mobile`, `ios-only`, `android-only`, `api`, `device-only`, `web-ui`, `st`, `dt`

---

## page.tsx Hero Stats

After writing test cases, update the hero stats in `presentation/src/app/{slug}/page.tsx`:

```tsx
{[
  ['44', 'Test Cases'],
  ['54', 'States & Transitions'],
  ['100%', 'Coverage'],
  ['37', 'Automatable'],
].map(([v, l]) => (...))}
```

Update the numbers to match your actual TC count and automatable count.

---

## Layout NAV

After adding a new flow section, add its anchor link to `presentation/src/app/{slug}/layout.tsx` under the Diagrams section:

```typescript
{ href: '#flow-login', label: 'Sub-Flow 1: Login' },
```

After adding a new TC section, add its anchor link under Test Cases:

```typescript
{ href: '#tc-login', label: 'Login' },
```

---

## Do NOT write

- `.agents/review-notes/req-clarify/*.md` — deleted; use `conflicts.ts` instead
- `src/test-design/*.design.md` — use `testcases.ts` instead as the canonical record
- `src/test-design/*.diagram.md` — use `flows.ts` instead as the canonical record

Intermediate scratch files during exploration or analysis are acceptable in `presentation/src/test-design/` but the canonical output always goes to `presentation/src/data/{slug}/`.
