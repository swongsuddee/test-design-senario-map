# PP-320 · [BE][Admin] create api delete organize

| Field        | Value                                                    |
|--------------|----------------------------------------------------------|
| **Key**      | PP-320                                                   |
| **Type**     | Sub-task                                                 |
| **Project**  | POPPA                                                    |
| **Status**   | Ready To Test STG                                        |
| **Assignee** | Ohm-Phakorn.s                                            |
| **Parent**   | [PP-244](./PP-244_Delete_Organizer_Account.md)           |
| **Figma**    | Design by Dev                                            |

---

## User Story

สร้าง API endpoint สำหรับ Admin ลบ Organizer Account

---

## 1. Acceptance Criteria

### Scenario 1 — Delete Organizer API

- **Given:** Admin ส่ง DELETE request พร้อม organizer ID ที่ถูกต้อง
- **When:** API ประมวลผลคำขอ
- **Then:** ลบ account และ revoke session ของ Organizer นั้นทั้งหมด; ตอบ 200 OK

### Scenario 2 — Organizer ไม่มีอยู่

- **Given:** Admin ส่ง ID ที่ไม่มีใน DB
- **When:** API ประมวลผลคำขอ
- **Then:** ตอบ 404 Not Found พร้อม error message

---

## 2. Definition of Done

- [ ] DELETE /organizers/:id endpoint ทำงานถูกต้อง
- [ ] Session ของ Organizer ถูก revoke หลังลบ
- [ ] Return 404 เมื่อ ID ไม่พบ
