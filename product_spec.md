# TipsHub - Product Specification

## 1. Project Overview

### 1.1 Project Name
**TipsHub** - The Ultimate Earning Opportunities Directory

### 1.2 Project Type
Web Application (Directory/Listing Platform)

### 1.3 Core Concept
TipsHub is a clean, searchable table/card-based directory for earning opportunities. It serves as an up-to-date master list of legitimate ways to earn money online, with a focus on Nigeria/Lagos users.

### 1.4 Key Differentiators
- Not a blog or content platform
- No user-generated content submissions
- Admin-curated database only
- Quick links to sign up for each platform
- Real-time filtering and search

---

## 2. User Experience (UX)

### 2.1 Design Philosophy
**Futuristic, Clean, Modern**

The design should feel like a modern fintech dashboard with:
- Dark mode primary with vibrant accent colors
- Glassmorphism effects on cards
- Smooth micro-animations
- High contrast for readability
- Professional yet engaging aesthetic

### 2.2 Color Palette

| Color Role | Color | Hex Code | Usage |
|------------|-------|----------|-------|
| Background Primary | Pure Black | `#000000` | Main background |
| Background Secondary | Near Black | `#0a0a0a` | Cards, containers |
| Background Tertiary | Dark Gray | `#141414` | Hover states |
| Border | Charcoal | `#262626` | Subtle borders |
| Border Light | Gray | `#333333` | Hover borders |
| Text Primary | Pure White | `#ffffff` | Headings, important text |
| Text Secondary | Light Gray | `#a3a3a3` | Body text |
| Text Muted | Medium Gray | `#737373` | Metadata, hints |
| Accent | White | `#ffffff` | CTAs, highlights |
| Status Active | White | `#ffffff` | Active status |
| Status Warning | Gray | `#737373` | Low paying |
| Status Danger | Light Gray | `#a3a3a3` | Avoid/Closed |

### 2.3 Typography

| Element | Font Family | Size | Weight |
|---------|-------------|------|--------|
| Logo/Brand | Space Grotesk | 24px | 700 |
| Headings H1 | Space Grotesk | 48px | 600 |
| Headings H2 | Space Grotesk | 32px | 600 |
| Headings H3 | Space Grotesk | 20px | 600 |
| Body Text | Inter | 16px | 400 |
| Small Text | Inter | 14px | 400 |
| Metadata | Inter | 12px | 400 |
| Monospace (data) | JetBrains Mono | 14px | 400 |

### 2.4 Layout Structure

#### Header
- Fixed position at top
- Logo on the left (with glow effect)
- Navigation links center
- Search icon and theme toggle on right
- Height: 64px
- Backdrop blur effect

#### Hero Section
- Minimal, doesn't take much vertical space
- Tagline: "Your Complete Guide to Online Earnings"
- Quick stats (e.g., "50+ Verified Sites")
- Call to action button

#### Filter Bar (Sticky)
- Horizontal scrollable on mobile
- Filter chips for quick selection
- Advanced filter dropdown
- Search input with real-time filtering

#### Sites Display
- Toggle between Table View and Card View
- Table: Dense data display with all columns
- Card: Visual cards with key info only
- Pagination or infinite scroll

#### Footer
- Minimal design
- Copyright info
- Quick links (About, Contact, Privacy)
- Social links

### 2.5 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, horizontal scroll filters |
| Tablet | 640px - 1024px | 2 columns for cards, condensed table |
| Desktop | > 1024px | Full layout, all columns visible |

---

## 3. Functionality Specification

### 3.1 Core Features

#### 3.1.1 Site Directory
- Display all earning sites in searchable table/card format
- Sort by any column (name, earnings, payout, etc.)
- Filter by multiple criteria simultaneously

#### 3.1.2 Filtering System

