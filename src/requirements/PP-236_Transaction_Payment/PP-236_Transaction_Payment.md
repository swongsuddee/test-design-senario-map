# PP-236 · [BO][Organizer] Organizer Portal - Transaction & Payment (Finance Page)

| Field        | Value                     |
|--------------|---------------------------|
| **Key**      | PP-236                    |
| **Type**     | Story                     |
| **Project**  | POPPA                     |
| **Status**   | Ready To Test STG               |
| **Assignee** | —                         |

---

## User Story

> **ในฐานะ:** Organizer
> **ฉันต้องการ:** ดูรายการ Transaction และสรุปการเงินของ Event
> **เพื่อ:** ตรวจสอบยอดรายรับ, ค่าธรรมเนียม และยอดที่จะได้รับจาก Platform

---

## 1. Technical Acceptance Criteria

### Scenario 1 — Finance List Display

- **AC 1.1:** แสดงรายการ Order/Transaction ทั้งหมดของ Event พร้อมสถานะ
- **AC 1.2:** แสดง Total Revenue, Platform Fee (0.5%), Gateway Fee (2.5%), Net Payout

### Scenario 2 — Order Detail

- **AC 2.1:** Organizer สามารถกดดูรายละเอียดของแต่ละ Order ได้
- **AC 2.2:** แสดงข้อมูล: Order ID, ผู้ซื้อ, Ticket Type, ราคา, สถานะ, วันที่ชำระ

### Scenario 3 — Fee Calculation

- **AC 3.1:** Gateway Fee = 2.5% ของยอดขาย
- **AC 3.2:** Platform Fee = 0.5% ของยอดขาย
- **AC 3.3:** Net Payout = Total Revenue - Gateway Fee - Platform Fee

---

## 2. Definition of Done

- [ ] Finance List แสดงรายการ Transaction ถูกต้อง
- [ ] Fee calculation (2.5% + 0.5%) ถูกต้อง
- [ ] Order Detail page แสดงข้อมูลครบถ้วน
- [ ] API integration ทำงานถูกต้อง

---

## 3. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-160](./PP-160_FE_Event_Detail_Finance_List_UI.md) | [FE][BO][Organizer] Event Detail finance list UI | Ready To Test STG |
| [PP-161](./PP-161_FE_Event_Detail_Finance_List_API.md) | [FE][BO][Organizer] Event Detail finance list Integrate API | Ready To Test STG |
| [PP-248](./PP-248_FE_Event_Detail_Order_Detail_API.md) | [FE][BO][Organizer] Event Detail order detail Integrate API | Ready To Test STG |
| [PP-249](./PP-249_FE_Event_Detail_Order_Detail_UI.md) | [FE][BO][Organizer] Event Detail order detail UI | Ready To Test STG |

> Flow diagram → [PP-236.diagram.md](../../test-design/PP-236.diagram.md)
> Test design → [PP-236.design.md](../../test-design/PP-236.design.md)
