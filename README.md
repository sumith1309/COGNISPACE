<div align="center">

# COGNISPACE

### Enterprise AI Service Platform

Build intelligent products that think, adapt, and scale.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.182-black?logo=three.js)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#license)

[Live Demo](#) &bull; [Documentation](#api-endpoints) &bull; [Getting Started](#getting-started)

</div>

---

## Overview

Cognispace is an enterprise-grade AI service platform that provides modern development teams with the tools and infrastructure to build, deploy, and scale AI-powered applications. The platform features a premium marketing site with immersive 3D visuals, a comprehensive developer dashboard, interactive AI playground, and a robust API layer.

**Strategic Vision:**

- Establish Cognispace as a premium AI technology studio through world-class design and engineering
- Provide a frictionless developer experience with interactive demos, comprehensive API docs, and self-service onboarding
- Generate qualified enterprise leads through a sophisticated inquiry and engagement funnel

---

## Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        Browser["Browser / Mobile"]
        SDK_PY["Python SDK"]
        SDK_JS["JavaScript SDK"]
        CURL["cURL / REST"]
    end

    subgraph Presentation["Presentation Layer"]
        NEXT["Next.js 16 App Router<br/>React Server Components<br/>Turbopack"]
        TW["Tailwind CSS v4<br/>Design System"]
        THREE["Three.js<br/>3D Hero Scene"]
        FM["Framer Motion<br/>Animations"]
    end

    subgraph API["API Gateway"]
        EXPRESS["Node.js / Express<br/>tRPC + REST"]
        RATE["Rate Limiter<br/>Redis Sliding Window"]
        AUTH_MW["Auth Middleware<br/>JWT + API Key"]
    end

    subgraph Services["Application Services"]
        AUTH_SVC["Auth Service<br/>NextAuth / JWT"]
        AI_SVC["AI Service<br/>Model Inference"]
        BILLING["Billing Service<br/>Stripe Integration"]
        CMS["CMS Service<br/>Blog / Docs"]
        SUPPORT["Support Service<br/>Ticketing"]
    end

    subgraph Data["Data Layer"]
        PG["PostgreSQL 16<br/>Primary Database"]
        REDIS["Redis 7<br/>Cache / Sessions / Queues"]
        S3["S3 / CDN<br/>Static Assets"]
    end

    subgraph Infra["Infrastructure"]
        ECS["AWS ECS Fargate<br/>Container Orchestration"]
        CF["CloudFront CDN<br/>Edge Distribution"]
        R53["Route 53<br/>DNS Management"]
    end

    subgraph Observability["Observability"]
        DD["Datadog<br/>APM + Metrics"]
        SENTRY["Sentry<br/>Error Tracking"]
        PD["PagerDuty<br/>Alerting"]
    end

    Browser --> NEXT
    SDK_PY --> EXPRESS
    SDK_JS --> EXPRESS
    CURL --> EXPRESS

    NEXT --> TW
    NEXT --> THREE
    NEXT --> FM
    NEXT --> EXPRESS

    EXPRESS --> RATE
    EXPRESS --> AUTH_MW
    AUTH_MW --> AUTH_SVC
    AUTH_MW --> AI_SVC
    AUTH_MW --> BILLING
    AUTH_MW --> CMS
    AUTH_MW --> SUPPORT

    AUTH_SVC --> PG
    AI_SVC --> PG
    AI_SVC --> REDIS
    BILLING --> PG
    CMS --> PG
    SUPPORT --> PG

    Services --> REDIS
    NEXT --> CF
    ECS --> Services
    CF --> S3

    Services --> DD
    Services --> SENTRY
    DD --> PD

    style Client fill:#f0f4ff,stroke:#3b82f6,color:#1e3a8a
    style Presentation fill:#eff6ff,stroke:#3b82f6,color:#1e3a8a
    style API fill:#f5f3ff,stroke:#8b5cf6,color:#4c1d95
    style Services fill:#ecfdf5,stroke:#10b981,color:#065f46
    style Data fill:#fefce8,stroke:#eab308,color:#713f12
    style Infra fill:#fef2f2,stroke:#ef4444,color:#7f1d1d
    style Observability fill:#f0fdf4,stroke:#22c55e,color:#166534
```

---

## Database Schema

```mermaid
erDiagram
    USERS ||--o{ API_KEYS : generates
    USERS ||--o{ USAGE_LOGS : creates
    USERS }o--|| ORGANIZATIONS : belongs_to
    ORGANIZATIONS ||--o{ SUBSCRIPTIONS : subscribes
    SUBSCRIPTIONS ||--o{ INVOICES : generates
    AI_MODELS ||--o{ DEPLOYMENTS : deployed_as
    DEPLOYMENTS ||--o{ USAGE_LOGS : tracked_in
    USERS ||--o{ SUPPORT_TICKETS : submits

    USERS {
        uuid id PK
        varchar email UK
        varchar password_hash
        varchar full_name
        text avatar_url
        enum role "admin | developer | viewer"
        uuid org_id FK
        boolean email_verified
        boolean mfa_enabled
        timestamptz created_at
    }

    ORGANIZATIONS {
        uuid id PK
        varchar name
        varchar slug UK
        enum plan "free | starter | pro | enterprise"
        timestamptz created_at
    }

    API_KEYS {
        uuid id PK
        uuid user_id FK
        varchar key_hash
        varchar key_prefix
        varchar name
        text[] scopes
        integer rate_limit
        timestamptz last_used_at
        timestamptz revoked_at
        timestamptz created_at
    }

    SUBSCRIPTIONS {
        uuid id PK
        uuid org_id FK
        varchar stripe_sub_id UK
        enum plan
        enum status "active | past_due | canceled | trialing"
        timestamptz current_period_start
        timestamptz current_period_end
        boolean cancel_at_period_end
    }

    AI_MODELS {
        uuid id PK
        varchar name
        enum category "nlp | vision | audio | multimodal | embedding"
        text description
        jsonb config
        boolean active
    }

    USAGE_LOGS {
        bigserial id PK
        uuid user_id FK
        uuid api_key_id FK
        uuid model_id FK
        varchar endpoint
        smallint status_code
        integer tokens_input
        integer tokens_output
        integer latency_ms
        timestamptz created_at
    }

    SUPPORT_TICKETS {
        uuid id PK
        uuid user_id FK
        varchar subject
        enum priority "low | medium | high | urgent"
        enum status "open | in_progress | resolved | closed"
        timestamptz created_at
    }

    INVOICES {
        uuid id PK
        uuid subscription_id FK
        integer amount_cents
        enum status "draft | open | paid | void"
        timestamptz due_date
    }

    DEPLOYMENTS {
        uuid id PK
        uuid model_id FK
        varchar version
        enum status "active | deprecated | staging"
        timestamptz deployed_at
    }
```

---

## User Journey

```mermaid
journey
    title Cognispace User Journey
    section Discovery
      Visit landing page: 5: Visitor
      Explore 3D hero section: 4: Visitor
      Browse capabilities: 4: Visitor
      View pricing plans: 3: Visitor
    section Onboarding
      Sign up for free tier: 5: User
      Verify email: 3: User
      Complete onboarding wizard: 4: User
      Create first API key: 5: User
    section Building
      Test models in Playground: 5: Developer
      Integrate SDK: 4: Developer
      Make first API call: 5: Developer
      Monitor usage dashboard: 4: Developer
    section Scaling
      Upgrade to Pro plan: 4: Customer
      Configure webhooks: 3: Customer
      Add team members: 4: Customer
      Enterprise inquiry: 5: Customer
```

---

## Application Flow

```mermaid
flowchart LR
    subgraph Marketing["Marketing Site"]
        HOME["Homepage<br/>8 Sections + 3D Hero"]
        PRICING["Pricing<br/>Calculator + Comparison"]
        SOLUTIONS["Solutions<br/>Industry Use Cases"]
        ABOUT["About"]
        CONTACT["Contact"]
        BLOG["Blog"]
    end

    subgraph Auth["Authentication"]
        SIGNIN["Sign In<br/>Email + OAuth"]
        SIGNUP["Sign Up<br/>Multi-step Form"]
        VERIFY["Email Verification"]
        FORGOT["Forgot Password"]
        RESET["Reset Password"]
    end

    subgraph Dashboard["User Dashboard"]
        OVERVIEW["Overview<br/>Key Metrics"]
        PLAYGROUND["AI Playground<br/>Model Testing"]
        MODELS["Model Catalog<br/>Browse + Filter"]
        KEYS["API Keys<br/>CRUD + Scopes"]
        USAGE["Usage Analytics<br/>Charts + Breakdown"]
        BILLING["Billing<br/>Plans + Invoices"]
        SETTINGS["Settings<br/>Profile + Prefs"]
        SUPPORT["Support<br/>Ticketing"]
    end

    HOME --> SIGNUP
    PRICING --> SIGNUP
    SIGNUP --> VERIFY
    VERIFY --> OVERVIEW
    SIGNIN --> OVERVIEW

    OVERVIEW --> PLAYGROUND
    OVERVIEW --> MODELS
    OVERVIEW --> KEYS
    OVERVIEW --> USAGE
    OVERVIEW --> BILLING
    OVERVIEW --> SETTINGS
    OVERVIEW --> SUPPORT

    PLAYGROUND --> MODELS
    MODELS --> PLAYGROUND
    KEYS --> USAGE
    USAGE --> BILLING

    style Marketing fill:#eff6ff,stroke:#3b82f6
    style Auth fill:#f5f3ff,stroke:#8b5cf6
    style Dashboard fill:#ecfdf5,stroke:#10b981
```

---

## Tech Stack

| Layer              | Technology                        | Purpose                                     |
| ------------------ | --------------------------------- | ------------------------------------------- |
| **Framework**      | Next.js 16.1.6 (App Router)       | SSR/SSG, React Server Components, Turbopack |
| **Language**       | TypeScript 5.9.3 (strict mode)    | End-to-end type safety                      |
| **UI Library**     | React 19.2.4                      | Component architecture                      |
| **Styling**        | Tailwind CSS 4.1.18               | Utility-first design system                 |
| **Components**     | Radix UI (18+ primitives)         | Accessible, unstyled UI components          |
| **3D Graphics**    | Three.js + React Three Fiber      | Immersive 3D hero scene                     |
| **Animations**     | Framer Motion 12.34 + GSAP 3.14   | Scroll-triggered, spring physics            |
| **State**          | Zustand 5.0 + TanStack Query 5.90 | Client state + async data                   |
| **Validation**     | Zod 4.3.6                         | Runtime schema validation                   |
| **Database**       | PostgreSQL 16                     | Primary relational data                     |
| **Cache**          | Redis 7                           | Sessions, queues, rate limiting             |
| **Payments**       | Stripe                            | Subscriptions, metered billing              |
| **Email**          | Resend                            | Transactional email                         |
| **Analytics**      | PostHog                           | Product analytics, funnels                  |
| **Monitoring**     | Datadog + Sentry                  | APM, error tracking                         |
| **CI/CD**          | GitHub Actions                    | Automated testing + deployment              |
| **Infrastructure** | AWS ECS Fargate + CloudFront      | Container orchestration + CDN               |
| **IaC**            | Terraform                         | Infrastructure as Code                      |

---

## Project Structure

```
cognispace-platform/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # Public marketing pages
│   │   │   ├── page.tsx              #   Homepage (8 sections + 3D hero)
│   │   │   ├── pricing/              #   Pricing with calculator
│   │   │   ├── solutions/            #   Industry solutions
│   │   │   ├── about/                #   Company info
│   │   │   ├── contact/              #   Contact form
│   │   │   └── blog/                 #   Blog listing + [slug]
│   │   ├── (dashboard)/              # Protected dashboard
│   │   │   └── dashboard/
│   │   │       ├── page.tsx          #   Overview
│   │   │       ├── playground/       #   AI model testing
│   │   │       ├── models/           #   Model catalog
│   │   │       ├── api-keys/         #   API key management
│   │   │       ├── usage/            #   Usage analytics
│   │   │       ├── billing/          #   Billing & subscriptions
│   │   │       ├── settings/         #   User settings
│   │   │       └── support/          #   Support center
│   │   ├── (auth)/                   # Authentication flows
│   │   │   └── auth/
│   │   │       ├── signin/
│   │   │       ├── signup/
│   │   │       ├── verify-email/
│   │   │       ├── forgot-password/
│   │   │       └── reset-password/
│   │   ├── api/                      # API routes
│   │   │   └── health/              #   Health check (Edge runtime)
│   │   ├── layout.tsx                # Root layout
│   │   ├── error.tsx                 # Error boundary
│   │   └── not-found.tsx             # 404 page
│   ├── components/
│   │   ├── ui/                       # Design system (18 components)
│   │   ├── layout/                   # Navbar, Footer, Sidebar, Topbar
│   │   ├── marketing/                # Landing page sections
│   │   │   ├── hero/                 #   3D hero (Three.js + Framer Motion)
│   │   │   ├── capabilities-section  #   Feature cards
│   │   │   ├── code-demo-section     #   Interactive code demo
│   │   │   ├── metrics-bar           #   Animated counters
│   │   │   ├── testimonials-section  #   Carousel
│   │   │   └── ...                   #   8 total sections
│   │   ├── dashboard/                # Dashboard components
│   │   └── shared/                   # Theme provider, Logo, Toast
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # Utilities, validators, constants
│   ├── config/                       # Site config, navigation
│   ├── types/                        # Global TypeScript types
│   ├── services/                     # API client layer
│   └── stores/                       # Zustand state stores
├── docker-compose.yml                # PostgreSQL + Redis + MailHog
├── Makefile                          # Development commands
├── tailwind.config.ts                # Design tokens & theme
├── next.config.ts                    # Next.js configuration
└── tsconfig.json                     # TypeScript strict config
```

---

## Key Features

### Landing Page

- **Immersive 3D Hero** — Floating glass spheres with `MeshTransmissionMaterial`, particle field, and glow ring rendered via Three.js with React Three Fiber
- **Word-by-Word Animated Headline** — Spring physics (stiffness: 100, damping: 30) with gradient text highlights
- **Infinite Scrolling Marquee** — Two-row, bi-directional company logo ticker with hover pause
- **Interactive Code Demo** — Tabbed code editor (Python/JS/cURL) with typewriter response panel
- **Animated Counters** — Scroll-triggered counting animation (99.9% uptime, <100ms latency, 10M+ calls, 500+ teams)
- **GSAP-Powered Timeline** — ScrollTrigger-driven connecting line in the How It Works section
- **Auto-Advancing Testimonials** — Framer Motion AnimatePresence carousel with dot navigation

### Dashboard

- **AI Playground** — Interactive model testing with streaming inference
- **Model Catalog** — Browse, filter, and test AI models
- **API Key Management** — Create, list, revoke keys with scope control
- **Usage Analytics** — Real-time charts, daily breakdowns, billing period tracking
- **Billing** — Stripe-powered subscriptions with usage-based metering

### Design System

- **18 Accessible UI Components** — Built on Radix UI with CVA variant management
- **Dark/Light Mode** — System-aware theming via next-themes with SSR-compatible cookie persistence
- **Brand Palette** — Blue (#3B82F6) primary, Violet (#8B5CF6) secondary, custom glow effects

---

## Pricing Tiers

```mermaid
graph LR
    subgraph Free["Starter — Free"]
        F1["1,000 API calls/mo"]
        F2["3 base models"]
        F3["20 req/min"]
        F4["Community support"]
    end

    subgraph Pro["Pro — $49/mo"]
        P1["100,000 API calls/mo"]
        P2["All models"]
        P3["200 req/min"]
        P4["Priority support"]
        P5["Advanced analytics"]
        P6["Webhooks"]
    end

    subgraph Enterprise["Enterprise — Custom"]
        E1["Unlimited API calls"]
        E2["Custom fine-tuned models"]
        E3["Custom rate limits"]
        E4["Dedicated support + SLA"]
        E5["SSO / SAML"]
        E6["99.99% uptime SLA"]
    end

    Free -.->|Upgrade| Pro
    Pro -.->|Upgrade| Enterprise

    style Free fill:#f0fdf4,stroke:#22c55e,color:#166534
    style Pro fill:#eff6ff,stroke:#3b82f6,color:#1e3a8a
    style Enterprise fill:#f5f3ff,stroke:#8b5cf6,color:#4c1d95
```

---

## API Endpoints

### Authentication & Identity

| Method  | Endpoint                   | Description              | Auth          |
| ------- | -------------------------- | ------------------------ | ------------- |
| `POST`  | `/v1/auth/register`        | Create new account       | Public        |
| `POST`  | `/v1/auth/login`           | Authenticate user        | Public        |
| `POST`  | `/v1/auth/refresh`         | Refresh access token     | Refresh Token |
| `POST`  | `/v1/auth/logout`          | Revoke session           | Bearer        |
| `POST`  | `/v1/auth/forgot-password` | Initiate password reset  | Public        |
| `POST`  | `/v1/auth/verify-email`    | Confirm email address    | Token         |
| `GET`   | `/v1/users/me`             | Get current user profile | Bearer        |
| `PATCH` | `/v1/users/me`             | Update profile           | Bearer        |

### AI Services

| Method | Endpoint                | Description              | Auth         |
| ------ | ----------------------- | ------------------------ | ------------ |
| `GET`  | `/v1/models`            | List available AI models | Bearer       |
| `GET`  | `/v1/models/:id`        | Get model details        | Bearer       |
| `POST` | `/v1/inference`         | Submit inference request | API Key      |
| `POST` | `/v1/inference/stream`  | Stream inference (SSE)   | API Key      |
| `GET`  | `/v1/playground/models` | Models for demo          | Public       |
| `POST` | `/v1/playground/run`    | Run playground inference | Rate Limited |

### API Key Management

| Method   | Endpoint           | Description            | Auth   |
| -------- | ------------------ | ---------------------- | ------ |
| `GET`    | `/v1/api-keys`     | List API keys          | Bearer |
| `POST`   | `/v1/api-keys`     | Create new API key     | Bearer |
| `PATCH`  | `/v1/api-keys/:id` | Update key name/scopes | Bearer |
| `DELETE` | `/v1/api-keys/:id` | Revoke API key         | Bearer |

### Billing & Usage

| Method | Endpoint                   | Description              | Auth   |
| ------ | -------------------------- | ------------------------ | ------ |
| `GET`  | `/v1/billing/subscription` | Get current subscription | Bearer |
| `POST` | `/v1/billing/subscribe`    | Create/change plan       | Bearer |
| `GET`  | `/v1/billing/invoices`     | List invoices            | Bearer |
| `GET`  | `/v1/billing/usage`        | Usage summary            | Bearer |
| `GET`  | `/v1/billing/usage/daily`  | Daily breakdown          | Bearer |

### Rate Limits

| Plan       | Requests/min | Requests/day | Concurrent |
| ---------- | ------------ | ------------ | ---------- |
| Free       | 20           | 1,000        | 2          |
| Starter    | 60           | 10,000       | 5          |
| Pro        | 200          | 100,000      | 20         |
| Enterprise | Custom       | Custom       | Custom     |

---

## Getting Started

### Prerequisites

- **Node.js** >= 20.x
- **pnpm** >= 10.x
- **Docker** (for local PostgreSQL, Redis, MailHog)

### Installation

```bash
# Clone the repository
git clone https://github.com/sumith1309/COGNISPACE.git
cd COGNISPACE/cognispace-platform

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start local services (PostgreSQL, Redis, MailHog)
make db-up

# Start development server with Turbopack
make dev
```

The app will be running at **http://localhost:3000**.

### Available Commands

```bash
make dev          # Start dev server with Turbopack
make build        # Build for production
make start        # Start production server
make lint         # Run ESLint
make lint-fix     # Auto-fix lint issues
make format       # Format with Prettier
make typecheck    # TypeScript validation
make check        # All quality checks (lint + typecheck + format)
make db-up        # Start PostgreSQL + Redis + MailHog
make db-down      # Stop local services
make db-reset     # Reset with clean volumes
```

---

## Implementation Roadmap

```mermaid
gantt
    title Cognispace Development Timeline
    dateFormat YYYY-MM-DD
    axisFormat %b %d

    section Phase 1: Foundation
    Project Init & Toolchain        :done, p1, 2026-02-01, 4d
    Design System (18 components)   :done, p2, after p1, 5d
    Layout Shell & Navigation       :done, p3, after p2, 4d
    Landing Page + 3D Hero          :done, p4, after p3, 5d
    Pricing Page + Calculator       :done, p5, after p4, 5d

    section Phase 2: Core Features
    Authentication System           :p6, after p5, 5d
    Database & ORM Setup            :p7, after p6, 4d
    API Server + tRPC               :p8, after p7, 5d
    API Key Management              :p9, after p8, 4d
    AI Playground                   :p10, after p9, 5d
    Usage Dashboard                 :p11, after p10, 5d
    Model Catalog                   :p12, after p11, 4d
    Developer Portal                :p13, after p12, 5d

    section Phase 3: Quality & Infra
    Testing (Unit + E2E)            :p14, after p13, 5d
    CI/CD Pipeline                  :p15, after p14, 4d
    Terraform Infrastructure        :p16, after p15, 5d
    Monitoring & Alerting           :p17, after p16, 3d
    Security Hardening              :p18, after p17, 4d

    section Phase 4: Polish & Launch
    SEO & Marketing Pages           :p19, after p18, 5d
    Performance Optimization        :p20, after p19, 4d
    Pre-Launch QA                   :p21, after p20, 3d
    Production Deployment           :p22, after p21, 3d
    Post-Launch Monitoring          :crit, p23, after p22, 5d
```

---

## Performance Targets

| Metric                   | Target  | Tool                 |
| ------------------------ | ------- | -------------------- |
| Lighthouse Performance   | 95+     | Google Lighthouse CI |
| First Contentful Paint   | < 1.2s  | Web Vitals           |
| Largest Contentful Paint | < 2.0s  | Web Vitals           |
| Time to Interactive      | < 2.5s  | Lighthouse           |
| Cumulative Layout Shift  | < 0.05  | Web Vitals           |
| First Input Delay        | < 50ms  | Web Vitals           |
| API Response (p95)       | < 200ms | Datadog APM          |
| AI Inference (p95)       | < 3s    | Custom metrics       |
| Uptime SLA               | 99.9%   | Uptime monitoring    |

---

## Security

The platform implements enterprise-grade security controls:

| Category               | Control                             | Implementation                        |
| ---------------------- | ----------------------------------- | ------------------------------------- |
| Authentication         | Multi-factor auth, OAuth 2.0        | NextAuth.js with JWT + refresh tokens |
| Authorization          | RBAC with fine-grained permissions  | Role-based access control             |
| Data Protection        | AES-256 at rest, TLS 1.3 in transit | AWS KMS, ACM certificates             |
| Input Validation       | Schema validation on all endpoints  | Zod schemas, parameterized queries    |
| Rate Limiting          | Tiered limits per plan              | Redis-backed sliding window           |
| DDoS Protection        | L3/L4/L7 mitigation                 | AWS Shield + WAF                      |
| Secrets Management     | Encrypted vault for API keys        | AWS Secrets Manager                   |
| Audit Logging          | Immutable event log                 | Structured logging                    |
| Vulnerability Scanning | Automated CI/CD scanning            | Snyk, container scanning              |

**Security Headers:**

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## Third-Party Integrations

```mermaid
graph TD
    COGNI["Cognispace Platform"] --> STRIPE["Stripe<br/>Payment Processing"]
    COGNI --> RESEND["Resend<br/>Transactional Email"]
    COGNI --> POSTHOG["PostHog<br/>Product Analytics"]
    COGNI --> DD["Datadog<br/>APM + Monitoring"]
    COGNI --> SENTRY["Sentry<br/>Error Tracking"]
    COGNI --> GH["GitHub Actions<br/>CI/CD Pipeline"]
    COGNI --> AWS["AWS<br/>ECS + CloudFront + S3"]

    style COGNI fill:#3b82f6,stroke:#1e40af,color:#fff
    style STRIPE fill:#635bff,stroke:#4f46e5,color:#fff
    style RESEND fill:#000,stroke:#333,color:#fff
    style POSTHOG fill:#1d4aff,stroke:#1e40af,color:#fff
    style DD fill:#632ca6,stroke:#4c1d95,color:#fff
    style SENTRY fill:#362d59,stroke:#2d2250,color:#fff
    style GH fill:#24292e,stroke:#1b1f23,color:#fff
    style AWS fill:#ff9900,stroke:#e68a00,color:#000
```

---

## Environment Variables

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://cognispace:cognispace@localhost:5432/cognispace

# Cache
REDIS_URL=redis://localhost:6379

# Authentication
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Payments
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...

# Analytics & Monitoring
NEXT_PUBLIC_POSTHOG_KEY=phc_...
SENTRY_DSN=https://...
```

---

## Development Workflow

```mermaid
flowchart LR
    DEV["Local Dev<br/>pnpm dev --turbo"] --> COMMIT["Git Commit<br/>Conventional Commits"]
    COMMIT --> HOOKS["Pre-commit Hooks<br/>lint-staged + prettier"]
    HOOKS --> PUSH["Git Push"]
    PUSH --> CI["CI Pipeline<br/>Lint → Typecheck → Test → Build"]
    CI --> PREVIEW["Preview Deploy<br/>Staging Environment"]
    PREVIEW --> REVIEW["Code Review<br/>PR + Lighthouse CI"]
    REVIEW --> MERGE["Merge to Main"]
    MERGE --> PROD["Production Deploy<br/>Blue-Green Strategy"]

    style DEV fill:#ecfdf5,stroke:#10b981
    style CI fill:#eff6ff,stroke:#3b82f6
    style PROD fill:#fef2f2,stroke:#ef4444
```

**Code Quality Enforcement:**

- **Husky** pre-commit hooks run lint-staged
- **Commitlint** enforces conventional commit messages (`feat:`, `fix:`, `chore:`, etc.)
- **Prettier** with Tailwind plugin for consistent formatting
- **ESLint** 10 with TypeScript strict rules
- **TypeScript** strict mode with `noUncheckedIndexedAccess`

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit using conventional commits: `git commit -m "feat: add new feature"`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a Pull Request

---

## License

This project is proprietary software. All rights reserved.

&copy; 2026 Cognispace. All rights reserved.

---

<div align="center">

**Built with precision by the Cognispace Engineering Team**

[Website](https://cognispace.com) &bull; [Twitter](https://twitter.com/cognispace) &bull; [LinkedIn](https://linkedin.com/company/cognispace) &bull; [Discord](https://discord.gg/cognispace)

</div>
