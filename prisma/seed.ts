import { PrismaClient, Role, LicenseStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { systemsData } from "../data/systems";

const prisma = new PrismaClient();

async function main() {
  console.log("==================================================================");
  console.log("[SEEDING NEXUS ENTERPRISE DATABASE // POSTGRESQL]");
  console.log("==================================================================");

  // 1. Create Default Admin User
  const adminPassword = await bcrypt.hash("CyberNexus@2026", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@nexus.enterprise" },
    update: {
      password: adminPassword,
      role: Role.ADMIN,
    },
    create: {
      name: "CyberNexus Root Admin",
      email: "admin@nexus.enterprise",
      password: adminPassword,
      role: Role.ADMIN,
      companyName: "Nexus Cybernetics Inc.",
    },
  });
  console.log(`✓ Admin User Seeded: ${adminUser.email} (Role: ${adminUser.role})`);

  // 2. Create Default Client User
  const clientPassword = await bcrypt.hash("CyberNexus@2026", 10);
  const clientUser = await prisma.user.upsert({
    where: { email: "client@enterprise.io" },
    update: {
      password: clientPassword,
      role: Role.CLIENT,
    },
    create: {
      name: "Enterprise Client Corp",
      email: "client@enterprise.io",
      password: clientPassword,
      role: Role.CLIENT,
      companyName: "HyperScale Global Systems Ltd.",
    },
  });
  console.log(`✓ Client User Seeded: ${clientUser.email} (Role: ${clientUser.role})`);

  // 3. Seed All 6 Core Systems from data/systems.ts
  for (const sys of systemsData) {
    const priceINRInt = parseInt(sys.priceInr.replace(/\D/g, ""), 10) || 89999;
    const priceUSDInt = parseInt(sys.priceUsd.replace(/\D/g, ""), 10) || 349;

    const endpoints = [
      { method: "GET", path: `/api/v1/${sys.slug}/telemetry`, description: "Real-time edge telemetry probe" },
      { method: "POST", path: `/api/v1/${sys.slug}/sync`, description: "Synchronize high-frequency ledger events" },
    ];

    const createdSystem = await prisma.system.upsert({
      where: { slug: sys.slug },
      update: {
        title: sys.name,
        tagline: sys.tagline,
        category: sys.category,
        overview: sys.description,
        priceINR: priceINRInt,
        priceUSD: priceUSDInt,
        architecture: sys.runtime,
        p99Latency: sys.latency,
        throughput: sys.concurrency,
        uptime: "99.98%",
        techStack: sys.stack,
        features: sys.features,
        apiEndpoints: endpoints,
        isLive: true,
      },
      create: {
        slug: sys.slug,
        title: sys.name,
        tagline: sys.tagline,
        category: sys.category,
        overview: sys.description,
        priceINR: priceINRInt,
        priceUSD: priceUSDInt,
        architecture: sys.runtime,
        p99Latency: sys.latency,
        throughput: sys.concurrency,
        uptime: "99.98%",
        techStack: sys.stack,
        features: sys.features,
        apiEndpoints: endpoints,
        isLive: true,
      },
    });
    console.log(`✓ Seeded System: [${createdSystem.slug}] -> ${createdSystem.title}`);
  }

  // 4. Seed Initial Cryptographic License
  const firstSystem = await prisma.system.findFirst({
    where: { slug: "telemetry-matrix" },
  });

  if (firstSystem) {
    const license = await prisma.license.upsert({
      where: { key: "NX-ENT-8842-CYBER-2026" },
      update: {
        userId: clientUser.id,
        status: LicenseStatus.ACTIVE,
      },
      create: {
        key: "NX-ENT-8842-CYBER-2026",
        buildHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        status: LicenseStatus.ACTIVE,
        systemId: firstSystem.id,
        userId: clientUser.id,
      },
    });
    console.log(`✓ Seeded Verified License: ${license.key} -> ${clientUser.email}`);
  }

  // 5. Seed Initial Audit Log
  await prisma.auditLog.create({
    data: {
      action: "NODE_INITIALIZATION_SEEDED",
      userId: adminUser.id,
      ipAddress: "127.0.0.1",
    },
  });
  console.log(`✓ Seeded Initial Root Audit Log Record`);

  console.log("\n[SEED_COMPLETED // ALL NODES SYNCHRONIZED]");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
