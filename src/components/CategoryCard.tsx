'use client';

import React from 'react';
import Link from 'next/link';
import type { CategoryInfo } from '@/lib/types';

interface CategoryCardProps {
    category: CategoryInfo;
    projectCount: number;
}

/**
 * Category showcase card with gradient icon and hover effects
 */
export default function CategoryCard({ category, projectCount }: CategoryCardProps) {
    return (
        <Link
            href={category.href}
            className="group block card card-interactive p-6 lg:p-8 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-900"
            aria-label={`View ${category.name} projects - ${projectCount} projects`}
        >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />

            {/* Icon */}
            <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300`} />
            </div>

            {/* Content */}
            <div className="relative mt-5">
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {category.name}
                </h3>
                <p className="text-surface-600 dark:text-surface-300 text-sm leading-relaxed mb-4 line-clamp-2">
                    {category.description}
                </p>
            </div>

            {/* Footer */}
            <div className="relative flex items-center justify-between pt-4 border-t border-surface-100 dark:border-surface-700">
                <span className="text-sm text-surface-500 dark:text-surface-400">
                    <span className="font-semibold text-surface-900 dark:text-white">{projectCount}</span>
                    {' '}
                    {projectCount === 1 ? 'project' : 'projects'}
                </span>

                {/* Arrow */}
                <div className="w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300 group-hover:translate-x-1">
                    <svg
                        className="w-4 h-4 text-surface-400 group-hover:text-white transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
