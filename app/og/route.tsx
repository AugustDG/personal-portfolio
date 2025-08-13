import { ImageResponse } from "next/og";

export const runtime = "edge";

const WIDTH = 1200;
const HEIGHT = 630;

// Helper to sanitize plain text (truncate + strip newlines)
function clean(input: string, max: number) {
  return input.replace(/\s+/g, " ").trim().slice(0, max);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = clean(searchParams.get("title") || "Untitled", 160);
  const subtitle = clean(searchParams.get("subtitle") || "", 60);
  const accent = clean(
    searchParams.get("accent") || "magenta",
    20,
  ).toLowerCase();

  const palette: Record<string, { from: string; via: string; to: string }> = {
    magenta: { from: "#ff00ff", via: "#ffe600", to: "#00fff6" },
    cyan: { from: "#00fff6", via: "#ff00ff", to: "#ffe600" },
    yellow: { from: "#ffe600", via: "#ff00ff", to: "#00fff6" },
    teal: { from: "#00fff6", via: "#00d4ff", to: "#ff00ff" },
  };
  const grad = palette[accent] || palette.magenta;
  const bg = `linear-gradient(135deg, ${grad.from}, ${grad.via}, ${grad.to})`;

  const rootStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "64px",
    background: bg, // full gradient background now
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif',
    position: "relative",
  };

  const columnStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  };

  const imageResponse = new ImageResponse(
    (
      <div style={rootStyle}>
        {/* subtle vignette to improve text legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.45) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        <div style={columnStyle}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 700,
              color: "#ffffff",
              textShadow:
                "0 2px 4px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.35), 0 0 22px rgba(255,255,255,0.25)",
              display: "flex", // enforce explicit display (single child but keeps engine happy)
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 28,
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#ffffffcc",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span
                style={{
                  display: "block",
                  padding: "6px 14px",
                  border: "2px solid rgba(255,255,255,0.6)",
                  background: "rgba(0,0,0,0.35)",
                  borderRadius: 6,
                }}
              >
                {subtitle}
              </span>
            </div>
          )}
          <div
            style={{
              marginTop: 8,
              fontSize: 20,
              color: "#ffffffaa",
              fontWeight: 500,
              letterSpacing: 1.5,
              display: "flex",
            }}
          >
            augustopinheiro.com
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 32,
            fontSize: 16,
            color: "#ffffff99",
            fontWeight: 400,
            display: "flex",
          }}
        >
          © {new Date().getFullYear()} Augusto Pinheiro
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );

  imageResponse.headers.set(
    "Cache-Control",
    "public, immutable, no-transform, s-maxage=86400, max-age=86400",
  );

  return imageResponse;
}
