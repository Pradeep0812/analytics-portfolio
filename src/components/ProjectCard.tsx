'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
    project: Project;
}

/**
 * Enterprise Case Study Card
 * Information-dense, professional layout for case studies
 */
export default function ProjectCard({ project }: ProjectCardProps) {
    const projectUrl = `/${project.category}/${project.slug}`;

    // Format date
    const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
    });

    // Category labels
    const categoryLabels: Record<string, string> = {
        powerbi: 'Power BI',
        tableau: 'Tableau',
        excel: 'Excel',
    };

    return (
        <Link href={projectUrl} className="block group">
            <article className="panel card-interactive h-full overflow-hidden">
                {/* Thumbnail */}
                <div className="aspect-[16/10] relative bg-surface-100 dark:bg-surface-700 overflow-hidden">
                    {project.thumbnail ? (
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-12 h-12 text-surface-300 dark:text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                    )}

                    {/* Featured badge */}
                    {project.featured && (
                        <div className="absolute top-3 left-3">
                            <span className="badge badge-accent">
                                Featured
                            </span>
                        </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                        <span className="badge badge-default">
                            {categoryLabels[project.category] || project.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Title */}
                    <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-1">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-2 mb-4">
                        {project.description}
                    </p>

                    {/* Tools */}
                    {project.tools && project.tools.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tools.slice(0, 3).map((tool) => (
                                <span
                                    key={tool}
                                    className="text-xs px-2 py-0.5 bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 rounded"
                                >
                                    {tool}
                                </span>
                            ))}
                            {project.tools.length > 3 && (
                                <span className="text-xs text-surface-500 dark:text-surface-400">
                                    +{project.tools.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-surface-200 dark:border-surface-700">
                        <span className="text-xs text-surface-500 dark:text-surface-400">
                            {formattedDate}
                        </span>
                        <span className="text-sm font-medium text-accent-600 dark:text-accent-400 group-hover:underline underline-offset-4">
                            View Case Study →
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
