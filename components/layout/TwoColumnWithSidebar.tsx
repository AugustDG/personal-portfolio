import type { ReactNode } from "react";
import SidebarSocials from "./SidebarSocials";

export const runtime = "edge";

interface TwoColumnWithSidebarProps {
  children: ReactNode;
  className?: string;
}

// Reusable grid layout with right sidebar (server component)
export default function TwoColumnWithSidebar({
  children,
  className = "space-y-12",
}: TwoColumnWithSidebarProps) {
  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1024px)_1fr]">
      <div className={className}>{children}</div>
      <div className="animate-[fadeIn_0.5s_ease_0s_both]">
        <SidebarSocials />
      </div>
    </div>
  );
}
