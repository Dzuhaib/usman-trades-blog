/**
 * SEO-OS Schema Engine
 * Centralized utility for generating high-integrity JSON-LD structured data.
 */

interface OrganizationConfig {
  name: string;
  url: string;
  logo: string;
}

const ORG_CONFIG: OrganizationConfig = {
  name: "Usman Trades",
  url: "https://www.usmantrades.co.uk",
  logo: "https://www.usmantrades.co.uk/favicon.ico",
};

export function generateBlogSchema(post: {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  updatedAt: string;
  route: string;
  author: { name: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "url": ORG_CONFIG.url,
    },
    "publisher": {
      "@type": "Organization",
      "name": ORG_CONFIG.name,
      "logo": {
        "@type": "ImageObject",
        "url": ORG_CONFIG.logo,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${ORG_CONFIG.url}${post.route}`,
    },
  };
}

export function generateWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.name,
    "description": page.description,
    "url": `${ORG_CONFIG.url}${page.url}`,
    "publisher": {
      "@type": "Organization",
      "name": ORG_CONFIG.name,
      "url": ORG_CONFIG.url,
    },
  };
}

export function generateBreadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${ORG_CONFIG.url}${item.href}`,
    })),
  };
}
