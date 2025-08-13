import type { ReactNode } from "react";
import type { Metadata } from "next";
import TwoColumnWithSidebar from "@/components/layout/TwoColumnWithSidebar";
export const runtime = "edge";
export const metadata: Metadata = {
  alternates: {
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};
export default function BlogIndexLayout({ children }: { children: ReactNode }) {
  return <TwoColumnWithSidebar>{children}</TwoColumnWithSidebar>;
}
