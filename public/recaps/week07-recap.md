# Course Recap: Auctions I — Bidding, Information, and Auction Rules (Week 7)

**Course:** Game Theory for Business Strategy (商業策略博弈論)  
**Course Level:** Executive Master & MBA  
**Academic Term:** Semester 2026–27 Term 1  
**Motto:** *"When values are private, auction rules shape what bidders reveal and how aggressively they compete."*  
**Instructor:** Prof. Chiu Yu Ko, CUHK Business School  

---

## 1. Executive Summary & The Transition from Week 6 to Week 7

| Dimension | Week 6: Repeated Games | Week 7: Auctions & Mechanism Design |
| :--- | :--- | :--- |
| **Information Structure** | Symmetrical or historical observation | **Private Information** (private valuations & signals) |
| **Strategic Levers** | Future rewards and punishments, patience ($\delta$) | **Allocation and Payment Rules** |
| **Strategy Space** | History-dependent actions across time | **Strategic Bidding Functions** $b_i(v_i)$ |
| **Core Principle** | *Repetition changes incentives across time* | *Auctions change incentives through rules* |

Auctions are formal economic mechanisms that map submitted bids into **allocations** (who gets what) and **payments** (who pays what). In conventional competitive markets, buyers are price-takers. In an auction, buyers actively determine or influence transaction prices under severe uncertainty about rivals' private valuations.

---

## 2. Opening Executive Decision: A Licence Worth HK$100,000

Consider an opening dilemma: Your firm and a competitor submit sealed bids for an exclusive commercial operating licence. Your corporate valuation of the licence is **HK$100,000**. You do not know your rival's valuation or planned bid.

- **Rule A (First-Price):** Highest bid wins; winner pays their **own bid**.
- **Rule B (Second-Price):** Highest bid wins; winner pays the **highest losing bid** (second price).

### Key Insight:
Should you submit the exact same bid under both rules? **No!**
- Under Rule A, bidding HK$100,000 guarantees **zero profit** even if you win ($100,000 - 100,000 = 0$). You must strategically **shade your bid** below HK$100,000.
- Under Rule B, your bid decides only **whether you win**, not **what you pay**. Bidding your exact valuation of HK$100,000 is a **weakly dominant strategy**.

---

## 3. Valuation Environments: Private Value vs. Common Value

Before analyzing bidding rules, an executive must classify the **informational environment**:

| Environment | Economic Definition | Corporate Examples | Strategic Question |
| :--- | :--- | :--- | :--- |
| **Private Value** | A bidder's valuation depends exclusively on its own internal preferences, cost structure, or end-use utility. Learning rivals' valuations would not alter own value. | Art acquired for personal enjoyment, custom manufacturing equipment, proprietary internal software licenses. | *"What is this asset worth to my specific business?"* |
| **Common Value** | The underlying asset possesses a shared, objective monetary value across all competitors, but bidders hold imperfect, noisy private signals or engineering estimates. | Offshore oil drilling blocks, company acquisition for resale, 5G wireless spectrum rights, government mineral extraction. | *"Would learning rivals' signals change my estimate of the asset's true value?"* |

---

## 4. The Four Canonical Auction Formats

Every auction mechanism consists of an **allocation rule** and a **payment rule**:

```
                       ┌───────────────────────────────┐
                       │    Canonical Auction Formats  │
                       └──────────────┬────────────────┘
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   ▼
     [ Sealed Bids ]                                     [ Open Formats ]
   ┌────────────────────────────────┐                  ┌────────────────────────────────┐
   │ 1. First-Price Sealed Bid      │                  │ 3. English Ascending           │
   │    Highest bid wins, pays own  │                  │    Price rises until 1 remains │
   │ 2. Second-Price Sealed (Vickrey│                  │ 4. Dutch Descending Clock      │
   │    Highest bid wins, pays 2nd  │                  │    Price drops until 1 accepts │
   └────────────────────────────────┘                  └────────────────────────────────┘
```

### Strategic Equivalence Pairs:
1. **English Open Ascending $\approx$ Second-Price Sealed Bid (Vickrey):**  
   In an English ascending auction with private values, each bidder remains active until the standing price reaches their valuation. The auction terminates the instant the second-highest bidder drops out. The winner acquires the asset at approximately the second-highest valuation!
2. **Dutch Open Descending $\approx$ First-Price Sealed Bid:**  
   In a Dutch clock auction, no information is revealed while the clock ticks downward. The first bidder to hit the buzzer wins and immediately pays that standing clock price. Deciding when to stop the clock requires balancing the exact same trade-off as choosing a sealed bid in a first-price auction.

---

