# PP-523 · [MB][End-User] Create Post Zoom & Resize

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-523        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | Review Code   |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want to pinch-to-zoom and pan my image within the crop frame so I can precisely control which part of the image is included in my post.

---

## 1. Description

Implements gesture-based zoom and pan controls within the crop editor. Users can pinch to zoom and pan the image inside the crop frame. Minimum and maximum zoom bounds are enforced. When the aspect ratio changes, the image resets to fit the new frame. Snap-to-edge behavior ensures the image cannot be dragged outside the crop boundary.

---

## 2. Acceptance Criteria

### Scenario 1 — Pinch-to-zoom within bounds

- **Given:** The user is on the crop editor screen
- **When:** The user pinches to zoom beyond the maximum or below the minimum bound
- **Then:** The zoom stops at the boundary and does not exceed the defined limits

### Scenario 2 — Pan within crop frame

- **Given:** The user has zoomed in on an image
- **When:** The user drags the image
- **Then:** The image pans and snaps to the edge of the crop frame when the boundary is reached

### Scenario 3 — Reset to fit on ratio change

- **Given:** The user has zoomed and panned an image
- **When:** The aspect ratio is changed
- **Then:** The image resets to fit the new crop frame dimensions

---

## 3. Definition of Done

- [ ] Pinch-to-zoom gesture supported on the cropped image
- [ ] Pan gesture works within the crop frame
- [ ] Minimum and maximum zoom bounds enforced
- [ ] Image resets to fit when aspect ratio changes
- [ ] Snap-to-edge behavior prevents image from leaving the crop boundary
