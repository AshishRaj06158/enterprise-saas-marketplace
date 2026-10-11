"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  toggleSystemLive,
  upsertDbSystem,
  createLicenseRecord,
} from "@/lib/systems-service";

export async function toggleSystemLiveAction(id: string, isLive: boolean) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "UNAUTHORIZED: Admin clearance required" };
  }

  await toggleSystemLive(id, isLive);
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
  const priceINR = String(formData.get("priceINR") || "₹89,999").trim();
  const priceUSD = String(formData.get("priceUSD") || "$349").trim();
  const architecture = String(formData.get("architecture") || "Vercel Edge / Node.js").trim();
  const p99Latency = String(formData.get("p99Latency") || "< 12ms P99").trim();
  const throughput = String(formData.get("throughput") || "100,000 Ops/sec").trim();
  const rawStack = String(formData.get("techStack") || "Next.js 15, TypeScript, Supabase");
  const techStack = rawStack.split(",").map((s) => s.trim()).filter(Boolean);

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
    isLive: true,
  });

  revalidatePath("/admin");
  revalidatePath("/systems");
  revalidatePath(`/systems/${slug}`);
  revalidatePath("/");

  return { success: !!res, data: res };
}

export async function generateLicenseAction(formData: FormData) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return { success: false, error: "UNAUTHORIZED: Admin clearance required" };
  }

  const systemSlug = String(formData.get("systemSlug") || "telemetry-matrix").trim();
  const clientEmail = String(formData.get("clientEmail") || "client@enterprise.io").trim();

  const license = await createLicenseRecord({
    systemSlug,
    clientEmail,
  });

  revalidatePath("/admin");
  revalidatePath("/portal");
  revalidatePath("/verify");

  return { success: true, license };
}
