# PP-481 · [MB][End-User] AC 1.3 Text wrapping multi-line + Enter ขึ้นบรรทัดใหม่

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-481                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> End-User สามารถพิมพ์ข้อความยาวหลายบรรทัดใน Comment Input Bar โดยข้อความ Wrap และ Enter ขึ้นบรรทัดใหม่ได้

---

## 1. Description

Implement Multi-line Text Input ใน Comment Input Bar ให้ข้อความ Wrap อัตโนมัติเมื่อเต็มบรรทัด และรองรับการกด Enter/Return เพื่อขึ้นบรรทัดใหม่ แทนที่จะเป็นการ Submit

---

## 2. Acceptance Criteria

### Scenario 1 — Text Wrapping

- **Given:** End-User พิมพ์ข้อความยาวใน Input Bar
- **When:** ข้อความเต็มความกว้าง Input Bar
- **Then:** ข้อความ Wrap ขึ้นบรรทัดใหม่อัตโนมัติ และ Input Bar ขยายสูงขึ้น

### Scenario 2 — Enter New Line

- **Given:** End-User กำลังพิมพ์ใน Input Bar
- **When:** กดปุ่ม Enter/Return
- **Then:** เคอร์เซอร์ขึ้นบรรทัดใหม่ (ไม่ใช่ Submit)

### Scenario 3 — Max Height Limit

- **Given:** End-User พิมพ์ข้อความหลายบรรทัดมาก
- **When:** Input Bar สูงถึง Max Height ที่กำหนด
- **Then:** Input Bar หยุดขยายและรองรับ Scroll ภายใน Input แทน

---

## 3. Definition of Done

- [ ] Text Wrapping ใน Input Bar ทำงานได้
- [ ] Enter ขึ้นบรรทัดใหม่ (ไม่ Submit)
- [ ] Input Bar ขยายความสูงตามข้อความ
- [ ] Max Height จำกัดและรองรับ Scroll
