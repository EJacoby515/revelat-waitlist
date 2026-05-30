import { ImageResponse } from "next/og";

// Dynamic social card at /opengraph-image — no binary asset to maintain.
export const runtime = "edge";
export const alt =
  "REVÉLAT — the live fashion show where everything is for sale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,0.18), transparent), #0D0D0D",
          color: "#fff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: 14,
            color: "#D4AF37",
            fontWeight: 700,
          }}
        >
          REVÉLAT
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 64,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          The fashion show where everything is for sale.
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 26,
            color: "#CCCCCC",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Live auctions · AI-recognized items · iOS · Android · Web
        </div>
      </div>
    ),
    { ...size },
  );
}
