# Agentic System Architecture & Skill Reference Guide

This document outlines the architecture, agent patterns, and self-healing operational protocols inspired by `agentic-awesome-skills` for the **Sutra / Nexus Enterprise Marketplace**.

---

## Overview

The Sutra / Nexus platform is an enterprise-grade fullstack software marketplace built on **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, and **Supabase / Redis** integrations. This guide serves as a reference for AI agents and human developers maintaining the system.

---

## Core Operational Patterns

### 1. React Server Components (RSC) & Client Boundaries
- **Server Components (Default)**: Render initial page structures, fetch static system data, handle metadata (`generateMetadata`), and define static params (`generateStaticParams`).
- **Client Components (`'use client'`)**: Isolated interactive islands (e.g., `HeroSlider.tsx`, `PricingSection.tsx`, `DynamicSystemPreview.tsx`) handling state, currency switching, animations, and tab selections.

### 2. Autonomous Self-Healing Loop
When performing code edits:
1. **Analyze**: Inspect existing signatures, types, and exports before modifying files.
2. **Execute**: Apply surgical updates preserving code style and comments.
3. **Verify**: Run `npm run build` to confirm zero static site generation (SSG) errors across all routes.
4. **Remediate**: If an error is detected, trace the stack log directly to the exact file and line to fix the root cause.

### 3. Data Integrity & Schema Validation
- System products are stored deterministically in [`data/systems.ts`](file:///c:/Users/Ashish%20Raj/Desktop/collage%20project/data/systems.ts).
- All products conform to the `SystemProduct` interface with strict typing for price formats, metrics strings, tech stack arrays, and technical specifications.
- Input forms and URL search params must be validated with **Zod** schemas.

---

## System Catalog Structure

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier (e.g., `nexus-agent-orchestrator`) |
| `slug` | `string` | URL route parameter |
| `name` | `string` | Full product title |
| `badge` | `string` | Cybernetic feature tag |
| `category` | `'Dashboards' \| 'ERP' \| 'CRM' \| 'Websites' \| 'AI Agents'` | Product classification |
| `specs` | `SystemSpec[]` | Key-value pairs for technical specifications |
| `stack` | `string[]` | Included technologies |
| `features` | `string[]` | Core audited capabilities |

---

## Theme & Design Tokens

- **Background**: `#07090E`
- **Surface Card**: `#0D111A`
- **Cyan Accent**: `#00F0FF`
- **Purple Accent**: `#8B5CF6`
- **Text Primary**: White (`#FFFFFF`) / Slate (`#94A3B8`)
- **Typography**: Tabular Mono for metrics (`font-mono-tabular`) & Sans for headers.

---

*Generated for Sutra / Nexus Enterprise Architecture — Autonomous Agent Standard.*
