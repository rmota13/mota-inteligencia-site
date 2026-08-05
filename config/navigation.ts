export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Início", href: "/#inicio" },
  { label: "Projetos", href: "/projetos" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Insights", href: "/insights" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export const footerNavigation: NavigationItem[] = [
  { label: "Início", href: "/#inicio" },
  { label: "Projetos", href: "/projetos" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Insights", href: "/insights" },
  { label: "Guias", href: "/guias" },
  { label: "Artigos", href: "/artigos" },
  { label: "Método", href: "/#metodo" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];
