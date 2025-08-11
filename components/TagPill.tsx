import clsx from "clsx";

interface TagPillProps {
  tag: string;
  className?: string;
}

// Unified neon tag pill styling
export function TagPill({ tag, className }: TagPillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-sm border px-2 py-1 font-mono text-[10px] tracking-wide uppercase",
        "border-retro-purple/40 text-retro-cyan hover:border-retro-magenta hover:text-retro-yellow bg-[#12162b] transition-colors",
        className,
      )}
    >
      {tag}
    </span>
  );
}
