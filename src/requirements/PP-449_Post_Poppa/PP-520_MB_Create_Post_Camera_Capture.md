# PP-520 · [MB][End-User] Create Post Camera Capture

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-520        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | Review Code   |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want to capture a photo or video from within the app so I can use it directly in my post without leaving Poppa.

---

## 1. Description

Implements the in-app camera capture screen for creating posts. The screen supports both photo and video capture modes, with controls for the capture button, flash toggle, and front/back camera switching. It handles camera permission request and the denied state, allows switching between Photo and Video mode, shows a captured preview confirmation screen, and provides Cancel and Retake actions.

---

## 2. Acceptance Criteria

### Scenario 1 — Capture a photo

- **Given:** The user opens the camera capture screen and camera permission is granted
- **When:** The user taps the capture button in Photo mode
- **Then:** A preview confirmation screen is shown with the captured photo and options to Confirm or Retake

### Scenario 2 — Camera permission denied

- **Given:** The user has denied camera permission
- **When:** The camera capture screen is opened
- **Then:** A permission-denied state is shown with guidance to enable camera access in settings

### Scenario 3 — Switch between Photo and Video mode

- **Given:** The camera capture screen is open
- **When:** The user switches from Photo mode to Video mode
- **Then:** The UI updates to Video mode controls and the capture button changes to a record button

---

## 3. Definition of Done

- [ ] In-app camera screen supports photo and video capture
- [ ] Capture button, flash toggle, and front/back switch are functional
- [ ] Camera permission request shown; denied state handled
- [ ] Photo / Video mode toggle works correctly
- [ ] Captured preview confirmation screen displayed after capture
- [ ] Cancel and Retake actions functional
