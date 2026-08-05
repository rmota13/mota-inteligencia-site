import { ImageResponse } from "next/og";

type EditorialOpenGraphOptions = {
  label: string;
  title: string;
  topics: string[];
};

export const openGraphImageSize = { width: 1200, height: 630 };

export function createEditorialOpenGraphImage({
  label,
  title,
  topics,
}: EditorialOpenGraphOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 82% 18%, rgba(0,180,216,.27), transparent 34%), linear-gradient(135deg, #020D1F, #0A1628 64%, #10283B)",
          color: "white",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          padding: "70px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div
            style={{
              color: "#72D7E9",
              display: "flex",
              fontSize: 23,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {label} · Mota Inteligência
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 58 ? 54 : 64,
              fontWeight: 800,
              letterSpacing: -2.5,
              lineHeight: 1.05,
              marginTop: 30,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 38 }}>
            {topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                style={{
                  background: "rgba(0,180,216,.09)",
                  border: "1px solid rgba(0,180,216,.35)",
                  borderRadius: 999,
                  color: "#D7F6FA",
                  display: "flex",
                  fontSize: 18,
                  padding: "10px 16px",
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    openGraphImageSize,
  );
}
