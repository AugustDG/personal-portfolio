import type { ReactNode } from "react";
export const runtime = "edge";
export default function ProjectDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="mx-auto max-w-[1400px]">{children}</div>;
}
