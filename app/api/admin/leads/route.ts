import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAllLeads, updateLeadStatus, getLeadAnalytics } from "@/lib/leads-feedback-service";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "UNAUTHORIZED: Admin clearance required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "ALL";

    const [leads, analytics] = await Promise.all([
      getAllLeads(status),
      getLeadAnalytics(),
    ]);

    return NextResponse.json({
      success: true,
      leads,
      analytics,
    });
  } catch (error) {
    console.error("[API_ADMIN_LEADS_GET_ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to retrieve leads telemetry" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "UNAUTHORIZED: Admin clearance required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { leadId, status } = body;

    if (!leadId || !["NEW", "CONTACTED", "CLOSED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid leadId or status value. Allowed: NEW, CONTACTED, CLOSED" },
        { status: 400 }
      );
    }

    const result = await updateLeadStatus(leadId, status);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update lead status" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: result.lead,
    });
  } catch (error) {
    console.error("[API_ADMIN_LEADS_PATCH_ERROR]:", error);
    return NextResponse.json(
      { error: "Internal server error updating lead status" },
      { status: 500 }
    );
  }
}
