# PP-517 · [MB][End-User] Feeds Report Post UI

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-517        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-451](./PP-451_Feeds_Poppa.md) |

---

## User Story

> As an end user, I want to report a post by tapping the meatball menu and following a multi-step bottom sheet flow (reason → sub-category → confirm → success) so that I can flag inappropriate content easily.

---

## 1. Description

This sub-task implements the Report Post UI flow. It starts with a meatball menu popup on a Post Card containing a red "Report" option. Tapping Report opens a sequence of bottom sheets: Sheet 1 shows the report reason list (title, description, 9 main categories with chevron-right); Sheet 2 shows sub-category options with a back button and sub-title; Sheet 3 shows a confirmation summary with an orange "Submit Report" button; Sheet 4 shows a success state with a checkmark icon, thank you message, and "Done" button. All sheets include an overlay backdrop and a grabber handle.

---

## 2. Acceptance Criteria

### Scenario 1 — User opens the report flow from the meatball menu

- **Given:** The user is viewing a Post Card in the feed
- **When:** The user taps the meatball menu (···) and selects "Report" (red)
- **Then:** Bottom Sheet 1 opens showing the title, description, and 9 main report reason categories each with a chevron-right icon; the sheet has an overlay backdrop and grabber handle

### Scenario 2 — User completes the full report flow to the success state

- **Given:** The user has selected a main category in Sheet 1
- **When:** The user selects a sub-category in Sheet 2, reviews the summary in Sheet 3, and taps "Submit Report"
- **Then:** Sheet 4 appears with a checkmark icon, a thank you message, and a "Done" button that closes the flow

---

## 3. Definition of Done

- [ ] Meatball menu popup on Post Card shows "Report" option in red text
- [ ] Bottom Sheet 1 shows title, description, and 9 main categories with chevron-right
- [ ] Bottom Sheet 2 shows back button, sub-title, and sub-category options
- [ ] Bottom Sheet 3 shows report detail summary and an orange "Submit Report" button
- [ ] Bottom Sheet 4 shows checkmark icon, thank you message, and "Done" button
- [ ] Overlay backdrop and grabber handle are present on every bottom sheet
