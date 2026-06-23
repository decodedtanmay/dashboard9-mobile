# MASTER KNOWLEDGE BASE
## Maharashtra Water Infrastructure Management Platform (dashboard9)

> **Document Version**: 1.0  
> **Generated**: 2026-06-18  
> **Repository**: `Rishi2532/dashboard9`  
> **Production URL**: `https://dashboard1.mahajaliot.in`

---

# PHASE 1 — FULL REPOSITORY DISCOVERY

## 1.1 Repository Structure

```
dashboard9/
├── client/                          # React frontend application
│   ├── index.html                   # HTML entry point for Vite
│   ├── public/                      # Static assets served by Vite
│   └── src/                         # Frontend source code
│       ├── @types/                  # TypeScript type augmentations
│       ├── App.tsx                  # Root React component with routing
│       ├── main.tsx                 # React DOM render entry point
│       ├── index.css                # Global CSS (Tailwind + custom)
│       ├── global.d.ts              # Global TypeScript declarations
│       ├── types.ts                 # Shared frontend types
│       ├── assets/                  # Static assets (images, icons)
│       ├── components/              # Reusable UI components
│       │   ├── admin/               # Admin panel components (importers)
│       │   ├── auth/                # Authentication guard components
│       │   ├── cards/               # Stat card components
│       │   ├── chatbot/             # AI chatbot components
│       │   ├── communication/       # Communication status components
│       │   ├── dashboard/           # Dashboard-specific components
│       │   ├── maps/                # Map visualization components
│       │   ├── reports/             # Report download components
│       │   ├── theme/               # Theme provider components
│       │   └── ui/                  # shadcn/ui primitive components (52 files)
│       ├── config/                  # Client configuration
│       │   └── api-keys.ts          # API key configuration
│       ├── contexts/                # React context providers
│       │   ├── ChatbotContext.tsx    # Chatbot visibility context
│       │   ├── GeoFilterContext.tsx  # Geographic filter context
│       │   ├── PageContext.tsx       # Current page context
│       │   ├── RegionFilterContext.tsx # Region filter context
│       │   └── TranslationContext.tsx # Multi-language translation context
│       ├── data/                    # Static data files
│       │   ├── maharashtra-boundaries.ts
│       │   ├── maharashtra-districts.ts
│       │   ├── maharashtra-geojson.ts
│       │   └── maharashtra-regions.ts
│       ├── hooks/                   # Custom React hooks
│       │   ├── use-activity-tracker.ts
│       │   ├── use-auth.tsx         # Authentication hook + provider
│       │   ├── use-comprehensive-activity-tracker.ts
│       │   ├── use-dashboard-tracking.ts
│       │   ├── use-enhanced-activity-tracker.ts
│       │   ├── use-mobile.tsx       # Mobile detection hook
│       │   ├── use-toast.ts         # Toast notification hook
│       │   └── useGeographicFilteredData.ts
│       ├── lib/                     # Utility libraries
│       │   ├── chart-utils.ts       # Chart.js helper utilities
│       │   ├── excel-validator.ts   # Excel file validation
│       │   ├── logo-base64.ts       # Logo as base64 string
│       │   ├── maharashtra-geojson.ts
│       │   ├── pdf-generator.ts     # Basic PDF generation
│       │   ├── pdf-generator-enhanced.ts
│       │   ├── pdf-generator-monthly.ts
│       │   ├── pdf-generator-professional.ts # Full professional PDF
│       │   ├── ptserif-fonts.ts     # PTSerif font embedding
│       │   ├── queryClient.ts       # TanStack Query client config
│       │   ├── submitted-to-logo-base64.ts
│       │   ├── translations.ts      # Translation strings
│       │   └── utils.ts             # General utility (cn, clsx)
│       ├── pages/                   # Page-level components (30+ pages)
│       │   ├── admin/               # Admin pages (dashboard, imports, logs)
│       │   ├── chlorine/            # Chlorine monitoring pages
│       │   ├── details/             # Village & ESR list pages
│       │   ├── helpdesk/            # Helpdesk system pages
│       │   ├── lpcd/                # LPCD analysis pages
│       │   ├── pressure/            # Pressure monitoring pages
│       │   ├── scheme-lpcd/         # Scheme-level LPCD pages
│       │   ├── dashboard.tsx        # Main dashboard (66KB)
│       │   ├── home.tsx             # Public landing page
│       │   ├── login.tsx            # Login page
│       │   ├── register.tsx         # Registration page
│       │   ├── schemes.tsx          # Scheme listing page
│       │   ├── scheme-details.tsx   # Scheme detail page (68KB)
│       │   ├── water-consumption.tsx # Water consumption page (136KB)
│       │   ├── Maharashtra.tsx      # Maharashtra map page (69KB)
│       │   └── ... (30+ page files)
│       ├── services/                # Client-side services
│       │   ├── chatbot-helpdesk-service.ts
│       │   ├── nlp-service.ts
│       │   ├── openai-service.ts
│       │   └── widget-context-messages.ts
│       ├── types/                   # Type definitions
│       │   ├── index.ts             # Shared frontend types
│       │   └── pdfmake.d.ts         # pdfmake type augmentation
│       └── utils/                   # Utility functions
│           ├── excel-helper.ts
│           └── timezone.ts
│
├── server/                          # Express.js backend
│   ├── index.ts                     # Server entry point (Express setup)
│   ├── routes.ts                    # Main route registration (188KB, 5165 lines)
│   ├── storage.ts                   # Database storage layer (515KB)
│   ├── db.ts                        # Database connection + helpers (62KB)
│   ├── setup-db.ts                  # Database initialization (67KB)
│   ├── vite.ts                      # Vite dev server integration
│   ├── config.ts                    # Server configuration
│   ├── mqtt-service.ts              # MQTT broker connectivity service
│   ├── init-database.js             # Database initialization script
│   ├── data-cleanup.ts              # Data cleanup routines
│   ├── scheme-lpcd-importer.ts      # Scheme LPCD CSV import logic
│   ├── database-storage.ts          # Alternative storage implementation
│   ├── db-retry.ts                  # Database retry logic
│   ├── cron/                        # Scheduled background jobs
│   │   ├── daily-alerts.ts          # Daily email alerts cron
│   │   ├── pi-chlorine-ingestion.ts # PI Web API chlorine sync
│   │   ├── pi-pressure-ingestion.ts # PI Web API pressure sync
│   │   ├── pi-water-scheme-ingestion.ts
│   │   ├── pi-scheme-lpcd-ingestion.ts
│   │   ├── pi-water-consumption-ingestion.ts
│   │   └── pi-communication-status-ingestion.ts
│   ├── routes/                      # Modular route handlers
│   │   ├── admin/                   # Admin-only routes
│   │   │   └── import-csv.ts, import-lpcd.ts
│   │   ├── ai/                      # AI/OpenAI routes
│   │   ├── chatbot/                 # Chatbot routes
│   │   │   └── helpdesk-routes.ts
│   │   ├── acknowledge-routes.ts    # Email acknowledgement routes
│   │   ├── alerts-progress-routes.ts # Alert tracking routes
│   │   ├── category-data-routes.ts  # Category-based data queries (225KB)
│   │   ├── chlorine-routes.ts       # Chlorine data CRUD (361KB)
│   │   ├── combined-esr-download-routes.ts
│   │   ├── communication-routes.ts
│   │   ├── communication-status-routes.ts
│   │   ├── esr-routes.ts            # ESR monitoring routes
│   │   ├── filter-utils.ts          # Shared filter utilities
│   │   ├── flowmeter-routes.ts
│   │   ├── helpdesk-routes.ts       # Helpdesk ticket CRUD
│   │   ├── issue-reporting-routes.ts
│   │   ├── monthly-reports-routes.ts
│   │   ├── nlp-chatbot-routes.ts    # NLP chatbot integration
│   │   ├── population-routes.ts
│   │   ├── pressure-routes.ts       # Pressure data CRUD (100KB)
│   │   ├── reports.ts               # Report file management
│   │   ├── scheme-analysis-routes.ts # Scheme analysis (69KB)
│   │   ├── scheme-lpcd-routes.ts    # Scheme LPCD routes (50KB)
│   │   ├── smart-reports-routes.ts  # AI-generated reports
│   │   ├── translation.ts          # Translation API routes
│   │   ├── village-routes.ts
│   │   ├── water-consumption-routes.ts
│   │   └── water-scheme-routes.ts   # Water scheme routes (117KB)
│   ├── services/                    # Backend services
│   │   ├── chatbot-helpdesk-service.ts # Chatbot NLP + helpdesk
│   │   ├── email-service.ts         # Email sending (Resend / SMTP)
│   │   ├── openai-service.ts        # OpenAI GPT integration
│   │   ├── openai-service-class.ts  # OpenAI class wrapper
│   │   ├── pi-web-api-service.ts    # PI Web API (OSIsoft) client
│   │   └── sms-service.ts           # SMS notification service
│   └── scripts/                     # Maintenance scripts
│
├── shared/                          # Shared code between client & server
│   └── schema.ts                    # Drizzle ORM database schema (1464 lines)
│
├── public/                          # Static public assets
│   ├── favicon.svg
│   ├── Maharashtra_Divisions_Eng.svg # Maharashtra map SVG
│   ├── maharashtra.topo.json        # TopoJSON map data
│   ├── maharashtra_districts.geojson
│   ├── maharashtra_districts.json
│   ├── maharastra.geojson
│   ├── jal-jeevan-mission-logo.svg
│   └── images/                      # Static images
│
├── templates/                       # Data import templates
│   └── lpcd_data_template.xlsx
│
├── uploads/                         # Uploaded files directory
├── reports/                         # Generated reports
├── ssl/                             # SSL certificate files
│
├── nlp_service.py                   # Python NLP microservice (FastAPI)
├── nlp_service_old.py               # Legacy NLP service
├── start_nlp_service.py             # NLP service launcher
├── pyproject.toml                   # Python project config (uv)
│
├── package.json                     # Node.js dependencies
├── package-lock.json                # Locked dependencies
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite build configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── drizzle.config.ts                # Drizzle ORM config
├── theme.json                       # shadcn/ui theme config
├── .env.example                     # Environment variable template
├── .gitignore                       # Git ignore rules
├── README.md                        # Project README
├── web.config                       # IIS deployment config
├── certificate.pem                  # SSL certificate
├── privatekey.pem                   # SSL private key
│
├── database_create_scripts.sql      # Database creation SQL
├── database_setup.sql               # Database setup SQL
├── *.sql                            # Various migration scripts
│
├── run-in-vscode.sh                 # VS Code launcher (Unix)
├── run-in-vscode.bat                # VS Code launcher (Windows)
├── setup-env.sh                     # Environment setup script
└── ... (100+ debug/test/output files)
```

