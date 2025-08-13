import type { ReactNode } from "react";
import SidebarSocials from "@/components/layout/SidebarSocials";
export const runtime = "edge";
export default function BlogDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1024px)_1fr]">
      <div className="space-y-10">{children}</div>
      <SidebarSocials />
    </div>
  );
}
