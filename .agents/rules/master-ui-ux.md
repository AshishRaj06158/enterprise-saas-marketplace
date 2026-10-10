# MASTER DIRECTIVE: ENTERPRISE CYBERNETIC UI/UX & MCP ORCHESTRATION ENGINE

## 1. CORE DESIGN TOKENS & VISUAL IDENTITY
- Strict Palette:
  - Deep Canvas: #07090E (Pitch dark background)
  - Card & Surfaces: #0D111A with 1px border #1A2234
  - Primary Accent: #00F0FF (Electric Cyan)
  - Secondary Accent: #8B5CF6 (Neon Violet)
  - Text Primary: #F1F5F9 (Slate-100) with tracking-tight
  - Text Muted: #94A3B8 (Slate-400)
- Surface Elevation & Glassmorphism:
  - Use `backdrop-blur-md bg-[#0D111A]/80` on all interactive panels.
  - Hover states: Subtle 1px gradient border (#00F0FF/40 to #8B5CF6/40) with outer glow `shadow-[0_0_20px_rgba(0,240,255,0.15)]`.

## 2. 21st.dev CLEAN-ROOM SYNTHESIS & COMPONENT ARCHITECTURE
- Never clone proprietary code verbatim. Synthesize components from first principles:
  - Extract layout geometry (Bento grid, spotlight cursor tracking, radial gradient light sweeps).
  - Code implementation from scratch using Tailwind CSS, Lucide React icons, and Framer Motion.
  - Enforce strict TypeScript types (Zero `any` usage, strict interfaces).

## 3. MOTION & PERFORMANCE STANDARDS (FRAMER MOTION)
- GPU-Accelerated Only: Only animate `transform` and `opacity` (never animate width, height, or padding).
- Timing Rhythm:
  - Micro-interactions (hover, active clicks): 100ms - 180ms ease-out.
  - Card hover lift: `whileHover={{ y: -4 }}`.
  - Viewport scroll entries: Staggered reveal with `viewport: { once: true }`.
- Accessibility: Respect `prefers-reduced-motion` across all transition loops.

## 4. FRONTEND TESTING & MCP TOOL PROTOCOLS
- Chrome DevTools / Browser MCP Protocol:
  - Always verify mobile viewports (minimum 44px touch targets, zero horizontal overflow).
  - Check for console hydration warnings or layout shifts.
- Autonomous Verification:
  - Every time a component is updated, self-verify with `npm run build` to maintain zero static generation errors.
