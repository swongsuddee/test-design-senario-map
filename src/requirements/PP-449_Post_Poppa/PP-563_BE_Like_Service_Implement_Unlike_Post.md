# PP-563 · [BE][Like-Service] Implement unlike post

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-563        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Ohm-Phakorn.s |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As a backend service, implement the unlike post endpoint so that users can remove their like from a post with idempotent behavior and Redis counters are decremented correctly.

---

## 1. Description

Implements the unlike post operation. A rate limit is applied per `userId + targetId + targetType`. The service looks up the `likePost` record by `(userId, targetId, targetType)`; if no like state exists, it is a no-op success. If the state changes, the `{targetType}.unliked` Kafka event is published. On unlike, Redis is updated: `DECR like:{targetType}:count:{postId}`, `SADD like:{targetType}:count:dirty {postId}`, and `SREM like:{targetType}:{userId} {postId}`.

---

## 2. Acceptance Criteria

### Scenario 1 — Unlike a post

- **Given:** An authenticated user who has previously liked a post sends an unlike request
- **When:** The unlike is processed
- **Then:** The `likePost` record is deleted, Redis counters are updated, `{targetType}.unliked` is published, and the response returns `{ liked: false }`

### Scenario 2 — Idempotent unlike when not liked

- **Given:** The user has not liked the post
- **When:** They send an unlike request
- **Then:** The operation is a no-op and returns success without any state change or event

### Scenario 3 — Concurrent unlike requests return final state safely

- **Given:** Multiple simultaneous unlike requests arrive for the same user and post
- **When:** They are processed
- **Then:** The final state is correct and no errors occur

---

## 3. Definition of Done

- [ ] Unlike post endpoint implemented with rate limit per `userId + targetId + targetType`
- [ ] Lookup `likePost` by `(userId, targetId, targetType)` before delete
- [ ] Missing like state treated as no-op success
- [ ] `likePost` record deleted only when state changes
- [ ] Redis updated on unlike: DECR count, SADD dirty set, SREM user set
- [ ] `{targetType}.unliked` Kafka event published only when state changes
- [ ] Response: `{ liked: false }`
- [ ] Concurrent duplicate unlike requests return final state safely
