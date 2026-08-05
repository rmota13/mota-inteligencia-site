import Image from "next/image";

type BrandProps = {
  footer?: boolean;
  priority?: boolean;
};

export function Brand({ footer = false, priority = false }: BrandProps) {
  return (
    <div
      className={
        footer
          ? "flex w-full flex-col gap-5"
          : "h-[var(--site-header-height)] w-[100px] overflow-hidden sm:w-[116px] lg:w-[150px]"
      }
    >
      <Image
        src="/logo-mota.png"
        alt="Mota Inteligência de Negócio"
        width={1248}
        height={1248}
        sizes={
          footer
            ? "(min-width: 768px) 300px, 220px"
            : "(min-width: 1024px) 150px, (min-width: 640px) 116px, 100px"
        }
        className={
          footer
            ? "h-auto w-full max-w-[220px] object-contain md:max-w-[300px]"
            : "h-auto w-full object-contain object-left-top"
        }
        priority={priority}
      />
    </div>
  );
}
