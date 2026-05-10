# 🌍 Traveloop — Full Project Workpath & Tech Stack

> A comprehensive travel planning platform that lets users discover destinations, build itineraries, track expenses, manage packing lists, and connect with a travel community.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Screen-by-Screen Breakdown](#screen-by-screen-breakdown)
3. [Tech Stack](#tech-stack)
4. [Database Schema (High-Level)](#database-schema)
5. [API Structure](#api-structure)
6. [Folder Structure](#folder-structure)
7. [Feature Workpath / Dev Roadmap](#feature-workpath--dev-roadmap)
8. [Third-Party Integrations](#third-party-integrations)

---

## 🗺️ Project Overview

**Traveloop** is a full-stack travel SaaS application that enables users to:

- Register and manage profiles
- Browse and search destinations / activities
- Plan and build multi-section itineraries
- Track budgets and expenses with invoice generation
- Maintain a packing checklist
- Keep trip notes/journals
- View completed, ongoing, and upcoming trips
- Engage with a travel community

---

## 📱 Screen-by-Screen Breakdown

### Screen 1 — Login Screen
- **Fields:** Username, Password
- **Components:** Logo/Photo, Login Button
- **Actions:** Authenticate user, redirect to Landing Page (Screen 3)

---

### Screen 2 — Registration Screen
- **Fields:**
  - Profile Photo (upload)
  - First Name, Last Name
  - Email Address, Phone Number
  - City, Country
  - Additional Information (bio/notes)
- **Actions:** Register user → redirect to Login (Screen 1)
- **Backend:** `POST /api/auth/register` — saves user to DB, hashes password with bcrypt

---

### Screen 3 — Main Landing Page
- **Components:**
  - Traveloop Logo + Nav
  - Banner Image (hero section)
  - Search Bar (search destinations/activities)
  - Group By / Filter / Sort By controls
  - **Top Regional Selections** — 5 card grid of destinations
  - **Previous Trips** — 3 card grid (card-based history)
  - **Plan a Trip** button (→ Screen 4)

---

### Screen 4 — Create a New Trip
- **Fields:**
  - Select a Place (dropdown/search)
  - Start Date (date picker)
  - End Date (date picker)
  - Suggestion for Places to Visit / Activities to Perform
- **Sections:** Multiple sections (Section 1, 2, 3...) each with its own date range and budget
- **Add another Section** button (dynamic form expansion)
- **Backend:** `POST /api/trips` — creates trip with sections array

---

### Screen 5 — Build Itinerary Screen
- **Structure:**
  - Section 1, 2, 3... (each containing):
    - Description / info about that section
    - Date Range (e.g., "xxx to yyy")
    - Budget for that section
- **Actions:**
  - Add another Section
  - Save itinerary
- **Backend:** `PUT /api/trips/:id/itinerary`

---

### Screen 6 — User Trip Listing
- **Tabs / Groups:**
  - **Ongoing** — short overview card(s)
  - **Up-coming** — short overview card(s)
  - **Completed** — short overview card(s)
  - A fourth group (unlabeled, extra trips)
- **Controls:** Search bar, Group By, Filter, Sort By
- **Backend:** `GET /api/trips?status=ongoing|upcoming|completed`

---

### Screen 7 — User Profile Page
- **Components:**
  - Profile photo (circular)
  - User details with edit options
  - **Preplanned Trips** section — 3-column card grid
  - **Previous Trips** section — 3-column card grid
  - Each card has a "View" button
- **Backend:** `GET /api/users/:id/profile`, `PUT /api/users/:id`

---

### Screen 8 — Activity Search / City Search Page
- **Controls:** Search Bar (e.g., "Paragliding"), Group By, Filter, Sort By
- **Results:** List of result cards (option + details)
- 5+ result rows, each showing:
  - Activity Name
  - Details about the option
- **Backend:** `GET /api/search?q=paragliding&city=xxx`

---

### Screen 9 — Itinerary View Screen with Budget Section
- **Structure:**
  - Days broken into Day 1, Day 2, Day 3...
  - Each day contains multiple activity rows:
    - Physical Activity name
    - Expense amount
  - Arrows between days (navigation)
  - Budget summary per section
- **Backend:** `GET /api/trips/:id/itinerary`

---

### Screen 10 — Community Tab Screen
- **Components:**
  - Traveloop Nav
  - Community tab section
  - User avatar (circle) + post content
  - Multiple community posts (3+ visible)
  - Each post: user photo + description box
  - Right panel: description of community section (share experiences)
- **Controls:** Search bar, Group By, Filter, Sort By
- **Backend:** `GET /api/community/posts`, `POST /api/community/posts`

---

### Screen 11 — Packing Checklist Screen
- **Trip:** Shows selected trip name (e.g., "Paris & Rome Adventure")
- **Progress bar:** e.g., "5/12 items packed"
- **Categories:**
  - **Documents** (3/4): Passport ✓, Flight Tickets ✓, Travel Insurance ✓, Hotel Booking
  - **Clothing** (1/4): Casual Shirts ✓, Trousers/Jeans, Walking Shoes, Light Jacket
  - **Electronics** (1/3): Phone Charger ✓, Universal Power Adapter, Earphones
- **Actions:**
  - `+ Add item to checklist`
  - `Reset all`
  - `Share Checklist`
- **Backend:** `GET/POST/PUT /api/trips/:id/checklist`

---

### Screen 12 — Admin Panel
- **Admin Tabs:**
  - **Manage Users** — view/edit/ban users, view all their trips
  - **Popular Cities** — list cities trending by user visits
  - **Popular Activities** — list trending activities by user data
  - **User Trends & Analytics** — charts and insights
- **Side Panel Description:**
  - Manage Users: view all trips, manage permissions
  - Popular Cities: based on current user trend data
  - Popular Activities: based on current user trend data
  - User Trends & Analytics: detailed dashboards
- **Backend:** `GET /api/admin/users`, `GET /api/admin/analytics`
- **Access:** Admin-role JWT only

---

### Screen 13 — Trip Notes / Journal Screen
- **Trip selector**
- **Filter tabs:** All | by Day | by Stop
- **Note Cards:** Each note card shows:
  - Title (e.g., "Hotel check-in details - Rome stop")
  - Note body text
  - Date (e.g., "Day 3: June 14 2025")
  - Attachment/image icon
- **`+ Add Note`** button
- **Backend:** `GET/POST/PUT/DELETE /api/trips/:id/notes`

---

### Screen 14 — Expense Invoice / Billing Screen
- **Components:**
  - Search bar for invoices
  - Filter + Sort controls
  - **Invoice card** with:
    - Trip name, date range, cities
    - Invoice ID (e.g., INV-xyz-30290)
    - Generated date
    - Traveler details (list of names)
    - Payment status (pending/paid)
  - **Line-item table:**
    - `#` | Category | Description | Qty/Details | Unit Cost | Amount
    - e.g., Hotel, Travel (flights), etc.
  - **Totals:** Subtotal, Tax (5%), Discount, Grand Total
  - **Action Buttons:**
    - Download Invoice
    - Export as PDF
    - Mark as Paid
- **Budget Insights panel:** Pie/donut chart showing:
  - Total Budget vs Total Spent vs Remaining
- **Backend:** `GET /api/trips/:id/invoice`, `POST /api/invoices/generate`

---

## 🛠️ Tech Stack

### Frontend

| Layer | Technology |
|---|---|
| Framework | **React.js** (Vite or CRA) |
| Routing | React Router DOM v6 |
| State Management | Redux Toolkit / Zustand |
| UI Components | Tailwind CSS + shadcn/ui |
| Forms | React Hook Form + Zod |
| Charts | Recharts (budget insights, analytics) |
| Date Pickers | react-datepicker |
| HTTP Client | Axios |
| Auth | JWT stored in httpOnly cookies |
| File Upload | react-dropzone (profile photo) |
| PDF Export | jsPDF + html2canvas |
| Icons | Lucide React |

---

### Backend

| Layer | Technology |
|---|---|
| Runtime | **Node.js** (v20+) |
| Framework | **Express.js** |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Validation | Joi / Zod |
| File Uploads | Multer + Cloudinary |
| Emailing | Nodemailer (invoice emails) |
| PDF Generation | pdfkit or puppeteer |
| Rate Limiting | express-rate-limit |
| Logging | Morgan + Winston |
| Env Management | dotenv |

---

### Database

| Layer | Technology |
|---|---|
| Primary DB | **MySQL** or **PostgreSQL** |
| ORM | **Sequelize** (MySQL) or **Prisma** (PostgreSQL) |
| Migrations | Sequelize CLI / Prisma Migrate |
| Caching | Redis (optional — for session/search caching) |

---

### DevOps / Infra

| Layer | Technology |
|---|---|
| Version Control | Git + GitHub |
| Deployment (Frontend) | Vercel / Netlify |
| Deployment (Backend) | Railway / Render / AWS EC2 |
| Database Hosting | PlanetScale (MySQL) / Supabase (PostgreSQL) |
| Storage | Cloudinary (images) |
| CI/CD | GitHub Actions |

---

## 🗃️ Database Schema

### `users`
```sql
id           INT PRIMARY KEY AUTO_INCREMENT
name         VARCHAR(255)
email        VARCHAR(255) UNIQUE
password     VARCHAR(255)  -- bcrypt hashed
phone        VARCHAR(20)
city         VARCHAR(100)
country      VARCHAR(100)
profile_pic  VARCHAR(500)  -- cloudinary URL
bio          TEXT
role         ENUM('user', 'admin') DEFAULT 'user'
created_at   TIMESTAMP
updated_at   TIMESTAMP
```

### `trips`
```sql
id           INT PRIMARY KEY AUTO_INCREMENT
user_id      INT REFERENCES users(id)
title        VARCHAR(255)
place        VARCHAR(255)
start_date   DATE
end_date     DATE
status       ENUM('upcoming', 'ongoing', 'completed')
total_budget DECIMAL(12,2)
created_at   TIMESTAMP
updated_at   TIMESTAMP
```

### `trip_sections`
```sql
id           INT PRIMARY KEY AUTO_INCREMENT
trip_id      INT REFERENCES trips(id)
title        VARCHAR(255)
description  TEXT
section_order INT
start_date   DATE
end_date     DATE
budget       DECIMAL(12,2)
created_at   TIMESTAMP
```

### `activities`
```sql
id           INT PRIMARY KEY AUTO_INCREMENT
section_id   INT REFERENCES trip_sections(id)
name         VARCHAR(255)
type         VARCHAR(100)   -- hotel, travel, activity
description  TEXT
expense      DECIMAL(10,2)
activity_date DATE
created_at   TIMESTAMP
```

### `notes`
```sql
id           INT PRIMARY KEY AUTO_INCREMENT
trip_id      INT REFERENCES trips(id)
title        VARCHAR(255)
body         TEXT
note_date    DATE
attachment   VARCHAR(500)   -- cloudinary URL
created_at   TIMESTAMP
```

### `checklist_items`
```sql
id           INT PRIMARY KEY AUTO_INCREMENT
trip_id      INT REFERENCES trips(id)
category     VARCHAR(100)   -- Documents, Clothing, Electronics
item_name    VARCHAR(255)
is_packed    BOOLEAN DEFAULT false
created_at   TIMESTAMP
```

### `invoices`
```sql
id             INT PRIMARY KEY AUTO_INCREMENT
trip_id        INT REFERENCES trips(id)
invoice_number VARCHAR(100) UNIQUE
generated_at   TIMESTAMP
payment_status ENUM('pending', 'paid')
subtotal       DECIMAL(12,2)
tax            DECIMAL(12,2)
discount       DECIMAL(12,2)
grand_total    DECIMAL(12,2)
```

### `invoice_items`
```sql
id           INT PRIMARY KEY AUTO_INCREMENT
invoice_id   INT REFERENCES invoices(id)
category     VARCHAR(100)
description  TEXT
quantity     INT
unit_cost    DECIMAL(10,2)
amount       DECIMAL(10,2)
```

### `community_posts`
```sql
id           INT PRIMARY KEY AUTO_INCREMENT
user_id      INT REFERENCES users(id)
trip_id      INT REFERENCES trips(id) NULLABLE
content      TEXT
created_at   TIMESTAMP
updated_at   TIMESTAMP
```

### `destinations` (Admin-managed)
```sql
id           INT PRIMARY KEY AUTO_INCREMENT
name         VARCHAR(255)
country      VARCHAR(100)
description  TEXT
image_url    VARCHAR(500)
is_popular   BOOLEAN DEFAULT false
created_at   TIMESTAMP
```

---

## 🔌 API Structure

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### Users
```
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
GET    /api/users/:id/trips
```

### Trips
```
GET    /api/trips                    -- list user trips (filter by status)
POST   /api/trips                    -- create trip
GET    /api/trips/:id
PUT    /api/trips/:id
DELETE /api/trips/:id
```

### Sections & Activities
```
GET    /api/trips/:id/sections
POST   /api/trips/:id/sections
PUT    /api/trips/:id/sections/:sectionId
DELETE /api/trips/:id/sections/:sectionId
```

### Notes
```
GET    /api/trips/:id/notes
POST   /api/trips/:id/notes
PUT    /api/trips/:id/notes/:noteId
DELETE /api/trips/:id/notes/:noteId
```

### Checklist
```
GET    /api/trips/:id/checklist
POST   /api/trips/:id/checklist
PUT    /api/trips/:id/checklist/:itemId
DELETE /api/trips/:id/checklist/:itemId
```

### Invoices
```
GET    /api/trips/:id/invoice
POST   /api/invoices/generate
PATCH  /api/invoices/:id/mark-paid
GET    /api/invoices/:id/pdf         -- download PDF
```

### Search
```
GET    /api/search?q=paragliding&city=Paris&type=activity
GET    /api/destinations?popular=true
```

### Community
```
GET    /api/community/posts
POST   /api/community/posts
DELETE /api/community/posts/:id
```

### Admin
```
GET    /api/admin/users
PATCH  /api/admin/users/:id/ban
GET    /api/admin/analytics
GET    /api/admin/popular-cities
GET    /api/admin/popular-activities
```

---

## 📁 Folder Structure

```
traveloop/
├── client/                          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                     # Axios instances & API calls
│   │   ├── assets/                  # Images, icons
│   │   ├── components/
│   │   │   ├── common/              # Button, Input, Modal, etc.
│   │   │   ├── layout/              # Navbar, Sidebar, Footer
│   │   │   └── ui/                  # shadcn components
│   │   ├── features/
│   │   │   ├── auth/                # Login, Register
│   │   │   ├── trips/               # Trip listing, creation, itinerary
│   │   │   ├── checklist/           # Packing checklist
│   │   │   ├── notes/               # Journal / notes
│   │   │   ├── invoice/             # Billing / invoice screen
│   │   │   ├── community/           # Community posts
│   │   │   ├── search/              # Activity / city search
│   │   │   ├── profile/             # User profile
│   │   │   └── admin/               # Admin panel
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── store/                   # Redux store / Zustand
│   │   ├── utils/                   # Helpers, formatters
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── server/                          # Node.js + Express Backend
│   ├── config/
│   │   ├── db.js                    # DB connection (Sequelize/Prisma)
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── tripsController.js
│   │   ├── sectionsController.js
│   │   ├── notesController.js
│   │   ├── checklistController.js
│   │   ├── invoiceController.js
│   │   ├── communityController.js
│   │   ├── searchController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verify
│   │   ├── adminMiddleware.js       # Role check
│   │   ├── upload.js                # Multer
│   │   └── errorHandler.js
│   ├── models/                      # Sequelize/Prisma models
│   │   ├── User.js
│   │   ├── Trip.js
│   │   ├── Section.js
│   │   ├── Activity.js
│   │   ├── Note.js
│   │   ├── ChecklistItem.js
│   │   ├── Invoice.js
│   │   ├── InvoiceItem.js
│   │   ├── CommunityPost.js
│   │   └── Destination.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── tripRoutes.js
│   │   ├── noteRoutes.js
│   │   ├── checklistRoutes.js
│   │   ├── invoiceRoutes.js
│   │   ├── communityRoutes.js
│   │   ├── searchRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   ├── generatePDF.js
│   │   ├── generateInvoiceNumber.js
│   │   └── sendEmail.js
│   ├── migrations/                  # DB migrations
│   ├── seeders/                     # Seed data
│   ├── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🗓️ Feature Workpath / Dev Roadmap

### Phase 1 — Foundation (Week 1-2)
- [ ] Project setup (Vite + Express + DB)
- [ ] DB schema design & migrations
- [ ] Auth system: Register, Login, JWT middleware
- [ ] User profile: Create, Read, Update
- [ ] Basic routing (React Router)
- [ ] Navbar + Layout shell

### Phase 2 — Core Trip Features (Week 3-5)
- [ ] Create Trip (Screen 4)
- [ ] Add Sections to Trip (Screen 5)
- [ ] View Trip Listing with status tabs (Screen 6)
- [ ] Itinerary View with Day-wise breakdown (Screen 9)
- [ ] Search Destinations/Activities (Screen 8)
- [ ] Main Landing Page with Top Selections (Screen 3)

### Phase 3 — Trip Tools (Week 6-7)
- [ ] Packing Checklist (Screen 11)
  - CRUD items, category grouping, progress bar
- [ ] Trip Notes / Journal (Screen 13)
  - Add/edit/delete notes, filter by Day/Stop
- [ ] Budget tracking per section

### Phase 4 — Billing & Community (Week 8-9)
- [ ] Invoice generation with line items (Screen 14)
- [ ] PDF export (jsPDF / Puppeteer)
- [ ] Mark as Paid functionality
- [ ] Budget Insights chart (Recharts donut)
- [ ] Community Posts (Screen 10) — create, view, search

### Phase 5 — Admin Panel (Week 10)
- [ ] Admin role middleware
- [ ] Manage Users (view, ban, trip history)
- [ ] Popular Cities & Activities (aggregation queries)
- [ ] User Trends & Analytics dashboard

### Phase 6 — Polish & Deploy (Week 11-12)
- [ ] Responsive design (mobile-first)
- [ ] Loading states, error boundaries, toasts
- [ ] Unit tests (Jest + Supertest for backend)
- [ ] Frontend E2E tests (Playwright / Cypress)
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway/Render
- [ ] Configure Cloudinary, env vars, domain

---

## 🔗 Third-Party Integrations

| Integration | Purpose |
|---|---|
| **Cloudinary** | Profile photo & note attachment uploads |
| **jsPDF / Puppeteer** | Invoice PDF generation |
| **Nodemailer** | Invoice email delivery |
| **Recharts** | Budget pie chart & admin analytics |
| **Redis** (optional) | Session caching, search result caching |
| **Stripe** (optional future) | In-app payment for bookings |

---

## 🔐 Auth Flow

```
User Registration
    ↓
POST /api/auth/register
    ↓
Hash password (bcrypt, saltRounds=10)
    ↓
Save to DB
    ↓
Return JWT (httpOnly cookie)

User Login
    ↓
POST /api/auth/login
    ↓
Compare bcrypt hash
    ↓
Issue JWT (access token 15min + refresh token 7d)
    ↓
Protected routes use authMiddleware.js to verify JWT
```

---

## 📊 Budget Insights Logic

```js
// Per trip
const totalBudget = trip.total_budget;
const totalSpent = sum(invoice_items.amount);
const remaining = totalBudget - totalSpent;
const overBudget = remaining < 0;

// Breakdown by category (for chart)
const breakdown = invoice_items.groupBy('category').map(cat => ({
  name: cat.category,
  value: sum(cat.amount)
}));
```

---

*Generated for Traveloop — 8 Hours SVG Wireframe Interpretation*
*Stack: React + Node.js + Express + MySQL/PostgreSQL*
