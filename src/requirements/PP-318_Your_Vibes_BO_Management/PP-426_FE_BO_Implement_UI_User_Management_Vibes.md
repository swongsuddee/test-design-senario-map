# PP-426 · [FE][BO] Implement UI User Management list support Your Vibes

| Field        | Value                                                           |
|--------------|-----------------------------------------------------------------|
| **Key**      | PP-426                                                          |
| **Type**     | Sub-task                                                        |
| **Project**  | POPPA                                                           |
| **Status**   | To Do                                                           |
| **Assignee** | —                                                               |
| **Parent**   | [PP-318](./PP-318_Your_Vibes_BO_Management.md)                  |

---

## User Story

> Implement หน้า User Management List ใน Backoffice ให้รองรับการแสดงข้อมูล Your Vibes (Animal Type และ Vibe Scores)

---

## 1. Description

เพิ่ม Column Animal Type และ Vibe-related Fields ลงในตาราง User Management List ที่มีอยู่ใน Backoffice รองรับการแสดง Badge "Not Tested" สำหรับ User ที่ยังไม่ทำ Quiz และ Integrate กับ Filter / Search สำหรับ Vibe Data

---

## 2. Acceptance Criteria

### Scenario 1 — ตารางแสดง Animal Type

- **Given:** Admin เข้าหน้า User Management
- **When:** หน้าโหลดสำเร็จ
- **Then:** ตารางมีคอลัมน์ Animal Type แสดง Animal Name หรือ Badge "Not Tested"

### Scenario 2 — Badge "Not Tested"

- **Given:** User ในตารางยังไม่มี vibe_result
- **When:** มองที่คอลัมน์ Animal Type
- **Then:** แสดง Badge "Not Tested" แทน Animal Name

### Scenario 3 — ตารางแสดงคอลัมน์ครบถ้วน

- **Given:** Admin เปิดหน้า User Management
- **When:** มองที่ตาราง
- **Then:** มีคอลัมน์ User ID, Display Name, Sex, Animal Type, Last Active, Date Joined ครบถ้วน

---

## 3. Definition of Done

- [ ] คอลัมน์ Animal Type เพิ่มในตาราง User Management
- [ ] Badge "Not Tested" แสดงถูกต้อง
- [ ] คอลัมน์ทั้ง 6 รายการแสดงครบถ้วน
- [ ] ทำงานถูกต้องบน Desktop Resolution
