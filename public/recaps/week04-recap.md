# Course Recap: Mixed Strategies & Strategic Randomisation

The fourth class in **DOTE 3090: Strategic Thinking (Game Theory for Business Strategy)**, instructed by **Prof. Chiu Yu Ko** at **CUHK Business School**, directly addressed the fundamental strategic dilemma: **what should an executive do when no pure-strategy Nash equilibrium exists?** When deterministic actions create predictable vulnerabilities that competitors can exploit, rational play requires **deliberate strategic randomisation** (Mixed Strategies).

> **Core Maxim:** *"When predictability makes you exploitable, randomisation can be rational."* — Prof. Chiu Yu Ko

---

### 1. Opening Intuition: From Rock-Paper-Scissors to Cyclic Instability

In sequential games (Week 2), players look ahead and reason backward. In simultaneous games with pure strategies (Week 3), players identify best responses and seek stable cells. But what happens when best responses form an endless cycle?

#### The Rock-Paper-Scissors Dilemma (Slide 3)
- Rock is beaten by Paper; Paper is beaten by Scissors; Scissors is beaten by Rock.
- Always playing Rock is exploitable; always playing Paper is exploitable; always playing Scissors is exploitable.
- **The Only Stable Behavior:** Play each action with probability $\frac{1}{3}$. When the opponent cannot forecast your action, they cannot profit from targeting a counter-move.
- **Insight:** Randomisation is not careless gambling; it is a calculated commitment that **removes the exploitable pattern**.

---

### 2. The Core Lecture Case: Coffee Chain Promotion Timing (Slides 5–13)

To ground mixed strategies in competitive business strategy, Prof. Ko examined a simultaneous scheduling duel between competing coffee chains:

#### The Situation & Payoff Matrix
A coffee chain chooses whether to run its weekly promotion on **Monday** or **Wednesday**. Its main rival simultaneously chooses which day to prepare and staff a defensive counter-campaign:

| Coffee Chain \ Rival | Rival: Prepare Mon ($q$) | Rival: Prepare Wed ($1-q$) |
| :--- | :---: | :---: |
| **Promote Monday ($p$)** | $(3, 3)$ | $(6, 0)$ |
| **Promote Wednesday ($1-p$)** | $(5, 1)$ | $(3, 2)$ |

*First payoff: Coffee Chain; Second payoff: Rival.*

#### Economic Logic Behind the Numbers (Slide 6 & 22)
- **Payoff Formula:** $\text{Payoff} = \text{Customer Gross Contribution} - \text{Promotion or Defense Cost}$.
- **Monday Demand Advantage:** Monday baseline consumer foot traffic is substantially higher than Wednesday.
- **Defensive Preparedness:** A prepared defensive campaign blunts the promotion's effectiveness:
  - $\text{Mon–Mon } (3, 3)$: High demand, but the defense limits promotional conversion.
  - $\text{Wed–Wed } (3, 2)$: The defense works, but protects a smaller baseline market opportunity.
- **Wrong-Day Defensive Preparation:** Preparing counter-promotions is fixed and costly:
  - $\text{Mon–Wed } (6, 0)$: Chain captures the large Monday opportunity completely undefended; rival wastes defensive resources.
  - $\text{Wed–Mon } (5, 1)$: Chain gains open traffic on Wednesday, while the rival salvages minimal customers on Monday.

#### Best-Response Cycling (Slide 7)
1. At $[\text{Mon}, \text{Mon}]$, the chain wants to switch to Wednesday to evade defense ($(5, 1)$).
2. At $[\text{Wed}, \text{Mon}]$, the rival wants to shift defense to Wednesday ($(3, 2)$).
3. At $[\text{Wed}, \text{Wed}]$, the chain wants to switch back to Monday to capture peak volume ($(6, 0)$).
4. At $[\text{Mon}, \text{Wed}]$, the rival wants to defend Monday ($(3, 3)$).

> **Conclusion:** No cell has overlapping underlines. **No pure-strategy Nash equilibrium exists.**

---

### 3. The Indifference Principle & Equilibrium Derivation (Slides 9–13)

#### Cardinal Utility & Expected Payoffs
An expected payoff is a probability-weighted average of uncertain outcomes:
$$E(u) = \sum_{j} \Pr(j) \cdot u_j$$

#### The Core Principle (Slide 10)
In a fully mixed equilibrium, every pure strategy played with positive probability must yield the **exact same expected payoff**. If one action yielded even a penny more in expectation, a rational player would select that action with 100% certainty, destroying the mixed equilibrium.

> **The Fundamental Rule:** Your mixing probability is determined by equalising the **OTHER** player's payoffs!
> - Find the chain's probability $p$ by equalising the **rival's** expected payoffs.
> - Find the rival's probability $q$ by equalising the **chain's** expected payoffs.

#### Step 1: Solve Chain's Mix $p$ (Slide 11)
Let $p = \Pr(\text{Promote Monday})$. The chain chooses $p$ to make the **rival indifferent** between its two preparation days:
- $E(\text{Rival Prepare Mon}) = 3p + 1(1-p) = 1 + 2p$
- $E(\text{Rival Prepare Wed}) = 0p + 2(1-p) = 2 - 2p$

Equating the rival's payoffs:
$$1 + 2p = 2 - 2p \implies 4p = 1 \implies \mathbf{p^* = 0.25}$$

$$\text{Chain promotes Monday with } 25\%, \text{ Wednesday with } 75\%.$$

