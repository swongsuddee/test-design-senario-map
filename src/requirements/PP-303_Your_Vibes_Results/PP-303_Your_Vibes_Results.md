# PP-303 · Your Vibes - Results (แสดงผลลัพธ์บุคลิกภาพ Animal)

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-303        |
| **Type**     | Story         |
| **Project**  | POPPA         |
| **Status**   | In Progress         |
| **Assignee** | —             |
| **Figma**    | Design by Dev |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** เห็นผลลัพธ์บุคลิกภาพในรูปแบบภาพสัตว์และกราฟที่สวยงาม
> **เพื่อ:** ให้ฉันเข้าใจตัวเองได้ทันที

---

## 1. Description

หน้าผลลัพธ์ที่แสดงหลังจาก End-User ทำ Quiz ครบ 7 ข้อแล้ว โดยแสดงชื่อและรูปภาพสัตว์ที่แทนบุคลิกภาพ, คำอธิบาย, Activity Preference Map (Spider/Radar Chart 4 แกน), รายการกิจกรรมที่แนะนำแบ่งตาม 4 หมวด พร้อมปุ่ม Share ไปยัง Social Media และปุ่ม Done เพื่อดำเนินการต่อ

---

## 2. Acceptance Criteria

### Scenario 1 — แสดงชื่อและรูปสัตว์

- **Given:** End-User เข้าหน้า Your Vibes Results
- **When:** หน้าโหลดสำเร็จ
- **Then:** แสดงชื่อสัตว์และรูปภาพการ์ตูนสัตว์ที่ชัดเจนและตรงกับผลลัพธ์ที่คำนวณได้

### Scenario 2 — แสดงคำอธิบายบุคลิกภาพ

- **Given:** หน้า Results โหลดสำเร็จ
- **When:** ผู้ใช้มองที่ส่วน Description
- **Then:** แสดงข้อความบรรยายบุคลิกภาพของสัตว์นั้นครบถ้วนชัดเจน

### Scenario 3 — แสดง Activity Preference Map

- **Given:** หน้า Results โหลดสำเร็จ
- **When:** ผู้ใช้มองที่ส่วนกราฟ
- **Then:** แสดง Activity Preference Map ที่มี 4 แกน ได้แก่ พลังลุย (Energy), พลังคน (Social), มีแบบแผน (Structure/Wellness), ความอยากลอง (Exploration/Creative) พร้อมค่าคะแนนที่ถูกต้อง

### Scenario 4 — แสดงกิจกรรมที่แนะนำ

- **Given:** หน้า Results โหลดสำเร็จ
- **When:** ผู้ใช้เลื่อนดู Section "คุณน่าจะชอบอะไร"
- **Then:** แสดงรายการกิจกรรมที่แนะนำแบ่งตาม 4 หมวด (Active, Wellness, Creative, Social)

### Scenario 5 — Share ไป Instagram & Facebook

- **Given:** ผู้ใช้กดปุ่ม "Share to Instagram & FB"
- **When:** ระบบ Generate ภาพผลลัพธ์
- **Then:** ระบบสร้างภาพ Story Format ที่มีข้อมูลบุคลิกภาพ และเปิด Share Sheet ให้ผู้ใช้เลือก Platform

### Scenario 6 — กดปุ่ม Done

- **Given:** ผู้ใช้ดูผลลัพธ์เสร็จแล้ว
- **When:** กดปุ่ม "Done"
- **Then:** ระบบนำทางผู้ใช้ไปยัง Flow ถัดไปตามที่กำหนด

---

## 3. Technical Rules

### API

```
GET /v1/vibes/result
Authorization: Bearer <user_token>
```

### Response Fields

| Field | Description |
|-------|-------------|
| animal_type | รหัสประเภทสัตว์ |
| animal_name | ชื่อสัตว์ |
| image_key | Key สำหรับโหลดภาพจาก CDN |
| description | คำอธิบายบุคลิกภาพ |
| scores | { energy, social, structure, exploration } (0-100) |
| recommended_activities | { active: [], wellness: [], creative: [], social: [] } |

---

## 4. Definition of Done

- [ ] แสดงชื่อสัตว์และรูปภาพถูกต้องตามผลลัพธ์
- [ ] คำอธิบายบุคลิกภาพแสดงครบถ้วน
- [ ] Activity Preference Map (4 แกน) แสดงค่าถูกต้อง
- [ ] Section "คุณน่าจะชอบอะไร" แสดงครบ 4 หมวด
- [ ] ปุ่ม Share Generate ภาพและเปิด Share Sheet ได้
- [ ] ปุ่ม Done นำทางไปยัง Next Flow ได้
- [ ] Integration ทดสอบกับ GET /v1/vibes/result ผ่าน

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-427](./PP-427_MB_Implement_Wireframe_Results_Page.md) | [MB][End-User] implement wireframe results page (wait for ui) | To Do |
| [PP-428](./PP-428_MB_Implement_UI_Results_Page.md) | [MB][End-User] implement ui results page | To Do |
| [PP-429](./PP-429_MB_Integration_API_Quiz_Results.md) | [MB][End-User] integration api quiz results | To Do |
| [PP-439](./PP-439_BE_GET_Vibes_Result.md) | [BE] GET /v1/vibes/result — return animal info (name, image key, description), scores 4 มิติ, recommended activities by category จาก preset data | Ready to Deploy STG |
