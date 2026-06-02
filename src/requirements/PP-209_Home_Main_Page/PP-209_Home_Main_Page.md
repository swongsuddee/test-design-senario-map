# PP-209 · [M-App][End-User] Home (Main Page)

| Field        | Value                                                                                                                      |
|--------------|----------------------------------------------------------------------------------------------------------------------------|
| **Key**      | PP-209                                                                                                                     |
| **Type**     | Story                                                                                                                      |
| **Project**  | POPPA                                                                                                                      |
| **Status**   | Ready To Test STG                                                                                                          |
| **Assignee** | Tum-Natthapon.C                                                                                                            |
| **Figma**    | [App UI Design – node 1691-5924](https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5924&t=ynRyxkW4orN9iKOj-1) |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** เห็นหน้า Home ที่ครบถ้วน ตรงตาม CI, Mood & Tone และ Logo
> **เพื่อ:** ค้นหา Event, ดู Feed, เลือกดู Interest Group และเข้าถึงเนื้อหาหลักได้ทันที

---

## 1. Description

พัฒนาหน้า Home (Main Page) บน Mobile App ให้เป็นไปตาม CI, Mood & Tone, Logo ประกอบด้วย 9 sections:

1. ค้นหาสถานที่ / ค้นหา
2. สร้าง Post / Feed Post (เหมือน IG Story)
3. Interest Group
4. Event List
5. Bottom Menu

---

## 2. Technical Acceptance Criteria

### Scenario 1 — Home Page Display
- **Given:** User เข้าแอปและ Login สำเร็จ
- **When:** เปิดหน้า Home
- **Then:** แสดง 9 sections ตาม Figma design ตรงตาม CI / Mood & Tone / Logo

### Scenario 2 — Event List ตาม Interest
- **Given:** User มี Interests ที่เลือกไว้
- **When:** ดู Event List บน Home
- **Then:** แสดง Event ที่ตรงกับ Interests ของ User (Discovery Re-calculation)

### Scenario 3 — Bottom Menu Navigation
- **Given:** User อยู่บน Home Page
- **When:** กด Bottom Menu item
- **Then:** Navigate ไปยังหน้าที่เกี่ยวข้องได้ถูกต้อง

---

## 3. Definition of Done

- [ ] หน้า Home แสดง 9 sections ตรงตาม Figma
- [ ] Event List ดึงข้อมูลตาม User Interests ได้ถูกต้อง
- [ ] Bottom Menu ทำงานถูกต้อง
- [ ] UI ตรงตาม CI / Mood & Tone ของ POPPA

---

## 4. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-213](./PP-213_MB_Mock_UI_Home.md) | [MB][End-User] Mock UI for Home (Main Page) as per CI, Mood & Tone | Ready To Test STG |

> Flow diagram → [PP-209.diagram.md](../../test-design/PP-209.diagram.md)
> Test design → [PP-209.design.md](../../test-design/PP-209.design.md)
