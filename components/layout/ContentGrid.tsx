"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// Lazy load sidebar (server component) via dynamic import wrapper
// @ts-ignore
const SidebarSocials = dynamic(
  () => import("@/components/layout/SidebarSocials"),
  { ssr: true },
);

interface Props {
  children: ReactNode;
}

export function ContentGrid({ children }: Props) {
  const pathname = usePathname() || "/";
  // Detail pages: single content entity
  const isDetail =
    /^(\/projects|\/blog|\/photos|\/galleries)\/[A-Za-z0-9-_]+\/?$/.test(
      pathname,
    );

  const baseClasses = "mx-auto min-h-full w-full px-4 py-6 md:px-8 md:py-10";

  if (isDetail) {
    return (
      <div className={`${baseClasses} max-w-[1400px]`}>
        {/* Single column full width (still respect global max) */}
        <div className="space-y-12" id="__primary_full">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1024px)_1fr]`}
      id="__content_grid"
    >
      <div className="space-y-12" id="__primary">
        {children}
      </div>
      <SidebarSocials />
    </div>
  );
}
