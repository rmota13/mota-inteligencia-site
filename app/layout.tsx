import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mota Inteligência de Negócio",
  description:
    "BI, automação, integração ERP, APIs e inteligência operacional para empresas.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Mota Inteligência de Negócio",
    description:
      "Transforme dados, sistemas e processos em decisões reais.",
    url: "https://motainteligencia.com.br",
    siteName: "Mota Inteligência de Negócio",
    images: [
      {
        url: "/logo-mota.png",
        width: 1200,
        height: 1200,
        alt: "Mota Inteligência de Negócio",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}