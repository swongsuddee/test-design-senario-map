# PP-340 · [M-App][End-User] Content Interaction & Engagement

| Field        | Value                                          |
|--------------|------------------------------------------------|
| **Key**      | PP-340                                         |
| **Type**     | Sub-task                                       |
| **Project**  | POPPA                                          |
| **Status**   | To Do                                          |
| **Assignee** | —                                              |
| **Parent**   | [PP-337](./PP-337_Poppa_Explore_Post.md)       |

---

## User Story

> End-User สามารถกดไลก์และคอมเมนต์บนโพสต์ใน Explore Feed เพื่อสร้าง Engagement ภายใน Community ได้

---

## 1. Description

Implement ระบบ Content Interaction & Engagement บน Mobile App รองรับการกดไลก์ (toggle), แสดงยอดไลก์, คอมเมนต์, และการแสดงผล Engagement แบบ Real-time บนโพสต์ใน Explore Feed

---

## 2. Acceptance Criteria

### Scenario 1 — Like Post

- **Given:** End-User เห็นโพสต์ใน Explore Feed
- **When:** กดปุ่ม Like
- **Then:** ไอคอน Like เปลี่ยนสถานะ (toggle) และยอดไลก์เพิ่มขึ้น 1

### Scenario 2 — Unlike Post

- **Given:** End-User เคยกด Like โพสต์แล้ว
- **When:** กดปุ่ม Like อีกครั้ง
- **Then:** ไอคอน Like กลับสู่สถานะปกติ และยอดไลก์ลดลง 1

### Scenario 3 — View Comment Count

- **Given:** มีโพสต์ปรากฏใน Explore Feed
- **When:** ระบบโหลดโพสต์
- **Then:** แสดงจำนวน Comment บนโพสต์ถูกต้อง

### Scenario 4 — Navigate to Comment

- **Given:** End-User เห็นโพสต์ใน Explore Feed
- **When:** กดไอคอน Comment
- **Then:** ระบบนำทางไปยังหน้า Comment ของโพสต์นั้น

---

## 3. Definition of Done

- [ ] Like toggle ทำงานถูกต้อง (Like/Unlike)
- [ ] ยอดไลก์แสดงแบบ Real-time
- [ ] จำนวน Comment แสดงถูกต้อง
- [ ] Navigation ไปหน้า Comment ทำงานได้
