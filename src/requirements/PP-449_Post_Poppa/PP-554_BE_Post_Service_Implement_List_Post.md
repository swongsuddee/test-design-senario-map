# PP-554 · [BE][Post-Service] Implement list post

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-554        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Pond-Siritep Tongdoung |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As a backend service, implement `GET /api/v1/user/posts` so that clients can retrieve a paginated list of posts filtered by author, group, and visibility with the current user's like state attached.

---

## 1. Description

Implements the list post endpoint `GET /api/v1/user/posts` with page-based pagination. The endpoint applies `status` and `visibility` filters, supports query parameters `page`, `limit`, `authorId`, `groupId`, and `visibility`, and attaches `isLiked` for the current authenticated user. The response follows the standard `status + data + pagination` shape with `page/limit/total/totalPages`.

---

## 2. Acceptance Criteria

### Scenario 1 — Successful paginated list

- **Given:** Posts exist in the database
- **When:** A client calls `GET /api/v1/user/posts?page=1&limit=20`
- **Then:** The response contains a list of posts with pagination metadata (`page`, `limit`, `total`, `totalPages`) and each post has `isLiked` set for the current user

### Scenario 2 — Visibility and status filters applied

- **Given:** Posts with different visibility and status values exist
- **When:** A client filters by `visibility=public`
- **Then:** Only posts matching `visibility=public` and `status=active` are returned

---

## 3. Definition of Done

- [ ] `GET /api/v1/user/posts` endpoint implemented
- [ ] Page-based pagination with `page/limit/total/totalPages`
- [ ] `status` and `visibility` filters applied
- [ ] Query params `page`, `limit`, `authorId`, `groupId`, `visibility` supported
- [ ] `isLiked` field attached for current user on each post
- [ ] Response shape matches: `status + data + pagination`
