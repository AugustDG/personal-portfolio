import type { ReactNode } from "react";
import SidebarSocials from "@/components/layout/SidebarSocials";

export const runtime = "edge";

export default function BlogDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      id="__content_grid"
      className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1024px)_1fr]"
    >
      <div
        id="__primary"
        className="animate-[detailBounce_0.3s_cubic-bezier(.4,0,.2,1)_0s_both] space-y-10"
      >
        {children}
      </div>
      <SidebarSocials />
    </div>
  );
}
