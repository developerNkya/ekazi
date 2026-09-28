# eKazi Recruiter

A full-stack recruitment management platform that lets employers post jobs, manage candidate applications, and move candidates through a hiring pipeline. Candidates can browse open positions and apply without creating an account.

Built as part of a full-stack developer technical assessment.

---

## 🔗 Live Demo

- **Frontend**: https://ekazi.vercel.app *(replace with your deployed URL)*
- **Backend API**: https://ekazi-api.onrender.com *(replace with your deployed URL)*

### Demo Credentials

| Email | Password |
|-------|----------|
| `demo@ekazi.co.tz` | `password123` |

---

## 🛠 Tech Stack

### Backend
- **Node.js** + **Express** + **TypeScript**
- **Prisma ORM** with **MySQL**
- **JWT** authentication + **bcryptjs** password hashing
- **Zod** for request validation

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **TanStack Query (React Query)** for server state
- **React Router v6** for routing
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Database
- **MySQL 8** (via XAMPP locally, or PlanetScale / TiDB Cloud in production)

---

## ✨ Features

### Employer (authenticated)
- Email + password authentication with JWT
- Dashboard with real-time stats (total jobs, published jobs, total applications)
- Full job management: create, view, edit, publish, close, delete
- Job status pipeline: `DRAFT → PUBLISHED → CLOSED`
- View all applications for a job
- Change application status: `APPLIED → SHORTLISTED → INTERVIEW → HIRED / REJECTED`
- Filter applications by status
- Copy public application link to share with candidates

### Candidate (public, no account)
- Browse all published jobs
- Search jobs by title or location
- View detailed job postings
- Apply with a simple form (name, email, phone, resume URL, optional cover letter)
- Duplicate application prevention (friendly error message)

### General
- Responsive layout (mobile, tablet, desktop)
- Public homepage with hero carousel, latest jobs, and career tips
- About page with mission and product overview
- Centralized error handling and toast notifications

---

## 📂 Project Structure

```
ekazi/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   ├── seed.ts                # Idempotent seed script
│   │   └── migrations/            # Migration history
│   ├── src/
│   │   ├── config/env.ts          # Environment config with validation
│   │   ├── lib/prisma.ts          # Prisma client singleton
│   │   ├── middleware/
│   │   │   ├── auth.ts            # JWT authentication middleware
│   │   │   └── errorHandler.ts    # Centralized error handler
│   │   ├── modules/
│   │   │   ├── auth/              # Register, login, me
│   │   │   ├── jobs/              # Jobs CRUD + status changes
│   │   │   ├── applications/      # View + update applications
│   │   │   ├── dashboard/         # Employer stats
│   │   │   └── public/            # Public jobs + apply (no auth)
│   │   ├── utils/
│   │   │   ├── ApiError.ts        # Custom error class
│   │   │   └── asyncHandler.ts    # Async route wrapper
│   │   ├── app.ts                 # Express app + route mounting
│   │   └── server.ts              # Server bootstrap
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── api/                   # Axios clients + API functions
│   │   ├── components/            # Reusable UI (Layout, Badge, etc.)
│   │   ├── hooks/                 # useAuth context
│   │   ├── pages/                 # Route pages
│   │   ├── types/                 # Shared TypeScript types
│   │   ├── App.tsx                # Routes + QueryClient provider
│   │   └── main.tsx               # Entry + Toaster
│   ├── public/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20 LTS or higher
- **MySQL 8** (XAMPP, Docker, or PlanetScale)
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ekazi.git
cd ekazi
```

### 2. Set up the database

**Option A — XAMPP (Windows, easiest)**
1. Open XAMPP Control Panel → Start MySQL
2. Open phpMyAdmin → create database `ekazi`
3. Use connection string: `mysql://root@localhost:3306/ekazi`

**Option B — Docker**
```bash
docker run --name ekazi-mysql \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_DATABASE=ekazi \
  -p 3306:3306 -d mysql:8
```
Connection string: `mysql://root:rootpass@localhost:3306/ekazi`

