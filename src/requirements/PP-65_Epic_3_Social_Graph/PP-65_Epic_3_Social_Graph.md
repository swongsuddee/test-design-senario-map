# PP-65 · Epic 3 — Social Graph

| Field        | Value                            |
|--------------|----------------------------------|
| **Key**      | PP-65                            |
| **Type**     | Story                            |
| **Project**  | POPPA                            |
| **Status**   | Ready To Test STG                |
| **Assignee** | Famp-Visarut Phaisarnwattanakarn |

---

## User Story

> ระบบ Follow / Unfollow เพื่อสร้าง Social Network ระหว่าง users รองรับทั้ง followers list, blocking และ user suggestions

---

## 1. Description

**Service:** User Service `:50051`
**Depends on:** Notification Service `:50055`
**Event Bus:** Kafka — topic `user.followed` → Notification Service

### Data Design (MongoDB)

```js
// collection: follows
{
  follower_id:  ObjectId,   // ผู้ที่กด follow
  following_id: ObjectId,   // ผู้ที่ถูก follow
  created_at:   Date
}
```

> `followers_count` และ `following_count` เก็บ denormalized ใน `users` document เพื่อลด query overhead

### Stories in Scope

| Story | ชื่อ | Kafka Event | หมายเหตุ |
|-------|------|-------------|---------|
| 3.1 | Follow User | `user.followed` | notify ถูก follow |
| 3.2 | Unfollow User | — | — |
| 3.3 | Followers List | — | paginated |
| 3.4 | Following List | — | paginated |
| 3.5 | Block User | — | mutual block |

---

## 2. Technical Acceptance Criteria

### Scenario 1 — Follow / Unfollow

- **AC 1.1:** เพิ่ม follow relationship สำเร็จ + `followers_count` ของ target อัปเดตทันที
- **AC 1.2:** publish Kafka event `user.followed` → Notification Service แจ้งเตือนฝั่งถูก follow
- **AC 1.3:** Unfollow ลบ relationship และ `followers_count` อัปเดตทันที

### Scenario 2 — Lists

- **AC 2.1:** Followers List และ Following List รองรับ pagination
- **AC 2.2:** แต่ละรายการแสดง avatar, display name, follow status

### Scenario 3 — Block User

- **AC 3.1:** blocked user ไม่สามารถดู profile หรือ post ของผู้ block ได้
- **AC 3.2:** ผู้ block ไม่เห็น content ของ blocked user เช่นกัน (mutual block)

---

## 3. Definition of Done

- [ ] Follow / Unfollow ทำงานถูกต้อง + Kafka event emit
- [ ] Followers / Following List ทำงานพร้อม pagination
- [ ] Block User — mutual hide content ทำงานถูกต้อง

---

## 4. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-203](./PP-203_BE_Design_Architecture_Social_Graph.md) | [BE][User-Docs] Design Architecture, Flow, Data Schema | Ready To Test STG |
| [PP-67](./PP-67_BE_Follow_User.md) | [BE][User-Service] Follow User | Ready To Test STG |
| [PP-68](./PP-68_BE_Unfollow_User.md) | [BE][User-Service] Unfollow User | Ready To Test STG |
| [PP-69](./PP-69_BE_Followers_List.md) | [BE][User-Service] Followers List | Ready To Test STG |
| [PP-70](./PP-70_BE_Following_List.md) | [BE][User-Service] Following List | Ready To Test STG |
| [PP-71](./PP-71_BE_Block_User.md) | [BE][User-Service] Block User | Ready To Test STG |

> Flow diagram → [PP-65.diagram.md](../../test-design/PP-65.diagram.md)
> Test design → [PP-65.design.md](../../test-design/PP-65.design.md)
