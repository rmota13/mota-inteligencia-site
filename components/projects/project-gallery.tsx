import Image from "next/image";
import type { ProjectAsset } from "@/types/project";

export function ProjectGallery({ assets }: { assets: ProjectAsset[] }) {
  if (assets.length === 0) return null;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {assets.map((asset, index) => (
        <figure
          key={asset.src}
          className={`${assets.length % 2 === 1 && index === 0 ? "md:col-span-2" : ""}`}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#00B4D8]/15 bg-[#071426]">
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              sizes={assets.length % 2 === 1 && index === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
              className="object-contain p-2"
            />
          </div>
          {(asset.caption || asset.alt) && (
            <figcaption className="mt-3 text-sm leading-relaxed text-[#91A1AE]">
              {asset.caption ?? asset.alt}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
