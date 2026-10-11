import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================================
// EDGE IN-MEMORY BURST PROTECTION & RATE LIMITING
// ============================================================================
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const apiRateLimitMap = new Map<string, RateLimitRecord>();
const BURST_LIMIT = 40; // Max 40 requests per 10-second burst window for API
const BURST_WINDOW_MS = 10 * 1000;

// Exploit tools & malicious bot signatures
const MALICIOUS_BOT_PATTERN =
  /sqlmap|nikto|masscan|nmap|havij|acunetix|w3af|openvas|nessus|dirbuster|gobuster|zgrab|morfeus/i;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "127.0.0.1"
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") || "";
  const clientIp = getClientIp(request);
  const now = Date.now();

  // --------------------------------------------------------------------------
  // 1. EDGE BOT & EXPLOITATION DEFENSE
  // --------------------------------------------------------------------------
  if (MALICIOUS_BOT_PATTERN.test(userAgent)) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "ERR_ACCESS_DENIED_EXPLOIT_SCANNER",
        code: "0x403",
        message: "Automated vulnerability scanner signature detected by Edge Firewall.",
      }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          "X-Robots-Tag": "noindex, nofollow",
          "X-Edge-Defense": "ACTIVE_BLOCK",
        },
      }
    );
  }

  // --------------------------------------------------------------------------
  // 2. API ENDPOINTS (/api/*) PROTECTION & BURST LIMITING
  // --------------------------------------------------------------------------
  const isApiRoute = pathname.startsWith("/api");

  if (isApiRoute) {
    // Memory cleanup: prune expired records to prevent unbounded map growth
    if (apiRateLimitMap.size > 1000) {
      for (const [ip, record] of apiRateLimitMap.entries()) {
        if (now > record.resetAt) {
          apiRateLimitMap.delete(ip);
        }
      }
    }

    const currentRecord = apiRateLimitMap.get(clientIp);

    if (!currentRecord || now > currentRecord.resetAt) {
      apiRateLimitMap.set(clientIp, {
        count: 1,
        resetAt: now + BURST_WINDOW_MS,
      });
    } else {
      currentRecord.count += 1;
      if (currentRecord.count > BURST_LIMIT) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            error: "ERR_EDGE_BURST_RATE_LIMIT",
            code: "0x429",
            message: "Burst request threshold exceeded on Edge router. Retry after reset.",
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": "10",
              "X-Robots-Tag": "noindex, nofollow",
              "X-RateLimit-Limit": String(BURST_LIMIT),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": String(Math.ceil(currentRecord.resetAt / 1000)),
              "X-Cybernetic-Runtime": "Next15-Edge-Vercel",
            },
          }
        );
      }
    }

    // Payload size sanity check for incoming POST/PUT/PATCH
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 2 * 1024 * 1024) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "ERR_PAYLOAD_TOO_LARGE",
          code: "0x413",
          message: "Request payload exceeds maximum 2MB size limit.",
        }),
        {
          status: 413,
          headers: {
            "Content-Type": "application/json",
            "X-Robots-Tag": "noindex, nofollow",
          },
        }
      );
    }
  }

  // --------------------------------------------------------------------------
  // 3. RESPONSE INITIALIZATION & HEADER INJECTION
  // --------------------------------------------------------------------------
  const response = NextResponse.next();

  // A. OWASP & Strict Transport Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("X-DNS-Prefetch-Control", "off");

  // B. Content-Security-Policy (CSP)
  const isProduction = process.env.NODE_ENV === "production";
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://images.unsplash.com https://*.unsplash.com https://*.vercel.app",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.supabase.co wss://*.supabase.co",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    ...(isProduction ? ["upgrade-insecure-requests"] : []),
  ];
  response.headers.set("Content-Security-Policy", cspDirectives.join("; "));

  // C. Route-Specific Header Injections
  if (isApiRoute) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    const record = apiRateLimitMap.get(clientIp);
    if (record) {
      response.headers.set("X-RateLimit-Limit", String(BURST_LIMIT));
      response.headers.set(
        "X-RateLimit-Remaining",
        String(Math.max(0, BURST_LIMIT - record.count))
      );
      response.headers.set("X-RateLimit-Reset", String(Math.ceil(record.resetAt / 1000)));
    }
  } else {
    // Public Web Pages Telemetry
    response.headers.set("X-Cybernetic-Runtime", "Next15-Edge-Vercel");
    response.headers.set("X-Powered-By", "Nexus-Architecture");

    // Dynamic Product Pages (/systems/[slug]) vs Standard Pages Cache-Control
    if (pathname.startsWith("/systems/") && pathname.split("/").length >= 3) {
      // Dynamic System Specification Pages
      response.headers.set(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=86400"
      );
    } else if (pathname === "/sitemap.xml" || pathname === "/robots.txt") {
      response.headers.set(
        "Cache-Control",
        "public, s-maxage=86400, stale-while-revalidate=86400"
      );
    } else {
      // Standard static/marketing pages
      response.headers.set(
        "Cache-Control",
        "public, s-maxage=1800, stale-while-revalidate=86400"
      );
    }
  }

  return response;
}

// ----------------------------------------------------------------------------
// MATCH CONFIGURATION (Exclude static files & build assets)
// ----------------------------------------------------------------------------
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets with static extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
};
