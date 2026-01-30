import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Contact from '@/components/Contact';
import CategoryCard from '@/components/CategoryCard';
import ProjectGrid from '@/components/ProjectGrid';
import { NoFeaturedEmpty } from '@/components/EmptyState';
import { CATEGORY_INFO, getCategoryStats, getFeaturedProjects } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Analytics Portfolio | Data-Driven Insights',
    description:
        'Professional analytics portfolio showcasing Power BI dashboards, Tableau visualizations, and Excel models. Transforming data into actionable insights.',
    openGraph: {
        title: 'Analytics Portfolio',
        description: 'Data-driven insights through interactive dashboards and visualizations.',
        type: 'website',
    },
};

export default function HomePage() {
    const stats = getCategoryStats();
    const featuredProjects = getFeaturedProjects();

    return (
        <>
            {/* Hero Section */}
            <Hero />

            {/* Categories Section */}
            <section id="projects" className="section bg-surface-50/50 dark:bg-surface-900/50">
                <div className="container-wide">
                    {/* Section Header */}
                    <div className="text-center mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
                            Expertise
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
                            Analytics Specializations
                        </h2>
                        <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
                            Explore my work across different analytics platforms and tools.
                        </p>
                    </div>

                    {/* Category Cards Grid */}
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {CATEGORY_INFO.map((category, index) => (
                            <div
                                key={category.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                            >
                                <CategoryCard
                                    category={category}
                                    projectCount={stats[category.id]}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Total projects stat */}
                    <div className="text-center mt-12">
                        <p className="text-surface-500 dark:text-surface-400">
                            <span className="font-semibold text-primary-600 dark:text-primary-400 text-lg">
                                {stats.total}
                            </span>
                            {' '}projects across all categories
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            {featuredProjects.length > 0 ? (
                <section className="section">
                    <div className="container-wide">
                        {/* Section Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
                                    Featured
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
                                    Highlighted Work
                                </h2>
                            </div>
                            <a
                                href="#projects"
                                className="link text-sm font-medium flex items-center gap-1 group"
                            >
                                View all projects
                                <svg
                                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>

                        {/* Featured Projects Grid */}
                        <ProjectGrid projects={featuredProjects} />
                    </div>
                </section>
            ) : (
                <section className="py-12">
                    <div className="container-wide">
                        <NoFeaturedEmpty />
                    </div>
                </section>
            )}

            {/* About Section */}
            <About />

            {/* Contact Section */}
            <section id="contact" className="section bg-gradient-to-b from-surface-50 to-white dark:from-surface-900 dark:to-surface-950">
                <div className="container-wide">
                    <Contact />
                </div>
            </section>
        </>
    );
}
