"use client";
import { ReactNode, ElementType } from "react";
import { motion } from "framer-motion";

interface StaggerItemProps {
  children: ReactNode;
  index: number;
  as?: ElementType;
  hoverShift?: boolean;
  delayStep?: number;
}

export function StaggerItem({
  children,
  index,
  as = "div",
  hoverShift = true,
  delayStep = 0.04,
}: StaggerItemProps) {
  const MotionTag: any = motion(as as any);
  return (
    <MotionTag
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delayStep * index }}
      whileHover={hoverShift ? { x: 4 } : undefined}
    >
      {children}
    </MotionTag>
  );
}
