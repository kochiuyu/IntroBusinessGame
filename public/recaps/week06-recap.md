# Course Recap: Repeated Games — Cooperation, Punishment, and the Value of the Future

**Course:** Game Theory for Business Strategy (商業策略博弈論)  
**Lecture:** Week 6  
**Instructor:** Prof. Chiu Yu Ko, CUHK Business School  
**Academic Term:** Semester 2026–27 Term 1  
**Core Maxim:** *"Future interaction can change what is rational today."*  
**Chinese Maxim:** *未來的策略互動，能夠從根本上改變今天的理性選擇。*

---

## 1. Executive Overview: From Commitment to Repetition

Week 6 transitions from **Strategic Moves and Irreversible Commitments** (Week 5) to **Dynamic Games and Repeated Interaction**. 

| Dimension | Week 5: Strategic Commitment | Week 6: Repeated Games |
| :--- | :--- | :--- |
| **Primary Action** | Act now by sinking capital ($K$) or restricting choices | Play a stage game repeatedly over multiple time horizons |
| **Mechanism** | Change future continuation incentives upfront | Observe past behaviour and condition future actions on history |
| **Strategic Goal** | Influence a rival's subsequent choice in a sequential tree | Reward past cooperation and credibly punish opportunistic deviations |
| **Flexibility** | Deliberately destroys or penalises own future flexibility | Preserves options while aligning ongoing incentives |
| **Core Axiom** | *Commitment changes the future game* | *Repetition makes the future discipline the present* |

In static games (Week 1 and Week 3), the Prisoner's Dilemma predicts inevitable margin destruction. When competitors know they will face each other again tomorrow, the promise of sustained mutual profitability—backed by the credible threat of retaliatory price wars—can transform cutthroat rivals into disciplined, tacitly cooperating partners.

---

## 2. Opening Decision: Price Competition Revisited

### The Baseline Stage Game
Two competing firms simultaneously decide whether to **Maintain** price margins or offer a secret **Discount** in each operating period:

| Your Firm \ Rival | Rival: Maintain ($C$) | Rival: Discount ($D$) |
| :--- | :---: | :---: |
| **You: Maintain ($C$)** | $(4, 4)$ | $(1, 5)$ |
| **You: Discount ($D$)** | $(5, 1)$ | $(2, 2)$ |

*First payoff: Row Player (Your Firm); Second payoff: Column Player (Rival).*

