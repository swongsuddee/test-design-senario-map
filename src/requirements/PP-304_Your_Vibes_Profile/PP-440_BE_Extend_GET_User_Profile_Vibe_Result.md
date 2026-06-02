# PP-440 · [BE] Extend GET /v1/users/{userId}/profile — include vibe_result { animal_type, scores } ใน profile response (ถ้ายังไม่เคยทำ quiz ให้ return null)

| Field        | Value                                                      |
|--------------|------------------------------------------------------------|
| **Key**      | PP-440                                                     |
| **Type**     | Sub-task                                                   |
| **Project**  | POPPA                                                      |
| **Status**   | Ready to Deploy STG |
| **Assignee** | —                                                          |
| **Parent**   | [PP-304](./PP-304_Your_Vibes_Profile.md)                   |

---

## User Story

> ขยาย API GET /v1/users/{userId}/profile ให้ Include ข้อมูล vibe_result เพื่อให้ Mobile App แสดง Animal Result ในหน้า Profile ได้

---

## 1. Description

Extend Endpoint GET /v1/users/{userId}/profile เดิม โดยเพิ่ม Field vibe_result ใน Response ประกอบด้วย animal_type และ scores 4 มิติ ดึงมาจาก vibe_result ที่บันทึกไว้ใน Users Collection (MongoDB) หากผู้ใช้ยังไม่เคยทำ Quiz ให้ vibe_result เป็น null

---

## 2. Acceptance Criteria

### Scenario 1 — Profile Response มี vibe_result เมื่อ User ทำ Quiz แล้ว

- **Given:** User มี vibe_result บันทึกอยู่ใน Database
- **When:** เรียก GET /v1/users/{userId}/profile
- **Then:** Response มี vibe_result: { animal_type, scores: { energy, social, structure, exploration } }

### Scenario 2 — Profile Response มี vibe_result เป็น null เมื่อ User ยังไม่ทำ Quiz

- **Given:** User ยังไม่มี vibe_result ใน Database
- **When:** เรียก GET /v1/users/{userId}/profile
- **Then:** Response มี vibe_result: null (ไม่ throw Error)

### Scenario 3 — ไม่ส่งผลต่อ Field เดิมใน Profile Response

- **Given:** มีการ Extend Response
- **When:** เรียก GET /v1/users/{userId}/profile
- **Then:** Field เดิมทั้งหมดใน Profile Response ยังคงอยู่ครบถ้วน ไม่มี Breaking Change

---

## 3. Technical Rules

### Endpoint

```
GET /v1/users/{userId}/profile
Authorization: Bearer <token>
```

### Extended Response

```json
{
  "...existing_fields...",
  "vibe_result": {
    "animal_type": "string",
    "scores": {
      "energy": 0,
      "social": 0,
      "structure": 0,
      "exploration": 0
    }
  }
}
```

หากยังไม่เคยทำ Quiz: `"vibe_result": null`

---

## 4. Definition of Done

- [ ] GET /v1/users/{userId}/profile มี vibe_result ใน Response
- [ ] vibe_result เป็น null เมื่อ User ยังไม่ทำ Quiz
- [ ] Field เดิมใน Profile Response ไม่ถูก Breaking Change
- [ ] Unit Test ครอบคลุมทั้ง 2 กรณี (มี / ไม่มี vibe_result)
