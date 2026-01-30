'use client';

import React from 'react';

interface SkeletonProps {
    className?: string;
}

/**
 * Base skeleton element
 */
export function Skeleton({ className = '' }: SkeletonProps) {
    return <div className={`skeleton animate-pulse ${className}`} />;
}

/**
 * Skeleton for project cards
 */
export function ProjectCardSkeleton() {
    return (
        <div className="card overflow-hidden">
            {/* Thumbnail skeleton */}
            <div className="skeleton aspect-video w-full" />

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Title */}
                <div className="skeleton h-6 w-3/4 rounded" />

                {/* Description */}
                <div className="space-y-2">
                    <div className="skeleton h-4 w-full rounded" />
                    <div className="skeleton h-4 w-5/6 rounded" />
                </div>

                {/* Tools */}
                <div className="flex gap-2">
                    <div className="skeleton h-6 w-16 rounded-md" />
                    <div className="skeleton h-6 w-20 rounded-md" />
                    <div className="skeleton h-6 w-14 rounded-md" />
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-2">
                    <div className="skeleton h-4 w-24 rounded" />
                    <div className="skeleton h-8 w-8 rounded-full" />
                </div>
            </div>
        </div>
    );
}

/**
 * Grid of skeleton cards
 */
export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
            ))}
        </div>
    );
}

/**
 * Skeleton for category cards
 */
export function CategoryCardSkeleton() {
    return (
        <div className="card p-6">
            {/* Icon */}
            <div className="skeleton w-14 h-14 rounded-xl mb-4" />

            {/* Title */}
            <div className="skeleton h-6 w-2/3 rounded mb-2" />

            {/* Description */}
            <div className="space-y-2 mb-4">
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-4/5 rounded" />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
                <div className="skeleton h-4 w-20 rounded" />
                <div className="skeleton h-6 w-6 rounded-full" />
            </div>
        </div>
    );
}

/**
 * Skeleton for hero section
 */
export function HeroSkeleton() {
    return (
        <div className="py-20 lg:py-32 flex flex-col items-center text-center space-y-8">
            {/* Badge */}
            <div className="skeleton h-8 w-32 rounded-full" />

            {/* Title */}
            <div className="skeleton h-16 w-3/4 max-w-2xl rounded" />

            {/* Subtitle */}
            <div className="skeleton h-8 w-1/2 max-w-xl rounded" />

            {/* Description */}
            <div className="space-y-3 w-full max-w-2xl">
                <div className="skeleton h-5 w-full rounded" />
                <div className="skeleton h-5 w-4/5 mx-auto rounded" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <div className="skeleton h-12 w-36 rounded-xl" />
                <div className="skeleton h-12 w-36 rounded-xl" />
            </div>
        </div>
    );
}

/**
 * Inline loading spinner
 */
export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-10 h-10 border-3',
    };

    return (
        <div
            className={`${sizeClasses[size]} border-surface-300 dark:border-surface-600 border-t-primary-500 rounded-full animate-spin`}
        />
    );
}

/**
 * Full page loading state
 */
export function PageLoader() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
            <Spinner size="lg" />
            <p className="text-surface-500 dark:text-surface-400 animate-pulse">
                Loading...
            </p>
        </div>
    );
}

export default Skeleton;
