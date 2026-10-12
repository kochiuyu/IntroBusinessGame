import React, { useState, useMemo } from "react";

export interface MixedStrategyPreset {
  id: string;
  name: string;
  badge: string;
  player1: string;
  player2: string;
  p1Action1: string;
  p1Action2: string;
  p2Action1: string;
  p2Action2: string;
  // payoffs: [row][col] = [u1, u2]
  // row 0: Action 1, row 1: Action 2
  // col 0: Action 1, col 1: Action 2
  payoffs: [ [number, number], [number, number] ][];
  unit: string;
  description: string;
  puzzleNote: string;
  intuitiveReason: string;
}

const MIXED_PRESETS: MixedStrategyPreset[] = [
  {
    id: "coffee_chain",
    name: "Coffee Chain Promotion Timing (Monday vs. Wednesday)",
    badge: "Official Lecture Case",
    player1: "Coffee Chain",
    player2: "Rival Chain",
    p1Action1: "Promote Monday",
    p1Action2: "Promote Wednesday",
    p2Action1: "Defend Monday",
    p2Action2: "Defend Wednesday",
    payoffs: [
      [[3, 3], [6, 0]],
      [[5, 1], [3, 2]]
    ],
    unit: "$M Profit",
    description: "Monday has double the foot-traffic, but preparing a defense is fixed and costly. If the rival defends Monday, promoting Wednesday yields uncountered sales.",
    puzzleNote: "Why promote on Wednesday 75% of the time when Monday has vastly more customers?",
    intuitiveReason: "Because Monday is high-value, the rival guards it 60% of the time. Running into a defended Monday yields lower net payoff; exploiting the undefended Wednesday flank 75% of the time maximizes expected profit!"
  },
  {
    id: "penalty_kick",
    name: "Soccer Penalty Kick (Striker vs. Goalkeeper)",
    badge: "Sports Economics",
    player1: "Striker",
    player2: "Goalkeeper",
    p1Action1: "Kick Left",
    p1Action2: "Kick Right",
    p2Action1: "Dive Left",
    p2Action2: "Dive Right",
    payoffs: [
      [[55, 45], [90, 10]],
      [[95, 5], [60, 40]]
    ],
    unit: "% Score Prob",
    description: "The striker kicks Left or Right; the goalkeeper dives Left or Right. If the goalie guesses correctly, save probability jumps dramatically.",
    puzzleNote: "Why don't professional strikers always kick to their stronger natural side?",
    intuitiveReason: "If a right-footed striker kicks Left 100% of the time, the goalkeeper dives Left 100% of the time. Mixing creates strategic uncertainty, keeping the goalie guessing."
  },
  {
    id: "tax_audit",
    name: "Tax Compliance & Corporate Audit Game",
    badge: "Regulatory Enforcement",
    player1: "Taxpayer / Corp",
    player2: "Tax Authority",
    p1Action1: "Declare Honestly",
    p1Action2: "Under-report / Evade",
    p2Action1: "Conduct Deep Audit",
    p2Action2: "No Audit",
    payoffs: [
      [[10, -2], [10, 0]],
      [[-5, 8], [15, -1]]
    ],
    unit: "$k Net Utility",
    description: "A corporation decides whether to declare honestly or evade taxes. Auditing requires expensive investigator resources; if nobody evades, audits waste budget.",
    puzzleNote: "Why cannot tax authorities either audit everyone or audit nobody?",
    intuitiveReason: "If audits are guaranteed (q=1), all firms comply. But if all firms comply, audits waste money, so audits drop to 0. But if audits drop to 0, everyone evades! Strategic randomization is the only resting state."
  },
  {
    id: "matching_pennies",
    name: "Matching Pennies (Zero-Sum Antagonism)",
    badge: "Game Theory Classic",
    player1: "Player 1 (Matcher)",
    player2: "Player 2 (Mismatcher)",
    p1Action1: "Heads",
    p1Action2: "Tails",
    p2Action1: "Heads",
    p2Action2: "Tails",
    payoffs: [
      [[1, -1], [-1, 1]],
      [[-1, 1], [1, -1]]
    ],
    unit: "Payoff Points",
    description: "Player 1 wins if coins match; Player 2 wins if coins differ. Pure conflict with zero overlap of interests.",
    puzzleNote: "Pure symmetric conflict where any predictability guarantees defeat.",
    intuitiveReason: "Both players must randomize exactly 50/50. Any slight bias toward Heads or Tails is instantly exploited by the opponent."
  }
];

