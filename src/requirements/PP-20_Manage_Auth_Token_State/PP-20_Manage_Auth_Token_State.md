# PP-20 · [M-App][End-User] Manage Auth Token State

| Field        | Value             |
|--------------|-------------------|
| **Key**      | PP-20             |
| **Type**     | Story             |
| **Project**  | POPPA             |
| **Status**   | Ready to Deploy Prod |
| **Assignee** | Tum-Natthapon.C   |

---

## User Story

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก story title

---

## 1. Technical Acceptance Criteria

### Scenario 1 — Token Storage & Refresh

- **AC 1.1:** แอปเก็บ Access Token และ Refresh Token อย่างปลอดภัย (Secure Storage)
- **AC 1.2:** เมื่อ Access Token หมดอายุ ระบบ refresh token อัตโนมัติโดยไม่ logout user
- **AC 1.3:** เมื่อ Refresh Token หมดอายุหรือใช้ไม่ได้ → Force Logout และ Redirect ไปหน้า Login

### Scenario 2 — Auth State Management

- **AC 2.1:** App state จัดการ Auth status ได้ถูกต้อง (authenticated / unauthenticated)
- **AC 2.2:** Navigation guard ป้องกัน unauthorized access ไปยังหน้าที่ต้อง login

---

## 2. Definition of Done

- [ ] Token storage ปลอดภัย
- [ ] Auto token refresh ทำงานถูกต้อง
- [ ] Force logout เมื่อ refresh token หมดอายุ
- [ ] Auth state navigation guard ทำงานถูกต้อง

---

> Flow diagram → [PP-20.diagram.md](../../test-design/PP-20.diagram.md)
> Test design → [PP-20.design.md](../../test-design/PP-20.design.md)
