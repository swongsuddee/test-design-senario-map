# PP-473 · [BE] เพิ่ม REST endpoints บน gateway (POST/GET/PUT/DELETE)

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-473                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> Backend มี REST Endpoints บน API Gateway ครบสำหรับ Comment Operations (POST/GET/PUT/DELETE)

---

## 1. Description

เพิ่ม REST Endpoints บน API Gateway สำหรับ Comment บน Event ทำหน้าที่ Proxy ไปยัง Comment gRPC Service รองรับ Authentication และ Route ที่ถูกต้อง

---

## 2. Acceptance Criteria

### Scenario 1 — POST Comment Endpoint

- **Given:** Client ส่ง POST /events/:eventId/comments
- **When:** Gateway รับ Request
- **Then:** Proxy ไปยัง CreateComment gRPC และ Return Response

### Scenario 2 — GET Comments Endpoint

- **Given:** Client ส่ง GET /events/:eventId/comments
- **When:** Gateway รับ Request
- **Then:** Proxy ไปยัง ListComments gRPC และ Return รายการ Comment

### Scenario 3 — PUT/DELETE Comment Endpoints

- **Given:** Client ส่ง PUT หรือ DELETE /events/:eventId/comments/:commentId
- **When:** Gateway รับ Request
- **Then:** Proxy ไปยัง UpdateComment หรือ DeleteComment gRPC ตามลำดับ

### Scenario 4 — Authentication Guard

- **Given:** Client ส่ง Request โดยไม่มี Auth Token
- **When:** Gateway รับ Request
- **Then:** Return HTTP 401 Unauthorized

---

## 3. Definition of Done

- [ ] POST /events/:eventId/comments ทำงานได้
- [ ] GET /events/:eventId/comments ทำงานได้
- [ ] PUT/DELETE /events/:eventId/comments/:commentId ทำงานได้
- [ ] Authentication Guard คืน HTTP 401 เมื่อไม่มี Token
