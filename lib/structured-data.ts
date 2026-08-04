import { siteConfig } from "@/config/site";
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

export function serializeStructuredData(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
