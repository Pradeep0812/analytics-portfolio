import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { getArticleBySlug, getArticleSlugs } from '@/lib/content';

interface ArticlePageProps {
    params: { slug: string };
}

export function generateStaticParams() {
    const slugs = getArticleSlugs();
    return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
    const article = getArticleBySlug(params.slug);

    if (!article) {
        return { title: 'Article Not Found' };
    }

    return {
        title: article.title,
        description: article.summary,
    };
}

export default function ArticlePage({ params }: ArticlePageProps) {
    const article = getArticleBySlug(params.slug);

    if (!article) {
        notFound();
    }

    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="section">
            <div className="container-tight">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
                        <li>
                            <Link href="/articles" className="hover:text-accent-600 dark:hover:text-accent-400">
                                Analytics Lab
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-surface-900 dark:text-surface-50">{article.title}</li>
                    </ol>
                </nav>

                {/* Header */}
                <header className="mb-10 pb-8 border-b border-surface-200 dark:border-surface-700">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="badge badge-default">{article.category}</span>
                        <time className="text-sm text-surface-500 dark:text-surface-400">
                            {formattedDate}
                        </time>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-surface-900 dark:text-surface-50 mb-4">
                        {article.title}
                    </h1>
                    <p className="text-lg text-surface-600 dark:text-surface-400">
                        {article.summary}
                    </p>
                    {article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {article.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="text-xs text-surface-500 dark:text-surface-400"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* Content */}
                <div className="prose-custom">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>

                {/* Back link */}
                <div className="mt-12 pt-8 border-t border-surface-200 dark:border-surface-700">
                    <Link
                        href="/articles"
                        className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline underline-offset-4"
                    >
                        ← Back to Analytics Lab
                    </Link>
                </div>
            </div>
        </article>
    );
}
