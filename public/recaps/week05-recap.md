# Course Recap: Commitment and Strategic Moves

The fifth class in **DOTE 3090: Strategic Thinking (Game Theory for Business Strategy)**, instructed by **Prof. Chiu Yu Ko** at **CUHK Business School**, addressed one of the most powerful concepts in executive decision-making: **how to change the rules of the game before your rivals move**. While Week 4 focused on managing predictability through mixed strategies (making rivals indifferent to avoid exploitation), Week 5 shifts to **restricting flexibility to force a favorable response from competitors**.

> **Core Maxim:** *"Commitment changes the game; cheap talk describes the game you wish existed."* — Prof. Chiu Yu Ko

---

### 1. From Week 4 to Week 5: Two Strategic Philosophies (Slide 2)

| Dimension | Week 4: Mixed Strategies | Week 5: Strategic Commitment |
| :--- | :--- | :--- |
| **Strategic Goal** | Randomise actions; eliminate exploitable patterns | Restrict flexibility; force favorable rival choices |
| **Timing** | Simultaneous decisions | Sequential moves (act *before* the rival) |
| **Incentives** | Make the rival indifferent between alternatives | Change your *own* future incentives so threats/promises are credible |
| **Flexibility** | Preserves optionality across probability distributions | Deliberately destroys or penalises future alternatives |

---

### 2. Opening Dilemma: Can a Threat Deter Entry? (Slides 3, 11–13)

#### The Baseline Entry Game: Why Empty Threats Fail (Slide 11)
Consider a potential market entrant ($E$) deciding whether to **Enter** or **Stay Out** of a lucrative market currently monopolised by an incumbent ($I$). If the entrant enters, the incumbent chooses whether to **Fight** (launch a damaging price or advertising war) or **Accommodate** (share the market as a duopoly).

```
          [ Entrant ]
          /         \
   (Enter)           (Stay Out)
       /                 \
  [ Incumbent ]        (0, 5)  [End]
    /         \
(Fight)   (Accommodate)
  /             \
(-1, -1)        (2, 2)
```
*(Payoffs: Entrant, Incumbent)*

1. **Subgame Analysis at the Incumbent's Node:**
   - If entry occurs, the incumbent compares $u_I(\text{Accommodate}) = 2$ against $u_I(\text{Fight}) = -1$.
   - Because $2 > -1$, a rational incumbent **always accommodates**.
2. **Backward Induction by the Entrant:**
   - The entrant looks ahead and anticipates that the incumbent's threat to fight is an **empty bluff**.
   - Comparing $u_E(\text{Enter}) = 2$ against $u_E(\text{Stay Out}) = 0$, the entrant chooses **Enter**.
3. **Equilibrium Outcome:** Entry occurs and is accommodated. The incumbent's pre-entry warning (*"If you enter, we will crush you"*) is pure **cheap talk** with zero deterrent power.

---

### 3. Transforming the Game Through Strategic Commitment (Slides 12–13)

To deter entry, the incumbent must alter its future incentives **before** the entrant moves.

#### The Strategic Commitment Action
Suppose the incumbent pays an upfront capital cost $K = 1$ for dedicated plant capacity or exclusive supplier contracts. This prior commitment alters post-entry operational economics:
- With expanded dedicated capacity, the marginal cost of aggressive production drops, raising the fighting payoff from $-1$ to $1$.
- Accommodation is now less attractive or constrained, yielding $0$.

#### The Altered Post-Commitment Subgame
```
          [ Entrant ]
          /         \
   (Enter)           (Stay Out)
       /                 \
  [ Incumbent ]        (0, 4)  [End: 5 - K=1]
    /         \
(Fight)   (Accommodate)
  /             \
(-1, 0)         (2, -1)
[Note: Incumbent net payoffs after K=1: Fight yields 1-1=0; Accommodate yields 0-1=-1]
```

1. **Backward Induction Post-Commitment:**
   - Now, facing entry, the incumbent compares $u_I(\text{Fight}) = 0$ against $u_I(\text{Accommodate}) = -1$.
   - **Fighting is now the dominant, credible response!**
2. **Entrant's Decision:**
   - The entrant foresees that entering leads directly to an incumbent price war ($u_E = -1 < 0$).
   - The rational entrant chooses **Stay Out** ($u_E = 0$).
3. **Incumbent's Net Payoff Comparison (Slide 13):**
   - **Without Commitment:** Entry accommodated $\implies \text{Incumbent Profit} = \mathbf{2}$.
   - **With Commitment:** Entry deterred $\implies \text{Incumbent Profit} = 5 - K = 5 - 1 = \mathbf{4}$.
   - Because $4 > 2$, investing $K = 1$ in the strategic commitment device is an optimal, high-return executive decision.

---

### 4. What Is Strategic Commitment? (Slide 5)

> **Formal Definition:** A strategic commitment is an **observable earlier action** that changes a player's **future incentives or feasible choices** and therefore changes how others respond.

#### The 4 Critical Pillars of Commitment:
1. **Prior:** Executed before the rival's relevant choice point.
2. **Observable:** The rival can clearly verify or reliably infer the commitment.
3. **Irreversible (or Costly to Reverse):** Withdrawal triggers substantial legal, financial, or reputational penalties.
4. **Payoff-Relevant:** Fundamentally reshapes continuation payoffs, constraints, or available actions.

---

### 5. Testing Credibility at the Future Decision Node (Slide 6)

A strategic move is only as strong as its **credibility**. Prof. Ko highlighted the cardinal test:

- **Credible Move:** The promised or threatened action will be **strictly optimal (or unavoidable)** when the future decision node is actually reached.
- **Non-Credible Move:** The player will privately prefer to renege or abandon the announcement once the rival has acted.

