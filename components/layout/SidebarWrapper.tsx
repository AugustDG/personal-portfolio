"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

// Animates only when navigating between home ("/") and an index page using this wrapper.
export function SidebarWrapper({ children }: SidebarWrapperProps) {
  const pathname = usePathname();
  const [animate, setAnimate] = useState(false);
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevPathRef.current;
    const isHome = pathname === "/";
    const cameFromHome = prev === "/" && !isHome;
    const goingHome = isHome && prev && prev !== "/";

    if (cameFromHome || goingHome) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 600);
      prevPathRef.current = pathname; // update after scheduling

      return () => clearTimeout(t);
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (prevPathRef.current === null) {
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return (
    <div className={animate ? "animate-[fadeIn_0.5s_ease_0s_both]" : ""}>
      {children}
    </div>
  );
}
