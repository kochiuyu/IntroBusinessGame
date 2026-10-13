import React, { useState, useMemo } from "react";

interface PresetScenario {
  name: string;
  label: string;
  player1: string;
  player2: string;
  cooperateAction: string;
  defectAction: string;
  R: number; // Reward for mutual cooperation
  T: number; // Temptation to defect
  P: number; // Punishment for mutual defection
  S: number; // Sucker's payoff
  story: string;
  citation: string;
}

const PRESETS: Record<string, PresetScenario> = {
  pricing: {
    name: "pricing",
    label: "Lecture 6 Core: Duopoly Price Competition",
    player1: "Your Firm",
    player2: "Rival Firm",
    cooperateAction: "Maintain Margin",
    defectAction: "Secret Discount",
    R: 4,
    T: 5,
    P: 2,
    S: 1,
    story: "Two firms decide whether to Maintain margin (4, 4) or secretly Discount (5, 1). If both discount, a margin-eroding price war drops profits to (2, 2).",
    citation: "CUHK Lecture 6 (Slides 3, 10–13, 21)"
  },
  buyerSupplier: {
    name: "buyerSupplier",
    label: "Lecture 6 App 1: Buyer–Supplier Relationship",
    player1: "Enterprise Buyer",
    player2: "Component Supplier",
    cooperateAction: "Honor Terms / Quality",
    defectAction: "Delay Pay / Cut Quality",
    R: 6,
    T: 9,
    P: 2,
    S: 1,
    story: "An OEM and critical supplier interact repeatedly. Opportunistic unilateral breach yields an immediate windfall, but collapses future partnership into costly arm's-length conflict.",
    citation: "Lecture 6 Application 1 (Slide 14)"
  },
  shipping: {
    name: "shipping",
    label: "Industry Case: Global Container Shipping Alliances",
    player1: "OceanCarrier A",
    player2: "OceanCarrier B",
    cooperateAction: "Uphold Base Freight Rate",
    defectAction: "Spot Capacity Dumping",
    R: 60,
    T: 90,
    P: 25,
    S: 10,
    story: "Global carrier alliances (2M, Ocean Alliance) maintain tacit freight rate discipline ($60M each). Secret capacity dumping captures $90M upfront, triggering rate wars down to $25M.",
    citation: "Lecture 6 Application 3 (Slide 16)"
  }
};

