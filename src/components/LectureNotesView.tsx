import React, { useState } from "react";
import { FULL_RECAPS_MARKDOWN, ALL_WEEKS_COMBINED_MARKDOWN } from "../data/recapsMarkdown";
import { MarkdownRecapViewer } from "./MarkdownRecapViewer";
import { GameTreeDiagram } from "./GameTreeDiagram";
import { DominanceSolvableMatrix } from "./DominanceSolvableMatrix";
import { CommitmentGameTree } from "./CommitmentGameTree";
import { MixedStrategyVisualizer } from "./MixedStrategyVisualizer";
import { ElaboratedBusinessCasesView } from "./ElaboratedBusinessCasesView";
import { RepeatedGameSimulator } from "./RepeatedGameSimulator";

interface LectureNotesViewProps {
  selectedWeek: {
    id: number;
    title: string;
    chineseTitle: string;
    duration: string;
    slidePath: string;
    pageCount: number;
    recap?: any;
    coreConcepts: string[];
    businessCases: string[];
  };
  onSelectWeek?: (weekId: number) => void;
}

export const LectureNotesView: React.FC<LectureNotesViewProps> = ({ selectedWeek, onSelectWeek }) => {
  const [learningMode, setLearningMode] = useState<"beginner" | "formal" | "cases" | "fullRecap">("beginner");
  const [showJargonBuster, setShowJargonBuster] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  // Week 5 Interactive Simulator State
  const [capacityK, setCapacityK] = useState<number>(1);
  const [activeStepW4, setActiveStepW4] = useState<number>(1);

  // Self-test quiz state: weekId -> questionIndex -> selectedOption
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizRevealed, setQuizRevealed] = useState<Record<string, boolean>>({});

  const handleSelectQuiz = (qKey: string, optionIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [qKey]: optionIdx }));
    setQuizRevealed(prev => ({ ...prev, [qKey]: true }));
  };

  const fullMarkdown = FULL_RECAPS_MARKDOWN[selectedWeek.id] || ALL_WEEKS_COMBINED_MARKDOWN;

  const handleCopyMarkdown = () => {
    if (fullMarkdown) {
      navigator.clipboard.writeText(fullMarkdown);
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2000);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!fullMarkdown) return;
    const blob = new Blob([fullMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = selectedWeek.id in FULL_RECAPS_MARKDOWN
      ? `week${selectedWeek.id.toString().padStart(2, "0")}-recap.md`
      : "game-theory-full-course-compendium.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs space-y-6">
      {/* TOP ACADEMIC & EXECUTIVE BANNER */}
      {selectedWeek.recap && (
        <div className="border-l-4 border-blue-600 bg-blue-50/60 p-4 sm:p-5 rounded-r-lg space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Core Academic Maxim
            </span>
            <span className="text-xs font-mono text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
              Strategic Maxim
            </span>
          </div>
          <p className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">
            "{selectedWeek.recap.academicTakeaway}"
          </p>
          <p className="text-xs text-blue-900/80 italic">
            {selectedWeek.recap.chineseTakeaway}
          </p>
        </div>
      )}

      {/* LEARNING MODE SELECTOR TABS & ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
          <button
            onClick={() => setLearningMode("beginner")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              learningMode === "beginner"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>🌱</span> Beginner Intuition & Plain English
          </button>

          <button
            onClick={() => setLearningMode("formal")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              learningMode === "formal"
                ? "bg-blue-800 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>📐</span> Step-by-Step Math & Game Proofs
          </button>

          <button
            onClick={() => setLearningMode("cases")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              learningMode === "cases"
                ? "bg-indigo-800 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>🏢</span> Business Cases & Executive Playbook
          </button>

          <button
            onClick={() => setLearningMode("fullRecap")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              learningMode === "fullRecap"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>📜</span> Full Course Recap (.md)
          </button>
        </div>

        {/* Quick Tools */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowJargonBuster(!showJargonBuster)}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1 ${
              showJargonBuster
                ? "bg-amber-100 text-amber-900 border-amber-300"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
            title="Click to view beginner explanations of game theory terms"
          >
            <span>💡</span>
            <span className="hidden sm:inline">Beginner</span> Jargon Buster
          </button>
        </div>
      </div>

      {/* BEGINNER JARGON BUSTER ACCORDION / DRAWER */}
      {showJargonBuster && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 sm:p-5 text-xs text-amber-950 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-amber-200 pb-2">
            <div className="font-bold text-sm flex items-center gap-1.5 text-amber-900">
              <span>💡</span> Game Theory Jargon Buster (Zero-Math Plain English)
            </div>
            <button
              onClick={() => setShowJargonBuster(false)}
              className="text-amber-700 hover:text-amber-950 font-bold px-2 py-0.5 rounded hover:bg-amber-100"
            >
              Close ✕
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs space-y-1">
              <div className="font-bold text-slate-900">Nash Equilibrium</div>
              <div className="text-emerald-700 font-semibold text-[11px]">"The No-Regrets State"</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                A situation where everyone knows what everyone else picked, and nobody has any regret or incentive to change their choice alone.
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs space-y-1">
              <div className="font-bold text-slate-900">Backward Induction</div>
              <div className="text-blue-700 font-semibold text-[11px]">"Playing the Movie in Reverse"</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Looking at the end of the game first: "What will the other person do when cornered?" Then taking that knowledge to make your first move today.
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs space-y-1">
              <div className="font-bold text-slate-900">Strategic Commitment</div>
              <div className="text-purple-700 font-semibold text-[11px]">"Burning Your Own Ships"</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Tying your own hands in advance so you physically or financially *cannot* back down. This forces your rival to be the one who yields.
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs space-y-1">
              <div className="font-bold text-slate-900">Indifference Principle</div>
              <div className="text-orange-700 font-semibold text-[11px]">"The Perfect Balance Beam"</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Picking your random probabilities so your rival gets the exact same reward no matter which counter-move they try. They give up trying to exploit you!
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs space-y-1">
              <div className="font-bold text-slate-900">Sunk Cost</div>
              <div className="text-red-700 font-semibold text-[11px]">"Spilled Milk You Can't Unspill"</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Money or effort already spent that cannot be recovered. Rational thinkers ignore past sunk costs when choosing what to do next!
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs space-y-1">
              <div className="font-bold text-slate-900">Credible Threat</div>
              <div className="text-indigo-700 font-semibold text-[11px]">"A Threat You'll Actually Do"</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                A warning that will be strictly in your best interest to carry out when the time comes. If carrying it out would hurt you, it's just cheap talk!
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs space-y-1">
              <div className="font-bold text-slate-900">Dominant Strategy</div>
              <div className="text-teal-700 font-semibold text-[11px]">"The No-Brainer Move"</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                An action that gives you the best payoff regardless of whatever move your competitor chooses to make.
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs space-y-1">
              <div className="font-bold text-slate-900">Mixed Strategy</div>
              <div className="text-pink-700 font-semibold text-[11px]">"Controlled Unpredictability"</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Randomizing your actions on purpose with specific odds (e.g. 25% Monday, 75% Wednesday) so your rival cannot target a weakness.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 1: BEGINNER INTUITION (PLAIN ENGLISH & STORY MODE) */}
      {/* ========================================================================= */}
      {learningMode === "beginner" && (
        <div className="space-y-6 text-slate-800 text-sm leading-relaxed animate-fadeIn">
          {/* WEEK 5 BEGINNER INTUITION */}
          {selectedWeek.id === 5 && (
            <div className="space-y-6">
              {/* Beginner Overview Card */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                  <span>🌱</span> Week 5 in Plain English: Why Tying Your Own Hands Makes You Stronger
                </div>
                <p className="text-emerald-950 text-xs sm:text-sm">
                  In everyday life, flexibility is good: having more options usually feels safe. But in <strong>strategic competition</strong>, flexibility can be your biggest weakness! If your opponent knows you have an easy escape route or a way to back down, they will push forward and force you to retreat.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                    <strong className="text-emerald-900 block mb-1">1. The Empty Threat Trap</strong>
                    Threatening to "fight a bloody war" is useless if your rival knows that once they enter, fighting hurts you more than sharing.
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                    <strong className="text-emerald-900 block mb-1">2. The Cortés Commitment</strong>
                    Hernán Cortés burned his own ships so his soldiers couldn't retreat. Knowing there was no exit, they fought with 100% resolve—and the enemy knew it.
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                    <strong className="text-emerald-900 block mb-1">3. Sunk Cost vs Commitment</strong>
                    Saying "we already spent millions" doesn't scare anyone unless that spending lowered your future fighting costs or added penalties for quitting!
                  </div>
                </div>
              </div>

              {/* The Opening Dilemma Story */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span>📖</span> The Story of the Coffee Monopolist & The New Competitor (Slides 3, 11)
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Imagine you own the only coffee shop in town, making <strong>$5,000/day</strong>. A new competitor is considering setting up a shop across the street.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                  <div className="bg-red-50/60 border border-red-200 rounded-lg p-4 space-y-2 text-xs">
                    <div className="font-bold text-red-900 text-sm">Scenario A: You Make a Verbal Threat ("Cheap Talk")</div>
                    <p className="text-slate-700">
                      You tell the competitor: <em>"If you open here, I will slash my prices to 50 cents, give away free pastries, and run a brutal price war!"</em>
                    </p>
                    <div className="bg-white p-2.5 rounded border border-red-200 font-mono text-[11px] space-y-1">
                      <div>Competitor thinks: "Suppose I open anyway. What will you do?"</div>
                      <div>• If you Fight: Price war gives you <strong>-$1,000</strong>.</div>
                      <div>• If you Accommodate: Share the market for <strong>+$2,000</strong>.</div>
                      <div className="text-red-700 font-bold">2,000 &gt; -1,000 ⇒ You will 100% accommodate! Your threat is a bluff!</div>
                    </div>
                    <div className="text-red-800 font-medium">
                      Result: The competitor opens. You accommodate. You earn $2,000 instead of $5,000.
                    </div>
                  </div>

                  <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-4 space-y-2 text-xs">
                    <div className="font-bold text-blue-900 text-sm">Scenario B: You Make a Strategic Commitment (Cost K = 1)</div>
                    <p className="text-slate-700">
                      Before they make their decision, you sign a binding 1-year contract pre-paying for massive industrial espresso machines and beans ($K = 1$).
                    </p>
                    <div className="bg-white p-2.5 rounded border border-blue-200 font-mono text-[11px] space-y-1">
                      <div>Because your beans and machines are already paid for:</div>
                      <div>• Fighting cost drops! Post-entry Fight gives you <strong>$0</strong>.</div>
                      <div>• Accommodating and letting machines sit idle yields <strong>-$1,000</strong>.</div>
                      <div className="text-blue-700 font-bold">0 &gt; -1 ⇒ Now fighting is genuinely your BEST choice!</div>
                    </div>
                    <div className="text-blue-900 font-medium">
                      Result: The competitor sees this and Stays Out. You keep the monopoly and earn <strong>$5 - $1 = $4,000</strong> (Double Scenario A!).
                    </div>
                  </div>
                </div>

                <div className="callout callout-tip text-xs">
                  <strong>The Core Takeaway for Beginners:</strong>
                  {" "}By spending $1 upfront and removing your own ability to comfortably share the market, you made your fighting threat <strong>credible</strong>. The competitor stays out, and you protect your profit!
                </div>

                {/* Interactive 3-Stage Commitment Tree */}
                <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Interactive Game Tree: Branching Out Commitment ($K$) vs. No Commitment
                  </div>
                  <CommitmentGameTree initialK={1.0} />
                </div>
              </div>

              {/* Beginner Trap Alert */}
              <div className="border border-amber-200 bg-amber-50/40 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <span>⚠️</span> Beginner Pitfall Alert: The Sunk-Cost Trap (Slides 8, 24)
                </div>
                <p className="text-xs sm:text-sm text-slate-700">
                  Many business students and managers mistakenly say: <em>"We already spent $20 million on this factory, so rivals will be afraid to compete with us!"</em>
                </p>
                <div className="bg-white border border-amber-200 rounded-lg p-3 text-xs text-slate-800 space-y-2">
                  <div className="font-bold text-amber-900">Why that is often WRONG:</div>
                  <p>
                    If the $20 million was spent on something that cannot be changed (like general office renovations or legal fees), that money is <strong>sunk</strong>. Whether you fight tomorrow or surrender tomorrow, that $20 million is gone either way:
                  </p>
                  <div className="font-mono text-center bg-slate-50 p-2 rounded border border-slate-200 text-xs">
                    (Payoff of Fighting - $20M) vs. (Payoff of Surrendering - $20M)
                  </div>
                  <p>
                    Because the $-20M$ appears on BOTH sides, it cancels out completely! Your future decision is still just: "Do I prefer fighting or surrendering today?"
                  </p>
                  <div className="font-semibold text-emerald-800">
                    The Rule: Past money only acts as a commitment if it lowers your FUTURE marginal cost of fighting or creates a severe PENALTY if you back down.
                  </div>
                </div>
              </div>

              {/* Four Pillars Explained Simply */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span>🧱</span> The 4 Pillars of a Real Commitment (Slide 14)
                </h3>
                <p className="text-slate-600 text-xs">
                  How can you tell if an action is a real commitment or just empty talk? Check these four rules:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10px]">Pillar 1</span>
                    <div className="font-bold text-slate-900">Prior (Done First)</div>
                    <p className="text-slate-600 text-[11px]">You must do it BEFORE your competitor makes their choice. You cannot commit retroactively.</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">Pillar 2</span>
                    <div className="font-bold text-slate-900">Observable</div>
                    <p className="text-slate-600 text-[11px]">The competitor must be able to see or verify it. A secret contract has zero deterrence power!</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-[10px]">Pillar 3</span>
                    <div className="font-bold text-slate-900">Costly to Reverse</div>
                    <p className="text-slate-600 text-[11px]">If you can easily cancel it without penalty, it's not a commitment. Canceling must hurt badly.</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 font-bold rounded text-[10px]">Pillar 4</span>
                    <div className="font-bold text-slate-900">Payoff-Relevant</div>
                    <p className="text-slate-600 text-[11px]">It must actually change your future incentives so that carrying out your threat is your best move.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WEEK 4 BEGINNER INTUITION */}
          {selectedWeek.id === 4 && (
            <div className="space-y-6">
              {/* Beginner Overview Card */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                  <span>🌱</span> Week 4 in Plain English: Why Being Predictable Gets You Exploited
                </div>
                <p className="text-emerald-950 text-xs sm:text-sm">
                  In many competitive situations, there is no single "best move." Think of <strong>Rock-Paper-Scissors</strong> or a <strong>Soccer Penalty Kick</strong>: if the striker always kicks to the top-right corner, the goalkeeper dives top-right and saves it every time! If you have a predictable habit, your rival will target it.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                    <strong className="text-emerald-900 block mb-1">1. The Cycling Trap</strong>
                    Move A beats B, Move B beats C, Move C beats A. Playing any pure action 100% of the time leaves you vulnerable to a counter-punch.
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                    <strong className="text-emerald-900 block mb-1">2. Strategic Randomness</strong>
                    Mixing your moves with precise mathematical odds is not careless gambling—it is a protective shield that removes any target for your rival.
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                    <strong className="text-emerald-900 block mb-1">3. The Indifference Secret</strong>
                    You pick your mixing odds not to make yourself happy, but to make your RIVAL completely indifferent between their options!
                  </div>
                </div>
              </div>

              {/* The Coffee Chain Mystery */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span>☕</span> The Coffee Chain Promotion Mystery (Slides 5–13)
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Two rival coffee chains choose between promoting on <strong>Monday</strong> or <strong>Wednesday</strong>. Monday has twice as many office workers and baseline customers.
                </p>

                <div className="callout callout-warning text-xs">
                  <strong>The Beginner Puzzle:</strong> If Monday has significantly more customers than Wednesday, shouldn't you promote on Monday most of the time?
                  <div className="mt-1 font-semibold text-slate-800">
                    Surprise Game Theory Result: The optimal strategy is to promote on Wednesday <strong>75%</strong> of the time, and Monday only <strong>25%</strong> of the time!
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 text-sm">Why does this happen? The Intuition:</div>
                  <p>
                    Because Monday is the bigger opportunity, your rival prepares their defense on Monday <strong>60%</strong> of the time.
                  </p>
                  <p>
                    Knowing that the rival has heavily guarded Monday, you don't want to run headfirst into their defense! Instead, you take advantage of their unguarded flank by promoting on Wednesday <strong>75%</strong> of the time to collect easy profits without facing a defense.
                  </p>
                  <div className="text-blue-900 font-bold pt-1">
                    "When your rival puts all their shields on Monday, attack on Wednesday."
                  </div>
                </div>

                {/* Interactive Mixed Strategy Visualizer */}
                <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                    Interactive Mixed Strategy Simulator: Indifference Probabilities & Cycling
                  </div>
                  <MixedStrategyVisualizer initialPresetId="coffee_chain" />
                </div>
              </div>

              {/* Beginner Trap: What Randomization Is and Isn't */}
              <div className="border border-amber-200 bg-amber-50/40 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <span>⚠️</span> Beginner Pitfall Alert: "Doesn't Randomizing Just Mean Flipping a 50/50 Coin?"
                </div>
                <div className="text-xs text-slate-700 space-y-2">
                  <p>
                    <strong>NO!</strong> Flipping a 50/50 coin only works in symmetric games like Rock-Paper-Scissors or Matching Pennies.
                  </p>
                  <p>
                    In business, payoffs are asymmetric: Monday is bigger than Wednesday; defending costs money; audits take time. The probabilities must be <strong>calibrated</strong> using the <em>Indifference Principle</em> so your competitor cannot exploit you!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* WEEK 6 BEGINNER INTUITION */}
          {selectedWeek.id === 6 && (
            <div className="space-y-6">
              {/* Beginner Overview Card */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                  <span>🌱</span> Week 6 in Plain English: How Tomorrow's Profit Disciplines Today's Cheating
                </div>
                <p className="text-emerald-950 text-xs sm:text-sm">
                  In a one-time business deal, cheating your rival or slashing prices often feels tempting because there are no future consequences. But when you face the exact same competitor week after week, <strong>the shadow of the future</strong> changes everything. The fear of triggering an endless price war tomorrow convinces rational executives to protect high profit margins today!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                    <strong className="text-emerald-900 block mb-1">1. The Known End Trap</strong>
                    If everyone knows the exact last day (Period T), cheating in the final round is guaranteed. Anticipating this, everyone cheats at T-1, unraveling cooperation from Day 1!
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                    <strong className="text-emerald-900 block mb-1">2. The Shadow of the Future (δ)</strong>
                    The discount factor δ measures patience and continuation probability. When δ ≥ 1/3 in the pricing game, the long-term pain of price wars overcomes the quick cash from cheating.
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                    <strong className="text-emerald-900 block mb-1">3. Grim Trigger vs. Tit for Tat</strong>
                    Grim Trigger threatens permanent war upon a single mistake (maximum deterrence, but fragile). Tit for Tat copies the rival's previous move (responsive and forgiving).
                  </div>
                </div>
              </div>

              {/* The Duopoly Pricing Stage Game & Intuition */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span>🏪</span> The Duopoly Price Competition Dilemma (Slides 3, 10–13)
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Two competing firms choose between <strong>Maintain Margin ($4, $4)</strong> and <strong>Secret Discount ($2, $2)</strong>. In a single round, undercutting grabs customer market share (+1 temptation gain), but when both discount, margins collapse from 4 to 2.
                </p>

                <div className="callout callout-warning text-xs">
                  <strong>The Executive Rule (Slide 12):</strong>
                  <div className="mt-1 font-semibold text-slate-800">
                    Cooperation is sustainable under Grim Trigger if and only if: <strong>δ ≥ (T - R) / (T - P) = (5 - 4) / (5 - 2) = 1/3</strong>.
                  </div>
                </div>

                {/* Interactive Simulator Embedded */}
                <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    Interactive Repeated Game Simulator: Discount Factors, Triggers & Multi-Round Retaliation
                  </div>
                  <RepeatedGameSimulator />
                </div>
              </div>

              {/* Beginner Trap: Why Promises Collapse Without Punishment */}
              <div className="border border-amber-200 bg-amber-50/40 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <span>⚠️</span> Beginner Pitfall Alert: "Can't We Just Promise Each Other Not to Discount?"
                </div>
                <div className="text-xs text-slate-700 space-y-2">
                  <p>
                    <strong>NO!</strong> Pure verbal promises without a credible enforcement mechanism are cheap talk. If there is no punishment or future consequence, private greed inevitably triggers unilateral price cuts.
                  </p>
                  <p>
                    Tacit cooperation works <em>only</em> because each firm knows that cheating today triggers swift, observable, and painful retaliation tomorrow.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* WEEKS 7+ EXECUTIVE MODULES OVERVIEW */}
          {selectedWeek.id > 6 && (
            <div className="space-y-6">
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                  <span>🌱</span> Week {selectedWeek.id} in Plain English: {selectedWeek.title}
                </div>
                <p className="text-emerald-950 text-xs sm:text-sm leading-relaxed">
                  {selectedWeek.recap?.intro || "Applied strategic game theory framework for executive decision analysis."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  {selectedWeek.coreConcepts.slice(0, 3).map((concept, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                      <strong className="text-emerald-900 block mb-1">Pillar {idx + 1}</strong>
                      {concept}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Key Executive Models for Week {selectedWeek.id}:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {selectedWeek.coreConcepts.map((concept, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                      <div className="font-bold text-blue-900">{concept}</div>
                      <p className="text-slate-600 text-[11px]">
                        Applied strategic game theory framework for executive decision analysis.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* WEEKS 0, 1, 2, 3 BEGINNER INTUITION */}
          {selectedWeek.id < 4 && (
            <div className="space-y-6">
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                  <span>🌱</span> Week {selectedWeek.id} in Plain English: {selectedWeek.title}
                </div>
                <p className="text-emerald-950 text-xs sm:text-sm">
                  {selectedWeek.id === 0 && "In traditional business analysis, managers often ask: 'What is the best product or price for our company?' Game theory teaches us that this question is incomplete! The real question is: 'When we launch this product or discount, how will our competitors react, and what will that equilibrium look like?'"}
                  {selectedWeek.id === 1 && "The fundamental lesson of Week 1 is that individual rationality can lead to collective ruin. Even when both competitors know they would be far better off maintaining high prices or not spamming coupons, the private incentive to undercut the rival traps both in a destructive price war."}
                  {selectedWeek.id === 2 && "Sequential games teach you to look at the end of the story first. When you negotiate, make an investment, or launch a product sequentially, don't ask what feels good today. Ask: 'At the final stage, what will the other person be forced to do?' Then plan your first step based on that foresight."}
                  {selectedWeek.id === 3 && "In simultaneous games, you must make your move without seeing what rivals did. A Nash Equilibrium is the strategic center of gravity: a combination of moves where nobody has any regret after the choices are revealed. If you are not in a Nash equilibrium, someone will inevitably deviate to exploit the other!"}
                </p>

                {/* Plain English Takeaways */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  {selectedWeek.id === 0 && (
                    <>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                        <strong className="text-emerald-900 block mb-1">1. Not a Solo Maze</strong>
                        Competitive strategy is not an optimization puzzle with fixed rules; your rivals are intelligent agents trying to outthink you.
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                        <strong className="text-emerald-900 block mb-1">2. Diagnostic Discipline</strong>
                        Diagnose before prescribing: specify players, strategies, and exact payoff consequences before taking action.
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                        <strong className="text-emerald-900 block mb-1">3. Avoid Unforced Blunders</strong>
                        Game theory’s greatest value is preventing fatal strategic errors, like starting a price war you can't win.
                      </div>
                    </>
                  )}
                  {selectedWeek.id === 1 && (
                    <>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                        <strong className="text-emerald-900 block mb-1">1. The Prisoner's Dilemma</strong>
                        Both players have a dominant incentive to defect, producing a worse outcome than mutual cooperation.
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                        <strong className="text-emerald-900 block mb-1">2. Price War Trap</strong>
                        Cutting price attracts customers today, but triggers retaliation tomorrow, leaving both firms with diminished margins.
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                        <strong className="text-emerald-900 block mb-1">3. Communication Limits</strong>
                        Talk without enforceable contracts does not solve defection: each firm still has a private temptation to break promises.
                      </div>
                    </>
                  )}
                  {selectedWeek.id === 2 && (
                    <>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                        <strong className="text-emerald-900 block mb-1">1. Look Forward, Reason Back</strong>
                        Always start analyzing at the final decision branch to prune non-credible future paths.
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                        <strong className="text-emerald-900 block mb-1">2. First-Mover Advantage</strong>
                        Moving first helps when you can pre-empt scarce resources or commit to aggressive scale.
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                        <strong className="text-emerald-900 block mb-1">3. Second-Mover Advantage</strong>
                        Moving second helps when following lets you copy proven innovations at zero R&D risk.
                      </div>
                    </>
                  )}
                  {selectedWeek.id === 3 && (
                    <>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                        <strong className="text-emerald-900 block mb-1">1. Best-Response Analysis</strong>
                        For each move your rival could pick, underline your highest payoff. Intersections reveal Nash equilibria.
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                        <strong className="text-emerald-900 block mb-1">2. Pruning Dominated Moves</strong>
                        Never play a dominated action—no matter what the rival does, another move is strictly superior.
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                        <strong className="text-emerald-900 block mb-1">3. Coordination Games</strong>
                        Some games have multiple equilibria (e.g. driving on the left vs right); focal points determine which one emerges.
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* WEEK 0 STORY */}
              {selectedWeek.id === 0 && (
                <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span>📖</span> The Story of the Price Cut That Broke the Market
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Imagine an executive who notices quarterly sales dipped 5%. A junior analyst recommends: <em>"If we drop our unit price from $10 to $8, classical economics says sales volume will jump 25%, and our revenue will grow by $50,000!"</em>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                    <div className="bg-red-50/60 border border-red-200 rounded-lg p-4 space-y-2 text-xs">
                      <div className="font-bold text-red-900 text-sm">The Solo-Player Blindspot (Traditional Thinking)</div>
                      <p className="text-slate-700">
                        The analyst treats the market like a weather forecast: passive and non-reactive. They assume competitors will just sit there and watch their customers leave.
                      </p>
                      <div className="bg-white p-2.5 rounded border border-red-200 text-[11px] text-red-800 font-medium">
                        Fatal Error: Treating active, intelligent rivals as frozen background parameters.
                      </div>
                    </div>
                    <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-4 space-y-2 text-xs">
                      <div className="font-bold text-emerald-900 text-sm">The Game-Theoretic Diagnosis (Strategic Thinking)</div>
                      <p className="text-slate-700">
                        A game theorist immediately asks: <em>"When we cut price to $8, what is the rival's best response?"</em> The rival cuts to $7.90 within hours! Volume doesn't rise, but margins collapse for both firms.
                      </p>
                      <div className="bg-white p-2.5 rounded border border-emerald-200 text-[11px] text-emerald-800 font-medium">
                        Golden Rule: Never assess an action by its immediate effect alone—assess it by the equilibrium it creates!
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* WEEK 1 STORY */}
              {selectedWeek.id === 1 && (
                <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span>📖</span> The Story of the Two Corner Gas Stations
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Two gas stations sit directly opposite each other on a highway. Both could sell fuel at <strong>$4.00/gallon</strong> and make $10,000 profit each week. But both owners are smart, rational people.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                    <div className="bg-red-50/60 border border-red-200 rounded-lg p-4 space-y-2 text-xs">
                      <div className="font-bold text-red-900 text-sm">The Irresistible Temptation (Dominant Strategy)</div>
                      <p className="text-slate-700">
                        Station A thinks: <em>"If Station B stays at $4.00, I can cut to $3.60 and steal 80% of highway drivers, making $14,000! If Station B cuts to $3.60, I MUST cut to $3.60 too or I go bankrupt!"</em>
                      </p>
                      <div className="bg-white p-2.5 rounded border border-red-200 text-[11px] text-red-800 font-medium">
                        No matter what Station B does, cutting price is Station A's strictly dominant move!
                      </div>
                    </div>
                    <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-4 space-y-2 text-xs">
                      <div className="font-bold text-amber-900 text-sm">The Mutual Ruin (Pareto Inefficiency)</div>
                      <p className="text-slate-700">
                        Because Station B reasons the exact same way, both stations cut to $3.60. Highway drivers split evenly, but now each station makes only $5,000 instead of $10,000!
                      </p>
                      <div className="bg-white p-2.5 rounded border border-amber-200 text-[11px] text-amber-800 font-medium">
                        Individual rationality produces collective disaster. Why cheap talk fails: promises without penalties are broken the moment customers drive up.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* WEEK 2 STORY */}
              {selectedWeek.id === 2 && (
                <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span>📖</span> The Story of the Acquisition Bluff (Playing Chess in Reverse)
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    A tech giant offers a startup founder $5M to acquire their AI product. The founder considers rejecting the offer to demand $8M, threatening: <em>"Give us $8M or we walk away and compete with you!"</em>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                    <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-4 space-y-2 text-xs">
                      <div className="font-bold text-blue-900 text-sm">Backward Induction at the Decision Tree End</div>
                      <p className="text-slate-700">
                        To find out if the bluff works, the giant works backward: <em>"Suppose we refuse the $8M. What will the startup founder do at the final branch?"</em>
                      </p>
                      <div className="bg-white p-2.5 rounded border border-blue-200 font-mono text-[11px] space-y-1">
                        <div>• If startup walks away: Cash runway = 3 months ⇒ Bankruptcy ($0).</div>
                        <div>• If startup accepts $5M: Payout = $5,000,000.</div>
                        <div className="text-blue-900 font-bold">$5M &gt; $0 ⇒ The founder will accept $5M when cornered! The threat to walk away is non-credible!</div>
                      </div>
                    </div>
                    <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-4 space-y-2 text-xs">
                      <div className="font-bold text-emerald-900 text-sm">The Subgame Perfect Lesson</div>
                      <p className="text-slate-700">
                        The tech giant stands firm at $5M. The founder is forced to accept. By looking forward and reasoning backward, the giant prunes away the hollow threat before making a counter-offer.
                      </p>
                      <div className="bg-white p-2.5 rounded border border-emerald-200 text-[11px] text-emerald-800 font-medium">
                        Kuhn's Rule: Evaluate what choices remain when the final gun is on the table, not what is promised at the cocktail party.
                      </div>
                    </div>
                  </div>

                  {/* Interactive Visual Game Tree Diagram */}
                  <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      Interactive Game Tree: Step-by-Step Backward Induction
                    </div>
                    <GameTreeDiagram initialPresetId="acquisition_bluff" />
                  </div>
                </div>
              )}

              {/* WEEK 3 STORY */}
              {selectedWeek.id === 3 && (
                <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span>📖</span> The Secret Fall Product Keynote: Finding Nash Equilibrium
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Two smartphone makers (Alpha & Beta) must schedule their annual launch events for either September or October without knowing the rival's secret date.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs">
                      <div className="font-bold text-slate-900 text-sm">The Best-Response Underline Method</div>
                      <p className="text-slate-700">
                        If Beta picks September: Alpha's best response is October (to own the news cycle alone, earning $80M instead of splitting $40M). If Beta picks October: Alpha's best response is September ($80M).
                      </p>
                      <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-[11px] text-slate-800">
                        (September, October) and (October, September) both have intersecting best responses!
                      </div>
                    </div>
                    <div className="bg-purple-50/60 border border-purple-200 rounded-lg p-4 space-y-2 text-xs">
                      <div className="font-bold text-purple-900 text-sm">What Makes It a Nash Equilibrium?</div>
                      <p className="text-slate-700">
                        Suppose Alpha picked September and Beta picked October. When the announcements go public, neither CEO regrets their choice! Neither wants to unilaterally switch to the rival's month.
                      </p>
                      <div className="bg-white p-2.5 rounded border border-purple-200 text-[11px] text-purple-900 font-medium">
                        Nash Equilibrium is the "Resting State" of business: Once reached, nobody moves unless external conditions change.
                      </div>
                    </div>
                  </div>

                  {/* Interactive Payoff Matrix: Dominance Solvability & IESDS */}
                  <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      Interactive Payoff Matrix: Dominance Solvable Games & IESDS Elimination
                    </div>
                    <DominanceSolvableMatrix initialPresetId="classic_3x3" />
                  </div>
                </div>
              )}

              {/* Intuitive Breakdown */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Key Mental Models for Week {selectedWeek.id}:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {selectedWeek.coreConcepts.map((concept, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                      <div className="font-bold text-blue-900">{concept}</div>
                      <p className="text-slate-600 text-[11px]">
                        A foundational concept in strategic decision-making and business game theory.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BEGINNER SELF-CHECK MINI QUIZ */}
          <div className="border border-indigo-200 bg-indigo-50/40 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-indigo-950 text-sm flex items-center gap-1.5">
                <span>🎯</span> Beginner Quick Check: Test Your Intuition!
              </div>
              <span className="text-[11px] text-indigo-700 font-medium">Instant Feedback & Explanation</span>
            </div>

            {selectedWeek.id === 6 && (
              <div className="space-y-4 text-xs">
                {/* Question 1 */}
                <div className="bg-white p-4 rounded-lg border border-indigo-200 space-y-2">
                  <div className="font-bold text-slate-900">
                    Q1: Why does a known, publicly agreed contract termination date (Period T) cause cooperation to unravel through backward induction?
                  </div>
                  <div className="space-y-1.5">
                    {[
                      "Because firms run out of capital after T periods of discounting.",
                      "Because in the final period T there is no future tomorrow to punish cheating, so both defect; anticipating this, both defect at T-1, cascading all the way to Round 1.",
                      "Because antitrust agencies only enforce collusion laws during the final period.",
                      "Because the discount factor becomes mathematically negative at Period T."
                    ].map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuiz("w6-q1", oIdx)}
                        className={`w-full text-left p-2 rounded border transition-colors ${
                          quizAnswers["w6-q1"] === oIdx
                            ? oIdx === 1
                              ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold"
                              : "bg-red-50 border-red-300 text-red-900"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </button>
                    ))}
                  </div>
                  {quizRevealed["w6-q1"] && (
                    <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 text-[11px]">
                      <strong>Explanation:</strong> Correct answer is <strong>B</strong>! In period T, no future punishment is possible, so discounting is dominant. At T-1, maintaining today cannot protect tomorrow, so both discount. Backward induction cascades all the way to period 1. Sustainable cooperation requires an indefinite horizon without a known final period!
                    </div>
                  )}
                </div>

                {/* Question 2 */}
                <div className="bg-white p-4 rounded-lg border border-indigo-200 space-y-2">
                  <div className="font-bold text-slate-900">
                    Q2: In the lecture pricing stage game (Reward R = 4, Temptation T = 5, Punishment P = 2), what is the minimum discount factor δ* needed to sustain cooperation under Grim Trigger?
                  </div>
                  <div className="space-y-1.5">
                    {[
                      "δ ≥ 0.75 (high patience required)",
                      "δ ≥ 1/3 ≈ 0.333 (patience must exceed 33.3%)",
                      "δ ≥ 0.50 (exact 50/50 balance)",
                      "δ ≥ 0.10 (very minimal patience needed)"
                    ].map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuiz("w6-q2", oIdx)}
                        className={`w-full text-left p-2 rounded border transition-colors ${
                          quizAnswers["w6-q2"] === oIdx
                            ? oIdx === 1
                              ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold"
                              : "bg-red-50 border-red-300 text-red-900"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </button>
                    ))}
                  </div>
                  {quizRevealed["w6-q2"] && (
                    <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 text-[11px]">
                      <strong>Explanation:</strong> Correct answer is <strong>B</strong>! Using the general formula δ* = (T - R) / (T - P) = (5 - 4) / (5 - 2) = 1/3. As long as δ ≥ 1/3, the ongoing future loss from price wars (4 - 2 = 2 per period forever) heavily outweighs the one-period windfall gain from cheating (5 - 4 = 1).
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedWeek.id === 5 && (
              <div className="space-y-4 text-xs">
                {/* Question 1 */}
                <div className="bg-white p-4 rounded-lg border border-indigo-200 space-y-2">
                  <div className="font-bold text-slate-900">
                    Q1: In the baseline entry game, why does the incumbent accommodate entry even after telling the entrant "we will fight to the death"?
                  </div>
                  <div className="space-y-1.5">
                    {[
                      "Because the incumbent is kind-hearted and prefers sharing.",
                      "Because once entry happens, fighting gives -1 while accommodating gives +2. A rational player picks +2.",
                      "Because the entrant had a legally binding contract.",
                      "Because fighting costs too much in advertising fees only."
                    ].map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuiz("w5-q1", oIdx)}
                        className={`w-full text-left p-2 rounded border transition-colors ${
                          quizAnswers["w5-q1"] === oIdx
                            ? oIdx === 1
                              ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold"
                              : "bg-red-50 border-red-300 text-red-900"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </button>
                    ))}
                  </div>
                  {quizRevealed["w5-q1"] && (
                    <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 text-[11px]">
                      <strong>Explanation:</strong> Correct answer is <strong>B</strong>! The threat to fight is "cheap talk." When the entrant actually enters, the incumbent compares their payoffs at that exact node: $2 &gt; -1$. Since $2$ is strictly better than $-1$, accommodating is self-enforcing, making the prior threat a bluff.
                    </div>
                  )}
                </div>

                {/* Question 2 */}
                <div className="bg-white p-4 rounded-lg border border-indigo-200 space-y-2">
                  <div className="font-bold text-slate-900">
                    Q2: A firm spent $50 million building corporate headquarters last year. Does this historical expenditure act as a credible commitment device to deter market entry?
                  </div>
                  <div className="space-y-1.5">
                    {[
                      "Yes, because spending $50M proves the firm has deep pockets.",
                      "No, because the $50M is sunk and cancels out of future marginal decisions unless it lowers marginal fighting costs.",
                      "Yes, because competitors will be intimidated by the beautiful building.",
                      "Only if the building has a high resale value on the commercial market."
                    ].map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuiz("w5-q2", oIdx)}
                        className={`w-full text-left p-2 rounded border transition-colors ${
                          quizAnswers["w5-q2"] === oIdx
                            ? oIdx === 1
                              ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold"
                              : "bg-red-50 border-red-300 text-red-900"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </button>
                    ))}
                  </div>
                  {quizRevealed["w5-q2"] && (
                    <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 text-[11px]">
                      <strong>Explanation:</strong> Correct answer is <strong>B</strong>! The sunk-cost fallacy confuses past money with future credibility. A past expense cancels out of future choices ($u - 50$ vs $v - 50$). To deter entry, CapEx must lower *future marginal costs* of production or introduce penalties for quitting.
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedWeek.id === 4 && (
              <div className="space-y-4 text-xs">
                <div className="bg-white p-4 rounded-lg border border-indigo-200 space-y-2">
                  <div className="font-bold text-slate-900">
                    Q1: In the coffee promotion duel, why does the coffee chain promote on Wednesday 75% of the time even though Monday has much higher foot traffic?
                  </div>
                  <div className="space-y-1.5">
                    {[
                      "Because Wednesday coffee beans are cheaper to buy from distributors.",
                      "Because the rival heavily defends Monday (60%), leaving Wednesday largely unguarded and easier to harvest.",
                      "Because the chain wants to confuse its own loyal customers.",
                      "Because mixed strategy equilibria always require an exact 50/50 balance."
                    ].map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuiz("w4-q1", oIdx)}
                        className={`w-full text-left p-2 rounded border transition-colors ${
                          quizAnswers["w4-q1"] === oIdx
                            ? oIdx === 1
                              ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold"
                              : "bg-red-50 border-red-300 text-red-900"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </button>
                    ))}
                  </div>
                  {quizRevealed["w4-q1"] && (
                    <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 text-[11px]">
                      <strong>Explanation:</strong> Correct answer is <strong>B</strong>! This is the great counter-intuition of mixed strategies: because Monday is lucrative, the rival puts their defensive guard there ($q^* = 60\%$). Anticipating this heavy guard, you promote more on Wednesday ($p^* = 75\%$) to harvest undefended sales!
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedWeek.id === 0 && (
              <div className="space-y-4 text-xs">
                <div className="bg-white p-4 rounded-lg border border-indigo-200 space-y-2">
                  <div className="font-bold text-slate-900">
                    Q1: What is the fundamental difference between an individual decision problem and a strategic game?
                  </div>
                  <div className="space-y-1.5">
                    {[
                      "Individual decisions always involve numbers, while strategic games never do.",
                      "In a strategic game, the outcome depends on the interacting choices of other intelligent decision-makers who are also strategizing.",
                      "Strategic games can only be played by Fortune 500 CEOs.",
                      "There is no difference; game theory is just normal financial accounting."
                    ].map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuiz("w0-q1", oIdx)}
                        className={`w-full text-left p-2 rounded border transition-colors ${
                          quizAnswers["w0-q1"] === oIdx
                            ? oIdx === 1
                              ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold"
                              : "bg-red-50 border-red-300 text-red-900"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </button>
                    ))}
                  </div>
                  {quizRevealed["w0-q1"] && (
                    <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 text-[11px]">
                      <strong>Explanation:</strong> Correct answer is <strong>B</strong>! In individual decision analysis (e.g., choosing an umbrella based on rain probability), nature does not care what you do. In game theory, competitors observe, anticipate, and counter your actions.
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedWeek.id === 1 && (
              <div className="space-y-4 text-xs">
                <div className="bg-white p-4 rounded-lg border border-indigo-200 space-y-2">
                  <div className="font-bold text-slate-900">
                    Q1: In the classic Prisoner's Dilemma applied to business price competition, why do both firms end up offering heavy discounts?
                  </div>
                  <div className="space-y-1.5">
                    {[
                      "Because discounting is a strictly dominant strategy for each individual firm: regardless of what the competitor does, offering a discount yields a higher personal market share.",
                      "Because neither firm understands basic arithmetic.",
                      "Because consumers legally compel firms to lower prices.",
                      "Because cooperation has the lowest possible total industry profit."
                    ].map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuiz("w1-q1", oIdx)}
                        className={`w-full text-left p-2 rounded border transition-colors ${
                          quizAnswers["w1-q1"] === oIdx
                            ? oIdx === 0
                              ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold"
                              : "bg-red-50 border-red-300 text-red-900"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </button>
                    ))}
                  </div>
                  {quizRevealed["w1-q1"] && (
                    <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 text-[11px]">
                      <strong>Explanation:</strong> Correct answer is <strong>A</strong>! Discounting is dominant: if rival stays high, you steal their customers by discounting; if rival discounts, you must discount to survive. Both firms discount, destroying industry profit.
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedWeek.id === 2 && (
              <div className="space-y-4 text-xs">
                <div className="bg-white p-4 rounded-lg border border-indigo-200 space-y-2">
                  <div className="font-bold text-slate-900">
                    Q1: How does Backward Induction help solve sequential games?
                  </div>
                  <div className="space-y-1.5">
                    {[
                      "By flipping a coin at the starting node.",
                      "By evaluating the final decision nodes first to determine what players will actually choose at the end, then rolling backward to choose the optimal opening move.",
                      "By assuming all players will always cooperate at every stage.",
                      "By ignoring the rules of the game."
                    ].map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuiz("w2-q1", oIdx)}
                        className={`w-full text-left p-2 rounded border transition-colors ${
                          quizAnswers["w2-q1"] === oIdx
                            ? oIdx === 1
                              ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold"
                              : "bg-red-50 border-red-300 text-red-900"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </button>
                    ))}
                  </div>
                  {quizRevealed["w2-q1"] && (
                    <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 text-[11px]">
                      <strong>Explanation:</strong> Correct answer is <strong>B</strong>! "Look forward and reason backward." By forecasting the final stage's optimal choices, you can prune non-credible branches and find the Subgame Perfect Equilibrium.
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedWeek.id === 3 && (
              <div className="space-y-4 text-xs">
                <div className="bg-white p-4 rounded-lg border border-indigo-200 space-y-2">
                  <div className="font-bold text-slate-900">
                    Q1: What is the formal definition of a Nash Equilibrium?
                  </div>
                  <div className="space-y-1.5">
                    {[
                      "A strategy profile where no player has an incentive to unilaterally deviate from their chosen action, given what all other players are doing.",
                      "An outcome where both players receive the maximum possible payoff.",
                      "A situation where everyone flips a coin.",
                      "A state that only exists when players sign a legal contract."
                    ].map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuiz("w3-q1", oIdx)}
                        className={`w-full text-left p-2 rounded border transition-colors ${
                          quizAnswers["w3-q1"] === oIdx
                            ? oIdx === 0
                              ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold"
                              : "bg-red-50 border-red-300 text-red-900"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </button>
                    ))}
                  </div>
                  {quizRevealed["w3-q1"] && (
                    <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 text-[11px]">
                      <strong>Explanation:</strong> Correct answer is <strong>A</strong>! In a Nash Equilibrium, each player's action is a best response to the other players' actions. No player has individual regrets or incentives to change their move alone.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: STEP-BY-STEP MATH & FORMAL GAME PROOFS */}
      {/* ========================================================================= */}
      {learningMode === "formal" && (
        <div className="space-y-6 text-slate-800 text-sm leading-relaxed animate-fadeIn">
          {/* WEEK 6 FORMAL DERIVATIONS */}
          {selectedWeek.id === 6 && (
            <div className="space-y-6">
              {/* Formal Mathematical Setup & Geometric Series Derivations */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      1. Infinitely Repeated Game & Geometric-Series Continuation Values (Slides 10–12, 22–24)
                    </h3>
                    <p className="text-slate-600 text-xs">
                      Rigorous algebraic solution of infinite discounted payoffs and the critical threshold δ*.
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-blue-100 px-2 py-0.5 rounded text-blue-700 font-bold">
                    Folk Theorem & Grim Trigger
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Derivation 1: Cooperate Forever */}
                  <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
                    <div className="font-bold text-emerald-950 flex items-center justify-between">
                      <span>Value of Cooperating Forever (V_C)</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">Mutual Margin</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Under mutual cooperation [Maintain, Maintain], each firm receives R = 4 in every period:
                    </p>
                    <div className="font-mono bg-white p-2.5 rounded-lg border border-emerald-200 space-y-1 text-slate-800 text-[11px]">
                      <div>V_C = 4 + 4δ + 4δ² + 4δ³ + ...</div>
                      <div>δ V_C = 4δ + 4δ² + 4δ³ + ...</div>
                      <div className="text-slate-500 text-[10px] border-t border-slate-100 pt-1">Subtracting the second equation from the first:</div>
                      <div>(1 - δ) V_C = 4</div>
                      <div className="text-emerald-700 font-bold text-xs pt-1 border-t border-emerald-200">
                        V_C = 4 / (1 - δ)
                      </div>
                    </div>
                  </div>

                  {/* Derivation 2: Deviate Once */}
                  <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2">
                    <div className="font-bold text-amber-950 flex items-center justify-between">
                      <span>Value of Deviating Once under Grim Trigger (V_D)</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono">Cheat & Punish</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Unilateral cheat yields temptation T = 5 today, followed by permanent punishment P = 2 forever:
                    </p>
                    <div className="font-mono bg-white p-2.5 rounded-lg border border-amber-200 space-y-1 text-slate-800 text-[11px]">
                      <div>V_D = 5 + 2δ + 2δ² + 2δ³ + ...</div>
                      <div>V_D = 5 + 2δ(1 + δ + δ² + ...)</div>
                      <div className="text-slate-500 text-[10px] border-t border-slate-100 pt-1">Summing the discounted punishment stream:</div>
                      <div className="text-amber-800 font-bold text-xs pt-1 border-t border-amber-200">
                        V_D = 5 + (2δ) / (1 - δ)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solving the Inequality */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>📐</span> Step-by-Step Inequality Solution for δ* (Slide 24):
                  </div>
                  <div className="font-mono text-slate-800 bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 text-xs">
                    <div>No-Deviation Condition:  V_C ≥ V_D</div>
                    <div className="text-blue-900 font-semibold">4 / (1 - δ) ≥ 5 + (2δ) / (1 - δ)</div>
                    <div className="text-slate-500 text-[11px]">Multiply both sides by (1 - δ) [since δ &lt; 1]:</div>
                    <div>4 ≥ 5(1 - δ) + 2δ</div>
                    <div>4 ≥ 5 - 5δ + 2δ</div>
                    <div>4 ≥ 5 - 3δ</div>
                    <div>3δ ≥ 5 - 4</div>
                    <div>3δ ≥ 1</div>
                    <div className="text-emerald-700 font-bold text-sm pt-1 border-t border-slate-200">
                      δ ≥ 1/3 ≈ 0.333
                    </div>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    <strong>Economic Proof:</strong> The continuation value of protecting the duopoly margin is large enough to offset the one-period gain of (5 - 4 = 1) if and only if firms discount the future by less than 66.7% per period (δ ≥ 1/3).
                  </p>
                </div>
              </div>

              {/* General Formula & Asymmetric Generalization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <span>⚡</span> General Grim-Trigger Formula (Slide 25)
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    For any symmetric stage game with Reward R, Temptation T, and Punishment P:
                  </p>
                  <div className="font-mono bg-slate-50 p-2.5 rounded border border-slate-200 text-indigo-950 font-bold text-xs text-center">
                    δ* = (T - R) / (T - P)
                  </div>
                  <ul className="text-slate-600 text-[11px] space-y-1 list-disc list-inside pt-1">
                    <li>Cooperation is <strong>easier</strong> when R is larger.</li>
                    <li>Cooperation is <strong>harder</strong> when temptation gain (T - R) is larger.</li>
                    <li>A lower punishment payoff P <strong>strengthens deterrence</strong>.</li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <span>🔄</span> Tit-for-Tat Exact Alternating Check (Slide 28)
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    After one deviation, play alternates [D, M] and [M, D], giving payoff sequence 5, 1, 5, 1, ...:
                  </p>
                  <div className="font-mono bg-slate-50 p-2.5 rounded border border-slate-200 text-blue-950 font-bold text-xs text-center">
                    V_TFT = (5 + δ) / (1 - δ²)
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Comparing V_C = 4(1 + δ)/(1 - δ²) ≥ (5 + δ)/(1 - δ²) yields 4 + 4δ ≥ 5 + δ ⟺ <strong>δ ≥ 1/3</strong>.
                  </p>
                </div>
              </div>

              {/* Embedded Interactive Simulator */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  Interactive Discount Factor & Repeated Game Simulator
                </div>
                <RepeatedGameSimulator />
              </div>
            </div>
          )}

          {/* WEEK 5 FORMAL DERIVATIONS */}
          {selectedWeek.id === 5 && (
            <div className="space-y-6">
              {/* Baseline Game Tree */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">
                    1. The Strategic Move Game Tree: Commitment ($K$) vs. No Commitment (Slides 3, 11–13)
                  </h3>
                  <span className="text-xs font-mono bg-blue-100 px-2 py-0.5 rounded text-blue-700 font-bold">
                    3-Stage Strategic Move Tree
                  </span>
                </div>

                <p className="text-slate-600 text-xs">
                  Payoffs are specified as: <strong>(Entrant $u_E$, Incumbent $u_I$)</strong>. The Incumbent moves first at Stage 0!
                </p>

                {/* Visual 3-Stage Commitment Game Tree */}
                <div>
                  <CommitmentGameTree initialK={capacityK} />
                </div>

                {/* Step-by-step Backward Induction breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                    <strong className="text-blue-900 block font-bold">Step 1: Solve Incumbent Subgame</strong>
                    <div className="font-mono bg-white p-2 rounded border border-slate-200 space-y-0.5">
                      <div>u_I(Accommodate) = 2</div>
                      <div>u_I(Fight) = -1</div>
                      <div className="text-blue-700 font-bold">2 &gt; -1 ⇒ Rational response is Accommodate</div>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      The threat to fight is dynamic inconsistent. Once entry occurs, fighting damages the incumbent.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                    <strong className="text-emerald-900 block font-bold">Step 2: Entrant Backward Induces</strong>
                    <div className="font-mono bg-white p-2 rounded border border-slate-200 space-y-0.5">
                      <div>u_E(Enter) = 2 (anticipating Accommodate)</div>
                      <div>u_E(Stay Out) = 0</div>
                      <div className="text-emerald-700 font-bold">2 &gt; 0 ⇒ Rational choice is Enter</div>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Result: Entry occurs. Incumbent earns <strong>2</strong> instead of monopoly payoff <strong>5</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Strategic Commitment Game & Interactive Tool */}
              <div className="border border-blue-200 bg-blue-50/30 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                  <div>
                    <h3 className="font-bold text-blue-950 text-base">
                      2. Transforming Payoffs Through Dedicated Capacity Investment (Slide 12–13)
                    </h3>
                    <p className="text-xs text-blue-800">
                      Invest upfront capital $K$ to change continuation incentives and make fighting credible.
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    Interactive Proof
                  </span>
                </div>

                {/* Interactive Slider for Capacity Cost K */}
                <div className="bg-white p-4 rounded-xl border border-blue-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-800">
                      Adjust Dedicated Capacity Investment Cost ($K$):
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        K = {capacityK.toFixed(1)}
                      </span>
                      <button
                        onClick={() => setCapacityK(1)}
                        className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 px-2 py-0.5 bg-slate-100 rounded"
                      >
                        Reset to Slide Default (K=1.0)
                      </button>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="3.5"
                    step="0.5"
                    value={capacityK}
                    onChange={(e) => setCapacityK(parseFloat(e.target.value))}
                    className="w-full accent-blue-600"
                  />

                  {/* Calculations Table */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono text-center">
                    <div className="p-2 bg-slate-50 border rounded">
                      <div className="text-[10px] text-slate-500 uppercase">Monopoly Net Payoff</div>
                      <div className="font-bold text-slate-900 mt-0.5">{5 - capacityK >= 0 ? `5 - ${capacityK} = ${(5 - capacityK).toFixed(1)}` : "0"}</div>
                    </div>
                    <div className="p-2 bg-slate-50 border rounded">
                      <div className="text-[10px] text-slate-500 uppercase">Post-Entry Fight</div>
                      <div className="font-bold text-emerald-700 mt-0.5">{(1 - capacityK).toFixed(1)}</div>
                    </div>
                    <div className="p-2 bg-slate-50 border rounded">
                      <div className="text-[10px] text-slate-500 uppercase">Post-Entry Accommodate</div>
                      <div className="font-bold text-red-700 mt-0.5">{(0 - capacityK).toFixed(1)}</div>
                    </div>
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                      <div className="text-[10px] text-blue-700 uppercase font-semibold">Net Strategic Profit</div>
                      <div className="font-bold text-blue-900 text-sm mt-0.5">
                        {capacityK <= 3.0 ? (5 - capacityK).toFixed(1) : "2.0 (Accommodated)"}
                      </div>
                    </div>
                  </div>

                  {/* Live Status readout */}
                  <div className="p-3 rounded-lg border text-xs leading-relaxed bg-slate-50 border-slate-200">
                    {capacityK > 0 && capacityK <= 3.0 ? (
                      <div className="text-emerald-900 space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <span>✅</span> Strategic Commitment Succeeds! (Slides 12–13)
                        </div>
                        <div>
                          Because dedicated capacity lowered the marginal cost of production, post-entry Fight yields <strong>{(1 - capacityK).toFixed(1)}</strong> while Accommodate yields <strong>{(0 - capacityK).toFixed(1)}</strong>. Since {(1 - capacityK).toFixed(1)} &gt; {(0 - capacityK).toFixed(1)}, <strong>Fighting is credible!</strong>
                        </div>
                        <div>
                          The entrant stays out ($0 &gt; -1$). Net Incumbent Profit = <strong>{(5 - capacityK).toFixed(1)}</strong> (better than baseline $2.0$).
                        </div>
                      </div>
                    ) : capacityK > 3.0 ? (
                      <div className="text-amber-900 space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <span>⚠️</span> Over-investment Hazard:
                        </div>
                        <div>
                          Cost $K = {capacityK.toFixed(1)}$ is so massive that net profit $(5 - {capacityK.toFixed(1)} = {(5 - capacityK).toFixed(1)})$ is LESS than accommodating without commitment ($2.0$). Sunk capital destroys value!
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-700 space-y-1">
                        <div className="font-bold">Baseline Game (K = 0): Threat is empty. Entrant enters and incumbent accommodates for payoff of 2.0.</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sunk Cost Proof */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <h3 className="font-bold text-slate-900 text-base">
                  3. Mathematical Proof: Sunk Costs Cancel Out (Slides 8, 24)
                </h3>
                <p className="text-slate-600 text-xs">
                  Why past expenditure $K$ fails to create credibility by itself:
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2 text-slate-800">
                  <div className="text-slate-500">// Let K be past unrecoverable expenditure incurred before node t</div>
                  <div>Continuation Payoff(Fight) = u_Fight - K</div>
                  <div>Continuation Payoff(Accommodate) = u_Accommodate - K</div>
                  <div className="pt-1 text-blue-900 font-bold">
                    Comparing options: (u_Fight - K) &gt; (u_Accommodate - K)  ⟺  u_Fight &gt; u_Accommodate
                  </div>
                  <div className="text-emerald-800 pt-1 text-[11px]">
                    Q.E.D.: Because K cancels from both sides, past expenditure has zero impact on marginal optimization. A factory only commits if it alters the derivative of future production costs (∂C/∂q)!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WEEK 4 FORMAL DERIVATIONS */}
          {selectedWeek.id === 4 && (
            <div className="space-y-6">
              {/* Coffee Chain Payoff Table */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">
                    1. The Normal-Form Payoff Matrix (Slide 5)
                  </h3>
                  <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    Payoffs: (Coffee Chain, Rival)
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full max-w-lg border-collapse text-center text-xs">
                    <thead>
                      <tr className="bg-slate-100 border border-slate-200 font-semibold text-slate-700">
                        <th className="p-2 border border-slate-200">Coffee Chain \ Rival</th>
                        <th className="p-2 border border-slate-200">Rival: Defend Mon (q)</th>
                        <th className="p-2 border border-slate-200">Rival: Defend Wed (1-q)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border border-slate-200 font-bold bg-slate-50">Promote Monday (p)</td>
                        <td className="p-2.5 border border-slate-200 bg-white font-mono font-bold text-slate-800">(3, 3)</td>
                        <td className="p-2.5 border border-slate-200 bg-white font-mono font-bold text-slate-800">(6, 0)</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-200 font-bold bg-slate-50">Promote Wednesday (1-p)</td>
                        <td className="p-2.5 border border-slate-200 bg-white font-mono font-bold text-slate-800">(5, 1)</td>
                        <td className="p-2.5 border border-slate-200 bg-white font-mono font-bold text-slate-800">(3, 2)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="callout callout-warning text-xs">
                  <strong>Best Response Cycling:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li>[Mon, Mon] (3, 3) → Chain switches to Wed (5 &gt; 3)</li>
                    <li>[Wed, Mon] (5, 1) → Rival switches to Wed (2 &gt; 1)</li>
                    <li>[Wed, Wed] (3, 2) → Chain switches to Mon (6 &gt; 3)</li>
                    <li>[Mon, Wed] (6, 0) → Rival switches to Mon (3 &gt; 0)</li>
                  </ul>
                  <div className="mt-1 font-bold">Conclusion: No pure strategy Nash equilibrium exists.</div>
                </div>

                {/* Interactive Mixed Strategy Visualizer */}
                <div>
                  <MixedStrategyVisualizer initialPresetId="coffee_chain" />
                </div>
              </div>

              {/* Step-by-Step Indifference Principle Derivation */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">
                    2. The Indifference Principle Derivation (Slides 10–13)
                  </h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setActiveStepW4(1)}
                      className={`px-2 py-0.5 text-xs rounded font-bold ${activeStepW4 === 1 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}
                    >
                      Step 1 (p*)
                    </button>
                    <button
                      onClick={() => setActiveStepW4(2)}
                      className={`px-2 py-0.5 text-xs rounded font-bold ${activeStepW4 === 2 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"}`}
                    >
                      Step 2 (q*)
                    </button>
                    <button
                      onClick={() => setActiveStepW4(3)}
                      className={`px-2 py-0.5 text-xs rounded font-bold ${activeStepW4 === 3 ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-700"}`}
                    >
                      Step 3 (Payoffs)
                    </button>
                  </div>
                </div>

                {activeStepW4 === 1 && (
                  <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="font-bold text-blue-900 text-sm">Step 1: Solve Chain's Probability Mix (p*)</div>
                    <p className="text-slate-600">
                      To make the Rival indifferent, set Rival's expected payoff from Defending Monday equal to Defending Wednesday:
                    </p>
                    <div className="bg-white p-3 rounded-lg border font-mono space-y-1">
                      <div>E[Rival(Defend Mon)] = 3·p + 1·(1 - p) = 1 + 2p</div>
                      <div>E[Rival(Defend Wed)] = 0·p + 2·(1 - p) = 2 - 2p</div>
                      <div className="text-blue-700 font-bold pt-1">
                        Equating payoffs: 1 + 2p = 2 - 2p ⟹ 4p = 1 ⟹ p* = 0.25
                      </div>
                    </div>
                    <div className="font-semibold text-slate-800">
                      Result: Chain promotes Monday 25%, Wednesday 75%.
                    </div>
                  </div>
                )}

                {activeStepW4 === 2 && (
                  <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="font-bold text-emerald-900 text-sm">Step 2: Solve Rival's Probability Mix (q*)</div>
                    <p className="text-slate-600">
                      To make the Chain indifferent, set Chain's expected payoff from Promoting Monday equal to Promoting Wednesday:
                    </p>
                    <div className="bg-white p-3 rounded-lg border font-mono space-y-1">
                      <div>E[Chain(Promote Mon)] = 3·q + 6·(1 - q) = 6 - 3q</div>
                      <div>E[Chain(Promote Wed)] = 5·q + 3·(1 - q) = 3 + 2q</div>
                      <div className="text-emerald-700 font-bold pt-1">
                        Equating payoffs: 6 - 3q = 3 + 2q ⟹ 5q = 3 ⟹ q* = 0.60
                      </div>
                    </div>
                    <div className="font-semibold text-slate-800">
                      Result: Rival defends Monday 60%, Wednesday 40%.
                    </div>
                  </div>
                )}

                {activeStepW4 === 3 && (
                  <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="font-bold text-purple-900 text-sm">Step 3: Calculate Equilibrium Expected Payoffs</div>
                    <div className="bg-white p-3 rounded-lg border font-mono space-y-1">
                      <div>Chain Expected Payoff: 6 - 3(0.60) = 5(0.60) + 3(0.40) = 4.2</div>
                      <div>Rival Expected Payoff: 1 + 2(0.25) = 2 - 2(0.25) = 1.5</div>
                    </div>
                    <div className="callout callout-note text-xs">
                      <strong>Executive Interpretation:</strong> Notice that Chain's expected profit is <strong>4.2</strong>, which is higher than the worst outcome (3) and lower than the uncountered peak (6). Both players achieve strategic stability.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* WEEKS 0-3 FORMAL DERIVATIONS */}
          {selectedWeek.id === 0 && (
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Formal Foundations: Strategic Diagnosis (Week 0)
                  </h3>
                  <p className="text-slate-600 text-xs">
                    Mathematical distinction between Single-Agent Calculus Optimization and Interactive Game Theory.
                  </p>
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                  Formal Analysis · Foundations
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs space-y-2">
                  <div className="text-blue-900 font-bold">
                    1. Formal Definition of a Strategic Game (Normal Form Tuple):
                  </div>
                  <div className="text-slate-800 pl-3 border-l-2 border-blue-400">
                    Γ = ⟨ N, (S_i)&#123;i ∈ N&#125;, (u_i)&#123;i ∈ N&#125; ⟩
                  </div>
                  <div className="text-slate-600 pl-3 text-[11px]">
                    • N = &#123;1, 2, ..., n&#125; : Finite set of rational decision-makers<br />
                    • S_i : Action space for player i. Strategy profile: s = (s_1, ..., s_n) ∈ S = ∏ S_i<br />
                    • u_i : S → ℝ : Payoff function mapping outcome s to real business rewards
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                    <div className="font-bold text-slate-900">Single-Agent Decision Problem</div>
                    <div className="font-mono text-blue-950 bg-white p-2 rounded border border-slate-200 text-[11px]">
                      max_x π(x) ⟹ dπ/dx = 0
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Nature is passive. Competitor choices are treated as exogenous parameters or fixed constants.
                    </p>
                  </div>

                  <div className="p-3.5 bg-blue-50/50 border border-blue-200 rounded-lg space-y-1.5">
                    <div className="font-bold text-blue-950">Strategic Interdependence (Game Theory)</div>
                    <div className="font-mono text-blue-950 bg-white p-2 rounded border border-blue-200 text-[11px]">
                      max_&#123;x_i&#125; π_i(x_i, x_-i) s.t. x_-i = BR_-i(x_i)
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Rivals are intelligent agents whose optimal response x_-i actively shifts in reaction to x_i.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 text-slate-100 rounded-lg space-y-2 text-xs font-mono">
                  <div className="text-amber-300 font-bold">5-Step Strategic Diagnostic Protocol:</div>
                  <div className="text-slate-300 space-y-1 text-[11px]">
                    <div>1. Decision Boundary ──&gt; Who are the stakeholders who must choose?</div>
                    <div>2. Game Space         ──&gt; Define players N, feasible actions A_i, and objective payoffs u_i</div>
                    <div>3. Timing Structure   ──&gt; Simultaneous (Payoff Matrix) vs. Sequential (Extensive Game Tree)</div>
                    <div>4. Formal Analysis    ──&gt; Compute Dominant Strategies, Best Responses, Nash Equilibrium, SPNE</div>
                    <div>5. Recommendation     ──&gt; Actionable strategy + boundary condition where prediction flips</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedWeek.id === 1 && (
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Formal Analysis: Dominant Strategies & Prisoner's Dilemma (Week 1)
                  </h3>
                  <p className="text-slate-600 text-xs">
                    Mathematical proof of Pareto inefficiency under strictly dominant defection.
                  </p>
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                  Formal Analysis · Week 1
                </span>
              </div>

              <div className="space-y-3">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs border border-slate-200">
                    <thead>
                      <tr className="bg-slate-100 text-slate-800 font-bold">
                        <th className="p-2.5 border border-slate-200 text-left">Player 1 \ Player 2</th>
                        <th className="p-2.5 border border-slate-200 text-center bg-emerald-50/50">Cooperate (C)</th>
                        <th className="p-2.5 border border-slate-200 text-center bg-rose-50/50">Defect (D)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2.5 border border-slate-200 font-bold bg-slate-50">Cooperate (C)</td>
                        <td className="p-2.5 border border-slate-200 text-center font-bold text-emerald-900 bg-emerald-50/30">
                          (3, 3) <span className="text-[10px] block text-emerald-700 font-normal">[Pareto Optimal]</span>
                        </td>
                        <td className="p-2.5 border border-slate-200 text-center text-slate-700">
                          (0, 5) <span className="text-[10px] block text-slate-500">(Sucker, Temptation)</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-slate-200 font-bold bg-slate-50">Defect (D)</td>
                        <td className="p-2.5 border border-slate-200 text-center text-slate-700">
                          (5, 0) <span className="text-[10px] block text-slate-500">(Temptation, Sucker)</span>
                        </td>
                        <td className="p-2.5 border border-slate-200 text-center font-bold text-rose-900 bg-rose-50/40">
                          (1, 1) <span className="text-[10px] block text-rose-700 font-normal">[Unique Nash Eq]</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs space-y-2">
                  <div className="text-blue-900 font-bold">Mathematical Proof of Strict Dominance:</div>
                  <div className="text-slate-800 text-[11px] space-y-1">
                    <div>• If Player 2 plays C: u_1(D, C) = 5 &gt; 3 = u_1(C, C)  ⟹ Defect is strictly better</div>
                    <div>• If Player 2 plays D: u_1(D, D) = 1 &gt; 0 = u_1(C, D)  ⟹ Defect is strictly better</div>
                    <div className="text-rose-900 font-bold pt-1">
                      ⟹ ∀ s_2 ∈ &#123;C, D&#125;, u_1(D, s_2) &gt; u_1(C, s_2). Therefore D is strictly dominant for Player 1.
                    </div>
                    <div>By symmetry, D is strictly dominant for Player 2.</div>
                    <div className="text-blue-900 font-bold pt-1">
                      Pareto Suboptimality: (3, 3) ≻ (1, 1), yet (D, D) is the unique Nash Equilibrium.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedWeek.id === 2 && (
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Formal Analysis: Extensive Form & Backward Induction (Week 2)
                  </h3>
                  <p className="text-slate-600 text-xs">
                    Kuhn's Theorem, Subgame Perfect Nash Equilibrium (SPNE), and the Market Entry Tree.
                  </p>
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                  Formal Analysis · Week 2
                </span>
              </div>

              <div className="space-y-4">
                {/* Visual Interactive Game Tree Diagram */}
                <div>
                  <GameTreeDiagram initialPresetId="entry_deterrence" />
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs space-y-2">
                  <div className="text-blue-900 font-bold">Backward Induction Step-by-Step Derivation:</div>
                  <div className="text-slate-800 text-[11px] space-y-1.5">
                    <div><strong>Step 1 (Subgame at Node 2):</strong> Facing entry, Incumbent compares u_I(Accommodate) = 2 vs. u_I(Fight) = -1.</div>
                    <div className="text-blue-900 font-semibold pl-3">
                      Since 2 &gt; -1, rational Incumbent chooses Accommodate. a_I*(Enter) = Accommodate.
                    </div>
                    <div><strong>Step 2 (Pruning Node 2):</strong> Replace Node 2 with the continuation payoff vector (2, 2).</div>
                    <div><strong>Step 3 (Entrant at Node 1):</strong> Entrant evaluates u_E(Enter) = 2 against u_E(Stay Out) = 0.</div>
                    <div className="text-emerald-900 font-semibold pl-3">
                      Since 2 &gt; 0, rational Entrant chooses Enter. a_E* = Enter.
                    </div>
                    <div className="text-slate-900 font-bold pt-1 border-t border-slate-200">
                      Subgame Perfect Equilibrium (SPNE): (Enter, Accommodate) yielding Payoffs (2, 2).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedWeek.id === 3 && (
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Formal Analysis: Nash Equilibrium & Oligopoly Models (Week 3)
                  </h3>
                  <p className="text-slate-600 text-xs">
                    Best Response Correspondences, IESDS Algorithm, Cournot Quantity vs. Bertrand Price Competition.
                  </p>
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                  Formal Analysis · Week 3
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs space-y-2">
                  <div className="text-blue-900 font-bold">Nash Equilibrium Definition (Nash, 1950):</div>
                  <div className="text-slate-800 text-[11px]">
                    A strategy profile s* = (s_1*, ..., s_n*) is a Nash Equilibrium if and only if:<br />
                    <span className="font-bold text-blue-950">
                      s_i* ∈ BR_i(s_-i*) ⟺ u_i(s_i*, s_-i*) ≥ u_i(s_i, s_-i*)  ∀ s_i ∈ S_i, ∀ i ∈ N
                    </span>
                  </div>
                </div>

                {/* Interactive Dominance Solvable & IESDS Matrix Solver */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Interactive IESDS Algorithm & Pure Strategy Nash Equilibrium Finder
                  </div>
                  <DominanceSolvableMatrix initialPresetId="classic_3x3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>Cournot Duopoly (Quantity)</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">Strategic Substitutes</span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-700 space-y-1 bg-white p-2.5 rounded border border-slate-200">
                      <div>Market Price: P(Q) = a - b(q_1 + q_2)</div>
                      <div>Best Response: q_1(q_2) = (a - c - b q_2) / (2b)</div>
                      <div className="font-bold text-blue-900">Equilibrium Output: q_1* = q_2* = (a - c) / (3b)</div>
                      <div className="font-bold text-emerald-900">Equilibrium Price: P* = (a + 2c) / 3 &gt; MC</div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>Bertrand Duopoly (Price)</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded">The Bertrand Trap</span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-700 space-y-1 bg-white p-2.5 rounded border border-slate-200">
                      <div>Consumers buy from min(p_1, p_2)</div>
                      <div>Undercutting by ε &gt; 0 steals 100% market</div>
                      <div className="font-bold text-rose-900">Equilibrium Price: p_1* = p_2* = c = MC</div>
                      <div className="font-bold text-slate-900">Equilibrium Profits: Π_1* = Π_2* = 0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: BUSINESS CASES & EXECUTIVE PLAYBOOK */}
      {/* ========================================================================= */}
      {learningMode === "cases" && (
        <ElaboratedBusinessCasesView
          currentWeekId={selectedWeek.id}
          onSelectWeek={onSelectWeek}
        />
      )}

      {/* ========================================================================= */}
      {/* MODE 4: FULL OFFICIAL MARKDOWN RECAP */}
      {/* ========================================================================= */}
      {learningMode === "fullRecap" && (
        <MarkdownRecapViewer
          currentWeekId={selectedWeek.id}
          onSelectWeek={onSelectWeek}
        />
      )}

      {/* FOOTER CORE CONCEPTS & CASES */}
      <div className="pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Curriculum Core Concepts
          </h4>
          <ul className="space-y-1 text-slate-600">
            {selectedWeek.coreConcepts.map((c, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-blue-600 font-bold">•</span> {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Real-World Strategic Applications
            </h4>
            <ul className="space-y-1 text-slate-600">
              {selectedWeek.businessCases.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">•</span> {c}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setLearningMode("cases")}
            className="mt-3 text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 self-start"
          >
            <span>🏢</span> Open 4-Pillar Case Dossiers & Sources →
          </button>
        </div>
      </div>
    </div>
  );
};