**Option C — PlanetScale (cloud, no install)**
1. Create a free database at https://planetscale.com
2. Copy the connection string into `DATABASE_URL`

### 3. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="mysql://root@localhost:3306/ekazi"
JWT_SECRET="generate-a-long-random-string-min-32-chars"
JWT_EXPIRES_IN="7d"
PORT=4000
CORS_ORIGIN="http://localhost:5173"
NODE_ENV=development
```

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then:
```bash
npx prisma@5 generate
npx prisma@5 migrate dev --name init
npm run seed
npm run dev
```

Backend runs at **http://localhost:4000**.

### 4. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Verify `frontend/.env`:
```env
VITE_API_URL=http://localhost:4000
```

Then:
```bash
npm run dev
```

Frontend runs at **http://localhost:5173**.

### 5. Log in

Open http://localhost:5173 and use:

- **Email**: `demo@ekazi.co.tz`
- **Password**: `password123`

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/auth/register` | — | Register a new user |
| POST | `/auth/login` | — | Login and return JWT |
| GET | `/auth/me` | ✅ | Get current user |

### Jobs (authenticated)

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/jobs` | ✅ | List own jobs (with `?status=` and `?search=`) |
| POST | `/jobs` | ✅ | Create a job |
| GET | `/jobs/:id` | ✅ | Get a single job |
| PATCH | `/jobs/:id` | ✅ | Update a job |
| PATCH | `/jobs/:id/status` | ✅ | Change job status |
| DELETE | `/jobs/:id` | ✅ | Delete a job |
| GET | `/jobs/:id/applications` | ✅ | List applications (with `?status=`) |

### Applications (authenticated)

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/applications/:id` | ✅ | Get a single application |
| PATCH | `/applications/:id/status` | ✅ | Update application status |

### Dashboard (authenticated)

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/dashboard/stats` | ✅ | Total jobs, published jobs, total applications |

### Public (no auth required)

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/public/jobs` | — | List all PUBLISHED jobs |
| GET | `/public/jobs/:id` | — | Get a single PUBLISHED job |
| POST | `/public/jobs/:id/applications` | — | Submit an application |
| GET | `/public/stats` | — | Public counters (jobs, applications, employers) |

---

## 🔐 Authentication Model

Per the assessment, **authenticated users manage jobs and applications** — creating, editing, deleting, and progressing candidates through the pipeline.

**Candidates can apply to PUBLISHED jobs without creating an account.** This mirrors how modern ATS platforms work (Greenhouse, Lever, Ashby): employers need accounts to manage hiring, but forcing candidates to register before applying creates unnecessary friction.

**What's protected:**
- All job management endpoints (`POST/PATCH/DELETE /jobs`)
- Viewing applications (`GET /jobs/:id/applications`)
- Changing application status (`PATCH /applications/:id/status`)
- Dashboard stats (`GET /dashboard/stats`)

**What's public:**
- Browsing published jobs (`GET /public/jobs`, `GET /public/jobs/:id`)
- Submitting an application (`POST /public/jobs/:id/applications`)

This split is enforced at both layers:
- **Backend**: JWT middleware on protected routes
- **Frontend**: `<ProtectedRoute>` redirects unauthenticated users to `/login`

---

## 🗄 Database Schema

```
User
├── id           Int      @id @default(autoincrement())
├── name         String
├── email        String   @unique
├── password     String   (bcrypt hash)
├── createdAt    DateTime
└── jobs         Job[]

Job
├── id              Int             @id
├── title           String
├── description     String          @db.Text
├── location        String
├── employmentType  EmploymentType  (FULL_TIME | PART_TIME | CONTRACT | INTERNSHIP)
├── status          JobStatus       (DRAFT | PUBLISHED | CLOSED)
├── userId          Int             → User.id (Cascade)
├── applications    Application[]
├── createdAt       DateTime
└── updatedAt       DateTime

Application
├── id             Int                @id
├── jobId          Int                → Job.id (Cascade)
├── candidateName  String
├── email          String
├── phone          String
├── coverLetter    String?            @db.Text
├── resumeUrl      String
├── status         ApplicationStatus  (APPLIED | SHORTLISTED | INTERVIEW | REJECTED | HIRED)
├── createdAt      DateTime
└── updatedAt      DateTime

Unique constraint: (jobId, email) → prevents duplicate applications
```

