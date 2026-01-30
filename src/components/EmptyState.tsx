'use client';

import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
    variant?: 'default' | 'minimal' | 'card';
}

/**
 * Professional empty state component
 * Used when there's no content to display
 */
export default function EmptyState({
    icon,
    title,
    description,
    actionLabel,
    actionHref,
    onAction,
    variant = 'default',
}: EmptyStateProps) {
    const defaultIcon = (
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
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
        </svg>
    );

    const content = (
        <>
            {/* Icon */}
            <div className="mb-4 animate-float">
                {icon || defaultIcon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                {title}
            </h3>

            {/* Description */}
            {description && (
                <p className="text-surface-500 dark:text-surface-400 max-w-sm mx-auto mb-6">
                    {description}
                </p>
            )}

            {/* Action */}
            {(actionLabel && (actionHref || onAction)) && (
                actionHref ? (
                    <Link
                        href={actionHref}
                        className="btn btn-primary px-5 py-2.5 text-sm"
                    >
                        {actionLabel}
                    </Link>
                ) : (
                    <button
                        onClick={onAction}
                        className="btn btn-primary px-5 py-2.5 text-sm"
                    >
                        {actionLabel}
                    </button>
                )
            )}
        </>
    );

    if (variant === 'minimal') {
        return (
            <div className="text-center py-12">
                {content}
            </div>
        );
    }

    if (variant === 'card') {
        return (
            <div className="card p-8 text-center">
                {content}
            </div>
        );
    }

    // Default variant
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="bg-surface-50 dark:bg-surface-800/50 rounded-2xl p-8 max-w-md">
                {content}
            </div>
        </div>
    );
}

/**
 * Pre-configured empty states for common scenarios
 */
export function NoProjectsEmpty({ category }: { category?: string }) {
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
            title={category ? `No ${category} projects yet` : 'No projects yet'}
            description="Projects will appear here once they're published in the CMS."
        />
    );
}

export function NoFeaturedEmpty() {
    return (
        <EmptyState
            icon={
                <svg
                    className="w-16 h-16 text-amber-300 dark:text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                </svg>
            }
            title="No featured projects"
            description="Mark projects as featured in the CMS to highlight them here."
            variant="minimal"
        />
    );
}

export function NoResultsEmpty({ query }: { query?: string }) {
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            }
            title="No results found"
            description={
                query
                    ? `No projects match "${query}". Try a different search term.`
                    : 'No projects match your filters. Try adjusting your criteria.'
            }
        />
    );
}
