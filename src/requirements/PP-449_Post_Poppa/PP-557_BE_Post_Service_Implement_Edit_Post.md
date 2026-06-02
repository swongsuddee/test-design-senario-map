# PP-557 · [BE][Post-Service] Implement edit post

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-557        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Pond-Siritep Tongdoung |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As a backend service, implement `PATCH /api/v1/user/posts/{postId}` so that post owners can update their post content, media, or visibility with full edit history tracked.

---

## 1. Description

Implements the edit post endpoint `PATCH /api/v1/user/posts/{postId}`. Requires authentication and is restricted to the post owner. Validates the patch payload, updates the post, sets `isEdited = true`, increments `_v`, inserts a `postHistory` snapshot with the field-level changes, and emits the `post.updated` Kafka event after a successful write.

---

## 2. Acceptance Criteria

### Scenario 1 — Successful edit by owner

- **Given:** An authenticated post owner sends a valid `PATCH /api/v1/user/posts/{postId}` request
- **When:** The payload contains valid updated fields
- **Then:** The post is updated, `isEdited = true`, `_v` is incremented, a `postHistory` entry is created, and the response matches the API contract

### Scenario 2 — Non-owner edit rejected

- **Given:** An authenticated user who does not own the post
- **When:** They send a `PATCH /api/v1/user/posts/{postId}` request
- **Then:** The endpoint returns a 403 Forbidden error

### Scenario 3 — Kafka event emitted

- **Given:** A post edit write succeeds
- **When:** The database update completes
- **Then:** A `post.updated` Kafka event is published

---

## 3. Definition of Done

- [ ] `PATCH /api/v1/user/posts/{postId}` endpoint implemented with auth required
- [ ] Owner-only access enforced
- [ ] Patch payload validated
- [ ] Post updated: `isEdited = true`, `_v` incremented
- [ ] `postHistory` snapshot with field-level changes inserted
- [ ] Response matches API contract
- [ ] `post.updated` Kafka event emitted after successful write
