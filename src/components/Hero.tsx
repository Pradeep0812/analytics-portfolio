'use client';

import React from 'react';
import Link from 'next/link';

interface HeroProps {
    title?: string;
    subtitle?: string;
    description?: string;
}

/**
 * Hero section with animated elements and call-to-action
 */
export default function Hero({
    title = 'Analytics Portfolio',
    subtitle = 'Data-Driven Insights',
    description = 'Transforming complex data into actionable insights through interactive dashboards, compelling visualizations, and enterprise-grade reporting solutions.',
}: HeroProps) {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 gradient-hero">
                {/* Gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow delay-500" />
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-float" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Availability badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 mb-8 animate-fade-in">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                            Available for new opportunities
                        </span>
                    </div>

                    {/* Subtitle */}
                    <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <span className="text-sm font-semibold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
                            {subtitle}
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-surface-900 dark:text-white mb-6 animate-fade-in-up"
                        style={{ animationDelay: '200ms' }}
                    >
                        {title.split(' ').map((word, i) => (
                            <span key={i}>
                                {i === 1 ? (
                                    <span className="text-gradient">{word}</span>
                                ) : (
                                    word
                                )}{' '}
                            </span>
                        ))}
                    </h1>

                    {/* Description */}
                    <p
                        className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
                        style={{ animationDelay: '300ms' }}
                    >
                        {description}
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
                        style={{ animationDelay: '400ms' }}
                    >
                        <Link
                            href="#projects"
                            className="btn btn-primary px-8 py-4 text-base gap-2 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
                        >
                            View My Work
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="#contact"
                            className="btn btn-secondary px-8 py-4 text-base gap-2"
                        >
                            Get in Touch
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div
                        className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 pt-10 border-t border-surface-200 dark:border-surface-700 animate-fade-in-up"
                        style={{ animationDelay: '500ms' }}
                    >
                        {[
                            { value: '5+', label: 'Years Experience' },
                            { value: '50+', label: 'Projects Delivered' },
                            { value: '20+', label: 'Clients Served' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <a
                    href="#projects"
                    className="flex flex-col items-center gap-2 text-surface-400 hover:text-primary-500 transition-colors"
                    aria-label="Scroll to projects"
                >
                    <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
