"use client";

import { Check, Copy, Mail, Share2 } from "lucide-react";
import { useState } from "react";
import { LinkedInIcon } from "@/components/ui/brand-icons";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        return;
      }
    }
    await copyLink();
  }

  const buttonClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[#071426] text-[#C8D3DB] transition hover:border-[#00B4D8]/60 hover:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]";

  return (
    <aside aria-labelledby="share-title" className="rounded-2xl border border-white/10 bg-[#101F34] p-5">
      <h2 id="share-title" className="text-sm font-black text-white">
        Compartilhar
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={share}
          data-analytics-event="share_click"
          data-analytics-label="native_share"
          className={buttonClass}
          aria-label="Compartilhar este conteúdo"
        >
          <Share2 aria-hidden="true" size={17} />
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          data-analytics-event="share_click"
          data-analytics-label="linkedin_share"
          className={buttonClass}
          aria-label="Compartilhar no LinkedIn"
        >
          <LinkedInIcon aria-hidden="true" size={17} />
        </a>
        <a
          href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
          data-analytics-event="share_click"
          data-analytics-label="email_share"
          className={buttonClass}
          aria-label="Compartilhar por e-mail"
        >
          <Mail aria-hidden="true" size={17} />
        </a>
        <button
          type="button"
          onClick={copyLink}
          data-analytics-event="share_click"
          data-analytics-label="copy_link"
          className={buttonClass}
          aria-label="Copiar link"
        >
          {copied ? (
            <Check aria-hidden="true" size={17} />
          ) : (
            <Copy aria-hidden="true" size={17} />
          )}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? "Link copiado." : ""}
      </p>
    </aside>
  );
}
