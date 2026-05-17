import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mota Inteligência de Negócio",
  url: "https://motainteligencia.com.br",
  logo: "https://motainteligencia.com.br/logo-mota.png",
  image: "https://motainteligencia.com.br/logo-mota.png",
  description:
    "Especialista em BI, automação corporativa, integração ERP, Power BI, SAP Business One, APIs REST, Microsoft 365, Docker, Linux e deploy de aplicações empresariais.",
  areaServed: "Brasil",
  founder: {
    "@type": "Person",
    name: "Rodrigo Mota",
  },
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
};
export const metadata: Metadata = {
  metadataBase: new URL("https://motainteligencia.com.br"),

  title: {
    default: "Mota Inteligência de Negócio",
    template: "%s | Mota Inteligência de Negócio",
  },

  description:
    "Especialista em BI, automação corporativa, Power BI, SAP Business One, APIs REST, integração ERP, Microsoft 365, Docker, Linux e deploy de aplicações empresariais.",

  keywords: [
    "Power BI",
    "BI",
    "Business Intelligence",
    "Automação",
    "n8n",
    "Power Automate",
    "SAP Business One",
    "Integração ERP",
    "SQL Server",
    "Dashboards",
    "APIs REST",
    "FastAPI",
    "Docker",
    "Linux",
    "Deploy de aplicações",
    "Cloudflare",
    "Traefik",
    "Power Apps",
    "SharePoint",
    "Microsoft Teams",
    "Automação financeira",
    "Inteligência financeira",
    "Aplicações web",
    "Landing pages",
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

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "Mota Inteligência de Negócio",
    description:
      "BI, automação corporativa, integração ERP, APIs, Power BI, SAP Business One e deploy de aplicações empresariais.",
    url: "https://motainteligencia.com.br",
    siteName: "Mota Inteligência de Negócio",
    locale: "pt_BR",
    type: "website",

    images: [
      {
        url: "/logo-mota.png",
        width: 1200,
        height: 630,
        alt: "Mota Inteligência de Negócio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mota Inteligência de Negócio",
    description:
      "BI, automação corporativa, integração ERP e deploy de aplicações empresariais.",
    images: ["/logo-mota.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GKDVFR37K4"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GKDVFR37K4');
          `}
        </Script>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wsm484ezzp");
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}