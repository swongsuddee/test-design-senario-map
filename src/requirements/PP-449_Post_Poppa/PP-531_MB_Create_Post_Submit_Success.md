# PP-531 · [MB][End-User] Create Post Submit Success

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-531        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want to see a success confirmation after my post is uploaded and be taken back to the feed so that I know my post was published successfully.

---

## 1. Description

Implements the post submission success and failure states. On successful upload, a success toast or banner is displayed and the user is navigated back to the feed, optionally scrolling to the newly created post. If the upload fails, a failure state with a retry option is shown.

---

## 2. Acceptance Criteria

### Scenario 1 — Success state after upload

- **Given:** The post upload completes successfully
- **When:** The API returns a success response
- **Then:** A success toast or banner is shown and the app navigates to the feed

### Scenario 2 — Failure state with retry

- **Given:** The post upload fails due to a network or server error
- **When:** The error is received
- **Then:** A failure state is displayed with a retry action that allows the user to attempt the upload again

---

## 3. Definition of Done

- [ ] Success toast or banner displayed after upload completes
- [ ] App navigates to feed after successful post
- [ ] Optionally scrolls to new post in feed
- [ ] Failure / retry state shown on upload error
