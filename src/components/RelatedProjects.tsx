import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/types';

interface RelatedProjectsProps {
    projects: Project[];
}

/**
 * Related Projects Component
 * Shows related case studies based on shared tags/tools
 */
export default function RelatedProjects({ projects }: RelatedProjectsProps) {
    if (projects.length === 0) {
        return null;
    }

    return (
        <section className="mt-12 pt-8 border-t border-surface-200 dark:border-surface-700">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-6">
                Related Case Studies
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/${project.category}/${project.slug}`}
                        className="group block"
                    >
                        <article className="panel card-interactive overflow-hidden">
                            {/* Thumbnail */}
                            <div className="aspect-[16/10] relative bg-surface-100 dark:bg-surface-700">
                                {project.thumbnail ? (
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-surface-300 dark:text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <p className="text-xs text-surface-500 dark:text-surface-400 uppercase mb-1">
                                    {project.category}
                                </p>
                                <h4 className="font-medium text-surface-900 dark:text-surface-50 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-1">
                                    {project.title}
                                </h4>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
