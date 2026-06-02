# PP-92 · Introduce 3 pages

| Field        | Value                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| **Key**      | PP-92                                                                                         |
| **Type**     | Sub-task                                                                                      |
| **Project**  | POPPA                                                                                         |
| **Status**   | To Do                                                                                         |
| **Assignee** | Tum-Natthapon.C                                                                               |
| **Parent**   | [PP-90](./PP-90_Register_Flow.md)                                                             |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5924     |

---

## User Story

> ในฐานะ End-User ที่เพิ่งเปิดแอปครั้งแรก ฉันต้องการดู Onboarding Slides 3 หน้าที่แนะนำฟีเจอร์หลักของ Poppa เพื่อเข้าใจประโยชน์ของแอปก่อนสมัครสมาชิก

---

## 1. Description

แสดงหน้า Onboarding/Introduce จำนวน 3 หน้า ที่อธิบายฟีเจอร์หลักของแอป Poppa ให้ผู้ใช้ใหม่ โดยรองรับการ Swipe ข้ามหน้า และมีปุ่ม Skip เพื่อข้ามไปยังหน้า Sign-up โดยตรง

---

## 2. Acceptance Criteria

### Scenario 1 — Display Introduce Pages

- **Given:** ผู้ใช้ผ่าน Splash Screen มาแล้วและเป็นผู้ใช้ใหม่
- **When:** ระบบแสดง Introduce Pages
- **Then:** แสดง Slide จำนวน 3 หน้าพร้อม Indicator แสดงลำดับหน้าปัจจุบัน

### Scenario 2 — Swipe Navigation

- **Given:** ผู้ใช้อยู่ที่ Introduce Page ใดหน้าหนึ่ง
- **When:** ผู้ใช้ Swipe ซ้าย/ขวา หรือกดปุ่ม Next
- **Then:** ระบบเปลี่ยนไปยัง Slide ถัดไป/ก่อนหน้าตามลำดับ

### Scenario 3 — Skip to Sign-up

- **Given:** ผู้ใช้อยู่ที่ Introduce Pages หน้าใดก็ได้
- **When:** ผู้ใช้กดปุ่ม "Skip"
- **Then:** ระบบนำผู้ใช้ไปยังหน้า Sign-up & Login ทันที

### Scenario 4 — Continue After Last Page

- **Given:** ผู้ใช้อยู่ที่ Introduce Page หน้าที่ 3 (หน้าสุดท้าย)
- **When:** ผู้ใช้กดปุ่ม "เริ่มต้นใช้งาน" หรือ "Get Started"
- **Then:** ระบบนำผู้ใช้ไปยังหน้า Sign-up & Login

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Slide Count | ต้องมีพอดี 3 Slides |
| Page Indicator | แสดง Dot/Bar Indicator ที่ Highlight หน้าปัจจุบัน |
| Skip Button | ปรากฏบนทุกหน้า รวมถึงหน้าสุดท้าย |
| Navigation | Swipe gesture และ Next/Back buttons ต้องทำงานได้พร้อมกัน |

---

## 4. Definition of Done

- [ ] แสดง Introduce Slides ครบ 3 หน้าตาม Figma
- [ ] Page Indicator แสดงลำดับหน้าถูกต้อง
- [ ] Swipe และปุ่ม Next/Back ทำงานได้ถูกต้อง
- [ ] ปุ่ม Skip นำทางไปหน้า Sign-up ได้
- [ ] ปุ่ม Get Started บนหน้าสุดท้ายนำทางไปหน้า Sign-up ได้
