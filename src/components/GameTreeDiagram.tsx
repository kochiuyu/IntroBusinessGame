import React, { useState } from "react";

export interface GameTreePreset {
  id: string;
  name: string;
  badge: string;
  player1: string; // Root player
  player2: string; // Subsequent player
  node1ActionA: string; // Leads to Node 2 (e.g., "Enter")
  node1ActionB: string; // Terminal (e.g., "Stay Out")
  node2ActionA: string; // e.g., "Accommodate"
  node2ActionB: string; // e.g., "Fight"
  payoffNode1B: [number, number]; // Payoffs if Node 1 takes Action B (e.g., Stay Out: (0, 5))
  payoffNode2A: [number, number]; // Payoffs if Node 2 takes Action A (e.g., Accommodate: (2, 2))
  payoffNode2B: [number, number]; // Payoffs if Node 2 takes Action B (e.g., Fight: (-1, -1))
  unit: string;
  description: string;
  executiveTakeaway: string;
}

const PRESETS: GameTreePreset[] = [
  {
    id: "entry_deterrence",
    name: "Classic Market Entry Game (Week 2 Baseline)",
    badge: "Core Lecture Model",
    player1: "Entrant (E)",
    player2: "Incumbent (I)",
    node1ActionA: "Enter Market",
    node1ActionB: "Stay Out",
    node2ActionA: "Accommodate (Share)",
    node2ActionB: "Fight (Price War)",
    payoffNode1B: [0, 5],
    payoffNode2A: [2, 2],
    payoffNode2B: [-1, -1],
    unit: "$M Profit",
    description: "An Entrant decides whether to challenge a monopolistic Incumbent. The Incumbent threatens an aggressive price war if entry occurs.",
    executiveTakeaway: "Because 2 > -1, Incumbent will rationally Accommodate once entry occurs. Incumbent's threat to Fight is non-credible cheap talk. Rational Entrant anticipates this and Enters."
  },
  {
    id: "acquisition_bluff",
    name: "Startup Acquisition Bluff (Week 2 Case)",
    badge: "Tech M&A Case",
    player1: "Startup Founder",
    player2: "Tech Acquirer",
    node1ActionA: "Demand $8M (Counter-offer)",
    node1ActionB: "Accept $5M Offer",
    node2ActionA: "Concede & Pay $8M",
    node2ActionB: "Refuse & Call Bluff",
    payoffNode1B: [5, 10],
    payoffNode2A: [8, 7],
    payoffNode2B: [0, 6],
    unit: "$M Value",
    description: "A startup founder threatens to walk away into bankruptcy if the tech giant doesn't raise its offer from $5M to $8M.",
    executiveTakeaway: "When Acquirer refuses the $8M demand, Startup founder earns $0 if walking away vs taking $5M when cornered. Acquirer backward-induces that founder cannot credibly walk away."
  },
  {
    id: "commitment_capacity",
    name: "Credible Entry Deterrence with Sunk Capital",
    badge: "Dixit Commitment",
    player1: "Entrant (E)",
    player2: "Incumbent (I)",
    node1ActionA: "Enter Market",
    node1ActionB: "Stay Out",
    node2ActionA: "Accommodate",
    node2ActionB: "Fight (Pre-built Capacity)",
    payoffNode1B: [0, 6],
    payoffNode2A: [1, 2],
    payoffNode2B: [-2, 3],
    unit: "$M Profit",
    description: "Incumbent spent $2B in irreversible capital beforehand. With zero marginal cost, Fighting yields +3 while Accommodating yields only 2.",
    executiveTakeaway: "With commitment, Fighting becomes the Incumbent's dominant choice (3 > 2). Entrant sees that entry yields -2 < 0 (Stay Out), so deterrence succeeds!"
  }
];

