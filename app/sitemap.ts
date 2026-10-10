import { MetadataRoute } from 'next';
import { getAllSystems } from '@/data/systems';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexus-systems.in';
  const now = new Date().toISOString();

  const staticRoutes = [
    '',
    '/systems',
    '/calculator',
    '/compare',
    '/demos',
    '/deploy-config',
    '/developer',
    '/docs',
    '/operations',
    '/pipelines',
    '/playground',
    '/pricing',
    '/privacy',
    '/terms',
    '/vault',
    '/verify',
    '/changelog',
    '/checkout',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const systemRoutes = getAllSystems().map((sys) => ({
    url: `${baseUrl}/systems/${sys.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...systemRoutes];
}

