# PP-472 · [BE] proto/RPC CreateComment/ListComments/ListReplies/Update/Delete (targetType=event)

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-472                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> Backend มี gRPC Proto และ RPC Methods ครบสำหรับ Comment Operations บน targetType=event

---

## 1. Description

Implement gRPC Proto Definitions และ RPC Methods สำหรับ Comment Service ได้แก่ CreateComment, ListComments, ListReplies, UpdateComment, DeleteComment โดยระบุ `targetType=event` ในทุก Request

---

## 2. Acceptance Criteria

### Scenario 1 — Proto Definitions

- **Given:** comment.proto ถูกสร้าง
- **When:** Generate Code จาก Proto
- **Then:** RPC Stubs ครบทุก Method (Create/List/ListReplies/Update/Delete)

### Scenario 2 — CreateComment RPC

- **Given:** Client ส่ง CreateComment Request พร้อม targetId, targetType=event, content
- **When:** RPC ถูกเรียก
- **Then:** Comment ถูกบันทึกและ Return Comment Object

### Scenario 3 — ListComments RPC

- **Given:** Client ส่ง ListComments Request พร้อม targetId
- **When:** RPC ถูกเรียก
- **Then:** Return รายการ Comment Newest-first พร้อม Pagination Token

---

## 3. Definition of Done

- [ ] Proto File กำหนด RPC ครบทุก Method
- [ ] CreateComment RPC ทำงานถูกต้อง
- [ ] ListComments RPC ทำงานพร้อม Pagination
- [ ] ListReplies, UpdateComment, DeleteComment RPCs ทำงานได้
