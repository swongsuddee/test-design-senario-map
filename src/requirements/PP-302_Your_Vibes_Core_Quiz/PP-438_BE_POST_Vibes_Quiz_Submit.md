# PP-438 · [BE] POST /v1/vibes/quiz/submit — รับ answers Q1-Q7 (int 1-5), validate ครบ 7 ข้อ, delegate scoring service, return animal result

| Field        | Value                                                      |
|--------------|------------------------------------------------------------|
| **Key**      | PP-438                                                     |
| **Type**     | Sub-task                                                   |
| **Project**  | POPPA                                                      |
| **Status**   | Ready to Deploy STG |
| **Assignee** | —                                                          |
| **Parent**   | [PP-302](./PP-302_Your_Vibes_Core_Quiz.md)                 |

---

## User Story

> พัฒนา API Endpoint สำหรับรับคำตอบ Quiz 7 ข้อ, ตรวจสอบความถูกต้อง, ส่งต่อไปยัง Scoring Service และคืนผลลัพธ์ Animal Type

---

## 1. Description

Implement Backend Endpoint POST /v1/vibes/quiz/submit ที่รับ Array คำตอบ Q1-Q7 (int 1-5 ต่อข้อ), Validate ว่ามีครบ 7 ข้อและแต่ละข้ออยู่ในช่วง 1-5, เรียก Scoring Service เพื่อคำนวณคะแนน 4 มิติและ Map เป็น Animal Type, จากนั้น Return ผลลัพธ์กลับไปยัง Client

---

## 2. Acceptance Criteria

### Scenario 1 — Submit สำเร็จ

- **Given:** End-User ส่ง answers ครบ 7 ข้อ ค่าละ 1-5
- **When:** เรียก POST /v1/vibes/quiz/submit
- **Then:** API ตอบกลับ HTTP 200 พร้อม animal_type, scores 4 มิติ, และ description

### Scenario 2 — Validate จำนวนคำตอบ

- **Given:** Client ส่ง answers ไม่ครบ 7 ข้อ
- **When:** เรียก API
- **Then:** API ตอบกลับ HTTP 400 พร้อม Error message "answers must contain exactly 7 items"

### Scenario 3 — Validate ค่าคำตอบ

- **Given:** Client ส่ง answers ที่มีค่านอกช่วง 1-5 (เช่น 0 หรือ 6)
- **When:** เรียก API
- **Then:** API ตอบกลับ HTTP 400 พร้อม Error message "each answer must be between 1 and 5"

### Scenario 4 — Delegate ไปยัง Scoring Service

- **Given:** Input ถูกต้องครบถ้วน
- **When:** API ประมวลผล
- **Then:** Scoring Service ถูกเรียกและผลลัพธ์ถูกบันทึกลง User Profile

---

## 3. Technical Rules

### Endpoint

```
POST /v1/vibes/quiz/submit
Authorization: Bearer <user_token>
Body: { "answers": [int, int, int, int, int, int, int] }
```

### Response

```json
{
  "animal_type": "string",
  "animal_name": "string",
  "description": "string",
  "scores": {
    "energy": 0,
    "social": 0,
    "structure": 0,
    "exploration": 0
  }
}
```

---

## 4. Definition of Done

- [ ] Endpoint รับ POST /v1/vibes/quiz/submit
- [ ] Validate answers ครบ 7 ข้อ และค่าแต่ละข้ออยู่ใน 1-5
- [ ] Delegate ไปยัง Scoring Service (PP-317)
- [ ] Return animal_type, scores 4 มิติ, description
- [ ] บันทึก vibe_result ลง User Profile
- [ ] Unit Test ครอบคลุม Happy Path และ Validation Error Cases
