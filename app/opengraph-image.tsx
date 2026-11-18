import { ImageResponse } from "next/og";

export const alt = "Mota Inteligência de Negócio — integrações, automação, dados, BI e IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 80% 20%, rgba(0,180,216,.28), transparent 34%), linear-gradient(135deg, #020D1F, #0A1628 65%, #10283B)",
          color: "white",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div
            style={{
              color: "#72D7E9",
              display: "flex",
              fontSize: 25,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Mota Inteligência de Negócio
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.05,
              marginTop: 34,
              maxWidth: 1000,
            }}
          >
            Integrações, automação, dados e IA para resolver problemas reais de operação.
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 46 }}>
            {["Integrações", "Automação", "Dados & BI", "IA aplicada"].map((item) => (
              <span
                key={item}
                style={{
                  background: "rgba(0,180,216,.09)",
                  border: "1px solid rgba(0,180,216,.35)",
                  borderRadius: 999,
                  color: "#D7F6FA",
                  display: "flex",
                  fontSize: 20,
                  padding: "12px 18px",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
