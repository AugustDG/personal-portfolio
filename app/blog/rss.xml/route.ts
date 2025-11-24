import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/directus";
import { getBaseUrl } from "../../api/utils/base-url";

export const runtime = "edge";

export async function GET() {
  const base = getBaseUrl();
  const posts = await getBlogs();
  const updated =
    posts[0]?.updated_at || posts[0]?.published_at || new Date().toISOString();
  const items = posts
    .map((p) => {
      const pubIso = parseDate(p.published_at) || new Date().toISOString();
      const link = `${base}/blog/${p.slug}`;
      const desc = p.excerpt || p.body?.slice(0, 180) || "";
      const enclosure = p.header_image_url
        ? `<enclosure url="${escapeAttr(p.header_image_url)}" type="image/jpeg" />`
        : "";

      return `<item><title>${escapeXml(p.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${new Date(pubIso).toUTCString()}</pubDate>${renderTags(p.tags)}${enclosure}<description><![CDATA[${desc}]]></description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Blog – Augusto Pinheiro</title><link>${base}/blog</link><atom:link href="${base}/blog/rss.xml" rel="self" type="application/rss+xml" /><description>Latest blog posts</description><lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>${items}</channel></rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
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

function parseDate(val?: string) {
  if (!val) return undefined; // HH:mm DD/MM/YYYY

  if (/\d{2}:\d{2} \d{2}\/\d{2}\/\d{4}/.test(val)) {
    const [time, date] = val.split(" ");
    const [hh, mm] = time.split(":").map(Number);
    const [day, mon, year] = date.split("/").map(Number);
    const d = new Date(year, mon - 1, day, hh, mm);

    return d.toISOString();
  }
  const d = new Date(val);

  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

function renderTags(tags?: string[]) {
  return (tags || [])
    .map((t) => `<category>${escapeXml(t)}</category>`)
    .join("");
}

function escapeAttr(str: string) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
