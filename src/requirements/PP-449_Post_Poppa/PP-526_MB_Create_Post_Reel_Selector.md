# PP-526 · [MB][End-User] Create Post Reel Selector

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-526        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want to toggle between Post mode and Reel mode when uploading a single video so that I can choose the correct format and aspect ratio for my content.

---

## 1. Description

Implements the Reel mode selector toggle in the post creation flow. When Reel mode is selected, the aspect ratio is locked to 9:16 vertical. A "ขนาดอื่น ๆ" (other sizes) option is available for non-Reel video. The app also auto-detects when a single video is selected and suggests switching to Reel mode.

---

## 2. Acceptance Criteria

### Scenario 1 — Toggle to Reel mode

- **Given:** The user has selected a single video and is on the media editor screen
- **When:** The user toggles to Reel mode
- **Then:** The aspect ratio is locked to 9:16 vertical and the crop frame updates accordingly

### Scenario 2 — Auto-suggest Reel mode

- **Given:** The user selects a single video from the gallery
- **When:** The post creation flow detects a single video asset
- **Then:** A suggestion to switch to Reel mode is displayed

### Scenario 3 — Other sizes for non-Reel video

- **Given:** The user is in Post mode (not Reel)
- **When:** They view the aspect ratio options for a video
- **Then:** The "ขนาดอื่น ๆ" option is available alongside standard ratios

---

## 3. Definition of Done

- [ ] Toggle between Post mode and Reel mode implemented
- [ ] Reel mode locks aspect ratio to 9:16 vertical
- [ ] "ขนาดอื่น ๆ" option shown for non-Reel video
- [ ] Auto-detect single video and suggest Reel mode
