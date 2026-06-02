# PP-553 · [BE][Post-Service] Implement post domain schema and indexes

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-553        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Pond-Siritep Tongdoung |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> Define and migrate the MongoDB models and indexes for the post domain so that all post-related operations have a correct and performant data foundation.

---

## 1. Description

Creates the core MongoDB models for the post domain: `posts`, `postHistory`, and `postReport`. Adds `Post.status` with values `active | hidden | deleted`, keeping `visibility` separate from `status`. Required indexes are created for post history and report queries, including a unique constraint on `(postId, reporterId)` to prevent duplicate reports.

---

## 2. Acceptance Criteria

### Scenario 1 — Schema fields match design doc

- **Given:** The models are deployed to the database
- **When:** A `posts` document is inspected
- **Then:** All required fields match the RFC design doc and `status = deleted` is aligned with `isDeleted = true`

### Scenario 2 — Duplicate report constraint enforced

- **Given:** A user has already reported a post
- **When:** The same user attempts to report the same post again
- **Then:** The database rejects the duplicate with a unique constraint error

### Scenario 3 — Required indexes exist

- **Given:** The migration has run
- **When:** The indexes on `postHistory` and `postReport` are inspected
- **Then:** All required compound indexes are present as specified

---

## 3. Definition of Done

- [ ] `posts` model created with `status = active | hidden | deleted`
- [ ] `postHistory` model created
- [ ] `postReport` model created
- [ ] `visibility` field separate from `status`
- [ ] Index: `postHistory (postId, createdAt desc)`
- [ ] Index: `postReport (postId, createdAt desc)`
- [ ] Index: `postReport (reporterId, createdAt desc)`
- [ ] Index: `postReport (status, createdAt desc)`
- [ ] Unique index: `postReport (postId, reporterId)`
- [ ] Schema fields match design doc
- [ ] `status = deleted` aligned with `isDeleted = true`
