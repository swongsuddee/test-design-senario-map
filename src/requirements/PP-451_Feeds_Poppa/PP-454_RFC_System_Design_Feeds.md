# PP-454 · [RFC] System Design — Feeds (Architecture, Flow, Data Schema)

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-454        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | In Progress   |
| **Assignee** | Ohm-Phakorn.s |
| **Parent**   | [PP-451](./PP-451_Feeds_Poppa.md) |

---

## User Story

> As a system architect, I want a complete system design document for the Feeds feature covering architecture, data flow, schema, and caching so that the engineering team can implement a consistent and scalable solution.

---

## 1. Description

This RFC defines the system design for the Feeds feature. It covers architecture overview of the feed aggregation service, chronological feed from followed users (non-algorithmic), data schema and fanout strategy for the feed index, cursor-based pagination API (`GET /v1/feeds`), mixed content types (Posts + Reels), Kafka event flow (`feed.updated` on new post/reel creation), and Redis caching strategy. The expected output is a design doc together with an ER diagram and sequence diagram.

---

## 2. Acceptance Criteria

### Scenario 1 — Design doc covers all required components

- **Given:** The RFC document is reviewed by the team
- **When:** Each scope item is checked (architecture, schema, API flow, Kafka events, caching)
- **Then:** Every item in the scope is addressed with sufficient detail, an ER diagram, and a sequence diagram

### Scenario 2 — Chronological feed strategy is documented

- **Given:** The feed aggregation service is described
- **When:** The fanout / feed-index strategy is reviewed
- **Then:** The document clearly explains how following-based chronological feeds are built and stored, including cursor-based pagination for `GET /v1/feeds`

---

## 3. Definition of Done

- [ ] Architecture overview of feed aggregation service is documented
- [ ] Chronological feed from following users (non-algorithmic) is described
- [ ] Data schema and fanout strategy for the feed index is specified
- [ ] `GET /v1/feeds` API flow with cursor-based pagination is documented
- [ ] Mixed content types (Post + Reels) handling is covered
- [ ] Kafka event `feed.updated` flow is documented
- [ ] Redis caching strategy is defined
- [ ] ER diagram is included
- [ ] Sequence diagram is included
