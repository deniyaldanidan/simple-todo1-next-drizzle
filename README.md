# SIMPLE TSKR APP USING Next.js & DRIZZLE

## TODOS:

- [x] Initial Cleanup
- [x] Initial Tailwind theme setup
- [x] Initial Planning

> Initial Commit

- [ ] Essential Packages installations
- [ ] DB setup
- [ ] Header & Fooder Components Initial Dev
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

| Column      |  Type   | Nullable |        Extra |
| :---------- | :-----: | :------: | -----------: |
| id          |   Int   |    No    |  Primary Key |
| Name        | String  |    No    |              |
| Description | String  |   YES    |              |
| Note        |  Text   |   YES    |              |
| ColorCode   | String  |    No    |              |
| Archived    | Boolean |    NO    | Default = NO |
| userId      |   INT   |    NO    |  Foreign Key |

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

- Home / Landing page
- Auth pages (Sign In & Up)
- Protected Pages
  - User info view/update
  - Main Tasks Pages
    - Today
    - Project Pages
    - Archived Projects
