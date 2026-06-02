# PP-521 · [MB][End-User] Create Post Media Picker Integrate API

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-521        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want the app to request permissions and fetch my device gallery so that the media picker displays my photos and videos correctly for selection.

---

## 1. Description

Integrates the media picker with device platform APIs. This includes requesting and handling camera and photo library permissions, fetching the device gallery (photos and videos) via a platform plugin, listing albums and folders, validating selected file types and sizes before proceeding, and passing the selected assets to the next step via state management.

---

## 2. Acceptance Criteria

### Scenario 1 — Successful media fetch

- **Given:** The user has granted photo library permission
- **When:** The gallery picker opens
- **Then:** The device gallery is fetched and displayed with correct thumbnails and album listing

### Scenario 2 — File validation

- **Given:** The user selects a file
- **When:** The file type or size exceeds the allowed limits
- **Then:** The file is rejected and an error is shown before proceeding to the next step

### Scenario 3 — Assets passed to next step

- **Given:** The user selects valid media assets
- **When:** They confirm the selection
- **Then:** The selected assets are stored in state management and available on the next screen

---

## 3. Definition of Done

- [ ] Camera and photo library permissions requested and handled correctly
- [ ] Device gallery (photos + videos) fetched via platform plugin
- [ ] Album/folder listing displayed
- [ ] File type and size validation performed before proceeding
- [ ] Selected assets passed to next step via state management