export const GameTreeDiagram: React.FC<{
  initialPresetId?: string;
  showTikzExport?: boolean;
}> = ({ initialPresetId = "entry_deterrence", showTikzExport = true }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialPresetId);
  const [step, setStep] = useState<number>(3); // 0: unpruned, 1: solve Node 2, 2: solve Node 1, 3: full SPNE
  const [showTikzModal, setShowTikzModal] = useState<boolean>(false);
  const [copiedTikz, setCopiedTikz] = useState<boolean>(false);

  const preset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];

  // Mathematical Backward Induction calculations
  const incumbentOptimalAction = preset.payoffNode2A[1] >= preset.payoffNode2B[1] ? "A" : "B";
  const node2ContinuationPayoff = incumbentOptimalAction === "A" ? preset.payoffNode2A : preset.payoffNode2B;

  const entrantPayoffIfActionA = node2ContinuationPayoff[0];
  const entrantPayoffIfActionB = preset.payoffNode1B[0];
  const entrantOptimalAction = entrantPayoffIfActionA >= entrantPayoffIfActionB ? "A" : "B";

  // Step state flags
  const isNode2Solved = step >= 1;
  const isNode1Solved = step >= 2;
  const isSpneHighlighted = step >= 3;

  // Pruning states
  const isNode2PrunedB = isNode2Solved && incumbentOptimalAction === "A"; // Fight pruned
  const isNode2PrunedA = isNode2Solved && incumbentOptimalAction === "B"; // Accommodate pruned

  const isNode1PrunedB = isNode1Solved && entrantOptimalAction === "A"; // Stay Out pruned
  const isNode1PrunedA = isNode1Solved && entrantOptimalAction === "B"; // Enter pruned

  // Generate TikZ Code
  const tikzCode = `% LaTeX TikZ Extensive Form Game Tree
% Generated for ${preset.name}
\\documentclass{standalone}
\\usepackage{tikz}
\\usetikzlibrary{calc,trees}

\\begin{document}
\\begin{tikzpicture}[
  scale=1.5,
  decision node/.style={circle, fill=blue!10, draw=blue!80, line width=1.2pt, minimum size=1.1cm, font=\\small\\bfseries},
  subgame node/.style={circle, fill=indigo!10, draw=indigo!80, line width=1.2pt, minimum size=1.1cm, font=\\small\\bfseries},
  terminal/.style={rectangle, rounded corners=3pt, fill=slate!10, draw=slate!40, inner sep=4pt, font=\\footnotesize},
  spne branch/.style={draw=emerald!80!black, line width=2.4pt},
  pruned branch/.style={draw=red!70, dashed, line width=1pt},
  normal branch/.style={draw=slate!70, line width=1.2pt}
]

  % Coordinates
  \\coordinate (N1) at (0, 0);
  \\coordinate (N2) at (3.5, 1.2);
  \\coordinate (T_StayOut) at (3.5, -1.2);
  \\coordinate (T_Acc) at (7, 2.0);
  \\coordinate (T_Fight) at (7, 0.4);

  % Branches from Node 1
  \\draw[${entrantOptimalAction === "A" ? "spne branch" : "pruned branch"}] 
    (N1) -- node[above left, font=\\small] {${preset.node1ActionA}} (N2);
  \\draw[${entrantOptimalAction === "B" ? "spne branch" : "pruned branch"}] 
    (N1) -- node[below left, font=\\small] {${preset.node1ActionB}} (T_StayOut);

  % Branches from Node 2
  \\draw[${incumbentOptimalAction === "A" ? "spne branch" : "pruned branch"}] 
    (N2) -- node[above left, font=\\small] {${preset.node2ActionA}} (T_Acc);
  \\draw[${incumbentOptimalAction === "B" ? "spne branch" : "pruned branch"}] 
    (N2) -- node[below left, font=\\small] {${preset.node2ActionB}} (T_Fight);

  % Decision Nodes
  \\node[decision node] at (N1) {${preset.player1.split(" ")[0]}};
  \\node[subgame node] at (N2) {${preset.player2.split(" ")[0]}};

  % Terminal Nodes & Payoffs
  \\node[terminal, right] at (T_StayOut) {(${preset.payoffNode1B[0]}, ${preset.payoffNode1B[1]})};
  \\node[terminal, right] at (T_Acc) {(${preset.payoffNode2A[0]}, ${preset.payoffNode2A[1]}) ${incumbentOptimalAction === "A" ? "\\textbf{[SPNE]}" : ""}};
  \\node[terminal, right] at (T_Fight) {(${preset.payoffNode2B[0]}, ${preset.payoffNode2B[1]}) ${incumbentOptimalAction === "B" ? "\\textbf{[SPNE]}" : ""}};

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
              Interactive Extensive-Form Game Tree
            </span>
            <span className="px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-semibold rounded">
              {preset.badge}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
            {preset.name}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
            {preset.description}
          </p>
        </div>

        {/* Action Controls & Presets */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <select
            value={selectedPresetId}
            onChange={(e) => {
              setSelectedPresetId(e.target.value);
              setStep(3);
            }}
            className="text-xs bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {showTikzExport && (
            <button
              onClick={() => setShowTikzModal(true)}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-colors"
              title="View LaTeX TikZ code for this game tree"
            >
              <span>📐</span> TikZ Code
            </button>
          )}
        </div>
      </div>

      {/* Stepper Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3">
        {/* Step Buttons */}
        <div className="flex items-center gap-1.5 text-xs font-semibold overflow-x-auto pb-1 sm:pb-0">
          <span className="text-slate-500 mr-1 text-[11px] uppercase tracking-wider">Solve Step:</span>
          <button
            onClick={() => setStep(0)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              step === 0
                ? "bg-slate-800 text-white"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            0. Unsolved Tree
          </button>
          <button
            onClick={() => setStep(1)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              step === 1
                ? "bg-blue-700 text-white"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            1. Prune Node 2 ({preset.player2.split(" ")[0]})
          </button>
          <button
            onClick={() => setStep(2)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              step === 2
                ? "bg-indigo-700 text-white"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            2. Fold Back to Node 1 ({preset.player1.split(" ")[0]})
          </button>
          <button
            onClick={() => setStep(3)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              step === 3
                ? "bg-emerald-700 text-white shadow-2xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            ★ 3. Full SPNE Outcome
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600 ml-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span>{preset.player1} ($u_1$)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>{preset.player2} ($u_2$)</span>
          </div>
        </div>
      </div>

      {/* Main Vector SVG Game Tree Diagram */}
      <div className="p-4 sm:p-6 bg-slate-900/95 overflow-x-auto flex justify-center items-center">
        <svg
          viewBox="0 0 760 380"
          className="w-full max-w-3xl select-none"
          style={{ minWidth: "620px" }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="node1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="node2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id="spneBranchGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.4" />
            </filter>
            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background grid dots for blueprint aesthetic */}
          <pattern id="bgGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.4" />
          </pattern>
          <rect width="760" height="380" fill="url(#bgGrid)" rx="12" />

          {/* ========================================================
              BRANCH LINES
             ======================================================== */}

          {/* Branch 1A: Node 1 -> Node 2 (Enter Market) */}
          <g>
            <path
              d="M 110 180 C 180 180, 220 100, 310 100"
              fill="none"
              stroke={
                isNode1Solved && entrantOptimalAction === "A"
                  ? "#10b981"
                  : isNode1PrunedA
                  ? "#ef4444"
                  : "#64748b"
              }
              strokeWidth={isNode1Solved && entrantOptimalAction === "A" ? 5 : 2.5}
              strokeDasharray={isNode1PrunedA ? "4,4" : undefined}
              opacity={isNode1PrunedA ? 0.35 : 1}
              filter={isNode1Solved && entrantOptimalAction === "A" ? "url(#glowGreen)" : undefined}
            />
            {/* Action Label */}
            <rect
              x="170"
              y="118"
              width="100"
              height="24"
              rx="6"
              fill="#0f172a"
              stroke={
                isNode1Solved && entrantOptimalAction === "A"
                  ? "#10b981"
                  : isNode1PrunedA
                  ? "#ef4444"
                  : "#334155"
              }
              strokeWidth="1.2"
              opacity={isNode1PrunedA ? 0.4 : 1}
            />
            <text
              x="220"
              y="134"
              textAnchor="middle"
              fill={isNode1Solved && entrantOptimalAction === "A" ? "#34d399" : "#f1f5f9"}
              fontSize="11"
              fontWeight="bold"
            >
              {preset.node1ActionA}
            </text>
            {/* Pruning Cross Mark */}
            {isNode1PrunedA && (
              <g transform="translate(220, 130)">
                <line x1="-12" y1="-8" x2="12" y2="8" stroke="#ef4444" strokeWidth="3" />
                <line x1="-12" y1="8" x2="12" y2="-8" stroke="#ef4444" strokeWidth="3" />
              </g>
            )}
          </g>

          {/* Branch 1B: Node 1 -> Terminal Stay Out */}
          <g>
            <path
              d="M 110 180 C 180 180, 220 270, 310 270 L 510 270"
              fill="none"
              stroke={
                isNode1Solved && entrantOptimalAction === "B"
                  ? "#10b981"
                  : isNode1PrunedB
                  ? "#ef4444"
                  : "#64748b"
              }
              strokeWidth={isNode1Solved && entrantOptimalAction === "B" ? 5 : 2.5}
              strokeDasharray={isNode1PrunedB ? "4,4" : undefined}
              opacity={isNode1PrunedB ? 0.35 : 1}
            />
            {/* Action Label */}
            <rect
              x="170"
              y="218"
              width="90"
              height="24"
              rx="6"
              fill="#0f172a"
              stroke={
                isNode1Solved && entrantOptimalAction === "B"
                  ? "#10b981"
                  : isNode1PrunedB
                  ? "#ef4444"
                  : "#334155"
              }
              strokeWidth="1.2"
              opacity={isNode1PrunedB ? 0.4 : 1}
            />
            <text
              x="215"
              y="234"
              textAnchor="middle"
              fill={isNode1Solved && entrantOptimalAction === "B" ? "#34d399" : "#f1f5f9"}
              fontSize="11"
              fontWeight="bold"
            >
              {preset.node1ActionB}
            </text>
            {/* Pruning Slash Marks if Pruned */}
            {isNode1PrunedB && (
              <g transform="translate(260, 255)">
                <line x1="-10" y1="-10" x2="10" y2="10" stroke="#ef4444" strokeWidth="3.5" />
                <line x1="-4" y1="-10" x2="16" y2="10" stroke="#ef4444" strokeWidth="3.5" />
                <text x="18" y="4" fill="#f87171" fontSize="10" fontWeight="bold">
                  Pruned (0 &lt; 2)
                </text>
              </g>
            )}
          </g>

          {/* Branch 2A: Node 2 -> Terminal Accommodate */}
          <g>
            <path
              d="M 330 100 C 400 100, 440 50, 520 50"
              fill="none"
              stroke={
                isNode2Solved && incumbentOptimalAction === "A"
                  ? "#10b981"
                  : isNode2PrunedA
                  ? "#ef4444"
                  : "#64748b"
              }
              strokeWidth={isNode2Solved && incumbentOptimalAction === "A" ? 5 : 2.5}
              strokeDasharray={isNode2PrunedA ? "4,4" : undefined}
              opacity={isNode2PrunedA ? 0.35 : 1}
              filter={isNode2Solved && incumbentOptimalAction === "A" ? "url(#glowGreen)" : undefined}
            />
            {/* Action Label */}
            <rect
              x="385"
              y="55"
              width="105"
              height="24"
              rx="6"
              fill="#0f172a"
              stroke={
                isNode2Solved && incumbentOptimalAction === "A"
                  ? "#10b981"
                  : isNode2PrunedA
                  ? "#ef4444"
                  : "#334155"
              }
              strokeWidth="1.2"
              opacity={isNode2PrunedA ? 0.4 : 1}
            />
            <text
              x="437"
              y="71"
              textAnchor="middle"
              fill={isNode2Solved && incumbentOptimalAction === "A" ? "#34d399" : "#f1f5f9"}
              fontSize="11"
              fontWeight="bold"
            >
              {preset.node2ActionA}
            </text>
            {/* Pruning if A is pruned */}
            {isNode2PrunedA && (
              <g transform="translate(437, 67)">
                <line x1="-10" y1="-8" x2="10" y2="8" stroke="#ef4444" strokeWidth="3" />
                <line x1="-10" y1="8" x2="10" y2="-8" stroke="#ef4444" strokeWidth="3" />
              </g>
            )}
          </g>

          {/* Branch 2B: Node 2 -> Terminal Fight */}
          <g>
            <path
              d="M 330 100 C 400 100, 440 150, 520 150"
              fill="none"
              stroke={
                isNode2Solved && incumbentOptimalAction === "B"
                  ? "#10b981"
                  : isNode2PrunedB
                  ? "#ef4444"
                  : "#64748b"
              }
              strokeWidth={isNode2Solved && incumbentOptimalAction === "B" ? 5 : 2.5}
              strokeDasharray={isNode2PrunedB ? "4,4" : undefined}
              opacity={isNode2PrunedB ? 0.35 : 1}
            />
            {/* Action Label */}
            <rect
              x="385"
              y="115"
              width="105"
              height="24"
              rx="6"
              fill="#0f172a"
              stroke={
                isNode2Solved && incumbentOptimalAction === "B"
                  ? "#10b981"
                  : isNode2PrunedB
                  ? "#ef4444"
                  : "#334155"
              }
              strokeWidth="1.2"
              opacity={isNode2PrunedB ? 0.4 : 1}
            />
            <text
              x="437"
              y="131"
              textAnchor="middle"
              fill={isNode2Solved && incumbentOptimalAction === "B" ? "#34d399" : "#f1f5f9"}
              fontSize="11"
              fontWeight="bold"
            >
              {preset.node2ActionB}
            </text>
            {/* Pruning Double Slashes if Fight is Pruned */}
            {isNode2PrunedB && (
              <g transform="translate(470, 142)">
                <line x1="-8" y1="-10" x2="8" y2="10" stroke="#ef4444" strokeWidth="3.5" />
                <line x1="-2" y1="-10" x2="14" y2="10" stroke="#ef4444" strokeWidth="3.5" />
                <text x="18" y="4" fill="#f87171" fontSize="10" fontWeight="bold">
                  Pruned (-1 &lt; 2)
                </text>
              </g>
            )}
          </g>

          {/* ========================================================
              DECISION NODES
             ======================================================== */}

          {/* Node 1: Entrant */}
          <g transform="translate(100, 180)" filter="url(#dropShadow)">
            <circle
              r="24"
              fill="url(#node1Gradient)"
              stroke="#60a5fa"
              strokeWidth="2.5"
            />
            <text
              textAnchor="middle"
              y="-32"
              fill="#93c5fd"
              fontSize="11"
              fontWeight="bold"
            >
              Node 1
            </text>
            <text
              textAnchor="middle"
              y="-18"
              fill="#ffffff"
              fontSize="11"
              fontWeight="extrabold"
            >
              {preset.player1.split(" ")[0]}
            </text>
            <text
              textAnchor="middle"
              y="5"
              fill="#ffffff"
              fontSize="13"
              fontWeight="bold"
            >
              N₁
            </text>
          </g>

          {/* Node 2: Incumbent */}
          <g transform="translate(325, 100)" filter="url(#dropShadow)">
            <circle
              r="24"
              fill="url(#node2Gradient)"
              stroke="#a5b4fc"
              strokeWidth="2.5"
            />
            <text
              textAnchor="middle"
              y="-32"
              fill="#c7d2fe"
              fontSize="11"
              fontWeight="bold"
            >
              Node 2 (Subgame)
            </text>
            <text
              textAnchor="middle"
              y="-18"
              fill="#ffffff"
              fontSize="11"
              fontWeight="extrabold"
            >
              {preset.player2.split(" ")[0]}
            </text>
            <text
              textAnchor="middle"
              y="5"
              fill="#ffffff"
              fontSize="13"
              fontWeight="bold"
            >
              N₂
            </text>

            {/* Continuation Value Bubble when Step >= 1 */}
            {isNode2Solved && (
              <g transform="translate(0, 36)">
                <rect
                  x="-42"
                  y="0"
                  width="84"
                  height="20"
                  rx="5"
                  fill="#1e1b4b"
                  stroke="#818cf8"
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="13"
                  textAnchor="middle"
                  fill="#c7d2fe"
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Continuation: ({node2ContinuationPayoff[0]}, {node2ContinuationPayoff[1]})
                </text>
              </g>
            )}
          </g>

          {/* ========================================================
              TERMINAL NODES & PAYOFF BOXES
             ======================================================== */}

          {/* Terminal 1: Accommodate Outcome */}
          <g transform="translate(530, 34)" filter="url(#dropShadow)">
            {/* SPNE Highlight Ring */}
            {isSpneHighlighted && incumbentOptimalAction === "A" && entrantOptimalAction === "A" && (
              <rect
                x="-8"
                y="-6"
                width="200"
                height="46"
                rx="10"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                filter="url(#glowGreen)"
              />
            )}
            <rect
              x="-4"
              y="-2"
              width="192"
              height="38"
              rx="8"
              fill="#0f172a"
              stroke={
                isSpneHighlighted && incumbentOptimalAction === "A" && entrantOptimalAction === "A"
                  ? "#10b981"
                  : "#334155"
              }
              strokeWidth="1.5"
            />
            {/* Terminal Bullet */}
            <circle cx="-16" cy="17" r="5" fill="#10b981" />

            {/* Payoff Numbers */}
            <text x="10" y="16" fill="#94a3b8" fontSize="10" fontWeight="bold">
              Payoff:
            </text>
            <text x="56" y="16" fill="#60a5fa" fontSize="12" fontWeight="extrabold" fontFamily="monospace">
              u₁ = {preset.payoffNode2A[0]}
            </text>
            <text x="102" y="16" fill="#94a3b8" fontSize="11">
              ,
            </text>
            <text x="112" y="16" fill="#34d399" fontSize="12" fontWeight="extrabold" fontFamily="monospace">
              u₂ = {preset.payoffNode2A[1]}
            </text>

            {/* SPNE Tag */}
            {incumbentOptimalAction === "A" && entrantOptimalAction === "A" && (
              <text x="10" y="30" fill="#34d399" fontSize="9" fontWeight="bold">
                ★ Unique SPNE Equilibrium
              </text>
            )}
          </g>

          {/* Terminal 2: Fight Outcome */}
          <g transform="translate(530, 134)" filter="url(#dropShadow)">
            <rect
              x="-4"
              y="-2"
              width="192"
              height="38"
              rx="8"
              fill="#0f172a"
              stroke={isNode2PrunedB ? "#ef4444" : "#334155"}
              strokeWidth="1.5"
              opacity={isNode2PrunedB ? 0.45 : 1}
            />
            <circle cx="-16" cy="17" r="5" fill={isNode2PrunedB ? "#ef4444" : "#64748b"} />

            <text x="10" y="16" fill="#94a3b8" fontSize="10" fontWeight="bold">
              Payoff:
            </text>
            <text x="56" y="16" fill="#60a5fa" fontSize="12" fontWeight="extrabold" fontFamily="monospace">
              u₁ = {preset.payoffNode2B[0]}
            </text>
            <text x="102" y="16" fill="#94a3b8" fontSize="11">
              ,
            </text>
            <text x="112" y="16" fill="#34d399" fontSize="12" fontWeight="extrabold" fontFamily="monospace">
              u₂ = {preset.payoffNode2B[1]}
            </text>

            <text x="10" y="30" fill="#f87171" fontSize="9" fontWeight="semibold">
              {isNode2PrunedB ? "Pruned: Non-credible threat" : "Price War Destructive Outcome"}
            </text>
          </g>

          {/* Terminal 3: Stay Out Outcome */}
          <g transform="translate(530, 254)" filter="url(#dropShadow)">
            {/* SPNE Highlight Ring if Stay Out is equilibrium */}
            {isSpneHighlighted && entrantOptimalAction === "B" && (
              <rect
                x="-8"
                y="-6"
                width="200"
                height="46"
                rx="10"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                filter="url(#glowGreen)"
              />
            )}
            <rect
              x="-4"
              y="-2"
              width="192"
              height="38"
              rx="8"
              fill="#0f172a"
              stroke={isNode1PrunedB ? "#ef4444" : "#334155"}
              strokeWidth="1.5"
              opacity={isNode1PrunedB ? 0.45 : 1}
            />
            <circle cx="-16" cy="17" r="5" fill={isNode1PrunedB ? "#ef4444" : "#64748b"} />

            <text x="10" y="16" fill="#94a3b8" fontSize="10" fontWeight="bold">
              Payoff:
            </text>
            <text x="56" y="16" fill="#60a5fa" fontSize="12" fontWeight="extrabold" fontFamily="monospace">
              u₁ = {preset.payoffNode1B[0]}
            </text>
            <text x="102" y="16" fill="#94a3b8" fontSize="11">
              ,
            </text>
            <text x="112" y="16" fill="#34d399" fontSize="12" fontWeight="extrabold" fontFamily="monospace">
              u₂ = {preset.payoffNode1B[1]}
            </text>

            <text x="10" y="30" fill="#94a3b8" fontSize="9" fontWeight="medium">
              Monopoly Preserved (No Entry)
            </text>
          </g>
        </svg>
      </div>

      {/* Step Explanation & Backward Induction Breakdown Card */}
      <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
          <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-mono">
              {step}
            </span>
            <span>
              {step === 0 && "Step 0: Initial Extensive-Form Game Tree (Forward Direction)"}
              {step === 1 && `Step 1: Solve Incumbent's Subgame at Node 2 (Backward Reasoning)`}
              {step === 2 && `Step 2: Fold Continuation Value to Entrant at Node 1`}
              {step === 3 && `Step 3: Unique Subgame Perfect Nash Equilibrium (SPNE)`}
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
              onClick={() => setStep(Math.min(3, step + 1))}
              disabled={step === 3}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
            >
              Next ▶
            </button>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
          {step === 0 && (
            <p>
              In sequential games, moves occur chronologically: <strong>{preset.player1}</strong> chooses first between <em>{preset.node1ActionA}</em> and <em>{preset.node1ActionB}</em>. If <em>{preset.node1ActionA}</em> is chosen, <strong>{preset.player2}</strong> observes this and selects between <em>{preset.node2ActionA}</em> and <em>{preset.node2ActionB}</em>.
            </p>
          )}

          {step === 1 && (
            <div className="space-y-1.5">
              <p>
                <strong>Backward Induction Rule 1:</strong> Always solve the terminal decision node first! At Node 2, {preset.player2} compares their own payoffs:
              </p>
              <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-xs text-indigo-950 space-y-1">
                <div>• u₂({preset.node2ActionA}) = <strong>{preset.payoffNode2A[1]}</strong></div>
                <div>• u₂({preset.node2ActionB}) = <strong>{preset.payoffNode2B[1]}</strong></div>
                <div className="text-emerald-700 font-bold">
                  {preset.payoffNode2A[1] > preset.payoffNode2B[1] ? (
                    `⇒ ${preset.payoffNode2A[1]} > ${preset.payoffNode2B[1]}: Rational choice is ${preset.node2ActionA}. We prune ${preset.node2ActionB}!`
                  ) : (
                    `⇒ ${preset.payoffNode2B[1]} > ${preset.payoffNode2A[1]}: Rational choice is ${preset.node2ActionB}. We prune ${preset.node2ActionA}!`
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Any pre-play threat to choose the pruned branch is <em>dynamically inconsistent</em> (cheap talk), because when the decision actually arrives, carrying out the threat harms the player.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-1.5">
              <p>
                <strong>Backward Induction Rule 2:</strong> Fold back the continuation payoff. {preset.player1} looks forward and knows that choosing <em>{preset.node1ActionA}</em> will trigger <em>{incumbentOptimalAction === "A" ? preset.node2ActionA : preset.node2ActionB}</em>, resulting in continuation payoff <strong>{entrantPayoffIfActionA}</strong>.
              </p>
              <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-xs text-blue-950 space-y-1">
                <div>• If {preset.node1ActionA}: u₁ = <strong>{entrantPayoffIfActionA}</strong> (anticipating Node 2 subgame reaction)</div>
                <div>• If {preset.node1ActionB}: u₁ = <strong>{entrantPayoffIfActionB}</strong></div>
                <div className="text-blue-700 font-bold">
                  {entrantPayoffIfActionA >= entrantPayoffIfActionB ? (
                    `⇒ ${entrantPayoffIfActionA} > ${entrantPayoffIfActionB}: Rational choice is ${preset.node1ActionA}. Pruning ${preset.node1ActionB}!`
                  ) : (
                    `⇒ ${entrantPayoffIfActionB} > ${entrantPayoffIfActionA}: Rational choice is ${preset.node1ActionB}. Pruning ${preset.node1ActionA}!`
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 text-xs sm:text-sm">
                <strong>Subgame Perfect Nash Equilibrium (SPNE): </strong>
                <span className="font-mono font-bold">
                  ({entrantOptimalAction === "A" ? preset.node1ActionA : preset.node1ActionB}, {incumbentOptimalAction === "A" ? preset.node2ActionA : preset.node2ActionB})
                </span>
                <span className="ml-2 font-mono text-emerald-800">
                  yielding Payoffs ({entrantOptimalAction === "A" ? (incumbentOptimalAction === "A" ? preset.payoffNode2A[0] : preset.payoffNode2B[0]) : preset.payoffNode1B[0]}, {entrantOptimalAction === "A" ? (incumbentOptimalAction === "A" ? preset.payoffNode2A[1] : preset.payoffNode2B[1]) : preset.payoffNode1B[1]}) {preset.unit}
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium bg-white p-3 rounded border border-slate-200">
                <strong>Executive Takeaway: </strong>{preset.executiveTakeaway}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* TikZ Code Modal */}
      {showTikzModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">LaTeX TikZ Game Tree Generator</h4>
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
