# PP-339 · [M-App][End-User] Create Post - VDO

| Field        | Value                                          |
|--------------|------------------------------------------------|
| **Key**      | PP-339                                         |
| **Type**     | Sub-task                                       |
| **Project**  | POPPA                                          |
| **Status**   | To Do                                          |
| **Assignee** | —                                              |
| **Parent**   | [PP-337](./PP-337_Poppa_Explore_Post.md)       |

---

## User Story

> End-User สามารถสร้างโพสต์โดยแนบวิดีโอสั้นพร้อม Caption และเผยแพร่ไปยัง Explore Feed ได้

---

## 1. Description

Implement หน้า Create Post - VDO บน Mobile App ให้ผู้ใช้สามารถเลือกวิดีโอสั้นจาก Gallery หรือบันทึกใหม่, ใส่ Caption, และกดเผยแพร่โพสต์ขึ้น Explore Feed

---

## 2. Acceptance Criteria

### Scenario 1 — Video Selection

- **Given:** End-User กดปุ่ม Create Post และเลือก VDO
- **When:** ระบบเปิด Video Picker
- **Then:** ผู้ใช้สามารถเลือกวิดีโอจาก Gallery หรือบันทึกวิดีโอใหม่ได้

### Scenario 2 — Video Preview

- **Given:** End-User เลือกวิดีโอแล้ว
- **When:** ระบบแสดง Preview
- **Then:** ผู้ใช้เห็น Thumbnail และสามารถเล่นดู Preview ก่อนเผยแพร่ได้

### Scenario 3 — Caption Input

- **Given:** End-User ดู Preview วิดีโอแล้ว
- **When:** พิมพ์ Caption ในช่องข้อความ
- **Then:** ระบบรับข้อความ Caption ได้

### Scenario 4 — Publish Post

- **Given:** End-User ใส่วิดีโอและ Caption ครบถ้วน
- **When:** กดปุ่ม Publish
- **Then:** ระบบอัปโหลดวิดีโอและโพสต์ขึ้น Explore Feed สำเร็จ

### Scenario 5 — Validation

- **Given:** End-User ยังไม่ได้เลือกวิดีโอ
- **When:** กดปุ่ม Publish
- **Then:** ระบบแสดง Error และไม่ยอมให้เผยแพร่

---

## 3. Definition of Done

- [ ] Video Picker ทำงานได้ (Gallery + Camera)
- [ ] Video Preview แสดงผลถูกต้อง
- [ ] Caption Input ทำงานถูกต้อง
- [ ] Publish โพสต์สำเร็จและปรากฏใน Feed
- [ ] Validation กั้นการส่งเมื่อไม่มีวิดีโอ
