import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getAboutContent } from '@/lib/content';

/**
 * Enterprise About Section
 * Professional analytical narrative - not a personal bio
 */
export default function About() {
    const aboutContent = getAboutContent();

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
            </div>
        </section>
    );
}
