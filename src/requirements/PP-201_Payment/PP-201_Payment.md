# PP-201 · [M-App][End-User] Payment (หน้าชำระเงิน)

| Field        | Value                     |
|--------------|---------------------------|
| **Key**      | PP-201                    |
| **Type**     | Story                     |
| **Project**  | POPPA                     |
| **Status**   | Ready To Test STG               |
| **Assignee** | pathai laooatthaphong     |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** ชำระเงินค่าตั๋ว (Ticket) ผ่านช่องทางที่หลากหลาย
> **เพื่อ:** ได้รับการยืนยันการลงทะเบียน Event อย่างรวดเร็ว เชื่อถือได้ และ end-to-end traceable

---

## 1. Description

ระบบชำระเงินสำหรับซื้อตั๋ว (Ticket) ภายในแพลตฟอร์ม MVP1 รองรับ:
- **QR PromptPay** — Generate QR, expire 15 นาที, auto-confirm
- **TrueMoney Wallet** — Redirect แอป, กลับพร้อมสถานะ
- **Mobile Banking** — BBL, KBANK, SCB, KMA, KTB *(pathai)*

**Gateway:** Payginix (QR Code + TrueMoney เท่านั้นใน MVP1)

---

## 2. Technical Acceptance Criteria

### Scenario 1 — Checkout Flow
- **Given:** User เลือก Ticket และดูสรุปรายการ
- **When:** เลือกวิธีชำระเงิน
- **Then:** แสดงราคาชัดเจน ก่อนยืนยันการจ่าย

### Scenario 2 — PromptPay QR Payment
- **Given:** User เลือกจ่ายด้วย QR PromptPay
- **When:** ระบบ Generate QR Code (TTL 15 นาที)
- **Then:** User scan และจ่าย → ระบบ confirm อัตโนมัติผ่าน Webhook

### Scenario 3 — TrueMoney Wallet
- **Given:** User เลือกจ่ายด้วย TrueMoney
- **When:** Redirect ไปแอป TrueMoney
- **Then:** จ่ายเงิน → กลับมาที่ระบบพร้อมสถานะ payment

### Scenario 4 — Payment Webhook Handling
- **Given:** Provider ส่ง Webhook แจ้งผล
- **When:** ระบบรับ Webhook
- **Then:** อัปเดตสถานะ Payment แม่นยำ รองรับ retry, ไม่มีการบันทึกซ้ำ (idempotency)

### Scenario 5 — Refund
- **Given:** User หรือระบบต้องการคืนเงิน
- **When:** Cancel Event / Leave paid Event
- **Then:** คืนเงินตาม policy (100% ก่อน 7 วัน, 50% ก่อน 3 วัน) คืนไปยังช่องทางเดิม

### Scenario 6 — Organizer Payout
- **Given:** Event จบแล้ว
- **When:** ระบบโอนเงินให้ Organizer
- **Then:** หักค่าธรรมเนียม Platform แล้วโอนส่วนที่เหลือ พร้อม Report สรุปยอด

---

## 3. Backend & Data Specifications

### Payment Lifecycle
```
Initiated → Pending → Completed → Refunded (optional)
```

### Key Principles
- Trust & Reliability: จ่ายแล้วไม่หาย, confirm แม่นยำ
- Thai-first: PromptPay / Wallet เป็นหลัก
- Transparency: ทุก transaction trace ได้
- No double refund

---

## 4. Definition of Done

- [ ] QR PromptPay และ TrueMoney ทำงานได้ end-to-end
- [ ] Webhook handling + idempotency ถูกต้อง
- [ ] Refund flow ตาม policy ทำงานถูกต้อง
- [ ] Organizer Payout หักค่าธรรมเนียมถูกต้อง
- [ ] Payment History ดูได้ทั้ง User view และ Admin view

---

## 5. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-202](./PP-202_BE_Design_Payment_Architecture.md) | [BE][Payment] Design Payment Architecture, Flow, Data Schema | Ready to Deploy STG |
| [PP-204](./PP-204_BE_Implement_Payment_Flow.md) | [BE][Payment] Implement Payment Flow Thai QR, Mobile Banking, True Wallet | Ready To Test STG |
| [PP-205](./PP-205_BE_Implement_Payment_Webhook.md) | [BE][Payment] Implement Payment Webhook | Ready To Test STG |
| [PP-206](./PP-206_BE_Implement_Payout.md) | [BE][Payment] Implement Payout | Ready To Test STG |
| [PP-276](./PP-276_BE_Implement_Get_Payment_Status.md) | [BE][Payment] Implement API Get Payment Status | Ready To Test STG |
| [PP-297](./PP-297_MB_Payment_Method_Selection_UI.md) | [MB][End-User] Payment Method Selection UI | Ready To Test STG |
| [PP-298](./PP-298_MB_QR_PromptPay_Screen_UI.md) | [MB][End-User] QR PromptPay Payment Screen UI | Ready To Test STG |
| [PP-299](./PP-299_MB_Pending_Payment_Status_UI.md) | [MB][End-User] Pending Payment Status Screen UI | Ready To Test STG |
| [PP-300](./PP-300_MB_Payment_Success_UI.md) | [MB][End-User] Payment Success Screen UI | Ready To Test STG |
| [PP-301](./PP-301_MB_Payment_Integrate_API.md) | [MB][End-User] Payment Integrate API (Payginix — QR & Mobile Banking) | Ready To Test STG |

> Flow diagram → [PP-201.diagram.md](../../test-design/PP-201.diagram.md)
> Test design → [PP-201.design.md](../../test-design/PP-201.design.md)
