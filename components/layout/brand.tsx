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
          : "h-[var(--site-header-height)] w-[88px] overflow-hidden sm:w-[104px] xl:w-[132px]"
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
            : "(min-width: 1280px) 132px, (min-width: 640px) 104px, 88px"
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
