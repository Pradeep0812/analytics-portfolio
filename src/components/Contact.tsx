'use client';

import React from 'react';

/**
 * Contact section with call-to-action buttons
 */
export default function Contact() {
    return (
        <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto text-center">
                {/* Section tag */}
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
                    Get In Touch
                </span>

                <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
                    Let&apos;s Work Together
                </h2>

                <p className="text-lg text-surface-600 dark:text-surface-300 mb-10 leading-relaxed">
                    Interested in collaborating or have a project in mind? I&apos;d love to hear from you.
                    Let&apos;s discuss how data-driven insights can transform your business.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="mailto:contact@example.com"
                        className="btn btn-primary px-8 py-4 text-base gap-2 w-full sm:w-auto shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send Email
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary px-8 py-4 text-base gap-2 w-full sm:w-auto"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        Connect on LinkedIn
                    </a>
                </div>

                {/* Additional contact options */}
                <div className="mt-12 pt-8 border-t border-surface-200 dark:border-surface-700">
                    <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
                        Or schedule a call
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 text-sm font-medium hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                    >
                        <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Schedule a Meeting
                    </a>
                </div>

                {/* Response time indicator */}
                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Typically responds within 24 hours
                </div>
            </div>
        </div>
    );
}
