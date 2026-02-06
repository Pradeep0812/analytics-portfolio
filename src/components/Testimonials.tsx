import React from 'react';
import type { Testimonial } from '@/lib/content';

interface TestimonialsProps {
    testimonials: Testimonial[];
}

/**
 * Enterprise Testimonials Component
 * Professional credibility module - no sliders, no ratings
 */
export default function Testimonials({ testimonials }: TestimonialsProps) {
    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section className="mt-12 pt-8 border-t border-surface-200 dark:border-surface-700">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-6">
                Client Feedback
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
                {testimonials.map((testimonial, index) => (
                    <blockquote
                        key={index}
                        className="panel p-6"
                    >
                        <p className="text-surface-700 dark:text-surface-300 mb-4 italic">
                            &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <footer className="text-sm">
                            <cite className="not-italic">
                                <span className="font-medium text-surface-900 dark:text-surface-50">
                                    {testimonial.author}
                                </span>
                                {testimonial.company && (
                                    <span className="text-surface-500 dark:text-surface-400">
                                        {' '}— {testimonial.company}
                                    </span>
                                )}
                            </cite>
                            {testimonial.context && (
                                <p className="text-surface-500 dark:text-surface-400 mt-1">
                                    {testimonial.context}
                                </p>
                            )}
                        </footer>
                    </blockquote>
                ))}
            </div>
        </section>
    );
}
