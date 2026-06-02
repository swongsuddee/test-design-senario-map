# PP-527 · [MB][End-User] Create Post Caption Input

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-527        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want to add a caption to my post so that I can describe or contextualize the media I am sharing.

---

## 1. Description

Implements the caption input screen in the post creation flow. The screen shows a media preview thumbnail alongside a multi-line caption text field with a character counter and placeholder hint text. Keyboard handling and scroll behavior are managed so the text field remains visible. The Post button is disabled until both media and caption are ready. The top bar provides Back / Next or Post action buttons.

---

## 2. Acceptance Criteria

### Scenario 1 — Caption input and character counter

- **Given:** The user is on the caption screen with media already selected
- **When:** The user types a caption
- **Then:** The character counter updates in real time and the text field expands for multi-line input

### Scenario 2 — Post button enabled state

- **Given:** The user has selected media
- **When:** The caption field is empty
- **Then:** The Post button is disabled; when the caption field has content, the Post button becomes enabled

### Scenario 3 — Keyboard handling

- **Given:** The user taps the caption text field
- **When:** The keyboard opens
- **Then:** The caption field scrolls above the keyboard so the user can see what they are typing

---

## 3. Definition of Done

- [ ] Caption screen shows media preview thumbnail
- [ ] Multi-line caption text field with character counter
- [ ] Placeholder hint text displayed when caption is empty
- [ ] Keyboard handling keeps text field visible above keyboard
- [ ] Post button disabled until media and caption are both present
- [ ] Top bar Back / Next or Post action functional
