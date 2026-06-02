# PP-210 · [BO][Admin] Interest + Statistic + Search

| Field        | Value                        |
|--------------|------------------------------|
| **Key**      | PP-210                       |
| **Type**     | Story                        |
| **Project**  | POPPA                        |
| **Status**   | To Do                        |
| **Assignee** | pathai laooatthaphong        |
| **Figma**    | Design by Dev                |

---

## User Story

> **ในฐานะ:** Admin ของ Platform Poppa
> **ฉันต้องการ:** ดูรายงานสรุป User Interest และความเชื่อมโยงระหว่าง Event กับ Interest
> **เพื่อ:** วิเคราะห์พฤติกรรมและความสนใจของผู้ใช้ และนำข้อมูลไปปรับปรุงการแนะนำ Content ให้ตรงกลุ่มเป้าหมาย

---

## 1. Description

หน้า Backoffice สำหรับ Admin ที่แสดงรายงานสรุป (Report) เกี่ยวกับ User Interest และการเชื่อม Relationship ระหว่าง Event กับ Interest โดยมีระบบ Feed Personalization 2 ระดับ:

- **MVP (First Phase):** เน้นปริมาณและความหลากหลาย ดึง Content ทั้งหมดมาแสดงรวมกันเป็น Global Feed เรียงตาม Recency และแทรก (Pin) Content ที่ตรงกับ Interest ของ User ไว้ในลำดับต้น
- **Improved Phase:** เน้นความแม่นยำ แบ่ง Tab ชัดเจน เช่น `For You`, `Following`, `Explore`

---

## 2. Acceptance Criteria

### Scenario 1 — View Interest Report

- **Given:** Admin เข้าสู่ระบบ Backoffice และไปยังหน้า Interest + Statistic
- **When:** หน้าโหลดสำเร็จ
- **Then:** ระบบแสดงรายงานสรุป User Interest พร้อมข้อมูลสถิติ เช่น จำนวน User ต่อ Interest หมวดหมู่

### Scenario 2 — Search by Interest

- **Given:** Admin อยู่ที่หน้า Interest + Statistic
- **When:** Admin ค้นหาด้วย Keyword ที่เกี่ยวกับ Interest
- **Then:** ระบบกรองและแสดงข้อมูล Interest ที่ตรงกับ Keyword นั้น

### Scenario 3 — View Event-Interest Relationship

- **Given:** Admin เลือก Interest หมวดหมู่ใดหมวดหมู่หนึ่ง
- **When:** Admin กดดูรายละเอียด
- **Then:** ระบบแสดง Event ที่เชื่อมโยงกับ Interest นั้น พร้อมสถิติการมีส่วนร่วม

### Scenario 4 — Global Feed Pin Logic (MVP)

- **Given:** ระบบดึง Content ขึ้นมาแสดงใน Global Feed
- **When:** ระบบ Match Content กับ Interest ของ User
- **Then:** Content ที่ตรงกับ Interest จะถูก Pin ไว้ในลำดับต้นของ Feed เรียงตาม Recency

---

## 3. Data Relationship Logic

| Layer | Data Source | Description |
|-------|-------------|-------------|
| A | User Profile Data | Interests, Personality Test, Activity Behavior |
| B | Content Tagging | Creator's Interest, Context Tag (Community ID) |
| C | Logic Connection | Interest Match, Personality Match, Event Proximity | ### Feed Strategy | Phase | Strategy | Description |
|-------|----------|-------------|
| First (MVP) | Global Feed + Pin | ดึง Content ทั้งหมดเรียงตาม Recency แทรก Content ที่ตรงกับ Interest ไว้ในลำดับต้น |
| Improve | Tabbed Feed | แบ่ง Tab เป็น `For You`, `Following`, `Explore` เน้นความแม่นยำ |

---

## 4. Definition of Done

- [ ] หน้า Interest Report แสดงสถิติ User Interest ได้ถูกต้อง
- [ ] Search by Interest ทำงานได้และกรองผลลัพธ์ถูกต้อง
- [ ] แสดง Event-Interest Relationship ได้ครบถ้วน
- [ ] Global Feed Pin Logic (MVP) ทำงานถูกต้อง — Content ที่ตรง Interest ถูก Pin ลำดับต้น
- [ ] RBAC กั้นเฉพาะ Admin เข้าถึงหน้านี้ได้
