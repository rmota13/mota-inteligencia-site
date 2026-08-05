export const analyticsEvents = {
  articleRead: "article_read",
  contactClick: "contact_click",
  downloadClick: "download_click",
  editorialOpen: "editorial_open",
  githubClick: "github_click",
  linkedinClick: "linkedin_click",
  projectsClick: "projects_click",
  shareClick: "share_click",
  sourceOpen: "source_open",
} as const;

export type AnalyticsEventName =
  (typeof analyticsEvents)[keyof typeof analyticsEvents];
