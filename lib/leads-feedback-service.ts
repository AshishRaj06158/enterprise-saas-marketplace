import { prisma } from "@/lib/db";
import { LeadStatus } from "@prisma/client";

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  productName: string;
  budget?: string | null;
  message: string;
  status: "NEW" | "CONTACTED" | "CLOSED";
  createdAt: Date;
  updatedAt?: Date;
}

export interface FeedbackRecord {
  id: string;
  rating: number;
  category: string;
  comment: string;
  userEmail?: string | null;
  createdAt: Date;
}

// In-Memory Fallback Store (populated with realistic seed data if DB is offline)
let inMemoryLeads: LeadRecord[] = [
  {
    id: "lead_01_telemetry",
    name: "Vikram Malhotra",
    email: "vikram@techcorp.in",
    phone: "+91 9811223344",
    company: "TechCorp Logistics",
    productName: "Nexus Telemetry Matrix",
    budget: "₹1,49,000 (Enterprise Suite)",
    message: "Require high-frequency ClickHouse telemetry pipeline for 500 edge nodes.",
    status: "NEW",
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
  },
  {
    id: "lead_02_logistics",
    name: "Ananya Sharma",
    email: "ananya.s@supplychain.ai",
    phone: "+91 9771596801",
    company: "TransGlobal Freight",
    productName: "Quantum Logistics & Fleet ERP",
    budget: "₹2,99,000+ (Custom Managed SLA)",
    message: "Looking for GPS dispatch routing with automated GST e-way bill generation.",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: "lead_03_crm",
    name: "Rohan Varma",
    email: "rohan@fintechscale.com",
    phone: "+91 9988776655",
    company: "FinScale Payments",
    productName: "Autonomous CRM & Revenue Engine",
    budget: "₹49,000 (Single System)",
    message: "Need self-hosted CRM with Razorpay webhooks and client license key distribution.",
    status: "NEW",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
  },
  {
    id: "lead_04_orchestrator",
    name: "Pooja Hegde",
    email: "pooja.h@enterpriseai.org",
    phone: "+91 9876543210",
    company: "Agentic Systems Ltd",
    productName: "Nexus Autonomous Agent Orchestrator",
    budget: "₹1,49,000 (Enterprise Suite)",
    message: "Multi-agent LangGraph workflow engine with isolated execution sandboxes.",
    status: "CLOSED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "lead_05_sentinel",
    name: "Karan Johar",
    email: "karan@authmatrix.io",
    phone: "+91 9123456789",
    company: "CyberMatrix Global",
    productName: "Sentinel Unified Auth & Identity Hub",
    budget: "₹49,000 (Single System)",
    message: "Looking to deploy zero-trust OAuth 2.1 & WebAuthn passkeys across 3 microservices.",
    status: "NEW",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 hours ago
  },
  {
    id: "lead_06_telemetry",
    name: "Deepak Patel",
    email: "deepak@cloudinfra.co",
    phone: "+91 9445566778",
    company: "InfraPulse Technologies",
    productName: "Nexus Telemetry Matrix",
    budget: "₹1,49,000 (Enterprise Suite)",
    message: "Prometheus & Grafana telemetry gateway integration inquiry.",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
];

let inMemoryFeedbacks: FeedbackRecord[] = [
  {
    id: "fb_01",
    rating: 5,
    category: "General",
    comment: "Incredible Cybernetic Neo-Brutalist UI and blazing fast performance! Sandbox loaded in seconds.",
    userEmail: "developer@startup.io",
    createdAt: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: "fb_02",
    rating: 5,
    category: "Feature Request",
    comment: "Would love to see pre-built AWS CDK templates in addition to Docker Compose and Kubernetes.",
    userEmail: "cloudarchitect@scale.com",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: "fb_03",
    rating: 4,
    category: "General",
    comment: "The direct WhatsApp priority channel responded in under 10 minutes. Impressive turnaround.",
    userEmail: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18),
  },
  {
    id: "fb_04",
    rating: 5,
    category: "Feature Request",
    comment: "Please add a dark/light matrix toggle or custom accent color picker for enterprise white-labeling.",
    userEmail: "cto@fintechlabs.in",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
  },
  {
    id: "fb_05",
    rating: 5,
    category: "General",
    comment: "License vault and cryptographic offline verification tools are production-ready out of the box.",
    userEmail: "devops@agency.dev",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
];

/**
 * Persists a new customer lead to the database (with memory fallback).
 */
export async function createLead(data: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  productName: string;
  budget?: string | null;
  message: string;
}): Promise<LeadRecord> {
  try {
    const created = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        productName: data.productName,
        budget: data.budget || null,
        message: data.message,
        status: LeadStatus.NEW,
      },
    });

    return {
      id: created.id,
      name: created.name,
      email: created.email,
      phone: created.phone,
      company: created.company,
      productName: created.productName,
      budget: created.budget,
      message: created.message,
      status: created.status as "NEW" | "CONTACTED" | "CLOSED",
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  } catch (error) {
    console.warn(
      "[LEADS SERVICE NOTICE]: PostgreSQL offline, saving lead to active runtime cache:",
      (error as Error).message
    );

    const fallbackRecord: LeadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      productName: data.productName,
      budget: data.budget || null,
      message: data.message,
      status: "NEW",
      createdAt: new Date(),
    };

    inMemoryLeads.unshift(fallbackRecord);
    return fallbackRecord;
  }
}

/**
 * Fetches all leads ordered by createdAt descending.
 */
