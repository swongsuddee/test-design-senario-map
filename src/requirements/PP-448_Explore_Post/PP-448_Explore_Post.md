# PP-448 · [M-App][End-User] Poppa Explore Post (สร้างโพสต์)

| Field        | Value |
|--------------|-------|
| **Key**      | PP-448 |
| **Type**     | Story |
| **Project**  | POPPA |
| **Status**   | To Do |
| **Assignee** | — |
| **Figma**    | [Figma Design](https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?m=auto&node-id=1847-19505&t=C9hXnZum2SZxFYyy-1) |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** แบ่งปันประสบการณ์การซ้อมวิ่ง, Lifestyle หรือบรรยากาศงานวิ่งผ่านรูปภาพและวิดีโอสั้น
> **เพื่อ:** สร้างแรงบันดาลใจให้เพื่อนใน Community

---

## 1. Description

Explore Post คือฟีเจอร์ที่ให้ End-User สามารถสร้างและแบ่งปันโพสต์ในรูปแบบรูปภาพหรือวิดีโอสั้นลงใน Feed ของ Poppa Community ผู้ใช้สามารถเลือกสัดส่วนภาพ เพิ่ม Caption และ Tag Event ที่เกี่ยวข้องได้ นอกจากนี้ยังรองรับการ Interaction เช่น Like, Comment และ Follow รวมถึงมีระบบ Report เนื้อหาที่ไม่เหมาะสมเพื่อรักษาความปลอดภัยของ Community

---

## 2. Acceptance Criteria

### Scenario 1 — Create Image Post with Supported Ratios

- **Given:** ผู้ใช้เปิดหน้าสร้างโพสต์
- **When:** ผู้ใช้เลือกรูปภาพจาก Gallery หรือถ่ายใหม่จากกล้อง และเลือกสัดส่วนภาพ (Square 1:1 / Vertical 4:5 / Full Portrait 9:16)
- **Then:** ระบบแสดงตัวอย่างรูปในสัดส่วนที่เลือกและพร้อม Upload ลง Feed

### Scenario 2 — Add Caption and Tag Event to Image Post

- **Given:** ผู้ใช้กำลังสร้างโพสต์รูปภาพ
- **When:** ผู้ใช้พิมพ์ข้อความ Caption และเลือก Tag Event ที่เกี่ยวข้อง (Optional)
- **Then:** ระบบบันทึก Caption และ Tag Event ลงในโพสต์

### Scenario 3 — Create Short Video Post

- **Given:** ผู้ใช้เปิดหน้าสร้างโพสต์วิดีโอ
- **When:** ผู้ใช้เลือกไฟล์วิดีโอสัดส่วน 16:9 หรือ Square 1:1
- **Then:** ระบบรับไฟล์ที่มีความยาวไม่เกิน 15 วินาที; หากยาวเกินระบบแสดง Tool ให้ Trim

### Scenario 4 — Like a Post

- **Given:** ผู้ใช้เห็นโพสต์ใน Feed
- **When:** ผู้ใช้กดปุ่มหัวใจ
- **Then:** ระบบ Toggle Like On/Off และอัปเดตจำนวน Like รวมแบบ Real-time

### Scenario 5 — Comment on a Post

- **Given:** ผู้ใช้เปิดโพสต์ของเพื่อน
- **When:** ผู้ใช้พิมพ์ข้อความ Comment และกด Submit
- **Then:** ระบบแสดง Comment ของผู้ใช้ใต้โพสต์และผู้อื่นสามารถเห็นได้

### Scenario 6 — Follow Post Author

- **Given:** ผู้ใช้เห็นโพสต์ของ User ที่ยังไม่ได้ Follow
- **When:** ผู้ใช้กดปุ่ม Follow ข้างชื่อผู้โพสต์
- **Then:** ระบบบันทึก Follow และปุ่ม Follow หายไปเมื่อ Follow แล้ว

### Scenario 7 — Report Inappropriate Post

- **Given:** ผู้ใช้เห็นโพสต์ที่ไม่เหมาะสม
- **When:** ผู้ใช้กดเมนู 3 Dots เลือก "Report" และเลือกสาเหตุ (Spam / Inappropriate Content / Harassment)
- **Then:** ระบบส่งข้อมูล Report ไปยัง Backoffice Admin Poppa เพื่อตรวจสอบและดำเนินการต่อ

---

## 3. Technical Rules

| Feature | Rule |
|---------|------|
| Image Upload Source | Gallery หรือ Camera |
| Supported Image Ratios | Square (1:1), Vertical (4:5), Full Portrait (9:16) |
| Video Format | 16:9 หรือ Square 1:1 (Vertical/Full Screen) |
| Video Max Duration | 15 วินาที (มี Trim Tool หากยาวเกิน) |
| Caption | Optional free-text |
| Event Tag | Optional |
| Like | Toggle On/Off, แสดงจำนวนรวม |
| Follow | ปุ่มหายไปหลัง Follow แล้ว |
| In-App Notification | แจ้งเจ้าของโพสต์เมื่อมี Like / Comment / Follow |
| Report Reasons | Spam, Inappropriate Content, Harassment |
| Report Flow | ส่งข้อมูลไป Backoffice → Admin ตรวจสอบ → ลบโพสต์หรือ Ban ผู้ใช้ |

---

## 4. Definition of Done

- [ ] ผู้ใช้สามารถเลือกรูปจาก Gallery หรือถ่ายใหม่และโพสต์ลง Feed ได้
- [ ] ระบบรองรับการแสดงผลภาพในสัดส่วน 1:1, 4:5 และ 9:16
- [ ] ผู้ใช้สามารถพิมพ์ Caption และ Tag Event ได้
- [ ] ระบบรับวิดีโอสัดส่วน 16:9 และ 1:1 ความยาวไม่เกิน 15 วินาที พร้อม Trim Tool
- [ ] ปุ่ม Like Toggle ทำงานได้ถูกต้องและจำนวน Like อัปเดต Real-time
- [ ] ผู้ใช้สามารถ Comment และเห็น Comment ของคนอื่นได้
- [ ] ปุ่ม Follow ทำงานถูกต้องและหายไปหลัง Follow แล้ว
- [ ] In-App Notification ส่งแจ้งเตือนไปยังเจ้าของโพสต์เมื่อมี Like / Comment / Follow
- [ ] ผู้ใช้สามารถ Report โพสต์พร้อมเลือกสาเหตุได้
- [ ] ข้อมูล Report ถูกส่งไปยัง Backoffice Admin ครบถ้วน

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-338](./PP-338_Create_Post_Image.md) | [M-App][End-User] Create Post - Image | To Do |
| [PP-339](./PP-339_Create_Post_VDO.md) | [M-App][End-User] Create Post - VDO | To Do |
| [PP-340](./PP-340_Content_Interaction_Engagement.md) | [M-App][End-User] Content Interaction & Engagement | To Do |
| [PP-341](./PP-341_Content_Moderation_Safety_Report.md) | [M-App][End-User] Content Moderation (Safety & Report) | To Do |
