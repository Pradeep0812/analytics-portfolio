// =============================================================================
// TYPE DEFINITIONS (HARDENED)
// Analytics Portfolio Platform - Production-Safe Types
// =============================================================================

/**
 * Valid project categories - constant array for runtime validation
 */
export const CATEGORIES = ['powerbi', 'tableau', 'excel'] as const;

/**
 * Project category type derived from CATEGORIES
 */
export type ProjectCategory = (typeof CATEGORIES)[number];

/**
 * Project status - controls frontend visibility
 */
export type ProjectStatus = 'draft' | 'published';

/**
 * Project frontmatter schema - matches CMS config.yml exactly
 */
export interface ProjectFrontmatter {
    title: string;
    description: string;
    thumbnail: string;
    video?: string;
    pdf?: string;
    powerbi_embed_url?: string;
    tableau_embed_url?: string;
    download?: string;
    tools: string[];
    tags?: string[];
    order: number;
    status: ProjectStatus;
    featured: boolean;
    date: string;
}

/**
 * Complete project including content and metadata
 */
export interface Project extends ProjectFrontmatter {
    slug: string;
    category: ProjectCategory;
    content: string;
}

/**
 * Category metadata for display
 */
export interface CategoryInfo {
    id: ProjectCategory;
    name: string;
    description: string;
    icon: string;
    color: string;
    href: string;
}

/**
 * Site settings from CMS
 */
export interface SiteSettings {
    title: string;
    description: string;
    author: string;
    role: string;
    email?: string;
    linkedin?: string;
    github?: string;
}

/**
 * Category statistics for homepage
 */
export interface CategoryStats {
    powerbi: number;
    tableau: number;
    excel: number;
    total: number;
}

/**
 * Project page params for dynamic routes
 */
export interface ProjectPageProps {
    params: {
        slug: string;
    };
}

/**
 * Type guard to validate category string
 */
export function isValidCategory(category: string): category is ProjectCategory {
    return CATEGORIES.includes(category as ProjectCategory);
}
