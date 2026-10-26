import React, { useState, useMemo, useEffect } from "react";
import { marked } from "marked";
import katex from "katex";
import { FULL_RECAPS_MARKDOWN, ALL_WEEKS_COMBINED_MARKDOWN } from "../data/recapsMarkdown";

interface MarkdownRecapViewerProps {
  currentWeekId: number;
  onSelectWeek?: (weekId: number) => void;
}

const WEEKS_METADATA = [
  { id: 0, title: "Week 0: Strategic Diagnosis", tag: "Foundations" },
  { id: 1, title: "Week 1: Intro & Dilemmas", tag: "Prisoner's Dilemma" },
  { id: 2, title: "Week 2: Sequential Games", tag: "Backward Induction" },
  { id: 3, title: "Week 3: Simultaneous Moves", tag: "Nash Equilibrium" },
  { id: 4, title: "Week 4: Mixed Strategies", tag: "Randomisation" },
  { id: 5, title: "Week 5: Strategic Commitment", tag: "Credible Moves" },
  { id: 6, title: "Week 6: Repeated Games", tag: "Grim Trigger & Folk Theorem" },
  { id: 7, title: "Week 7: Auctions I — Bidding & Rules", tag: "Four Formats & Vickrey Dominance" },
];

export const MarkdownRecapViewer: React.FC<MarkdownRecapViewerProps> = ({
  currentWeekId,
  onSelectWeek,
}) => {
  // Selected scope: 0-5 for individual weeks, or -1 for All Weeks Combined Compendium
  const [activeScope, setActiveScope] = useState<number>(() => {
    return currentWeekId in FULL_RECAPS_MARKDOWN ? currentWeekId : -1;
  });
  const [viewMode, setViewMode] = useState<"formatted" | "raw">("formatted");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");

  // Sync with currentWeekId if prop changes
  useEffect(() => {
    if (currentWeekId in FULL_RECAPS_MARKDOWN) {
      setActiveScope(currentWeekId);
    } else {
      setActiveScope(-1);
    }
  }, [currentWeekId]);

  // Retrieve raw markdown text based on active scope
  const rawMarkdown = useMemo(() => {
    if (activeScope === -1) {
      return ALL_WEEKS_COMBINED_MARKDOWN;
    }
    return FULL_RECAPS_MARKDOWN[activeScope] || ALL_WEEKS_COMBINED_MARKDOWN;
  }, [activeScope]);

  // Extract headings for Table of Contents with unique IDs
  const headings = useMemo(() => {
    const list: { level: number; text: string; id: string }[] = [];
    if (!rawMarkdown) return list;

    const lines = rawMarkdown.split("\n");
    const idCounts: Record<string, number> = {};
    for (const line of lines) {
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim().replace(/\*\*/g, "").replace(/\*/g, "");
        const raw = text.replace(/<[^>]+>/g, "").trim();
        let baseId = raw
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-") || "section";
        if (idCounts[baseId]) {
          idCounts[baseId]++;
          baseId = `${baseId}-${idCounts[baseId]}`;
        } else {
          idCounts[baseId] = 1;
        }
        list.push({ level, text, id: baseId });
      }
    }
    return list;
  }, [rawMarkdown]);

  // Parse markdown to HTML using marked with custom header IDs, KaTeX math, and options
  const parsedHtml = useMemo(() => {
    if (!rawMarkdown) return "";

    try {
      // Pre-process LaTeX Math with KaTeX
      let preprocessed = rawMarkdown;

      // 1. Display Math $$...$$
      preprocessed = preprocessed.replace(/\$\$([\s\S]+?)\$\$/g, (match, formula) => {
        try {
          return katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false });
        } catch {
          return match;
        }
      });

      // 2. Inline Math $...$
      preprocessed = preprocessed.replace(/(?<!\$)\$([^\$\n]+?)\$(?!\$)/g, (match, formula) => {
        try {
          return katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false });
        } catch {
          return match;
        }
      });

      // Configure marked with custom heading IDs so TOC jumps cleanly
      const idCounts: Record<string, number> = {};
      const customRenderer = new marked.Renderer();
      customRenderer.heading = ({ depth, text }: { tokens: any[]; depth: number; text: string }) => {
        const raw = text.replace(/<[^>]+>/g, "").trim();
        let baseId = raw
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-") || "section";
        if (idCounts[baseId]) {
          idCounts[baseId]++;
          baseId = `${baseId}-${idCounts[baseId]}`;
        } else {
          idCounts[baseId] = 1;
        }
        return `<h${depth} id="${baseId}" class="scroll-mt-20 group relative cursor-pointer">${text}</h${depth}>\n`;
      };

      let html = marked.parse(preprocessed, {
        gfm: true,
        breaks: true,
        renderer: customRenderer,
      }) as string;

      // If user typed a search query, highlight matching text in rendered HTML
      if (searchQuery.trim().length > 1) {
        try {
          const safeQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const regex = new RegExp(`(?![^<]*>)(${safeQuery})`, "gi");
          html = html.replace(regex, `<mark class="bg-amber-200 text-amber-950 px-1 rounded font-bold">$1</mark>`);
        } catch {
          // fallback if regex error
        }
      }

      return html;
    } catch (err) {
      console.error("Error parsing markdown:", err);
      return `<p class="text-rose-600">Error rendering markdown content.</p>`;
    }
  }, [rawMarkdown, searchQuery]);

  // Word count and reading time calculation
  const stats = useMemo(() => {
    if (!rawMarkdown) return { words: 0, readTime: 0 };
    const words = rawMarkdown.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / 200);
    return { words, readTime };
  }, [rawMarkdown]);

  // Search match count
  const matchCount = useMemo(() => {
    if (!searchQuery.trim() || !rawMarkdown) return 0;
    try {
      const safeQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const matches = rawMarkdown.match(new RegExp(safeQuery, "gi"));
      return matches ? matches.length : 0;
    } catch {
      return 0;
    }
  }, [searchQuery, rawMarkdown]);

  const handleCopy = () => {
    if (!rawMarkdown) return;
    navigator.clipboard.writeText(rawMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!rawMarkdown) return;
    const blob = new Blob([rawMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download =
      activeScope === -1
        ? "game-theory-full-course-compendium.md"
        : `week0${activeScope}-recap.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scrollToHeading = (id: string) => {
    setActiveHeadingId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* SCOPE SELECTOR (WEEK BUTTONS + FULL COMPENDIUM) */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg">📜</span>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Official Course Recaps & Compendium (.md)
              </h3>
              <p className="text-[11px] text-slate-500">
                Peer-reviewed academic lecture recaps with full proofs, tables, and MBA case studies.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
              📊 {stats.words.toLocaleString()} words · ~{stats.readTime} min read
            </span>
          </div>
        </div>

        {/* Scope Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          {WEEKS_METADATA.map((w) => (
            <button
              key={w.id}
              onClick={() => {
                setActiveScope(w.id);
                onSelectWeek?.(w.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeScope === w.id
                  ? "bg-blue-800 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>Week {w.id}</span>
              <span
                className={`text-[10px] px-1 py-0.2 rounded font-normal ${
                  activeScope === w.id
                    ? "bg-blue-900/60 text-blue-100"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {w.tag}
              </span>
            </button>
          ))}

          <button
            onClick={() => setActiveScope(-1)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeScope === -1
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <span>📚 Complete Course Compendium (All 6 Weeks)</span>
          </button>
        </div>

        {/* Notice for upcoming weeks */}
        {currentWeekId > 5 && activeScope === -1 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-xs text-blue-900 flex items-center justify-between gap-2 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="text-base">ℹ️</span>
              <span>
                <strong>Week {currentWeekId} Curriculum Notice:</strong> The official markdown recap for Week {currentWeekId} is in preparation for the upcoming lecture session. Currently displaying the Complete Course Compendium (Weeks 0–5).
              </span>
            </div>
            <button
              onClick={() => {
                setActiveScope(0);
                onSelectWeek?.(0);
              }}
              className="px-2 py-1 bg-white hover:bg-blue-100 text-blue-800 font-semibold rounded border border-blue-200 shrink-0 text-[11px] transition-colors"
            >
              Start with Week 0
            </button>
          </div>
        )}
      </div>

      {/* DOCUMENT ACTION TOOLBAR */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search recap (e.g. Cortés, Indifference, Nash, TSMC)..."
            className="w-full text-xs px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
          />
          {searchQuery && (
            <div className="absolute right-2 top-1.5 flex items-center gap-1">
              <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">
                {matchCount} match{matchCount === 1 ? "" : "es"}
              </span>
              <button
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-slate-600 text-xs px-1"
                title="Clear search"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* View Mode & Actions */}
        <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
          {/* Formatted vs Raw Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setViewMode("formatted")}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                viewMode === "formatted"
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>📄</span> Article View
            </button>
            <button
              onClick={() => setViewMode("raw")}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                viewMode === "raw"
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>📝</span> Raw Markdown
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
            title="Copy entire markdown to clipboard"
          >
            <span>{copied ? "✓" : "📋"}</span>
            <span>{copied ? "Copied!" : "Copy .md"}</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
            title="Download .md file"
          >
            <span>⬇️</span>
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* TABLE OF CONTENTS (QUICK JUMP BAR) */}
      {headings.length > 0 && viewMode === "formatted" && (
        <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Table of Contents (Jump to Section)
            </span>
            <span className="text-[10px] text-slate-400">
              {headings.length} sections
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {headings.map((h, idx) => (
              <button
                key={idx}
                onClick={() => scrollToHeading(h.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors border ${
                  activeHeadingId === h.id
                    ? "bg-blue-600 text-white border-blue-600 font-semibold shadow-2xs"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-200"
                } ${h.level === 1 ? "font-bold" : h.level === 2 ? "font-medium" : "text-slate-600"}`}
              >
                {h.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* DOCUMENT CONTAINER */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs">
        {/* Source File Badge */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 text-[11px] text-slate-500 font-mono">
          <div>
            Source File:{" "}
            <span className="text-slate-800 font-semibold">
              {activeScope === -1
                ? "public/recaps/week0[0-5]-recap.md (Compendium)"
                : `public/recaps/week0${activeScope}-recap.md`}
            </span>
          </div>
          <div className="text-slate-400 text-[10px]">
            Executive Masterclass · Game Theory Strategy
          </div>
        </div>

        {/* FORMATTED MARKDOWN READER */}
        {viewMode === "formatted" ? (
          <div
            className="prose-recap max-w-none text-slate-800 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parsedHtml }}
          />
        ) : (
          /* RAW MARKDOWN CODE VIEWER */
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono pb-2">
              <span>Plain Markdown Source (GFM)</span>
              <span>{rawMarkdown.length} characters</span>
            </div>
            <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed border border-slate-800 max-h-[700px] overflow-y-auto">
              {rawMarkdown}
            </pre>
          </div>
        )}
      </div>

      {/* DOCUMENT FOOTER CITATION */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">Academic Citation:</span>
          <span>
            Strategic Thinking: Game Theory for Business Strategy.
          </span>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-blue-700 hover:text-blue-900 font-semibold self-start sm:self-auto flex items-center gap-1"
        >
          <span>↑</span> Back to Top
        </button>
      </div>
    </div>
  );
};
