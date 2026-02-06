'use client';

import React from 'react';
import Link from 'next/link';

interface HeroStat {
    value: string;
    label: string;
}

interface HeroProps {
    title?: string;
    subtitle?: string;
    statement?: string;
    stats?: HeroStat[];
}

/**
 * Enterprise Executive Entry Point
 * Clean, professional positioning without marketing elements
 */
export default function Hero({
    title = 'Analytics Platform',
    subtitle = 'Enterprise Analytics Knowledge System',
    statement = 'Documenting analytical methodologies, case studies, and data-driven insights for business decision-making.',
    stats = [
        { value: '5+', label: 'Years in Analytics' },
        { value: '50+', label: 'Case Studies' },
        { value: '20+', label: 'Enterprise Clients' },
    ],
}: HeroProps) {
    return (
        <section className="relative py-16 lg:py-24 border-b border-surface-200 dark:border-surface-700">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Subtitle - Section identifier */}
                <div className="mb-4">
                    <span className="text-sm font-medium tracking-wide text-accent-600 dark:text-accent-400 uppercase">
                        {subtitle}
                    </span>
                </div>

                {/* Title - Report-style heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-surface-900 dark:text-surface-50 mb-6 tracking-tight">
                    {title}
                </h1>

                {/* Statement - Professional positioning */}
                <p className="text-lg text-surface-600 dark:text-surface-300 max-w-3xl leading-relaxed mb-10">
                    {statement}
                </p>

                {/* Navigation Entry Points */}
                <div className="flex flex-wrap gap-3 mb-12">
                    <Link
                        href="#case-studies"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-900 dark:bg-surface-50 text-surface-50 dark:text-surface-900 text-sm font-medium rounded-md hover:bg-surface-800 dark:hover:bg-surface-100 transition-colors"
                    >
                        View Case Studies
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    <Link
                        href="#contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 text-sm font-medium rounded-md hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                    >
                        Contact
                    </Link>
                </div>

                {/* Statistics - Subtle, informational */}
                {stats && stats.length > 0 && (
                    <div className="pt-8 border-t border-surface-200 dark:border-surface-700">
                        <div className="grid grid-cols-3 gap-8 max-w-md">
                            {stats.map((stat, index) => (
                                <div key={index}>
                                    <div className="text-2xl font-semibold text-surface-900 dark:text-surface-50">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
