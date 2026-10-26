import React, { useState, useEffect, useMemo, useRef } from "react";
import { LectureNotesView } from "./components/LectureNotesView";
import { GameTreeDiagram } from "./components/GameTreeDiagram";
import { DominanceSolvableMatrix } from "./components/DominanceSolvableMatrix";
import { CommitmentGameTree } from "./components/CommitmentGameTree";
import { MixedStrategyVisualizer } from "./components/MixedStrategyVisualizer";
import { RepeatedGameSimulator } from "./components/RepeatedGameSimulator";
import { AuctionSimulator } from "./components/AuctionSimulator";

// --- Clean Inline Lucide Icons ---
    const Icon = ({ name, className = "w-5 h-5", ...props }) => {
      const paths = {
        book: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5" />,
        checkCircle: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />,
        circle: <circle cx="12" cy="12" r="10" />,
        check: <polyline points="20 6 9 17 4 12" />,
        clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
        award: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
        chevronRight: <polyline points="9 18 15 12 9 6" />,
        chevronDown: <polyline points="6 9 12 15 18 9" />,
        download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
        upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
        externalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
        play: <polygon points="5 3 19 12 5 21 5 3" />,
        fileText: <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></>,
        barChart: <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
        helpCircle: <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
        refresh: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
        save: <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></>,
        target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
        zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
        layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
        eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
        eyeOff: <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>,
        lightbulb: <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></>,
        shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
        sparkles: <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />,
        x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
        printer: <><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></>,
        code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
        gitBranch: <><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></>,
        table: <><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></>
      };

      // Parse Tailwind width/height classes into explicit pixel dimensions for fallback safety
      let iconPx = 20;
      if (className.includes("w-2.5") || className.includes("h-2.5")) iconPx = 10;
      else if (className.includes("w-3 ") || className.endsWith("w-3") || className.includes("h-3")) iconPx = 12;
      else if (className.includes("w-3.5") || className.includes("h-3.5")) iconPx = 14;
      else if (className.includes("w-4") || className.includes("h-4")) iconPx = 16;
      else if (className.includes("w-5") || className.includes("h-5")) iconPx = 20;
      else if (className.includes("w-6") || className.includes("h-6")) iconPx = 24;
      else if (className.includes("w-7") || className.includes("h-7")) iconPx = 28;
      else if (className.includes("w-8") || className.includes("h-8")) iconPx = 32;
      else if (className.includes("w-10") || className.includes("h-10")) iconPx = 40;

      if (name === "xLogo") {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={iconPx}
            height={iconPx}
            style={{ width: `${iconPx}px`, height: `${iconPx}px`, maxWidth: `${iconPx}px`, maxHeight: `${iconPx}px`, flexShrink: 0, display: "inline-block" }}
            fill="currentColor"
            className={className}
            {...props}
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      }

      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={iconPx}
          height={iconPx}
          style={{ width: `${iconPx}px`, height: `${iconPx}px`, maxWidth: `${iconPx}px`, maxHeight: `${iconPx}px`, flexShrink: 0, display: "inline-block" }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
          {paths[name] || <circle cx="12" cy="12" r="8" />}
        </svg>
      );
    };

    // --- Official Course Recaps Data (Synthesized from Lecture Materials) ---
    const WEEK0_RECAP = {
      weekId: 0,
      title: "Course Overview: Strategic Diagnosis & Methodological Foundations",
      chineseTitle: "課程全景導覽：策略診斷框架與方法論基礎",
      duration: "Foundational Overview • Whole-Course Architecture",
      markdownPath: "./recaps/week00-recap.md",
      academicTakeaway: "Make better decisions when other decision-makers are thinking too: diagnose the problem, define the players and payoffs, and choose the representation that matches reality.",
      chineseTakeaway: "當其他決策者也在深謀遠慮時，做出更優決策：先診斷策略問題，釐清參與者與回報，再選用符合真實時序與資訊結構的博弈模型。",
      readTime: "6 min read • Course Syllabus & Playbook",
      intro: "Week 0 establishes the guiding mental model and strategic diagnosis framework applied across the entire 12-week executive course. Game theory is not a collection of manipulative tricks, nor is it abstract mathematics detached from business realities. It is a disciplined conceptual framework to reason systematically when competitive outcomes depend on interacting decisions.",
      sections: [
        {
          id: "w0-core-philosophy",
          title: "What Game Theory Is (and Is NOT)",
          chineseTitle: "博弈論的本質：科學思維 vs. 認識誤區",
          content: [
            "Game theory provides formal tools to anticipate strategic responses, detect stable equilibria, escape destructive traps (such as price wars), and structure credible commitments.",
            "It is NOT a manipulative handbook to defeat rivals at all costs, nor does it guarantee a single magic move in every situation. Its true value lies in disciplined diagnosis."
          ]
        },
        {
          id: "w0-diagnosis-framework",
          title: "The 5-Step Strategic Diagnosis Framework",
          chineseTitle: "五步驟策略診斷框架",
          steps: [
            { step: 1, title: "Decision", desc: "Who must decide what? Identify the primary strategic choice facing your firm." },
            { step: 2, title: "Game", desc: "Who are the players, and what actions are realistically available to each?" },
            { step: 3, title: "Structure", desc: "What is the timing (simultaneous vs. sequential), information transparency, and payoffs?" },
            { step: 4, title: "Analysis", desc: "What responses, dominant strategies, or equilibria does the model predict?" },
            { step: 5, title: "Recommendation", desc: "What should the executive do, and what critical assumption could reverse the conclusion?" }
          ]
        },
        {
          id: "w0-representations",
          title: "Two Core Strategic Representations",
          chineseTitle: "兩大核心表象：收益矩陣 vs. 博弈樹",
          comparison: [
            { form: "Payoff Matrix (Normal Form)", use: "Simultaneous moves: players act without knowing rivals' current choices (e.g. price competition, ad budgets, AI capex). Formalized in Week 1." },
            { form: "Game Tree (Extensive Form)", use: "Sequential moves: decisions occur in order, and later movers observe earlier actions (e.g. market entry, product launches, preemptive capacity). Formalized in Week 2." }
          ]
        }
      ]
    };

    const WEEK1_RECAP = {
      weekId: 1,
      title: "Course Recap: Introduction to Game Theory",
      chineseTitle: "課堂精華回顧：博弈論導論與策略互動",
      duration: "3 Hours • Lecture Seminar Recap",
      markdownPath: "./recaps/week01-recap.md",
      academicTakeaway: "A strategic decision cannot be properly evaluated without considering how other players are likely to respond.",
      chineseTakeaway: "任何商業策略決策若不預先考量競爭對手的可能反應，便無法得到正確的評估與結論。",
      readTime: "7 min read • Executive Synthesis",
      intro: "The first class introduced game theory as the study of interactive decision-making. Unlike an individual decision problem, a strategic decision cannot be evaluated independently because its outcome also depends on what other decision-makers do. A firm considering whether to reduce prices, offer coupons, advertise, charge an additional fee, or invest in technology must therefore anticipate how competitors are likely to respond.",
      sections: [
        {
          id: "w1-elements",
          title: "Basic Elements of a Game",
          chineseTitle: "博弈的三大基本要素",
          summary: "A game can be analyzed by identifying three fundamental elements: Players, Strategies, and Payoffs.",
          points: [
            { label: "Players", desc: "The individuals, firms, or organizations making decisions." },
            { label: "Strategies", desc: "The actions available to each player." },
            { label: "Payoffs", desc: "The consequences of each possible combination of actions." }
          ],
          insight: "Defining these elements correctly is essential. In business applications, payoffs may include not only immediate profits but also market share, customer acquisition, reputation, and future competitive position. Different conclusions about a game may therefore arise because people assign different payoffs to the same outcomes."
        },
        {
          id: "w1-timing",
          title: "Simultaneous and Sequential Decisions",
          chineseTitle: "同時決策與序貫決策的差異",
          content: [
            "The class distinguished between simultaneous-move games and sequential-move games.",
            "In a simultaneous-move game, each player chooses without observing the other players' current choices. The decisions do not have to occur at exactly the same time. The defining feature is that each player acts without knowing what the others have chosen.",
            "In a sequential-move game, one player acts first and another responds after observing that action. The order of decisions can affect the outcome because an early action may influence the choices available to others. This introduces the strategic importance of timing and commitment."
          ]
        },
        {
          id: "w1-responses",
          title: "Best Responses and Dominant Strategies",
          chineseTitle: "最佳反應與優勢策略",
          content: [
            "The class initially focused on one-shot simultaneous-move games.",
            "A best response is the action that gives a player the highest payoff for a particular action taken by another player. Strategic analysis therefore requires players to consider what they should do under each possible action of their opponent.",
            "A dominant strategy is an action that is the player's best response regardless of what the other player chooses. Although choosing a dominant strategy is individually rational, it does not necessarily lead to the best collective outcome."
          ]
        },
        {
          id: "w1-dilemma",
          title: "The Prisoner's Dilemma",
          chineseTitle: "囚徒困境：個體理性與集體利益的衝突",
          content: [
            "The prisoner's dilemma illustrated the conflict between individual incentives and collective welfare. Each player has an incentive to act aggressively or defect, regardless of what the other player does. As a result, both players choose their dominant strategies.",
            "However, the resulting outcome is worse for both players than mutual cooperation would have been. The problem is not simply a lack of understanding or communication. Each player has an individual incentive to deviate from cooperation, even when both recognize its collective benefit."
          ],
          coreRule: "Individually rational decisions can produce a collectively undesirable outcome."
        },
        {
          id: "w1-applications",
          title: "Real-World Business Applications",
          chineseTitle: "六大商業實戰應用場景剖析",
          summary: "These examples show why business decisions must be analyzed in relation to competitors' actions rather than solely on their direct costs and benefits.",
          cases: [
            {
              tag: "Price War",
              name: "Price Competition",
              detail: "Two firms may both benefit from maintaining relatively high prices, but each firm has an incentive to reduce its price to attract customers. Once one firm cuts its price, the other may respond in the same way. The result can be a price war in which both firms earn lower profits."
            },
            {
              tag: "Food Delivery",
              name: "Food-Delivery Coupon Warfare",
              detail: "Each company may use coupons to attract customers from its competitor. If both offer substantial discounts, neither gains a lasting competitive advantage, while both bear the cost of the promotion."
            },
            {
              tag: "Marketing",
              name: "Advertising Spending Wars",
              detail: "Competing firms may advertise heavily because reducing advertising unilaterally could result in lost visibility or market share. If both advertise aggressively, their relative positions may remain similar while both incur substantial costs."
            },
            {
              tag: "Aviation",
              name: "Airline Baggage Fees",
              detail: "Whether charging a fee is attractive depends on competitors' policies and on how customers respond. The analysis therefore requires careful specification of the payoffs."
            },
            {
              tag: "E-Commerce",
              name: "Shipping and Promotional Policies",
              detail: "Free shipping or discounts may attract customers when introduced by one company, but the advantage may disappear when competitors imitate the policy."
            },
            {
              tag: "Tech & AI",
              name: "Strategic Investment in AI Hardware",
              detail: "Companies may invest heavily not only because of the direct benefits, but also because failing to match competitors' investments could create a long-term strategic disadvantage."
            }
          ]
        },
        {
          id: "w1-nash",
          title: "Nash Equilibrium",
          chineseTitle: "納什均衡與策略穩定性",
          content: [
            "The class also introduced Nash equilibrium. An outcome is a Nash equilibrium when each player's strategy is a best response to the strategies chosen by the others. No player can improve their payoff by changing their own action alone.",
            "A Nash equilibrium is therefore strategically stable, but it is not necessarily desirable. In the prisoner's dilemma, mutual defection is a Nash equilibrium because neither player can benefit from changing alone. Nevertheless, both players would be better off under mutual cooperation.",
            "This finding challenges the idea that rational individual choices always produce an efficient collective outcome."
          ]
        },
        {
          id: "w1-cooperation",
          title: "Cooperation, Self-Restraint, and Repeated Interaction",
          chineseTitle: "合作、自我克制與重複博弈（以 OPEC 為例）",
          content: [
            "The class briefly considered how repeated interaction can change strategic incentives. In a one-time game, a player may exploit a short-term opportunity without facing future consequences. When the same players interact repeatedly, aggressive behavior may lead to retaliation, loss of trust, or reduced cooperation later.",
            "The discussion of OPEC illustrated this difficulty. Oil producers may collectively benefit from limiting output, but each producer has an incentive to increase its own production while others exercise restraint. Sustaining cooperation therefore requires discipline, monitoring, and credible consequences for deviation.",
            "This relates to the broader idea of self-restraint. Strategic success may require players to resist an immediate gain in order to preserve a more valuable long-term relationship. However, self-restraint is difficult when a player cannot be confident that others will behave similarly."
          ]
        },
        {
          id: "w1-commitment",
          title: "Commitment and Unpredictability",
          chineseTitle: "戰略承諾與不可預測性",
          tools: [
            {
              tool: "Commitment (戰略承諾)",
              desc: "A player may influence others by taking an action that is difficult or costly to reverse. A commitment is effective only if other players regard it as credible. Commitment makes intended behavior more predictable and credible."
            },
            {
              tool: "Unpredictability (不可預測性)",
              desc: "In some competitive situations, being predictable allows an opponent to choose an effective response. Varying one's behavior may therefore create a strategic advantage by making it difficult for competitors to anticipate and counter."
            }
          ]
        }
      ]
    };

    const WEEK2_RECAP = {
      weekId: 2,
      title: "Course Recap: Sequential Games and Backward Induction",
      chineseTitle: "課堂精華回顧：序貫博弈與向後歸納法",
      duration: "3 Hours • Extensive Form Seminar Recap",
      markdownPath: "./recaps/week02-recap.md",
      academicTakeaway: "Timing changes strategic incentives. In a sequential game, a player should anticipate how later players will respond before selecting an initial action.",
      chineseTakeaway: "決策時機直接改變了策略激勵機制。在序貫博弈中，決策者必須在採取初始行動之前，充分預判後續參與者的可能回應。",
      readTime: "8 min read • Executive Synthesis",
      intro: "The second class reviewed strategic interdependence, dominant strategies, and the prisoner's dilemma before introducing sequential games, in which players move in a particular order. The main focus was how the timing of decisions affects strategic behavior and how players can anticipate future responses when making current decisions.",
      sections: [
        {
          id: "w2-interdependence",
          title: "Review of Strategic Interdependence",
          chineseTitle: "策略依存性與合作困境回顧",
          content: [
            "The class began by revisiting the idea that a player's best decision depends on what other players are expected to do. Examples such as price competition illustrated how individually rational choices can produce poor outcomes for everyone.",
            "Although cooperation may improve the collective outcome, it can be difficult to sustain when each player has an incentive to act in their own short-term interest. Trust, shared norms, repeated interaction, and changes in incentives may help players avoid these outcomes."
          ]
        },
        {
          id: "w2-timing-types",
          title: "Simultaneous and Sequential Games",
          chineseTitle: "同時博弈 vs 序貫博弈",
          points: [
            { label: "Simultaneous Games", desc: "Players choose their actions without observing the current choices of others." },
            { label: "Sequential Games", desc: "Players move in turn, and later players observe earlier actions before making their decisions." }
          ],
          insight: "In a sequential game, the order of moves matters because an earlier action can influence how another player responds. Players must therefore look ahead and anticipate the consequences of each possible action. Business examples included product launches, market entry, pricing decisions, lending rates, and production decisions. These examples demonstrated that the value of moving first or waiting depends on the structure of the particular game."
        },
        {
          id: "w2-gametrees",
          title: "Representing Sequential Games with Game Trees",
          chineseTitle: "以博弈樹（Game Tree）呈現決策流程",
          elements: [
            "1. The players participating in the interaction",
            "2. The exact order in which they move",
            "3. The actions available at each decision point (nodes & branches)",
            "4. The possible paths generated by those actions",
            "5. The payoffs at the end of each path (terminal nodes)"
          ],
          warning: "Constructing the game tree requires careful judgment about who moves first, what later players observe, and which actions are realistically available. An incorrectly specified sequence of moves can lead to an incorrect strategic prediction."
        },
        {
          id: "w2-actions-vs-strategies",
          title: "Actions and Strategies",
          chineseTitle: "行動（Action）與策略（Strategy）的本質區別",
          definitions: [
            {
              term: "Action (行動)",
              desc: "A particular choice made at one single decision point."
            },
            {
              term: "Strategy (策略)",
              desc: "A complete plan describing what a player would do at every decision point at which they might be called upon to act."
            }
          ],
          detail: "When a player moves only once, the distinction between an action and a strategy may not appear important. When a player may move more than once or may need to respond to different earlier actions, however, a complete strategy must specify the player's intended response in every possible situation."
        },
        {
          id: "w2-backward-induction",
          title: "Backward Induction (向後歸納法)",
          chineseTitle: "向後歸納法的三步驟分析架構",
          summary: "Rather than beginning at the start of the game and simply predicting what might happen next, backward induction begins with the final decision.",
          steps: [
            { step: 1, title: "Identify the last player", desc: "Identify the last player required to make a decision at the terminal stages of the game." },
            { step: 2, title: "Determine final optimal action", desc: "Determine which action that player would choose at each possible final decision point by comparing terminal payoffs." },
            { step: 3, title: "Work backward through the tree", desc: "Work backward through the game tree, using these predicted choices to determine what earlier players should do." }
          ],
          takeaway: "By anticipating how later players will respond, an earlier player can select the action that produces the most favorable eventual outcome. Backward induction therefore connects present decisions with their future strategic consequences."
        },
        {
          id: "w2-market-entry",
          title: "Market Entry and the Incumbent's Response",
          chineseTitle: "市場進入與現有企業回應（對抗 vs 容納）",
          content: [
            "Market entry was used as a central example. A potential entrant first decides whether to enter a market. If entry occurs, the incumbent firm must decide whether to fight the entrant or accommodate its entry.",
            "The entrant should not base its decision only on the incumbent's stated threat to fight. Instead, it should examine the incumbent's payoffs after entry has already occurred. If accommodating entry would be more profitable than fighting, a rational incumbent would accommodate at that stage.",
            "The entrant can anticipate this response through backward induction. If entry followed by accommodation gives the entrant a favorable payoff, it may choose to enter despite the incumbent's threat.",
            "Core Lesson: Strategic decisions should be based on what another player will have an incentive to do when the relevant decision point is reached, rather than simply on what that player currently claims it will do."
          ]
        },
        {
          id: "w2-credibility",
          title: "Credible and Non-Credible Threats",
          chineseTitle: "可信威脅 vs 不可信威脅（廉價口頭威嚇）",
          content: [
            "The market-entry example introduced the importance of credibility. A threat can influence another player's behavior only if carrying it out would be rational when the time comes.",
            "An incumbent may announce that it will respond aggressively to any entrant. However, if fighting is costly and accommodation becomes more profitable after entry, the threat may not be credible. A rational entrant should therefore distinguish between the incumbent's words and its actual future incentives.",
            "A threat becomes more credible when the player has made a commitment that changes those incentives or makes retreat difficult. Investments in excess capacity, contractual obligations, established policies, and reputational concerns may make a threatened response more believable."
          ]
        },
        {
          id: "w2-mover-advantages",
          title: "First-Mover and Second-Mover Advantages",
          chineseTitle: "先行者優勢 vs 後發者優勢",
          comparison: [
            {
              side: "First-Mover Advantage (先行者)",
              benefits: [
                "Shaping the rules of the game by making an early commitment",
                "Securing early customers, key distributors, or scarce prime locations",
                "Preempting strategic capacity and erecting scale barriers",
                "Constraining the choices and strategic responses available to later entrants"
              ]
            },
            {
              side: "Second-Mover Advantage (後發者 / 快速跟隨者)",
              benefits: [
                "Observing the first mover's action and consumer adoption rates",
                "Learning from pioneer missteps, technical glitches, and regulatory friction",
                "Improving technology, features, and cost efficiency before launch",
                "Avoiding the enormous capital cost and uncertainty of pioneering a new market"
              ]
            }
          ],
          verdict: "Whether there is a first-mover advantage or second-mover advantage therefore depends on the specific payoffs, information, and available responses in the game."
        },
        {
          id: "w2-tech-launch",
          title: "Technology Launch Timing",
          chineseTitle: "科技新產品上市時機的權衡",
          tradeoffs: [
            {
              option: "Launching Early (搶先上市)",
              reasons: [
                "Establish a strong market position and user base",
                "Attract early adopters before competitors introduce substitutes",
                "Build an industry-leading reputation as an innovative pioneer",
                "Influence subsequent technical standards and ecosystem development"
              ]
            },
            {
              option: "Waiting (等待觀察後發制人)",
              reasons: [
                "Observe the performance and customer satisfaction of the early entrant",
                "Learn directly from competitor trial-and-error without paying the tuition",
                "Refine and harden the technology prior to commercial scale",
                "Avoid the severe risk and financial burn of market education"
              ]
            }
          ]
        },
        {
          id: "w2-platform-entry",
          title: "Platform Entry and Regulatory Responses",
          chineseTitle: "平台進入策略與監管回應博弈",
          content: [
            "The class also applied game-tree analysis to decisions involving platforms and regulators. A platform might choose among entry methods such as organic expansion, acquisition, or partnership, after which a regulator may approve, restrict, or challenge the chosen approach.",
            "To analyze such a situation, the model must clearly identify: (1) the platform and regulator as players, (2) the sequence of their decisions, (3) the entry methods available to the platform, (4) the possible regulatory responses, and (5) the payoffs associated with each final outcome.",
            "The platform should anticipate how the regulator is likely to respond to each entry method. This expected regulatory response then influences the platform's initial choice."
          ]
        },
        {
          id: "w2-role-of-models",
          title: "Practical Role of Economic Models",
          chineseTitle: "經濟學博弈模型的實踐價值與局限",
          takeaways: [
            "Game trees are simplified representations of business situations. Their purpose is not to reproduce every detail of reality, but to isolate the most important strategic relationships.",
            "A useful model should identify the relevant players, actions, timing, information, and payoffs clearly enough to explain the logic behind a decision.",
            "Assumptions and payoff assignments should be justified because different assumptions may generate different predicted outcomes."
          ]
        }
      ]
    };

    const WEEK3_RECAP = {
      weekId: 3,
      title: "Course Recap: Games with Simultaneous Moves and Nash Equilibrium",
      chineseTitle: "課堂精華回顧：同時博弈、納什均衡與寡頭競爭",
      duration: "3 Hours • Quantitative Workshop & Case Lab",
      markdownPath: "./recaps/week03-recap.md",
      academicTakeaway: "In simultaneous moves, no player observes the other's choice before acting. Strategic stability requires that every player chooses their best response to the choices of everyone else.",
      chineseTakeaway: "在同時博弈中，參與者在決策時無法預知對手的當前選擇。戰略穩定性要求每一位參與者的決策，都必須是對其他所有人決策的最佳回應（Best Response）。",
      readTime: "9 min read • Executive Quantitative Synthesis",
      intro: "Week 3 advances from sequential decisions into games with simultaneous moves, where executives must commit capital without observing competitor choices in real time. The session establishes the formal mathematics of best response functions, Iterated Elimination of Strictly Dominated Strategies (IESDS), the concept of strategic stability through Nash Equilibrium, the four archetypal 2x2 games, and the foundational oligopoly models of Cournot (quantity) and Bertrand (price) competition.",
      sections: [
        {
          id: "w3-simultaneous-timing",
          title: "The Nature of Simultaneous Moves",
          chineseTitle: "同時博弈的本質：資訊不完全性而非鐘錶時間",
          content: [
            "In business decision-making, 'simultaneous' does not mean actions occur at the exact same second. Rather, it means that neither decision-maker observes the competitor's choice prior to committing resources.",
            "Examples include sealed-bid tenders, corporate annual R&D allocations, Black Friday promotional pricing, and console hardware launch pricing. Because you cannot react, you must formulate rational beliefs about rival actions and optimize against those expectations."
          ]
        },
        {
          id: "w3-best-response-dominance",
          title: "Best Responses & Strictly Dominated Strategies",
          chineseTitle: "最佳回應函數與嚴格劣勢策略",
          definition: "An action is player i's Best Response if it delivers the highest payoff given the rival's strategy: u_i(s_i*, s_{-i}) >= u_i(s_i, s_{-i}) for all available s_i.",
          rule: "Strictly Dominated Strategy: An action that delivers strictly lower payoffs than some alternative under EVERY conceivable rival choice. Rational executives NEVER play strictly dominated strategies."
        },
        {
          id: "w3-iesds",
          title: "Iterated Elimination of Strictly Dominated Strategies (IESDS)",
          chineseTitle: "嚴格劣勢策略的重複剔除（IESDS）",
          content: [
            "Pruning dominated actions reduces strategic noise. Rational players never play dominated moves, and knowing rivals are rational, you anticipate they will not play them either.",
            "Theorem: IESDS never eliminates any Nash Equilibrium. When IESDS reduces a game to a unique outcome, the game is Dominance Solvable without requiring communication or trust."
          ]
        },
        {
          id: "w3-nash-eq",
          title: "Nash Equilibrium & Strategic Stability",
          chineseTitle: "納什均衡與自我履約的穩定性",
          content: [
            "A Nash Equilibrium is a state where each player's strategy is simultaneously a best response to the strategies chosen by everyone else. No player has a unilateral incentive to deviate.",
            "Crucial Distinction: Strategic stability does NOT equal collective optimality. In the Prisoner's Dilemma, individually rational equilibrium produces mutual profit destruction."
          ]
        },
        {
          id: "w3-archetypes",
          title: "The 4 Classic 2x2 Simultaneous Game Archetypes",
          chineseTitle: "四大經典 2x2 同時博弈範式",
          archetypes: [
            { name: "Prisoner's Dilemma", eq: "1 Unique (Defect, Defect)", issue: "Pareto inefficient; price-war trap.", solution: "Binding contracts, repeated interaction." },
            { name: "Coordination Game", eq: "2 Pure Eq on diagonal", issue: "Risk of miscoordination (0, 0).", solution: "Focal points (Schelling points), pre-announcements." },
            { name: "Hawk-Dove / Chicken", eq: "2 Asymmetric Eq", issue: "Mutual aggression causes disaster.", solution: "Irreversible commitment to stand firm." },
            { name: "Matching Pennies", eq: "0 Pure Strategy Eq", issue: "Cyclic incentives; pure conflict.", solution: "Mixed strategies (Week 4 deliberate randomization)." }
          ]
        },
        {
          id: "w3-cournot-bertrand",
          title: "Oligopoly Competition: Cournot vs. Bertrand",
          chineseTitle: "寡頭競爭模型：古諾（產量）vs. 伯川德（價格）",
          comparison: [
            {
              model: "Cournot (Quantity / Capacity Competition)",
              mechanism: "Firms choose output simultaneously; market price clears total supply.",
              properties: "Quantities are strategic substitutes (rival expands -> you contract). Equilibrium price settles between monopoly and perfect competition.",
              domain: "Heavy asset industries with long lead times (Aircraft assembly, wafer fab allocation, oil quotas)."
            },
            {
              model: "Bertrand (Price Competition)",
              mechanism: "Firms set prices simultaneously for homogeneous goods; lowest price captures 100% market.",
              properties: "Bertrand Paradox: With only 2 firms, price collapses to Marginal Cost (P = MC), destroying all economic profit.",
              domain: "Commoditized digital goods or retail. Executives escape through differentiation, capacity constraints, and switching costs."
            }
          ]
        }
      ]
    };

    const WEEK4_RECAP = {
      weekId: 4,
      title: "Course Recap: Mixed Strategies & Strategic Randomisation",
      chineseTitle: "課堂精華回顧：混合策略、預期收益與無差異原則",
      duration: "3 Hours • Strategic Randomisation Seminar",
      markdownPath: "./recaps/week04-recap.md",
      academicTakeaway: "When predictability makes you exploitable, randomisation can be rational.",
      chineseTakeaway: "當可預測性使你處於被動劣勢時，戰略性隨機化即是理性選擇。在混合策略納什均衡中，你的混合概率是透過使對手在各純策略間無差異而決定的。",
      readTime: "10 min read • Executive Synthesis (Slides 1–26)",
      intro: "Week 4 resolves the fundamental dilemma of games with zero pure-strategy Nash equilibria (such as Matching Pennies, Competitive Auditing, and Retail Price Promotions). When any predictable pure move allows a competitor to counter and exploit you, executives must adopt Mixed Strategies. This session covers the Indifference Principle, algebraic calculation of optimal mixing probabilities (p* and q*), empirical testing in sports and business, and modern managerial applications in algorithmic dynamic repricing, security screening, and corporate compliance audits.",
      sections: [
        {
          id: "w4-unpredictability",
          title: "The Strategic Necessity of Being Unpredictable",
          chineseTitle: "戰略不可預測性的必要性：零純策略均衡的困境",
          content: [
            "In zero-sum games, inspection environments, and discount wars, any fixed pure strategy creates an exploitable pattern. If your rival can forecast your move, they will position their resources to counter you.",
            "Matching Pennies, penalty kicks, and tennis serves demonstrate that when incentives cycle infinitely, true stability can only be achieved through calculated stochastic randomization."
          ]
        },
        {
          id: "w4-indifference-principle",
          title: "The Indifference Principle Engine",
          chineseTitle: "無差異原則：混合策略的核心數學引擎",
          definition: "A rational player will strictly randomize between two pure actions if and only if both actions yield the exact same expected payoff: E[U_i(Action 1)] = E[U_i(Action 2)] = E[U_i(sigma*)].",
          rule: "The Great Counter-Intuitive Truth: You do NOT choose p* to maximize your own immediate score; you choose p* to make your RIVAL indifferent among their pure actions!"
        },
        {
          id: "w4-algebra-derivation",
          title: "Algebraic Derivation of Mixing Probabilities (p* and q*)",
          chineseTitle: "混合均衡概率（p* 與 q*）的代數推導步驟",
          content: [
            "Equate Row's expected payoffs to solve for Column's probability q*: q* = (D - B) / ((A - B) - (C - D)).",
            "Equate Column's expected payoffs to solve for Row's probability p*: p* = (d - c) / ((a - c) - (b - d)).",
            "Nash's Theorem (1950): Every finite normal-form game has at least one Nash Equilibrium when mixed strategies are permitted."
          ]
        },
        {
          id: "w4-business-apps",
          title: "Corporate Applications: Sales Models, Audits & Dynamic Pricing",
          chineseTitle: "企業應用：促銷折扣模型、合規審計與動態算法定價",
          applications: [
            { name: "Varian's Model of Sales", domain: "Retail Pricing", insight: "Randomized discounts price-discriminate between informed bargain hunters and uninformed loyal shoppers. Predictable discount calendars destroy gross margins." },
            { name: "The Auditing Paradox", domain: "Tax & Compliance", insight: "Increasing fines does not reduce evasion directly; it allows regulators to reduce audit frequency while maintaining taxpayer indifference." },
            { name: "Amazon Algorithmic Repricing", domain: "E-Commerce", insight: "Deterministic pricing algorithms create automated death spirals; state-of-the-art repricers inject stochastic noise to probe elasticity." },
            { name: "Stackelberg Security Games", domain: "Resource Defense", insight: "LAX airport screening and cyber-patrols use randomized algorithms to prevent adversaries from finding surveillance blind spots." }
          ]
        },
        {
          id: "w4-human-biases",
          title: "Human Cognitive Traps in Randomness",
          chineseTitle: "人類直覺在隨機化中的認知偏差",
          biases: [
            { name: "Alternation Bias", desc: "Humans switch options too frequently, wrongly believing repetition is non-random." },
            { name: "Clustering Illusion", desc: "Misinterpreting true random streaks and streaks as intentional strategic trends." },
            { name: "Gambler's Fallacy", desc: "Erroneously assuming that after several promotions, a full-price period is 'due'." }
          ],
          takeaway: "Never allow human intuition to manage mixed strategy decisions. Formulate the matrix, calculate p* and q*, and delegate execution to automated cryptographic randomizers."
        }
      ]
    };

    const WEEK5_RECAP = {
      weekId: 5,
      title: "Course Recap: Commitment and Strategic Moves",
      chineseTitle: "課堂精華回顧：戰略承諾、可信度與未來激勵重塑",
      duration: "3 Hours • Credibility & Irreversibility Seminar",
      markdownPath: "./recaps/week05-recap.md",
      academicTakeaway: "Commitment changes the game; cheap talk describes the game you wish existed.",
      chineseTakeaway: "戰略承諾改變了博弈本質；空談只是描述了你一廂情願的博弈。唯有在未來的決策節點依然最優或無法逆轉，威脅或承諾才具備可信度。",
      readTime: "11 min read • Executive Synthesis (Slides 1–28)",
      intro: "Week 5 investigates strategic moves: observable earlier actions that deliberately alter future incentives, payoff matrices, or available options before rivals respond. While Week 4 focused on managing predictability through mixed strategies, Week 5 shifts to restricting flexibility to force favorable responses from competitors. This seminar examines the classic Entry Deterrence Game, backward-induction credibility testing, the four pillars of strategic commitment, the boundary between sunk costs and true commitment devices, and the core strategic trade-off between commitment and flexibility.",
      sections: [
        {
          id: "w5-entry-deterrence",
          title: "The Baseline Entry Game: Why Empty Threats Fail",
          chineseTitle: "基準市場進入博弈：為何口頭威脅必定失敗",
          content: [
            "In a sequential entry game, an entrant chooses whether to Enter or Stay Out. If entry occurs, an incumbent chooses whether to Fight (price war) or Accommodate (duopoly).",
            "At the post-entry node, accommodating yields a higher payoff than fighting. Because a rational incumbent will always accommodate, the entrant backward-induces that the threat to fight is pure cheap talk, and safely enters the market."
          ],
          keyTakeaway: "Talk is cheap. Any threat or promise that is not in your self-interest when the future decision node is reached has zero deterrent power."
        },
        {
          id: "w5-commitment-transformation",
          title: "Transforming the Game with Upfront Commitment",
          chineseTitle: "透過事前戰略承諾重塑未來博弈結構",
          content: [
            "Suppose the incumbent pays an upfront capital cost K = 1 for dedicated capacity or long-term contracts. This lowers future marginal costs of fighting.",
            "Post-commitment, fighting becomes the dominant response if entry occurs. The entrant foresees a price war and chooses to Stay Out.",
            "Incumbent net profit rises from 2 (accommodated duopoly) to 4 (monopoly minus commitment cost 5 - 1 = 4)."
          ],
          keyTakeaway: "Optimal Commitment Rule: Invest in commitment if and only if V(after rival response) - K > V(without commitment)."
        },
        {
          id: "w5-four-pillars",
          title: "The Four Pillars of Strategic Commitment",
          chineseTitle: "戰略承諾的四大核心支柱",
          content: [
            "1. Prior: Executed before the rival's relevant response.",
            "2. Observable: The rival can clearly verify or reliably infer the move.",
            "3. Irreversible / Costly Reversal: Withdrawal triggers prohibitive operational or legal penalties.",
            "4. Payoff-Relevant: Fundamentally reshapes future continuation payoffs or action spaces."
          ],
          keyTakeaway: "Observability and irreversibility are the twin anchors of credible strategic moves."
        },
        {
          id: "w5-sunk-cost-distinction",
          title: "Sunk Costs vs. Strategic Commitment Devices",
          chineseTitle: "沉沒成本謬誤與真正戰略承諾工具的界線",
          content: [
            "Sunk Cost Fallacy: 'We spent too much to stop.' Past expenses unrecoverable under both actions drop out of marginal comparison.",
            "A past expenditure only acts as a strategic commitment if it changes future marginal costs, expanded capacity, or imposes contractual penalties."
          ],
          keyTakeaway: "The mechanism of commitment is the changed continuation game, NOT the historical expense."
        },
        {
          id: "w5-commitment-devices",
          title: "Four Primary Commitment Devices in Industry",
          chineseTitle: "四種產業實戰承諾工具",
          content: [
            "Capacity & Physical Infrastructure: Semiconductor fabs, distribution networks, GPU clusters.",
            "Contracts & Financial Penalties: Take-or-pay supply agreements, most-favored-nation clauses.",
            "Reputational Bonding: Public CEO stances, transparent refund guarantees, brand staking.",
            "Cutting Off Options: Deliberately burning retreat bridges (Cortés strategy)."
          ]
        },
        {
          id: "w5-flexibility-tradeoff",
          title: "The Strategic Trade-Off: Commitment vs. Flexibility",
          chineseTitle: "戰略權衡：承諾鎖定 vs. 靈活性保留",
          content: [
            "Commitment is more valuable when: rival responses are sensitive to incentives, first-mover advantages exist, assets cannot be bypassed.",
            "Flexibility is more valuable when: demand or technology is uncertain, assets face rapid obsolescence, staged learning creates real-option value."
          ],
          keyTakeaway: "Commitment purchases leverage by sacrificing optionality. Weigh the deterrence surplus against the option value of flexibility."
        }
      ]
    };

    const WEEK6_RECAP = {
      weekId: 6,
      title: "Course Recap: Repeated Games — Cooperation, Punishment, and the Value of the Future",
      chineseTitle: "課堂精華回顧：重複博弈、懲罰機制與未來的價值",
      duration: "3 Hours • Dynamic Strategy Workshop & Case Lab",
      markdownPath: "./recaps/week06-recap.md",
      academicTakeaway: "Future interaction can change what is rational today: repetition makes the future discipline the present.",
      chineseTakeaway: "未來的策略互動，能夠從根本上改變今天的理性選擇：重複博弈讓未來的長期利益，約束今天的短期投機。",
      readTime: "11 min read • Executive Synthesis (Slides 1–30)",
      intro: "Week 6 transitions from upfront irreversible commitments (Week 5) to repeated interactions over time. When competitors know they will meet again tomorrow, the threat of future retaliation can transform a destructive Prisoner's Dilemma into sustainable tacit cooperation. This seminar investigates backward-induction unraveling in finite games, indefinite horizons, the discount factor delta (patience), the Grim Trigger threshold delta* = (T - R)/(T - P) = 1/3, Tit for Tat dynamics, asymmetric supply chain relationships, and monitoring errors.",
      sections: [
        {
          id: "w6-opening-dilemma",
          title: "The Pricing Stage Game & The Cooperation Question",
          chineseTitle: "基準定價博弈：囚徒困境與重複互動的破局可能",
          content: [
            "In a single-period stage game, two firms choose between Maintain (4, 4) and Discount (2, 2). Unilateral discount yields 5 to the discounter and 1 to the victim.",
            "In a one-shot interaction, Discount is strictly dominant; [Discount, Discount] (2, 2) is the unique Nash equilibrium despite destroying industry profit.",
            "Can the prospect of repeated future interaction discipline firms into maintaining high margins today without explicit illegal cartels?"
          ]
        },
        {
          id: "w6-finite-unraveling",
          title: "Why a Known Final Period Unravels Cooperation",
          chineseTitle: "為何已知的終止期限會導致合作徹底瓦解",
          content: [
            "In period T (the final period), there is no tomorrow to punish bad behavior, so both firms defect (Discount).",
            "At period T-1, both foresee that period T will collapse regardless of today's actions. Cooperation at T-1 cannot protect tomorrow, so both discount at T-1.",
            "Backward induction cascades all the way to period 1: In any finitely repeated Prisoner's Dilemma with a known final round, the one-shot defection repeats in every period."
          ],
          keyTakeaway: "The key to sustaining cooperation is not literal immortality; it is the absence of a known final interaction."
        },
        {
          id: "w6-two-strategies",
          title: "Two Repeated-Game Strategies: Grim Trigger vs. Tit for Tat",
          chineseTitle: "兩大經典重複博弈策略：冷酷觸發 vs. 以牙還牙",
          comparison: [
            {
              strategy: "Grim Trigger (Friedman 1971)",
              rule: "Begin by cooperating; cooperate while nobody deviates; punish with defection FOREVER upon any violation.",
              properties: "Maximum deterrence; lowest required discount factor threshold; fragile under observation errors."
            },
            {
              strategy: "Tit for Tat (Axelrod 1984)",
              rule: "Begin by cooperating; in every subsequent period, exactly copy the rival's previous period action.",
              properties: "Forgiving and responsive; punishment stops once cooperation resumes; may trigger retaliation echo cycles."
            }
          ]
        },
        {
          id: "w6-discount-factor",
          title: "The Discount Factor δ & Geometric Series Derivations",
          chineseTitle: "貼現因子 δ（耐心程度）與無窮等比數列推導",
          formula: "δ = p / (1 + r), where p is continuation probability and r is cost of capital.",
          derivation: "V_Cooperate = 4 / (1 - δ). V_Deviate = 5 + 2δ / (1 - δ). Cooperation holds iff 4 / (1 - δ) >= 5 + 2δ / (1 - δ) <=> δ >= 1/3.",
          generalRule: "General Grim Trigger Rule: δ* = (T - R) / (T - P). Lower temptation gain (T - R) and harsher punishment (P) make cooperation easier."
        },
        {
          id: "w6-asymmetric-partnerships",
          title: "Asymmetric Relationships & Dual Thresholds",
          chineseTitle: "非對稱企業夥伴關係與雙重門檻檢驗",
          content: [
            "In supply chain partnerships (powerful buyer vs. dependent supplier), payoffs and outside options differ.",
            "Separate thresholds must be checked: δ_1* = (T_1 - R_1)/(T_1 - P_1) and δ_2* = (T_2 - R_2)/(T_2 - P_2).",
            "Cooperation requires BOTH conditions to hold: δ >= max(δ_1*, δ_2*). The player with the larger threshold is the weakest link."
          ]
        },
        {
          id: "w6-monitoring-recovery",
          title: "Monitoring Noise & Recovery Mechanisms",
          chineseTitle: "資訊監控噪音、歸因謬誤與合作修復機制",
          takeaways: [
            "Secret rebates, customized enterprise bundling, and demand slumps make detecting cheating noisy.",
            "Permanent Grim Trigger destroys viable alliances upon a false positive or external demand slump.",
            "Effective real-world governance requires verified industry transparency indices and structured forgiveness periods."
          ]
        }
      ]
    };

    const WEEK7_RECAP = {
      weekId: 7,
      title: "Course Recap: Auctions I — Bidding, Information, and Auction Rules",
      chineseTitle: "課堂精華回顧：拍賣與競價策略（上）— 四種基本拍賣機制與競價策略",
      duration: "3 Hours • Mechanism Design & Bidding Lab",
      markdownPath: "./recaps/week07-recap.md",
      academicTakeaway: "When values are private, auction rules shape what bidders reveal and how aggressively they compete.",
      chineseTakeaway: "當估值屬於私有資訊時，拍賣機制的規則將從根本上決定競標者如何揭露資訊，以及競爭的激烈程度。",
      readTime: "12 min read • Executive Synthesis (Slides 1–31)",
      intro: "Week 7 transitions from repeated interactions over time (Week 6) to asymmetric private information and auction mechanisms. Auctions map submitted bids into allocations and payments. When sellers cannot directly observe buyers' valuations, mechanism rules determine whether bidders reveal their true willingness to pay or strategically shade bids. This seminar examines the four canonical auction formats (First-Price Sealed-Bid, Second-Price/Vickrey, English Ascending, Dutch Descending), the mathematical proof of weak dominance for truthful bidding in Vickrey auctions, optimal bid shading b*(v) = [(n-1)/n] · v, the Revenue Equivalence Theorem benchmark, the Winner's Curse in common-value assets, platform proxy bidding, and multi-attribute procurement scoring.",
      sections: [
        {
          id: "w7-opening-dilemma",
          title: "Opening Decision: A License Worth HK$100,000",
          chineseTitle: "開篇抉擇：價值十萬港元的營運牌照競標",
          content: [
            "Your firm values an exclusive commercial operating license at HK$100,000. You submit a sealed bid against a rival whose valuation is unknown.",
            "Under Rule A (First-Price): Highest bid wins and pays their own bid. Bidding HK$100,000 guarantees zero profit upon winning; you must shade downward.",
            "Under Rule B (Second-Price): Highest bid wins and pays the highest losing bid. Bidding your exact HK$100,000 valuation is weakly dominant: your bid decides whether you win, but the rival's bid determines what you pay."
          ]
        },
        {
          id: "w7-canonical-formats",
          title: "The Four Canonical Auction Formats & Equivalence Pairs",
          chineseTitle: "四種經典拍賣機制與策略等價配對",
          comparison: [
            {
              format: "First-Price Sealed Bid (FPSB)",
              rule: "Confidential sealed bids; highest bid wins and pays own bid.",
              strategy: "Strategic bid shading: b*(v) = [(n-1)/n] · v under risk neutrality."
            },
            {
              format: "Second-Price Sealed Bid (Vickrey)",
              rule: "Confidential sealed bids; highest bid wins and pays second-highest bid.",
              strategy: "Truthful revelation: b*(v) = v is weakly dominant."
            },
            {
              format: "English Open Ascending",
              rule: "Price ticks upward continuously until only one bidder remains.",
              strategy: "Stay active until price reaches valuation; resembles Second-Price."
            },
            {
              format: "Dutch Open Descending Clock",
              rule: "Price ticks downward continuously until the first bidder accepts.",
              strategy: "Wait until price hits shaded target; strategically equivalent to First-Price."
            }
          ]
        },
        {
          id: "w7-vickrey-dominance",
          title: "Why Truthful Bidding is Weakly Dominant in Second-Price",
          chineseTitle: "為何在次價拍賣中「誠實報價」是弱佔優策略",
          content: [
            "If the highest rival bid r < v: Bidding v wins and yields positive surplus v - r. Underbidding below r forfeits this profitable transaction; underbidding above r does not reduce your payment (you still pay r).",
            "If the highest rival bid r > v: Bidding v loses and pays 0. Overbidding above r causes you to win at a price exceeding your valuation, resulting in negative surplus v - r < 0.",
            "Conclusion: Truthful bidding b = v is at least as good as any alternative bid for every conceivable rival bid!"
          ]
        },
        {
          id: "w7-first-price-shading",
          title: "First-Price Bid Shading: The Winning Prob vs Margin Trade-off",
          chineseTitle: "首價拍賣競價折讓：得標機率與利潤空間的精確權衡",
          formula: "b*(v) = [(n - 1) / n] · v",
          derivation: "Higher bid increases win probability P(win) = [b/V_max]^(n-1) but reduces margin (v - b). First-order condition of expected profit (v - b) · [b/V_max]^(n-1) yields b*(v) = [(n-1)/n] · v.",
          riskEffect: "Risk-averse bidders shade less aggressively (b*(v) = [(n-1)/(n-1+α)] · v) because the fear of losing outweighs marginal profit."
        },
        {
          id: "w7-revenue-equivalence",
          title: "The Revenue Equivalence Theorem & The 4 Strict Assumptions",
          chineseTitle: "收益等價定理及其四項嚴格前置假設",
          content: [
            "Benchmark Theorem: Under risk neutrality, symmetry, independent private values (IPV), and efficient allocation to the highest-valuing bidder, all 4 canonical formats generate identical expected seller revenue: E[Revenue] = [(n-1)/(n+1)] · V_max.",
            "Intuition: Strategic bid shading in First-Price exactly compensates for the lower payment rule in Second-Price on average.",
            "Breakdown Conditions: Risk aversion causes First-Price to yield higher revenue; common values cause English auctions to reveal information and yield higher revenue."
          ]
        },
        {
          id: "w7-winners-curse",
          title: "The Winner's Curse in Common-Value Settings",
          chineseTitle: "共同價值拍賣與「贏家詛咒」逆向選擇風險",
          content: [
            "When asset value V is shared (mineral reserves, spectrum, corporate acquisitions), private signals s_i = V + ε_i are noisy.",
            "The winner is systematically the bidder with the most optimistic positive estimation error max(ε_i).",
            "Winning is informative: every rival estimated less. Naive bidders who bid unconditional estimates E[V|s_i] overpay and suffer post-award losses.",
            "Rational Bidding Rule: Condition your bid on the hypothetical event of winning: b*(s_i) = E[V | s_i = max_j s_j] < s_i."
          ]
        },
        {
          id: "w7-procurement-scoring",
          title: "Reverse Auctions & Multi-Attribute Procurement Scoring",
          chineseTitle: "採購反向拍賣與價格-品質雙維度評分機制",
          takeaways: [
            "Ordinary auctions have 1 seller and many buyers (highest bid wins); reverse procurement auctions have 1 buyer and many suppliers (lowest acceptable offer wins).",
            "Awarding solely on the lowest price creates severe adverse selection, contractor default, and execution delay.",
            "Modern procurement mechanisms deploy formulaic two-dimensional scoring: Total Score = w_p · PriceScore + w_q · QualityScore to ensure operational delivery."
          ]
        }
      ]
    };

    // --- Complete 12-Week Curriculum Data Architecture ---
    const CURRICULUM_DATA = [
      {
        id: 0,
        title: "Course Overview: Strategic Foundations & Course Architecture",
        chineseTitle: "課程全景導覽：策略基礎與12週架構",
        status: "active",
        duration: "Foundational Overview • Whole-Course Roadmap",
        preReadingUrl: "https://x.com/kochiuyu/status/2040084294102929468",
        recap: WEEK0_RECAP,
        coreConcepts: [
          "Strategic Diagnosis Mindset",
          "What Game Theory Is (and Is NOT)",
          "5-Step Strategic Diagnosis Framework",
          "Simultaneous vs. Sequential Representations",
          "Normal Form Matrix vs. Extensive Form Tree",
          "Players, Actions, Payoffs & Information",
          "12-Week Strategic Learning Journey",
          "Competitive Advantage & Sustainable Moats"
        ],
        businessCases: [
          "Duopoly Price Wars vs. Non-Price Competition",
          "First-Mover Commitment vs. Second-Mover Option Value",
          "Platform Ecosystems & Asymmetric Information",
          "Reputation Building & Repeated Market Interactions"
        ],
        slidePath: "./slides/week00.pdf",
        pageCount: 32,
        executiveSummary: [
          "Strategic Discipline: Business strategy without game theory reduces to wishful thinking. In every market, competitor actions shape your outcomes as much as your own.",
          "Diagnose Before Modeling: Apply the 5-Step Framework: Decision, Game, Structure, Analysis, Recommendation. Never jump straight to solutions without mapping payoffs and rival options.",
          "Representation Matches Timing: Use simultaneous normal-form matrices for blind or real-time moves; use sequential extensive-form trees with backward induction for staged commitments."
        ],
        caseAnalysis: {
          title: "Executive Strategic Diagnosis: Launching in a Duopoly",
          subtitle: "Applying the 5-Step Diagnosis Framework to Market Positioning",
          scenario: "You are the Chief Strategy Officer of a mid-sized enterprise software provider. A well-capitalized incumbent dominates the high-end enterprise segment with high switching costs, while a venture-backed startup is aggressively discounting in the SMB market. You must allocate $20M in R&D and go-to-market capital. Using Week 0's 5-Step Strategic Diagnosis Framework, map the players, timing, and payoffs before committing resources.",
          prompt: "How does framing this strategic problem as an interactive game alter your capital allocation compared to an isolated SWOT or financial DCF analysis?",
          solution: {
            equilibrium: "Diagnosis Outcome: Differentiate into Mid-Market Workflow Automation",
            breakdown: "A traditional DCF assumes pricing power remains static. Game-theoretic diagnosis shows that attacking the incumbent triggers a retaliatory bundle (incumbent's dominant response), while racing the startup to the bottom leads to a Bertrand price war trap. The stable niche is mid-market integration where neither rival possesses a dominant response to match.",
            managerialTakeaway: "Do not evaluate capital investments in a vacuum. Always backward induct the rival's best response to your entry."
          }
        }
      },
      {
        id: 1,
        title: "The Nature of Strategic Interaction",
        chineseTitle: "策略互動的本質與囚徒困境",
        status: "active",
        duration: "3 Hours • Lecture & Case Seminar",
        preReadingUrl: "https://x.com/kochiuyu/status/2040035988567888116",
        recap: WEEK1_RECAP,
        coreConcepts: [
          "Interactive Decision-Making",
          "Players, Strategies, Payoffs",
          "Simultaneous vs. Sequential Moves",
          "Best Responses & Dominant Strategies",
          "The Prisoner's Dilemma & Price Wars",
          "Nash Equilibrium & Strategic Stability",
          "Cooperation, Self-Restraint & Repeated Interaction (OPEC)",
          "Strategic Commitment vs. Unpredictability"
        ],
        businessCases: [
          "Price Competition & Price Wars",
          "Food-Delivery Coupon Warfare",
          "Corporate Advertising Arms Race",
          "Airline Baggage Fees & Unbundling",
          "Free Shipping & Promotional Policies",
          "Strategic Investment in AI Hardware",
          "OPEC Oil Quota Discipline & Monitoring"
        ],
        slidePath: "./slides/week01.pdf",
        pageCount: 46,
        executiveSummary: [
          "Interdependence Dictates Outcomes: In an oligopoly, your optimal pricing and marketing decisions cannot be made in isolation. Your competitive payoff depends fundamentally on the anticipated reactions of your strategic rivals.",
          "Identify and Prune Dominated Options: An executive should systematically detect strictly dominated moves (actions that yield inferior returns regardless of rival decisions) to eliminate strategic noise and narrow executive attention.",
          "Overcome the Prisoner's Dilemma Structurally: Unilateral price cuts trigger defensive matching, destroying industry margins. Value preservation demands structural redesign: brand differentiation, loyalty lock-ins, or credible long-term cooperation."
        ],
        caseAnalysis: {
          title: "Coca-Cola vs. Pepsi: The Multi-Billion Dollar Advertising Dilemma",
          subtitle: "Duopoly Market Share Warfare & Joint Profit Destruction",
          scenario: "Imagine both Coca-Cola and Pepsi are deciding their annual advertising budgets in a mature beverage market with fixed consumer demand ($10B total gross margin). If both choose a 'Normal Budget' ($1B spend each), they split the market evenly and net $4B profit each. If one firm unilaterally doubles spend to 'Aggressive Ad Blitz' ($2.5B spend) while the other remains at Normal, the aggressive firm captures 70% share (netting $4.5B profit) and the quiet firm gets crushed to 30% share ($2B profit). If both run 'Aggressive Ad Blitz', market shares remain 50-50, but each burns $2.5B in ads, leaving each with only $2.5B profit.",
          matrix: {
            player1: "Coca-Cola",
            player2: "Pepsi",
            actions: ["Normal Ad Spend ($1B)", "Aggressive Blitz ($2.5B)"],
            payoffs: [
              [["$4.0B", "$4.0B"], ["$2.0B", "$4.5B"]],
              [["$4.5B", "$2.0B"], ["$2.5B", "$2.5B"]]
            ]
          },
          prompt: "As the Chief Strategy Officer, explain why both beverage giants inevitably spend billions on ads despite mutual recognition that both would be wealthier with a restrained ad budget. What mechanism can credibly de-escalate this race?",
          solution: {
            equilibrium: "Nash Equilibrium in Strictly Dominant Strategies: [Aggressive Blitz, Aggressive Blitz]",
            breakdown: "Regardless of whether Pepsi chooses Normal or Aggressive spend, Coca-Cola's strictly dominant move is Aggressive ($4.5B > $4.0B if Pepsi is Normal; $2.5B > $2.0B if Pepsi is Aggressive). Symmetric logic applies to Pepsi. Individual rationality forces both into the lower right quadrant ($2.5B, $2.5B), destroying $3.0B in cumulative industry surplus compared to the cooperative outcome ($4.0B, $4.0B).",
            managerialTakeaway: "To escape this trap, leading brands pivot from raw advertising share of voice to non-price competition: proprietary distribution exclusivity (fountain dispenser contracts at restaurant chains), high-barrier SKU innovations (RTD coffee, electrolyte water), and tacit territorial specialization."
          }
        }
      },
      {
        id: 2,
        title: "Games with Sequential Moves & Backward Induction",
        chineseTitle: "序貫博弈與向後歸納法",
        status: "active",
        duration: "3 Hours • Extensive Form Lab",
        preReadingUrl: "https://x.com/kochiuyu/status/2040208298969047342",
        recap: WEEK2_RECAP,
        coreConcepts: [
          "Extensive Form (Game Trees & Decision Nodes)",
          "Actions vs. Strategies (Complete Contingency Plan)",
          "Backward Induction (3-Step Algorithm)",
          "Market Entry: Accommodate vs. Fight Price Wars",
          "Credible Threats vs. Non-Credible Cheap Talk",
          "First-Mover vs. Second-Mover Advantages",
          "Technology Launch Timing: Pioneer vs. Wait & Learn",
          "Platform Entry Modes & Regulatory Responses"
        ],
        businessCases: [
          "Market Entry: Entrant vs. Incumbent Deterrence",
          "Excess Capacity Preemption as Credible Commitment",
          "Tech Product Launch Timing (Pioneer vs. Follower)",
          "Platform Entry vs. Regulatory Approval Game",
          "Netflix vs. Blockbuster (Sequential Disruption Timing)"
        ],
        slidePath: "./slides/week02.pdf",
        pageCount: 52,
        executiveSummary: [
          "Look Forward, Reason Backward: Successful strategy demands anticipating terminal responses before making an opening move. Map the endgame first; then calculate which path leads rivals to select choices aligned with your objectives.",
          "Credibility Requires Irreversibility: An empty threat ('We will start an all-out price war if you enter') is discounted by rational rivals when fighting is suboptimal post-entry. Deterrence only functions if you pre-commit sunk capital or burn bridges.",
          "Evaluate Timing Advantages Carefully: First-movers capture advantages only when scale economies, patents, or switching costs create defensive barriers. In fast-evolving tech shifts, fast-followers often exploit the pioneer's costly mistakes."
        ],
        caseAnalysis: {
          title: "Netflix vs. Blockbuster: The Backward Induction of Digital Distribution",
          subtitle: "Analyzing Strategic Inertia & Sunk Asset Attachment",
          scenario: "In the early 2000s, Netflix launched unlimited DVD mail subscriptions with no late fees. Blockbuster generated over $800M annually (nearly 16% of total revenue) from retail late fees. Netflix moved first by introducing a subscription model. Blockbuster faced a sequential choice at its decision node: (1) Ignore/Dismiss Netflix as a niche mailing service, (2) Launch a competing online subscription and eliminate in-store late fees (Blockbuster Total Access), cannibalizing its own high-margin core profit engine.",
          treeDescription: "Node 1 (Netflix): [Launch Mail Subscription]. Node 2 (Blockbuster): [Cannibalize Core & Eliminate Late Fees] vs. [Preserve In-Store Cash Flow]. Terminal Payoffs: If Blockbuster cannibalizes early: Blockbuster survives with $500M valuation, Netflix captured at $100M buyout. If Blockbuster delays and defends cash flow: Netflix scales network effects, Blockbuster enters Chapter 11 bankruptcy ($0M), Netflix dominates ($100B+ market cap).",
          prompt: "Apply backward induction: Why did Blockbuster's rational short-term incentive to defend immediate EBITDA lead to its long-term strategic collapse? How did Netflix anticipate Blockbuster's dilemma?",
          solution: {
            equilibrium: "Subgame-Perfect Dynamic: Delayed Response Due to Incumbent Sunk-Cost Asymmetry",
            breakdown: "Reed Hastings anticipated that Blockbuster's executive compensation and franchise store owners would treat retail store infrastructure as an un-abandonable asset. By pricing subscriptions below the replacement cost of retail distribution and abolishing late fees, Netflix chose a vector that Blockbuster could not counter without destroying its immediate quarterly earnings.",
            managerialTakeaway: "When entering against a dominant incumbent, design your business model so that the incumbent's optimal game-tree response requires them to destroy their most lucrative cash cow. Their internal governance and investor pressures will almost always induce strategic delay."
          }
        }
      },
      {
        id: 3,
        title: "Games with Simultaneous Moves & Nash Equilibrium",
        chineseTitle: "同時博弈與納什均衡分析",
        status: "active",
        duration: "3 Hours • Quantitative Workshop & Case Lab",
        preReadingUrl: "https://x.com/kochiuyu/status/2040209356831199262",
        recap: WEEK3_RECAP,
        coreConcepts: [
          "Simultaneous Decision-Making",
          "Normal Form (Payoff Matrix) Representation",
          "Best Response Functions",
          "Strict Dominance & IESDS Pruning",
          "Nash Equilibrium & Strategic Stability",
          "4 Classic 2x2 Archetypes (Dilemma, Coordination, Chicken, Matching Pennies)",
          "Cournot (Quantity) vs. Bertrand (Price) Competition",
          "The Bertrand Paradox & Escaping Price Traps"
        ],
        businessCases: [
          "Airbus vs. Boeing (Wide-Body Capacity Preemption)",
          "Sony PlayStation vs. Microsoft Xbox Launch Pricing",
          "OPEC+ Crude Oil Production Quotas & Cartel Cheating",
          "EV Supercharging Standards: NACS vs. CCS Coordination War",
          "Semiconductor Fab Node Allocations (TSMC vs. Samsung)"
        ],
        slidePath: "./slides/week03.pdf",
        pageCount: 24,
        executiveSummary: [
          "Formulate Conjectures Before Action: In simultaneous competition, you cannot wait to see what rivals do. Model their best responses mathematically rather than assuming they will make convenient errors.",
          "Prune Dominated Moves Systematically: Execute Iterated Elimination of Strictly Dominated Strategies (IESDS) to collapse complex multi-variable options into dominance-solvable solutions.",
          "Compete on Capacity Rather than Homogeneous Price: In oligopolistic markets, competing in quantities (Cournot) preserves operating margins; competing purely in prices (Bertrand) triggers a race to marginal cost."
        ],
        caseAnalysis: {
          title: "Airbus vs. Boeing: Wide-Body Capacity Allocation & Duopoly Preemption",
          subtitle: "Cournot Competition & Capacity Commitment in Global Aviation",
          scenario: "Airbus and Boeing are setting their annual wide-body production schedules (A350 vs. B787). The global commercial airline market can absorb 120 aircraft annually at premium lease yields ($8.0B profit each if both maintain Moderate Capacity). If one manufacturer unilaterally expands to High Capacity (80 aircraft) while the other stays Moderate (60 aircraft), the aggressive builder captures 65% market share ($10.0B profit) while the conservative builder suffers excess inventory ($2.0B profit). If both expand to High Capacity (160 total aircraft), oversupply depresses aircraft market prices, slashing profits to $4.0B each.",
          matrix: {
            player1: "Airbus",
            player2: "Boeing",
            actions: ["Moderate Capacity (60 Units)", "High Capacity (80 Units)"],
            payoffs: [
              [["$8.0B", "$8.0B"], ["$2.0B", "$10.0B"]],
              [["$10.0B", "$2.0B"], ["$4.0B", "$4.0B"]]
            ]
          },
          cellLabels: [
            ["Joint Welfare Max", "Boeing Preempts"],
            ["Airbus Preempts", "★ Nash Equilibrium"]
          ],
          cellDescriptions: [
            [
              "[Moderate, Moderate] — Joint Surplus Maximum ($8.0B, $8.0B): Both manufacturers exercise output discipline at 60 units each, sustaining high market lease yields. Total industry profit is maximized at $16.0B. However, this is NOT a Nash equilibrium: either manufacturer has an individual temptation to expand to 80 units to capture $10.0B.",
              "[Moderate, High] — Asymmetric Expansion ($2.0B, $10.0B): Boeing preempts the delivery slots by expanding to 80 units, generating $10.0B while leaving Airbus under-scaled at $2.0B. Airbus's immediate rational best response is to expand to High Capacity as well, moving the game to ($4.0B, $4.0B)."
            ],
            [
              "[High, Moderate] — Asymmetric Expansion ($10.0B, $2.0B): Airbus scales assembly lines to 80 units ($10.0B) while Boeing remains passive at 60 units ($2.0B). Boeing's rational best response is to retaliate with High Capacity, shifting the outcome to ($4.0B, $4.0B).",
              "[High, High] — Nash Equilibrium in Strictly Dominant Strategies ($4.0B, $4.0B): High Capacity is a strictly dominant strategy for both Airbus and Boeing ($10B > $8B; $4B > $2B). The commercial market becomes saturated with 160 aircraft, cutting profit in half and destroying $8.0B in cumulative industry surplus."
            ]
          ],
          prompt: "As Senior Vice President of Strategic Planning at Airbus, explain why High Capacity is your strictly dominant strategy, and what contractual or signaling mechanisms could credibly prevent mutual overcapacity in global aerospace.",
          solution: {
            equilibrium: "Nash Equilibrium in Strictly Dominant Strategies: [High Capacity, High Capacity] ($4.0B, $4.0B)",
            breakdown: "Regardless of whether Boeing selects Moderate or High capacity, Airbus earns strictly higher profit with High ($10.0B > $8.0B if Boeing is Moderate; $4.0B > $2.0B if Boeing is High). High Capacity is strictly dominant for both firms. Individual rationality forces the duopoly into [High, High], destroying $8.0B in joint industry surplus compared to the collusive outcome ($8.0B, $8.0B).",
            managerialTakeaway: "To escape destructive capacity flooding, leading aerospace duopolists utilize long-term customer purchase commitments with severe cancellation penalties, transparent multi-year order backlogs, and multi-sourced component bottlenecks (e.g. CFM International and Rolls-Royce jet engines) that act as natural capacity governors."
          }
        }
      },
      {
        id: 4,
        title: "Mixed Strategies & Randomization in Strategy",
        chineseTitle: "混合策略與隨機化決策",
        status: "active",
        duration: "3 Hours • Algorithmic Strategy Seminar",
        preReadingUrl: "https://x.com/kochiuyu/status/2040211996885532677",
        recap: WEEK4_RECAP,
        coreConcepts: [
          "Indifference Principle in Mixed Strategies",
          "Dynamic Algorithmic Pricing & Flash Sales",
          "Zero Pure-Strategy Equilibrium Games",
          "Auditing Games & Corporate Compliance",
          "Unpredictability as an Offensive Moat",
          "Empirical Sports Econometrics (Penalty Kicks & Tennis)",
          "Security Inspection & Cyber-Defense Resource Allocation"
        ],
        businessCases: [
          "Amazon Dynamic Algorithmic Repricing",
          "Target vs. Walmart Surprise Weekend Promotions",
          "IRS Audit Selection & Financial Fraud Detection",
          "Airline Revenue Management & Seat Class Randomization",
          "Airport Security Patrol Randomization (Stackelberg Games)"
        ],
        slidePath: "./slides/week04.pdf",
        pageCount: 26,
        executiveSummary: [
          "Unpredictability as an Offensive Moat: When deterministic behaviour is unstable or exploitable (Rock-Paper-Scissors), strategic stability demands deliberate randomisation.",
          "The Indifference Principle Engine: Your equilibrium probability p* is calculated by equalising the OTHER player's payoffs, not your own.",
          "Defend the Larger Opportunity: In asymmetric games, the defender concentrates defensive resources on the highest-stake opportunity (Monday), leading the attacker to strike the secondary flank (Wednesday) more often."
        ],
        caseAnalysis: {
          title: "Coffee Chain Promotion Timing: Monday vs. Wednesday",
          subtitle: "Official Lecture Case (Slides 5–13) • Mixed Strategies & Indifference",
          scenario: "A prominent coffee chain chooses whether to launch its primary weekly discount promotion on Monday or Wednesday. Its main rival simultaneously chooses which day to deploy and staff a counter-promotional defensive campaign. Monday offers greater baseline foot-traffic demand than Wednesday. A prepared defense limits the promotion's effectiveness (yielding 3 each on Mon-Mon; 3 for chain and 2 for rival on Wed-Wed). However, preparing defensive campaigns is costly and fixed: if the rival prepares on the wrong day, it wastes resources, giving the chain a wide-open market (6, 0 on Mon-Wed; 5, 1 on Wed-Mon). Because every predictable choice can be counter-exploited, pure-strategy best responses cycle indefinitely.",
          matrix: {
            player1: "Coffee Chain",
            player2: "Rival Chain",
            actions: ["Promote Monday", "Promote Wednesday"],
            payoffs: [
              [["3", "3"], ["6", "0"]],
              [["5", "1"], ["3", "2"]]
            ]
          },
          cellLabels: [
            ["Mon Defense Active", "Chain Captures Mon Peak"],
            ["Rival Defends Wrong Day", "Wed Defense Active"]
          ],
          cellDescriptions: [
            [
              "[Promote Mon, Prepare Mon] — High Demand Defense Active (3, 3): Monday has peak baseline traffic. Both firms expend resources, resulting in balanced gains (3, 3). The chain wishes to switch to Wednesday to evade defense; the rival wishes to maintain Monday.",
              "[Promote Mon, Prepare Wed] — Chain Captures Monday Peak (6, 0): The coffee chain captures the full Monday demand peak completely undefended, generating payoff 6 while the rival earns 0 from wasted preparation."
            ],
            [
              "[Promote Wed, Prepare Mon] — Rival Defends Wrong Day (5, 1): The chain promotes on Wednesday when the rival is positioned on Monday. The chain earns 5 while the rival gets 1 from salvage customer traffic.",
              "[Promote Wed, Prepare Wed] — Wednesday Defense Active (3, 2): The rival anticipates Wednesday promotion, capping chain payoff at 3 and rival payoff at 2."
            ]
          ],
          prompt: "As Head of Strategic Marketing for the Coffee Chain, calculate your equilibrium promotion mix p* and the rival's defensive preparation mix q*. Explain why you promote more often on Wednesday despite Monday having larger customer traffic.",
          solution: {
            equilibrium: "Mixed Strategy Nash Equilibrium: Coffee Chain promotes Mon with p* = 0.25, Wed with 0.75. Rival prepares Mon with q* = 0.60, Wed with 0.40. Expected Payoffs: E[Chain] = 4.2, E[Rival] = 1.5.",
            breakdown: "Step 1 (Find Chain's mix p by equalising Rival's payoffs): E[Rival(Prepare Mon)] = 3p + 1(1-p) = 1 + 2p; E[Rival(Prepare Wed)] = 0p + 2(1-p) = 2 - 2p. Setting equal: 1 + 2p = 2 - 2p => 4p = 1 => p* = 0.25 (Promote Mon 25%, Wed 75%). Step 2 (Find Rival's mix q by equalising Chain's payoffs): E[Chain(Promote Mon)] = 3q + 6(1-q) = 6 - 3q; E[Chain(Promote Wed)] = 5q + 3(1-q) = 3 + 2q. Setting equal: 6 - 3q = 3 + 2q => 5q = 3 => q* = 0.60 (Prepare Mon 60%, Wed 40%). Step 3 (Expected Payoffs): E[Chain] = 6 - 3(0.60) = 4.2; E[Rival] = 1 + 2(0.25) = 1.5.",
            managerialTakeaway: "Strategic Counter-Intuition (Slide 13): Monday offers the larger market opportunity, so the rival defends Monday more heavily (q* = 0.60). Anticipating this heavier defensive wall, the rational coffee chain actually promotes more frequently on Wednesday (75% vs. 25%) to harvest unguarded demand."
          }
        }
      },
      {
        id: 5,
        title: "Commitment & Strategic Moves: Credibility & Irreversibility",
        chineseTitle: "戰略承諾、沉沒成本與未來激勵重塑",
        status: "active",
        duration: "3 Hours • Credibility & Irreversibility Seminar",
        preReadingUrl: "https://x.com/kochiuyu/status/2040215057498620112",
        recap: WEEK5_RECAP,
        coreConcepts: [
          "Strategic Commitment vs. Cheap Talk",
          "Testing Credibility at Future Decision Nodes",
          "Sequential Entry Game & Backward Induction",
          "Four Commitment Devices (Capacity, Contracts, Public Stances, Burning Bridges)",
          "Sunk Costs vs. Changes in Continuation Incentives",
          "Commitment vs. Flexibility Trade-off",
          "Costly Signalling vs. Strategic Commitment"
        ],
        businessCases: [
          "TSMC Leading-Edge Fab Expansion (Preemptive CapEx)",
          "AI Infrastructure: Dedicated Hardware vs. Cloud Contracts vs. On-Demand",
          "Platform Exclusivity & Content Licensing Lock-in",
          "Airline Fleet Financing Take-or-Pay Guarantees",
          "Walmart Rural Saturation & Distribution Center Preemption"
        ],
        slidePath: "./slides/week05.pdf",
        pageCount: 28,
        executiveSummary: [
          "Commitment changes the game; cheap talk describes the game you wish existed: An unbacked threat has zero deterrent power when reversing or accommodating is privately optimal.",
          "Test Credibility at the Future Decision Node: A strategic move is only credible if the threatened action is subgame-perfect and self-enforcing after the rival acts.",
          "Sunk Costs Do Not Equal Commitment: A past cost K subtracted from both outcomes drops out of the margin. An action is a commitment device only if it changes continuation marginal costs, capacity, or penalties."
        ],
        caseAnalysis: {
          title: "Entry Deterrence & Credible Capacity Commitment",
          subtitle: "Official Lecture Case (Slides 3, 11–13, 22–26) • Sequential Move & Backward Induction",
          scenario: "A prospective Entrant decides whether to Enter or Stay Out of a profitable market dominated by an established Incumbent. If the entrant stays out, the incumbent retains monopoly profit (5, 0). If the entrant enters, the incumbent chooses whether to Fight (damaging price war) or Accommodate (duopoly). In the baseline game without commitment, Fighting yields (-1, -1) and Accommodating yields (2, 2) to each; since 2 > -1, accommodating is subgame-perfect, so the entrant enters. However, the incumbent can invest upfront K = 1 in dedicated capacity or take-or-pay supplier contracts. This shifts the continuation game such that Fighting becomes optimal (yielding 0 > -1), credibly deterring the entrant and yielding a net monopoly profit of 5 - 1 = 4.",
          matrix: {
            player1: "Prospective Entrant",
            player2: "Incumbent Monopolist",
            actions: ["Enter Market", "Stay Out"],
            payoffs: [
              [["-1", "0"], ["2", "-1"]],
              [["0", "4"], ["0", "4"]]
            ]
          },
          cellLabels: [
            ["Credible War (Post-Commitment)", "Accommodate (Post-Commitment)"],
            ["Entry Deterred (Monopoly Net of K=1)", "Entry Deterred (Monopoly Net of K=1)"]
          ],
          cellDescriptions: [
            [
              "[Enter, Fight] — Post-Commitment Price War (-1, 0): With dedicated capacity, incumbent marginal costs are low, making fighting optimal (0 > -1). The entrant incurs severe entry losses (-1).",
              "[Enter, Accommodate] — Accommodate Under Commitment (2, -1): Accommodation under expanded capacity yields lower net return (-1) than fighting (0)."
            ],
            [
              "[Stay Out, High Capacity] — Entry Deterred (0, 4): Foreseeing certain price war upon entry, the entrant stays out (0 > -1). The incumbent secures monopoly profit minus commitment cost: 5 - 1 = 4.",
              "[Stay Out, Baseline] — Entry Deterred (0, 4): Baseline deterrent state yielding 4 to incumbent and 0 to entrant."
            ]
          ],
          prompt: "Analyze the entry deterrence game with and without strategic commitment. Show why the threat to fight is non-credible in the baseline game, and demonstrate how paying K = 1 upfront for dedicated capacity changes backward induction to deter entry and increase net incumbent profit from 2 to 4.",
          solution: {
            equilibrium: "Baseline Subgame Perfect Equilibrium: Entrant Enters, Incumbent Accommodates (2, 2). With Commitment (K = 1): Incumbent commits upfront -> Entrant Stays Out -> Incumbent earns 5 - 1 = 4.",
            breakdown: "1. Baseline Game (Without Commitment): If entry occurs, Incumbent compares Accommodate (2) vs Fight (-1). Because 2 > -1, the incumbent accommodates. Entrant looks ahead, anticipates accommodation, and enters (2 > 0). Incumbent threat to fight is empty cheap talk. 2. Post-Commitment Subgame (With K = 1): Dedicated capacity lowers marginal production cost, making Fight yield net 0 (1 - 1) and Accommodate yield net -1 (0 - 1). Faced with entry, Incumbent now strictly prefers Fight (0 > -1). Fighting is now credible! Foreseeing this, Entrant chooses Stay Out (0 > -1). 3. Optimal Commitment Decision: Incumbent compares payoff with commitment (5 - 1 = 4) against baseline accommodated duopoly (2). Since 4 > 2, investing in the strategic commitment device is strictly optimal.",
            managerialTakeaway: "Strategic Moves Axiom (Slide 5 & 26): A strategic commitment is an observable earlier action that changes future incentives or feasible choices, altering how rivals respond. By deliberately constraining its own options and making aggressive defense rational in the future, the firm forces the competitor into a retreat that preserves a high-margin monopoly position."
          }
        }
      },
      {
        id: 6,
        title: "Repeated Games: Cooperation, Punishment & Value of the Future",
        chineseTitle: "重複博弈：合作、懲罰與未來的價值",
        status: "active",
        duration: "3 Hours • Dynamic Strategy Workshop & Case Lab",
        preReadingUrl: "https://x.com/kochiuyu/status/2040215365813498301",
        recap: WEEK6_RECAP,
        coreConcepts: [
          "Stage Game vs. Repeated Game",
          "Backward Induction Unraveling in Known Horizons",
          "Three Horizons: Finite, Indefinite, Infinite",
          "Grim Trigger vs. Tit for Tat Strategies",
          "The Discount Factor δ (Patience & Continuation Prob)",
          "Geometric Series Derivation: V_C = R / (1 - δ)",
          "Critical Cooperation Threshold: δ >= (T - R) / (T - P) = 1/3",
          "Asymmetric Relationships & Dual Thresholds",
          "Monitoring Noise, Imperfect Signals & Forgiveness"
        ],
        businessCases: [
          "Duopoly Pricing Game (Maintain vs. Discount)",
          "Long-Term Buyer–Supplier Relationship (Quality & Payment)",
          "Global Container Shipping Alliances (2M & Ocean Alliance)",
          "Convenience Store Density Treaties (7-Eleven Japan)"
        ],
        slidePath: "./slides/week06.pdf",
        pageCount: 30,
        executiveSummary: [
          "Future interaction changes what is rational today: The shadow of the future disciplines short-term opportunism when interactions are repeated without a known terminal date.",
          "Backward induction unravels finite horizons: In any finitely repeated Prisoner's Dilemma with a known final round, the incentive to defect in round T ripples backward to round 1.",
          "The Grim Trigger threshold δ* = (T - R)/(T - P): Cooperation is sustainable if and only if patience δ exceeds the ratio of immediate temptation gain to total future punishment loss. In the benchmark pricing game, δ >= 1/3."
        ],
        caseAnalysis: {
          title: "Tacit Collusion & Grim Trigger in Duopoly Pricing & Shipping Alliances",
          subtitle: "Executive Dynamic Game Analysis • Folk Theorem & Tacit Cooperation",
          scenario: "Two competing firms in a duopoly face the choice between maintaining price margins (4, 4) and secretly discounting (5, 1). If both discount, a price war breaks out, driving payoffs to (2, 2). The firms interact repeatedly with discount factor delta. The firms consider a Grim Trigger punishment strategy to preserve margin cooperation.",
          matrix: {
            player1: "Your Firm",
            player2: "Rival Firm",
            actions: ["Maintain Price", "Secret Discount"],
            payoffs: [
              [["4", "4"], ["1", "5"]],
              [["5", "1"], ["2", "2"]]
            ]
          },
          cellLabels: [
            ["Cooperative High-Margin (4, 4)", "Sucker Payoff (1, 5)"],
            ["Temptation to Discount (5, 1)", "Price War Trap (2, 2)"]
          ],
          cellDescriptions: [
            [
              "[Maintain, Maintain] — Mutual Cooperation (4, 4): Both protect margin and share customer demand equally.",
              "[Maintain, Discount] — Rival Cheats (1, 5): The rival steals market share via secret discounts; maintainer loses demand."
            ],
            [
              "[Discount, Maintain] — You Cheat (5, 1): You capture unilateral windfall customers, earning temptation payoff 5.",
              "[Discount, Discount] — Punished Equilibrium (2, 2): Both firms fight a margin-destroying price war."
            ]
          ],
          prompt: "Using geometric-series continuation values, calculate the present value of cooperating forever (V_C) versus deviating once under Grim Trigger (V_D). Solve for the minimum discount factor delta* required to sustain mutual cooperation.",
          solution: {
            equilibrium: "Cooperation is self-enforcing under Grim Trigger if and only if delta >= (T - R) / (T - P) = (5 - 4) / (5 - 2) = 1/3 ≈ 0.333.",
            breakdown: "1. Value of Cooperating Forever: V_C = 4 + 4*delta + 4*delta^2 + ... = 4 / (1 - delta). 2. Value of Deviating Once: V_D = 5 + 2*delta + 2*delta^2 + ... = 5 + 2*delta / (1 - delta). 3. No-Deviation Condition: 4 / (1 - delta) >= 5 + 2*delta / (1 - delta) <=> 4 >= 5 - 3*delta <=> 3*delta >= 1 <=> delta >= 1/3. 4. Economic Interpretation: As long as firms discount future earnings by less than 66.7% per period, the ongoing surplus loss (4 - 2 = 2 per period forever) heavily outweighs the one-period temptation gain (5 - 4 = 1).",
            managerialTakeaway: "Repeated Games Axiom: Cooperation does not require altruism or legal cartels. It requires patience (delta >= delta*), high visibility of competitor actions, and a credible retaliatory trigger that disciplines the present with the shadow of the future."
          }
        }
      },
      {
        id: 7,
        title: "Week 7: Auctions I — Bidding, Information, and Auction Rules",
        chineseTitle: "拍賣與競價策略（上）：四種基本拍賣機制與競價策略",
        status: "active",
        duration: "3 Hours • Mechanism Design & Bidding Lab",
        preReadingUrl: "https://x.com/kochiuyu/status/2040217851693609308",
        recap: WEEK7_RECAP,
        coreConcepts: [
          "First-Price Sealed-Bid (FPSB) Strategic Shading",
          "Vickrey Second-Price (SPSB) Weak Dominance",
          "English Ascending vs. Dutch Descending Formats",
          "Private Values vs. Common Values & Winner's Curse",
          "Revenue Equivalence Theorem & Benchmark Assumptions",
          "Platform Proxy Bidding & Digital Ad Opportunities",
          "Reverse Auctions & Two-Dimensional Procurement Scoring"
        ],
        businessCases: [
          "Commercial Operating License Allocation (HK$100,000 Dilemma)",
          "Platform Proxy Bidding Mechanics (eBay Automatic Bidding)",
          "Digital Search Advertising Clicks & Quality Scores (Google Ads)",
          "Radio Spectrum Combinatorial Packaging (Complements & Substitutes)",
          "Corporate Sourcing & Two-Dimensional Reverse Procurement"
        ],
        slidePath: "./slides/week07.pdf",
        pageCount: 31,
        executiveSummary: [
          "Auctions are formal allocation-and-payment mechanisms: when sellers do not know buyers' private willingness to pay, auction rules dictate how aggressively buyers bid.",
          "Second-Price Truthful Revelation: in a Vickrey second-price auction, bidding your exact valuation (b = v) is a weakly dominant strategy regardless of rival behavior.",
          "First-Price Bid Shading: bidding full value guarantees zero profit; risk-neutral bidders with uniform values shade bids to b*(v) = [(n-1)/n] · v to maximize expected surplus.",
          "Revenue Equivalence Benchmark: under risk neutrality, symmetry, independent private values, and efficient allocation, all four canonical formats yield identical expected seller revenue.",
          "The Winner's Curse: in common-value assets, winning implies your estimate was the most optimistic error among all bidders; rational bidding requires downward shading for adverse selection."
        ],
        caseAnalysis: {
          title: "The Commercial License Allocation: Rule A (First-Price) vs. Rule B (Second-Price)",
          subtitle: "Strategic Bid Shading vs. Truthful Revelation in Government Concessions",
          scenario: "A municipal transport authority allocates one exclusive commercial operating license. Your firm values the license at HK$100,000 based on projected operational cash flows. A competing rival values the license based on their own proprietary fleet costs. Valuations are private and independently distributed over [HK$0, HK$100,000]. The authority considers two mechanism rules: Rule A (First-Price Sealed Bid, where the highest bid wins and pays their own bid) and Rule B (Second-Price Sealed Bid, where the highest bid wins and pays the highest losing bid).",
          prompt: "Analyze the optimal bidding strategy under Rule A versus Rule B. Explain why bidding HK$100,000 under Rule A is a strategic mistake, while bidding HK$100,000 under Rule B is weakly dominant.",
          solution: {
            equilibrium: "Rule A (First-Price): Optimal bid is b*(v) = [(2-1)/2] · HK$100,000 = HK$50,000. Rule B (Second-Price): Optimal bid is b*(v) = HK$100,000 (weakly dominant).",
            breakdown: "1. Under Rule A: If you bid HK$100,000 and win, your profit is exactly HK$100,000 - HK$100,000 = HK$0. By shading your bid to HK$50,000, you balance a 50% probability of winning against a 50% profit margin, earning expected surplus of (HK$100k - HK$50k) · 0.50 = HK$25,000. 2. Under Rule B: Your submitted bid determines only whether you win, but NOT what you pay. If the rival bids r < HK$100k, bidding HK$100k wins and pays r, capturing positive surplus HK$100k - r. Bidding less than HK$100k does not lower your payment, but risks losing the license when the rival bids between your underbid and HK$100k! Overbidding above HK$100k risks winning when r > HK$100k, creating a catastrophic loss (HK$100k - r < 0).",
            managerialTakeaway: "Mechanism Design Axiom: In second-price auctions, never shade your bid—bid your exact valuation. In first-price auctions, never bid your full valuation—shade strategically based on the intensity of rival competition and your corporate risk tolerance."
          }
        }
      },
      {
        id: 8,
        title: "Auctions & Mechanism Design (Part 2)",
        chineseTitle: "拍賣與機制設計（下）：贏家詛咒與數位廣告競價",
        status: "upcoming",
        duration: "3 Hours • High-Tech Mechanism Design",
        preReadingUrl: "https://x.com/kochiuyu/status/2040235773405126877",
        coreConcepts: [
          "The Winner's Curse in Common-Value Settings",
          "Bid-Rigging Cartels & Collusion Detection",
          "FCC Spectrum Combinatorial Auctions",
          "Generalized Second Price (GSP) in Search Ads",
          "VCG (Vickrey-Clarke-Groves) Multi-Unit Allocations"
        ],
        businessCases: [
          "Google Ads Quality-Score Weighted GSP Auctions",
          "FCC C-Band 5G Wireless Spectrum Multi-Billion Sales",
          "Offshore Deepwater Oil Drilling Block Bidding",
          "Programmatic Ad Exchanges (RTB Real-Time Bidding)"
        ],
        slidePath: "./slides/week08.pdf",
        pageCount: 56,
                caseAnalysis: {
          title: "Digital Search Keyword Advertising: Generalized Second Price (GSP)",
          subtitle: "Position Auctions, Click-Through Rates & Bid Saliency",
          scenario: "Three advertisers bid for two top search ad positions. Position 1 generates 200 clicks/hour; Position 2 generates 120 clicks/hour. Advertiser A values clicks at 0, Advertiser B at , and Advertiser C at . Under GSP, the winner of Slot 1 pays the per-click bid of Slot 2, and the winner of Slot 2 pays the bid of Slot 3.",
          prompt: "Explain why truthful bidding (b_i = v_i) is NOT always a dominant strategy in Generalized Second Price (GSP) multi-slot auctions, unlike single-item Vickrey auctions.",
          solution: {
            equilibrium: "Truthful bidding is not dominant in GSP because an advertiser can intentionally shade their bid to fall into Slot 2 at a substantially lower per-click clearing price, yielding higher net surplus.",
            breakdown: "If Advertiser A bids 0, B bids , C bids : A wins Slot 1, pays /click, earning (10 - 8)*200 = 00. If A shades bid to , B wins Slot 1 (pays ), A wins Slot 2 and pays C's bid (/click), earning (10 - 4)*120 = 20! Since 720 > 400, truthful bidding is not dominant.",
            managerialTakeaway: "In multi-unit position auctions, bidding your value can leave money on the table; equilibrium bidding requires factoring in position decay and competitor bid spreads."
          }
        },
        upcomingNote: "Includes live algorithmic auction analysis of Google Ads Generalized Second Price auctions."
      },
      {
        id: 9,
        title: "Bargaining & Negotiation Tactics",
        chineseTitle: "博弈論談判術與價值分配（BATNA）",
        status: "upcoming",
        duration: "3 Hours • Executive Negotiation Simulation",
        preReadingUrl: "https://x.com/kochiuyu/status/2040239801547579872",
        coreConcepts: [
          "Nash Bargaining Solution & Surplus Division",
          "Rubinstein Alternating Offers & Impatience Rates",
          "BATNA (Best Alternative) Power Asymmetries",
          "The Hold-Up Problem & Specific Asset Investments",
          "Structuring Earnouts and Contingent Payments in M&A"
        ],
        businessCases: [
          "Disney Acquisition of 21st Century Fox ($71B Bidding War)",
          "Hollywood Writers Guild (WGA) vs. Studio Alliance",
          "Apple vs. Qualcomm Global Patent Royalty Litigation",
          "OpenAI Licensing Agreements with Major Global Publishers"
        ],
        slidePath: "./slides/week09.pdf",
        pageCount: 45,
                caseAnalysis: {
          title: "Cross-Border Tech M&A: Rubinstein Bargaining & Outside Options (BATNA)",
          subtitle: "Splitting Transaction Synergies Under Time Impatience",
          scenario: "A global enterprise software company negotiates to acquire a specialized AI infrastructure startup. The standalone startup is worth 00M. In the acquirer's ecosystem, the startup generates 00M, creating a 00M synergy surplus. The startup has a credible secondary outside offer from a private equity firm worth 50M (0M of surplus).",
          prompt: "Under the Outside Option Principle in alternating-offer bargaining, what is the equilibrium acquisition price?",
          solution: {
            equilibrium: "Acquisition Price = 00M (Startup captures 00M baseline + 00M equal surplus share, because 100 > outside option 50).",
            breakdown: "The Outside Option Principle states that an outside option only affects the bargain if it binds. The unconstrained 50-50 Nash bargaining split yields 00M surplus each (total price 00M). Since 00M surplus > 0M PE outside surplus, the outside option does not constrain the equilibrium.",
            managerialTakeaway: "Outside options (BATNA) act as a floor constraint, not an automatic bonus added to the bargaining split. Only outside options exceeding the natural focal bargain alter the transaction price."
          }
        },
        upcomingNote: "Student pairs will run live M&A negotiation roles with assigned confidential pay-offs."
      },
      {
        id: 10,
        title: "Asymmetric Information & Costly Signaling",
        chineseTitle: "資訊不對稱、逆向選擇與信號傳遞",
        status: "upcoming",
        duration: "3 Hours • Capital Markets & Trust Theory",
        preReadingUrl: "https://x.com/kochiuyu/status/2040243779912057131",
        coreConcepts: [
          "Adverse Selection & Akerlof's Market for Lemons",
          "Spence's Costly Signaling Equilibrium",
          "Screening Mechanisms & Menu Offerings",
          "Warranties, Brand Guarantees, and Performance Bonds",
          "Venture Capital Staged Financing & SAFE Notes"
        ],
        businessCases: [
          "Carvana & Beepi 150-Point Certified Inspection Guarantees",
          "Moody's & S&P Corporate Credit Rating Signals",
          "Series A/B Staged Tranches in High-Tech Startups",
          "Pharmaceutical Pre-Clinical Trial Disclosure Signaling"
        ],
        slidePath: "./slides/week10.pdf",
        pageCount: 40,
                caseAnalysis: {
          title: "Quality Guarantees & Costly Signaling in Enterprise Cloud Migrations",
          subtitle: "Spence Signaling & Separating Equilibria Under Asymmetric Reliability",
          scenario: "An enterprise cloud hosting market contains High-Reliability providers (H) with 99.999% uptime and Low-Reliability providers (L) with 99.9% uptime. Clients cannot directly inspect server architecture and are willing to pay 0M for High and M for Low. A provider can offer a contractual Service Level Agreement (SLA) with financial penalty bond D for any outage. Due to differing failure frequencies, providing a penalty bond of size D costs the Low provider sh.5*D but costs the High provider only sh.1*D.",
          prompt: "Determine the minimum SLA penalty bond D* that establishes a separating equilibrium where High-Reliability providers credibly signal quality and earn 0M.",
          solution: {
            equilibrium: "Separating SLA Penalty Bond D* = 2M.",
            breakdown: "For Low providers not to mimic High: Profit(Mimic) <= Profit(Low) => 0M - 0.5*D <= M => 0.5*D >= M => D >= 2M. For High providers, cost of D = 2M is 0.1*12 = .2M, leaving net profit 0M - .2M = .8M > M.",
            managerialTakeaway: "To be credible, a signal must be differential in cost: it must be prohibitively expensive for a low-quality mimic to replicate, while profitable for the genuine high-quality player."
          }
        },
        upcomingNote: "Case analysis focuses on how high-quality firms separate themselves from low-quality imitators."
      },
      {
        id: 11,
        title: "Platform Competition & Coopetition",
        chineseTitle: "雙邊平台競爭與競合策略",
        status: "upcoming",
        duration: "3 Hours • Digital Ecosystems Seminar",
        preReadingUrl: "https://x.com/kochiuyu/status/2040246062154457395",
        coreConcepts: [
          "Two-Sided Networks & Cross-Side Feedback Loops",
          "The Chicken-and-Egg Launch Problem & Subsidization",
          "Multi-Homing vs. Single-Homing Switching Costs",
          "Exclusive Dealing Contracts & Ecosystem Enclosure",
          "Coopetition: Value Net Framework (Brandenburger & Nalebuff)"
        ],
        businessCases: [
          "Apple App Store vs. Epic Games (30% Commission Battle)",
          "Sony PlayStation vs. Microsoft Xbox (Exclusive Studio Buys)",
          "Visa vs. Mastercard vs. Apple Pay (Interchange Fee Dynamics)",
          "Uber vs. DoorDash vs. Instacart (Driver Multi-Homing)"
        ],
        slidePath: "./slides/week11.pdf",
        pageCount: 54,
                caseAnalysis: {
          title: "Two-Sided Platform Subsidies: Ride-Hailing Driver Lock-In",
          subtitle: "Cross-Side Network Externalities & Chicken-and-Egg Launch Dynamics",
          scenario: "Two competing urban mobility platforms (CityRide and UrbanGo) enter a new metropolitan market. Passengers value platform density (number of active drivers), while drivers value fare requests (number of active passengers). If drivers multi-home (use both apps), price competition drives platform margins to zero. If CityRide pays exclusive weekly driver retention bonuses of 00/driver, it tips the market into single-homing.",
          prompt: "Analyze the strategic condition under which subsidizing the driver side of the two-sided market creates a sustainable competitive moat on the passenger side.",
          solution: {
            equilibrium: "Platform subsidizes drivers whenever cross-side network externality on passengers exceeds driver acquisition cost.",
            breakdown: "In two-sided platforms, the side with higher price elasticity or stronger cross-side positive externality is subsidized, while the locked-in side is monetized. Exclusive driver supply starves rival platform of passenger responsiveness, tipping riders to CityRide.",
            managerialTakeaway: "Identify which platform side produces the strongest cross-side network feedback loop; subsidize that side aggressively to create high switching costs and winner-take-most market leadership."
          }
        },
        upcomingNote: "Explores antitrust regulatory actions and platform monetization boundaries."
      },
      {
        id: 12,
        title: "Strategic Synthesis & Executive Decision Frameworks",
        chineseTitle: "高階決策框架與綜合商業實戰演練",
        status: "upcoming",
        duration: "3 Hours • Capstone Boardroom Simulation",
        preReadingUrl: "https://x.com/kochiuyu/status/2040251736380846094",
        coreConcepts: [
          "Integrative Multi-Stage War Gaming",
          "Dynamic Competitive Response Roadmaps",
          "Ecosystem Lock-In & Defensive Moat Fortification",
          "Decision Matrices Under Knightian Uncertainty",
          "Synthesizing Game Theory into Corporate Board Governance"
        ],
        businessCases: [
          "Cloud Computing Hyperscalers: AWS vs. Azure vs. Google Cloud",
          "Generative AI Race: Microsoft/OpenAI vs. Google vs. Anthropic",
          "Autonomous Mobility Fleets: Waymo vs. Tesla CyberCab",
          "Semiconductor Geopolitical Shoring: TSMC, Intel, Samsung"
        ],
        slidePath: "./slides/week12.pdf",
        pageCount: 60,
                caseAnalysis: {
          title: "Hyperscaler AI Ecosystem War: Strategic Synthesis & Multi-Market Preemption",
          subtitle: "Executive Decision Synthesis Across Simultaneous & Sequential Dimensions",
          scenario: "Three tech hyperscalers (CloudCorp, ApexCompute, and DataNet) compete simultaneously across custom AI silicon fabrication, proprietary model licensing, and enterprise cloud distribution. Committing multi-billion capital into proprietary silicon lowers long-term LLM inference marginal costs, but risks obsolescence if standardized open-source chips emerge.",
          prompt: "Synthesize the 5 strategic game forms (Extensive Tree, Normal Matrix, Repeated Folk Theorem, Signaling, Platform Coopetition) into an executive investment roadmap.",
          solution: {
            equilibrium: "Hybrid Strategy: Early irreversible silicon commitment paired with open platform APIs for third-party developers.",
            breakdown: "1. Sequential move: Lock in fab capacity (first-mover advantage). 2. Simultaneous pricing: Price platform subscriptions at marginal cost to deter entrant hyperscalers. 3. Repeated interaction: Maintain tacit capacity discipline in core enterprise cloud regions.",
            managerialTakeaway: "True business strategy is rarely a single static game matrix. High-level executives must sequence multiple interdependent games across time, balancing commitment with strategic agility."
          }
        },
        upcomingNote: "Final capstone case presentations and executive strategy portfolios."
      },
      {
        id: 13,
        title: "Final Strategy Assessment & Capstone Synthesis",
        chineseTitle: "期末綜合評估、實戰沙盤推演與決策總結",
        status: "upcoming",
        duration: "3 Hours • Boardroom Strategy Capstone",
        preReadingUrl: "https://x.com/kochiuyu/status/2040255996518703307",
        coreConcepts: [
          "Holistic Game-Theoretic Framework Synthesis",
          "Executive Boardroom Case Defense",
          "Multi-Competitor War Gaming Simulations",
          "Strategic Risk Assessment Under Uncertainty",
          "Translating Analytical Models into Market Leadership"
        ],
        businessCases: [
          "Comprehensive Duopoly Market Entry & Defense",
          "Global Tech Supply Chain Negotiation & Sunk Costs",
          "Platform Ecosystem Governance & Regulatory Strategy",
          "Capstone Executive Board Presentation"
        ],
        slidePath: "./slides/week13.pdf",
        pageCount: 50,
                caseAnalysis: {
          title: "Capstone Boardroom Simulation: Multi-Stage Strategy Defense",
          subtitle: "Final Capstone Synthesis & Executive Strategic Audit",
          scenario: "An executive strategy committee presents its multi-year competitive roadmap to the Board of Directors. The firm faces an aggressive low-cost foreign entrant, shifting enterprise customer demands, and potential platform antitrust scrutiny.",
          prompt: "Synthesize backward induction, credible commitment devices, signaling mechanisms, and repeated interaction into an executive defense against market commoditization.",
          solution: {
            equilibrium: "Comprehensive Boardroom Equilibrium Defense Portfolio.",
            breakdown: "1. Backward Induction: Audit all contractual and capacity commitments. 2. Strategic Signaling: Establish verified quality warranties that low-cost rivals cannot copy. 3. Dynamic Repeated Interaction: Use transparent pricing indices to deter predatory price wars.",
            managerialTakeaway: "Mastery of strategic thinking transforms tactical reactivity into proactive market architecture. Always evaluate your actions through the eyes of rational rivals and the equilibria they create."
          }
        },
        upcomingNote: "Final capstone examination and comprehensive executive strategy synthesis. Review all weekly pre-readings on X before the session."
      }
    ];

    // --- Interactive Strategy Quizzes (Weeks 1 & 2) ---
    const QUIZ_QUESTIONS = [
      {
        id: "q1",
        weekId: 1,
        weekTag: "Week 1: Interdependence",
        title: "Duopoly Fare Wars: Strategic Dominance in Aviation",
        scenario: "SkyAir and AeroBlue are the only two airlines operating the lucrative non-stop Chicago to London corridor. Demand is highly price-sensitive. If both maintain Premium Fares ($1,200), each nets $50M profit. If SkyAir cuts to Discount Fare ($650) while AeroBlue stays at Premium, SkyAir captures all price-sensitive travelers, generating $70M while AeroBlue collapses to $10M. If AeroBlue discounts while SkyAir stays premium, AeroBlue gets $70M and SkyAir gets $10M. If both discount, both make only $25M due to price erosion.",
        question: "From an executive decision perspective, what is AeroBlue's strictly dominant strategy, and what is the resulting market equilibrium if both CEOs act with uncoordinated self-interest?",
        options: [
          "AeroBlue should maintain Premium Fares regardless of SkyAir's choice; the equilibrium is ($50M, $50M).",
          "AeroBlue has no dominant strategy and its move must be randomized with equal probability.",
          "AeroBlue's dominant strategy is to Discount; both airlines discount, arriving at the Nash equilibrium ($25M, $25M).",
          "AeroBlue should match whatever SkyAir chose in the previous quarter to maintain mutual peace."
        ],
        correctIndex: 2,
        rationale: "Discounting is strictly dominant for AeroBlue: if SkyAir stays Premium, discounting yields $70M vs $50M (+20M). If SkyAir discounts, discounting yields $25M vs $10M (+15M). Since the same holds for SkyAir, both discount, landing in the Pareto-suboptimal Nash Equilibrium ($25M, $25M) — the classic Prisoner's Dilemma."
      },
      {
        id: "q2",
        weekId: 1,
        weekTag: "Week 1: Strategic Interdependence",
        title: "Enterprise Cloud R&D Arms Race",
        scenario: "Two enterprise software giants are debating whether to allocate an extra $500M into proprietary Generative AI integrations. Industry revenue is fixed. If neither invests, both preserve current operating margins (Payoff: 8, 8). If Company A invests and Company B does not, Company A wins high-value enterprise migration deals (Payoff: 11, 2). If both invest, their competitive edge cancels out and both suffer lower net margins after amortizing R&D (Payoff: 5, 5).",
        question: "Why is the joint profit-maximizing outcome (Neither Invests) unstable in real-world market competition?",
        options: [
          "Because antitrust regulators require every firm to spend equal amounts on technology innovation.",
          "Because each firm faces a dominant incentive to preempt: if your competitor stays put, you capture enormous market share; if they invest, failing to invest is catastrophic.",
          "Because cloud software firms are legally bound by shareholder agreements to spend all free cash flow on AI.",
          "Because customers refuse to purchase software from companies that do not announce quarterly R&D increases."
        ],
        correctIndex: 1,
        rationale: "Unilateral defection pays: 11 > 8 when rival doesn't invest, and 5 > 2 when rival does. 'Neither Invests' cannot sustain itself without a binding enforcement mechanism because the risk of being left behind (payoff 2) combined with the temptation of preemption (payoff 11) drives both to invest (payoff 5)."
      },
      {
        id: "q3",
        weekId: 2,
        weekTag: "Week 2: Sequential Moves",
        title: "Regional Market Entry & The Empty Deterrence Threat",
        scenario: "Challenger Coffee is deciding whether to Enter (E) or Stay Out (S) of a lucrative downtown metro district dominated by Incumbent Roasters. If Challenger stays out, Incumbent earns $10M monopoly profit and Challenger earns $0M. If Challenger enters, Incumbent can either Accommodate (A) by sharing the market, yielding ($4M for Challenger, $5M for Incumbent), or trigger an aggressive Price War / Fight (F), burning cash with heavy discounting, yielding (-$2M for Challenger, -$1M for Incumbent). Prior to entry, Incumbent holds a press conference threatening: 'We will fight to the death if anyone enters.'",
        question: "Using backward induction, what is the subgame-perfect equilibrium outcome?",
        options: [
          "Challenger stays out because Incumbent's threat of an all-out fight guarantees a -$2M loss.",
          "Challenger enters, and Incumbent accommodates; Challenger earns $4M and Incumbent earns $5M.",
          "Challenger enters, and Incumbent initiates the price war to build a tough reputation for future cities.",
          "Challenger proposes a 50-50 joint venture because game trees cannot resolve sequential conflicts."
        ],
        correctIndex: 1,
        rationale: "Reason backward: At the terminal subgame after Challenger enters, Incumbent compares $5M (Accommodate) vs -$1M (Fight). Rational Incumbent strictly prefers Accommodate. Knowing this terminal choice, Challenger compares $4M (Enter) vs $0M (Stay Out). Challenger confidently Enters. The Incumbent's threat is non-credible 'cheap talk'."
      },
      {
        id: "q4",
        weekId: 2,
        weekTag: "Week 2: First-Mover Preemption",
        title: "EV Supercharging Network Standardization",
        scenario: "Pioneer Motors moves first and commits $2B to build a nationwide DC fast-charging standard (North American Standard A). Follower Auto then observes Pioneer's finished network. Follower Auto can either (1) Adopt Pioneer's standard (paying a modest licensing fee) or (2) Spend $2.5B constructing a rival proprietary standard B. If Follower adopts, total EV market adoption doubles due to consumer confidence; Pioneer earns $80M royalties and Follower avoids redundant capex, netting $60M. If Follower builds a rival network, standard fragmentation slows EV adoption and both suffer high capital drag ($20M, $10M).",
        question: "Why did Pioneer Motors' massive irreversible commitment create a strategic first-mover advantage?",
        options: [
          "Because spending capital first is always rewarded by consumers regardless of ecosystem compatibility.",
          "Because the irreversible sunk investment presented Follower with a fait accompli, making adoption Follower's unique profit-maximizing best response.",
          "Because Pioneer signed an exclusive contract that made it illegal for any follower to build electric vehicle chargers.",
          "Because Pioneer can renegotiate the licensing fee at will after the follower adopts."
        ],
        correctIndex: 1,
        rationale: "By sinking irreversible capital into a nationwide infrastructure, Pioneer created a decisive strategic commitment. Follower Auto, applying backward induction, evaluates terminal payoffs ($60M vs $10M) and finds adoption vastly superior to fighting a multi-billion dollar standard war."
      },
      {
        id: "q5",
        weekId: 1,
        weekTag: "Week 1: Strategic Interdependence",
        title: "Food-Delivery Coupon Warfare & Capital Depletion",
        scenario: "FastBites and QuickFeast are the two dominant food-delivery platforms in a metropolitan hub. Offering 30% discount coupons attracts marginal diners. If both abstain, each earns $20M net. If FastBites issues coupons while QuickFeast abstains, FastBites captures 65% market share ($28M) while QuickFeast collapses to $8M. If QuickFeast discounts while FastBites abstains, QuickFeast gets $28M and FastBites gets $8M. If both issue aggressive discount coupons, their market shares remain 50-50, but each absorbs heavy promotional burn, netting only $12M.",
        question: "Why do both delivery platforms persistently burn investor capital on discount coupons despite knowing both would earn $20M with mutual price restraint?",
        options: [
          "Because municipal commercial laws legally compel restaurant apps to offer discounts to consumers.",
          "Because issuing coupons is each firm's strictly dominant strategy: whether the competitor issues coupons or not, discounting yields a higher individual payoff, trapping both in a Prisoner's Dilemma.",
          "Because coupon discount costs are fully reimbursed by the credit card payment processing networks.",
          "Because food-delivery customers are strictly brand-monopolized and never switch services based on price."
        ],
        correctIndex: 1,
        rationale: "Classic Prisoner's Dilemma: If QuickFeast doesn't discount, FastBites earns $28M by discounting vs $20M by abstaining. If QuickFeast discounts, FastBites earns $12M by discounting vs $8M by abstaining. Discounting is strictly dominant for both, producing an individually rational outcome that destroys $16M in collective industry profit."
      },
      {
        id: "q6",
        weekId: 2,
        weekTag: "Week 2: Actions vs. Strategies & Timing",
        title: "Actions vs. Strategies & Technology Launch Timing",
        scenario: "RoboLogistics is evaluating the launch timing for its autonomous delivery drone. The executive team debates whether to launch immediately in Q1 or wait until Q4 after observing a rival startup's commercial trials.",
        question: "According to the formal game theory framework, which statement correctly distinguishes between an 'action' and a 'strategy', and identifies the second-mover advantage of waiting?",
        options: [
          "An 'action' is a decision at a single node, while a 'strategy' is a complete contingent plan for every possible decision point; waiting provides informational advantages by letting the rival pay pioneering costs while RoboLogistics observes market bugs and adoption.",
          "An 'action' only applies to board games, whereas a 'strategy' only applies to Fortune 500 public corporations.",
          "Moving first is always mathematically superior because game theory proves pioneer market share can never be eroded.",
          "A strategy is a single pricing move, while an action is the entire 5-year corporate vision statement."
        ],
        correctIndex: 0,
        rationale: "In game theory, an action is a specific choice at one decision point, whereas a strategy is a complete contingent plan for every node where a player might act. Furthermore, waiting (second-mover) is advantageous when demand uncertainty and technological bugs are high, allowing the follower to learn from the pioneer's costly mistakes."
      },
      {
        id: "q7",
        weekId: 3,
        weekTag: "Week 3: Simultaneous Moves & Best Response",
        title: "Commercial Aircraft Capacity Preemption (Airbus vs. Boeing)",
        scenario: "Airbus and Boeing are setting wide-body production schedules simultaneously without observing the other's assembly rate. If both maintain Moderate Capacity (60 aircraft), each earns $8.0B profit. If one expands to High Capacity (80 aircraft) while the other stays Moderate, the aggressive builder captures $10.0B while the conservative builder suffers excess inventory ($2.0B). If both expand to High Capacity, market oversupply slashes profits to $4.0B each.",
        question: "What is the strategic nature of the High Capacity action for Airbus, and what market equilibrium will emerge if both firms maximize independent shareholder returns?",
        options: [
          "High Capacity is Airbus's strictly dominated strategy; the equilibrium is [Moderate, Moderate] ($8.0B, $8.0B).",
          "High Capacity is Airbus's strictly dominant strategy; both firms choose High Capacity, reaching the unique Nash Equilibrium [High, High] ($4.0B, $4.0B).",
          "There is no pure strategy Nash equilibrium because capacity games require continuous price randomization.",
          "Airbus will select Moderate Capacity because duopolists always cooperate tacitly in simultaneous moves."
        ],
        correctIndex: 1,
        rationale: "For Airbus: If Boeing is Moderate, High yields $10B vs $8B. If Boeing is High, High yields $4B vs $2B. High Capacity is strictly dominant regardless of Boeing's choice. By symmetry, the same holds for Boeing. Both select High Capacity, landing at the Nash equilibrium [High, High] ($4.0B, $4.0B) — demonstrating how individual rationality can cut duopoly profits in half."
      },
      {
        id: "q8",
        weekId: 3,
        weekTag: "Week 3: IESDS & Dominance Solvability",
        title: "Iterated Elimination of Strictly Dominated Strategies (IESDS)",
        scenario: "An executive strategy committee is evaluating a multi-product entry matrix against an aggressive regional rival. Before calculating complex mixed probabilities, the Chief Strategy Officer proposes using Iterated Elimination of Strictly Dominated Strategies (IESDS) to simplify the game tree.",
        question: "Which of the following represents a mathematically guaranteed property of the IESDS algorithm?",
        options: [
          "IESDS can inadvertently eliminate true Nash Equilibria if the wrong player's dominated moves are deleted first.",
          "IESDS only works on zero-sum games and is inapplicable to corporate business strategy.",
          "IESDS never eliminates any Nash Equilibrium; furthermore, if IESDS reduces the game to a single profile, that outcome is the unique, predictable Nash Equilibrium.",
          "IESDS requires both firms to legally sign an agreement disclosing their internal cost functions prior to analysis."
        ],
        correctIndex: 2,
        rationale: "A foundational theorem of game theory states that strictly dominated strategies cannot be part of any Nash Equilibrium (pure or mixed). Therefore, iterated elimination never removes any true equilibrium. When a game is dominance solvable, the surviving profile is the unique, stable Nash equilibrium."
      },
      {
        id: "q9",
        weekId: 3,
        weekTag: "Week 3: Cournot vs. Bertrand Competition",
        title: "The Bertrand Paradox in Price Competition",
        scenario: "Two tech platforms sell identical cloud storage subscriptions with constant marginal cost MC = $10/user/year. They choose prices simultaneously in an unconstrained market where price-sensitive customers switch entirely to whichever platform is even one cent cheaper.",
        question: "What does the Bertrand duopoly model predict regarding equilibrium price and profit, and how do successful executives escape this trap?",
        options: [
          "Both firms price at monopoly levels ($100/user) and split the market 50-50 without antitrust scrutiny.",
          "Prices collapse to marginal cost (P = $10), yielding zero economic profit; executives escape via differentiation, capacity limits, and switching costs.",
          "Both firms alternate pricing high and low each quarter in a guaranteed cyclic cooperative equilibrium.",
          "Price settles halfway between marginal cost and monopoly price because duopolies always share surplus evenly."
        ],
        correctIndex: 1,
        rationale: "The classic Bertrand Paradox proves that with homogeneous goods and simultaneous price competition, the unilateral incentive to undercut forces equilibrium price down to marginal cost (P* = MC = $10), wiping out all economic profit despite having only two competitors. High-performing executives escape the trap through product differentiation, capacity constraints, customer switching costs, and brand equity."
      },
      {
        id: "q10",
        weekId: 4,
        weekTag: "Week 4: Mixed Strategies & The Indifference Principle",
        title: "The Mathematical Engine of Mixed Strategy Nash Equilibrium",
        scenario: "Two competing e-commerce platforms must choose whether to launch unexpected flash sales on the weekend. Because any predictable discounting schedule is countered by competitors, both platforms randomize their promotions using mixed strategies (p* and q*).",
        question: "According to the Indifference Principle of mixed strategy Nash equilibria, what fundamental condition determines the probability p* chosen by Player 1?",
        options: [
          "Player 1 chooses p* to maximize Player 1's expected payoff directly without regard to Player 2.",
          "Player 1 chooses p* such that Player 2 is strictly indifferent between Player 2's available pure strategies.",
          "Player 1 chooses p* so that both players earn identical profits in all 4 matrix cells.",
          "Player 1 always sets p* = 0.50 regardless of the underlying payoff numbers."
        ],
        correctIndex: 1,
        rationale: "The foundational insight of mixed strategy Nash equilibria is the Indifference Principle: Player 1 randomizes with probability p* not to optimize their own payoff directly, but to calibrate the opponent's expected payoffs so that Player 2 has no unilateral incentive to favor one pure action over another. If Player 2 preferred one action, they would play it 100% of the time, destroying the equilibrium."
      },
      {
        id: "q11",
        weekId: 4,
        weekTag: "Week 4: Business Randomization & Varian's Model",
        title: "Retail Price Promotions and The Deterrence Paradox in Auditing",
        scenario: "A retail chain currently schedules 30% off discounts every first weekend of the month. The Chief Commercial Officer proposes switching to algorithmic randomized flash sales based on Varian's Model of Sales.",
        question: "Why does predictable promotional scheduling destroy operating margins, and how does randomized dynamic pricing solve this problem?",
        options: [
          "Predictable discounts cause informed shoppers to defer purchases and allow rivals to undercut 2 days early; randomized promotions price-discriminate effectively by capturing informed searchers while preserving full margins from brand-loyal convenience shoppers.",
          "Predictable discounts are illegal under federal antitrust law; randomized discounts are required by the SEC.",
          "Predictable discounts attract too many customers, which causes stores to exceed maximum fire code occupancy.",
          "Randomized pricing guarantees that all customers pay the exact average cost of production."
        ],
        correctIndex: 0,
        rationale: "Under Varian's Model of Sales, predictable discount calendars train informed consumers to never buy at full price and invite competitor preemption. Unpredictable randomized promotional timing forces convenience-seeking uninformed consumers to pay full price while still capturing price-sensitive deal hunters who invest time to monitor flash markdowns."
      },
      {
        id: "q12",
        weekId: 5,
        weekTag: "Week 5: Strategic Moves & Commitment",
        title: "Entry Deterrence & Sunk Capital Commitment (K = 1)",
        scenario: "An incumbent monopolist faces a prospective entrant. Without commitment, if entry occurs, accommodating yields duopoly profits (2, 2) while fighting a price war yields (-1, -1) to each. Since 2 > -1, the incumbent's threat to fight is non-credible, and the entrant enters. The incumbent can pay K = 1 upfront in dedicated capacity or take-or-pay supplier contracts before entry occurs, lowering marginal costs so fighting yields (0, 0 net of K=1) and accommodating yields (-1, 2). Monopoly profit with deterrence is 5 - 1 = 4.",
        question: "Why does sinking irreversible capital K = 1 successfully deter entry, and how does it change the backward induction solution?",
        options: [
          "It forces the entrant to pay double the capital cost to enter.",
          "It alters the incumbent's own future incentives: in the post-commitment subgame, fighting yields 0 which is strictly greater than accommodating (-1), making fighting credible and forcing the entrant to stay out.",
          "It creates an illegal monopoly trust that automatically shuts down competitor bank accounts.",
          "It guarantees that the market will permanently operate as a Cournot quantity competition."
        ],
        correctIndex: 1,
        rationale: "Strategic moves work by constraining one's own future options: by spending K = 1 upfront on dedicated capacity, fighting becomes the incumbent's rational best response (0 > -1). The entrant foresees credible fighting and chooses Stay Out (0 > -1), allowing the incumbent to earn net monopoly profit 5 - 1 = 4, superior to accommodating (2)."
      },
      {
        id: "q13",
        weekId: 5,
        weekTag: "Week 5: Strategic Moves & Contracting",
        title: "Most-Favored-Customer (MFC) Price Matching Clauses",
        scenario: "Two electronics retailers compete in consumer appliances. Retailer A publicly promises all consumers: 'If we ever lower our price or any competitor offers a lower price, we will refund the difference to all past buyers.'",
        question: "How does a public Most-Favored-Customer clause act as a strategic commitment device rather than just consumer friendliness?",
        options: [
          "It increases the cost of unilateral price discounting so severely that Retailer A credibly ties its own hands against initiating price cuts, softening competition across the market.",
          "It is designed solely to increase sales tax deductions at the end of the fiscal year.",
          "It legally forces the rival retailer to close down stores in the same geographic radius.",
          "It guarantees that consumer demand becomes completely price-inelastic."
        ],
        correctIndex: 0,
        rationale: "An MFC clause acts as a strategic commitment: cutting price on marginal units requires refunding all existing customers. This makes price cuts unprofitable, credibly signaling to rivals that Retailer A will not initiate price wars, which fosters tacit industry price elevation."
      },
      {
        id: "q14",
        weekId: 6,
        weekTag: "Week 6: Repeated Games & Horizon",
        title: "The Backward Induction Paradox in Finitely Repeated Games",
        scenario: "Two commercial suppliers enter a joint consortium with a legally binding, publicly known termination date in exactly 10 quarters (T = 10). Each quarter, they face a Prisoner's Dilemma between cooperative quality maintenance ($4M, $4M) and opportunistic cost-cutting ($5M, $1M). Mutual defection yields ($2M, $2M).",
        question: "According to backward induction in repeated games with a known terminal period, what equilibrium will emerge throughout the 10 quarters?",
        options: [
          "Both suppliers will cooperate peacefully until Quarter 9, and only defect in Quarter 10.",
          "Both suppliers will cooperate for all 10 quarters because long-term goodwill prevents defection.",
          "Cooperation unravels completely: both suppliers defect starting in Quarter 1 and in every single subsequent period.",
          "Suppliers will alternate cheating every other quarter in an exact Tit-for-Tat pattern."
        ],
        correctIndex: 2,
        rationale: "The Known Final Period Unraveling Principle: In round 10, there is no future tomorrow to punish cheating, so defection is strictly dominant for both. Anticipating certain defection in period 10, maintaining cooperation in period 9 cannot protect period 10, so defection becomes dominant in period 9. Backward induction cascades all the way to Round 1! Sustainable tacit cooperation requires an indefinite or infinite horizon without a known terminal date."
      },
      {
        id: "q15",
        weekId: 6,
        weekTag: "Week 6: Grim Trigger & Valuation",
        title: "Critical Discount Factor in Duopoly Pricing (δ ≥ 1/3)",
        scenario: "Consider a repeated pricing game between two duopolists interacting over an indefinite horizon with discount factor δ. Cooperating (Maintain Price) yields profit R = 4 each round. Cheating (Discount Price) yields temptation profit T = 5 in the current round, after which the rival triggers Grim Trigger retaliation, collapsing payoffs to P = 2 forever.",
        question: "What is the exact minimum discount factor δ* required to sustain high-margin cooperation under Grim Trigger, and what is its economic interpretation?",
        options: [
          "δ ≥ 0.75; firms must be almost completely patient because price wars are extremely mild.",
          "δ ≥ 1/3 ≈ 0.333; cooperation is sustainable whenever firms discount future cash flows by less than 66.7% per period, because the ongoing loss of 2 per period forever outweighs the one-period gain of 1.",
          "δ ≥ 0.50; cooperation requires exactly equal weight placed on today and tomorrow.",
          "δ ≥ 0.10; cooperation is virtually guaranteed in any market structure."
        ],
        correctIndex: 1,
        rationale: "Solving the no-deviation condition: V_C ≥ V_D <=> 4/(1 - δ) ≥ 5 + 2δ/(1 - δ) <=> 4 ≥ 5(1 - δ) + 2δ <=> 4 ≥ 5 - 3δ <=> 3δ ≥ 1 <=> δ ≥ 1/3 ≈ 0.333. General Grim Trigger formula: δ* = (T - R) / (T - P) = (5 - 4) / (5 - 2) = 1/3. Economically, as long as firms place at least 33.3% weight on next period's cash flow, the ongoing penalty (R - P = 4 - 2 = 2 per period forever) heavily deters the one-time temptation gain (T - R = 5 - 4 = 1)."
      },
      {
        id: "q16",
        weekId: 6,
        weekTag: "Week 6: Tit for Tat & Retaliation",
        title: "Exact Tit-for-Tat Calculation & The Alternating Retaliation Cycle",
        scenario: "Two competing firms operate under Axelrod's exact Tit-for-Tat enforcement strategy in a repeated pricing game with stage payoffs: Reward R = 4, Temptation T = 5, Punishment P = 2, and Sucker payoff S = 1. Suppose Player 1 initiates a unilateral price cut in period 1 against a Tit-for-Tat rival.",
        question: "What payoff stream does Player 1 receive after that unilateral defection, and what is the exact discount threshold for cooperation to be preferred?",
        options: [
          "The payoff stream is 5, 2, 2, 2... and the required threshold is δ ≥ 1/2.",
          "The payoff stream is 5, 1, 5, 1, 5, 1... because play alternates between (Discount, Maintain) and (Maintain, Discount); cooperation is preferred if and only if δ ≥ (T - R)/(R - S) = 1/3.",
          "The rival forgives immediately in round 2, giving payoffs 5, 4, 4, 4... so cooperation is impossible.",
          "Player 1 earns 5 in round 1 and 0 in all subsequent rounds."
        ],
        correctIndex: 1,
        rationale: "Exact Tit-for-Tat makes each firm copy the rival's previous move. A unilateral deviation produces alternating moves: (D, M) -> (M, D) -> (D, M)... yielding payoff stream 5, 1, 5, 1... with continuation value V_D^(TFT) = (5 + δ)/(1 - δ²). Comparing V_C = 4/(1 - δ) against V_D^(TFT) gives 4(1 + δ) ≥ 5 + δ <=> 3δ ≥ 1 <=> δ ≥ 1/3. This matches the general Tit-for-Tat threshold δ* = (T - R)/(R - S) = (5 - 4)/(4 - 1) = 1/3. Notice that without forgiveness, a single deviation locks both players into endless alternating retaliation."
      },
      {
        id: "q17",
        weekId: 6,
        weekTag: "Week 6: Asymmetric Relationships",
        title: "Asymmetric Alliances & The 'Weakest Link' Principle",
        scenario: "In an industrial supply chain partnership, an enterprise buyer (Player 1) and a specialized tier-1 component supplier (Player 2) cooperate repeatedly over time. The buyer's stage payoffs are R1 = 6, T1 = 8, P1 = 3. The supplier's stage payoffs are R2 = 5, T2 = 9, P2 = 1. Both share a common market discount factor δ.",
        question: "What are the individual cooperation thresholds for both firms, and what is the binding condition for mutual cooperation to persist?",
        options: [
          "δ1* = 0.40, δ2* = 0.50; mutual cooperation requires δ ≥ max(0.40, 0.50) = 0.50, with the supplier serving as the 'weakest link' requiring greater patience.",
          "Both firms share the exact same threshold δ* = 0.45 calculated by averaging their payoffs.",
          "Only the OEM's threshold matters because the dominant player sets the contract rules.",
          "Mutual cooperation is impossible whenever payoffs are asymmetric between supply chain partners."
        ],
        correctIndex: 0,
        rationale: "In asymmetric repeated games, each player's no-deviation condition must hold independently: δ1* = (T1 - R1)/(T1 - P1) = (8 - 6)/(8 - 3) = 2/5 = 0.40; δ2* = (T2 - R2)/(T2 - P2) = (9 - 5)/(9 - 1) = 4/8 = 0.50. Because either side can unilaterally cheat, mutual cooperation requires δ ≥ max(δ1*, δ2*) = 0.50. The supplier is the 'weakest link' because their high temptation gain (9 - 5 = 4) and severe vulnerability demand a higher discount factor to restrain opportunism."
      },
      {
        id: "q18",
        weekId: 6,
        weekTag: "Week 6: Discount Factor Decomposition",
        title: "Managerial De-escalation: Decomposing δ = p / (1 + r)",
        scenario: "An executive observes that rising central bank interest rates (r) and supply chain uncertainty (lowering continuation probability p) have driven the discount factor δ = p / (1 + r) below the critical Grim Trigger threshold δ* = 1/3, causing price discounting to spread across distributors.",
        question: "In repeated game theory, which managerial intervention successfully restores cooperation without relying on unlawful collusion or excessively harsh punishments?",
        options: [
          "Increasing the frequency of interaction and monitoring cycles (e.g. weekly audits/billing instead of quarterly), which effectively shortens the period length and drives δ per decision period closer to 1.",
          "Signing an explicit secret price-fixing agreement in violation of antitrust statutes.",
          "Raising marginal production costs so that price cuts become impossible.",
          "Suing all distributors simultaneously in commercial court."
        ],
        correctIndex: 0,
        rationale: "Economic decomposition of the discount factor: Since δ = p / (1 + r) where r and p depend on the time interval between interactions, increasing interaction frequency (e.g., from annual to daily/weekly pricing checks) compresses the interest rate per period toward zero and pushes p per period toward 1, dramatically increasing δ. Increasing interaction frequency and transparency is the most potent legitimate managerial tool to sustain tacit cooperation."
      },
      {
        id: "q19",
        weekId: 6,
        weekTag: "Week 6: Monitoring Noise & Forgiveness",
        title: "Monitoring Noise, Attribution Errors & Grim Trigger Fragility",
        scenario: "In a global shipping alliance, freight rates drop sharply during an unexpected market downturn. Carrier A's booking volume falls by 30%. Carrier A cannot observe whether the drop is caused by an exogenous macroeconomic downturn or secret spot discounting by rival Carrier B.",
        question: "Why does Grim Trigger fail catastrophically in environments with monitoring noise, and what response rule does game theory recommend?",
        options: [
          "Grim Trigger treats every drop in sales as deliberate cheating, triggering irreversible price wars over false alarms; alliances should use threshold punishment with temporary duration (forgiveness) or transparent booking clearinghouses.",
          "Grim Trigger succeeds because false alarms make competitors even more terrified of cheating.",
          "Monitoring noise has zero impact on repeated game equilibria under the Folk Theorem.",
          "Carriers should merge into a single monopoly to eliminate all pricing decisions."
        ],
        correctIndex: 0,
        rationale: "Monitoring Noise and Recovery: In real-world business, observation is noisy (unobservable secret discounts vs macroeconomic demand shocks). Under Grim Trigger, a single false alarm permanently destroys cooperation forever. Sophisticated tacit alliances deploy forgiveness conventions, limited-period retaliations (Green & Porter style), or verified audit clearinghouses to avoid ruinous accidental wars."
      },
      {
        id: "q20",
        weekId: 7,
        weekTag: "Week 7: Auctions I — Vickrey Weak Dominance",
        title: "Second-Price Sealed-Bid (Vickrey) Truthful Bidding Dominance",
        scenario: "A logistics company participates in a second-price sealed-bid auction for an exclusive port operating permit. Internal NPV analysis values the permit at exactly $100,000. The CFO considers submitting a lower bid of $80,000 to 'be cautious', or an aggressive bid of $120,000 to 'ensure winning'.",
        question: "Why does bidding the exact valuation of $100,000 weakly dominate both $80,000 and $120,000 for any possible highest rival bid r?",
        options: [
          "Bidding $100,000 never increases the payment when winning (since the winner pays the second-highest bid r), while underbidding to $80,000 risks losing profitable outcomes when 80,000 < r < 100,000, and overbidding to $120,000 risks winning at a loss when 100,000 < r < 120,000.",
          "Because bidding any amount other than your true valuation is strictly prohibited under Federal Reserve banking regulations.",
          "Because the winner of a second-price auction must pay the exact average of all submitted bids.",
          "Because underbidding guarantees that the second-highest bid will also decrease proportionally."
        ],
        correctIndex: 0,
        rationale: "In a second-price sealed-bid auction, your bid determines whether you win, but NOT what you pay. If the highest rival bid r < $100,000, bidding $100,000 wins and pays r (surplus $100,000 - r > 0); underbidding to $80,000 either pays the exact same r or causes you to lose when 80k < r < 100k! If r > $100,000, bidding $100,000 loses cleanly and pays $0; overbidding to $120,000 risks winning when 100k < r < 120k and paying r > $100,000, yielding negative surplus. Truthful bidding b = v is a weakly dominant strategy."
      },
      {
        id: "q21",
        weekId: 7,
        weekTag: "Week 7: Auctions I — First-Price Strategic Shading",
        title: "First-Price Sealed-Bid Equilibrium Shading with n Symmetric Bidders",
        scenario: "In an infrastructure procurement auction using First-Price Sealed-Bid rules, 4 symmetric, risk-neutral construction firms bid for a municipal concession. Valuations are independently and uniformly distributed between $0 and $200 million. EnerCo's private valuation is $160 million.",
        question: "What is EnerCo's Bayesian Nash Equilibrium bid, and what strategic trade-off does this bid resolve?",
        options: [
          "Bid $120 million; it maximizes expected profit by balancing the probability of winning against the profit margin conditional on winning, following the symmetric equilibrium formula b*(v) = [(n-1)/n] · v = (3/4) · $160M.",
          "Bid $160 million; bidding your exact valuation is always optimal across all auction mechanisms.",
          "Bid $80 million; risk-neutral bidders always shade their bids by 50% regardless of the number of competitors.",
          "Bid $200 million; submitting the maximum possible domain valuation guarantees winning without additional cost."
        ],
        correctIndex: 0,
        rationale: "In a first-price auction, the winner pays their own bid. Bidding the true value of $160M yields zero profit upon winning. Each firm faces a trade-off: shading lower increases margin (v - b) if they win, but reduces win probability P(win) = (b/V_max)^(n-1). For n symmetric risk-neutral bidders with uniform valuations on [0, V_max], the unique Bayesian Nash Equilibrium bidding strategy is b*(v) = [(n-1)/n] · v. For n = 4 and v = $160M: b* = (3/4) · $160M = $120 million."
      },
      {
        id: "q22",
        weekId: 7,
        weekTag: "Week 7: Auctions I — Revenue Equivalence Theorem",
        title: "Revenue Equivalence Benchmark & The Role of Risk Aversion",
        scenario: "A government treasury auctions $10 billion in debt securities. The economic advisory committee debates whether switching from a Second-Price mechanism (English/Vickrey) to a First-Price sealed-bid mechanism (Dutch/FPSB) will increase expected government revenue.",
        question: "Under the Revenue Equivalence Theorem, when do both formats yield the exact same expected revenue, and how does risk aversion change this conclusion?",
        options: [
          "Both formats yield identical expected revenue under risk neutrality, bidder symmetry, independent private values, and efficient allocation; however, if bidders are risk-averse, the First-Price auction yields strictly higher expected seller revenue.",
          "Both formats always yield identical revenue under all market conditions, including common values and risk aversion.",
          "Second-Price auctions always yield 50% more revenue than First-Price auctions because the second-highest bid is higher than shaded bids.",
          "First-Price auctions only yield revenue if there are fewer than three bidders."
        ],
        correctIndex: 0,
        rationale: "The Revenue Equivalence Theorem (Vickrey 1961) establishes that under 4 strict assumptions (risk-neutral bidders, symmetric distribution of valuations, independent private values, and allocation to the highest-valuing bidder), all four canonical auction formats generate identical expected seller revenue. However, if bidders are risk-averse, they fear losing the auction more than paying a slightly higher price, causing them to shade less aggressively. Consequently, risk aversion makes First-Price auctions generate strictly higher expected revenue for the seller than Second-Price auctions."
      },
      {
        id: "q23",
        weekId: 7,
        weekTag: "Week 7: Auctions I — Common Values & Winner's Curse",
        title: "The Winner's Curse in Offshore Resource Extraction",
        scenario: "Five energy conglomerates bid for an offshore deepwater oil drilling block. The actual quantity and market value of oil in the block is identical for all bidders ($500 million), but each firm conducts independent seismic testing, resulting in noisy estimates: s1 = $580M, s2 = $530M, s3 = $490M, s4 = $460M, s5 = $420M.",
        question: "Why does naive bidding based on unconditional estimates lead to the Winner's Curse, and how must a rational bidder adjust?",
        options: [
          "Winning reveals that the winning bidder had the highest and most optimistic estimation error among all competitors; a rational bidder must condition their bid on the hypothesis of winning and shade their bid downward to account for adverse selection.",
          "The winner's curse occurs because oil extraction equipment loses all salvage value after drilling commences.",
          "A rational bidder should always bid double their signal to scare away competitors.",
          "The winner's curse only occurs if competitors form an illegal bid-rigging cartel."
        ],
        correctIndex: 0,
        rationale: "In common-value auctions, the underlying asset has a shared true value, but private signals are noisy. If all bidders submit bids based on their unconditional estimate E[V|s_i], the bidder with the largest positive error (s1 = $580M) wins and pays a price exceeding true value ($500M), suffering immediate financial losses! A rational bidder recognizes that winning is informative: winning implies having received the highest signal among all competitors. Therefore, rational bidding requires conditioning on E[V | s_i = max_j s_j] < s_i and shading downward to avoid the Winner's Curse."
      },
      {
        id: "q24",
        weekId: 7,
        weekTag: "Week 7: Auctions I — Multi-Attribute Procurement",
        title: "Two-Dimensional Sourcing: Price vs. Quality Scoring",
        scenario: "A multinational technology conglomerate procures specialized cloud server infrastructure. The Chief Procurement Officer evaluates supplier bids using an announced evaluation formula: Total Score = 60% · Price Score + 40% · Quality/Reliability Score. A new vendor quotes an exceptionally low price that would score 100 on price, but receives a quality rating of only 55 due to lack of ISO security certifications.",
        question: "Why does modern procurement mechanism design utilize two-dimensional scoring rather than a simple lowest-price reverse auction?",
        options: [
          "Pure lowest-price reverse auctions suffer from adverse selection and contractor default, where suppliers underbid below sustainable cost and later deliver substandard quality or fail to perform; multi-attribute scoring balances cost against delivery capability.",
          "Two-dimensional scoring is designed solely to increase the total duration of the procurement cycle.",
          "Because software servers cannot be purchased using monetary currency.",
          "Because quality scores are mathematically guaranteed to decrease total corporate expenditure by 90%."
        ],
        correctIndex: 0,
        rationale: "In industrial and enterprise procurement, price is not the sole dimension of value. A low bid is valuable only if the contractor can reliably deliver the required technical capability, security standards, and uptime reliability. Pure lowest-price auctions create adverse selection, attracting financially precarious vendors who submit unviable bids and subsequently deliver defective systems or declare bankruptcy. Announced multi-attribute scoring formulas formally balance price savings against execution reliability."
      }
    ];

    // --- Strategic Competencies Checklist ---
    const STRATEGIC_COMPETENCIES = [
      { id: "comp_1", label: "Identify strictly dominant & dominated strategies in 2x2 business matrices", category: "Simultaneous Foundations" },
      { id: "comp_2", label: "Map extensive-form game trees & solve terminal nodes via backward induction", category: "Sequential Logic" },
      { id: "comp_3", label: "Diagnose Prisoner's Dilemma price-war traps and engineer de-escalation mechanisms", category: "Competitive Dynamics" },
      { id: "comp_4", label: "Differentiate non-credible cheap talk from irreversible capital commitments", category: "Credibility & Sunk Costs" },
      { id: "comp_5", label: "Evaluate first-mover preemption vs. fast-follower second-mover timing advantages", category: "Strategic Timing" },
      { id: "comp_6", label: "Distinguish an isolated 'action' from a complete contingent 'strategy'", category: "Extensive Form Fundamentals" },
      { id: "comp_7", label: "Analyze technology capex & coupon warfare via strategic interdependence", category: "Capital Allocation" },
      { id: "comp_8", label: "Assess repeated interaction mechanisms, monitoring, and cartel discipline", category: "Cooperation & Enforcement" },
      { id: "comp_9", label: "Calculate Mixed Strategy Nash Equilibria using the Indifference Principle (p*, q*)", category: "Algorithmic & Mixed Games" },
      { id: "comp_10", label: "Deploy algorithmic dynamic randomization to protect promotional and cybersecurity margins", category: "Managerial Randomization" },
      { id: "comp_11", label: "Structure credible commitments & irreversible capacity devices (K = 1, MFC clauses)", category: "Strategic Commitment (W5)" },
      { id: "comp_12", label: "Derive Grim Trigger discount factor thresholds δ* = (T - R)/(T - P) = 1/3 for duopoly pricing", category: "Repeated Games (W6)" },
      { id: "comp_13", label: "Calculate Tit-for-Tat alternating retaliation cycles and no-deviation conditions", category: "Dynamic Enforcement (W6)" },
      { id: "comp_14", label: "Solve asymmetric partnership thresholds δ ≥ max(δ₁*, δ₂*) and weakest-link risks", category: "Alliances & Asymmetry (W6)" },
      { id: "comp_15", label: "Decompose discount factors δ = p/(1+r) and leverage interaction frequency to stabilize cartels", category: "Executive Levers (W6)" },
      { id: "comp_16", label: "Design forgiveness conventions to prevent permanent price wars under noisy monitoring", category: "Monitoring & Recovery (W6)" },
      { id: "comp_17", label: "Distinguish First-Price, Second-Price, English, and Dutch canonical auction rules", category: "Auction Mechanisms (W7)" },
      { id: "comp_18", label: "Prove the weak dominance of truthful bidding (b = v) in Vickrey second-price auctions", category: "Mechanism Design (W7)" },
      { id: "comp_19", label: "Calculate optimal Bayesian Nash equilibrium bid shading b*(v) = [(n-1)/n] · v in first-price auctions", category: "Strategic Bidding (W7)" },
      { id: "comp_20", label: "Evaluate Revenue Equivalence benchmark conditions and identify when risk aversion breaks equivalence", category: "Revenue Equivalence (W7)" },
      { id: "comp_21", label: "Adjust bidding strategies for adverse selection to mitigate the Winner's Curse in common-value assets", category: "Common Values & Risk (W7)" },
      { id: "comp_22", label: "Structure two-dimensional price-quality scoring formulas in corporate reverse procurement auctions", category: "Enterprise Procurement (W7)" }
    ];

    // --- Curated Reference Tools & Mini-Games ---
    const REFERENCE_TOOLS = [
      {
        id: "gametikz",
        title: "GameTikzStudio: Game Tree, Payoff Matrix & Timeline Generator",
        type: "Interactive Tool & TikZ Export",
        url: "https://kochiuyu.github.io/GameTikzStudio/",
        description: "Official visual authoring studio. Interactively construct extensive-form game trees with information sets, normal-form payoff matrices, and sequential event timelines with instant LaTeX TikZ code generation.",
        badge: "Official Authoring Suite",
        isLab: true
      },
      {
        id: "strategic_sims",
        title: "Strategic Interactive Game Theory Simulations",
        type: "Interactive Tool",
        url: "https://kochiuyu.github.io/",
        description: "Interactive behavioral game theory simulator suite. Test real-time bargaining, beauty contests, and repeated dilemmas.",
        badge: "Curriculum Highlight",
        isLab: true
      },
      {
        id: "pd_video",
        title: "The Prisoner's Dilemma in Oligopolistic Markets",
        type: "Video Case",
        url: "https://www.youtube.com/results?search_query=Prisoner%27s+Dilemma+Business+Strategy+Game+Theory",
        description: "Managerial exploration of how duopolies destroy margin through simultaneous discounting, and structural fixes through brand and warranty design.",
        badge: "Core Video",
        isLab: false
      },
      {
        id: "bertrand_video",
        title: "Price Wars & Bertrand Paradox Escalation",
        type: "Video Case",
        url: "https://www.youtube.com/results?search_query=Bertrand+Paradox+Price+Wars+Game+Theory",
        description: "Why two identical firms competing on price can drive economic profits to zero, and how differentiated features restore pricing power.",
        badge: "Case Video",
        isLab: false
      },
      {
        id: "ultimatum_video",
        title: "Ultimatum Bargaining & Strategic BATNA",
        type: "Video Case",
        url: "https://www.youtube.com/results?search_query=Ultimatum+Game+Negotiation+BATNA+Strategy",
        description: "Executive negotiations: how emotional fairness thresholds, outside options, and delay costs shift surplus distribution in M&A deals.",
        badge: "Executive Seminar",
        isLab: false
      }
    ];

    // ==========================================
    // INTERACTIVE 2x2 MATRIX SIMULATOR COMPONENT
    // ==========================================
    const MATRIX_PRESETS = [
      {
        id: "entry_deterrence",
        name: "Entry Deterrence & Capacity Commitment (Week 5 Slide Case)",
        p1Name: "Potential Entrant",
        p2Name: "Incumbent Monopolist",
        a1Name: "Enter Market",
        a2Name: "Stay Out of Market",
        payoffs: [
          [[-1, 0], [2, -1]],
          [[0, 4], [0, 4]]
        ],
        description: "From Week 5 Slides 11–13: Without commitment, incumbent accommodates entry (2, 2). By investing K=1 in visible capacity, incumbent makes Fighting credible (0 > -1). Entrant chooses Stay Out, securing monopoly profit 5 - 1 = 4 for the incumbent."
      },
      {
        id: "coffee_chain",
        name: "Coffee Chain Promotion (Classic Strategic Case)",
        p1Name: "Coffee Chain",
        p2Name: "Rival Chain",
        a1Name: "Promote Monday",
        a2Name: "Promote Wednesday",
        payoffs: [
          [[3, 3], [6, 0]],
          [[5, 1], [3, 2]]
        ],
        description: "From Slides 5–13: Simultaneous promotion scheduling duel. No pure Nash equilibrium exists. Chain promotes Mon with p* = 0.25 (Wed 75%); Rival defends Mon with q* = 0.60 (Wed 40%). Expected Payoffs: E[Chain] = 4.2, E[Rival] = 1.5."
      },
      {
        id: "flash_sales",
        name: "E-Commerce Flash Sales (Amazon vs. Walmart)",
        p1Name: "Amazon",
        p2Name: "Walmart",
        a1Name: "Flash Discount",
        a2Name: "Maintain Regular Price",
        payoffs: [
          [[3, 3], [7, 1]],
          [[1, 7], [5, 5]]
        ],
        description: "Zero pure equilibria. If Walmart maintains, Amazon discounts; if Amazon discounts, Walmart discounts. At p* = 0.50, q* = 0.50, neither is exploited. E[Payoff] = $4.0B."
      },
      {
        id: "tax_audit",
        name: "Tax Compliance & Corporate Audit",
        p1Name: "Tax Authority",
        p2Name: "Corporation",
        a1Name: "Audit Account",
        a2Name: "No Audit",
        payoffs: [
          [[2, -10], [-1, 0]],
          [[0, -10], [0, 4]]
        ],
        description: "Slide 16 Application: The Auditing Paradox. Severe penalties on tax evasion do not reduce equilibrium corporate evasion; they allow the authority to audit less frequently while maintaining deterrence."
      },
      {
        id: "prisoners_dilemma",
        name: "Prisoner's Dilemma (Price War)",
        p1Name: "Firm A (Coke)",
        p2Name: "Firm B (Pepsi)",
        a1Name: "Maintain Price (Cooperate)",
        a2Name: "Discount Price (Defect)",
        payoffs: [
          [[20, 20], [4, 28]],
          [[28, 4], [10, 10]]
        ],
        description: "Classic competitive trap: Both firms maximize joint profit at (20, 20), but unilateral price cuts create a dominant incentive to defect. Mutual discounting traps both in (10, 10)."
      },
      {
        id: "coordination_stag",
        name: "Coordination Game (Tech Standards)",
        p1Name: "Platform Alpha",
        p2Name: "Platform Beta",
        a1Name: "Open Unified Standard",
        a2Name: "Proprietary Standard",
        payoffs: [
          [[25, 25], [0, 12]],
          [[12, 0], [15, 15]]
        ],
        description: "Multiple equilibria: (Open, Open) delivers highest mutual returns (25, 25), but requires strategic trust. If either suspects defection, they retreat to the inferior equilibrium (15, 15)."
      },
      {
        id: "hawk_dove",
        name: "Chicken / Hawk-Dove (Capacity War)",
        p1Name: "Boeing",
        p2Name: "Airbus",
        a1Name: "Aggressive Expansion",
        a2Name: "Accommodate / Restrain",
        payoffs: [
          [[-20, -20], [30, 8]],
          [[8, 30], [15, 15]]
        ],
        description: "Anti-coordination: If both overbuild mega-capacity, both suffer devastating capital losses (-20, -20). The two pure Nash equilibria require asymmetric capitulation."
      },
      {
        id: "battle_sexes",
        name: "Battle of the Sexes (Hardware vs Software)",
        p1Name: "Hardware OEM",
        p2Name: "Software Devs",
        a1Name: "Cloud-First Architecture",
        a2Name: "Edge-AI Architecture",
        payoffs: [
          [[22, 14], [3, 3]],
          [[1, 1], [14, 22]]
        ],
        description: "Complementarity with conflicting distribution: Both need to build for the same ecosystem, but Hardware favors Cloud-First while Software favors Edge-AI."
      },
      {
        id: "matching_pennies",
        name: "Inspection Game (Audit vs Compliance)",
        p1Name: "Auditor / Regulator",
        p2Name: "Division Manager",
        a1Name: "Strict Audit",
        a2Name: "Random Sampling",
        payoffs: [
          [[12, -8], [-4, 10]],
          [[-8, 8], [4, -4]]
        ],
        description: "Zero/Constant-sum tension: No pure strategy Nash equilibrium exists. Rational players must mix strategies probabilistically to keep the adversary from anticipating moves."
      }
    ];

    