export const MixedStrategyVisualizer: React.FC<{
  initialPresetId?: string;
}> = ({ initialPresetId = "coffee_chain" }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialPresetId);
  const [activeTab, setActiveTab] = useState<"visualizer" | "indifference_proof">("visualizer");
  const [showTikzModal, setShowTikzModal] = useState<boolean>(false);
  const [copiedTikz, setCopiedTikz] = useState<boolean>(false);

  const preset = MIXED_PRESETS.find(p => p.id === selectedPresetId) || MIXED_PRESETS[0];

  // Payoff constants
  // Player 1 payoffs:
  // a11: u1(A1, B1), a12: u1(A1, B2)
  // a21: u1(A2, B1), a22: u1(A2, B2)
  const a11 = preset.payoffs[0][0][0];
  const a12 = preset.payoffs[0][1][0];
  const a21 = preset.payoffs[1][0][0];
  const a22 = preset.payoffs[1][1][0];

  // Player 2 payoffs:
  // b11: u2(A1, B1), b12: u2(A1, B2)
  // b21: u2(A2, B1), b22: u2(A2, B2)
  const b11 = preset.payoffs[0][0][1];
  const b12 = preset.payoffs[0][1][1];
  const b21 = preset.payoffs[1][0][1];
  const b22 = preset.payoffs[1][1][1];

  // Equilibrium probabilities calculation
  // Player 1 chooses p to make Player 2 indifferent:
  // E[u2(B1)] = p*b11 + (1-p)*b21
  // E[u2(B2)] = p*b12 + (1-p)*b22
  // p*(b11 - b12) + (1-p)*(b21 - b22) = 0
  // p*(b11 - b12 - b21 + b22) = b22 - b21
  // p* = (b22 - b21) / [ (b11 - b12) - (b21 - b22) ]
  const denomP = (b11 - b12) - (b21 - b22);
  const pStar = denomP !== 0 ? Math.max(0, Math.min(1, (b22 - b21) / denomP)) : 0.5;

  // Player 2 chooses q to make Player 1 indifferent:
  // E[u1(A1)] = q*a11 + (1-q)*a12
  // E[u1(A2)] = q*a21 + (1-q)*a22
  // q*(a11 - a21) + (1-q)*(a12 - a22) = 0
  // q* = (a22 - a12) / [ (a11 - a21) - (a12 - a22) ]
  const denomQ = (a11 - a21) - (a12 - a22);
  const qStar = denomQ !== 0 ? Math.max(0, Math.min(1, (a22 - a12) / denomQ)) : 0.5;

  // Sliders state
  const [sliderP, setSliderP] = useState<number>(pStar);
  const [sliderQ, setSliderQ] = useState<number>(qStar);

  // Sync sliders when preset changes
  const handleSelectPreset = (newId: string) => {
    setSelectedPresetId(newId);
    const newPreset = MIXED_PRESETS.find(p => p.id === newId) || MIXED_PRESETS[0];
    const n_a11 = newPreset.payoffs[0][0][0];
    const n_a12 = newPreset.payoffs[0][1][0];
    const n_a21 = newPreset.payoffs[1][0][0];
    const n_a22 = newPreset.payoffs[1][1][0];
    const n_b11 = newPreset.payoffs[0][0][1];
    const n_b12 = newPreset.payoffs[0][1][1];
    const n_b21 = newPreset.payoffs[1][0][1];
    const n_b22 = newPreset.payoffs[1][1][1];
    const dP = (n_b11 - n_b12) - (n_b21 - n_b22);
    const nP = dP !== 0 ? Math.max(0, Math.min(1, (n_b22 - n_b21) / dP)) : 0.5;
    const dQ = (n_a11 - n_a21) - (n_a12 - n_a22);
    const nQ = dQ !== 0 ? Math.max(0, Math.min(1, (n_a22 - n_a12) / dQ)) : 0.5;
    setSliderP(nP);
    setSliderQ(nQ);
  };

  // Expected payoffs given current slider values
  const p = sliderP;
  const q = sliderQ;

  // Expected payoff of Player 1 from playing Action 1 vs Action 2 given q
  const expU1_A1 = q * a11 + (1 - q) * a12;
  const expU1_A2 = q * a21 + (1 - q) * a22;
  const expU1_Total = p * expU1_A1 + (1 - p) * expU1_A2;

  // Expected payoff of Player 2 from playing Action 1 vs Action 2 given p
  const expU2_B1 = p * b11 + (1 - p) * b21;
  const expU2_B2 = p * b12 + (1 - p) * b22;
  const expU2_Total = q * expU2_B1 + (1 - q) * expU2_B2;

  // Is at equilibrium within tolerance?
  const isAtEquilibrium = Math.abs(sliderP - pStar) < 0.03 && Math.abs(sliderQ - qStar) < 0.03;

  // Equilibrium expected payoffs
  const eqU1 = qStar * a11 + (1 - qStar) * a12;
  const eqU2 = pStar * b11 + (1 - pStar) * b21;

  const tikzCode = `% LaTeX TikZ Mixed Strategy Best-Response Graph
% ${preset.name}
\\documentclass{standalone}
\\usepackage{tikz}

\\begin{document}
\\begin{tikzpicture}[scale=4]
  % Axes: q (horizontal, [0, 1]) and p (vertical, [0, 1])
  \\draw[->, thick] (0, 0) -- (1.1, 0) node[right] {$q$ (Rival Prob)};
  \\draw[->, thick] (0, 0) -- (0, 1.1) node[above] {$p$ (Chain Prob)};

  % Equilibrium intersection point
  \\coordinate (MSNE) at (${qStar.toFixed(2)}, ${pStar.toFixed(2)});

  % Player 1 Best Response Correspondence
  \\draw[blue!80, line width=1.5pt] (0, 1) -- (${qStar.toFixed(2)}, 1) -- (${qStar.toFixed(2)}, 0) -- (1, 0);

  % Player 2 Best Response Correspondence
  \\draw[emerald!80!black, line width=1.5pt] (0, 0) -- (0, ${pStar.toFixed(2)}) -- (1, ${pStar.toFixed(2)}) -- (1, 1);

  % Nash Equilibrium marker
  \\fill[red] (MSNE) circle (0.02) node[above right] {MSNE ($q^*=${qStar.toFixed(2)}, $p^*=${pStar.toFixed(2)})};
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
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
              Interactive Mixed Strategy Visualizer & Indifference Engine
            </span>
            <span className="px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-semibold rounded">
              {preset.badge}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
            {preset.name}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5 max-w-xl leading-relaxed">
            {preset.description}
          </p>
        </div>

        {/* Preset Selector & LaTeX */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <select
            value={selectedPresetId}
            onChange={(e) => handleSelectPreset(e.target.value)}
            className="text-xs bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
          >
            {MIXED_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowTikzModal(true)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-colors"
          >
            <span>📐</span> LaTeX
          </button>
        </div>
      </div>

      {/* Mode Tabs & Action Bar */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("visualizer")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "visualizer"
                ? "bg-purple-800 text-white shadow-2xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>🎲</span> 1. Interactive Probability Sliders
          </button>
          <button
            onClick={() => setActiveTab("indifference_proof")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "indifference_proof"
                ? "bg-blue-800 text-white shadow-2xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>📐</span> 2. Step-by-Step Indifference Proof
          </button>
        </div>

        <button
          onClick={() => {
            setSliderP(pStar);
            setSliderQ(qStar);
          }}
          className="text-xs px-3 py-1.5 rounded-lg font-bold bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <span>🎯</span> Snap to Nash Equilibrium ($p^*={pStar.toFixed(2)}, q^*={qStar.toFixed(2)}$)
        </button>
      </div>

      {activeTab === "visualizer" ? (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Top: 2x2 Matrix with Best Response Cycling Overlays */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Payoff Matrix Display */}
            <div className="lg:col-span-6 bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-800">
              <div className="text-center text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">
                Column Player: {preset.player2}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2.5 text-left text-[11px] text-slate-400 border border-slate-700 w-36">
                        <span className="text-blue-400 font-bold">{preset.player1.split(" ")[0]}</span> ↓ \ <span className="text-emerald-400 font-bold">{preset.player2.split(" ")[0]}</span> →
                      </th>
                      <th className="p-2.5 text-xs font-bold text-slate-200 border border-slate-700 bg-slate-800/80">
                        {preset.p2Action1}
                        <div className="text-[10px] text-emerald-400 font-mono mt-0.5">q = {(q * 100).toFixed(0)}%</div>
                      </th>
                      <th className="p-2.5 text-xs font-bold text-slate-200 border border-slate-700 bg-slate-800/80">
                        {preset.p2Action2}
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">1-q = {((1 - q) * 100).toFixed(0)}%</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2.5 text-xs font-bold text-slate-200 border border-slate-700 bg-slate-800/80 text-left">
                        <div>{preset.p1Action1}</div>
                        <div className="text-[10px] text-blue-400 font-mono">p = {(p * 100).toFixed(0)}%</div>
                      </td>
                      <td className="p-3 border border-slate-700 bg-slate-900/90 font-mono text-sm">
                        <span className="text-blue-400 font-bold">{a11}</span>, <span className="text-emerald-400 font-bold">{b11}</span>
                      </td>
                      <td className="p-3 border border-slate-700 bg-slate-900/90 font-mono text-sm">
                        <span className="text-blue-400 font-bold">{a12}</span>, <span className="text-emerald-400 font-bold">{b12}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-xs font-bold text-slate-200 border border-slate-700 bg-slate-800/80 text-left">
                        <div>{preset.p1Action2}</div>
                        <div className="text-[10px] text-slate-400 font-mono">1-p = {((1 - p) * 100).toFixed(0)}%</div>
                      </td>
                      <td className="p-3 border border-slate-700 bg-slate-900/90 font-mono text-sm">
                        <span className="text-blue-400 font-bold">{a21}</span>, <span className="text-emerald-400 font-bold">{b21}</span>
                      </td>
                      <td className="p-3 border border-slate-700 bg-slate-900/90 font-mono text-sm">
                        <span className="text-blue-400 font-bold">{a22}</span>, <span className="text-emerald-400 font-bold">{b22}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Best Response Cycling Explainer */}
              <div className="mt-3 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <span>🔄</span> Pure Strategy Cycling:
                </div>
                <div className="font-mono text-slate-300">
                  [{preset.p1Action1.split(" ")[1] || preset.p1Action1}, {preset.p2Action1.split(" ")[1] || preset.p2Action1}] ➔ [{preset.p1Action2.split(" ")[1] || preset.p1Action2}, {preset.p2Action1.split(" ")[1] || preset.p2Action1}] ➔ [{preset.p1Action2.split(" ")[1] || preset.p1Action2}, {preset.p2Action2.split(" ")[1] || preset.p2Action2}] ➔ [{preset.p1Action1.split(" ")[1] || preset.p1Action1}, {preset.p2Action2.split(" ")[1] || preset.p2Action2}] ➔ ↺
                </div>
                <div className="text-slate-400">
                  Every predictable choice gives the rival an uncountered attack. Only strategic randomization terminates the cycle.
                </div>
              </div>
            </div>

            {/* Sliders & Real-Time Expected Utility Dashboard */}
            <div className="lg:col-span-6 space-y-4">
              {/* Slider 1: Player 1 Mix (p) */}
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-blue-950">
                  <span>1. {preset.player1}'s Mix ($p$):</span>
                  <span className="font-mono bg-blue-600 text-white px-2 py-0.5 rounded text-[11px]">
                    p = {p.toFixed(2)} ({(p * 100).toFixed(0)}% {preset.p1Action1.split(" ")[1] || preset.p1Action1})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={sliderP}
                  onChange={(e) => setSliderP(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-blue-700 font-semibold">
                  <span>0% (Always {preset.p1Action2.split(" ")[1] || preset.p1Action2})</span>
                  <span className="text-blue-900 font-bold">Equilibrium: p* = {pStar.toFixed(2)}</span>
                  <span>100% (Always {preset.p1Action1.split(" ")[1] || preset.p1Action1})</span>
                </div>
                {/* Indifference check for Rival */}
                <div className="bg-white p-2 rounded border border-blue-100 text-[11px] space-y-0.5">
                  <div className="text-slate-600">Impact on Rival's Expected Payoffs:</div>
                  <div className="font-mono flex justify-between">
                    <span>E[Rival({preset.p2Action1.split(" ")[1] || preset.p2Action1})] = <strong>{expU2_B1.toFixed(2)}</strong></span>
                    <span>E[Rival({preset.p2Action2.split(" ")[1] || preset.p2Action2})] = <strong>{expU2_B2.toFixed(2)}</strong></span>
                  </div>
                  <div className="pt-1 text-[10.5px] font-bold">
                    {Math.abs(expU2_B1 - expU2_B2) < 0.05 ? (
                      <span className="text-emerald-700">✓ Rival is INDINDIFFERENT! (Both options yield identical return)</span>
                    ) : expU2_B1 > expU2_B2 ? (
                      <span className="text-amber-800">⚠️ Rival strictly prefers {preset.p2Action1.split(" ")[1] || preset.p2Action1} ({expU2_B1.toFixed(2)} &gt; {expU2_B2.toFixed(2)})</span>
                    ) : (
                      <span className="text-amber-800">⚠️ Rival strictly prefers {preset.p2Action2.split(" ")[1] || preset.p2Action2} ({expU2_B2.toFixed(2)} &gt; {expU2_B1.toFixed(2)})</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Slider 2: Player 2 Mix (q) */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                  <span>2. {preset.player2}'s Mix ($q$):</span>
                  <span className="font-mono bg-emerald-600 text-white px-2 py-0.5 rounded text-[11px]">
                    q = {q.toFixed(2)} ({(q * 100).toFixed(0)}% {preset.p2Action1.split(" ")[1] || preset.p2Action1})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={sliderQ}
                  onChange={(e) => setSliderQ(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-emerald-700 font-semibold">
                  <span>0% (Always {preset.p2Action2.split(" ")[1] || preset.p2Action2})</span>
                  <span className="text-emerald-900 font-bold">Equilibrium: q* = {qStar.toFixed(2)}</span>
                  <span>100% (Always {preset.p2Action1.split(" ")[1] || preset.p2Action1})</span>
                </div>
                {/* Indifference check for Chain */}
                <div className="bg-white p-2 rounded border border-emerald-100 text-[11px] space-y-0.5">
                  <div className="text-slate-600">Impact on Chain's Expected Payoffs:</div>
                  <div className="font-mono flex justify-between">
                    <span>E[Chain({preset.p1Action1.split(" ")[1] || preset.p1Action1})] = <strong>{expU1_A1.toFixed(2)}</strong></span>
                    <span>E[Chain({preset.p1Action2.split(" ")[1] || preset.p1Action2})] = <strong>{expU1_A2.toFixed(2)}</strong></span>
                  </div>
                  <div className="pt-1 text-[10.5px] font-bold">
                    {Math.abs(expU1_A1 - expU1_A2) < 0.05 ? (
                      <span className="text-emerald-700">✓ Chain is INDINDIFFERENT! (Both options yield identical return)</span>
                    ) : expU1_A1 > expU1_A2 ? (
                      <span className="text-amber-800">⚠️ Chain strictly prefers {preset.p1Action1.split(" ")[1] || preset.p1Action1} ({expU1_A1.toFixed(2)} &gt; {expU1_A2.toFixed(2)})</span>
                    ) : (
                      <span className="text-amber-800">⚠️ Chain strictly prefers {preset.p1Action2.split(" ")[1] || preset.p1Action2} ({expU1_A2.toFixed(2)} &gt; {expU1_A1.toFixed(2)})</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Equilibrium Status & Expected Payoff Banner */}
          <div className={`p-4 rounded-xl border transition-all text-xs sm:text-sm ${
            isAtEquilibrium
              ? "bg-purple-50 border-purple-300 text-purple-950 shadow-xs"
              : "bg-slate-50 border-slate-200 text-slate-800"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2 mb-2">
              <div className="font-bold flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${isAtEquilibrium ? "bg-purple-600 animate-ping" : "bg-slate-400"}`}></span>
                <span>
                  {isAtEquilibrium
                    ? `★ Mixed Strategy Nash Equilibrium (MSNE) Reached!`
                    : "Off-Equilibrium State (Vulnerable to Counter-Exploitation)"}
                </span>
              </div>
              <div className="font-mono font-bold text-xs flex gap-3">
                <span className="text-blue-900">E[u₁] = {expU1_Total.toFixed(2)} {preset.unit}</span>
                <span className="text-emerald-900">E[u₂] = {expU2_Total.toFixed(2)} {preset.unit}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
              <p>
                <strong>The Indifference Axiom: </strong>
                In mixed strategy equilibrium, a player randomizes not to maximize their own enjoyment of randomness, but with the exact probability distribution required to make their <strong>opponent completely indifferent</strong> between opposing pure actions!
              </p>
              {isAtEquilibrium && (
                <div className="p-2.5 bg-white rounded border border-purple-200 font-semibold text-purple-900 text-xs">
                  Equilibrium Outcome: <strong>{preset.player1}</strong> randomizes with $p^* = {pStar.toFixed(2)}$ and earns expected return <strong>{eqU1.toFixed(2)} {preset.unit}</strong>. <strong>{preset.player2}</strong> randomizes with $q^* = {qStar.toFixed(2)}$ and earns expected return <strong>{eqU2.toFixed(2)} {preset.unit}</strong>.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: Step-by-Step Indifference Proof */
        <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
            <div>
              <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Mathematical Indifference Principle Proof
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-1">
                Deriving the Exact Equilibrium Mixing Probabilities ($p^*, q^*$)
              </h4>
            </div>

            {/* Step 1: Solving p* */}
            <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
              <div className="font-bold text-blue-900 text-sm">
                Step 1: Solve {preset.player1}'s Probability Mix ($p^*$) to Make Rival Indifferent
              </div>
              <p className="text-slate-700 text-xs">
                Let p = Pr({preset.p1Action1}) and (1 - p) = Pr({preset.p1Action2}). {preset.player2}&apos;s expected payoffs from each action are:
              </p>
              <div className="bg-white p-3 rounded-lg border border-blue-200 font-mono text-xs text-blue-950 space-y-1">
                <div>E[u₂({preset.p2Action1})] = {b11}·p + {b21}·(1 - p) = {b21} + {b11 - b21}p</div>
                <div>E[u₂({preset.p2Action2})] = {b12}·p + {b22}·(1 - p) = {b22} + {b12 - b22}p</div>
                <div className="pt-1.5 border-t border-blue-100 font-bold text-blue-800">
                  Equate: E[u₂({preset.p2Action1})] = E[u₂({preset.p2Action2})]
                </div>
                <div>{b21} + {b11 - b21}p = {b22} + {b12 - b22}p</div>
                <div className="text-emerald-700 font-extrabold text-sm pt-1">
                  ⟹ p* = {pStar.toFixed(2)} ({(pStar * 100).toFixed(0)}% {preset.p1Action1}, {((1 - pStar) * 100).toFixed(0)}% {preset.p1Action2})
                </div>
              </div>
            </div>

            {/* Step 2: Solving q* */}
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
              <div className="font-bold text-emerald-900 text-sm">
                Step 2: Solve {preset.player2}'s Probability Mix ($q^*$) to Make Chain Indifferent
              </div>
              <p className="text-slate-700 text-xs">
                Let q = Pr({preset.p2Action1}) and (1 - q) = Pr({preset.p2Action2}). {preset.player1}&apos;s expected payoffs from each action are:
              </p>
              <div className="bg-white p-3 rounded-lg border border-emerald-200 font-mono text-xs text-emerald-950 space-y-1">
                <div>E[u₁({preset.p1Action1})] = {a11}·q + {a12}·(1 - q) = {a12} + {a11 - a12}q</div>
                <div>E[u₁({preset.p1Action2})] = {a21}·q + {a22}·(1 - q) = {a22} + {a21 - a22}q</div>
                <div className="pt-1.5 border-t border-emerald-100 font-bold text-emerald-800">
                  Equate: E[u₁({preset.p1Action1})] = E[u₁({preset.p1Action2})]
                </div>
                <div>{a12} + {a11 - a12}q = {a22} + {a21 - a22}q</div>
                <div className="text-blue-700 font-extrabold text-sm pt-1">
                  ⟹ q* = {qStar.toFixed(2)} ({(qStar * 100).toFixed(0)}% {preset.p2Action1}, {((1 - qStar) * 100).toFixed(0)}% {preset.p2Action2})
                </div>
              </div>
            </div>

            {/* Step 3: Managerial Intuition */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-slate-900 text-sm">
                Step 3: Executive Strategic Takeaway
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Why the asymmetric mixing? </strong>{preset.intuitiveReason}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LaTeX Modal */}
      {showTikzModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">LaTeX Best Response Graph Generator</h4>
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
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition-colors"
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
