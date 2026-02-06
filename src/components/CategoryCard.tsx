'use client';

import React from 'react';
import Link from 'next/link';
import type { CategoryInfo } from '@/lib/types';

interface CategoryCardProps {
    category: CategoryInfo;
    projectCount: number;
}

/**
 * Enterprise Category Panel
 * Panel-based design for analytics category navigation
 */
export default function CategoryCard({ category, projectCount }: CategoryCardProps) {
    return (
        <Link href={category.href} className="block group">
            <article className="panel card-interactive h-full">
                <div className="p-6">
                    {/* Icon */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-100 dark:bg-surface-700 text-xl mb-4">
                        {category.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                        {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-2 mb-4">
                        {category.description}
                    </p>

                    {/* Count & Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-surface-200 dark:border-surface-700">
                        <span className="text-sm text-surface-500 dark:text-surface-400">
                            {projectCount} {projectCount === 1 ? 'case study' : 'case studies'}
                        </span>
                        <span className="text-sm font-medium text-accent-600 dark:text-accent-400 group-hover:underline underline-offset-4">
                            View →
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