const TIKZ_TEMPLATES = {
        tree: {
          title: "Extensive Form Game Tree",
          description: "Subgame perfect equilibrium in an Incumbent vs. Entrant entry game with terminal payoffs.",
          code: `% \\usepackage{tikz} in preamble
\\begin{tikzpicture}[scale=1.4, font=\\small,
  node/.style={circle, fill=black, inner sep=1.5pt},
  payoff/.style={text=black, font=\\footnotesize}
]
  % Initial Node (Player 1: Entrant)
  \\node[node, label=above:{\\textbf{Entrant}}] (root) at (0, 0) {};

  % Decision Branches
  \\node[node, label=above:{\\textbf{Incumbent}}] (incumbent) at (2.5, 1) {};
  \\node[payoff, label=right:{$(0, 10)$}] (stay_out) at (2.5, -1) {};

  % Terminal Nodes
  \\node[payoff, label=right:{$(2, 3)$}] (accommodate) at (5, 1.8) {};
  \\node[payoff, label=right:{$(-1, -1)$}] (fight) at (5, 0.2) {};

  % Edges with Action Labels
  \\draw[thick, ->] (root) -- (incumbent) node[midway, above left] {Enter};
  \\draw[thick, ->] (root) -- (stay_out) node[midway, below left] {Stay Out};
  
  % Highlighted Subgame Perfect Path
  \\draw[very thick, red, ->] (incumbent) -- (accommodate) node[midway, above left, text=red] {Accommodate*};
  \\draw[thick, dashed, ->] (incumbent) -- (fight) node[midway, below left] {Price War};
\\end{tikzpicture}`
        },
        matrix: {
          title: "2x2 Normal Form Payoff Matrix",
          description: "Oligopoly pricing dilemma formatted as a clean TikZ bimatrix game with best response markings.",
          code: `% \\usepackage{tikz} in preamble
\\begin{tikzpicture}[scale=1.2]
  % Matrix grid & border
  \\draw[thick] (0,0) grid (4,4);
  \\draw[thick] (0,2) -- (4,2);
  \\draw[thick] (2,0) -- (2,4);

  % Player Labels
  \\node[above] at (2, 4.3) {\\textbf{Firm B (Column Player)}};
  \\node[left, rotate=90] at (-0.6, 2) {\\textbf{Firm A (Row Player)}};

  % Action Labels
  \\node[above] at (1, 4) {Maintain High Price};
  \\node[above] at (3, 4) {Discount / Cut};
  \\node[left] at (0, 3) {High Price};
  \\node[left] at (0, 1) {Discount};

  % Payoff Cells (Firm A, Firm B)
  \\node at (1, 3) {$(10, 10)$};
  \\node at (3, 3) {$(-2, \\underline{15})$};
  \\node at (1, 1) {$(\\underline{15}, -2)$};
  \\node at (3, 1) {\\textbf{$(\\underline{2}, \\underline{2})^*$}};
\\end{tikzpicture}`
        },
        timeline: {
          title: "Strategic Event Timeline",
          description: "Multi-stage sequential game showing commitment milestones, rival observation, and market pricing.",
          code: `% \\usepackage{tikz} in preamble
\\begin{tikzpicture}[xscale=2.2, font=\\small]
  % Horizontal timeline axis
  \\draw[thick, ->] (0,0) -- (4.5,0) node[right] {\\textbf{Time $t$}};

  % Stage ticks & nodes
  \\foreach \\x/\\t/\\label in {
    0.5/t=0/Irreversible Capex Investment,
    2.0/t=1/Market Demand Shock Revealed,
    3.5/t=2/Simultaneous Price Competition
  } {
    \\draw[thick] (\\x, 0.15) -- (\\x, -0.15);
    \\node[below=5pt, align=center] at (\\x, 0) {\\textbf{\\t} \\\\[2pt] \\footnotesize \\label};
  }

  % Annotations
  \\draw[<->, dashed, blue] (0.5, 0.8) -- (2.0, 0.8) node[midway, above] {Commitment Horizon};
  \\draw[<->, dashed, purple] (2.0, 0.8) -- (3.5, 0.8) node[midway, above] {Information State};
\\end{tikzpicture}`
        },
        mixed: {
          title: "Mixed Strategy Matrix with Probabilities (Week 04)",
          description: "2x2 normal form matrix with randomization probabilities p, 1-p, q, 1-q and indifference conditions.",
          code: `% \\usepackage{tikz} in preamble
\\begin{tikzpicture}[scale=1.2]
  % Matrix grid & border
  \\draw[thick] (0,0) grid (4,4);
  \\draw[thick] (0,2) -- (4,2);
  \\draw[thick] (2,0) -- (2,4);

  % Player & Probability Labels
  \\node[above] at (2, 4.6) {\\textbf{Player 2 (Goalkeeper / Competitor)}};
  \\node[left, rotate=90] at (-0.8, 2) {\\textbf{Player 1 (Kicker / Firm)}};

  % Action Labels with Probabilities (q, 1-q, p, 1-p)
  \\node[above] at (1, 4.1) {Action 1: Left ($q$)};
  \\node[above] at (3, 4.1) {Action 2: Right ($1-q$)};
  \\node[left] at (-0.1, 3) {Action 1: Left ($p$)};
  \\node[left] at (-0.1, 1) {Action 2: Right ($1-p$)};

  % Payoff Cells (Row, Column)
  \\node at (1, 3) {$(1, -1)$};
  \\node at (3, 3) {$(-1, 1)$};
  \\node at (1, 1) {$(-1, 1)$};
  \\node at (3, 1) {$(1, -1)$};

  % Equilibrium annotation
  \\node[below, font=\\small, align=center] at (2, -0.3) {
    \\textbf{Mixed Strategy Nash Equilibrium (MSNE):} $p^* = \\frac{1}{2}, \\; q^* = \\frac{1}{2}$ \\\\[2pt]
    \\textit{Indifference condition:} $E[u_2(\\text{Left})] = E[u_2(\\text{Right})] = 0$
  };
\\end{tikzpicture}`
        }
      };

