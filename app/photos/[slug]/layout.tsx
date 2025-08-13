import type { ReactNode } from "react";
export const runtime = "edge";
export default function PhotoDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1400px] animate-[fadeIn_0.5s_ease_0s_both]">
      {children}
    </div>
  );
}
