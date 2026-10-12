import React, { useState, useEffect, useMemo, useRef } from "react";

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
        title: "Strategic Commitment & Sunk Costs",
        chineseTitle: "戰略承諾、沉沒成本與競爭護城河",
        status: "upcoming",
        duration: "3 Hours • Capital Allocation Case Study",
        preReadingUrl: "https://x.com/kochiuyu/status/2040215057498620112",
        coreConcepts: [
          "Credible Commitments (Burning Bridges)",
          "Strategic Sunk Investments as Entry Barriers",
          "Capacity Preemption & Expansion Wars",
          "Reputational Bonding & Executive Signaling",
          "Flexibility vs. Commitment Tradeoffs"
        ],
        businessCases: [
          "TSMC Multi-Billion Leading-Edge Fab Expansion",
          "Walmart Geographic Saturation & Supercenter Moats",
          "Disney Theme Park Mega-Investments vs. Rivals",
          "SpaceX Reusable Rocket Development Preemption"
        ],
        slidePath: "./slides/week05.pdf",
        pageCount: 48,
        upcomingNote: "Includes detailed financial modeling of TSMC capital expenditure commitment strategies."
      },
      {
        id: 6,
        title: "Repeated Games & Tacit Cooperation",
        chineseTitle: "重複博弈與默契合作機制",
        status: "upcoming",
        duration: "3 Hours • Dynamic Strategy Workshop",
        preReadingUrl: "https://x.com/kochiuyu/status/2040215365813498301",
        coreConcepts: [
          "Infinitely Repeated Games & Folk Theorem",
          "Discount Factor (δ) Thresholds for Cooperation",
          "Trigger Strategies: Grim Trigger vs. Tit-for-Tat",
          "Detecting Cheating & Market Transparency",
          "Sustaining Oligopolistic Collusion without Communication"
        ],
        businessCases: [
          "Global Container Shipping Alliances (2M & Ocean Alliance)",
          "Convenience Store Density Treaties (7-Eleven vs. FamilyMart)",
          "Airline Frequent Flyer Program Parity Treaties",
          "UK Supermarket Price-Match Guarantees"
        ],
        slidePath: "./slides/week06.pdf",
        pageCount: 50,
        upcomingNote: "Simulation laboratory will feature live multi-round iterated prisoner dilemma experiments."
      },
      {
        id: 7,
        title: "Auctions & Bidding Strategy (Part 1)",
        chineseTitle: "拍賣與競價策略（上）：四種基本拍賣機制",
        status: "upcoming",
        duration: "3 Hours • Procurement & Bidding Lab",
        preReadingUrl: "https://x.com/kochiuyu/status/2040217851693609308",
        coreConcepts: [
          "Ascending (English) Auctions",
          "Descending Clock (Dutch) Auctions",
          "First-Price Sealed-Bid (FPSB) Strategic Shading",
          "Vickrey Second-Price (SPSB) Truth-Telling Dominance",
          "Revenue Equivalence Theorem & Private Value Environments"
        ],
        businessCases: [
          "Offshore Wind Lease Auctions (UK Crown Estate)",
          "US Treasury Debt Issuance Auctions",
          "Corporate Procurement Reverse Auctions (General Electric)",
          "Christie's & Sotheby's Fine Art Bidding Dynamics"
        ],
        slidePath: "./slides/week07.pdf",
        pageCount: 42,
        upcomingNote: "Bidding calculator workbook and procurement scenario packet available prior to session."
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
      { id: "comp_8", label: "Assess repeated interaction mechanisms, monitoring, and cartel discipline (OPEC)", category: "Cooperation & Enforcement" },
      { id: "comp_9", label: "Calculate Mixed Strategy Nash Equilibria using the Indifference Principle (p*, q*)", category: "Algorithmic & Mixed Games" },
      { id: "comp_10", label: "Deploy algorithmic dynamic randomization to protect promotional and cybersecurity margins", category: "Managerial Randomization" }
    ];

    // --- Curated Reference Tools & Mini-Games ---
    const REFERENCE_TOOLS = [
      {
        id: "gametikz",
        title: "GameTikzStudio: Game Tree, Payoff Matrix & Timeline Generator",
        type: "Interactive Tool & TikZ Export",
        url: "https://kochiuyu.github.io/GameTikzStudio/",
        description: "Official visual authoring studio developed by Prof. Chiu Yu Ko. Interactively construct extensive-form game trees with information sets, normal-form payoff matrices, and sequential event timelines with instant LaTeX TikZ code generation.",
        badge: "Official Authoring Suite",
        isLab: true
      },
      {
        id: "dote3090",
        title: "DOTE 3090: Strategic Interactive Simulations",
        type: "Interactive Tool",
        url: "https://kochiuyu.github.io/dote3090/",
        description: "Official interactive behavioral game theory simulator suite developed by Prof. Chiu Yu Ko. Test real-time bargaining, beauty contests, and repeated dilemmas.",
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
        id: "coffee_chain",
        name: "Coffee Chain Promotion (Prof. Ko's Slide Case)",
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
        name: "Coffee Chain Promotion Timing (Prof. Ko's Slide Case)",
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
      const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
      const [showExerciseSolution, setShowExerciseSolution] = useState<boolean>(false);

      const selectedWeek = useMemo(() => {
        return CURRICULUM_DATA.find(w => w.id === selectedWeekId) || CURRICULUM_DATA[4];
      }, [selectedWeekId]);

      // When switching week, reset exercise solution reveal
      useEffect(() => {
        setShowExerciseSolution(false);
      }, [selectedWeekId]);

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
                      <span>DOTE 3090</span>
                      <span aria-hidden="true">·</span>
                      <span>CUHK Business School</span>
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

                {/* Direct Week Selector Dropdown */}
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
                    DOTE 3090: Strategic Thinking (商業策略博弈論)
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed max-w-3xl">
                    A rigorous 12-week course on applied game theory in executive strategy, competitive pricing, strategic commitment, mechanism design, and platform competition.
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
                    <div>
                      <strong className="text-slate-700">Instructor:</strong> Prof. Chiu Yu Ko
                    </div>
                    <div>
                      <strong className="text-slate-700">Institution:</strong> CUHK Business School
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
                        {selectedWeek.chineseTitle} · CUHK Business School · Prof. Chiu Yu Ko
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
                  <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
                    {/* Callout Quote */}
                    {selectedWeek.recap && (
                      <div className="callout callout-note">
                        <p className="font-semibold text-sm">
                          "{selectedWeek.recap.academicTakeaway}"
                        </p>
                        <p className="text-xs text-blue-800 mt-1">
                          — Prof. Chiu Yu Ko · CUHK Business School
                        </p>
                        <p className="text-xs text-blue-700/80 mt-1 italic">
                          {selectedWeek.recap.chineseTakeaway}
                        </p>
                      </div>
                    )}

                    {/* WEEK 4 SPECIFIC STRUCTURED RECAP */}
                    {selectedWeek.id === 4 && (
                      <div className="space-y-6 text-slate-800 leading-relaxed text-sm">
                        <div className="border-b border-slate-100 pb-4">
                          <h3 className="text-lg font-bold text-slate-900">
                            1. Opening Intuition: From Rock-Paper-Scissors to Cyclic Instability
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm mt-1">
                            In simultaneous games, when best responses form an endless cycle, pure strategies leave players vulnerable. Deterministic play can be anticipated and countered.
                          </p>
                          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700">
                            <strong>The Only Stable Counter-Exploitation:</strong> Randomize with calibrated probabilities. By making your action statistically unpredictable, the rival cannot profit from targeting a specific counter-measure.
                          </div>
                        </div>

                        {/* Core Lecture Case: Coffee Chain Promotion Timing */}
                        <div className="border-b border-slate-100 pb-4">
                          <h3 className="text-lg font-bold text-slate-900">
                            2. The Core Lecture Case: Coffee Chain Promotion Timing (Slides 5–13)
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm mt-1">
                            Two competing chains choose whether to run weekly promotions on Monday or Wednesday. Monday has larger baseline foot traffic, but preparing a defensive counter-campaign is fixed and costly.
                          </p>

                          {/* Payoff Table */}
                          <div className="my-4 overflow-x-auto">
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
                            <strong>Best-Response Cycling:</strong>
                            <ul className="list-disc list-inside mt-1 space-y-0.5">
                              <li>At [Mon, Mon] (3, 3), Chain prefers Wed to evade defense (5 &gt; 3).</li>
                              <li>At [Wed, Mon] (5, 1), Rival prefers to switch defense to Wed (2 &gt; 1).</li>
                              <li>At [Wed, Wed] (3, 2), Chain prefers Mon to harvest peak demand (6 &gt; 3).</li>
                              <li>At [Mon, Wed] (6, 0), Rival prefers Mon to blunt peak demand (3 &gt; 0).</li>
                            </ul>
                            <div className="mt-1 font-semibold">
                              Conclusion: Zero pure-strategy Nash equilibria exist.
                            </div>
                          </div>
                        </div>

                        {/* Indifference Principle & Derivation */}
                        <div className="border-b border-slate-100 pb-4">
                          <h3 className="text-lg font-bold text-slate-900">
                            3. The Mathematical Solution: The Indifference Principle
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm mt-1">
                            To make the rival willing to randomize, your mixing probabilities must make the rival indifferent between their choices.
                          </p>

                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                              <h4 className="font-bold text-blue-900 text-xs">Step 1: Finding Chain's Mix (p*)</h4>
                              <p className="text-xs text-slate-600">
                                Set Rival's expected payoff from Defending Mon equal to Defending Wed:
                              </p>
                              <div className="bg-white p-2 rounded border border-slate-200 font-mono text-xs space-y-1">
                                <div>E[Rival(Mon)] = 3p + 1(1-p) = 1 + 2p</div>
                                <div>E[Rival(Wed)] = 0p + 2(1-p) = 2 - 2p</div>
                                <div className="text-blue-700 font-bold">1 + 2p = 2 - 2p ⇒ 4p = 1 ⇒ p* = 0.25</div>
                              </div>
                              <p className="text-[11px] text-slate-600 font-medium">
                                Result: Chain promotes Monday 25%, Wednesday 75%.
                              </p>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                              <h4 className="font-bold text-emerald-900 text-xs">Step 2: Finding Rival's Mix (q*)</h4>
                              <p className="text-xs text-slate-600">
                                Set Chain's expected payoff from Promoting Mon equal to Promoting Wed:
                              </p>
                              <div className="bg-white p-2 rounded border border-slate-200 font-mono text-xs space-y-1">
                                <div>E[Chain(Mon)] = 3q + 6(1-q) = 6 - 3q</div>
                                <div>E[Chain(Wed)] = 5q + 3(1-q) = 3 + 2q</div>
                                <div className="text-emerald-700 font-bold">6 - 3q = 3 + 2q ⇒ 5q = 3 ⇒ q* = 0.60</div>
                              </div>
                              <p className="text-[11px] text-slate-600 font-medium">
                                Result: Rival defends Monday 60%, Wednesday 40%.
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-950 font-mono">
                            <strong>Expected Equilibrium Payoffs:</strong> E[Chain] = 6 - 3(0.60) = <strong>4.2</strong> · E[Rival] = 1 + 2(0.25) = <strong>1.5</strong>
                          </div>
                        </div>

                        {/* Strategic Counter-Intuition */}
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            4. Managerial Takeaway: The Strategic Counter-Intuition (Slide 13)
                          </h3>
                          <div className="callout callout-tip text-xs leading-relaxed">
                            <strong>Why promote more often on Wednesday (75%) when Monday has larger customer volume?</strong>
                            <p className="mt-1">
                              Because Monday offers the larger market opportunity, the rival concentrates defensive readiness on Monday (q* = 0.60). Anticipating this heavier defensive posture, the rational chain promotes more frequently on Wednesday to harvest unguarded demand!
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* GENERAL NOTES FOR OTHER WEEKS */}
                    {selectedWeek.id !== 4 && selectedWeek.recap && (
                      <div className="space-y-6 text-slate-800 text-sm leading-relaxed">
                        <p className="text-slate-600">{selectedWeek.recap.intro}</p>
                        {selectedWeek.recap.sections && selectedWeek.recap.sections.map((sec: any, idx: number) => (
                          <div key={idx} className="border-t border-slate-100 pt-4">
                            <h3 className="text-base font-bold text-slate-900 mb-1">{sec.title}</h3>
                            <p className="text-slate-600 text-xs sm:text-sm">{sec.content}</p>
                            {sec.keyTakeaway && (
                              <div className="callout callout-note text-xs mt-2">
                                <strong>Key Takeaway:</strong> {sec.keyTakeaway}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Core Concepts & Cases List */}
                    <div className="pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                          Core Concepts
                        </h4>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {selectedWeek.coreConcepts.map((c, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-blue-600 font-bold">•</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                          Business Applications
                        </h4>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {selectedWeek.businessCases.map((c, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">•</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
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
                  <div>
                    <PayoffMatrixSimulator initialPresetId={selectedWeekId === 4 ? "coffee_chain" : selectedWeekId === 3 ? "prisoners_dilemma" : "matching_pennies"} />
                  </div>
                )}

                {/* SUBTAB 4: REVIEW EXERCISE */}
                {weekSubTab === "exercise" && (
                  <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
                    <div>
                      <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        Strategic Decision Challenge · Week {selectedWeek.id}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">
                        Executive Case Analysis
                      </h3>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700 leading-relaxed">
                      <strong>Scenario Prompt: </strong>
                      {selectedWeek.caseStudy.scenario.prompt}
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setShowExerciseSolution(!showExerciseSolution)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Icon name={showExerciseSolution ? "eyeOff" : "eye"} className="w-4 h-4" />
                        {showExerciseSolution ? "Hide Model Solution" : "Reveal Model Solution & Economic Derivation"}
                      </button>

                      {showExerciseSolution && (
                        <div className="mt-4 p-5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-3 animate-fadeIn text-xs sm:text-sm">
                          <div>
                            <strong className="text-blue-950">Equilibrium Solution:</strong>
                            <p className="font-mono text-blue-900 mt-0.5">{selectedWeek.caseStudy.scenario.solution.equilibrium}</p>
                          </div>
                          <div>
                            <strong className="text-blue-950">Step-by-Step Derivation:</strong>
                            <p className="text-blue-900/90 leading-relaxed mt-0.5">{selectedWeek.caseStudy.scenario.solution.breakdown}</p>
                          </div>
                          <div className="pt-2 border-t border-blue-200/60">
                            <strong className="text-blue-950">Executive Takeaway:</strong>
                            <p className="text-blue-900 leading-relaxed mt-0.5">{selectedWeek.caseStudy.scenario.solution.managerialTakeaway}</p>
                          </div>
                        </div>
                      )}
                    </div>
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
                <div className="border-b border-slate-100 pb-4">
                  <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Knowledge Checks
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    Game Theory Review Quizzes
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Test your understanding of backward induction, dominant strategies, and mixed strategy Nash equilibria.
                  </p>
                </div>

                <div className="space-y-6">
                  {QUIZ_QUESTIONS.map((q, idx) => {
                    const selected = quizAnswers[q.id];
                    const isAnswered = selected !== undefined;
                    const isCorrect = isAnswered && selected === q.correctIndex;

                    return (
                      <div key={q.id} className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-500 uppercase tracking-wider font-mono">
                            Question {idx + 1} · Week {q.weekId}
                          </span>
                          {isAnswered && (
                            <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                              isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                            }`}>
                              {isCorrect ? "✓ Correct" : "✗ Review"}
                            </span>
                          )}
                        </div>

                        <p className="text-sm font-semibold text-slate-900 leading-snug">
                          {q.question}
                        </p>

                        <div className="space-y-1.5 pt-1">
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                              className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-colors flex items-center justify-between ${
                                selected === optIdx
                                  ? optIdx === q.correctIndex
                                    ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                                    : "bg-red-50 border-red-300 text-red-950"
                                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              <span>{opt}</span>
                              {selected === optIdx && (
                                <span className="font-bold font-mono text-[11px]">
                                  {optIdx === q.correctIndex ? "✓" : "✗"}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>

                        {isAnswered && (
                          <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1">
                            <strong className="text-slate-900">Explanation & Strategic Rationale: </strong>
                            <span>{q.rationale}</span>
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
                      CUHK Business School · Prof. Chiu Yu Ko
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
                <strong>Strategic Thinking: Game Theory for Business Strategy</strong> · DOTE 3090
              </div>
              <div>
                CUHK Business School · Prof. Chiu Yu Ko
              </div>
            </div>
          </footer>
        </div>
      );
    }

    export default App;
