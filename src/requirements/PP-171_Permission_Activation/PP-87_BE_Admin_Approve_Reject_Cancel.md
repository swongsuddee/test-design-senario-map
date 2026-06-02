# PP-87 · [BE][Events-Service] Admin Approve/Reject Cancel

| Field        | Value                                                        |
|--------------|--------------------------------------------------------------|
| **Key**      | PP-87                                                        |
| **Type**     | Sub-task                                                     |
| **Project**  | POPPA                                                        |
| **Status**   | Ready to Deploy STG                                          |
| **Assignee** | pathai laooatthaphong                                        |
| **Parent**   | [PP-171](./PP-171_Permission_Activation.md)                  |

---

## Summary

Admin ตรวจสอบคำขอยกเลิก event และตัดสินใจ approve หรือ reject — กรณี approve ระบบ notify ผู้เข้าร่วมและ trigger refund อัตโนมัติ

---

## 1. Allowed Transitions

| Admin Action | From | To | Allowed |
|---|---|---|---|
| Approve cancel | `pending_cancel` | `cancelled` | ✅ |
| Reject cancel | `pending_cancel` | `published` | ✅ |
| Approve / Reject | อื่นๆ | — | ❌ |

---

## 2. Kafka Events

| Event | Trigger | Consumer | Action |
|-------|---------|----------|--------|
| `event.cancelled` | Admin approve สำเร็จ | Notification Service | แจ้งผู้เข้าร่วมทุกคน |
| `event.cancelled` | Admin approve สำเร็จ | Payment Service | initiate refund (satang, int64) |
| `event.cancel_rejected` | Admin reject สำเร็จ | Notification Service | แจ้ง Organizer |

---

## 3. Acceptance Criteria

- Admin ดูรายการ event ที่ status = `pending_cancel` ได้ พร้อม cancel reason จาก Organizer
- Admin approve → `pending_cancel` → `cancelled` (trigger notify + refund)
- Admin reject → `pending_cancel` → `published` พร้อม reason (คืน status เดิม)
- Notify ผู้เข้าร่วมทุกคนเมื่อ event ถูกยกเลิก
- Refund process เริ่มอัตโนมัติสำหรับ ticket ที่ชำระเงินแล้ว
- Organizer ได้รับ notification ทั้งกรณี approve และ reject
- approve / reject ได้เฉพาะ status = `pending_cancel` เท่านั้น (return error กรณีอื่น)

---

## 4. Backend Components

- RPCs: `EventService.ApproveCancelEvent`, `EventService.RejectCancelEvent`
- Transition logic ใน `services/eventsvc/`
- Handlers ใน `handlers/eventhdl/`
- Kafka topic: `event.cancel_rejected` (ใหม่), `event.cancelled` (topic เดิม)
