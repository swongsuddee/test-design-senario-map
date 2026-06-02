# PP-352 · Results

| Field        | Value                                      |
|--------------|--------------------------------------------|
| **Key**      | PP-352                                     |
| **Type**     | Sub-task                                   |
| **Project**  | POPPA                                      |
| **Status**   | To Do                                      |
| **Assignee** | —                                          |
| **Figma**    | Design by Dev                              |
| **Parent**   | [PP-350](./PP-350_Search_Event.md)         |

---

## User Story
> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** เห็นผลลัพธ์การค้นหาแบ่งตามประเภท Events, Communities, Posts, Users
> **เพื่อ:** เข้าถึงข้อมูลที่สนใจได้ถูกต้องและรวดเร็ว

---

## 1. Description

Implement หน้าแสดงผลลัพธ์การค้นหาบน Mobile App แบ่งตามประเภทข้อมูล 4 หมวดได้แก่ Events, Communities, Posts และ Users แสดงข้อมูลที่เกี่ยวข้องพร้อม Actions ที่เหมาะสม และ Empty State เมื่อไม่พบผลลัพธ์ในแต่ละหมวด

---

## 2. Acceptance Criteria

### Scenario 1 — Events Results
- **Given:** ผู้ใช้กด Search หรือ Enter หลังพิมพ์คำค้นหา
- **When:** หน้าผลลัพธ์โหลดเสร็จในส่วน Events
- **Then:** แสดงรายการ Event ที่ตรงกับคำค้นหา พร้อมชื่อ Event, วันที่ และสถานะ

### Scenario 2 — Communities Results
- **Given:** ผู้ใช้กด Search หรือ Enter หลังพิมพ์คำค้นหา
- **When:** หน้าผลลัพธ์โหลดเสร็จในส่วน Communities
- **Then:** แสดงรายการกลุ่ม (Community) ที่ตรงกับคำค้นหา

### Scenario 3 — Posts Results
- **Given:** ผู้ใช้กด Search หรือ Enter หลังพิมพ์คำค้นหา
- **When:** หน้าผลลัพธ์โหลดเสร็จในส่วน Posts
- **Then:** แสดงรายการ Post ที่มี Keyword ตรงกับคำค้นหา

### Scenario 4 — Users Results
- **Given:** ผู้ใช้กด Search หรือ Enter หลังพิมพ์คำค้นหา
- **When:** หน้าผลลัพธ์โหลดเสร็จในส่วน Users
- **Then:** แสดงรายชื่อ User พร้อม Avatar, Display Name และปุ่ม Follow

### Scenario 5 — Empty State
- **Given:** ผู้ใช้ค้นหาด้วย Keyword ที่ไม่มีผลลัพธ์
- **When:** ผลลัพธ์โหลดเสร็จในหมวดใดหมวดหนึ่ง
- **Then:** แสดงข้อความ "No results found for '[Keyword]'" ในหมวดที่ไม่มีผลลัพธ์นั้น

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| **Result Categories** | Events, Communities, Posts, Users (4 ประเภท) |
| **Empty State** | แสดง "No results found for '[Keyword]'" เมื่อไม่มีผลลัพธ์ในหมวดนั้น |
| **Users Display** | แสดง Avatar + Display Name + ปุ่ม Follow |
| **Events Display** | แสดงชื่อ Event + วันที่ + สถานะ |

---

## 4. Definition of Done
- [ ] Events Results แสดงชื่อ Event, วันที่ และสถานะได้ถูกต้อง
- [ ] Communities Results แสดงรายชื่อกลุ่มที่ตรงกับคำค้นหา
- [ ] Posts Results แสดง Post ที่มี Keyword ตรงกัน
- [ ] Users Results แสดง Avatar, Display Name และปุ่ม Follow
- [ ] Empty State แสดง "No results found for '[Keyword]'" ในทุกหมวดที่ไม่มีผล
