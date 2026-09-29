# Course Recap: Mixed Strategies & Randomization in Strategy

The fourth class in **DOTE 3090: Strategic Thinking (Game Theory for Business Strategy)**, instructed by **Prof. Chiu Yu Ko**, directly tackled the fundamental challenge of strategic interaction when **no pure-strategy Nash equilibrium exists**. When being predictable makes an executive vulnerable to exploitation, strategic stability requires **deliberate randomization** (Mixed Strategies). The session established the Indifference Principle, the mathematical derivation of optimal mixing probabilities ($p^*$ and $q^*$), empirical verification across sports and retail, and modern corporate applications including algorithmic dynamic repricing, tax auditing, and cybersecurity resource allocation.

---

### 1. The Strategic Necessity of Being Unpredictable

In many real-world competitive scenarios, whenever one firm commits to a predictable course of action, the rival firm possesses an immediate incentive to counter, disrupt, or exploit it:
- **Zero-Sum Games & Competitive Positioning:** Matching Pennies, penalty kicks, tennis serves.
- **Auditing and Corporate Compliance:** Tax authorities vs. taxpayers, FDA quality inspectors vs. pharmaceutical manufacturers.
- **Retail Dynamic Pricing & Flash Promotions:** E-commerce platforms adjusting promotional discounts without allowing scrapers to anticipate and undercut.
- **Cyber-Defense & Security Patrols:** Infrastructure defense where fixed routines allow attackers to find blind spots.

#### The Failure of Pure Strategies
In games like Matching Pennies, the underline method reveals that **no cell has overlapping underlines**. Every cell creates an incentive for at least one player to deviate unilaterally. If both players attempt to play pure strategies, they fall into an infinite loop of mutual anticipation and evasion. 

> **Core Insight:** When predictability creates vulnerability, pure rationality requires deliberate, calculated unpredictability.

---

### 2. Formal Definition of a Mixed Strategy

Let $S_i = \{s_{i1}, s_{i2}, \dots, s_{ik}\}$ be Player $i$'s set of available pure strategies.

A **Mixed Strategy** $\sigma_i$ is a probability distribution over the pure strategies $S_i$:
$$\sigma_i(s_{ij}) \ge 0 \quad \text{and} \quad \sum_{j=1}^k \sigma_i(s_{ij}) = 1$$

- In a $2 \times 2$ game:
  - **Player 1 (Row Player)** chooses probability distribution $\sigma_1 = (p, 1-p)$, playing Action 1 with probability $p$ and Action 2 with probability $1-p$.
  - **Player 2 (Column Player)** chooses probability distribution $\sigma_2 = (q, 1-q)$, playing Action 1 with probability $q$ and Action 2 with probability $1-q$.

---

### 3. The Indifference Principle: The Engine of Mixed Equilibrium

How does an executive determine the exact probabilities $p^*$ and $q^*$? 

#### The Indifference Theorem
A rational player will strictly randomize between two pure actions **if and only if** both pure actions yield the **exact same expected payoff**:
$$E[u_i(\text{Action } 1)] = E[u_i(\text{Action } 2)] = E[u_i(\sigma_i^*)]$$

If Action 1 offered an expected return of \$10M and Action 2 offered \$9.9M, a rational executive would never randomize: they would play Action 1 with 100% probability! Therefore, strictly mixed behavior is only rational when the expected payoffs are strictly equal.

#### The Fundamental Strategic Paradox
> **You do NOT randomize to help yourself; you randomize to keep the rival indifferent!**

- **Row's Choice of $p^*$:** Governs Column's expected payoffs. Row sets $p^*$ to equalize Column's expected payoff between Column 1 and Column 2.
- **Column's Choice of $q^*$:** Governs Row's expected payoffs. Column sets $q^*$ to equalize Row's expected payoff between Row 1 and Row 2.

---

### 4. Mathematical Derivation in $2 \times 2$ Matrix Games

Consider a general $2 \times 2$ payoff matrix:

| Row \ Col | Col 1 ($q$) | Col 2 ($1-q$) |
| :--- | :---: | :---: |
| **Row 1 ($p$)** | $(A, a)$ | $(B, b)$ |
| **Row 2 ($1-p$)** | $(C, c)$ | $(D, d)$ |

#### Step 1: Solving for Column's Probability $q^*$ (Row's Indifference)
Row calculates expected payoffs from each pure strategy:
$$E[u_{\text{Row}}(\text{Row 1})] = q \cdot A + (1-q) \cdot B$$
$$E[u_{\text{Row}}(\text{Row 2})] = q \cdot C + (1-q) \cdot D$$

Equating the two payoffs:
$$q \cdot A + (1-q) \cdot B = q \cdot C + (1-q) \cdot D$$
$$q(A - B - C + D) = D - B \implies q^* = \frac{D - B}{(A - B) - (C - D)}$$

