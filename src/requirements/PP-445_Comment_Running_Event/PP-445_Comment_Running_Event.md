# PP-445 · Comment - on Running Event (ในหน้า Event)

| Field        | Value             |
|--------------|-------------------|
| **Key**      | PP-445            |
| **Type**     | Story             |
| **Project**  | POPPA             |
| **Status**   | To Do             |
| **Assignee** | —                 |
| **Figma**    | Design by Dev     |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** พิมพ์ข้อความแสดงความคิดเห็น สอบถาม หรืออ่านคอมเมนต์ของเพื่อนๆ ในหน้ารายละเอียดงานวิ่ง
> **เพื่อ:** สร้างชุมชน (Community) พูดคุย แลกเปลี่ยนข้อมูล หรือหาเพื่อนร่วมวิ่ง

---

## 1. Description

ฟีเจอร์ Comment บนหน้า Event Detail ให้ End-User สามารถอ่านและเขียน Comment รองรับระบบ Thread (Tier 1 / Tier 2), Reply พร้อม @mention, Organizer Tag สีส้ม, Thai relative time, Edit/Delete Comment ของตัวเอง และ Lazy Load Pagination

---

## 2. Acceptance Criteria

### Scenario 1 — Comment Section Layout (AC 1.1)

- **Given:** End-User เปิดหน้า Event Detail
- **When:** เลื่อนลงมายังส่วน Comment
- **Then:** แสดง Comment Section พร้อม Avatar, ชื่อผู้ใช้, ข้อความ, และ Timestamp

### Scenario 2 — Persistent Input Bar (AC 1.2)

- **Given:** End-User อยู่ในหน้า Event Detail ที่มี Comment Section
- **When:** เลื่อนหน้าจอ
- **Then:** Input Bar ติดอยู่ด้านล่างหน้าจอตลอดเวลา พร้อม Avatar ผู้ใช้

### Scenario 3 — Text Wrapping Multi-line (AC 1.3)

- **Given:** End-User พิมพ์ข้อความยาว
- **When:** ข้อความเกินความกว้างหน้าจอ
- **Then:** ข้อความ Wrap ขึ้นบรรทัดใหม่อัตโนมัติ และ Enter ขึ้นบรรทัดใหม่ได้

### Scenario 4 — Newest-first Sort & Pagination (AC 2.1)

- **Given:** มี Comment หลายรายการ
- **When:** หน้า Comment โหลด
- **Then:** แสดง Comment ใหม่สุดก่อน และ Lazy Load เพิ่มเติม 10-15 รายการเมื่อเลื่อนถึงด้านล่าง

### Scenario 5 — Input Validation & Optimistic Update (AC 2.2)

- **Given:** End-User กดส่ง Comment
- **When:** กดปุ่ม Send
- **Then:** Comment ปรากฏเป็นอันดับแรกทันที (Optimistic Prepend) และ Double-submit ถูก Guard

### Scenario 6 — Thai Relative Time (AC 2.3)

- **Given:** Comment ถูกสร้าง
- **When:** แสดง Timestamp
- **Then:** แสดงเวลาเป็นภาษาไทย เช่น เมื่อครู่, 5 นาทีที่แล้ว, 2 ชม., เมื่อวาน, หรือวันที่ พ.ศ.

### Scenario 7 — Thread & Reply System (AC 2.4)

- **Given:** End-User กด Reply บน Comment
- **When:** พิมพ์และส่ง Reply
- **Then:** แสดงเป็น Tier 2 พร้อม Thread Line, @mention อัตโนมัติ, และ Organizer Tag สีส้ม #FF5900

### Scenario 8 — Edit/Delete Own Comment (AC 2.4)

- **Given:** End-User เปิด Comment ของตัวเอง
- **When:** กด 3-dot Menu
- **Then:** แสดงตัวเลือก Edit และ Delete เฉพาะ Comment ของตัวเอง

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Thread Depth | Tier 1 (Top-level) และ Tier 2 (Reply) เท่านั้น |
| Sort Order | Newest-first |
| Pagination | Lazy Load 10-15 items per page |
| Content Limit | 1-1000 ตัวอักษร |
| Organizer Tag | สีส้ม #FF5900 |
| Relative Time | Thai locale (เมื่อครู่/นาที/ชม./วัน/วันที่ พ.ศ.) |
| Double-submit Guard | ป้องกันส่ง Comment ซ้ำ |

