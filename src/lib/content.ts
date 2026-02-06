// =============================================================================
// CONTENT LOADER (HARDENED & CACHED - v1.2)
// Analytics Portfolio Platform
// Supports both flat and nested CMS field structures
// =============================================================================

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import type {
    Project,
    ProjectCategory,
    CategoryStats,
    SiteSettings,
    CategoryInfo,
} from './types';
import { CATEGORIES } from './types';

// =============================================================================
// CONSTANTS
// =============================================================================

const CONTENT_ROOT = path.join(process.cwd(), 'content');
const SETTINGS_FILE = path.join(CONTENT_ROOT, 'settings', 'general.json');

/**
 * Category configuration with display metadata
 */
export const CATEGORY_INFO: CategoryInfo[] = [
    {
        id: 'powerbi',
        name: 'Power BI',
        description: 'Interactive dashboards and business intelligence solutions',
        icon: '📊',
        color: 'from-amber-500 to-orange-600',
        href: '/powerbi',
    },
    {
        id: 'tableau',
        name: 'Tableau',
        description: 'Data visualizations and analytical dashboards',
        icon: '📈',
        color: 'from-blue-500 to-indigo-600',
        href: '/tableau',
    },
    {
        id: 'excel',
        name: 'Excel',
        description: 'Financial models, templates, and automation',
        icon: '📑',
        color: 'from-emerald-500 to-teal-600',
        href: '/excel',
    },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Normalize frontmatter to flat structure
 * Handles both flat and nested (grouped) CMS field structures
 */
function normalizeFrontmatter(data: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    // Known field groups from enhanced CMS config
    const fieldGroups = ['basic_info', 'media', 'embed', 'categorization', 'display', 'download'];

    for (const [key, value] of Object.entries(data)) {
        if (fieldGroups.includes(key) && typeof value === 'object' && value !== null) {
            // Flatten nested group
            Object.assign(result, value);
        } else {
            // Keep flat fields as-is
            result[key] = value;
        }
    }

    return result;
}

/**
 * Parse project from file contents
 */
function parseProject(
    fileContents: string,
    filename: string,
    category: ProjectCategory
): Project {
    const { data, content } = matter(fileContents);
    const normalized = normalizeFrontmatter(data);

    const slug = filename.replace(/\.md$/, '').toLowerCase();

    return {
        title: (normalized.title as string) || 'Untitled',
        description: (normalized.description as string) || '',
        thumbnail: (normalized.thumbnail as string) || '',
        video: normalized.video as string | undefined,
        pdf: normalized.pdf as string | undefined,
        powerbi_embed_url: normalized.powerbi_embed_url as string | undefined,
        tools: (normalized.tools as string[]) || [],
        tags: normalized.tags as string[] | undefined,
        order: (normalized.order as number) ?? 0,
        status: (normalized.status as 'draft' | 'published') || 'draft',
        featured: (normalized.featured as boolean) || false,
        date: (normalized.date as string) || new Date().toISOString(),
        slug,
        category,
        content,
    };
}

// =============================================================================
// CACHED CONTENT LOADING FUNCTIONS
// Using React's cache() for request deduplication
// =============================================================================

/**
 * Get all projects for a specific category
 * Cached per request - filters by published status and sorts by order
 */
export const getProjects = cache((category: ProjectCategory): Project[] => {
    const categoryDir = path.join(CONTENT_ROOT, category);

    // Return empty array if directory doesn't exist
    if (!fs.existsSync(categoryDir)) {
        return [];
    }

    const files = fs.readdirSync(categoryDir);

    return files
        .filter((file: string) => file.endsWith('.md'))
        .map((filename: string) => {
            const filePath = path.join(categoryDir, filename);
            const fileContents = fs.readFileSync(filePath, 'utf-8');
            return parseProject(fileContents, filename, category);
        })
        // Filter only published projects
        .filter((project: Project) => project.status === 'published')
        // Sort by order (ascending), then by date (descending)
        .sort((a: Project, b: Project) => {
            if (a.order !== b.order) {
                return a.order - b.order;
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
});

/**
 * Get all projects across all categories
 * Cached per request
 */
export const getAllProjects = cache((): Project[] => {
    const allProjects: Project[] = [];

    for (const category of CATEGORIES) {
        const categoryProjects = getProjects(category);
        allProjects.push(...categoryProjects);
    }

    // Sort by date (most recent first)
    return allProjects.sort(
        (a: Project, b: Project) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
});

/**
 * Get a single project by category and slug
 * Returns null if not found or not published
 */
export const getProjectBySlug = (
    category: ProjectCategory,
    slug: string
): Project | null => {
    return getProjects(category).find((p: Project) => p.slug === slug) ?? null;
};

/**
 * Get featured projects for homepage display
 * Cached per request
 */
export const getFeaturedProjects = cache((): Project[] => {
    const allProjects = getAllProjects();

    return allProjects.filter((project: Project) => project.featured).slice(0, 6);
});

/**
 * Get category statistics (project counts)
 * Cached per request
 */
export const getCategoryStats = cache((): CategoryStats => {
    const powerbiCount = getProjects('powerbi').length;
    const tableauCount = getProjects('tableau').length;
    const excelCount = getProjects('excel').length;

    return {
        powerbi: powerbiCount,
        tableau: tableauCount,
        excel: excelCount,
        total: powerbiCount + tableauCount + excelCount,
    };
});

/**
 * Get unique tags across all projects
 * Cached per request
 */
export const getAllTags = cache((): string[] => {
    const allProjects = getAllProjects();
    const tagsSet = new Set<string>();

    allProjects.forEach((project: Project) => {
        project.tags?.forEach((tag: string) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
});

/**
 * Get unique tools across all projects
 * Cached per request
 */
export const getAllTools = cache((): string[] => {
    const allProjects = getAllProjects();
    const toolsSet = new Set<string>();

    allProjects.forEach((project: Project) => {
        project.tools.forEach((tool: string) => toolsSet.add(tool));
    });

    return Array.from(toolsSet).sort();
});

/**
 * Get projects filtered by tag
 */
export const getProjectsByTag = (tag: string): Project[] => {
    const allProjects = getAllProjects();
    return allProjects.filter((project: Project) => project.tags?.includes(tag));
};

/**
 * Get projects filtered by tool
 */
export const getProjectsByTool = (tool: string): Project[] => {
    const allProjects = getAllProjects();
    return allProjects.filter((project: Project) => project.tools.includes(tool));
};

/**
 * Get site settings from JSON file
 * Cached per request - handles both flat and nested structures
 */
export const getSiteSettings = cache((): SiteSettings => {
    if (!fs.existsSync(SETTINGS_FILE)) {
        // Return defaults if settings file doesn't exist
        return {
            title: 'Analytics Platform',
            description: 'Enterprise analytics knowledge platform',
            author: 'Data Analyst',
            role: 'Senior Analytics Consultant',
        };
    }

    try {
        const contents = fs.readFileSync(SETTINGS_FILE, 'utf-8');
        const data = JSON.parse(contents);

        // Handle nested structure from enhanced CMS config
        if (data.site || data.personal || data.contact) {
            return {
                title: data.site?.title || data.title || 'Analytics Platform',
                description: data.site?.description || data.description || '',
                author: data.personal?.author || data.author || 'Data Analyst',
                role: data.personal?.role || data.role || 'Senior Analytics Consultant',
                email: data.contact?.email || data.email,
                linkedin: data.contact?.linkedin || data.linkedin,
                github: data.contact?.github || data.github,
            };
        }

        // Handle flat structure
        return data as SiteSettings;
    } catch {
        return {
            title: 'Analytics Platform',
            description: 'Enterprise analytics knowledge platform',
            author: 'Data Analyst',
            role: 'Senior Analytics Consultant',
        };
    }
});

// =============================================================================
// NEW SETTINGS LOADERS FOR ENTERPRISE PLATFORM
// =============================================================================

interface HeroSettings {
    hero: {
        title: string;
        subtitle: string;
        statement: string;
    };
    stats: Array<{ value: string; label: string }>;
}

interface NavigationLink {
    label: string;
    href: string;
    order: number;
}

interface SkillItem {
    name: string;
    context: string;
    problems?: string;
}

interface SkillsSettings {
    primary: SkillItem[];
    supporting: SkillItem[];
    familiar: Array<{ name: string; context: string }>;
}

/**
 * Get hero/homepage settings
 */
export const getHeroSettings = cache((): HeroSettings => {
    const heroFile = path.join(CONTENT_ROOT, 'settings', 'hero.json');

    if (!fs.existsSync(heroFile)) {
        return {
            hero: {
                title: 'Analytics Platform',
                subtitle: 'Enterprise Analytics Knowledge System',
                statement: 'Documenting analytical methodologies and data-driven insights.',
            },
            stats: [
                { value: '5+', label: 'Years in Analytics' },
                { value: '50+', label: 'Case Studies' },
                { value: '20+', label: 'Enterprise Clients' },
            ],
        };
    }

    try {
        const contents = fs.readFileSync(heroFile, 'utf-8');
        return JSON.parse(contents);
    } catch {
        return {
            hero: {
                title: 'Analytics Platform',
                subtitle: 'Enterprise Analytics Knowledge System',
                statement: 'Documenting analytical methodologies and data-driven insights.',
            },
            stats: [],
        };
    }
});

/**
 * Get navigation settings
 */
export const getNavigationLinks = cache((): NavigationLink[] => {
    const navFile = path.join(CONTENT_ROOT, 'settings', 'navigation.json');

    if (!fs.existsSync(navFile)) {
        return [
            { label: 'Home', href: '/', order: 1 },
            { label: 'Power BI', href: '/powerbi', order: 2 },
            { label: 'Tableau', href: '/tableau', order: 3 },
            { label: 'Excel', href: '/excel', order: 4 },
        ];
    }

    try {
        const contents = fs.readFileSync(navFile, 'utf-8');
        const data = JSON.parse(contents);
        return (data.links || []).sort((a: NavigationLink, b: NavigationLink) => a.order - b.order);
    } catch {
        return [];
    }
});

/**
 * Get skills framework settings
 */
export const getSkillsSettings = cache((): SkillsSettings => {
    const skillsFile = path.join(CONTENT_ROOT, 'settings', 'skills.json');

    if (!fs.existsSync(skillsFile)) {
        return { primary: [], supporting: [], familiar: [] };
    }

    try {
        const contents = fs.readFileSync(skillsFile, 'utf-8');
        return JSON.parse(contents);
    } catch {
        return { primary: [], supporting: [], familiar: [] };
    }
});

/**
 * Get about page content (markdown)
 */
export const getAboutContent = cache((): { title: string; content: string } => {
    const aboutFile = path.join(CONTENT_ROOT, 'settings', 'about.md');

    if (!fs.existsSync(aboutFile)) {
        return { title: 'About', content: '' };
    }

    try {
        const contents = fs.readFileSync(aboutFile, 'utf-8');
        const { data, content } = matter(contents);
        return {
            title: (data.title as string) || 'About',
            content,
        };
    } catch {
        return { title: 'About', content: '' };
    }
});

/**
 * Get professional profile content (markdown)
 */
export const getProfileContent = cache((): { title: string; content: string } => {
    const profileFile = path.join(CONTENT_ROOT, 'settings', 'profile.md');

    if (!fs.existsSync(profileFile)) {
        return { title: 'Professional Profile', content: '' };
    }

    try {
        const contents = fs.readFileSync(profileFile, 'utf-8');
        const { data, content } = matter(contents);
        return {
            title: (data.title as string) || 'Professional Profile',
            content,
        };
    } catch {
        return { title: 'Professional Profile', content: '' };
    }
});

/**
 * Get all project slugs for a category
 * Used for static path generation in generateStaticParams
 */
export const getProjectSlugs = (category: ProjectCategory): string[] => {
    const categoryDir = path.join(CONTENT_ROOT, category);

    if (!fs.existsSync(categoryDir)) {
        return [];
    }

    const files = fs.readdirSync(categoryDir);

    return files
        .filter((file: string) => file.endsWith('.md'))
        .map((file: string) => file.replace(/\.md$/, '').toLowerCase());
};

/**
 * Get category info by ID
 */
export const getCategoryInfo = (
    category: ProjectCategory
): CategoryInfo | undefined => {
    return CATEGORY_INFO.find((c: CategoryInfo) => c.id === category);
};