| Filter | Type | Options |
|--------|------|---------|
| Earning Method | Multi-select | Surveys, Videos, Microtasks, Cashback, Referral, Gaming, Trading |
| Payout Method | Multi-select | PayPal, Bank Transfer, Crypto, Gift Cards, Mobile Money |
| Minimum Payout | Range | Any, $1+, $5+, $10+, $20+, $50+ |
| Country | Multi-select | Nigeria, USA, UK, Canada, Global |
| Status | Single-select | Active, Low Paying, Avoid |
| Lagos Focus | Toggle | Show Lagos-popular only |
| Search | Text | Real-time search by site name |

#### 3.1.3 Site Card/Row Display

Each site entry displays:
- Site logo (40x40px)
- Site name (linked to detail or external)
- Earning methods as icons/chips
- Payout methods as icons/chips
- Minimum payout amount
- Average earnings estimate
- Countries available (with Nigeria flag highlight)
- Status badge (color-coded)
- Last verified date
- Quick "Sign Up" button

#### 3.1.4 Site Detail View (Modal/Page)
When clicking a site:
- Full description
- Step-by-step signup instructions
- Tips for maximizing earnings
- User reviews/ratings (future)
- Screenshots (future)

#### 3.1.5 Quick Actions
- One-click copy referral link
- Direct sign-up button (opens in new tab)
- Share to social media
- Mark as favorite (future - requires login)

### 3.2 User Interactions

#### Search Flow
1. User types in search bar
2. Results filter in real-time (debounced 300ms)
3. Matching text highlighted in results
4. Clear search button appears when text entered

#### Filter Flow
1. User clicks filter chip to toggle
2. Results update immediately
3. Active filters shown as removable tags
4. "Clear all filters" option available
5. Filter counts show number of matching sites

#### Navigation Flow
1. User lands on home page
2. Can immediately browse or apply filters
3. Clicking site opens detail or external link
4. Breadcrumbs for navigation depth

### 3.3 Data Management

#### Admin Features (Django Admin)
- CRUD operations for all sites
- Bulk actions (activate, deactivate, delete)
- Import/Export via CSV/JSON
- Version history for changes
- Media management for logos

#### Data Fields per Site

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Site display name |
| slug | string | Yes | URL-friendly identifier |
| url | URL | Yes | Official website URL |
| logo | image | No | Site logo (uploaded) |
| description | text | No | Brief description |
| earning_methods | array | Yes | Methods available |
| payout_methods | array | Yes | Payment options |
| minimum_payout | decimal | Yes | Minimum to cash out |
| average_earnings | string | No | e.g., "$50-200/month" |
| countries | array | Yes | Available countries |
| is_nigeria_available | boolean | Yes | Available in Nigeria |
| is_lagos_focused | boolean | No | Popular among Lagos users |
| status | enum | Yes | active, low_paying, avoid, closed |
| last_verified | date | Yes | Last verification date |
| verification_notes | text | No | Admin notes |
| is_featured | boolean | No | Show on homepage |
| affiliate_link | URL | No | Referral link |
| signup_instructions | text | No | How to sign up |
| created_at | datetime | Auto | Record creation date |
| updated_at | datetime | Auto | Last update date |

### 3.4 Edge Cases

| Scenario | Handling |
|----------|----------|
| No sites match filters | Show "No results" message with suggestion to clear filters |
| Site URL broken | Show warning badge, mark as "needs verification" |
| All sites filtered out | Show encouraging message, suggest broader search |
| Slow API response | Show skeleton loaders, not spinning wheel |
| Image fails to load | Show placeholder with site initial |
| Very long site name | Truncate with ellipsis, show full on hover |

---

## 4. Technical Specification

### 4.1 Frontend (React + Vite)

#### Technology Stack
- React 18.x
- Vite 5.x (build tool)
- Tailwind CSS 3.x (styling)
- Zustand (state management)
- React Query (server state)
- React Router (routing)
- Framer Motion (animations)
- Lucide React (icons)

