import type { MetadataRoute } from "next";
import { portfolioItems } from "@/data/portfolio";
import { serviceCategories } from "@/data/services";
import { site } from "@/data/site";

const base = site.url.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
  }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    {
      path: "/services/pre-bridal-packages",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/reviews", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/book", priority: 0.9, changeFrequency: "monthly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...serviceCategories.map((category) => ({
      url: `${base}/services/${category.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...serviceCategories.flatMap((category) =>
      category.items.map((service) => ({
        url: `${base}/services/${category.slug}/${service.id}`,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      })),
    ),
    ...portfolioItems.map((item) => ({
      url: `${base}/portfolio/${item.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
