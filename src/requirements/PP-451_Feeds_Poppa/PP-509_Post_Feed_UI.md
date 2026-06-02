# PP-509 · [MB][End-User] Post Feed UI

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-509        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | Review Code   |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-451](./PP-451_Feeds_Poppa.md) |

---

## User Story

> As an end user, I want to see a Discover Feed screen with Post cards that include avatar, image, caption, like/comment counts, a Follow button, and a meatball menu so that I can browse and interact with content from people I follow.

---

## 1. Description

This sub-task implements the Post Feed UI for the Discover Feed screen. It includes a TabBar (Posts / Community), Post Card components (avatar, username, date, Follow button, meatball menu), post image at 1:1 ratio with truncated caption, like and comment counts, like toggle state (default / liked), a meatball menu popup with a red "Report" option, a FAB "+" button (orange) at bottom right, a loading skeleton state, an empty state when no posts are available, and a pagination loading indicator for infinite scroll.

---

## 2. Acceptance Criteria

### Scenario 1 — Post Feed screen renders Post cards correctly

- **Given:** The user opens the Discover Feed screen on the Posts tab
- **When:** Posts are available in the feed
- **Then:** Each Post Card shows avatar, username, date, Follow button, post image (1:1), truncated caption, like count, comment count, and a meatball menu (···)

### Scenario 2 — Empty and loading states are displayed

- **Given:** The user opens the Discover Feed screen
- **When:** Posts are loading or no posts are available
- **Then:** A skeleton loading state is shown while fetching, and an empty state is shown when there are no posts; a pagination loading indicator appears at the bottom during infinite scroll

---

## 3. Definition of Done

- [ ] Discover Feed screen with TabBar (Posts / Community) is implemented
- [ ] Post Card displays avatar, username, date, Follow button, and meatball menu
- [ ] Post image renders at 1:1 ratio with truncated caption
- [ ] Like count and comment count are displayed on each card
- [ ] Like state toggles between default and liked (heart filled)
- [ ] Meatball menu popup shows "Report" option in red
- [ ] FAB "+" button (orange) is visible at bottom right
- [ ] Loading skeleton state is shown while fetching
- [ ] Empty state is shown when no posts are available
- [ ] Pagination loading indicator appears during infinite scroll
