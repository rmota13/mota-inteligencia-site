"use client";

import { useEffect } from "react";
import { analyticsEvents } from "@/config/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function AnalyticsEvents() {
  useEffect(() => {
    function track(eventName: string, parameters: Record<string, string>) {
      window.gtag?.("event", eventName, parameters);
    }

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trackedElement = target.closest<HTMLElement>(
        "[data-analytics-event]",
      );
      if (!trackedElement) return;

      track(trackedElement.dataset.analyticsEvent ?? "interaction", {
        event_category:
          trackedElement.dataset.analyticsCategory ?? "site_interaction",
        event_label:
          trackedElement.dataset.analyticsLabel ??
          trackedElement.textContent?.trim() ??
          "unlabeled",
      });
    }

    const completed = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const label = element.dataset.editorialComplete;
          if (!label || completed.has(label)) return;

          completed.add(label);
          track(analyticsEvents.articleRead, {
            event_category: "editorial",
            event_label: label,
            content_type: element.dataset.editorialKind ?? "editorial",
          });
          observer.unobserve(element);
        });
      },
      { threshold: 0.75 },
    );

    document.addEventListener("click", handleClick);
    document
      .querySelectorAll<HTMLElement>("[data-editorial-complete]")
      .forEach((element) => observer.observe(element));

    return () => {
      document.removeEventListener("click", handleClick);
      observer.disconnect();
    };
  }, []);

  return null;
}
