# PP-564 · [BE][Like-Service] Implement delayed/batch reconcile like count

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-564        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Ohm-Phakorn.s |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As a backend service, implement a delayed batch reconcile job so that `likeCount` on posts stays consistent with the `like` collection as the authoritative source of truth.

---

## 1. Description

Implements a periodic reconcile job that reads the dirty `targetId` set from Redis, counts the true like count from the `like` collection, bulk updates `{targetType}.likeCount` on the corresponding documents, and removes the synced `targetId` entries from the Redis dirty set. The `like` collection is the source of truth; Redis is used as a write-through cache for performance. This reconcile path is the eventual consistency repair mechanism.

---

## 2. Acceptance Criteria

### Scenario 1 — Batch reconcile syncs dirty posts

- **Given:** Several `postId` values are in the Redis dirty set due to recent likes/unlikes
- **When:** The reconcile job runs
- **Then:** Each dirty post's `likeCount` is updated to match the count from the `like` collection, and the `postId` values are removed from the dirty set

### Scenario 2 — Multiple dirty targets handled in one batch

- **Given:** Multiple `targetId` values are in the dirty set
- **When:** The reconcile job runs
- **Then:** All dirty targets are processed in a single batch execution without multiple separate passes

---

## 3. Definition of Done

- [ ] Periodic reconcile job implemented
- [ ] Dirty `targetId` set fetched from Redis
- [ ] True like count queried from `like` collection per dirty target
- [ ] `{targetType}.likeCount` bulk updated on matching documents
- [ ] Synced `targetId` entries removed from Redis dirty set after update
- [ ] Multiple dirty targets handled in one batch
- [ ] `like` collection is the source of truth for count reconciliation
