# DB Schema Draft

Covers: story (card details), conflicts, test cases, test steps.

## ER Diagram

```mermaid
erDiagram
    STORY {
        TEXT id PK "PP-2, ORG-AUTH"
        TEXT slug UK "pp2, org-auth"
        TEXT title
        TEXT href
        INT  pending
    }

    TC_SECTION {
        TEXT id PK "tc-login, tc-phone"
        TEXT story_id FK
        TEXT num "1, 2, 3 for TOC"
        TEXT title
        TEXT subtitle
        TEXT cols_json "JSON: module|type|labels"
        INT  sort_order
    }

    TEST_CASE {
        TEXT    id PK "PP2-TC-001"
        TEXT    section_id FK
        TEXT    story_id FK "denorm for fast query"
        BOOL    is_new
        TEXT    module "Google, LINE, Apple"
        TEXT    summary
        TEXT    type "Functional|Negative|Boundary|Security|Performance"
        TEXT    priority "high|medium|low"
        TEXT    auto "auto|partial|manual|no"
        INT     sort_order
    }

    TC_LABEL {
        INT  id PK
        TEXT tc_id FK
        TEXT cls "smoke, ep, bva, mobile, …"
        TEXT label "Smoke, EP, BVA, Mobile, …"
        INT  sort_order
    }

    CONFLICT {
        TEXT id PK "C1, Q1, S1"
        TEXT story_id FK
        TEXT type "conflict|question|suggestion"
        TEXT status "pending|on-hold|resolved|closed"
        TEXT title
        TEXT body
        TEXT resolution
        TEXT date "YYYY-MM-DD"
        INT  sort_order
    }

    CONFLICT_TC {
        TEXT conflict_id FK
        TEXT tc_id FK
    }

    SCENARIO_MAP {
        TEXT id PK "pp2-phone, pp2-otp"
        TEXT story_id FK
        TEXT name "Phone Login, OTP"
        INT  sort_order
    }

    DAG_NODE {
        TEXT id PK "pp2-phone::S33"
        TEXT map_id FK
        TEXT node_id "S33, N1, PL1"
        INT  col
        INT  row
        TEXT name "App Launch"
        TEXT type "action|decision|expect"
        TEXT shape "round|rect"
        TEXT details
    }

    DAG_EDGE {
        INT  id PK
        TEXT map_id FK
        TEXT from_node
        TEXT to_node
        TEXT label "Valid, None, Exists"
    }

    SCENARIO {
        TEXT id PK "pp2-phone::PP2-TC-031"
        TEXT map_id FK
        TEXT tc_id FK
        TEXT name
        TEXT type "Functional|Manual"
        TEXT type_cls "smoke|high|manual"
        TEXT active_path_json "JSON string[] node IDs"
        TEXT active_edges_json "JSON [string,string][] pairs"
    }

    TEST_STEP {
        INT  id PK
        TEXT scenario_id FK
        TEXT action
        TEXT data
        TEXT expect
        INT  sort_order
    }

    TC_REVIEW {
        TEXT story_id FK
        TEXT tc_id FK
        TEXT review_type "reviewed|codex|implemented|testrun|rejected"
    }

    TC_COMMENT {
        INT  id PK
        TEXT story_id FK
        TEXT tc_id FK
        TEXT author "Me, GPT"
        TEXT content
        TEXT created_at
        TEXT updated_at
    }

    TC_REJECTION {
        TEXT story_id FK
        TEXT tc_id FK
        TEXT reason
        TEXT updated_at
    }

    STORY         ||--o{ TC_SECTION    : "organises"
    STORY         ||--o{ CONFLICT      : "raises"
    STORY         ||--o{ SCENARIO_MAP  : "defines"

    TC_SECTION    ||--o{ TEST_CASE     : "contains"
    TEST_CASE     ||--o{ TC_LABEL      : "tagged with"
    TEST_CASE     ||--o{ TC_REVIEW     : "flagged by"
    TEST_CASE     ||--o{ TC_COMMENT    : "discussed in"
    TEST_CASE     ||--o| TC_REJECTION  : "rejected via"

    CONFLICT      ||--o{ CONFLICT_TC   : "links"
    CONFLICT_TC   }o--|| TEST_CASE     : "references"

    SCENARIO_MAP  ||--o{ DAG_NODE      : "has node"
    SCENARIO_MAP  ||--o{ DAG_EDGE      : "has edge"
    SCENARIO_MAP  ||--o{ SCENARIO      : "has scenario"

    SCENARIO      ||--o{ TEST_STEP     : "walks through"
    SCENARIO      }o--|| TEST_CASE     : "exercises"
```

## Tables

### `story`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT PK | Jira key: `PP-2`, `ORG-AUTH` |
| `slug` | TEXT UNIQUE | URL slug: `pp2`, `org-auth` |
| `title` | TEXT | Display title |
| `href` | TEXT | Path: `/pp2` |
| `pending` | INT | Count of pending items |

---

### `tc_section`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT PK | `tc-login`, `tc-phone` |
| `story_id` | TEXT FK → story | |
| `num` | TEXT | TOC number: `1`, `2` |
| `title` | TEXT | |
| `subtitle` | TEXT | |
| `cols_json` | TEXT | JSON array: `["module","type","labels"]` |
| `sort_order` | INT | |

