# PP-119 · [BE][Events-Service] Admin Get Event List

| Field        | Value                                                        |
|--------------|--------------------------------------------------------------|
| **Key**      | PP-119                                                       |
| **Type**     | Sub-task                                                     |
| **Project**  | POPPA                                                        |
| **Status**   | Ready To Test STG                                            |
| **Assignee** | Pond-Siritep Tongdoung                                       |
| **Parent**   | [PP-171](./PP-171_Permission_Activation.md)                  |

---

## Summary

Admin สามารถดูรายการ Event ทั้งหมดในระบบผ่านหน้า Backoffice เพื่อตรวจสอบ, review ก่อน publish, search/filter และ moderation

---

## 1. RPC

```protobuf
rpc AdminGetEventList(AdminGetEventListRequest) returns (AdminGetEventListResponse);
```

### Request

```protobuf
message AdminGetEventListRequest {
  string keyword = 1;
  repeated string statuses = 2;
  repeated string category_codes = 3;
  string organizer_id = 4;
  string sort_by = 5;
  int32 page = 6;
  int32 limit = 7;
}
```

---

## 2. Response Fields per Event

| Field | Description |
|-------|-------------|
| event_id | — |
| title | ชื่องาน |
| organizer_name | ชื่อ organizer |
| category | หมวดหมู่ |
| start_date | วันเริ่มงาน |
| status | สถานะ event |
| participant_count | จำนวนผู้ลงทะเบียน |
| sold_count | จำนวนที่ขายได้ |
| total_revenue | รายได้รวม (satang) |
| created_at | วันที่สร้าง |

---

## 3. Search & Filter

- **Search**: event title, organizer name
- **Filter**: status, category, organizer, date range, province
- **Sort**: newest, upcoming, highest revenue, most participants

---

## 4. Permission

เฉพาะ role `admin` / `super_admin` เท่านั้นเรียกได้

---

## 5. Acceptance Criteria

- admin ดู event list ได้ (paginated)
- search ได้ด้วย keyword
- filter ได้ตาม status / category
- sort ได้หลายแบบ
- เห็น organizer, participant count, revenue ใน summary