## 5. Second-Price Auction: Why Truthful Bidding ($b=v$) is Weakly Dominant

In a private-value Second-Price (Vickrey) auction, **bidding your true valuation ($b^* = v$) is a weakly dominant strategy**. It yields a payoff at least as high as any alternative bid, regardless of the highest rival bid $r$.

### Mathematical Dominance Proof:
Let your true valuation be $v$, your submitted bid be $b$, and the highest rival bid be $r$:

1. **Scenario 1: Highest Rival Bid Below Your Value ($r < v$):**
   - You want to win because the transaction is profitable: Surplus $= v - r > 0$.
   - **Bidding $b = v$:** Wins and pays $r$, yielding positive surplus $v - r > 0$.
   - **Underbidding ($b < v$):** If you underbid below $r$ ($b < r < v$), you **lose** the auction, earning $0$ instead of $v - r$. If you underbid above $r$ ($r < b < v$), you still pay $r$. Underbidding never reduces your payment; it only creates the risk of losing profitable deals!

2. **Scenario 2: Highest Rival Bid Above Your Value ($r > v$):**
   - You want to lose because winning requires paying more than the item is worth: $v - r < 0$.
   - **Bidding $b = v$:** Loses cleanly and pays nothing, yielding surplus $0$.
   - **Overbidding ($b > v$):** If you overbid above $r$ ($v < r < b$), you win the item but must pay $r > v$, suffering a **net loss** ($v - r < 0$). If you overbid below $r$ ($v < b < r$), you still lose. Overbidding never improves your surplus; it only introduces the catastrophic risk of winning at an unprofitable price!

> **The Vickrey Separation Principle:**  
> *Your bid determines whether you win; the rival's bid determines what you pay.*

---

## 6. First-Price Auction: The Bid-Shading Optimization Trade-off

In a First-Price auction, the winner pays their **own bid**. Bidding your true value ($b = v$) guarantees zero surplus upon winning ($v - v = 0$). Bidders must strategically **shade their bids**.

### The Fundamental Trade-off:
- **Bid Higher ($b \uparrow$):** Increases the probability of winning $\Pr(\text{Win}) = F(b)^{n-1}$, but leaves a smaller profit margin conditional on winning $(v - b)$.
- **Bid Lower ($b \downarrow$):** Captures a larger profit margin $(v - b)$ if you win, but increases the probability that a rival outbids you.

### Risk-Neutral Symmetric Bayesian Nash Equilibrium:
Under $n$ symmetric, risk-neutral bidders with private valuations distributed uniformly on $[0, V_{\max}]$:

$$b^*(v) = \frac{n - 1}{n} v$$

| Number of Bidders ($n$) | Equilibrium Bid $b^*(v)$ | Strategic Interpretation |
| :---: | :---: | :--- |
| **$n = 2$** | $b^*(v) = \frac{1}{2} v = 0.50 v$ | Heavy shading; low competitive pressure allows capturing 50% margin. |
| **$n = 3$** | $b^*(v) = \frac{2}{3} v \approx 0.67 v$ | Moderate shading; rival competition disciplines discounts. |
| **$n = 4$** | $b^*(v) = \frac{3}{4} v = 0.75 v$ | High competition; bidders bid 75% of value. |
| **$n \to \infty$** | $b^*(v) \to v$ | Perfectly competitive limit; bid shading vanishes. |

### The Impact of Risk Aversion:
If bidders are **risk-averse** (represented by utility $u(w) = w^\alpha$ with $0 < \alpha < 1$):
$$b^*(v) = \frac{n - 1}{n - 1 + \alpha} v > \frac{n - 1}{n} v$$
Risk-averse executives **shade less aggressively** (bid higher) because the fear of losing entirely outweighs the desire for extra profit margin.

---

## 7. The Revenue Equivalence Theorem: Benchmark & Caveats

### The Theorem (Vickrey 1961, Riley & Samuelson 1981):
> Under four benchmark conditions, **all four canonical auction formats** (First-Price, Second-Price, English, Dutch) yield the **exact same expected seller revenue**!

$$\mathbb{E}[\text{Seller Revenue}] = \frac{n - 1}{n + 1} V_{\max}$$

### Intuition:
Suppose four bidders value an asset at 10, 9, 8, and 7.
- In a Second-Price auction, truthful bidding causes the bidder with valuation 10 to win and pay **9**.
- In a First-Price auction, the winner pays their own bid, but shades it. Under equilibrium shading, the expected bid of the highest-valuation bidder equals **9**.
Strategic bid adjustment perfectly offsets the apparent difference in payment rules on average!

