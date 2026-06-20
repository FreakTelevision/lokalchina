# LokalChina — Project Context for Claude Web

> Upload this file to a new conversation on claude.ai to give Claude full context of the project.

---

## 1. Project Overview

**LokalChina** is a PWA web app targeting foreigners coming to China. MVP covers **3 niche travel routes** with private local guides. Future expansion: medical tourism & supplier sourcing.

- **Live URL**: `https://lokalchina.com`
- **Hosting**: Vercel (Personal free plan)
- **Database**: Neon PostgreSQL (free tier)
- **Domain**: lokalchina.com (registered at Porkbun, DNS points to Vercel)

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.9 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui v4 (base-ui, not radix) |
| Database | PostgreSQL (Neon) + Prisma 7.8 |
| Auth | Auth.js v5 (credentials + JWT) |
| i18n | next-intl v4 (en/zh) |
| Payment | Stripe SDK (not yet configured) |
| Email | Resend SDK (not yet configured) |
| UI Components | shadcn/ui v4 based on @base-ui/react |

### Critical Version Notes
- **Next.js 16**: `params` and `searchParams` are Promises — must `await` them
- **Prisma 7**: Requires `adapter` (PrismaPg) in client constructor. Schema has NO `url` in datasource block — URL is in `prisma.config.ts`
- **Next.js 16**: `middleware.ts` is deprecated — uses `proxy.ts` at project root
- **shadcn/ui v4**: Uses `@base-ui/react` primitives, not Radix. No `asChild` prop on PopoverTrigger. No `type` prop on Accordion. Select `onValueChange` callback passes `string | null`
- **Zod v4**: Uses `.issues` not `.errors`

---

## 3. Directory Structure

```
china-travel-pwa/
├── proxy.ts                          # Next.js 16 proxy (replaces middleware)
├── next.config.ts                    # Next.js config + next-intl plugin
├── tsconfig.json                     # TypeScript config (noImplicitAny: false)
├── prisma.config.ts                  # Prisma 7 config (DATABASE_URL here)
├── prisma/
│   ├── schema.prisma                 # 14 data models
│   └── seed.ts                       # Seed script (3 routes, 3 guides)
├── messages/
│   ├── en.json                       # English translations (~200 keys)
│   └── zh.json                       # Chinese translations
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout (just passes children)
│   │   ├── page.tsx                  # Redirect / → /en
│   │   ├── [locale]/
│   │   │   ├── layout.tsx            # Main layout (html, body, providers)
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── routes/               # Route listing + detail
│   │   │   ├── guides/               # Guide listing + detail
│   │   │   ├── booking/              # 3-step booking flow
│   │   │   ├── dashboard/            # User dashboard (auth-protected)
│   │   │   ├── auth/login/           # Login page
│   │   │   ├── auth/register/        # Register page
│   │   │   ├── about/                # About page
│   │   │   ├── faq/                  # FAQ page
│   │   │   ├── contact/              # Contact form
│   │   │   └── terms/                # Terms of service
│   │   └── api/
│   │       ├── auth/[...nextauth]/   # Auth.js API handler
│   │       ├── stripe/checkout/      # Stripe checkout (placeholder)
│   │       └── stripe/webhooks/      # Stripe webhook (placeholder)
│   ├── components/
│   │   ├── ui/                       # 28 shadcn/ui components
│   │   ├── layout/                   # Header, Footer, MobileNav, LocaleSwitcher
│   │   ├── routes/                   # RouteCard, RouteFilterBar, RouteGallery, RouteItinerary, RoutePricing
│   │   ├── guides/                   # GuideCard
│   │   ├── booking/                  # BookingStepper
│   │   ├── dashboard/               # DashboardSidebar
│   │   └── shared/                   # StarRating, LanguageBadge, EmptyState, Pagination
│   ├── lib/
│   │   ├── db.ts                     # Prisma client (lazy Proxy pattern)
│   │   ├── auth.ts                   # Auth.js config
│   │   ├── auth-client.ts            # Client-side auth helpers
│   │   ├── i18n.ts                   # next-intl request config
│   │   ├── queries.ts                # Server-side DB queries (getRoutes, getGuides, etc.)
│   │   ├── stripe.ts                 # Stripe SDK
│   │   ├── resend.ts                 # Resend SDK
│   │   ├── email.ts                  # Email sending functions
│   │   ├── validations.ts            # Zod schemas
│   │   ├── constants.ts              # App constants
│   │   └── utils.ts                  # cn() helper
│   ├── store/
│   │   └── booking-context.tsx       # Booking state management
│   ├── actions/
│   │   └── auth.ts                   # Server actions (register)
│   └── types/
│       └── next-auth.d.ts            # Auth.js type augmentation
└── .env                              # DATABASE_URL + AUTH_SECRET
```

