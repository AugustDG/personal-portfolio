import type { ReactNode } from "react";
import TwoColumnWithSidebar from "@/components/layout/TwoColumnWithSidebar";
export const runtime = "edge";
export default function BlogIndexLayout({ children }: { children: ReactNode }) {
  return <TwoColumnWithSidebar>{children}</TwoColumnWithSidebar>;
}
