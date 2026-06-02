# PP-560 · [BE][Post-Service] Implement report post

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-560        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Pond-Siritep Tongdoung |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As a backend service, implement `POST /api/v1/user/posts/{postId}/report` so that users can report posts for moderation and duplicate reports from the same user are blocked.

---

## 1. Description

Implements the report post endpoint `POST /api/v1/user/posts/{postId}/report`. Persists a `postReport` document with the `postId`, `reason`, and optional `detail`. A duplicate report by the same reporter on the same post must fail (enforced by the unique index). The report is created with `status = pending` and the `post.reported` Kafka event is published after successful write.

---

## 2. Acceptance Criteria

### Scenario 1 — Successful report creation

- **Given:** An authenticated user calls `POST /api/v1/user/posts/{postId}/report` with a valid `reason`
- **When:** No prior report exists from this user for this post
- **Then:** A `postReport` document is created with `status = pending` and the response returns success

### Scenario 2 — Duplicate report blocked

- **Given:** The same user has already reported the same post
- **When:** They submit another report for the same post
- **Then:** The endpoint returns an error and no duplicate record is created

### Scenario 3 — Kafka event emitted

- **Given:** A report is successfully created
- **When:** The write succeeds
- **Then:** A `post.reported` Kafka event is published

---

## 3. Definition of Done

- [ ] `POST /api/v1/user/posts/{postId}/report` endpoint implemented
- [ ] `postReport` created with `postId`, `reason`, optional `detail`
- [ ] Report initialized with `status = pending`
- [ ] Duplicate report (same `reporterId` + `postId`) rejected by unique constraint
- [ ] `post.reported` Kafka event published after successful write
