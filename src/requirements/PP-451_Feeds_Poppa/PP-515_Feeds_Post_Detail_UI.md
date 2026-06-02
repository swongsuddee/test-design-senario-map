# PP-515 · [MB][End-User] Feeds Post Detail UI

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-515        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-451](./PP-451_Feeds_Poppa.md) |

---

## User Story

> As an end user, I want to open a Post Detail screen that shows the full post image and caption, like/comment counts, a comment list with replies, and a comment input box so that I can read and participate in post discussions.

---

## 1. Description

This sub-task implements the Post Detail screen UI. It includes a top bar with a back button, poster avatar and name, date, Follow button, and meatball menu; a 1:1 post image with full caption; a like/comment count row; a comment list showing avatar, username, timestamp, content, Reply button, and ellipsis button per comment; a "View N more replies" chevron expand control; a comment input box at the bottom (placeholder "Add a comment"); and loading/empty states for the comment section.

---

## 2. Acceptance Criteria

### Scenario 1 — Post Detail screen renders all post and comment UI elements

- **Given:** The user taps a post card in the feed
- **When:** The Post Detail screen opens
- **Then:** The top bar, 1:1 post image, full caption, like/comment count row, and comment list are all visible; each comment shows avatar, username, timestamp, content, Reply button, and ellipsis button

### Scenario 2 — Comment loading and empty states are handled

- **Given:** The Post Detail screen is loading comments or has no comments
- **When:** The comments section is rendered
- **Then:** A loading state is shown while comments are fetching and an empty state is shown when no comments exist; "View N more replies" is shown for collapsed replies

---

## 3. Definition of Done

- [ ] Top bar with back button, avatar, poster name, date, Follow button, and meatball menu is implemented
- [ ] Post image renders at 1:1 ratio with full caption
- [ ] Like count and comment count row is displayed
- [ ] Comment list shows avatar, username, timestamp, content, Reply button, and ellipsis button
- [ ] "View N more replies" expand control is implemented
- [ ] Comment input box at the bottom with placeholder "Add a comment" is implemented
- [ ] Loading state is shown while comments are fetching
- [ ] Empty state is shown when no comments are available
