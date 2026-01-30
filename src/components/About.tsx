'use client';

import React from 'react';

/**
 * About section with skills and experience
 */
export default function About() {
    const skills = [
        { name: 'Power BI', level: 95, color: 'from-amber-500 to-orange-600' },
        { name: 'Tableau', level: 88, color: 'from-blue-500 to-indigo-600' },
        { name: 'Excel / VBA', level: 92, color: 'from-emerald-500 to-teal-600' },
        { name: 'SQL', level: 90, color: 'from-violet-500 to-purple-600' },
        { name: 'Python', level: 75, color: 'from-sky-500 to-cyan-600' },
        { name: 'Data Modeling', level: 85, color: 'from-pink-500 to-rose-600' },
    ];

    const certifications = [
        { name: 'Microsoft Certified: Power BI Data Analyst', icon: '🏅' },
        { name: 'Tableau Desktop Specialist', icon: '🏆' },
        { name: 'Google Data Analytics Professional', icon: '📊' },
    ];

    return (
        <section className="section bg-white dark:bg-surface-950">
            <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content */}
                    <div>
                        {/* Section tag */}
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
                            About Me
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-6">
                            Turning Data into{' '}
                            <span className="text-gradient">Actionable Insights</span>
                        </h2>

                        <div className="prose-custom space-y-4">
                            <p className="text-lg text-surface-600 dark:text-surface-300 leading-relaxed">
                                I&apos;m a passionate Data Analyst with over 5 years of experience in business intelligence
                                and data visualization. I specialize in creating interactive dashboards that help
                                organizations make data-driven decisions.
                            </p>
                            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                                My expertise spans across Power BI, Tableau, and Excel, with a strong foundation in
                                SQL and Python for data manipulation and analysis. I believe in the power of visual
                                storytelling to communicate complex insights effectively.
                            </p>
                        </div>

                        {/* Certifications */}
                        <div className="mt-8">
                            <h3 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wider mb-4">
                                Certifications
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {certifications.map((cert) => (
                                    <div
                                        key={cert.name}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 text-sm font-medium hover-scale transition-transform cursor-default"
                                    >
                                        <span>{cert.icon}</span>
                                        <span>{cert.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="card p-6 lg:p-8">
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-6">
                            Technical Skills
                        </h3>

                        <div className="space-y-5">
                            {skills.map((skill, index) => (
                                <div key={skill.name} className="group">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                                            {skill.name}
                                        </span>
                                        <span className="text-sm font-semibold text-surface-900 dark:text-white">
                                            {skill.level}%
                                        </span>
                                    </div>
                                    <div className="h-2.5 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                                            style={{
                                                width: `${skill.level}%`,
                                                animationDelay: `${index * 100}ms`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Experience stats */}
                        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-surface-200 dark:border-surface-700">
                            <div className="text-center p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50">
                                <div className="text-2xl font-bold text-surface-900 dark:text-white">5+</div>
                                <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">Years Experience</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50">
                                <div className="text-2xl font-bold text-surface-900 dark:text-white">50+</div>
                                <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">Projects</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