### Strategic Properties of the One-Shot Interaction:
1. **Dominant Strategy:** For each firm, discounting yields a strictly higher immediate payoff:
   - If rival Maintains: $5 > 4$ (Discounting grabs rival's customers and boosts market share).
   - If rival Discounts: $2 > 1$ (Discounting defends market share from complete collapse).
2. **Nash Equilibrium:** Both firms play their dominant strategy $[D, D]$, producing an equilibrium payoff of $(2, 2)$.
3. **Collective Inefficiency:** Mutual maintenance $[C, C]$ yields $(4, 4)$—earning each firm double the profit.
4. **The Central Strategic Question:** *Can the prospect of future interaction sustain Maintain–Maintain today without illegal explicit cartels?*

---

## 3. Today’s 6 Learning Outcomes

By mastering Week 6, an executive can:
1. **Distinguish** a single-period stage game from a dynamic repeated game.
2. **Explain** why a known final period unravels cooperation through backward induction.
3. **Compare** finite, indefinite, and infinite horizons in commercial relationships.
4. **Contrast** the deterrence of Grim Trigger against the responsiveness of Tit for Tat.
5. **Interpret** the economic meaning of the discount factor $\delta$ (cost of capital, continuation probability).
6. **Calculate** the minimum discount factor $\delta^*$ required to sustain mutual cooperation.

---

## 4. Why a Known Final Period Unravels Cooperation

Consider repeating the Prisoner's Dilemma for a fixed, publicly known number of rounds $T$ (e.g., a 10-year procurement contract expiring on December 31):

1. **At Period $T$ (The Final Round):**  
   There is no future tomorrow. No punishment can ever be executed. Period $T$ reduces identically to a one-shot game. Both firms' dominant strategy is to **Discount** (payoff $(2, 2)$).
2. **At Period $T - 1$:**  
   Both firms look ahead and recognize that period $T$ will inevitably end in $[D, D]$ regardless of what happens today. Maintaining price at $T - 1$ cannot protect tomorrow’s cooperation. Consequently, the incentive to discount at $T - 1$ is unconstrained. Both firms Discount at $T - 1$.
3. **Backward Induction Unraveling:**  
   The exact same backward-induction logic cascades all the way back to Period 1.

> **The Backward-Induction Theorem:**  
> *In any finitely repeated Prisoner's Dilemma with a known, fixed terminal date, mutual defection repeats in every single period.*

---

## 5. Three Ways to Model the Time Horizon

To discipline opportunistic behavior in the present, players must face an **indefinite horizon** where the game never possesses an obvious "last round":

| Horizon | Formal Meaning | Strategic Implication | Real-World Domain |
| :--- | :--- | :--- | :--- |
| **Finite, Known End** | Everyone knows the exact terminal period $T$. | Backward induction unravels cooperation completely from period 1. | Lame-duck CEOs, expiring short-term construction joint ventures. |
| **Indefinite Horizon** | The interaction continues to next period with probability $p \in (0, 1)$. | There is never a certain final period; future discipline remains potent in every round. | Ongoing corporate supplier networks, platform partner ecosystems. |
| **Infinite Horizon** | Theoretical benchmark with no terminal period ($t \to \infty$). | Tractable mathematical proxy for ongoing long-term business relationships. | Sovereign debt, global container shipping alliances, duopoly airline routes. |

*Crucial Insight:* The essence of repeated-game cooperation is **not literal immortality**, but rather **the absence of a known final interaction**.

---

## 6. Two Foundational Repeated-Game Strategies

A repeated-game strategy is a complete plan of action conditioning today's choice on the entire history of past play:

### 1. Grim Trigger (Friedman 1971)
- **Rule:** Begin by cooperating. Continue cooperating as long as nobody has ever defected. If the rival discounts even once, switch to cutthroat competition ($D$) **forever**.
- **Strength:** Creates the maximum possible deterrent penalty, lowering the required patience ($\delta^*$) needed to maintain peace.
- **Weakness:** Exceptionally fragile. A single data error, miscommunication, or external demand shock triggers permanent price war destruction.

### 2. Tit for Tat (Axelrod 1984)
- **Rule:** Begin by cooperating. In every subsequent period, exactly copy the rival's action from the previous period.
- **Strength:** Highly forgiving and transparent. Punishment ceases immediately once the rival resumes cooperation.
- **Weakness:** Vulnerable to echoing retaliation cycles (defects trigger alternating counter-defects).

---

## 7. The Discount Factor $\delta$: Patience & The Value of the Future

The discount factor $\delta \in [0, 1]$ measures how strongly a decision-maker values future earnings relative to cash in hand today:

$$\delta = \frac{p}{1 + r}$$

Where:
- $p$ is the probability that the business relationship continues into the next period.
- $r$ is the firm's cost of capital / interest rate per period.

### Interpretation:
- A payoff of $4$ received next period is worth $4\delta$ today.
- A payoff of $4$ received two periods later is worth $4\delta^2$ today.
- **High $\delta$ ($\delta \to 1$):** High patience, low interest rates, highly stable and ongoing market relationship $\implies$ **Cooperation is easy**.
- **Low $\delta$ ($\delta \to 0$):** High short-term pressure, quarterly earnings desperation, high risk of disruption $\implies$ **Cooperation collapses**.

---

## 8. Step-by-Step Mathematical Derivations

### Derivation 1: Value of Cooperating Forever ($V_C$)
Under mutual cooperation $[C, C]$, each firm earns $4$ in every period:

$$V_C = 4 + 4\delta + 4\delta^2 + 4\delta^3 + \dots = \sum_{t=0}^{\infty} 4\delta^t$$

Using the geometric series formula $\sum_{t=0}^{\infty} a r^t = \frac{a}{1 - r}$ for $|r| < 1$:

$$V_C = \frac{4}{1 - \delta}$$

### Derivation 2: Value of Deviating Once under Grim Trigger ($V_D$)
If your firm chooses to cheat by offering a secret discount in Period 1:
- Today ($t=0$): You capture the unilateral temptation payoff of $5$ (while rival gets $1$).
- Tomorrow onward ($t \ge 1$): The rival observes the discount and triggers permanent retaliatory punishment. Both firms discount forever, yielding $2$ in every continuation period.

$$V_D = 5 + 2\delta + 2\delta^2 + 2\delta^3 + \dots = 5 + \frac{2\delta}{1 - \delta}$$

### Derivation 3: The Critical Threshold $\delta^*$
Cooperation is self-enforcing if and only if the present value of lasting cooperation is at least as large as the value of cheating:

$$V_C \ge V_D \iff \frac{4}{1 - \delta} \ge 5 + \frac{2\delta}{1 - \delta}$$

Multiplying both sides by $(1 - \delta)$:
$$4 \ge 5(1 - \delta) + 2\delta$$
$$4 \ge 5 - 5\delta + 2\delta$$
$$4 \ge 5 - 3\delta$$
$$3\delta \ge 1 \iff \mathbf{\delta \ge \frac{1}{3}}$$

> **Economic Meaning of $\delta \ge \frac{1}{3}$:**  
> As long as firms discount the future by less than $66.7\%$ per period (or probability of continuing exceeds $33.3\%$), the threat of future margin collapse from $4$ down to $2$ completely overcomes the one-time temptation to pocket an extra $5 - 4 = 1$.

---

### Derivation 4: General Grim Trigger Formula

Let:
- $R$ = Reward for mutual cooperation (e.g. $4$)
- $T$ = Temptation payoff from unilateral deviation (e.g. $5$)
- $P$ = Punishment payoff under punishment equilibrium (e.g. $2$)
- $S$ = Sucker's payoff when cheated (e.g. $1$)

The incentive constraint:
$$\frac{R}{1 - \delta} \ge T + \frac{\delta P}{1 - \delta} \iff R \ge T(1 - \delta) + \delta P \iff \delta(T - P) \ge T - R$$

$$\mathbf{\delta^* = \frac{T - R}{T - P}}$$

#### Strategic Sensitivities:
1. **Temptation Gain ($T - R$):** As the short-term prize from cheating increases, $\delta^*$ rises (cooperation becomes harder).
2. **Punishment Severity ($R - P$):** As the punishment payoff $P$ decreases (harsher retaliatory pain), $\delta^*$ drops (cooperation becomes easier).

---

### Derivation 5: Asymmetric Relationships & Dual Thresholds

In many supply chain partnerships, one firm is a dominant buyer and the other is a small supplier:

$$\delta_1^* = \frac{T_1 - R_1}{T_1 - P_1}, \qquad \delta_2^* = \frac{T_2 - R_2}{T_2 - P_2}$$

$$\mathbf{\text{Binding Condition: } \delta \ge \max(\delta_1^*, \delta_2^*)}$$

Both parties must be sufficiently patient. The player with the larger temptation gain or milder punishment payoff is the **weakest link** whose threshold dictates whether the partnership survives.

---

### Derivation 6: Tit-for-Tat Alternating Retaliation

If a firm deviates against exact Tit for Tat, play alternates between $[D, C]$ and $[C, D]$:
Payoff sequence: $5, 1, 5, 1, \dots$

$$V_{TFT} = 5 + \delta + 5\delta^2 + \delta^3 + \dots = \frac{5 + \delta}{1 - \delta^2}$$

Comparing $\frac{4}{1 - \delta} \ge \frac{5 + \delta}{1 - \delta^2} \implies \frac{4(1 + \delta)}{1 - \delta^2} \ge \frac{5 + \delta}{1 - \delta^2} \implies 4 + 4\delta \ge 5 + \delta \implies 3\delta \ge 1 \implies \mathbf{\delta \ge \frac{1}{3}}$.

---

## 9. Practical Realities: Monitoring & Recovery

In theoretical models, actions are observed with $100\%$ precision without delay. In executive reality:

1. **The Monitoring Problem:**
   - Secret volume rebates, non-price perks, and customized enterprise bundling mask cheating.
   - External market downturns (e.g., industry demand drop) look indistinguishable from competitor price cuts.
2. **The Recovery Problem:**
   - Permanent Grim Trigger punishment destroys trillions in enterprise value after a simple false positive.
   - Sustainable commercial alliances require **monitoring conventions** (industry transparency indices, audits) and **forgiving reset mechanisms** (e.g., Contrite Tit-for-Tat, finite punishment phases).

---

## 10. Common Executive Pitfalls to Avoid

| Common Mistake | Executive Correction |
| :--- | :--- |
| **Treating repeated play as independent one-shot rounds** | Explicitly define how tomorrow's action depends on yesterday's history. |
| **Ignoring the known contract expiration date** | Anticipate end-of-contract unraveling; restructure contracts with automatic renewals or performance earnouts. |
| **Adding future profits without discounting** | Weight period $t$ payoffs by $\delta^t$; cash today is not cash in 5 years. |
| **Checking only one player in asymmetric alliances** | Always compute separate thresholds for both buyer and supplier. |
| **Assuming punishment is automatic and costless** | Ensure retaliatory threats are observable, attributable, and credible to execute. |
