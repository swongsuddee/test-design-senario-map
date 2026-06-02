# PP-338 · [M-App][End-User] Create Post - Image

| Field        | Value                                          |
|--------------|------------------------------------------------|
| **Key**      | PP-338                                         |
| **Type**     | Sub-task                                       |
| **Project**  | POPPA                                          |
| **Status**   | To Do                                          |
| **Assignee** | —                                              |
| **Parent**   | [PP-337](./PP-337_Poppa_Explore_Post.md)       |

---

## User Story

> End-User สามารถสร้างโพสต์โดยแนบรูปภาพพร้อม Caption และเผยแพร่ไปยัง Explore Feed ได้

---

## 1. Description

Implement หน้า Create Post - Image บน Mobile App ให้ผู้ใช้สามารถเลือกรูปภาพจาก Gallery หรือถ่ายใหม่, ใส่ Caption, และกดเผยแพร่โพสต์ขึ้น Explore Feed

---

## 2. Acceptance Criteria

### Scenario 1 — Image Selection

- **Given:** End-User กดปุ่ม Create Post และเลือก Image
- **When:** ระบบเปิด Image Picker
- **Then:** ผู้ใช้สามารถเลือกรูปจาก Gallery หรือถ่ายรูปใหม่ได้

### Scenario 2 — Caption Input

- **Given:** End-User เลือกรูปภาพแล้ว
- **When:** พิมพ์ Caption ในช่องข้อความ
- **Then:** ระบบรับข้อความและแสดง Preview ก่อนเผยแพร่

### Scenario 3 — Publish Post

- **Given:** End-User ใส่รูปและ Caption ครบถ้วน
- **When:** กดปุ่ม Publish
- **Then:** ระบบอัปโหลดรูปภาพและโพสต์ขึ้น Explore Feed สำเร็จ

### Scenario 4 — Validation

- **Given:** End-User ยังไม่ได้เลือกรูปภาพ
- **When:** กดปุ่ม Publish
- **Then:** ระบบแสดง Error และไม่ยอมให้เผยแพร่

---

## 3. Definition of Done

- [ ] Image Picker ทำงานได้ (Gallery + Camera)
- [ ] Caption Input แสดงผลถูกต้อง
- [ ] Publish โพสต์สำเร็จและปรากฏใน Feed
- [ ] Validation กั้นการส่งเมื่อไม่มีรูป
