# PP-529 · [MB][End-User] Create Post Caption Mention Integrate API

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-529        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want the mention suggestion list to be powered by a real-time user search API so that I can find and tag any user in the app.

---

## 1. Description

Integrates the mention tagging UI with the user search API. The mention suggestion search is debounced to avoid excessive API calls. API responses are mapped to the suggestion list model. Mention tokens persist with the user's `userId` in the caption payload for submission. Error, loading, and empty states are handled for the suggestion search.

---

## 2. Acceptance Criteria

### Scenario 1 — Debounced API search

- **Given:** The user is typing a mention query after "@"
- **When:** The user pauses typing briefly
- **Then:** A single debounced API call is made and results are populated in the suggestion list

### Scenario 2 — Mention token includes userId

- **Given:** The user selects a mention from the suggestion list
- **When:** The caption is submitted with the post
- **Then:** The caption payload contains the mention token with the correct `userId`

### Scenario 3 — Error and loading states

- **Given:** The user triggers a mention search
- **When:** The API call is in flight
- **Then:** A loading state is shown; if the API fails, an error state is shown in the suggestion list

---

## 3. Definition of Done

- [ ] Search users API called with debounce on mention query
- [ ] API response mapped to suggestion list model (avatar, displayName, username)
- [ ] Mention tokens persist `userId` in the caption payload
- [ ] Loading state shown while suggestion search is in flight
- [ ] Error and empty states handled for suggestion search
