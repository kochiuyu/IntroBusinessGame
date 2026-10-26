# Strategic Thinking: Game Theory for Business Strategy
### 商業策略博弈論 · Executive Education & Strategic Simulator Platform

[![Course](https://img.shields.io/badge/Course-CUHK%20Business%20School-blue.svg)](https://kochiuyu.github.io/)
[![Term](https://img.shields.io/badge/Term-Semester%202026--27%20Term%201-indigo.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8.svg)](https://tailwindcss.com/)

> **Core Maxim:** *"Make better decisions when other decision-makers are thinking too."*  
> **Instructor:** Prof. Chiu Yu Ko, CUHK Business School  

---

## 📌 Overview

**Strategic Thinking: Game Theory for Business Strategy** is an executive-level learning platform and interactive simulation suite. Designed for MBA candidates, corporate executives, and strategy practitioners, the platform translates rigorous mathematical game theory into actionable strategic diagnosis, competitive intelligence, and mechanism design.

Rather than treating game theory as abstract mathematics or speculative tricks, this platform emphasizes **structural strategic diagnosis**:
1. **Decision:** Who must decide what?
2. **Game:** Who are the players, and what can each choose?
3. **Structure:** What are the timing, information availability, and payoff incentives?
4. **Analysis:** What equilibrium responses and outcomes does the economic model predict?
5. **Recommendation:** What should the executive do, and what underlying assumption could reverse the conclusion?

---

## 🚀 Key Platform Features

### 1. Dual-Track Lecture Notes & Mathematical Foundations
Every lecture module provides two synchronized perspectives:
- **🌱 Beginner Intuition Mode:** Plain-English mental models, executive rules of thumb, and intuitive analogies without complex notation.
- **📐 Formal Derivations Mode:** Step-by-step mathematical proofs, algebraic derivations (geometric series continuation values, indifference principles, Bayesian Nash equilibrium calculus, and Kuhn-Tucker conditions) rendered with **KaTeX**.

### 2. Interactive Strategy Simulators
The platform includes bespoke, interactive visualizers for each strategic domain:
- **Week 1 & 3 — Normal-Form Matrix & IESDS Solver:** Simultaneous-move 2×2 and 3×3 bimatrix solver with best-response underlines, iterated elimination of strictly dominated strategies (IESDS), and Nash Equilibrium identification.
- **Week 2 — Extensive-Form Game Tree Diagram:** Sequential market entry deterrence with backward induction pruning and subgame perfection.
- **Week 4 — Mixed Strategy Visualizer:** Dynamic calculation of the Indifference Principle ($p^*, q^*$) with interactive promotional scheduling and regulatory audit games.
- **Week 5 — Strategic Moves & Commitment Tree:** Three-stage extensive tree quantifying upfront capital commitment ($K$), capacity expansion, and Most-Favored-Customer (MFC) clauses.
- **Week 6 — Repeated Game & Discount Factor ($\delta$) Simulator:** Dynamic multi-round simulation testing Grim Trigger versus Tit for Tat, calculating exact continuation thresholds ($\delta^* = \frac{T - R}{T - P}$), asymmetric supply chain partnerships, and monitoring noise.
- **Week 7 — Auctions & Bidding Mechanics Simulator:**
  - *Four Canonical Formats:* First-Price Sealed-Bid (FPSB), Second-Price Sealed-Bid (Vickrey), English Ascending Clock, and Dutch Descending Clock.
  - *Vickrey Dominance Explorer:* Interactive proof showing why truthful bidding ($b = v$) weakly dominates underbidding ($b < v$) and overbidding ($b > v$) for any rival bid profile.
  - *Bid Shading Curve:* Dynamic calculus optimization curve balancing winning probability against profit margins ($b^*(v) = \frac{n-1}{n} v$) with risk-aversion parameters.
  - *Revenue Equivalence Monte Carlo Lab:* Multi-run stochastic simulation demonstrating expected seller revenue convergence ($\frac{n-1}{n+1} V_{\max}$) under benchmark assumptions.
  - *Winner's Curse Laboratory:* Shared-value simulation demonstrating how naive bidding produces severe post-award losses and how rational adverse-selection conditioning restores profitability.
  - *Procurement Scoring Engine:* Two-dimensional reverse auction evaluation combining Price Score and Quality/Reliability Score ($w_p \cdot \text{PriceScore} + w_q \cdot \text{QualityScore}$).

### 3. Real-World Business Cases & Strategic Dossiers
Deep-dive case studies spanning multiple industries:
- **Aviation & Logistics:** Airline baggage unbundling, container shipping price wars.
- **Technology & Cloud:** AI hardware capex preemption, semiconductor foundry capacity.
- **Digital Platforms:** Google Search Ad Generalized Second Price (GSP) auctions, eBay proxy bidding.
- **Energy & Resources:** Offshore wind seabed leases, oil drilling block tenders, OPEC production quotas.
- **Retail & FMCG:** Dynamic promotional markdowns (Varian's model of sales), food-delivery coupon battles.

### 4. Self-Contained Executive Diagnostic Quizzes
- Comprehensive multiple-choice quizzes for each module.
- 100% self-contained questions, scenarios, and payoffs with detailed step-by-step economic explanations (independent of slide numbers).

### 5. Full Markdown Compendium & Reading Suite
- Integrated markdown reader with table-of-contents navigation, search, and one-click clipboard copying.
- In-browser slide viewer for high-resolution PDF lecture decks.

---

## 📚 12-Week Curriculum Architecture

| Week | Title | Core Strategic Focus | Status |
| :---: | :--- | :--- | :---: |
| **0** | **Course Overview & Architecture** | 5-step diagnostic framework; matrix vs. tree representations | **Active** |
| **1** | **Introduction to Strategic Thinking** | Strategic interdependence; Prisoner's Dilemma; pricing traps | **Active** |
| **2** | **Sequential Games & Backward Induction** | Extensive trees; first-mover vs second-mover advantages; credible threats | **Active** |
| **3** | **Simultaneous Moves & Nash Equilibrium** | Best responses; IESDS; Cournot quantity vs. Bertrand price competition | **Active** |
| **4** | **Mixed Strategies & Randomization** | Indifference principle; cyclic instability; promotional scheduling; inspection games | **Active** |
| **5** | **Commitment & Strategic Moves** | Sunk capital ($K$); burning bridges; contracting; flexibility vs commitment | **Active** |
| **6** | **Repeated Games & Dynamic Enforcement** | Finite unraveling; discount factors ($\delta$); Grim Trigger; Tit for Tat; monitoring noise | **Active** |
| **7** | **Auctions I: Bidding, Information & Rules** | First-Price; Second-Price/Vickrey; English; Dutch; Revenue Equivalence; Winner's Curse | **Active** |
| **8** | **Auctions II: Mechanism Design & Ad Auctions** | Generalized Second Price (GSP); VCG multi-unit; combinatorial spectrum; bid rigging | *Upcoming* |
| **9** | **Bargaining, Negotiation & Value Capture** | Nash bargaining; Rubinstein alternating offers; BATNA; outside options | *Upcoming* |
| **10** | **Asymmetric Information & Costly Signaling** | Adverse selection; Spence job market signaling; warranties; screening mechanisms | *Upcoming* |
| **11** | **Platform Competition & Network Effects** | Two-sided markets; cross-side externalities; multihoming; chicken-and-egg problem | *Upcoming* |
| **12** | **Coopetition & The Strategic Playbook** | Value Net (Brandenburger & Nalebuff); ecosystem governance; course synthesis | *Upcoming* |

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build System:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animation:** [Motion](https://motion.dev/)
- **Mathematics & Formatting:** [KaTeX](https://katex.org/) & [Marked](https://marked.js.org/)
- **Runtime:** Node.js / Bun

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+ recommended) or Bun

### Installation

1. **Clone or enter the project repository:**
   ```bash
   cd strategic-thinking-game-theory
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:3000`.

### Building & Verification

- **Type-check & Lint:**
  ```bash
  npm run lint
  ```
- **Production Build:**
  ```bash
  npm run build
  ```
- **Preview Production Build:**
  ```bash
  npm run preview
  ```

---

## 📖 External Resources & Authoring Tools

- **[GameTikzStudio](https://kochiuyu.github.io/GameTikzStudio/):** Interactive extensive-form game tree, payoff matrix, and timeline authoring suite with instant LaTeX TikZ code export.
- **[Strategic Interactive Simulations](https://kochiuyu.github.io/):** Interactive behavioral game theory laboratory by Prof. Chiu Yu Ko.

---

## 📄 License & Academic Attribution

Developed for **CUHK Business School** Executive Master & MBA programs.  
Course materials, slide content, and strategic curricula copyright © Prof. Chiu Yu Ko. All rights reserved.
