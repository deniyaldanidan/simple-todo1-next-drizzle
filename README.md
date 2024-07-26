# SIMPLE TSKR APP USING Next.js & DRIZZLE

## MYTODOS:

- [x] Initial Cleanup
- [x] Initial Tailwind theme setup
- [x] Initial Planning

> Initial Commit

- [x] Essential Packages installations
- [x] Drizzle / DB setup
  - [x] Schema
  - [x] Migration Setup
  - [x] Initial Migration
  - [x] Run First Insert Query
  - [x] Run First Select Query

> Chore db schema setup and connection testing

> Docs docs update Fix removed unwanted apis

- [x] Initial UnAuth Layout development
- [x] Initial HomePage page development
- [x] `/api/auth/sign-up` api development
- [x] Initial Sign Up page development
- [x] `/api/auth/sign-in` api development
- [x] Initial Sign In page development
- [x] AuthContext development
- [x] `access-token` refresh on reload/load of the web-app
- [x] Working sign Out BTN
- [x] Create an Protected page

> Add added authentication

- [ ] ...
- [ ] ...
- [ ] ...

## Notes:

### Schema:

#### Users

| Column       |  Type  | Nullable |       Extra |
| :----------- | :----: | :------: | ----------: |
| id           |  Int   |    NO    | Primary Key |
| FirstName    | String |    No    |             |
| LastName     | String |    No    |             |
| Username     | String |    NO    |      Unique |
| Email        | String |    No    |      Unique |
| Password     | String |    No    |             |
| refreshToken | String |   Yes    |          No |

#### Projects

| Column      |   Type   | Nullable |         Extra |
| :---------- | :------: | :------: | ------------: |
| id          |   Int    |    No    |   Primary Key |
| Name        |  String  |    No    |               |
| Description |  String  |   YES    |               |
| Note        |   Text   |   YES    |               |
| ColorCode   |  String  |    No    |               |
| Archived    | Boolean  |    NO    |  Default = NO |
| createdAt   | Datetime |    No    | Default=Now() |
| archivedAt  | Datetime |   Yes    |               |
| userId      |   INT    |    NO    |   Foreign Key |

#### Tasks

| Column    |   Type   | Nullable |           Extra |
| :-------- | :------: | :------: | --------------: |
| id        |   Int    |    No    |     Primary Key |
| Name      |  String  |    No    |                 |
| Note      |   Text   |   Yes    |                 |
| Done      | Boolean  |    NO    | Default = False |
| createdAt | Datetime |    No    |   Default=Now() |
| Due       | Datetime |   YES    |                 |
| projectId |   int    |    No    |     Foreign Key |

### Pages

- Home - A simple landing page with only a hero section
- Auth pages (Sign In & Up)
- Protected Pages
  - Main Tasks Pages
    - Today
    - Project Pages
    - Archived Projects
  - User info view/update
