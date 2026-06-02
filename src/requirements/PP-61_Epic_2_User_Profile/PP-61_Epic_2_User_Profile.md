# PP-61 · Epic - 2 User Profile (Admin, Organizer, User)

| Field        | Value       |
|--------------|-------------|
| **Key**      | PP-61       |
| **Type**     | Story       |
| **Project**  | POPPA       |
| **Status**   | In Progress |
| **Assignee** | —           |

---

## User Story

> จัดการข้อมูลส่วนตัวของ User ทั้ง 3 roles: End User, Organizer, Admin
> ครอบคลุมการดู/แก้ไขโปรไฟล์, อัพโหลดรูป, ตั้งค่าบัญชี, ลบบัญชี, โปรไฟล์ Organizer และประวัติการเปลี่ยนแปลง

---

## 1. Description

**Service:** User Service `:50051`
**Dependencies:** GCS (avatar upload), Elasticsearch (profile search indexing)

### Stories in Scope

| Story | Title | Summary |
|-------|-------|---------|
| 2.1 | View Profile | ดูโปรไฟล์ตัวเองและคนอื่น (ชื่อ, รูป, bio, followers/following) — public เห็นได้ทุกคน |
| 2.2 | Edit Profile | แก้ไข display name, bio, avatar, เบอร์โทร, email พร้อม validation |
| 2.3 | Upload Avatar | Upload JPG/PNG ≤ 5MB → resize 3 ขนาด → เก็บใน GCS |
| 2.4 | Account Settings | ตั้งค่าภาษาและ notification preferences — apply ทันที |
| 2.5 | Delete Account | Soft delete → grace period 30 วัน → hard delete + anonymize + Kafka `user.deleted` |
| 2.6 | Organizer Profile | ชื่อองค์กร, description, verified badge — แสดงใน event page |
| 2.7 | User History | ประวัติการเปลี่ยนแปลง — admin ดูได้, paginated, filter by action |

---

## 2. Technical Acceptance Criteria

### Scenario 1 — Profile Management

- **AC 1.1:** User ทุก role ดูและแก้ไขโปรไฟล์ตัวเองได้
- **AC 1.2:** Public profile เข้าถึงได้โดยไม่ต้อง login

### Scenario 2 — Avatar Upload

- **AC 2.1:** รองรับ JPG/PNG ≤ 5MB และ resize อัตโนมัติ 3 ขนาด

### Scenario 3 — Account Lifecycle

- **AC 3.1:** Delete account: soft delete → 30 วัน → hard delete + anonymize
- **AC 3.2:** Kafka events emit ครบทุก action: `user.updated`, `user.deleted`

### Scenario 4 — Organizer Profile

- **AC 4.1:** Organizer profile แสดงบน event page ที่ตนสร้าง

### Scenario 5 — Admin View

- **AC 5.1:** Admin ดู user history แบบ paginated และ filter ได้

---

## 3. Definition of Done

- [ ] View/Edit Profile ทำงานถูกต้องทุก role
- [ ] Avatar upload + resize pipeline ทำงานถูกต้อง
- [ ] Delete account flow (soft → hard) ครบ
- [ ] Kafka events emit ถูกต้อง
- [ ] Organizer profile แสดงบน event page

---

## 4. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-62](./PP-62_BE_View_Profile.md) | [BE][User-service] View Profile | Ready To Test STG |
| [PP-63](./PP-63_BE_Edit_Profile.md) | [BE][User-service] Edit Profile | Ready To Test STG |
| [PP-66](./PP-66_BE_Upload_Avatar.md) | [BE][User-service] Upload Avatar | Ready To Test STG |
| [PP-72](./PP-72_BE_Account_Settings.md) | [BE][User-service] Account Settings | Dev Block |
| [PP-73](./PP-73_BE_Delete_Account.md) | [BE][User-service] Delete Account | Ready To Test STG |
| [PP-74](./PP-74_BE_Organizer_Profile.md) | [BE][User-service] Organizer Profile | Ready To Test STG |
| [PP-75](./PP-75_BE_User_History.md) | [BE][User-service] User History | To Do |
| [PP-106](./PP-106_MB_Edit_Profile.md) | [MB][End-User] Edit Profile | Ready To Test STG |
| [PP-107](./PP-107_MB_Account_Settings.md) | [MB][End-User] Account Settings (Menu Only) | Ready To Test STG |
| [PP-108](./PP-108_MB_Delete_Account.md) | [MB][End-User] Delete Account | Ready To Test STG |
| [PP-109](./PP-109_BE_Organizer_Verification_Profile.md) | [BE][User-Service] Organizer Verification Profile | Ready To Test STG |
| [PP-116](./PP-116_BE_Get_Organizer_Verification_Detail.md) | [BE][User-Service](Admin-Organizer-Gateway) Get Organizer Verification Detail | Ready To Test STG |
| [PP-168](./PP-168_BE_Organizer_Get_Me_Profile.md) | [BE][User-Service] Organizer Get Me Profile | Ready To Test STG |
| [PP-169](./PP-169_BE_Organizer_Get_Organization_Profile.md) | [BE][User-Service] Organizer Get Organization Profile | Ready To Test STG |
| [PP-173](./PP-173_BE_Profile_Document_Preview_Signed_URL.md) | [BE][User-Service] Profile Document Preview Signed URL API | Ready To Test STG |

> Flow diagram → [PP-61.diagram.md](../../test-design/PP-61.diagram.md)
> Test design → [PP-61.design.md](../../test-design/PP-61.design.md)