---

### `test_case`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT PK | `PP2-TC-001` |
| `section_id` | TEXT FK → tc_section | |
| `story_id` | TEXT FK → story | Denorm for fast query |
| `is_new` | BOOL | ▲ New indicator |
| `module` | TEXT | `Google`, `LINE`, `Apple` |
| `summary` | TEXT | Full description |
| `type` | TEXT | `Functional\|Negative\|Boundary\|Security\|Performance` |
| `priority` | TEXT | `high\|medium\|low` |
| `auto` | TEXT | `auto\|partial\|manual\|no` |
| `sort_order` | INT | |

---

### `tc_label`
| Column | Type | Notes |
|--------|------|-------|
| `id` | INT PK | |
| `tc_id` | TEXT FK → test_case | |
| `cls` | TEXT | CSS class: `smoke`, `ep`, `bva` |
| `label` | TEXT | Display: `Smoke`, `EP`, `BVA` |
| `sort_order` | INT | |

---

### `conflict`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT PK | `C1`, `Q1`, `S1` |
| `story_id` | TEXT FK → story | |
| `type` | TEXT | `conflict\|question\|suggestion` |
| `status` | TEXT | `pending\|on-hold\|resolved\|closed` |
| `title` | TEXT | |
| `body` | TEXT | Full description |
| `resolution` | TEXT | Null if unresolved |
| `date` | TEXT | `YYYY-MM-DD` |
| `sort_order` | INT | |

---

### `conflict_tc` *(junction)*
| Column | Type | Notes |
|--------|------|-------|
| `conflict_id` | TEXT FK → conflict | |
| `tc_id` | TEXT FK → test_case | |

PK: `(conflict_id, tc_id)`

---

### `scenario_map`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT PK | `pp2-phone`, `pp2-otp` |
| `story_id` | TEXT FK → story | |
| `name` | TEXT | `Phone Login`, `OTP` |
| `sort_order` | INT | |

---

### `dag_node`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT PK | `pp2-phone::S33` |
| `map_id` | TEXT FK → scenario_map | |
| `node_id` | TEXT | `S33`, `N1`, `PL1` |
| `col` | INT | Grid column |
| `row` | INT | Grid row |
| `name` | TEXT | May contain `\n` |
| `type` | TEXT | `action\|decision\|expect` |
| `shape` | TEXT | `round\|rect` |
| `details` | TEXT | |

---

### `dag_edge`
| Column | Type | Notes |
|--------|------|-------|
| `id` | INT PK | |
| `map_id` | TEXT FK → scenario_map | |
| `from_node` | TEXT | Node ID |
| `to_node` | TEXT | Node ID |
| `label` | TEXT | `Valid`, `None`, `Exists` |

---

### `scenario`
| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT PK | `pp2-phone::PP2-TC-031` |
| `map_id` | TEXT FK → scenario_map | |
| `tc_id` | TEXT FK → test_case | |
| `name` | TEXT | |
| `type` | TEXT | `Functional\|Manual` |
| `type_cls` | TEXT | CSS: `smoke\|high\|manual` |
| `active_path_json` | TEXT | JSON `string[]` — node IDs to highlight |
| `active_edges_json` | TEXT | JSON `[string,string][]` — edge pairs to highlight |

---

### `test_step`
| Column | Type | Notes |
|--------|------|-------|
| `id` | INT PK | |
| `scenario_id` | TEXT FK → scenario | |
| `action` | TEXT | Step action |
| `data` | TEXT | Test data / condition |
| `expect` | TEXT | Expected result |
| `sort_order` | INT | |

---

### `tc_review` *(existing, unchanged)*
| Column | Type | Notes |
|--------|------|-------|
| `story_id` | TEXT FK → story | |
| `tc_id` | TEXT FK → test_case | |
| `review_type` | TEXT | `reviewed\|codex\|implemented\|testrun\|rejected` |

PK: `(story_id, tc_id, review_type)`

---

### `tc_comment` *(existing, unchanged)*
| Column | Type | Notes |
|--------|------|-------|
| `id` | INT PK | |
| `story_id` | TEXT FK → story | |
| `tc_id` | TEXT FK → test_case | |
| `author` | TEXT | `Me`, `GPT` |
| `content` | TEXT | |
| `created_at` | TEXT | `datetime('now')` |
| `updated_at` | TEXT | `datetime('now')` |

---

### `tc_rejection` *(existing, unchanged)*
| Column | Type | Notes |
|--------|------|-------|
| `story_id` | TEXT FK → story | |
| `tc_id` | TEXT FK → test_case | |
| `reason` | TEXT | |
| `updated_at` | TEXT | `datetime('now')` |

PK: `(story_id, tc_id)`

---

## Design Notes

- `story_id` is denormalized onto `test_case` to avoid a join through `tc_section` on every review query.
- `tc_label` is a proper table (not JSON) so labels are filterable and queryable.
- `conflict_tc` is a many-to-many junction replacing the old `affectedTc` free-text field.
- `dag_node.id` and `scenario.id` use composite string keys (`map_id::local_id`) to stay human-readable without a surrogate.
- Flow sections (Mermaid chart strings, state/transition label lists) are intentionally excluded — they are render-only and have no edit path.
