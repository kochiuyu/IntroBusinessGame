# Course Recap: Games with Simultaneous Moves and Nash Equilibrium

The third class in **DOTE 3090: Strategic Thinking (Game Theory for Business Strategy)** advanced from sequential interactions to **simultaneous-move games**, in which decision-makers must choose their actions without observing the current decisions of their competitors. The session established the formal mathematics of best responses, iterated elimination of strictly dominated strategies (IESDS), the concept of strategic stability through **Nash Equilibrium**, the four archetypal 2x2 games, and the foundational oligopoly models of Cournot (quantity) and Bertrand (price) competition.

---

### 1. The Nature of Simultaneous Moves

In strategic business decision-making, "simultaneous" does not necessarily mean that actions are taken at the exact same second on a clock. Rather, it means that **neither decision-maker can observe the other's choice before making their own commitment**. 

Real-world business environments characterized by simultaneous interaction include:
- **Procurement and Government Tenders:** Sealed-bid auctions for infrastructure contracts or spectrum rights.
- **Retail Holiday Promotions:** E-commerce platforms finalizing their Black Friday discounts without knowing competitors' exact flash-sale markdown tiers.
- **Semiconductor Foundry Allocations:** Semiconductor giants committing annual wafer fab allocations across leading-edge nodes without observing rival fab roadmaps.
- **Platform Hardware Launch Pricing:** Sony and Microsoft setting launch prices for new console generations (PS5 vs. Xbox Series X).

Because decision-makers cannot observe rival actions in real time, they cannot simply react. Instead, each firm must formulate a rational belief (conjecture) about what rivals are likely to do, and optimize against those expectations.

---

### 2. The Normal Form (Payoff Matrix) Representation

A simultaneous-move game is formally characterized by three foundational elements:
1. **Players ($N$):** The set of strategic decision-makers (e.g., Airbus and Boeing).
2. **Strategy Spaces ($S_i$):** The complete set of actions available to each player $i$.
3. **Payoff Functions ($u_i$):** The valuation, profit, or market share that player $i$ receives from every possible combination of chosen strategies.

In a two-player game, this is represented by a **Payoff Matrix (Bimatrix)**, where row choices represent Player 1's strategies, column choices represent Player 2's strategies, and each cell contains the payoff pair $(u_1, u_2)$. By convention, the first number belongs to the Row player, and the second belongs to the Column player.

---

### 3. Best Responses and Dominance

The core analytical building block of simultaneous-move games is the **Best Response Function**, denoted $BR_i(s_{-i})$.

- **Definition of Best Response:** An action $s_i^*$ is player $i$'s best response to rival strategy $s_{-i}$ if and only if:
  $$u_i(s_i^*, s_{-i}) \ge u_i(s_i, s_{-i}) \quad \forall s_i \in S_i$$
- **Strictly Dominant Strategy:** An action that is a best response to *every* possible strategy the rival might play. If an executive possesses a strictly dominant strategy, they should play it regardless of rival intentions.
- **Strictly Dominated Strategy:** An action for which another strategy always delivers a strictly higher payoff, regardless of what competitors choose.

#### The Law of Rationality:
> **Rational executives never play strictly dominated strategies.**

---

### 4. Iterated Elimination of Strictly Dominated Strategies (IESDS)

When games feature multiple complex options, decision-makers can simplify the strategic landscape using **Iterated Elimination of Strictly Dominated Strategies (IESDS)**:
1. Identify and eliminate any action that is strictly dominated for either player.
2. In the resulting smaller game, re-evaluate remaining actions. Previously viable options may now be strictly dominated because the pruned rival actions are no longer credible threats.
3. Repeat the process until no strictly dominated actions remain.

**Key Mathematical Theorem:** IESDS never eliminates any Nash Equilibrium. If IESDS reduces the game to a single outcome, the game is **Dominance Solvable**, and the outcome is the unique, predictable Nash equilibrium.

---

### 5. Nash Equilibrium: Strategic Stability

