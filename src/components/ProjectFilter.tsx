'use client';

import React, { useState, useMemo } from 'react';
import type { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';

interface ProjectFilterProps {
    projects: Project[];
}

/**
 * Project Filter Component
 * Enables filtering by tools and sorting
 */
export default function ProjectFilter({ projects }: ProjectFilterProps) {
    const [selectedTool, setSelectedTool] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'date' | 'featured'>('date');

    // Extract unique tools from all projects
    const allTools = useMemo(() => {
        const tools = new Set<string>();
        projects.forEach(p => p.tools.forEach(t => tools.add(t)));
        return Array.from(tools).sort();
    }, [projects]);

    // Filter and sort projects
    const filteredProjects = useMemo(() => {
        let result = [...projects];

        // Filter by tool
        if (selectedTool !== 'all') {
            result = result.filter(p => p.tools.includes(selectedTool));
        }

        // Sort
        if (sortBy === 'featured') {
            result.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
        } else {
            result.sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        }

        return result;
    }, [projects, selectedTool, sortBy]);

    return (
        <div>
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-surface-200 dark:border-surface-700">
                <div className="flex items-center gap-4">
                    {/* Tool Filter */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="tool-filter" className="text-sm text-surface-600 dark:text-surface-400">
                            Filter:
                        </label>
                        <select
                            id="tool-filter"
                            value={selectedTool}
                            onChange={(e) => setSelectedTool(e.target.value)}
                            className="text-sm bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded-md px-3 py-1.5 text-surface-900 dark:text-surface-50 focus:ring-2 focus:ring-accent-500"
                        >
                            <option value="all">All Tools</option>
                            {allTools.map(tool => (
                                <option key={tool} value={tool}>{tool}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort-by" className="text-sm text-surface-600 dark:text-surface-400">
                            Sort:
                        </label>
                        <select
                            id="sort-by"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'date' | 'featured')}
                            className="text-sm bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded-md px-3 py-1.5 text-surface-900 dark:text-surface-50 focus:ring-2 focus:ring-accent-500"
                        >
                            <option value="date">Date</option>
                            <option value="featured">Featured</option>
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <p className="text-sm text-surface-500 dark:text-surface-400">
                    {filteredProjects.length} {filteredProjects.length === 1 ? 'case study' : 'case studies'}
                </p>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
                <div className="panel p-12 text-center">
                    <p className="text-surface-500 dark:text-surface-400">
                        No case studies match the selected filter.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
}
