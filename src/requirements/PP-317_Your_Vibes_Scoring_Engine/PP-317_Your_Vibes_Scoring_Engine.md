# PP-317 · Your Vibes - Vibe Scoring Engine (ส่วนการคำนวนตามสูตร)

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-317        |
| **Type**     | Story         |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | —             |
| **Figma**    | Design by Dev |

---

## User Story

> **ในฐานะ:** ระบบ (System)
> **ฉันต้องการ:** นำคำตอบจากผู้ใช้มาคำนวณเป็นคะแนน 4 มิติ (Energy, Social, Structure, Exploration)
> **เพื่อ:** เปลี่ยนคำตอบดิบให้เป็นโครงสร้างข้อมูลที่ใช้ในการประมวลผลต่อได้

---

## 1. Description

Vibe Scoring Engine เป็น Backend Service ที่รับคำตอบดิบ Q1-Q7 (int 1-5 ต่อข้อ) แล้วคำนวณเป็นคะแนน 4 มิติ (Energy, Social, Structure, Exploration) ตามสูตรที่กำหนด โดยนำค่าน้ำหนัก 70% มาใช้ Normalize คะแนนให้อยู่ในช่วง 0-100 จากนั้น Map คะแนนเป็น Animal Type โดยใช้ Preset Lookup Table และบันทึกผลลัพธ์ลง User Profile

---

## 2. Acceptance Criteria

### Scenario 1 — คำนวณคะแนน 4 มิติจาก Q1-Q7

- **Given:** ระบบได้รับคำตอบ Q1-Q7 ที่ถูกต้อง
- **When:** Scoring Engine ประมวลผล
- **Then:** คำนวณคะแนนแต่ละมิติตามสูตร: คะแนนถ่วงน้ำหนัก = คะแนน * 0.7 และ Normalize ให้อยู่ใน 0-100

### Scenario 2 — ตอบ 5 ทุกข้อได้คะแนน 100

- **Given:** User ตอบ 5 ทุกข้อ (Q1-Q7)
- **When:** Scoring Engine คำนวณ
- **Then:** คะแนนแต่ละมิติที่ได้ต้องเท่ากับ 100

### Scenario 3 — ตอบ 1 ทุกข้อได้คะแนน 20

- **Given:** User ตอบ 1 ทุกข้อ (Q1-Q7)
- **When:** Scoring Engine คำนวณ
- **Then:** คะแนนแต่ละมิติที่ได้ต้องเท่ากับ 20

### Scenario 4 — Map คะแนนเป็น Animal Type

- **Given:** คะแนน 4 มิติถูกคำนวณแล้ว
- **When:** MapAnimalType ทำงาน
- **Then:** ระบบ Return animal_type ที่ถูกต้องตาม Preset Lookup Table

### Scenario 5 — บันทึกผลลัพธ์ลง User Profile

- **Given:** คำนวณและ Map Animal Type เสร็จแล้ว
- **When:** บันทึกผลลัพธ์
- **Then:** vibe_result { animal_type, scores, completed_at } ถูก Upsert ลง users collection ใน MongoDB

---

## 3. Technical Rules

### Behavioral Mapping

| Dimension  | Category    |
|------------|-------------|
| Energy     | Active      |
| Social     | Social      |
| Structure  | Wellness    |
| Exploration| Creative    | ### Scoring Formula

- คะแนนถ่วงน้ำหนัก = raw_score * 0.7
- Normalize ให้อยู่ในช่วง 0-100
- ตอบ 5 ทุกข้อ = 100, ตอบ 1 ทุกข้อ = 20

### vibe_result Schema (MongoDB)

```json
{
  "animal_type": "string",
  "scores": {
    "energy": 0,
    "social": 0,
    "structure": 0,
    "exploration": 0
  },
  "completed_at": "ISODate"
}
```

---

## 4. Definition of Done

- [ ] CalculateVibeScore คำนวณ 4 มิติ Normalize 0-100 ถูกต้อง
- [ ] ตอบ 5 ทุกข้อ = 100; ตอบ 1 ทุกข้อ = 20
- [ ] MapAnimalType Lookup จาก Preset Table ได้ Animal Type ถูกต้อง
- [ ] vibe_result ถูก Upsert ลง users collection สำเร็จ
- [ ] Seed vibe_animals Preset Data เสร็จ
- [ ] Unit Test ครอบคลุมสูตรคำนวณและ Edge Cases

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-434](./PP-434_BE_Implement_CalculateVibeScore.md) | [BE] Implement CalculateVibeScore — hardcode formula คำนวณ 4 มิติ (Energy, Social, Structure, Exploration) normalize 0-100 | Review Code |
| [PP-435](./PP-435_BE_Implement_MapAnimalType.md) | [BE] Implement MapAnimalType — preset lookup table map scores 4 มิติ → animal type (hardcode ใน code) | Review Code |
| [PP-436](./PP-436_BE_Save_Vibe_Result_To_User_Profile.md) | [BE] Save vibe result to user profile — upsert field vibe_result { animal_type, scores, completed_at } ลง users collection (MongoDB) | Ready to Deploy STG |
| [PP-437](./PP-437_INFRA_Seed_Vibe_Animals_Preset_Data.md) | [INFRA] Seed vibe_animals preset data | To Do |
