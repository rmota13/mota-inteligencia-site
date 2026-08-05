export type InsightKind = "article" | "guide" | "insight";

export type EditorialStatus = "draft" | "published";

export type EditorialSection = {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
};

export type EditorialFaq = {
  question: string;
  answer: string;
};

export type EditorialSource = {
  label: string;
  url: string;
};

export type Insight = {
  slug: string;
  title: string;
  description: string;
  kind: InsightKind;
  status: EditorialStatus;
  topics: string[];
  publishedAt: string;
  updatedAt?: string;
  executiveSummary: string[];
  sections: EditorialSection[];
  faq?: EditorialFaq[];
  sources: EditorialSource[];
  relatedProjectSlugs: string[];
  relatedContentSlugs?: string[];
  seo?: {
    title?: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
  };
};
