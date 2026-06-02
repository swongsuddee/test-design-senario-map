# PP-519 · [MB][End-User] Create Post Gallery Picker

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-519        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | Review Code   |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want to open a gallery picker from the feed FAB (+) button so I can select one or multiple photos and videos to include in my post.

---

## 1. Description

Implements the in-app media gallery picker screen accessible via the FAB (+) button on the feed. Supports single-picture mode, multi-picture mode (up to N pictures), and mixed picture + video mode. The UI displays a thumbnail grid with a preview header, selection indicators (number badge / checkmark), a source tab switcher (Recents / Albums), and a permission-denied empty state when gallery access is not granted.

---

## 2. Acceptance Criteria

### Scenario 1 — Single image selection

- **Given:** The user taps the FAB (+) and gallery permission is granted
- **When:** The gallery picker opens in single-picture mode
- **Then:** A thumbnail grid is displayed, the user can select one image, and it is shown in the preview header with a checkmark indicator

### Scenario 2 — Multi-picture selection

- **Given:** The gallery picker is in multi-picture mode
- **When:** The user selects multiple items up to the allowed limit N
- **Then:** Each selected item shows a numbered badge; items beyond the limit cannot be selected

### Scenario 3 — Permission denied state

- **Given:** The user has denied gallery permission
- **When:** The gallery picker is opened
- **Then:** A permission-denied empty state is displayed with a prompt to enable access in settings

---

## 3. Definition of Done

- [ ] Gallery picker accessible from FAB (+) on feed
- [ ] Single-picture mode works and shows preview header
- [ ] Multi-picture mode enforces maximum N selection with numbered badges
- [ ] Mixed picture + video mode supported
- [ ] Source tab switcher (Recents / Albums) functional
- [ ] Permission denied empty state displayed when access is not granted
