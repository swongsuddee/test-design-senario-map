# PP-452 · [RFC] System Design — Post (Architecture, Flow, Data Schema)

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-452        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | Review Code   |
| **Assignee** | Pond-Siritep Tongdoung |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> Design and document the full system architecture, data schema, API flows, and event contracts for the Post feature before implementation begins.

---

## 1. Description

This RFC covers the end-to-end system design for the Post feature, including service architecture and storage (MongoDB + GCS + CDN), data schema for the `posts` collection, API flows for creating posts, fetching feeds, and like/comment interactions, the media upload flow (image/video → GCS), Kafka event contracts (`post.created`, `post.liked`, `post.commented`), and a moderation hook. Output deliverables are a design document, ER diagram, and sequence diagrams.

---

## 2. Acceptance Criteria

### Scenario 1 — Design document completeness

- **Given:** The RFC sub-task is under review
- **When:** Reviewers open the design document
- **Then:** It covers all six scope areas: architecture, data schema, API flow, media upload flow, Kafka events, and moderation hook; and includes an ER diagram and at least one sequence diagram

### Scenario 2 — Schema covers required entities

- **Given:** The data schema section is reviewed
- **When:** The `posts` collection definition is inspected
- **Then:** All required fields are present and the schema matches the agreed API contract

---

## 3. Definition of Done

- [ ] Architecture overview (service, storage, CDN) documented
- [ ] `posts` MongoDB collection schema defined
- [ ] API flows for create post, get feed, like/comment described with sequence diagrams
- [ ] Media upload flow (image/video → GCS) documented
- [ ] Kafka event payloads defined: `post.created`, `post.liked`, `post.commented`
- [ ] Moderation hook design included
- [ ] ER diagram produced
- [ ] Design doc reviewed and approved by team
