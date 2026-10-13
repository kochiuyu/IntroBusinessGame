# Elaborating Business Cases with Analytical Depth and Verified Sources

A structured enhancement to expand all real-world business cases in the Game Theory Executive Companion across Weeks 0 through 13. Each case study will be deepened into an executive-grade strategic brief following the 4-part framework (**Context**, **Strategic Dilemma**, **Game Model Mapping**, **Empirical Outcome**) and paired with verified multi-tier citations (**Academic literature**, **HBS case studies**, and **Tier-1 financial reports**).

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your Phase 1 selections, the following design decisions are locked in and guide this implementation:

- **Confirmed Decision 1 (Scope & Approach)**: Both elaborate in-depth and add verified sources across the curriculum's business cases.
- **Confirmed Decision 2 (Citation Mix)**: Mix of academic economics/strategy papers (e.g. Dixit, Fudenberg, Tirole, Kreps, Milgrom), classic Harvard Business School (HBS) case studies, and tier-1 industry reports/filings (WSJ, FT, Bloomberg, SEC 10-K).
- **Confirmed Decision 3 (Analytical Architecture)**: Standardized 4-pillar structure for every case:
  1. *Context & Market Dynamics*
  2. *Strategic Dilemma & Executive Trade-offs*
  3. *Game Theory Model Mapping (Players, Actions, Payoffs, Equilibrium)*
  4. *Empirical Outcome & Real-World Aftermath*
- **Recommended Presentation**: Expand the **Business Cases & Executive Playbook** tab in `LectureNotesView` to cover all Weeks (0 through 13), featuring an interactive accordion deep-dive for each case, a dedicated verified source citation block with external links/identifiers, and a cross-link from the weekly interactive Case Analysis exercise.

---

## 1. Overview & Core Concept

- **What It Does**: Upgrades the short one-paragraph case teasers into full, MBA/executive-level case dossiers. Learners can inspect how game-theoretic equilibria explain actual corporate battles (such as TSMC's CapEx deterrence, Apple vs. Epic Games antitrust battles, Tesla's NACS standard war, Disney's Fox bidding war, and Amazon's dynamic repricing algorithms).
- **Target Audience**: Business executives, MBA students, strategy consultants, and economics scholars who require empirical grounding and verifiable academic provenance for game theory principles.
- **Key Value**: Bridges abstract mathematical concepts (SPNE, mixed strategies, signaling, dominance solvability, auction theory) to documented boardroom decisions with real dollar stakes and verified academic citations.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Navigating to Case Playbook**: Under any curriculum week (Weeks 0 to 13), the user selects the **Lecture Notes & Recap** tab and switches to the **🏢 Business Cases & Executive Playbook** learning mode.
2. **Case Dossier Card**: The user sees high-level case cards with clean typographic metadata (Industry, Market Stakes, Timeframe, Corporate Protagonists) using unboxed dividers (`·`), completely free of generic pill-badge clutter.
3. **Structured 4-Pillar Deep-Dive**: Clicking **"Expand Strategic Analysis"** or viewing the dossier reveals the 4 analytical sections in order:
   - **Context**: Market structure, cost functions, historical background.
   - **Strategic Dilemma**: The specific strategic decision node and rival incentives.
   - **Game Model Mapping**: Clear mapping of Players, Action Sets, Information Structure, Payoff Matrix / Extensive Tree, and Equilibrium Concept (e.g. Nash, Subgame Perfect, Bayesian).
   - **Empirical Outcome**: The historical resolution, market share shifts, profitability changes, and managerial post-mortem.
