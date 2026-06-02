# PP-340 · [M-App][End-User] Content Interaction & Engagement

| Field        | Value |
|--------------|-------|
| **Key**      | PP-340 |
| **Type**     | Sub-task |
| **Project**  | POPPA |
| **Status**   | To Do |
| **Assignee** | — |
| **Parent**   | [PP-448](./PP-448_Explore_Post.md) |
| **Figma**    | Design by Dev |

---

## User Story

> ฉันต้องการมีปฏิสัมพันธ์กับโพสต์ของเพื่อนๆ ใน Community

---

## 1. Description

Content Interaction & Engagement ครอบคลุมการ Like, Comment และ Follow โพสต์ใน Feed ของ Poppa โดยระบบจะแสดงจำนวน Like รวม, รายการ Comment, และปุ่ม Follow ที่หายไปเมื่อ Follow แล้ว พร้อมแจ้งเตือน In-App ไปยังเจ้าของโพสต์เมื่อมีการ Like, Comment หรือ Follow

---

## 2. Acceptance Criteria

### Scenario 1 — Like a Post (Toggle On)

- **Given:** ผู้ใช้เห็นโพสต์ที่ยังไม่ได้ Like
- **When:** ผู้ใช้กดปุ่มหัวใจ
- **Then:** ไอคอนหัวใจเปลี่ยนสถานะเป็น Liked และจำนวน Like รวมเพิ่มขึ้น 1

### Scenario 2 — Unlike a Post (Toggle Off)

- **Given:** ผู้ใช้เห็นโพสต์ที่ Like ไว้แล้ว
- **When:** ผู้ใช้กดปุ่มหัวใจอีกครั้ง
- **Then:** ไอคอนหัวใจเปลี่ยนสถานะกลับเป็น Unlike และจำนวน Like ลดลง 1

### Scenario 3 — Comment on a Post

- **Given:** ผู้ใช้เปิดโพสต์ของเพื่อน
- **When:** ผู้ใช้พิมพ์ข้อความ Comment และกด Submit
- **Then:** ระบบแสดง Comment ของผู้ใช้ใต้โพสต์และผู้อื่นสามารถเห็นได้

### Scenario 4 — View Other Comments

- **Given:** ผู้ใช้เปิดโพสต์ที่มี Comment อยู่แล้ว
- **When:** ผู้ใช้เลื่อนดูรายการ Comment
- **Then:** ระบบแสดงรายการ Comment ของคนอื่นครบถ้วน

### Scenario 5 — Follow Post Author

- **Given:** ผู้ใช้เห็นโพสต์ของ User ที่ยังไม่ได้ Follow
- **When:** ผู้ใช้กดปุ่ม Follow ข้างชื่อผู้โพสต์
- **Then:** ระบบบันทึก Follow และปุ่ม Follow หายไป

### Scenario 6 — In-App Notification on Like

- **Given:** มีผู้ใช้กด Like โพสต์
- **When:** การ Like สำเร็จ
- **Then:** ระบบส่ง In-App Notification แจ้งเตือนไปยังเจ้าของโพสต์

### Scenario 7 — In-App Notification on Comment

- **Given:** มีผู้ใช้เขียน Comment
- **When:** การ Comment สำเร็จ
- **Then:** ระบบส่ง In-App Notification แจ้งเตือนไปยังเจ้าของโพสต์

### Scenario 8 — In-App Notification on Follow

- **Given:** มีผู้ใช้กด Follow
- **When:** การ Follow สำเร็จ
- **Then:** ระบบส่ง In-App Notification แจ้งเตือนไปยังเจ้าของโพสต์

---

## 3. Technical Rules

| Feature | Rule |
|---------|------|
| Like | Toggle On/Off; แสดงจำนวน Like รวม |
| Comment | Free-text; แสดง Comment List ใต้โพสต์ |
| Follow | ปุ่มหายไปหลัง Follow แล้ว |
| In-App Notification | แจ้งเจ้าของโพสต์เมื่อมี Like / Comment / Follow |

---

## 4. Definition of Done

- [ ] ปุ่ม Like Toggle On/Off ทำงานถูกต้อง
- [ ] จำนวน Like รวมอัปเดต Real-time
- [ ] ผู้ใช้สามารถพิมพ์ Comment และบันทึกได้
- [ ] รายการ Comment ของคนอื่นแสดงครบถ้วน
- [ ] ปุ่ม Follow ทำงานถูกต้องและหายไปหลัง Follow
- [ ] In-App Notification ส่งถึงเจ้าของโพสต์เมื่อมี Like
- [ ] In-App Notification ส่งถึงเจ้าของโพสต์เมื่อมี Comment
- [ ] In-App Notification ส่งถึงเจ้าของโพสต์เมื่อมี Follow
