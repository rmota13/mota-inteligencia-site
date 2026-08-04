export type InsightKind = "article" | "insight";

export type Insight = {
  slug: string;
  title: string;
  description: string;
  kind: InsightKind;
  topics: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  body: string[];
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
};