4. **Verified Sources Drawer / Citations Block**: Each case features a dedicated, formatted bibliography citing:
   - **Academic Paper**: Author, Year, Title, Journal (e.g., *Dixit, A. (1980). "The Role of Investment in Entry-Deterrence". Economic Journal*).
   - **HBS / University Case**: Case title and HBS catalog number (e.g., *HBS Case #798-062*).
   - **Industry / Financial Source**: Authoritative publication or SEC regulatory filing with year and headline.
5. **Direct Linkage in Case Exercise**: The **Interactive Case Analysis & Exercise** subtab will include a "Read Related Case Dossier" shortcut to seamlessly cross-reference between the interactive problem set and the empirical case study.

### Visual Identity & Theme
- **Layout Rhythm**: Generous container padding (24px–32px), clean single-level card elevation with crisp hairline borders (`border-slate-200`), and generous whitespace separation between the 4 analytical pillars.
- **Typography**: Display typography using `Plus Jakarta Sans` / SemiBold headers, readable prose body (`text-slate-700 text-sm leading-relaxed`), and monospace numerals (`tabular-nums font-mono`) for case reference codes and financial figures.
- **Color Discipline (60-30-10)**:
  - *60% Neutral Canvas*: Slate-50 background and white structural panels.
  - *30% Structural Elements*: Hairline slate borders (`border-slate-200`), slate-800 text, muted secondary slate text.
  - *10% Focal Accents*: Distinct indigo/navy for executive playbook headings, emerald for confirmed empirical outcomes, and sapphire blue for citation links.
- **Anti-Slop Restraint**: Zero decorative glowing dots, no code-comment titles (`// CASE_01`), no pill-badge sandwiches, no thick asymmetric left borders. Pure editorial executive rigor.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Dedicated Case Repository (`src/data/businessCasesData.ts`) vs. Inlining in JSX
- **Chosen Approach**: Create a modular, strongly typed data module `src/data/businessCasesData.ts` exporting full case dossiers for all 14 weeks (Weeks 0 through 13).
- **Why**: Keeps `LectureNotesView.tsx` clean and performant, allows easy reuse across both the **Lecture Notes** tab and the **Case Analysis Exercise** tab, and provides a single typed schema for academic sources.
- **Alternatives Considered**: Inlining inside `LectureNotesView.tsx` would balloon the component past 3,500 lines and make citation maintenance fragile.

### Decision 2: Progressive Disclosure (Collapsible Dossiers vs. Continuous Page)
- **Chosen Approach**: Dual presentation—display a crisp executive summary card for each case with an expandable deep-dive toggle ("Expand Strategic Dossier & Sources") that defaults to expanded on individual case view or allows scanning multiple cases.
- **Why**: Prevents overwhelming students with endless walls of text while providing thorough, uncompromised depth on demand.

### Decision 3: Comprehensive Multi-Tier Citation Schema
- **Chosen Approach**: Every case will contain a structured `sources` array with typed categories:
  - `academic`: Peer-reviewed papers (e.g. *AER*, *Econometrica*, *QJE*, *Rand Journal of Economics*).
  - `businessCase`: Harvard Business School, Stanford GSB, or INSEAD case studies with official case numbers.
  - `industryReport`: SEC filings (10-K/10-Q), Bloomberg, Financial Times, Wall Street Journal, or McKinsey Quarterly.
- **Why**: Directly satisfies your requirement for verifiable academic pedigree and practical real-world credibility.

---

## 4. Technical Architecture & Data Strategy

### System Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App.tsx Main Interface                          │
│                                                                        │
│   ┌───────────────────────────┐     ┌──────────────────────────────┐   │
│   │   Module Tabs Selector    │     │   Week Selector (0 - 13)     │   │
│   └─────────────┬─────────────┘     └──────────────┬───────────────┘   │
└─────────────────┼──────────────────────────────────┼───────────────────┘
                  │                                  │
                  ▼                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 src/components/LectureNotesView.tsx                    │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ Mode Selector: [🌱 Beginner] [📐 Math] [🏢 Business Cases]     │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
│                                   │                                    │
│   When Mode === "cases":          ▼                                    │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ 1. Executive Decision Matrix (Strategic Trade-off Table)       │   │
│   ├────────────────────────────────────────────────────────────────┤   │
│   │ 2. Enriched Case Dossiers (from businessCasesData.ts)          │   │
│   │    ┌───────────────────────────────────────────────────────┐   │   │
│   │    │ Case Dossier Card (Week W, Case C)                    │   │   │
│   │    │  • Header: Title, Industry, Protagonists, Stakes      │   │   │
│   │    │  • Pillar 1: Context & Market Dynamics                │   │   │
│   │    │  • Pillar 2: Strategic Dilemma & Trade-offs           │   │   │
│   │    │  • Pillar 3: Game Theory Model Mapping (NE / SPNE)    │   │   │
│   │    │  • Pillar 4: Empirical Outcome & Aftermath            │   │   │
│   │    │  • Citations Deck: Academic + HBS Case + Financial    │   │   │
│   │    └───────────────────────────────────────────────────────┘   │   │
│   ├────────────────────────────────────────────────────────────────┤   │
│   │ 3. Executive Strategic Checklist & Governance Takeaways        │   │
│   └────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ imports
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  src/data/businessCasesData.ts                         │
│                                                                        │
│   • CaseDossier TypeScript Interface                                   │
│   • Complete Case Studies for Weeks 0 through 13                       │
│   • Verified Academic, HBS Case, and Regulatory Citations              │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Schema (`CaseDossier`)

```typescript
export interface CaseCitation {
  type: "academic" | "businessCase" | "industryReport";
  title: string;
  authorsOrSource: string;
  year: number | string;
  referenceId?: string; // e.g. "HBS Case #798-062" or "DOI: 10.2307/2231924"
  url?: string;
  annotation: string; // 1-line note explaining why this citation validates the analysis
}

export interface CaseDossier {
  id: string;
  weekId: number;
  caseNumber: number; // e.g. 1 or 2
  title: string;
  subtitle: string;
  industry: string;
  players: string[];
  timeframe: string;
  stakes: string;
  
  // 4 Core Analytical Pillars
  context: string;
  strategicDilemma: string;
  gameModelMapping: {
    modelType: string; // e.g. "Extensive Form Game with Sunk Investment", "Repeated Bertrand with Grim Trigger"
    players: string;
    actionSpaces: string;
    informationStructure: string;
    equilibriumConcept: string;
    strategicLogic: string;
  };
  empiricalOutcome: string;
  executiveTakeaway: string;
  
  // Multi-tier Verified Sources
  sources: CaseCitation[];
}
```

### Complete Curriculum Case Coverage Plan

| Week | Topic | Case 1 (Elaborated + Sourced) | Case 2 (Elaborated + Sourced) |
| :--- | :--- | :--- | :--- |
| **0** | Strategic Foundations | **Apple iOS vs. Android Ecosystem Moats** *(HBS #710-467; Rochet & Tirole 2003)* | **Netflix vs. Blockbuster Cannibalization Dilemma** *(HBS #607-138; Christensen 1997)* |
| **1** | Strategic Form Games | **Airline Algorithmic Fare Matching** *(Borenstein 1992; DOJ Antitrust Filings)* | **Coca-Cola vs. Pepsi Advertising Arms Race** *(HBS #792-064; Schmalensee 1983)* |
| **2** | Extensive Form & Credibility | **Intel Preemptive Fab Expansion** *(Dixit 1980; HBS #794-024)* | **Disney+ vs. Netflix Windowing & Subscription Churn** *(HBS #520-008; FT 2020)* |
| **3** | Coordination & Domination | **Tesla NACS vs. CCS EV Charging Standard War** *(Farrell & Saloner 1985; Bloomberg 2023)* | **FCC Multi-Round Spectrum Auctions** *(Milgrom 2004; FCC Auction 107 Report)* |
| **4** | Mixed Strategies | **Amazon Dynamic Algorithmic Repricing** *(HBS #919-036; Chen & Gardner 2016)* | **Retail Flash Sales & IRS Random Audit Scheduling** *(Graetz et al. 1986; NBER)* |
| **5** | Strategic Moves & Commitment | **TSMC 2nm CapEx Preemption ($32B Fabs)** *(Dixit 1979; TSMC 10-K; FT 2024)* | **AI Cloud GPU Clusters: Dedicated CapEx vs. Flexibility** *(Gans 2024; WSJ 2024)* |
| **6** | Dynamic Games & Cartels | **Global Container Shipping Alliances (2M & Ocean Alliance)** *(Stigler 1964; EU Competition Comm)* | **Convenience Store Spatial Preemption (7-Eleven Japan)** *(Eaton & Lipsey 1977; Nikkei)* |
| **7** | Auction Design | **UK Crown Estate Offshore Wind Lease Auctions** *(Klemperer 2002; UK NAO Report)* | **US Treasury Debt Issuance Uniform vs. Discriminatory Auctions** *(Friedman 1960; NY Fed)* |
| **8** | Advanced Auctions | **Google Ads Quality-Score Weighted GSP Auctions** *(Edelman, Ostrovsky, Schwarz 2007; AER)* | **FCC C-Band 5G Spectrum Auction ($81B)** *(Cramton 2013; FCC Filings)* |
| **9** | Bargaining & Hold-Up | **Disney vs. Comcast: 21st Century Fox $71B Bidding War** *(HBS #519-012; SEC Filings)* | **Hollywood Writers Guild (WGA) vs. AMPTP Hold-Up** *(Rubinstein 1982; LA Times 2023)* |
| **10** | Adverse Selection & Signaling | **Carvana & Beepi 150-Point Certified Guarantees** *(Akerlof 1970; Carvana 10-K)* | **Moody's & S&P Issuer-Pays Rating Agency Signaling** *(Spence 1973; SEC Credit Rating Report)* |
| **11** | Platform Strategy | **Apple App Store vs. Epic Games Antitrust Battle** *(Evans & Schmalensee 2016; US Court 2021)* | **Sony PlayStation vs. Xbox Game Pass Subscription War** *(Armstrong 2006; CMA UK 2023)* |
| **12** | Tech Ecosystems | **Cloud Hyperscaler Moats: AWS vs. Azure vs. GCP** *(Bresnahan & Greenstein 1999; Gartner)* | **Generative AI Foundation Models: OpenAI/Microsoft vs. Open Source** *(Shapiro & Varian; FT 2024)* |
| **13** | Capstone Strategy | **TSMC vs. Samsung vs. Intel Foundry Hegemony** *(Tirole 1988; HBS Case Series)* | **ASML Extreme Ultraviolet (EUV) Monopolistic Supply Chain** *(Miller 2022 "Chip War"; ASML 10-K)* |

---

## 5. Verification & Testing Plan

1. **Compilation & Type Safety**:
   - Verify zero TypeScript syntax or type errors with `compile_applet`.
   - Ensure the new `CaseDossier` interface correctly satisfies all week components.
2. **Interactive UI Verification**:
   - Test navigating through all 14 weeks (Week 0 to Week 13) in the **Business Cases & Executive Playbook** tab.
   - Verify expand/collapse toggle for each case analysis pillar.
   - Verify that all citations are visible, formatted, and readable with proper bibliographic metadata.
3. **No Regressions**:
   - Confirm that existing interactive simulators (Week 2 game tree, Week 3 dominance matrix, Week 4 mixed strategy visualizer, Week 5 commitment tree) continue functioning seamlessly.
