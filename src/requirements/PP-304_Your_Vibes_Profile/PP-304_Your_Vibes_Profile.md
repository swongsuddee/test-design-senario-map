# PP-304 · Your Vibes - Profile (แสดง Animal Result ใน หน้า User Profile)

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-304        |
| **Type**     | Story         |
| **Project**  | POPPA         |
| **Status**   | In Progress         |
| **Assignee** | —             |
| **Figma**    | Design by Dev |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** เห็นผลลัพธ์บุคลิกภาพในรูปแบบภาพสัตว์ในหน้า Profile
> **เพื่อ:** ให้ฉันเข้าใจตัวเองและอาจจะแชร์ไปได้อีก

---

## 1. Description

เพิ่ม Section แสดงผลลัพธ์ Vibe (Animal Result) ในหน้า User Profile ของ End-User โดยแสดงรูปภาพสัตว์ที่ชัดเจนพร้อมข้อมูลพื้นฐาน และมีปุ่ม Share สำหรับโพสต์ผลลัพธ์ไปยัง Facebook และ Instagram อีกครั้งหากต้องการ

---

## 2. Acceptance Criteria

### Scenario 1 — แสดง Animal Result ใน Profile

- **Given:** End-User ที่ทำ Quiz เสร็จแล้วเปิดหน้า Profile
- **When:** หน้า Profile โหลดสำเร็จ
- **Then:** แสดง Section Vibe Result ที่มีรูปภาพสัตว์ชัดเจนและชื่อประเภทบุคลิกภาพ

### Scenario 2 — Share ผลลัพธ์จากหน้า Profile

- **Given:** End-User อยู่ที่หน้า Profile และมี Vibe Result แล้ว
- **When:** กดปุ่ม Share
- **Then:** ระบบ Generate ภาพผลลัพธ์และเปิด Share Sheet ให้เลือก FB หรือ IG

### Scenario 3 — User ยังไม่ทำ Quiz

- **Given:** End-User ที่ยังไม่เคยทำ Quiz เปิดหน้า Profile
- **When:** หน้า Profile โหลดสำเร็จ
- **Then:** ไม่แสดง Section Vibe Result หรือแสดง Prompt ชวนให้ไปทำ Quiz

---

## 3. Technical Rules

### API

```
GET /v1/users/{userId}/profile
```

### Vibe Result Field ใน Response

```json
{
  "vibe_result": {
    "animal_type": "string",
    "scores": {
      "energy": 0,
      "social": 0,
      "structure": 0,
      "exploration": 0
    }
  }
}
```

หาก User ยังไม่เคยทำ Quiz ให้ vibe_result เป็น `null`

---

## 4. Definition of Done

- [ ] Section Vibe Result แสดงใน Profile เมื่อมีข้อมูล
- [ ] รูปภาพสัตว์แสดงชัดเจน
- [ ] ปุ่ม Share Generate ภาพและเปิด Share Sheet ได้
- [ ] กรณี vibe_result เป็น null ไม่แสดง Section หรือแสดง Prompt ชวน Quiz
- [ ] Integration ทดสอบกับ GET /v1/users/{userId}/profile ผ่าน

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-430](./PP-430_MB_Implement_Wireframe_Profile_Animal_Result.md) | [MB][End-User] implement wireframe profile animal result page (wait for ui) | To Do |
| [PP-431](./PP-431_MB_Implement_UI_Profile_Animal_Result.md) | [MB][End-User] implement ui profile animal result page | To Do |
| [PP-432](./PP-432_MB_Integration_API_Profile_Animal_Result.md) | [MB][End-User] integration api profile animal result | To Do |
| [PP-440](./PP-440_BE_Extend_GET_User_Profile_Vibe_Result.md) | [BE] Extend GET /v1/users/{userId}/profile — include vibe_result { animal_type, scores } ใน profile response (ถ้ายังไม่เคยทำ quiz ให้ return null) | Ready to Deploy STG |
