import { MetadataRoute } from 'next'
import { getBlogs } from '@/lib/blogs'
import { menuItems } from '@/lib/menuData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://bwmc.ae'
    let blogPages: MetadataRoute.Sitemap = []
    
    try {
        const blogs = await getBlogs()
        blogPages = blogs
            .filter(blog => blog.published)
            .map(blog => ({
                url: `${baseUrl}/blog/${blog.slug}`,
                lastModified: new Date(blog.updatedAt),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            }))
    } catch (e) {
        console.error('Sitemap: failed to fetch blogs', e)
    }

    const staticRoutes = [
        '',
        '/about',
        '/blog',
        '/calculator',
        '/cfo-services',
        '/contact',
        '/corporate-tax',
        '/corporate-tax-filing',
        '/ecommerce-license',
        '/financial-health-check',
        '/global-setup',
        '/investors',
        '/business',
        '/pricing',
        '/projects',
        '/services',
        '/startups',
        '/uae-setup',
        '/vat-guide'
    ];

    const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic service pages from menuData
    const servicePages: MetadataRoute.Sitemap = menuItems.flatMap(category => 
        category.items.map(service => ({
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        }))
    );

    const legalPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]

    return [...staticPages, ...servicePages, ...blogPages, ...legalPages]
}