### The 4 Strict Assumptions (When Revenue Equivalence Breaks):
1. **Risk Neutrality:** If bidders are risk-averse, First-Price auctions yield strictly **higher revenue** than Second-Price auctions because fear of losing forces aggressive bidding.
2. **Symmetric Bidders:** If one bidder has a known structural advantage (e.g., an incumbent vs. an entrant), Second-Price auctions can suffer from entrant deterrence, while First-Price auctions may generate higher revenue.
3. **Independent Private Values (IPV):** In common-value settings, English auctions reveal rivals' signals dynamically, mitigating the Winner's Curse and yielding higher seller revenue than sealed-bid formats.
4. **Efficient Allocation to the Highest Valuation:** Reserve prices, bidder caps, and entry fees distort allocations.

---

## 8. The Winner's Curse in Common-Value Settings

In common-value auctions (e.g., mineral rights, real estate redevelopment, tech acquisitions), the asset has a shared true value $V$, but each bidder receives an imperfect private signal $s_i = V + \epsilon_i$.

### The Core Information Trap:
- If all bidders submit bids based on their naive unconditional estimate $\mathbb{E}[V | s_i]$, **the winner is the bidder who received the highest, most optimistic error $\max(\epsilon_i)$**!
- **Winning is informative:** The very fact that you won means that *every single competitor estimated the asset to be worth less than you did*.
- If you failed to discount for this adverse selection in advance, you will overpay:

$$\mathbb{E}[V \mid \text{Winning}] = \mathbb{E}[V \mid s_i > \max_{j \neq i} s_j] < \mathbb{E}[V \mid s_i]$$

> **Executive Rule:**  
> *Rational bidding requires conditioning your bid not on your unconditional estimate today, but on the hypothetical scenario that your estimate turns out to be the highest among all competitors.*

---

## 9. Modern Strategic Applications

### 1. Platform Proxy Bidding (eBay Style):
Bidders enter their maximum willingness to pay ($v$). The automated proxy agent raises the standing bid by the minimum required increment whenever a competitor bids, stopping strictly at the stated ceiling. This operationalizes an English ascending auction with minimal monitoring costs.

### 2. Digital Search Advertising (Google Ads & GSP):
Search engines allocate sponsored ad positions using **Generalized Second Price (GSP)** auctions. Advertisers submit maximum bids per click, which are multiplied by a Quality Score (CTR and relevance). The winner pays the minimum bid necessary to defeat the advertiser ranked directly below them.

### 3. Spectrum Auctions:
Governments allocate radio spectrum blocks characterized by **complementarities** (neighbouring geographic regions are more valuable together) and **substitutabilities** (overlapping frequencies cause technical redundancy). Designing spectrum auctions requires combinatorial clock package mechanics.

### 4. Procurement & Reverse Auctions:
In corporate procurement, one buyer solicits bids from multiple suppliers. The lowest bidder wins.
- **Two-Dimensional Scoring:** Because low-cost suppliers often carry higher bankruptcy, delivery, or quality failure risks, enterprise buyers deploy formulaic scoring:
$$\text{Total Score} = w_{\text{price}} \cdot \text{PriceScore} + w_{\text{quality}} \cdot \text{QualityScore}$$

---

## 10. Checklist for Auction Strategy & Analysis (Slide 25)

When preparing to bid in or design an auction, execute this 6-step diagnostic checklist:

1. **Define the Environment:** What object or package is being allocated? Who are the eligible competitors?
2. **Classify Values:** Is this a private-value setting (own use/cost) or a common-value setting (shared resale/production asset)?
3. **Inspect the Rules:** Are bids open or sealed? What is the allocation rule? What is the payment rule (own bid vs. second price)?
4. **Check Information Flows:** What information is revealed before, during, and after bidding?
5. **Derive the Strategic Incentive:** Should you bid truthfully (Second-Price / English) or shade your bid (First-Price / Dutch)?
6. **Adjust for the Winner's Curse & Quality:** If common values exist, shade for adverse selection. If procurement, state verifiable minimum quality standards.

---

## 11. Exit Ticket Synthesis & Key Formulas

- **Second-Price Truthful Bidding:** $b^*(v) = v$ (Weakly dominant in private values).
- **First-Price Bid Shading:** $b^*(v) = \frac{n-1}{n} v$ (Under risk neutrality and uniform $[0, V_{\max}]$).
- **Revenue Equivalence Benchmark:** $\mathbb{E}[\text{Revenue}] = \frac{n-1}{n+1} V_{\max}$ across all four canonical formats under IPV.
- **Winner's Curse Correction:** $\text{Bid} = \mathbb{E}[V \mid s_i = \max_{j} s_j]$.
