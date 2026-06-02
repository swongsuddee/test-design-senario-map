# PP-335 · [MB] Insert participation amount

| Field        | Value                                                                                              |
|--------------|----------------------------------------------------------------------------------------------------|
| **Key**      | PP-335                                                                                             |
| **Type**     | Sub-task                                                                                           |
| **Project**  | POPPA                                                                                              |
| **Status**   | Ready To Test STG                                                                                  |
| **Assignee** | —                                                                                                  |
| **Parent**   | [PP-296](./PP-296_View_Whos_Registered_Event.md)                                                   |

---

## User Story

> Implement Mobile UI ให้แสดงจำนวน Participation Amount พร้อม Wording "จาก Poppa X คน" บนหน้า Event Detail

---

## 1. Description

งาน Mobile ที่ต้อง Integrate ค่า Participation Amount จาก API (PP-336) และแสดง Wording "จาก Poppa X คน" บนส่วนแสดงจำนวนผู้เข้าร่วมของหน้า Event Detail รองรับทุก State ได้แก่ มีข้อมูล, ค่าเป็น 0 และ Loading

---

## 2. Acceptance Criteria

### Scenario 1 — แสดง Wording ถูกต้อง

- **Given:** Participation Amount API ส่งคืนจำนวนผู้สมัครจาก Poppa
- **When:** หน้า Event Detail โหลดสำเร็จ
- **Then:** UI แสดง "จาก Poppa X คน" โดย X ตรงกับค่าจาก API

### Scenario 2 — กรณีค่าเป็น 0

- **Given:** ยังไม่มีผู้สมัครผ่าน Poppa App
- **When:** หน้า Event Detail โหลดสำเร็จ
- **Then:** แสดง "จาก Poppa 0 คน" ไม่ขึ้น Error หรือซ่อน Component

### Scenario 3 — Loading State

- **Given:** กำลัง Fetch ข้อมูล Participation Amount
- **When:** รอ API Response
- **Then:** แสดง Loading Indicator หรือ Placeholder ที่เหมาะสม

---

## 3. Definition of Done

- [ ] Wording "จาก Poppa X คน" แสดงถูกต้องจาก API
- [ ] กรณีค่า 0 แสดงได้ไม่ Error
- [ ] Loading State แสดงระหว่างรอ
- [ ] ผ่าน Code Review และ Integration Test บน STG
