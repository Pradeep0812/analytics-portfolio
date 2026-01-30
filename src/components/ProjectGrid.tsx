'use client';

import React from 'react';
import ProjectCard from './ProjectCard';
import EmptyState, { NoProjectsEmpty } from './EmptyState';
import type { Project } from '@/lib/types';

interface ProjectGridProps {
    projects: Project[];
    emptyMessage?: string;
    emptyCategory?: string;
    showSkeleton?: boolean;
    columns?: 2 | 3;
}

/**
 * Responsive grid layout for project cards
 * Includes empty state handling and loading skeleton
 */
export default function ProjectGrid({
    projects,
    emptyMessage,
    emptyCategory,
    columns = 3,
}: ProjectGridProps) {
    const gridCols = columns === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    // Empty state
    if (projects.length === 0) {
        if (emptyMessage) {
            return (
                <EmptyState
                    icon={
                        <svg
                            className="w-16 h-16 text-surface-300 dark:text-surface-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    }
                    title={emptyMessage}
                    description="Projects will appear here once they're published in the CMS."
                />
            );
        }
        return <NoProjectsEmpty category={emptyCategory} />;
    }

    return (
        <div className={`grid ${gridCols} gap-6 lg:gap-8`}>
            {projects.map((project, index) => (
                <div
                    key={`${project.category}-${project.slug}`}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                >
                    <ProjectCard project={project} />
                </div>
            ))}
        </div>
    );
}