### Folder Purpose Matrix

| Folder | Purpose | Responsibility | Key Relationships |
|--------|---------|---------------|-------------------|
| `client/` | React SPA frontend | UI rendering, user interaction, data visualization | Consumes `server/` API, uses `shared/schema.ts` types |
| `client/src/components/` | Reusable UI components | Component library organized by domain | Used by `pages/` |
| `client/src/components/ui/` | shadcn/ui primitives | Base UI building blocks (52 components) | Used by all other components |
| `client/src/components/dashboard/` | Dashboard-specific components | Charts, maps, filters, stats cards (49 components) | Used by `pages/dashboard.tsx` |
| `client/src/components/chatbot/` | AI chatbot system | NLP chatbot with voice, text-to-speech, widgets | Uses `server/services/openai-service.ts` |
| `client/src/components/maps/` | Map visualizations | Leaflet, OpenStreetMap, SVG maps of Maharashtra | Uses GeoJSON data files |
| `client/src/pages/` | Route-level page components | Full page implementations (30+ pages) | Composed from `components/` |
| `client/src/hooks/` | Custom React hooks | Auth, activity tracking, toast, mobile detection | Used across all pages |
| `client/src/contexts/` | React context providers | Global state: auth, geo filters, translation, page | Wrap `App.tsx` tree |
| `client/src/lib/` | Utility libraries | PDF generation, chart utils, query client, translations | Used across application |
| `client/src/services/` | Client-side services | Chatbot NLP, OpenAI integration, widget messages | Used by chatbot components |
| `server/` | Express.js API backend | REST API, database, MQTT, cron jobs, email | Serves `client/`, uses `shared/` |
| `server/routes/` | Modular route handlers | Domain-specific API endpoints (28 files) | Registered in `routes.ts` |
| `server/services/` | Backend services | Email, SMS, OpenAI, PI Web API integration | Used by routes and cron jobs |
| `server/cron/` | Scheduled jobs | PI Web API data ingestion, daily alerts | Run on server startup |
| `shared/` | Shared code | Database schema, types, validation schemas | Used by both client & server |
| `public/` | Static assets | Map files, logos, GeoJSON data | Served statically |
| `templates/` | Import templates | Excel templates for data import | Downloaded by users |

---

# PHASE 2 — TECHNOLOGY STACK ANALYSIS

## 2.1 Frontend Technologies

| Technology | Version | Purpose | Usage Location |
|-----------|---------|---------|----------------|
| **React** | 18.3.1 | UI framework | `client/src/` |
| **TypeScript** | 5.9.2 | Type safety | All `.ts`/`.tsx` files |
| **Vite** | 5.4.19 | Build tool & dev server | `vite.config.ts` |
| **Wouter** | 3.7.1 | Client-side routing | `App.tsx` |
| **TanStack React Query** | 5.85.9 | Server state management | `lib/queryClient.ts`, all pages |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS | `tailwind.config.ts`, all components |
| **shadcn/ui** (Radix UI) | Multiple | UI component library | `components/ui/` (52 components) |
| **Recharts** | 2.15.4 | Chart library | Dashboard charts |
| **Chart.js** | 4.5.0 | Alternative chart library | `lib/chart-utils.ts` |
| **D3.js** | 7.9.0 | Data visualization (maps) | Map components |
| **Leaflet** | 1.9.4 | Interactive maps | `components/maps/` |
| **React-Leaflet** | 4.2.1 | React bindings for Leaflet | Map components |
| **React Simple Maps** | 3.0.0 | SVG map rendering | Maharashtra map |
| **TopoJSON Client** | 3.1.0 | TopoJSON data parsing | Map data |
| **Framer Motion** | 11.18.2 | Animations | Page transitions |
| **Lucide React** | 0.453.0 | Icon library | All components |
| **React Icons** | 5.5.0 | Additional icons | Various components |
| **React Hook Form** | 7.62.0 | Form management | Login, register, helpdesk forms |
| **Zod** | 3.25.76 | Schema validation | Form validation, API contracts |
| **date-fns** | 3.6.0 | Date manipulation | Date formatting throughout |
| **pdfmake** | 0.2.20 | PDF generation | Report generation |
| **ExcelJS / XLSX** | 4.4.0 / 0.18.5 | Excel file handling | Import/export functionality |
| **React Day Picker** | 8.10.1 | Date picker component | Calendar inputs |
| **React Chatbot Kit** | 2.2.2 | Chatbot UI framework | Chatbot component |
| **React Speech Recognition** | 4.0.1 | Voice input | Chatbot voice commands |
| **React Resizable Panels** | 2.1.9 | Resizable layouts | Dashboard layouts |
| **Embla Carousel** | 8.6.0 | Carousel component | Data carousels |
| **cmdk** | 1.1.1 | Command palette | Command/search UI |
| **vaul** | 1.1.2 | Drawer component | Mobile drawers |
| **class-variance-authority** | 0.7.1 | Component variants | UI component styling |
| **tailwind-merge** | 2.6.0 | Tailwind class merging | `lib/utils.ts` |
| **tailwindcss-animate** | 1.0.7 | Animation utilities | `tailwind.config.ts` |

## 2.2 Backend Technologies

| Technology | Version | Purpose | Usage Location |
|-----------|---------|---------|----------------|
| **Express.js** | 4.21.2 | HTTP server framework | `server/index.ts` |
| **TypeScript** | 5.9.2 | Type safety | All server files |
| **tsx** | 4.20.5 | TypeScript execution | `npm run dev` |
| **PostgreSQL** (via `pg`) | 8.16.3 | Primary database | `server/db.ts` |
| **Drizzle ORM** | 0.39.3 | ORM / query builder | `shared/schema.ts`, `server/storage.ts` |
| **Drizzle Kit** | 0.30.6 | DB migration tool | `drizzle.config.ts` |
| **Drizzle Zod** | 0.7.1 | Schema-to-Zod bridge | `shared/schema.ts` |
| **express-session** | 1.18.2 | Session management | `server/index.ts` |
| **connect-pg-simple** | 10.0.0 | PostgreSQL session store | Session persistence |
| **Multer** | 1.4.5 | File upload middleware | CSV/Excel uploads |
| **Nodemailer** | 7.0.10 | SMTP email sending | `services/email-service.ts` |
| **Resend** | 6.3.0 | Email API (fallback) | `services/email-service.ts` |
| **MQTT.js** | 5.14.1 | MQTT broker client | `server/mqtt-service.ts` |
| **node-cron** | 4.2.1 | Cron job scheduling | `server/cron/` |
| **OpenAI SDK** | 4.104.0 | GPT AI integration | `services/openai-service.ts` |
| **Anthropic SDK** | 0.37.0 | Claude AI integration | AI routes |
| **@google-cloud/translate** | 9.2.0 | Google Translation API | Translation service |
| **@sendgrid/mail** | 8.1.5 | SendGrid email (optional) | Email fallback |
| **TensorFlow.js** | 4.22.0 | ML sentence encoding | NLP classification |
| **Universal Sentence Encoder** | 1.3.3 | Text similarity | Chatbot NLP |
| **Passport.js** | 0.7.0 | Authentication framework | Auth middleware |
| **uuid** | 11.1.0 | UUID generation | Ticket IDs |
| **memoizee** | 0.4.17 | Function memoization | Performance optimization |
| **ws** | 8.18.3 | WebSocket support | Real-time updates |
| **csv-parse** | 5.6.0 | CSV parsing | Data import |
| **esbuild** | 0.25.9 | Production JS bundler | `npm run build` |
| **dotenv** | 16.6.1 | Environment variables | `server/index.ts` |

## 2.3 Python NLP Microservice

| Technology | Purpose | File |
|-----------|---------|------|
| **FastAPI** | HTTP API framework | `nlp_service.py` |
| **spaCy** (en_core_web_sm) | NLP processing | `nlp_service.py` |
| **RapidFuzz** | Fuzzy string matching | `nlp_service.py` |
| **Uvicorn** | ASGI server | `nlp_service.py` |

## 2.4 Infrastructure

| Technology | Purpose | Configuration |
|-----------|---------|---------------|
| **Replit** | Primary hosting platform | `vite.config.ts`, `.replit` |
| **IIS (Windows)** | Alternative deployment | `web.config` |
| **PostgreSQL** | Production database | `.env.example` |
| **MQTT Brokers** | IoT data ingestion | `mqtt-service.ts` (2 brokers) |
| **PI Web API (OSIsoft)** | Industrial IoT data source | `services/pi-web-api-service.ts` |
| **SSL/TLS** | HTTPS encryption | `certificate.pem`, `privatekey.pem` |

---

# PHASE 3 — APPLICATION ARCHITECTURE

