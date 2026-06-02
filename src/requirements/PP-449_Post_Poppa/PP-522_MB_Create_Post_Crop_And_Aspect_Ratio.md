# PP-522 · [MB][End-User] Create Post Crop & Aspect Ratio

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-522        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | Review Code   |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want to crop my selected image and choose an aspect ratio so that my post looks exactly how I intend it to appear in the feed.

---

## 1. Description

Implements the crop and aspect ratio selection UI for post media. Users can choose from Original, 1:1, 4:5, and 5:4 aspect ratios. Auto-fit logic handles portrait and landscape orientations for the Original option. A crop frame overlay with drag handles is provided. Switching between ratios preserves the user's pan/zoom state. Per-image ratio application is supported in multi-picture mode, with specific handling for vertical-only (any portrait image) and horizontal-only (all landscape images) cases.

---

## 2. Acceptance Criteria

### Scenario 1 — Aspect ratio selection

- **Given:** The user is on the crop screen with an image selected
- **When:** They tap the 1:1 aspect ratio button
- **Then:** The crop frame updates to a square and the image is repositioned accordingly

### Scenario 2 — Preserve pan/zoom state on ratio change

- **Given:** The user has panned and zoomed an image within the crop frame
- **When:** They switch to a different aspect ratio
- **Then:** The pan/zoom state is preserved within the bounds of the new crop frame

### Scenario 3 — Per-image ratio in multi-picture mode

- **Given:** The user is in multi-picture mode
- **When:** They apply a ratio to one image
- **Then:** Only that image's ratio is changed; other images retain their own ratio settings

---

## 3. Definition of Done

- [ ] Aspect ratio selector shows: Original, 1:1, 4:5, 5:4
- [ ] Auto-fit logic for Original handles portrait and landscape correctly
- [ ] Crop frame overlay with drag handles displayed
- [ ] Switching ratios preserves user pan/zoom state
- [ ] Per-image ratio applied correctly in multi-picture mode
- [ ] Vertical-only and horizontal-only aspect cases handled
