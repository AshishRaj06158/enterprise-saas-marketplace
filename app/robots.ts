import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexus-systems.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/*",
          "/checkout/*",
          "/invoice/*",
          "/admin/*",
          "/_next/*",
          "/api/contact",
          "/api/inquiry",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/checkout/*", "/api/*", "/invoice/*"],
      },
      {
        userAgent: "ClaudeBot",
        disallow: ["/checkout/*", "/api/*", "/invoice/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
