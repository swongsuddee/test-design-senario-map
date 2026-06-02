# PP-341 · [M-App][End-User] Content Moderation (Safety & Report)

| Field        | Value                                          |
|--------------|------------------------------------------------|
| **Key**      | PP-341                                         |
| **Type**     | Sub-task                                       |
| **Project**  | POPPA                                          |
| **Status**   | To Do                                          |
| **Assignee** | —                                              |
| **Parent**   | [PP-337](./PP-337_Poppa_Explore_Post.md)       |

---

## User Story

> End-User สามารถรายงานโพสต์ที่ไม่เหมาะสมเพื่อให้ระบบดำเนินการ Moderate เนื้อหาได้

---

## 1. Description

Implement ระบบ Content Moderation บน Mobile App ให้ผู้ใช้สามารถ Report โพสต์ที่ไม่เหมาะสม เลือกเหตุผล และระบบจะส่งข้อมูลไปยัง Moderation Queue เพื่อให้ Admin ดำเนินการต่อ

---

## 2. Acceptance Criteria

### Scenario 1 — Report Post

- **Given:** End-User พบโพสต์ที่ไม่เหมาะสมใน Explore Feed
- **When:** กดปุ่ม Report (3-dot menu หรือ Report icon)
- **Then:** ระบบแสดงหน้าต่าง Report พร้อมตัวเลือกเหตุผล

### Scenario 2 — Select Report Reason

- **Given:** หน้าต่าง Report แสดงอยู่
- **When:** End-User เลือกเหตุผลที่ต้องการ Report
- **Then:** ปุ่ม Submit เปิดใช้งานได้

### Scenario 3 — Submit Report

- **Given:** End-User เลือกเหตุผลแล้ว
- **When:** กดปุ่ม Submit
- **Then:** ระบบบันทึก Report และแสดงข้อความยืนยันว่าส่งสำเร็จ

### Scenario 4 — Duplicate Report Guard

- **Given:** End-User เคย Report โพสต์นั้นไปแล้ว
- **When:** พยายาม Report ซ้ำ
- **Then:** ระบบแสดงข้อความว่า Report นี้ถูกส่งไปแล้ว

---

## 3. Definition of Done

- [ ] ปุ่ม Report เข้าถึงได้จากโพสต์
- [ ] หน้าต่าง Report แสดงตัวเลือกเหตุผลถูกต้อง
- [ ] Submit Report บันทึกสำเร็จและแสดง Confirmation
- [ ] Duplicate Report Guard ทำงานถูกต้อง
