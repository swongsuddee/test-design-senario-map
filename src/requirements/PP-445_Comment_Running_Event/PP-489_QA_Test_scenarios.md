# PP-489 · [QA] Test scenarios: Happy path / Validation / Stress / Relative time precision

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-489                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> ทีม QA มี Test Scenarios ครอบคลุม Happy Path, Validation, Stress Test และ Relative Time Precision สำหรับ Comment บน Event

---

## 1. Description

กำหนด Test Scenarios ครบถ้วนสำหรับฟีเจอร์ Comment บน Running Event ครอบคลุม 4 กลุ่มหลัก ได้แก่ Happy Path, Validation Check, Stress Test, และ Relative Time Precision

---

## 2. Acceptance Criteria

### Scenario 1 — Happy Path

- **Given:** End-User เข้าหน้า Event Detail
- **When:** พิมพ์ข้อความและกดส่ง Comment
- **Then:** Comment ปรากฏเป็นอันดับแรกใน List

### Scenario 2 — Validation Check

- **Given:** End-User ไม่พิมพ์ข้อความ
- **When:** กดปุ่ม Send
- **Then:** ปุ่ม Send ไม่ทำงาน และไม่มี Comment ถูกส่ง

### Scenario 3 — Stress Test

- **Given:** End-User พิมพ์ข้อความ 500+ ตัวอักษรรวม Emoji
- **When:** ส่ง Comment
- **Then:** ข้อความแสดงครบถ้วน (ถ้า ≤ 1000 ตัวอักษร) หรือแสดง Error (ถ้า > 1000)

### Scenario 4 — Relative Time Precision

- **Given:** Comment ถูกส่งแล้ว
- **When:** รอ 1 นาที
- **Then:** Timestamp เปลี่ยนจาก "เมื่อครู่" เป็น "1 นาทีที่แล้ว" ถูกต้อง

---

## 3. Technical Rules

| Test Type | Coverage |
|-----------|----------|
| Happy Path | Create Comment, Reply, View Comment |
| Validation | Empty Submit, Max Length, Double-submit |
| Stress Test | 500+ chars, Emoji, Special Characters |
| Relative Time | เมื่อครู่ → นาที → ชม. → เมื่อวาน |

---

## 3. Definition of Done

- [ ] Happy Path Test Cases ครบถ้วน
- [ ] Validation Test Cases ครบถ้วน
- [ ] Stress Test ทดสอบ 500+ ตัวอักษรและ Emoji
- [ ] Relative Time Precision ทดสอบครบทุก State
- [ ] Test Results Document พร้อม
