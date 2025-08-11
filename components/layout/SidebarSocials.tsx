"use client";
import { useApi } from "@/lib/hooks/useApi";

export default function SidebarSocials() {
  const { data: site } = useApi<any>("/api/site");
  return (
    <aside className="hidden flex-col gap-6 pt-2 text-xs tracking-wide lg:flex">
      <div>
        <p className="font-pixel text-retro-yellow mb-2 text-[10px]">NAV</p>
        <ul className="space-y-1 font-mono">
          <li>
            <a href="/projects" className="hover:text-retro-magenta">
              Projects
            </a>
          </li>
          <li>
            <a href="/blog" className="hover:text-retro-magenta">
              Blog
            </a>
          </li>
          <li>
            <a href="/galleries" className="hover:text-retro-magenta">
              Galleries
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p className="font-pixel text-retro-yellow mb-2 text-[10px]">SOCIAL</p>
        <ul className="space-y-1 font-mono">
          {site?.socials?.length ? (
            site.socials.map((s: any) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-retro-cyan"
                >
                  {s.label}
                </a>
              </li>
            ))
          ) : (
            <li className="opacity-60">No socials</li>
          )}
        </ul>
      </div>
      <div className="mt-auto font-mono opacity-60">
        Augusto M. Pinheiro © {new Date().getFullYear()}
      </div>
    </aside>
  );
}
