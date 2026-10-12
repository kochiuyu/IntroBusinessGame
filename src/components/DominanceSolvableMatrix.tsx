import React, { useState, useMemo } from "react";

export interface MatrixPreset {
  id: string;
  name: string;
  badge: string;
  isDominanceSolvable: boolean;
  player1: string;
  player2: string;
  p1Actions: string[];
  p2Actions: string[];
  // payoffs[row][col] = [u1, u2]
  payoffs: [number, number][][];
  unit: string;
  description: string;
  // Step-by-step elimination sequence
  eliminationSteps: {
    target: "row" | "col";
    index: number;
    actionName: string;
    dominatedBy: string;
    explanation: string;
  }[];
  equilibriumExplanation: string;
}

const MATRIX_PRESETS: MatrixPreset[] = [
  {
    id: "classic_3x3",
    name: "Classic 3×3 Dominance Solvable Competition",
    badge: "Core Lecture Model",
    isDominanceSolvable: true,
    player1: "Alpha Corp (Row)",
    player2: "Beta Tech (Column)",
    p1Actions: ["High R&D (Top)", "Med R&D (Mid)", "Low R&D (Low)"],
    p2Actions: ["Aggressive (L)", "Balanced (C)", "Passive (R)"],
    unit: "$M Net Profit",
    description: "Both firms decide annual strategic R&D and market posture simultaneously. Through iterated elimination, unviable options vanish until a single equilibrium emerges.",
    payoffs: [
      // Top: High R&D
      [[7, 3], [8, 7], [10, 4]],
      // Mid: Med R&D
      [[5, 4], [6, 5], [9, 2]],
      // Low: Low R&D
      [[2, 5], [3, 6], [4, 1]]
    ],
    eliminationSteps: [
      {
        target: "row",
        index: 2,
        actionName: "Low R&D (Low)",
        dominatedBy: "High R&D (Top)",
        explanation: "Round 1 (Player 1): Compare 'Low R&D' to 'High R&D'. Against Aggressive: 2 < 7; against Balanced: 3 < 8; against Passive: 4 < 10. 'Low R&D' is strictly dominated across every possible move of Beta Tech and is eliminated!"
      },
      {
        target: "col",
        index: 2,
        actionName: "Passive (R)",
        dominatedBy: "Balanced (C)",
        explanation: "Round 2 (Player 2): Knowing rational Alpha will never play Low R&D, Beta evaluates remaining rows [Top, Mid]. Compare Passive to Balanced: on Top, 4 < 7; on Mid, 2 < 5. 'Passive' is strictly dominated and eliminated!"
      },
      {
        target: "row",
        index: 1,
        actionName: "Med R&D (Mid)",
        dominatedBy: "High R&D (Top)",
        explanation: "Round 3 (Player 1): On remaining columns [Aggressive, Balanced], compare Med R&D to High R&D: against Aggressive, 5 < 7; against Balanced, 6 < 8. 'Med R&D' is strictly dominated and eliminated!"
      },
      {
        target: "col",
        index: 0,
        actionName: "Aggressive (L)",
        dominatedBy: "Balanced (C)",
        explanation: "Round 4 (Player 2): Only Row 'High R&D' survives. Beta compares Aggressive (payoff 3) vs. Balanced (payoff 7). Since 3 < 7, 'Aggressive' is eliminated!"
      }
    ],
    equilibriumExplanation: "The game is Dominance Solvable! Iterated Elimination of Strictly Dominated Strategies (IESDS) reduces the strategy space to the unique profile (High R&D, Balanced) with payoffs ($8M, $7M). Neither player needs to guess or coordinate—rationality alone guarantees this outcome."
  },
  {
    id: "keynote_dates",
    name: "The Secret Keynote Dates (Week 3 Story)",
    badge: "Anti-Coordination Game",
    isDominanceSolvable: false,
    player1: "Alpha Phone",
    player2: "Beta Mobile",
    p1Actions: ["September Launch", "October Launch"],
    p2Actions: ["September Launch", "October Launch"],
    unit: "$M Ad Revenue",
    description: "Two smartphone makers schedule flagship launch events without knowing the rival's secret date. Launching in the same month splits media attention; launching in different months lets the solo firm own the news cycle.",
    payoffs: [
      [[40, 40], [80, 50]],
      [[50, 80], [35, 35]]
    ],
    eliminationSteps: [],
    equilibriumExplanation: "Notice that NO strategy is dominated: If Beta picks September, Alpha prefers October (80 > 40); if Beta picks October, Alpha prefers September (80 > 35). This game is NOT dominance solvable. Instead, it possesses TWO Pure Strategy Nash Equilibria: (September, October) and (October, September)."
  },
  {
    id: "advertising_arms_race",
    name: "Advertising Budget War (Prisoner's Dilemma)",
    badge: "Dominant Strategy Game",
    isDominanceSolvable: true,
    player1: "Brand 1",
    player2: "Brand 2",
    p1Actions: ["Heavy Advertising", "Moderate Advertising"],
    p2Actions: ["Heavy Advertising", "Moderate Advertising"],
    unit: "$M Net Margin",
    description: "Both brands decide advertising budgets. Heavy advertising steals market share from a moderate rival, but when both advertise heavily, expensive ad spend erodes profits.",
    payoffs: [
      [[25, 25], [70, 10]],
      [[10, 70], [50, 50]]
    ],
    eliminationSteps: [
      {
        target: "row",
        index: 1,
        actionName: "Moderate Advertising",
        dominatedBy: "Heavy Advertising",
        explanation: "Round 1 (Player 1): 'Heavy Advertising' is strictly dominant! If Brand 2 advertises heavily, 25 > 10 (+15). If Brand 2 advertises moderately, 70 > 50 (+20). 'Moderate Advertising' is strictly dominated and eliminated!"
      },
      {
        target: "col",
        index: 1,
        actionName: "Moderate Advertising",
        dominatedBy: "Heavy Advertising",
        explanation: "Round 1 (Player 2): Symmetric dominance! For Brand 2, 'Heavy Advertising' strictly dominates 'Moderate Advertising' (25 > 10 and 70 > 50). 'Moderate Advertising' is eliminated!"
      }
    ],
    equilibriumExplanation: "The game is strictly dominance solvable in a single round! Both firms have a strictly dominant strategy to advertise heavily. The unique Nash equilibrium is (Heavy, Heavy) yielding ($25M, $25M), even though both would prefer (Moderate, Moderate) yielding ($50M, $50M)."
  },
  {
    id: "product_positioning",
    name: "Product Positioning Duopoly (Hotelling)",
    badge: "Spatial Competition",
    isDominanceSolvable: true,
    player1: "Firm A (Design)",
    player2: "Firm B (Design)",
    p1Actions: ["Budget Tier (Left)", "Mainstream (Center)", "Luxury Tier (Right)"],
    p2Actions: ["Budget Tier (Left)", "Mainstream (Center)", "Luxury Tier (Right)"],
    unit: "% Market Share",
    description: "Two consumer brands position product specifications along a customer preference spectrum. Centering captures broad middle appeal while flanking risks losing the opposite flank.",
    payoffs: [
      [[50, 50], [25, 75], [30, 70]],
      [[75, 25], [50, 50], [75, 25]],
      [[70, 30], [25, 75], [50, 50]]
    ],
    eliminationSteps: [
      {
        target: "row",
        index: 0,
        actionName: "Budget Tier (Left)",
        dominatedBy: "Mainstream (Center)",
        explanation: "Round 1: For Firm A, 'Budget Tier' is strictly dominated by 'Mainstream' (25 < 75 vs. Budget, 25 < 50 vs. Center, 30 < 75 vs. Luxury)."
      },
      {
        target: "row",
        index: 2,
        actionName: "Luxury Tier (Right)",
        dominatedBy: "Mainstream (Center)",
        explanation: "Round 1: Similarly, 'Luxury Tier' is strictly dominated by 'Mainstream' (70 < 75, 25 < 50, 50 < 75). Eliminated!"
      },
      {
        target: "col",
        index: 0,
        actionName: "Budget Tier (Left)",
        dominatedBy: "Mainstream (Center)",
        explanation: "Round 2: For Firm B, facing Mainstream only, choosing Budget gives 25 vs. Center gives 50. Eliminated!"
      },
      {
        target: "col",
        index: 2,
        actionName: "Luxury Tier (Right)",
        dominatedBy: "Mainstream (Center)",
        explanation: "Round 2: Choosing Luxury gives 25 vs. Center gives 50. Eliminated!"
      }
    ],
    equilibriumExplanation: "Dominance Solvable! Survives only (Mainstream, Mainstream) with 50-50 market share. This explains why competing brands often gravitate to virtually identical middle-of-the-road product designs (Hotelling's Law)."
  }
];

