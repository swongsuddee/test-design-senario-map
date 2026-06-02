# PP-100 · Error Page - Can't connect

| Field        | Value                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| **Key**      | PP-100                                                                                        |
| **Type**     | Sub-task                                                                                      |
| **Project**  | POPPA                                                                                         |
| **Status**   | To Do                                                                                         |
| **Assignee** | Tum-Natthapon.C                                                                               |
| **Parent**   | [PP-90](./PP-90_Register_Flow.md)                                                             |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5924     |

---

## User Story

> ในฐานะ End-User ฉันต้องการเห็นหน้า Error ที่ชัดเจนเมื่อแอปไม่สามารถเชื่อมต่อ Server ได้ เพื่อที่ฉันจะได้รู้สาเหตุและลองใหม่ได้

---

## 1. Description

หน้า Error ที่แสดงเมื่อแอปไม่สามารถเชื่อมต่อกับ Server ได้ ไม่ว่าจะเกิดขึ้นระหว่าง Register Flow หรือการใช้งานปกติ โดยแสดงข้อความแจ้งปัญหาและปุ่ม Retry เพื่อให้ผู้ใช้ลองเชื่อมต่อใหม่

---

## 2. Acceptance Criteria

### Scenario 1 — Display Error Page on Connection Failure

- **Given:** ผู้ใช้อยู่ใน Register Flow หรือใช้งานแอปปกติ
- **When:** แอปไม่สามารถเชื่อมต่อ Server ได้ (Network Error / Timeout)
- **Then:** ระบบแสดงหน้า Error พร้อมข้อความ "ไม่สามารถเชื่อมต่อได้" และ Illustration

### Scenario 2 — Retry Connection

- **Given:** ผู้ใช้อยู่ที่หน้า Error "ไม่สามารถเชื่อมต่อได้"
- **When:** ผู้ใช้กดปุ่ม "ลองใหม่" (Retry)
- **Then:** ระบบพยายามเชื่อมต่อ Server ใหม่อีกครั้ง

### Scenario 3 — Retry Success

- **Given:** ผู้ใช้กดปุ่ม Retry และการเชื่อมต่อสำเร็จ
- **When:** Server ตอบกลับสำเร็จ
- **Then:** ระบบนำผู้ใช้กลับไปยังหน้าที่อยู่ก่อนหน้าหรือ Step ที่ค้างอยู่ใน Flow

### Scenario 4 — Retry Still Failed

- **Given:** ผู้ใช้กดปุ่ม Retry แต่ยังเชื่อมต่อไม่ได้
- **When:** Retry ล้มเหลวอีกครั้ง
- **Then:** ระบบแสดงหน้า Error เดิมและให้ผู้ใช้ Retry ได้อีกครั้ง

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Trigger Conditions | Network Error, Timeout, Server 5xx |
| State Preservation | ระบบต้องจำ Step ที่ผู้ใช้ค้างอยู่เพื่อ Resume หลัง Retry สำเร็จ |
| Cooldown | ไม่มี Cooldown บนปุ่ม Retry (ผู้ใช้กดได้ทุกครั้ง) |
| No Double Countdown | ระบบต้องไม่รีเซ็ต Countdown OTP ฟรีเมื่อเกิด Network Error |

---

## 4. Definition of Done

- [ ] หน้า Error แสดงเมื่อไม่สามารถเชื่อมต่อ Server ได้
- [ ] แสดงข้อความ Error และ Illustration ตาม Figma
- [ ] ปุ่ม Retry ทำงานได้และพยายามเชื่อมต่อใหม่
- [ ] เมื่อ Retry สำเร็จ นำผู้ใช้กลับไปยัง Step ที่ค้างอยู่
- [ ] เมื่อ Retry ยังล้มเหลว แสดงหน้า Error ซ้ำได้
