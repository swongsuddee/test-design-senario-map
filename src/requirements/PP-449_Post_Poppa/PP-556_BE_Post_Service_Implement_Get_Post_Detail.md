# PP-556 · [BE][Post-Service] Implement get post detail

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-556        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Pond-Siritep Tongdoung |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As a backend service, implement `GET /api/v1/user/posts/{postId}` so that clients can retrieve the full detail of a single post with visibility and deletion policy enforced.

---

## 1. Description

Implements the get post detail endpoint `GET /api/v1/user/posts/{postId}`. Loads the post by `postId`, checks `status` (hidden/deleted posts are not returned to unauthorized viewers), checks `visibility`, and attaches `isLiked` for the current authenticated user. The response matches the standard API contract.

---

## 2. Acceptance Criteria

### Scenario 1 — Successful post detail retrieval

- **Given:** A post with `status = active` and `visibility = public` exists
- **When:** A client calls `GET /api/v1/user/posts/{postId}`
- **Then:** The full post detail is returned including `isLiked` for the current user

### Scenario 2 — Hidden/deleted visibility policy enforced

- **Given:** A post with `status = deleted` exists
- **When:** A non-owner calls `GET /api/v1/user/posts/{postId}`
- **Then:** The endpoint returns a 404 or appropriate error, not the post data

---

## 3. Definition of Done

- [ ] `GET /api/v1/user/posts/{postId}` endpoint implemented
- [ ] Post loaded by `postId`
- [ ] `status` checked — hidden/deleted policy enforced
- [ ] `visibility` checked
- [ ] `isLiked` attached for current user
- [ ] Response matches API contract
