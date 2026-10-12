import React, { useState } from "react";

export const CommitmentGameTree: React.FC<{
  initialK?: number;
}> = ({ initialK = 1.0 }) => {
  const [capacityK, setCapacityK] = useState<number>(initialK);
  const [step, setStep] = useState<number>(4); // 0: unsolved, 1: stage 2 (post-entry), 2: stage 1 (entry), 3: stage 0 (commit), 4: full SPNE
  const [showTikzModal, setShowTikzModal] = useState<boolean>(false);
  const [copiedTikz, setCopiedTikz] = useState<boolean>(false);

  // Payoff calculations based on K
  // Baseline (No Commitment):
  // Stay Out: (0, 5)
  // Enter -> Accommodate: (2, 2)
  // Enter -> Fight: (-1, -1)
  // Under Commitment (Cost K):
  // Stay Out: (0, 5 - K)
  // Enter -> Accommodate: (2, 0 - K)
  // Enter -> Fight: (-1, 1 - K)

  const noCommitFightPayoff = -1;
  const noCommitAccPayoff = 2;
  const noCommitIncumbentPrefersAcc = noCommitAccPayoff > noCommitFightPayoff; // always true (2 > -1)

  const commitFightPayoff = 1 - capacityK;
  const commitAccPayoff = 0 - capacityK;
  const commitIncumbentPrefersFight = commitFightPayoff > commitAccPayoff; // 1 - K > 0 - K, always true as long as marginal cost lowered!

  // Entrant reaction:
  // Under No Commit: Entrant anticipates Acc (payoff 2) vs Stay Out (0) -> Enters (2 > 0)
  // Under Commit: Entrant anticipates Fight (payoff -1) vs Stay Out (0) -> Stays Out (0 > -1)
  const entrantNoCommitAction: string = "Enter";
  const entrantCommitAction: string = "Stay Out";

  // Incumbent Root decision:
  // If Commit: Entrant stays out -> Incumbent gets 5 - K
  // If No Commit: Entrant enters -> Incumbent accommodates -> Incumbent gets 2
  const commitMonopolyPayoff = 5 - capacityK;
  const noCommitAccommodatedPayoff = 2;
  const incumbentPrefersCommit = commitMonopolyPayoff > noCommitAccommodatedPayoff; // 5 - K > 2 <=> K < 3

  // Stepper flags
  const isStage2Solved = step >= 1;
  const isStage1Solved = step >= 2;
  const isStage0Solved = step >= 3;
  const isSpneGlow = step >= 4;

  const tikzCode = `% LaTeX TikZ 3-Stage Strategic Commitment Game Tree (Week 5)
% Demonstrates: Stage 0 (Commit vs No Commit) -> Stage 1 (Enter vs Stay Out) -> Stage 2 (Fight vs Accommodate)
\\documentclass{standalone}
\\usepackage{tikz}
\\usetikzlibrary{calc,trees}

\\begin{document}
\\begin{tikzpicture}[
  scale=1.4,
  incumbent node/.style={circle, fill=blue!15, draw=blue!80, line width=1.2pt, minimum size=1.0cm, font=\\footnotesize\\bfseries},
  entrant node/.style={circle, fill=emerald!15, draw=emerald!80, line width=1.2pt, minimum size=1.0cm, font=\\footnotesize\\bfseries},
  terminal/.style={rectangle, rounded corners=3pt, fill=slate!10, draw=slate!40, inner sep=3.5pt, font=\\scriptsize},
  spne branch/.style={draw=emerald!80!black, line width=2.5pt},
  pruned branch/.style={draw=red!70, dashed, line width=1pt},
  normal branch/.style={draw=slate!70, line width=1.2pt}
]

  % Stage 0: Incumbent Root
  \\coordinate (Root) at (0, 0);

  % Stage 1: Entrant Nodes
  \\coordinate (Node_Commit) at (3.5, 2.0);
  \\coordinate (Node_NoCommit) at (3.5, -2.0);

  % Stage 2 / Terminals for Commit branch
  \\coordinate (T_Commit_StayOut) at (6.5, 3.2);
  \\coordinate (Node_Commit_Post) at (6.5, 1.2);
  \\coordinate (T_Commit_Fight) at (9.5, 1.8);
  \\coordinate (T_Commit_Acc) at (9.5, 0.6);

  % Stage 2 / Terminals for No-Commit branch
  \\coordinate (T_NoCommit_StayOut) at (6.5, -0.8);
  \\coordinate (Node_NoCommit_Post) at (6.5, -2.8);
  \\coordinate (T_NoCommit_Fight) at (9.5, -2.2);
  \\coordinate (T_NoCommit_Acc) at (9.5, -3.4);

  % Stage 0 Branches
  \\draw[${incumbentPrefersCommit ? "spne branch" : "pruned branch"}] (Root) -- node[above left] {Commit ($K=${capacityK.toFixed(1)})} (Node_Commit);
  \\draw[${!incumbentPrefersCommit ? "spne branch" : "pruned branch"}] (Root) -- node[below left] {No Commitment ($K=0$)} (Node_NoCommit);

  % Stage 1 Branches (Commit)
  \\draw[${entrantCommitAction === "Stay Out" ? "spne branch" : "pruned branch"}] (Node_Commit) -- node[above left] {Stay Out} (T_Commit_StayOut);
  \\draw[${entrantCommitAction === "Enter" ? "spne branch" : "pruned branch"}] (Node_Commit) -- node[below left] {Enter} (Node_Commit_Post);

  % Stage 2 Branches (Commit Post-Entry)
  \\draw[${commitIncumbentPrefersFight ? "spne branch" : "pruned branch"}] (Node_Commit_Post) -- node[above left] {Fight (Credible)} (T_Commit_Fight);
  \\draw[${!commitIncumbentPrefersFight ? "spne branch" : "pruned branch"}] (Node_Commit_Post) -- node[below left] {Accommodate} (T_Commit_Acc);

  % Stage 1 Branches (No Commit)
  \\draw[${entrantNoCommitAction === "Stay Out" ? "spne branch" : "pruned branch"}] (Node_NoCommit) -- node[above left] {Stay Out} (T_NoCommit_StayOut);
  \\draw[${entrantNoCommitAction === "Enter" ? "spne branch" : "pruned branch"}] (Node_NoCommit) -- node[below left] {Enter} (Node_NoCommit_Post);

  % Stage 2 Branches (No Commit Post-Entry)
  \\draw[${!noCommitIncumbentPrefersAcc ? "spne branch" : "pruned branch"}] (Node_NoCommit_Post) -- node[above left] {Fight (Cheap Talk)} (T_NoCommit_Fight);
  \\draw[${noCommitIncumbentPrefersAcc ? "spne branch" : "pruned branch"}] (Node_NoCommit_Post) -- node[below left] {Accommodate} (T_NoCommit_Acc);

  % Decision Nodes
  \\node[incumbent node] at (Root) {I$_0$};
  \\node[entrant node] at (Node_Commit) {E$_1$};
  \\node[entrant node] at (Node_NoCommit) {E$_1$};
  \\node[incumbent node] at (Node_Commit_Post) {I$_2$};
  \\node[incumbent node] at (Node_NoCommit_Post) {I$_2$};

  % Terminal Payoffs (Entrant, Incumbent)
  \\node[terminal, right] at (T_Commit_StayOut) {(0, ${(5 - capacityK).toFixed(1)}) ${incumbentPrefersCommit ? "\\textbf{[SPNE]}" : ""}};
  \\node[terminal, right] at (T_Commit_Fight) {(-1, ${(1 - capacityK).toFixed(1)})};
  \\node[terminal, right] at (T_Commit_Acc) {(2, ${(0 - capacityK).toFixed(1)})};

  \\node[terminal, right] at (T_NoCommit_StayOut) {(0, 5)};
  \\node[terminal, right] at (T_NoCommit_Fight) {(-1, -1)};
  \\node[terminal, right] at (T_NoCommit_Acc) {(2, 2) ${!incumbentPrefersCommit ? "\\textbf{[SPNE]}" : ""}};

\\end{tikzpicture}
\\end{document}`;

  const copyTikz = () => {
    navigator.clipboard.writeText(tikzCode);
    setCopiedTikz(true);
    setTimeout(() => setCopiedTikz(false), 2500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-0">
      {/* Header Bar */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Week 5 Strategic Move Game Tree: Commitment vs. No Commitment
            </span>
            <span className="px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-semibold rounded">
              3-Stage Dixit-Schelling Tree
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
            Incumbent First Move: Commit Capacity ($K$) vs. No Commitment (Cheap Talk)
          </h3>
          <p className="text-xs text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
            The game tree starts at <strong>Stage 0</strong> with the established Incumbent deciding whether to make an observable, irreversible strategic commitment ($K$) before the prospective Entrant chooses to Enter or Stay Out.
          </p>
        </div>

        {/* TikZ Export Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setShowTikzModal(true)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
            title="View LaTeX TikZ code"
          >
            <span>📐</span> LaTeX TikZ
          </button>
        </div>
      </div>

      {/* Interactive Controls & Capacity Slider */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3">
        {/* Step-by-Step Solver Navigation */}
        <div className="flex items-center gap-1.5 text-xs font-semibold overflow-x-auto pb-1 sm:pb-0">
          <span className="text-slate-500 mr-1 text-[11px] uppercase tracking-wider">Solve Step:</span>
          <button
            onClick={() => setStep(0)}
            className={`px-2.5 py-1 rounded transition-colors ${
              step === 0 ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            0. Full Tree
          </button>
          <button
            onClick={() => setStep(1)}
            className={`px-2.5 py-1 rounded transition-colors ${
              step === 1 ? "bg-indigo-700 text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            1. Stage 2 (Fight vs. Acc)
          </button>
          <button
            onClick={() => setStep(2)}
            className={`px-2.5 py-1 rounded transition-colors ${
              step === 2 ? "bg-blue-700 text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            2. Stage 1 (Entrant Decision)
          </button>
          <button
            onClick={() => setStep(3)}
            className={`px-2.5 py-1 rounded transition-colors ${
              step === 3 ? "bg-purple-700 text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            3. Stage 0 (Root Incumbent Move)
          </button>
          <button
            onClick={() => setStep(4)}
            className={`px-2.5 py-1 rounded transition-colors ${
              step === 4 ? "bg-emerald-700 text-white shadow-2xs" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            ★ 4. Full SPNE
          </button>
        </div>

        {/* Capacity Slider Tool */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs ml-auto">
          <span className="font-semibold text-slate-700">Capacity Cost ($K$):</span>
          <input
            type="range"
            min="0"
            max="3.5"
            step="0.5"
            value={capacityK}
            onChange={(e) => setCapacityK(parseFloat(e.target.value))}
            className="w-24 accent-blue-600"
          />
          <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
            K={capacityK.toFixed(1)}
          </span>
          <button
            onClick={() => setCapacityK(1.0)}
            className="text-[10px] text-slate-500 hover:text-slate-800 underline ml-1"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Vector SVG 3-Stage Game Tree Diagram */}
      <div className="p-4 sm:p-6 bg-slate-900 overflow-x-auto flex justify-center items-center">
        <svg
          viewBox="0 0 980 440"
          className="w-full max-w-4xl select-none"
          style={{ minWidth: "820px" }}
        >
          <defs>
            <linearGradient id="incumbentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="entrantGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <filter id="glowGreenTree" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="shadowTree" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Blueprint Grid Background */}
          <pattern id="bgGridTree" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.35" />
          </pattern>
          <rect width="980" height="440" fill="url(#bgGridTree)" rx="12" />

          {/* ==========================================================
              STAGE 0 BRANCHES: Root (Incumbent) -> Entrant Nodes
             ========================================================== */}
          {/* Branch Top: Commit (K) */}
          <g>
            <path
              d="M 90 220 C 160 220, 200 110, 280 110"
              fill="none"
              stroke={
                isStage0Solved && incumbentPrefersCommit
                  ? "#10b981"
                  : isStage0Solved && !incumbentPrefersCommit
                  ? "#ef4444"
                  : "#64748b"
              }
              strokeWidth={isStage0Solved && incumbentPrefersCommit ? 5 : 2.5}
              strokeDasharray={isStage0Solved && !incumbentPrefersCommit ? "4,4" : undefined}
              opacity={isStage0Solved && !incumbentPrefersCommit ? 0.35 : 1}
              filter={isStage0Solved && incumbentPrefersCommit ? "url(#glowGreenTree)" : undefined}
            />
            {/* Action Label */}
            <rect
              x="145"
              y="135"
              width="125"
              height="24"
              rx="6"
              fill="#0f172a"
              stroke={isStage0Solved && incumbentPrefersCommit ? "#10b981" : "#334155"}
              strokeWidth="1.2"
            />
            <text
              x="207"
              y="151"
              textAnchor="middle"
              fill={isStage0Solved && incumbentPrefersCommit ? "#34d399" : "#f1f5f9"}
              fontSize="10.5"
              fontWeight="bold"
            >
              Commit ($K={capacityK.toFixed(1)}$)
            </text>
          </g>

          {/* Branch Bottom: No Commitment (K=0) */}
          <g>
            <path
              d="M 90 220 C 160 220, 200 330, 280 330"
              fill="none"
              stroke={
                isStage0Solved && !incumbentPrefersCommit
                  ? "#10b981"
                  : isStage0Solved && incumbentPrefersCommit
                  ? "#ef4444"
                  : "#64748b"
              }
              strokeWidth={isStage0Solved && !incumbentPrefersCommit ? 5 : 2.5}
              strokeDasharray={isStage0Solved && incumbentPrefersCommit ? "4,4" : undefined}
              opacity={isStage0Solved && incumbentPrefersCommit ? 0.35 : 1}
            />
            <rect
              x="140"
              y="280"
              width="130"
              height="24"
              rx="6"
              fill="#0f172a"
              stroke={isStage0Solved && !incumbentPrefersCommit ? "#10b981" : "#334155"}
              strokeWidth="1.2"
            />
            <text
              x="205"
              y="296"
              textAnchor="middle"
              fill={isStage0Solved && !incumbentPrefersCommit ? "#34d399" : "#f1f5f9"}
              fontSize="10.5"
              fontWeight="bold"
            >
              No Commit ($K=0$)
            </text>
          </g>

          {/* ==========================================================
              SUBGAME 1 (TOP): UNDER COMMITMENT
             ========================================================== */}
          {/* Branch: Stay Out */}
          <g>
            <path
              d="M 305 110 C 370 110, 410 40, 520 40 L 700 40"
              fill="none"
              stroke={
                isStage1Solved && entrantCommitAction === "Stay Out"
                  ? "#10b981"
                  : isStage1Solved
                  ? "#ef4444"
                  : "#64748b"
              }
              strokeWidth={isStage1Solved && entrantCommitAction === "Stay Out" ? 5 : 2.5}
              strokeDasharray={isStage1Solved && entrantCommitAction !== "Stay Out" ? "4,4" : undefined}
              opacity={isStage1Solved && entrantCommitAction !== "Stay Out" ? 0.35 : 1}
              filter={isStage1Solved && entrantCommitAction === "Stay Out" ? "url(#glowGreenTree)" : undefined}
            />
            <rect x="360" y="55" width="80" height="22" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="400" y="70" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontWeight="bold">
              Stay Out
            </text>
          </g>

          {/* Branch: Enter */}
          <g>
            <path
              d="M 305 110 C 370 110, 420 150, 510 150"
              fill="none"
              stroke={
                isStage1Solved && entrantCommitAction === "Enter"
                  ? "#10b981"
                  : isStage1Solved
                  ? "#ef4444"
                  : "#64748b"
              }
              strokeWidth={isStage1Solved && entrantCommitAction === "Enter" ? 5 : 2.5}
              strokeDasharray={isStage1Solved && entrantCommitAction !== "Enter" ? "4,4" : undefined}
              opacity={isStage1Solved && entrantCommitAction !== "Enter" ? 0.35 : 1}
            />
            <rect x="375" y="118" width="65" height="22" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="407" y="133" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontWeight="bold">
              Enter
            </text>
            {isStage1Solved && entrantCommitAction === "Stay Out" && (
              <g transform="translate(450, 133)">
                <line x1="-8" y1="-8" x2="8" y2="8" stroke="#ef4444" strokeWidth="3" />
                <line x1="-2" y1="-8" x2="14" y2="8" stroke="#ef4444" strokeWidth="3" />
              </g>
            )}
          </g>

          {/* Stage 2 Branches (Under Commit): Fight vs Accommodate */}
          <g>
            {/* Fight */}
            <path
              d="M 535 150 C 600 150, 630 110, 710 110"
              fill="none"
              stroke={isStage2Solved && commitIncumbentPrefersFight ? "#10b981" : "#ef4444"}
              strokeWidth={isStage2Solved && commitIncumbentPrefersFight ? 4.5 : 2}
              strokeDasharray={isStage2Solved && !commitIncumbentPrefersFight ? "4,4" : undefined}
              opacity={isStage2Solved && !commitIncumbentPrefersFight ? 0.35 : 1}
            />
            <rect x="580" y="112" width="100" height="22" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="630" y="127" textAnchor="middle" fill="#34d399" fontSize="9.5" fontWeight="bold">
              Fight (Credible)
            </text>

            {/* Accommodate */}
            <path
              d="M 535 150 C 600 150, 630 180, 710 180"
              fill="none"
              stroke={isStage2Solved && !commitIncumbentPrefersFight ? "#10b981" : "#ef4444"}
              strokeWidth={isStage2Solved && !commitIncumbentPrefersFight ? 4.5 : 2}
              strokeDasharray={isStage2Solved && commitIncumbentPrefersFight ? "4,4" : undefined}
              opacity={isStage2Solved && commitIncumbentPrefersFight ? 0.35 : 1}
            />
            <rect x="580" y="170" width="100" height="22" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="630" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="bold">
              Accommodate
            </text>
            {isStage2Solved && commitIncumbentPrefersFight && (
              <g transform="translate(685, 180)">
                <line x1="-8" y1="-8" x2="8" y2="8" stroke="#ef4444" strokeWidth="3" />
                <line x1="-2" y1="-8" x2="14" y2="8" stroke="#ef4444" strokeWidth="3" />
              </g>
            )}
          </g>

          {/* ==========================================================
              SUBGAME 2 (BOTTOM): WITHOUT COMMITMENT (K=0)
             ========================================================== */}
          {/* Branch: Stay Out */}
          <g>
            <path
              d="M 305 330 C 370 330, 410 260, 520 260 L 700 260"
              fill="none"
              stroke={
                isStage1Solved && entrantNoCommitAction === "Stay Out"
                  ? "#10b981"
                  : isStage1Solved
                  ? "#ef4444"
                  : "#64748b"
              }
              strokeWidth={isStage1Solved && entrantNoCommitAction === "Stay Out" ? 5 : 2.5}
              strokeDasharray={isStage1Solved && entrantNoCommitAction !== "Stay Out" ? "4,4" : undefined}
              opacity={isStage1Solved && entrantNoCommitAction !== "Stay Out" ? 0.35 : 1}
            />
            <rect x="360" y="275" width="80" height="22" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="400" y="290" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontWeight="bold">
              Stay Out
            </text>
            {isStage1Solved && entrantNoCommitAction === "Enter" && (
              <g transform="translate(450, 275)">
                <line x1="-8" y1="-8" x2="8" y2="8" stroke="#ef4444" strokeWidth="3" />
                <line x1="-2" y1="-8" x2="14" y2="8" stroke="#ef4444" strokeWidth="3" />
              </g>
            )}
          </g>

          {/* Branch: Enter */}
          <g>
            <path
              d="M 305 330 C 370 330, 420 370, 510 370"
              fill="none"
              stroke={
                isStage1Solved && entrantNoCommitAction === "Enter"
                  ? "#10b981"
                  : isStage1Solved
                  ? "#ef4444"
                  : "#64748b"
              }
              strokeWidth={isStage1Solved && entrantNoCommitAction === "Enter" ? 5 : 2.5}
              opacity={isStage1Solved && entrantNoCommitAction !== "Enter" ? 0.35 : 1}
            />
            <rect x="375" y="340" width="65" height="22" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="407" y="355" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
              Enter
            </text>
          </g>

          {/* Stage 2 Branches (Under No Commit): Fight vs Accommodate */}
          <g>
            {/* Fight (Cheap talk) */}
            <path
              d="M 535 370 C 600 370, 630 330, 710 330"
              fill="none"
              stroke={isStage2Solved && !noCommitIncumbentPrefersAcc ? "#10b981" : "#ef4444"}
              strokeWidth={isStage2Solved && !noCommitIncumbentPrefersAcc ? 4.5 : 2}
              strokeDasharray={isStage2Solved && noCommitIncumbentPrefersAcc ? "4,4" : undefined}
              opacity={isStage2Solved && noCommitIncumbentPrefersAcc ? 0.35 : 1}
            />
            <rect x="580" y="332" width="110" height="22" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="635" y="347" textAnchor="middle" fill="#f87171" fontSize="9.5" fontWeight="bold">
              Fight (Cheap Talk)
            </text>
            {isStage2Solved && noCommitIncumbentPrefersAcc && (
              <g transform="translate(695, 335)">
                <line x1="-8" y1="-8" x2="8" y2="8" stroke="#ef4444" strokeWidth="3" />
                <line x1="-2" y1="-8" x2="14" y2="8" stroke="#ef4444" strokeWidth="3" />
              </g>
            )}

            {/* Accommodate */}
            <path
              d="M 535 370 C 600 370, 630 400, 710 400"
              fill="none"
              stroke={isStage2Solved && noCommitIncumbentPrefersAcc ? "#10b981" : "#ef4444"}
              strokeWidth={isStage2Solved && noCommitIncumbentPrefersAcc ? 4.5 : 2}
              opacity={isStage2Solved && !noCommitIncumbentPrefersAcc ? 0.35 : 1}
            />
            <rect x="580" y="390" width="100" height="22" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="630" y="405" textAnchor="middle" fill="#34d399" fontSize="9.5" fontWeight="bold">
              Accommodate
            </text>
          </g>

          {/* ==========================================================
              DECISION NODES
             ========================================================== */}
          {/* Stage 0 Root: Incumbent */}
          <g transform="translate(80, 220)" filter="url(#shadowTree)">
            <circle r="26" fill="url(#incumbentGrad)" stroke="#60a5fa" strokeWidth="2.5" />
            <text textAnchor="middle" y="-34" fill="#93c5fd" fontSize="10.5" fontWeight="bold">Stage 0: Root</text>
            <text textAnchor="middle" y="-20" fill="#ffffff" fontSize="11" fontWeight="extrabold">Incumbent</text>
            <text textAnchor="middle" y="5" fill="#ffffff" fontSize="13" fontWeight="bold">I₀</text>
          </g>

          {/* Stage 1: Entrant Node (Commit Subgame) */}
          <g transform="translate(290, 110)" filter="url(#shadowTree)">
            <circle r="22" fill="url(#entrantGrad)" stroke="#34d399" strokeWidth="2.5" />
            <text textAnchor="middle" y="-28" fill="#a7f3d0" fontSize="10" fontWeight="bold">Stage 1</text>
            <text textAnchor="middle" y="-15" fill="#ffffff" fontSize="10" fontWeight="extrabold">Entrant</text>
            <text textAnchor="middle" y="5" fill="#ffffff" fontSize="12" fontWeight="bold">E₁</text>
          </g>

          {/* Stage 1: Entrant Node (No Commit Subgame) */}
          <g transform="translate(290, 330)" filter="url(#shadowTree)">
            <circle r="22" fill="url(#entrantGrad)" stroke="#34d399" strokeWidth="2.5" />
            <text textAnchor="middle" y="-28" fill="#a7f3d0" fontSize="10" fontWeight="bold">Stage 1</text>
            <text textAnchor="middle" y="-15" fill="#ffffff" fontSize="10" fontWeight="extrabold">Entrant</text>
            <text textAnchor="middle" y="5" fill="#ffffff" fontSize="12" fontWeight="bold">E₁</text>
          </g>

          {/* Stage 2: Incumbent Node (Post-Entry under Commit) */}
          <g transform="translate(520, 150)" filter="url(#shadowTree)">
            <circle r="20" fill="url(#incumbentGrad)" stroke="#60a5fa" strokeWidth="2" />
            <text textAnchor="middle" y="-25" fill="#93c5fd" fontSize="9.5" fontWeight="bold">Stage 2</text>
            <text textAnchor="middle" y="5" fill="#ffffff" fontSize="11" fontWeight="bold">I₂</text>
          </g>

          {/* Stage 2: Incumbent Node (Post-Entry without Commit) */}
          <g transform="translate(520, 370)" filter="url(#shadowTree)">
            <circle r="20" fill="url(#incumbentGrad)" stroke="#60a5fa" strokeWidth="2" />
            <text textAnchor="middle" y="-25" fill="#93c5fd" fontSize="9.5" fontWeight="bold">Stage 2</text>
            <text textAnchor="middle" y="5" fill="#ffffff" fontSize="11" fontWeight="bold">I₂</text>
          </g>

          {/* ==========================================================
              TERMINAL NODES & PAYOFF BOXES
             ========================================================== */}
          {/* Terminal 1: Commit -> Stay Out (SPNE if K < 3) */}
          <g transform="translate(710, 24)" filter="url(#shadowTree)">
            {isSpneGlow && incumbentPrefersCommit && (
              <rect x="-8" y="-5" width="235" height="40" rx="9" fill="none" stroke="#10b981" strokeWidth="2.5" filter="url(#glowGreenTree)" />
            )}
            <rect x="-4" y="-2" width="225" height="34" rx="7" fill="#0f172a" stroke={isSpneGlow && incumbentPrefersCommit ? "#10b981" : "#334155"} strokeWidth="1.5" />
            <circle cx="-14" cy="15" r="4.5" fill="#10b981" />
            <text x="8" y="15" fill="#94a3b8" fontSize="10">Payoff:</text>
            <text x="50" y="15" fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">u_E = 0</text>
            <text x="96" y="15" fill="#94a3b8" fontSize="11">,</text>
            <text x="106" y="15" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">u_I = {(5 - capacityK).toFixed(1)}</text>
            <text x="162" y="15" fill="#34d399" fontSize="9" fontWeight="extrabold">{incumbentPrefersCommit ? "★ SPNE" : ""}</text>
          </g>

          {/* Terminal 2: Commit -> Enter -> Fight */}
          <g transform="translate(710, 94)" filter="url(#shadowTree)">
            <rect x="-4" y="-2" width="225" height="34" rx="7" fill="#0f172a" stroke="#334155" strokeWidth="1.5" opacity={isStage1Solved ? 0.45 : 1} />
            <circle cx="-14" cy="15" r="4.5" fill="#64748b" />
            <text x="8" y="15" fill="#94a3b8" fontSize="10">Payoff:</text>
            <text x="50" y="15" fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">u_E = -1</text>
            <text x="96" y="15" fill="#94a3b8" fontSize="11">,</text>
            <text x="106" y="15" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">u_I = {(1 - capacityK).toFixed(1)}</text>
            <text x="156" y="15" fill="#f87171" fontSize="8.5">Credible War</text>
          </g>

          {/* Terminal 3: Commit -> Enter -> Accommodate */}
          <g transform="translate(710, 164)" filter="url(#shadowTree)">
            <rect x="-4" y="-2" width="225" height="34" rx="7" fill="#0f172a" stroke="#334155" strokeWidth="1.5" opacity={0.35} />
            <circle cx="-14" cy="15" r="4.5" fill="#ef4444" />
            <text x="8" y="15" fill="#94a3b8" fontSize="10">Payoff:</text>
            <text x="50" y="15" fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">u_E = 2</text>
            <text x="96" y="15" fill="#94a3b8" fontSize="11">,</text>
            <text x="106" y="15" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">u_I = {(0 - capacityK).toFixed(1)}</text>
            <text x="160" y="15" fill="#f87171" fontSize="8.5">Pruned</text>
          </g>

          {/* Terminal 4: No Commit -> Stay Out */}
          <g transform="translate(710, 244)" filter="url(#shadowTree)">
            <rect x="-4" y="-2" width="225" height="34" rx="7" fill="#0f172a" stroke="#334155" strokeWidth="1.5" opacity={isStage1Solved ? 0.35 : 1} />
            <circle cx="-14" cy="15" r="4.5" fill="#64748b" />
            <text x="8" y="15" fill="#94a3b8" fontSize="10">Payoff:</text>
            <text x="50" y="15" fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">u_E = 0</text>
            <text x="96" y="15" fill="#94a3b8" fontSize="11">,</text>
            <text x="106" y="15" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">u_I = 5</text>
            <text x="156" y="15" fill="#94a3b8" fontSize="8.5">Monopoly</text>
          </g>

          {/* Terminal 5: No Commit -> Enter -> Fight */}
          <g transform="translate(710, 314)" filter="url(#shadowTree)">
            <rect x="-4" y="-2" width="225" height="34" rx="7" fill="#0f172a" stroke="#334155" strokeWidth="1.5" opacity={0.35} />
            <circle cx="-14" cy="15" r="4.5" fill="#ef4444" />
            <text x="8" y="15" fill="#94a3b8" fontSize="10">Payoff:</text>
            <text x="50" y="15" fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">u_E = -1</text>
            <text x="96" y="15" fill="#94a3b8" fontSize="11">,</text>
            <text x="106" y="15" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">u_I = -1</text>
            <text x="160" y="15" fill="#f87171" fontSize="8.5">Non-Credible</text>
          </g>

          {/* Terminal 6: No Commit -> Enter -> Accommodate (SPNE if K >= 3) */}
          <g transform="translate(710, 384)" filter="url(#shadowTree)">
            {isSpneGlow && !incumbentPrefersCommit && (
              <rect x="-8" y="-5" width="235" height="40" rx="9" fill="none" stroke="#10b981" strokeWidth="2.5" filter="url(#glowGreenTree)" />
            )}
            <rect x="-4" y="-2" width="225" height="34" rx="7" fill="#0f172a" stroke={isSpneGlow && !incumbentPrefersCommit ? "#10b981" : "#334155"} strokeWidth="1.5" />
            <circle cx="-14" cy="15" r="4.5" fill={!incumbentPrefersCommit ? "#10b981" : "#64748b"} />
            <text x="8" y="15" fill="#94a3b8" fontSize="10">Payoff:</text>
            <text x="50" y="15" fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">u_E = 2</text>
            <text x="96" y="15" fill="#94a3b8" fontSize="11">,</text>
            <text x="106" y="15" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">u_I = 2</text>
            <text x="156" y="15" fill="#34d399" fontSize="9" fontWeight="bold">{!incumbentPrefersCommit ? "★ SPNE" : "Accommodated"}</text>
          </g>
        </svg>
      </div>

      {/* Step Explanation Card */}
      <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
          <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-mono">
              {step}
            </span>
            <span>
              {step === 0 && "Step 0: The 3-Stage Strategic Move Game Tree"}
              {step === 1 && "Step 1: Solve Stage 2 Post-Entry Subgames (Fight vs. Accommodate)"}
              {step === 2 && "Step 2: Solve Stage 1 Entrant Responses (Enter vs. Stay Out)"}
              {step === 3 && "Step 3: Solve Stage 0 Incumbent Root Decision (Commit vs. No Commit)"}
              {step === 4 && "★ Step 4: Unique Subgame Perfect Nash Equilibrium (SPNE)"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ◀ Prev
            </button>
            <button
              onClick={() => setStep(Math.min(4, step + 1))}
              disabled={step === 4}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
            >
              Next ▶
            </button>
          </div>
        </div>

        {/* Narrative Details */}
        <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
          {step === 0 && (
            <p>
              In Week 5, the Incumbent does NOT wait passively! The Incumbent moves first at <strong>Stage 0</strong> and branches out into <strong>Commitment ($K$)</strong> or <strong>No Commitment ($K=0$)</strong>. In Stage 1, the Entrant observes this first move and decides whether to <strong>Enter</strong> or <strong>Stay Out</strong>. If the Entrant enters, Stage 2 determines whether the Incumbent <strong>Fights</strong> or <strong>Accommodates</strong>.
            </p>
          )}

          {step === 1 && (
            <div className="space-y-1.5">
              <p>
                <strong>Stage 2 (Post-Entry Response):</strong> Work backward from the final branches!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-red-200 rounded-lg space-y-1">
                  <strong className="text-red-950 block font-bold">Without Commitment ($K=0$):</strong>
                  <div>u_I(Accommodate) = <strong>2</strong> vs. u_I(Fight) = <strong>-1</strong></div>
                  <div className="text-red-700 font-bold">2 &gt; -1 ⇒ Threat to fight is cheap talk. Rational Incumbent accommodates!</div>
                </div>
                <div className="p-3 bg-white border border-emerald-200 rounded-lg space-y-1">
                  <strong className="text-emerald-950 block font-bold">With Commitment ($K={capacityK.toFixed(1)}$):</strong>
                  <div>u_I(Fight) = 1 - {capacityK.toFixed(1)} = <strong>{(1 - capacityK).toFixed(1)}</strong></div>
                  <div>u_I(Accommodate) = 0 - {capacityK.toFixed(1)} = <strong>{(0 - capacityK).toFixed(1)}</strong></div>
                  <div className="text-emerald-700 font-bold">
                    {(1 - capacityK).toFixed(1)} &gt; {(0 - capacityK).toFixed(1)} ⇒ Fighting is now credible!
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-1.5">
              <p>
                <strong>Stage 1 (Entrant Response):</strong> Entrant anticipates what Incumbent will do in Stage 2!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
                  <strong className="text-slate-900 block font-bold">If Incumbent Chose "No Commitment":</strong>
                  <p className="text-slate-600">Entrant knows Incumbent will Accommodate (payoff 2). Entrant compares Enter ($u_E = 2$) vs. Stay Out ($u_E = 0$).</p>
                  <div className="text-blue-900 font-bold">2 &gt; 0 ⇒ Entrant chooses Enter! Incumbent gets only $2M.</div>
                </div>
                <div className="p-3 bg-white border border-emerald-200 rounded-lg space-y-1">
                  <strong className="text-emerald-950 block font-bold">If Incumbent Chose "Commitment":</strong>
                  <p className="text-slate-600">Entrant knows Incumbent will Fight ($u_E = -1$). Entrant compares Enter ($u_E = -1$) vs. Stay Out ($u_E = 0$).</p>
                  <div className="text-emerald-900 font-bold">0 &gt; -1 ⇒ Entrant chooses Stay Out! Incumbent gets ${commitMonopolyPayoff.toFixed(1)}M.</div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-1.5">
              <p>
                <strong>Stage 0 (Incumbent's Root Strategic Move):</strong> Now the Incumbent compares the two subgame outcomes:
              </p>
              <div className="p-3 bg-white border border-blue-200 rounded-lg font-mono text-xs space-y-1">
                <div>• If Incumbent chooses <strong>Commitment ($K={capacityK.toFixed(1)}$)</strong>: Entrant stays out ⇒ Net Profit = <strong>{commitMonopolyPayoff.toFixed(1)}</strong></div>
                <div>• If Incumbent chooses <strong>No Commitment ($K=0$)</strong>: Entrant enters ⇒ Net Profit = <strong>{noCommitAccommodatedPayoff.toFixed(1)}</strong></div>
                <div className="font-bold text-blue-950 pt-1 border-t border-slate-200">
                  {incumbentPrefersCommit ? (
                    `Since ${commitMonopolyPayoff.toFixed(1)} > 2.0, rational Incumbent COMMITS! Strategic deterrence succeeds.`
                  ) : (
                    `Since ${commitMonopolyPayoff.toFixed(1)} < 2.0, capacity is too expensive (over-investment). Incumbent chooses No Commitment!`
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-2">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 text-xs sm:text-sm">
                <strong>Subgame Perfect Nash Equilibrium (SPNE): </strong>
                <span className="font-mono font-bold">
                  {incumbentPrefersCommit ? (
                    `[Incumbent: Commit $K=${capacityK.toFixed(1)}, Fight if Enter; Entrant: Stay Out if Commit, Enter if No Commit]`
                  ) : (
                    `[Incumbent: No Commit, Accommodate if Enter; Entrant: Enter]`
                  )}
                </span>
                <div className="mt-1 font-mono text-emerald-800">
                  Equilibrium Path: <strong>{incumbentPrefersCommit ? "Incumbent Commits ➔ Entrant Stays Out" : "Incumbent Does Not Commit ➔ Entrant Enters"}</strong>, yielding Payoffs ({incumbentPrefersCommit ? `0, ${(5 - capacityK).toFixed(1)}` : "2, 2"}) $M
                </div>
              </div>
              <p className="text-xs text-slate-700 font-medium bg-white p-3 rounded border border-slate-200">
                <strong>Strategic Insight: </strong>By starting the game with an irreversible investment, the Incumbent fundamentally alters the subsequent tree. Burning bridges or sinking capital shifts the continuation game such that an aggressive response becomes credible, forcing the rival into a voluntary retreat!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* TikZ Modal */}
      {showTikzModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">LaTeX TikZ 3-Stage Commitment Tree</h4>
                <p className="text-xs text-slate-400">Copy & compile directly in Overleaf or LaTeX Beamer</p>
              </div>
              <button
                onClick={() => setShowTikzModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs bg-slate-950 text-slate-100">
              <pre className="whitespace-pre-wrap">{tikzCode}</pre>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-sans">
                {copiedTikz ? "✓ Copied to clipboard!" : "Ready to paste into LaTeX document"}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={copyTikz}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  {copiedTikz ? "✓ Copied!" : "Copy TikZ Code"}
                </button>
                <button
                  onClick={() => setShowTikzModal(false)}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
