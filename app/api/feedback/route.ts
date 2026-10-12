import { NextResponse } from "next/server";
import { createFeedback, getAllFeedbacks, getFeedbackStats } from "@/lib/leads-feedback-service";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { rating, category, comment, userEmail } = body;

    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid rating between 1 and 5 stars." },
        { status: 400 }
      );
    }

    if (!comment || typeof comment !== "string" || comment.trim() === "") {
      return NextResponse.json(
        { ok: false, error: "Please enter your comments or feedback." },
        { status: 400 }
      );
    }

    const feedback = await createFeedback({
      rating,
      category: (category || "General").trim(),
      comment: comment.trim(),
      userEmail: userEmail ? userEmail.trim().toLowerCase() : null,
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Visitor feedback recorded successfully. Thank you for helping us improve!",
        feedback,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error in /api/feedback:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to record visitor feedback." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const feedbacks = await getAllFeedbacks();
    const stats = await getFeedbackStats();

    return NextResponse.json({
      ok: true,
      feedbacks,
      stats,
    });
  } catch (error) {
    console.error("API GET Error in /api/feedback:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch feedbacks." },
      { status: 500 }
    );
  }
}
