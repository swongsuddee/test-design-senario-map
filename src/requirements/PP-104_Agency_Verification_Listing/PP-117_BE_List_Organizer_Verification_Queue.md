# PP-117 · [BE][User-Service] List Organizer Verification Queue for Admin

| Field        | Value                                                              |
|--------------|--------------------------------------------------------------------|
| **Key**      | PP-117                                                             |
| **Type**     | Sub-task                                                           |
| **Project**  | POPPA                                                              |
| **Status**   | Ready To Test STG                                                  |
| **Assignee** | Jack-Rachata Punyathananan                                         |
| **Parent**   | [PP-104](./PP-104_Agency_Verification_Listing.md)                  |

---

## Summary

พัฒนา API สำหรับให้ Admin ดึงรายการ Organizer Verification ที่อยู่ในระบบ เพื่อใช้แสดงในหน้า Admin Queue สำหรับตรวจสอบเอกสารยืนยันตัวตน

---

## 1. Endpoint

```
GET /admin/organizers
```

---

## 2. Query Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| page | number | no | default 1 |
| limit | number | no | default 20, max 100 |
| status | enum | no | filter by status |
| search | string | no | search organizer |
| sortBy | string | no | submittedAt / reviewedAt |
| sortOrder | string | no | asc / desc |

---

## 3. Supported Status Values

- `PENDING_REVIEW`
- `APPROVED`
- `REJECTED`
- `REQUESTED_MORE_INFO`

---

## 4. Response Fields per Item

| Field | Description |
|-------|-------------|
| organizerId | — |
| profileType | INDIVIDUAL / COMPANY |
| displayName | ชื่อ / ชื่อบริษัท |
| phone | — |
| email | — |
| verificationStatus | สถานะปัจจุบัน |
| submittedAt | วันที่ส่งคำขอ |
| reviewedAt | วันที่ตรวจสอบ (null ถ้ายังไม่ตรวจ) |
| reviewedBy | Admin ID ที่ตรวจสอบ (null ถ้ายังไม่ตรวจ) |

---

## 5. Search Rules

ค้นหาได้จาก:
- individual full name
- company name
- phone number
- email
- organizerId

---

## 6. Acceptance Criteria

- Admin สามารถดู verification queue ได้
- รองรับ pagination
- รองรับ filter ตาม status
- รองรับ search organizer
- รองรับ sorting
- คืนข้อมูล summary ครบถ้วน
- ตรวจสอบสิทธิ์ admin ก่อนใช้งาน
- หากไม่มีข้อมูลให้ response success พร้อม empty list

---

## 7. Validation Rules

- ต้องเป็น Admin เท่านั้น
- `limit` สูงสุดไม่เกิน 100
- `status` ต้องอยู่ใน enum ที่กำหนด
- `sortOrder` รองรับเฉพาะ `asc` / `desc`
