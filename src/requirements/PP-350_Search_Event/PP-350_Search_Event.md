# PP-350 · [M-App][End-User] Search Event

| Field        | Value             |
|--------------|-------------------|
| **Key**      | PP-350            |
| **Type**     | Story             |
| **Project**  | POPPA             |
| **Status**   | To Do             |
| **Assignee** | —                 |
| **Figma**    | Design by Dev     |

---

## User Story
> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** ต้องการค้นหา User, งานวิ่ง (Event) และสถานที่ (Place) ได้จากช่องทางเดียว
> **เพื่อ:** ให้สามารถเข้าถึงข้อมูลที่สนใจได้อย่างรวดเร็วและแม่นยำ

---

## 1. Description

พัฒนาระบบ Search ในรูปแบบ **Global Search** ที่รองรับการค้นหาแบบ **Partial Match** (พิมพ์เพียงบางส่วนก็เจอ) โดยแสดงผลลัพธ์แบบ Real-time แบ่งตามประเภทข้อมูลหลัก 3 อย่างคือ Accounts, Events และ Places

Story เราจะมาลุยการสร้าง Filter การค้นหา รูปแบบต่างๆ ให้ End-User ได้ค้นพบตัวเอง

---

## 2. Acceptance Criteria

### Scenario 1 — การแสดงผลขณะพิมพ์ (Instant Search / Partial Search)
- **Given:** ผู้ใช้อยู่ในหน้า Search และเริ่มพิมพ์ข้อความในช่อง Search
- **When:** ผู้ใช้พิมพ์ตัวอักษรลงในช่อง Search (ยังไม่กด Enter)
- **Then:** ระบบต้องเริ่มค้นหาทันทีและแสดงผลลัพธ์ที่ใกล้เคียงที่สุด **ไม่เกิน 5 รายการ** เพื่อความรวดเร็วและไม่รกหน้าจอ

### Scenario 2 — ขอบเขตการค้นหา (Search Scope)
- **Given:** ผู้ใช้กรอกคำค้นหาในช่อง Search
- **When:** ระบบประมวลผลคำค้นหา
- **Then:** ระบบค้นหาครอบคลุม 4 Index ดังนี้:
  - **Events:** ค้นหาจาก `Event Name` (เช่น งานวิ่งมาราธอนต่างๆ)
  - **Community:** ค้นหาจากชื่อกลุ่ม
  - **Post:** ค้นหาจาก Keyword ใน Post
  - **User / Accounts:** ค้นหาจาก `Display Name` ของผู้ใช้งาน

### Scenario 3 — หน้าจอผลลัพธ์ (Search Results Page)
- **Given:** ผู้ใช้กรอกคำค้นหาเสร็จแล้ว
- **When:** ผู้ใช้กด "Search" หรือ "Enter" บน Keyboard
- **Then:** ระบบแสดงหน้าผลลัพธ์แบบแยก Tab ได้แก่:
  - **Accounts:** แสดงรายชื่อผู้ใช้งานพร้อมรูปโปรไฟล์และปุ่ม Follow
  - **Events:** แสดงรายการงานวิ่ง วันที่ และสถานะ
  - **Places:** แสดงจังหวัดที่มีกิจกรรมที่ค้นพบ (Incoming Event)

### Scenario 4 — Search Bar UI Elements
- **Given:** ผู้ใช้อยู่ในหน้า Search
- **When:** ผู้ใช้กรอกข้อความในช่อง Search
- **Then:**
  - แสดงปุ่ม "X" (Clear) เพื่อลบข้อความที่พิมพ์ทั้งหมด
  - แสดงปุ่ม "Cancel" เพื่อยกเลิกการค้นหา
  - แสดงรูปภาพ Profile (สำหรับ Account) หรือ Icon/Logo (สำหรับ Event) นำหน้าชื่อเสมอ
  - ใต้ชื่อหลักมีข้อมูลเสริม เช่น "Followed by..." หรือ "Location Name"

### Scenario 5 — Empty State
- **Given:** ผู้ใช้กรอกคำค้นหาและกด Search
- **When:** ระบบไม่พบข้อมูลที่ตรงกับคำค้นหา
- **Then:** แสดงข้อความ "No results found for '[Keyword]'"

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| **Debouncing** | ตั้งค่า Debounce ประมาณ 300ms เพื่อลดภาระของ API ในขณะที่ผู้ใช้พิมพ์เร็วๆ |
| **Data Priority** | กรณีแสดง 5 รายการในหน้า Partial Search ควรเฉลี่ยประเภทข้อมูล (เช่น Account 2, Event 2, Place 1) หรือเรียงตามความนิยม (Popularity/Relevance) |
| **Search Type** | Partial Match — พิมพ์เพียงบางส่วนก็เจอ |
| **Search Indexes** | Events, Community, Post, User (4 Index) |
| **Empty State** | แสดงข้อความ "No results found for '[Keyword]'" เมื่อไม่พบข้อมูล |

**ตัวอย่างการจัดลำดับใน Partial Search (5 รายการ):**

1. [User Icon] **runnin**gmanth (Account)
2. [Event Icon] **Runnin**g Marathon 2024 (Event)
3. [User Icon] ugly\_**runnin**g\_club (Account)
4. [Place Icon] **Runnin**g Track - Lumpini Park (Place)
5. [User Icon] ari\_**runnin**g (Account)

---

## 4. Definition of Done
- [ ] ระบบเริ่มค้นหาทันทีเมื่อผู้ใช้พิมพ์ตัวอักษร (Instant Search)
- [ ] Partial Search แสดงผลลัพธ์ไม่เกิน 5 รายการขณะพิมพ์
- [ ] Debounce 300ms ทำงานถูกต้องเพื่อลดภาระ API
- [ ] ค้นหาครอบคลุม 4 Index: Events, Community, Post, User/Accounts
- [ ] หน้าผลลัพธ์แสดง Tab แยกประเภท (Accounts, Events, Places)
- [ ] แต่ละรายการแสดง Profile/Icon นำหน้าชื่อ
- [ ] มีข้อมูลเสริมใต้ชื่อหลัก (Followed by... / Location Name)
- [ ] Search Bar มีปุ่ม "X" (Clear) และปุ่ม "Cancel" ทำงานถูกต้อง
- [ ] แสดง Empty State "No results found for '[Keyword]'" เมื่อไม่พบข้อมูล

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-351](./PP-351_Search_Filters.md) | Search & Filters | To Do |
| [PP-352](./PP-352_Results.md) | Results | To Do |
