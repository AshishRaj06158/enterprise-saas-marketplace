"use client";

import React, { useState } from "react";
import { MessageSquarePlus, Star, X, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("General");
  const [comment, setComment] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    { id: "General", label: "General Experience" },
    { id: "Feature Request", label: "Feature Request" },
    { id: "Bug", label: "Bug Report" },
    { id: "Pricing / SLA", label: "Pricing / SLA" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setErrorMsg("Please enter your comments or suggestions.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          category,
          comment: comment.trim(),
          userEmail: userEmail.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setIsOpen(false);
          setComment("");
          setUserEmail("");
          setRating(5);
        }, 2200);
      } else {
        setErrorMsg(data.error || "Failed to submit feedback. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* FLOATING ACTION TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2 px-3.5 py-2.5 bg-[#0D111A] hover:bg-[#00F0FF] text-[#00F0FF] hover:text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] transition-all cursor-pointer select-none"
          title="Share your feedback with NexusLabs"
          aria-label="Open Feedback Dialog"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full bg-[#00F0FF] opacity-75 group-hover:bg-black" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF] group-hover:bg-black" />
          </span>
          <MessageSquarePlus className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">[FEEDBACK]</span>
        </button>
      </div>

      {/* FEEDBACK MODAL DIALOG */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-[#0D111A] border-2 border-[#00F0FF] shadow-[8px_8px_0px_0px_#00F0FF] relative overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Cyan Scanline */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px]" />

            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b-2 border-[#1A2234] bg-[#07090E] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#00F0FF]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  [VISITOR FEEDBACK // TRANSMISSION MATRIX]
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white border border-transparent hover:border-[#EF4444] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content or Success Confirmation */}
            {isSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-none bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[2px_2px_0px_0px_#10B981]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white font-mono uppercase">
                    FEEDBACK TRANSMITTED &amp; LOGGED
                  </h4>
                  <p className="text-xs font-mono text-slate-400">
                    Thank you! Your rating and insights have been logged to the NexusLabs admin matrix.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 font-mono text-xs">
                {/* Star Rating Selector */}
                <div>
                  <label className="block text-slate-400 uppercase mb-2">
                    [1. HOW WOULD YOU RATE YOUR EXPERIENCE?] *
                  </label>
                  <div className="flex items-center space-x-2 p-3 bg-[#07090E] border-2 border-[#1A2234] shadow-[2px_2px_0px_0px_#1A2234]">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating !== null ? hoverRating : rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(star)}
                          className="p-1 cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            className={`w-6 h-6 ${
                              isFilled
                                ? "text-[#00F0FF] fill-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                                : "text-slate-600"
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-auto font-bold text-[#00F0FF] text-sm">
                      {hoverRating !== null ? hoverRating : rating}.0 / 5.0
                    </span>
                  </div>
                </div>

                {/* Feedback Category Pills */}
                <div>
                  <label className="block text-slate-400 uppercase mb-2">
                    [2. CATEGORY]
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`py-2 px-2.5 text-[11px] font-bold uppercase transition-all border-2 text-left ${
                          category === cat.id
                            ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]"
                            : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:text-white hover:border-slate-600"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-slate-400 uppercase mb-2">
                    [3. YOUR COMMENTS / SUGGESTIONS] *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us what you liked, suggested system architectures, or bugs observed..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] px-3.5 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none transition-colors shadow-[2px_2px_0px_0px_#1A2234]"
                  />
                </div>

                {/* Optional Email */}
                <div>
                  <label className="block text-slate-400 uppercase mb-2">
                    [4. WORK EMAIL (OPTIONAL)]
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com (for follow-ups)"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] px-3.5 py-2 text-slate-200 placeholder-slate-600 focus:outline-none transition-colors shadow-[2px_2px_0px_0px_#1A2234]"
                  />
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-2.5 bg-red-950/60 border-2 border-red-500 text-red-300 flex items-center space-x-2 text-[11px] shadow-[2px_2px_0px_0px_#EF4444]">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#00F0FF] text-black font-bold uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_#00F0FF] hover:bg-[#00F0FF]/90 active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer min-h-[44px]"
                >
                  {isSubmitting ? (
                    <span>[LOGGING FEEDBACK...]</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>[TRANSMIT VISITOR FEEDBACK]</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
