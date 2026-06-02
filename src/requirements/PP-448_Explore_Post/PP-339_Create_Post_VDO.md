# PP-339 · [M-App][End-User] Create Post - VDO

| Field        | Value |
|--------------|-------|
| **Key**      | PP-339 |
| **Type**     | Sub-task |
| **Project**  | POPPA |
| **Status**   | To Do |
| **Assignee** | — |
| **Parent**   | [PP-448](./PP-448_Explore_Post.md) |
| **Figma**    | Design by Dev |

---

## User Story

> ฉันต้องการโพสต์วิดีโอสั้นเพื่อโชว์บรรยากาศการวิ่งที่น่าตื่นเต้น

---

## 1. Description

Short-Form Video Post (Poppa Reels) — ผู้ใช้สามารถอัปโหลดวิดีโอสั้นในรูปแบบ 16:9 หรือ Square 1:1 (Vertical/Full Screen) โดยมีความยาวไม่เกิน 15 วินาที หากวิดีโอยาวเกินกำหนด ระบบจะมี Trim Tool ให้ตัดให้พอดี

---

## 2. Acceptance Criteria

### Scenario 1 — Upload Video in 16:9 Format

- **Given:** ผู้ใช้เปิดหน้าสร้างโพสต์วิดีโอ
- **When:** ผู้ใช้เลือกไฟล์วิดีโอสัดส่วน 16:9
- **Then:** ระบบรับไฟล์และแสดง Preview ในสัดส่วน 16:9

### Scenario 2 — Upload Video in Square 1:1 Format

- **Given:** ผู้ใช้เปิดหน้าสร้างโพสต์วิดีโอ
- **When:** ผู้ใช้เลือกไฟล์วิดีโอสัดส่วน Square 1:1
- **Then:** ระบบรับไฟล์และแสดง Preview ในสัดส่วน 1:1

### Scenario 3 — Video within 15 Seconds Accepted

- **Given:** ผู้ใช้เลือกไฟล์วิดีโอ
- **When:** ความยาววิดีโอไม่เกิน 15 วินาที
- **Then:** ระบบรับไฟล์และพร้อมโพสต์

### Scenario 4 — Video Exceeds 15 Seconds — Trim Tool Shown

- **Given:** ผู้ใช้เลือกไฟล์วิดีโอที่ยาวเกิน 15 วินาที
- **When:** ระบบตรวจสอบความยาว
- **Then:** ระบบแสดง Trim Tool ให้ผู้ใช้ตัดวิดีโอให้อยู่ในขอบเขต 15 วินาที

---

## 3. Technical Rules

| Feature | Rule |
|---------|------|
| Supported Video Formats | 16:9, Square 1:1 (Vertical/Full Screen) |
| Max Duration | 15 วินาที |
| Over-limit Handling | แสดง Trim Tool ให้ผู้ใช้ตัด |

> **Note:** หา VDO sizing ที่เหมาะสม (TBD)

---

## 4. Definition of Done

- [ ] ระบบรับไฟล์วิดีโอสัดส่วน 16:9 และแสดง Preview ถูกต้อง
- [ ] ระบบรับไฟล์วิดีโอสัดส่วน 1:1 และแสดง Preview ถูกต้อง
- [ ] วิดีโอที่ยาวไม่เกิน 15 วินาที ผ่านการตรวจสอบและพร้อมโพสต์
- [ ] วิดีโอที่ยาวเกิน 15 วินาที แสดง Trim Tool ให้ผู้ใช้ตัด
