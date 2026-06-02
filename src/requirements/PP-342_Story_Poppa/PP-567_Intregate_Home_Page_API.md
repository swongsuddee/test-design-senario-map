# PP-567 · [MB][End-User] intregate home page api

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-567        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Fight-Sitthipon Sinthuwongpusa |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md) |

---

## User Story

> As an end user, I want the Story home page to fetch categorized events from the API so that the correct story content is displayed when the screen loads.

---

## 1. Description

This sub-task integrates the Story home page with the categorized events API (`GET /api/v1/user/events/categorized`). The implementation connects the home page UI to the backend endpoint to load and display categorized story events on screen load, following the Figma design and the Swagger contract on the staging API gateway.

---

## 2. Acceptance Criteria

### Scenario 1 — Home page loads categorized events from API

- **Given:** The user navigates to the Story home page
- **When:** The screen mounts
- **Then:** A call to `GET /api/v1/user/events/categorized` is made and the returned categorized events are rendered on the home page

### Scenario 2 — Error state is handled when API fails

- **Given:** The user navigates to the Story home page
- **When:** The API call to `/api/v1/user/events/categorized` fails (network or server error)
- **Then:** An error state is displayed and the user can retry loading the content

---

## 3. Definition of Done

- [ ] API call to `GET /api/v1/user/events/categorized` is integrated on the Story home page
- [ ] Returned categorized events data is rendered correctly per the Figma design
- [ ] Error state is shown on API failure with a retry option