## 3.1 High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Browser["Browser (React SPA)"]
    end

    subgraph "Server Layer"
        Express["Express.js Server :5000"]
        Vite["Vite Dev Server (dev only)"]
    end

    subgraph "External Services"
        MQTT1["MQTT Broker 1<br/>14.99.99.166:1889"]
        MQTT2["MQTT Broker 2<br/>49.50.99.188:1883"]
        PIWebAPI["PI Web API<br/>(OSIsoft)"]
        OpenAI["OpenAI GPT API"]
        GoogleTranslate["Google Translate API"]
        SMTP["Gmail SMTP"]
        NLP["Python NLP Service<br/>:8001"]
    end

    subgraph "Data Layer"
        PostgreSQL["PostgreSQL Database"]
    end

    Browser -->|HTTP/API| Express
    Browser -->|HMR (dev)| Vite
    Express -->|SQL| PostgreSQL
    Express -->|MQTT Subscribe #| MQTT1
    Express -->|MQTT Subscribe #| MQTT2
    Express -->|Cron Jobs| PIWebAPI
    Express -->|Chat/Reports| OpenAI
    Express -->|Translation| GoogleTranslate
    Express -->|Email Alerts| SMTP
    Express -->|NLP Classification| NLP
    Vite -->|Proxy /api| Express