export const DominanceSolvableMatrix: React.FC<{
  initialPresetId?: string;
}> = ({ initialPresetId = "classic_3x3" }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialPresetId);
  const [eliminationStep, setEliminationStep] = useState<number>(0);
  const [analysisMode, setAnalysisMode] = useState<"iesds" | "best_response">("iesds");
  const [showTikzModal, setShowTikzModal] = useState<boolean>(false);
  const [copiedTikz, setCopiedTikz] = useState<boolean>(false);

  const preset = MATRIX_PRESETS.find(p => p.id === selectedPresetId) || MATRIX_PRESETS[0];

  // Which rows and columns are currently eliminated in IESDS mode
  const { eliminatedRows, eliminatedCols } = useMemo(() => {
    const rows = new Set<number>();
    const cols = new Set<number>();

    for (let i = 0; i < eliminationStep && i < preset.eliminationSteps.length; i++) {
      const stepInfo = preset.eliminationSteps[i];
      if (stepInfo.target === "row") {
        rows.add(stepInfo.index);
      } else {
        cols.add(stepInfo.index);
      }
    }

    return { eliminatedRows: rows, eliminatedCols: cols };
  }, [eliminationStep, preset]);

  // Best responses calculation across all active cells
  const bestResponses = useMemo(() => {
    const numRows = preset.p1Actions.length;
    const numCols = preset.p2Actions.length;

    // br1[row][col]: is row Player 1's best response to this col?
    const br1: boolean[][] = Array.from({ length: numRows }, () => Array(numCols).fill(false));
    // br2[row][col]: is col Player 2's best response to this row?
    const br2: boolean[][] = Array.from({ length: numRows }, () => Array(numCols).fill(false));

    // For each column, find max Player 1 payoff among non-eliminated rows
    for (let c = 0; c < numCols; c++) {
      let maxP1 = -Infinity;
      for (let r = 0; r < numRows; r++) {
        if (!eliminatedRows.has(r)) {
          if (preset.payoffs[r][c][0] > maxP1) {
            maxP1 = preset.payoffs[r][c][0];
          }
        }
      }
      for (let r = 0; r < numRows; r++) {
        if (!eliminatedRows.has(r) && preset.payoffs[r][c][0] === maxP1) {
          br1[r][c] = true;
        }
      }
    }

    // For each row, find max Player 2 payoff among non-eliminated cols
    for (let r = 0; r < numRows; r++) {
      let maxP2 = -Infinity;
      for (let c = 0; c < numCols; c++) {
        if (!eliminatedCols.has(c)) {
          if (preset.payoffs[r][c][1] > maxP2) {
            maxP2 = preset.payoffs[r][c][1];
          }
        }
      }
      for (let c = 0; c < numCols; c++) {
        if (!eliminatedCols.has(c) && preset.payoffs[r][c][1] === maxP2) {
          br2[r][c] = true;
        }
      }
    }

    // Find pure strategy Nash equilibria: cells where both br1 and br2 are true
    const nashEquilibria: [number, number][] = [];
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (!eliminatedRows.has(r) && !eliminatedCols.has(c)) {
          if (br1[r][c] && br2[r][c]) {
            nashEquilibria.push([r, c]);
          }
        }
      }
    }

    return { br1, br2, nashEquilibria };
  }, [preset, eliminatedRows, eliminatedCols]);

  const isFullySolved = eliminationStep >= preset.eliminationSteps.length;
  const currentStepNote = preset.eliminationSteps[eliminationStep - 1];

  // Generate TikZ / LaTeX Code
  const tikzCode = `% LaTeX TikZ Normal Form Payoff Matrix
% ${preset.name}
\\documentclass{standalone}
\\usepackage{tikz}
\\usepackage{xcolor}

\\begin{document}
\\begin{tikzpicture}
  % Matrix definition for ${preset.player1} vs ${preset.player2}
  \\matrix [matrix of nodes, nodes in empty cells,
    column 1/.style={nodes={align=right, font=\\small\\bfseries}},
    row 1/.style={nodes={align=center, font=\\small\\bfseries}}
  ] (M) {
    & ${preset.p2Actions.join(" & ")} \\\\
${preset.p1Actions.map((rowName, r) => 
  `    ${rowName} & ${preset.p2Actions.map((_, c) => 
    `\\textcolor{blue}{${preset.payoffs[r][c][0]}}, \\textcolor{teal}{${preset.payoffs[r][c][1]}}`
  ).join(" & ")} \\\\`
).join("\n")}
  };
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
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
              Interactive Normal-Form Payoff Matrix
            </span>
            <span className="px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-semibold rounded">
              {preset.badge}
            </span>
            {preset.isDominanceSolvable && (
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold rounded">
                ✓ Dominance Solvable
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
            {preset.name}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
            {preset.description}
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <select
            value={selectedPresetId}
            onChange={(e) => {
              setSelectedPresetId(e.target.value);
              setEliminationStep(0);
            }}
            className="text-xs bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
          >
            {MATRIX_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowTikzModal(true)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-colors"
            title="View LaTeX code"
          >
            <span>📐</span> LaTeX
          </button>
        </div>
      </div>

      {/* Mode Selector & Action Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3">
        {/* Method Mode Selector */}
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setAnalysisMode("iesds")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              analysisMode === "iesds"
                ? "bg-blue-800 text-white shadow-2xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>✂️</span> 1. Iterated Elimination (IESDS)
          </button>
          <button
            onClick={() => setAnalysisMode("best_response")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              analysisMode === "best_response"
                ? "bg-emerald-800 text-white shadow-2xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>🎯</span> 2. Best-Response (Nash Intersection)
          </button>
        </div>

        {/* IESDS Stepper Controls */}
        {analysisMode === "iesds" && preset.eliminationSteps.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <button
              onClick={() => setEliminationStep(0)}
              disabled={eliminationStep === 0}
              className="px-2.5 py-1 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ⏮ Reset
            </button>
            <button
              onClick={() => setEliminationStep(Math.max(0, eliminationStep - 1))}
              disabled={eliminationStep === 0}
              className="px-2.5 py-1 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ◀ Step Back
            </button>
            <button
              onClick={() => setEliminationStep(Math.min(preset.eliminationSteps.length, eliminationStep + 1))}
              disabled={isFullySolved}
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
            >
              {isFullySolved ? "✓ All Dominated Eliminated" : `Eliminate Step (${eliminationStep + 1}/${preset.eliminationSteps.length}) ▶`}
            </button>
            <button
              onClick={() => setEliminationStep(preset.eliminationSteps.length)}
              disabled={isFullySolved}
              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
            >
              ⚡ Auto-Solve
            </button>
          </div>
        )}

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

      {/* Main Matrix Visualizer */}
      <div className="p-4 sm:p-6 bg-slate-900 overflow-x-auto flex flex-col items-center justify-center">
        <div className="inline-block min-w-[520px] max-w-2xl w-full">
          {/* Column Player Header Bar */}
          <div className="text-center pb-2">
            <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Column Player: {preset.player2}
            </span>
          </div>

          <table className="w-full border-collapse select-none">
            <thead>
              <tr>
                {/* Top-Left Diagonal Header */}
                <th className="p-3 w-40 bg-slate-800/80 border border-slate-700 text-left align-bottom">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                    <span className="text-blue-400 font-bold">{preset.player1.split(" ")[0]}</span> ↓ \ <span className="text-emerald-400 font-bold">{preset.player2.split(" ")[0]}</span> →
                  </div>
                </th>
                {preset.p2Actions.map((colName, colIdx) => {
                  const isColEliminated = eliminatedCols.has(colIdx);
                  return (
                    <th
                      key={colIdx}
                      className={`p-3 text-center border border-slate-700 font-bold text-xs transition-all relative ${
                        isColEliminated
                          ? "bg-slate-900/60 text-slate-500 opacity-40"
                          : "bg-slate-800 text-slate-100"
                      }`}
                    >
                      <div>{colName}</div>
                      {isColEliminated && (
                        <span className="absolute top-1 right-1 text-[9px] px-1 py-0.2 bg-red-950 text-red-400 border border-red-800 rounded">
                          Eliminated
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {preset.p1Actions.map((rowName, rowIdx) => {
                const isRowEliminated = eliminatedRows.has(rowIdx);

                return (
                  <tr key={rowIdx}>
                    {/* Row Header */}
                    <td
                      className={`p-3 border border-slate-700 font-bold text-xs transition-all relative ${
                        isRowEliminated
                          ? "bg-slate-900/60 text-slate-500 opacity-40"
                          : "bg-slate-800 text-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{rowName}</span>
                        {isRowEliminated && (
                          <span className="text-[9px] px-1 py-0.2 bg-red-950 text-red-400 border border-red-800 rounded">
                            Eliminated
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Payoff Cells */}
                    {preset.p2Actions.map((_, colIdx) => {
                      const isColEliminated = eliminatedCols.has(colIdx);
                      const isCellEliminated = isRowEliminated || isColEliminated;
                      const isNash = bestResponses.nashEquilibria.some(([r, c]) => r === rowIdx && c === colIdx);
                      const isP1Best = bestResponses.br1[rowIdx][colIdx];
                      const isP2Best = bestResponses.br2[rowIdx][colIdx];

                      const [u1, u2] = preset.payoffs[rowIdx][colIdx];

                      return (
                        <td
                          key={colIdx}
                          className={`p-4 border text-center transition-all relative ${
                            isCellEliminated
                              ? "bg-slate-950/80 border-slate-800 opacity-30"
                              : isNash
                              ? "bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-400/80 shadow-lg"
                              : "bg-slate-900/90 border-slate-700 hover:bg-slate-800/80"
                          }`}
                        >
                          {/* Strikethrough line if cell eliminated */}
                          {isCellEliminated && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-full border-t-2 border-red-600/70 rotate-[-12deg]"></div>
                            </div>
                          )}

                          {/* Payoff Numbers */}
                          <div className="flex items-center justify-center gap-2 font-mono text-sm sm:text-base font-bold">
                            {/* Player 1 Payoff */}
                            <span
                              className={`relative px-1 py-0.5 rounded ${
                                isP1Best && analysisMode === "best_response" && !isCellEliminated
                                  ? "bg-blue-900/70 text-blue-300 font-extrabold underline decoration-blue-400 decoration-2"
                                  : "text-blue-400"
                              }`}
                            >
                              {u1}
                              {isP1Best && analysisMode === "best_response" && !isCellEliminated && (
                                <span className="text-[10px] ml-0.5 text-blue-300" title="Player 1 Best Response">★</span>
                              )}
                            </span>

                            <span className="text-slate-500">,</span>

                            {/* Player 2 Payoff */}
                            <span
                              className={`relative px-1 py-0.5 rounded ${
                                isP2Best && analysisMode === "best_response" && !isCellEliminated
                                  ? "bg-emerald-900/70 text-emerald-300 font-extrabold underline decoration-emerald-400 decoration-2"
                                  : "text-emerald-400"
                              }`}
                            >
                              {u2}
                              {isP2Best && analysisMode === "best_response" && !isCellEliminated && (
                                <span className="text-[10px] ml-0.5 text-emerald-300" title="Player 2 Best Response">★</span>
                              )}
                            </span>
                          </div>

                          {/* Unit / Badge */}
                          <div className="text-[9px] text-slate-400 mt-1">
                            {preset.unit}
                          </div>

                          {/* Nash Equilibrium Indicator */}
                          {isNash && !isCellEliminated && (
                            <div className="mt-1.5 inline-block px-1.5 py-0.5 bg-emerald-500 text-slate-950 font-bold text-[9px] rounded-full uppercase tracking-wider animate-pulse">
                              ★ Nash Equilibrium
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Row Player Label on bottom */}
          <div className="text-left pt-2">
            <span className="px-3 py-1 bg-blue-950 text-blue-300 border border-blue-800 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Row Player: {preset.player1}
            </span>
          </div>
        </div>
      </div>

      {/* Narrative & Step Explanation Panel */}
      <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
        {analysisMode === "iesds" ? (
          <div>
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2 mb-2">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-mono">
                  {eliminationStep}
                </span>
                <span>
                  {eliminationStep === 0
                    ? "Initial Step: Full Payoff Matrix (No Eliminations Yet)"
                    : `Elimination Round ${eliminationStep}: Pruning ${currentStepNote?.actionName}`}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 font-mono">
                {eliminationStep} of {preset.eliminationSteps.length} rounds completed
              </span>
            </div>

            {eliminationStep === 0 ? (
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Click <strong>"Eliminate Next Dominated Strategy ▶"</strong> to step through the iterated elimination of strictly dominated strategies (IESDS). Notice how rational players rule out inferior actions, simplifying the matrix step-by-step.
              </p>
            ) : (
              <div className="space-y-2 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <div className="font-bold text-blue-950 mb-1">
                    {currentStepNote?.explanation}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Strict Dominance Axiom: A rational player NEVER chooses an action that yields strictly lower payoff than another action across all opposing moves.
                  </div>
                </div>

                {isFullySolved && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950">
                    <strong className="block text-emerald-900 font-bold mb-1">
                      ★ Dominance Solvability Reached:
                    </strong>
                    <p className="text-xs leading-relaxed">
                      {preset.equilibriumExplanation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span>🎯</span> Best-Response Underline Analysis (Nash's Method)
              </div>
              <span className="text-[11px] font-bold text-emerald-700">
                Found {bestResponses.nashEquilibria.length} Pure Strategy Nash Equilibria
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              In simultaneous-move games, underline each player's highest payoff in each row or column:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="bg-white p-2.5 rounded border border-blue-200 space-y-1">
                <strong className="text-blue-900 block">Row Player ({preset.player1})</strong>
                <p className="text-slate-600 text-[11px]">
                  For every column Beta could pick, find Alpha's highest blue number (marked with ★).
                </p>
              </div>
              <div className="bg-white p-2.5 rounded border border-emerald-200 space-y-1">
                <strong className="text-emerald-900 block">Column Player ({preset.player2})</strong>
                <p className="text-slate-600 text-[11px]">
                  For every row Alpha could pick, find Beta's highest green number (marked with ★).
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-900 text-slate-100 rounded-lg text-xs font-medium">
              <strong>Equilibrium Rule: </strong>
              Any cell where BOTH payoffs are best responses (both have ★) is a <strong>Pure Strategy Nash Equilibrium</strong>. Neither player has any incentive to unilaterally defect.
            </div>
          </div>
        )}
      </div>

      {/* LaTeX TikZ Modal */}
      {showTikzModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">LaTeX Payoff Matrix Generator</h4>
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
                  {copiedTikz ? "✓ Copied!" : "Copy LaTeX"}
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
