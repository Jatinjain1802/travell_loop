# Traveloop Backend

Production-style backend foundation for Traveloop using Express + Sequelize with MySQL/PostgreSQL support.

## Features
- JWT authentication (access + refresh)
- httpOnly cookie support for auth
- Role-ready user model (`user`, `admin`)
- Protected trip CRUD with ownership checks
- DB dialect switch: MySQL or PostgreSQL
- Security middleware: Helmet, CORS, rate limit

## Setup
1. Copy `.env.example` to `.env`
2. Update DB and JWT values
3. Install deps:
   `npm install`
4. Run dev server:
   `npm run dev`

## Environment
- `DB_DIALECT`: `mysql` or `postgres`
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`

## API
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/trips`
- `POST /api/trips`
- `GET /api/trips/:id`
- `PUT /api/trips/:id`
- `DELETE /api/trips/:id`
