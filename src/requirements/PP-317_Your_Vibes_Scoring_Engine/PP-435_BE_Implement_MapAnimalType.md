# PP-435 · [BE] Implement MapAnimalType — preset lookup table map scores 4 มิติ → animal type (hardcode ใน code)

| Field        | Value                                                           |
|--------------|-----------------------------------------------------------------|
| **Key**      | PP-435                                                          |
| **Type**     | Sub-task                                                        |
| **Project**  | POPPA                                                           |
| **Status**   | Review Code |
| **Assignee** | —                                                               |
| **Parent**   | [PP-317](./PP-317_Your_Vibes_Scoring_Engine.md)                 |

---

## User Story

> Implement Function MapAnimalType ที่รับ scores 4 มิติและ Return animal_type โดยใช้ Preset Lookup Table ที่ Hardcode ในโค้ด

---

## 1. Description

Implement Service Function `MapAnimalType(scores) -> animal_type` โดยใช้ Preset Lookup Table ที่ Hardcode ในโค้ด (ไม่ Query Database) เพื่อ Map คะแนน 4 มิติ (Energy, Social, Structure, Exploration) ให้เป็น Animal Type ที่ถูกต้อง

---

## 2. Acceptance Criteria

### Scenario 1 — Map คะแนนเป็น Animal Type ได้ถูกต้อง

- **Given:** รับ scores { energy, social, structure, exploration } ที่ Normalize แล้ว
- **When:** MapAnimalType ทำงาน
- **Then:** Return animal_type string ที่ตรงกับ Preset Lookup Table

### Scenario 2 — ทุก Combination มี Animal Type รองรับ

- **Given:** Scores ชุดใดก็ตามที่ถูกต้อง
- **When:** MapAnimalType ทำงาน
- **Then:** ไม่มี Case ที่ไม่พบ Animal Type (มี Default / Fallback)

---

## 3. Technical Rules

- Lookup Table Hardcode ในโค้ด (ไม่ Query Database)
- Input: scores { energy: 0-100, social: 0-100, structure: 0-100, exploration: 0-100 }
- Output: animal_type string (เช่น "lion", "dolphin", "owl", "fox" ฯลฯ ตาม Spec)
- ต้องมี Default Animal Type สำหรับกรณีที่ไม่ตรง Rule ใด

---

## 4. Definition of Done

- [ ] MapAnimalType Function Implement แล้ว
- [ ] Lookup Table Hardcode ครบทุก Animal Type
- [ ] มี Default / Fallback กรณีไม่ตรง Rule
- [ ] Unit Test ครอบคลุม Rule หลักและ Default Case
