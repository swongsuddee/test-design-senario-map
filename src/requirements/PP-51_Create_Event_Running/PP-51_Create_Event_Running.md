# PP-51 · [BO][Agency x Admin] Create Event - Running (สร้างงานวิ่ง)

| Field        | Value                                                                                                                           |
|--------------|---------------------------------------------------------------------------------------------------------------------------------|
| **Key**      | PP-51                                                                                                                           |
| **Type**     | Story                                                                                                                           |
| **Project**  | POPPA                                                                                                                           |
| **Status**   | Ready To Test STG                                                                                                               |
| **Assignee** | BIG Phanuwit                                                                                                                    |
| **Figma**    | [Register-Create-Event node 1-586](https://www.figma.com/design/bTeNXJgxLJTGFo2WKoGrLQ/Register-Create-Event?node-id=1-586&t=92PTMthLYYyJra5f-1) |

---

## User Story

> **ในฐานะ:** Admin หรือ Agency ที่ใช้งานระบบ BO Poppa
> **ฉันต้องการ:** ใส่ข้อมูล "งานวิ่ง" ใน Poppa Backoffice เพื่อสร้างงานวิ่ง
> **เพื่อ:** สร้างข้อมูลงานวิ่งครบถ้วนเพื่อเปิดรับลงทะเบียนผ่าน Poppa Mobile App

---

## 1. Description

สร้าง Event งานวิ่งผ่าน Backoffice ทั้ง Agency และ Admin — โดย Admin ถือเป็น Agency Account พิเศษที่มี super role ไม่ต้องทำ hierarchy ซ้อน ใช้ role-based permission เดียวกัน

### Account Model Decisions

| # | คำถาม | คำตอบ PM | ผลกระทบ |
|---|-------|----------|---------|
| ก | Approval Flow | เหมือนกันหมดทุก Agency Account ผ่าน flow เดียวกัน ไม่มี auto-approve | ลด effort — ไม่ต้องทำ logic แยก trusted/standard |
| ข | Account Hierarchy | Super Permission — Admin คือ Agency Account ที่มี super role | ไม่ต้องทำ hierarchy ซ้อน ใช้ role-based permission เดียว |
| ค | Company Profile | แบ่ง 2 กลุ่ม: บุคคลธรรมดา vs นิติบุคคล | ต้องออกแบบ Registration form 2 แบบ + Document upload flow |

---

## 2. Technical Acceptance Criteria

### Scenario 1 — Create Event Information
- **Given:** Agency/Admin อยู่ที่หน้า Create Event บน BO
- **When:** กรอกข้อมูลงานวิ่งครบถ้วน (ชื่องาน, ประเภท, สถานที่, วันเวลา)
- **Then:** ระบบบันทึกข้อมูล Event พร้อม Event Items และ Ticket Types ลง Database

### Scenario 2 — Event Items & Ticket Types
- **Given:** Agency กำลังสร้าง Event ในขั้นตอน Condition & Ticket Type
- **When:** เพิ่ม Ticket Type ระบุ ระยะทาง, ราคา, จำนวน, วันรับสมัคร
- **Then:** ระบบสร้าง Ticket Type สำหรับแต่ละระยะทาง พร้อม stock management

### Scenario 3 — Event Draft
- **Given:** Agency เริ่มสร้าง Event แต่ยังไม่สำเร็จ
- **When:** ปิด Browser หรือออกจากหน้า
- **Then:** ระบบบันทึกเป็น Draft อัตโนมัติ — กลับมา Resume ได้จากจุดเดิม

### Scenario 4 — Publish Event (Pending Approval)
- **Given:** Agency กรอกข้อมูล Event ครบถ้วนแล้ว
- **When:** กดปุ่ม Publish
- **Then:** สถานะเปลี่ยนเป็น `pending_approved` รอ Admin อนุมัติก่อนเผยแพร่

### Scenario 5 — Cancel Event
- **Given:** Agency ต้องการยกเลิกงานวิ่งที่ Published
- **When:** กดยกเลิก Event
- **Then:** สถานะเปลี่ยนเป็น `pending_cancel` รอ Admin อนุมัติ และ trigger Refund flow

---

## 3. Backend & Data Specifications

### Event Status Flow
```
draft → pending_approved → published → pending_cancel → cancelled
                        ↘ draft (rejected)              ↘ published (cancel rejected)
```

### Key Sub-systems
- **Events-Service** — CRUD Event, Publish, Cancel, Media, Settings
- **Ticket-Service** — Ticket Type Management, Stock Reservation, Participant List
- **Event Items** — Variants (ระยะทาง/ประเภท) + Item Fulfillment

---

## 4. Definition of Done

- [ ] สร้าง/แก้ไข Event บน BO ได้ครบถ้วนตาม Figma
- [ ] Event Draft บันทึกและ Resume ได้
- [ ] Publish → pending_approved → Admin Approve/Reject flow ทำงานถูกต้อง
- [ ] Ticket Types และ Stock management ทำงานถูกต้อง
- [ ] Cancel Event + Refund flow ทำงานถูกต้อง

---

## 5. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-76](./PP-76_BE_Create_Event.md) | [BE][Events-Service] Create Event | Ready To Test STG |
| [PP-77](./PP-77_BE_Edit_Event.md) | [BE][Events-Service] Edit Event | Ready To Test STG |
| [PP-78](./PP-78_BE_Publish_Event.md) | [BE][Events-Service] Publish Event | Ready To Test STG |
| [PP-79](./PP-79_BE_Cancel_Event.md) | [BE][Events-Service] Cancel Event | Ready To Test STG |
| [PP-80](./PP-80_BE_Event_Media.md) | [BE][Events-Service] Event Media | Ready To Test STG |
| [PP-82](./PP-82_BE_Event_Settings.md) | [BE][Events-Service] Event Settings | Ready To Test STG |
| [PP-120](./PP-120_BE_Review_Update_Event_Schema.md) | [BE][Event-Service][Improve] Review and Update Event Schema Structure | Ready To Test STG |
| [PP-110](./PP-110_BE_Create_Event_Item_Variants.md) | [BE][EventService] Create Event Item with Variants | Ready To Test STG |
| [PP-111](./PP-111_BE_Update_Delete_Event_Item.md) | [BE][EventService] Update / Delete Event Item | Ready To Test STG |
| [PP-81](./PP-81_BE_Ticket_Type_Management.md) | [BE][Ticket-Service] Ticket Type Management | Ready To Test STG |
| [PP-112](./PP-112_BE_Register_Event_Safe_Stock.md) | [BE][Ticket-Service] Register Event (Multi-Attendee + Safe Stock Reservation) | Ready To Test STG |
| [PP-172](./PP-172_BE_Organizer_Event_List_API.md) | [BE][Event-Service] Organizer Event List API | Ready To Test STG |
| [PP-83](./PP-83_BE_Participant_List_Fulfillment.md) | [BE][Ticket-Service] Participant List + Item Fulfillment Summary | Ready To Test STG |
| [PP-85](./PP-85_BE_Ticket_Tier_History.md) | [BE][Ticket-Service] Ticket Tier History | Dev Block |
| [PP-84](./PP-84_BE_Event_History.md) | [BE][Events-Service] Event History | Dev Block |
| [PP-114](./PP-114_BE_Search_Event_Filter_Category.md) | [BE][EventService][End-User] Search Event & Filter by Activity Category | Ready To Test STG |
| [PP-140](./PP-140_FE_List_Event_Page_UI.md) | [FE][BO][Agency][Event] List Event Page implement ui | Ready To Test STG |
| [PP-141](./PP-141_FE_List_Event_Page_API.md) | [FE][BO][Agency][Event] List Event Page integration api | Ready To Test STG |
| [PP-142](./PP-142_FE_Common_Table_Pagination.md) | [FE][BO][Agency][Event] Common Table and Pagination | Ready to Deploy STG |
| [PP-143](./PP-143_FE_Event_Category_Selection.md) | [FE][BO][Agency][Event] Event category and sub category selection | Ready To Test STG |
| [PP-144](./PP-144_FE_Common_Texteditor.md) | [FE][BO][Agency][Event] Common Texteditor Components | Ready to Deploy STG |
| [PP-212](./PP-212_FE_Event_Category_Selection_API.md) | [FE][BO][Agency][Event] Event category and sub category selection api | Ready To Test STG |
| [PP-145](./PP-145_FE_Event_Information_Section_UI.md) | [FE][BO][Agency][Event] Event information section ui | Ready To Test STG |
| [PP-146](./PP-146_FE_Common_Map_Selected.md) | [FE][BO][Agency][Event] Common map selected | Ready to Deploy STG |
| [PP-147](./PP-147_FE_Common_DateTime_Picker.md) | [FE][BO][Agency][Event] Common Date time picker | Ready to Deploy STG |
| [PP-148](./PP-148_FE_Event_Place_Time_Section_UI.md) | [FE][BO][Agency][Event] Event place and time section ui | Ready To Test STG |
| [PP-149](./PP-149_FE_Items_Received_Section_UI.md) | [FE][BO][Agency][Event] Items received section ui | Ready To Test STG |
| [PP-150](./PP-150_FE_Common_Confirm_Modal.md) | [FE][BO][Agency][Event] Common Confirm modal | Ready to Deploy STG |
| [PP-151](./PP-151_FE_Event_Condition_Ticket_Type_UI.md) | [FE][BO][Agency][Event] Event Condition and Ticket Type section ui | Ready To Test STG |
| [PP-152](./PP-152_FE_Event_Summary_Section_UI.md) | [FE][BO][Agency][Event] Event Summary section ui | Ready To Test STG |
| [PP-153](./PP-153_FE_Event_Create_API.md) | [FE][BO][Agency][Event] Event Create integration api | Ready To Test STG |
| [PP-154](./PP-154_FE_Event_Draft_API.md) | [FE][BO][Agency][Event] Event Draft integration api | Ready To Test STG |
| [PP-162](./PP-162_FE_Event_Detail_Report_UI.md) | [FE][BO][Agency][Event] Event Detail report implement ui | Dev Block |
| [PP-163](./PP-163_FE_Event_Detail_Report_API.md) | [FE][BO][Agency][Event] Event Detail report integration api | Dev Block |
| [PP-164](./PP-164_FE_Event_Draft_Page_UI.md) | [FE][BO][Agency][Event] Event Draft Page Implement ui | Ready To Test STG |
| [PP-165](./PP-165_FE_Event_Draft_Page_API.md) | [FE][BO][Agency][Event] Event Draft Page integration api | Ready To Test STG |
| [PP-166](./PP-166_FE_Event_Draft_Detail_UI.md) | [FE][BO][Agency][Event] Event Draft Detail implement ui | Ready to Deploy STG |
| [PP-167](./PP-167_FE_Event_Draft_Detail_API.md) | [FE][BO][Agency][Event] Event Draft Detail integration api | Ready to Deploy STG |
| [PP-207](./PP-207_BE_Event_Draft.md) | [BE][Event] Event Draft | Ready To Test STG |
| [PP-208](./PP-208_BE_Cancel_Event_Draft.md) | [BE][Event] Cancel Event Draft | Ready To Test STG |

> Flow diagram → [PP-51.diagram.md](../../test-design/PP-51.diagram.md)
> Test design → [PP-51.design.md](../../test-design/PP-51.design.md)
