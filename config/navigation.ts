export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Início", href: "/#inicio" },
  { label: "Projetos", href: "/projetos" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export const footerNavigation: NavigationItem[] = [
  { label: "Início", href: "/#inicio" },
  { label: "Projetos", href: "/projetos" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Método", href: "/#metodo" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];