---

## 4. Current Routes (20 total)

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Redirects to /en |
| `/_not-found` | Static | 404 page |
| `/[locale]` | Dynamic | Homepage |
| `/[locale]/about` | Dynamic | About LokalChina |
| `/[locale]/auth/login` | Dynamic | Login |
| `/[locale]/auth/register` | Dynamic | Register |
| `/[locale]/booking` | Dynamic | Booking step 1 |
| `/[locale]/booking/confirmation` | Dynamic | Booking step 3 |
| `/[locale]/booking/details` | Dynamic | Booking step 2 |
| `/[locale]/contact` | Dynamic | Contact form |
| `/[locale]/dashboard` | Dynamic | Dashboard overview |
| `/[locale]/dashboard/bookings` | Dynamic | My bookings |
| `/[locale]/dashboard/messages` | Dynamic | Messages |
| `/[locale]/dashboard/profile` | Dynamic | Edit profile |
| `/[locale]/faq` | Dynamic | FAQ |
| `/[locale]/guides` | Dynamic | Guide listing |
| `/[locale]/guides/[guideSlug]` | Dynamic | Guide detail |
| `/[locale]/routes` | Dynamic | Route listing |
| `/[locale]/routes/[routeSlug]` | Dynamic | Route detail |
| `/[locale]/terms` | Dynamic | Terms of service |

---

## 5. Data Models (Prisma)

Core models: User, Account, Session, VerificationToken, GuideProfile, GuideLanguage, GuideRegion, GuideExpertise, GuideAvailability, TravelRoute, RouteImage, RouteGuide, Booking, Message, Review, PageContent

### Key relationships:
- User ↔ GuideProfile (1:1, when role='guide')
- TravelRoute ↔ GuideProfile (M:N via RouteGuide)
- Booking links User + TravelRoute + GuideProfile
- Message belongs to Booking
- Review belongs to Booking (1:1)

---

## 6. Current 3 Niche Routes (seeded in database)

| Route | Duration | Price | Guide |
|-------|----------|-------|-------|
| Jingdezhen & Wuyuan — Ceramics & Aesthetics | 4 days | ¥3,600 | Lin Yue (ceramic artist) |
| Yiwu & Yongkang — Sourcing Expedition | 3 days | ¥3,600 | Chen Wei (sourcing agent) |
| Shanxi — Black Myth: Wukong Pilgrimage | 6 days | ¥5,100 | Zhao Ming (archaeologist) |

---

## 7. Brand

- **Brand name**: LokalChina
- **Tagline**: "Go Local in China"
- **Primary color**: oklch(0.205 0 0) (dark navy/monochrome)
- **Font**: Geist Sans + Geist Mono
- **Logo**: Compass icon (lucide-react) + text "LokalChina"

---

## 8. Known Issues & Limitations

1. **Stripe payment not yet connected** — Booking confirmation page currently simulates payment
2. **Email service not yet active** — Resend API key not configured
3. **PWA offline support not implemented** — No service worker yet
4. **TypeScript strictness relaxed** — `noImplicitAny: false` in tsconfig, `ignoreBuildErrors: true` in next.config to bypass Vercel's stricter TS checking
5. **No real images** — Currently using Unsplash placeholder URLs
6. **SSR performance** — First load can be slow due to database queries

---

## 9. What NOT to change

- **Proxy.ts**: The locale middleware + route skip logic is critical. Don't remove `localeDetection: false`
- **db.ts**: Uses lazy Proxy pattern for Prisma 7 compatibility. Don't change to direct instantiation
- **tsconfig.json**: `noImplicitAny: false` + `prisma` in exclude are needed for Vercel build
- **next.config.ts**: `ignoreBuildErrors: true` is needed for Vercel deployment
- **prisma.config.ts**: Contains DATABASE_URL reference

---

## 10. How to make changes

1. Claude Web generates the code
2. User copies code to Claude Code terminal
3. Claude Code applies the file + runs `vercel --prod --yes` to deploy

When giving code, always include the **full file path** so Claude Code knows where to write it.
