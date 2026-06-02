# PP-483 · [MB][End-User] AC 2.2 Input validation + optimistic prepend + double-submit guard

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-483                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> End-User กดส่ง Comment แล้วเห็น Comment ขึ้นทันที (Optimistic UI) พร้อม Validation กั้นข้อความว่างและ Double-submit

---

## 1. Description

Implement Input Validation บน Mobile App ป้องกันการส่ง Comment ที่ว่าง, Optimistic Prepend แสดง Comment บน List ทันทีก่อน API Response, และ Double-submit Guard ป้องกันการส่งซ้ำ

---

## 2. Acceptance Criteria

### Scenario 1 — Empty Submit Guard

- **Given:** End-User ไม่ได้พิมพ์ข้อความ
- **When:** กดปุ่ม Send
- **Then:** ปุ่ม Send ไม่ทำงาน (Disabled) หรือแสดง Validation Message

### Scenario 2 — Optimistic Prepend

- **Given:** End-User พิมพ์ข้อความและกด Send
- **When:** กดปุ่ม Send
- **Then:** Comment ของ User ปรากฏที่ด้านบนสุดของ List ทันทีก่อน API Response

### Scenario 3 — API Error Rollback

- **Given:** Comment ถูก Optimistically แสดงแล้ว
- **When:** API Return Error
- **Then:** Comment ถูกลบออกจาก List และแสดง Error Message ให้ User ลองใหม่

### Scenario 4 — Double-submit Guard

- **Given:** End-User กด Send แล้ว
- **When:** กด Send อีกครั้งก่อน API Response
- **Then:** ไม่มีการส่ง Request ซ้ำ

---

## 3. Definition of Done

- [ ] ปุ่ม Send Disabled เมื่อ Input ว่าง
- [ ] Optimistic Prepend แสดง Comment ทันที
- [ ] Rollback เมื่อ API Error
- [ ] Double-submit Guard ทำงาน
