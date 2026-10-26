import React, { useState, useMemo } from "react";

export const AuctionSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "formats" | "dominance" | "shading" | "revenueEquiv" | "winnersCurse" | "procurement"
  >("formats");

  // Tab 1 & General State
  const [valuation, setValuation] = useState<number>(100);
  const [numBidders, setNumBidders] = useState<number>(4);
  const [maxValuation, setMaxValuation] = useState<number>(150);
  const [userBidFirstPrice, setUserBidFirstPrice] = useState<number>(75);
  const [userBidSecondPrice, setUserBidSecondPrice] = useState<number>(100);

  // Tab 2: Dominance Proof State
  const [dominanceUserVal, setDominanceUserVal] = useState<number>(100);
  const [dominanceUserBid, setDominanceUserBid] = useState<number>(100);
  const [dominanceRivalBid, setDominanceRivalBid] = useState<number>(80);

  // Tab 3: Shading Curve State
  const [shadingVal, setShadingVal] = useState<number>(100);
  const [shadingN, setShadingN] = useState<number>(3);
  const [riskAversionAlpha, setRiskAversionAlpha] = useState<number>(1.0); // 1 = risk neutral, < 1 = risk averse
  const [testBid, setTestBid] = useState<number>(66.7);

  // Tab 4: Revenue Equivalence Monte Carlo State
  const [mcRuns, setMcRuns] = useState<number>(500);
  const [mcN, setMcN] = useState<number>(4);
  const [mcVMax, setMcVMax] = useState<number>(100);
  const [mcResult, setMcResult] = useState<{
    fpsbAvgRevenue: number;
    spsbAvgRevenue: number;
    theoreticalRevenue: number;
    completed: boolean;
  } | null>(null);

  // Tab 5: Winner's Curse State
  const [trueCommonValue, setTrueCommonValue] = useState<number>(300);
  const [noiseRange, setNoiseRange] = useState<number>(60);
  const [wcNumBidders, setWcNumBidders] = useState<number>(5);
  const [lastCurseSim, setLastCurseSim] = useState<{
    trueValue: number;
    signals: number[];
    naiveWinnerIndex: number;
    naiveWinPrice: number;
    naiveProfit: number;
    rationalWinnerIndex: number;
    rationalWinPrice: number;
    rationalProfit: number;
  } | null>(null);

  // Tab 6: Procurement Scoring State
  const [priceWeight, setPriceWeight] = useState<number>(60);
  const [suppliers, setSuppliers] = useState<
    { name: string; price: number; quality: number; reputation: number }[]
  >([
    { name: "Supplier Alpha (Low Cost)", price: 42, quality: 65, reputation: 60 },
    { name: "Supplier Beta (Premium Spec)", price: 68, quality: 95, reputation: 90 },
    { name: "Supplier Gamma (Balanced Tier)", price: 54, quality: 82, reputation: 80 }
  ]);

  // Calculations for Tab 1 (Mechanisms)
  const fpsbOptimalBid = useMemo(() => {
    return ((numBidders - 1) / numBidders) * valuation;
  }, [valuation, numBidders]);

  // Tab 2: Payoffs under 3 scenarios for a given rival bid r
  const dominancePayoffs = useMemo(() => {
    const v = dominanceUserVal;
    const r = dominanceRivalBid;
    const b = dominanceUserBid;

    const underBid = Math.max(0, v - 25);
    const truthBid = v;
    const overBid = v + 25;

    const calcPayoff = (bid: number) => {
      if (bid > r) return { wins: true, pricePaid: r, surplus: v - r };
      if (bid < r) return { wins: false, pricePaid: 0, surplus: 0 };
      // Tie breaking (50% share)
      return { wins: true, pricePaid: r, surplus: (v - r) / 2 };
    };

    return {
      under: calcPayoff(underBid),
      truth: calcPayoff(truthBid),
      over: calcPayoff(overBid),
      current: calcPayoff(b)
    };
  }, [dominanceUserVal, dominanceUserBid, dominanceRivalBid]);

  // Tab 3: Shading Curve Points
  const shadingCurveData = useMemo(() => {
    const points: { bid: number; winProb: number; margin: number; expProfit: number }[] = [];
    const v = shadingVal;
    const n = shadingN;
    const vmax = Math.max(v * 1.25, 100);

    const step = v / 30;
    for (let b = 0; b <= v; b += step) {
      // In symmetric BNE, rival bids are beta distributed or win probability is (b / ( ((n-1)/n)*vmax ))^(n-1)
      // Standard benchmark: win prob = (b / v_max)^(n-1) scaled to [0, 1]
      const bMax = ((n - 1) / n) * vmax;
      const winProb = Math.min(1, Math.max(0, Math.pow(b / bMax, n - 1)));
      const margin = v - b;
      const expProfit = winProb * margin;
      points.push({ bid: b, winProb, margin, expProfit });
    }

    const optimalBidTheory = ((n - 1) / (n - 1 + riskAversionAlpha)) * v;
    return { points, optimalBidTheory };
  }, [shadingVal, shadingN, riskAversionAlpha]);

  // Tab 4: Monte Carlo Simulation Handler
  const handleRunMonteCarlo = () => {
    let totalFpsb = 0;
    let totalSpsb = 0;
    const n = mcN;
    const vmax = mcVMax;

    for (let i = 0; i < mcRuns; i++) {
      // Draw n independent valuations ~ U[0, vmax]
      const vals: number[] = [];
      for (let j = 0; j < n; j++) {
        vals.push(Math.random() * vmax);
      }
      vals.sort((a, b) => b - a); // vals[0] is highest, vals[1] is 2nd highest

      // Under FPSB: highest bidder wins and pays b*(v_(1)) = ((n-1)/n) * v_(1)
      const fpsbPayment = ((n - 1) / n) * vals[0];
      totalFpsb += fpsbPayment;

      // Under SPSB: highest bidder wins and pays 2nd highest bid b(v_(2)) = v_(2)
      const spsbPayment = vals[1];
      totalSpsb += spsbPayment;
    }

    // Theoretical expected value: E[V_(1)] = (n/(n+1))*vmax, E[V_(2)] = ((n-1)/(n+1))*vmax
    // In SPSB, expected payment = E[V_(2)] = ((n-1)/(n+1))*vmax
    // In FPSB, expected payment = ((n-1)/n) * E[V_(1)] = ((n-1)/n) * (n/(n+1))*vmax = ((n-1)/(n+1))*vmax!
    const theoretical = ((n - 1) / (n + 1)) * vmax;

    setMcResult({
      fpsbAvgRevenue: totalFpsb / mcRuns,
      spsbAvgRevenue: totalSpsb / mcRuns,
      theoreticalRevenue: theoretical,
      completed: true
    });
  };

  // Tab 5: Winner's Curse Single-Round Simulation
  const handleSimulateWinnersCurse = () => {
    const V = trueCommonValue;
    const n = wcNumBidders;
    const signals: number[] = [];

    for (let i = 0; i < n; i++) {
      const noise = (Math.random() * 2 - 1) * noiseRange;
      signals.push(Math.round(V + noise));
    }

    // Naive bidding: bid estimate directly b_i = s_i
    let maxNaive = -Infinity;
    let naiveWinIdx = 0;
    signals.forEach((s, idx) => {
      if (s > maxNaive) {
        maxNaive = s;
        naiveWinIdx = idx;
      }
    });

    // In second price common value or first price:
    // Let's assume Second-Price common value auction where naive bidders bid b_i = s_i
    const sortedSignals = [...signals].sort((a, b) => b - a);
    const naiveWinPrice = sortedSignals[1]; // 2nd highest signal
    const naiveProfit = V - naiveWinPrice;

    // Rational shaded bidder: knows that winning implies s_i = max(signals).
    // Expected highest order statistic among n draws from U[V - eps, V + eps] is V + ((n-1)/(n+1))*eps.
    // Therefore rational bid shades estimate down by ((n-1)/(n+1)) * noiseRange
    const shadeAmount = ((n - 1) / (n + 1)) * noiseRange;
    const rationalBids = signals.map(s => Math.round(s - shadeAmount));
    const sortedRational = [...rationalBids].sort((a, b) => b - a);
    const rationalWinPrice = sortedRational[1];
    const rationalProfit = V - rationalWinPrice;

    setLastCurseSim({
      trueValue: V,
      signals,
      naiveWinnerIndex: naiveWinIdx,
      naiveWinPrice,
      naiveProfit,
      rationalWinnerIndex: naiveWinIdx,
      rationalWinPrice,
      rationalProfit
    });
  };

  // Tab 6: Procurement Scoring Formula
  const evaluatedSuppliers = useMemo(() => {
    const wPrice = priceWeight / 100;
    const wQual = (100 - priceWeight) / 100;

    // Lowest price gets 100 on price score; highest gets 50
    const minP = Math.min(...suppliers.map(s => s.price));

    return suppliers
      .map(s => {
        // Inverse price score: (minPrice / price) * 100
        const priceScore = (minP / s.price) * 100;
        const qualityScore = s.quality * 0.7 + s.reputation * 0.3;
        const totalScore = wPrice * priceScore + wQual * qualityScore;
        return {
          ...s,
          priceScore: Math.round(priceScore * 10) / 10,
          qualityScore: Math.round(qualityScore * 10) / 10,
          totalScore: Math.round(totalScore * 10) / 10
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore);
  }, [priceWeight, suppliers]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full">
                Interactive Bidding Engine
              </span>
              <span className="text-xs text-blue-200 font-medium">Week 7 Core Lab</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mt-1 text-white">
              Auctions & Bidding Mechanics Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Compare First-Price, Second-Price, English, and Dutch auctions. Test weak dominance of truthful bidding, quantify optimal bid shading, verify Revenue Equivalence, and avoid the Winner's Curse.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-mono bg-blue-800/60 border border-blue-400/30 px-2.5 py-1 rounded text-blue-200">
              b*(v) = [(n-1)/n] · v
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 mt-5 pt-3 border-t border-slate-700/60 text-xs">
          {[
            { id: "formats", label: "1. Four Classic Formats", icon: "⚖️" },
            { id: "dominance", label: "2. Second-Price Dominance", icon: "🎯" },
            { id: "shading", label: "3. First-Price Shading", icon: "📉" },
            { id: "revenueEquiv", label: "4. Revenue Equivalence", icon: "🏛️" },
            { id: "winnersCurse", label: "5. Winner's Curse Lab", icon: "⚠️" },
            { id: "procurement", label: "6. Procurement Scoring", icon: "🏭" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-300"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* ========================================================================= */}
        {/* TAB 1: FOUR CLASSIC FORMATS */}
        {/* ========================================================================= */}
        {activeTab === "formats" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Controls */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 md:col-span-1">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>⚙️</span> Auction Parameters
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Your Valuation (v):</span>
                    <span className="font-mono font-bold text-blue-700">${valuation}</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="200"
                    step="5"
                    value={valuation}
                    onChange={e => setValuation(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Maximum willingness to pay for the license or asset.
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Competing Bidders (n):</span>
                    <span className="font-mono font-bold text-blue-700">{numBidders} bidders</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="1"
                    value={numBidders}
                    onChange={e => setNumBidders(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    More rivals intensify competition and reduce bid shading.
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <div className="text-xs font-semibold text-slate-800 mb-1">
                    Theoretical Optimal Bids:
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-bold text-blue-900 flex justify-between">
                        <span>First-Price Sealed Bid:</span>
                        <span className="font-mono">${fpsbOptimalBid.toFixed(1)}</span>
                      </div>
                      <div className="text-[10px] text-blue-800 mt-0.5">
                        Shade bid: b* = ({numBidders}-1)/{numBidders} · {valuation} = ${(fpsbOptimalBid).toFixed(1)}
                      </div>
                    </div>
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="font-bold text-emerald-900 flex justify-between">
                        <span>Second-Price (Vickrey):</span>
                        <span className="font-mono">${valuation}</span>
                      </div>
                      <div className="text-[10px] text-emerald-800 mt-0.5">
                        Truthful bidding: b* = v = ${valuation} (Weakly dominant)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Formats Matrix Comparison */}
              <div className="md:col-span-2 space-y-4">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  The Four Canonical Auction Mechanisms (Slides 8–9)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* First-Price */}
                  <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-950 text-sm">1. First-Price Sealed Bid</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded">FPSB</span>
                    </div>
                    <div className="text-xs text-slate-700 space-y-1.5">
                      <div><strong className="text-slate-900">Allocation Rule:</strong> Highest confidential sealed bid wins.</div>
                      <div><strong className="text-slate-900">Payment Rule:</strong> Winner pays their <em>own submitted bid</em>.</div>
                      <div><strong className="text-slate-900">Strategic Incentive:</strong> <strong>Bid Shading</strong>. Bidding v gives 0 surplus; shade down to balance win probability vs profit margin.</div>
                      <div className="p-2 bg-white rounded border border-blue-200 font-mono text-[11px] text-blue-900">
                        b*(v) = [(n-1)/n] · v = ${fpsbOptimalBid.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  {/* Second-Price */}
                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-950 text-sm">2. Second-Price Sealed Bid</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">Vickrey</span>
                    </div>
                    <div className="text-xs text-slate-700 space-y-1.5">
                      <div><strong className="text-slate-900">Allocation Rule:</strong> Highest confidential sealed bid wins.</div>
                      <div><strong className="text-slate-900">Payment Rule:</strong> Winner pays the <em>second-highest losing bid</em>.</div>
                      <div><strong className="text-slate-900">Strategic Incentive:</strong> <strong>Truthful Bidding</strong>. Bidding b = v is weakly dominant. Your bid only decides winning, not payment!</div>
                      <div className="p-2 bg-white rounded border border-emerald-200 font-mono text-[11px] text-emerald-900">
                        b*(v) = v = ${valuation} (No shading)
                      </div>
                    </div>
                  </div>

                  {/* English Ascending */}
                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-950 text-sm">3. English Open Ascending</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-800 rounded">Ascending Clock</span>
                    </div>
                    <div className="text-xs text-slate-700 space-y-1.5">
                      <div><strong className="text-slate-900">Process:</strong> Price rises continuously until only 1 bidder remains.</div>
                      <div><strong className="text-slate-900">Standard Logic:</strong> Strategically resembles <strong>Second-Price</strong>. The winner stays until rival exits just below their value.</div>
                      <div><strong className="text-slate-900">Proxy Bidding:</strong> Platforms like eBay allow max limit and automatically outbid rivals by minimum increment.</div>
                      <div className="p-2 bg-white rounded border border-purple-200 text-[11px] text-purple-950">
                        Stop price ≈ 2nd-highest valuation.
                      </div>
                    </div>
                  </div>

                  {/* Dutch Descending */}
                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-950 text-sm">4. Dutch Open Descending</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">Descending Clock</span>
                    </div>
                    <div className="text-xs text-slate-700 space-y-1.5">
                      <div><strong className="text-slate-900">Process:</strong> Clock starts high and falls until the first bidder presses the buzzer.</div>
                      <div><strong className="text-slate-900">Standard Logic:</strong> Strategically equivalent to <strong>First-Price Sealed Bid</strong>. Deciding when to stop balances waiting vs losing to someone else.</div>
                      <div><strong className="text-slate-900">Information:</strong> Zero info revealed until auction abruptly ends!</div>
                      <div className="p-2 bg-white rounded border border-amber-200 text-[11px] text-amber-950">
                        Wait until price drops to b*(v).
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 flex items-center gap-3">
                  <span className="text-lg">💡</span>
                  <div>
                    <strong>Core Equivalence Pairs (Slide 9):</strong> English ≈ Second-Price (winner pays 2nd highest value); Dutch ≈ First-Price (winner pays own stopping bid).
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SECOND-PRICE DOMINANCE PROOF */}
        {/* ========================================================================= */}
        {activeTab === "dominance" && (
          <div className="space-y-6">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                <span>🎯</span> The Mathematical Genius of Vickrey (Slide 10–12, 28)
              </div>
              <p className="text-emerald-900 text-xs sm:text-sm">
                In a private-value Second-Price auction, <strong>bidding your exact true valuation (b = v) is a weakly dominant strategy</strong>. It gives at least as high a payoff as any other bid, regardless of what rival bidders submit. Your bid selects <em>whether</em> you win; the rival's bid determines <em>what</em> you pay!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Interactive Controls */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                <div className="font-bold text-slate-900 text-sm">Interactive Dominance Lab</div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Your True Valuation (v):</span>
                    <span className="font-mono font-bold text-slate-900">${dominanceUserVal}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    step="5"
                    value={dominanceUserVal}
                    onChange={e => setDominanceUserVal(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Your Chosen Bid (b):</span>
                    <span className="font-mono font-bold text-blue-700">${dominanceUserBid}</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    step="5"
                    value={dominanceUserBid}
                    onChange={e => setDominanceUserBid(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>Underbid (&lt;v)</span>
                    <button
                      onClick={() => setDominanceUserBid(dominanceUserVal)}
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      Truthful (b = v)
                    </button>
                    <span>Overbid (&gt;v)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Highest Rival Bid (r):</span>
                    <span className="font-mono font-bold text-rose-700">${dominanceRivalBid}</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    step="5"
                    value={dominanceRivalBid}
                    onChange={e => setDominanceRivalBid(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Simulate how your payoff changes as the highest rival bid varies.
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1.5">
                  <div className="font-bold text-slate-900">Current Outcome:</div>
                  <div className="flex justify-between">
                    <span>Winner:</span>
                    <span className={`font-bold ${dominanceUserBid >= dominanceRivalBid ? "text-emerald-700" : "text-rose-700"}`}>
                      {dominanceUserBid >= dominanceRivalBid ? "YOU WIN" : "RIVAL WINS"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price Paid by Winner:</span>
                    <span className="font-mono font-bold">${dominanceUserBid >= dominanceRivalBid ? dominanceRivalBid : dominanceUserBid}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-100">
                    <span>Your Net Surplus (v - Price):</span>
                    <span className={`font-mono font-bold ${dominancePayoffs.current.surplus >= 0 ? "text-emerald-700" : "text-red-600"}`}>
                      ${dominancePayoffs.current.surplus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Side-by-Side Proof Scenarios */}
              <div className="md:col-span-2 space-y-4">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Why Deviations Never Beat Truthful Bidding (Slide 11–12)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Case A: Underbidding */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    dominanceUserBid < dominanceUserVal
                      ? "border-amber-400 bg-amber-50/50 shadow-xs ring-2 ring-amber-300"
                      : "border-slate-200 bg-slate-50"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 text-sm">Trap 1: Underbidding (b &lt; v)</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-200 text-amber-900 rounded font-bold">
                        Underbid
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">
                      Suppose your value is {dominanceUserVal}, but you submit an underbid. Does underbidding lower what you pay when you win?
                    </p>
                    <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs space-y-1 font-mono">
                      <div className="text-red-700 font-bold">NO! Price paid = r, NOT your bid!</div>
                      <div className="text-slate-600 text-[11px]">
                        - If rival bid r &lt; b: you win and pay r. Payoff is (v - r), identical to bidding v.<br />
                        - If rival bid b &lt; r &lt; v: you LOSE! You forgo a profitable deal where surplus (v - r) &gt; 0!
                      </div>
                    </div>
                  </div>

                  {/* Case B: Overbidding */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    dominanceUserBid > dominanceUserVal
                      ? "border-red-400 bg-red-50/50 shadow-xs ring-2 ring-red-300"
                      : "border-slate-200 bg-slate-50"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 text-sm">Trap 2: Overbidding (b &gt; v)</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-red-200 text-red-900 rounded font-bold">
                        Overbid
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">
                      Suppose your value is {dominanceUserVal}, but you bid high to "guarantee" a win. What happens if rival bids aggressively?
                    </p>
                    <div className="p-3 bg-white rounded-lg border border-red-200 text-xs space-y-1 font-mono">
                      <div className="text-red-700 font-bold">DANGER: Negative Surplus!</div>
                      <div className="text-slate-600 text-[11px]">
                        - If rival bid r &lt; v: you win and pay r, identical to bidding v.<br />
                        - If rival bid v &lt; r &lt; b: you WIN, but pay r &gt; v, producing negative surplus (v - r) &lt; 0!
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formal Dominance Summary Card */}
                <div className="p-4 bg-emerald-900 text-white rounded-xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-200 text-sm">
                    <span>⚖️</span> The Dominance Conclusion (Slide 28 Supplementary)
                  </div>
                  <div className="text-xs text-emerald-100 space-y-1">
                    <div>
                      Let highest rival bid be <em>r</em>:
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      <li>If <strong>r &lt; v</strong>: Truthful bid v wins and gets (v - r) &gt; 0. Underbid might lose this surplus.</li>
                      <li>If <strong>r &gt; v</strong>: Truthful bid v loses and pays 0. Overbid might win and produce (v - r) &lt; 0.</li>
                      <li>If <strong>r = v</strong>: Payoff is 0 under all winning bids.</li>
                    </ul>
                    <div className="pt-2 border-t border-emerald-700/60 font-semibold text-emerald-300 text-xs">
                      Therefore, b = v is weakly dominant: it gives at least as high a payoff as any other bid for every possible rival bid!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: FIRST-PRICE BID SHADING */}
        {/* ========================================================================= */}
        {activeTab === "shading" && (
          <div className="space-y-6">
            <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="font-bold text-blue-950 text-sm flex items-center gap-2">
                <span>📉</span> The Bid-Shading Optimization Dilemma (Slides 13–14)
              </div>
              <p className="text-blue-900 text-xs sm:text-sm">
                In a First-Price auction, the winner pays their <em>own bid</em>. If you bid your full value (b = v), your surplus upon winning is exactly (v - v) = 0! Therefore, bidders <strong>shade their bids below value</strong>, balancing the probability of winning against the profit margin conditional on winning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Controls */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                <div className="font-bold text-slate-900 text-sm">Shading Parameters</div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Valuation (v):</span>
                    <span className="font-mono font-bold text-blue-700">${shadingVal}</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    step="5"
                    value={shadingVal}
                    onChange={e => setShadingVal(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Number of Competitors (n):</span>
                    <span className="font-mono font-bold text-blue-700">{shadingN} bidders</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="1"
                    value={shadingN}
                    onChange={e => setShadingN(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    As n increases, competition intensifies, forcing bidders to shade less.
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Risk Attitude (α):</span>
                    <span className="font-mono font-bold text-indigo-700">
                      {riskAversionAlpha === 1.0 ? "Risk Neutral (α = 1.0)" : `Risk Averse (α = ${riskAversionAlpha.toFixed(2)})`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="1.0"
                    step="0.05"
                    value={riskAversionAlpha}
                    onChange={e => setRiskAversionAlpha(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Risk-averse bidders shade LESS because they fear losing more than paying extra.
                  </div>
                </div>

                <div className="p-3 bg-blue-100/60 border border-blue-200 rounded-lg text-xs space-y-1">
                  <div className="font-bold text-blue-950">Theoretical Optimal Bid:</div>
                  <div className="text-xl font-mono font-bold text-blue-700">
                    ${shadingCurveData.optimalBidTheory.toFixed(1)}
                  </div>
                  <div className="text-[11px] text-blue-900">
                    Shading Factor: {((shadingCurveData.optimalBidTheory / shadingVal) * 100).toFixed(1)}% of value
                  </div>
                </div>
              </div>

              {/* Shading Visual Curve & Intuition */}
              <div className="md:col-span-2 space-y-4">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Expected Profit Curve: The Peak at b* = [(n-1)/n] · v
                  </span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    E[Profit] = (v - b) · Prob(Win)
                  </span>
                </div>

                {/* Visual SVG curve */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-white">
                  <div className="h-48 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="140" x2="400" y2="140" stroke="#334155" strokeWidth="1" />
                      <line x1="0" y1="20" x2="400" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

                      {/* Render Points Path for Expected Profit */}
                      {(() => {
                        const pts = shadingCurveData.points;
                        if (!pts.length) return null;
                        const maxExp = Math.max(...pts.map(p => p.expProfit), 0.01);
                        const pathD = pts
                          .map((p, idx) => {
                            const x = (p.bid / shadingVal) * 380 + 10;
                            const y = 140 - (p.expProfit / maxExp) * 110;
                            return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                          })
                          .join(" ");

                        // Optimal bid x coordinate
                        const optX = (shadingCurveData.optimalBidTheory / shadingVal) * 380 + 10;

                        return (
                          <>
                            <path d={pathD} fill="none" stroke="#60a5fa" strokeWidth="3" />
                            {/* Marker at optimal bid */}
                            <line x1={optX} y1="20" x2={optX} y2="140" stroke="#34d399" strokeWidth="2" strokeDasharray="4 2" />
                            <circle cx={optX} cy="30" r="4" fill="#34d399" />
                            <text x={optX + 6} y="35" fill="#34d399" fontSize="10" fontWeight="bold">
                              Peak b* = ${shadingCurveData.optimalBidTheory.toFixed(1)}
                            </text>
                          </>
                        );
                      })()}
                    </svg>

                    <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
                      <span>b = $0 (Margin 100%, Win Prob 0%)</span>
                      <span className="text-emerald-400 font-bold">Optimal Balance b*</span>
                      <span>b = ${shadingVal} (Margin 0%, Surplus 0)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <strong className="text-slate-900 block">The Trade-off Mechanics (Slide 13):</strong>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Bid Lower:</strong> Higher margin (v - b) if you win, but higher chance of being undercut.<br />
                      <strong>Bid Higher:</strong> Higher probability of winning, but lower profit margin left for the firm.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <strong className="text-slate-900 block">Number of Competitors Effect:</strong>
                    <p className="text-slate-600 text-[11px]">
                      With n=2, optimal bid is 50% of value. With n=4, optimal bid is 75% of value. With n=10, optimal bid is 90% of value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: REVENUE EQUIVALENCE */}
        {/* ========================================================================= */}
        {activeTab === "revenueEquiv" && (
          <div className="space-y-6">
            <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="font-bold text-indigo-950 text-sm flex items-center gap-2">
                <span>🏛️</span> The Revenue Equivalence Theorem (Slide 15–16)
              </div>
              <p className="text-indigo-900 text-xs sm:text-sm">
                Under the benchmark model (<strong>Risk-neutral bidders, Symmetric competitors, Independent private values, Efficient allocation</strong>), First-Price, Second-Price, English, and Dutch auctions generate the <strong>exact same expected seller revenue</strong>! Strategic bid shading in First-Price exactly cancels out the higher payment rule in Second-Price on average.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Simulation Settings */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                <div className="font-bold text-slate-900 text-sm">Monte Carlo Lab</div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Number of Bidders (n):</span>
                    <span className="font-mono font-bold text-indigo-700">{mcN}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="1"
                    value={mcN}
                    onChange={e => setMcN(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Maximum Valuation (V_max):</span>
                    <span className="font-mono font-bold text-indigo-700">${mcVMax}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    step="10"
                    value={mcVMax}
                    onChange={e => setMcVMax(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Simulation Iterations:</span>
                    <span className="font-mono font-bold text-indigo-700">{mcRuns} auctions</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="100"
                    value={mcRuns}
                    onChange={e => setMcRuns(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <button
                  onClick={handleRunMonteCarlo}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>🎲</span> Run Monte Carlo Simulation
                </button>
              </div>

              {/* Simulation Results & Theory */}
              <div className="md:col-span-2 space-y-4">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  Expected Seller Revenue Comparison
                </div>

                {mcResult ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                        <div className="font-bold text-blue-900">First-Price (Simulated)</div>
                        <div className="text-xl font-mono font-bold text-blue-700">
                          ${mcResult.fpsbAvgRevenue.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-blue-800">Winner pays shaded bid b*(v_(1))</div>
                      </div>

                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                        <div className="font-bold text-emerald-900">Second-Price (Simulated)</div>
                        <div className="text-xl font-mono font-bold text-emerald-700">
                          ${mcResult.spsbAvgRevenue.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-emerald-800">Winner pays 2nd valuation v_(2)</div>
                      </div>

                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-1">
                        <div className="font-bold text-purple-900">Theoretical Benchmark</div>
                        <div className="text-xl font-mono font-bold text-purple-700">
                          ${mcResult.theoreticalRevenue.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-purple-800">[(n-1)/(n+1)] · V_max</div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>📊</span> Why Revenue Equivalence Holds (Slide 16):
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Suppose four bidders value the asset at 10, 9, 8, and 7. In Second-Price, truthful bidding makes bidder 1 win and pay <strong>9</strong>. In First-Price, bidder 1 wins and pays their own shaded bid. Under symmetric equilibrium with uniform distributions, the bid-shading formula ensures that the expected winning bid <em>exactly equals 9 on average</em>!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center space-y-2">
                    <span className="text-3xl">🎲</span>
                    <div className="font-bold text-slate-800 text-sm">Ready to Test Revenue Equivalence</div>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Click the button on the left to simulate {mcRuns} independent auctions and verify whether First-Price and Second-Price auctions yield identical expected seller revenues.
                    </p>
                  </div>
                )}

                {/* 4 Strict Conditions Checklist */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2 text-xs">
                  <div className="font-bold text-slate-900">The 4 Strict Assumptions of Revenue Equivalence (Slide 15):</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div className="flex items-start gap-1.5 p-2 bg-slate-50 rounded">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Risk Neutrality:</strong> If bidders are risk averse, First-Price yields higher seller revenue!</span>
                    </div>
                    <div className="flex items-start gap-1.5 p-2 bg-slate-50 rounded">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Symmetric Bidders:</strong> Asymmetric bidder power breaks equivalence.</span>
                    </div>
                    <div className="flex items-start gap-1.5 p-2 bg-slate-50 rounded">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Independent Private Values:</strong> Fails in common-value assets with Winner's Curse.</span>
                    </div>
                    <div className="flex items-start gap-1.5 p-2 bg-slate-50 rounded">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Efficient Allocation:</strong> Reserve prices and platform rules alter revenue.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: WINNER'S CURSE LAB */}
        {/* ========================================================================= */}
        {activeTab === "winnersCurse" && (
          <div className="space-y-6">
            <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="font-bold text-amber-950 text-sm flex items-center gap-2">
                <span>⚠️</span> The Winner's Curse in Common-Value Auctions (Slide 7, 17)
              </div>
              <p className="text-amber-900 text-xs sm:text-sm">
                When bidding for an asset with a common underlying value (e.g., offshore oil drilling block, corporate takeover target, spectrum license), bidders receive noisy estimates. <strong>The winner is often the bidder with the most optimistic estimation error!</strong> If you fail to shade your bid for the information contained in winning, winning becomes a financial curse!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Controls */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                <div className="font-bold text-slate-900 text-sm">Common Value Setup</div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>True Asset Value (V):</span>
                    <span className="font-mono font-bold text-slate-900">${trueCommonValue}</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="500"
                    step="25"
                    value={trueCommonValue}
                    onChange={e => setTrueCommonValue(Number(e.target.value))}
                    className="w-full accent-slate-700 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">Unknown shared value of the asset.</div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Estimation Noise (±ε):</span>
                    <span className="font-mono font-bold text-amber-700">±${noiseRange}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="10"
                    value={noiseRange}
                    onChange={e => setNoiseRange(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Number of Bidders (n):</span>
                    <span className="font-mono font-bold text-slate-900">{wcNumBidders} bidders</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    step="1"
                    value={wcNumBidders}
                    onChange={e => setWcNumBidders(Number(e.target.value))}
                    className="w-full accent-slate-700 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    More bidders increase the probability of an extreme positive outlier signal!
                  </div>
                </div>

                <button
                  onClick={handleSimulateWinnersCurse}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>⚡</span> Simulate Bidding Round
                </button>
              </div>

              {/* Simulation Comparison */}
              <div className="md:col-span-2 space-y-4">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  Naive Bidder vs. Rational Shaded Bidder
                </div>

                {lastCurseSim ? (
                  <div className="space-y-4">
                    {/* Signal Display */}
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                      <div className="font-bold text-slate-900 flex justify-between">
                        <span>Bidders' Private Signals (Estimates):</span>
                        <span className="font-mono text-slate-600">True Asset Value V = ${lastCurseSim.trueValue}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {lastCurseSim.signals.map((sig, idx) => (
                          <div
                            key={idx}
                            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                              idx === lastCurseSim.naiveWinnerIndex
                                ? "bg-amber-100 border-amber-300 font-bold text-amber-950"
                                : "bg-white border-slate-200 text-slate-700"
                            }`}
                          >
                            Bidder {idx + 1}: ${sig} {sig > lastCurseSim.trueValue ? `(+${sig - lastCurseSim.trueValue})` : `(${sig - lastCurseSim.trueValue})`}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Naive Outcome */}
                      <div className={`p-4 rounded-xl border ${
                        lastCurseSim.naiveProfit < 0
                          ? "bg-red-50/70 border-red-300 ring-1 ring-red-200"
                          : "bg-emerald-50 border-emerald-200"
                      } space-y-2 text-xs`}>
                        <div className="font-bold text-slate-900 flex justify-between">
                          <span>Naive Bidder (No Curse Adjustment)</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            lastCurseSim.naiveProfit < 0 ? "bg-red-200 text-red-900" : "bg-emerald-200 text-emerald-900"
                          }`}>
                            {lastCurseSim.naiveProfit < 0 ? "CURSE VICTIM" : "PROFIT"}
                          </span>
                        </div>
                        <div className="space-y-1 font-mono text-[11px] text-slate-700">
                          <div>Winning Price Paid: ${lastCurseSim.naiveWinPrice}</div>
                          <div>True Underlying Value: ${lastCurseSim.trueValue}</div>
                          <div className={`text-base font-bold pt-1 border-t ${
                            lastCurseSim.naiveProfit < 0 ? "text-red-700" : "text-emerald-700"
                          }`}>
                            Profit: ${lastCurseSim.naiveProfit}
                          </div>
                        </div>
                        {lastCurseSim.naiveProfit < 0 && (
                          <p className="text-[11px] text-red-700 pt-1">
                            The winner paid more than the asset is actually worth because they failed to discount for their extreme estimate!
                          </p>
                        )}
                      </div>

                      {/* Rational Outcome */}
                      <div className="p-4 rounded-xl border bg-emerald-50/70 border-emerald-300 space-y-2 text-xs">
                        <div className="font-bold text-emerald-950 flex justify-between">
                          <span>Rational Bidder (Conditions on Winning)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-900">
                            PROTECTED
                          </span>
                        </div>
                        <div className="space-y-1 font-mono text-[11px] text-slate-700">
                          <div>Shaded Winning Price: ${lastCurseSim.rationalWinPrice}</div>
                          <div>True Underlying Value: ${lastCurseSim.trueValue}</div>
                          <div className="text-base font-bold text-emerald-700 pt-1 border-t">
                            Profit: ${lastCurseSim.rationalProfit}
                          </div>
                        </div>
                        <p className="text-[11px] text-emerald-800 pt-1">
                          Rational bidding conditions on: <em>"If I win, everyone else estimated less, so my estimate is the most optimistic."</em>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center space-y-2">
                    <span className="text-3xl">⚠️</span>
                    <div className="font-bold text-slate-800 text-sm">Experience the Winner's Curse</div>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Click the button on the left to simulate a common-value bidding round with random estimation errors.
                    </p>
                  </div>
                )}

                <div className="p-4 bg-slate-900 text-white rounded-xl text-xs space-y-1.5">
                  <div className="font-bold text-amber-400">The Executive Rule for Common Values (Slide 17):</div>
                  <div className="text-slate-200 text-[11px]">
                    <em>"Winning is informative: every rival estimated less or bid less. An unconditional estimate is always too optimistic conditional on winning. Winning is NOT success if the payment exceeds the asset's true value!"</em>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: PROCUREMENT SCORING */}
        {/* ========================================================================= */}
        {activeTab === "procurement" && (
          <div className="space-y-6">
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="font-bold text-slate-950 text-sm flex items-center gap-2">
                <span>🏭</span> Reverse Auctions & Two-Dimensional Procurement (Slide 21–22)
              </div>
              <p className="text-slate-700 text-xs sm:text-sm">
                In corporate procurement, the buyer seeks the lowest acceptable offer. However, <strong>price is not the only dimension</strong>: awarding purely on the lowest price invites contractor bankruptcy, delayed delivery, or sub-par quality. Modern procurement combines <em>Price Score</em> and <em>Quality/Reliability Score</em> into an announced award formula.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Scoring Weights */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                <div className="font-bold text-slate-900 text-sm">Evaluation Formula</div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Price Weight (w_p):</span>
                    <span className="font-mono font-bold text-blue-700">{priceWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    step="5"
                    value={priceWeight}
                    onChange={e => setPriceWeight(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Technical & Quality Weight (w_q):</span>
                    <span className="font-mono font-bold text-emerald-700">{100 - priceWeight}%</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Total Evaluation Score = {priceWeight}% · PriceScore + {100 - priceWeight}% · QualityScore
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs space-y-1">
                  <div className="font-bold text-amber-900">Managerial Takeaway (Slide 22):</div>
                  <p className="text-amber-800 text-[11px]">
                    A low bid is valuable only if the supplier can reliably deliver the required technical capability.
                  </p>
                </div>
              </div>

              {/* Evaluated Suppliers Leaderboard */}
              <div className="md:col-span-2 space-y-4">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Supplier Evaluation Leaderboard
                  </span>
                  <span className="text-[11px] text-emerald-700 font-bold">
                    Highest Combined Score Wins
                  </span>
                </div>

                <div className="space-y-3">
                  {evaluatedSuppliers.map((supp, sIdx) => (
                    <div
                      key={supp.name}
                      className={`p-4 rounded-xl border transition-all ${
                        sIdx === 0
                          ? "bg-emerald-50/60 border-emerald-300 ring-2 ring-emerald-400/40 shadow-xs"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            sIdx === 0 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"
                          }`}>
                            {sIdx + 1}
                          </span>
                          <span className="font-bold text-slate-900 text-sm">{supp.name}</span>
                          {sIdx === 0 && (
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-200 text-emerald-900 rounded-full">
                              WINNING CONTRACTOR
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-500 mr-2">Total Score:</span>
                          <span className="font-mono text-base font-bold text-blue-900">{supp.totalScore} pts</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2 border-t border-slate-100">
                        <div className="p-2 bg-slate-50 rounded">
                          <div className="text-[10px] text-slate-500">Quoted Price:</div>
                          <div className="font-mono font-bold text-slate-900">${supp.price}k</div>
                        </div>
                        <div className="p-2 bg-slate-50 rounded">
                          <div className="text-[10px] text-slate-500">Price Score:</div>
                          <div className="font-mono font-bold text-blue-700">{supp.priceScore} / 100</div>
                        </div>
                        <div className="p-2 bg-slate-50 rounded">
                          <div className="text-[10px] text-slate-500">Quality Spec:</div>
                          <div className="font-mono font-bold text-emerald-700">{supp.quality} / 100</div>
                        </div>
                        <div className="p-2 bg-slate-50 rounded">
                          <div className="text-[10px] text-slate-500">Reliability & Rep:</div>
                          <div className="font-mono font-bold text-purple-700">{supp.reputation} / 100</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
