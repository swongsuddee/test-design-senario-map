# PP-558 · [BE][Post-Service] Implement delete post

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-558        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Pond-Siritep Tongdoung |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As a backend service, implement `DELETE /api/v1/user/posts/{postId}` so that post owners can soft-delete their posts with the deletion tracked and a Kafka event published.

---

## 1. Description

Implements the soft-delete post endpoint `DELETE /api/v1/user/posts/{postId}`. Requires authentication and is restricted to the post owner. Sets `status = deleted` and `isDeleted = true`, updates `updatedAt`, increments `_v`, and emits the `post.deleted` Kafka event after a successful write. No physical document removal occurs.

---

## 2. Acceptance Criteria

### Scenario 1 — Successful soft delete by owner

- **Given:** An authenticated post owner calls `DELETE /api/v1/user/posts/{postId}`
- **When:** The request is processed
- **Then:** The post has `status = deleted`, `isDeleted = true`, `updatedAt` and `_v` updated, and the response returns `{ status: { code: 0 } }`

### Scenario 2 — Non-owner delete rejected

- **Given:** An authenticated user who does not own the post
- **When:** They call `DELETE /api/v1/user/posts/{postId}`
- **Then:** The endpoint returns a 403 Forbidden error

### Scenario 3 — Kafka event emitted

- **Given:** A post soft delete write succeeds
- **When:** The database update completes
- **Then:** A `post.deleted` Kafka event is published

---

## 3. Definition of Done

- [ ] `DELETE /api/v1/user/posts/{postId}` endpoint implemented with auth required
- [ ] Owner-only access enforced
- [ ] `status = deleted` and `isDeleted = true` set on the document
- [ ] `updatedAt` updated and `_v` incremented
- [ ] Response matches API contract `{ status: { code: 0 } }`
- [ ] `post.deleted` Kafka event emitted after successful write
