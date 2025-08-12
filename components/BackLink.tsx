import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  href: string;
  label?: string;
  className?: string;
}

export function BackLink({ href, label = "Back", className }: Props) {
  return (
    <Link
      href={href}
      className={`border-retro-purple/40 text-retro-cyan hover:border-retro-magenta hover:bg-retro-magenta/20 hover:text-retro-yellow inline-flex items-center gap-2 rounded-sm border bg-[#12162b] px-3 py-1.5 font-mono text-xs transition-colors ${className || ""}`}
    >
      <ArrowLeft className="h-4 w-4" /> {label}
    </Link>
  );
}
