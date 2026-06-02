# PP-3 · [M-App][End-User] User Profile & Account Settings (Post-Login)

| Field | Value |
|---|---|
| **Key** | PP-3 |
| **Type** | Story |
| **Project** | POPPA |
| **Status** | Ready to Deploy Prod |
| **Assignee** | Jojoe - Sattawat.w |
| **Figma** | [App UI Design – node 1691-6015](https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-6015) |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** จัดการโปรไฟล์ส่วนตัว
> **เพื่อ:** ตรวจสอบประวัติกิจกรรมที่เข้าร่วม, แก้ไขข้อมูลส่วนตัวให้เป็นปัจจุบัน และตั้งค่าการใช้งานแอปพลิเคชันตามความต้องการ

---

## 1. Description

พัฒนาระบบจัดการโปรไฟล์ผู้ใช้งาน (Post-Login) ครอบคลุมการดึงข้อมูลมาแสดงผล (View Profile), การแก้ไขข้อมูลส่วนตัว (Edit Profile), การจัดการประวัติกิจกรรม (Activity History), การตั้งค่าความสนใจ (Interests Update) และการจัดการบัญชี (Logout / Delete Account)

---

## 2. Technical Acceptance Criteria

### Scenario 1 — View Profile & Activity Stats

- **Given:** User เข้าสู่ระบบสำเร็จและอยู่ที่หน้า Profile
- **When:** แอปพลิเคชันส่ง Request ไปยัง `GET /v1/user/profile`
- **Then:** ระบบต้องส่งข้อมูลกลับมาประกอบด้วย Avatar, Display Name, Bio, สถิติการไปกิจกรรม และรายการ Event ใน Tabs ต่างๆ:
  - **Upcoming** — กิจกรรมที่กำลังจะมาถึง
  - **History** — กิจกรรมที่เคยเข้าร่วมแล้ว
  - **Saved** — กิจกรรมที่ Bookmark ไว้
  - ข้อมูลในแต่ละ Tab ต้องจัดเรียงตามวันที่ (Newest First)

### Scenario 2 — Update Profile Attributes

- **Given:** User อยู่ที่หน้า Edit Profile และทำการเปลี่ยน Display Name หรือเบอร์โทรศัพท์
- **When:** User กดปุ่ม "Save" และข้อมูลผ่านการ Validate
- **Then:** ระบบต้องส่ง `PATCH /v1/user/profile` เพื่อบันทึกลง Database และเมื่อกลับมาหน้า Profile หลัก ข้อมูลต้องถูก Update ทันทีโดยไม่ต้อง Pull to Refresh

### Scenario 3 — Update Interests & Discovery Re-calculation

- **Given:** User ทำการเปลี่ยนแปลงหมวดหมู่ความสนใจในหน้า Interests
- **When:** User กดบันทึกข้อมูลสำเร็จ
- **Then:** ระบบ Backend ต้องอัปเดตตาราง `User_Interests` และ API สำหรับหน้า Discovery/Home ต้องเปลี่ยนการ Query ข้อมูล Event ใหม่ให้สอดคล้องกับ Interests ล่าสุดของ User

### Scenario 4 — Account Deletion (Compliance)

- **Given:** User กดปุ่ม "Delete Account" ในหน้า Settings
- **When:** User ยืนยันผ่าน Confirmation Dialog
- **Then:** ระบบต้องส่ง `DELETE /v1/user/account` เพื่อเปลี่ยนสถานะ User ใน DB เป็น `Deleted` (หรือ Hard Delete ตามนโยบาย), ลบ Session/Token ทั้งหมดในเครื่อง และผลัก User กลับไปยังหน้า Login ทันที

---

## 3. Backend & Data Specifications

### API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/v1/user/profile` | Fetch profile data, activity stats, and event tab lists |
| PATCH | `/v1/user/profile` | Update Display Name, Bio, Phone Number |
| DELETE | `/v1/user/account` | Delete account + invalidate all sessions | ### Field Validation Rules | Field | Rule |
|---|---|
| **Display Name** | Max **50 characters** · Thai and English allowed · No digits · Allowed special chars: space ` `, dot `.`, hyphen `-`, apostrophe `'` · No other special characters |
| **Bio** | Max **250 characters** · Free text |
| **Phone Number** | Thai mobile format · auto-strip dashes/spaces · stored as `+66XXXXXXXXX` |
| **Delete Account reason** | Max **500 characters** (Thai) · approx. 6–8 lines | ### Display Name — Allowed Character Examples | Char | Example |
|---|---|
| Space | `สมชาย ใจดี` |
| Dot | `ดร.สมชาย` |
| Hyphen | `แมรี่-เจน` |
| Apostrophe | `O'Brien` | > No digits, no `@`, `#`, `!`, `$`, `%`, `^`, `&`, `*`, `(`, `)` or other special characters.

### Database Schema Impact

**Users Table** — fields updated by PATCH:
```
display_name
bio
phone_number
```

**User_Interests Table** — updated by interests change:
```
user_id     → FK to Users
category_id → Sport, Lifestyle, etc.
```

### Discovery Re-calculation Trigger

After `User_Interests` is updated, the Discovery/Home feed query must re-run using the new interest set. This is a backend-side side-effect; no separate API call is needed from the client.

---

## 4. Edge Cases

| Case | Handling |
|---|---|
| **Network failure during PATCH** | Do not close Edit Profile page · Show Error Toast informing user to retry |
| **Token expiry (401) on Profile screen** | Handle 401 Unauthorized gracefully · Redirect to Login without data loss |
| **Empty Saved tab** | Display empty state with a CTA button that deep-links to the event search page |
| **Delete Account — discoverability** | Button must be de-emphasised / hard to find (e.g. small text at bottom of settings) |

---

## 5. Definition of Done

- [ ] `GET /v1/user/profile` returns all required fields including Avatar, Display Name, Bio, stats, and event tabs
- [ ] `PATCH /v1/user/profile` validates all field constraints and updates DB; profile page reflects changes without Pull to Refresh
- [ ] `DELETE /v1/user/account` sets status to `Deleted`, clears all sessions/tokens, redirects to Login
- [ ] Interests update triggers Discovery/Home re-calculation correctly
- [ ] Upload, store, and display of profile avatar works end-to-end
- [ ] All validation constraints (Name length, Bio length, Phone format, Delete reason) enforced on both client and server
- [ ] Error handling: network failure shows toast; 401 redirects gracefully

---

## 6. Subtasks

| Key | Summary | Status | Assignee |
|---|---|---|---|
| [PP-9](./PP-9_MB_User_Profile_Account_Settings.md) | [MB][End-User] User Profile & Account Settings (Post-Login) | Ready to Deploy Prod | Tum-Natthapon.C |
| [PP-11](./PP-11_QA_TestCase_User_Profile.md) | [QA][TestCase][End-User] User Profile & Account Settings (Post-Login) | Closed | Jojoe - Sattawat.w |
| [PP-32](./PP-32_BE_CRU_User_API_Profile.md) | [BE][End-User] CRU user-api to handle User Profile | Ready to Deploy Prod | Ohm-Phakorn.s |

> Flow diagram → [PP-3.diagram.md](../../test-design/PP-3.diagram.md)
> Test design → [PP-3.design.md](../../test-design/PP-3.design.md)