Named after Nobel laureate John Forbes Nash Jr. (1950), a **Nash Equilibrium** is a strategy profile $(s_1^*, s_2^*, \dots, s_n^*)$ in which every player's strategy is simultaneously a best response to the strategies chosen by everyone else:
$$u_i(s_i^*, s_{-i}^*) \ge u_i(s_i, s_{-i}^*) \quad \forall i, \; \forall s_i \in S_i$$

#### Strategic Characteristics of Nash Equilibrium:
- **No Unilateral Regret:** Given what competitors have done, no firm has an individual incentive to alter its choice.
- **Self-Enforcing:** An equilibrium does not require external legal enforcement; each player's self-interest naturally sustains the outcome.
- **Stability $\ne$ Optimality:** Crucially, a Nash equilibrium guarantees stability, but NOT collective efficiency. In the Prisoner's Dilemma, rational equilibrium produces mutual destruction.

---

### 6. The Four Archetypal 2x2 Simultaneous Games

Executives must instantly recognize four archetypal market structures:

| Game Archetype | Strategic Structure | Corporate Reality | Resolution Mechanism |
| :--- | :--- | :--- | :--- |
| **1. The Prisoner's Dilemma** | Strictly dominant defection; unique Pareto-inferior Nash Eq | Price wars, coupon battles, ad spending arms race | Binding contracts, long-term repeated interaction, structural differentiation |
| **2. Coordination Game** | Multiple pure Nash Eq along diagonal; miscoordination is disastrous | Standard wars (NACS vs. CCS, Blu-ray vs. HD-DVD) | Focal points (Schelling points), industry consortia, early commitment |
| **3. Hawk-Dove / Chicken** | Two asymmetric Nash Eq; mutual aggression leads to mutual ruin | Aggressive price wars, capacity flooding, labor strikes | Credible commitment to stand firm, burning bridges, preemption |
| **4. Matching Pennies** | Zero-sum; cyclic best responses; NO pure strategy Nash Eq | Cybersecurity auditing, tax compliance, soccer penalty kicks | Mixed strategies (Week 4): deliberate randomization to maintain unpredictability |

---

### 7. Oligopolistic Competition: Cournot vs. Bertrand

In oligopoly markets, the dimension of simultaneous competition fundamentally determines profit margins and industry structure:

#### Cournot Competition (Quantity / Capacity):
- Firms choose production volumes or capacities $q_1, q_2$ simultaneously.
- Market price adjusts to clear total industry supply $P(Q) = a - b(q_1 + q_2)$.
- Quantities are **strategic substitutes**: when a competitor expands output, your optimal response is to contract.
- Equilibrium price settles strictly between Monopoly and Perfect Competition:
  $$P_{\text{monopoly}} > P_{\text{cournot}} > P_{\text{competitive}} = MC$$
- **Real-World Domain:** Capital-intensive industries with irreversible capacity build-ups (commercial aircraft assembly, semiconductor foundries, petrochemicals).

#### Bertrand Competition (Price):
- Firms choose prices $p_1, p_2$ simultaneously for homogeneous goods.
- Consumers purchase exclusively from the lowest-priced supplier.
- Any firm priced above rival gets 0 demand; undercutting by $0.01 captures 100% of the market.
- **The Bertrand Paradox:** With only two firms, price collapses to marginal cost:
  $$p_1^* = p_2^* = MC, \quad \Pi_1 = \Pi_2 = 0$$
- **Escaping the Bertrand Trap:** High-margin executives escape cutthroat price competition via product differentiation, brand moats, switching costs, capacity caps, or repeated tacit cooperation.

---

### 8. Executive Decision-Making Checklist

Before committing resources in simultaneous competitive markets:
1. **Never play dominated moves:** Audit every project; discard strategies that lose under all rival scenarios.
2. **Anticipate competitor rationality:** Do not rely on competitor incompetence; model their best responses rigorously.
3. **Seek self-enforcing stability:** Partnerships that conflict with private incentives will unravel.
4. **Choose your competitive dimension:** Compete on capacity and differentiation rather than unconstrained price.
5. **Transform the game when trapped:** If stuck in an aggressive Prisoner's Dilemma, redesign payoffs through loyalty programs, exclusive channels, or regulatory standards.
