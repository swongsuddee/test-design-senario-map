# PP-562 · [BE][Like-Service] Implement like post

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-562        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Ohm-Phakorn.s |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As a backend service, implement the like post endpoint so that users can like a post with idempotent behavior and like counts are updated in Redis for eventual consistency.

---

## 1. Description

Implements the like post operation. A rate limit is applied per `userId + targetId + targetType`. The service looks up the `likePost` record by `(userId, targetId, targetType)`; if the like state already exists, it is a no-op success. If the state changes, the `{targetType}.liked` Kafka event is published. On a new like, Redis is updated: `INCR like:{targetType}:count:{postId}`, `SADD like:{targetType}:count:dirty {postId}`, and `SADD like:{targetType}:{userId} {postId}`. A notification side effect is triggered.

---

## 2. Acceptance Criteria

### Scenario 1 — Like a post

- **Given:** An authenticated user sends a like request with `targetId`
- **When:** The user has not previously liked this post
- **Then:** A `likePost` record is created, Redis counters are updated, `{targetType}.liked` is published, and the response returns `{ liked: true }`

### Scenario 2 — Idempotent duplicate like

- **Given:** The user has already liked the post
- **When:** They send another like request for the same post
- **Then:** The operation is a no-op and returns success without creating a duplicate record

### Scenario 3 — Concurrent duplicates do not create duplicate rows

- **Given:** Multiple simultaneous like requests arrive for the same user and post
- **When:** They are processed concurrently
- **Then:** Only one `likePost` record is created

---

## 3. Definition of Done

- [ ] Like post endpoint implemented with rate limit per `userId + targetId + targetType`
- [ ] Lookup `likePost` by `(userId, targetId, targetType)` before write
- [ ] Existing like state treated as no-op success
- [ ] Redis updated on new like: INCR count, SADD dirty set, SADD user set
- [ ] `{targetType}.liked` Kafka event published only when state changes
- [ ] Notification side effect triggered
- [ ] Response: `{ liked: true }`
- [ ] Concurrent duplicate requests do not create duplicate rows
