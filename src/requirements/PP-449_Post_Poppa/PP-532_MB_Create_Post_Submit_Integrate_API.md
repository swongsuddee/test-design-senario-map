# PP-532 · [MB][End-User] Create Post Submit Integrate API

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-532        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Tum-Natthapon.C |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As an end-user, I want my selected media and caption to be uploaded and submitted to the server so that my post is created and visible in the feed.

---

## 1. Description

Implements the API integration layer for post submission. Media files (images and videos) are uploaded via multipart upload, with chunked upload support for large videos. Once media URLs are obtained, the final post payload (media URLs, caption, mentions, aspect ratio, and post type) is submitted to the create post endpoint. Upload progress is tracked and emitted to the UI. Network and server errors (4xx/5xx) are handled with retry logic. Optionally, the new post is inserted into the feed cache optimistically.

---

## 2. Acceptance Criteria

### Scenario 1 — Successful media upload and post creation

- **Given:** The user has completed the post creation flow and taps Post
- **When:** The upload process runs
- **Then:** Media files are uploaded via multipart, the final post payload is submitted, and on success the post is created and the UI transitions to the success state

### Scenario 2 — Upload progress emitted to UI

- **Given:** A media upload is in progress
- **When:** The upload advances
- **Then:** The progress percentage is updated in the loading UI in real time

### Scenario 3 — Error handling and retry

- **Given:** The upload fails with a network or server error
- **When:** The error is received
- **Then:** The failure state is shown and the user can retry the upload

---

## 3. Definition of Done

- [ ] Multipart upload of images and videos implemented
- [ ] Chunked upload supported for large videos
- [ ] Final post payload submitted: media URLs, caption, mentions, ratio, type (post/reel)
- [ ] Upload progress tracked and emitted to UI
- [ ] Failure handling for network and 4xx/5xx errors with retry
- [ ] Optimistic feed cache insertion implemented (optional)
