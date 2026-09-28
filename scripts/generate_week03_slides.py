#!/usr/bin/env python3
"""
Generate professional 16:9 Beamer-style slide deck for Week 03:
Games with Simultaneous Moves & Nash Equilibrium
Instructor: Chiu Yu Ko, CUHK Business School
Course: DOTE 3090 - Strategic Thinking: Game Theory for Business Strategy
"""
import os
import subprocess

def esc(text):
    return str(text).replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

class SlideDeck:
    def __init__(self, filename="public/slides/week03.pdf"):
        self.filename = filename
        self.ps = []
        self.total_pages = 20
        self.current_page = 0
        
        self.ps.append("%!PS-Adobe-3.0")
        self.ps.append("%%BoundingBox: 0 0 454 255")
        self.ps.append(f"%%Pages: {self.total_pages}")
        self.ps.append("%%Orientation: Landscape")
        self.ps.append("%%EndComments")
        
    def start_slide(self, title="", subtitle=""):
        self.current_page += 1
        p = self.current_page
        self.ps.append(f"%%Page: {p} {p}")
        self.ps.append("save")
        
        # Deep navy/slate background
        self.ps.append("0.05 0.08 0.15 setrgbcolor")
        self.ps.append("0 0 454 255 rectfill")
        
        # Header banner (unless title slide)
        if p > 1:
            self.ps.append("0.10 0.13 0.23 setrgbcolor")
            self.ps.append("0 223 454 32 rectfill")
            
            # Accent divider
            self.ps.append("0.39 0.40 0.95 setrgbcolor") # Indigo 500
            self.ps.append("0 221 454 2 rectfill")
            
            # Title text
            self.ps.append("1 1 1 setrgbcolor")
            self.ps.append("/Helvetica-Bold findfont 11 scalefont setfont")
            self.ps.append("16 233 moveto")
            self.ps.append(f"({esc(title)}) show")
            
            if subtitle:
                self.ps.append("0.65 0.72 0.90 setrgbcolor")
                self.ps.append("/Helvetica findfont 8 scalefont setfont")
                self.ps.append("270 234 moveto")
                self.ps.append(f"({esc(subtitle)}) show")
                
            # Footer banner
            self.ps.append("0.08 0.10 0.18 setrgbcolor")
            self.ps.append("0 0 454 16 rectfill")
            self.ps.append("0.50 0.55 0.70 setrgbcolor")
            self.ps.append("/Helvetica findfont 7 scalefont setfont")
            self.ps.append("16 5 moveto")
            self.ps.append("(Week 3: Games with Simultaneous Moves  |  Chiu Yu Ko  |  CUHK Business School) show")
            self.ps.append(f"415 5 moveto ({p}/{self.total_pages}) show")

    def end_slide(self):
        self.ps.append("restore")
        self.ps.append("showpage")
        
    def text(self, x, y, string, font="Helvetica", size=9, color=(0.85, 0.88, 0.95)):
        r, g, b = color
        self.ps.append(f"{r:.2f} {g:.2f} {b:.2f} setrgbcolor")
        self.ps.append(f"/{font} findfont {size} scalefont setfont")
        self.ps.append(f"{x} {y} moveto")
        self.ps.append(f"({esc(string)}) show")

    def box(self, x, y, w, h, fill=(0.10, 0.14, 0.25), stroke=(0.20, 0.26, 0.45), r=0):
        fr, fg, fb = fill
        self.ps.append(f"{fr:.2f} {fg:.2f} {fb:.2f} setrgbcolor")
        self.ps.append(f"{x} {y} {w} {h} rectfill")
        if stroke:
            sr, sg, sb = stroke
            self.ps.append(f"{sr:.2f} {sg:.2f} {sb:.2f} setrgbcolor")
            self.ps.append("1 setlinewidth")
            self.ps.append(f"{x} {y} {w} {h} rectstroke")

    def draw_matrix(self, x, y, p1_name, p2_name, a1, a2, cells, eq_cells=None):
        """
        Draws a 2x2 matrix at (x, y)
        cells is [[(u1, u2), (u1, u2)], [(u1, u2), (u1, u2)]]
        """
        cell_w, cell_h = 76, 26
        # P2 header
        self.text(x + 50, y + 42, f"Player 2: {p2_name}", font="Helvetica-Bold", size=8, color=(0.55, 0.75, 1.0))
        self.text(x + 40, y + 30, a2[0], font="Helvetica-Bold", size=7.5, color=(0.7, 0.8, 0.95))
        self.text(x + 40 + cell_w, y + 30, a2[1], font="Helvetica-Bold", size=7.5, color=(0.7, 0.8, 0.95))
        
        # P1 header
        self.text(x - 65, y + 10, f"Player 1: {p1_name}", font="Helvetica-Bold", size=8, color=(0.4, 0.9, 0.6))
        self.text(x - 55, y + 2, a1[0], font="Helvetica-Bold", size=7.5, color=(0.7, 0.8, 0.95))
        self.text(x - 55, y - 24, a1[1], font="Helvetica-Bold", size=7.5, color=(0.7, 0.8, 0.95))
        
        for r_idx in range(2):
            for c_idx in range(2):
                cx = x + 15 + c_idx * cell_w
                cy = y - (r_idx * cell_h)
                is_eq = eq_cells and (r_idx, c_idx) in eq_cells
                if is_eq:
                    fill_col = (0.18, 0.16, 0.35)
                    stroke_col = (0.95, 0.75, 0.20)
                else:
                    fill_col = (0.08, 0.11, 0.20)
                    stroke_col = (0.20, 0.25, 0.40)
                self.box(cx, cy, cell_w, cell_h, fill=fill_col, stroke=stroke_col)
                u1, u2 = cells[r_idx][c_idx]
                self.text(cx + 12, cy + 9, str(u1), font="Helvetica-Bold", size=9, color=(0.4, 0.9, 0.6))
                self.text(cx + 34, cy + 9, ",", font="Helvetica", size=9, color=(0.6, 0.6, 0.6))
                self.text(cx + 42, cy + 9, str(u2), font="Helvetica-Bold", size=9, color=(0.4, 0.75, 1.0))
                if is_eq:
                    self.text(cx + 20, cy + 1, "★ Nash Eq", font="Helvetica-Bold", size=6, color=(1.0, 0.8, 0.2))

    def build(self):
        # -------------------------------------------------------------
        # Slide 1: Title Slide
        # -------------------------------------------------------------
        self.start_slide()
        # Top banner styling
        self.box(0, 185, 454, 70, fill=(0.08, 0.12, 0.24), stroke=None)
        self.ps.append("0.39 0.40 0.95 setrgbcolor")
        self.ps.append("0 183 454 2 rectfill")
        
        self.text(24, 224, "Week 3: Games with Simultaneous Moves", font="Helvetica-Bold", size=15, color=(1, 1, 1))
        self.text(24, 204, "Nash Equilibrium, Best Responses & Strategic Market Stability", font="Helvetica", size=10, color=(0.7, 0.78, 0.95))
        self.text(24, 190, "DOTE 3090: Strategic Thinking: Game Theory for Business Strategy", font="Helvetica-Bold", size=7.5, color=(0.5, 0.85, 0.65))
        
        self.box(24, 45, 406, 120, fill=(0.09, 0.13, 0.22), stroke=(0.20, 0.26, 0.42))
        self.text(42, 140, "Course Instructor:", font="Helvetica-Bold", size=9, color=(0.6, 0.7, 0.85))
        self.text(140, 140, "Prof. Chiu Yu Ko", font="Helvetica-Bold", size=11, color=(1, 1, 1))
        self.text(42, 122, "Institution:", font="Helvetica-Bold", size=9, color=(0.6, 0.7, 0.85))
        self.text(140, 122, "Department of Decision Sciences and Managerial Economics, CUHK", font="Helvetica", size=9, color=(0.85, 0.9, 0.98))
        self.text(42, 104, "Term & Academic Year:", font="Helvetica-Bold", size=9, color=(0.6, 0.7, 0.85))
        self.text(140, 104, "Semester 2026-27 Term 1  |  MBA & Executive Master Curriculum", font="Helvetica", size=8.5, color=(0.85, 0.9, 0.98))
        
        self.box(42, 58, 370, 32, fill=(0.14, 0.18, 0.32), stroke=(0.35, 0.42, 0.70))
        self.text(54, 76, "Central Principle:", font="Helvetica-Bold", size=8.5, color=(0.4, 0.9, 0.6))
        self.text(54, 64, "\"In simultaneous moves, neither firm observes the other's action before choosing.", font="Helvetica", size=8, color=(1, 1, 1))
        self.text(54, 53, "Strategic stability requires every player to choose their best response to rivals' choices.\"", font="Helvetica-Oblique", size=8, color=(0.85, 0.9, 1))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 2: Motivating Decision
        # -------------------------------------------------------------
        self.start_slide("Opening Decision: Duopoly Capacity Choice", "Motivating Case")
        self.text(18, 202, "The Situation: Airbus vs. Boeing Wide-Body Production Planning", font="Helvetica-Bold", size=10, color=(1, 1, 1))
        self.text(18, 188, "Both aircraft manufacturers must finalize annual wide-body production schedules simultaneously.", font="Helvetica", size=8.5, color=(0.8, 0.85, 0.95))
        self.text(18, 176, "Neither firm can observe the rival's exact assembly rate before committing billions to supply chains.", font="Helvetica", size=8.5, color=(0.8, 0.85, 0.95))
        
        self.draw_matrix(140, 110, "Airbus", "Boeing", ["Mod Capacity", "High Capacity"], ["Mod Capacity", "High Capacity"],
                         [[("$8B", "$8B"), ("$2B", "$10B")],
                          [("$10B", "$2B"), ("$4B", "$4B")]],
                         eq_cells=[(1, 1)])
        
        self.box(18, 24, 418, 48, fill=(0.10, 0.14, 0.25), stroke=(0.30, 0.36, 0.60))
        self.text(28, 56, "Strategic Diagnosis:", font="Helvetica-Bold", size=8.5, color=(0.95, 0.75, 0.2))
        self.text(28, 44, "• If Boeing chooses Moderate, Airbus earns $10B by choosing High vs $8B choosing Moderate.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 32, "• If Boeing chooses High, Airbus earns $4B by choosing High vs $2B choosing Moderate.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 20, "• High Capacity is Airbus's strictly dominant strategy! Symmetric logic yields High for Boeing.", font="Helvetica-Bold", size=8, color=(0.4, 0.9, 0.6))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 3: Learning Outcomes
        # -------------------------------------------------------------
        self.start_slide("Today's Learning Outcomes", "Session Objectives")
        self.text(18, 202, "By the conclusion of this quantitative workshop, executives will be able to:", font="Helvetica-Bold", size=9.5, color=(1, 1, 1))
        
        outcomes = [
            ("1", "Formalize Best Response Functions:", "Compute optimal strategic actions conditional on any rival choice."),
            ("2", "Identify Nash Equilibria:", "Detect strategically stable profiles using cell inspection and best response crossings."),
            ("3", "Execute IESDS:", "Systematically prune strictly dominated moves to simplify complex multidimensional games."),
            ("4", "Diagnose the 4 Classic 2x2 Archetypes:", "Prisoner's Dilemma, Coordination Game, Hawk-Dove, and Matching Pennies."),
            ("5", "Compare Cournot vs. Bertrand Competition:", "Contrast simultaneous quantity choice against cutthroat price competition.")
        ]
        
        y = 175
        for num, heading, desc in outcomes:
            self.box(18, y - 8, 22, 22, fill=(0.20, 0.25, 0.45), stroke=(0.40, 0.50, 0.90))
            self.text(26, y - 2, num, font="Helvetica-Bold", size=10, color=(1, 1, 1))
            self.text(48, y + 3, heading, font="Helvetica-Bold", size=8.5, color=(0.4, 0.9, 0.6))
            self.text(48, y - 8, desc, font="Helvetica", size=8, color=(0.85, 0.88, 0.95))
            y -= 31
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 4: Strategic Foundations: Simultaneous Moves Defined
        # -------------------------------------------------------------
        self.start_slide("Strategic Foundations: Simultaneous Moves Defined", "Timing & Information")
        self.box(18, 140, 200, 75, fill=(0.10, 0.14, 0.26), stroke=(0.30, 0.38, 0.65))
        self.text(28, 198, "What 'Simultaneous' Really Means:", font="Helvetica-Bold", size=9, color=(0.4, 0.9, 0.6))
        self.text(28, 184, "• NOT that decisions occur on the exact same second.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 172, "• It means: NO player observes the other's choice", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 160, "  before executing their own strategic action.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 148, "• Information sets are imperfect and concurrent.", font="Helvetica-Bold", size=8, color=(0.95, 0.75, 0.2))

        self.box(230, 140, 206, 75, fill=(0.10, 0.14, 0.26), stroke=(0.30, 0.38, 0.65))
        self.text(240, 198, "Corporate Examples in the Wild:", font="Helvetica-Bold", size=9, color=(0.4, 0.75, 1.0))
        self.text(240, 184, "• Sealed-bid public procurement and spectrum tenders.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(240, 172, "• Annual Black Friday product discounting & promotions.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(240, 160, "• Fab node capacity investments in semiconductor foundry.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(240, 148, "• Next-gen video console launch prices (Sony vs MSFT).", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))

        self.box(18, 30, 418, 95, fill=(0.08, 0.11, 0.20), stroke=(0.22, 0.28, 0.45))
        self.text(28, 108, "The Mental Shift from Sequential to Simultaneous Analysis:", font="Helvetica-Bold", size=9, color=(1, 1, 1))
        self.text(28, 92, "1. In Sequential Games (Week 2): You look ahead and see what rival DID or WILL do at subgames.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 78, "2. In Simultaneous Games (Week 3): You must simultaneously form a rational conjecture about rival moves.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 64, "3. Equilibrium requires beliefs to be mutually consistent: each firm accurately anticipates the other.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 48, "4. Neither firm has regret post-revelation: no incentive to deviate unilaterally.", font="Helvetica-Bold", size=8.5, color=(0.4, 0.9, 0.6))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 5: The Normal Form (Payoff Matrix) Representation
        # -------------------------------------------------------------
        self.start_slide("The Normal Form (Payoff Matrix) Representation", "Analytical Tool")
        self.text(18, 202, "Standard 3-Tuple Specification of a Simultaneous Game: G = < N, {S_i}, {u_i} >", font="Helvetica-Bold", size=9.5, color=(1, 1, 1))
        
        self.box(18, 85, 170, 105, fill=(0.10, 0.14, 0.26), stroke=(0.28, 0.35, 0.60))
        self.text(28, 172, "Key Matrix Components:", font="Helvetica-Bold", size=8.5, color=(0.4, 0.9, 0.6))
        self.text(28, 156, "1. N = {1, 2, ..., n} Players", font="Helvetica-Bold", size=8, color=(1, 1, 1))
        self.text(28, 144, "2. S_i: Strategy set of player i", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 132, "3. u_i(s_1, s_2): Payoff function", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 116, "Convention:", font="Helvetica-Bold", size=8, color=(0.95, 0.75, 0.2))
        self.text(28, 104, "• Row Player payoff = 1st number", font="Helvetica", size=7.5, color=(0.4, 0.9, 0.6))
        self.text(28, 92, "• Col Player payoff = 2nd number", font="Helvetica", size=7.5, color=(0.4, 0.75, 1.0))
        
        self.draw_matrix(265, 135, "Firm 1", "Firm 2", ["Action L", "Action R"], ["Action U", "Action D"],
                         [[("u1(L,U)", "u2(L,U)"), ("u1(L,D)", "u2(L,D)")],
                          [("u1(R,U)", "u2(R,U)"), ("u1(R,D)", "u2(R,D)")]])
        
        self.box(18, 24, 418, 48, fill=(0.09, 0.12, 0.22), stroke=(0.20, 0.26, 0.44))
        self.text(28, 56, "Managerial Diagnostic Checklist:", font="Helvetica-Bold", size=8, color=(1, 1, 1))
        self.text(28, 44, "• Check completeness: Are all realistic executive actions enumerated in strategy sets S_i?", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 32, "• Check payoff symmetry vs asymmetry: Do firms face identical cost curves or legacy handicaps?", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 6: Best Responses: The Core Mathematical Principle
        # -------------------------------------------------------------
        self.start_slide("Best Responses: The Core Mathematical Principle", "Equilibrium Foundation")
        self.box(18, 138, 418, 74, fill=(0.12, 0.16, 0.30), stroke=(0.35, 0.45, 0.75))
        self.text(28, 196, "Mathematical Definition of Best Response Function BR_i(s_{-i}):", font="Helvetica-Bold", size=9.5, color=(0.4, 0.9, 0.6))
        self.text(28, 180, "A strategy s_i* is player i's Best Response to rival profile s_{-i} if and only if:", font="Helvetica", size=8.5, color=(1, 1, 1))
        self.text(60, 162, "u_i(s_i*, s_{-i}) >= u_i(s_i, s_{-i})     for all other available strategies s_i in S_i", font="Helvetica-Bold", size=9, color=(0.95, 0.75, 0.2))
        self.text(28, 146, "It answers the fundamental executive question: 'Given what rival chooses, what maximizes my return?'", font="Helvetica-Oblique", size=8, color=(0.8, 0.9, 1))

        self.box(18, 25, 200, 100, fill=(0.09, 0.12, 0.22), stroke=(0.22, 0.28, 0.45))
        self.text(28, 108, "Strict vs. Weak Dominance:", font="Helvetica-Bold", size=8.5, color=(0.4, 0.75, 1.0))
        self.text(28, 94, "• Strictly Dominant Strategy:", font="Helvetica-Bold", size=8, color=(1, 1, 1))
        self.text(32, 82, "BR to EVERY possible rival strategy.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 70, "• Strictly Dominated Strategy:", font="Helvetica-Bold", size=8, color=(1, 1, 1))
        self.text(32, 58, "Another action yields strictly higher payoff", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(32, 46, "regardless of what rival does.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 34, "Rule: Rational players NEVER play dominated moves!", font="Helvetica-Bold", size=7.5, color=(0.95, 0.35, 0.35))

        self.box(230, 25, 206, 100, fill=(0.09, 0.12, 0.22), stroke=(0.22, 0.28, 0.45))
        self.text(240, 108, "The Underline Algorithm (Step-by-Step):", font="Helvetica-Bold", size=8.5, color=(0.4, 0.75, 1.0))
        self.text(240, 94, "1. Hold Player 2's action fixed in Col 1.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(240, 82, "   Underline Player 1's highest payoff in that column.", font="Helvetica", size=7.5, color=(0.4, 0.9, 0.6))
        self.text(240, 70, "2. Repeat for all remaining columns.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(240, 58, "3. Hold Player 1's action fixed in Row 1.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(240, 46, "   Underline Player 2's highest payoff in that row.", font="Helvetica", size=7.5, color=(0.4, 0.75, 1.0))
        self.text(240, 34, "4. Any cell with BOTH payoffs underlined is a Nash Eq!", font="Helvetica-Bold", size=7.5, color=(0.95, 0.75, 0.2))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 7: Iterated Elimination of Strictly Dominated Strategies (IESDS)
        # -------------------------------------------------------------
        self.start_slide("Iterated Elimination of Strictly Dominated Strategies (IESDS)", "Pruning Noise")
        self.text(18, 202, "Pruning Non-Rational Strategic Noise from High-Dimensional Decisions", font="Helvetica-Bold", size=9.5, color=(1, 1, 1))
        
        self.box(18, 110, 418, 80, fill=(0.10, 0.14, 0.26), stroke=(0.28, 0.35, 0.60))
        self.text(28, 176, "The 3 Axioms of IESDS in Business Analysis:", font="Helvetica-Bold", size=8.5, color=(0.4, 0.9, 0.6))
        self.text(28, 162, "Axiom 1: A rational executive will NEVER choose a strictly dominated action under any scenario.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 148, "Axiom 2: Knowing rival is rational, you anticipate they will NEVER play their dominated actions either.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 134, "Axiom 3: Pruning dominated rows/cols may render previously undominated actions dominated in round 2.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 120, "Guaranteed Property: IESDS NEVER eliminates any Nash Equilibrium! Order of deletion does not matter.", font="Helvetica-Bold", size=8, color=(0.95, 0.75, 0.2))

        self.box(18, 24, 418, 74, fill=(0.08, 0.11, 0.20), stroke=(0.22, 0.28, 0.45))
        self.text(28, 84, "Managerial Power of Dominance Solvability:", font="Helvetica-Bold", size=8.5, color=(1, 1, 1))
        self.text(28, 70, "• When IESDS reduces the game to a single unique cell, the game is called Dominance Solvable.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 56, "• You do NOT need mutual trust, coordination, or communication to predict the outcome.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 42, "• Common knowledge of rationality alone guarantees that players will converge to this equilibrium.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 30, "• Caveat: If rival is non-rational or faces hidden private payoffs, IESDS predictions fail!", font="Helvetica-Bold", size=7.5, color=(0.95, 0.35, 0.35))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 8: What is a Nash Equilibrium?
        # -------------------------------------------------------------
        self.start_slide("What is a Nash Equilibrium?", "Core Theory")
        self.box(18, 138, 418, 74, fill=(0.14, 0.18, 0.32), stroke=(0.35, 0.45, 0.80))
        self.text(28, 196, "Formal Definition (John Forbes Nash Jr., 1950):", font="Helvetica-Bold", size=10, color=(1, 1, 1))
        self.text(28, 180, "A strategy profile (s_1*, s_2*, ..., s_n*) is a Nash Equilibrium if for every player i:", font="Helvetica", size=8.5, color=(0.85, 0.9, 0.95))
        self.text(80, 162, "u_i(s_i*, s_{-i}*) >= u_i(s_i, s_{-i}*)     for all possible actions s_i", font="Helvetica-Bold", size=9, color=(0.4, 0.9, 0.6))
        self.text(28, 146, "Plain English: No player can unilaterally improve their payoff by changing their own action alone.", font="Helvetica-Bold", size=8.5, color=(0.95, 0.75, 0.2))

        self.box(18, 25, 200, 100, fill=(0.09, 0.12, 0.22), stroke=(0.22, 0.28, 0.45))
        self.text(28, 108, "Why Nash Equilibrium Matters in Business:", font="Helvetica-Bold", size=8.5, color=(0.4, 0.75, 1.0))
        self.text(28, 94, "• Strategic Stability: It is self-enforcing.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 82, "• No player experiences ex-post regret.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 70, "• If a non-equilibrium state is proposed,", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 58, "  at least one firm has a private incentive", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 46, "  to cheat or renege secretly.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 34, "• Therefore, cartels without enforcement collapse.", font="Helvetica-Bold", size=7.5, color=(0.95, 0.35, 0.35))

        self.box(230, 25, 206, 100, fill=(0.09, 0.12, 0.22), stroke=(0.22, 0.28, 0.45))
        self.text(240, 108, "Common Executive Fallacies to Avoid:", font="Helvetica-Bold", size=8.5, color=(0.95, 0.75, 0.2))
        self.text(240, 94, "Fallacy 1: 'Nash Equilibrium maximizes total profit.'", font="Helvetica-Bold", size=7.5, color=(0.95, 0.35, 0.35))
        self.text(240, 82, "False! Prisoner's dilemma equilibrium is Pareto-inferior.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(240, 70, "Fallacy 2: 'Every game has exactly one Nash Eq.'", font="Helvetica-Bold", size=7.5, color=(0.95, 0.35, 0.35))
        self.text(240, 58, "False! May have 0 pure eq (Matching Pennies) or 2+ (Coordination).", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(240, 46, "Fallacy 3: 'Nash Equilibrium requires cooperation.'", font="Helvetica-Bold", size=7.5, color=(0.95, 0.35, 0.35))
        self.text(240, 34, "False! It assumes ruthless non-cooperative self-interest.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 9: Finding Pure Strategy Nash Equilibria: Underline Method
        # -------------------------------------------------------------
        self.start_slide("Finding Pure Strategy Nash Equilibria", "Technique & Demonstration")
        self.text(18, 202, "Step-by-Step Demonstration of the Underline Best-Response Algorithm:", font="Helvetica-Bold", size=9.5, color=(1, 1, 1))

        self.draw_matrix(140, 115, "Firm 1", "Firm 2", ["Strategy A", "Strategy B"], ["Strategy X", "Strategy Y"],
                         [[("5", "4"), ("1", "6")],
                          [("7", "2"), ("3", "3")]],
                         eq_cells=[(1, 1)])
                         
        self.box(18, 22, 418, 54, fill=(0.10, 0.14, 0.25), stroke=(0.30, 0.36, 0.60))
        self.text(28, 62, "Step-by-Step Verification:", font="Helvetica-Bold", size=8.5, color=(0.4, 0.9, 0.6))
        self.text(28, 50, "• If Firm 2 plays X: Firm 1 compares 5 (A) vs 7 (B) -> Firm 1 chooses B. Underline 7.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 38, "• If Firm 2 plays Y: Firm 1 compares 1 (A) vs 3 (B) -> Firm 1 chooses B. Underline 3. (B is dominant for P1!)", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 26, "• If Firm 1 plays B: Firm 2 compares 2 (X) vs 3 (Y) -> Firm 2 chooses Y. Underline 3.", font="Helvetica-Bold", size=7.5, color=(0.95, 0.75, 0.2))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 10: Archetype 1: The Prisoner's Dilemma
        # -------------------------------------------------------------
        self.start_slide("Archetype 1: The Prisoner's Dilemma", "Classic 2x2 Games")
        self.text(18, 202, "Dominant Defection & Joint Profit Destruction in Price Wars", font="Helvetica-Bold", size=9.5, color=(1, 1, 1))

        self.draw_matrix(140, 120, "Firm 1", "Firm 2", ["Cooperate (High P)", "Defect (Discount)"], ["Cooperate (High P)", "Defect (Discount)"],
                         [[("$10M", "$10M"), ("$2M", "$14M")],
                          [("$14M", "$2M"), ("$4M", "$4M")]],
                         eq_cells=[(1, 1)])
                         
        self.box(18, 22, 418, 54, fill=(0.14, 0.10, 0.15), stroke=(0.60, 0.25, 0.25))
        self.text(28, 62, "Strategic Diagnosis & Executive Lessons:", font="Helvetica-Bold", size=8.5, color=(0.95, 0.40, 0.40))
        self.text(28, 50, "• Structure: Each player has a strictly dominant strategy to Defect, regardless of rival move.", font="Helvetica", size=7.5, color=(0.9, 0.85, 0.85))
        self.text(28, 38, "• Paradox: Unique Nash Eq [Defect, Defect] ($4M, $4M) is Pareto-dominated by [Coop, Coop] ($10M, $10M).", font="Helvetica", size=7.5, color=(0.9, 0.85, 0.85))
        self.text(28, 26, "• Business Manifestations: Food-delivery coupons, airline seat wars, aggressive digital ad spending.", font="Helvetica-Bold", size=7.5, color=(1, 1, 1))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 11: Archetype 2: Coordination Games & Standard Wars
        # -------------------------------------------------------------
        self.start_slide("Archetype 2: Coordination Games & Standard Wars", "Classic 2x2 Games")
        self.text(18, 202, "Multiple Equilibria, Network Externalities, and Focal Points", font="Helvetica-Bold", size=9.5, color=(1, 1, 1))

        self.draw_matrix(140, 120, "Sony", "Microsoft", ["Standard Alpha", "Standard Beta"], ["Standard Alpha", "Standard Beta"],
                         [[("$12B", "$8B"), ("$0B", "$0B")],
                          [("$0B", "$0B"), ("$8B", "$12B")]],
                         eq_cells=[(0, 0), (1, 1)])
                         
        self.box(18, 22, 418, 54, fill=(0.10, 0.14, 0.25), stroke=(0.30, 0.40, 0.70))
        self.text(28, 62, "Strategic Diagnosis & Executive Lessons:", font="Helvetica-Bold", size=8.5, color=(0.4, 0.75, 1.0))
        self.text(28, 50, "• Structure: TWO pure Nash Equilibria: (Alpha, Alpha) and (Beta, Beta). Miscoordination yields zero!", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 38, "• Key Problem: How do players coordinate without formal merger? Requires Focal Points (Schelling Points).", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 26, "• Real Cases: EV charging standards (Tesla NACS vs CCS), Blu-ray vs HD-DVD, 5G wireless protocols.", font="Helvetica-Bold", size=7.5, color=(1, 1, 1))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 12: Archetype 3: Hawk-Dove / Chicken & Brinkmanship
        # -------------------------------------------------------------
        self.start_slide("Archetype 3: Hawk-Dove / Chicken & Brinkmanship", "Classic 2x2 Games")
        self.text(18, 202, "Anti-Coordination, Mutually Destructive Collisions, and Preemption", font="Helvetica-Bold", size=9.5, color=(1, 1, 1))

        self.draw_matrix(140, 120, "Firm 1", "Firm 2", ["Accommodate (Dove)", "Aggressive (Hawk)"], ["Accommodate (Dove)", "Aggressive (Hawk)"],
                         [[("$4M", "$4M"), ("$1M", "$8M")],
                          [("$8M", "$1M"), ("-$10M", "-$10M")]],
                         eq_cells=[(0, 1), (1, 0)])
                         
        self.box(18, 22, 418, 54, fill=(0.14, 0.12, 0.10), stroke=(0.60, 0.45, 0.20))
        self.text(28, 62, "Strategic Diagnosis & Executive Lessons:", font="Helvetica-Bold", size=8.5, color=(0.95, 0.75, 0.20))
        self.text(28, 50, "• Structure: Two asymmetric equilibria where ONE firm acts aggressive and the other backs down.", font="Helvetica", size=7.5, color=(0.95, 0.9, 0.85))
        self.text(28, 38, "• Worst Outcome: Mutual aggression triggers mutual ruin (-$10M, -$10M).", font="Helvetica", size=7.5, color=(0.95, 0.9, 0.85))
        self.text(28, 26, "• Winning Strategy: Irreversible commitment to Hawk (e.g. public contractual penalties or burned bridges).", font="Helvetica-Bold", size=7.5, color=(1, 1, 1))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 13: Archetype 4: Matching Pennies & No Pure Equilibrium
        # -------------------------------------------------------------
        self.start_slide("Archetype 4: Matching Pennies & Mixed Strategies", "Classic 2x2 Games")
        self.text(18, 202, "Zero-Sum Games, Cyclical Incentives, and Unpredictability", font="Helvetica-Bold", size=9.5, color=(1, 1, 1))

        self.draw_matrix(140, 120, "Inspector", "Target Firm", ["Audit / Heads", "Pass / Tails"], ["Comply / Heads", "Cheat / Tails"],
                         [[("+1", "-1"), ("-1", "+1")],
                          [("-1", "+1"), ("+1", "-1")]],
                         eq_cells=[])
                         
        self.box(18, 22, 418, 54, fill=(0.10, 0.14, 0.25), stroke=(0.35, 0.45, 0.75))
        self.text(28, 62, "Strategic Diagnosis & Executive Lessons:", font="Helvetica-Bold", size=8.5, color=(0.4, 0.9, 0.6))
        self.text(28, 50, "• Structure: Pure conflict of interest. NO pure strategy Nash equilibrium exists!", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 38, "• Cyclical Trap: If Target complies, Inspector passes; if Inspector passes, Target cheats; if Target cheats...", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 26, "• Solution Preview (Week 4): Mixed strategies (deliberate randomization to stay unpredictable).", font="Helvetica-Bold", size=7.5, color=(0.95, 0.75, 0.2))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 14: Cournot (Quantity) Competition in Oligopoly
        # -------------------------------------------------------------
        self.start_slide("Cournot (Quantity) Competition in Oligopoly", "Market Structure")
        self.box(18, 138, 200, 75, fill=(0.10, 0.14, 0.26), stroke=(0.30, 0.38, 0.65))
        self.text(28, 198, "The Cournot Model Architecture:", font="Helvetica-Bold", size=9, color=(0.4, 0.9, 0.6))
        self.text(28, 184, "• Dual firms choose quantities q_1, q_2 simultaneously.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 172, "• Market clears at price P(Q) = a - b(q_1 + q_2).", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 160, "• Best Response Function q_1*(q_2) is downward sloping:", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(35, 148, "q_1*(q_2) = (a - c - b*q_2) / (2b)", font="Helvetica-Bold", size=8, color=(0.95, 0.75, 0.2))

        self.box(230, 138, 206, 75, fill=(0.10, 0.14, 0.26), stroke=(0.30, 0.38, 0.65))
        self.text(240, 198, "Strategic Equilibrium Properties:", font="Helvetica-Bold", size=9, color=(0.4, 0.75, 1.0))
        self.text(240, 184, "• Quantities are strategic substitutes: Rival expands -> you contract.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(240, 172, "• Symmetric Cournot equilibrium: q_1* = q_2* = (a - c) / (3b).", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(240, 160, "• Market Price sits strictly between Monopoly and Perfect Comp:", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(245, 148, "P_monopoly > P_cournot > P_competitive = MC", font="Helvetica-Bold", size=8, color=(0.4, 0.9, 0.6))

        self.box(18, 25, 418, 100, fill=(0.08, 0.11, 0.20), stroke=(0.22, 0.28, 0.45))
        self.text(28, 110, "Where Cournot Best Describes Business Reality:", font="Helvetica-Bold", size=8.5, color=(1, 1, 1))
        self.text(28, 96, "• Heavy industries requiring irreversible advance capacity investments:", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(38, 84, "- Commercial aircraft assembly capacity (Boeing vs Airbus)", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(38, 72, "- Semiconductor wafer fab allocation (TSMC vs Samsung vs Intel Foundry)", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(38, 60, "- Global crude oil production quotas (OPEC+ member production)", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 44, "• Takeaway: When production lead times are long, capacity choices determine final market power.", font="Helvetica-Bold", size=7.5, color=(0.4, 0.9, 0.6))
        self.text(28, 32, "  Capacity preemption acts as an effective commitment device.", font="Helvetica-Oblique", size=7.5, color=(0.85, 0.9, 0.95))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 15: Bertrand (Price) Competition & The Bertrand Trap
        # -------------------------------------------------------------
        self.start_slide("Bertrand (Price) Competition & The Bertrand Trap", "Market Structure")
        self.box(18, 138, 200, 75, fill=(0.14, 0.10, 0.12), stroke=(0.60, 0.30, 0.30))
        self.text(28, 198, "The Bertrand Model (Price Competition):", font="Helvetica-Bold", size=9, color=(0.95, 0.4, 0.4))
        self.text(28, 184, "• Dual firms choose prices p_1, p_2 simultaneously.", font="Helvetica", size=7.5, color=(0.9, 0.85, 0.85))
        self.text(28, 172, "• Products are homogeneous; buyers buy lowest price.", font="Helvetica", size=7.5, color=(0.9, 0.85, 0.85))
        self.text(28, 160, "• Undercutting incentive: shaving price by $0.01 steals", font="Helvetica", size=7.5, color=(0.9, 0.85, 0.85))
        self.text(28, 148, "  100% of market demand.", font="Helvetica", size=7.5, color=(0.9, 0.85, 0.85))

        self.box(230, 138, 206, 75, fill=(0.14, 0.10, 0.12), stroke=(0.60, 0.30, 0.30))
        self.text(240, 198, "The Bertrand Paradox:", font="Helvetica-Bold", size=9, color=(0.95, 0.75, 0.2))
        self.text(240, 184, "• Unique Nash Eq: p_1* = p_2* = Marginal Cost (c).", font="Helvetica-Bold", size=8, color=(1, 1, 1))
        self.text(240, 172, "• With ONLY TWO FIRMS, economic profits drop to ZERO!", font="Helvetica-Bold", size=8, color=(0.95, 0.35, 0.35))
        self.text(240, 160, "• Oligopoly collapses into perfect competition pricing.", font="Helvetica", size=7.5, color=(0.9, 0.85, 0.85))
        self.text(240, 148, "• Devastating for executive shareholder returns.", font="Helvetica-Oblique", size=7.5, color=(0.9, 0.85, 0.85))

        self.box(18, 25, 418, 100, fill=(0.08, 0.11, 0.20), stroke=(0.22, 0.28, 0.45))
        self.text(28, 110, "How Strategic Executives Escape the Bertrand Trap:", font="Helvetica-Bold", size=8.5, color=(0.4, 0.9, 0.6))
        self.text(28, 96, "1. Product Differentiation: Build brand moats, proprietary UI, ecosystem lock-in (Apple vs Android).", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 84, "2. Capacity Constraints: Edgeworth modification - if rival cannot serve all demand, price stays above MC.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 72, "3. Customer Switching Costs: Contractual terms, enterprise integration API locks, data stickiness.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 60, "4. Tacit Collusion via Repeated Play: Escaping short-term price cuts to maintain long-term margins (Week 6).", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 44, "Core Lesson: Never compete on identical price alone without structural protection.", font="Helvetica-Bold", size=8, color=(0.95, 0.75, 0.2))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 16: Case 1: Airbus vs. Boeing Capacity Game
        # -------------------------------------------------------------
        self.start_slide("Business Case 1: Airbus vs. Boeing", "Case Applications")
        self.box(18, 138, 418, 74, fill=(0.10, 0.14, 0.26), stroke=(0.30, 0.38, 0.65))
        self.text(28, 196, "Wide-Body Aircraft Preemption & Duopoly Supply Discipline:", font="Helvetica-Bold", size=9.5, color=(0.4, 0.9, 0.6))
        self.text(28, 180, "• The commercial aircraft sector is a duopoly protected by multi-billion dollar R&D barriers.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 166, "• When designing next-gen aircraft (A350 vs B787), both firms faced capacity ramp-up decisions.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 152, "• If both build aggressive assembly lines, market oversupply slashes lease rates and margins.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))

        self.box(18, 25, 418, 100, fill=(0.08, 0.11, 0.20), stroke=(0.22, 0.28, 0.45))
        self.text(28, 108, "Game Theoretic Analysis:", font="Helvetica-Bold", size=8.5, color=(1, 1, 1))
        self.text(28, 94, "1. Capacity commitment is irreversible: Tooling and supplier long-term contracts lock in output.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 82, "2. Cournot reaction functions apply: High capacity by Boeing depresses Airbus's residual marginal revenue.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 70, "3. Preemptive signaling: Announcing firm orders with major airlines (Emirates, United) shifts rival expectations.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 54, "Managerial Takeaway:", font="Helvetica-Bold", size=8, color=(0.95, 0.75, 0.2))
        self.text(28, 42, "In capital-intensive industries, capacity preemption acts as an extensive-form bridge into a simultaneous", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 30, "production game, forcing the competitor along their downward-sloping best response curve.", font="Helvetica-Bold", size=7.5, color=(0.4, 0.9, 0.6))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 17: Case 2: Sony PlayStation vs. Microsoft Xbox Launch Pricing
        # -------------------------------------------------------------
        self.start_slide("Business Case 2: Sony PlayStation vs. Microsoft Xbox", "Case Applications")
        self.box(18, 138, 418, 74, fill=(0.10, 0.14, 0.26), stroke=(0.30, 0.38, 0.65))
        self.text(28, 196, "Hardware Subsidization & Simultaneous Platform Entry Games:", font="Helvetica-Bold", size=9.5, color=(0.4, 0.75, 1.0))
        self.text(28, 180, "• Console cycles (PS3 vs Xbox 360, PS4 vs Xbox One, PS5 vs Xbox Series X) feature intense simultaneous pricing.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 166, "• Two-sided market dynamics: Installing an active gamer base attracts third-party game publishers (EA, Ubisoft).", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 152, "• Subsidizing hardware at a loss (selling at $399 when BOM cost is $450) is compensated by royalty cuts.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))

        self.box(18, 25, 418, 100, fill=(0.08, 0.11, 0.20), stroke=(0.22, 0.28, 0.45))
        self.text(28, 108, "Game Theoretic Analysis:", font="Helvetica-Bold", size=8.5, color=(1, 1, 1))
        self.text(28, 94, "• In 2013 (E3 Conference), Microsoft announced Xbox One at $499 (bundled with Kinect sensor).", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 82, "• Hours later, Sony announced PS4 at $399, exploiting Microsoft's miscalculated cost structure.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 70, "• In 2020 (PS5 vs Series X), both firms waited until weeks before holiday launch to reveal price simultaneously.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 54, "Managerial Takeaway:", font="Helvetica-Bold", size=8, color=(0.95, 0.75, 0.2))
        self.text(28, 42, "In two-sided platforms, hardware price is not an isolated margin driver, but the gateway to life-time", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 30, "software royalties. The Nash Equilibrium entails pricing hardware close to marginal cost.", font="Helvetica-Bold", size=7.5, color=(0.4, 0.9, 0.6))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 18: Case 3: OPEC+ Crude Oil Quotas & Cheating
        # -------------------------------------------------------------
        self.start_slide("Business Case 3: OPEC+ Crude Oil Quotas & Cheating", "Case Applications")
        self.box(18, 138, 418, 74, fill=(0.12, 0.14, 0.26), stroke=(0.30, 0.38, 0.65))
        self.text(28, 196, "The Multilateral Cartel Prisoner's Dilemma:", font="Helvetica-Bold", size=9.5, color=(0.95, 0.75, 0.20))
        self.text(28, 180, "• Global oil demand is inelastic in the short run; collective production cuts boost global barrel price.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 166, "• Cartel Agreement: Saudi Arabia, UAE, Russia agree to strict output quotas.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 152, "• Individual Cheating Incentive: Once price is high ($85/bbl), each member earns millions by pumping +5%.", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))

        self.box(18, 25, 418, 100, fill=(0.08, 0.11, 0.20), stroke=(0.22, 0.28, 0.45))
        self.text(28, 108, "Game Theoretic Analysis:", font="Helvetica-Bold", size=8.5, color=(1, 1, 1))
        self.text(28, 94, "• In a one-shot simultaneous game, Overproducing is each member's strictly dominant strategy.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 82, "• If all overproduce, global oil crashes to $35/bbl, harming all producers.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 70, "• Sustaining Cartel Discipline requires satellite tanker tracking (monitoring) and credible punishment (Saudi flood).", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 54, "Managerial Takeaway:", font="Helvetica-Bold", size=8, color=(0.4, 0.9, 0.6))
        self.text(28, 42, "No collusive agreement can survive on goodwill alone. A Nash Equilibrium requires that defecting is immediately", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 30, "detected and countered with retaliatory capacity.", font="Helvetica-Bold", size=7.5, color=(0.95, 0.75, 0.2))
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 19: Executive Synthesis & Key Takeaways
        # -------------------------------------------------------------
        self.start_slide("Executive Synthesis: 5 Strategic Rules of Thumb", "Executive Summary")
        self.text(18, 202, "Strategic Checklist for Decision-Makers in Simultaneous Competitive Arenas:", font="Helvetica-Bold", size=9.5, color=(1, 1, 1))

        rules = [
            ("Rule 1", "Never Play Dominated Moves:", "Systematically audit executive options; delete actions that lose regardless of rival actions."),
            ("Rule 2", "Anticipate Rival Rationality:", "Do not assume your competitors will make obvious mistakes; model their best responses."),
            ("Rule 3", "Seek Self-Enforcing Deals:", "Any strategic partnership without aligned incentives will collapse into defection at equilibrium."),
            ("Rule 4", "Choose the Dimension Wisely:", "Compete on Capacity/Quantity (Cournot) when possible; avoid homogeneous Price wars (Bertrand)."),
            ("Rule 5", "Transform the Game:", "If trapped in a destructive Nash Eq, change the payoffs: differentiate, merge, or alter timing.")
        ]
        
        y = 175
        for num, heading, desc in rules:
            self.box(18, y - 8, 40, 22, fill=(0.14, 0.18, 0.32), stroke=(0.35, 0.45, 0.75))
            self.text(22, y - 2, num, font="Helvetica-Bold", size=8, color=(0.4, 0.9, 0.6))
            self.text(66, y + 3, heading, font="Helvetica-Bold", size=8.5, color=(1, 1, 1))
            self.text(66, y - 8, desc, font="Helvetica", size=8, color=(0.85, 0.88, 0.95))
            y -= 31
        self.end_slide()

        # -------------------------------------------------------------
        # Slide 20: Looking Ahead to Week 4
        # -------------------------------------------------------------
        self.start_slide("Looking Ahead to Week 4: Mixed Strategies", "Next Session Roadmap")
        self.box(18, 130, 418, 80, fill=(0.10, 0.14, 0.26), stroke=(0.30, 0.40, 0.70))
        self.text(28, 192, "Preview: Mixed Strategies & Randomization in Business Strategy", font="Helvetica-Bold", size=10, color=(0.4, 0.9, 0.6))
        self.text(28, 176, "• What happens when a game has NO Pure Strategy Nash Equilibrium (like Matching Pennies)?", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 162, "• How do retail platforms (Amazon, Target) use algorithmic price randomization to prevent competitor price-matching bots?", font="Helvetica", size=8, color=(0.85, 0.9, 0.95))
        self.text(28, 148, "• The Indifference Principle: How to calculate optimal mixed strategy probability distributions.", font="Helvetica-Bold", size=8, color=(0.95, 0.75, 0.2))

        self.box(18, 25, 418, 92, fill=(0.08, 0.11, 0.20), stroke=(0.22, 0.28, 0.45))
        self.text(28, 100, "Recommended Week 3 Post-Workshop Assignments:", font="Helvetica-Bold", size=8.5, color=(1, 1, 1))
        self.text(28, 86, "1. Review the Full Lecture Recap in this portal (interactive payoff models & matrix inspector).", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 72, "2. Solve the Airbus vs. Boeing Case Study in the 'Case & Payoff Model' tab.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 58, "3. Complete Week 3 Strategy Quiz (5 scenario-based executive questions).", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 44, "4. Experiment with custom 2x2 matrices in the embedded Strategy Simulator & GameTikzStudio.", font="Helvetica", size=7.5, color=(0.85, 0.9, 0.95))
        self.text(28, 32, "Faculty X Primer: https://x.com/kochiuyu/status/2040209356831199262", font="Helvetica-Oblique", size=7.5, color=(0.4, 0.75, 1.0))
        self.end_slide()

        # Write out PostScript
        ps_content = "\n".join(self.ps)
        ps_path = "/tmp/week03.ps"
        with open(ps_path, "w") as f:
            f.write(ps_content)
            
        # Convert with Ghostscript
        cmd = [
            "gs", "-q", "-dNOPAUSE", "-dBATCH",
            "-sDEVICE=pdfwrite",
            "-dCompatibilityLevel=1.5",
            "-dPDFSETTINGS=/prepress",
            f"-sOutputFile={self.filename}",
            ps_path
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print("GS error:", res.stderr)
            raise RuntimeError(res.stderr)
        print(f"Generated {self.filename} ({os.path.getsize(self.filename)} bytes)")

if __name__ == "__main__":
    deck = SlideDeck("public/slides/week03.pdf")
    deck.build()
