"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  toggleSystemLive,
  upsertDbSystem,
  createLicenseRecord,
  deleteDbSystem,
  logAuditAction,
} from "@/lib/systems-service";
import { updateLeadStatus } from "@/lib/leads-feedback-service";

export async function toggleSystemLiveAction(id: string, isLive: boolean) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "UNAUTHORIZED: Admin clearance required" };
  }

  await toggleSystemLive(id, isLive);
  await logAuditAction(
    isLive ? `SYSTEM_ACTIVATED:${id}` : `SYSTEM_DEACTIVATED:${id}`,
    (session.user as any).id
  );

  revalidatePath("/admin");
  revalidatePath("/systems");
  revalidatePath("/");
  return { success: true };
}

export async function deleteSystemAction(id: string) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "UNAUTHORIZED: Admin clearance required" };
  }

  await deleteDbSystem(id);
  await logAuditAction(`SYSTEM_DELETED:${id}`, (session.user as any).id);

  revalidatePath("/admin");
  revalidatePath("/systems");
  revalidatePath("/");
  return { success: true };
}

export async function upsertSystemAction(formData: FormData) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "UNAUTHORIZED: Admin clearance required" };
  }

  const slug = String(formData.get("slug") || "").trim().toLowerCase();
  const title = String(formData.get("title") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  const category = String(formData.get("category") || "Dashboards").trim();
  const overview = String(formData.get("overview") || "").trim();
  const priceINR = String(formData.get("priceINR") || "89999").trim();
  const priceUSD = String(formData.get("priceUSD") || "349").trim();
  const architecture = String(formData.get("architecture") || "Vercel Edge / Node.js").trim();
  const p99Latency = String(formData.get("p99Latency") || "< 12ms P99").trim();
  const throughput = String(formData.get("throughput") || "100,000 Ops/sec").trim();
  
  const rawStack = String(formData.get("techStack") || "Next.js 15, TypeScript, Supabase");
  const techStack = rawStack.split(",").map((s) => s.trim()).filter(Boolean);

  const rawFeatures = String(formData.get("features") || "");
  const features = rawFeatures
    ? rawFeatures.split("\n").map((f) => f.trim()).filter(Boolean)
    : [
        "Full clean-room TypeScript source code",
        "Sub-15ms edge routing telemetry",
        "Production database schema migrations",
      ];

  const apiEndpoints = [
    { method: "GET", path: `/api/v1/${slug}/telemetry`, description: "Real-time edge telemetry probe" },
    { method: "POST", path: `/api/v1/${slug}/sync`, description: "Synchronize high-frequency ledger events" },
  ];

  if (!slug || !title) {
    return { success: false, error: "Slug and title are required" };
  }

  const res = await upsertDbSystem({
    slug,
    title,
    tagline,
    category,
    overview,
    priceINR,
    priceUSD,
    architecture,
    p99Latency,
    throughput,
    techStack,
    features,
    apiEndpoints,
    isLive: true,
  });

  await logAuditAction(`SYSTEM_UPSERTED:${slug}`, (session.user as any).id);

  revalidatePath("/admin");
  revalidatePath("/systems");
  revalidatePath(`/systems/${slug}`);
  revalidatePath("/");

  return { success: true, system: res };
}

export async function generateLicenseAction(
  input: FormData | string,
  clientEmailArg?: string
) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "UNAUTHORIZED: Admin clearance required" };
  }

  let systemSlug = "";
  let clientEmail = clientEmailArg;

  if (typeof input === "string") {
    systemSlug = input;
  } else if (input instanceof FormData) {
    systemSlug = String(input.get("systemSlug") || "").trim();
    clientEmail = String(input.get("clientEmail") || clientEmail || "").trim();
  }

  if (!systemSlug) {
    return { success: false, error: "System slug is required" };
  }

  const license = await createLicenseRecord({
    systemSlug,
    clientEmail,
  });

  await logAuditAction(
    `LICENSE_MINTED:${license.key}:SYSTEM:${systemSlug}`,
    (session.user as any).id
  );

  revalidatePath("/admin");
  revalidatePath("/portal");
  return { success: true, license };
}

export async function updateLeadStatusAction(
  leadId: string,
  newStatus: "NEW" | "CONTACTED" | "CLOSED"
) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "UNAUTHORIZED: Admin clearance required" };
  }

  const result = await updateLeadStatus(leadId, newStatus);
  if (!result.success) {
    return { success: false, error: result.error || "Failed to update lead status" };
  }

  await logAuditAction(
    `LEAD_STATUS_UPDATED:${leadId}:${newStatus}`,
    (session.user as any).id
  );

  revalidatePath("/admin/leads");
  revalidatePath("/admin/analytics");
  revalidatePath("/admin");
  return { success: true, lead: result.lead };
}

