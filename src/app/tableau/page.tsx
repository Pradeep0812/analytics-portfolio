import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectFilter from '@/components/ProjectFilter';
import { getProjects, getCategoryInfo } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Tableau | Case Studies',
    description: 'Tableau case studies documenting data visualizations and analytical dashboards.',
};

export default function TableauPage() {
    const projects = getProjects('tableau');
    const categoryInfo = getCategoryInfo('tableau');

    return (
        <div className="section">
            <div className="container-wide">
                {/* Header */}
                <div className="section-header">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400 mb-4">
                        <Link href="/" className="hover:text-accent-600 dark:hover:text-accent-400">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-surface-900 dark:text-surface-50">Tableau</span>
                    </nav>

                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-3xl">{categoryInfo?.icon}</span>
                        <h1>Tableau Case Studies</h1>
                    </div>
                    <p className="text-surface-600 dark:text-surface-400 max-w-2xl">
                        {categoryInfo?.description}
                    </p>
                </div>

                {/* Projects with Filter */}
                {projects.length === 0 ? (
                    <div className="panel p-12 text-center">
                        <p className="text-surface-500 dark:text-surface-400">
                            No Tableau case studies published yet.
                        </p>
                    </div>
                ) : (
                    <ProjectFilter projects={projects} />
                )}
            </div>
        </div>
    );
}
