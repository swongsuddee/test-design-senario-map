# PP-457 · [BE][Story] Implement API Create Story

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-457                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | In Progress |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> Backend มี API สำหรับรับสร้าง Story ใหม่ บันทึกข้อมูล และตั้ง Expiry 24 ชั่วโมง

---

## 1. Description

Implement API Create Story บน Backend รับ Media URL, Text Overlays, Sticker Data, ตั้งค่า Expiry ที่ 24 ชั่วโมง, บันทึกลง MongoDB และ Publish Event ไปยัง Kafka

---

## 2. Acceptance Criteria

### Scenario 1 — Create Story Success

- **Given:** Client ส่ง POST Request พร้อม Media URL และข้อมูล Story
- **When:** API รับ Request
- **Then:** บันทึก Story ลง MongoDB สำเร็จ และ Return Story ID กลับไป

### Scenario 2 — Expiry Setting

- **Given:** Story ถูกสร้างสำเร็จ
- **When:** API บันทึก Document
- **Then:** Field `expiresAt` ถูกตั้งเป็น createdAt + 24 ชั่วโมง

### Scenario 3 — Kafka Event Publish

- **Given:** Story ถูกบันทึกสำเร็จ
- **When:** API บันทึกสำเร็จ
- **Then:** Event `story.created` ถูก Publish ไปยัง Kafka Topic

### Scenario 4 — Validation Error

- **Given:** Client ส่ง Request ที่ขาด Media URL
- **When:** API รับ Request
- **Then:** Return HTTP 400 พร้อม Error Message

---

## 3. Definition of Done

- [ ] POST /stories API รับ Request สำเร็จ
- [ ] บันทึก Story ลง MongoDB พร้อม expiresAt
- [ ] Publish event story.created ไปยัง Kafka
- [ ] Validation Error คืน HTTP 400