const MIXED_STRATEGY_PRESETS = [
      {
        id: 0,
        name: "Coffee Chain Promotion Timing (Classic Strategic Case)",
        tag: "Official Lecture Case",
        rowPlayer: "Coffee Chain",
        colPlayer: "Rival Chain",
        act1: "Promote Monday",
        act2: "Promote Wednesday",
        r11: 3, r12: 6, r21: 5, r22: 3,
        c11: 3, c12: 0, c21: 1, c22: 2,
        pStar: 0.25,
        qStar: 0.60,
        expPayoffRow: 4.2,
        expPayoffCol: 1.5,
        description: "From Slides 5–13: Monday offers larger demand opportunity, so the rival defends Monday more heavily (q* = 0.60). Anticipating this defense, the chain promotes on Wednesday (p* = 0.25 Mon, 0.75 Wed). Chain expected payoff = 4.2; Rival expected payoff = 1.5."
      },
      {
        id: 1,
        name: "E-Commerce Flash Sales (Amazon vs. Walmart)",
        tag: "Retail Strategy",
        rowPlayer: "Amazon",
        colPlayer: "Walmart",
        act1: "Flash Discount",
        act2: "Maintain Margin",
        r11: 3, r12: 7, r21: 1, r22: 5,
        c11: 3, c12: 1, c21: 7, c22: 5,
        pStar: 0.50,
        qStar: 0.50,
        expPayoffRow: 4.0,
        expPayoffCol: 4.0,
        description: "Zero pure equilibria. If Walmart maintains, Amazon discounts; if Amazon discounts, Walmart discounts; if both discount, both want to escape price war. At p* = 0.50 and q* = 0.50, neither can be exploited."
      },
      {
        id: 2,
        name: "Corporate Tax Compliance & Audit",
        tag: "Regulatory Governance",
        rowPlayer: "Corporation",
        colPlayer: "Tax Auditor",
        act1: "Aggressive Evasion",
        act2: "Strict Compliance",
        r11: 0, r12: 10, r21: 6, r22: 6,
        c11: 4, c12: 0, c21: 2, c22: 3,
        pStar: 0.20,
        qStar: 0.40,
        expPayoffRow: 6.0,
        expPayoffCol: 2.4,
        description: "Slide 16 Application: The Auditing Paradox. Severe penalties on tax evasion do not reduce equilibrium corporate evasion (p*); instead, they allow the regulatory authority to inspect less frequently (q* = 0.40) while maintaining deterrence."
      },
      {
        id: 3,
        name: "Rock, Paper, Scissors (Slide 3 Intuition)",
        tag: "Foundational Model",
        rowPlayer: "Player 1",
        colPlayer: "Player 2",
        act1: "Heads / Action 1",
        act2: "Tails / Action 2",
        r11: 1, r12: -1, r21: -1, r22: 1,
        c11: -1, c12: 1, c21: 1, c22: -1,
        pStar: 0.50,
        qStar: 0.50,
        expPayoffRow: 0.0,
        expPayoffCol: 0.0,
        description: "Slide 3 & 21: Symmetric zero-sum conflict. When every predictable action is beaten by an opponent counter, only equal randomization removes the exploitable pattern."
      }
    ];

    

    function PayoffMatrixSimulator({ initialPresetId = "coffee_chain" }: { initialPresetId?: string }) {
      const [selectedPresetId, setSelectedPresetId] = useState(initialPresetId);
      const activePreset = useMemo(() => {
        return MATRIX_PRESETS.find(p => p.id === selectedPresetId) || MATRIX_PRESETS[0];
      }, [selectedPresetId]);

      const [p1Name, setP1Name] = useState(activePreset.p1Name);
      const [p2Name, setP2Name] = useState(activePreset.p2Name);
      const [a1Name, setA1Name] = useState(activePreset.a1Name);
      const [a2Name, setA2Name] = useState(activePreset.a2Name);
      const [payoffs, setPayoffs] = useState(activePreset.payoffs);

      useEffect(() => {
        const p = MATRIX_PRESETS.find(item => item.id === selectedPresetId);
        if (p) {
          setP1Name(p.p1Name);
          setP2Name(p.p2Name);
          setA1Name(p.a1Name);
          setA2Name(p.a2Name);
          setPayoffs(p.payoffs);
        }
      }, [selectedPresetId]);

      const handleSelectPreset = (p: typeof MATRIX_PRESETS[0]) => {
        setSelectedPresetId(p.id);
      };

      const handlePayoffChange = (row: number, col: number, playerIndex: number, val: string) => {
        const num = parseFloat(val);
        const updated = [
          [ [...payoffs[0][0]], [...payoffs[0][1]] ],
          [ [...payoffs[1][0]], [...payoffs[1][1]] ]
        ];
        updated[row][col][playerIndex] = isNaN(num) ? 0 : num;
        setPayoffs(updated);
        setSelectedPresetId("custom");
      };

      const solution = useMemo(() => {
        const p = payoffs;
        const col0Max = Math.max(p[0][0][0], p[1][0][0]);
        const p1Br_00 = p[0][0][0] === col0Max;
        const p1Br_10 = p[1][0][0] === col0Max;

        const col1Max = Math.max(p[0][1][0], p[1][1][0]);
        const p1Br_01 = p[0][1][0] === col1Max;
        const p1Br_11 = p[1][1][0] === col1Max;

        const row0Max = Math.max(p[0][0][1], p[0][1][1]);
        const p2Br_00 = p[0][0][1] === row0Max;
        const p2Br_01 = p[0][1][1] === row0Max;

        const row1Max = Math.max(p[1][0][1], p[1][1][1]);
        const p2Br_10 = p[1][0][1] === row1Max;
        const p2Br_11 = p[1][1][1] === row1Max;

        const br1 = [
          [p1Br_00, p1Br_01],
          [p1Br_10, p1Br_11]
        ];
        const br2 = [
          [p2Br_00, p2Br_01],
          [p2Br_10, p2Br_11]
        ];

        const equilibria: [number, number][] = [];
        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 2; c++) {
            if (br1[r][c] && br2[r][c]) {
              equilibria.push([r, c]);
            }
          }
        }

        const r11 = p[0][0][0], r12 = p[0][1][0];
        const r21 = p[1][0][0], r22 = p[1][1][0];
        const c11 = p[0][0][1], c12 = p[0][1][1];
        const c21 = p[1][0][1], c22 = p[1][1][1];

        const denomP = (c11 + c22) - (c12 + c21);
        const numerP = c22 - c21;
        let mixedP: number | null = null;
        if (denomP !== 0) {
          const val = numerP / denomP;
          if (val >= 0 && val <= 1) mixedP = val;
        }

        const denomQ = (r11 + r22) - (r12 + r21);
        const numerQ = r22 - r12;
        let mixedQ: number | null = null;
        if (denomQ !== 0) {
          const val = numerQ / denomQ;
          if (val >= 0 && val <= 1) mixedQ = val;
        }

        const hasValidMixed = mixedP !== null && mixedQ !== null;
        const mixedExpRow = hasValidMixed ? (mixedQ! * r11 + (1 - mixedQ!) * r12) : null;
        const mixedExpCol = hasValidMixed ? (mixedP! * c11 + (1 - mixedP!) * c21) : null;

        return {
          br1,
          br2,
          equilibria,
          mixedP,
          mixedQ,
          hasValidMixed,
          mixedExpRow,
          mixedExpCol
        };
      }, [payoffs]);

      return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Strategic Interaction Lab · 2×2 Normal Form Simulator
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              Payoff Matrix & Nash Equilibrium Solver
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Simulate best response dynamics, pure Nash equilibria, and mixed strategy randomization probabilities via the Indifference Principle.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700">
              Lecture Scenarios & Presets:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {MATRIX_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedPresetId === preset.id
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
            {activePreset && (
              <div className="callout callout-note text-xs mt-2">
                <strong>Context: </strong> {activePreset.description}
              </div>
            )}
          </div>

          {/* Interactive Matrix Display & Inputs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Payoff Legend:</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 font-medium text-blue-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                    {p1Name || "Row Player"}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
                    {p2Name || "Col Player"}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr>
                      <th className="p-2.5 border border-slate-200 bg-slate-100/80 text-xs font-medium text-slate-500 w-1/3">
                        {p1Name} \ {p2Name}
                      </th>
                      <th className="p-2.5 border border-slate-200 bg-slate-100 text-xs font-bold text-emerald-800 w-1/3">
                        {a1Name}
                      </th>
                      <th className="p-2.5 border border-slate-200 bg-slate-100 text-xs font-bold text-emerald-800 w-1/3">
                        {a2Name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2.5 border border-slate-200 bg-slate-100 text-xs font-bold text-blue-800">
                        {a1Name}
                      </td>
                      {/* (0, 0) */}
                      <td className={`p-3 border border-slate-200 transition-colors ${
                        solution.equilibria.some(([r, c]) => r === 0 && c === 0)
                          ? "bg-emerald-50/90 ring-2 ring-emerald-500"
                          : "bg-white hover:bg-slate-50"
                      }`}>
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[0][0][0]}
                              onChange={(e) => handlePayoffChange(0, 0, 0, e.target.value)}
                              className="w-13 px-1 py-1 text-center bg-white border border-slate-300 rounded text-blue-700 font-mono font-bold text-sm focus:border-blue-500 focus:outline-none"
                            />
                            {solution.br1[0][0] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-blue-600 text-white text-[9px] font-bold rounded-full">
                                BR
                              </span>
                            )}
                          </div>
                          <span className="text-slate-400 font-bold">,</span>
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[0][0][1]}
                              onChange={(e) => handlePayoffChange(0, 0, 1, e.target.value)}
                              className="w-13 px-1 py-1 text-center bg-white border border-slate-300 rounded text-emerald-700 font-mono font-bold text-sm focus:border-emerald-500 focus:outline-none"
                            />
                            {solution.br2[0][0] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-emerald-600 text-white text-[9px] font-bold rounded-full">
                                BR
                              </span>
                            )}
                          </div>
                        </div>
                        {solution.equilibria.some(([r, c]) => r === 0 && c === 0) && (
                          <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
                            ★ Nash Eq
                          </div>
                        )}
                      </td>
                      {/* (0, 1) */}
                      <td className={`p-3 border border-slate-200 transition-colors ${
                        solution.equilibria.some(([r, c]) => r === 0 && c === 1)
                          ? "bg-emerald-50/90 ring-2 ring-emerald-500"
                          : "bg-white hover:bg-slate-50"
                      }`}>
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[0][1][0]}
                              onChange={(e) => handlePayoffChange(0, 1, 0, e.target.value)}
                              className="w-13 px-1 py-1 text-center bg-white border border-slate-300 rounded text-blue-700 font-mono font-bold text-sm focus:border-blue-500 focus:outline-none"
                            />
                            {solution.br1[0][1] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-blue-600 text-white text-[9px] font-bold rounded-full">
                                BR
                              </span>
                            )}
                          </div>
                          <span className="text-slate-400 font-bold">,</span>
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[0][1][1]}
                              onChange={(e) => handlePayoffChange(0, 1, 1, e.target.value)}
                              className="w-13 px-1 py-1 text-center bg-white border border-slate-300 rounded text-emerald-700 font-mono font-bold text-sm focus:border-emerald-500 focus:outline-none"
                            />
                            {solution.br2[0][1] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-emerald-600 text-white text-[9px] font-bold rounded-full">
                                BR
                              </span>
                            )}
                          </div>
                        </div>
                        {solution.equilibria.some(([r, c]) => r === 0 && c === 1) && (
                          <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
                            ★ Nash Eq
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2.5 border border-slate-200 bg-slate-100 text-xs font-bold text-blue-800">
                        {a2Name}
                      </td>
                      {/* (1, 0) */}
                      <td className={`p-3 border border-slate-200 transition-colors ${
                        solution.equilibria.some(([r, c]) => r === 1 && c === 0)
                          ? "bg-emerald-50/90 ring-2 ring-emerald-500"
                          : "bg-white hover:bg-slate-50"
                      }`}>
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[1][0][0]}
                              onChange={(e) => handlePayoffChange(1, 0, 0, e.target.value)}
                              className="w-13 px-1 py-1 text-center bg-white border border-slate-300 rounded text-blue-700 font-mono font-bold text-sm focus:border-blue-500 focus:outline-none"
                            />
                            {solution.br1[1][0] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-blue-600 text-white text-[9px] font-bold rounded-full">
                                BR
                              </span>
                            )}
                          </div>
                          <span className="text-slate-400 font-bold">,</span>
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[1][0][1]}
                              onChange={(e) => handlePayoffChange(1, 0, 1, e.target.value)}
                              className="w-13 px-1 py-1 text-center bg-white border border-slate-300 rounded text-emerald-700 font-mono font-bold text-sm focus:border-emerald-500 focus:outline-none"
                            />
                            {solution.br2[1][0] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-emerald-600 text-white text-[9px] font-bold rounded-full">
                                BR
                              </span>
                            )}
                          </div>
                        </div>
                        {solution.equilibria.some(([r, c]) => r === 1 && c === 0) && (
                          <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
                            ★ Nash Eq
                          </div>
                        )}
                      </td>
                      {/* (1, 1) */}
                      <td className={`p-3 border border-slate-200 transition-colors ${
                        solution.equilibria.some(([r, c]) => r === 1 && c === 1)
                          ? "bg-emerald-50/90 ring-2 ring-emerald-500"
                          : "bg-white hover:bg-slate-50"
                      }`}>
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[1][1][0]}
                              onChange={(e) => handlePayoffChange(1, 1, 0, e.target.value)}
                              className="w-13 px-1 py-1 text-center bg-white border border-slate-300 rounded text-blue-700 font-mono font-bold text-sm focus:border-blue-500 focus:outline-none"
                            />
                            {solution.br1[1][1] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-blue-600 text-white text-[9px] font-bold rounded-full">
                                BR
                              </span>
                            )}
                          </div>
                          <span className="text-slate-400 font-bold">,</span>
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[1][1][1]}
                              onChange={(e) => handlePayoffChange(1, 1, 1, e.target.value)}
                              className="w-13 px-1 py-1 text-center bg-white border border-slate-300 rounded text-emerald-700 font-mono font-bold text-sm focus:border-emerald-500 focus:outline-none"
                            />
                            {solution.br2[1][1] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-emerald-600 text-white text-[9px] font-bold rounded-full">
                                BR
                              </span>
                            )}
                          </div>
                        </div>
                        {solution.equilibria.some(([r, c]) => r === 1 && c === 1) && (
                          <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
                            ★ Nash Eq
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500 text-center font-mono">
                Edit numbers in the cells above to test arbitrary normal-form games.
              </p>
            </div>

            {/* Strategic Analysis & Solver Results */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Equilibrium Diagnostic
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {solution.equilibria.length} Pure Nash Eq
                </span>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-700 uppercase">
                  Pure Strategy Nash Equilibria:
                </h4>
                {solution.equilibria.length === 0 ? (
                  <div className="mt-1.5 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2.5">
                    <p>
                      <strong>No Pure Strategy Nash Equilibrium exists.</strong> Best responses cycle endlessly. Rational behavior requires deliberate randomization (Mixed Strategy) so the opponent cannot anticipate moves.
                    </p>
                    {solution.hasValidMixed && solution.mixedP !== null && solution.mixedQ !== null && (
                      <div className="pt-2 border-t border-amber-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-blue-900 font-bold font-mono text-xs">
                          <Icon name="target" className="w-3.5 h-3.5 text-blue-600" />
                          <span>Mixed Strategy Nash Equilibrium (MSNE):</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 text-xs font-mono">
                          <div className="flex justify-between items-center text-slate-800">
                            <span>{p1Name} (p*):</span>
                            <span className="text-blue-700 font-bold">{(solution.mixedP * 100).toFixed(1)}% {a1Name}</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-800">
                            <span>{p2Name} (q*):</span>
                            <span className="text-emerald-700 font-bold">{(solution.mixedQ * 100).toFixed(1)}% {a1Name}</span>
                          </div>
                          {solution.mixedExpRow !== null && solution.mixedExpCol !== null && (
                            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between">
                              <span>E[Payoff({p1Name})]: <strong className="text-blue-800">{solution.mixedExpRow.toFixed(2)}</strong></span>
                              <span>E[Payoff({p2Name})]: <strong className="text-emerald-800">{solution.mixedExpCol.toFixed(2)}</strong></span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-1.5 space-y-1.5">
                    {solution.equilibria.map(([r, c], idx) => {
                      const rowAction = r === 0 ? a1Name : a2Name;
                      const colAction = c === 0 ? a1Name : a2Name;
                      const p1val = payoffs[r][c][0];
                      const p2val = payoffs[r][c][1];
                      return (
                        <div key={idx} className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between">
                          <div>
                            <span className="font-bold text-emerald-950">[{rowAction}, {colAction}]</span>
                            <div className="text-[11px] text-slate-600 mt-0.5">
                              Payoffs: <span className="text-blue-700 font-mono font-bold">{p1val}</span> ({p1Name}) vs <span className="text-emerald-700 font-mono font-bold">{p2val}</span> ({p2Name})
                            </div>
                          </div>
                          <span className="px-2 py-0.5 bg-emerald-200 text-emerald-800 text-[10px] font-bold rounded">
                            Stable
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    function GameTikzStudioView() {
      const [activeSnippetTab, setActiveSnippetTab] = useState("tree");
      const [copiedId, setCopiedId] = useState<string | null>(null);

      const handleCopy = (id: string, text: string) => {
        try {
          navigator.clipboard.writeText(text);
          setCopiedId(id);
          setTimeout(() => setCopiedId(null), 2000);
        } catch (e) {
          console.warn("Failed to copy", e);
        }
      };

      const currentTemplate = TIKZ_TEMPLATES[activeSnippetTab as keyof typeof TIKZ_TEMPLATES] || TIKZ_TEMPLATES.tree;

      return (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Publication & Presentation Visuals
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  GameTikz Studio — LaTeX TikZ Diagram Generator
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Visual generator for extensive-form decision trees, normal-form strategic bimatrices, and mixed-strategy trees.
                </p>
              </div>
              <a
                href="https://kochiuyu.github.io/GameTikzStudio/"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 rounded-lg flex items-center gap-1.5 self-start sm:self-center transition-colors"
              >
                Open Standalone Studio <Icon name="externalLink" className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveSnippetTab("tree")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeSnippetTab === "tree" ? "bg-slate-900 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Extensive Form Tree
              </button>
              <button
                onClick={() => setActiveSnippetTab("matrix")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeSnippetTab === "matrix" ? "bg-slate-900 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Normal Form Matrix
              </button>
              <button
                onClick={() => setActiveSnippetTab("mixed")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeSnippetTab === "mixed" ? "bg-slate-900 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Mixed Strategy Matrix
              </button>
              <button
                onClick={() => setActiveSnippetTab("timeline")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeSnippetTab === "timeline" ? "bg-slate-900 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Sequential Timeline
              </button>
            </div>

            <div className="mt-4 relative bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-200 overflow-x-auto">
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                <span>{currentTemplate.title} — {currentTemplate.description}</span>
                <button
                  onClick={() => handleCopy(activeSnippetTab, currentTemplate.code)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1 transition-colors"
                >
                  {copiedId === activeSnippetTab ? <Icon name="check" className="w-3.5 h-3.5 text-emerald-400" /> : <Icon name="save" className="w-3.5 h-3.5" />}
                  {copiedId === activeSnippetTab ? "Copied!" : "Copy LaTeX"}
                </button>
              </div>
              <pre className="text-slate-300 text-[11px] leading-relaxed overflow-x-auto">{currentTemplate.code}</pre>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">Live Canvas: https://kochiuyu.github.io/GameTikzStudio/</span>
              <span className="text-[11px] text-slate-500">Visual Editor</span>
            </div>
            <iframe
              src="https://kochiuyu.github.io/GameTikzStudio/"
              title="GameTikzStudio"
              className="w-full h-[700px] border-0"
            />
          </div>
        </div>
      );
    }

    function App() {
      const [activeTab, setActiveTab] = useState<"overview" | "modules" | "tools" | "quizzes">("modules");
      const [selectedWeekId, setSelectedWeekId] = useState<number>(4);
      const [weekSubTab, setWeekSubTab] = useState<"notes" | "slides" | "simulator" | "exercise">("notes");
      const [toolsSubTab, setToolsSubTab] = useState<"matrix" | "tikz">("matrix");
      const [slideModalWeek, setSlideModalWeek] = useState<number | null>(null);
      const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
      const [quizWeekFilter, setQuizWeekFilter] = useState<number | "all">("all");
      const [showExerciseSolution, setShowExerciseSolution] = useState<boolean>(false);

      const selectedWeek = useMemo(() => {
        return CURRICULUM_DATA.find(w => w.id === selectedWeekId) || CURRICULUM_DATA[4];
      }, [selectedWeekId]);

      // When switching week, reset exercise solution reveal
      useEffect(() => {
        setShowExerciseSolution(false);
      }, [selectedWeekId]);

      const filteredQuizQuestions = useMemo(() => {
        if (quizWeekFilter === "all") return QUIZ_QUESTIONS;
        return QUIZ_QUESTIONS.filter(q => q.weekId === quizWeekFilter);
      }, [quizWeekFilter]);

      const totalQuizAnswered = Object.keys(quizAnswers).length;
      const totalQuizCorrect = useMemo(() => {
        return Object.entries(quizAnswers).filter(([qId, ans]) => {
          const question = QUIZ_QUESTIONS.find(q => q.id === qId);
          return question && question.correctIndex === ans;
        }).length;
      }, [quizAnswers]);

      return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-900">
          {/* Top Academic Navigation Bar */}
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 shadow-xs">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveTab("overview")}
                  className="flex items-center space-x-3 text-left focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    <Icon name="target" className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                      Strategic Thinking: Game Theory for Business Strategy
                    </h1>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>Executive Masterclass</span>
                      <span aria-hidden="true">·</span>
                      <span>Prof. Chiu Yu Ko</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Navigation Items & Quick Jump */}
              <div className="flex items-center flex-wrap gap-2">
                <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      activeTab === "overview"
                        ? "bg-white text-slate-900 shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("modules")}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      activeTab === "modules"
                        ? "bg-white text-slate-900 shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Weekly Modules
                  </button>
                  <button
                    onClick={() => setActiveTab("tools")}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      activeTab === "tools"
                        ? "bg-white text-slate-900 shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Tools & Solvers
                  </button>
                  <button
                    onClick={() => setActiveTab("quizzes")}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      activeTab === "quizzes"
                        ? "bg-white text-slate-900 shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Quizzes
                  </button>
                </div>

                {/* Direct Week Selector Dropdown & Slides Button: only appear when considering weekly modules */}
                {activeTab === "modules" && (
                  <>
                    <select
                      value={selectedWeekId}
                      onChange={(e) => {
                        setSelectedWeekId(Number(e.target.value));
                        setActiveTab("modules");
                      }}
                      className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 font-medium transition-colors focus:outline-none"
                      aria-label="Jump to week"
                    >
                      {CURRICULUM_DATA.map((w) => (
                        <option key={w.id} value={w.id}>
                          Week {w.id}: {w.title.slice(0, 28)}...
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => setSlideModalWeek(selectedWeekId)}
                      className="px-3 py-1.5 text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                      title="View slide deck PDF"
                    >
                      <Icon name="book" className="w-3.5 h-3.5" />
                      Slides (PDF)
                    </button>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            
            {/* VIEW 1: COURSE OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-fadeIn">
                {/* Course Header Banner */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
                  <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Executive Master & MBA Strategic Decision Sciences
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                    Strategic Thinking: Game Theory for Business Strategy (商業策略博弈論)
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed max-w-3xl">
                    A rigorous 12-week curriculum on applied game theory in executive strategy, competitive pricing, strategic commitment, mechanism design, and platform competition.
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
                    <div>
                      <strong className="text-slate-700">Level:</strong> Executive Master & MBA
                    </div>
                    <div>
                      <strong className="text-slate-700">Curriculum:</strong> Executive Strategic Decision Sciences
                    </div>
                    <div>
                      <strong className="text-slate-700">Format:</strong> 12 Lecture Modules · Case Analyses · Interactive Solvers
                    </div>
                  </div>
                </div>

                {/* 3 Pillars Framework */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
                      1
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">Diagnose the Strategic Game</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Identify decision-makers, action spaces, timeline of moves (sequential vs simultaneous), information availability, and external payoff consequences.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">
                      2
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">Represent the Interactions</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Map choices into formal game trees with information sets or strategic normal-form bimatrices with explicit payoff valuations.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
                      3
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">Solve with Game Theory</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Derive subgame perfect backward induction, eliminate strictly dominated strategies, and calculate pure and mixed Nash equilibria with the Indifference Principle.
                    </p>
                  </div>
                </div>

                {/* 12-Week Curriculum Table */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        12-Week Curriculum & Course Syllabus
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Click on any week to read the full lecture notes or view the slides directly.
                      </p>
                    </div>
                    <span className="text-xs font-medium text-slate-500 font-mono">
                      13 Modules
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          <th className="py-3 px-4 w-16">Week</th>
                          <th className="py-3 px-4">Topic & Module</th>
                          <th className="py-3 px-4 hidden md:table-cell">Key Strategic Concepts</th>
                          <th className="py-3 px-4 text-right">Materials</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {CURRICULUM_DATA.map((week) => (
                          <tr
                            key={week.id}
                            className={`hover:bg-slate-50/80 transition-colors ${
                              week.id === selectedWeekId ? "bg-blue-50/30" : ""
                            }`}
                          >
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-600">
                              W{week.id}
                            </td>
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => {
                                  setSelectedWeekId(week.id);
                                  setActiveTab("modules");
                                }}
                                className="text-left font-semibold text-slate-900 hover:text-blue-700 block transition-colors"
                              >
                                {week.title}
                              </button>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                {week.chineseTitle}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 hidden md:table-cell">
                              <div className="flex flex-wrap gap-1">
                                {week.coreConcepts.slice(0, 3).map((concept, idx) => (
                                  <span key={idx} className="text-[11px] text-slate-600">
                                    {concept}{idx < 2 ? " · " : ""}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedWeekId(week.id);
                                    setActiveTab("modules");
                                    setWeekSubTab("notes");
                                  }}
                                  className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
                                >
                                  Read Notes
                                </button>
                                <button
                                  onClick={() => setSlideModalWeek(week.id)}
                                  className="px-2.5 py-1 text-[11px] font-medium bg-slate-900 hover:bg-slate-800 text-white rounded transition-colors"
                                >
                                  Slides (PDF)
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: WEEKLY MODULES (TEACH) */}
            {activeTab === "modules" && (
              <div className="space-y-6 animate-fadeIn">
                {/* Week Header & Breadcrumbs (Modeled directly after lae-companion/week-04.html) */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
                  {/* Top Switcher Strip */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-3 mb-3 border-b border-slate-100">
                    {selectedWeekId > 0 ? (
                      <button
                        onClick={() => setSelectedWeekId(selectedWeekId - 1)}
                        className="hover:text-slate-900 font-medium flex items-center gap-1 transition-colors"
                      >
                        ← Week {selectedWeekId - 1}
                      </button>
                    ) : (
                      <span className="text-slate-300">← Start</span>
                    )}

                    <div className="font-mono text-slate-400">
                      Week {selectedWeekId} of 12
                    </div>

                    {selectedWeekId < 12 ? (
                      <button
                        onClick={() => setSelectedWeekId(selectedWeekId + 1)}
                        className="hover:text-slate-900 font-medium flex items-center gap-1 transition-colors"
                      >
                        Week {selectedWeekId + 1} →
                      </button>
                    ) : (
                      <span className="text-slate-300">End →</span>
                    )}
                  </div>

                  {/* Module Title */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        Week {selectedWeek.id} · {selectedWeek.duration}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
                        {selectedWeek.title}
                      </h2>
                      <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                        {selectedWeek.chineseTitle}
                      </div>
                    </div>

                    {/* Primary Slides PDF Button */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSlideModalWeek(selectedWeek.id)}
                        className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Icon name="book" className="w-3.5 h-3.5" />
                        Slides: {selectedWeek.slidePath.split("/").pop()} ({selectedWeek.pageCount} Slides)
                      </button>
                      <a
                        href={selectedWeek.slidePath}
                        download
                        className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors"
                        title="Download PDF"
                      >
                        <Icon name="download" className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Subtabs for Module Content */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1 overflow-x-auto text-xs">
                    <button
                      onClick={() => setWeekSubTab("notes")}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                        weekSubTab === "notes"
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <Icon name="fileText" className="w-3.5 h-3.5" />
                      Lecture Notes & Recap
                    </button>
                    <button
                      onClick={() => setWeekSubTab("slides")}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                        weekSubTab === "slides"
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <Icon name="layers" className="w-3.5 h-3.5" />
                      Slide Viewer ({selectedWeek.pageCount} Slides)
                    </button>
                    <button
                      onClick={() => setWeekSubTab("simulator")}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                        weekSubTab === "simulator"
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <Icon name="sparkles" className="w-3.5 h-3.5" />
                      Interactive Simulator
                    </button>
                    <button
                      onClick={() => setWeekSubTab("exercise")}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                        weekSubTab === "exercise"
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <Icon name="helpCircle" className="w-3.5 h-3.5" />
                      Case Exercise & Solution
                    </button>
                  </div>
                </div>

                {/* SUBTAB 1: LECTURE NOTES & RECAP */}
                {weekSubTab === "notes" && (
                  <LectureNotesView
                    selectedWeek={selectedWeek}
                    onSelectWeek={(id) => setSelectedWeekId(id)}
                  />
                )}

                {/* SUBTAB 2: SLIDE VIEWER */}
                {weekSubTab === "slides" && (
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-4 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">
                          Lecture Slides: {selectedWeek.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {selectedWeek.slidePath.split("/").pop()} · {selectedWeek.pageCount} Pages
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={selectedWeek.slidePath}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md flex items-center gap-1 transition-colors"
                        >
                          <Icon name="externalLink" className="w-3.5 h-3.5" />
                          Open in Tab
                        </a>
                        <a
                          href={selectedWeek.slidePath}
                          download
                          className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-md flex items-center gap-1 transition-colors"
                        >
                          <Icon name="download" className="w-3.5 h-3.5" />
                          Download PDF
                        </a>
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200 h-[650px] sm:h-[800px]">
                      <iframe
                        src={selectedWeek.slidePath}
                        title={`Slides for Week ${selectedWeek.id}`}
                        className="w-full h-full border-0"
                      />
                    </div>
                  </div>
                )}

                {/* SUBTAB 3: INTERACTIVE SIMULATOR */}
                {weekSubTab === "simulator" && (
                  <div className="space-y-6">
                    {selectedWeekId === 7 ? (
                      <div className="space-y-4">
                        <AuctionSimulator />
                      </div>
                    ) : selectedWeekId === 6 ? (
                      <div className="space-y-4">
                        <RepeatedGameSimulator />
                      </div>
                    ) : selectedWeekId === 5 ? (
                      <div className="space-y-4">
                        <CommitmentGameTree initialK={1.0} />
                      </div>
                    ) : selectedWeekId === 4 ? (
                      <div className="space-y-4">
                        <MixedStrategyVisualizer initialPresetId="coffee_chain" />
                      </div>
                    ) : selectedWeekId === 3 ? (
                      <div className="space-y-4">
                        <DominanceSolvableMatrix initialPresetId="classic_3x3" />
                      </div>
                    ) : selectedWeekId === 2 ? (
                      <div className="space-y-4">
                        <GameTreeDiagram initialPresetId="entry_deterrence" />
                      </div>
                    ) : (
                      <PayoffMatrixSimulator initialPresetId="coffee_chain" />
                    )}
                  </div>
                )}

                {/* SUBTAB 4: REVIEW EXERCISE */}
                {weekSubTab === "exercise" && (
                  <div className="space-y-6">
                    {selectedWeek?.caseAnalysis ? (
                      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
                        <div>
                          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                            Strategic Decision Challenge · Week {selectedWeek.id}
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                            {selectedWeek?.caseAnalysis?.title}
                          </h3>
                          {selectedWeek?.caseAnalysis?.subtitle && (
                            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                              {selectedWeek.caseAnalysis.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Executive Scenario Narrative */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
                          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            Executive Scenario Context
                          </div>
                          <p className="text-sm text-slate-800 leading-relaxed">
                            {selectedWeek?.caseAnalysis?.scenario}
                          </p>
                        </div>

                        {/* If Week 2, render interactive extensive game tree */}
                        {selectedWeek?.id === 2 && (
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                              Extensive-Form Game Tree (Backward Induction Solver)
                            </div>
                            <GameTreeDiagram initialPresetId="entry_deterrence" />
                          </div>
                        )}

                        {/* If Week 3, render interactive dominance solvable matrix */}
                        {selectedWeek?.id === 3 && (
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                              Interactive Payoff Matrix: Dominance Solvability & IESDS Solver
                            </div>
                            <DominanceSolvableMatrix initialPresetId="classic_3x3" />
                          </div>
                        )}

                        {/* If Week 4, render interactive mixed strategy visualizer */}
                        {selectedWeek?.id === 4 && (
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                              Interactive Mixed Strategy Simulator: Indifference Probabilities & Cycling
                            </div>
                            <MixedStrategyVisualizer initialPresetId="coffee_chain" />
                          </div>
                        )}

                        {/* If Week 5, render interactive 3-stage strategic commitment tree */}
                        {selectedWeek?.id === 5 && (
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                              Strategic Move Game Tree (Branching Out: Commitment vs. No Commitment)
                            </div>
                            <CommitmentGameTree initialK={1.0} />
                          </div>
                        )}

                        {/* If Week 7, render interactive auction simulator */}
                        {selectedWeek?.id === 7 && (
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                              Auction Mechanics & Bidding Strategy Lab (FPSB vs. SPSB vs. English vs. Dutch)
                            </div>
                            <AuctionSimulator />
                          </div>
                        )}

                        {/* If Week 6, render interactive repeated game simulator */}
                        {selectedWeek?.id === 6 && (
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                              Repeated Game & Discount Factor Simulator (Grim Trigger vs. Tit for Tat)
                            </div>
                            <RepeatedGameSimulator />
                          </div>
                        )}

                        {/* Payoff Matrix if applicable */}
                        {selectedWeek?.caseAnalysis?.matrix && (
                          <div className="bg-blue-50/40 border border-blue-200 rounded-xl p-4 sm:p-5 space-y-3">
                            <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                              Interactive Normal-Form Payoff Matrix: {selectedWeek.caseAnalysis.matrix.player1} vs. {selectedWeek.caseAnalysis.matrix.player2}
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs text-center border-collapse">
                                <thead>
                                  <tr className="border-b border-blue-200">
                                    <th className="p-2 text-left text-slate-600 font-semibold bg-blue-100/50">
                                      {selectedWeek.caseAnalysis.matrix.player1} ↓ \ {selectedWeek.caseAnalysis.matrix.player2} →
                                    </th>
                                    {selectedWeek.caseAnalysis.matrix.actions.map((act: string, aIdx: number) => (
                                      <th key={aIdx} className="p-2 font-bold text-slate-800 bg-blue-100/50">
                                        {act}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedWeek.caseAnalysis.matrix.actions.map((rowAct: string, rIdx: number) => (
                                    <tr key={rIdx} className="border-b border-blue-100">
                                      <td className="p-2 text-left font-bold text-slate-800 bg-blue-50/30">{rowAct}</td>
                                      {selectedWeek.caseAnalysis.matrix.payoffs[rIdx].map((payoff: [string, string], cIdx: number) => (
                                        <td key={cIdx} className="p-3 bg-white font-mono text-slate-900 border border-blue-100">
                                          <span className="text-blue-700 font-bold">{payoff[0]}</span>, <span className="text-emerald-700 font-bold">{payoff[1]}</span>
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Extensive Tree flow if applicable */}
                        {selectedWeek?.caseAnalysis?.treeDescription && selectedWeek?.id !== 2 && (
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                              Extensive-Form Game Tree Structure
                            </div>
                            <p className="text-xs text-slate-700 font-mono leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                              {selectedWeek.caseAnalysis.treeDescription}
                            </p>
                          </div>
                        )}

                        {/* Challenge Prompt */}
                        {selectedWeek?.caseAnalysis?.prompt && (
                          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 text-sm text-amber-950 space-y-1.5">
                            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                              <span>⚡</span> Strategic Decision Challenge
                            </div>
                            <p className="leading-relaxed font-medium">
                              {selectedWeek.caseAnalysis.prompt}
                            </p>
                          </div>
                        )}

                        {/* Solution Section */}
                        {selectedWeek?.caseAnalysis?.solution && (
                          <div className="pt-2">
                            <button
                              onClick={() => setShowExerciseSolution(!showExerciseSolution)}
                              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                            >
                              <Icon name={showExerciseSolution ? "eyeOff" : "eye"} className="w-4 h-4" />
                              {showExerciseSolution ? "Hide Model Solution" : "Reveal Model Solution & Economic Derivation"}
                            </button>

                            {showExerciseSolution && (
                              <div className="mt-4 p-5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-4 animate-fadeIn text-xs sm:text-sm">
                                <div>
                                  <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                                    Equilibrium Solution:
                                  </div>
                                  <p className="font-mono text-blue-900 mt-1 font-semibold">{selectedWeek.caseAnalysis.solution.equilibrium}</p>
                                </div>
                                <div>
                                  <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                                    Step-by-Step Derivation & Best Responses:
                                  </div>
                                  <p className="text-blue-950/90 leading-relaxed mt-1">{selectedWeek.caseAnalysis.solution.breakdown}</p>
                                </div>
                                <div className="pt-3 border-t border-blue-200/70">
                                  <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                                    Executive Managerial Takeaway:
                                  </div>
                                  <p className="text-blue-950 leading-relaxed mt-1 font-medium">{selectedWeek.caseAnalysis.solution.managerialTakeaway}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs text-center space-y-4 animate-fadeIn">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">
                          📋
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900">
                            Executive Case Analysis · Week {selectedWeek.id}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                            The interactive case study challenge for {selectedWeek.title} is scheduled for release alongside the lecture module.
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-2 pt-2">
                          <button
                            onClick={() => setWeekSubTab("notes")}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                          >
                            View Lecture Notes
                          </button>
                          <button
                            onClick={() => setSelectedWeekId(1)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                          >
                            Try Week 1 Case (Coca-Cola vs. Pepsi)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* VIEW 3: TOOLS & SOLVERS */}
            {activeTab === "tools" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <button
                    onClick={() => setToolsSubTab("matrix")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      toolsSubTab === "matrix" ? "bg-slate-900 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    2×2 Payoff Matrix & Mixed Strategy Solver
                  </button>
                  <button
                    onClick={() => setToolsSubTab("tikz")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      toolsSubTab === "tikz" ? "bg-slate-900 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    GameTikz Studio (LaTeX TikZ Generator)
                  </button>
                </div>

                {toolsSubTab === "matrix" && (
                  <PayoffMatrixSimulator initialPresetId="coffee_chain" />
                )}

                {toolsSubTab === "tikz" && (
                  <GameTikzStudioView />
                )}
              </div>
            )}

            {/* VIEW 4: QUIZZES */}
            {activeTab === "quizzes" && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
                {/* Header & Overall Performance Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Executive Knowledge Checks · Modules 1 to 6
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      Game Theory Strategic Decision Quizzes
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Test your understanding across all course modules: dominant strategies, backward induction, IESDS, mixed equilibria, commitment devices, and repeated games.
                    </p>
                  </div>

                  {/* Score Tracker */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 shrink-0 text-center sm:text-right space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Overall Progress
                    </div>
                    <div className="text-lg font-bold text-slate-900 font-mono">
                      <span className="text-emerald-600">{totalQuizCorrect}</span> / {totalQuizAnswered}{" "}
                      <span className="text-xs font-normal text-slate-400">
                        ({QUIZ_QUESTIONS.length} Questions)
                      </span>
                    </div>
                    {totalQuizAnswered > 0 && (
                      <div className="flex items-center justify-end gap-2 text-[11px]">
                        <span className="text-slate-500 font-medium">
                          Accuracy: {Math.round((totalQuizCorrect / totalQuizAnswered) * 100)}%
                        </span>
                        <button
                          onClick={() => setQuizAnswers({})}
                          className="text-red-600 hover:text-red-700 font-semibold underline ml-1"
                        >
                          Reset
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Module Filter Strip */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  <span className="text-slate-400 font-semibold mr-1 shrink-0">Filter Module:</span>
                  <button
                    onClick={() => setQuizWeekFilter("all")}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                      quizWeekFilter === "all"
                        ? "bg-slate-900 text-white font-semibold shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    All Modules ({QUIZ_QUESTIONS.length})
                  </button>
                  {[1, 2, 3, 4, 5, 6].map(wId => {
                    const count = QUIZ_QUESTIONS.filter(q => q.weekId === wId).length;
                    return (
                      <button
                        key={wId}
                        onClick={() => setQuizWeekFilter(wId)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                          quizWeekFilter === wId
                            ? "bg-blue-600 text-white font-semibold shadow-xs"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        Week {wId} {wId === 6 ? `★ Repeated Games (${count})` : `(${count})`}
                      </button>
                    );
                  })}
                </div>

                {/* Questions List */}
                <div className="space-y-6">
                  {filteredQuizQuestions.map((q, idx) => {
                    const selected = quizAnswers[q.id];
                    const isAnswered = selected !== undefined;
                    const isCorrect = isAnswered && selected === q.correctIndex;

                    return (
                      <div key={q.id} className="p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                        {/* Question Header Strip */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-blue-700 font-mono text-xs bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                              Question {idx + 1}
                            </span>
                            <span className="text-xs font-semibold text-slate-600">
                              {q.weekTag}
                            </span>
                          </div>

                          {isAnswered && (
                            <span className={`font-bold px-2.5 py-0.5 rounded text-xs self-start sm:self-auto ${
                              isCorrect ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-red-100 text-red-800 border border-red-300"
                            }`}>
                              {isCorrect ? "✓ Correct Answer" : "✗ Incorrect (Review Strategic Rationale)"}
                            </span>
                          )}
                        </div>

                        {/* Question Title */}
                        {q.title && (
                          <h4 className="text-sm font-bold text-slate-900">
                            {q.title}
                          </h4>
                        )}

                        {/* Executive Scenario Context Box */}
                        {q.scenario && (
                          <div className="bg-white border border-slate-200/80 rounded-lg p-3.5 text-xs text-slate-700 leading-relaxed space-y-1">
                            <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block text-blue-800">
                              🏢 Executive Scenario Context:
                            </span>
                            <p>{q.scenario}</p>
                          </div>
                        )}

                        {/* Question Prompt */}
                        <p className="text-sm font-semibold text-slate-900 leading-snug">
                          {q.question}
                        </p>

                        {/* Options */}
                        <div className="space-y-2 pt-1">
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                              className={`w-full text-left p-3 rounded-lg text-xs font-medium border transition-all flex items-start justify-between gap-3 ${
                                selected === optIdx
                                  ? optIdx === q.correctIndex
                                    ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-xs"
                                    : "bg-red-50 border-red-300 text-red-950 font-semibold"
                                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70"
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                <span className="font-mono font-bold text-slate-400 shrink-0 mt-0.5">
                                  {String.fromCharCode(65 + optIdx)}.
                                </span>
                                <span>{opt}</span>
                              </div>
                              {selected === optIdx && (
                                <span className="font-bold font-mono text-xs shrink-0">
                                  {optIdx === q.correctIndex ? "✓" : "✗"}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Strategic Rationale Explanation */}
                        {isAnswered && (
                          <div className="p-3.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1.5 animate-fadeIn">
                            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                              Strategic Rationale & Economic Analysis:
                            </div>
                            <p className="leading-relaxed pl-3 border-l-2 border-blue-500 text-slate-800">
                              {q.rationale}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </main>

          {/* Fullscreen Slide Modal */}
          {slideModalWeek !== null && (
            <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
              <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Week {slideModalWeek} Slide Deck · {CURRICULUM_DATA.find(w => w.id === slideModalWeek)?.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Executive Education Curriculum
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={CURRICULUM_DATA.find(w => w.id === slideModalWeek)?.slidePath}
                      download
                      className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md flex items-center gap-1 transition-colors"
                    >
                      <Icon name="download" className="w-3.5 h-3.5" />
                      Download
                    </a>
                    <button
                      onClick={() => setSlideModalWeek(null)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
                      aria-label="Close modal"
                    >
                      <Icon name="x" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-slate-100 p-2">
                  <iframe
                    src={CURRICULUM_DATA.find(w => w.id === slideModalWeek)?.slidePath}
                    title="Slide Modal Viewer"
                    className="w-full h-full rounded border border-slate-200 bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Clean Academic Footer */}
          <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <strong>Strategic Thinking: Game Theory for Business Strategy</strong>
              </div>
              <div>
                Executive Strategic Decision Sciences
              </div>
            </div>
          </footer>
        </div>
      );
    }

    export default App;