---

## 4. Definition of Done

- [ ] Comment Section Layout ครบทุก Element
- [ ] Persistent Input Bar ติดด้านล่างหน้าจอ
- [ ] Text Wrap Multi-line ทำงาน
- [ ] Newest-first Sort + Lazy Load ทำงาน
- [ ] Optimistic Prepend + Double-submit Guard ทำงาน
- [ ] Thai Relative Time แสดงถูกต้อง
- [ ] Thread Tier 1/Tier 2 + Reply @mention ทำงาน
- [ ] Organizer Tag สีส้ม #FF5900 แสดง
- [ ] Edit/Delete Comment ของตัวเองได้

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-471](./PP-471_INFRA_CommentsCount_Kafka.md) | [INFRA] เพิ่ม commentsCount field + setup Kafka topics | To Do |
| [PP-472](./PP-472_BE_proto_RPC_CreateComment.md) | [BE] proto/RPC CreateComment/ListComments/ListReplies/Update/Delete (targetType=event) | To Do |
| [PP-473](./PP-473_BE_REST_endpoints_gateway.md) | [BE] เพิ่ม REST endpoints บน gateway (POST/GET/PUT/DELETE) | To Do |
| [PP-474](./PP-474_BE_Target_validator_reply_rule.md) | [BE] Target validator + reply rule Tier 2 auto-mention | To Do |
| [PP-475](./PP-475_BE_Validation_trim_content.md) | [BE] Validation: trim, content 1-1000 chars, reject empty, double-submit protection | To Do |
| [PP-476](./PP-476_BE_Mention_parser_organizer.md) | [BE] Mention parser @user + organizer enrichment (isOrganizer flag) | To Do |
| [PP-477](./PP-477_BE_Kafka_producer_comment.md) | [BE] Kafka producer comment.created/deleted + event-api consumer อัปเดต commentsCount | To Do |
| [PP-478](./PP-478_BE_comment_history_write.md) | [BE] comment_history write + owner-only edit/delete + soft delete placeholder | To Do |
| [PP-479](./PP-479_MB_AC11_Comment_Section_Layout.md) | [MB][End-User] AC 1.1 Comment Section layout (avatar/name/text/timestamp) | To Do |
| [PP-480](./PP-480_MB_AC12_Persistent_input_bar.md) | [MB][End-User] AC 1.2 Persistent input bar + avatar | To Do |
| [PP-481](./PP-481_MB_AC13_Text_wrapping_multiline.md) | [MB][End-User] AC 1.3 Text wrapping multi-line + Enter ขึ้นบรรทัดใหม่ | To Do |
| [PP-482](./PP-482_MB_AC21_Newest_first_sort.md) | [MB][End-User] AC 2.1 Newest-first sort + lazy load pagination | To Do |
| [PP-483](./PP-483_MB_AC22_Input_validation_optimistic.md) | [MB][End-User] AC 2.2 Input validation + optimistic prepend + double-submit guard | To Do |
| [PP-484](./PP-484_MB_AC23_Thai_relative_time.md) | [MB][End-User] AC 2.3 Thai relative time formatter | To Do |
| [PP-485](./PP-485_MB_AC24_Thread_indentation_reply.md) | [MB][End-User] AC 2.4 Tier 1/Tier 2 indentation + thread line + reply auto-mention | To Do |
| [PP-486](./PP-486_MB_AC24_Mention_typeahead_noti.md) | [MB][End-User] AC 2.4 @mention typeahead picker + noti | To Do |
| [PP-487](./PP-487_MB_AC24_Edit_Delete_comment_menu.md) | [MB][End-User] AC 2.4 Edit/Delete own comment menu (3-dot) | To Do |
| [PP-488](./PP-488_MB_AC24_Organizer_tag.md) | [MB][End-User] AC 2.4 Organizer tag สีส้ม #FF5900 | To Do |
| [PP-489](./PP-489_QA_Test_scenarios.md) | [QA] Test scenarios: Happy path / Validation / Stress / Relative time precision | To Do |
