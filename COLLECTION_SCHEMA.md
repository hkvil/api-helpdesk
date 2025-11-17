# Payload CMS Collection Schema Documentation

This document describes the structure (schema) of all collections (tables) used in this Payload CMS project. Each collection is equivalent to a database table, with fields as columns and relationships as foreign keys.

---

## 1. Users
- **slug:** `users`
- **auth:** `true` (authentication enabled)
- **Fields:**
  - `name` (text, required)
  - `role` (select: requester, agent, admin; required, default: requester)
  - `division` (relationship to `divisions`, required if role is agent)
    - Validation: If role is 'agent', division must be set.

---

## 2. Tickets
- **slug:** `tickets`
- **timestamps:** `true` (createdAt, updatedAt)
- **Fields:**
  - `title` (text, required)
  - `description` (richText, required)
  - `requester` (relationship to `users`, required, default: current user)
  - `division` (relationship to `divisions`, required)
  - `category` (relationship to `categories`, required, filtered by division)
  - `assignee` (relationship to `users`, filtered: only agents in the same division)
  - `status` (select: open, in_progress, pending, resolved, closed; required, default: open)
  - `priority` (select: low, medium, high, urgent; required, default: medium)
  - `attachments` (relationship to `media`, multiple)

---

## 3. Comments
- **slug:** `comments`
- **timestamps:** `true`
- **Fields:**
  - `ticket` (relationship to `tickets`, required)
  - `author` (relationship to `users`, required, default: current user)
  - `body` (richText, required)
  - `attachments` (relationship to `media`, multiple)

---

## 4. Divisions
- **slug:** `divisions`
- **Fields:**
  - `name` (text, required, unique)
  - `description` (textarea)

---

## 5. Categories
- **slug:** `categories`
- **Fields:**
  - `name` (text, required)
  - `division` (relationship to `divisions`, required)

---

## 6. Media
- **slug:** `media`
- **upload:** `true` (file uploads enabled)
- **Fields:**
  - `alt` (text, required)

---

## Relationships Overview
- **Users** can have a `division` (if agent).
- **Tickets** link to `requester` (user), `division`, `category`, `assignee` (user), and `attachments` (media).
- **Comments** link to `ticket`, `author` (user), and `attachments` (media).
- **Categories** belong to a `division`.
- **Media** can be attached to `tickets` and `comments`.

---

## ERD (Entity Relationship Diagram)

```
[users] <--- requester/assignee --- [tickets] --- division ---> [divisions]
   ^                                 |
   |                                 |
   |                                 v
   |                             [categories]
   |
   +--- author --- [comments] --- ticket ---> [tickets]

[media] <--- attachments --- [tickets]
[media] <--- attachments --- [comments]
```

---

**Notes:**
- All relationships are enforced at the application level by Payload CMS.
- Validation and filtering logic (e.g., only agents as assignees, categories filtered by division) are implemented in the collection configs.
