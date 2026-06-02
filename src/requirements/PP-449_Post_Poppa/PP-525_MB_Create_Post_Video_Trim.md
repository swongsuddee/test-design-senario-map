# PP-525 · [MB][End-User] Create Post Video Trim

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-525        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | Review Code   |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want to trim my selected video to choose the exact start and end points so that only the relevant clip is included in my post.

---

## 1. Description

Implements the video trim UI for the post creation flow. The trim editor provides a scrollable timeline strip with an overview track, a time indicator (mm:ss) that updates while the user drags the trim handles, enforcement of the maximum trim duration defined in the spec, and scrub preview playback while dragging the handles.

---

## 2. Acceptance Criteria

### Scenario 1 — Trim video with handles

- **Given:** The user is on the video trim screen with a video selected
- **When:** The user drags the start or end trim handle
- **Then:** The time indicator (mm:ss) updates in real time and the preview scrubs to the corresponding frame

### Scenario 2 — Maximum duration enforced

- **Given:** The video is longer than the maximum allowed trim duration
- **When:** The user attempts to set a clip longer than the limit
- **Then:** The trim handles restrict movement so the selected duration cannot exceed the maximum

---

## 3. Definition of Done

- [ ] Trim UI displayed for video assets
- [ ] Scrollable timeline strip with overview track rendered
- [ ] Time indicator (mm:ss) shown and updated while dragging handles
- [ ] Maximum trim duration per spec enforced
- [ ] Scrub preview plays while dragging trim handles
