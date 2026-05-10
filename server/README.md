# Traveloop Backend

Production-ready backend foundation for Traveloop using Express + Sequelize with MySQL/PostgreSQL support.

## Completed
- JWT authentication (access + refresh)
- Persistent refresh sessions (`refresh_tokens`) with rotation + revocation
- Logout current session + logout all devices
- Role-ready users (`user`, `admin`)
- Protected APIs with ownership checks
- Trips, sections, activities, notes, checklist, invoices, community, search, admin
- Upload APIs (profile photo, note attachment) with local file storage
- Invoice PDF generation + optional invoice email via SMTP
- Security middleware: Helmet, CORS, cookie parser, rate limit, centralized error handling
- Migration + seeding scripts via Umzug
- Jest + Supertest test scaffolding

## Setup
1. Copy `.env.example` to `.env`
2. Set DB/JWT/SMTP values
3. Install deps: `npm install`
4. Run migrations: `npm run migrate`
5. Run seed data: `npm run seed`
6. Start API: `npm run dev`

## Important Env Flags
- `DB_DIALECT=mysql|postgres`
- `AUTO_SYNC=false` (keep false for production)
- `SMTP_*` values to enable email sending

## Key APIs
- Auth: `/api/auth/*`
- Users: `/api/users/*`
- Trips: `/api/trips/*`
- Sections: `/api/trips/:id/sections/*`
- Activities: `/api/trips/:id/sections/:sectionId/activities/*`
- Notes: `/api/trips/:id/notes/*`
- Checklist: `/api/trips/:id/checklist/*`
- Invoices: `/api/trips/:id/invoice`, `/api/invoices/*`
- Community: `/api/community/posts`
- Search: `/api/search`, `/api/search/destinations`
- Admin: `/api/admin/*`

## Upload Endpoints
- `POST /api/users/:id/profile-photo` with form-data key `profilePhoto`
- `POST /api/trips/:id/notes/:noteId/attachment` with form-data key `attachment`

## Tests
- Run: `npm test`
- Current test: health route smoke test
