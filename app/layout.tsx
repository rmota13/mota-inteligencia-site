import type { Metadata } from "next";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import {
  globalStructuredData,
  serializeStructuredData,
} from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Arquitetura, Integrações e Automação | Mota Inteligência",
    template: "%s | Mota Inteligência de Negócio",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Arquitetura de Integrações",
    "Automação Corporativa",
    "Integração ERP",
    "SAP Business One",
    "Service Layer",
    "APIs REST",
    "FastAPI",
    "n8n",
    "SQL Server",
    "Business Intelligence",
    "Engenharia de Dados",
    "Microsoft 365",
    "Inteligência Artificial aplicada",
    "Observabilidade",
    "Docker",
    "Linux",
  ],
  authors: [{ name: "Rodrigo Mota" }],
  creator: "Rodrigo Mota",
  publisher: "Mota Inteligência de Negócio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Arquitetura, Integrações e Automação | Mota Inteligência",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Mota Inteligência de Negócio",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mota Inteligência de Negócio — arquitetura, integrações, automação e dados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arquitetura, Integrações e Automação | Mota Inteligência",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta
          name="msvalidate.01"
          content={siteConfig.analytics.microsoftValidation}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(globalStructuredData),
          }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleAnalyticsId}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${siteConfig.analytics.googleAnalyticsId}');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${siteConfig.analytics.clarityId}");
          `}
        </Script>

        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