---

## 🎨 Design Decisions

### Why Prisma?
Type-safe schema, migrations built-in, and clean relational queries. The schema file doubles as documentation of the data model.

### Why Zod?
Validation happens at the controller boundary, so no invalid data ever reaches the database. Errors return a consistent `{ message, errors: [{ field, message }] }` shape that the frontend displays as toasts.

### Why JWT in localStorage?
Simple and stateless. The scope of the assessment doesn't warrant refresh tokens or HTTP-only cookies. Documented as a known tradeoff for a production system.

### Why a separate `/public/*` namespace?
Clean separation between public reads (jobs list, job detail, apply) and authenticated management (`/jobs`, `/applications`, `/dashboard`). The boundary is explicit at the URL level.

### Why an idempotent seed?
`prisma.job.create()` always inserts a new row. To make the seed safe to run multiple times, the script wipes existing jobs/applications for the demo user before creating fresh ones. This prevents duplicate data and makes the seed usable in any state.

### Why a unique `(jobId, email)` constraint?
Duplicate applications are handled at the database level — not just in application code — so they can't slip through even under race conditions.

---

## ⚠️ Known Tradeoffs

- **JWT in localStorage**: simpler, but vulnerable to XSS. Production would use HTTP-only cookies.
- **No refresh tokens**: sessions last 7 days; re-login required after expiry.
- **No file uploads**: resumes are URL links (Google Drive, Dropbox, etc.) rather than uploaded files.
- **No pagination**: fine for the assessment's scope; needed for production with large datasets.
- **No RBAC**: per the brief, complex role systems are out of scope.

---

## 🧪 Testing

### Backend (manual)
```bash
# Health check
curl http://localhost:4000/health

# Public endpoints (no auth)
curl http://localhost:4000/public/jobs
curl http://localhost:4000/public/stats

# Protected endpoint (should return 401)
curl http://localhost:4000/jobs

# Login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@ekazi.co.tz","password":"password123"}'
```

### Frontend (manual checklist)
- [ ] Login with demo credentials → redirects to `/dashboard`
- [ ] Create a job → appears in Jobs list
- [ ] Publish a draft → status changes
- [ ] Copy public link → open in incognito → job detail shows
- [ ] Apply with new email → success screen
- [ ] Apply with same email → error toast
- [ ] Log out → redirected to `/login`
- [ ] Visit `/jobs` while logged out → redirected to `/login`

---

## 🚀 Deployment

The app is designed to deploy to:

| Component | Platform |
|-----------|----------|
| **Frontend** | [Vercel](https://vercel.com) or [Netlify](https://netlify.com) |
| **Backend** | [Render](https://render.com) |
| **Database** | [PlanetScale](https://planetscale.com) or [TiDB Cloud](https://tidbcloud.com) |

### Deployment steps

1. **Database** (PlanetScale): create database, copy connection string
2. **Backend** (Render):
   - Create Web Service from GitHub repo, root directory: `backend`
   - Build command: `npm install && npx prisma generate && npx prisma migrate deploy`
   - Start command: `npm run start`
   - Environment variables: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `NODE_ENV=production`
3. **Frontend** (Vercel):
   - Import GitHub repo, root directory: `frontend`
   - Environment variable: `VITE_API_URL=https://your-backend.onrender.com`

---

## 📝 What I'd Add With More Time

- File upload for resumes (S3 or Cloudinary)
- Email notifications when application status changes
- Pagination on jobs and applications lists
- Refresh tokens for better session security
- E2E tests with Playwright
- Candidate profile pages and saved jobs
- Analytics dashboard (applications over time, hire rate)

---

## 📄 License

MIT

---

## 👤 Author

**Derick Allan Nkya**

Built for the eKazi Full-Stack Developer Technical Assessment.