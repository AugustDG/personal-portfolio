import { NextResponse } from "next/server";
import { getProjects } from "@/lib/directus";
import { getBaseUrl } from "../../api/utils/base-url";

export const runtime = "edge";

export async function GET() {
  const base = getBaseUrl();
  const projects = await getProjects();
  const updated = new Date().toISOString();
  const items = projects
    .map((p) => {
      const pseudoDate = monthYearToDate(p.started_at) || new Date();
      const link = `${base}/projects/${p.slug}`;
      const desc = p.description?.slice(0, 240) || p.body?.slice(0, 240) || "";
      const enclosure = p.header_image_url
        ? `<enclosure url="${escapeAttr(p.header_image_url)}" type="image/jpeg" />`
        : "";

      return `<item><title>${escapeXml(p.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${pseudoDate.toUTCString()}</pubDate>${renderTags(p.tags)}${enclosure}<description><![CDATA[${desc}]]></description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Projects – Augusto Pinheiro</title><link>${base}/projects</link><atom:link href="${base}/projects/rss.xml" rel="self" type="application/rss+xml" /><description>Latest projects</description><lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>${items}</channel></rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
    },
  });
}

function escapeXml(str: string) {
  return str.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] as string,
  );
}

function monthYearToDate(val?: string) {
  if (!val) return undefined;

  if (/^[0-1]\d\/\d{4}$/.test(val)) {
    const [mm, yyyy] = val.split("/").map(Number);

    return new Date(yyyy, (mm || 1) - 1, 1);
  }
  const d = new Date(val);

  return isNaN(d.getTime()) ? undefined : d;
}

function renderTags(tags?: string[]) {
  return (tags || [])
    .map((t) => `<category>${escapeXml(t)}</category>`)
    .join("");
}

function escapeAttr(str: string) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
