import { AboutSection } from "@/components/home/about-section";
import { CommercialModelSection } from "@/components/home/commercial-model-section";
import { ContactSection } from "@/components/home/contact-section";
import { FeaturedProjectSection } from "@/components/home/featured-project-section";
import { GithubSection } from "@/components/home/github-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { SolutionsSection } from "@/components/home/solutions-section";
import { WorkMethodSection } from "@/components/home/work-method-section";
import { siteConfig } from "@/config/site";
import {
  createWebPageStructuredData,
  serializeStructuredData,
} from "@/lib/structured-data";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--base-dark)] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(
            createWebPageStructuredData({
              path: "",
              name: "Integrações, Automação, Dados, BI e IA",
              description: siteConfig.description,
            }),
          ),
        }}
      />
      <HeroSection />
      <SolutionsSection />
      <ProjectsSection />
      <FeaturedProjectSection />
      <CommercialModelSection />
      <WorkMethodSection />
      <AboutSection />
      <GithubSection />
      <ContactSection />
    </main>
  );
}
