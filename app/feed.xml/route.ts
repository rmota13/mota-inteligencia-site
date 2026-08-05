import { publishedEditorialContent } from "@/content/editorial";
import { siteConfig } from "@/config/site";
import { getEditorialPath } from "@/lib/editorial";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = publishedEditorialContent
    .map((content) => {
      const url = `${siteConfig.url}${getEditorialPath(content)}`;
      return `
        <item>
          <title>${escapeXml(content.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid isPermaLink="true">${escapeXml(url)}</guid>
          <description>${escapeXml(content.description)}</description>
          <pubDate>${new Date(`${content.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
          <author>${escapeXml(siteConfig.email)} (Rodrigo Mota)</author>
          ${content.topics.map((topic) => `<category>${escapeXml(topic)}</category>`).join("\n")}
        </item>`;
    })
    .join("\n");
  const lastPublished = publishedEditorialContent[0]?.publishedAt ?? "2026-08-04";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escapeXml(siteConfig.name)} — Conteúdo técnico</title>
        <link>${escapeXml(siteConfig.url)}</link>
        <description>${escapeXml(siteConfig.description)}</description>
        <language>pt-BR</language>
        <lastBuildDate>${new Date(`${lastPublished}T12:00:00Z`).toUTCString()}</lastBuildDate>
        <atom:link href="${escapeXml(`${siteConfig.url}/feed.xml`)}" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