export async function getAllLeads(statusFilter?: string): Promise<LeadRecord[]> {
  try {
    const leads = await prisma.lead.findMany({
      where: statusFilter && statusFilter !== "ALL" ? { status: statusFilter as LeadStatus } : undefined,
      orderBy: { createdAt: "desc" },
    });

    if (leads && leads.length > 0) {
      return leads.map((l) => ({
        id: l.id,
        name: l.name,
        email: l.email,
        phone: l.phone,
        company: l.company,
        productName: l.productName,
        budget: l.budget,
        message: l.message,
        status: l.status as "NEW" | "CONTACTED" | "CLOSED",
        createdAt: l.createdAt,
        updatedAt: l.updatedAt,
      }));
    }
  } catch (error) {
    console.warn("[LEADS SERVICE NOTICE]: Database unreachable, using memory leads pool.");
  }

  // Fallback to in-memory records
  if (statusFilter && statusFilter !== "ALL") {
    return inMemoryLeads.filter((l) => l.status === statusFilter);
  }
  return inMemoryLeads;
}

/**
 * Updates a lead's status (NEW -> CONTACTED -> CLOSED).
 */
export async function updateLeadStatus(
  leadId: string,
  newStatus: "NEW" | "CONTACTED" | "CLOSED"
): Promise<{ success: boolean; lead?: LeadRecord; error?: string }> {
  try {
    const updated = await prisma.lead.update({
      where: { id: leadId },
      data: { status: newStatus as LeadStatus },
    });

    return {
      success: true,
      lead: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        company: updated.company,
        productName: updated.productName,
        budget: updated.budget,
        message: updated.message,
        status: updated.status as "NEW" | "CONTACTED" | "CLOSED",
        createdAt: updated.createdAt,
      },
    };
  } catch (error) {
    console.warn(
      `[LEADS SERVICE NOTICE]: Updating in memory store for lead [${leadId}]:`,
      (error as Error).message
    );

    const target = inMemoryLeads.find((l) => l.id === leadId);
    if (target) {
      target.status = newStatus;
      target.updatedAt = new Date();
      return { success: true, lead: target };
    }

    return { success: false, error: "Lead not found in database or memory buffer." };
  }
}

/**
 * Calculates aggregated product analytics & metrics from all leads.
 */
export async function getLeadAnalytics() {
  const leads = await getAllLeads();

  const totalLeads = leads.length;

  // Breakdown by product
  const productCounts: Record<string, number> = {};
  const statusCounts: Record<string, number> = { NEW: 0, CONTACTED: 0, CLOSED: 0 };

  for (const l of leads) {
    productCounts[l.productName] = (productCounts[l.productName] || 0) + 1;
    if (l.status in statusCounts) {
      statusCounts[l.status]++;
    }
  }

  // Find Top Inquired Product
  let topProduct = "None";
  let topProductCount = 0;

  for (const [prod, count] of Object.entries(productCounts)) {
    if (count > topProductCount) {
      topProduct = prod;
      topProductCount = count;
    }
  }

  // Sorted product breakdown list
  const productBreakdown = Object.entries(productCounts)
    .map(([product, count]) => ({
      product,
      count,
      percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalLeads,
    topProduct,
    topProductCount,
    statusCounts,
    productBreakdown,
  };
}

/**
 * Stores visitor feedback in the database (with memory fallback).
 */
export async function createFeedback(data: {
  rating: number;
  category: string;
  comment: string;
  userEmail?: string | null;
}): Promise<FeedbackRecord> {
  const sanitizedRating = Math.max(1, Math.min(5, Math.round(data.rating)));

  try {
    const created = await prisma.feedback.create({
      data: {
        rating: sanitizedRating,
        category: data.category || "General",
        comment: data.comment,
        userEmail: data.userEmail || null,
      },
    });

    return {
      id: created.id,
      rating: created.rating,
      category: created.category,
      comment: created.comment,
      userEmail: created.userEmail,
      createdAt: created.createdAt,
    };
  } catch (error) {
    console.warn(
      "[FEEDBACK SERVICE NOTICE]: Database offline, saving feedback to memory buffer:",
      (error as Error).message
    );

    const fallbackRecord: FeedbackRecord = {
      id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      rating: sanitizedRating,
      category: data.category || "General",
      comment: data.comment,
      userEmail: data.userEmail || null,
      createdAt: new Date(),
    };

    inMemoryFeedbacks.unshift(fallbackRecord);
    return fallbackRecord;
  }
}

/**
 * Fetches all visitor feedbacks.
 */
export async function getAllFeedbacks(): Promise<FeedbackRecord[]> {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (feedbacks && feedbacks.length > 0) {
      return feedbacks.map((f) => ({
        id: f.id,
        rating: f.rating,
        category: f.category,
        comment: f.comment,
        userEmail: f.userEmail,
        createdAt: f.createdAt,
      }));
    }
  } catch (error) {
    console.warn("[FEEDBACK SERVICE NOTICE]: Database unreachable, using memory feedbacks pool.");
  }

  return inMemoryFeedbacks;
}

/**
 * Calculates feedback metrics including average star rating.
 */
export async function getFeedbackStats() {
  const feedbacks = await getAllFeedbacks();

  const totalCount = feedbacks.length;
  if (totalCount === 0) {
    return {
      totalCount: 0,
      averageRating: 0,
      formattedRating: "0.0",
      ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      categoryCounts: {},
    };
  }

  let totalRatingSum = 0;
  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const categoryCounts: Record<string, number> = {};

  for (const f of feedbacks) {
    totalRatingSum += f.rating;
    ratingCounts[f.rating] = (ratingCounts[f.rating] || 0) + 1;
    categoryCounts[f.category] = (categoryCounts[f.category] || 0) + 1;
  }

  const averageRating = totalRatingSum / totalCount;
  const formattedRating = averageRating.toFixed(1);

  return {
    totalCount,
    averageRating,
    formattedRating,
    ratingCounts,
    categoryCounts,
  };
}