$$\text{Credibility Rule: Always evaluate incentives at the FUTURE decision node, NOT at the announcement stage!}$$

---

### 6. Sunk Costs: Important but Often Misunderstood (Slides 8, 24)

Executive teams frequently confuse past expenditures with credible commitments. Prof. Ko unpacked the boundary between the **sunk-cost fallacy** and **true strategic commitments**:

#### The Sunk-Cost Fallacy
*"We have already spent $50M on this project, so we cannot afford to back out now."*
- If an expenditure $K$ is unrecoverable regardless of whether you fight or accommodate in the future, it reduces all continuation payoffs equally ($u - K$).
- In marginal decision-making, common past expenses drop out of the comparison:
  $$(u_{\text{Fight}} - K) > (u_{\text{Accommodate}} - K) \iff u_{\text{Fight}} > u_{\text{Accommodate}}$$
- **A pure historical expense does NOT create credibility.**

#### When Capital Expenditure Becomes a Strategic Commitment
A past expenditure only deters rivals if it **changes future continuation options**:
- Building a specialised semiconductor fab changes future **marginal cost** and **production capacity**.
- Entering a long-term supply agreement with non-refundable minimum take-or-pay clauses adds **penalties for withdrawal**.
- The mechanism is the **changed continuation game**, not the historical expense!

---

### 7. Costly Signalling vs. Strategic Commitment (Slides 7, 27)

| Feature | Costly Signal (Information) | Commitment Device (Incentives/Game) |
| :--- | :--- | :--- |
| **Primary Mechanism** | Alters rival's **beliefs** about private information, type, or cost structure. | Alters player's **future payoffs, action space, or constraints**. |
| **Key Requirement** | Single-crossing property: costly action must be cheaper or more beneficial for strong types. | Irreversibility: reversing the action is prohibitively costly. |
| **Example** | Heavy brand advertising to signal product durability. | Building excess production capacity or signing take-or-pay contracts. |

---

### 8. The Four Commitment Devices (Slide 9)

1. **Capacity & Physical Infrastructure:** Expanding factories, warehouses, or dedicated GPU clusters lowers marginal expansion costs and makes aggressive market defense self-enforcing.
2. **Contracts & Financial Penalties:** Most-favored-nation clauses, liquidated damages, or long-term exclusivity contracts lock in commitments through third-party enforcement.
3. **Reputational Bonding & Public Stances:** Visible CEO declarations, public quality guarantees, or policy stances create severe audience and brand costs if abandoned.
4. **Burning Bridges & Cutting Off Retreat:** Deliberately removing exit options (the classic Cortés strategy) leaves fighting as the only available action.

---

### 9. Commitment vs. Flexibility Trade-Off (Slide 17)

Commitment is a double-edged sword: by restricting your own future options, you gain bargaining leverage but forfeit adaptation.

| Commitment Is More Valuable When... | Flexibility Is More Valuable When... |
| :--- | :--- |
| Rival response is highly sensitive to future incentives. | Demand, technological paths, or regulations are volatile. |
| First-mover advantages or scarce resources can be locked in early. | Assets face rapid technological obsolescence. |
| Reversal would destroy executive credibility. | Staged learning, prototyping, and option value are critical. |
| Rivals cannot easily duplicate or bypass the commitment. | Competitors can cheaply bypass or imitate the commitment. |

---

### 10. Real-World Applications & Case Studies (Slides 15, 16, 19)

#### Case 1: TSMC's Leading-Edge Fab Expansion
TSMC commits tens of billions in capital expenditures (CapEx) years in advance to next-generation lithography (e.g., 2nm/A16). Once fabs are constructed, marginal wafer production cost is exceptionally low, deterring competitors from attempting capacity wars.

#### Case 2: Platform Exclusivity Contracts Backfiring (Slide 16)
Signing long-term exclusive content contracts establishes platform credibility, but if consumer tastes shift or vendor quality degrades, the platform is locked into costly, non-renegotiable agreements.

#### Case 3: The Hong Kong Tech Startup AI Infrastructure Decision (Slide 19)
- **Option A (Dedicated Hardware):** High upfront sunk CapEx, zero incremental unit costs, high deterrence against rival startups, but massive obsolescence risk.
- **Option B (Long-Term Cloud Contract):** Contractual take-or-pay commitment with volume discounts; moderate flexibility.
- **Option C (On-Demand Cloud):** Maximum flexibility and minimal upfront risk, but zero deterrent credibility against aggressive entrants.

---

### 11. Week 5 Main Takeaways & Exit Ticket (Slides 20, 21)

1. **Strategic Commitment:** An earlier, observable move that alters the continuation game to elicit a favorable rival response.
2. **Credibility Test:** Evaluate incentives at the future decision node using backward induction.
3. **Sunk Cost vs. Commitment:** Past spending only matters if it alters future marginal revenues, marginal costs, or constraints.
4. **Strategic Moves Rule:** Commit when deterrence or first-mover advantage exceeds the loss of flexibility option value ($V_{\text{Commit}} - K > V_{\text{No Commit}}$).

#### Exit Ticket Question:
> *"Why is 'We have already spent too much to stop' not a valid commitment argument by itself? What additional change could make continued action credible?"*
> 
> **Answer:** Past expenditures are sunk and unrecoverable across both paths. To establish genuine credibility, the firm must show that prior spending lowered continuation marginal costs, unlocked proprietary assets, or introduced contractual/reputational penalties that make continuing strictly better than aborting.

#### Looking Ahead to Week 6:
**Repeated Games & Dynamic Enforcement:** How repeated interactions, trigger strategies, and the shadow of the future enable cooperation without external contracts.
