# PP-232 · [MB][End-User] Design UI for Event Detail - Organizer Information

| Field        | Value                                                                                              |
|--------------|----------------------------------------------------------------------------------------------------|
| **Key**      | PP-232                                                                                             |
| **Type**     | Sub-task                                                                                           |
| **Project**  | POPPA                                                                                              |
| **Status**   | To Do                                                                                              |
| **Assignee** | —                                                                                                  |
| **Parent**   | [PP-226](./PP-226_Event_Detail_Organizer_Information.md)                                           |

---

## User Story

> ออกแบบ UI สำหรับส่วนแสดงข้อมูล Organizer Information บนหน้า Event Detail ของ Mobile App

---

## 1. Description

งานออกแบบ UI Component บน Mobile App สำหรับแสดงข้อมูล "เจ้าภาพ" (Host) และ "ผู้จัดงาน" (Organizer) บนหน้า Event Detail รองรับทั้งกรณีที่ Host = Organizer และ Host ≠ Organizer รวมถึง Placeholder กรณีไม่มีข้อมูล

---

## 2. Acceptance Criteria

### Scenario 1 — Design Component ครบถ้วน

- **Given:** Designer เริ่มงาน Design UI สำหรับ Organizer Information Section
- **When:** Design เสร็จสมบูรณ์
- **Then:** มี UI Component แสดง Host Name, Organizer Name, Logo/Avatar และ Layout ทั้งแบบ Single และ Hybrid

### Scenario 2 — Design ผ่าน Review

- **Given:** Design Component พร้อมแล้ว
- **When:** นำเสนอให้ทีม Review
- **Then:** ทีมอนุมัติ Design ก่อน Implement

### Scenario 3 — Handoff Spec พร้อม

- **Given:** Design ผ่าน Review แล้ว
- **When:** ส่งต่อให้ Developer
- **Then:** มี Figma Spec ครบทุก State (Host only, Organizer only, Both, Empty)

---

## 3. Definition of Done

- [ ] UI Component ออกแบบครบทุก State
- [ ] Design ผ่าน Review จากทีม
- [ ] Figma Spec พร้อม Handoff ให้ Developer
