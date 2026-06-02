# PP-434 · [BE] Implement CalculateVibeScore — hardcode formula คำนวณ 4 มิติ (Energy, Social, Structure, Exploration) normalize 0-100

| Field        | Value                                                           |
|--------------|-----------------------------------------------------------------|
| **Key**      | PP-434                                                          |
| **Type**     | Sub-task                                                        |
| **Project**  | POPPA                                                           |
| **Status**   | Review Code |
| **Assignee** | —                                                               |
| **Parent**   | [PP-317](./PP-317_Your_Vibes_Scoring_Engine.md)                 |

---

## User Story

> Implement Function CalculateVibeScore ที่รับ answers Q1-Q7 และคำนวณคะแนน 4 มิติ Normalize 0-100 ตามสูตรที่กำหนด

---

## 1. Description

Implement Service Function `CalculateVibeScore(answers: int[7]) -> scores` โดย Hardcode สูตรการคำนวณ 4 มิติ (Energy, Social, Structure, Exploration) นำค่าน้ำหนัก 70% มาใช้ และ Normalize ผลลัพธ์ให้อยู่ในช่วง 0-100 โดยต้องผ่าน Boundary Check: ตอบ 5 ทุกข้อ = 100, ตอบ 1 ทุกข้อ = 20

---

## 2. Acceptance Criteria

### Scenario 1 — คำนวณถูกต้องตามสูตร

- **Given:** รับ answers Q1-Q7
- **When:** CalculateVibeScore ทำงาน
- **Then:** Return scores { energy, social, structure, exploration } ทุกค่าอยู่ใน 0-100

### Scenario 2 — Boundary: ตอบ 5 ทุกข้อ

- **Given:** answers = [5, 5, 5, 5, 5, 5, 5]
- **When:** คำนวณ
- **Then:** ทุก dimension score = 100

### Scenario 3 — Boundary: ตอบ 1 ทุกข้อ

- **Given:** answers = [1, 1, 1, 1, 1, 1, 1]
- **When:** คำนวณ
- **Then:** ทุก dimension score = 20

---

## 3. Technical Rules

### Formula

```
weighted_score = raw_score * 0.7
normalized_score = normalize(weighted_score, min=0, max=100)
```

### Dimension Mapping

| Question | Dimension  |
|----------|------------|
| Q1-Qx    | Energy     |
| Q2-Qx    | Social     |
| Q3-Qx    | Structure  |
| Q4-Qx    | Exploration|

(Mapping จริงต้องตาม Spec ที่กำหนดในฝั่ง Design)

---

## 4. Definition of Done

- [ ] CalculateVibeScore Function Implement แล้ว
- [ ] Boundary Test: answers ทั้ง 5 = 100 ผ่าน
- [ ] Boundary Test: answers ทั้ง 1 = 20 ผ่าน
- [ ] Unit Test ครอบคลุม Happy Path และ Boundary Cases
