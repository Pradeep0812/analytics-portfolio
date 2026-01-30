'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
    project: Project;
    priority?: boolean;
}

/**
 * Project preview card with micro-interactions
 * Displays thumbnail, title, description, and metadata
 */
export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
    const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    const categoryColors: Record<string, string> = {
        powerbi: 'from-amber-500 to-orange-600',
        tableau: 'from-blue-500 to-indigo-600',
        excel: 'from-emerald-500 to-teal-600',
    };

    const categoryBadgeColors: Record<string, string> = {
        powerbi: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
        tableau: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        excel: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    };

    return (
        <Link
            href={`/${project.category}/${project.slug}`}
            className="group block card card-interactive overflow-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-900"
            aria-label={`View ${project.title} - ${project.category} project`}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-surface-100 dark:bg-surface-800">
                {project.thumbnail ? (
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={priority}
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[project.category]} opacity-20`}>
                        <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-50">
                            {project.category === 'powerbi' && '📊'}
                            {project.category === 'tableau' && '📈'}
                            {project.category === 'excel' && '📑'}
                        </div>
                    </div>
                )}

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Featured badge */}
                {project.featured && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-semibold shadow-lg shadow-amber-500/25">
                            <svg
                                className="w-3.5 h-3.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Featured
                        </span>
                    </div>
                )}

                {/* Category badge */}
                <div className="absolute top-3 right-3 z-10">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryBadgeColors[project.category]} backdrop-blur-sm`}>
                        {project.category === 'powerbi' && 'Power BI'}
                        {project.category === 'tableau' && 'Tableau'}
                        {project.category === 'excel' && 'Excel'}
                    </span>
                </div>

                {/* View indicator */}
                <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm text-sm font-medium text-surface-900 dark:text-white shadow-lg">
                        View Project
                        <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-surface-600 dark:text-surface-300 text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tools.slice(0, 4).map((tool) => (
                        <span
                            key={tool}
                            className="px-2 py-1 rounded-md bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 text-xs font-medium transition-colors group-hover:bg-surface-200 dark:group-hover:bg-surface-600"
                        >
                            {tool}
                        </span>
                    ))}
                    {project.tools.length > 4 && (
                        <span className="px-2 py-1 rounded-md bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-400 text-xs font-medium">
                            +{project.tools.length - 4}
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-700">
                    <time
                        dateTime={project.date}
                        className="text-xs text-surface-500 dark:text-surface-400"
                    >
                        {formattedDate}
                    </time>

                    {/* Arrow indicator */}
                    <div className="w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                        <svg
                            className="w-4 h-4 text-surface-400 group-hover:text-white transition-colors transform group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
