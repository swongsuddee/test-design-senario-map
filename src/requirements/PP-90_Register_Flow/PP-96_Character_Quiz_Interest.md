# PP-96 · Character & Quiz + Interest

| Field        | Value                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| **Key**      | PP-96                                                                                         |
| **Type**     | Sub-task                                                                                      |
| **Project**  | POPPA                                                                                         |
| **Status**   | To Do                                                                                         |
| **Assignee** | Tum-Natthapon.C                                                                               |
| **Parent**   | [PP-90](./PP-90_Register_Flow.md)                                                             |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5924     |

---

## User Story

> ในฐานะ End-User ฉันต้องการทำ Quiz เพื่อให้ระบบรู้จัก Personality และ Interest ของฉัน เพื่อที่แอปจะสามารถแนะนำ Content และกิจกรรมที่เหมาะสมกับฉันได้

---

## 1. Description

ขั้นตอน Character Quiz และการเลือก Interest ของผู้ใช้ใน Register Flow ระบบจะถามคำถามเพื่อวิเคราะห์ Personality ของผู้ใช้และให้ผู้ใช้เลือก Interest ที่ตนสนใจ ข้อมูลเหล่านี้จะถูกนำไปใช้ใน Feed Personalization

---

## 2. Acceptance Criteria

### Scenario 1 — Display Character Quiz

- **Given:** ผู้ใช้ยืนยัน Phone OTP สำเร็จแล้ว
- **When:** ระบบแสดงหน้า Character Quiz
- **Then:** แสดงคำถาม Quiz พร้อมตัวเลือกคำตอบ และ Progress Indicator

### Scenario 2 — Answer Quiz Questions

- **Given:** ผู้ใช้อยู่ที่หน้า Character Quiz
- **When:** ผู้ใช้เลือกคำตอบในแต่ละข้อ
- **Then:** ระบบบันทึกคำตอบและเลื่อนไปข้อถัดไปอัตโนมัติ

### Scenario 3 — Select Interests

- **Given:** ผู้ใช้ตอบ Quiz ครบทุกข้อแล้ว
- **When:** ระบบแสดงหน้าเลือก Interest
- **Then:** ผู้ใช้สามารถเลือก Interest ได้หลายหมวดหมู่ (Multi-select)

### Scenario 4 — Minimum Interest Selection

- **Given:** ผู้ใช้อยู่ที่หน้าเลือก Interest
- **When:** ผู้ใช้เลือก Interest น้อยกว่าจำนวนขั้นต่ำที่กำหนดแล้วกด "ถัดไป"
- **Then:** ระบบแจ้งให้ผู้ใช้เลือก Interest เพิ่มขึ้น

### Scenario 5 — Save and Proceed

- **Given:** ผู้ใช้เลือก Interest ครบตามที่กำหนดแล้ว
- **When:** ผู้ใช้กดปุ่ม "ถัดไป"
- **Then:** ระบบบันทึก Personality และ Interest และนำผู้ใช้ไปยัง Step ถัดไป (End-user Profile)

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Interest Selection | เลือกได้ 1-3 หมวดหมู่ (Multi-select) |
| Storage | บันทึกลง User_Interests Table: Mapping ระหว่าง user_id และ category_id |
| Personalization | ข้อมูล Interest ใช้ใน Feed/Discovery Query |

---

## 4. Definition of Done

- [ ] แสดง Character Quiz ครบทุกข้อพร้อม Progress Indicator
- [ ] บันทึกคำตอบ Quiz ถูกต้อง
- [ ] เลือก Interest แบบ Multi-select ได้
- [ ] แสดง Error เมื่อเลือก Interest น้อยกว่าขั้นต่ำ
- [ ] บันทึก Personality และ Interest และนำทางไปยัง Profile
