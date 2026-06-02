# PP-468 · [BE][Story] Implement Pub/Sub Consumer — Story Upload Events

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-468                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> Backend มี Pub/Sub Consumer สำรองสำหรับ Story Upload Events เพื่อรองรับ Scalability และ Redundancy

---

## 1. Description

Implement Pub/Sub Consumer เพิ่มเติมสำหรับ Story Upload Events (ต่างจาก PP-462) รองรับ Consumer Group Pattern, Dead Letter Queue (DLQ) สำหรับ Message ที่ Process ไม่ได้, และ Monitoring

---

## 2. Acceptance Criteria

### Scenario 1 — Consumer Group Processing

- **Given:** มี Story Upload Event บน Kafka Topic
- **When:** Consumer Group รับ Message
- **Then:** แต่ละ Consumer ประมวลผล Message ที่ Assign ให้โดยไม่ซ้ำกัน

### Scenario 2 — Dead Letter Queue

- **Given:** Consumer ประมวลผล Message ล้มเหลวเกิน Retry Limit
- **When:** Message ถูก Retry ครบจำนวน
- **Then:** Message ถูกส่งไปยัง Dead Letter Queue (DLQ) และ Alert ถูกส่ง

### Scenario 3 — Consumer Lag Monitoring

- **Given:** Consumer Group กำลังทำงาน
- **When:** ตรวจสอบ Metrics
- **Then:** Consumer Lag แสดงใน Monitoring Dashboard

---

## 3. Definition of Done

- [ ] Consumer Group ประมวลผล Message โดยไม่ซ้ำกัน
- [ ] DLQ รับ Message ที่ Process ล้มเหลวเกิน Retry Limit
- [ ] Consumer Lag Metric ปรากฏใน Dashboard
