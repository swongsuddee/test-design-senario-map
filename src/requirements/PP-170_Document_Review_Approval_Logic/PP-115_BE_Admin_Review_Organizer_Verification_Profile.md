# PP-115 · [BE][User-Service] Admin Review Organizer Verification Profile

| Field        | Value                                                                    |
|--------------|--------------------------------------------------------------------------|
| **Key**      | PP-115                                                                   |
| **Type**     | Sub-task                                                                 |
| **Project**  | POPPA                                                                    |
| **Status**   | Ready to Deploy Prod |
| **Assignee** | Jack-Rachata Punyathananan                                               |
| **Parent**   | [PP-170](./PP-170_Document_Review_Approval_Logic.md)                     |

---

## Summary

พัฒนา API สำหรับให้ Admin ตรวจสอบข้อมูลยืนยันตัวตนของ Organizer และดำเนินการ Approve / Reject พร้อมเหตุผล

---

## 1. Request Payload

```json
{
  "organizerId": "string",
  "reviewStatus": "APPROVED

| REJECTED | REQUESTED_MORE_INFO",
  "reviewRemark": "string"
}
```

---

## 2. Field Validation

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| organizerId | string | yes | organizer ที่ต้องการตรวจสอบ |
| reviewStatus | enum | yes | ผลการตรวจสอบ |
| reviewRemark | string | conditional | บังคับเมื่อ REJECTED หรือ REQUESTED_MORE_INFO |

---

## 3. Status Flow

```
PENDING_SUBMISSION → PENDING_REVIEW → APPROVED / REJECTED
```

---

## 4. Data Update on Review

```json
{
  "verificationStatus": "APPROVED",
  "reviewedBy": "adminId",
  "reviewedAt": "timestamp",
  "reviewRemark": "string"
}
```

---

## 5. Acceptance Criteria

- Admin สามารถ review organizer verification ได้
- ระบบ validate สิทธิ์ admin
- ระบบบันทึกผล review ได้ถูกต้อง
- ระบบเก็บเหตุผลการ reject ได้
- ระบบอัปเดตสถานะ organizer ถูกต้อง
- ระบบบันทึกผู้ตรวจสอบและเวลา review
- ไม่สามารถ review ข้อมูลที่ final แล้วซ้ำได้

---

## 6. Validation Rules

- ต้องเป็น Admin เท่านั้นที่เรียก API นี้ได้
- Organizer ต้องมี verification profile ก่อน
- Organizer ต้องอยู่ในสถานะ `PENDING_REVIEW`
- ถ้า `reviewStatus = REJECTED` → `reviewRemark` ต้องไม่ว่าง
- ถ้า `reviewStatus = REQUESTED_MORE_INFO` → `reviewRemark` ต้องไม่ว่าง
- ไม่สามารถ review organizer เดิมซ้ำหากอยู่สถานะ final แล้ว
