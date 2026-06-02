# PP-499 · [FE][BO][Admin] Improve api user list and user detail

| Field        | Value                                                           |
|--------------|-----------------------------------------------------------------|
| **Key**      | PP-499                                                          |
| **Type**     | Sub-task                                                        |
| **Project**  | POPPA                                                           |
| **Status**   | To Do                                                           |
| **Assignee** | —                                                               |
| **Parent**   | [PP-318](./PP-318_Your_Vibes_BO_Management.md)                  |

---

## User Story

> ปรับปรุง API Integration ของ User List และ User Detail ใน Backoffice ให้รองรับข้อมูล Vibe (Animal Type, Scores) และ Advanced Filtering

---

## 1. Description

Improve API Layer ใน Backoffice Frontend สำหรับ User List และ User Detail โดยรองรับ: Query Parameters สำหรับ Filter ตาม Animal Type และ Score Range, โหลดข้อมูล vibe_result ใน User Detail, รองรับ Pagination ที่ถูกต้อง, และ Export Data Call

---

## 2. Acceptance Criteria

### Scenario 1 — User List API รองรับ Vibe Filter

- **Given:** Admin ใช้ Filter ตาม Animal Type หรือ Score Range
- **When:** Frontend เรียก User List API
- **Then:** ส่ง Query Parameters ที่ถูกต้อง (animal_type, score_min_energy ฯลฯ) และรับข้อมูลที่ Filter แล้ว

### Scenario 2 — User Detail API โหลด vibe_result

- **Given:** Admin เปิด Side-panel ของ User
- **When:** Frontend เรียก User Detail API
- **Then:** ได้รับ vibe_result { animal_type, scores, recommended_activities } ครบถ้วน

### Scenario 3 — Export API ทำงานได้

- **Given:** Admin กดปุ่ม Export
- **When:** Frontend เรียก Export Endpoint
- **Then:** Download ไฟล์ข้อมูลที่ตรงกับ Filter ปัจจุบัน

### Scenario 4 — Performance: โหลดภายใน 2 วินาที

- **Given:** ตาราง User List มีข้อมูลจำนวนมาก
- **When:** โหลดหน้า หรือเปลี่ยน Page
- **Then:** ข้อมูลแสดงผลภายใน 2 วินาที

---

## 3. Technical Rules

### Query Parameters สำหรับ Filter

| Parameter | Type | Description |
|-----------|------|-------------|
| animal_type | string | Filter ตาม Animal Type |
| score_min_energy | number | คะแนน Energy ต่ำสุด |
| score_max_energy | number | คะแนน Energy สูงสุด |
| score_min_social | number | คะแนน Social ต่ำสุด |
| score_max_social | number | คะแนน Social สูงสุด |
| score_min_structure | number | คะแนน Structure ต่ำสุด |
| score_max_structure | number | คะแนน Structure สูงสุด |
| score_min_exploration | number | คะแนน Exploration ต่ำสุด |
| score_max_exploration | number | คะแนน Exploration สูงสุด |
| search | string | Search by Username |
| page | number | Pagination page |
| limit | number | Items per page |

---

## 4. Definition of Done

- [ ] Filter Query Parameters ส่งถูกต้องเมื่อใช้ Filter
- [ ] User Detail โหลด vibe_result ครบถ้วน
- [ ] Export API ทำงานและ Download ไฟล์ได้
- [ ] Pagination ทำงานถูกต้อง
- [ ] ข้อมูลโหลดภายใน 2 วินาที