#### Step 2: Solving for Row's Probability $p^*$ (Column's Indifference)
Column calculates expected payoffs from each pure strategy:
$$E[u_{\text{Col}}(\text{Col 1})] = p \cdot a + (1-p) \cdot c$$
$$E[u_{\text{Col}}(\text{Col 2})] = p \cdot b + (1-p) \cdot d$$

Equating the two payoffs:
$$p \cdot a + (1-p) \cdot c = p \cdot b + (1-p) \cdot d$$
$$p(a - c - b + d) = d - c \implies p^* = \frac{d - c}{(a - c) - (b - d)}$$

The unique Mixed Strategy Nash Equilibrium is the pair $(\sigma_1^*, \sigma_2^*) = ((p^*, 1-p^*), (q^*, 1-q^*))$.

---

### 5. Empirical Verification: Sports & High-Stakes Arenas

Can real humans execute mathematically precise mixed strategies? Economists tested this in professional sports where stakes are high and rules are strictly defined:

#### 1. Professional Penalty Kicks (Chiappori, Levitt & Groseclose, 2002; Palacios-Huerta, 2003)
- Analyzed thousands of penalty kicks in European soccer leagues (EPL, La Liga, Serie A).
- Goalkeepers have insufficient reaction time to observe ball flight before diving; they must commit simultaneously.
- **Results:**
  - Kickers scored with equal probability regardless of whether they kicked Left (80.1%) or Right (79.8%).
  - Kickers chose their natural side 58% of the time, exactly matching the indifference equilibrium calculation.
  - Statistical runs tests confirmed **zero serial correlation**—kickers did not exhibit predictable alternation.

#### 2. Grand Slam Tennis Serves (Walker & Wooders, 2001)
- Analyzed serve locations (Center vs. Outside) in Wimbledon finals.
- Winning probabilities on serves to the receiver's forehand vs. backhand were statistically indistinguishable.
- Proven: Repeated play and market competition drive sophisticated agents to mixed strategy Nash equilibria.

---

### 6. Corporate Applications & Managerial Strategy

#### Application 1: Varian's Model of Sales (Retail Pricing Promotions)
Why do supermarkets and e-commerce platforms hold unpredictable flash sales rather than permanent price cuts?
- Consumers consist of two segments: **Informed Shoppers** (who actively search for lowest price) and **Uninformed Shoppers** (who buy at convenient local stores regardless of price).
- If a store always discounts: it gives up high profit margins on captive loyal shoppers.
- If a store never discounts: competitors capture 100% of price-sensitive volume.
- **Equilibrium:** Stores randomize both the timing and depth of discounts. This allows them to price-discriminate: informed shoppers put in the effort to catch random sales, while uninformed shoppers pay full price.
- **Warning:** Scheduling predictable sales (e.g., "30% off every first Saturday") destroys margins, as consumers learn to delay purchases and competitors schedule discounts on Friday.

#### Application 2: Amazon Dynamic Algorithmic Repricing
- Algorithmic repricers monitor thousands of competitors across millions of SKUs.
- Deterministic automated matching creates runaway price spirals to marginal cost.
- Leading algorithmic pricing systems inject **stochastic noise** (bounded random price testing) to gauge competitor reaction latency and consumer willingness-to-pay elasticity.

#### Application 3: Tax Auditing & Corporate Governance (The Inspection Game)
- Tax authorities and regulatory auditors cannot inspect 100% of filings due to budget and staffing constraints.
- In equilibrium, auditors inspect with probability $q^*$, keeping corporate evasion at rate $p^*$.
- **The Deterrence Paradox:** Increasing the penalty fine on detected violations does **not** directly lower evasion in equilibrium! Instead, a higher penalty allows the regulatory authority to audit **less frequently** while keeping the taxpayer indifferent.

---

### 7. Human Cognitive Biases vs. Algorithmic Implementation

Humans are notoriously terrible at generating true randomness:
1. **Alternation Bias (Negative Recency):** Humans switch options too frequently, erroneously believing that repeated choices (e.g., H-H-H-H) are "not random".
2. **Clustering Illusion:** True random distributions contain long streaks and clusters that human executives misinterpret as meaningful trends.
3. **Gambler's Fallacy:** Believing that after three consecutive promotions, a price increase is "overdue".

> **Managerial Rule:** Never allow human intuition to manage mixed strategy decisions manually. Calibrate the payoff matrix, compute $p^*$ and $q^*$, and delegate execution to automated cryptographic randomizers.

---

### 8. Key Executive Takeaways

1. **Predictability is Liability:** If your strategic patterns can be forecasted, competitors will design optimal traps to counter you.
2. **Equilibrium Existence Guaranteed:** While pure strategy Nash equilibria may not exist, **every finite game has at least one Nash equilibrium** when mixed strategies are permitted (Nash, 1950).
3. **Master the Indifference Principle:** Your mixing frequencies are selected to discipline the rival's payoff structure, not your own.
4. **Deploy Algorithmic Randomization:** Replace managerial intuition with automated algorithmic systems in pricing, auditing, and defensive resource deployment.
