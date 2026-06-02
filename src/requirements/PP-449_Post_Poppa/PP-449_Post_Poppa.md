# PP-449 · [M-App][End-User] Post — Poppa (สร้างและแชร์โพสต์)

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-449        |
| **Type**     | Story         |
| **Project**  | POPPA         |
| **Status**   | In Progress   |
| **Assignee** | —             |
| **Figma**    | Design by Dev |

---

## User Story

> **ในฐานะ:** End-User บน M-App
> **ฉันต้องการ:** สร้างและแชร์โพสต์รูปภาพหรือวิดีโอ พร้อม caption, tag และ location
> **เพื่อ:** แสดงผลงานและแชร์ไปยัง feed ให้ผู้ใช้คนอื่นสามารถ like, comment, share ได้

---

## 1. Description

ฟีเจอร์ Post บน Poppa ช่วยให้ End-User สามารถสร้างโพสต์รูปภาพหรือวิดีโอผ่าน Gallery Picker หรือ Camera Capture พร้อมเครื่องมือแต่งภาพ (Crop, Zoom, Resize, Video Trim) เพิ่ม Caption, Mention Tag, Resume Draft และ Submit โพสต์ไปยัง Feed; ผู้ใช้คนอื่นสามารถ like, comment, share โพสต์ได้

---

## 2. Acceptance Criteria

### Scenario 1 — Gallery Picker

- **Given:** User เปิดหน้า Create Post
- **When:** เลือก Gallery Picker
- **Then:** แสดง Gallery ของ device ให้เลือกรูปหรือวิดีโอได้

### Scenario 2 — Camera Capture

- **Given:** User อยู่ที่หน้า Create Post
- **When:** เลือก Camera Capture
- **Then:** เปิด Camera ให้ถ่ายรูปหรือวิดีโอได้

### Scenario 3 — Media Edit (Crop / Aspect Ratio / Zoom / Resize)

- **Given:** User เลือก media แล้ว
- **When:** แก้ไข Crop, Aspect Ratio, Zoom หรือ Resize
- **Then:** Media ถูกปรับตามที่ต้องการ

### Scenario 4 — Video Trim

- **Given:** User เลือกวิดีโอ
- **When:** Trim วิดีโอ (Short ≤15s / Long)
- **Then:** วิดีโอถูก trim ตามที่กำหนด

### Scenario 5 — Caption & Mention

- **Given:** User อยู่ที่หน้า Caption Input
- **When:** พิมพ์ข้อความและ @mention ชื่อผู้ใช้อื่น
- **Then:** Mention แสดงชื่อที่ถูกต้องและส่งไปพร้อม Post

### Scenario 6 — Resume Draft

- **Given:** User ออกจากหน้า Create Post ก่อน Submit
- **When:** กลับมาที่หน้า Create Post อีกครั้ง
- **Then:** ระบบแสดง Dialog ถามว่าต้องการ Resume Draft หรือเริ่มใหม่

### Scenario 7 — Submit Post

- **Given:** User กรอกข้อมูลครบแล้ว
- **When:** กด Submit
- **Then:** แสดง Loading state ระหว่าง upload และ Success state เมื่อสำเร็จ

### Scenario 8 — Submit Integration API

- **Given:** User กด Submit
- **When:** FE เรียก Create Post API
- **Then:** Post ถูกบันทึกและแสดงใน Feed ของ Followers

---

## 3. Definition of Done

- [ ] Gallery Picker ทำงานได้และ integrate กับ API
- [ ] Camera Capture ทำงานได้
- [ ] Crop, Aspect Ratio, Zoom, Resize ทำงานถูกต้อง
- [ ] Video Trim (Short & Long) ทำงานได้
- [ ] Reel Selector ทำงานได้
- [ ] Caption Input พร้อม Mention Tagging ทำงาน
- [ ] Caption & Mention integrate กับ API
- [ ] Submit Loading & Success state แสดงถูกต้อง
- [ ] Submit integrate กับ Create Post API
- [ ] Resume Draft ทำงานได้
- [ ] BE: Post domain schema และ indexes พร้อม
- [ ] BE: List, Create, Get, Edit, Delete post APIs ทำงานได้
- [ ] BE: Post history API ทำงานได้
- [ ] BE: Report post API ทำงานได้
- [ ] BE: Kafka producers สำหรับ post domain events พร้อม

---

