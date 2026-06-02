# PP-555 · [BE][Post-Service] Implement create post

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-555        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Pond-Siritep Tongdoung |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As a backend service, implement `POST /api/v1/user/posts` so that authenticated users can create new posts with media, caption, and visibility settings.

---

## 1. Description

Implements the create post endpoint `POST /api/v1/user/posts`. Requires authentication. Validates `content`, `mediaRef`, and `visibility`. `groupOnly` visibility requires `groupId`. Initializes the post with `likeCount = 0`, `commentCount = 0`, `status = active`, `isDeleted = false`, and `_v = 1`. Emits the `post.created` Kafka event after a successful write.

---

## 2. Acceptance Criteria

### Scenario 1 — Successful post creation

- **Given:** An authenticated user sends a valid `POST /api/v1/user/posts` request
- **When:** The payload contains valid `content`, `mediaRef`, and `visibility`
- **Then:** A post document is created with initial counters set to 0, `status = active`, and the response matches the API contract

### Scenario 2 — Kafka event emitted

- **Given:** A post is successfully created
- **When:** The write to the database succeeds
- **Then:** A `post.created` Kafka event is published

### Scenario 3 — groupOnly validation

- **Given:** A user submits a post with `visibility = groupOnly`
- **When:** `groupId` is missing from the request
- **Then:** The endpoint returns a validation error

---

## 3. Definition of Done

- [ ] `POST /api/v1/user/posts` endpoint implemented with auth required
- [ ] Validates `content`, `mediaRef`, `visibility`
- [ ] `groupOnly` requires `groupId` — validated
- [ ] Post initialized: `likeCount=0`, `commentCount=0`, `status=active`, `isDeleted=false`, `_v=1`
- [ ] Response matches API contract
- [ ] `post.created` Kafka event emitted after successful write
