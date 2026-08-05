import type { SVGProps } from "react";

type BrandIconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  size?: number | string;
};

export function GitHubIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      focusable="false"
      {...props}
    >
      <path d="M12 .7A11.3 11.3 0 0 0 8.43 22.72c.57.1.78-.25.78-.55v-2.16c-3.18.7-3.85-1.35-3.85-1.35-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.54-.29-5.21-1.27-5.21-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.11 1.17A10.82 10.82 0 0 1 12 5.91c.96 0 1.91.13 2.81.38 2.15-1.48 3.11-1.17 3.11-1.17.62 1.58.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.4-2.68 5.36-5.23 5.65.41.35.78 1.05.78 2.12v3.18c0 .3.21.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      focusable="false"
      {...props}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.41v1.57h.05c.47-.9 1.63-1.86 3.36-1.86 3.59 0 4.26 2.36 4.26 5.44v6.31h.03ZM5.33 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.11 20.45H3.55V8.99h3.56v11.46Z" />
    </svg>
  );
}
