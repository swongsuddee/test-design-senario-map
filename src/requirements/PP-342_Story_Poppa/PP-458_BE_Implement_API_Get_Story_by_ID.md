# PP-458 · [BE][Story] Implement API Get Story by ID

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-458                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | Ready To Test STG |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> Backend มี API สำหรับดึงข้อมูล Story ตาม ID พร้อม Guard ตรวจสอบ Expiry

---

## 1. Description

Implement API GET Story by ID บน Backend ดึงข้อมูล Story ตาม storyId จาก MongoDB ตรวจสอบว่า Story ยังไม่หมดอายุ (expiresAt > now) และ Return ข้อมูล Story พร้อม Media URL

---

## 2. Acceptance Criteria

### Scenario 1 — Get Story Success

- **Given:** มี Story ที่ยังไม่หมดอายุใน Database
- **When:** Client ส่ง GET /stories/:id
- **Then:** API Return ข้อมูล Story ครบถ้วน

### Scenario 2 — Story Not Found

- **Given:** ไม่มี Story ตาม ID ที่ระบุ
- **When:** Client ส่ง GET /stories/:id
- **Then:** API Return HTTP 404

### Scenario 3 — Expired Story

- **Given:** Story มี expiresAt < now
- **When:** Client ส่ง GET /stories/:id
- **Then:** API Return HTTP 404 หรือ 410 Gone

---

## 3. Definition of Done

- [ ] GET /stories/:id คืนข้อมูล Story สำเร็จ
- [ ] Story Not Found คืน HTTP 404
- [ ] Story Expired คืน HTTP 404 หรือ 410
- [ ] Response Schema ครบทุก Field ที่จำเป็น
