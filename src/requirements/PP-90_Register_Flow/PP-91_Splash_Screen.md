# PP-91 · Splash Screen

| Field        | Value                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| **Key**      | PP-91                                                                                         |
| **Type**     | Sub-task                                                                                      |
| **Project**  | POPPA                                                                                         |
| **Status**   | To Do                                                                                         |
| **Assignee** | Tum-Natthapon.C                                                                               |
| **Parent**   | [PP-90](./PP-90_Register_Flow.md)                                                             |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5924     |

---

## User Story

> ในฐานะ End-User เมื่อเปิดแอป ฉันต้องการเห็น Splash Screen ของ Poppa ก่อนเข้าสู่หน้าหลัก เพื่อให้แอปโหลดข้อมูลเบื้องต้นและสร้างประสบการณ์ที่ดีตั้งแต่แรก

---

## 1. Description

แสดง Splash Screen (หน้าจอเริ่มต้น) เมื่อผู้ใช้เปิดแอปเป็นครั้งแรกหรือทุกครั้ง โดยแสดง Logo และ Branding ของ Poppa ระหว่างที่แอปกำลังโหลด จากนั้นเปลี่ยนไปยังหน้าถัดไปโดยอัตโนมัติ

---

## 2. Acceptance Criteria

### Scenario 1 — Splash Screen Display

- **Given:** ผู้ใช้เปิดแอปพลิเคชัน Poppa
- **When:** แอปเริ่มต้น (App Launch)
- **Then:** ระบบแสดง Splash Screen พร้อม Logo และ Branding ของ Poppa

### Scenario 2 — Auto Navigation

- **Given:** Splash Screen กำลังแสดงอยู่
- **When:** โหลดข้อมูลเบื้องต้นเสร็จสิ้น (หรือครบเวลาที่กำหนด)
- **Then:** ระบบเปลี่ยนหน้าไปยัง Introduce Pages โดยอัตโนมัติ

### Scenario 3 — Already Logged In

- **Given:** ผู้ใช้เคย Login แล้วและ Session ยังไม่หมดอายุ
- **When:** Splash Screen โหลดเสร็จ
- **Then:** ระบบนำผู้ใช้ไปยังหน้า Home โดยตรง ไม่ผ่าน Introduce Pages

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Duration | แสดง Splash Screen จนกว่าข้อมูลเบื้องต้นโหลดเสร็จ หรือตามเวลาที่ Config ไว้ |
| Session Check | ตรวจสอบ JWT / Refresh Token ก่อน Navigate ออกจาก Splash |
| Branding | ต้องตรงตาม Figma — Logo, สี, ขนาด |

---

## 4. Definition of Done

- [ ] Splash Screen แสดง Logo และ Branding ถูกต้องตาม Figma
- [ ] เปลี่ยนหน้าไปยัง Introduce Pages โดยอัตโนมัติหลังโหลดเสร็จ
- [ ] กรณี Session ยังใช้งานได้ ระบบ Redirect ไปหน้า Home
