# PP-12 · [M-App][End-User] Remote Config

| Field        | Value             |
|--------------|-------------------|
| **Key**      | PP-12             |
| **Type**     | Story             |
| **Project**  | POPPA             |
| **Status**   | Ready to Deploy Prod |
| **Assignee** | Mos-PasitD        |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** รับการแจ้งเตือนให้อัปเดตแอปเมื่อมีเวอร์ชันใหม่
> **เพื่อ:** เชื่อมต่อ Firebase Remote Config และควบคุมพฤติกรรมแอปจากระบบหลังบ้านโดยไม่ต้องปล่อยเวอร์ชันใหม่

---

## 1. Technical Acceptance Criteria

### AC1 — Firebase Integration

- แอปสามารถเชื่อมต่อและรับค่าจาก Firebase Remote Config ได้สำเร็จ
- ดึงค่าตัวแปรหลักได้: เวอร์ชันล่าสุด (`versionApp`), สถานะบังคับอัปเดต (`isForceUpdate`), ลิงก์สโตร์ (`storeUrl`)

### AC2 — Version Checking Logic

- เมื่อเปิดแอป ระบบเช็ก Current Version เทียบกับ `versionApp` บน Firebase
- ถ้าเวอร์ชันในเครื่อง ≥ เวอร์ชันบน Firebase → ข้ามไปหน้า Home ตามปกติ

### AC3 — Update Dialog Display

- ถ้าเวอร์ชันในเครื่องเก่ากว่า → แสดง Pop-up แจ้งเตือนให้อัปเดต
- **Force Update** (`isForceUpdate = true`): มีแค่ปุ่ม "อัพเดท" — กดปิดไม่ได้ ต้องอัปเดตเพื่อเข้าใช้งาน
- **Soft Update** (`isForceUpdate = false`): มีทั้งปุ่ม "ข้าม" และ "อัพเดท"

### AC4 — Store Redirection

- กดปุ่ม "อัพเดท" → เปิด App Store / Play Store ตาม `storeUrl` จาก Firebase

---

## 2. Definition of Done

- [ ] Firebase Remote Config เชื่อมต่อได้สำเร็จ
- [ ] Version checking logic ทำงานถูกต้อง
- [ ] Force / Soft update dialog แสดงถูกต้อง
- [ ] Store redirection ทำงานถูกต้องทั้ง iOS และ Android

---

> Flow diagram → [PP-12.diagram.md](../../test-design/PP-12.diagram.md)
> Test design → [PP-12.design.md](../../test-design/PP-12.design.md)
