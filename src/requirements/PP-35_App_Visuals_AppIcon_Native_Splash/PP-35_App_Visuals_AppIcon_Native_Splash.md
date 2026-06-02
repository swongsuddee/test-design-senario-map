# PP-35 · [M-App][End-User] App Visuals: AppIcon & Native Splash

| Field        | Value             |
|--------------|-------------------|
| **Key**      | PP-35             |
| **Type**     | Story             |
| **Project**  | POPPA             |
| **Status**   | Ready to Deploy Prod |
| **Assignee** | Mos-PasitD        |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Poppa App
> **ฉันต้องการ:** เห็น App Icon และ Native Splash Screen ที่ถูกต้องตาม Brand Identity ของ PoppaClub
> **เพื่อ:** สร้างความประทับใจแรกพบและแยกแยะสภาพแวดล้อม (Dev/Staging/Prod) ได้ง่าย

---

## 1. Technical Acceptance Criteria

### AC1 — Asset Preparation

- เตรียม App Icon ขนาด ≥ 1024×1024 px (สัดส่วน 1:1) สำหรับ Adaptive Icons (Android) และ iOS
- เตรียมโลโก้และกำหนดสีพื้นหลัง (Background Color) สำหรับ Native Splash Screen

### AC2 — AppIcon Implementation (Multi-Flavor)

- ใช้ `flutter_launcher_icons` ตั้งค่า App Icon แยกตาม Flavor (Dev/Staging/UAT/Prod)
- **Android:** สร้าง Adaptive Icons (Foreground + Background) ถูกต้อง
- **iOS:** ไอคอนมีขนาดและรูปแบบตาม Apple standard ครบถ้วน
- แต่ละ Flavor มีไอคอนที่แตกต่างกัน (เช่น ใส่ label Dev/Staging/UAT)

### AC3 — Native Splash Implementation

- ใช้ `flutter_native_splash` กำหนดค่า Splash Screen (Duration, Resize Mode, Background Color)
- Splash แสดงผลถูกต้องทั้ง Android และ iOS — ไม่กระพริบ, ไม่ผิดสัดส่วน, อยู่กลางหน้าจอ

### AC4 — Multi-Environment Verification

- Build ใน Flavor ทุกตัว (Dev/Staging/UAT/Prod) บน Emulator/Simulator และอุปกรณ์จริง
- App Icon และ Splash Screen แสดงผลถูกต้องตามการตั้งค่าของแต่ละสภาพแวดล้อม
- ไม่พบ icon ขาดหาย, Splash ผิดสัดส่วน หรือหน้าจอค้าง

---

## 2. Definition of Done

- [ ] App Icon ถูกต้องทุก Flavor ทั้ง Android และ iOS
- [ ] Native Splash Screen แสดงถูกต้องบนทุก Platform
- [ ] ทดสอบบน Emulator และ Physical Device แล้ว

---

> Flow diagram → [PP-35.diagram.md](../../test-design/PP-35.diagram.md)
> Test design → [PP-35.design.md](../../test-design/PP-35.design.md)
