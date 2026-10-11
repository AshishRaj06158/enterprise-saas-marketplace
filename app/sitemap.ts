import { MetadataRoute } from "next";
import { getAllSystems } from "@/data/systems";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexus-systems.in";
  const now = new Date();

  // Core static marketplace routes
  const staticRouteDefinitions: Array<{ path: string; priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" }> = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/systems", priority: 0.95, changeFrequency: "daily" },
    { path: "/playground", priority: 0.9, changeFrequency: "weekly" },
    { path: "/developer", priority: 0.9, changeFrequency: "weekly" },
    { path: "/compare", priority: 0.9, changeFrequency: "weekly" },
    { path: "/calculator", priority: 0.85, changeFrequency: "weekly" },
    { path: "/deploy-config", priority: 0.85, changeFrequency: "weekly" },
    { path: "/operations", priority: 0.85, changeFrequency: "daily" },
    { path: "/verify", priority: 0.85, changeFrequency: "weekly" },
    { path: "/vault", priority: 0.8, changeFrequency: "weekly" },
    { path: "/changelog", priority: 0.8, changeFrequency: "daily" },
    { path: "/pricing", priority: 0.85, changeFrequency: "weekly" },
    { path: "/demos", priority: 0.75, changeFrequency: "weekly" },
    { path: "/docs", priority: 0.75, changeFrequency: "weekly" },
    { path: "/pipelines", priority: 0.75, changeFrequency: "weekly" },
    { path: "/terms", priority: 0.5, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.5, changeFrequency: "monthly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRouteDefinitions.map((def) => ({
    url: `${baseUrl}${def.path}`,
    lastModified: now,
    changeFrequency: def.changeFrequency,
    priority: def.priority,
  }));

  // Dynamic system detail product routes from data/systems.ts
  const systems = getAllSystems();
  const systemEntries: MetadataRoute.Sitemap = systems.map((sys) => ({
    url: `${baseUrl}/systems/${sys.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...systemEntries];
}
