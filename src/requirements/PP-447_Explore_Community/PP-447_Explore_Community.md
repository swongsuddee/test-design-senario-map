# PP-447 · [M-App][End-User] Explore - Community (หน้า List ชุมชน)

| Field        | Value                                      |
|--------------|--------------------------------------------|
| **Key**      | PP-447                                     |
| **Type**     | Story                                      |
| **Project**  | POPPA                                      |
| **Status**   | To Do                                      |
| **Assignee** | —                                          |
| **Figma**    | Design by Dev                              |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** ค้นหาและเข้าสู่กลุ่มที่สนใจเพื่อดูความเคลื่อนไหว
> **เพื่อ:** รวมตัวกับคนที่มีความสนใจเดียวกัน (เช่น กลุ่มงานวิ่ง, กลุ่มโยคะ) เข้าไปพูดคุย แลกเปลี่ยนเนื้อหา และสื่อสารกันแบบ Real-time

---

## 1. Description

หน้า Explore Community แสดงรายการ Community/กลุ่มต่างๆ ที่มีอยู่ในระบบให้ End-User สามารถค้นหา เรียกดู และเข้าร่วมกลุ่มที่สนใจได้ รองรับการแสดงข้อมูลกลุ่ม เช่น ชื่อกลุ่ม, จำนวนสมาชิก, รูปภาพปก และสถานะการเป็นสมาชิก

---

## 2. Acceptance Criteria

### Scenario 1 — Community List Display

- **Given:** End-User เปิดหน้า Explore และเลือก Community Tab
- **When:** หน้าโหลดเสร็จ
- **Then:** แสดงรายการ Community พร้อมรูปปก, ชื่อกลุ่ม, และจำนวนสมาชิก

### Scenario 2 — Search Community

- **Given:** End-User อยู่ในหน้า Community List
- **When:** พิมพ์ชื่อกลุ่มในช่อง Search
- **Then:** รายการกรองแสดงเฉพาะ Community ที่ตรงกับ Keyword

### Scenario 3 — Join Community

- **Given:** End-User เห็น Community ที่ยังไม่ได้เข้าร่วม
- **When:** กดปุ่ม Join/เข้าร่วม
- **Then:** ระบบเพิ่ม User เข้ากลุ่มและปุ่มเปลี่ยนเป็น "สมาชิก"

### Scenario 4 — Enter Community

- **Given:** End-User เห็น Community ใน List
- **When:** กดที่ Community Card
- **Then:** ระบบนำทางไปยังหน้า Community Detail/Feed

### Scenario 5 — Already Joined State

- **Given:** End-User เป็นสมาชิกของ Community อยู่แล้ว
- **When:** เห็น Community นั้นใน List
- **Then:** ปุ่มแสดงสถานะ "สมาชิก" แทนปุ่ม Join

---

## 3. Technical Rules

| Rule             | Detail                                             |
|------------------|----------------------------------------------------|
| Community Data   | ชื่อ, รูปปก, จำนวนสมาชิก, สถานะ Join             |
| Search           | Partial Match บนชื่อกลุ่ม                         |
| Real-time        | จำนวนสมาชิกอัปเดตหลัง Join                        |

---

## 4. Definition of Done

- [ ] Community List แสดงข้อมูลครบถ้วน (รูปปก, ชื่อกลุ่ม, จำนวนสมาชิก)
- [ ] Search Community กรองผลลัพธ์ตาม Keyword ได้ถูกต้อง
- [ ] Join Community ทำงานได้และอัปเดตสถานะปุ่มเป็น "สมาชิก"
- [ ] Navigation ไปหน้า Community Detail/Feed ทำงานได้
- [ ] Already Joined State แสดงสถานะ "สมาชิก" ถูกต้องใน List

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| — | ไม่มี Sub-task | — |
