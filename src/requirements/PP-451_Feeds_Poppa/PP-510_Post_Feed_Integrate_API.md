# PP-510 · [MB][End-User] Post Feed Integrate API

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-510        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-451](./PP-451_Feeds_Poppa.md) |

---

## User Story

> As an end user, I want the Discover Feed to load real posts from the API with infinite scroll, and to be able to like/unlike posts and follow/unfollow users directly from the feed so that my interactions are reflected in real time.

---

## 1. Description

This sub-task wires the Post Feed UI to the backend APIs. It covers calling the API to fetch the post list in the Discover Feed (Posts tab), implementing infinite scroll with cursor-based or offset pagination, handling like/unlike with optimistic updates, follow/unfollow from the Post Card, pull-to-refresh, and showing an error state with a retry option on failure.

---

## 2. Acceptance Criteria

### Scenario 1 — Feed loads posts via API with infinite scroll

- **Given:** The user opens the Discover Feed Posts tab
- **When:** The screen mounts and the user scrolls to the bottom
- **Then:** Posts are fetched from the API and additional posts load automatically via pagination; pull-to-refresh reloads the list from the top

### Scenario 2 — Like and Follow actions update state immediately

- **Given:** The user views a Post Card in the feed
- **When:** The user taps the like button or the Follow button
- **Then:** The UI updates optimistically (like count increments/decrements, button state changes) and the corresponding API call is made in the background; on error the UI reverts

---

## 3. Definition of Done

- [ ] API call to fetch post list in Discover Feed (Posts tab) is integrated
- [ ] Infinite scroll / pagination (cursor-based or offset) is implemented
- [ ] Like / Unlike post with optimistic update is implemented
- [ ] Follow / Unfollow user from Post Card is implemented
- [ ] Pull to refresh reloads the feed from the top
- [ ] Error state is shown on API failure with a retry action
