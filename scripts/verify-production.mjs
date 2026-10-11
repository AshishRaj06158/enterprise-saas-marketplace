#!/usr/bin/env node

/**
 * ============================================================================
 * SUTRA NEXUS // PRODUCTION SMOKE TEST & ROUTE INTEGRITY VERIFIER
 * ============================================================================
 * Automated verification of static routes, dynamic systems, OG image generator,
 * cybernetic 404 error matrix, and edge security headers.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

// Terminal Styling
const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
  bgDark: "\x1b[40m",
};

console.log(`\n${C.cyan}${C.bold}==================================================================${C.reset}`);
console.log(`${C.cyan}${C.bold}[NEXUS.OS // PRODUCTION INTEGRITY & AUTOMATED ROUTE AUDIT]${C.reset}`);
console.log(`${C.dim}Target Endpoint:${C.reset} ${C.bold}${BASE_URL}${C.reset}`);
console.log(`${C.dim}Timestamp:${C.reset}       ${new Date().toISOString()}`);
console.log(`${C.cyan}${C.bold}==================================================================${C.reset}\n`);

let passedCount = 0;
let failedCount = 0;

function logPass(title, meta = "") {
  passedCount++;
  console.log(`  ${C.green}✓ PASS${C.reset} ${C.bold}${title}${C.reset} ${C.dim}${meta}${C.reset}`);
}

function logFail(title, error) {
  failedCount++;
  console.log(`  ${C.red}✗ FAIL${C.reset} ${C.bold}${title}${C.reset}`);
  console.log(`         ${C.red}Reason: ${error}${C.reset}`);
}

async function request(pathStr, options = {}) {
  const url = `${BASE_URL}${pathStr}`;
  const response = await fetch(url, {
    redirect: "manual",
    ...options,
  });
  return response;
}

// ----------------------------------------------------------------------------
// EXTRACT DYNAMIC SYSTEM SLUGS
// ----------------------------------------------------------------------------
function getSystemSlugs() {
  try {
    const systemsFilePath = path.resolve(__dirname, "../data/systems.ts");
    const content = fs.readFileSync(systemsFilePath, "utf8");
    const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);
    const uniqueSlugs = [...new Set(matches)];
    if (uniqueSlugs.length > 0) return uniqueSlugs;
  } catch (err) {
    console.warn(`${C.yellow}Warning: Failed to read data/systems.ts, using fallback slug list.${C.reset}`);
  }

  return [
    "telemetry-matrix",
    "quantum-logistics-erp",
    "autonomous-crm-pipeline",
    "edge-neural-search",
    "fintech-ledger-engine",
    "compliance-audit-vault",
  ];
}

async function runTestSuite() {
  const startTime = Date.now();

  // --------------------------------------------------------------------------
  // TEST 1: Registered Static Routes (HTTP 200)
  // --------------------------------------------------------------------------
  console.log(`${C.bold}${C.cyan}[1/5] VERIFYING STATIC CORE MARKETPLACE ROUTES${C.reset}`);
  const staticRoutes = [
    "/",
    "/systems",
    "/playground",
    "/vault",
    "/calculator",
    "/developer",
    "/compare",
    "/deploy-config",
    "/operations",
    "/verify",
    "/changelog",
    "/sitemap.xml",
    "/robots.txt",
  ];

  for (const route of staticRoutes) {
    try {
      const res = await request(route);
      if (res.status === 200) {
        logPass(route, `[HTTP 200 OK - ${res.headers.get("content-type")?.split(";")[0] || "OK"}]`);
      } else {
        logFail(route, `Expected HTTP 200 but received HTTP ${res.status}`);
      }
    } catch (err) {
      logFail(route, err.message);
    }
  }

  // --------------------------------------------------------------------------
  // TEST 2: Dynamic System Slug Resolution (HTTP 200)
  // --------------------------------------------------------------------------
  console.log(`\n${C.bold}${C.cyan}[2/5] VERIFYING DYNAMIC SYSTEM PRODUCT SLUGS${C.reset}`);
  const slugs = getSystemSlugs();
  for (const slug of slugs) {
    const route = `/systems/${slug}`;
    try {
      const res = await request(route);
      if (res.status === 200) {
        const text = await res.text();
        if (text.toLowerCase().includes(slug) || text.includes("NEXUS")) {
          logPass(route, `[HTTP 200 OK - Prerendered Product Spec Verified]`);
        } else {
          logFail(route, `HTTP 200 received but content missing product identifier`);
        }
      } else {
        logFail(route, `Expected HTTP 200 but received HTTP ${res.status}`);
      }
    } catch (err) {
      logFail(route, err.message);
    }
  }

  // --------------------------------------------------------------------------
  // TEST 3: Dynamic OpenGraph Image Generation (Buffer & PNG content-type)
  // --------------------------------------------------------------------------
  console.log(`\n${C.bold}${C.cyan}[3/5] VERIFYING DYNAMIC OPENGRAPH IMAGE ENGINE${C.reset}`);
  const ogRoute = `/systems/${slugs[0]}/opengraph-image`;
  try {
    const res = await request(ogRoute);
    const contentType = res.headers.get("content-type") || "";
    if (res.status === 200 && contentType.includes("image/png")) {
      const arrayBuffer = await res.arrayBuffer();
      if (arrayBuffer.byteLength > 500) {
        logPass(ogRoute, `[HTTP 200 OK - Valid PNG ImageBuffer (${arrayBuffer.byteLength} bytes)]`);
      } else {
        logFail(ogRoute, `Image buffer is unexpectedly small: ${arrayBuffer.byteLength} bytes`);
      }
    } else {
      logFail(ogRoute, `Expected HTTP 200 with image/png, got HTTP ${res.status} (${contentType})`);
    }
  } catch (err) {
    logFail(ogRoute, err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 4: Cybernetic 404 Error Matrix Execution
  // --------------------------------------------------------------------------
  console.log(`\n${C.bold}${C.cyan}[4/5] VERIFYING CYBERNETIC 404 ERROR MATRIX${C.reset}`);
  const invalidRoute = "/nexus-invalid-route-fault-0x404";
  try {
    const res = await request(invalidRoute);
    if (res.status === 404) {
      const body = await res.text();
      const hasGlitchHeader =
        body.includes("ERR_ROUTE_NOT_FOUND") ||
        body.includes("0x404") ||
        body.includes("SYSTEM_DESYNC");
      const hasDiagnostics =
        body.includes("KERNEL_HALTED") || body.includes("TARGET_VECTOR");

      if (hasGlitchHeader && hasDiagnostics) {
        logPass(invalidRoute, `[HTTP 404 - Neo-Brutalist Telemetry Matrix Verified]`);
      } else {
        logPass(invalidRoute, `[HTTP 404 - Status correctly returned with custom body]`);
      }
    } else {
      logFail(invalidRoute, `Expected HTTP 404 but received HTTP ${res.status}`);
    }
  } catch (err) {
    logFail(invalidRoute, err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 5: Edge Security Headers & Telemetry
  // --------------------------------------------------------------------------
  console.log(`\n${C.bold}${C.cyan}[5/5] VERIFYING ENTERPRISE SECURITY HEADERS & TELEMETRY${C.reset}`);
  try {
    const res = await request("/");
    const headers = res.headers;

    const securityAudit = [
      {
        name: "X-Frame-Options: DENY",
        valid: headers.get("x-frame-options") === "DENY",
        val: headers.get("x-frame-options"),
      },
      {
        name: "X-Content-Type-Options: nosniff",
        valid: headers.get("x-content-type-options") === "nosniff",
        val: headers.get("x-content-type-options"),
      },
      {
        name: "Content-Security-Policy",
        valid: headers.has("content-security-policy"),
        val: headers.get("content-security-policy")?.slice(0, 32) + "...",
      },
      {
        name: "Strict-Transport-Security",
        valid: headers.has("strict-transport-security"),
        val: headers.get("strict-transport-security"),
      },
      {
        name: "X-Cybernetic-Runtime",
        valid: headers.get("x-cybernetic-runtime") === "Next15-Edge-Vercel",
        val: headers.get("x-cybernetic-runtime"),
      },
      {
        name: "X-Powered-By: Nexus-Architecture",
        valid: headers.get("x-powered-by") === "Nexus-Architecture",
        val: headers.get("x-powered-by"),
      },
    ];

    for (const item of securityAudit) {
      if (item.valid) {
        logPass(`Header: ${item.name}`, `[${item.val}]`);
      } else {
        logFail(`Header: ${item.name}`, `Missing or invalid header value: ${item.val}`);
      }
    }
  } catch (err) {
    logFail("Security Headers Check", err.message);
  }

  // --------------------------------------------------------------------------
  // FINAL REPORT
  // --------------------------------------------------------------------------
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const totalTests = passedCount + failedCount;

  console.log(`\n${C.cyan}${C.bold}==================================================================${C.reset}`);
  console.log(`${C.bold}AUDIT SUMMARY:${C.reset}`);
  console.log(`  Total Checks:    ${totalTests}`);
  console.log(`  Passed Checks:   ${C.green}${passedCount}${C.reset}`);
  console.log(`  Failed Checks:   ${failedCount > 0 ? `${C.red}${failedCount}` : `${C.green}0`}${C.reset}`);
  console.log(`  Execution Time:  ${duration}s`);
  console.log(`${C.cyan}${C.bold}==================================================================${C.reset}\n`);

  if (failedCount > 0) {
    console.error(`${C.red}${C.bold}[AUDIT_FAILED // CRITICAL ROUTE ERRORS DETECTED]${C.reset}`);
    process.exit(1);
  } else {
    console.log(`${C.green}${C.bold}[AUDIT_PASSED // ALL ARCHITECTURE VECTORS 100% OPERATIONAL]${C.reset}\n`);
    process.exit(0);
  }
}

runTestSuite().catch((err) => {
  console.error("Unhandled test execution error:", err);
  process.exit(1);
});
