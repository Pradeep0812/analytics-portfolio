import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Contact from '@/components/Contact';
import CategoryCard from '@/components/CategoryCard';
import ProjectGrid from '@/components/ProjectGrid';
import { NoFeaturedEmpty } from '@/components/EmptyState';
import { CATEGORY_INFO, getCategoryStats, getFeaturedProjects, getHeroSettings } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Analytics Platform | Enterprise Analytics Knowledge System',
    description:
        'Enterprise analytics knowledge platform documenting case studies, methodologies, and data-driven insights across Power BI, Tableau, and Excel.',
    openGraph: {
        title: 'Analytics Platform',
        description: 'Enterprise analytics knowledge system with case studies and insights.',
        type: 'website',
    },
};

export default function HomePage() {
    const stats = getCategoryStats();
    const featuredProjects = getFeaturedProjects();
    const heroSettings = getHeroSettings();

    return (
        <main>
            {/* Executive Entry Point */}
            <Hero
                title={heroSettings.hero.title}
                subtitle={heroSettings.hero.subtitle}
                statement={heroSettings.hero.statement}
                stats={heroSettings.stats}
            />

            {/* Analytics Categories */}
            <section id="case-studies" className="section border-b border-surface-200 dark:border-surface-700">
                <div className="container-wide">
                    {/* Section Header - Report style */}
                    <div className="section-header">
                        <h6 className="section-title">Analytics Categories</h6>
                        <h2>Case Study Repository</h2>
                        <p className="mt-3 text-surface-600 dark:text-surface-300 max-w-2xl">
                            Documented case studies organized by analytics platform and methodology.
                        </p>
                    </div>

                    {/* Category Panels */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {CATEGORY_INFO.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                projectCount={stats[category.id]}
                            />
                        ))}
                    </div>

                    {/* Summary stat */}
                    <div className="mt-10 pt-6 border-t border-surface-200 dark:border-surface-700">
                        <p className="text-sm text-surface-500 dark:text-surface-400">
                            <span className="font-medium text-surface-700 dark:text-surface-200">
                                {stats.total} case studies
                            </span>
                            {' '}documented across all categories
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Case Studies */}
            {featuredProjects.length > 0 ? (
                <section className="section border-b border-surface-200 dark:border-surface-700">
                    <div className="container-wide">
                        {/* Section Header */}
                        <div className="section-header flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <h6 className="section-title">Featured</h6>
                                <h2>Selected Case Studies</h2>
                            </div>
                            <a
                                href="#case-studies"
                                className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline underline-offset-4"
                            >
                                View all →
                            </a>
                        </div>

                        {/* Projects Grid */}
                        <ProjectGrid projects={featuredProjects} />
                    </div>
                </section>
            ) : (
                <section className="section">
                    <div className="container-wide">
                        <NoFeaturedEmpty />
                    </div>
                </section>
            )}

            {/* About / Enterprise Profile */}
            <About />

            {/* Contact */}
            <section id="contact" className="section bg-surface-100 dark:bg-surface-800">
                <div className="container-wide">
                    <Contact />
                </div>
            </section>
        </main>
    );
}
