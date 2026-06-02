# PP-439 · [BE] GET /v1/vibes/result — return animal info (name, image key, description), scores 4 มิติ, recommended activities by category จาก preset data

| Field        | Value                                                      |
|--------------|------------------------------------------------------------|
| **Key**      | PP-439                                                     |
| **Type**     | Sub-task                                                   |
| **Project**  | POPPA                                                      |
| **Status**   | Ready to Deploy STG |
| **Assignee** | —                                                          |
| **Parent**   | [PP-303](./PP-303_Your_Vibes_Results.md)                   |

---

## User Story

> พัฒนา API Endpoint สำหรับดึงผลลัพธ์ Vibe ของ User ที่บันทึกไว้ พร้อม Animal Info, Scores, และกิจกรรมแนะนำจาก Preset Data

---

## 1. Description

Implement Backend Endpoint GET /v1/vibes/result ที่ดึง vibe_result ของ User ที่ Login อยู่จาก Database แล้ว Lookup ข้อมูล Animal (name, image_key, description) และ Recommended Activities จาก Preset Data ตาม animal_type และ scores 4 มิติ จากนั้น Return ข้อมูลทั้งหมดกลับไปยัง Client

---

## 2. Acceptance Criteria

### Scenario 1 — ดึงผลลัพธ์สำเร็จ

- **Given:** User ทำ Quiz เสร็จแล้วและมี vibe_result ใน Database
- **When:** เรียก GET /v1/vibes/result
- **Then:** API ตอบกลับ HTTP 200 พร้อม animal info, scores 4 มิติ, และ recommended_activities ครบถ้วน

### Scenario 2 — User ยังไม่เคยทำ Quiz

- **Given:** User ยังไม่มี vibe_result ใน Database
- **When:** เรียก GET /v1/vibes/result
- **Then:** API ตอบกลับ HTTP 404 หรือ HTTP 200 พร้อม null result ตาม Convention ของ Project

### Scenario 3 — Recommended Activities มาจาก Preset Data

- **Given:** vibe_result มี animal_type ถูกต้อง
- **When:** API Lookup Preset Data
- **Then:** recommended_activities แสดงกิจกรรมที่ถูกต้องตาม animal_type แบ่งครบ 4 หมวด (active, wellness, creative, social)

---

## 3. Technical Rules

### Endpoint

```
GET /v1/vibes/result
Authorization: Bearer <user_token>
```

### Response

```json
{
  "animal_type": "string",
  "animal_name": "string",
  "image_key": "string",
  "description": "string",
  "scores": {
    "energy": 0,
    "social": 0,
    "structure": 0,
    "exploration": 0
  },
  "recommended_activities": {
    "active": ["string"],
    "wellness": ["string"],
    "creative": ["string"],
    "social": ["string"]
  }
}
```

---

## 4. Definition of Done

- [ ] Endpoint GET /v1/vibes/result ทำงานสำเร็จ
- [ ] Return animal info ครบ (name, image_key, description)
- [ ] Return scores 4 มิติถูกต้อง
- [ ] Return recommended_activities จาก Preset Data ครบ 4 หมวด
- [ ] จัดการกรณี User ยังไม่เคยทำ Quiz
- [ ] Unit Test ครอบคลุม Happy Path และ Edge Cases
