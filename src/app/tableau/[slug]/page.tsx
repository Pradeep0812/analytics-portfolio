import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import VideoPlayer from '@/components/VideoPlayer';
import PDFViewer from '@/components/PDFViewer';
import { getProjectBySlug, getProjectSlugs } from '@/lib/content';

interface PageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    const slugs = getProjectSlugs('tableau');
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const project = getProjectBySlug('tableau', params.slug);
    if (!project) {
        return { title: 'Project Not Found' };
    }
    return {
        title: `${project.title} | Tableau | Analytics Portfolio`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.thumbnail ? [project.thumbnail] : [],
        },
    };
}

export default function TableauProjectPage({ params }: PageProps) {
    const project = getProjectBySlug('tableau', params.slug);

    if (!project) {
        notFound();
    }

    const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="pt-20 lg:pt-24">
            <section className="py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-surface-900 dark:via-surface-900 dark:to-surface-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-surface-500 mb-6">
                        <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/tableau" className="hover:text-primary-600 transition-colors">Tableau</Link>
                        <span>/</span>
                        <span className="text-surface-900 dark:text-white truncate max-w-[200px]">{project.title}</span>
                    </nav>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                            Tableau
                        </span>
                        {project.featured && (
                            <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-sm font-medium">Featured</span>
                        )}
                        <span className="text-sm text-surface-500">{formattedDate}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-4">
                        {project.title}
                    </h1>
                    <p className="text-lg text-surface-600 dark:text-surface-300">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-6">
                        {project.tools.map((tool) => (
                            <span key={tool} className="px-3 py-1.5 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-200 text-sm font-medium">
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 lg:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {project.powerbi_embed_url ? (
                        <div className="aspect-video rounded-2xl overflow-hidden bg-surface-100 dark:bg-surface-800 shadow-lg">
                            <iframe src={project.powerbi_embed_url} className="w-full h-full border-0" title={project.title} allowFullScreen />
                        </div>
                    ) : project.video ? (
                        <VideoPlayer src={project.video} title={project.title} poster={project.thumbnail} />
                    ) : project.thumbnail ? (
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-100 dark:bg-surface-800 shadow-lg">
                            <Image src={project.thumbnail} alt={project.title} fill className="object-cover" priority />
                        </div>
                    ) : null}

                    {project.pdf && <PDFViewer src={project.pdf} title={`${project.title} - Report`} />}

                    {project.content && (
                        <div className="prose-custom max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
                        </div>
                    )}

                    {project.tags && project.tags.length > 0 && (
                        <div className="pt-6 border-t border-surface-200 dark:border-surface-700">
                            <h3 className="text-sm font-medium text-surface-500 mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="pt-8 border-t border-surface-200 dark:border-surface-700">
                        <Link href="/tableau" className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline font-medium transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            Back to Tableau Projects
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