## 4. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-452](./PP-452_RFC_System_Design_Post.md) | [RFC] System Design — Post (Architecture, Flow, Data Schema) | Review Code |
| [PP-519](./PP-519_MB_Create_Post_Gallery_Picker.md) | [MB][End-User] Create Post Gallery Picker UI | Review Code |
| [PP-520](./PP-520_MB_Create_Post_Camera_Capture.md) | [MB][End-User] Create Post Camera Capture UI | Review Code |
| [PP-521](./PP-521_MB_Create_Post_Media_Picker_Integrate_API.md) | [MB][End-User] Create Post Media Picker Integrate API | To Do |
| [PP-522](./PP-522_MB_Create_Post_Crop_And_Aspect_Ratio.md) | [MB][End-User] Create Post Crop & Aspect Ratio UI | Review Code |
| [PP-523](./PP-523_MB_Create_Post_Zoom_And_Resize.md) | [MB][End-User] Create Post Zoom & Resize UI | Review Code |
| [PP-525](./PP-525_MB_Create_Post_Video_Trim.md) | [MB][End-User] Create Post Video Trim | Review Code |
| [PP-526](./PP-526_MB_Create_Post_Reel_Selector.md) | [MB][End-User] Create Post Reel Selector UI | To Do |
| [PP-527](./PP-527_MB_Create_Post_Caption_Input.md) | [MB][End-User] Create Post Caption Input UI | To Do |
| [PP-528](./PP-528_MB_Create_Post_Mention_Tagging.md) | [MB][End-User] Create Post Mention Tagging UI | In Progress |
| [PP-529](./PP-529_MB_Create_Post_Caption_Mention_Integrate_API.md) | [MB][End-User] Create Post Caption Mention Integrate API | To Do |
| [PP-530](./PP-530_MB_Create_Post_Submit_Loading.md) | [MB][End-User] Create Post Submit Loading UI | To Do |
| [PP-531](./PP-531_MB_Create_Post_Submit_Success.md) | [MB][End-User] Create Post Submit Success UI | To Do |
| [PP-532](./PP-532_MB_Create_Post_Submit_Integrate_API.md) | [MB][End-User] Create Post Submit Integrate API | To Do |
| [PP-533](./PP-533_MB_Create_Post_Resume_Draft.md) | [MB][End-User] Create Post Resume Draft UI | Review Code |
| [PP-553](./PP-553_BE_Post_Service_Domain_Schema_And_Indexes.md) | [BE][Post-Service] Implement post domain schema and indexes | To Do |
| [PP-554](./PP-554_BE_Post_Service_Implement_List_Post.md) | [BE][Post-Service] Implement list post | To Do |
| [PP-555](./PP-555_BE_Post_Service_Implement_Create_Post.md) | [BE][Post-Service] Implement create post | To Do |
| [PP-556](./PP-556_BE_Post_Service_Implement_Get_Post_Detail.md) | [BE][Post-Service] Implement get post detail | To Do |
| [PP-557](./PP-557_BE_Post_Service_Implement_Edit_Post.md) | [BE][Post-Service] Implement edit post | To Do |
| [PP-558](./PP-558_BE_Post_Service_Implement_Delete_Post.md) | [BE][Post-Service] Implement delete post | To Do |
| [PP-559](./PP-559_BE_Post_Service_Implement_Get_Post_History.md) | [BE][Post-Service] Implement get post history | To Do |
| [PP-560](./PP-560_BE_Post_Service_Implement_Report_Post.md) | [BE][Post-Service] Implement report post | To Do |
| [PP-561](./PP-561_BE_Post_Service_Implement_Kafka_Producers.md) | [BE][Post-Service] Implement Kafka producers for post domain events | To Do |
| [PP-562](./PP-562_BE_Like_Service_Implement_Like_Post.md) | [BE][Like-Service] Implement like post | To Do |
| [PP-563](./PP-563_BE_Like_Service_Implement_Unlike_Post.md) | [BE][Like-Service] Implement unlike post | To Do |
| [PP-564](./PP-564_BE_Like_Service_Implement_Delayed_Batch_Reconcile_Like_Count.md) | [BE][Like-Service] Implement delayed/batch reconcile like count | To Do |
| [PP-565](./PP-565_BE_Like_Service_Implement_Get_Likers_List.md) | [BE][Like-Service] Implement get likers list | To Do |
