# PP-475 · [BE] Validation: trim, content 1-1000 chars, reject empty, double-submit protection

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-475                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> Backend ตรวจสอบและ Trim Content ของ Comment ให้มีความยาว 1-1000 ตัวอักษร พร้อม Double-submit Protection

---

## 1. Description

Implement Validation Layer สำหรับ Comment Content ประกอบด้วย Trim Whitespace, ตรวจสอบความยาว 1-1000 ตัวอักษร, Reject Empty Content, และ Double-submit Protection ด้วย Idempotency Key

---

## 2. Acceptance Criteria

### Scenario 1 — Content Trim

- **Given:** Client ส่ง Comment ที่มี Leading/Trailing Whitespace
- **When:** API รับ Request
- **Then:** Content ถูก Trim ก่อนบันทึก

### Scenario 2 — Min Length Validation

- **Given:** Client ส่ง Comment ที่เป็นข้อความว่างหลัง Trim
- **When:** Validation ทำงาน
- **Then:** Return HTTP 400 "Content cannot be empty"

### Scenario 3 — Max Length Validation

- **Given:** Client ส่ง Comment ที่มีความยาวเกิน 1000 ตัวอักษร
- **When:** Validation ทำงาน
- **Then:** Return HTTP 400 "Content exceeds 1000 characters"

### Scenario 4 — Double-submit Protection

- **Given:** Client ส่ง Request เดียวกันซ้ำ (Idempotency Key เดิม)
- **When:** API รับ Request ซ้ำ
- **Then:** Return Response เดิมโดยไม่สร้าง Comment ซ้ำ

---

## 3. Definition of Done

- [ ] Content Trim ทำงานก่อนบันทึก
- [ ] Empty Content คืน HTTP 400
- [ ] Content เกิน 1000 ตัวอักษรคืน HTTP 400
- [ ] Double-submit Protection ด้วย Idempotency Key ทำงาน
