# PP-231 · [BO][Organizer] Organizer Dashboard (Event Detail Dashboard)

| Field        | Value                     |
|--------------|---------------------------|
| **Key**      | PP-231                    |
| **Type**     | Story                     |
| **Project**  | POPPA                     |
| **Status**   | In Progress               |
| **Assignee** | —                         |
| **Figma**    | [BO UI Design – node 228-1338](https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=228-1338) |

---

## User Story

> **ในฐานะ:** Organizer
> **ฉันต้องการ:** ดู Dashboard สรุปภาพรวมของ Event ที่จัดขึ้น
> **เพื่อ:** ติดตามสถิติ ยอดขาย และจำนวนผู้เข้าร่วมได้แบบ Real-time

---

## 1. Technical Acceptance Criteria

### Scenario 1 — Dashboard Metrics Display

- **AC 1.1:** แสดง Pie Chart สรุปสัดส่วน Ticket Type ที่ขายได้
- **AC 1.2:** แสดง Total Revenue, Total Tickets Sold, Total Participants
- **AC 1.3:** แสดง Ticket Metrics แยกตาม Ticket Type (ชื่อ, จำนวนที่ขาย, รายได้)

### Scenario 2 — Filtering & Date Range

- **AC 2.1:** Organizer สามารถ Filter ข้อมูลตาม Date Range ได้
- **AC 2.2:** ข้อมูลใน Dashboard อัปเดตตาม Filter ที่เลือกทันที

### Scenario 3 — Data Accuracy

- **AC 3.1:** ข้อมูลใน Dashboard ต้องสอดคล้องกับ Payment Status `confirmed` เท่านั้น
- **AC 3.2:** Read Model แยกออกจาก Write Model (CQRS pattern)

---

## 2. Definition of Done

- [ ] Pie Chart แสดง Ticket Type distribution ถูกต้อง
- [ ] Metrics (Revenue, Sold, Participants) คำนวณถูกต้อง
- [ ] Filter by Date Range ทำงานถูกต้อง
- [ ] Data มาจาก Read Model (CQRS) ไม่กระทบ Write path

---

## 3. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-155](./PP-155_FE_Event_Detail_Dashboard_UI.md) | [FE][BO][Organizer] Event Detail Dashboard UI | Ready To Test STG |
| [PP-156](./PP-156_FE_Event_Detail_Dashboard_API.md) | [FE][BO][Organizer] Event Detail Dashboard Integrate API | Ready To Test STG |
| [PP-250](./PP-250_BE_Design_Event_Summary_Schema.md) | [BE][Organizer] Design Event Summary Read Model Schema | Done |
| [PP-251](./PP-251_BE_Add_Event_Summary_Ticket_Metrics.md) | [BE][Organizer] Add Event Summary/Ticket Metrics Schema | Ready To Test STG |
| [PP-253](./PP-253_BE_Define_Ticket_Metric_Event_Contract.md) | [BE][Organizer] Define Ticket Metric Event Contract | Done |
| [PP-255](./PP-255_BE_Produce_Ticket_Metric_Ticket_Created.md) | [BE][Organizer] Produce Ticket Metric Event on Ticket Created | Ready To Test STG |
| [PP-256](./PP-256_BE_Produce_Ticket_Metric_Payment_Pending.md) | [BE][Organizer] Produce Ticket Metric Event on Payment Pending | Ready To Test STG |
| [PP-257](./PP-257_BE_Produce_Ticket_Metric_Payment_Confirmed.md) | [BE][Organizer] Produce Ticket Metric Event on Payment Confirmed | Ready to Deploy STG |
| [PP-258](./PP-258_BE_Produce_Ticket_Metric_Payment_Failed.md) | [BE][Organizer] Produce Ticket Metric Event on Payment Failed | Review Code |
| [PP-259](./PP-259_BE_Consume_Ticket_Metric_Event.md) | [BE][Organizer] Consume Ticket Metric Event | Ready To Test STG |
| [PP-260](./PP-260_BE_Event_Summary_Query_API.md) | [BE][Organizer] Implement Event Summary Query API | Dev Block |
| [PP-261](./PP-261_BE_Ticket_Metric_Query_API.md) | [BE][Organizer] Implement Ticket Metric Query API | Ready To Test STG |
| [PP-262](./PP-262_BE_Produce_Ticket_Metric_Ticket_Expired.md) | [BE][Organizer] Produce Ticket Metric Event on Ticket Expired | Ready To Test STG |
| [PP-263](./PP-263_BE_Produce_Ticket_Metric_Order_Cancelled.md) | [BE][Organizer] Produce Ticket Metric Event on Order Cancelled | Ready To Test STG |
| [PP-264](./PP-264_BE_Consume_Ticket_Metric_Ticket_Created.md) | [BE][Organizer] Consume Ticket Metric Event - Ticket Created | Ready To Test STG |
| [PP-265](./PP-265_BE_Consume_Ticket_Metric_Payment_Confirmed.md) | [BE][Organizer] Consume Ticket Metric Event - Payment Confirmed | Ready To Test STG |
| [PP-266](./PP-266_BE_Consume_Ticket_Metric_Order_Cancelled.md) | [BE][Organizer] Consume Ticket Metric Event - Order Cancelled | Dev Block |
| [PP-267](./PP-267_BE_Consume_Ticket_Metric_Ticket_Expired.md) | [BE][Organizer] Consume Ticket Metric Event - Ticket Expired | Done |

> Flow diagram → [PP-231.diagram.md](../../test-design/PP-231.diagram.md)
> Test design → [PP-231.design.md](../../test-design/PP-231.design.md)