export const RepeatedGameSimulator: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>("pricing");
  const [strategyType, setStrategyType] = useState<"grim" | "titForTat">("grim");
  const [delta, setDelta] = useState<number>(0.5);

  // Economic decomposition of delta: delta = p / (1 + r)
  const [showDecomposition, setShowDecomposition] = useState<boolean>(false);
  const [continuationProb, setContinuationProb] = useState<number>(0.90); // p
  const [interestRate, setInterestRate] = useState<number>(0.08); // r

  // Deviation scenario mode
  const [deviationMode, setDeviationMode] = useState<"never" | "once" | "permanent">("once");
  const [deviationStartRound, setDeviationStartRound] = useState<number>(3);

  // Custom payoff editable overrides
  const [customMode, setCustomMode] = useState<boolean>(false);
  const [customR, setCustomR] = useState<number>(4);
  const [customT, setCustomT] = useState<number>(5);
  const [customP, setCustomP] = useState<number>(2);
  const [customS, setCustomS] = useState<number>(1);

  // Asymmetric Player 2 settings (Slide 15)
  const [asymmetricMode, setAsymmetricMode] = useState<boolean>(false);
  const [player2R, setPlayer2R] = useState<number>(4);
  const [player2T, setPlayer2T] = useState<number>(6);
  const [player2P, setPlayer2P] = useState<number>(1);
  const [player2S, setPlayer2S] = useState<number>(0);

  const preset = PRESETS[selectedPreset] || PRESETS.pricing;

  // Active payoffs for Player 1
  const R = customMode ? customR : preset.R;
  const T = customMode ? customT : preset.T;
  const P = customMode ? customP : preset.P;
  const S = customMode ? customS : preset.S;

  const player1 = preset.player1;
  const player2 = preset.player2;
  const cooperateAction = preset.cooperateAction;
  const defectAction = preset.defectAction;

  // Effective delta calculation if decomposition is enabled
  const effectiveDelta = useMemo(() => {
    if (showDecomposition) {
      const calc = continuationProb / (1 + interestRate);
      return Math.min(0.999, Math.max(0.01, calc));
    }
    return delta;
  }, [showDecomposition, continuationProb, interestRate, delta]);

  // Theoretical Grim Trigger threshold: delta* = (T - R) / (T - P)
  const deltaStarGrim = useMemo(() => {
    const denom = T - P;
    if (denom <= 0) return 1;
    const val = (T - R) / denom;
    return Math.max(0, Math.min(1, val));
  }, [T, R, P]);

  // Theoretical Tit-for-Tat threshold (Slide 21 exact derivation):
  // Play alternates: (D, C) -> (C, D) -> (D, C) -> (C, D) => stream: T, S, T, S, ...
  // V_TFT = (T + delta * S) / (1 - delta^2)
  // V_C = R / (1 - delta) = R * (1 + delta) / (1 - delta^2)
  // V_C >= V_TFT <=> R(1 + delta) >= T + delta*S <=> delta*(R - S) >= T - R <=> delta >= (T - R) / (R - S)
  const deltaStarTFT = useMemo(() => {
    const denom = R - S;
    if (denom <= 0) return 1;
    const val = (T - R) / denom;
    return Math.max(0, Math.min(1, val));
  }, [T, R, S]);

  // Threshold for current strategy
  const currentStrategyThreshold = strategyType === "grim" ? deltaStarGrim : deltaStarTFT;

  // Asymmetric Player 2 threshold
  const p2GrimThreshold = useMemo(() => {
    const denom = player2T - player2P;
    if (denom <= 0) return 1;
    return Math.max(0, Math.min(1, (player2T - player2R) / denom));
  }, [player2T, player2R, player2P]);

  const p2TFTThreshold = useMemo(() => {
    const denom = player2R - player2S;
    if (denom <= 0) return 1;
    return Math.max(0, Math.min(1, (player2T - player2R) / denom));
  }, [player2T, player2R, player2S]);

  const player2Threshold = strategyType === "grim" ? p2GrimThreshold : p2TFTThreshold;

  // Binding threshold across all players
  const bindingThreshold = asymmetricMode
    ? Math.max(currentStrategyThreshold, player2Threshold)
    : currentStrategyThreshold;

  const isCooperationSustained = effectiveDelta >= bindingThreshold;

  // Infinite horizon valuation:
  // V_C = R / (1 - delta)
  const valueCooperateForever = useMemo(() => {
    if (effectiveDelta >= 1) return Infinity;
    return R / (1 - effectiveDelta);
  }, [R, effectiveDelta]);

  // V_D under Grim Trigger = T + delta * P / (1 - delta)
  const valueDeviateGrim = useMemo(() => {
    if (effectiveDelta >= 1) return Infinity;
    return T + (effectiveDelta * P) / (1 - effectiveDelta);
  }, [T, P, effectiveDelta]);

  // V_D under Tit for Tat (alternating T, S, T, S) = (T + delta * S) / (1 - delta^2)
  const valueDeviateTFT = useMemo(() => {
    if (effectiveDelta >= 1) return Infinity;
    const denom = 1 - effectiveDelta * effectiveDelta;
    if (denom <= 0) return Infinity;
    return (T + effectiveDelta * S) / denom;
  }, [T, S, effectiveDelta]);

  const activeDeviationValue = strategyType === "grim" ? valueDeviateGrim : valueDeviateTFT;

  // 10-Round Multi-Period Dynamic Simulation
  const simulationRounds = useMemo(() => {
    const rounds = [];
    let p1InPunishment = false;
    let p2InPunishment = false;
    let lastP1Action: "C" | "D" = "C";
    let lastP2Action: "C" | "D" = "C";

    for (let t = 1; t <= 10; t++) {
      let p1Action: "C" | "D" = "C";
      let p2Action: "C" | "D" = "C";

      // Player 1 move determination based on deviation scenario
      if (deviationMode === "never") {
        p1Action = "C";
      } else if (deviationMode === "once") {
        if (t === deviationStartRound) {
          p1Action = "D";
        } else if (t < deviationStartRound) {
          p1Action = "C";
        } else {
          // After round of deviation:
          if (strategyType === "grim") {
            p1Action = "D"; // Under grim trigger, both play D forever
          } else {
            // Under exact Tit for Tat, Player 1 copies Player 2's previous move!
            p1Action = lastP2Action;
          }
        }
      } else if (deviationMode === "permanent") {
        if (t >= deviationStartRound) {
          p1Action = "D";
        } else {
          p1Action = "C";
        }
      }

      // Player 2 move determination
      if (t === 1) {
        p2Action = "C";
      } else if (strategyType === "grim") {
        p2Action = p2InPunishment ? "D" : "C";
      } else {
        // Tit for Tat: Player 2 mirrors Player 1's previous move
        p2Action = lastP1Action;
      }

      // Trigger condition for Grim Trigger punishment memory
      if (p1Action === "D" || p2Action === "D") {
        p1InPunishment = true;
        p2InPunishment = true;
      }

      lastP1Action = p1Action;
      lastP2Action = p2Action;

      // Calculate stage game payoffs
      let p1Payoff = R;
      let p2Payoff = asymmetricMode ? player2R : R;

      if (p1Action === "C" && p2Action === "C") {
        p1Payoff = R;
        p2Payoff = asymmetricMode ? player2R : R;
      } else if (p1Action === "D" && p2Action === "C") {
        p1Payoff = T;
        p2Payoff = asymmetricMode ? player2S : S;
      } else if (p1Action === "C" && p2Action === "D") {
        p1Payoff = S;
        p2Payoff = asymmetricMode ? player2T : T;
      } else if (p1Action === "D" && p2Action === "D") {
        p1Payoff = P;
        p2Payoff = asymmetricMode ? player2P : P;
      }

      const discountWeight = Math.pow(effectiveDelta, t - 1);
      const discountedP1 = p1Payoff * discountWeight;
      const discountedP2 = p2Payoff * discountWeight;

      rounds.push({
        round: t,
        p1Action,
        p2Action,
        p1Payoff,
        p2Payoff,
        discountWeight,
        discountedP1,
        discountedP2
      });
    }

    return rounds;
  }, [
    deviationMode,
    deviationStartRound,
    strategyType,
    effectiveDelta,
    R,
    T,
    P,
    S,
    asymmetricMode,
    player2R,
    player2T,
    player2P,
    player2S
  ]);

  const cumulativeP1Discounted = useMemo(() => {
    return simulationRounds.reduce((acc, r) => acc + r.discountedP1, 0);
  }, [simulationRounds]);

  const cumulativePureCoopP1 = useMemo(() => {
    let sum = 0;
    for (let t = 0; t < 10; t++) {
      sum += R * Math.pow(effectiveDelta, t);
    }
    return sum;
  }, [R, effectiveDelta]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 text-white shadow-xl space-y-6">
      {/* Top Header & Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Dynamic Game Theory Simulator • Week 6 Lab
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Repeated Games, Punishment Triggers & Tacit Cooperation
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate the "Shadow of the Future" (δ): test Friedman's Grim Trigger against Axelrod's Tit-for-Tat, calculate analytical cooperation thresholds, and observe dynamic retaliation.
          </p>
        </div>

        {/* Presets and Custom Mode Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/60">
            {Object.entries(PRESETS).map(([key, p]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedPreset(key);
                  setCustomMode(false);
                }}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                  selectedPreset === key && !customMode
                    ? "bg-indigo-600 text-white font-semibold shadow-xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {key === "pricing" ? "Lecture Pricing" : key === "buyerSupplier" ? "Buyer–Supplier" : "Shipping Alliances"}
              </button>
            ))}
            <button
              onClick={() => setCustomMode(!customMode)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                customMode
                  ? "bg-amber-600 text-white font-semibold shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              ✏️ Custom Values
            </button>
          </div>
        </div>
      </div>

      {/* Preset Context & Story Banner */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-3">
        <span className="text-xl shrink-0 mt-0.5">📊</span>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <strong className="text-white font-semibold">{preset.label}</strong>
            <span className="text-[11px] bg-slate-700/70 text-indigo-300 px-2 py-0.5 rounded font-mono">
              {preset.citation}
            </span>
          </div>
          <p className="text-xs text-slate-300">{preset.story}</p>
        </div>
      </div>

      {/* Custom Payoff Editor (if enabled) */}
      {customMode && (
        <div className="bg-amber-950/30 border border-amber-800/60 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
            <span>Edit Custom Prisoner's Dilemma Stage Payoffs (Must satisfy T &gt; R &gt; P &gt; S):</span>
            <span className="font-mono text-[11px]">Current: T={customT}, R={customR}, P={customP}, S={customS}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">T (Temptation):</label>
              <input
                type="number"
                value={customT}
                onChange={(e) => setCustomT(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">R (Reward Coop):</label>
              <input
                type="number"
                value={customR}
                onChange={(e) => setCustomR(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">P (Punishment):</label>
              <input
                type="number"
                value={customP}
                onChange={(e) => setCustomP(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">S (Sucker):</label>
              <input
                type="number"
                value={customS}
                onChange={(e) => setCustomS(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Parameters Grid: Stage Game Matrix + Discount Factor & Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Stage Game Normal Form Matrix (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3.5">
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2.5">
            <span className="font-bold text-slate-200">Stage Game Payoff Matrix</span>
            <span className="text-[11px] font-mono text-indigo-400">Prisoner's Dilemma</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-slate-500 font-normal"></th>
                  <th className="p-2 text-slate-300 font-semibold bg-slate-900/80 border border-slate-800">
                    {player2}: {cooperateAction}
                  </th>
                  <th className="p-2 text-slate-300 font-semibold bg-slate-900/80 border border-slate-800">
                    {player2}: {defectAction}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="p-2 text-slate-300 font-semibold bg-slate-900/80 border border-slate-800 text-left">
                    {player1}: {cooperateAction}
                  </th>
                  <td className="p-2.5 border border-slate-800 bg-emerald-950/40 text-emerald-300 font-bold">
                    ({R}, {asymmetricMode ? player2R : R})
                    <div className="text-[10px] text-emerald-500 font-normal mt-0.5">Reward (R, R)</div>
                  </td>
                  <td className="p-2.5 border border-slate-800 bg-slate-900/50 text-amber-300 font-mono">
                    ({S}, {asymmetricMode ? player2T : T})
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Sucker / Temptation</div>
                  </td>
                </tr>
                <tr>
                  <th className="p-2 text-slate-300 font-semibold bg-slate-900/80 border border-slate-800 text-left">
                    {player1}: {defectAction}
                  </th>
                  <td className="p-2.5 border border-slate-800 bg-slate-900/50 text-amber-300 font-mono">
                    ({T}, {asymmetricMode ? player2S : S})
                    <div className="text-[10px] text-amber-400 font-normal mt-0.5">Temptation / Sucker</div>
                  </td>
                  <td className="p-2.5 border border-slate-800 bg-red-950/40 text-red-300 font-bold">
                    ({P}, {asymmetricMode ? player2P : P})
                    <div className="text-[10px] text-red-400 font-normal mt-0.5">Punishment (P, P)</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payoff Values Breakdown */}
          <div className="text-[11px] text-slate-300 space-y-1.5 pt-1">
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-400">Mutual Cooperation Reward (<span className="text-emerald-400 font-mono font-bold">R</span>):</span>
              <span className="font-mono text-white font-bold">{R}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-400">One-Shot Defection Temptation (<span className="text-amber-400 font-mono font-bold">T</span>):</span>
              <span className="font-mono text-white font-bold">{T}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-400">Mutual Defection Punishment (<span className="text-red-400 font-mono font-bold">P</span>):</span>
              <span className="font-mono text-white font-bold">{P}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-400">Sucker Payoff (<span className="text-slate-400 font-mono font-bold">S</span>):</span>
              <span className="font-mono text-white font-bold">{S}</span>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1">
              <div className="flex justify-between text-indigo-300 font-semibold">
                <span>Immediate Temptation Gain (T - R):</span>
                <span className="font-mono">+{T - R}</span>
              </div>
              <div className="flex justify-between text-indigo-300 font-semibold">
                <span>Ongoing Future Cooperation Premium (R - P):</span>
                <span className="font-mono">+{R - P} per round</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Rules & Discount Factor Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Enforcement Strategy Toggle */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Repeated Game Enforcement Strategy</span>
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-700/60">
                <button
                  onClick={() => setStrategyType("grim")}
                  className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                    strategyType === "grim"
                      ? "bg-red-700 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>⚡</span> Grim Trigger
                </button>
                <button
                  onClick={() => setStrategyType("titForTat")}
                  className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                    strategyType === "titForTat"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>🔄</span> Tit for Tat
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
              {strategyType === "grim" ? (
                <div>
                  <div className="font-semibold text-red-400 mb-1 flex items-center justify-between">
                    <span>Grim Trigger (Friedman 1971 • Slide 10–13):</span>
                    <span className="font-mono text-[11px] text-amber-300">
                      δ* = (T - R) / (T - P) = ({T} - {R}) / ({T} - {P}) = {deltaStarGrim.toFixed(3)}
                    </span>
                  </div>
                  <p className="text-slate-400">
                    Start by cooperating. If the rival discounts even once, revert permanently to the Nash punishment price war (P, P) forever. Maximizes deterrence severity, making it easier to sustain cooperation with a lower discount threshold.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="font-semibold text-blue-400 mb-1 flex items-center justify-between">
                    <span>Tit for Tat (Axelrod 1984 • Slide 21):</span>
                    <span className="font-mono text-[11px] text-amber-300">
                      δ* = (T - R) / (R - S) = ({T} - {R}) / ({R} - {S}) = {deltaStarTFT.toFixed(3)}
                    </span>
                  </div>
                  <p className="text-slate-400">
                    Start by cooperating. In every subsequent period, mirror the rival's previous move. A unilateral breach triggers alternating retaliation: (D, C) → (C, D) → (D, C)... with payoff stream T, S, T, S... (Slide 21 exact derivation).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Discount Factor Slider & Economic Decomposition */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <span>The Discount Factor (Patience & Shadow of Future):</span>
                <span className="font-mono text-base font-bold text-emerald-400">
                  δ = {effectiveDelta.toFixed(3)}
                </span>
              </label>

              <button
                onClick={() => setShowDecomposition(!showDecomposition)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-mono underline"
              >
                {showDecomposition ? "Hide δ = p/(1+r)" : "Decompose δ = p/(1+r)"}
              </button>
            </div>

            {/* Economic Decomposition View (Slide 7) */}
            {showDecomposition ? (
              <div className="bg-indigo-950/30 border border-indigo-800/50 rounded-lg p-3 space-y-3 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px] text-indigo-300">
                  <span>Economic Formula (Slide 7): δ = p / (1 + r)</span>
                  <span>Calculated δ = {(continuationProb / (1 + interestRate)).toFixed(3)}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1 text-[11px]">
                      <span>Continuation Prob (p):</span>
                      <span className="font-mono font-bold text-emerald-400">{(continuationProb * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.10"
                      max="0.99"
                      step="0.01"
                      value={continuationProb}
                      onChange={(e) => setContinuationProb(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1 text-[11px]">
                      <span>Cost of Capital / Interest (r):</span>
                      <span className="font-mono font-bold text-amber-400">{(interestRate * 100).toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.01"
                      max="0.30"
                      step="0.005"
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="0"
                  max="0.99"
                  step="0.01"
                  value={delta}
                  onChange={(e) => setDelta(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0.00 (Myopic / Last Round)</span>
                  <span className="text-amber-400 font-semibold">
                    Threshold δ* = {bindingThreshold.toFixed(3)}
                  </span>
                  <span>1.00 (Infinite Patience)</span>
                </div>
              </div>
            )}

            {/* Live Equilibrium Status Banner */}
            <div
              className={`p-3.5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isCooperationSustained
                  ? "bg-emerald-950/40 border-emerald-700/60 text-emerald-200"
                  : "bg-red-950/40 border-red-700/60 text-red-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl shrink-0">{isCooperationSustained ? "✅" : "⚠️"}</span>
                <div>
                  <div className="font-bold text-sm">
                    {isCooperationSustained
                      ? `Cooperation Sustainable (δ = ${effectiveDelta.toFixed(3)} ≥ δ* = ${bindingThreshold.toFixed(3)})`
                      : `Cooperation Unravels (δ = ${effectiveDelta.toFixed(3)} < δ* = ${bindingThreshold.toFixed(3)})`}
                  </div>
                  <div className="text-[11px] opacity-80 mt-0.5">
                    {isCooperationSustained
                      ? "The discounted continuation value of future cooperation outweighs the short-term temptation to defect."
                      : "Patience is too low; short-term temptation to undercut exceeds future retaliatory discipline."}
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right font-mono text-[11px] border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3 space-y-0.5">
                <div>
                  V(Cooperate) ={" "}
                  <span className="font-bold text-white">
                    {Number.isFinite(valueCooperateForever) ? valueCooperateForever.toFixed(2) : "∞"}
                  </span>
                </div>
                <div>
                  V(Deviate) ={" "}
                  <span className="font-bold text-amber-300">
                    {Number.isFinite(activeDeviationValue) ? activeDeviationValue.toFixed(2) : "∞"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 10-Round Multi-Period Dynamic Timeline Simulation */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>⏱️</span> Multi-Period Dynamic Timeline Simulation (10 Rounds)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate dynamic interaction step-by-step: compare pure cooperation against one-time opportunism and permanent defection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400">Deviation Mode:</span>
            <select
              value={deviationMode}
              onChange={(e) => setDeviationMode(e.target.value as "never" | "once" | "permanent")}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono text-xs focus:outline-hidden focus:border-indigo-500"
            >
              <option value="never">Never (Sustained Cooperation)</option>
              <option value="once">Deviate Once at Round {deviationStartRound}</option>
              <option value="permanent">Permanent Defection starting Round {deviationStartRound}</option>
            </select>

            {deviationMode !== "never" && (
              <select
                value={deviationStartRound}
                onChange={(e) => setDeviationStartRound(parseInt(e.target.value))}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono text-xs focus:outline-hidden focus:border-indigo-500"
              >
                <option value="1">Round 1</option>
                <option value="2">Round 2</option>
                <option value="3">Round 3 (Slide 11 Baseline)</option>
                <option value="5">Round 5</option>
              </select>
            )}
          </div>
        </div>

        {/* 10 Round Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {simulationRounds.map((r) => {
            const isDefectionRound =
              (deviationMode === "once" && r.round === deviationStartRound) ||
              (deviationMode === "permanent" && r.round === deviationStartRound);
            const isPunishmentRound = r.p1Payoff === P && r.p2Payoff === P;
            const isAlternatingTFT = (r.p1Payoff === T && r.p2Payoff === S) || (r.p1Payoff === S && r.p2Payoff === T);
            const isCooperating = r.p1Payoff === R && r.p2Payoff === (asymmetricMode ? player2R : R);

            return (
              <div
                key={r.round}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isDefectionRound
                    ? "bg-amber-950/60 border-amber-500 shadow-md ring-1 ring-amber-400"
                    : isPunishmentRound
                    ? "bg-red-950/30 border-red-900/60 text-slate-300"
                    : isAlternatingTFT
                    ? "bg-blue-950/30 border-blue-800/60 text-slate-300"
                    : isCooperating
                    ? "bg-emerald-950/30 border-emerald-900/60 text-slate-200"
                    : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400 border-b border-slate-800/80 pb-1 flex justify-between items-center">
                  <span>R{r.round}</span>
                  <span className="text-[9px] text-slate-500">δ^{r.round - 1}</span>
                </div>

                <div className="my-1.5 space-y-0.5">
                  <div className={`text-xs font-bold ${
                    r.p1Action === "C" ? "text-emerald-400" : "text-amber-400"
                  }`}>
                    {r.p1Action === "C" ? "Maintain" : "Discount"}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    vs {r.p2Action === "C" ? "Maintain" : "Discount"}
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-800/80 text-[11px] font-mono">
                  <div className={`font-bold ${
                    isDefectionRound ? "text-amber-300" : isPunishmentRound ? "text-red-400" : isAlternatingTFT ? "text-blue-300" : "text-emerald-300"
                  }`}>
                    +{r.p1Payoff}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    PV: +{r.discountedP1.toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 10-Round Cumulative Enterprise Value Comparison */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">10-Round Simulated Discounted Payoff (PV):</span>
            <span className="font-mono text-base font-bold text-white">
              {cumulativeP1Discounted.toFixed(2)}
            </span>
          </div>

          <div className="text-[11px] text-slate-300 flex flex-wrap items-center gap-3">
            <span>
              Pure Cooperation Benchmark PV:{" "}
              <strong className="text-emerald-400 font-mono">
                {cumulativePureCoopP1.toFixed(2)}
              </strong>
            </span>
            <span>
              Net Impact of Cheating:{" "}
              <strong className={`font-mono ${
                cumulativeP1Discounted >= cumulativePureCoopP1 ? "text-emerald-400" : "text-red-400 font-bold"
              }`}>
                {(cumulativeP1Discounted - cumulativePureCoopP1).toFixed(2)}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Asymmetric Extension Toggle & Explanation (Lecture Slide 15) */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-200">
              Asymmetric Relationships & Dual Thresholds (Slide 15)
            </span>
            <span className="text-[10px] bg-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded font-mono">
              Weakest Link Theory
            </span>
          </div>

          <button
            onClick={() => setAsymmetricMode(!asymmetricMode)}
            className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all ${
              asymmetricMode
                ? "bg-indigo-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {asymmetricMode ? "Disable Asymmetric Mode" : "Enable Asymmetric Mode"}
          </button>
        </div>

        {asymmetricMode ? (
          <div className="space-y-3 pt-2 text-xs border-t border-slate-800">
            <p className="text-slate-300 leading-relaxed">
              In business alliances, payoff asymmetry is the norm (e.g., a dominant retailer vs. a dependent supplier). Because either side can unilaterally cheat, cooperation requires <strong>both</strong> players' individual conditions to hold:
            </p>

            {/* Asymmetric Inputs for Player 2 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">P2 Reward (R2):</label>
                <input
                  type="number"
                  value={player2R}
                  onChange={(e) => setPlayer2R(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">P2 Temptation (T2):</label>
                <input
                  type="number"
                  value={player2T}
                  onChange={(e) => setPlayer2T(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">P2 Punishment (P2):</label>
                <input
                  type="number"
                  value={player2P}
                  onChange={(e) => setPlayer2P(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">P2 Sucker (S2):</label>
                <input
                  type="number"
                  value={player2S}
                  onChange={(e) => setPlayer2S(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                />
              </div>
            </div>

            {/* Dual Thresholds Calculation Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs">
              <div className="space-y-1">
                <div className="text-slate-400 font-semibold">{player1} Threshold (δ_1*):</div>
                <div className="text-white">
                  δ_1* = <span className="text-emerald-400 font-bold">{currentStrategyThreshold.toFixed(3)}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-semibold">{player2} Threshold (δ_2*):</div>
                <div className="text-white">
                  δ_2* = <span className="text-amber-400 font-bold">{player2Threshold.toFixed(3)}</span>
                </div>
              </div>
            </div>

            <div className="text-indigo-300 font-semibold text-xs bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-900/50">
              Binding Equilibrium Requirement: δ ≥ max(δ_1*, δ_2*) ={" "}
              <span className="font-mono text-white font-bold">{bindingThreshold.toFixed(3)}</span>. The partner with higher temptation or lower punishment is the "weakest link" determining cartel stability.
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            Enable asymmetric mode to evaluate how unequal market power, profit margins, and punishment payoffs create dual threshold constraints across business partners.
          </p>
        )}
      </div>
    </div>
  );
};
