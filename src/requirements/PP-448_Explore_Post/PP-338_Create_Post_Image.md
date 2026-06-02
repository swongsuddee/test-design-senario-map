# PP-338 · [M-App][End-User] Create Post - Image

| Field        | Value |
|--------------|-------|
| **Key**      | PP-338 |
| **Type**     | Sub-task |
| **Project**  | POPPA |
| **Status**   | To Do |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-448](./PP-448_Explore_Post.md) |
| **Figma**    | Design by Dev |

---

## User Story

> ฉันต้องการโพสต์รูปภาพลงในหน้า Feed ของ Poppa โดยสามารถเลือกสัดส่วนภาพที่ต้องการได้

---

## 1. Description

Multi-Format Image Post (IG Style) — ผู้ใช้สามารถอัปโหลดรูปภาพจาก Gallery หรือถ่ายใหม่จากกล้อง โดยเลือกสัดส่วนภาพได้ 3 รูปแบบ ได้แก่ Square (1:1), Vertical (4:5) และ Full Portrait (9:16) พร้อมพิมพ์ Caption และ Tag Event ที่เกี่ยวข้อง

---

## 2. Acceptance Criteria

### Scenario 1 — Select Image from Gallery or Camera

- **Given:** ผู้ใช้เปิดหน้าสร้างโพสต์รูปภาพ
- **When:** ผู้ใช้เลือก Upload Source เป็น Gallery หรือ Camera
- **Then:** ระบบเปิด Gallery หรือกล้องให้ผู้ใช้เลือก/ถ่ายรูป

### Scenario 2 — Select Square Ratio (1:1)

- **Given:** ผู้ใช้เลือกรูปภาพแล้ว
- **When:** ผู้ใช้เลือกสัดส่วน Square (1:1)
- **Then:** ระบบแสดง Preview รูปในสัดส่วน 1:1 (สำหรับภาพมาตรฐาน)

### Scenario 3 — Select Vertical Ratio (4:5)

- **Given:** ผู้ใช้เลือกรูปภาพแล้ว
- **When:** ผู้ใช้เลือกสัดส่วน Vertical (4:5)
- **Then:** ระบบแสดง Preview รูปในสัดส่วน 4:5 (สำหรับภาพถ่ายบุคคลหรือเน้นรายละเอียด)

### Scenario 4 — Select Full Portrait Ratio (9:16)

- **Given:** ผู้ใช้เลือกรูปภาพแล้ว
- **When:** ผู้ใช้เลือกสัดส่วน Full Portrait (9:16)
- **Then:** ระบบแสดง Preview รูปในสัดส่วน 9:16 (สำหรับภาพเต็มจอที่เน้นความสวยงาม)

### Scenario 5 — Add Caption

- **Given:** ผู้ใช้อยู่ในหน้าสร้างโพสต์รูปภาพ
- **When:** ผู้ใช้พิมพ์ข้อความ Caption
- **Then:** ระบบบันทึก Caption และแสดงในโพสต์

### Scenario 6 — Tag Event (Optional)

- **Given:** ผู้ใช้อยู่ในหน้าสร้างโพสต์รูปภาพ
- **When:** ผู้ใช้เลือก Tag Event ที่เกี่ยวข้อง (เช่น เชื่อมโยงกับงาน Awaken Bangkok)
- **Then:** ระบบเชื่อมโยง Event กับโพสต์

---

## 3. Technical Rules

| Feature | Rule |
|---------|------|
| Upload Source | Gallery หรือ Camera |
| Supported Ratios | Square (1:1), Vertical (4:5), Full Portrait (9:16) |
| Caption | Optional free-text input |
| Event Tagging | Optional; ต้องเชื่อมโยงกับ Event ที่มีอยู่ในระบบ |

---

## 4. Definition of Done

- [ ] ผู้ใช้สามารถเลือกรูปจาก Gallery ได้
- [ ] ผู้ใช้สามารถถ่ายรูปใหม่จากกล้องได้
- [ ] ระบบแสดง Preview ในสัดส่วน 1:1 ถูกต้อง
- [ ] ระบบแสดง Preview ในสัดส่วน 4:5 ถูกต้อง
- [ ] ระบบแสดง Preview ในสัดส่วน 9:16 ถูกต้อง
- [ ] ผู้ใช้สามารถพิมพ์ Caption และบันทึกได้
- [ ] ผู้ใช้สามารถ Tag Event ได้ (Optional)
