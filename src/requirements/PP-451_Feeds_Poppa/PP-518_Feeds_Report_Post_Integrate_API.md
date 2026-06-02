# PP-518 · [MB][End-User] Feeds Report Post Integrate API

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-518        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-451](./PP-451_Feeds_Poppa.md) |

---

## User Story

> As an end user, I want the report submission to call the API with my selected reason and sub-reason so that the report is recorded and I see a success confirmation or an error message if something goes wrong.

---

## 1. Description

This sub-task integrates the Report Post UI with the backend API. It covers calling the report API with the payload `{ postId, reason, sub-reason }`, showing the success bottom sheet on a successful response, and handling error states (network error, server error) with appropriate feedback to the user.

---

## 2. Acceptance Criteria

### Scenario 1 — Report is submitted successfully via API

- **Given:** The user has selected a reason and sub-reason in the Report flow and taps "Submit Report"
- **When:** The API call succeeds
- **Then:** The success bottom sheet (Sheet 4) is displayed with a checkmark icon and thank you message

### Scenario 2 — API error is handled gracefully

- **Given:** The user taps "Submit Report"
- **When:** The API returns a network or server error
- **Then:** An error state is shown to the user with an option to retry or dismiss; the success sheet is not displayed

---

## 3. Definition of Done

- [ ] API call to submit post report with payload `{ postId, reason, sub-reason }` is implemented
- [ ] Success response triggers the success bottom sheet (Sheet 4)
- [ ] Network error state is handled and displayed to the user
- [ ] Server error state is handled and displayed to the user
