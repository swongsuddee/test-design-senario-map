# PP-318 · Your Vibes - [BO] User Vibe Management

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-318        |
| **Type**     | Story         |
| **Project**  | POPPA         |
| **Status**   | In Progress         |
| **Assignee** | —             |
| **Figma**    | Design by Dev |

---

## User Story

> **ในฐานะ:** Admin ของระบบ Poppa
> **ฉันต้องการ:** ดูรายชื่อสมาชิกพร้อมระบุ "Animal Type" และคะแนนรายมิติ (Vibe Scores) ในหน้า Backoffice
> **เพื่อ:** นำข้อมูลไปใช้ในการวิเคราะห์กลุ่มผู้ใช้ (Segmentation) และทำ Campaign การตลาดให้ตรงจุด

---

## 1. Description

หน้า Backoffice สำหรับ Admin ที่แสดงตาราง User List พร้อม Animal Type และ Vibe Scores รองรับการ Filter และ Search, Side-panel สำหรับดูรายละเอียด Vibe ของ User แต่ละคน, ปุ่ม Export ข้อมูลเป็น CSV/Excel, และ Summary Dashboard แสดงสถิติภาพรวมของกลุ่มผู้ใช้

---

## 2. Acceptance Criteria

### Scenario 1 — User List with Animal Type

- **Given:** Admin เข้าสู่ระบบและเปิดหน้า User Vibe Management
- **When:** หน้าโหลดสำเร็จ
- **Then:** แสดงตารางที่มีคอลัมน์: User ID, Display Name, Sex, Animal Type, Last Active, Date Joined และ Badge "Not Tested" สำหรับ User ที่ยังไม่ทำ Quiz

### Scenario 2 — Advanced Filtering: Filter by Animal Type

- **Given:** Admin อยู่ที่หน้า User Vibe Management
- **When:** Admin เลือก Filter ตาม Animal Type
- **Then:** ตารางแสดงเฉพาะ User ที่มี Animal Type ตามที่เลือก

### Scenario 3 — Advanced Filtering: Filter by Score Range

- **Given:** Admin อยู่ที่หน้า User Vibe Management
- **When:** Admin กำหนด Score Range รายมิติ (เช่น Energy 60-100)
- **Then:** ตารางแสดงเฉพาะ User ที่มีคะแนนมิตินั้นอยู่ในช่วงที่กำหนด

### Scenario 4 — Search by Username

- **Given:** Admin อยู่ที่หน้า User Vibe Management
- **When:** Admin พิมพ์ Username ในช่องค้นหา
- **Then:** ตารางกรองแสดงเฉพาะ User ที่ตรงกับ Username

### Scenario 5 — User Vibe Detail View

- **Given:** Admin กดที่ User รายหนึ่งในตาราง
- **When:** Side-panel เปิดขึ้น
- **Then:** แสดงสรุปบุคลิกภาพ, Score Meter Chart (%) ครบ 4 มิติ, และรายการ "คุณน่าจะชอบอะไร"

### Scenario 6 — Export to CSV/Excel

- **Given:** Admin อยู่ที่หน้า User Vibe Management
- **When:** กดปุ่ม "Export to CSV/Excel"
- **Then:** ระบบ Download ไฟล์ข้อมูล User Vibe ทั้งหมด (ตามที่ Filter ปัจจุบัน) ในรูปแบบ CSV หรือ Excel

### Scenario 7 — Summary Dashboard

- **Given:** Admin เปิดหน้า User Vibe Management
- **When:** มองที่ส่วน Dashboard
- **Then:** แสดง Total User, Animal Distribution Pie Chart, Engagement Rate, และ Top Vibe Dimension

---

## 3. Technical Rules

### AC for QA

| Rule | Detail |
|------|--------|
| Logic Consistency | Animal Type ที่แสดงต้องตรงกับผลใน Mobile App 100% |
| Performance | Pagination ใช้งานได้, โหลดข้อมูลภายใน 2 วินาที |
| Responsiveness | ตารางข้อมูลแสดงผลถูกต้องบน Desktop |

---

## 4. Definition of Done

- [ ] ตาราง User List แสดงครบทุกคอลัมน์ตาม AC
- [ ] Badge "Not Tested" แสดงสำหรับ User ที่ยังไม่ทำ Quiz
- [ ] Filter ตาม Animal Type ทำงานถูกต้อง
- [ ] Filter ตาม Score Range ทำงานถูกต้อง
- [ ] Search by Username ทำงานถูกต้อง
- [ ] Side-panel แสดง Vibe Detail ครบถ้วน
- [ ] Export CSV/Excel ทำงานได้
- [ ] Summary Dashboard แสดงสถิติถูกต้อง
- [ ] Pagination ทำงานและโหลดภายใน 2 วินาที
- [ ] RBAC กั้นผู้ใช้ที่ไม่ใช่ Admin

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-426](./PP-426_FE_BO_Implement_UI_User_Management_Vibes.md) | [FE][BO] Implement UI User Management list support Your Vibes | To Do |
| [PP-497](./PP-497_FE_BO_Improve_UI_User_List_Management.md) | [FE][BO][Admin] Improve UI user list management | Review Code |
| [PP-498](./PP-498_FE_BO_Implement_UI_Side_Panel_User_Detail.md) | [FE][BO][Admin] Implement UI side plan user detail | Review Code |
| [PP-499](./PP-499_FE_BO_Improve_API_User_List_And_Detail.md) | [FE][BO][Admin] Improve api user list and user detail | To Do |
| [PP-501](./PP-501_BE_Improve_APIs_for_User.md) | [BE] Improve APIs for User | In Progress |
