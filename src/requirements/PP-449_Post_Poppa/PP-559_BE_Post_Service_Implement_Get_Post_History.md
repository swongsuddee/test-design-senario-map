# PP-559 · [BE][Post-Service] Implement get post history

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-559        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Pond-Siritep Tongdoung |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As a backend service, implement `GET /api/v1/user/posts/{postId}/history` so that the post owner or allowed viewers can read the edit history of a post in chronological order.

---

## 1. Description

Implements the get post edit history endpoint `GET /api/v1/user/posts/{postId}/history`. History is edit-only (not create events). Results are queried by `postId` with page-based pagination and access is restricted to the post owner or allowed viewers. Results are sorted latest first. The response includes history entries with field-level change diffs and a full post snapshot at each edit point.

---

## 2. Acceptance Criteria

### Scenario 1 — Successful history retrieval

- **Given:** A post has been edited multiple times
- **When:** The post owner calls `GET /api/v1/user/posts/{postId}/history?page=1&limit=20`
- **Then:** A paginated list of history entries is returned sorted latest first, each with `changes` and `snapshot`

### Scenario 2 — Access control enforced

- **Given:** A user who is not the post owner or an allowed viewer
- **When:** They call the history endpoint
- **Then:** The endpoint returns a 403 or 404 error

---

## 3. Definition of Done

- [ ] `GET /api/v1/user/posts/{postId}/history` endpoint implemented
- [ ] History is edit-only (not create events)
- [ ] Query by `postId` with page-based pagination
- [ ] Owner or allowed viewer access policy enforced
- [ ] Results sorted latest first
- [ ] Response matches API contract with `changes` and `snapshot` per entry