#### Step 2: Solve Rival's Mix $q$ (Slide 12)
Let $q = \Pr(\text{Prepare Monday})$. The rival chooses $q$ to make the **chain indifferent** between its two promotion days:
- $E(\text{Chain Promote Mon}) = 3q + 6(1-q) = 6 - 3q$
- $E(\text{Chain Promote Wed}) = 5q + 3(1-q) = 3 + 2q$

Equating the chain's payoffs:
$$6 - 3q = 3 + 2q \implies 5q = 3 \implies \mathbf{q^* = 0.60}$$

$$\text{Rival prepares Monday with } 60\%, \text{ Wednesday with } 40\%.$$

#### Step 3: Verify Expected Payoffs & Strategic Interpretation (Slide 13)
- **Chain's Equilibrium Payoff:** $E[u_{\text{Chain}}] = 6 - 3(0.60) = 5(0.60) + 3(0.40) = \mathbf{4.2}$
- **Rival's Equilibrium Payoff:** $E[u_{\text{Rival}}] = 1 + 2(0.25) = 2 - 2(0.25) = \mathbf{1.5}$

#### The Counter-Intuitive Managerial Insight
- Monday is the **larger baseline market opportunity**, so the rival defends Monday the majority of the time ($q^* = 60\%$).
- Anticipating this heavy defensive barrier, the rational coffee chain **promotes on Wednesday three times more frequently** ($p^* = 25\%$ Mon, $75\%$ Wed) to harvest unguarded demand!

---

### 4. A Reliable 6-Step Mixed-Strategy Workflow (Slide 14)

Prof. Ko laid out a structured algorithmic workflow for solving any two-by-two game:

```
1. Mark pure best responses ──> Confirm no pure equilibrium exists
2. Define variables in words ──> p = Pr(Row Action 1), q = Pr(Col Action 1)
3. Use Column player's payoffs ─> Solve Row's p* (Equalise Col's choices)
4. Use Row player's payoffs ───> Solve Col's q* (Equalise Row's choices)
5. Check probabilities ────────> Confirm 0 <= p*, q* <= 1 and sum to 1
6. Substitute back ────────────> Verify indifference and calculate E(u)
```

#### Common Traps to Avoid (Slide 25)
1. **Never Assume 50–50:** Equilibrium probabilities depend on payoff differentials, not coin flips.
2. **Never Use Your Own Payoffs to Solve Your Probability:** Row mixes to keep Column indifferent; Column mixes to keep Row indifferent.
3. **Never Mix Over Dominated Actions:** Strictly dominated strategies always receive 0 probability.
4. **Indifference Does Not Mean Paralysis:** Being indifferent makes a player willing to randomize; their randomization sustains the opponent's equilibrium behavior.

---

### 5. Corporate Applications & Managerial Tradeoffs (Slides 15–18)

#### Application 1: Promotion & Product Launch Scheduling
- **Context:** Launching promotions, scheduling flash discounts, allocating digital ad spend, or selecting product reveal windows.
- **Offensive Goal:** Catch competitors off-guard when defenses are dispersed.
- **Defensive Goal:** Anticipate and neutralize offensive customer acquisition.

#### Application 2: Inspection and Deterrence (Slide 16)
- **Structure:** Regulatory Inspector (Audit vs. No Audit) vs. Corporation (Comply vs. Violate).
- **The Deterrence Paradox:** Increasing penalties for non-compliance does not lower the corporate violation rate in equilibrium; it allows the regulator to audit **less frequently** ($q^*$) while preserving identical deterrence!

#### Application 3: BOGO (Buy-One-Get-One) Duel (Slide 19)
- Two rival retail chains choose between Monday and Friday BOGO promotions. When one chain's timing is anticipated, margins collapse; when surprise is achieved, unit volume surges.

#### Managerial Cost-Benefit Framework (Slide 17)

| Strategic Benefits of Randomisation | Potential Costs & Execution Risks |
| :--- | :--- |
| **Reduce rival pre-emption:** Keeps competitors guessing. | **Operational complexity:** Harder for frontline staff to execute unpredictable shifts. |
| **Preserve surprise & deterrence:** Protects margin spikes. | **Customer confusion:** Frustrates buyers who expect consistent pricing. |
| **Test demand elasticity:** Gathers empirical data across times. | **Information leakage:** Internal teams may leak schedules. |
| **Prevent exploitation:** Breaks predictable vulnerability loops. | **Platform/legal constraints:** Fair-trading rules restrict price discrimination. |

---

### 6. Exit Ticket & Synthesis (Slide 20–21)

1. **A mixed strategy is a formal probability distribution** over pure strategies.
2. **Mixing is relevant whenever deterministic behavior is unstable or exploitable.**
3. **Expected payoff is a probability-weighted average** of cardinal outcomes.
4. **Supported strategies must yield equal maximum expected payoffs.**
5. **Your probability is discovered by equalising the OTHER player's payoffs.**
6. **Equilibrium probabilities reflect underlying demand and cost structures, rarely 50–50.**

> **Exit Ticket Challenge:**
> *"Why is your equilibrium probability calculated using the other player's payoffs? Why must the other player be indifferent?"*
> 
> **Answer:** If your opponent strictly preferred one pure strategy over another ($E[u] > E[u']$), they would play that strategy 100% of the time with certainty. Once they become predictable, your own incentives to randomize would collapse. Therefore, you must calibrate your probability $p^*$ so that the opponent has zero incentive to deviate from their randomized posture.
