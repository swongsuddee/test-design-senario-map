# PP-444 · [M-App][End-User] Report - Comment

| Field        | Value                                             |
|--------------|---------------------------------------------------|
| **Key**      | PP-444                                            |
| **Type**     | Story                                             |
| **Project**  | POPPA                                             |
| **Status**   | To Do                                             |
| **Assignee** | —                                                 |
| **Figma**    | Design by Dev                                     |

---

## User Story

> **ในฐานะ:** End-User ผุ้ใช้งาน Poppa Mobile App
> **ฉันต้องการ:** ฉันต้องการรายงานคอมเมนต์ที่ไม่เหมาะสมผ่านขั้นตอนการเลือกประเภทปัญหา 2 ระดับและกดยืนยัน
> **เพื่อ:** แจ้งให้ทีมงานตรวจสอบและช่วยคัดกรองเนื้อหาที่ไม่ปลอดภัยออกจากชุมชนงานวิ่ง

---

## 1. Description

ฟีเจอร์ Report Comment บน Poppa Mobile App ช่วยให้ End-User สามารถรายงานคอมเมนต์ที่ไม่เหมาะสมผ่านกระบวนการเลือกประเภทปัญหา 2 ระดับ (Main Question → Sub-Question) และยืนยันด้วยปุ่ม Submit เพื่อส่ง Payload ไปยังหลังบ้าน โดยระบบแสดง BottomSheet "Report" แบบ 3 หน้าจอต่อเนื่อง และแสดง Success Alert เมื่อส่งสำเร็จ

---

## 2. Acceptance Criteria (DEV)

### Scenario 1 — Entry Point Trigger

- **Given:** ผู้ใช้เห็นคอมเมนต์ที่ต้องการรายงาน
- **When:** กดค้างหรือกดเมนูเพิ่มเติมบนคอมเมนต์นั้น
- **Then:** แสดง Option **"Report comment"** พร้อม Icon ตามดีไซน์ และเปิด BottomSheet "Report" ขึ้นมาจากด้านล่างสุดของจอ

### Scenario 2 — Step 1: Main Question Page

- **Given:** BottomSheet "Report" เปิดขึ้น (หน้า 1)
- **When:** ผู้ใช้มองที่รายการหัวข้อปัญหาหลัก
- **Then:** แสดงรายการหัวข้อปัญหาหลัก (เช่น Bullying, Adult content, Spam) โดยด้านขวาของแต่ละหัวข้อต้องมี Icon ลูกศร `>` เพื่อบ่งบอกการไปต่อ

### Scenario 3 — Step 2: Sub-Question Page

- **Given:** ผู้ใช้คลิกหัวข้อหลักจากหน้า 1
- **When:** ระบบดึงรายการหัวข้อย่อยที่ผูกอยู่มาแสดงผล
- **Then:** แสดงหน้า 2 (Sub-Question) พร้อมปุ่มย้อนกลับ `<` ที่มุมบนซ้ายเพื่อกลับไปเปลี่ยนหัวข้อหลักได้

### Scenario 4 — Step 3: Summary & Submit

- **Given:** ผู้ใช้คลิกหัวข้อย่อยจากหน้า 2
- **When:** ระบบเปลี่ยนไปหน้า 3
- **Then:** แสดง Card Summary ของหัวข้อหลักและหัวข้อย่อยที่เลือกเพื่อทบทวน พร้อมเปิดใช้งานปุ่ม **"Submit"** เป็นสีแบรนด์เด่นชัด

### Scenario 5 — Global Close Button

- **Given:** ผู้ใช้อยู่ในหน้าจอใดก็ตามของ Flow Report
- **When:** กดปุ่มกากบาท `X` ที่มุมบนขวา
- **Then:** ปิดหน้าต่างรายงานและยกเลิกกระบวนการได้ทันที กลับสู่หน้าจอคอมเมนต์เดิม

### Scenario 6 — Submit Success State

- **Given:** ผู้ใช้กดปุ่ม Submit บนหน้า 3
- **When:** ระบบส่ง Payload ไปหลังบ้านสำเร็จ
- **Then:** ระบบเปิด Success Alert/Popup แจ้งผู้ใช้ว่าส่งรายงานสำเร็จ และกดปิดเพื่อกลับสู่หน้าจอคอมเมนต์เดิม

---

## 2b. Acceptance Criteria (QA)

### Scenario 7 — State Retention & Back Action

- **Given:** ผู้ใช้เลือกหัวข้อหลักในหน้า 2 แล้ว
- **When:** กดปุ่มย้อนกลับ `<` จากหน้า 2 ไปหน้า 1 หรือจากหน้า 3 ไปหน้า 2
- **Then:** ระบบจดจำหรือล้างค่าสถานะที่เคยกดเลือกได้อย่างถูกต้อง ไม่เกิด UI ค้างหรือกดเบิ้ล

### Scenario 8 — Prevent Double Submission (API Latency)

- **Given:** ผู้ใช้กดปุ่ม "Submit" แล้วระบบกำลังส่งข้อมูลหลังบ้าน
- **When:** ระบบอยู่ในสถานะ Loading
- **Then:** ปุ่ม Submit แสดงสถานะ Loading และไม่อนุญาตให้ผู้ใช้กดซ้ำ (Prevent Double Submission)

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Entry Point | Long Press หรือ More Menu บน Comment |
| Report Flow | 3-Step BottomSheet: Main Question → Sub-Question → Summary & Submit |
| Navigation | ปุ่ม `<` ย้อนกลับได้ในทุกหน้า; ปุ่ม `X` ปิด Flow ได้ทันที |
| Submit Payload | ส่ง Payload (หัวข้อหลัก + หัวข้อย่อย) ไปยัง Backend |
| Loading State | ปุ่ม Submit ต้อง Disable ระหว่าง API call เพื่อป้องกัน Double Submission |
| Success State | แสดง Success Alert/Popup หลัง Submit สำเร็จ |

---

## 4. Definition of Done

- [ ] ปุ่ม "Report comment" แสดงเมื่อ Long Press / กดเมนูเพิ่มเติมบน Comment
- [ ] BottomSheet "Report" เปิดจากด้านล่างสุดพร้อม Icon ตามดีไซน์
- [ ] หน้า 1 แสดงรายการหัวข้อหลักพร้อม Icon ลูกศร `>` ครบถ้วน
- [ ] หน้า 2 แสดงหัวข้อย่อยที่ผูกกับหัวข้อหลักที่เลือก และมีปุ่ม `<` ย้อนกลับ
- [ ] หน้า 3 แสดง Card Summary ของหัวข้อที่เลือก พร้อมปุ่ม Submit สีแบรนด์
- [ ] ปุ่ม `X` ปิด Flow ได้จากทุกหน้าจอ
- [ ] Submit ส่ง Payload สำเร็จและแสดง Success Alert/Popup
- [ ] ปุ่ม Submit แสดง Loading state และป้องกัน Double Submission
- [ ] Back navigation ไม่ทำให้ UI ค้างหรือกดเบิ้ล
