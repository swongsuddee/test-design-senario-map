# PP-428 · [MB][End-User] implement ui results page

| Field        | Value                                                      |
|--------------|------------------------------------------------------------|
| **Key**      | PP-428                                                     |
| **Type**     | Sub-task                                                   |
| **Project**  | POPPA                                                      |
| **Status**   | To Do                                                      |
| **Assignee** | —                                                          |
| **Parent**   | [PP-303](./PP-303_Your_Vibes_Results.md)                   |

---

## User Story

> นำ UI Design จริงมา Implement หน้า Your Vibes Results ให้ครบทุก Component ตาม Design Spec

---

## 1. Description

นำ Figma / UI Design มา Implement หน้า Results อย่างครบถ้วน ครอบคลุม Animal Image (การ์ตูน), ชื่อสัตว์, Description Text, Activity Preference Map (Radar/Spider Chart 4 แกน), Section กิจกรรมแนะนำ 4 หมวด, ปุ่ม Share (Instagram & FB), และปุ่ม Done

---

## 2. Acceptance Criteria

### Scenario 1 — UI ตรงตาม Design

- **Given:** นักพัฒนา Implement UI ตาม Design Spec แล้ว
- **When:** เปิดหน้า Results ในแอป
- **Then:** ทุก Component แสดงผลถูกต้องตาม Design (Layout, สี, Typography, Spacing)

### Scenario 2 — Activity Preference Map แสดงกราฟ

- **Given:** หน้าโหลดด้วย Data จาก API
- **When:** ผู้ใช้มองที่ส่วนกราฟ
- **Then:** Radar Chart / Spider Chart แสดง 4 แกนพร้อมค่าคะแนนที่ถูกต้อง

### Scenario 3 — Recommended Activities แสดงครบ 4 หมวด

- **Given:** หน้าโหลดด้วย Data จาก API
- **When:** ผู้ใช้เลื่อนดู Section กิจกรรมแนะนำ
- **Then:** แสดงกิจกรรมแยกตาม Active, Wellness, Creative, Social ครบถ้วน

---

## 3. Definition of Done

- [ ] Animal Image และชื่อสัตว์แสดงถูกต้อง
- [ ] Description Text แสดงครบถ้วน
- [ ] Radar Chart / Spider Chart แสดง 4 แกนถูกต้อง
- [ ] Section กิจกรรมแนะนำแสดงครบ 4 หมวด
- [ ] ปุ่ม Share และ Done มี Style ถูกต้องตาม Design
