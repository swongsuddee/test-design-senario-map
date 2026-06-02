# PP-516 · [MB][End-User] Feeds Post Detail Integrate API

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-516        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-451](./PP-451_Feeds_Poppa.md) |

---

## User Story

> As an end user, I want the Post Detail screen to load the post data and comments from the API so that I can like/unlike, follow/unfollow, expand replies, and submit new comments in real time.

---

## 1. Description

This sub-task wires the Post Detail UI to the backend APIs. It covers fetching post detail (image, caption, like count, comment count), like/unlike with optimistic update, follow/unfollow, fetching the comment list with pagination, fetching reply lists for expanded comments, submitting new comments and replies, and handling error states with retry.

---

## 2. Acceptance Criteria

### Scenario 1 — Post detail and comments are loaded from API

- **Given:** The user opens the Post Detail screen
- **When:** The screen mounts
- **Then:** Post data (image, caption, like count, comment count) is fetched from the API; the comment list is loaded with pagination and replies can be expanded by calling the reply list API

### Scenario 2 — Like, Follow, and comment submission work with API

- **Given:** The user is on the Post Detail screen
- **When:** The user taps like, Follow, submits a comment, or submits a reply
- **Then:** The corresponding API call is made; the UI updates optimistically and reverts on error; a success state is shown for comment/reply submission; error states display with a retry option

---

## 3. Definition of Done

- [ ] API call to fetch post detail (image, caption, like count, comment count) is integrated
- [ ] Like / Unlike post with optimistic update is implemented
- [ ] Follow / Unfollow user is integrated
- [ ] API call to fetch comment list with pagination is integrated
- [ ] API call to fetch reply list (expand replies) is integrated
- [ ] Submit new comment API call is implemented
- [ ] Submit reply API call is implemented
- [ ] Error state is shown on API failure with a retry action
