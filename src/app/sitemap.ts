import { MetadataRoute } from 'next';
import { getAllProjects, getArticleSlugs } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://uppalapradeep.netlify.app';

    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/powerbi`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tableau`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/excel`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/articles`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/skills`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Add all projects
    const projects = getAllProjects();
    projects.forEach((project) => {
        routes.push({
            url: `${baseUrl}/${project.category}/${project.slug}`,
            lastModified: new Date(project.date),
            changeFrequency: 'monthly',
            priority: 0.6,
        });
    });

    // Add all articles
    const articleSlugs = getArticleSlugs();
    articleSlugs.forEach((slug) => {
        routes.push({
            url: `${baseUrl}/articles/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        });
    });

    return routes;
}
