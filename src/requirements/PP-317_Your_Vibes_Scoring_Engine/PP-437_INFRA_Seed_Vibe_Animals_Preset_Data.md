# PP-437 · [INFRA] Seed vibe_animals preset data

| Field        | Value                                                           |
|--------------|-----------------------------------------------------------------|
| **Key**      | PP-437                                                          |
| **Type**     | Sub-task                                                        |
| **Project**  | POPPA                                                           |
| **Status**   | To Do                                                           |
| **Assignee** | —                                                               |
| **Parent**   | [PP-317](./PP-317_Your_Vibes_Scoring_Engine.md)                 |

---

## User Story

> สร้าง Seed Script สำหรับเพิ่มข้อมูล Preset vibe_animals ลง Database เพื่อให้ API สามารถ Lookup Animal Info ได้

---

## 1. Description

สร้าง Database Seed Script สำหรับ Insert ข้อมูล Preset ของสัตว์ทุกประเภทลง Collection vibe_animals ใน MongoDB ข้อมูล Preset ประกอบด้วย: animal_type, animal_name, image_key, description, recommended_activities แบ่งตาม 4 หมวด (active, wellness, creative, social)

---

## 2. Acceptance Criteria

### Scenario 1 — Seed Script ทำงานสำเร็จ

- **Given:** ไม่มีข้อมูลใน vibe_animals collection
- **When:** รัน Seed Script
- **Then:** ข้อมูล Animal Preset ทุกประเภทถูก Insert ลง vibe_animals collection ครบถ้วน

### Scenario 2 — Seed Script Idempotent

- **Given:** มีข้อมูลใน vibe_animals collection อยู่แล้ว
- **When:** รัน Seed Script ซ้ำ
- **Then:** ไม่มี Duplicate Document (ใช้ Upsert หรือ Check ก่อน Insert)

### Scenario 3 — ข้อมูล Preset ครบทุก Animal Type

- **Given:** Seed Script รันสำเร็จ
- **When:** Query vibe_animals collection
- **Then:** มีข้อมูลครบทุก Animal Type ที่ MapAnimalType (PP-435) อ้างอิง

---

## 3. Technical Rules

### vibe_animals Document Schema

```json
{
  "animal_type": "string",
  "animal_name": "string",
  "image_key": "string",
  "description": "string",
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

- [ ] Seed Script สร้างแล้วและรันได้
- [ ] ข้อมูล Preset ครบทุก Animal Type ที่ใช้ใน PP-435
- [ ] Script เป็น Idempotent (รันซ้ำไม่เกิด Duplicate)
- [ ] ทดสอบ Seed บน DEV Environment ผ่าน
