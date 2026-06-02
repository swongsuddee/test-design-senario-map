# PP-337 · [M-App][End-User] Poppa Explore Post (สร้างโพสต์)

| Field        | Value                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| **Key**      | PP-337                                                                                        |
| **Type**     | Story                                                                                         |
| **Project**  | POPPA                                                                                         |
| **Status**   | To Do                                                                                         |
| **Assignee** | —                                                                                             |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?m=auto&node-id=1847-19505 |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** แบ่งปันประสบการณ์การซ้อมวิ่ง, Lifestyle หรือบรรยากาศงานวิ่งผ่านรูปภาพและวิดีโอสั้น
> **เพื่อ:** สร้างแรงบันดาลใจให้เพื่อนใน Community

---

## 1. Description

ฟีเจอร์ Poppa Explore Post ช่วยให้ End-User สามารถสร้างโพสต์แชร์ประสบการณ์การวิ่ง, Lifestyle และบรรยากาศงานวิ่งผ่านรูปภาพและวิดีโอสั้น โดยมีระบบ Content Interaction & Engagement เพื่อให้เพื่อนใน Community สามารถกดไลก์ คอมเมนต์ และโต้ตอบได้ รวมถึงมีระบบ Content Moderation เพื่อรักษาความปลอดภัยและความเหมาะสมของเนื้อหา

---

## 2. Acceptance Criteria

### Scenario 1 — Create Post with Image

- **Given:** End-User เปิดหน้า Explore
- **When:** กดปุ่ม Create Post และเลือกประเภท Image
- **Then:** ระบบเปิดหน้า Create Post - Image ให้ผู้ใช้อัปโหลดรูปภาพ ใส่ Caption และกดเผยแพร่ได้

### Scenario 2 — Create Post with VDO

- **Given:** End-User เปิดหน้า Explore
- **When:** กดปุ่ม Create Post และเลือกประเภท Video
- **Then:** ระบบเปิดหน้า Create Post - VDO ให้ผู้ใช้อัปโหลดวิดีโอสั้น ใส่ Caption และกดเผยแพร่ได้

### Scenario 3 — Content Interaction & Engagement

- **Given:** มีโพสต์ปรากฏใน Explore Feed
- **When:** End-User กดไลก์หรือคอมเมนต์บนโพสต์
- **Then:** ระบบบันทึก Interaction และแสดงยอดไลก์/คอมเมนต์ที่อัปเดตแบบ Real-time

### Scenario 4 — Content Moderation (Safety & Report)

- **Given:** End-User พบเนื้อหาที่ไม่เหมาะสม
- **When:** กดปุ่ม Report บนโพสต์นั้น
- **Then:** ระบบรับแจ้งและดำเนินการตามกระบวนการ Content Moderation

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Media Upload | รองรับ Image และ VDO สั้น |
| Content Safety | มีระบบ Report และ Moderation |
| Engagement | Like, Comment แสดง Real-time |

---

## 4. Definition of Done

- [ ] Create Post - Image ทำงานได้ครบถ้วน
- [ ] Create Post - VDO ทำงานได้ครบถ้วน
- [ ] ระบบ Interaction (Like/Comment) ทำงานถูกต้อง
- [ ] ระบบ Report และ Content Moderation ทำงานถูกต้อง
- [ ] Figma UI ตรงกับที่ออกแบบไว้

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-338](./PP-338_Create_Post_Image.md) | [M-App][End-User] Create Post - Image | To Do |
| [PP-339](./PP-339_Create_Post_VDO.md) | [M-App][End-User] Create Post - VDO | To Do |
| [PP-340](./PP-340_Content_Interaction_Engagement.md) | [M-App][End-User] Content Interaction & Engagement | To Do |
| [PP-341](./PP-341_Content_Moderation_Safety_Report.md) | [M-App][End-User] Content Moderation (Safety & Report) | To Do |
