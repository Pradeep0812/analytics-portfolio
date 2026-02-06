import React from 'react';
import ReactMarkdown from 'react-markdown';
import Testimonials from './Testimonials';
import { getAboutContent, getTestimonials } from '@/lib/content';

/**
 * Enterprise About Section
 * Professional analytical narrative with testimonials
 */
export default function About() {
    const aboutContent = getAboutContent();
    const testimonials = getTestimonials();

    return (
        <section id="about" className="section border-b border-surface-200 dark:border-surface-700">
            <div className="container-tight">
                {/* Section Header */}
                <div className="section-header">
                    <h6 className="section-title">About</h6>
                    <h2>Analytical Approach</h2>
                </div>

                {/* Content from CMS */}
                <div className="prose-custom max-w-none">
                    <ReactMarkdown>{aboutContent.content}</ReactMarkdown>
                </div>

                {/* Testimonials */}
                <Testimonials testimonials={testimonials} />
            </div>
        </section>
    );
}
