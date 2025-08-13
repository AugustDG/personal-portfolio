import type { ReactNode } from "react";
export const runtime = "edge";
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[1400px] space-y-12">{children}</div>;
}
