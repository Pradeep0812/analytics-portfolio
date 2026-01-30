# Analytics Portfolio Platform - Complete Documentation

> **Version**: 1.1.0 (Production Hardened)  
> **Updated**: January 30, 2026  
> **Stack**: Next.js 14 | Tailwind CSS 3.4 | Decap CMS | Netlify

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Configuration Files](#configuration-files)
5. [Decap CMS Setup](#decap-cms-setup)
6. [Content Management](#content-management)
7. [Components Library](#components-library)
8. [Pages & Routing](#pages--routing)
9. [Styling System](#styling-system)
10. [Deployment Guide](#deployment-guide)
11. [Verification Checklist](#verification-checklist)
12. [Phase Roadmap](#phase-roadmap)

---

## Overview

The Analytics Portfolio Platform is a production-grade web application designed for Data Analysts and Power BI Developers to showcase their work.

### Key Features

| Feature | Description |
|---------|-------------|
| **Headless CMS** | Decap CMS with Git-based content storage |
| **Auto-rendering** | Projects appear automatically when added via CMS |
| **Draft Workflow** | Save drafts that don't appear on frontend |
| **Ordering** | Control display order with numeric field |
| **Featured Projects** | Highlight projects on homepage |
| **Dark Mode** | System-aware with manual toggle |
| **SEO Optimized** | Meta tags, Open Graph, structured data |
| **Responsive** | Mobile-first design for all devices |
| **Power BI Embeds** | Full iframe support with proper headers |

### Deployment Model

> **Important**: This project uses **Netlify's Next.js runtime** with server-side filesystem access.
> 
> - ✅ Hybrid rendering (SSR/SSG)
> - ✅ Server-side `fs` module for content loading
> - ✅ Managed by `@netlify/plugin-nextjs`
> - ❌ NOT a full static export

---

## Technology Stack

### Core Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Next.js | 14.2+ | React framework with App Router |
| Language | TypeScript | 5.3+ | Type safety |
| Styling | Tailwind CSS | 3.4+ | Utility-first CSS |
| CMS | Decap CMS | 3.0+ | Git-based headless CMS |
| Auth | Netlify Identity | - | User authentication |
| Hosting | Netlify | - | Deployment & CDN |

### Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "gray-matter": "^4.0.3",
    "react-markdown": "^9.0.1",
    "next-themes": "^0.3.0",
    "remark-gfm": "^4.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.2.0",
    "@netlify/plugin-nextjs": "^5.0.0"
  }
}
```

---

## Project Structure

```
PORTFOLIO/
│
├── 📁 content/                    # CMS-managed content
│   ├── 📁 powerbi/               # Power BI project markdown files
│   │   ├── sales-performance-dashboard.md
│   │   └── customer-segmentation-analysis.md
│   ├── 📁 tableau/               # Tableau project markdown files
│   │   ├── marketing-campaign-analytics.md
│   │   └── supply-chain-visibility.md
│   ├── 📁 excel/                 # Excel project markdown files
│   │   ├── financial-planning-model.md
│   │   └── hr-analytics-template.md
│   └── 📁 settings/              # Site configuration
│       └── general.json
│
├── 📁 public/                     # Static assets
│   ├── 📁 admin/                 # Decap CMS
│   │   ├── index.html            # CMS entry point
│   │   └── config.yml            # CMS configuration
│   └── 📁 uploads/               # Media uploads
│       ├── 📁 powerbi/           # Power BI assets
│       ├── 📁 tableau/           # Tableau assets
│       └── 📁 excel/             # Excel assets
│
├── 📁 src/                        # Application source
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   ├── 📁 powerbi/           # Power BI routes
│   │   │   ├── page.tsx          # Category listing
│   │   │   └── 📁 [slug]/
│   │   │       └── page.tsx      # Project detail
│   │   ├── 📁 tableau/           # Tableau routes
│   │   │   ├── page.tsx
│   │   │   └── 📁 [slug]/
│   │   │       └── page.tsx
│   │   └── 📁 excel/             # Excel routes
│   │       ├── page.tsx
│   │       └── 📁 [slug]/
│   │           └── page.tsx
│   │
│   ├── 📁 components/            # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── PDFViewer.tsx
│   │
│   └── 📁 lib/                   # Utilities
│       ├── types.ts              # TypeScript definitions
│       └── content.ts            # Content loading functions (cached)
│
├── .eslintrc.json                 # ESLint configuration
├── .gitignore                     # Git ignore rules
├── netlify.toml                   # Netlify deployment config
├── next.config.js                 # Next.js configuration
├── next-env.d.ts                  # TypeScript declarations
├── package.json                   # Dependencies & scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── README.md                      # Quick start guide
└── DOCUMENTATION.md               # This file
```

---

## Configuration Files

### next.config.js (Production-Safe)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable image optimization for Netlify compatibility
  images: {
    unoptimized: true,
  },
  // Strict mode for better development
  reactStrictMode: true,
  // Trailing slashes for consistent routing
  trailingSlash: true,
  // Note: DO NOT use 'output: standalone' - Netlify's Next.js plugin manages this
};

module.exports = nextConfig;
```

> **⚠️ Important**: Do NOT add `output: 'standalone'`. Netlify's Next.js plugin manages the build output internally.

---

### tailwind.config.js

```javascript
module.exports = {
  darkMode: 'class',  // Dark mode via class strategy
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: { /* Sky blue palette */ },
        accent: { /* Purple palette */ },
        surface: { /* Slate gray palette */ },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
    },
  },
};
```

**Color Palette:**
| Token | Color | Usage |
|-------|-------|-------|
| `primary` | Sky Blue (#0ea5e9) | Primary actions, links |
| `accent` | Purple (#d946ef) | Highlights, gradients |
| `surface` | Slate | Backgrounds, text, borders |

---

### netlify.toml (Production-Safe)

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/admin/*"
  to = "/admin/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

> **⚠️ Important**: `X-Frame-Options` must be `SAMEORIGIN` (not `DENY`) to allow Power BI and Tableau embeds to work.

---

### tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Path Alias**: Use `@/` to import from `src/` directory:
```typescript
import { getProjects } from '@/lib/content';
import Navbar from '@/components/Navbar';
```

---

## Decap CMS Setup

### Admin Entry Point

**File**: `public/admin/index.html`

Features:
- Loading spinner while CMS initializes
- Netlify Identity widget integration
- Login/logout redirect handlers
- Error event logging
- `noindex, nofollow` for SEO

---

### CMS Configuration

**File**: `public/admin/config.yml`

#### Backend Settings

```yaml
backend:
  name: git-gateway
  branch: main
  commit_messages:
    create: 'feat(content): create {{collection}} "{{slug}}"'
    update: 'fix(content): update {{collection}} "{{slug}}"'
    delete: 'chore(content): delete {{collection}} "{{slug}}"'

publish_mode: editorial_workflow
```

#### Media Configuration

```yaml
# Global fallback
media_folder: "public/uploads"
public_folder: "/uploads"

# Collection-specific (recommended)
collections:
  - name: "powerbi"
    media_folder: "/public/uploads/powerbi"
    public_folder: "/uploads/powerbi"
```

> Media uploads are routed to category-specific folders for better organization.

---

#### Collections

| Collection | Folder | Description |
|------------|--------|-------------|
| powerbi | `content/powerbi` | Power BI dashboards |
| tableau | `content/tableau` | Tableau visualizations |
| excel | `content/excel` | Excel models & templates |
| settings | `content/settings` | Global site config |

---

#### Field Schema (All Collections)

| Field | Widget | Required | Description |
|-------|--------|----------|-------------|
| `title` | string | ✅ | Project title |
| `description` | text | ✅ | Brief summary (2-3 sentences) |
| `thumbnail` | image | ✅ | Preview image (800x600px) |
| `video` | file | ❌ | Demo video (MP4) |
| `pdf` | file | ❌ | PDF document |
| `powerbi_embed_url` | string | ❌ | Power BI/Tableau embed URL |
| `tools` | list | ✅ | Technologies used |
| `tags` | list | ❌ | Category tags for filtering |
| `order` | number | ✅ | Display order (0-100, lower first) |
| `status` | select | ✅ | `draft` or `published` |
| `featured` | boolean | ❌ | Show on homepage |
| `date` | datetime | ✅ | Project completion date |
| `body` | markdown | ❌ | Detailed content |

---

## Content Management

### Markdown Format

Each project is stored as a markdown file with YAML frontmatter:

```markdown
---
title: "Sales Performance Dashboard"
description: "Interactive dashboard tracking regional sales..."
thumbnail: "/uploads/powerbi/sales-thumb.png"
video: "/uploads/powerbi/sales-demo.mp4"
pdf: "/uploads/powerbi/sales-report.pdf"
powerbi_embed_url: ""
tools:
  - "Power BI"
  - "DAX"
  - "SQL Server"
tags:
  - "Sales"
  - "Executive"
order: 1
status: "published"
featured: true
date: "2024-01-15"
---

## Project Overview

Detailed markdown content here...
```

---

### Content Loading (Cached)

**File**: `src/lib/content.ts`

All content loading functions use React's `cache()` for request deduplication:

```typescript
import { cache } from 'react';

export const getProjects = cache((category: ProjectCategory): Project[] => {
  // Reads from filesystem, cached per request
});
```

#### Available Functions

| Function | Returns | Description |
|----------|---------|-------------|
| `getProjects(category)` | `Project[]` | Published projects for category |
| `getAllProjects()` | `Project[]` | All published projects |
| `getProjectBySlug(category, slug)` | `Project \| null` | Single project |
| `getFeaturedProjects()` | `Project[]` | Up to 6 featured projects |
| `getCategoryStats()` | `CategoryStats` | Project counts per category |
| `getAllTags()` | `string[]` | Unique tags across all projects |
| `getAllTools()` | `string[]` | Unique tools across all projects |
| `getProjectSlugs(category)` | `string[]` | Slugs for static generation |
| `getCategoryInfo(category)` | `CategoryInfo` | Category display metadata |
| `getSiteSettings()` | `SiteSettings` | Global site configuration |

---

### TypeScript Types

**File**: `src/lib/types.ts`

```typescript
// Category constants for runtime validation
export const CATEGORIES = ['powerbi', 'tableau', 'excel'] as const;
export type ProjectCategory = (typeof CATEGORIES)[number];

// Project status
export type ProjectStatus = 'draft' | 'published';

// Full project interface
export interface Project {
  title: string;
  description: string;
  thumbnail: string;
  video?: string;
  pdf?: string;
  powerbi_embed_url?: string;
  tools: string[];
  tags?: string[];
  order: number;
  status: ProjectStatus;
  featured: boolean;
  date: string;
  slug: string;
  category: ProjectCategory;
  content: string;
}

// Type guard for validation
export function isValidCategory(category: string): category is ProjectCategory {
  return CATEGORIES.includes(category as ProjectCategory);
}
```

---

## Components Library

### Layout Components

| Component | File | Features |
|-----------|------|----------|
| **Navbar** | `Navbar.tsx` | Fixed position, dark mode toggle, mobile menu, scroll effect |
| **Footer** | `Footer.tsx` | Portfolio links, social icons, responsive layout |

---

### Homepage Components

| Component | File | Features |
|-----------|------|----------|
| **Hero** | `Hero.tsx` | Animated gradients, stats, CTAs, availability badge |
| **About** | `About.tsx` | Bio, skill bars with percentages, certifications |
| **Contact** | `Contact.tsx` | Email & LinkedIn CTA buttons |

---

### Project Components

| Component | File | Features |
|-----------|------|----------|
| **CategoryCard** | `CategoryCard.tsx` | Gradient icon, project count, hover effects |
| **ProjectCard** | `ProjectCard.tsx` | Thumbnail, featured badge, tools list, date |
| **ProjectGrid** | `ProjectGrid.tsx` | 3-column responsive grid, empty state |

---

### Media Components

| Component | File | Features |
|-----------|------|----------|
| **VideoPlayer** | `VideoPlayer.tsx` | Lazy loading, custom play button, error state |
| **PDFViewer** | `PDFViewer.tsx` | Responsive iframe, download button, fallback |

---

## Pages & Routing

### Route Structure

| Route | Page | Data Source |
|-------|------|-------------|
| `/` | Homepage | `getFeaturedProjects()`, `getCategoryStats()` |
| `/powerbi` | Power BI listing | `getProjects('powerbi')` |
| `/powerbi/[slug]` | Project detail | `getProjectBySlug('powerbi', slug)` |
| `/tableau` | Tableau listing | `getProjects('tableau')` |
| `/tableau/[slug]` | Project detail | `getProjectBySlug('tableau', slug)` |
| `/excel` | Excel listing | `getProjects('excel')` |
| `/excel/[slug]` | Project detail | `getProjectBySlug('excel', slug)` |
| `/admin` | CMS | Decap CMS (static HTML) |

---

### Static Generation

Project detail pages use `generateStaticParams()` for static path generation:

```typescript
export async function generateStaticParams() {
  const slugs = getProjectSlugs('powerbi');
  return slugs.map((slug) => ({ slug }));
}
```

---

### Dynamic Metadata

Each page generates SEO metadata dynamically:

```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProjectBySlug('powerbi', params.slug);
  return {
    title: `${project.title} | Power BI | Analytics Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}
```

---

## Styling System

### Color Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `primary-500` | #0ea5e9 | #0ea5e9 | Actions, links |
| `primary-600` | #0284c7 | #0284c7 | Hover states |
| `accent-500` | #d946ef | #d946ef | Highlights |
| `surface-50` | #f8fafc | - | Light backgrounds |
| `surface-900` | - | #0f172a | Dark backgrounds |
| `surface-950` | - | #020617 | Darkest background |

---

### Dark Mode

Toggle mechanism in Navbar:

```typescript
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
};
```

Tailwind dark mode classes:

```css
/* Applied when <html class="dark"> */
.dark .bg-surface-50 → .bg-surface-900
.dark .text-surface-900 → .text-white
```

---

### Typography

```css
font-family: 'Inter', system-ui, sans-serif;
```

Google Fonts loaded in `layout.tsx`:

```typescript
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
```

---

### Animations

```css
.animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
.animate-slide-up { animation: slideUp 0.5s ease-out; }
.animate-scale-in { animation: scaleIn 0.3s ease-out; }
```

---

## Deployment Guide

### Prerequisites

- Node.js 20+
- npm or yarn
- GitHub account
- Netlify account

---

### Step 1: Install Dependencies

```bash
cd c:\Users\user\Documents\PORTFOLIO
npm install
```

---

### Step 2: Local Development

```bash
npm run dev
```

Open http://localhost:3000

---

### Step 3: Build Test

```bash
npm run build
```

Verify no errors in console.

---

### Step 4: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Analytics Portfolio Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

---

### Step 5: Deploy to Netlify

1. Go to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select your GitHub repository
4. Build settings are auto-detected from `netlify.toml`
5. Click **"Deploy site"**

---

### Step 6: Enable Netlify Identity

1. **Site settings** → **Identity** → **Enable Identity**
2. **Registration** → **Invite only**
3. **Identity** → **Invite users** → Enter your email

---

### Step 7: Enable Git Gateway

1. **Site settings** → **Identity** → **Services**
2. Click **"Enable Git Gateway"**

---

### Step 8: Access CMS

1. Go to `https://your-site.netlify.app/admin`
2. Click **"Login with Netlify Identity"**
3. Complete email verification
4. Start managing content!

---

## Verification Checklist

### Local Development

| Test | Expected |
|------|----------|
| `npm install` | Completes without errors |
| `npm run dev` | Server starts on port 3000 |
| Homepage loads | Hero, categories, featured visible |
| Category pages | Project grids display |
| Project detail | Content, video/embed renders |
| Dark mode | Toggle works, persists on reload |
| Mobile view | Responsive layout, hamburger menu |

---

### Build Verification

| Test | Expected |
|------|----------|
| `npm run build` | Completes without errors |
| No TypeScript errors | Build log clean |
| Static paths generated | All slugs listed |

---

### CMS Verification

| Test | Expected |
|------|----------|
| `/admin` loads | Login page appears |
| Login works | Identity widget functions |
| Create project | Saved to Git repository |
| Upload media | Files go to correct folder |
| Draft project | Does NOT appear on frontend |
| Published project | Appears automatically |

---

### Netlify Deployment

| Test | Expected |
|------|----------|
| Build succeeds | Green checkmark in dashboard |
| Site accessible | Homepage loads |
| `/admin` works | CMS login page |
| Identity enabled | Login functions |
| Power BI embed | Displays in iframe |
| Dark mode | Toggle persists |

---

## Phase Roadmap

### Phase 1 - MVP ✅ Complete

| Feature | Status |
|---------|--------|
| Next.js App Router setup | ✅ |
| Tailwind CSS configuration | ✅ |
| Decap CMS integration | ✅ |
| 3 project collections | ✅ |
| Auto-rendering frontend | ✅ |
| Draft/Published workflow | ✅ |
| Featured projects | ✅ |
| Dark mode | ✅ |
| Responsive design | ✅ |
| Video/PDF/Image support | ✅ |
| Power BI embeds | ✅ |
| Production hardening | ✅ |

---

### Phase 2 - Enhancements (Planned)

| Feature | Description |
|---------|-------------|
| Tag filtering | Filter projects by tags |
| Search | Search across all projects |
| Enhanced metadata | Display additional fields |
| File validation | Size/type limits on uploads |

---

### Phase 3 - Enterprise (Planned)

| Feature | Description |
|---------|-------------|
| Admin roles | Editor vs Admin permissions |
| Power BI live embeds | Interactive dashboard embeds |
| Analytics | Netlify Analytics integration |
| Newsletter | Email signup form |

---

## File Summary

| Category | Count | Files |
|----------|-------|-------|
| Configuration | 7 | package.json, next.config.js, tailwind.config.js, etc. |
| CMS | 2 | index.html, config.yml |
| Content | 7 | 6 sample projects + settings |
| Library | 2 | types.ts, content.ts |
| Components | 10 | Navbar, Footer, Hero, etc. |
| Pages | 9 | layout, homepage, categories, details |
| Documentation | 2 | README.md, DOCUMENTATION.md |
| **Total** | **39** | |

---

## Support & Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Build fails with fs error | Ensure content loading is server-side only |
| Embeds not loading | Check X-Frame-Options is SAMEORIGIN |
| CMS login fails | Verify Identity is enabled, user invited |
| Dark mode flickers | Check initialization script in layout.tsx |
| Images not showing | Verify paths start with `/uploads/` |

---

### Useful Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Lint check
npm run lint

# Type check
npx tsc --noEmit
```

---

*Documentation for Analytics Portfolio Platform v1.1.0*  
*Last updated: January 30, 2026*
