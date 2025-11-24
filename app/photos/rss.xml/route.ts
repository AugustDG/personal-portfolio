import { NextResponse } from "next/server";
import { getPhotoGalleries } from "@/lib/directus";
import { getBaseUrl } from "../../api/utils/base-url";

export const runtime = "edge";

export async function GET() {
  const base = getBaseUrl();
  const galleries = await getPhotoGalleries();
  const updated = new Date().toISOString();
  const now = new Date();
  const items = galleries
    .map((g, idx) => {
      const dt = new Date(now.getTime() - idx * 60000);
      const link = `${base}/photos/${g.slug}`;
      const desc = `${g.images.length} photos`;
      const firstImage = g.images[0]?.src_url;
      const enclosure = firstImage
        ? `<enclosure url="${escapeAttr(firstImage)}" type="image/jpeg" />`
        : "";

      return `<item><title>${escapeXml(g.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${dt.toUTCString()}</pubDate>${renderTags(g.tags)}${enclosure}<description><![CDATA[${desc}]]></description></item>`;
    })
    .join("");
  const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\"><channel><title>Photos – Augusto Pinheiro</title><link>${base}/photos</link><atom:link href=\"${base}/photos/rss.xml\" rel=\"self\" type=\"application/rss+xml\" /><description>Latest photo galleries</description><lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>${items}</channel></rss>`;

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

function renderTags(tags?: string[]) {
  return (tags || [])
    .map((t) => `<category>${escapeXml(t)}</category>`)
    .join("");
}

function escapeAttr(str: string) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
