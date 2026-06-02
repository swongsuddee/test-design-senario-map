# PP-296 · [Imp][M-App][End-User] View Who's Registered Event

| Field        | Value                     |
|--------------|---------------------------|
| **Key**      | PP-296                    |
| **Type**     | Story                     |
| **Project**  | POPPA                     |
| **Status**   | Ready To Test STG         |
| **Assignee** | Jojoe - Sattawat.w        |
| **Figma**    | Design by Dev             |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** ดูเพื่อนๆ ที่เข้าสมัครงานวิ่ง
> **เพื่อ:** ทำความรู้จักเพื่อนๆ จากงานวิ่งและติดตามเพื่อนได้

---

## 1. Description

หน้า Event Detail บน Mobile App ต้องแสดงจำนวน "ผู้เข้าร่วมทั้งหมด" โดยเพิ่ม Wording "จาก Poppa X คน" เพื่อจำแนกให้เห็นชัดเจนว่ามีนักวิ่งที่สมัครผ่าน App Poppa กี่คน ใน Total Participants ทั้งหมด ช่วยให้ End-User ทราบสัดส่วนและสามารถติดตาม/ทำความรู้จักเพื่อนนักวิ่งใน Poppa ได้

---

## 2. Acceptance Criteria

### Scenario 1 — แสดง Wording "จาก Poppa X คน"

- **Given:** End-User เปิดหน้า Event Detail
- **When:** ดูส่วนแสดงจำนวนผู้เข้าร่วม
- **Then:** แสดง Wording ในรูปแบบ "ผู้เข้าร่วมทั้งหมด X คน จาก Poppa Y คน" หรือเทียบเท่าตาม Design

### Scenario 2 — ตัวเลข "จาก Poppa" ถูกต้อง

- **Given:** Event มีผู้สมัครจาก Poppa App และจากช่องทางอื่น
- **When:** แสดงจำนวนผู้เข้าร่วม
- **Then:** ตัวเลข "จาก Poppa X คน" ตรงกับจำนวน Participants ที่ลงทะเบียนผ่าน Poppa App จริง

### Scenario 3 — ไม่มีผู้สมัครจาก Poppa

- **Given:** Event ที่ยังไม่มีผู้สมัครผ่าน Poppa App
- **When:** แสดงจำนวนผู้เข้าร่วม
- **Then:** แสดง "จาก Poppa 0 คน" หรือ Wording ที่เหมาะสม ไม่ขึ้น Error

### Scenario 4 — Update Real-time เมื่อมีผู้สมัครใหม่

- **Given:** มีผู้สมัครงานวิ่งผ่าน Poppa App เพิ่มขึ้น
- **When:** End-User Refresh หน้า Event Detail
- **Then:** ตัวเลข "จาก Poppa" อัปเดตเป็นจำนวนล่าสุด

---

## 3. Technical Rules

| Field | รายละเอียด |
|-------|-----------|
| Wording Format | "จาก Poppa X คน" แสดงในส่วนจำนวนผู้เข้าร่วม |
| Data Source | Participation Amount API (PP-336) |
| นับเฉพาะ | Participants ที่ลงทะเบียนผ่าน Poppa App เท่านั้น |

---

## 4. Definition of Done

- [ ] แสดง Wording "จาก Poppa X คน" ถูกต้องตาม AC
- [ ] ตัวเลขตรงกับข้อมูลจาก API
- [ ] กรณี 0 คน แสดงได้ถูกต้องไม่ Error
- [ ] ตัวเลขอัปเดตเมื่อ Refresh
- [ ] Participation Amount API พร้อม (PP-336)
- [ ] Mobile Insert participation amount สำเร็จ (PP-335)
- [ ] ทดสอบบน STG ผ่าน

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-335](./PP-335_MB_Insert_Participation_Amount.md) | [MB] Insert participation amount | Ready To Test STG |
| [PP-336](./PP-336_BE_Create_Participation_Amount_APIs.md) | [BE] Create Participation amount APIs | Ready To Test STG |
