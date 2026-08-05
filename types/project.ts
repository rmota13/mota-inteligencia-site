import type { HomeIconName } from "@/types/home";
import type { EditorialFaq } from "@/types/insight";

export type ProjectStatus =
  | "production"
  | "rollout"
  | "development"
  | "completed"
  | "planned";

export type ProjectCategory =
  | "plataformas"
  | "sap-business-one"
  | "automacao"
  | "dados"
  | "infraestrutura"
  | "aplicacoes";

export type ProjectCategoryDefinition = {
  slug: ProjectCategory;
  label: string;
  description: string;
};

export type ProjectPhase = {
  title: string;
  status: ProjectStatus;
  summary: string;
  items: string[];
};

export type ProjectAsset = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectSeo = {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle?: string;
  summary: string;
  description?: string;
  status?: ProjectStatus;
  featured?: boolean;
  categories: ProjectCategory[];
  technologies: string[];
  stackLabel: string;
  icon: HomeIconName;
  image: string;
  problem?: string;
  context?: string;
  businessRelevance?: string;
  role?: string;
  solution?: string;
  architecture?: string;
  architectureLayers?: { title: string; description: string }[];
  flow?: string[];
  phases?: ProjectPhase[];
  engineeringDecisions?: string[];
  security?: string[];
  observability?: string[];
  results?: string[];
  limitations?: string[];
  roadmap?: string[];
  faq?: EditorialFaq[];
  relatedProjectSlugs?: string[];
  gallery: ProjectAsset[];
  repositoryUrl?: string;
  publishedAt?: string;
  updatedAt?: string;
  seo?: ProjectSeo;
};
