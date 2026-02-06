import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticles } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Analytics Lab | Knowledge Repository',
    description: 'Long-form analytics knowledge, research articles, and technical documentation.',
};

export default function ArticlesPage() {
    const articles = getArticles();

    // Group articles by category
    const categories = ['Analytics', 'Power BI', 'SQL', 'AI', 'Trends'];
    const articlesByCategory = categories.reduce((acc, cat) => {
        acc[cat] = articles.filter(a => a.category === cat);
        return acc;
    }, {} as Record<string, typeof articles>);

    return (
        <div className="section">
            <div className="container-wide">
                {/* Header */}
                <div className="section-header max-w-3xl">
                    <h6 className="section-title">Analytics Lab</h6>
                    <h1>Knowledge Repository</h1>
                    <p className="mt-4 text-lg text-surface-600 dark:text-surface-400">
                        Technical articles, methodology documentation, and analytical insights.
                    </p>
                </div>

                {/* Articles by Category */}
                {articles.length === 0 ? (
                    <div className="panel p-12 text-center">
                        <p className="text-surface-500 dark:text-surface-400">
                            No articles published yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {categories.map(category => {
                            const catArticles = articlesByCategory[category];
                            if (catArticles.length === 0) return null;

                            return (
                                <section key={category}>
                                    <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-4 pb-2 border-b border-surface-200 dark:border-surface-700">
                                        {category}
                                    </h2>
                                    <div className="divide-y divide-surface-200 dark:divide-surface-700">
                                        {catArticles.map(article => (
                                            <article key={article.slug} className="py-4 first:pt-0">
                                                <Link
                                                    href={`/articles/${article.slug}`}
                                                    className="block group"
                                                >
                                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                                                        <h3 className="font-medium text-surface-900 dark:text-surface-50 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <time className="text-sm text-surface-500 dark:text-surface-400 shrink-0">
                                                            {new Date(article.date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                            })}
                                                        </time>
                                                    </div>
                                                    <p className="mt-1 text-sm text-surface-600 dark:text-surface-400 line-clamp-2">
                                                        {article.summary}
                                                    </p>
                                                    {article.tags.length > 0 && (
                                                        <div className="mt-2 flex gap-2">
                                                            {article.tags.slice(0, 3).map(tag => (
                                                                <span
                                                                    key={tag}
                                                                    className="text-xs text-surface-500 dark:text-surface-400"
                                                                >
                                                                    #{tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </Link>
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
