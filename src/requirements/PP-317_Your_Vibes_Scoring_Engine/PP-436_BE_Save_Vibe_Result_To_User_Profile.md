# PP-436 · [BE] Save vibe result to user profile — upsert field vibe_result { animal_type, scores, completed_at } ลง users collection (MongoDB)

| Field        | Value                                                           |
|--------------|-----------------------------------------------------------------|
| **Key**      | PP-436                                                          |
| **Type**     | Sub-task                                                        |
| **Project**  | POPPA                                                           |
| **Status**   | Ready to Deploy STG |
| **Assignee** | —                                                               |
| **Parent**   | [PP-317](./PP-317_Your_Vibes_Scoring_Engine.md)                 |

---

## User Story

> Implement การบันทึก vibe_result ลง users collection ใน MongoDB โดยใช้ Upsert เพื่อรองรับทั้งการสร้างใหม่และการอัปเดต

---

## 1. Description

Implement Repository / Data Layer สำหรับ Upsert Field vibe_result ลง Document ของ User ใน MongoDB users collection โดยใช้ Upsert Operation เพื่อรองรับกรณีที่ User ทำ Quiz ซ้ำ (ผลลัพธ์ใหม่จะ Overwrite ของเดิม) vibe_result ประกอบด้วย: animal_type, scores { energy, social, structure, exploration }, completed_at

---

## 2. Acceptance Criteria

### Scenario 1 — Upsert vibe_result สำเร็จ (ครั้งแรก)

- **Given:** User ทำ Quiz เป็นครั้งแรก
- **When:** บันทึก vibe_result
- **Then:** vibe_result ถูก Insert ลง users collection พร้อม completed_at = ปัจจุบัน

### Scenario 2 — Upsert vibe_result สำเร็จ (ทำ Quiz ซ้ำ)

- **Given:** User มี vibe_result อยู่แล้วและทำ Quiz ใหม่
- **When:** บันทึก vibe_result ใหม่
- **Then:** vibe_result ถูก Update (Overwrite) ด้วยข้อมูลใหม่ ไม่มี Duplicate Document

### Scenario 3 — Field อื่นใน User Document ไม่ถูกกระทบ

- **Given:** Upsert vibe_result
- **When:** Operation เสร็จสิ้น
- **Then:** Field อื่นๆ ใน User Document ยังคงค่าเดิม ไม่ถูกล้าง

---

## 3. Technical Rules

### MongoDB Operation

```javascript
db.users.updateOne(
  { _id: userId },
  { $set: { vibe_result: { animal_type, scores, completed_at: new Date() } } },
  { upsert: false }  // User ต้องมีอยู่แล้ว
)
```

### vibe_result Schema

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

- [ ] Upsert vibe_result ลง users collection สำเร็จ
- [ ] completed_at บันทึกเวลาปัจจุบันอัตโนมัติ
- [ ] ทำ Quiz ซ้ำ Overwrite ผลเดิมได้
- [ ] Field อื่นใน User Document ไม่ถูกกระทบ
- [ ] Unit Test ครอบคลุม Insert ใหม่และ Update กรณีมีอยู่แล้ว
