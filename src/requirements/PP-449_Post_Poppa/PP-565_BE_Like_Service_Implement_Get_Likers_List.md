# PP-565 · [BE][Like-Service] Implement get likers list

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-565        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Ohm-Phakorn.s |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As a backend service, implement the get likers list endpoint so that clients can retrieve a paginated list of users who have liked a specific post.

---

## 1. Description

Implements the get likers list endpoint for a post. Queries the `like` collection by `userId + targetId + targetType` and returns a page-based paginated list of users who have liked the target post.

---

## 2. Acceptance Criteria

### Scenario 1 — Successful likers list retrieval

- **Given:** Several users have liked a post
- **When:** A client calls the get likers list endpoint for that post
- **Then:** A paginated list of liker user records is returned with correct pagination metadata

### Scenario 2 — Empty list when no likes

- **Given:** A post has no likes
- **When:** A client calls the get likers list endpoint
- **Then:** An empty data array is returned with `total = 0`

---

## 3. Definition of Done

- [ ] Get likers list endpoint implemented
- [ ] Queries `like` collection by `userId + targetId + targetType`
- [ ] Page-based pagination implemented with `page/limit/total/totalPages`
- [ ] Response matches standard `status + data + pagination` shape
- [ ] Empty list handled correctly when no likes exist
