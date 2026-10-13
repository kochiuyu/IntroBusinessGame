import React, { useState, useMemo } from "react";
import {
  BUSINESS_CASES_DATA,
  getWeekBusinessCases,
  CaseDossier,
  CaseCitation,
} from "../data/businessCasesData";

interface ElaboratedBusinessCasesViewProps {
  currentWeekId: number;
  onSelectWeek?: (weekId: number) => void;
}

export const ElaboratedBusinessCasesView: React.FC<ElaboratedBusinessCasesViewProps> = ({
  currentWeekId,
  onSelectWeek,
}) => {
  const weekCases = useMemo(() => getWeekBusinessCases(currentWeekId), [currentWeekId]);
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [sourceFilter, setSourceFilter] = useState<"all" | "academic" | "businessCase" | "industryReport">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAllWeeksExplorer, setShowAllWeeksExplorer] = useState<boolean>(false);
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  // If the active week changes and the selected index is out of bounds, reset
  const activeCase: CaseDossier | undefined = weekCases[selectedCaseIndex] || weekCases[0];

  // Filter cross-curriculum cases if explorer is open
  const allFilteredCases = useMemo(() => {
    if (!searchQuery.trim()) return BUSINESS_CASES_DATA;
    const q = searchQuery.toLowerCase();
    return BUSINESS_CASES_DATA.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.players.some((p) => p.toLowerCase().includes(q)) ||
        c.context.toLowerCase().includes(q) ||
        c.strategicDilemma.toLowerCase().includes(q) ||
        c.gameModelMapping.modelType.toLowerCase().includes(q) ||
        c.sources.some(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.authorsOrSource.toLowerCase().includes(q)
        )
    );
  }, [searchQuery]);

  const filteredSources = useMemo(() => {
    if (!activeCase) return [];
    if (sourceFilter === "all") return activeCase.sources;
    return activeCase.sources.filter((s) => s.type === sourceFilter);
  }, [activeCase, sourceFilter]);

  const handleCopyCaseBrief = () => {
    if (!activeCase) return;
    const text = `BUSINESS CASE DOSSIER: ${activeCase.title}
Subtitle: ${activeCase.subtitle}
Industry: ${activeCase.industry}
Key Players: ${activeCase.players.join(", ")}
Timeframe & Stakes: ${activeCase.timeframe} | ${activeCase.stakes}

[1. STRATEGIC CONTEXT & MARKET CONDITIONS]
${activeCase.context}

[2. STRATEGIC DILEMMA & PAYOFF CONFLICT]
${activeCase.strategicDilemma}

[3. GAME THEORETIC MODEL MAPPING]
- Model Architecture: ${activeCase.gameModelMapping.modelType}
- Player Roles: ${activeCase.gameModelMapping.players}
- Action Sets: ${activeCase.gameModelMapping.actionSpaces}
- Information & Timing: ${activeCase.gameModelMapping.informationStructure}
- Equilibrium Concept: ${activeCase.gameModelMapping.equilibriumConcept}
- Strategic Logic: ${activeCase.gameModelMapping.strategicLogic}

[4. EMPIRICAL OUTCOME & REAL-WORLD LESSONS]
${activeCase.empiricalOutcome}

[EXECUTIVE TAKEAWAY]
${activeCase.executiveTakeaway}

[VERIFIED SOURCES & CITATIONS]
${activeCase.sources
  .map(
    (s, idx) =>
      `${idx + 1}. [${s.type.toUpperCase()}] ${s.title} - ${s.authorsOrSource} (${s.year}) ${s.referenceId ? `[${s.referenceId}]` : ""}\n   Annotation: ${s.annotation}`
  )
  .join("\n\n")}`;

    navigator.clipboard.writeText(text);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  const getBadgeForIndustry = (industry: string) => {
    if (industry.includes("Semiconductor") || industry.includes("Hardware")) {
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    }
    if (industry.includes("Cloud") || industry.includes("AI") || industry.includes("Tech")) {
      return "bg-purple-100 text-purple-800 border-purple-200";
    }
    if (industry.includes("Aviation") || industry.includes("Logistics") || industry.includes("Shipping")) {
      return "bg-sky-100 text-sky-800 border-sky-200";
    }
    if (industry.includes("Telecom") || industry.includes("Spectrum")) {
      return "bg-cyan-100 text-cyan-800 border-cyan-200";
    }
    if (industry.includes("CleanTech") || industry.includes("Energy") || industry.includes("Auto")) {
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
    if (industry.includes("Finance") || industry.includes("M&A") || industry.includes("Venture")) {
      return "bg-amber-100 text-amber-900 border-amber-200";
    }
    return "bg-blue-100 text-blue-800 border-blue-200";
  };

  const getCitationTypePill = (type: CaseCitation["type"]) => {
    switch (type) {
      case "academic":
        return {
          label: "Academic Paper",
          icon: "🎓",
          badgeClass: "bg-purple-100 text-purple-800 border-purple-200",
        };
      case "businessCase":
        return {
          label: "HBS / Business Case",
          icon: "💼",
          badgeClass: "bg-blue-100 text-blue-800 border-blue-200",
        };
      case "industryReport":
        return {
          label: "Industry & Regulatory",
          icon: "📊",
          badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
        };
    }
  };

  return (
    <div className="space-y-6 text-slate-800 text-sm leading-relaxed animate-fadeIn">
      {/* Top Controls Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              Week {currentWeekId} Executive Playbook
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              4-Pillar Analytical Mapping & Multi-Tier Sources
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Strategic Business Case Dossiers
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Empirical real-world market conflicts rigorously deconstructed through game theory. Every case features detailed market context, explicit strategic dilemma, formal model mappings, observable outcomes, and verifiable citations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <button
            onClick={() => setShowAllWeeksExplorer(!showAllWeeksExplorer)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 ${
              showAllWeeksExplorer
                ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <span>{showAllWeeksExplorer ? "✕ Close Explorer" : "🔍 Cross-Curriculum Case Explorer"}</span>
          </button>

          <button
            onClick={handleCopyCaseBrief}
            disabled={!activeCase}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-1.5"
            title="Copy structured case brief with all 4 pillars and sources"
          >
            <span>{copiedStatus ? "✓ Copied!" : "📋 Copy Dossier"}</span>
          </button>
        </div>
      </div>

      {/* CROSS-CURRICULUM EXPLORER DRAWER */}
      {showAllWeeksExplorer && (
        <div className="bg-slate-50 border border-indigo-200 rounded-xl p-4 space-y-3 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                Search All 28+ Executive Business Cases Across Curriculum (Weeks 0–13)
              </h3>
              <p className="text-[11px] text-slate-500">
                Filter by corporate player (e.g. TSMC, Apple, Netflix, Boeing, Disney, Google), industry, or economic concept.
              </p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search cases, companies, or sources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
            {allFilteredCases.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  if (onSelectWeek) {
                    onSelectWeek(c.weekId);
                  }
                  setSelectedCaseIndex(c.caseNumber - 1);
                  setShowAllWeeksExplorer(false);
                }}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  c.weekId === currentWeekId && activeCase?.id === c.id
                    ? "bg-indigo-50 border-indigo-400 ring-1 ring-indigo-400"
                    : "bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700">
                    Week {c.weekId} • Case {c.caseNumber}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getBadgeForIndustry(c.industry)}`}>
                    {c.industry.split("/")[0].trim()}
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-900 line-clamp-1">{c.title}</div>
                <div className="text-[10px] text-slate-500 line-clamp-1">{c.subtitle}</div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-1">
                  <span>{c.players.slice(0, 2).join(" vs. ")}</span>
                  <span className="text-indigo-600 font-medium">View Dossier →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Week Cases Tab Selector */}
      {weekCases.length > 1 && (
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
            Week {currentWeekId} Cases:
          </span>
          {weekCases.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseIndex(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                selectedCaseIndex === idx
                  ? "bg-indigo-900 text-white shadow-sm ring-1 ring-indigo-950"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                selectedCaseIndex === idx ? "bg-white text-indigo-900" : "bg-slate-300 text-slate-700"
              }`}>
                {c.caseNumber}
              </span>
              <span className="truncate max-w-[200px] sm:max-w-[280px]">{c.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* ACTIVE CASE STUDY DOSSIER */}
      {activeCase ? (
        <div className="space-y-6">
          {/* 1. DOSSIER HEADER CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-900 text-white">
                  Case {activeCase.caseNumber}
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getBadgeForIndustry(activeCase.industry)}`}>
                  {activeCase.industry}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  📅 {activeCase.timeframe}
                </span>
              </div>
              <div className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <span className="font-bold text-slate-700">Financial / Strategic Stakes:</span>
                <span className="text-slate-900 font-semibold">{activeCase.stakes}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 leading-snug">
                {activeCase.title}
              </h3>
              <p className="text-sm font-medium text-indigo-950/80 mt-0.5">
                {activeCase.subtitle}
              </p>
            </div>

            {/* Key Players Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                Key Corporate & Market Actors:
              </span>
              {activeCase.players.map((p, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-medium border border-slate-200"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* 2. THE 4-PILLAR ANALYTICAL FRAMEWORK */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* PILLAR 1: CONTEXT */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                    Strategic Context & Market Conditions
                  </h4>
                </div>
                <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line space-y-2">
                  {activeCase.context}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="text-blue-600 font-bold">ℹ️</span>
                <span>Establishes market boundaries, technological parameters, and initial asset positions.</span>
              </div>
            </div>

            {/* PILLAR 2: STRATEGIC DILEMMA */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                    Strategic Dilemma & Payoff Conflict
                  </h4>
                </div>
                <div className="p-3.5 bg-rose-50/70 border border-rose-200/80 rounded-xl text-xs text-rose-950 font-medium leading-relaxed">
                  {activeCase.strategicDilemma}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="text-rose-600 font-bold">⚖️</span>
                <span>Uncovers the incentive friction that prevents simple unilateral maximization.</span>
              </div>
            </div>
          </div>

          {/* PILLAR 3: GAME THEORETIC MODEL MAPPING (FULL WIDTH ACCORDION/CARD) */}
          <div className="bg-gradient-to-br from-indigo-900/5 via-slate-50 to-purple-900/5 border border-indigo-200/80 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-indigo-950 text-sm uppercase tracking-wide">
                    Game-Theoretic Model Mapping
                  </h4>
                  <p className="text-[11px] text-indigo-800/80">
                    Exact translation of corporate reality into rigorous mathematical game components
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-200">
                {activeCase.gameModelMapping.modelType}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Box 1: Players & Roles */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Players & Objective Functions
                </div>
                <div className="text-xs font-semibold text-slate-900">
                  {activeCase.gameModelMapping.players}
                </div>
              </div>

              {/* Box 2: Strategy / Action Space */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Action Spaces & Decision Timing
                </div>
                <div className="text-xs font-semibold text-slate-900">
                  {activeCase.gameModelMapping.actionSpaces}
                </div>
              </div>

              {/* Box 3: Information Structure */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Information & Observability
                </div>
                <div className="text-xs font-semibold text-slate-900">
                  {activeCase.gameModelMapping.informationStructure}
                </div>
              </div>

              {/* Box 4: Equilibrium Concept */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Equilibrium Solution Concept
                </div>
                <div className="text-xs font-semibold text-indigo-950">
                  {activeCase.gameModelMapping.equilibriumConcept}
                </div>
              </div>

              {/* Box 5 & 6 (Merged): Strategic Logic & Incentive Mechanics */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1 md:col-span-2">
                <div className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                  Equilibrium Mechanism & Incentive Structure
                </div>
                <div className="text-xs text-slate-700 leading-relaxed font-medium">
                  {activeCase.gameModelMapping.strategicLogic}
                </div>
              </div>
            </div>
          </div>

          {/* PILLAR 4: EMPIRICAL OUTCOME & EXECUTIVE TAKEAWAY */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Empirical Outcome (2 cols) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  4
                </span>
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                  Empirical Outcome & Market Verification
                </h4>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed space-y-2">
                {activeCase.empiricalOutcome}
              </div>
            </div>

            {/* Executive Takeaway (1 col) */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
                  <span>💡</span> Executive Strategic Takeaway
                </div>
                <p className="text-xs text-slate-900 font-semibold leading-relaxed">
                  "{activeCase.executiveTakeaway}"
                </p>
              </div>
              <div className="text-[11px] text-amber-800/80 pt-3 border-t border-amber-200/60 font-medium">
                Applied heuristic for leadership teams and strategic planning committees.
              </div>
            </div>
          </div>

          {/* 3. VERIFIED MULTI-TIER SOURCE LIBRARY */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>📚</span> Verified Multi-Tier Sources & Empirical Grounding
                </h4>
                <p className="text-[11px] text-slate-500">
                  Every case is cross-referenced with peer-reviewed academic papers, Harvard Business School cases, and audited industry/regulatory documents.
                </p>
              </div>

              {/* Source Filter Tabs */}
              <div className="flex items-center gap-1 text-[11px] bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setSourceFilter("all")}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                    sourceFilter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All ({activeCase.sources.length})
                </button>
                <button
                  onClick={() => setSourceFilter("academic")}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors flex items-center gap-1 ${
                    sourceFilter === "academic" ? "bg-white text-purple-900 shadow-xs" : "text-slate-600 hover:text-purple-900"
                  }`}
                >
                  <span>🎓</span> Academic
                </button>
                <button
                  onClick={() => setSourceFilter("businessCase")}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors flex items-center gap-1 ${
                    sourceFilter === "businessCase" ? "bg-white text-blue-900 shadow-xs" : "text-slate-600 hover:text-blue-900"
                  }`}
                >
                  <span>💼</span> HBS / Case
                </button>
                <button
                  onClick={() => setSourceFilter("industryReport")}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors flex items-center gap-1 ${
                    sourceFilter === "industryReport" ? "bg-white text-emerald-900 shadow-xs" : "text-slate-600 hover:text-emerald-900"
                  }`}
                >
                  <span>📊</span> Industry
                </button>
              </div>
            </div>

            {/* Sources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSources.map((source, sIdx) => {
                const typePill = getCitationTypePill(source.type);
                return (
                  <div
                    key={sIdx}
                    className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-2.5"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${typePill.badgeClass}`}>
                          <span>{typePill.icon}</span>
                          {typePill.label}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {source.year}
                        </span>
                      </div>

                      <div className="font-bold text-xs text-slate-900 leading-snug">
                        {source.title}
                      </div>

                      <div className="text-[11px] text-slate-600 font-medium">
                        {source.authorsOrSource}
                      </div>

                      {source.referenceId && (
                        <div className="text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded px-1.5 py-0.5 inline-block">
                          {source.referenceId}
                        </div>
                      )}

                      <div className="text-[11px] text-slate-600 bg-white/80 border border-slate-200/80 rounded-lg p-2 leading-relaxed">
                        <strong className="text-slate-900">Annotation:</strong> {source.annotation}
                      </div>
                    </div>

                    {source.url && (
                      <div className="pt-2 border-t border-slate-200">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 transition-colors"
                        >
                          <span>Reference Link</span>
                          <span className="text-[9px]">↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. WEEK 5 SPECIAL DECISION MATRIX (IF WEEK 5) */}
          {currentWeekId === 5 && (
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
              <h3 className="font-bold text-slate-900 text-base">
                Executive Decision Matrix: Commitment vs. Flexibility (Week 5 Slide 17)
              </h3>
              <p className="text-slate-600 text-xs">
                When should a C-suite executive commit resources irrevocably, and when should they preserve agility?
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 border border-slate-200 text-slate-700">
                      <th className="p-2.5 border border-slate-200 text-left font-bold w-1/2">
                        Commitment Is More Valuable When...
                      </th>
                      <th className="p-2.5 border border-slate-200 text-left font-bold w-1/2">
                        Flexibility Is More Valuable When...
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr>
                      <td className="p-2.5 border border-slate-200">
                        • Rival response is highly sensitive to future incentives (strategic substitutes)
                      </td>
                      <td className="p-2.5 border border-slate-200 bg-slate-50/50">
                        • Demand, technology, or regulations are deeply volatile
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-slate-200">
                        • Scarce resources or first-mover moats can be secured early (e.g. EUV lithography, spectrum)
                      </td>
                      <td className="p-2.5 border border-slate-200 bg-slate-50/50">
                        • Digital or hardware assets face rapid technological obsolescence
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-slate-200">
                        • Reversal would destroy executive or institutional credibility
                      </td>
                      <td className="p-2.5 border border-slate-200 bg-slate-50/50">
                        • Staged learning, prototyping, and real-option value are critical
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-slate-200">
                        • Rivals cannot easily imitate or bypass the commitment
                      </td>
                      <td className="p-2.5 border border-slate-200 bg-slate-50/50">
                        • Competitors can cheaply duplicate or bypass the barrier
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. GENERAL EXECUTIVE STRATEGIC CHECKLIST */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>📋</span> Executive Strategic Checklist for Game Formulation
            </h3>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Clarify the Order of Play:</strong> Are rivals making simultaneous guesses (normal form) or observing moves sequentially with commitment (extensive form)?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Audit Rival Observability:</strong> If competitors cannot independently audit or verify your move, it carries zero deterrence or signaling power.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Separate Past Sunk Costs from Marginal Incentives:</strong> Disregard historical CapEx unless it permanently changes tomorrow's marginal cost curve.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Evaluate at the Future Decision Node:</strong> Never believe your own announcement—calculate if your organization will actually execute when tested at the subgame node.</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
          No case studies found for this week.
        </div>
      )}
    </div>
  );
};
