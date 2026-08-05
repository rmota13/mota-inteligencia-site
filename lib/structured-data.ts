import { siteConfig } from "@/config/site";
import { editorialKindConfig, getEditorialPath } from "@/lib/editorial";
import type { EditorialFaq, Insight } from "@/types/insight";
import type { Project } from "@/types/project";

const personId = `${siteConfig.url}/#rodrigo-mota`;
const serviceId = `${siteConfig.url}/#professional-service`;
const websiteId = `${siteConfig.url}/#website`;

export const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: "Rodrigo Mota",
      url: siteConfig.linkedinUrl,
      sameAs: [siteConfig.linkedinUrl],
      knowsAbout: [
        "Arquitetura de Sistemas",
        "Business Intelligence",
        "Automação Corporativa",
        "Integração de Sistemas",
        "SAP Business One",
        "SQL Server",
        "FastAPI",
        "APIs REST",
        "Microsoft 365",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": serviceId,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo-mota.png`,
      image: `${siteConfig.url}/logo-mota.png`,
      description: siteConfig.description,
      areaServed: "Brasil",
      founder: { "@id": personId },
      serviceType: [
        "Business Intelligence",
        "Power BI",
        "Automação Corporativa",
        "Integração ERP",
        "SAP Business One",
        "APIs REST",
        "Deploy de Aplicações",
        "Docker",
        "Linux",
        "Microsoft 365",
        "Power Automate",
        "n8n",
        "SharePoint",
        "Power Apps",
        "Criação de Sites",
        "Landing Pages",
        "Portais Corporativos",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: siteConfig.name,
      inLanguage: "pt-BR",
      publisher: { "@id": serviceId },
    },
  ],
};

type StructuredBreadcrumb = {
  name: string;
  url: string;
};

export function createBreadcrumbStructuredData(items: StructuredBreadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createWebPageStructuredData({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  const url = `${siteConfig.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": websiteId },
    about: { "@id": serviceId },
  };
}

export function createProjectListStructuredData(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projetos de arquitetura, integração, automação e dados",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: `${siteConfig.url}/projetos/${project.slug}`,
    })),
  };
}

export function createProjectStructuredData(project: Project) {
  const url = `${siteConfig.url}/projetos/${project.slug}`;
  const shared = {
    "@id": `${url}#project`,
    name: project.title,
    description: project.seo?.description ?? project.summary,
    url,
    author: { "@id": personId },
    creator: { "@id": personId },
    keywords: project.technologies.join(", "),
    inLanguage: "pt-BR",
    dateModified: project.updatedAt,
  };

  if (project.repositoryUrl) {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      ...shared,
      codeRepository: project.repositoryUrl,
      programmingLanguage: ["Python", "SQL"],
      runtimePlatform: ["Docker", "Linux", "n8n"],
      applicationCategory: "BusinessApplication",
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    ...shared,
  };
}

export function createEditorialListStructuredData(content: Insight[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Conteúdo técnico da Mota Inteligência de Negócio",
    itemListElement: content.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `${siteConfig.url}${getEditorialPath(item)}`,
    })),
  };
}

export function createEditorialStructuredData(content: Insight) {
  const path = getEditorialPath(content);
  const url = `${siteConfig.url}${path}`;
  const image = content.seo?.image ?? `${url}/opengraph-image`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    headline: content.title,
    description: content.seo?.description ?? content.description,
    articleSection: editorialKindConfig[content.kind].label,
    keywords: content.topics.join(", "),
    datePublished: content.publishedAt,
    dateModified: content.updatedAt ?? content.publishedAt,
    inLanguage: "pt-BR",
    url,
    image,
    author: { "@id": personId },
    publisher: { "@id": serviceId },
    about: content.relatedProjectSlugs.map((slug) => ({
      "@id": `${siteConfig.url}/projetos/${slug}#project`,
    })),
    citation: content.sources.map((source) => source.url),
  };
}

export function createFaqStructuredData(content: { faq?: EditorialFaq[] }) {
  if (!content.faq || content.faq.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serializeStructuredData(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
