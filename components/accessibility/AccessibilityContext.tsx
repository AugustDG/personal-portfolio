"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AccessibilityState {
  reducedChromatic: boolean; // removes gradients / neon
  highContrast: boolean; // optional future toggle
  toggleReducedChromatic(): void;
  toggleHighContrast(): void;
}

const AccessibilityContext = createContext<AccessibilityState | undefined>(
  undefined,
);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [reducedChromatic, setReducedChromatic] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // persist in localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("a11y-prefs") || "{}");
      if (typeof saved.reducedChromatic === "boolean")
        setReducedChromatic(saved.reducedChromatic);
      if (typeof saved.highContrast === "boolean")
        setHighContrast(saved.highContrast);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "a11y-prefs",
        JSON.stringify({ reducedChromatic, highContrast }),
      );
    } catch {}
  }, [reducedChromatic, highContrast]);

  // apply document class for global style overrides
  useEffect(() => {
    const root = document.documentElement;
    if (reducedChromatic) root.classList.add("a11y-reduced-chroma");
    else root.classList.remove("a11y-reduced-chroma");
    if (highContrast) root.classList.add("a11y-high-contrast");
    else root.classList.remove("a11y-high-contrast");
  }, [reducedChromatic, highContrast]);

  const value: AccessibilityState = {
    reducedChromatic,
    highContrast,
    toggleReducedChromatic: () => setReducedChromatic((v) => !v),
    toggleHighContrast: () => setHighContrast((v) => !v),
  };
  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx)
    throw new Error(
      "useAccessibility must be used inside AccessibilityProvider",
    );
  return ctx;
}
