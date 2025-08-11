import clsx from "clsx";
import { motion } from "framer-motion";

interface TagPillProps {
  tag: string;
  className?: string;
}

// Unified neon tag pill styling
export function TagPill({ tag, className }: TagPillProps) {
  return (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.9 }}
      className={clsx(
        "inline-flex items-center rounded-sm border px-2 py-1 font-mono text-[10px] tracking-wide uppercase",
        "border-retro-purple/40 text-retro-cyan hover:border-retro-magenta hover:text-retro-yellow bg-[#12162b] transition-colors",
        className,
      )}
    >
      {tag}
    </motion.span>
  );
}
