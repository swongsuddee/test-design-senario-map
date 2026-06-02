# PP-346 · Insert Text ได้ / Zoom Text

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-346                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> End-User สามารถเพิ่มข้อความลงบน Story และ Zoom ปรับขนาดตัวอักษรได้

---

## 1. Description

Implement ฟีเจอร์ Insert Text บน Story Editor ให้ผู้ใช้สามารถพิมพ์ข้อความ เลือกสีและ Font, วางตำแหน่ง (Drag), และ Zoom (Pinch) เพื่อปรับขนาดตัวอักษรบน Story

---

## 2. Acceptance Criteria

### Scenario 1 — Insert Text

- **Given:** End-User อยู่ในหน้า Story Editor
- **When:** กดปุ่ม Insert Text
- **Then:** แป้นพิมพ์เปิดขึ้นและผู้ใช้สามารถพิมพ์ข้อความได้

### Scenario 2 — Drag Text Position

- **Given:** มีข้อความบน Story Editor
- **When:** End-User ลาก (Drag) ข้อความ
- **Then:** ข้อความย้ายตำแหน่งตาม Gesture

### Scenario 3 — Zoom Text

- **Given:** มีข้อความบน Story Editor
- **When:** End-User ใช้ Pinch Gesture บนข้อความ
- **Then:** ขนาดตัวอักษรเปลี่ยนตามการ Pinch (ขยาย/ย่อ)

### Scenario 4 — Text Styling

- **Given:** End-User อยู่ในโหมดแก้ไขข้อความ
- **When:** เลือกสีหรือ Style ของข้อความ
- **Then:** ข้อความบน Story แสดงสีและ Style ที่เลือก

---

## 3. Definition of Done

- [ ] Insert Text พิมพ์ข้อความบน Story ได้
- [ ] Drag ย้ายตำแหน่งข้อความได้
- [ ] Pinch Zoom ปรับขนาดข้อความได้
- [ ] เลือกสีและ Style ข้อความได้
