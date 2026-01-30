import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectGrid from '@/components/ProjectGrid';
import { getProjects, getCategoryInfo } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Excel Projects | Analytics Portfolio',
    description: 'Advanced Excel models, templates, VBA automation, and financial modeling solutions for enterprise reporting.',
};

export default function ExcelPage() {
    const projects = getProjects('excel');
    const categoryInfo = getCategoryInfo('excel');

    return (
        <div className="pt-20 lg:pt-24">
            <section className="py-12 lg:py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-white dark:from-surface-900 dark:via-surface-900 dark:to-surface-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-surface-500 mb-6">
                        <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-surface-900 dark:text-white">Excel</span>
                    </nav>
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl shadow-lg">
                            {categoryInfo?.icon}
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-3">
                                Excel Projects
                            </h1>
                            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl">
                                {categoryInfo?.description}
                            </p>
                            <div className="mt-4 text-sm text-surface-500">
                                {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ProjectGrid projects={projects} emptyMessage="No Excel projects published yet." />
                </div>
            </section>
        </div>
    );
}
