# PP-533 · [MB][End-User] Create Post Resume Draft

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-533        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | Review Code   |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want the app to save my in-progress post as a draft when I close the app so that I can resume it the next time I open Poppa.

---

## 1. Description

Implements draft persistence for the post creation flow. When the app is closed or backgrounded during post creation, the in-progress draft is persisted locally. On the next app launch, the user is prompted to resume the draft with a message like "ปิดแอปแล้วเปิดใหม่ — Resume draft?". The restored draft includes selected media, aspect ratio, caption, and mentions. A discard draft action is also provided.

---

## 2. Acceptance Criteria

### Scenario 1 — Draft saved on app close

- **Given:** The user is in the middle of creating a post
- **When:** The user closes or backgrounds the app
- **Then:** The current draft (selected media, ratio, caption, mentions) is persisted locally

### Scenario 2 — Resume draft on next launch

- **Given:** A draft was saved from a previous session
- **When:** The user opens the app and navigates to create a post
- **Then:** A prompt appears asking if they want to resume the draft: "ปิดแอปแล้วเปิดใหม่ — Resume draft?"

### Scenario 3 — Discard draft

- **Given:** A resume draft prompt is shown
- **When:** The user chooses to discard
- **Then:** The draft is deleted and the user starts a fresh post creation flow

---

## 3. Definition of Done

- [ ] Draft persisted locally when app is closed or backgrounded during post creation
- [ ] Resume draft prompt shown on next launch when a draft exists
- [ ] Draft restores selected media, aspect ratio, caption, and mentions
- [ ] Discard draft action clears the saved draft
