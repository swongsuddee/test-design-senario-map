# PP-530 · [MB][End-User] Create Post Submit Loading

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-530        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want to see a loading indicator with upload progress after tapping Post so that I know my post is being uploaded and I cannot accidentally navigate away.

---

## 1. Description

Implements the post submission loading state. After the user taps Post, a spinner with an upload progress indicator (%) is displayed. Navigation back is disabled during the upload. A cancel upload affordance is shown if applicable per the design spec.

---

## 2. Acceptance Criteria

### Scenario 1 — Loading state displayed on submit

- **Given:** The user has completed the post creation flow and taps Post
- **When:** The upload begins
- **Then:** A spinner and upload progress percentage indicator are displayed on screen

### Scenario 2 — Back navigation disabled during upload

- **Given:** The post upload is in progress
- **When:** The user attempts to navigate back
- **Then:** Navigation is blocked and the upload continues uninterrupted

---

## 3. Definition of Done

- [ ] Loading state (spinner) shown after tapping Post
- [ ] Upload progress indicator (%) displayed and updated
- [ ] Back navigation disabled during active upload
- [ ] Cancel upload affordance present if applicable per spec
