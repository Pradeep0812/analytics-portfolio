import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import VideoPlayer from '@/components/VideoPlayer';
import PDFViewer from '@/components/PDFViewer';
import RelatedProjects from '@/components/RelatedProjects';
import { getProjectBySlug, getProjectSlugs, getRelatedProjects } from '@/lib/content';

interface PageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    const slugs = getProjectSlugs('excel');
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const project = getProjectBySlug('excel', params.slug);
    if (!project) {
        return { title: 'Case Study Not Found' };
    }
    return {
        title: `${project.title} | Excel`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.thumbnail ? [project.thumbnail] : [],
        },
    };
}

export default function ExcelProjectPage({ params }: PageProps) {
    const project = getProjectBySlug('excel', params.slug);

    if (!project) {
        notFound();
    }

    const relatedProjects = getRelatedProjects(project, 3);

    const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <article className="section">
            <div className="container-tight">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400 mb-8">
                    <Link href="/" className="hover:text-accent-600 dark:hover:text-accent-400">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/excel" className="hover:text-accent-600 dark:hover:text-accent-400">
                        Excel
                    </Link>
                    <span>/</span>
                    <span className="text-surface-900 dark:text-surface-50 truncate max-w-[200px]">
                        {project.title}
                    </span>
                </nav>

                {/* Header */}
                <header className="mb-10 pb-8 border-b border-surface-200 dark:border-surface-700">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="badge badge-default">Excel</span>
                        {project.featured && (
                            <span className="badge badge-accent">Featured</span>
                        )}
                        <span className="text-sm text-surface-500 dark:text-surface-400">
                            {formattedDate}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-semibold text-surface-900 dark:text-surface-50 mb-4">
                        {project.title}
                    </h1>

                    <p className="text-lg text-surface-600 dark:text-surface-400">
                        {project.description}
                    </p>
                </header>

                {/* Thumbnail */}
                {project.thumbnail && (
                    <div className="mb-10 rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700">
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            width={900}
                            height={500}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                )}

                {/* Video */}
                {project.video && (
                    <div className="mb-10">
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-4">
                            Video Walkthrough
                        </h2>
                        <VideoPlayer src={project.video} title={project.title} />
                    </div>
                )}

                {/* PDF / Download */}
                {project.pdf && (
                    <div className="mb-10">
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-4">
                            Documentation
                        </h2>
                        <PDFViewer src={project.pdf} title={project.title} />
                    </div>
                )}

                {/* Download Link */}
                {project.download && (
                    <div className="mb-10 panel p-6">
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-3">
                            Download Template
                        </h2>
                        <a
                            href={project.download}
                            download
                            className="inline-flex items-center gap-2 px-4 py-2 bg-surface-900 dark:bg-surface-50 text-surface-50 dark:text-surface-900 text-sm font-medium rounded-md hover:bg-surface-800 dark:hover:bg-surface-100 transition-colors"
                            data-download-track={project.slug}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download File
                        </a>
                    </div>
                )}

                {/* Content */}
                {project.content && (
                    <div className="mb-10">
                        <div className="prose-custom">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {project.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}

                {/* Tools & Tags */}
                <div className="mb-10 pb-8 border-b border-surface-200 dark:border-surface-700">
                    {project.tools.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wide mb-2">
                                Tools
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map((tool) => (
                                    <span
                                        key={tool}
                                        className="px-3 py-1 text-sm bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {project.tags && project.tags.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wide mb-2">
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-sm text-surface-500 dark:text-surface-400"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Related Projects */}
                <RelatedProjects projects={relatedProjects} />

                {/* Back Link */}
                <div className="mt-12 pt-8 border-t border-surface-200 dark:border-surface-700">
                    <Link
                        href="/excel"
                        className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline underline-offset-4"
                    >
                        ← Back to Excel Case Studies
                    </Link>
                </div>
            </div>
        </article>
    );
}
