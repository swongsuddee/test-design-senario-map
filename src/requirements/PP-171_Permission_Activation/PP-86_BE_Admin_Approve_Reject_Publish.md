# PP-86 · [BE][Events-Service] Admin Approve/Reject Publish

| Field        | Value                                                        |
|--------------|--------------------------------------------------------------|
| **Key**      | PP-86                                                        |
| **Type**     | Sub-task                                                     |
| **Project**  | POPPA                                                        |
| **Status**   | Ready to Deploy STG                                          |
| **Assignee** | pathai laooatthaphong                                        |
| **Parent**   | [PP-171](./PP-171_Permission_Activation.md)                  |

---

## Summary

Admin ตรวจสอบ event ที่ Organizer ส่งขออนุมัติ และตัดสินใจ approve หรือ reject พร้อม reason — Organizer ได้รับแจ้งผลทั้งสองกรณี

---

## 1. Allowed Transitions

| Admin Action | From | To | Allowed |
|---|---|---|---|
| Approve | `pending_approved` | `published` | ✅ |
| Reject | `pending_approved` | `draft` | ✅ |
| Approve / Reject | อื่นๆ | — | ❌ |

---

## 2. Kafka Events

| Event | Trigger | Consumer |
|-------|---------|----------|
| `event.published` | Admin approve สำเร็จ | Elasticsearch indexing worker |
| `event.publish_rejected` | Admin reject สำเร็จ | Notification → แจ้ง Organizer |

---

## 3. Acceptance Criteria

- Admin ดูรายการ event ที่ status = `pending_approved` ได้
- Admin approve → `pending_approved` → `published` (event ปรากฏใน discovery feed)
- Admin reject → `pending_approved` → `draft` พร้อม reason (reason บันทึกใน event history)
- Organizer ได้รับ notification ทั้งกรณี approve และ reject
- approve / reject ได้เฉพาะ status = `pending_approved` เท่านั้น (return error กรณีอื่น)

---

## 4. Backend Components

- RPCs: `EventService.ApproveEvent`, `EventService.RejectEvent`
- Transition logic ใน `services/eventsvc/`
- Handlers ใน `handlers/eventhdl/`
- Kafka topic: `event.publish_rejected` (ใหม่), `event.published` (topic เดิม)
