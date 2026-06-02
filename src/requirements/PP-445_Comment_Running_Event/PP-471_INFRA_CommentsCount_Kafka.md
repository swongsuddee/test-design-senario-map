# PP-471 · [INFRA] เพิ่ม commentsCount field + setup Kafka topics

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-471                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> ทีม Infrastructure เพิ่ม commentsCount field ลงใน Event Document และ Setup Kafka Topics สำหรับ Comment Events

---

## 1. Description

เพิ่ม Field `commentsCount` ลงใน Event Collection ใน Database, Setup Kafka Topics สำหรับ `comment.created` และ `comment.deleted` Events เพื่อรองรับการ Sync จำนวน Comment แบบ Real-time

---

## 2. Acceptance Criteria

### Scenario 1 — commentsCount Field

- **Given:** Event Document ใน Database
- **When:** ตรวจสอบ Schema
- **Then:** มี Field `commentsCount` ที่เป็น Integer ค่าเริ่มต้น 0

### Scenario 2 — Kafka Topics Created

- **Given:** Kafka Cluster พร้อมใช้งาน
- **When:** ตรวจสอบ Topics
- **Then:** Topics `comment.created` และ `comment.deleted` ถูกสร้างพร้อม Partition ที่เหมาะสม

---

## 3. Definition of Done

- [ ] commentsCount Field ถูกเพิ่มใน Event Schema
- [ ] Kafka Topics comment.created และ comment.deleted ถูกสร้าง
- [ ] Migration Script / Document พร้อม
