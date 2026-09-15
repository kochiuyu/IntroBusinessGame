import React, { useState, useEffect, useMemo } from "react";

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
        printer: <><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></>
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
        status: "upcoming",
        duration: "3 Hours • Quantitative Workshop",
        preReadingUrl: "https://x.com/kochiuyu/status/2040209356831199262",
        coreConcepts: [
          "Nash Equilibrium in Pure Strategies",
          "Best Response Functions",
          "Cournot vs. Bertrand Competition",
          "Capacity Preemption & Price Sensitivity",
          "Rationalizability & Iterative Elimination"
        ],
        businessCases: [
          "Airbus vs. Boeing (Wide-Body Commercial Capacity)",
          "AMD vs. Intel (Semiconductor Fab Node Allocations)",
          "OPEC+ Crude Oil Production Quotas & Cheating",
          "Sony PlayStation vs. Microsoft Xbox Launch Pricing"
        ],
        slidePath: "./slides/week03.pdf",
        pageCount: 44,
        upcomingNote: "Lecture slides, problem sets, and spreadsheet models will unlock after the Week 2 seminar session."
      },
      {
        id: 4,
        title: "Mixed Strategies & Randomization in Strategy",
        chineseTitle: "混合策略與隨機化決策",
        status: "upcoming",
        duration: "3 Hours • Algorithmic Strategy Seminar",
        preReadingUrl: "https://x.com/kochiuyu/status/2040211996885532677",
        coreConcepts: [
          "Indifference Principle in Mixed Strategies",
          "Dynamic Algorithmic Pricing & Flash Sales",
          "Auditing Games & Corporate Compliance",
          "Unpredictability as an Offensive Moat",
          "Security Inspection & Cyber-Defense Resource Allocation"
        ],
        businessCases: [
          "Amazon Dynamic Algorithmic Repricing",
          "Target vs. Walmart Surprise Weekend Promotions",
          "IRS Audit Selection & Financial Fraud Detection",
          "Airline Revenue Management & Seat Class Randomization"
        ],
        slidePath: "./slides/week04.pdf",
        pageCount: 38,
        upcomingNote: "Case briefing on retail algorithmic pricing algorithms releases next Tuesday."
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
      { id: "comp_8", label: "Assess repeated interaction mechanisms, monitoring, and cartel discipline (OPEC)", category: "Cooperation & Enforcement" }
    ];

    // --- Curated Reference Tools & Mini-Games ---
    const REFERENCE_TOOLS = [
      {
        title: "DOTE 3090: Strategic Interactive Simulations",
        type: "Interactive Tool",
        url: "https://kochiuyu.github.io/dote3090/",
        description: "Official interactive behavioral game theory simulator suite developed by Prof. Chiu Yu Ko. Test real-time bargaining, beauty contests, and repeated dilemmas.",
        badge: "Curriculum Highlight"
      },
      {
        title: "The Prisoner's Dilemma in Oligopolistic Markets",
        type: "Video Case",
        url: "https://www.youtube.com/results?search_query=Prisoner%27s+Dilemma+Business+Strategy+Game+Theory",
        description: "Managerial exploration of how duopolies destroy margin through simultaneous discounting, and structural fixes through brand and warranty design.",
        badge: "Core Video"
      },
      {
        title: "Price Wars & Bertrand Paradox Escalation",
        type: "Video Case",
        url: "https://www.youtube.com/results?search_query=Bertrand+Paradox+Price+Wars+Game+Theory",
        description: "Why two identical firms competing on price can drive economic profits to zero, and how differentiated features restore pricing power.",
        badge: "Case Video"
      },
      {
        title: "Ultimatum Bargaining & Strategic BATNA",
        type: "Video Case",
        url: "https://www.youtube.com/results?search_query=Ultimatum+Game+Negotiation+BATNA+Strategy",
        description: "Executive negotiations: how emotional fairness thresholds, outside options, and delay costs shift surplus distribution in M&A deals.",
        badge: "Executive Seminar"
      }
    ];

    // ==========================================
    // INTERACTIVE 2x2 MATRIX SIMULATOR COMPONENT
    // ==========================================
    const MATRIX_PRESETS = [
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

    function PayoffMatrixSimulator() {
      const [selectedPresetId, setSelectedPresetId] = useState("prisoners_dilemma");
      const [p1Name, setP1Name] = useState(MATRIX_PRESETS[0].p1Name);
      const [p2Name, setP2Name] = useState(MATRIX_PRESETS[0].p2Name);
      const [a1Name, setA1Name] = useState(MATRIX_PRESETS[0].a1Name);
      const [a2Name, setA2Name] = useState(MATRIX_PRESETS[0].a2Name);
      const [payoffs, setPayoffs] = useState(MATRIX_PRESETS[0].payoffs);

      const handleSelectPreset = (preset) => {
        setSelectedPresetId(preset.id);
        setP1Name(preset.p1Name);
        setP2Name(preset.p2Name);
        setA1Name(preset.a1Name);
        setA2Name(preset.a2Name);
        setPayoffs(preset.payoffs);
      };

      const handlePayoffChange = (row, col, playerIndex, val) => {
        const num = parseFloat(val);
        const updated = [
          [ [...payoffs[0][0]], [...payoffs[0][1]] ],
          [ [...payoffs[1][0]], [...payoffs[1][1]] ]
        ];
        updated[row][col][playerIndex] = isNaN(num) ? 0 : num;
        setPayoffs(updated);
        setSelectedPresetId("custom");
      };

      // Solver Engine
      const solution = useMemo(() => {
        const p = payoffs;
        // Best responses for Player 1:
        // Against Col 0:
        const col0Max = Math.max(p[0][0][0], p[1][0][0]);
        const p1Br_00 = p[0][0][0] === col0Max;
        const p1Br_10 = p[1][0][0] === col0Max;

        // Against Col 1:
        const col1Max = Math.max(p[0][1][0], p[1][1][0]);
        const p1Br_01 = p[0][1][0] === col1Max;
        const p1Br_11 = p[1][1][0] === col1Max;

        // Best responses for Player 2:
        // Against Row 0:
        const row0Max = Math.max(p[0][0][1], p[0][1][1]);
        const p2Br_00 = p[0][0][1] === row0Max;
        const p2Br_01 = p[0][1][1] === row0Max;

        // Against Row 1:
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

        const equilibria = [];
        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 2; c++) {
            if (br1[r][c] && br2[r][c]) {
              equilibria.push([r, c]);
            }
          }
        }

        // Dominant strategies
        const p1DominantRow0 = p[0][0][0] > p[1][0][0] && p[0][1][0] > p[1][1][0];
        const p1DominantRow1 = p[1][0][0] > p[0][0][0] && p[1][1][0] > p[0][1][0];

        const p2DominantCol0 = p[0][0][1] > p[0][1][1] && p[1][0][1] > p[1][1][1];
        const p2DominantCol1 = p[0][1][1] > p[0][0][1] && p[1][1][1] > p[1][0][1];

        // Pareto optimality
        const allCells = [[0, 0], [0, 1], [1, 0], [1, 1]];
        const paretoOptimal = allCells.filter(([r1, c1]) => {
          const v1 = p[r1][c1];
          const isDominated = allCells.some(([r2, c2]) => {
            if (r1 === r2 && c1 === c2) return false;
            const v2 = p[r2][c2];
            return (v2[0] >= v1[0] && v2[1] >= v1[1]) && (v2[0] > v1[0] || v2[1] > v1[1]);
          });
          return !isDominated;
        });

        // Dilemma check: is there a Nash eq that is Pareto dominated by another cell?
        const isSocialDilemma = equilibria.some(([er, ec]) => {
          const eqVal = p[er][ec];
          return allCells.some(([or, oc]) => {
            const oVal = p[or][oc];
            return oVal[0] > eqVal[0] && oVal[1] > eqVal[1];
          });
        });

        return {
          br1,
          br2,
          equilibria,
          p1Dominant: p1DominantRow0 ? 0 : p1DominantRow1 ? 1 : null,
          p2Dominant: p2DominantCol0 ? 0 : p2DominantCol1 ? 1 : null,
          paretoOptimal,
          isSocialDilemma
        };
      }, [payoffs]);

      const currentPreset = MATRIX_PRESETS.find(p => p.id === selectedPresetId);

      return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold uppercase tracking-wider border border-indigo-500/30">
                  Interactive Lab
                </span>
                <span className="text-xs text-slate-500 font-mono">Nash Equilibrium & Payoff Solver</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                2x2 Strategic Normal Form Matrix Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulate strategic interaction, test best response dynamics, and compute pure Nash equilibria in real time.
              </p>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Select Strategic Scenario Preset:
            </label>
            <div className="flex flex-wrap gap-2">
              {MATRIX_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedPresetId === p.id
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
            {currentPreset && (
              <p className="text-xs text-indigo-300/90 bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-2.5 leading-relaxed">
                <strong className="text-indigo-200">Scenario Context: </strong>
                {currentPreset.description}
              </p>
            )}
          </div>

          {/* Interactive Matrix Display & Inputs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* The 2x2 Matrix Grid */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl border border-slate-800 p-4 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Payoff Legend:</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 font-mono text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    {p1Name || "Player 1"} (Row)
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-sky-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                    {p2Name || "Player 2"} (Col)
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr>
                      <th className="p-2 border border-slate-800 bg-slate-900 text-xs font-mono text-slate-400 w-1/3">
                        <div className="text-[10px] text-slate-500">Row \ Col</div>
                        <span className="text-slate-300">{p1Name}</span> \ <span className="text-slate-300">{p2Name}</span>
                      </th>
                      <th className="p-2.5 border border-slate-800 bg-slate-900/90 text-xs font-bold text-sky-300 w-1/3">
                        {a1Name}
                      </th>
                      <th className="p-2.5 border border-slate-800 bg-slate-900/90 text-xs font-bold text-sky-300 w-1/3">
                        {a2Name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 0 */}
                    <tr>
                      <td className="p-2.5 border border-slate-800 bg-slate-900/90 text-xs font-bold text-emerald-300">
                        {a1Name}
                      </td>

                      {/* Cell (0, 0) */}
                      <td className={`p-3 border border-slate-800 transition-all ${
                        solution.equilibria.some(([r, c]) => r === 0 && c === 0)
                          ? "bg-indigo-950/50 ring-2 ring-indigo-500/80"
                          : "bg-slate-900/40 hover:bg-slate-900/80"
                      }`}>
                        <div className="flex items-center justify-center gap-2">
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[0][0][0]}
                              onChange={(e) => handlePayoffChange(0, 0, 0, e.target.value)}
                              className="w-14 px-1.5 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-400 font-mono font-bold text-sm focus:border-emerald-500 focus:outline-none"
                            />
                            {solution.br1[0][0] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-emerald-500 text-slate-950 text-[9px] font-black rounded-full shadow" title="Best response for Row Player">
                                BR
                              </span>
                            )}
                          </div>
                          <span className="text-slate-500 font-bold">,</span>
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[0][0][1]}
                              onChange={(e) => handlePayoffChange(0, 0, 1, e.target.value)}
                              className="w-14 px-1.5 py-1 text-center bg-slate-900 border border-slate-700 rounded text-sky-400 font-mono font-bold text-sm focus:border-sky-500 focus:outline-none"
                            />
                            {solution.br2[0][0] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-sky-500 text-slate-950 text-[9px] font-black rounded-full shadow" title="Best response for Col Player">
                                BR
                              </span>
                            )}
                          </div>
                        </div>
                        {solution.equilibria.some(([r, c]) => r === 0 && c === 0) && (
                          <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/40">
                            ★ Nash Eq
                          </div>
                        )}
                      </td>

                      {/* Cell (0, 1) */}
                      <td className={`p-3 border border-slate-800 transition-all ${
                        solution.equilibria.some(([r, c]) => r === 0 && c === 1)
                          ? "bg-indigo-950/50 ring-2 ring-indigo-500/80"
                          : "bg-slate-900/40 hover:bg-slate-900/80"
                      }`}>
                        <div className="flex items-center justify-center gap-2">
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[0][1][0]}
                              onChange={(e) => handlePayoffChange(0, 1, 0, e.target.value)}
                              className="w-14 px-1.5 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-400 font-mono font-bold text-sm focus:border-emerald-500 focus:outline-none"
                            />
                            {solution.br1[0][1] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-emerald-500 text-slate-950 text-[9px] font-black rounded-full shadow" title="Best response for Row Player">
                                BR
                              </span>
                            )}
                          </div>
                          <span className="text-slate-500 font-bold">,</span>
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[0][1][1]}
                              onChange={(e) => handlePayoffChange(0, 1, 1, e.target.value)}
                              className="w-14 px-1.5 py-1 text-center bg-slate-900 border border-slate-700 rounded text-sky-400 font-mono font-bold text-sm focus:border-sky-500 focus:outline-none"
                            />
                            {solution.br2[0][1] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-sky-500 text-slate-950 text-[9px] font-black rounded-full shadow" title="Best response for Col Player">
                                BR
                              </span>
                            )}
                          </div>
                        </div>
                        {solution.equilibria.some(([r, c]) => r === 0 && c === 1) && (
                          <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/40">
                            ★ Nash Eq
                          </div>
                        )}
                      </td>
                    </tr>

                    {/* Row 1 */}
                    <tr>
                      <td className="p-2.5 border border-slate-800 bg-slate-900/90 text-xs font-bold text-emerald-300">
                        {a2Name}
                      </td>

                      {/* Cell (1, 0) */}
                      <td className={`p-3 border border-slate-800 transition-all ${
                        solution.equilibria.some(([r, c]) => r === 1 && c === 0)
                          ? "bg-indigo-950/50 ring-2 ring-indigo-500/80"
                          : "bg-slate-900/40 hover:bg-slate-900/80"
                      }`}>
                        <div className="flex items-center justify-center gap-2">
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[1][0][0]}
                              onChange={(e) => handlePayoffChange(1, 0, 0, e.target.value)}
                              className="w-14 px-1.5 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-400 font-mono font-bold text-sm focus:border-emerald-500 focus:outline-none"
                            />
                            {solution.br1[1][0] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-emerald-500 text-slate-950 text-[9px] font-black rounded-full shadow" title="Best response for Row Player">
                                BR
                              </span>
                            )}
                          </div>
                          <span className="text-slate-500 font-bold">,</span>
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[1][0][1]}
                              onChange={(e) => handlePayoffChange(1, 0, 1, e.target.value)}
                              className="w-14 px-1.5 py-1 text-center bg-slate-900 border border-slate-700 rounded text-sky-400 font-mono font-bold text-sm focus:border-sky-500 focus:outline-none"
                            />
                            {solution.br2[1][0] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-sky-500 text-slate-950 text-[9px] font-black rounded-full shadow" title="Best response for Col Player">
                                BR
                              </span>
                            )}
                          </div>
                        </div>
                        {solution.equilibria.some(([r, c]) => r === 1 && c === 0) && (
                          <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/40">
                            ★ Nash Eq
                          </div>
                        )}
                      </td>

                      {/* Cell (1, 1) */}
                      <td className={`p-3 border border-slate-800 transition-all ${
                        solution.equilibria.some(([r, c]) => r === 1 && c === 1)
                          ? "bg-indigo-950/50 ring-2 ring-indigo-500/80"
                          : "bg-slate-900/40 hover:bg-slate-900/80"
                      }`}>
                        <div className="flex items-center justify-center gap-2">
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[1][1][0]}
                              onChange={(e) => handlePayoffChange(1, 1, 0, e.target.value)}
                              className="w-14 px-1.5 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-400 font-mono font-bold text-sm focus:border-emerald-500 focus:outline-none"
                            />
                            {solution.br1[1][1] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-emerald-500 text-slate-950 text-[9px] font-black rounded-full shadow" title="Best response for Row Player">
                                BR
                              </span>
                            )}
                          </div>
                          <span className="text-slate-500 font-bold">,</span>
                          <div className="relative">
                            <input
                              type="number"
                              value={payoffs[1][1][1]}
                              onChange={(e) => handlePayoffChange(1, 1, 1, e.target.value)}
                              className="w-14 px-1.5 py-1 text-center bg-slate-900 border border-slate-700 rounded text-sky-400 font-mono font-bold text-sm focus:border-sky-500 focus:outline-none"
                            />
                            {solution.br2[1][1] && (
                              <span className="absolute -top-1.5 -right-1.5 px-1 bg-sky-500 text-slate-950 text-[9px] font-black rounded-full shadow" title="Best response for Col Player">
                                BR
                              </span>
                            )}
                          </div>
                        </div>
                        {solution.equilibria.some(([r, c]) => r === 1 && c === 1) && (
                          <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/40">
                            ★ Nash Eq
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500 text-center font-mono">
                Click any numeric value in the cells above to test custom payoff matrices dynamically.
              </p>
            </div>

            {/* Strategic Analysis & Solver Results */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl border border-slate-800 p-4 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Equilibrium Diagnostic
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {solution.equilibria.length} Pure Nash Eq
                </span>
              </div>

              {/* Nash Equilibrium Outcome */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase">Pure Strategy Nash Equilibria:</h4>
                {solution.equilibria.length === 0 ? (
                  <div className="mt-1.5 p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
                    <strong>No Pure Strategy Nash Equilibrium exists.</strong> The players face cyclical incentives (like Rock-Paper-Scissors or Inspection Game). The game resolves via a mixed-strategy equilibrium where players randomize moves to remain unpredictable.
                  </div>
                ) : (
                  <div className="mt-1.5 space-y-1.5">
                    {solution.equilibria.map(([r, c], idx) => {
                      const rowAction = r === 0 ? a1Name : a2Name;
                      const colAction = c === 0 ? a1Name : a2Name;
                      const p1val = payoffs[r][c][0];
                      const p2val = payoffs[r][c][1];
                      return (
                        <div key={idx} className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs flex items-center justify-between">
                          <div>
                            <span className="font-bold text-white">[{rowAction}, {colAction}]</span>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Payoffs: <span className="text-emerald-400 font-mono font-bold">{p1val}</span> (Row) vs <span className="text-sky-400 font-mono font-bold">{p2val}</span> (Col)
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                            Stable
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Dominance Properties */}
              <div className="text-xs space-y-1.5 pt-2 border-t border-slate-800">
                <h4 className="font-bold text-slate-300 uppercase">Dominant Strategy Analysis:</h4>
                <div className="space-y-1 text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>
                      <strong>{p1Name}: </strong>
                      {solution.p1Dominant !== null ? (
                        <span className="text-emerald-300">
                          Strictly dominant strategy is <u>{solution.p1Dominant === 0 ? a1Name : a2Name}</u>.
                        </span>
                      ) : (
                        <span className="text-slate-400">No dominant strategy (optimal choice depends on opponent).</span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                    <span>
                      <strong>{p2Name}: </strong>
                      {solution.p2Dominant !== null ? (
                        <span className="text-sky-300">
                          Strictly dominant strategy is <u>{solution.p2Dominant === 0 ? a1Name : a2Name}</u>.
                        </span>
                      ) : (
                        <span className="text-slate-400">No dominant strategy (optimal choice depends on opponent).</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Dilemma / Pareto Efficiency Callout */}
              <div className="pt-2 border-t border-slate-800 text-xs">
                {solution.isSocialDilemma ? (
                  <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-500/30 text-red-200">
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      <Icon name="helpCircle" className="w-3.5 h-3.5 text-red-400" />
                      Prisoner's Dilemma Trap Detected
                    </div>
                    The Nash Equilibrium is Pareto inefficient! Both firms could enjoy higher payoffs by cooperating, but unilateral defection incentives prevent win-win collaboration without binding commitments or repeated interaction.
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-200">
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      <Icon name="checkCircle" className="w-3.5 h-3.5 text-emerald-400" />
                      Pareto Coherent State
                    </div>
                    The equilibrium outcome aligns with efficient surplus frontier or requires coordination mechanisms to converge on the optimal joint standard.
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      );
    }
    function App() {
      // --- Persistent State Hooks ---
      const [completedWeeks, setCompletedWeeks] = useState(() => {
        try {
          const saved = localStorage.getItem("gt_completed_weeks");
          return saved ? JSON.parse(saved) : [1]; // Week 1 completed by default as demo
        } catch (e) {
          return [1];
        }
      });

      const [competencies, setCompetencies] = useState(() => {
        try {
          const saved = localStorage.getItem("gt_competencies");
          return saved ? JSON.parse(saved) : ["comp_1", "comp_2"];
        } catch (e) {
          return ["comp_1", "comp_2"];
        }
      });

      const [caseNotes, setCaseNotes] = useState(() => {
        try {
          const saved = localStorage.getItem("gt_case_notes");
          return saved ? JSON.parse(saved) : {
            1: "In Coca-Cola vs. Pepsi, both sides are trapped by fear of unilateral market share loss. Advertising doesn't expand the total soda consumption pie; it merely protects defensive boundaries. A rational exit strategy requires steering brand spend into non-carbonated wellness acquisitions where margins are unconstrained.",
            2: "Blockbuster failed to backward induct because retail franchise store owners generated lucrative local cash flows that corporate headquarters could not easily liquidate. Netflix correctly realized Blockbuster was paralyzed by its own operating cost structure."
          };
        } catch (e) {
          return {};
        }
      });

      const [quizAnswers, setQuizAnswers] = useState(() => {
        try {
          const saved = localStorage.getItem("gt_quiz_answers");
          return saved ? JSON.parse(saved) : {};
        } catch (e) {
          return {};
        }
      });

      const [quizSubmitted, setQuizSubmitted] = useState(() => {
        try {
          const saved = localStorage.getItem("gt_quiz_submitted");
          return saved ? JSON.parse(saved) : {};
        } catch (e) {
          return {};
        }
      });

      // --- UI Navigation State ---
      const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'modules' | 'quizzes' | 'reference'
      const [selectedWeekId, setSelectedWeekId] = useState(1);
      const [weekSubTab, setWeekSubTab] = useState("recap"); // 'recap' | 'case' | 'slides'
      const [moduleFilter, setModuleFilter] = useState("all"); // 'all' | 'active' | 'upcoming'
      const [revealedSolutions, setRevealedSolutions] = useState({});
      const [saveStatus, setSaveStatus] = useState({});
      const [slideModalWeek, setSlideModalWeek] = useState(null);
      const [activeBizAppWeek1, setActiveBizAppWeek1] = useState(0);
      const [activeInductionStep, setActiveInductionStep] = useState(0);
      const [copiedRecap, setCopiedRecap] = useState(false);
      const [embeddedSlideMode, setEmbeddedSlideMode] = useState(false);
      const [caseCellSelected, setCaseCellSelected] = useState([1, 1]);

      const openWeekRecap = (weekId) => {
        setSelectedWeekId(weekId);
        setActiveTab("modules");
        setWeekSubTab("recap");
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      const copyRecapToClipboard = (weekData) => {
        if (!weekData || !weekData.recap) return;
        const text = `${weekData.recap.title}\n\nAcademic Takeaway: "${weekData.recap.academicTakeaway}"\n\n${weekData.recap.intro}`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text);
          setCopiedRecap(true);
          setTimeout(() => setCopiedRecap(false), 2200);
        }
      };

      // --- Sync to LocalStorage ---
      useEffect(() => {
        try {
          localStorage.setItem("gt_completed_weeks", JSON.stringify(completedWeeks));
        } catch (e) {}
      }, [completedWeeks]);

      useEffect(() => {
        try {
          localStorage.setItem("gt_competencies", JSON.stringify(competencies));
        } catch (e) {}
      }, [competencies]);

      useEffect(() => {
        try {
          localStorage.setItem("gt_case_notes", JSON.stringify(caseNotes));
        } catch (e) {}
      }, [caseNotes]);

      useEffect(() => {
        try {
          localStorage.setItem("gt_quiz_answers", JSON.stringify(quizAnswers));
          localStorage.setItem("gt_quiz_submitted", JSON.stringify(quizSubmitted));
        } catch (e) {}
      }, [quizAnswers, quizSubmitted]);

      // --- Calculated Metrics ---
      const activeModulesCompletedCount = useMemo(() => {
        const activeIds = [0, 1, 2];
        return activeIds.filter(id => completedWeeks.includes(id)).length;
      }, [completedWeeks]);

      const totalModulesCompletedCount = completedWeeks.length;

      const quizStats = useMemo(() => {
        let attempted = 0;
        let correct = 0;
        QUIZ_QUESTIONS.forEach(q => {
          if (quizSubmitted[q.id]) {
            attempted++;
            if (quizAnswers[q.id] === q.correctIndex) {
              correct++;
            }
          }
        });
        const scorePct = attempted > 0 ? Math.round((correct / QUIZ_QUESTIONS.length) * 100) : 0;
        return { attempted, correct, total: QUIZ_QUESTIONS.length, scorePct };
      }, [quizAnswers, quizSubmitted]);

      const savedNotesCount = useMemo(() => {
        return Object.values(caseNotes).filter(n => typeof n === "string" && n.trim().length > 10).length;
      }, [caseNotes]);

      // --- Handlers ---
      const toggleWeekCompletion = (weekId) => {
        setCompletedWeeks(prev => 
          prev.includes(weekId) ? prev.filter(id => id !== weekId) : [...prev, weekId]
        );
      };

      const toggleCompetency = (compId) => {
        setCompetencies(prev =>
          prev.includes(compId) ? prev.filter(id => id !== compId) : [...prev, compId]
        );
      };

      const handleNoteChange = (weekId, text) => {
        setCaseNotes(prev => ({ ...prev, [weekId]: text }));
        setSaveStatus(prev => ({ ...prev, [weekId]: "saving" }));
        setTimeout(() => {
          setSaveStatus(prev => ({ ...prev, [weekId]: "saved" }));
        }, 600);
      };

      const triggerManualSave = (weekId) => {
        setSaveStatus(prev => ({ ...prev, [weekId]: "saving" }));
        setTimeout(() => {
          setSaveStatus(prev => ({ ...prev, [weekId]: "saved" }));
        }, 300);
      };

      const toggleSolution = (weekId) => {
        setRevealedSolutions(prev => ({ ...prev, [weekId]: !prev[weekId] }));
      };

      const handleQuizSelect = (qId, optionIdx) => {
        if (quizSubmitted[qId]) return;
        setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
      };

      const handleQuizSubmit = (qId) => {
        if (quizAnswers[qId] === undefined) return;
        setQuizSubmitted(prev => ({ ...prev, [qId]: true }));
      };

      const handleResetQuiz = (qId) => {
        setQuizSubmitted(prev => {
          const next = { ...prev };
          delete next[qId];
          return next;
        });
        setQuizAnswers(prev => {
          const next = { ...prev };
          delete next[qId];
          return next;
        });
      };

      const handleResetAllQuizzes = () => {
        if (confirm("Reset all quiz attempts to test your mastery again?")) {
          setQuizAnswers({});
          setQuizSubmitted({});
        }
      };

      const selectedWeek = useMemo(() => {
        return CURRICULUM_DATA.find(w => w.id === selectedWeekId) || CURRICULUM_DATA[0];
      }, [selectedWeekId]);

      const filteredWeeks = useMemo(() => {
        if (moduleFilter === "active") return CURRICULUM_DATA.filter(w => w.status === "active");
        if (moduleFilter === "upcoming") return CURRICULUM_DATA.filter(w => w.status === "upcoming");
        return CURRICULUM_DATA;
      }, [moduleFilter]);

      return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-600/30">
          
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
                  <Icon name="target" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-none">
                      Strategic Thinking: Game Theory for Business Strategy
                    </h1>
                    <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                      MBA / Exec Ed
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    商業策略博弈論 • 12-Week Strategic Decision Architecture
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "dashboard"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon name="barChart" className="w-4 h-4" />
                  Executive Dashboard
                </button>

                <button
                  onClick={() => setActiveTab("modules")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "modules"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon name="book" className="w-4 h-4" />
                  Weekly Curriculum ({CURRICULUM_DATA.length})
                </button>

                <button
                  onClick={() => setActiveTab("quizzes")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap relative ${
                    activeTab === "quizzes"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon name="helpCircle" className="w-4 h-4" />
                  Strategy Quizzes
                  {quizStats.scorePct > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-emerald-500/30 text-emerald-300 rounded-full font-mono">
                      {quizStats.scorePct}%
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("reference")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "reference"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon name="sparkles" className="w-4 h-4" />
                  Simulations & Tools
                </button>
              </div>
            </div>
          </header>

          {/* Main Body Content */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            
            {/* VIEW 1: EXECUTIVE DASHBOARD */}
            {activeTab === "dashboard" && (
              <div className="space-y-8 animate-fadeIn">
                {/* Hero / Executive Welcome Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
                  <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
                      <Icon name="award" className="w-4 h-4 text-indigo-400" />
                      Executive Strategy Program • Fall Cohort
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      Master the Strategic Geometry of Competitive Advantage
                    </h2>
                    <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
                      Move beyond intuitive guesswork to formal mathematical and strategic rigor. Analyze market interdependence, forecast rival terminal decisions via backward induction, and structure credible market commitments.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => { setActiveTab("modules"); setSelectedWeekId(0); }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2"
                      >
                        Start with Week 0 Overview
                        <Icon name="chevronRight" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setActiveTab("modules"); setSelectedWeekId(1); }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg text-xs sm:text-sm transition-all flex items-center gap-2"
                      >
                        Enter Week 1: Strategic Interaction
                        <Icon name="chevronRight" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveTab("quizzes")}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg text-xs sm:text-sm transition-all flex items-center gap-2"
                      >
                        <Icon name="helpCircle" className="w-4 h-4 text-indigo-400" />
                        Take Assessment
                      </button>
                      <a
                        href="https://kochiuyu.github.io/dote3090/"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/50 font-semibold rounded-lg text-xs sm:text-sm transition-all flex items-center gap-2"
                      >
                        <Icon name="externalLink" className="w-4 h-4 text-emerald-400" />
                        Launch DOTE 3090 Simulator
                      </a>
                    </div>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Self-Paced Progress Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {/* Card 1: Active Modules */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Modules</span>
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <Icon name="book" className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                        {activeModulesCompletedCount} <span className="text-slate-500 text-lg font-normal">/ 3</span>
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold">
                        ({Math.round((activeModulesCompletedCount / 3) * 100)}% active)
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      {totalModulesCompletedCount} of {CURRICULUM_DATA.length} Total Weeks checked off
                    </p>
                    <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(activeModulesCompletedCount / 3) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Card 2: Strategic Mastery % */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Strategic Mastery</span>
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <Icon name="award" className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                        {quizStats.scorePct}%
                      </span>
                      <span className="text-xs text-indigo-300 font-medium">
                        ({quizStats.correct} of {quizStats.total} correct)
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      {quizStats.attempted} of {quizStats.total} scenarios evaluated
                    </p>
                    <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${quizStats.scorePct}%` }}
                      />
                    </div>
                  </div>

                  {/* Card 3: Saved Case Study Notes */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saved Case Notes</span>
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                        <Icon name="fileText" className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                        {savedNotesCount}
                      </span>
                      <span className="text-xs text-sky-300 font-medium">Drafts in Vault</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      Synchronized locally in browser storage
                    </p>
                    <div className="mt-3 flex items-center text-xs text-slate-400 font-medium">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                      Auto-sync active
                    </div>
                  </div>

                  {/* Card 4: Executive Competencies */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Competencies Acquired</span>
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <Icon name="target" className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                        {competencies.length} <span className="text-slate-500 text-lg font-normal">/ {STRATEGIC_COMPETENCIES.length}</span>
                      </span>
                      <span className="text-xs text-amber-300 font-medium">
                        ({Math.round((competencies.length / STRATEGIC_COMPETENCIES.length) * 100)}%)
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      Self-assessment executive rubric
                    </p>
                    <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(competencies.length / STRATEGIC_COMPETENCIES.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Two-Column Grid: Competencies & Curated Shelf */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left (7 cols): Strategic Competencies Tracker */}
                  <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                          <Icon name="target" className="w-5 h-5 text-indigo-400" />
                          Strategic Competencies Tracker
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Self-paced mastery checklist based on core MBA decision frameworks
                        </p>
                      </div>
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-slate-800 rounded-lg text-indigo-300 border border-slate-700">
                        {competencies.length} of {STRATEGIC_COMPETENCIES.length} verified
                      </span>
                    </div>

                    <div className="mt-4 space-y-2.5">
                      {STRATEGIC_COMPETENCIES.map((comp) => {
                        const isChecked = competencies.includes(comp.id);
                        return (
                          <div
                            key={comp.id}
                            onClick={() => toggleCompetency(comp.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                              isChecked
                                ? "bg-indigo-950/20 border-indigo-800/60 text-slate-200 hover:bg-indigo-950/30"
                                : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                            }`}
                          >
                            <button
                              type="button"
                              className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all ${
                                isChecked
                                  ? "bg-indigo-600 text-white shadow-sm"
                                  : "border border-slate-600 hover:border-slate-500"
                              }`}
                            >
                              {isChecked && <Icon name="check" className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className={`text-xs sm:text-sm font-medium leading-snug ${isChecked ? "text-slate-100 font-semibold" : "text-slate-300"}`}>
                                  {comp.label}
                                </p>
                                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 ml-2 whitespace-nowrap">
                                  {comp.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right (5 cols): Curated Tools & Reference Shelf */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Simulator Card Highlight */}
                    <div className="bg-gradient-to-br from-indigo-900/50 via-slate-900 to-slate-900 border border-indigo-700/50 rounded-2xl p-6 shadow-md relative overflow-hidden">
                      <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                        <Icon name="sparkles" className="w-4 h-4 text-indigo-400" />
                        Featured Interactive Simulator
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                        DOTE 3090: Strategic Interactive Lab
                      </h4>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Experiment with live multiplayer bargaining, beauty contests, repeated coordination, and auction simulations designed by Prof. Chiu Yu Ko.
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <a
                          href="https://kochiuyu.github.io/dote3090/"
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition-all shadow-md flex items-center gap-2"
                        >
                          Launch DOTE 3090 Lab
                          <Icon name="externalLink" className="w-3.5 h-3.5" />
                        </a>
                        <span className="text-xs text-indigo-300/80 font-mono">
                          kochiuyu.github.io/dote3090
                        </span>
                      </div>
                    </div>

                    {/* Curated Video & Case Links */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                      <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
                        <Icon name="play" className="w-4 h-4 text-indigo-400" />
                        Strategic Dilemmas Video Briefings
                      </h3>
                      <div className="space-y-3">
                        {REFERENCE_TOOLS.slice(1).map((tool, idx) => (
                          <a
                            key={idx}
                            href={tool.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-800/40 transition-all group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                                <Icon name="play" className="w-3 h-3 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                                {tool.title}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                {tool.badge}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                              {tool.description}
                            </p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Course Recaps Showcase (Weeks 1 & 2) */}
                <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-300 font-bold">
                          Faculty Synthesis • 課堂精華回顧
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <Icon name="book" className="w-5 h-5 text-indigo-400" />
                        Official Course Recaps & Lecture Summaries
                      </h3>
                      <p className="text-xs text-slate-400">
                        In-depth executive briefs synthesized directly from class lectures, business applications, and game trees
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Available:</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-bold">
                        WEEKS 0, 1 & 2 READY
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Week 0 Recap Card */}
                    <div className="bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-5 flex flex-col justify-between transition-all group">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-600/30 text-indigo-300 border border-indigo-600/40 font-bold">
                            WEEK 00 OVERVIEW • 6 MIN READ
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">./recaps/week00-recap.md</span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-2 group-hover:text-indigo-300 transition-colors">
                          {WEEK0_RECAP.title}
                        </h4>
                        <p className="text-xs text-indigo-300/80 font-medium mt-0.5">
                          {WEEK0_RECAP.chineseTitle}
                        </p>

                        {/* Professor Quote */}
                        <div className="mt-3 p-3 rounded-lg bg-indigo-950/30 border border-indigo-800/40 relative">
                          <span className="text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider block mb-1">
                            Academic Takeaway:
                          </span>
                          <p className="text-xs text-indigo-100 italic leading-relaxed">
                            "{WEEK0_RECAP.academicTakeaway}"
                          </p>
                        </div>

                        {/* Topics & Cases */}
                        <div className="mt-3">
                          <p className="text-[11px] font-semibold text-slate-400 mb-1.5">Foundational Methodologies:</p>
                          <div className="flex flex-wrap gap-1">
                            {["5-Step Diagnosis", "Payoff Matrix", "Game Trees", "Simultaneous vs Sequential", "Incentive Architecture", "Assessment Rubric"].map((c, i) => (
                              <span key={i} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <button
                          onClick={() => openWeekRecap(0)}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <span>Read Full Lecture Recap</span>
                          <Icon name="chevronRight" className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href="./recaps/week00-recap.md"
                          download="week00-recap.md"
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono flex items-center gap-1 border border-slate-700 transition-all"
                          title="Download Markdown summary"
                        >
                          <Icon name="download" className="w-3.5 h-3.5" />
                          .md
                        </a>
                      </div>
                    </div>

                    {/* Week 1 Recap Card */}
                    <div className="bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-5 flex flex-col justify-between transition-all group">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-600/30 text-indigo-300 border border-indigo-600/40 font-bold">
                            WEEK 01 RECAP • 7 MIN READ
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">./recaps/week01-recap.md</span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-2 group-hover:text-indigo-300 transition-colors">
                          {WEEK1_RECAP.title}
                        </h4>
                        <p className="text-xs text-indigo-300/80 font-medium mt-0.5">
                          {WEEK1_RECAP.chineseTitle}
                        </p>

                        {/* Professor Quote */}
                        <div className="mt-3 p-3 rounded-lg bg-indigo-950/30 border border-indigo-800/40 relative">
                          <span className="text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider block mb-1">
                            Academic Takeaway:
                          </span>
                          <p className="text-xs text-indigo-100 italic leading-relaxed">
                            "{WEEK1_RECAP.academicTakeaway}"
                          </p>
                        </div>

                        {/* Topics & Cases */}
                        <div className="mt-3">
                          <p className="text-[11px] font-semibold text-slate-400 mb-1.5">6 Real-World Cases Analyzed:</p>
                          <div className="flex flex-wrap gap-1">
                            {["Food-Delivery Coupons", "AI Hardware Capex", "Airline Baggage Fees", "Price Wars", "Advertising Spend", "OPEC Cartel"].map((c, i) => (
                              <span key={i} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <button
                          onClick={() => openWeekRecap(1)}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <span>Read Full Lecture Recap</span>
                          <Icon name="chevronRight" className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href="./recaps/week01-recap.md"
                          download="week01-recap.md"
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono flex items-center gap-1 border border-slate-700 transition-all"
                          title="Download Markdown summary"
                        >
                          <Icon name="download" className="w-3.5 h-3.5" />
                          .md
                        </a>
                      </div>
                    </div>

                    {/* Week 2 Recap Card */}
                    <div className="bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-5 flex flex-col justify-between transition-all group">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-600/30 text-indigo-300 border border-indigo-600/40 font-bold">
                            WEEK 02 RECAP • 8 MIN READ
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">./recaps/week02-recap.md</span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-2 group-hover:text-indigo-300 transition-colors">
                          {WEEK2_RECAP.title}
                        </h4>
                        <p className="text-xs text-indigo-300/80 font-medium mt-0.5">
                          {WEEK2_RECAP.chineseTitle}
                        </p>

                        {/* Professor Quote */}
                        <div className="mt-3 p-3 rounded-lg bg-indigo-950/30 border border-indigo-800/40 relative">
                          <span className="text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider block mb-1">
                            Academic Takeaway:
                          </span>
                          <p className="text-xs text-indigo-100 italic leading-relaxed">
                            "{WEEK2_RECAP.academicTakeaway}"
                          </p>
                        </div>

                        {/* Topics & Concepts */}
                        <div className="mt-3">
                          <p className="text-[11px] font-semibold text-slate-400 mb-1.5">Key Methodologies & Frameworks:</p>
                          <div className="flex flex-wrap gap-1">
                            {["Actions vs Strategies", "Game Trees", "3-Step Backward Induction", "Market Entry (Fight vs Accommodate)", "Credible Threats & Capacity", "Tech Launch Timing"].map((c, i) => (
                              <span key={i} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <button
                          onClick={() => openWeekRecap(2)}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <span>Read Full Lecture Recap</span>
                          <Icon name="chevronRight" className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href="./recaps/week02-recap.md"
                          download="week02-recap.md"
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono flex items-center gap-1 border border-slate-700 transition-all"
                          title="Download Markdown summary"
                        >
                          <Icon name="download" className="w-3.5 h-3.5" />
                          .md
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Faculty Pre-Reading on X Library (Weeks 0-13) */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/30 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5 uppercase">
                          <Icon name="xLogo" className="w-3 h-3 text-sky-400" />
                          Faculty Pre-Reading Series • @kochiuyu
                        </span>
                        <span className="text-[11px] text-slate-400">14 Weekly Threads</span>
                      </div>
                      <h3 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
                        Game Theory Weekly Pre-Reading on X (課前預習專題)
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                        Prof. Chiu Yu Ko has prepared curated pre-reading threads on X for each week to build strategic intuition, outline case dilemmas, and stimulate class debate.
                      </p>
                    </div>
                    <a
                      href="https://x.com/kochiuyu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all self-start sm:self-auto shrink-0 shadow-sm"
                    >
                      <Icon name="xLogo" className="w-3.5 h-3.5 text-sky-400" />
                      <span>Follow @kochiuyu on X</span>
                      <Icon name="externalLink" className="w-3 h-3 text-sky-400" />
                    </a>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                    {CURRICULUM_DATA.map((w) => (
                      <div
                        key={w.id}
                        className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-sky-500/50 hover:bg-slate-900/80 transition-all flex flex-col justify-between group shadow-sm"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                              w.status === "active"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-slate-800 text-slate-400"
                            }`}>
                              WEEK {String(w.id).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] text-sky-400/80 font-mono font-medium flex items-center gap-1">
                              <Icon name="xLogo" className="w-2.5 h-2.5" />
                              Thread
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug">
                            {w.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                            {w.chineseTitle}
                          </p>
                          
                          {w.coreConcepts && (
                            <p className="text-[10px] text-slate-500 mt-2 line-clamp-1">
                              {w.coreConcepts.slice(0, 2).join(" • ")}
                            </p>
                          )}
                        </div>

                        <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                          {w.preReadingUrl ? (
                            <a
                              href={w.preReadingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 bg-sky-500/20 hover:bg-sky-500 hover:text-slate-950 text-sky-300 border border-sky-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm flex-1 justify-center"
                              title={`Open Week ${w.id} pre-reading on X`}
                            >
                              <Icon name="xLogo" className="w-3 h-3" />
                              <span>Read on X</span>
                              <Icon name="externalLink" className="w-2.5 h-2.5 opacity-80" />
                            </a>
                          ) : null}
                          <button
                            onClick={() => {
                              setSelectedWeekId(w.id);
                              setActiveTab("modules");
                            }}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                            title="Open module details"
                          >
                            <span>Module</span>
                            <Icon name="chevronRight" className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Slide Decks Matrix Preview */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-800">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <Icon name="book" className="w-5 h-5 text-indigo-400" />
                        Executive Course Slide Decks Directory
                      </h3>
                      <p className="text-xs text-slate-400">
                        Relative direct links (./slides/week00.pdf to ./slides/week13.pdf) for offline or GitHub Pages deployment
                      </p>
                    </div>
                    <button
                      onClick={() => { setActiveTab("modules"); setSelectedWeekId(1); }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 self-start sm:self-auto"
                    >
                      Open Module Workspace
                      <Icon name="chevronRight" className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {CURRICULUM_DATA.map((w) => (
                      <div
                        key={w.id}
                        onClick={() => {
                          setSelectedWeekId(w.id);
                          setActiveTab("modules");
                        }}
                        className={`p-3 rounded-xl border text-center flex flex-col justify-between transition-all cursor-pointer group hover:scale-[1.02] ${
                          w.status === "active"
                            ? "bg-slate-850 border-indigo-700/50 hover:border-indigo-400 hover:bg-slate-800/90 shadow-sm"
                            : "bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 opacity-80"
                        }`}
                        title={`Click to open Week ${w.id} curriculum module`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono text-slate-400 group-hover:text-indigo-300 font-bold">W{String(w.id).padStart(2, '0')}</span>
                            {w.status === "active" ? (
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Active Module" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-slate-600" title="Upcoming Module" />
                            )}
                          </div>
                          <p className="text-xs font-bold text-slate-200 line-clamp-2 h-8 leading-tight group-hover:text-white transition-colors">
                            {w.title}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-center gap-1.5">
                          <a
                            href={w.slidePath}
                            download
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 rounded text-[11px] font-mono flex items-center gap-1 transition-all"
                            title={`Download ${w.slidePath}`}
                          >
                            <Icon name="download" className="w-3 h-3" />
                            PDF
                          </a>
                          {w.status === "active" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSlideModalWeek(w);
                              }}
                              className="px-2.5 py-1 bg-indigo-950 text-indigo-300 hover:bg-indigo-900 rounded text-[11px] font-mono flex items-center gap-1 transition-colors"
                              title="Inspect Slide Deck"
                            >
                              <Icon name="eye" className="w-3 h-3" />
                              View
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: WEEKLY MODULES & LECTURE HUB (MASTER-DETAIL) */}
            {activeTab === "modules" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
                
                {/* Left Rail: 12-Week Schedule (4 cols on lg) */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Icon name="layers" className="w-4 h-4 text-indigo-400" />
                          Curriculum Schedule
                        </h3>
                        <p className="text-[11px] text-slate-400">14-Week Curriculum (Weeks 0–13)</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setModuleFilter("all")}
                          className={`px-2 py-1 text-[11px] font-semibold rounded ${moduleFilter === "all" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                        >
                          All ({CURRICULUM_DATA.length})
                        </button>
                        <button
                          onClick={() => setModuleFilter("active")}
                          className={`px-2 py-1 text-[11px] font-semibold rounded ${moduleFilter === "active" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
                        >
                          Active (3)
                        </button>
                        <button
                          onClick={() => setModuleFilter("upcoming")}
                          className={`px-2 py-1 text-[11px] font-semibold rounded ${moduleFilter === "upcoming" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"}`}
                        >
                          Upcoming
                        </button>
                      </div>
                    </div>

                    {/* Schedule List */}
                    <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
                      {filteredWeeks.map((week) => {
                        const isSelected = selectedWeekId === week.id;
                        const isCompleted = completedWeeks.includes(week.id);
                        const isActiveStatus = week.status === "active";

                        return (
                          <div
                            key={week.id}
                            onClick={() => setSelectedWeekId(week.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                              isSelected
                                ? "bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-950/30 ring-1 ring-indigo-500/50"
                                : "bg-slate-950/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                  isActiveStatus
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : "bg-slate-800 text-slate-400"
                                }`}>
                                  W{String(week.id).padStart(2, '0')}
                                </span>
                                {isActiveStatus ? (
                                  <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Active
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-medium text-slate-500">
                                    Upcoming
                                  </span>
                                )}
                              </div>

                              {/* Completed checkmark button */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleWeekCompletion(week.id);
                                }}
                                className={`p-1 rounded transition-colors ${
                                  isCompleted ? "text-emerald-400" : "text-slate-600 hover:text-slate-400"
                                }`}
                                title={isCompleted ? "Completed" : "Mark completed"}
                              >
                                <Icon name={isCompleted ? "checkCircle" : "circle"} className="w-4 h-4" />
                              </button>
                            </div>

                            <h4 className={`mt-2 text-xs sm:text-sm font-bold leading-snug line-clamp-2 ${isSelected ? "text-white" : "text-slate-300"}`}>
                              {week.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                              {week.chineseTitle}
                            </p>

                            <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                              <span>{week.businessCases ? `${week.businessCases.length} Cases` : "Concepts"}</span>
                              {week.preReadingUrl ? (
                                <a
                                  href={week.preReadingUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-sky-400 hover:text-sky-200 font-medium flex items-center gap-1 transition-colors group/x"
                                  title="Read faculty pre-reading thread on X"
                                >
                                  <Icon name="xLogo" className="w-2.5 h-2.5 group-hover/x:scale-110 transition-transform" />
                                  <span>Pre-Reading on X</span>
                                  <Icon name="externalLink" className="w-2.5 h-2.5 opacity-70" />
                                </a>
                              ) : (
                                <span className="font-mono text-slate-500">{week.slidePath}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Panel: Detailed Workspace for Selected Week (8 cols on lg) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Module Header Banner */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
                          WEEK {String(selectedWeek.id).padStart(2, '0')}
                        </span>
                        {selectedWeek.status === "active" ? (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Active Module • Materials Live
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700 text-xs font-medium">
                            Upcoming — Materials Release Post-Session
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {selectedWeek.preReadingUrl && (
                          <a
                            href={selectedWeek.preReadingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-950/70 hover:bg-sky-900 text-sky-200 border border-sky-600/40 flex items-center gap-1.5 transition-all shadow-sm group"
                            title="Read professor's weekly pre-reading thread on X"
                          >
                            <Icon name="xLogo" className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                            <span>Pre-Reading on X</span>
                            <Icon name="externalLink" className="w-3 h-3 text-sky-400" />
                          </a>
                        )}
                        <button
                          onClick={() => toggleWeekCompletion(selectedWeek.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            completedWeeks.includes(selectedWeek.id)
                              ? "bg-emerald-950/60 text-emerald-300 border border-emerald-700"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                          }`}
                        >
                          <Icon name={completedWeeks.includes(selectedWeek.id) ? "checkCircle" : "circle"} className="w-4 h-4 text-emerald-400" />
                          {completedWeeks.includes(selectedWeek.id) ? "Module Completed" : "Mark as Completed"}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {selectedWeek.title}
                      </h2>
                      <p className="text-sm font-medium text-indigo-300 mt-1">
                        {selectedWeek.chineseTitle} • <span className="text-slate-400">{selectedWeek.duration}</span>
                      </p>
                    </div>

                    {/* Core Concepts Pill Shelf */}
                    <div className="mt-4 pt-4 border-t border-slate-800">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Core Concepts Covered:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedWeek.coreConcepts.map((concept, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-xs bg-slate-950 text-slate-300 border border-slate-800 font-medium"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ACTIVE MODULE WORKSPACE (Weeks 1 & 2) */}
                  {selectedWeek.status === "active" ? (
                    <div className="space-y-6">

                      {/* Sub-Tabs Navigation for Active Modules */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-sm">
                        <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800/80 overflow-x-auto">
                          <button
                            onClick={() => setWeekSubTab("recap")}
                            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                              weekSubTab === "recap"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
                            }`}
                          >
                            <Icon name="book" className="w-3.5 h-3.5" />
                            <span>Lecture Recap (課堂精華)</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-200 font-mono border border-indigo-700/50">
                              Full Text
                            </span>
                          </button>

                          <button
                            onClick={() => setWeekSubTab("case")}
                            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                              weekSubTab === "case"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
                            }`}
                          >
                            <Icon name="target" className="w-3.5 h-3.5" />
                            <span>Case & Payoff Model (案例)</span>
                          </button>

                          <button
                            onClick={() => setWeekSubTab("slides")}
                            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                              weekSubTab === "slides"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
                            }`}
                          >
                            <Icon name="fileText" className="w-3.5 h-3.5" />
                            <span>Slide Deck & Brief (簡報)</span>
                          </button>
                        </div>

                        {selectedWeek.recap && (
                          <div className="flex items-center gap-2 px-2 self-end sm:self-auto">
                            <a
                              href={selectedWeek.recap.markdownPath}
                              download={`${selectedWeek.recap.markdownPath.split('/').pop()}`}
                              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono flex items-center gap-1.5 border border-slate-700 transition-colors"
                              title="Download raw Markdown recap file"
                            >
                              <Icon name="download" className="w-3.5 h-3.5 text-indigo-400" />
                              <span>Download .md</span>
                            </a>
                            <button
                              onClick={() => copyRecapToClipboard(selectedWeek)}
                              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                              title="Copy core takeaway to clipboard"
                            >
                              <Icon name={copiedRecap ? "check" : "fileText"} className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{copiedRecap ? "Copied!" : "Copy Summary"}</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Faculty Pre-Reading on X Callout Banner */}
                      {selectedWeek.preReadingUrl && (
                        <div className="bg-sky-950/40 border border-sky-600/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
                              <Icon name="xLogo" className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-900/70 text-sky-300 border border-sky-700 font-bold uppercase">
                                  Faculty Pre-Reading
                                </span>
                                <span className="text-xs text-sky-400 font-medium">@kochiuyu on X</span>
                              </div>
                              <h4 className="text-sm font-bold text-white mt-1">
                                Week {selectedWeek.id} Recommended Reading & Case Primer
                              </h4>
                              <p className="text-xs text-slate-300 mt-0.5">
                                Prof. Chiu Yu Ko published the pedagogical notes and discussion questions for this session on X.
                              </p>
                            </div>
                          </div>
                          <a
                            href={selectedWeek.preReadingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-md shrink-0 hover:scale-[1.02]"
                          >
                            <Icon name="xLogo" className="w-3.5 h-3.5 text-slate-950" />
                            <span>Read on X</span>
                            <Icon name="externalLink" className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                      {/* SUB-TAB 1: LECTURE RECAP (課堂精華摘要) */}
                      {weekSubTab === "recap" && selectedWeek.recap && (
                        <div className="space-y-6 animate-fadeIn">
                          
                          {/* Academic Takeaway Quote Hero */}
                          <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-600/40 rounded-2xl p-6 sm:p-7 shadow-lg">
                            <div className="flex items-center gap-2 mb-2.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-300 font-bold">
                                Core Academic Takeaway • 教授核心總結
                              </span>
                            </div>

                            <blockquote className="text-base sm:text-xl font-bold text-white leading-relaxed italic">
                              "{selectedWeek.recap.academicTakeaway}"
                            </blockquote>

                            {selectedWeek.recap.chineseTakeaway && (
                              <p className="mt-2 text-xs sm:text-sm text-indigo-200/90 font-medium">
                                {selectedWeek.recap.chineseTakeaway}
                              </p>
                            )}

                            <div className="mt-4 pt-3 border-t border-indigo-800/40 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                              <span className="flex items-center gap-1.5">
                                <Icon name="clock" className="w-3.5 h-3.5 text-indigo-400" />
                                {selectedWeek.recap.readTime}
                              </span>
                              <span className="font-mono text-indigo-300">
                                Source: {selectedWeek.recap.markdownPath}
                              </span>
                            </div>

                            <div className="absolute right-0 top-0 -mt-8 -mr-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                          </div>

                          {/* Introduction Narrative */}
                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                              <Icon name="sparkles" className="w-4 h-4 text-indigo-400" />
                              Lecture Overview & Conceptual Foundations
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {selectedWeek.recap.intro}
                            </p>
                          </div>

                          {/* WEEK 0 RECAP SECTIONS */}
                          {selectedWeek.id === 0 && (
                            <div className="space-y-6">
                              {/* 1. Core Philosophy */}
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Section 01</span>
                                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    What Game Theory Is (and Is NOT) • 博弈論的科學定位
                                  </h3>
                                  <p className="text-xs text-slate-400">
                                    Distinguishing disciplined interactive decision-making from common executive misconceptions.
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-xs">✓</span>
                                      <h4 className="text-xs sm:text-sm font-bold text-emerald-200">What Game Theory IS:</h4>
                                    </div>
                                    <ul className="space-y-1.5 text-xs text-slate-300">
                                      <li className="flex items-start gap-1.5">
                                        <span className="text-emerald-400 font-bold">•</span>
                                        <span><strong>Formal Anticipation:</strong> Systematically reasoning through how competitors will respond before committing capital.</span>
                                      </li>
                                      <li className="flex items-start gap-1.5">
                                        <span className="text-emerald-400 font-bold">•</span>
                                        <span><strong>Equilibrium Detection:</strong> Identifying stable market states and anticipating mutual defection traps (e.g. price wars).</span>
                                      </li>
                                      <li className="flex items-start gap-1.5">
                                        <span className="text-emerald-400 font-bold">•</span>
                                        <span><strong>Incentive Architecture:</strong> Restructuring rules, commitments, and payoffs to steer collective behavior.</span>
                                      </li>
                                    </ul>
                                  </div>

                                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/40">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="w-6 h-6 rounded-lg bg-red-500/20 text-red-300 font-bold flex items-center justify-center text-xs">✕</span>
                                      <h4 className="text-xs sm:text-sm font-bold text-red-200">What Game Theory is NOT:</h4>
                                    </div>
                                    <ul className="space-y-1.5 text-xs text-slate-300">
                                      <li className="flex items-start gap-1.5">
                                        <span className="text-red-400 font-bold">•</span>
                                        <span><strong>Not a bag of tricks:</strong> It is not manipulative propaganda or psychological games to "crush" rivals.</span>
                                      </li>
                                      <li className="flex items-start gap-1.5">
                                        <span className="text-red-400 font-bold">•</span>
                                        <span><strong>No single magic bullet:</strong> It does not promise one dominant action works regardless of context.</span>
                                      </li>
                                      <li className="flex items-start gap-1.5">
                                        <span className="text-red-400 font-bold">•</span>
                                        <span><strong>Not detached math:</strong> Every symbol translates directly to prices, costs, market share, and enterprise value.</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* 2. 5-Step Strategic Diagnosis Framework */}
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Section 02</span>
                                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    The 5-Step Strategic Diagnosis Framework (五步驟策略診斷框架)
                                  </h3>
                                  <p className="text-xs text-slate-400">
                                    The disciplined roadmap applied to every case study, business war game, and market entry decision.
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                                  {[
                                    { num: "01", step: "Decision", tag: "定決策", desc: "Who must decide what? Formulate the focal strategic choice facing the firm." },
                                    { num: "02", step: "Game", tag: "辨博弈", desc: "Who are the competing players, and what actions are realistically accessible to each?" },
                                    { num: "03", step: "Structure", tag: "剖結構", desc: "Is timing simultaneous or sequential? What is the information transparency and payoff vectors?" },
                                    { num: "04", step: "Analysis", tag: "求均衡", desc: "Identify best responses, dominant strategies, and backward induction equilibria." },
                                    { num: "05", step: "Action", tag: "出建議", desc: "Formulate the executive recommendation and pinpoint critical assumptions that could alter it." }
                                  ].map((st, i) => (
                                    <div key={i} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
                                      <div>
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-xs font-mono font-bold text-indigo-400">{st.num}</span>
                                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{st.tag}</span>
                                        </div>
                                        <h4 className="text-sm font-bold text-white mb-1">{st.step}</h4>
                                        <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 3. Representation Match: Matrix vs. Tree */}
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Section 03</span>
                                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    Normal Form vs. Extensive Form • 選擇匹配真實時序的博弈表象
                                  </h3>
                                  <p className="text-xs text-slate-400">
                                    The golden modeling rule: Match the representation to the real timing and information structure of the market.
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-1.5">
                                        <Icon name="grid" className="w-4 h-4 text-indigo-400" />
                                        Payoff Matrix (Normal Form)
                                      </h4>
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300">Weeks 1 & 3</span>
                                    </div>
                                    <p className="text-xs text-slate-300 mb-2">
                                      <strong>When to Use:</strong> Simultaneous choices where firms act without observing rivals' current actions.
                                    </p>
                                    <ul className="text-xs text-slate-400 space-y-1">
                                      <li>• Retail daily price promotions & couponing</li>
                                      <li>• Sealed-bid procurement & spectrum auctions</li>
                                      <li>• Hyperscaler AI hardware capex allocation</li>
                                    </ul>
                                  </div>

                                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                                        <Icon name="gitBranch" className="w-4 h-4 text-emerald-400" />
                                        Game Tree (Extensive Form)
                                      </h4>
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">Weeks 2 & 5</span>
                                    </div>
                                    <p className="text-xs text-slate-300 mb-2">
                                      <strong>When to Use:</strong> Sequential decisions where later players observe earlier irreversible commitments.
                                    </p>
                                    <ul className="text-xs text-slate-400 space-y-1">
                                      <li>• New market entry vs. incumbent capacity deterrence</li>
                                      <li>• Technology platform pioneer vs. fast-follower timing</li>
                                      <li>• Multi-round M&A acquisition bargaining & regulatory review</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* WEEK 1 RECAP SECTIONS */}
                          {selectedWeek.id === 1 && (
                            <div className="space-y-6">
                              {/* 1. Basic Elements of a Game */}
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Section 01</span>
                                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    Basic Elements of a Game (博弈的三大基本要素)
                                  </h3>
                                  <p className="text-xs text-slate-400">
                                    Every interactive strategic dilemma reduces to three foundational building blocks.
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 hover:border-indigo-500/40 transition-all">
                                    <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-300 font-mono font-bold flex items-center justify-center text-xs mb-2">
                                      P
                                    </span>
                                    <h4 className="text-sm font-bold text-white">Players (參與者)</h4>
                                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                                      The individuals, competing firms, government regulators, or institutions making autonomous strategic decisions.
                                    </p>
                                  </div>

                                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 hover:border-indigo-500/40 transition-all">
                                    <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-300 font-mono font-bold flex items-center justify-center text-xs mb-2">
                                      S
                                    </span>
                                    <h4 className="text-sm font-bold text-white">Strategies (策略集)</h4>
                                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                                      The comprehensive actions and contingent plans available to each player under every possible market situation.
                                    </p>
                                  </div>

                                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 hover:border-indigo-500/40 transition-all">
                                    <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-300 font-mono font-bold flex items-center justify-center text-xs mb-2">
                                      π
                                    </span>
                                    <h4 className="text-sm font-bold text-white">Payoffs (支付與回報)</h4>
                                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                                      The multi-dimensional outcomes resulting from combinations of actions: profits, market share, reputation, and competitive survival.
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-4 p-3.5 bg-indigo-950/30 border border-indigo-800/50 rounded-xl text-xs text-indigo-200">
                                  <span className="font-bold text-white">Executive Insight: </span>
                                  In corporate boardrooms, strategic disagreements often occur not because leaders disagree on mathematics, but because different stakeholders weight payoffs differently (e.g., immediate quarterly EPS vs. multi-year customer lifetime retention).
                                </div>
                              </div>

                              {/* 2. Simultaneous vs Sequential Decisions */}
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Section 02</span>
                                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    Simultaneous and Sequential Decisions (決策時機結構)
                                  </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wide">
                                        Simultaneous-Move Games (同時決策)
                                      </h4>
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Normal Form (Matrix)</span>
                                    </div>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                      Each player selects their move without knowing what the other players have chosen. They do not have to occur at the exact same physical second; the defining feature is imperfect information regarding rivals' concurrent choices.
                                    </p>
                                  </div>

                                  <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wide">
                                        Sequential-Move Games (序貫決策)
                                      </h4>
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Extensive Form (Tree)</span>
                                    </div>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                      One player acts first, and subsequent players observe earlier actions before committing their responses. The sequence of moves introduces the power of strategic commitment and the risk of competitor preemption.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* 3. The Prisoner's Dilemma & Dominant Strategies */}
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Section 03</span>
                                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    The Prisoner's Dilemma & Dominant Strategies (囚徒困境)
                                  </h3>
                                </div>

                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                  A <span className="text-white font-semibold">dominant strategy</span> is an action that yields the highest payoff regardless of what the competitor selects. When both players follow strictly dominant individual incentives, they land in the prisoner's dilemma: an outcome strictly worse for both parties than mutual cooperation.
                                </p>

                                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-slate-950 to-slate-950 border border-red-800/40">
                                  <span className="text-red-400 font-mono text-xs font-bold uppercase tracking-wide">
                                    The Fundamental Strategic Law:
                                  </span>
                                  <p className="mt-1 text-sm sm:text-base font-bold text-red-100">
                                    "Individually rational decisions can produce a collectively undesirable outcome."
                                  </p>
                                  <p className="mt-1 text-xs text-slate-400">
                                    The dilemma is not caused by lack of intelligence or poor communication, but by the unilateral incentive to defect in the absence of binding enforcement.
                                  </p>
                                </div>
                              </div>

                              {/* 4. Interactive Real-World Business Applications Showcase */}
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Section 04</span>
                                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    6 Real-World Business Applications (六大商業實戰應用場景)
                                  </h3>
                                  <p className="text-xs text-slate-400">
                                    Explore how strategic interdependence shapes corporate decisions across industries.
                                  </p>
                                </div>

                                {/* Interactive Case Tabs */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-4">
                                  {[
                                    { name: "Price Wars", tag: "Duopoly Pricing" },
                                    { name: "Coupons", tag: "Food Delivery" },
                                    { name: "Advertising", tag: "Ad Spend Race" },
                                    { name: "Baggage Fees", tag: "Aviation" },
                                    { name: "Free Shipping", tag: "E-Commerce" },
                                    { name: "AI Capex", tag: "Tech Hardware" }
                                  ].map((tab, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => setActiveBizAppWeek1(idx)}
                                      className={`p-2.5 rounded-xl border text-left transition-all ${
                                        activeBizAppWeek1 === idx
                                          ? "bg-indigo-600 border-indigo-400 text-white shadow-md"
                                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                                      }`}
                                    >
                                      <span className="block text-[10px] font-mono opacity-80">{tab.tag}</span>
                                      <span className="block text-xs font-bold mt-0.5 truncate">{tab.name}</span>
                                    </button>
                                  ))}
                                </div>

                                {/* Active Case Content Card */}
                                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                                  {activeBizAppWeek1 === 0 && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-mono font-bold border border-red-500/30">
                                          Application 01
                                        </span>
                                        <h4 className="text-sm font-bold text-white">Price Competition in Concentrated Markets</h4>
                                      </div>
                                      <p className="text-xs text-slate-300 leading-relaxed">
                                        Two firms may both benefit from maintaining relatively high prices, but each firm faces an individual temptation to discount to steal price-sensitive customers. When both cut prices, neither wins market share, and both destroy operating margin.
                                      </p>
                                    </div>
                                  )}

                                  {activeBizAppWeek1 === 1 && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold border border-indigo-500/30">
                                          Application 02
                                        </span>
                                        <h4 className="text-sm font-bold text-white">Food-Delivery Coupon Warfare & Capital Depletion</h4>
                                      </div>
                                      <p className="text-xs text-slate-300 leading-relaxed">
                                        Aggressive couponing is each delivery platform's dominant strategy: if the competitor abstains, you capture massive volume; if they discount, failing to match costs you your active user base. Both burn capital on subsidizing identical meals.
                                      </p>
                                    </div>
                                  )}

                                  {activeBizAppWeek1 === 2 && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold border border-indigo-500/30">
                                          Application 03
                                        </span>
                                        <h4 className="text-sm font-bold text-white">Advertising Spending Wars (Coke vs. Pepsi)</h4>
                                      </div>
                                      <p className="text-xs text-slate-300 leading-relaxed">
                                        Competing firms advertise heavily because reducing ad budgets unilaterally results in lost brand salience. If both spend $500M annually, market share remains 50-50, and ad agencies capture the surplus.
                                      </p>
                                    </div>
                                  )}

                                  {activeBizAppWeek1 === 3 && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold border border-indigo-500/30">
                                          Application 04
                                        </span>
                                        <h4 className="text-sm font-bold text-white">Airline Baggage Fees & Unbundling</h4>
                                      </div>
                                      <p className="text-xs text-slate-300 leading-relaxed">
                                        Whether unbundling check-in baggage is profitable depends on whether rivals follow. If American Airlines institutes a fee and Delta/United match, the entire industry captures billions in ancillary revenue. If rivals maintain free bags to market customer goodwill, the first mover suffers customer revolt.
                                      </p>
                                    </div>
                                  )}

                                  {activeBizAppWeek1 === 4 && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold border border-indigo-500/30">
                                          Application 05
                                        </span>
                                        <h4 className="text-sm font-bold text-white">Free Shipping & Promotional Thresholds in E-Commerce</h4>
                                      </div>
                                      <p className="text-xs text-slate-300 leading-relaxed">
                                        Free shipping or threshold discounts temporarily expand cart sizes when pioneered by one platform. But once competitors imitate the policy, free shipping becomes an expected baseline cost of doing business rather than a differentiator.
                                      </p>
                                    </div>
                                  )}

                                  {activeBizAppWeek1 === 5 && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold border border-indigo-500/30">
                                          Application 06
                                        </span>
                                        <h4 className="text-sm font-bold text-white">Strategic Investment in AI Hardware Capex</h4>
                                      </div>
                                      <p className="text-xs text-slate-300 leading-relaxed">
                                        Hyperscalers (Microsoft, Google, Meta, Amazon) deploy tens of billions into GPU clusters not solely for immediate software revenue, but because failing to build computing capacity risks permanent obsolescence if rivals achieve generational model breakthroughs.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* 5. Repeated Games & Cartel Cooperation (OPEC) */}
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Section 05</span>
                                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    Cooperation, Repeated Interaction & OPEC Enforcement
                                  </h3>
                                </div>

                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                  In a one-shot dilemma, defection is unavoidable. However, business competition is rarely one-shot. When firms interact repeatedly, the <span className="text-white font-semibold">shadow of the future</span> creates possibilities for sustainable cooperation:
                                </p>

                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                                    <span className="text-indigo-400 font-bold text-xs block mb-1">1. Monitoring Systems</span>
                                    <p className="text-[11px] text-slate-400">
                                      Firms must detect cheating quickly. OPEC uses satellite tanker tracking to observe member quota violations.
                                    </p>
                                  </div>
                                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                                    <span className="text-indigo-400 font-bold text-xs block mb-1">2. Punitive Threats</span>
                                    <p className="text-[11px] text-slate-400">
                                      Credible retaliatory price cuts (e.g., Saudi Arabia flooding markets) punish defectors into compliance.
                                    </p>
                                  </div>
                                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                                    <span className="text-indigo-400 font-bold text-xs block mb-1">3. Future Horizon</span>
                                    <p className="text-[11px] text-slate-400">
                                      If the interaction has no known definite end date, long-term cooperation value outweighs one-time cheat gains.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* WEEK 2 RECAP SECTIONS */}
                          {selectedWeek.id === 2 && (
                            <div className="space-y-6">
                              {/* 1. Actions vs Strategies */}
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Section 01</span>
                                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    Actions vs. Strategies (行動與策略的本質差異)
                                  </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                                      Action (行動)
                                    </span>
                                    <h4 className="text-sm font-bold text-white">A Single Decision at One Node</h4>
                                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                                      An isolated choice executed at a specific decision point (e.g., choosing to "Enter" or "Stay Out").
                                    </p>
                                  </div>

                                  <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-700/50">
                                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                                      Strategy (策略)
                                    </span>
                                    <h4 className="text-sm font-bold text-white">A Complete Contingent Plan</h4>
                                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                                      A comprehensive blueprint detailing exactly what action the firm will execute at every conceivable decision point throughout the entire game tree.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* 2. Interactive Backward Induction Solver */}
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Section 02</span>
                                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    Interactive Backward Induction Algorithm (向後歸納法解析器)
                                  </h3>
                                  <p className="text-xs text-slate-400">
                                    Step through the market entry game tree to identify the subgame-perfect equilibrium.
                                  </p>
                                </div>

                                {/* Step Selector Pills */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {[
                                    { step: 0, title: "Step 0: Game Tree Overview" },
                                    { step: 1, title: "Step 1: Incumbent's Terminal Choice" },
                                    { step: 2, title: "Step 2: Entrant's Root Decision" },
                                    { step: 3, title: "Step 3: Subgame-Perfect Equilibrium" }
                                  ].map((item) => (
                                    <button
                                      key={item.step}
                                      onClick={() => setActiveInductionStep(item.step)}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                        activeInductionStep === item.step
                                          ? "bg-indigo-600 text-white shadow-md ring-1 ring-indigo-400"
                                          : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                                      }`}
                                    >
                                      {item.title}
                                    </button>
                                  ))}
                                </div>

                                {/* Visual Game Tree Display */}
                                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                                  {activeInductionStep === 0 && (
                                    <div className="space-y-3">
                                      <p className="text-slate-300 font-sans text-xs sm:text-sm">
                                        <span className="font-bold text-white">Full Game Tree:</span> Entrant moves first (Enter or Stay Out). If Entrant Enters, Incumbent chooses to Accommodate or Fight.
                                      </p>
                                      <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                                        <div>[Root: Entrant]</div>
                                        <div>├── Stay Out ─────────► Payoffs: (Entrant: $0M, Incumbent: $10M)</div>
                                        <div>└── Enter ────────────► [Node: Incumbent]</div>
                                        <div>                        ├── Accommodate ──► Payoffs: (Entrant: $4M, Incumbent: $5M)</div>
                                        <div>                        └── Fight ────────► Payoffs: (Entrant: -$2M, Incumbent: -$1M)</div>
                                      </div>
                                    </div>
                                  )}

                                  {activeInductionStep === 1 && (
                                    <div className="space-y-3">
                                      <p className="text-slate-300 font-sans text-xs sm:text-sm">
                                        <span className="font-bold text-indigo-400">Step 1 (Terminal Subgame):</span> Look at the Incumbent after Entry has occurred. Incumbent compares $5M (Accommodate) vs -$1M (Fight). Rational Incumbent strictly chooses Accommodate!
                                      </p>
                                      <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                                        <div className="text-slate-500">[Root: Entrant]</div>
                                        <div className="text-slate-500">└── Enter ──► [Node: Incumbent]</div>
                                        <div className="text-emerald-400 font-bold">              ├── Accommodate ──► ($4M, $5M)  ✓ OPTIMAL TERMINAL CHOICE (5 &gt; -1)</div>
                                        <div className="text-red-500/70 line-through">              └── Fight ────────► (-$2M, -$1M)  ✗ PRUNED (Dominated at this node)</div>
                                      </div>
                                    </div>
                                  )}

                                  {activeInductionStep === 2 && (
                                    <div className="space-y-3">
                                      <p className="text-slate-300 font-sans text-xs sm:text-sm">
                                        <span className="font-bold text-indigo-400">Step 2 (Root Node):</span> Roll back to Entrant. Knowing Incumbent will Accommodate if Entry occurs, Entrant compares entering ($4M) vs staying out ($0M). 4 &gt; 0, so Entrant Enters!
                                      </p>
                                      <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                                        <div className="text-white font-bold">[Root: Entrant]</div>
                                        <div className="text-emerald-400 font-bold">├── Enter ────────► (Entrant receives $4M)  ✓ OPTIMAL ROOT CHOICE (4 &gt; 0)</div>
                                        <div className="text-red-500/70 line-through">└── Stay Out ─────► ($0M, $10M)  ✗ PRUNED</div>
                                      </div>
                                    </div>
                                  )}

                                  {activeInductionStep === 3 && (
                                    <div className="space-y-3">
                                      <p className="text-slate-300 font-sans text-xs sm:text-sm">
                                        <span className="font-bold text-emerald-400">Subgame-Perfect Equilibrium Reached:</span> (Enter, Accommodate). The Incumbent's prior threat to fight was non-credible cheap talk!
                                      </p>
                                      <div className="p-4 bg-emerald-950/40 rounded-lg border border-emerald-700/60 text-emerald-200">
                                        <div>Equilibrium Path: Entrant Enters ──► Incumbent Accommodates</div>
                                        <div>Final Payouts: Entrant: $4M | Incumbent: $5M</div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* 3. First-Mover vs Second-Mover Advantages Matrix */}
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Section 03</span>
                                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    First-Mover vs. Second-Mover Timing Tradeoffs
                                  </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                                        First-Mover Advantage (先行者優勢)
                                      </h4>
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300">Commitment Power</span>
                                    </div>
                                    <ul className="space-y-1.5 text-xs text-slate-300">
                                      <li className="flex items-start gap-1.5">
                                        <span className="text-indigo-400 font-bold">•</span>
                                        <span>Locking in distribution channels and prime geographic real estate</span>
                                      </li>
                                      <li className="flex items-start gap-1.5">
                                        <span className="text-indigo-400 font-bold">•</span>
                                        <span>Setting proprietary technical standards (e.g. EV charging protocol)</span>
                                      </li>
                                      <li className="flex items-start gap-1.5">
                                        <span className="text-indigo-400 font-bold">•</span>
                                        <span>Preempting rival scale and achieving early learning curve cost reductions</span>
                                      </li>
                                    </ul>
                                  </div>

                                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                                        Second-Mover Advantage (後發者優勢)
                                      </h4>
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">Informational Option</span>
                                    </div>
                                    <ul className="space-y-1.5 text-xs text-slate-300">
                                      <li className="flex items-start gap-1.5">
                                        <span className="text-emerald-400 font-bold">•</span>
                                        <span>Observing pioneer's technological errors and customer feedback</span>
                                      </li>
                                      <li className="flex items-start gap-1.5">
                                        <span className="text-emerald-400 font-bold">•</span>
                                        <span>Avoiding massive exploratory R&D and regulatory pioneer friction</span>
                                      </li>
                                      <li className="flex items-start gap-1.5">
                                        <span className="text-emerald-400 font-bold">•</span>
                                        <span>Entering with superior, second-generation lower-cost product architecture</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* 4. Practical Role of Economic Models */}
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Section 04</span>
                                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                                    The Practical Role of Economic Models in Corporate Strategy
                                  </h3>
                                </div>

                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                  Game theoretic models are not designed to capture every detail of reality. Instead, like an architectural blueprint or transit map, they isolate key variables (timing, payoff asymmetry, informational transparency) to reveal counter-intuitive strategic realities that intuition alone would miss.
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Quick Jump Buttons to Case Study & Quiz */}
                          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold text-white">Ready to apply these frameworks?</p>
                              <p className="text-[11px] text-slate-400">Solve the Harvard/Stanford business case or test your analytical precision.</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setWeekSubTab("case")}
                                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                              >
                                <span>Solve Case Analysis</span>
                                <Icon name="chevronRight" className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setActiveTab("quizzes")}
                                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
                              >
                                <Icon name="checkCircle" className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Take Strategic Quiz</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 3: SLIDE DECK & EXECUTIVE SUMMARY */}
                      {weekSubTab === "slides" && (
                        <div className="space-y-6 animate-fadeIn">
                          {/* 1. Executive Summary: 3 Concise Managerial Takeaways */}
                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                            <Icon name="sparkles" className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-white">Executive Summary</h3>
                            <p className="text-xs text-slate-400">3 Strategic Takeaways for Senior Business Leadership</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {selectedWeek.executiveSummary.map((item, idx) => {
                            const [heading, ...rest] = item.split(":");
                            return (
                              <div
                                key={idx}
                                className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all"
                              >
                                <div>
                                  <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 text-xs font-mono font-bold flex items-center justify-center mb-2">
                                    0{idx + 1}
                                  </span>
                                  <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wide">
                                    {heading}
                                  </h4>
                                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                                    {rest.join(":")}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2. Lecture Deck Card: Relative Link & Embedded Preview Mockup */}
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-800">
                          <div>
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                              <Icon name="fileText" className="w-5 h-5 text-indigo-400" />
                              Official Slide Deck & Lecture Materials
                            </h3>
                            <p className="text-xs text-slate-400">
                              Configured with relative path <code className="text-indigo-300 font-mono">{selectedWeek.slidePath}</code>
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={selectedWeek.slidePath}
                              download
                              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-md transition-all"
                            >
                              <Icon name="download" className="w-4 h-4" />
                              Download Presentation PDF
                            </a>
                            <button
                              onClick={() => setEmbeddedSlideMode(!embeddedSlideMode)}
                              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                                embeddedSlideMode
                                  ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                              }`}
                            >
                              <Icon name="eye" className="w-4 h-4 text-indigo-300" />
                              {embeddedSlideMode ? "Show Slide Card" : "Live Slide Viewer"}
                            </button>
                            <button
                              onClick={() => setSlideModalWeek(selectedWeek)}
                              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
                              title="Inspect in full modal"
                            >
                              <Icon name="externalLink" className="w-4 h-4 text-indigo-400" />
                              Full Modal
                            </button>
                          </div>
                        </div>

                        {/* Presentation View: Either Live Iframe or Executive Card */}
                        {embeddedSlideMode ? (
                          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-2 sm:p-3 space-y-2">
                            <div className="flex items-center justify-between px-2 text-xs text-slate-400 font-mono">
                              <span>Live Presentation Reader: {selectedWeek.slidePath}</span>
                              <a
                                href={selectedWeek.slidePath}
                                target="_blank"
                                rel="noreferrer"
                                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                              >
                                Pop out in browser
                                <Icon name="externalLink" className="w-3 h-3" />
                              </a>
                            </div>
                            <div className="w-full h-[520px] sm:h-[640px] rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
                              <iframe
                                src={selectedWeek.slidePath}
                                className="w-full h-full border-0"
                                title={`Live Deck for ${selectedWeek.title}`}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4 sm:p-5">
                            <div className="aspect-[16/9] w-full rounded-lg bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950/60 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-inner">
                              <div className="flex items-center justify-between z-10">
                                <span className="text-xs font-mono text-indigo-400 font-bold tracking-widest uppercase">
                                  STRATEGIC THINKING • EXECUTIVE SLIDE DECK
                                </span>
                                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                                  {selectedWeek.pageCount} SLIDES • 16:9 HD
                                </span>
                              </div>

                              <div className="z-10 my-auto">
                                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                                  WEEK {selectedWeek.id} CORE LECTURE
                                </span>
                                <h4 className="text-lg sm:text-2xl font-black text-white mt-1 max-w-xl">
                                  {selectedWeek.title}
                                </h4>
                                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
                                  {selectedWeek.chineseTitle}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {selectedWeek.businessCases.map((bCase, i) => (
                                    <span key={i} className="text-[10px] bg-slate-900/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                                      {bCase}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 z-10 pt-4 border-t border-slate-800/80">
                                <span className="font-mono">Path: {selectedWeek.slidePath}</span>
                                <button
                                  onClick={() => setEmbeddedSlideMode(true)}
                                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 self-start sm:self-auto"
                                >
                                  Switch to Live Slide Viewer inside this page
                                  <Icon name="chevronRight" className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              
                              <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 2: CASE STUDY & PAYOFF MATRIX / TREE */}
                  {weekSubTab === "case" && selectedWeek.caseAnalysis && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5 animate-fadeIn">
                          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div>
                              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                                Harvard / Stanford MBA Case Method
                              </span>
                              <h3 className="text-lg font-bold text-white mt-0.5">
                                {selectedWeek.caseAnalysis.title}
                              </h3>
                              <p className="text-xs text-slate-400">{selectedWeek.caseAnalysis.subtitle}</p>
                            </div>
                            <span className="px-2 py-1 bg-indigo-500/10 text-indigo-300 text-xs font-semibold rounded border border-indigo-500/30">
                              Interactive Case
                            </span>
                          </div>

                          {/* Scenario Narrative */}
                          <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
                            <p>{selectedWeek.caseAnalysis.scenario}</p>
                            {selectedWeek.caseAnalysis.treeDescription && (
                              <div className="mt-3 p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-indigo-300">
                                <span className="font-bold text-slate-200">Extensive Decision Tree:</span> {selectedWeek.caseAnalysis.treeDescription}
                              </div>
                            )}
                          </div>

                          {/* Payoff Matrix Table if present */}
                          {selectedWeek.caseAnalysis.matrix && (
                            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                  Strategic Payoff Matrix (Profits in Billions)
                                </p>
                                <span className="text-[11px] text-indigo-400 font-mono">
                                  Click any cell to inspect incentives
                                </span>
                              </div>
                              <table className="w-full text-xs text-center border-collapse">
                                <thead>
                                  <tr>
                                    <th className="p-2 border border-slate-800 bg-slate-900 text-slate-400 font-mono">
                                      {selectedWeek.caseAnalysis.matrix.player1} \ {selectedWeek.caseAnalysis.matrix.player2}
                                    </th>
                                    <th className="p-2 border border-slate-800 bg-slate-900 text-indigo-300 font-bold">
                                      {selectedWeek.caseAnalysis.matrix.actions[0]}
                                    </th>
                                    <th className="p-2 border border-slate-800 bg-slate-900 text-indigo-300 font-bold">
                                      {selectedWeek.caseAnalysis.matrix.actions[1]}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* Row 0: Normal */}
                                  <tr>
                                    <td className="p-2 border border-slate-800 bg-slate-900 font-bold text-indigo-300">
                                      {selectedWeek.caseAnalysis.matrix.actions[0]}
                                    </td>
                                    {/* Cell (0, 0) */}
                                    <td
                                      onClick={() => setCaseCellSelected([0, 0])}
                                      className={`p-3 border border-slate-800 font-mono cursor-pointer transition-all ${
                                        caseCellSelected[0] === 0 && caseCellSelected[1] === 0
                                          ? "bg-indigo-950/80 ring-2 ring-indigo-400"
                                          : "bg-slate-950/80 hover:bg-slate-900"
                                      }`}
                                    >
                                      <span className="text-emerald-400 font-bold">{selectedWeek.caseAnalysis.matrix.payoffs[0][0][0]}</span>
                                      <span className="text-slate-500"> , </span>
                                      <span className="text-sky-400 font-bold">{selectedWeek.caseAnalysis.matrix.payoffs[0][0][1]}</span>
                                      <div className="text-[10px] text-slate-400 font-sans mt-0.5">Joint Welfare Max</div>
                                    </td>
                                    {/* Cell (0, 1) */}
                                    <td
                                      onClick={() => setCaseCellSelected([0, 1])}
                                      className={`p-3 border border-slate-800 font-mono cursor-pointer transition-all ${
                                        caseCellSelected[0] === 0 && caseCellSelected[1] === 1
                                          ? "bg-indigo-950/80 ring-2 ring-indigo-400"
                                          : "bg-slate-950/80 hover:bg-slate-900"
                                      }`}
                                    >
                                      <span className="text-red-400 font-bold">{selectedWeek.caseAnalysis.matrix.payoffs[0][1][0]}</span>
                                      <span className="text-slate-500"> , </span>
                                      <span className="text-emerald-400 font-bold">{selectedWeek.caseAnalysis.matrix.payoffs[0][1][1]}</span>
                                      <div className="text-[10px] text-slate-500 font-sans mt-0.5">Pepsi Preempts</div>
                                    </td>
                                  </tr>
                                  {/* Row 1: Aggressive */}
                                  <tr>
                                    <td className="p-2 border border-slate-800 bg-slate-900 font-bold text-indigo-300">
                                      {selectedWeek.caseAnalysis.matrix.actions[1]}
                                    </td>
                                    {/* Cell (1, 0) */}
                                    <td
                                      onClick={() => setCaseCellSelected([1, 0])}
                                      className={`p-3 border border-slate-800 font-mono cursor-pointer transition-all ${
                                        caseCellSelected[0] === 1 && caseCellSelected[1] === 0
                                          ? "bg-indigo-950/80 ring-2 ring-indigo-400"
                                          : "bg-slate-950/80 hover:bg-slate-900"
                                      }`}
                                    >
                                      <span className="text-emerald-400 font-bold">{selectedWeek.caseAnalysis.matrix.payoffs[1][0][0]}</span>
                                      <span className="text-slate-500"> , </span>
                                      <span className="text-red-400 font-bold">{selectedWeek.caseAnalysis.matrix.payoffs[1][0][1]}</span>
                                      <div className="text-[10px] text-slate-500 font-sans mt-0.5">Coke Preempts</div>
                                    </td>
                                    {/* Cell (1, 1) */}
                                    <td
                                      onClick={() => setCaseCellSelected([1, 1])}
                                      className={`p-3 border border-slate-800 font-mono cursor-pointer transition-all ${
                                        caseCellSelected[0] === 1 && caseCellSelected[1] === 1
                                          ? "bg-indigo-950/90 ring-2 ring-amber-400"
                                          : "bg-indigo-950/30 ring-1 ring-indigo-500/40 hover:bg-indigo-950/60"
                                      }`}
                                    >
                                      <span className="text-amber-400 font-bold">{selectedWeek.caseAnalysis.matrix.payoffs[1][1][0]}</span>
                                      <span className="text-slate-500"> , </span>
                                      <span className="text-amber-400 font-bold">{selectedWeek.caseAnalysis.matrix.payoffs[1][1][1]}</span>
                                      <div className="text-[10px] text-amber-300 font-bold font-sans mt-0.5">★ Nash Equilibrium</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              {/* Interactive Cell Inspector Box */}
                              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs leading-relaxed">
                                {caseCellSelected[0] === 0 && caseCellSelected[1] === 0 && (
                                  <div>
                                    <span className="font-bold text-emerald-300">[Normal, Normal] — Collusive Maximum ($4.0B, $4.0B): </span>
                                    <span className="text-slate-300">
                                      Joint industry profits are maximized at $8.0B total. However, this is NOT a Nash equilibrium; either firm can defect by going Aggressive to steal market share and boost profits to $4.5B. Without a binding cartel or anti-trust exemption, defection is inevitable.
                                    </span>
                                  </div>
                                )}
                                {caseCellSelected[0] === 0 && caseCellSelected[1] === 1 && (
                                  <div>
                                    <span className="font-bold text-amber-300">[Normal, Aggressive] — Asymmetric Defection ($2.0B, $4.5B): </span>
                                    <span className="text-slate-300">
                                      Pepsi captures decisive market share ($4.5B) while Coca-Cola is caught flat-footed ($2.0B). Coca-Cola's immediate best response is to counter with Aggressive ad spend, shifting the outcome to [Aggressive, Aggressive] ($2.5B).
                                    </span>
                                  </div>
                                )}
                                {caseCellSelected[0] === 1 && caseCellSelected[1] === 0 && (
                                  <div>
                                    <span className="font-bold text-amber-300">[Aggressive, Normal] — Asymmetric Defection ($4.5B, $2.0B): </span>
                                    <span className="text-slate-300">
                                      Coca-Cola aggressively promotes and earns $4.5B, taking market share from passive Pepsi ($2.0B). Pepsi's rational response is to retaliate with Aggressive ad spend, shifting the outcome to [Aggressive, Aggressive] ($2.5B).
                                    </span>
                                  </div>
                                )}
                                {caseCellSelected[0] === 1 && caseCellSelected[1] === 1 && (
                                  <div>
                                    <span className="font-bold text-amber-300">[Aggressive, Aggressive] — Nash Equilibrium ($2.5B, $2.5B): </span>
                                    <span className="text-slate-300">
                                      The unique pure Nash equilibrium. Aggressive advertising is a strictly dominant strategy for both firms. Neither firm can unilaterally switch to Normal without sacrificing profit ($2.0B &lt; $2.5B). The duopoly collectively burns $3.0B in defensive marketing.
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Student Editable Response Box with LocalStorage Persistence */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                                <Icon name="fileText" className="w-4 h-4 text-indigo-400" />
                                Your Executive Case Note & Strategic Solution:
                              </label>
                              <div className="flex items-center gap-2">
                                {saveStatus[selectedWeek.id] === "saving" && (
                                  <span className="text-xs text-amber-400 flex items-center gap-1 font-mono">
                                    <Icon name="refresh" className="w-3 h-3 animate-spin" /> Saving...
                                  </span>
                                )}
                                {saveStatus[selectedWeek.id] === "saved" && (
                                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                                    <Icon name="check" className="w-3 h-3" /> Saved to Vault
                                  </span>
                                )}
                                <button
                                  onClick={() => triggerManualSave(selectedWeek.id)}
                                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded border border-slate-700 flex items-center gap-1 transition-all"
                                >
                                  <Icon name="save" className="w-3.5 h-3.5" />
                                  Save Draft
                                </button>
                              </div>
                            </div>

                            <textarea
                              rows={5}
                              value={caseNotes[selectedWeek.id] || ""}
                              onChange={(e) => handleNoteChange(selectedWeek.id, e.target.value)}
                              placeholder="Draft your executive response. How does backward induction or dominant strategy logic predict the rival's move? How can your company escape destructive competition?"
                              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans leading-relaxed"
                            />
                            <div className="flex items-center justify-between text-[11px] text-slate-500">
                              <span>Auto-saves to browser storage as you type</span>
                              <span className="font-mono">
                                {(caseNotes[selectedWeek.id] || "").length} characters
                              </span>
                            </div>
                          </div>

                          {/* Collapsible Solution Toggle */}
                          <div className="pt-2 border-t border-slate-800">
                            <button
                              onClick={() => toggleSolution(selectedWeek.id)}
                              className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-indigo-300 font-semibold text-xs sm:text-sm flex items-center justify-between transition-all border border-slate-700"
                            >
                              <span className="flex items-center gap-2">
                                <Icon name={revealedSolutions[selectedWeek.id] ? "eyeOff" : "eye"} className="w-4 h-4 text-indigo-400" />
                                {revealedSolutions[selectedWeek.id]
                                  ? "Hide Strategic Solution & Equilibrium Logic"
                                  : "Reveal Strategic Solution & Equilibrium (Faculty Benchmark)"}
                              </span>
                              <Icon
                                name="chevronDown"
                                className={`w-4 h-4 transition-transform ${revealedSolutions[selectedWeek.id] ? "rotate-180" : ""}`}
                              />
                            </button>

                            {revealedSolutions[selectedWeek.id] && (
                              <div className="mt-3 p-4 sm:p-5 rounded-xl bg-indigo-950/30 border border-indigo-700/50 text-xs sm:text-sm space-y-3 animate-fadeIn">
                                <div>
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                                    Equilibrium Result
                                  </span>
                                  <h5 className="font-bold text-white text-sm sm:text-base mt-0.5">
                                    {selectedWeek.caseAnalysis.solution.equilibrium}
                                  </h5>
                                </div>
                                <p className="text-slate-300 leading-relaxed">
                                  {selectedWeek.caseAnalysis.solution.breakdown}
                                </p>
                                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-indigo-200">
                                  <span className="font-bold text-white">Executive Action Rule: </span>
                                  {selectedWeek.caseAnalysis.solution.managerialTakeaway}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* UPCOMING MODULE PREVIEW (Weeks 3-13) */
                    <div className="space-y-6">
                      
                      {/* Pre-Reading Announcement on X Banner */}
                      {selectedWeek.preReadingUrl && (
                        <div className="bg-gradient-to-r from-sky-950/70 via-slate-900 to-indigo-950/50 border border-sky-600/50 rounded-2xl p-6 shadow-lg">
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                <Icon name="xLogo" className="w-6 h-6" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-900/80 text-sky-300 border border-sky-700 font-bold uppercase">
                                    Official Pre-Reading Released
                                  </span>
                                  <span className="text-xs text-sky-400 font-medium">@kochiuyu on X</span>
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-white mt-1.5">
                                  Week {selectedWeek.id} Strategic Reading & Analytical Framework
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed max-w-2xl">
                                  Prof. Chiu Yu Ko has uploaded the dedicated pre-reading briefing for this module on X. Read through the core dilemmas and real-world market cases before attending class.
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto shrink-0">
                              <a
                                href={selectedWeek.preReadingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 sm:flex-initial px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-950/40 transition-all hover:scale-[1.02]"
                              >
                                <Icon name="xLogo" className="w-4 h-4 text-slate-950" />
                                <span>Read Pre-Reading on X</span>
                                <Icon name="externalLink" className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
                          <Icon name="clock" className="w-6 h-6" />
                        </div>
                        <div className="max-w-md mx-auto">
                          <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                            Upcoming — Materials Release Post-Session
                          </span>
                          <h3 className="text-lg font-bold text-white mt-3">
                            Session Scheduled on Course Calendar
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                            {selectedWeek.upcomingNote || "Full interactive cases, slide deck releases, and numerical problem sets will be unlocked following the live seminar session."}
                          </p>
                        </div>

                        {/* Course Slide Deck Download */}
                        <div className="pt-2 flex justify-center items-center">
                          <a
                            href={selectedWeek.slidePath}
                            download
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md transition-all"
                          >
                            <Icon name="download" className="w-4 h-4" />
                            Download Course Slide Deck ({selectedWeek.slidePath})
                          </a>
                        </div>
                      </div>

                      {/* Business Cases Preview for Upcoming Week */}
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                          Featured Business Case Studies (Upcoming)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedWeek.businessCases.map((bCase, i) => (
                            <div
                              key={i}
                              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3"
                            >
                              <span className="w-6 h-6 rounded-lg bg-indigo-900/50 text-indigo-300 text-xs font-mono font-bold flex items-center justify-center">
                                {i + 1}
                              </span>
                              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                                {bCase}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Student Pre-Reading Personal Notes Box */}
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                            <Icon name="fileText" className="w-4 h-4 text-indigo-400" />
                            Pre-Session Questions & Reading Notes (Week {selectedWeek.id})
                          </label>
                          <span className="text-[11px] text-slate-500 font-mono">Persisted locally</span>
                        </div>
                        <textarea
                          rows={4}
                          value={caseNotes[selectedWeek.id] || ""}
                          onChange={(e) => handleNoteChange(selectedWeek.id, e.target.value)}
                          placeholder="Record key questions, industry dilemmas, or preliminary thoughts prior to attending the session..."
                          className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* VIEW 3: INTERACTIVE STRATEGY QUIZZES */}
            {activeTab === "quizzes" && (
              <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
                {/* Quiz Header Banner */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold mb-2">
                      <Icon name="award" className="w-3.5 h-3.5 text-indigo-400" />
                      Executive Strategy Assessment (Weeks 1 & 2)
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Interactive Strategic Decision Scenarios
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Evaluate business dilemmas using formal game theory: dominant strategy equilibria and backward induction.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <div className="text-right">
                      <div className="text-2xl font-black text-white font-mono leading-none">
                        {quizStats.correct} / {quizStats.total}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">Mastery: {quizStats.scorePct}%</div>
                    </div>
                    <button
                      onClick={handleResetAllQuizzes}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 text-xs flex items-center gap-1"
                      title="Reset Quiz Attempts"
                    >
                      <Icon name="refresh" className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Cards List */}
                <div className="space-y-6">
                  {QUIZ_QUESTIONS.map((q, idx) => {
                    const isSubmitted = !!quizSubmitted[q.id];
                    const selectedOpt = quizAnswers[q.id];
                    const isCorrect = selectedOpt === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className={`bg-slate-900 border rounded-2xl p-6 shadow-sm transition-all ${
                          isSubmitted
                            ? isCorrect
                              ? "border-emerald-800/80 bg-gradient-to-b from-slate-900 to-emerald-950/10"
                              : "border-red-900/60 bg-gradient-to-b from-slate-900 to-red-950/10"
                            : "border-slate-800"
                        }`}
                      >
                        {/* Header info */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-semibold text-indigo-300 font-mono">
                              {q.weekTag}
                            </span>
                          </div>
                          {isSubmitted && (
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                              isCorrect
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-red-500/20 text-red-300 border border-red-500/30"
                            }`}>
                              {isCorrect ? "CORRECT EQUILIBRIUM" : "SUBOPTIMAL MOVE"}
                            </span>
                          )}
                        </div>

                        {/* Title & Scenario */}
                        <div className="mt-4">
                          <h4 className="text-base sm:text-lg font-bold text-white">
                            {q.title}
                          </h4>
                          <div className="mt-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {q.scenario}
                          </div>
                          <p className="mt-3 text-xs sm:text-sm font-bold text-slate-200">
                            {q.question}
                          </p>
                        </div>

                        {/* Multiple Choice Options */}
                        <div className="mt-4 space-y-2.5">
                          {q.options.map((opt, oIdx) => {
                            const isChosen = selectedOpt === oIdx;
                            let btnStyle = "bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40";

                            if (isSubmitted) {
                              if (oIdx === q.correctIndex) {
                                btnStyle = "bg-emerald-950/40 border-emerald-600 text-emerald-200 ring-1 ring-emerald-500";
                              } else if (isChosen && !isCorrect) {
                                btnStyle = "bg-red-950/40 border-red-600 text-red-200 ring-1 ring-red-500";
                              } else {
                                btnStyle = "bg-slate-950/30 border-slate-900 text-slate-500 opacity-60";
                              }
                            } else if (isChosen) {
                              btnStyle = "bg-indigo-950/50 border-indigo-500 text-white ring-1 ring-indigo-500";
                            }

                            return (
                              <button
                                key={oIdx}
                                type="button"
                                disabled={isSubmitted}
                                onClick={() => handleQuizSelect(q.id, oIdx)}
                                className={`w-full text-left p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                              >
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-bold mt-0.5 shrink-0 ${
                                  isChosen
                                    ? isSubmitted
                                      ? isCorrect
                                        ? "bg-emerald-500 text-white"
                                        : "bg-red-500 text-white"
                                      : "bg-indigo-600 text-white"
                                    : "bg-slate-800 text-slate-400"
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span className="leading-snug">{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Action buttons or Feedback Explanation */}
                        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                          {!isSubmitted ? (
                            <button
                              type="button"
                              onClick={() => handleQuizSubmit(q.id)}
                              disabled={selectedOpt === undefined}
                              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                                selectedOpt !== undefined
                                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
                                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
                              }`}
                            >
                              Submit Executive Decision
                            </button>
                          ) : (
                            <div className="w-full space-y-3">
                              <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                                isCorrect
                                  ? "bg-emerald-950/30 border border-emerald-700/50 text-emerald-200"
                                  : "bg-red-950/30 border border-red-700/50 text-red-200"
                              }`}>
                                <div className="font-bold flex items-center gap-1.5 mb-1 text-white">
                                  <Icon name={isCorrect ? "checkCircle" : "helpCircle"} className="w-4 h-4 text-indigo-400" />
                                  Strategic Equilibrium Explanation:
                                </div>
                                <p className="text-slate-200">{q.rationale}</p>
                              </div>
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => handleResetQuiz(q.id)}
                                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-medium"
                                >
                                  <Icon name="refresh" className="w-3.5 h-3.5" />
                                  Retry this scenario
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VIEW 4: SIMULATIONS & TOOLS SHELF */}
            {activeTab === "reference" && (
              <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Curated Simulations & Decision Reference Shelf
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Direct access to game theory sandboxes, behavioral economic tools, and video briefings.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* DOTE 3090 Simulator Feature Card */}
                  <div className="md:col-span-2 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-700/60 rounded-2xl p-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
                          Recommended Primary Lab
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white mt-2">
                          DOTE 3090: Strategic Interactive Simulations
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                          Developed by Prof. Chiu Yu Ko for applied game theory education. Provides live multi-user environments for beauty contests, ultimatum bargaining, Cournot quantity competition, and repeated coordination dilemmas.
                        </p>
                      </div>
                      <a
                        href="https://kochiuyu.github.io/dote3090/"
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 whitespace-nowrap self-start sm:self-auto"
                      >
                        Launch Interactive Lab
                        <Icon name="externalLink" className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Embedded 2x2 Matrix Strategy Simulator */}
                  <div className="md:col-span-2">
                    <PayoffMatrixSimulator />
                  </div>

                  {/* Video Dilemma Cases */}
                  {REFERENCE_TOOLS.slice(1).map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-semibold">
                            {item.badge}
                          </span>
                          <span className="text-[11px] text-slate-500 uppercase">{item.type}</span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-2.5 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5"
                        >
                          <Icon name="play" className="w-3.5 h-3.5" />
                          Watch Video Analysis
                          <Icon name="externalLink" className="w-3 h-3 ml-0.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

          {/* SLIDE MODAL VIEWER */}
          {slideModalWeek && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-fadeIn">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                      <Icon name="fileText" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                          Week {slideModalWeek.id} Slide Deck
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {slideModalWeek.pageCount || 45} Slides
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-tight mt-0.5">
                        {slideModalWeek.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSlideModalWeek(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Close viewer"
                  >
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                {/* Embedded PDF Viewer */}
                <div className="flex-1 w-full min-h-[350px] sm:min-h-[480px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
                  <iframe
                    src={slideModalWeek.slidePath}
                    className="w-full h-full min-h-[350px] sm:min-h-[480px] border-0"
                    title={`Slides for ${slideModalWeek.title}`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono truncate max-w-xs">{slideModalWeek.slidePath}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">Native PDF Render</span>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <a
                      href={slideModalWeek.slidePath}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 border border-slate-700 transition-all"
                    >
                      <Icon name="externalLink" className="w-3.5 h-3.5 text-indigo-400" />
                      Open in New Tab
                    </a>
                    <a
                      href={slideModalWeek.slidePath}
                      download
                      className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
                    >
                      <Icon name="download" className="w-3.5 h-3.5" />
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-400">Strategic Thinking: Game Theory for Business Strategy</span>
                <span>•</span>
                <span>商業策略博弈論</span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span>Zero-Build Single File index.html</span>
                <span>•</span>
                <span>GitHub Pages Ready</span>
                <span>•</span>
                <a href="https://kochiuyu.github.io/dote3090/" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                  DOTE 3090 Lab
                </a>
              </div>
            </div>
          </footer>

        </div>
      );
    }

    // Render the React 18 root

export default App;
