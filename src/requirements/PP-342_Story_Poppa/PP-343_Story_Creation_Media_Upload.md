# PP-343 · Story Creation & Media Upload

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-343                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> End-User สามารถสร้าง Story โดยอัปโหลดรูปภาพหรือวิดีโอ และกดเผยแพร่ได้

---

## 1. Description

Implement หน้า Story Creation บน Mobile App ให้ผู้ใช้สามารถเลือก Media (รูปภาพหรือวิดีโอ), แต่งสตอรี่, และกดเผยแพร่ Story ไปยัง Feed ของเพื่อน โดย Story จะหายไปอัตโนมัติหลัง 24 ชั่วโมง

---

## 2. Acceptance Criteria

### Scenario 1 — Open Story Creation

- **Given:** End-User กดปุ่ม Create และเลือก Story
- **When:** ระบบเปิดหน้า Story Creation
- **Then:** ผู้ใช้เห็น Media Picker สำหรับเลือกรูปหรือวิดีโอ

### Scenario 2 — Media Upload

- **Given:** End-User เลือก Media แล้ว
- **When:** กดปุ่ม Publish Story
- **Then:** ระบบอัปโหลด Media และสร้าง Story สำเร็จ

### Scenario 3 — Story Expiry Timer

- **Given:** Story ถูกสร้างสำเร็จ
- **When:** ผ่านไป 24 ชั่วโมง
- **Then:** Story หายออกจาก Feed อัตโนมัติ

---

## 3. Definition of Done

- [ ] Media Picker เลือกรูปหรือวิดีโอได้
- [ ] อัปโหลดและสร้าง Story สำเร็จ
- [ ] Story หายหลัง 24 ชั่วโมง
