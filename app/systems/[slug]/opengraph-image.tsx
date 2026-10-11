import { ImageResponse } from "next/og";
import { getSystemBySlug } from "@/data/systems";

export const runtime = "edge";

// Image metadata specification
export const alt = "SUTRA / NEXUS Verified Architecture Specification";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sys = getSystemBySlug(slug);

  const title = sys?.name || "Nexus System Specification";
  const tagline =
    sys?.tagline ||
    "Production-ready enterprise software architecture with native payment rails & full IP ownership.";

  // Extract clean numerical strings without currency symbols for rendering
  const rawInr = sys?.priceInr || "₹89,999";
  const rawUsd = sys?.priceUsd || "$349";
  const inrDigits = rawInr.replace(/^[^\d]*/, "");
  const usdDigits = rawUsd.replace(/^[^\d]*/, "");

  // Tech stack priority tags
  const defaultStack = ["Next.js 15", "Supabase", "TypeScript"];
  const dynamicStack = sys?.stack?.filter(
    (item) => !defaultStack.includes(item)
  ) || [];
  const featuredStack = [...defaultStack, ...dynamicStack].slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#07090E",
          border: "4px solid #00F0FF",
          padding: "52px 60px",
          position: "relative",
          boxSizing: "border-box",
          fontFamily: "system-ui, -apple-system, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Fine Matrix Grid Overlay */}
        <svg
          width="1200"
          height="630"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0.2,
          }}
        >
          <defs>
            <pattern
              id="og-matrix-grid"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 36 0 L 0 0 0 36"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="1.5" fill="#00F0FF" />
            </pattern>
          </defs>
          <rect width="1200" height="630" fill="url(#og-matrix-grid)" />
        </svg>

        {/* Ambient Cybernetic Glow Elements */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0, 240, 255, 0.16) 0%, rgba(7, 9, 14, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "200px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, rgba(7, 9, 14, 0) 70%)",
          }}
        />

        {/* TOP ROW: Neo-Brutalist Badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Prominent Hard-Shadow Badge: [NEXUS.OS // VERIFIED ARCHITECTURE] */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#0D111A",
              border: "2px solid #00F0FF",
              boxShadow: "4px 4px 0px 0px #00F0FF",
              padding: "10px 20px",
              color: "#00F0FF",
              fontSize: "15px",
              fontWeight: 800,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
            }}
          >
            [NEXUS.OS // VERIFIED ARCHITECTURE]
          </div>

          {/* System Badge / Status Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#0D111A",
                border: "2px solid #8B5CF6",
                boxShadow: "4px 4px 0px 0px #8B5CF6",
                padding: "8px 16px",
                color: "#C4B5FD",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              {sys?.badge ? `[${sys.badge}]` : "[ENTERPRISE GRADE]"}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#0A0E17",
                border: "2px solid #1E293B",
                boxShadow: "3px 3px 0px 0px #1E293B",
                padding: "8px 14px",
                color: "#10B981",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                style={{ marginRight: "8px" }}
              >
                <circle cx="4" cy="4" r="4" fill="#10B981" />
              </svg>
              <span>LIVE v2.4</span>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Title, Tagline & Tech Stack Tags */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#00F0FF",
              fontSize: "14px",
              fontWeight: 800,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            // AUDITED PRODUCTION SPECIFICATION // {sys?.category || "FULLSTACK"}
          </div>

          {/* System Title */}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 28 ? "48px" : "56px",
              fontWeight: 900,
              color: "#F1F5F9",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              textTransform: "uppercase",
              maxWidth: "1060px",
            }}
          >
            {title}
          </div>

          {/* System Tagline */}
          <div
            style={{
              display: "flex",
              fontSize: "21px",
              color: "#94A3B8",
              fontWeight: 500,
              lineHeight: 1.4,
              maxWidth: "1000px",
            }}
          >
            {tagline}
          </div>

          {/* Tech Stack Tags: Next.js 15, Supabase, TypeScript */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#00F0FF",
                fontSize: "13px",
                fontWeight: 800,
                letterSpacing: "1.5px",
                marginRight: "4px",
              }}
            >
              // STACK:
            </div>
            {featuredStack.map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 14px",
                  backgroundColor: "#0D111A",
                  border: "2px solid #1E293B",
                  boxShadow: "3px 3px 0px 0px #1E293B",
                  color: "#E2E8F0",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                [{tech}]
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: Marketplace Metadata & Dynamic Price Indicator */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            borderTop: "2px solid #1A2234",
            paddingTop: "24px",
          }}
        >
          {/* Marketplace Guarantee Details */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#F1F5F9",
                fontSize: "16px",
                fontWeight: 900,
                letterSpacing: "2px",
              }}
            >
              SUTRA // NEXUS MARKETPLACE
            </div>
            <div
              style={{
                display: "flex",
                color: "#64748B",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              FULL IP OWNERSHIP • POSTGRES RLS • ZERO-CONFIG CLOUD DEPLOY
            </div>
          </div>

          {/* Dynamic Price Indicator: ₹{priceINR} / ${priceUSD} with glowing cyan accent */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              padding: "12px 24px",
              backgroundColor: "#0D111A",
              border: "2px solid #00F0FF",
              boxShadow:
                "4px 4px 0px 0px #00F0FF, 0 0 24px rgba(0, 240, 255, 0.45)",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#8B5CF6",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "2px",
                marginBottom: "4px",
                textTransform: "uppercase",
              }}
            >
              COMMERCIAL LICENSE //
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: "#00F0FF",
                fontSize: "28px",
                fontWeight: 900,
                letterSpacing: "0.5px",
                textShadow: "0 0 16px rgba(0, 240, 255, 0.6)",
              }}
            >
              {/* Vector Rupee Glyphs */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "3px" }}
              >
                <path d="M6 3h12" />
                <path d="M6 8h12" />
                <path d="m6 13 8.5 8" />
                <path d="M6 13h3" />
                <path d="M9 13c6.667 0 6.667-10 0-10" />
              </svg>
              <span>{inrDigits}</span>
              <span style={{ margin: "0 8px", color: "#64748B" }}>/</span>
              <span>${usdDigits}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