#### Key Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x",
    "@tanstack/react-query": "^5.x",
    "zustand": "^4.x",
    "framer-motion": "^11.x",
    "lucide-react": "^0.x",
    "clsx": "^2.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x"
  }
}
```

### 4.2 Backend (Django)

#### Technology Stack
- Django 5.x
- Django REST Framework
- PostgreSQL
- Gunicorn (WSGI server)
- WhiteNoise (static files)

#### Key Dependencies
```
Django>=5.0
djangorestframework>=3.14
psycopg2-binary>=2.9
gunicorn>=21.0
whitenoise>=6.0
python-dotenv>=1.0
django-cors-headers>=4.0
```

### 4.3 Database Schema

```
┌─────────────────┐     ┌─────────────────┐
│  EarningSite    │     │  EarningMethod  │
├─────────────────┤     ├─────────────────┤
│ id              │◄────│ id              │
│ name            │     │ name            │
│ slug            │     │ slug            │
│ url             │     │ icon            │
│ logo            │     └─────────────────┘
│ description     │            │
│ minimum_payout │     ┌─────────────────┐
│ average_earnings│     │  PayoutMethod  │
│ status          │◄────│ id              │
│ last_verified   │     │ name            │
│ is_featured     │     │ slug            │
│ affiliate_link  │     │ icon            │
│ created_at      │     └─────────────────┘
│ updated_at      │            │
└─────────────────┘     ┌─────────────────┐
       │               │   Country       │
       │               ├─────────────────┤
       │               │ id              │
       │               │ name            │
       └───────────────│ code            │
                       │ is_nigeria      │
                       └─────────────────┘
```

### 4.4 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sites/` | GET | List all sites with filters |
| `/api/sites/{slug}/` | GET | Get single site details |
| `/api/sites/featured/` | GET | Get featured sites |
| `/api/methods/` | GET | List earning methods |
| `/api/payouts/` | GET | List payout methods |
| `/api/countries/` | GET | List countries |
| `/api/filters/` | GET | Get all filter options |
| `/api/health/` | GET | Health check |
| `/admin/` | GET | Django admin panel |

### 4.5 Docker Configuration

#### Services
- `db`: PostgreSQL database
- `backend`: Django API server
- `frontend`: React production build
- `nginx`: Reverse proxy

#### Docker Compose Features
- Auto-restart on failure
- Volume persistence for database
- Environment variable configuration
- Health checks for all services

---

## 5. Acceptance Criteria

### 5.1 Visual Checkpoints

| Checkpoint | Criteria |
|------------|----------|
| Dark theme | Background is deep dark (#0a0a0f), not gray |
| Accent colors | Cyan (#00f5ff) is prominent accent |
| Glass effect | Cards have subtle transparency/blur |
| Smooth animations | Transitions are fluid, no jank |
| Responsive | Works on 320px to 1920px widths |
| Loading states | Skeletons appear during data fetch |
| Empty states | Friendly message when no results |

### 5.2 Functional Checkpoints

| Feature | Success Criteria |
|---------|------------------|
| Search | Results update within 300ms of typing |
| Filters | Multiple filters can be combined |
| Status badges | Color-coded correctly |
| Site links | All external links open in new tab |
| Responsive | Mobile navigation works properly |
| Loading | Data fetch shows appropriate feedback |

### 5.3 Performance Criteria

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Score | > 90 |
| API Response Time | < 200ms |

---

## 6. Future Roadmap

### Phase 1 - MVP (Current)
- [x] Core directory with all fields
- [x] Filtering and search
- [x] Table and card views
- [x] Admin panel for management
- [x] Docker deployment

### Phase 2 - Enhanced Features
- [ ] User accounts with favorites
- [ ] Email notifications
- [ ] Site ratings/reviews
- [ ] Newsletter subscription

### Phase 3 - Growth
- [ ] Community submissions (moderated)
- [ ] Earnings calculator
- [ ] Browser extension
- [ ] Mobile app (React Native)

---

## 7. Project Constraints

- **No user-generated content**: All data is admin-curated
- **Nigeria focus**: Must prioritize Nigerian users
- **No blog functionality**: Pure directory, not content platform
- **Fast performance**: Must load quickly on mobile networks
- **Simple maintenance**: Easy for single developer to maintain
