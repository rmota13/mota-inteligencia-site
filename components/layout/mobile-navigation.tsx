"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavigationItem } from "@/config/navigation";

type MobileNavigationProps = {
  items: NavigationItem[];
};

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        rootRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeMenu, open]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 80rem)");
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu(false);
    };

    desktopQuery.addEventListener("change", handleDesktop);
    return () => desktopQuery.removeEventListener("change", handleDesktop);
  }, [closeMenu]);

  return (
    <div ref={rootRef} className="xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation-panel"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => (open ? closeMenu() : setOpen(true))}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#00B4D8]/35 text-[#E0E1DD] transition hover:border-[#00B4D8] hover:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>

      {open && (
        <div
          className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-var(--site-header-height))] overflow-y-auto bg-[#020D1F]/75 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeMenu();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navegação principal"
            className="border-b border-[#00B4D8]/15 bg-[#020D1F] px-4 py-5 shadow-2xl sm:px-6"
          >
            <nav id="mobile-navigation-panel" aria-label="Navegação mobile">
              <ul className="mx-auto grid max-w-7xl gap-2">
                {items.map((item, index) => (
                  <li key={item.href}>
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={() => closeMenu()}
                      className="block rounded-xl px-4 py-3 font-semibold text-[#E0E1DD] transition hover:bg-[#00B4D8]/10 hover:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