```

## 3.2 Architectural Style

The application follows a **Monolithic Full-Stack** architecture:

- **Single Node.js process** serves both the API (`/api/*`) and the static React build
- **Module-based route organization** within the monolith (28 route files)
- **Shared schema** between frontend and backend via `shared/schema.ts`
- **Session-based authentication** using express-session with PostgreSQL backing
- **MQTT real-time ingestion** running as a background service within the same process
- **Cron-based data synchronization** for PI Web API data

## 3.3 Layer Separation

```mermaid
graph LR
    subgraph "Presentation Layer"
        Pages["Pages (30+)"]
        Components["Components (120+)"]
        Contexts["Contexts (5)"]
        Hooks["Hooks (8)"]
    end

    subgraph "API Layer"
        Routes["Express Routes (28 modules)"]
        Middleware["Auth Middleware"]
    end

    subgraph "Service Layer"
        EmailSvc["Email Service"]
        OpenAISvc["OpenAI Service"]
        MQTTSvc["MQTT Service"]
        PISvc["PI Web API Service"]
        SMSSvc["SMS Service"]
    end

    subgraph "Data Access Layer"
        Storage["Storage Layer (515KB)"]
        DrizzleORM["Drizzle ORM"]
    end

    subgraph "Database"
        PG["PostgreSQL"]
    end

    Pages --> Routes
    Routes --> Middleware
    Routes --> Storage
    Routes --> EmailSvc
    Routes --> OpenAISvc
    Storage --> DrizzleORM
    DrizzleORM --> PG
    MQTTSvc --> PG
    PISvc --> Storage
```

## 3.4 Data Flow

```mermaid
sequenceDiagram
    participant IoT as IoT Sensors
    participant MQTT as MQTT Brokers
    participant PI as PI Web API
    participant Server as Express Server
    participant DB as PostgreSQL
    participant Client as React Client
    participant Email as Email Service

    IoT->>MQTT: Publish sensor data
    MQTT->>Server: Subscribe to all topics (#)
    Server->>DB: Batch update topics_last_seen (every 10s)

    PI->>Server: Cron: Fetch latest data (every X hours)
    Server->>DB: Upsert chlorine/pressure/water/LPCD data

    Client->>Server: GET /api/* (data queries)
    Server->>DB: Query with filters
    DB->>Server: Result set
    Server->>Client: JSON response

    Server->>Email: Daily cron: Send alert emails
    Email->>IoT: Engineer acknowledges via link
```

---

# PHASE 4 — USER INTERFACE REVERSE ENGINEERING

## 4.1 Screen Inventory

| # | Screen Name | Route | Purpose | Auth Required | Admin Only |
|---|------------|-------|---------|---------------|------------|
| 1 | Home / Landing Page | `/` | Public landing page with login options | No | No |
| 2 | Admin Login | `/admin` | Admin-specific login page | No | No |
| 3 | User Login | `/user-login` | Standard user login | No | No |
| 4 | Login | `/login` | General login page | No | No |
| 5 | Register | `/register` | User registration | No | No |
| 6 | Forgot Password | `/forgot-password` | Password recovery | No | No |
| 7 | **Main Dashboard** | `/dashboard` | Central dashboard with stats, charts, maps | Yes | No |
| 8 | Schemes List | `/schemes` | All water schemes listing | Yes | No |
| 9 | Scheme Details | `/scheme/:schemeId/:block?` | Individual scheme details | Yes | No |
| 10 | Regions Overview | `/regions` | Regional statistics | Yes | No |
| 11 | Reports | `/reports` | Report generation and download | Yes | No |
| 12 | Smart Reports | `/smart-reports` | AI-generated analytical reports | Yes | No |
| 13 | Monthly Reports | `/monthly-reports` | Monthly report generation | Yes | **Yes** |
| 14 | LPCD Dashboard | `/lpcd` | Liters Per Capita Per Day analysis | Yes | No |
| 15 | Scheme LPCD | `/scheme-lpcd` | Scheme-level LPCD tracking | Yes | No |
| 16 | Chlorine Dashboard | `/chlorine` | Chlorine monitoring overview | Yes | No |
| 17 | Detailed Chlorine | `/chlorine/detailed` | Detailed chlorine analysis | Yes | No |
| 18 | Chlorine Import | `/chlorine/import` | Import chlorine data | Yes | No |
| 19 | Pressure Dashboard | `/pressure` | Pressure monitoring overview | Yes | No |
| 20 | Water Consumption | `/water-consumption` | Water consumption analysis (136KB page) | Yes | No |
| 21 | Communication Status | `/communication` | Sensor communication monitoring | Yes | No |
| 22 | MQTT Monitor | `/mqtt-monitor` | Real-time MQTT topic monitoring | Yes | No |
| 23 | MQTT Topic Config | `/mqtt-topic-config` | MQTT topic configuration management | Yes | No |
| 24 | Maharashtra Map | `/maharashtra-map` or `/Maharashtra` | Interactive Maharashtra state map | Yes | No |
| 25 | Map Preview | `/map-preview` | Map preview / GIS view | Yes | No |
| 26 | Interactive Map Demo | `/interactive-map` | Interactive map demonstration | Yes | No |
| 27 | Alerts & Progress | `/alerts-progress` | Email alert tracking and progress | Yes | No |
| 28 | Hierarchy | `/hierarchy` | Geographic hierarchy browser | Yes | No |
| 29 | Settings | `/settings` | User settings | Yes | No |
| 30 | Raise Issue | `/helpdesk/raise-issue` | Create helpdesk ticket | Yes | No |
| 31 | Track Tickets | `/helpdesk/track-tickets` | View user's tickets | Yes | No |
| 32 | Issue Reporting | `/helpdesk/issue-reporting` | Issue justification form | Yes | No |
| 33 | Ticket Details | `/helpdesk/ticket/:id` | Individual ticket view | Yes | No |
| 34 | Village List | `/details/villages` | All villages listing | Yes | No |
| 35 | ESR List | `/details/esrs` | All ESR (reservoirs) listing | Yes | No |
| 36 | Admin Dashboard | `/admin/dashboard` | Admin control panel | Yes | **Yes** |
| 37 | Import Data | `/admin/import-data` | CSV/Excel data import | Yes | **Yes** |
| 38 | Admin Chlorine Import | `/admin/chlorine-import` | Admin chlorine data import | Yes | **Yes** |
| 39 | Import Comm Status | `/admin/communication-import` | Communication status import | Yes | **Yes** |
| 40 | Manage Reports | `/admin/manage-reports` | Report file management | Yes | **Yes** |
| 41 | Login Logs | `/admin/login-logs` | User login activity tracking | Yes | **Yes** |
| 42 | Admin Helpdesk | `/admin/helpdesk` | Admin helpdesk management | Yes | **Yes** |
| 43 | Not Found | `*` | 404 page | No | No |

## 4.2 Design System Extraction

### Typography

| Element | Font Family | Weight | Size |
|---------|-----------|--------|------|
| Body text | `Poppins` | 400 | 1rem |
| Headings (h1-h6) | `Montserrat` | 600 | varies |
| Data labels | `Inter` | 500 | 0.925rem |
| Data values | `Inter` | 600-700 | 1.1-1.5rem |
| Table headers | `Inter` | 600 | 1.05rem |
| Table cells | `Inter` | 400 | 1rem |
| Card titles | `Inter` | 600 | 1.35rem |
| Page titles | `Inter` | 700 | 2rem |
| Buttons | `Inter` | 500 | - |
| Village table | `Inter` | varies | 0.875rem |
| Metric monospace | `Roboto Mono` | 500 | - |

### Color System

**Theme Configuration** (`theme.json`):
```json
{
  "variant": "vibrant",
  "primary": "hsl(212, 85%, 45%)",
  "appearance": "light",
  "radius": 1.5
}
```

**Semantic Color Tokens** (CSS Variables via shadcn/ui):

| Token | Purpose | Value Format |
|-------|---------|--------------|
| `--background` | Page background | HSL |
| `--foreground` | Default text | HSL |
| `--primary` | Primary action color | HSL (212, 85%, 45%) |
| `--primary-foreground` | Text on primary | HSL |
| `--secondary` | Secondary elements | HSL |
| `--muted` | Muted backgrounds | HSL |
| `--accent` | Accent highlights | HSL |
| `--destructive` | Error/danger | HSL |
| `--border` | Borders | HSL |
| `--input` | Input borders | HSL |
| `--ring` | Focus rings | HSL |
| `--chart-1` through `--chart-5` | Chart colors | HSL |
| `--sidebar-*` | Sidebar theming | HSL |

**Status Colors** (used in CSS classes):

| Status | CSS Class | Color |
|--------|----------|-------|
| Good/Success | `.status-good` | `#059669` (emerald) |
| Warning | `.status-warning` | `#d97706` (amber) |
| Critical/Error | `.status-critical` | `#dc2626` (red) |

**Glow Effects**:

| Name | Box Shadow |
|------|-----------|
| `.glow-blue` | `0 0 20px rgba(59, 130, 246, 0.4)` |
| `.glow-emerald` | `0 0 20px rgba(16, 185, 129, 0.4)` |
| `.glow-orange` | `0 0 20px rgba(249, 115, 22, 0.4)` |
| `.glow-red` | `0 0 20px rgba(239, 68, 68, 0.4)` |
| `.glow-cyan` | `0 0 20px rgba(6, 182, 212, 0.4)` |
| `.glow-purple` | `0 0 20px rgba(139, 92, 246, 0.4)` |

### Design Tokens

| Token | Value |
|-------|-------|
| Border Radius (lg) | `var(--radius)` = 1.5 (from theme.json) |
| Border Radius (md) | `calc(var(--radius) - 2px)` |
| Border Radius (sm) | `calc(var(--radius) - 4px)` |
| Border Radius (xl) | `calc(var(--radius) + 2px)` |
| Border Radius (2xl) | `calc(var(--radius) + 4px)` |
| Card shadow | `0 4px 6px rgba(0,0,0,0.1)` |
| Card hover shadow | `0 10px 15px rgba(0,0,0,0.1)` |
| Dashboard card hover Y | `-4px` translateY |
| Table hover Y | `-1px` translateY |
| Transition (default) | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` |
| Page max-width | `1400px` |
| Page padding | `2rem 1.5rem` |

### Animations

| Animation | Keyframes | Duration | Use |
|-----------|-----------|----------|-----|
| `fadeIn` | translateY(10→0), opacity(0→1) | 0.3s | Component entry |
| `accordion-down` | height(0→auto) | 0.2s | Accordion expand |
| `accordion-up` | height(auto→0) | 0.2s | Accordion collapse |
| `spin-slow` | rotate(0→360deg) | 4s linear infinite | Loading spinners |
| `shimmer` | background-position sweep | 2s linear infinite | Loading skeletons |
| `bounce-in` | scale(0.8→1.05→1) | - | Element appearance |
| `fade-in-up` | translateY(10→0), opacity(0→1) | 0.5s | Staggered entry |
| `region-pulse` | box-shadow pulse | 2s infinite | Region selection |
| `ping` | scale(1→2), opacity(1→0) | 1.5s infinite | Notification badge |
| Button ripple | radial-gradient scale | 0.4s | Button click feedback |

---

# PHASE 5 — DESIGN SYSTEM EXTRACTION

## 5.1 UI Component Library (shadcn/ui)

The application uses **52 shadcn/ui primitive components** in `client/src/components/ui/`:

| Component | File | Radix Dependency | Purpose |
|-----------|------|-----------------|---------|
| Accordion | `accordion.tsx` | `@radix-ui/react-accordion` | Collapsible sections |
| Alert | `alert.tsx` | - | Alert messages |
| Alert Dialog | `alert-dialog.tsx` | `@radix-ui/react-alert-dialog` | Confirmation dialogs |
| Aspect Ratio | `aspect-ratio.tsx` | `@radix-ui/react-aspect-ratio` | Aspect ratio container |
| Avatar | `avatar.tsx` | `@radix-ui/react-avatar` | User avatars |
| Badge | `badge.tsx` | - | Status badges |
| Breadcrumb | `breadcrumb.tsx` | - | Navigation breadcrumbs |
| Button | `button.tsx` | `@radix-ui/react-slot` | Action buttons (variants: default, destructive, outline, secondary, ghost, link) |
| Calendar | `calendar.tsx` | `react-day-picker` | Date picker |
| Card | `card.tsx` | - | Content cards |
| Carousel | `carousel.tsx` | `embla-carousel-react` | Image/content carousel |
| Chart | `chart.tsx` | - | Recharts wrapper |
| Checkbox | `checkbox.tsx` | `@radix-ui/react-checkbox` | Checkboxes |
| Collapsible | `collapsible.tsx` | `@radix-ui/react-collapsible` | Collapsible panels |
| Command | `command.tsx` | `cmdk` | Command palette |
| Context Menu | `context-menu.tsx` | `@radix-ui/react-context-menu` | Right-click menus |
| Dialog | `dialog.tsx` | `@radix-ui/react-dialog` | Modal dialogs |
| Drawer | `drawer.tsx` | `vaul` | Bottom/side drawers |
| Dropdown Menu | `dropdown-menu.tsx` | `@radix-ui/react-dropdown-menu` | Dropdown menus |
| Flip Card | `flip-card.tsx` | - | 3D flip animation card |
| Form | `form.tsx` | `react-hook-form` | Form primitives |
| Hover Card | `hover-card.tsx` | `@radix-ui/react-hover-card` | Hover tooltips |
| Input | `input.tsx` | - | Text inputs |
| Input OTP | `input-otp.tsx` | `input-otp` | OTP input |
| Label | `label.tsx` | `@radix-ui/react-label` | Form labels |
| Language Selector | `language-selector.tsx` | - | Multi-language selector |
| Menubar | `menubar.tsx` | `@radix-ui/react-menubar` | Menu bars |
| Mini Line Chart | `mini-line-chart.tsx` | - | Sparkline charts |
| Navigation Menu | `navigation-menu.tsx` | `@radix-ui/react-navigation-menu` | Navigation menus |
| Pagination | `pagination.tsx` | - | Pagination controls |
| Popover | `popover.tsx` | `@radix-ui/react-popover` | Popovers |
| Progress | `progress.tsx` | `@radix-ui/react-progress` | Progress bars |
| Radio Group | `radio-group.tsx` | `@radix-ui/react-radio-group` | Radio buttons |
| Resizable | `resizable.tsx` | `react-resizable-panels` | Resizable panels |
| Scroll Area | `scroll-area.tsx` | `@radix-ui/react-scroll-area` | Custom scroll areas |
| Select | `select.tsx` | `@radix-ui/react-select` | Select dropdowns |
| Separator | `separator.tsx` | `@radix-ui/react-separator` | Visual separators |
| Sheet | `sheet.tsx` | `@radix-ui/react-dialog` | Side panels |
| Sidebar | `sidebar.tsx` | - | Application sidebar (23KB) |
| Skeleton | `skeleton.tsx` | - | Loading skeletons |
| Slider | `slider.tsx` | `@radix-ui/react-slider` | Range sliders |
| Spinner | `spinner.tsx` | - | Loading spinners |
| Switch | `switch.tsx` | `@radix-ui/react-switch` | Toggle switches |
| Table | `table.tsx` | - | Data tables |
| Tabs | `tabs.tsx` | `@radix-ui/react-tabs` | Tab navigation |
| Textarea | `textarea.tsx` | - | Text areas |
| Toast | `toast.tsx` | `@radix-ui/react-toast` | Toast notifications |
| Toaster | `toaster.tsx` | - | Toast container |
| Toggle | `toggle.tsx` | `@radix-ui/react-toggle` | Toggle buttons |
| Toggle Group | `toggle-group.tsx` | `@radix-ui/react-toggle-group` | Toggle button groups |
| Tooltip | `tooltip.tsx` | `@radix-ui/react-tooltip` | Tooltips |
| Translated Text | `translated-text.tsx` | - | Auto-translated text wrapper |

---

# PHASE 6 — NAVIGATION ANALYSIS

## 6.1 Route Map

```mermaid
graph TD
    Home["/  Home Page"] --> Login["/login"]
    Home --> UserLogin["/user-login"]
    Home --> Register["/register"]
    Home --> AdminLogin["/admin"]
    Login --> ForgotPwd["/forgot-password"]

    Login -->|Success| Dashboard
    UserLogin -->|Success| Dashboard
    AdminLogin -->|Success| AdminDash

    subgraph "User Protected Routes"
        Dashboard["/dashboard"]
        Schemes["/schemes"]
        SchemeDetail["/scheme/:id/:block?"]
        Regions["/regions"]
        Reports["/reports"]
        SmartReports["/smart-reports"]
        LPCD["/lpcd"]
        SchemeLPCD["/scheme-lpcd"]
        Chlorine["/chlorine"]
        ChlorineDetailed["/chlorine/detailed"]
        Pressure["/pressure"]
        WaterConsumption["/water-consumption"]
        Communication["/communication"]
        MQTTMonitor["/mqtt-monitor"]
        MQTTConfig["/mqtt-topic-config"]
        Maharashtra["/maharashtra-map"]
        Alerts["/alerts-progress"]
        Hierarchy["/hierarchy"]
        Settings["/settings"]
    end

    subgraph "Helpdesk Routes"
        RaiseIssue["/helpdesk/raise-issue"]
        TrackTickets["/helpdesk/track-tickets"]
        IssueReport["/helpdesk/issue-reporting"]
        TicketDetail["/helpdesk/ticket/:id"]
    end

    subgraph "Detail Routes"
        VillageList["/details/villages"]
        ESRList["/details/esrs"]
    end

    subgraph "Admin Routes"
        AdminDash["/admin/dashboard"]
        ImportData["/admin/import-data"]
        AdminChlorine["/admin/chlorine-import"]
        AdminComm["/admin/communication-import"]
        ManageReports["/admin/manage-reports"]
        LoginLogs["/admin/login-logs"]
        AdminHelpdesk["/admin/helpdesk"]
        MonthlyReports["/monthly-reports"]
    end

    Dashboard --> Schemes
    Schemes --> SchemeDetail
    Dashboard --> Regions
```

## 6.2 Authentication Guard

The `ProtectedRoute` component (`components/auth/protected-route.tsx`) wraps all protected routes:

- Checks `useAuth()` hook for `isAuthenticated` and `isAdmin` status
- Redirects to `/login` if not authenticated
- Supports `requireAdmin={true}` prop for admin-only routes
- Uses session cookie (`/api` path, 24-hour expiry)

## 6.3 Chatbot Visibility Rules

The chatbot is **hidden** on these routes:
- `/` (home)
- `/login`, `/user-login`, `/register`, `/forgot-password`
- `/admin`
- Any route starting with `/admin/`

---

# PHASE 7 — BUSINESS LOGIC ANALYSIS

## 7.1 Core Business Domain

This platform monitors **Maharashtra State's water infrastructure** under the **Jal Jeevan Mission (JJM)** / **SWSM (State Water and Sanitation Mission)** IoT initiative.

### Geographic Hierarchy

```
State (Maharashtra)
  └── Region (6): Nagpur, Amravati, Chhatrapati Sambhajinagar, Nashik, Konkan, Pune
      └── Circle
          └── Division
              └── Sub Division
                  └── Block
                      └── Scheme (water scheme with scheme_id)
                          └── Village
                              └── ESR (Elevated Service Reservoir)
```

### Key Business Rules

#### LPCD (Liters Per Capita Per Day) Classification
- **Above 55 LPCD**: Village is receiving adequate water supply
- **Below 55 LPCD**: Village is receiving inadequate water supply
- **Consistent Zero**: Village has received zero water supply for 7 consecutive days
- Calculation: `LPCD = (water_value × 1000) / population`

#### Chlorine Level Classification
- **Optimal (0.2-0.5 mg/L)**: Chlorine level is in acceptable range
- **Below 0.2 mg/L**: Insufficient chlorination (unsafe)
- **Above 0.5 mg/L**: Excessive chlorination

#### Pressure Classification
- **Below 0.2 bar**: Low pressure
- **Optimal (0.2-0.7 bar)**: Normal operating pressure
- **Above 0.7 bar**: High pressure

#### Communication Status
- **Communicating**: MQTT topic received data within last 30 minutes
- **Not Communicating**: No data received in 30+ minutes
- **0-72h / >72h**: Time-based offline classification for sensors

#### Sensor Error Codes (MQTT)
- **Flow Meter**: Communicating if `Flow_Error=0 AND Cl_Error=1`
- **Chlorine (4-20mA)**: Communicating if `(Flow_Error=1 AND Cl_Error=0) OR (both=1)`
- **Chlorine (Rs485)**: Communicating if `Flow_Error=1 AND Cl_Error=0`
- **Pressure**: Uses time-based status (30-minute threshold)

#### Agency Types
- **MJP**: Maharashtra Jeevan Pradhikaran (state agency)
- **ZP**: Zilla Parishad (district-level agency)

#### Scheme Statuses
- `mjp_commissioned`: Whether scheme is commissioned by MJP (Yes/No)
- `mjp_fully_completed`: Fully Completed / In Progress
- `water_supply_status`: Full / Partial / No
- `scheme_functional_status`: Functional status of the scheme

---

# PHASE 8 — API REVERSE ENGINEERING

## 8.1 Authentication API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | None | Login with username/password |
| POST | `/api/auth/logout` | Session | Logout and destroy session |
| GET | `/api/auth/status` | None | Check authentication status |
| POST | `/api/auth/register` | None | Register new user |

**Login Request**:
```json
{ "username": "string", "password": "string" }
```

**Login Response**:
```json
{ "isAdmin": true, "user": { "id": 1, "username": "admin", "name": "Admin", "role": "admin" } }
```

## 8.2 Core Data APIs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/water-scheme-data` | API Key or Session | Get all water scheme data |
| GET | `/api/water-scheme-data/regional-stats` | API Key or Session | Regional statistics |
| GET | `/api/water-scheme-data/scheme-stats` | API Key or Session | Scheme-level statistics |
| GET | `/api/water-scheme-data/village-stats` | API Key or Session | Village-level statistics |
| GET | `/api/water-scheme-data/history/:schemeId` | API Key or Session | Historical data for scheme |
| POST | `/api/water-scheme-data/import` | Admin | Import CSV/Excel data |
| GET | `/api/scheme-lpcd-data` | API Key or Session | Scheme LPCD data |
| GET | `/api/chlorine` | API Key or Session | Chlorine monitoring data |
| GET | `/api/chlorine/regional-stats` | API Key or Session | Chlorine regional stats |
| GET | `/api/chlorine/history/:schemeId` | API Key or Session | Chlorine history |
| POST | `/api/chlorine/import` | API Key or Session | Import chlorine data |
| GET | `/api/pressure` | API Key or Session | Pressure monitoring data |
| GET | `/api/pressure/regional-stats` | API Key or Session | Pressure regional stats |
| GET | `/api/water-consumption` | API Key or Session | Water consumption data |
| GET | `/api/communication-status` | API Key or Session | Communication status |
| GET | `/api/esr` | API Key or Session | ESR monitoring data |
| GET | `/api/population-tracking` | API Key or Session | Population tracking |

## 8.3 Helpdesk API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/helpdesk/tickets` | Session | Create new ticket |
| GET | `/api/helpdesk/tickets` | Session | List tickets (filtered) |
| GET | `/api/helpdesk/tickets/:id` | Session | Get ticket details |
| PATCH | `/api/helpdesk/tickets/:id` | Session | Update ticket status |
| GET | `/api/helpdesk/tickets/:id/attachments` | Session | Get ticket attachments |

## 8.4 External Integration APIs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/check-topic/:topic` | None | Check MQTT topic status |
| GET | `/api/topic-status/:topicId` | None | Get topic online status |
| GET | `/api/mqtt-topic-config` | None | List MQTT configurations |
| POST | `/api/mqtt-topic-config/upload-csv` | Admin | Upload MQTT config Excel |
| GET | `/api/mqtt-topic-config/export` | Admin | Export MQTT config Excel |
| POST | `/api/ai/chat` | AI Routes | AI chat completion |
| POST | `/api/translation/translate` | None | Translate text |
| GET | `/api/vendors` | None | List vendor contacts |
| GET | `/api/acknowledge?token=xxx` | None | One-click email acknowledgement |

## 8.5 Dual Authentication

The API supports two authentication methods via `requireApiKeyOrAuth` middleware:

1. **API Key**: Header `X-External-Proxy-Key` or `X-Api-Key` with value matching `EXTERNAL_API_KEY` env var (default: `MAHAJAL_IOT_SECURE_KEY_25`)
2. **Session Cookie**: Standard express-session cookie from login

---

# PHASE 9 — DATABASE REVERSE ENGINEERING

## 9.1 Entity-Relationship Overview

```mermaid
erDiagram
    users ||--o{ helpdeskTickets : "created_by"
    users ||--o{ userLoginLogs : "user_id"
    users ||--o{ userActivityLogs : "user_id"
    users ||--o{ reportFiles : "uploaded_by"
    users ||--o{ issueReports : "created_by"
    helpdeskTickets ||--o{ helpdeskAttachments : "ticket_id"

    schemeStatuses ||--o{ schemeStatusHistory : "scheme_id"
    regions ||--o{ regionHistory : "region_name"
    waterSchemeData ||--o{ waterSchemeDataHistory : "scheme_id+village_name"
    chlorineData ||--o{ chlorineHistory : "scheme_id+village+esr"
    pressureData ||--o{ pressureHistory : "scheme_id+village+esr"
    waterConsumption ||--o{ waterConsumptionHistory : "scheme_id+village+esr"
    schemeLpcd ||--o{ schemeLpcdDataHistory : "scheme_id+block"
```

## 9.2 Complete Table Inventory

| # | Table Name | Primary Key | Row Count Pattern | Purpose |
|---|-----------|-------------|-------------------|---------|
| 1 | `users` | `id` (serial) | Low (tens) | User accounts |
| 2 | `region` | `region_id` (serial) | 6 rows | Region metadata |
| 3 | `region_history` | `id` (serial) | Growing | Historical region snapshots |
| 4 | `scheme_status` | Unique(scheme_id, block) | Hundreds | Current scheme statuses |
| 5 | `scheme_status_history` | `id` (serial) | Growing | Historical scheme statuses |
| 6 | `app_state` | `key` (text) | Low | Application configuration store |
| 7 | `helpdesk_tickets` | `id` (serial) | Growing | Support tickets |
| 8 | `helpdesk_attachments` | `id` (serial) | Growing | Ticket file attachments |
| 9 | `water_scheme_data` | PK(scheme_id, village_name, block) | Thousands | Current 7-day LPCD data |
| 10 | `water_scheme_data_history` | `id` (serial) | Large | Historical LPCD data |
| 11 | `scheme_lpcd` | PK(scheme_id, block) | Hundreds | Current scheme-level LPCD |
| 12 | `scheme_lpcd_data_history` | `id` (serial) | Growing | Historical scheme LPCD |
| 13 | `chlorine_data` | PK(scheme_id, village_name, esr_name) | Thousands | Current 7-day chlorine |
| 14 | `chlorine_history` | `id` (serial) | Large | Historical chlorine data |
| 15 | `pressure_data` | PK(scheme_id, village_name, esr_name) | Thousands | Current 7-day pressure |
| 16 | `pressure_history` | `id` (serial) | Large | Historical pressure data |
| 17 | `water_consumption` | PK(scheme_id, village_name, esr_name) | Thousands | Current water consumption |
| 18 | `water_consumption_history` | `id` (serial) | Large | Historical consumption |
| 19 | `esr_monitoring` | `id` (serial) | Thousands | ESR sensor status |
| 20 | `communication_status` | Unique(scheme_id, village_name, esr_name) | Thousands | Sensor communication status |
| 21 | `report_files` | `id` (serial) | Growing | Uploaded report files |
| 22 | `user_login_logs` | `id` (serial) | Growing | Login activity logs |
| 23 | `user_activity_logs` | `id` (serial) | Growing | User activity tracking |
| 24 | `population_tracking` | `id` (serial) | Daily | Total population snapshots |
| 25 | `region_population_tracking` | Unique(date, region) | Daily × 6 | Regional population |
| 26 | `village` | None (no PK) | Thousands | Village metadata |
| 27 | `topics_last_seen` | `topic_id` (text) | Thousands | MQTT topic status |
| 28 | `mqtt_topic_configurations` | `id` (serial) | Thousands | MQTT topic config |
| 29 | `vendor` | `id` (serial) | Tens | Vendor/agency contacts |
| 30 | `issue_reports` | `id` (serial) | Growing | Issue justifications |
| 31 | `scheme_progress_summary` | `scheme_id` (bigint) | Hundreds | Scheme progress metrics |
| 32 | `scheme_engineer_details` | `id` (serial) | Hundreds | Engineer contact info |
| 33 | `email_alert_logs` | `id` (serial) | Growing | Email alert audit trail |

## 9.3 Key Data Patterns

**7-Day Rolling Window Pattern**: Tables `water_scheme_data`, `chlorine_data`, `pressure_data`, `water_consumption`, and `scheme_lpcd` store the latest 7 days of measurements in denormalized columns (`value_day1` through `value_day7`, `date_day1` through `date_day7`). Historical data is separately stored in `*_history` tables with a single `data_date` + `value` per row.

**Geographic Filter Pattern**: All data tables include the full geographic hierarchy: `region`, `circle`, `division`, `sub_division`, `block`, `scheme_id`, `scheme_name`, `village_name`, and optionally `esr_name`.

**Composite Primary Keys**: Most data tables use composite primary keys on `(scheme_id, village_name, block)` or `(scheme_id, village_name, esr_name)` rather than auto-incrementing IDs.

---

# PHASE 10 — STATE MANAGEMENT ANALYSIS

## 10.1 Global State (React Contexts)

| Context | Provider | State | Consumers |
|---------|----------|-------|-----------|
| `AuthContext` | `AuthProvider` | `isAuthenticated`, `isAdmin`, `user`, `isLoading` | All protected components |
| `GeoFilterContext` | `GeoFilterProvider` | `filter` (level, region, division, subdivision, circle, block, village) | Dashboard, map, data pages |
| `RegionFilterContext` | `RegionFilterProvider` | `selectedRegion` | Dashboard components |
| `PageContext` | `PageContextProvider` | `currentPage` (chlorine/pressure/lpcd/dashboard/etc.) | Chatbot for context-aware responses |
| `TranslationContext` | `TranslationProvider` | `language` (en/hi/mr/...), `translationEnabled`, `translations` cache | All text-displaying components |
| `ChatbotContext` | `ChatbotProvider` | Chatbot open/close state | Chatbot widget |
| `FilterContext` | `FilterContextProvider` | `setSelectedRegion`, `setStatusFilter` | Chatbot → Dashboard filter bridge |

**Context Provider Hierarchy** (from `App.tsx`):
```
ThemeProvider
  └── AuthProvider
      └── ChatbotProvider
          └── GeoFilterProvider
              └── RegionFilterProvider
                  └── PageContextProvider
                      └── TranslationProvider
                          └── [App Content]
```

## 10.2 Server State (TanStack React Query)

The application uses TanStack React Query for all API data:

**Query Client Configuration** (`lib/queryClient.ts`):
- `staleTime: Infinity` — Data never auto-refetches
- `refetchOnWindowFocus: false` — No refetch on tab focus
- `retry: false` — No automatic retries
- `credentials: "include"` — Send session cookies with all requests

## 10.3 Local State Patterns

- **Page-level state**: Each page component manages its own filter state, pagination, and selected items via `useState`
- **localStorage persistence**: Language preference (`preferredLanguage`), translation toggle (`translationEnabled`)

---

# PHASE 11 — AUTHENTICATION & AUTHORIZATION

## 11.1 Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    participant DB

    User->>Browser: Enter credentials
    Browser->>Server: POST /api/auth/login {username, password}
    Server->>DB: Query users table
    DB->>Server: User record (with hashed password)
    Server->>Server: Compare password (plain text comparison!)
    alt Password matches
        Server->>Server: Set session (userId, isAdmin)
        Server->>Browser: 200 {isAdmin, user}
        Browser->>Browser: setIsAuthenticated(true)
        Browser->>Browser: Redirect to /dashboard
    else Password mismatch
        Server->>Browser: 401 Unauthorized
        Browser->>Browser: Show error message
    end
```

## 11.2 Session Configuration

```typescript
session({
  secret: process.env.SESSION_SECRET || randomBytes(32).toString("hex"),
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: "/api",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
})
```

## 11.3 Authorization Levels

| Middleware | Check | Used By |
|-----------|-------|---------|
| `requireAuth` | `session.userId` exists | All user routes |
| `requireAdmin` | `session.userId` AND `session.isAdmin` | Admin routes |
| `requireApiKeyOrAuth` | Valid API key header OR valid session | External API + user routes |
| None | No authentication | Public routes, acknowledge endpoint |

## 11.4 Role System

| Role | Permissions |
|------|------------|
| `user` | View all dashboards, create helpdesk tickets, download reports |
| `admin` | All user permissions + import data, manage reports, view login logs, manage helpdesk, monthly reports |

---

# PHASE 12 — FILES, STORAGE & ASSETS

## 12.1 Static Assets

| Asset | Path | Format | Purpose |
|-------|------|--------|---------|
| Maharashtra Map SVG | `public/Maharashtra_Divisions_Eng.svg` | SVG (295KB) | Interactive region map |
| Maharashtra TopoJSON | `public/maharashtra.topo.json` | JSON | Map topology data |
| Maharashtra Districts GeoJSON | `public/maharashtra_districts.geojson` | GeoJSON | District boundaries |
| JJM Logo | `public/jal-jeevan-mission-logo.svg` | SVG | Mission logo |
| Favicon | `public/favicon.svg` | SVG | Browser favicon |
| Maharashtra Map PNG | `public/maharashtra-map.png` | PNG (123KB) | Static map image |
| App Logo | `logo.png` | PNG | Application logo |
| ESR Image | `Esr.png` | PNG | ESR reference image |
| LPCD Template | `templates/lpcd_data_template.xlsx` | XLSX | Import template |

## 12.2 Upload System

- **Multer middleware** with memory storage (5MB limit)
- Upload directory: `uploads/`
- Supported formats: CSV, XLSX, XLS
- Helpdesk attachments stored with original + stored filenames

## 12.3 Embedded Assets

- Logo as Base64: `lib/logo-base64.ts` (43KB)
- PTSerif fonts: `lib/ptserif-fonts.ts` (1.1MB) — embedded for PDF generation
- Submitted-to logo: `lib/submitted-to-logo-base64.ts` (247KB)

---

# PHASE 13 — SECURITY AUDIT

## 13.1 Critical Findings

> [!CAUTION]
> **Password Storage**: Passwords are compared as plain text in the database. The `shared/schema.ts` stores passwords in a `text` column with no hashing. The login flow in `routes.ts` performs direct string comparison.

> [!CAUTION]
> **Hardcoded MQTT Credentials**: MQTT broker credentials are hardcoded as fallback defaults in `mqtt-service.ts`: `username: "MQTT"`, `password: "Mqtt@123"`.

> [!WARNING]
> **SSL Certificate in Repository**: `certificate.pem` and `privatekey.pem` are committed to the repository.

> [!WARNING]
> **Default Admin Credentials**: Default admin login `admin/admin123` documented in README.md.

> [!WARNING]
> **API Key Hardcoded**: `EXTERNAL_API_KEY` defaults to `"MAHAJAL_IOT_SECURE_KEY_25"` in `routes.ts`.

> [!WARNING]
> **Database Credentials in `.env.example`**: Contains actual database password `Salunke@123`.

## 13.2 Security Headers (Implemented)

The server sets security headers in `server/index.ts`:
- `X-Frame-Options: SAMEORIGIN`
- `Content-Security-Policy` (restrictive policy)
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=31536000`
- `Permissions-Policy` (camera, microphone, geolocation denied)
- `Referrer-Policy: strict-origin-when-cross-origin`

---

# PHASE 14 — PERFORMANCE ANALYSIS

## 14.1 Large File Concerns

| File | Size | Concern |
|------|------|---------|
| `server/storage.ts` | 515KB | Monolithic storage layer — should be split by domain |
| `server/routes.ts` | 188KB (5165 lines) | Route registration file — partially mitigated by route modules |
| `client/src/components/chatbot/ChatbotComponent.tsx` | 803KB | Extremely large single component |
| `client/src/pages/chlorine/DetailedChlorinePage.tsx` | 1MB | Extremely large single page |
| `client/src/pages/water-consumption.tsx` | 136KB | Large single page |
| `server/routes/chlorine-routes.ts` | 361KB | Very large route module |
| `server/routes/category-data-routes.ts` | 225KB | Very large route module |
| `server/routes/water-scheme-routes.ts` | 117KB | Large route module |
| `server/routes/pressure-routes.ts` | 100KB | Large route module |
| `server/setup-db.ts` | 67KB | Large setup script |

## 14.2 MQTT Optimization

The MQTT service implements batch processing for performance:
- Messages cached in memory `Map`
- Database updates batched every 10 seconds
- Duplicate messages within 5 seconds are skipped
- Messages truncated at 10,000 characters

## 14.3 Query Client Optimization

- `staleTime: Infinity` prevents unnecessary re-fetches
- `refetchOnWindowFocus: false` prevents tab-switch re-fetches
- No retry logic to prevent cascade failures

---

# PHASE 15 — FEATURE INVENTORY

## 15.1 Master Feature Catalog

| # | Feature | Description | Frontend Files | Backend Files | APIs |
|---|---------|-------------|----------------|---------------|------|
| 1 | **User Authentication** | Login, register, forgot password, session management | `login.tsx`, `register.tsx`, `forgot-password.tsx`, `use-auth.tsx` | `routes.ts` (auth endpoints) | `/api/auth/*` |
| 2 | **Main Dashboard** | Central statistics overview with charts, maps, regional metrics | `dashboard.tsx` (66KB), `stats-cards.tsx`, `region-comparison-chart.tsx` | `routes.ts`, `storage.ts` | Multiple `/api/*` |
| 3 | **Scheme Management** | List, search, filter, view detail of water schemes | `schemes.tsx`, `scheme-details.tsx` (68KB), `scheme-table.tsx` | `water-scheme-routes.ts`, `scheme-analysis-routes.ts` | `/api/water-scheme-data/*` |
| 4 | **LPCD Monitoring** | Village-level LPCD tracking with 7-day rolling window | `pages/lpcd/`, `SchemeLpcdPage.tsx` | `scheme-lpcd-routes.ts`, `water-scheme-routes.ts` | `/api/scheme-lpcd-data/*`, `/api/water-scheme-data/*` |
| 5 | **Chlorine Monitoring** | ESR-level chlorine measurement tracking | `pages/chlorine/` (ChlorineDashboard 141KB, DetailedChlorinePage 1MB) | `chlorine-routes.ts` (361KB) | `/api/chlorine/*` |
| 6 | **Pressure Monitoring** | ESR-level pressure measurement tracking | `pages/pressure/` (PressureDashboard 147KB) | `pressure-routes.ts` (100KB) | `/api/pressure/*` |
| 7 | **Water Consumption** | ESR-level water consumption analysis | `water-consumption.tsx` (136KB) | `water-consumption-routes.ts` | `/api/water-consumption/*` |
| 8 | **Communication Status** | Sensor online/offline monitoring | `CommunicationStatusPage.tsx` (72KB), `CommunicationOverviewCards.tsx` | `communication-status-routes.ts` | `/api/communication-status/*` |
| 9 | **Maharashtra Map** | Interactive SVG/GeoJSON map with region drill-down | `Maharashtra.tsx` (69KB), 15+ map components | GeoJSON data files | Static data |
| 10 | **MQTT Monitor** | Real-time MQTT topic monitoring | `MqttMonitor.tsx`, `MqttTopicConfiguration.tsx` | `mqtt-service.ts`, `routes.ts` | `/api/check-topic/*`, `/api/mqtt-topic-config/*` |
| 11 | **AI Chatbot** | NLP-powered chatbot with voice input/output | `ChatbotComponent.tsx` (803KB), `VoiceRecognition.tsx`, `TextToSpeech.tsx`, chatbot widgets | `nlp-chatbot-routes.ts`, `openai-service.ts`, `chatbot-helpdesk-service.ts` | `/api/nlp-chatbot/*`, `/api/ai/*` |
| 12 | **Helpdesk System** | Ticket creation, tracking, admin management | `helpdesk/` (raise-issue, track-tickets, admin-helpdesk, ticket-details) | `helpdesk-routes.ts` | `/api/helpdesk/*` |
| 13 | **Issue Reporting** | Justification/remark system for failed parameters | `IssueReportingForm.tsx` (48KB) | `issue-reporting-routes.ts` | `/api/issue-reporting/*` |
| 14 | **Email Alerts** | Daily automated critical alerts to engineers | - | `cron/daily-alerts.ts`, `services/email-service.ts` | Cron job |
| 15 | **SMS Notifications** | SMS alerts to vendors | - | `services/sms-service.ts` | Internal |
| 16 | **Data Import** | CSV/Excel data import for all data types | `admin/` importers, `csv-importer.tsx`, `scheme-importer.tsx` | `routes/admin/import-csv.ts`, `scheme-lpcd-importer.ts` | `/api/admin/import-*` |
| 17 | **Report Generation** | PDF and Excel report download | `ReportDownloadList.tsx`, `pdf-generator-professional.ts` (113KB) | `routes/reports.ts`, `smart-reports-routes.ts` | `/api/reports/*`, `/api/smart-reports/*` |
| 18 | **Monthly Reports** | Monthly aggregated report generation | `monthly-reports.tsx` | `monthly-reports-routes.ts` | `/api/monthly-reports/*` |
| 19 | **Multi-language Support** | Translation to 10 Indian languages | `TranslationContext.tsx`, `language-selector.tsx`, `translations.ts` | `routes/translation.ts` | `/api/translation/translate` |
| 20 | **Population Tracking** | Daily population tracking with historical trends | `PopulationDashboard.tsx`, `flip-population-cards.tsx` | `population-routes.ts` | `/api/population-tracking/*` |
| 21 | **PI Web API Integration** | Automated data sync from OSIsoft PI Vision | - | `cron/pi-*-ingestion.ts` (7 cron jobs), `services/pi-web-api-service.ts` | Internal cron |
| 22 | **Alerts & Progress** | Email alert tracking with acknowledgement | `alerts-progress.tsx` | `alerts-progress-routes.ts`, `acknowledge-routes.ts` | `/api/alerts-progress/*`, `/api/acknowledge` |
| 23 | **User Activity Logging** | Login logs, file downloads, page visits | `use-activity-tracker.ts`, `use-comprehensive-activity-tracker.ts` | `routes.ts` (activity logging) | `/api/admin/login-logs` |
| 24 | **Admin Dashboard** | Admin control panel with system overview | `admin/dashboard.tsx` | Admin routes | `/api/admin/*` |
| 25 | **Smart Reports** | AI-powered analytical report generation | `smart-reports.tsx` | `smart-reports-routes.ts` | `/api/smart-reports/*` |
| 26 | **Region Analysis** | Region-level statistical comparison | `regions.tsx`, `region-comparison-chart.tsx`, `region-heatmap.tsx` | Various routes | Multiple endpoints |
| 27 | **Vendor Management** | Vendor/agency contact management | - | `routes.ts` (vendor endpoints) | `/api/vendors` |
| 28 | **Theme Support** | Light/dark mode with shadcn/ui theming | `theme-provider.tsx` | - | - |

---

# PHASE 16 — DEPENDENCY MAPPING

## 16.1 Internal Dependency Graph

```mermaid
graph TD
    subgraph "Entry Points"
        MainTSX["main.tsx"]
        ServerIndex["server/index.ts"]
    end

    subgraph "Core Shared"
        Schema["shared/schema.ts"]
    end

    subgraph "Client Core"
        App["App.tsx"]
        QueryClient["lib/queryClient.ts"]
        UseAuth["hooks/use-auth.tsx"]
    end

    subgraph "Server Core"
        Routes["server/routes.ts"]
        Storage["server/storage.ts"]
        DB["server/db.ts"]
        MQTT["server/mqtt-service.ts"]
    end

    MainTSX --> App
    MainTSX --> QueryClient
    App --> UseAuth
    App --> Pages
    Pages --> Components
    Components --> UIComponents

    ServerIndex --> Routes
    ServerIndex --> DB
    ServerIndex --> MQTT
    ServerIndex --> CronJobs

    Routes --> Storage
    Routes --> Services
    Storage --> DB
    Storage --> Schema
    DB --> Schema

    CronJobs --> Services
    CronJobs --> Storage
```

---

# PHASE 17 — ENGINEERING KNOWLEDGE TRANSFER

## 17.1 How to Run

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Python 3.11+ (optional, for NLP service)

### Installation
```bash
cd dashboard9
npm install
```

### Environment Setup
```bash
cp .env.example .env
# Edit .env with your database credentials:
# DATABASE_URL=postgresql://user:pass@localhost:5432/water_scheme_dashboard
# PGUSER=postgres
# PGHOST=localhost
# PGPASSWORD=your_password
# PGDATABASE=water_scheme_dashboard
# PGPORT=5432
# OPENAI_API_KEY=sk-... (optional, for AI features)
# GMAIL_USER=... (optional, for email alerts)
# GMAIL_PASSWORD=... (optional, for email alerts)
```

### Running Development Server
```bash
npm run dev
# Server starts on http://localhost:5000
# Vite HMR enabled for frontend development
```

### Building for Production
```bash
npm run build
npm start
```

### Default Login
- **Username**: `admin`
- **Password**: `admin123`

## 17.2 How to Debug

### Common Issues

| Issue | Cause | Solution |
|-------|-------|---------|
| `DATABASE_URL not set` | Missing environment variable | Set `DATABASE_URL` in `.env` |
| Tables not created | First run without migration | Server auto-creates tables on startup via `setup-db.ts` |
| MQTT connection failed | Broker unreachable | Check `MQTT_HOST` environment variables |
| Email sending failed | Missing SMTP credentials | Set `GMAIL_USER` and `GMAIL_PASSWORD` |
| Map not rendering | Missing GeoJSON files | Check `public/` directory for `.geojson` files |
| Large page slow to load | 800KB+ component files | Known issue — components need splitting |

### Logging
- Server logs API requests with method, path, status, and duration (truncated to 80 chars)
- MQTT service logs batch processing counts
- Email service logs success/failure per recipient

## 17.3 How to Extend

### Adding a New Data Type (e.g., "Temperature Monitoring")

1. **Schema**: Add table definition in `shared/schema.ts` following the existing pattern (7-day rolling + history table)
2. **Storage**: Add CRUD methods in `server/storage.ts`
3. **Routes**: Create `server/routes/temperature-routes.ts` following `chlorine-routes.ts` pattern
4. **Register Route**: Mount in `server/routes.ts`
5. **Frontend Page**: Create `client/src/pages/temperature/` with dashboard and import components
6. **Navigation**: Add route in `App.tsx` and sidebar link in `components/dashboard/sidebar.tsx`
7. **Cron Job**: Create `server/cron/pi-temperature-ingestion.ts` if PI Web API integration needed

### Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Database tables | snake_case | `water_scheme_data` |
| Database columns | snake_case | `scheme_id`, `village_name` |
| TypeScript types | PascalCase | `WaterSchemeData`, `InsertChlorineData` |
| React components | PascalCase | `ChlorineDashboard.tsx` |
| React hooks | camelCase with `use` prefix | `useAuth`, `useGeoFilter` |
| API endpoints | kebab-case | `/api/water-scheme-data/regional-stats` |
| Route files | kebab-case | `chlorine-routes.ts` |
| CSS classes | kebab-case or camelCase | `.dashboard-card`, `.metric-value` |

---

# PHASE 18 — AI RECONSTRUCTION GUIDE

## 18.1 Architecture Patterns

### Pattern: Monolithic Full-Stack with Domain Modules
- Single Express server serves both API and static React build
- Route modules organized by domain (chlorine, pressure, LPCD, etc.)
- Shared TypeScript schema between frontend and backend
- Database accessed through a centralized storage layer

### Pattern: 7-Day Rolling Window + History
Every data type (LPCD, chlorine, pressure, water consumption) follows this pattern:
- **Current table**: Stores 7 columns for values + 7 columns for dates (denormalized for fast reads)
- **History table**: Stores individual date+value rows (normalized for historical queries)
- On data import: update both tables simultaneously

### Pattern: Geographic Hierarchy Filtering
All data queries support filtering by: `region → circle → division → sub_division → block → scheme_id → village_name → esr_name`

### Pattern: Composite Primary Keys
Data tables use composite PKs like `(scheme_id, village_name, block)` instead of auto-incrementing IDs, with `ON CONFLICT ... DO UPDATE` for upserts.

## 18.2 UI Patterns

### Pattern: Dashboard Page
Each dashboard page follows this structure:
1. Header with geographic filter dropdowns (Region, Division, Block)
2. Summary stat cards showing counts/totals
3. Data table with search, sort, pagination
4. Charts (Recharts bar/pie charts)
5. Export buttons (Excel, PDF)

### Pattern: Data Import Page
1. File upload dropzone (CSV/Excel)
2. Column mapping preview
3. Validation results display
4. Import progress indicator
5. Success/error summary

### Pattern: Chatbot Integration
- Floating chatbot button (bottom-right)
- Modal chatbot window with message history
- Context-aware responses based on current page (PageContext)
- Voice input via Web Speech API
- Text-to-speech output
- Region filter applied from chatbot commands

## 18.3 API Patterns

### Pattern: Regional Statistics Endpoint
```
GET /api/{domain}/regional-stats?region=Nashik&block=Dindori
→ Returns: { regionName, totalSchemes, totalVillages, [domainMetrics] }
```

### Pattern: History Endpoint
```
GET /api/{domain}/history/:schemeId?days=30
→ Returns: [{ date, value, village_name?, esr_name? }]
```

### Pattern: CSV Import Endpoint
```
POST /api/{domain}/import
Content-Type: multipart/form-data
Body: file (CSV/Excel)
→ Returns: { success, imported, errors, total }
```

## 18.4 Folder Conventions

```
client/src/
  pages/         # Route-level components (one file or folder per route)
  components/    # Reusable components organized by domain
    ui/          # shadcn/ui primitives (never modified)
    dashboard/   # Dashboard-specific components
    {domain}/    # Domain-specific components
  hooks/         # Custom React hooks (use-*.ts)
  contexts/      # React contexts (*Context.tsx)
  lib/           # Utility libraries
  services/      # API integration services
  data/          # Static data (GeoJSON, regions)

server/
  routes/        # Express route modules (*-routes.ts)
  services/      # Backend services (*-service.ts)
  cron/          # Scheduled jobs (pi-*-ingestion.ts, daily-alerts.ts)
```

## 18.5 State Patterns

- **Server state**: TanStack React Query with infinite stale time
- **Auth state**: React Context with session-based persistence
- **Filter state**: React Context (GeoFilterContext, RegionFilterContext)
- **UI state**: Component-local useState
- **Language preference**: localStorage persistence

## 18.6 Design System Patterns

- **Component library**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with CSS variables for theming
- **Fonts**: Poppins (body), Montserrat (headings), Inter (data/UI)
- **Icons**: Lucide React (primary), React Icons (supplementary)
- **Charts**: Recharts (primary), Chart.js (secondary)
- **Maps**: Leaflet + React-Leaflet + custom SVG maps
- **Animations**: CSS keyframes + Framer Motion
- **Color scheme**: HSL-based CSS variables via shadcn/ui theme system

---

# APPENDIX A — Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `PGUSER` | Yes | `postgres` | PostgreSQL username |
| `PGHOST` | Yes | `localhost` | PostgreSQL host |
| `PGPASSWORD` | Yes | - | PostgreSQL password |
| `PGDATABASE` | Yes | `water_scheme_dashboard` | Database name |
| `PGPORT` | Yes | `5432` | PostgreSQL port |
| `PORT` | No | `5000` | Server port |
| `NODE_ENV` | No | `development` | Environment mode |
| `SESSION_SECRET` | No | Random | Express session secret |
| `OPENAI_API_KEY` | No | - | OpenAI API key for chatbot |
| `EXTERNAL_API_KEY` | No | `MAHAJAL_IOT_SECURE_KEY_25` | External API authentication key |
| `MQTT_HOST` | No | `14.99.99.166` | Primary MQTT broker |
| `MQTT_PORT` | No | `1889` | Primary MQTT port |
| `MQTT_USERNAME` | No | `MQTT` | MQTT username |
| `MQTT_PASSWORD` | No | `Mqtt@123` | MQTT password |
| `MQTT_HOST_2` | No | `49.50.99.188` | Secondary MQTT broker |
| `MQTT_PORT_2` | No | `1883` | Secondary MQTT port |
| `GMAIL_USER` | No | - | Gmail SMTP sender |
| `GMAIL_PASSWORD` | No | - | Gmail app password |
| `SMTP_HOST` | No | `smtp.gmail.com` | SMTP host |
| `SMTP_PORT` | No | `465` | SMTP port |
| `RESEND_API_KEY` | No | - | Resend email API key |
| `APP_BASE_URL` | No | `https://dashboard1.mahajaliot.in` | Application base URL |
| `NLP_SERVICE_PORT` | No | `8001` | Python NLP service port |

---

# APPENDIX B — Cron Job Schedule

| Job | File | Trigger | Purpose |
|-----|------|---------|---------|
| Daily Alerts | `cron/daily-alerts.ts` | Server startup + daily | Send critical parameter alert emails to engineers |
| PI Chlorine Ingestion | `cron/pi-chlorine-ingestion.ts` | Server startup | Sync chlorine data from PI Web API |
| PI Pressure Ingestion | `cron/pi-pressure-ingestion.ts` | Server startup | Sync pressure data from PI Web API |
| PI Water Scheme Ingestion | `cron/pi-water-scheme-ingestion.ts` | Server startup | Sync water/LPCD data from PI Web API |
| PI Scheme LPCD Ingestion | `cron/pi-scheme-lpcd-ingestion.ts` | Server startup | Sync scheme-level LPCD from PI Web API |
| PI Water Consumption Ingestion | `cron/pi-water-consumption-ingestion.ts` | Server startup | Sync water consumption from PI Web API |
| PI Communication Status Ingestion | `cron/pi-communication-status-ingestion.ts` | Server startup | Sync communication status from PI Web API |
| Data Cleanup | `server/data-cleanup.ts` | Server startup (5s delay) | Clean stale/invalid data |
| MQTT Batch Processor | `server/mqtt-service.ts` | Every 10 seconds | Flush cached MQTT messages to database |

---

# APPENDIX C — External System Integrations

## PI Web API (OSIsoft)
- **Service**: `server/services/pi-web-api-service.ts`
- **Purpose**: Industrial IoT data platform for water sensors
- **Data Flow**: Cron jobs poll PI Web API → Transform data → Upsert to PostgreSQL
- **Endpoint**: `https://dashboard1.mahajaliot.in` (production)

## MQTT Brokers
- **Service**: `server/mqtt-service.ts`
- **Brokers**: 2 (Primary: 14.99.99.166:1889, Secondary: 49.50.99.188:1883)
- **Subscription**: Wildcard `#` (all topics)
- **Data Flow**: IoT sensors → MQTT → Express MQTT client → PostgreSQL `topics_last_seen`

## OpenAI / Anthropic
- **Service**: `server/services/openai-service.ts`
- **Purpose**: Chatbot responses, smart report generation
- **Models**: GPT-4 / Claude (configurable)

## Google Cloud Translation
- **Service**: Via `@google-cloud/translate`
- **Purpose**: Multi-language translation (10 Indian languages)

## Email (SMTP / Resend)
- **Service**: `server/services/email-service.ts`
- **Primary**: Gmail SMTP (port 465)
- **Fallback**: Resend API
- **Templates**: Ticket created, ticket resolved, ticket reopened, daily alerts, offline sensors

---

*End of Master Knowledge Base*
