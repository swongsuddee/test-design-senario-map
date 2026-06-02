# PP-351 · Search & Filters

| Field        | Value                                      |
|--------------|--------------------------------------------|
| **Key**      | PP-351                                     |
| **Type**     | Sub-task                                   |
| **Project**  | POPPA                                      |
| **Status**   | To Do                                      |
| **Assignee** | —                                          |
| **Figma**    | Design by Dev                              |
| **Parent**   | [PP-350](./PP-350_Search_Event.md)         |

---

## User Story
> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** ต้องการค้นหากลุ่มกิจกรรมแยกตามหมวดหมู่ความสนใจ
> **เพื่อ:** เข้าร่วมกลุ่มกิจกรรมที่ชื่นชอบ

---

## 1. Description

Implement Search Bar และ Filter UI บน Mobile App รองรับการค้นหากลุ่ม (Community Discovery) แยกตามหมวดหมู่ความสนใจ ผู้ใช้สามารถกรองคอนเทนต์ผ่าน Interest Tabs, เรียกดู Category Cards และเข้าถึง Community List ภายในหมวดหมู่ที่เลือกพร้อมข้อมูลจำนวนสมาชิกและรูป Avatar เพื่อนในระบบ

---

## 2. Acceptance Criteria

### Scenario 1 — Interest Tabs (แถบหมวดหมู่)
- **Given:** ผู้ใช้อยู่ในหน้า Search / Explore
- **When:** ผู้ใช้มองเห็นแถบด้านบนของหน้า
- **Then:** แสดงแถบหมวดหมู่ (เช่น Marathon, Yoga, Trail, Cycling) ที่สามารถกดเพื่อกรอง (Filter) คอนเทนต์หรือกลุ่มตามหมวดหมู่ได้

### Scenario 2 — Category Cards (การ์ดหมวดหมู่)
- **Given:** ผู้ใช้อยู่ในหน้า Search / Explore
- **When:** ผู้ใช้มองเห็นส่วน Category
- **Then:** แสดงหมวดหมู่ยอดนิยมในรูปแบบการ์ดภาพ (Active Lifestyle, Wellness, Creative, Social) ที่สวยงามและกดเพื่อสำรวจได้

### Scenario 3 — Community List (รายชื่อกลุ่ม)
- **Given:** ผู้ใช้กดเลือก Category Card ใดหมวดหมู่หนึ่ง
- **When:** หน้าแสดงผลภายในหมวดหมู่
- **Then:** แสดงรายชื่อ Community ภายในหมวดหมู่นั้น พร้อม:
  - จำนวนสมาชิก
  - รูป Avatar ของเพื่อนในระบบที่อยู่ในกลุ่มนั้น

### Scenario 4 — Clear Button
- **Given:** ผู้ใช้พิมพ์ข้อความในช่อง Search
- **When:** กดปุ่ม Clear (X)
- **Then:** Search Bar ล้างข้อความและผลลัพธ์ Instant Search หายไป

### Scenario 5 — Cancel Button
- **Given:** ผู้ใช้อยู่ในหน้า Search
- **When:** กดปุ่ม Cancel
- **Then:** ออกจากหน้า Search กลับสู่หน้าก่อนหน้า

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| **Interest Tabs** | Filter คอนเทนต์ตามหมวดหมู่ที่เลือก (Marathon, Yoga, Trail, Cycling เป็นต้น) |
| **Category Cards** | แสดงภาพ Thumbnail สวยงาม รองรับ Active Lifestyle, Wellness, Creative, Social |
| **Community List** | แสดงจำนวนสมาชิก + Avatar เพื่อนในระบบที่อยู่ในกลุ่ม |

---

## 4. Definition of Done
- [ ] Interest Tabs แสดงถูกต้องและกรอง (Filter) คอนเทนต์ตามหมวดหมู่ได้
- [ ] Category Cards แสดงภาพสวยงามและกดเข้าได้
- [ ] Community List แสดงรายชื่อกลุ่มพร้อมจำนวนสมาชิกและ Avatar เพื่อน
- [ ] Clear Button (X) ล้าง Input และ Instant Results ได้
- [ ] Cancel Button ออกจากหน้า Search กลับหน้าก่อนหน้า
