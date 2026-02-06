# Analytics Portfolio - Complete Code Walkthrough
## Beginner-Friendly Documentation Explaining Every Feature

> **Purpose**: This document explains every feature and code pattern in simple terms so you can understand how the entire project works.

---

# 📁 Table of Contents

1. [What This Project Does](#1-what-this-project-does)
2. [Technology Stack Explained](#2-technology-stack-explained)
3. [Project Folder Structure](#3-project-folder-structure)
4. [Configuration Files](#4-configuration-files)
5. [Core Library Files](#5-core-library-files)
6. [All Components Explained](#6-all-components-explained)
7. [Pages & Routing](#7-pages--routing)
8. [Styling System](#8-styling-system)
9. [CMS Configuration](#9-cms-configuration)
10. [How Everything Connects](#10-how-everything-connects)

---

# 1. What This Project Does

This is a **portfolio website** for showcasing data analytics projects. Think of it like an online resume specifically for:
- **Power BI dashboards** (interactive business reports)
- **Tableau visualizations** (data charts and graphs)
- **Excel templates** (spreadsheet models)

## Key Features

| Feature | What It Means |
|---------|--------------|
| **CMS** | You can add/edit projects without touching code (like WordPress) |
| **Dark Mode** | Website can switch between light and dark colors |
| **Responsive** | Looks good on phones, tablets, and computers |
| **SEO** | Search engines like Google can find your projects |
| **Auto-deploy** | Changes go live automatically when you save |

---

# 2. Technology Stack Explained

## What Each Technology Does

### Next.js 14 (The Framework)
Think of this as the "engine" of the website. It:
- Creates web pages from React components
- Handles navigation between pages
- Makes the site load fast

### TypeScript (The Language)
A version of JavaScript that catches errors before they happen:
```typescript
// JavaScript (can have hidden bugs)
let name = "John";
name = 123;  // No error, but probably a bug!

// TypeScript (catches bugs)
let name: string = "John";
name = 123;  // ❌ Error! TypeScript stops you
```

### Tailwind CSS (The Styling)
Instead of writing CSS in separate files, you add classes directly:
```html
<!-- Traditional CSS way -->
<div class="my-button">Click me</div>

<!-- Tailwind way (everything in the class) -->
<div class="bg-blue-500 text-white px-4 py-2 rounded">Click me</div>
```

### Decap CMS (Content Management)
A web interface where you can:
- Add new projects (like posting on social media)
- Upload images and videos
- Edit content without coding

### Netlify (Hosting)
Where the website lives on the internet. It:
- Hosts your files globally
- Gives you a `.netlify.app` domain
- Rebuilds when you make changes

---

# 3. Project Folder Structure

```
📁 PORTFOLIO/
│
├── 📁 content/                 ← YOUR PROJECTS (markdown files)
│   ├── 📁 powerbi/            ← Power BI projects
│   ├── 📁 tableau/            ← Tableau projects
│   ├── 📁 excel/              ← Excel projects
│   └── 📁 settings/           ← Site settings (your name, email, etc.)
│
├── 📁 public/                  ← STATIC FILES
│   ├── 📁 admin/              ← CMS dashboard
│   └── 📁 uploads/            ← Your images & videos
│
├── 📁 src/                     ← SOURCE CODE
│   ├── 📁 app/                ← Pages (homepage, project pages)
│   ├── 📁 components/         ← Reusable UI pieces
│   └── 📁 lib/                ← Helper functions
│
├── 📄 package.json            ← Project dependencies
├── 📄 tailwind.config.js      ← Color/font settings
├── 📄 next.config.js          ← Next.js settings
└── 📄 netlify.toml            ← Deployment settings
```

---

# 4. Configuration Files

## 4.1 package.json - Your Project's ID Card

This file tells npm (Node Package Manager) about your project:

```json
{
  "name": "analytics-portfolio",  // Project name
  "version": "1.0.0",             // Version number
  
  "scripts": {                    // Commands you can run
    "dev": "next dev",           // npm run dev → starts development
    "build": "next build",       // npm run build → creates production build
    "start": "next start",       // npm run start → runs production
    "lint": "next lint"          // npm run lint → checks for errors
  },
  
  "dependencies": {              // Libraries the project NEEDS
    "next": "^14.2.0",          // The framework
    "react": "^18.2.0",         // UI library
    "gray-matter": "^4.0.3",    // Reads markdown files
    "react-markdown": "^9.0.1"  // Displays markdown as HTML
  },
  
  "devDependencies": {           // Tools for development only
    "typescript": "^5.3.0",     // Type checking
    "tailwindcss": "^3.4.0"     // Styling
  }
}
```

## 4.2 next.config.js - Next.js Settings

```javascript
const nextConfig = {
  // Don't optimize images (Netlify handles this)
  images: {
    unoptimized: true,
  },
  
  // Extra error checking in development
  reactStrictMode: true,
  
  // Add trailing slash to URLs (/about/ instead of /about)
  trailingSlash: true,
};
```

## 4.3 tailwind.config.js - Design System

This is where all your colors, fonts, and animations are defined:

```javascript
module.exports = {
  // How dark mode works
  darkMode: 'class',  // Add class="dark" to <html> to enable
  
  // Where to look for Tailwind classes
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  
  theme: {
    extend: {
      colors: {
        // Primary color (Steel Gray)
        primary: {
          500: '#9CA3AF',  // Main buttons, links
          600: '#D1D5DB',  // Hover state
        },
        // Accent color (Soft Cyan)
        accent: {
          500: '#22D3EE',  // Highlights
        },
        // Surface colors (backgrounds)
        surface: {
          50: '#E5E7EB',   // Light mode text
          900: '#0B0F14',  // Dark mode background
        },
      },
      
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
    },
  },
};
```

## 4.4 netlify.toml - Deployment Settings

```toml
[build]
  command = "npm run build"  # What to run when deploying
  publish = ".next"          # What folder to publish

[[plugins]]
  package = "@netlify/plugin-nextjs"  # Netlify's Next.js helper

[[redirects]]
  from = "/admin/*"          # When visiting /admin
  to = "/admin/index.html"   # Show this file
  status = 200

[[headers]]
  for = "/*"                 # For all pages
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"  # Security for embeds
```

---

# 5. Core Library Files

## 5.1 types.ts - TypeScript Definitions

This file defines the "shape" of data in your project:

```typescript
// What categories exist (Power BI, Tableau, Excel)
export const CATEGORIES = ['powerbi', 'tableau', 'excel'] as const;

// Type for a category
export type ProjectCategory = 'powerbi' | 'tableau' | 'excel';

// What status a project can have
export type ProjectStatus = 'draft' | 'published';

// What a project looks like
export interface Project {
  title: string;           // "Sales Dashboard"
  description: string;     // "Interactive sales report..."
  thumbnail: string;       // "/uploads/powerbi/sales.png"
  video?: string;         // Optional demo video
  pdf?: string;           // Optional PDF report
  powerbi_embed_url?: string;  // Optional live embed
  tools: string[];        // ["Power BI", "DAX", "SQL"]
  tags?: string[];        // ["Sales", "Finance"]
  order: number;          // Display order (1, 2, 3...)
  status: ProjectStatus;  // "draft" or "published"
  featured: boolean;      // Show on homepage?
  date: string;           // "2025-01-15"
  slug: string;           // URL-friendly name
  category: ProjectCategory;  // "powerbi"
  content: string;        // Markdown content
}
```

**Why this matters:** TypeScript will warn you if you try to use a project without a title, or if you spell "status" wrong.

## 5.2 content.ts - Loading Content

This file reads your markdown files and turns them into data:

```typescript
import fs from 'fs';           // Read files from disk
import matter from 'gray-matter';  // Parse markdown frontmatter
import { cache } from 'react'; // Cache results

// Where content lives
const CONTENT_ROOT = path.join(process.cwd(), 'content');

// Get all projects for a category
export const getProjects = cache((category) => {
  // 1. Find the folder (e.g., content/powerbi/)
  const categoryDir = path.join(CONTENT_ROOT, category);
  
  // 2. Read all .md files in the folder
  const files = fs.readdirSync(categoryDir);
  
  // 3. For each file, parse it
  return files
    .filter(file => file.endsWith('.md'))
    .map(filename => {
      // Read file content
      const content = fs.readFileSync(filepath, 'utf-8');
      
      // Parse frontmatter (the --- section at top)
      const { data, content: body } = matter(content);
      
      // Return project object
      return {
        title: data.title,
        description: data.description,
        // ... other fields
        slug: filename.replace('.md', ''),
        content: body,
      };
    })
    // Only show published projects
    .filter(project => project.status === 'published')
    // Sort by order number
    .sort((a, b) => a.order - b.order);
});
```

**What `cache()` does:** If you call `getProjects('powerbi')` 5 times on the same page, it only reads the files ONCE and reuses the result.

---

# 6. All Components Explained

## 6.1 Navbar.tsx - Navigation Bar

**What it does:** The header at the top of every page with logo, links, and dark mode toggle.

```typescript
'use client';  // This runs in the browser (not server)

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  // State variables (things that can change)
  const [isOpen, setIsOpen] = useState(false);     // Mobile menu open?
  const [isDark, setIsDark] = useState(false);     // Dark mode on?
  const [isScrolled, setIsScrolled] = useState(false);  // Page scrolled?

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/powerbi', label: 'Power BI' },
    { href: '/tableau', label: 'Tableau' },
    { href: '/excel', label: 'Excel' },
  ];

  // Check dark mode when page loads
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', String(newMode));  // Remember choice
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <nav className={`fixed top-0 ${isScrolled ? 'glass shadow-lg' : ''}`}>
      {/* Logo */}
      <Link href="/">Analytics Portfolio</Link>
      
      {/* Desktop Links */}
      <div className="hidden md:flex">
        {navLinks.map(link => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      
      {/* Dark Mode Button */}
      <button onClick={toggleDarkMode}>
        {isDark ? '☀️' : '🌙'}
      </button>
      
      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
    </nav>
  );
}
```

**Key concepts:**
- `useState` = Creates changeable values
- `useEffect` = Runs code when component loads
- `localStorage` = Saves data in browser (persists after refresh)

## 6.2 Hero.tsx - Homepage Banner

**What it does:** The big welcome section at the top of the homepage.

```typescript
export default function Hero({
  title = 'Analytics Portfolio',    // Default value if not provided
  subtitle = 'Data-Driven Insights',
  description = 'Transforming complex data...',
}) {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <div className="w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
      </div>
      
      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10">
          <span className="animate-ping w-2.5 h-2.5 rounded-full bg-emerald-400" />
          Available for new opportunities
        </div>
        
        {/* Title with gradient text */}
        <h1 className="text-6xl font-bold">
          Analytics <span className="text-gradient">Portfolio</span>
        </h1>
        
        {/* Description */}
        <p className="text-xl text-surface-600">{description}</p>
        
        {/* Call-to-action buttons */}
        <Link href="#projects" className="btn btn-primary">
          View My Work →
        </Link>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8">
          <div>5+ Years Experience</div>
          <div>50+ Projects</div>
          <div>20+ Clients</div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <a href="#projects" className="animate-bounce">
        ↓ Scroll
      </a>
    </section>
  );
}
```

## 6.3 ProjectCard.tsx - Project Preview Card

**What it does:** Shows a preview of each project in grids.

```typescript
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;        // The project data
  priority?: boolean;      // Load image immediately?
}

export default function ProjectCard({ project, priority = false }) {
  // Format the date nicely
  const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Different colors for each category
  const categoryColors = {
    powerbi: 'from-amber-500 to-orange-600',
    tableau: 'from-blue-500 to-indigo-600',
    excel: 'from-emerald-500 to-teal-600',
  };

  return (
    <Link href={`/${project.category}/${project.slug}`}>
      {/* Thumbnail image */}
      <div className="relative aspect-video">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill                    // Fill the container
          priority={priority}     // Load first if important
          className="object-cover group-hover:scale-105"
        />
        
        {/* Featured badge (if featured) */}
        {project.featured && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}
        
        {/* Category badge */}
        <span className="absolute top-3 right-3">
          {project.category === 'powerbi' && 'Power BI'}
          {project.category === 'tableau' && 'Tableau'}
          {project.category === 'excel' && 'Excel'}
        </span>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        
        {/* Tools used */}
        <div className="flex flex-wrap gap-1.5">
          {project.tools.slice(0, 4).map(tool => (
            <span key={tool} className="px-2 py-1 bg-surface-100 rounded">
              {tool}
            </span>
          ))}
        </div>
        
        {/* Date */}
        <time>{formattedDate}</time>
      </div>
    </Link>
  );
}
```

## 6.4 CategoryCard.tsx - Category Preview

**What it does:** Shows each category (Power BI, Tableau, Excel) with project count.

```typescript
export default function CategoryCard({ category, projectCount }) {
  return (
    <Link href={category.href}>
      {/* Gradient icon */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color}`}>
        {category.icon}  {/* 📊, 📈, or 📑 */}
      </div>
      
      {/* Category name */}
      <h3>{category.name}</h3>
      
      {/* Description */}
      <p>{category.description}</p>
      
      {/* Project count */}
      <span>
        <strong>{projectCount}</strong> projects
      </span>
      
      {/* Arrow */}
      <div className="group-hover:translate-x-1">→</div>
    </Link>
  );
}
```

## 6.5 VideoPlayer.tsx - Video Component

```typescript
export default function VideoPlayer({ src, title, poster }) {
  return (
    <div className="aspect-video rounded-2xl overflow-hidden">
      <video
        controls              // Show play/pause buttons
        poster={poster}       // Thumbnail before playing
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
        Your browser doesn't support video.
      </video>
    </div>
  );
}
```

## 6.6 PDFViewer.tsx - PDF Display

```typescript
export default function PDFViewer({ src, title }) {
  return (
    <div className="rounded-2xl overflow-hidden">
      <iframe
        src={src}
        title={title}
        className="w-full h-[600px]"
      />
      <a href={src} download className="btn btn-secondary">
        📥 Download PDF
      </a>
    </div>
  );
}
```

---

# 7. Pages & Routing

## How URLs Work

| URL | File | What It Shows |
|-----|------|---------------|
| `/` | `src/app/page.tsx` | Homepage |
| `/powerbi` | `src/app/powerbi/page.tsx` | Power BI project list |
| `/powerbi/my-project` | `src/app/powerbi/[slug]/page.tsx` | Single project detail |
| `/admin` | `public/admin/index.html` | CMS dashboard |

## 7.1 layout.tsx - The Wrapper

Every page is wrapped in this layout:

```typescript
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Dark mode script (runs before page loads) */}
        <script dangerouslySetInnerHTML={{
          __html: `
            const darkMode = localStorage.getItem('theme');
            if (darkMode === 'dark') {
              document.documentElement.classList.add('dark');
            }
          `
        }} />
      </head>
      <body>
        <Navbar />          {/* Shows on every page */}
        <main>{children}</main>  {/* Page content goes here */}
        <Footer />          {/* Shows on every page */}
      </body>
    </html>
  );
}
```

## 7.2 Homepage (page.tsx)

```typescript
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import ProjectGrid from '@/components/ProjectGrid';
import { getCategoryStats, getFeaturedProjects } from '@/lib/content';

export default function HomePage() {
  // Get data (runs on server)
  const stats = getCategoryStats();           // { powerbi: 5, tableau: 3, excel: 2 }
  const featuredProjects = getFeaturedProjects();  // Top 6 featured

  return (
    <>
      <Hero />
      
      {/* Categories section */}
      <section>
        <h2>Analytics Specializations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {CATEGORY_INFO.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              projectCount={stats[category.id]}
            />
          ))}
        </div>
      </section>
      
      {/* Featured projects */}
      <section>
        <h2>Highlighted Work</h2>
        <ProjectGrid projects={featuredProjects} />
      </section>
      
      <About />
      <Contact />
    </>
  );
}
```

## 7.3 Project Detail Page ([slug]/page.tsx)

The `[slug]` folder means dynamic routes:
- `/powerbi/sales-dashboard` → slug = "sales-dashboard"
- `/powerbi/customer-analysis` → slug = "customer-analysis"

```typescript
import { getProjectBySlug, getProjectSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';

// Tell Next.js which pages to build ahead of time
export async function generateStaticParams() {
  const slugs = getProjectSlugs('powerbi');
  return slugs.map(slug => ({ slug }));
  // Returns: [{ slug: 'sales-dashboard' }, { slug: 'customer-analysis' }]
}

// Create SEO metadata for each page
export async function generateMetadata({ params }) {
  const project = getProjectBySlug('powerbi', params.slug);
  return {
    title: `${project.title} | Power BI`,
    description: project.description,
  };
}

// The actual page component
export default function ProjectPage({ params }) {
  const project = getProjectBySlug('powerbi', params.slug);
  
  // Show 404 if project not found
  if (!project) {
    notFound();
  }
  
  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      
      {/* Show embed OR video OR thumbnail */}
      {project.powerbi_embed_url ? (
        <iframe src={project.powerbi_embed_url} />
      ) : project.video ? (
        <VideoPlayer src={project.video} />
      ) : (
        <Image src={project.thumbnail} />
      )}
      
      {/* Markdown content */}
      <ReactMarkdown>{project.content}</ReactMarkdown>
      
      {/* Tools */}
      <div>
        {project.tools.map(tool => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
    </div>
  );
}
```

---

# 8. Styling System

## 8.1 How Tailwind Classes Work

```html
<!-- Building a button with Tailwind -->
<button class="
  bg-blue-500      // Background: blue
  hover:bg-blue-600  // On hover: darker blue
  text-white       // Text: white
  px-4             // Padding left+right: 16px
  py-2             // Padding top+bottom: 8px
  rounded-lg       // Border radius: large
  font-medium      // Font weight: medium
  transition       // Smooth transitions
">
  Click Me
</button>
```

## 8.2 Custom Components in globals.css

```css
/* Card component */
.card {
  @apply bg-white dark:bg-surface-800;  /* White bg, dark mode uses surface-800 */
  @apply rounded-xl;                     /* Rounded corners */
  @apply border border-surface-200;      /* Subtle border */
  box-shadow: var(--shadow-md);          /* Medium shadow */
}

.card:hover {
  box-shadow: var(--shadow-lg);          /* Bigger shadow on hover */
  transform: translateY(-2px);           /* Lift up slightly */
}

/* Button variants */
.btn-primary {
  @apply bg-primary-500 hover:bg-primary-600 text-surface-900;
}

.btn-secondary {
  @apply bg-surface-100 hover:bg-surface-200 text-surface-700;
}
```

## 8.3 Animations

```css
/* Fade in from below */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

/* Floating effect */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

## 8.4 Dark Mode

```css
/* Light mode (default) */
body {
  @apply bg-surface-50 text-surface-900;
}

/* Dark mode (when <html class="dark">) */
.dark body {
  @apply bg-surface-950 text-surface-100;
}

/* Component example */
.card {
  @apply bg-white dark:bg-surface-800;
  @apply border-surface-200 dark:border-surface-700;
}
```

---

# 9. CMS Configuration

## 9.1 How the CMS Works

```
You (in browser)
    ↓
Decap CMS Interface (/admin)
    ↓
Git Gateway (Netlify service)
    ↓
GitHub Repository
    ↓
Netlify rebuilds site
    ↓
Changes appear live!
```

## 9.2 config.yml Structure

```yaml
# Where content goes
backend:
  name: git-gateway     # Uses Netlify's Git Gateway
  branch: main          # Target branch

# Workflow
publish_mode: editorial_workflow  # Draft → Review → Publish

# Media uploads
media_folder: "public/uploads"
public_folder: "/uploads"

# Content types
collections:
  - name: "powerbi"
    label: "📊 Power BI Projects"
    folder: "content/powerbi"
    create: true
    fields:
      - label: "Title"
        name: "title"
        widget: "string"
        required: true
      
      - label: "Description"
        name: "description"
        widget: "text"
        required: true
      
      - label: "Thumbnail"
        name: "thumbnail"
        widget: "image"
        required: true
      
      - label: "Status"
        name: "status"
        widget: "select"
        options:
          - { label: "Draft", value: "draft" }
          - { label: "Published", value: "published" }
```

---

# 10. How Everything Connects

## The Data Flow

```
1. YOU add a project in CMS
            ↓
2. CMS creates markdown file in content/powerbi/my-project.md
            ↓
3. Netlify detects Git change
            ↓
4. Netlify runs "npm run build"
            ↓
5. content.ts reads markdown files
            ↓
6. Pages use getProjects() to get data
            ↓
7. Components render the data
            ↓
8. Visitor sees your new project!
```

## Request Flow

```
Visitor goes to /powerbi/sales-dashboard
            ↓
Next.js matches route: /powerbi/[slug]/page.tsx
            ↓
generateStaticParams() already built this page
            ↓
Netlify serves pre-built HTML (FAST!)
            ↓
Browser shows the page
```

---

# Quick Reference

## Common Tasks

| Task | How To Do It |
|------|-------------|
| Add new project | Go to /admin → Power BI → New |
| Change colors | Edit `tailwind.config.js` |
| Add new page | Create file in `src/app/newpage/page.tsx` |
| Edit homepage | Modify `src/app/page.tsx` |
| Change site name | Edit `content/settings/general.json` |

## Common Commands

```bash
npm run dev      # Start development (localhost:3000)
npm run build    # Build for production
npm run lint     # Check for errors
```

## File Cheat Sheet

| File | Purpose |
|------|---------|
| `tailwind.config.js` | Colors, fonts, spacing |
| `src/lib/types.ts` | Data type definitions |
| `src/lib/content.ts` | Content loading functions |
| `public/admin/config.yml` | CMS field configuration |
| `netlify.toml` | Deployment settings |

---

*Documentation for Analytics Portfolio Platform v1.0*  
*Created: February 6, 2026*
