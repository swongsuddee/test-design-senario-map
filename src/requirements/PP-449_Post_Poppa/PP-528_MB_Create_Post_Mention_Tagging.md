# PP-528 · [MB][End-User] Create Post Mention Tagging

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-528        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | In Progress   |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want to type @ in the caption to tag other users so that they are notified and linked in my post.

---

## 1. Description

Implements the inline mention tagging UI within the caption text field. Typing @ triggers a mention suggestion list showing avatar, display name, and username for matching users. Selecting a suggestion inserts the mention as a styled token in the caption. Backspace removes the token. An empty or no-result state is shown when no users match the search query.

---

## 2. Acceptance Criteria

### Scenario 1 — Trigger mention suggestion list

- **Given:** The user is typing in the caption text field
- **When:** The user types "@" followed by at least one character
- **Then:** A suggestion list appears showing matching users with avatar, display name, and username

### Scenario 2 — Insert mention token

- **Given:** The mention suggestion list is visible
- **When:** The user taps a suggestion
- **Then:** The suggestion is inserted as a styled mention token in the caption at the cursor position

### Scenario 3 — Remove mention token with backspace

- **Given:** A mention token is present in the caption
- **When:** The user presses backspace while the cursor is immediately after the token
- **Then:** The entire mention token is removed as a single unit

### Scenario 4 — No results state

- **Given:** The user has typed a mention query
- **When:** No users match the search
- **Then:** An empty/no-result state is displayed in the suggestion list

---

## 3. Definition of Done

- [ ] "@" trigger activates inline mention suggestion list
- [ ] Suggestion list shows avatar, display name, and username
- [ ] Selected mention inserted as styled token in caption
- [ ] Backspace removes entire mention token
- [ ] Empty / no-result state displayed when no matches found
