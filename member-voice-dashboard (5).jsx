import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const THEMES = [
  {
    name: "Support & Servicing",
    pct: 21.9, ratio: "1 in 5", mentions: 100, total: 457, color: "#0f224e",
    headline: "Locals are running on fumes — and nobody's refuelling them.",
    quote: "I'm drowning. My members are drowning. And every time I call for a lifeline, I get a voicemail.",
    speaker: "Local president",
    desc: "The single loudest signal across every townhall. Local leaders describe being overwhelmed, under-resourced, and left to figure it out alone — while their members pay the price.",
    ramQuote: "If you can't tell me the staff-to-member ratio — if administration can't answer that basic question — then we don't have a staffing plan. We have a staffing crisis we're choosing not to measure.",
    ramSource: "Ram Selvarajah, Dec 2025 Townhall"
  },
  {
    name: "Transparency & Accountability",
    pct: 17.9, ratio: "1 in 6", mentions: 82, total: 457, color: "#3e5184",
    headline: "Members want to know where their dues go. They're not getting answers.",
    quote: "We're paying dues while locals on strike run out of money for hand warmers. Meanwhile, 30 people fly in for a conference. Where's the accountability?",
    speaker: "Member",
    desc: "Financial clarity isn't a nice-to-have — it's a trust issue. Members are asking basic questions about budgets, spending, and priorities, and they feel stonewalled.",
    ramQuote: "It's your money. It's your dues. There shouldn't be any hide-and-seek on it. Every resolution with a dollar sign on it should go through a value-for-money lens.",
    ramSource: "Ram Selvarajah, Dec 2025 Townhall"
  },
  {
    name: "Training & Capacity",
    pct: 16.0, ratio: "1 in 6", mentions: 73, total: 457, color: "#3e5184",
    headline: "Stewards are being sent into fights they haven't been trained for.",
    quote: "The employer rep across the table does this full-time. I got a two-day workshop three years ago. How is that a fair fight?",
    speaker: "Steward",
    desc: "Education is too generic, too rare, and too disconnected from what members actually face. OPS and BPS members get lumped together despite completely different realities.",
    ramQuote: "Our strength is in our educated members. If your steward can't quote the collective agreement back to the employer, that's not a steward problem — that's a training failure.",
    ramSource: "Ram Selvarajah, Feb 2026 Townhall"
  },
  {
    name: "Communication & Engagement",
    pct: 15.5, ratio: "1 in 6", mentions: 71, total: 457, color: "#6b7f99",
    headline: "Members aren't apathetic. They're just not being asked.",
    quote: "Nobody told me there was a union card. Nobody told me I could get involved. I found out by accident — and now I'm a steward. How many people never get that accident?",
    speaker: "Steward",
    desc: "The disconnect isn't laziness — it's infrastructure. Members want two-way communication, not one-way newsletters. They want to be invited, not informed after the fact.",
    ramQuote: "Members aren't apathetic — they're not being invited in. Nobody's asking them because we're not involving them. That has to change from day one.",
    ramSource: "Ram Selvarajah, Nov 2025 Townhall"
  },
  {
    name: "Culture, Respect & Inclusion",
    pct: 10.3, ratio: "1 in 10", mentions: 47, total: 457, color: "#574b4f",
    headline: "There's a climate of fear — and members know it.",
    quote: "I support you. But I can't like your post. I can't be seen. The culture at OPSEU right now is terrifying and I can't jeopardize my job by publicly supporting you. I'm sorry.",
    speaker: "Member, Feb 2026",
    desc: "Factionalism, side-channel politics, and a culture where speaking up feels risky. Members see it. They feel it. And it's eroding trust from the inside.",
    ramQuote: "When members are afraid to publicly agree with a good idea because of who said it — that's not politics. That's a climate of fear. And it's killing honest conversation in this union.",
    ramSource: "Ram Selvarajah, Feb 2026 Townhall"
  },
  {
    name: "Grievance & Representation",
    pct: 6.3, ratio: "1 in 16", mentions: 29, total: 457, color: "#7a6058",
    headline: "When members need help most, the system isn't there.",
    quote: "Five staff reps in four years. Every time you start over. Every time you explain your whole situation from scratch. At some point you just stop calling.",
    speaker: "Member, Feb 2026",
    desc: "Grievance handling is the core test of a union. Members describe a system where overworked reps, constant turnover, and impossible caseloads mean their issues fall through the cracks.",
    ramQuote: "You call your staff rep and you get a response: I'm in bargaining, won't be back for weeks. Not available. That's not a system — that's a breakdown.",
    ramSource: "Ram Selvarajah, Feb 2026 Townhall"
  },
  {
    name: "Bread-and-Butter Priorities",
    pct: 6.1, ratio: "1 in 16", mentions: 28, total: 457, color: "#dca694",
    headline: "We're earning 1995 wages in a 2026 economy.",
    quote: "I can't afford to volunteer for the union. I can't afford to attend convention. I'm choosing between groceries and gas. And you want me to be engaged?",
    speaker: "Member, Feb 2026",
    desc: "Wages haven't kept pace since 2012. BPS workers hover near minimum wage. The cost-of-living crisis isn't abstract — it's why members feel abandoned by the institutions meant to fight for them.",
    ramQuote: "For us to expect members to engage in the union when they're struggling for their basic needs — housing, groceries, gas — it's tough. We have to fight for the fundamentals first.",
    ramSource: "Ram Selvarajah, Feb 2026 Townhall"
  },
  {
    name: "Renewal & Younger Members",
    pct: 5.9, ratio: "1 in 17", mentions: 27, total: 457, color: "#b89080",
    headline: "Young workers have energy. The union has a door that's closed.",
    quote: "I just knew I was paying dues. I had no idea who was involved, what the chain of command was, or how I could get involved. Nobody ever told me.",
    speaker: "Provincial Young Workers rep, Dec 2025",
    desc: "Young workers bring exactly what the movement needs — energy, digital fluency, urgency. But seniority culture, inaccessible structures, and zero outreach keep them on the outside.",
    ramQuote: "If we're not dragging our young people in, we're going to lose the union movement. They have a lot to contribute — but we have to open the door first.",
    ramSource: "Ram Selvarajah, Dec 2025 Townhall"
  }
];

const ISSUE_CARDS = [
  {
    title: "Staff Rep Workload & Availability",
    freq: 25, townhalls: "every session", icon: "🔥", urgency: "critical",
    memberVoice: "Members across every session described staff reps who are unavailable, burned out, on leave, or juggling too many locals. Some locals have cycled through 3–6 staff reps in a single year. When a rep is in bargaining, there's no backup. When they leave, there's no knowledge transfer. One member noted that some staff rep bundles include 16 locals — and with 60%+ of locals in some form of bargaining, the math simply doesn't work.",
    quote: "We've had about five or six staff reps in the last four years. Every time, you start over.",
    quoteSpeaker: "Member, Feb 2026",
    plan: "Commission a proper workload audit of all staff positions. Establish measurable staff-to-member ratios. Implement knowledge transfer protocols when staff change assignments. Create a feedback mechanism so local presidents can flag gaps in real time.",
    ramTake: "I've asked OPSEU administration for a workload assessment and a staff-to-member ratio — and I've been unable to get an answer. That tells you everything. As First VP, the first order of business is measuring the problem we've been ignoring."
  },
  {
    title: "Local Support & Restructuring",
    freq: 22, townhalls: "every session", icon: "🏗️", urgency: "critical",
    memberVoice: "Local presidents say they're running their locals off the side of their desks. The book-off formula is outdated and doesn't account for geography, sector diversity, or the real demands on local leaders. Composite locals with vastly different bargaining units are tearing themselves apart. Northern locals with massive geographic territories will never meet the numbers-based thresholds.",
    quote: "Our archaic book-off formula needs to be reevaluated for its effectiveness — it's inherently biased.",
    quoteSpeaker: "Local president, Nov 2025",
    plan: "Comprehensive local health check — every local's structure, resources, and capacity reviewed. Revisit the book-off formula to reflect geography, sector diversity, and real workload. Build a 'local health' early warning system where signs of struggle trigger support, not punishment.",
    ramTake: "Every local should get a health check — structure, resources, capacity. And when a local is struggling, the response should be support, not punishment. We need to flip that instinct."
  },
  {
    title: "Financial Transparency & Budget Accountability",
    freq: 18, townhalls: "every session", icon: "💰", urgency: "high",
    memberVoice: "Members want to see where their dues go. The budget process feels opaque, top-heavy, and disconnected from local needs. Money is spent on conferences where 28–30 people fly in, convention merchandise of questionable quality, and heritage celebrations heavy on catering instead of education — while locals on strike are running out of money for hand warmers.",
    quote: "Way too much money is wasted on inefficient projects and wasteful costly resources.",
    quoteSpeaker: "Member, Jan 2026",
    plan: "Every resolution with financial implications gets a value-for-money assessment. Start the budget process earlier so members have real input. Full campaign finance transparency.",
    ramTake: "I've been VP of OPTrust and CFO of three companies. I know what financial accountability looks like. Every dollar of member dues should be traceable, defensible, and working harder than it is now."
  },
  {
    title: "Technology Modernization",
    freq: 16, townhalls: "5 of 6 sessions", icon: "💻", urgency: "high",
    memberVoice: "The cyber attack came up repeatedly as a symbol of how fragile and outdated the union's tech infrastructure is. UnionWare is archaic. Campaign and membership data don't sync. Local presidents can't access their own membership lists. There's no centralized system for tracking grievances, staff workload, or board performance.",
    quote: "The software is very archaic. There's currently a wait list for members to have a Benefits Officer review their claim.",
    quoteSpeaker: "Member, Jan 2026",
    plan: "Full technology modernization: replace or upgrade UnionWare, build a real-time membership database local presidents can actually access, create dashboards for key metrics, and sync campaign and membership data.",
    ramTake: "IT is my profession. I know this space. IT and information is the backbone of any organization — we need to invest in it, not treat it as an afterthought while the whole system crumbles."
  },
  {
    title: "Board Division & Toxic Culture",
    freq: 14, townhalls: "5 of 6 sessions", icon: "⚠️", urgency: "high",
    memberVoice: "Members describe the Executive Board as divided into factions, with WhatsApp side-chats undermining meetings, performative politics replacing policy debate, and a climate where supporting the 'wrong' candidate can have professional consequences. Members privately message support but won't like posts publicly.",
    quote: "Don't play dirty politics in the boardroom at the cost of our members' welfare and services.",
    quoteSpeaker: "Member, Feb 2026",
    plan: "Culture reset focused on mission-driven governance. Every board decision evaluated against member impact. Side-chats addressed head-on. Zero-tolerance approach to political intimidation.",
    ramTake: "Put away those cell phones and WhatsApp chats that are separate from the discussion happening at the board. You can lead from any chair — but only if the culture lets people lead honestly."
  },
  {
    title: "Member Engagement & Organizing Model",
    freq: 14, townhalls: "every session", icon: "📢", urgency: "high",
    memberVoice: "Members see OPSEU as a service provider, not their union. Engagement is estimated at 30% in some areas. The shift from organizing to servicing has eroded grassroots power. New members have no idea what the union does — many don't even know their union card exists.",
    quote: "The OPS is in dire straits, with approximately 30% of members engaged. And yet, the Exec Board voted against extending the mobilizers who were actually working — with no backup plan.",
    quoteSpeaker: "Member, Jan 2026",
    plan: "Rebuild engagement by rebuilding locals — empower stewards, protect them, make them feel backed. Measure engagement through local health metrics and participation data. Create feedback loops so the board knows what's happening on the ground.",
    ramTake: "My entire approach is the answer to this: townhalls open to all members, cross-sector, where I listen first and build the agenda from what members say. Rebuilding engagement starts with actually showing up and asking."
  },
  {
    title: "Young Worker Inclusion & Mentorship",
    freq: 12, townhalls: "5 of 6 sessions", icon: "🌱", urgency: "medium",
    memberVoice: "Young workers describe feeling shut out by seniority culture. They don't know how to get involved, aren't told about opportunities, and can't afford to attend conventions or training. They bring exactly what the union needs: energy, social media skills, and willingness to organize.",
    quote: "As a young worker myself, I just knew I was paying dues. I didn't know who was involved or how I can get involved.",
    quoteSpeaker: "Provincial Young Workers rep, Dec 2025",
    plan: "Barrier reduction: subsidized convention attendance, mentorship programs pairing retirees with new workers, dedicated space for young workers on committees and in education.",
    ramTake: "I personally nominated the Provincial Young Workers rep who spoke at our townhall. That's not a talking point — that's a track record. We need to be opening doors, not waiting for people to knock."
  },
  {
    title: "Education & Training Reform",
    freq: 11, townhalls: "5 of 6 sessions", icon: "📚", urgency: "medium",
    memberVoice: "Training is too generic — OPS and BPS lumped into the same classroom despite completely different collective agreements. Stewards return saying they didn't learn anything relevant. Meanwhile, they're facing off against employer reps whose full-time job is knowing the CA.",
    quote: "My stewards are returning after training saying we didn't learn anything.",
    quoteSpeaker: "Local president, Jan 2026",
    plan: "Split OPS and BPS educationals where appropriate. CA-specific, customized training delivered by staff reps who know the unit. Every new collective agreement followed by mandatory education.",
    ramTake: "Every new collective agreement should be followed by mandatory education for every affected steward. Our strength is in our educated members — but right now we're not giving them the tools."
  },
  {
    title: "Hiring Transparency & Accountability",
    freq: 10, townhalls: "3 of 6 sessions", icon: "🔍", urgency: "medium",
    memberVoice: "Members feel OPSEU's staff hiring is opaque, with perceptions of nepotism cutting across every identity group. MDT program graduates don't always get a chance at temporary staff positions, and there's no clear merit-based process visible to members.",
    quote: "Fair, transparent, and skill-based hiring — not loaded like a reward. Real equity.",
    quoteSpeaker: "Member, Feb 2026",
    plan: "Published criteria, open competitions, evaluation feedback, and genuine enforcement of the constitutional preference for hiring from membership.",
    ramTake: "Ask any OPSEU member if all members deserve equal opportunity — they'd say yes. The problem isn't the principle. It's that we've substituted tokenized roles and performative statements for actual policy change, public education, and long-term strategy. When equity is symbolic instead of structural, it doesn't build trust — it builds resentment."
  },
  {
    title: "Wages & Cost-of-Living Adjustments",
    freq: 9, townhalls: "5 of 6 sessions", icon: "📉", urgency: "medium",
    memberVoice: "Real wages haven't kept up with inflation since approximately 2012 — in purchasing power terms, members are earning circa-1995 wages. BPS workers in sectors like Dynacare and developmental services are barely above minimum wage.",
    quote: "We're actually earning circa 1995 wages, in terms of real wages vis-a-vis inflation and productivity.",
    quoteSpeaker: "Member, Feb 2026",
    plan: "Cost-of-living adjustments in every contract. Ensure bargaining teams have the data and resources to fight for real gains. Synchronize industry-level bargaining where possible.",
    ramTake: "Cost-of-living adjustments in every contract — that's not aspirational, that's a baseline. Workers facing the same employer should be coordinated, not isolated."
  },
  {
    title: "Financial Misconduct & Accountability Gaps",
    freq: 8, townhalls: "3 of 6 sessions", icon: "⚖️", urgency: "watching",
    memberVoice: "Ongoing legal disputes tied to past leadership came up in multiple sessions. Members are divided — some want justice and full recovery of funds, others worry the legal costs are outpacing what will be recovered. Separately, a case involving a local president misappropriating over $120,000 was raised as part of a broader pattern: when money goes missing, the systems that should have caught it weren't there.",
    quote: "We want resolution — not perpetual litigation. But if there are no real consequences when members' money disappears, what does that tell the next person?",
    quoteSpeaker: "Member",
    plan: "Pursue accountability through appropriate legal channels. More importantly, build the financial controls, audit processes, and oversight systems that prevent misuse of member funds — not just respond to it after the damage is done.",
    ramTake: "Justice matters. But the bigger lesson is that we need systems that catch problems before they become scandals. We can't keep being reactive — we need real financial controls baked into how this union operates."
  },
  {
    title: "Retirees as a Resource",
    freq: 7, townhalls: "3 of 6 sessions", icon: "🤝", urgency: "opportunity",
    memberVoice: "Retirees represent a massive, untapped resource. They carry decades of institutional knowledge, are willing to mentor, and want to stay involved. At only $10 for a lifetime retiree membership, locals are leaving value on the table.",
    quote: "Retirees carry decades of knowledge and they want to stay involved. At $10 for a lifetime membership, we're leaving incredible value on the table.",
    quoteSpeaker: "Member",
    plan: "Formalize the role of retirees: as educators, mentors, and honorary LEC members. Locals should budget for retiree engagement and actively recruit retiring members before they disengage.",
    ramTake: "Retiree involvement bridges two problems at once — knowledge transfer and local capacity. A $10 lifetime membership and decades of experience? That's the best investment in the union."
  },
];

const PULL_QUOTES = [
  { text: "I'm drowning. My members are drowning. And every time I call for a lifeline, I get a voicemail.", speaker: "Local president" },
  { text: "Don't play dirty politics in the boardroom at the cost of our members' welfare and services.", speaker: "Member, Feb 2026" },
  { text: "I can't afford to volunteer for the union. I can't afford convention. I'm choosing between groceries and gas. And you want me to be engaged?", speaker: "Member, Feb 2026" },
  { text: "Nobody told me there was a union card. Nobody told me I could get involved. I found out by accident.", speaker: "Steward" },
  { text: "I support you. But I can't like your post. I can't be seen. The culture at OPSEU right now is terrifying and I can't jeopardize my job by publicly supporting you. I'm sorry.", speaker: "Member, Feb 2026" },
  { text: "Way too much money is wasted on inefficient projects and wasteful costly resources. Where is that accountability?", speaker: "Member, Jan 2026" },
];

const URGENCY_CONFIG = {
  critical: { label: "Critical", bg: "#DC2626" },
  high: { label: "High Priority", bg: "#EA580C" },
  medium: { label: "Recurring", bg: "#3e5184" },
  watching: { label: "Watching", bg: "#6b7f99" },
  opportunity: { label: "Opportunity", bg: "#16A34A" },
};

/* ═══════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════ */

function AnimateIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`
    }}>{children}</div>
  );
}

function StatCard({ value, label, sublabel, dark }) {
  return (
    <div style={{
      background: dark ? "#0f224e" : "rgba(27,58,92,0.06)",
      color: dark ? "#fff" : "#0f224e",
      borderRadius: 14, padding: "28px 24px", flex: "1 1 200px", minWidth: 180,
    }}>
      <div style={{ fontFamily: "var(--f-display)", fontSize: "2.8rem", fontWeight: 700, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: "0.95rem", fontWeight: 600, marginTop: 8, lineHeight: 1.3 }}>{label}</div>
      {sublabel && <div style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: 4 }}>{sublabel}</div>}
    </div>
  );
}

function QuoteCarousel() {
  const [c, setC] = useState(0);
  useEffect(() => { const t = setInterval(() => setC(p => (p + 1) % PULL_QUOTES.length), 6000); return () => clearInterval(t); }, []);
  const q = PULL_QUOTES[c];
  return (
    <div style={{ background: "linear-gradient(135deg, #0f224e, #3e5184)", borderRadius: 20, padding: "48px 40px", position: "relative", overflow: "hidden", minHeight: 200 }}>
      <div style={{ position: "absolute", top: 20, left: 30, fontFamily: "var(--f-display)", fontSize: "8rem", color: "rgba(255,255,255,0.06)", lineHeight: 1, userSelect: "none" }}>&ldquo;</div>
      <div key={c} style={{ animation: "fadeQ 0.6s ease", position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: "var(--f-body)", fontSize: "1.35rem", color: "#fff", lineHeight: 1.55, fontStyle: "italic", margin: "0 0 16px 0", maxWidth: 640 }}>&ldquo;{q.text}&rdquo;</p>
        <cite style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", fontStyle: "normal", fontWeight: 600 }}>&mdash; {q.speaker}</cite>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 28, position: "relative", zIndex: 1 }}>
        {PULL_QUOTES.map((_, i) => (
          <button key={i} onClick={() => setC(i)} style={{ width: i === c ? 28 : 8, height: 8, borderRadius: 4, background: i === c ? "#dca694" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
        ))}
      </div>
      <style>{`@keyframes fadeQ{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STACKED BAR
   ═══════════════════════════════════════════ */

function StackedBar({ activeIndex, onSelect }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{
        display: "flex", borderRadius: 8, overflow: "hidden", height: 40, cursor: "pointer",
        border: "1px solid rgba(27,58,92,0.1)",
      }}>
        {THEMES.map((t, i) => (
          <div
            key={i}
            onClick={() => onSelect(i)}
            title={`${t.name}: ${t.pct}%`}
            style={{
              width: `${t.pct}%`,
              background: t.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff",
              fontSize: t.pct > 8 ? "0.75rem" : "0.6rem",
              fontWeight: 700,
              transition: "opacity 0.2s, filter 0.2s",
              opacity: activeIndex !== null && activeIndex !== i ? 0.45 : 1,
              filter: activeIndex === i ? "brightness(1.2)" : "none",
              position: "relative",
              borderRight: i < THEMES.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
            }}
          >
            {t.pct > 7 ? `${t.pct}%` : ""}
          </div>
        ))}
      </div>
      <div style={{
        fontSize: "0.72rem", color: "#8b8b8b", marginTop: 6,
        display: "flex", justifyContent: "space-between",
      }}>
        <span>Click any segment to explore.</span>
        <span></span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   THEME CARD (with Ram's voice)
   ═══════════════════════════════════════════ */

function ThemeCard({ theme, index, expanded, onToggle, cardRef }) {
  const barW = (theme.pct / 22) * 100;
  return (
    <div ref={cardRef} onClick={onToggle} style={{
      background: "#fff", borderRadius: 16, border: "1px solid rgba(27,58,92,0.1)", overflow: "hidden", cursor: "pointer",
      transition: "box-shadow 0.3s, border-color 0.3s",
      boxShadow: expanded ? "0 8px 32px rgba(27,58,92,0.12)" : "0 2px 8px rgba(27,58,92,0.04)",
      borderColor: expanded ? "rgba(27,58,92,0.25)" : "rgba(27,58,92,0.1)",
    }}>
      <div style={{ padding: "24px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ background: theme.color, color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.05em", textTransform: "uppercase" }}>#{index + 1}</span>
              <span style={{ fontSize: "0.8rem", color: "#6b7f99", fontWeight: 600 }}>{theme.name}</span>
            </div>
            <h3 style={{ fontFamily: "var(--f-display)", fontSize: "1.15rem", fontWeight: 700, color: "#0f224e", lineHeight: 1.35, margin: 0 }}>{theme.headline}</h3>
          </div>
          <div style={{ fontFamily: "var(--f-display)", fontSize: "2rem", fontWeight: 700, color: theme.color, lineHeight: 1, whiteSpace: "nowrap" }}>{theme.pct}%</div>
        </div>
        <div style={{ marginTop: 14, height: 6, background: "rgba(27,58,92,0.06)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ width: `${barW}%`, height: "100%", background: `linear-gradient(90deg, ${theme.color}, ${theme.color}cc)`, borderRadius: 3, transition: "width 1s ease" }} />
        </div>
      </div>
      <div style={{ maxHeight: expanded ? 600 : 0, opacity: expanded ? 1 : 0, overflow: "hidden", transition: "max-height 0.5s ease, opacity 0.4s ease, padding 0.4s ease", padding: expanded ? "0 28px 28px" : "0 28px 0" }}>
        <p style={{ fontSize: "0.92rem", color: "#574b4f", lineHeight: 1.6, margin: "0 0 16px 0" }}>{theme.desc}</p>
        {/* Member quote */}
        <blockquote style={{ margin: "0 0 18px 0", padding: "16px 20px", background: "rgba(27,58,92,0.04)", borderLeft: `3px solid ${theme.color}`, borderRadius: "0 10px 10px 0" }}>
          <p style={{ fontFamily: "var(--f-body)", fontSize: "1rem", fontStyle: "italic", color: "#0f224e", lineHeight: 1.5, margin: 0 }}>&ldquo;{theme.quote}&rdquo;</p>
          <cite style={{ display: "block", marginTop: 8, fontSize: "0.78rem", color: "#6b7f99", fontStyle: "normal", fontWeight: 600 }}>&mdash; {theme.speaker}</cite>
        </blockquote>
        {/* Ram on this issue */}
        <div style={{
          padding: "16px 20px",
          background: "rgba(196,149,106,0.08)",
          borderLeft: "3px solid #dca694",
          borderRadius: "0 10px 10px 0",
        }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#dca694", marginBottom: 8 }}>Ram on this issue</div>
          <p style={{ fontFamily: "var(--f-body)", fontSize: "0.95rem", fontStyle: "italic", color: "#0f224e", lineHeight: 1.5, margin: 0 }}>&ldquo;{theme.ramQuote}&rdquo;</p>
          <cite style={{ display: "block", marginTop: 8, fontSize: "0.75rem", color: "#574b4f", fontStyle: "normal", fontWeight: 600 }}>&mdash; {theme.ramSource}</cite>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ISSUE CARD (with Ram's take)
   ═══════════════════════════════════════════ */

function IssueCard({ card }) {
  const [open, setOpen] = useState(false);
  const urg = URGENCY_CONFIG[card.urgency];
  const barW = (card.freq / 25) * 100;

  return (
    <div style={{
      background: "#fff", borderRadius: 20, border: "1px solid rgba(27,58,92,0.08)", overflow: "hidden",
      transition: "box-shadow 0.3s",
      boxShadow: open ? "0 12px 40px rgba(27,58,92,0.14)" : "0 2px 12px rgba(27,58,92,0.05)",
    }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "28px 28px 24px", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
            <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{card.icon}</span>
            <div>
              <h3 style={{ fontFamily: "var(--f-display)", fontSize: "1.2rem", fontWeight: 700, color: "#0f224e", margin: 0, lineHeight: 1.3 }}>{card.title}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                <span style={{ background: urg.bg, color: "#fff", fontSize: "0.63rem", fontWeight: 700, padding: "2px 10px", borderRadius: 20, letterSpacing: "0.06em", textTransform: "uppercase" }}>{urg.label}</span>
                <span style={{ fontSize: "0.8rem", color: "#6b7f99", fontWeight: 600 }}>Raised {card.freq}&times; &middot; {card.townhalls}</span>
              </div>
            </div>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: "rgba(27,58,92,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", color: "#6b7f99", flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s",
          }}>&#9662;</div>
        </div>

        <div style={{ height: 5, background: "rgba(27,58,92,0.06)", borderRadius: 3, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ width: `${barW}%`, height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${urg.bg}dd, ${urg.bg}88)`, transition: "width 0.8s ease" }} />
        </div>

        <blockquote style={{ margin: 0, padding: "14px 18px", background: "rgba(27,58,92,0.03)", borderLeft: "3px solid #dca694", borderRadius: "0 10px 10px 0" }}>
          <p style={{ fontFamily: "var(--f-body)", fontSize: "0.95rem", fontStyle: "italic", color: "#0f224e", lineHeight: 1.5, margin: 0 }}>&ldquo;{card.quote}&rdquo;</p>
          <cite style={{ display: "block", marginTop: 6, fontSize: "0.75rem", color: "#6b7f99", fontStyle: "normal", fontWeight: 600 }}>&mdash; {card.quoteSpeaker}</cite>
        </blockquote>
      </div>

      <div style={{ maxHeight: open ? 900 : 0, opacity: open ? 1 : 0, overflow: "hidden", transition: "max-height 0.5s ease, opacity 0.4s ease" }}>
        <div style={{ padding: "0 28px 32px", borderTop: "1px solid rgba(27,58,92,0.06)" }}>
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#dca694", marginBottom: 10 }}>What members are saying</div>
            <p style={{ fontSize: "0.9rem", color: "#574b4f", lineHeight: 1.65, margin: 0 }}>{card.memberVoice}</p>
          </div>
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3e5184", marginBottom: 10 }}>What needs to change</div>
            <p style={{ fontSize: "0.9rem", color: "#574b4f", lineHeight: 1.65, margin: 0 }}>{card.plan}</p>
          </div>
          <div style={{
            marginTop: 24, padding: "18px 20px",
            background: "rgba(196,149,106,0.08)",
            borderLeft: "3px solid #dca694",
            borderRadius: "0 12px 12px 0",
          }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#dca694", marginBottom: 8 }}>Ram's take</div>
            <p style={{ fontFamily: "var(--f-body)", fontSize: "0.92rem", fontStyle: "italic", color: "#0f224e", lineHeight: 1.55, margin: 0 }}>&ldquo;{card.ramTake}&rdquo;</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   OVERVIEW PAGE
   ═══════════════════════════════════════════ */

function OverviewPage() {
  const [exp, setExp] = useState(null);
  const cardRefs = useRef([]);

  function handleBarClick(i) {
    setExp(prev => prev === i ? null : i);
    setTimeout(() => {
      if (cardRefs.current[i]) {
        cardRefs.current[i].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  }

  return (
    <>
      {/* CONFIDENCE BASELINE */}
      <AnimateIn>
        <div style={{
          background: "#fff", borderRadius: 20, padding: "36px 32px",
          margin: "40px 0 20px", border: "1px solid rgba(15,34,78,0.08)",
        }}>
          <h2 style={{
            fontFamily: "var(--f-display)", fontSize: "clamp(1.3rem, 3.5vw, 1.7rem)", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.03em", color: "#0f224e",
            margin: "0 0 20px 0", lineHeight: 1.25,
          }}>We asked members: how supported do you feel by your union?</h2>

          {/* Big number */}
          <div style={{
            background: "linear-gradient(135deg, #0f224e, #3e5184)", borderRadius: 14,
            padding: "24px 28px", marginBottom: 20, color: "#fff",
          }}>
            <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem, 6vw, 3.4rem)", fontWeight: 700, lineHeight: 1, textTransform: "uppercase" }}>
              65.9% rated support low
            </div>
            <div style={{ fontSize: "0.9rem", marginTop: 8, color: "rgba(255,255,255,0.7)" }}>
              Ratings of 1–2 on a 5-point scale. This trust baseline is why support, accountability, and practical capacity dominate what members raised.
            </div>
          </div>

          {/* Trust bar */}
          <div>
            <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 40 }}>
              <div style={{ width: "34.1%", background: "#dca694", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f224e", fontSize: "0.72rem", fontWeight: 700 }}>34.1%</div>
              <div style={{ width: "31.8%", background: "#c4956a", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.72rem", fontWeight: 700 }}>31.8%</div>
              <div style={{ width: "18.2%", background: "#3e5184", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.72rem", fontWeight: 700 }}>18.2%</div>
              <div style={{ width: "11.4%", background: "#0f224e", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.68rem", fontWeight: 700 }}>11.4%</div>
              <div style={{ width: "4.5%", background: "#0a0e18", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.55rem", fontWeight: 700 }}>5%</div>
            </div>
            {/* Legend — evenly spaced across full width */}
            <div style={{
              display: "flex", justifyContent: "space-between", marginTop: 10,
              fontSize: "0.72rem", color: "#574b4f",
            }}>
              <span style={{ textAlign: "left" }}><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 4, background: "#dca694", marginRight: 4, verticalAlign: "middle" }}></span>1 Not at all</span>
              <span style={{ textAlign: "center" }}><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 4, background: "#c4956a", marginRight: 4, verticalAlign: "middle" }}></span>2 Slightly</span>
              <span style={{ textAlign: "center" }}><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 4, background: "#3e5184", marginRight: 4, verticalAlign: "middle" }}></span>3 Somewhat</span>
              <span style={{ textAlign: "center" }}><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 4, background: "#0f224e", marginRight: 4, verticalAlign: "middle" }}></span>4 Mostly</span>
              <span style={{ textAlign: "right" }}><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 4, background: "#0a0e18", marginRight: 4, verticalAlign: "middle" }}></span>5 Very</span>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* TWO STAT CARDS — what replaced the old 3 */}
      <AnimateIn delay={40}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, margin: "0 0 48px" }}>
          <div style={{
            background: "linear-gradient(135deg, #0f224e, #3e5184)", color: "#fff",
            borderRadius: 14, padding: "28px 24px",
            flex: "1 1 300px", minWidth: 260,
          }}>
            <div style={{ fontFamily: "var(--f-display)", fontSize: "2.8rem", fontWeight: 700, lineHeight: 1 }}>6</div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: "1rem", fontWeight: 700, marginTop: 8, textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Open sessions over 5 months
            </div>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.55, margin: "10px 0 18px 0" }}>
              Nov 2025 – Mar 2026. Any member could attend, with messaging intentionally inviting both folks who were skeptical and supportive of Ram — because all members deserve to be heard, not just the folks who agree with you.
            </p>
            <a
              href="https://ram4change.ca/rsvp"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block", padding: "10px 24px",
                background: "#dca694", color: "#0f224e",
                borderRadius: 8, fontFamily: "var(--f-display)",
                fontSize: "0.82rem", fontWeight: 700, textDecoration: "none",
                textTransform: "uppercase", letterSpacing: "0.05em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              RSVP to the next session &rarr;
            </a>
          </div>
          <div style={{
            background: "rgba(62,81,132,0.08)", color: "#0f224e", borderRadius: 14, padding: "28px 24px",
            flex: "1 1 220px", minWidth: 180,
          }}>
            <div style={{ fontFamily: "var(--f-display)", fontSize: "2.8rem", fontWeight: 700, lineHeight: 1 }}>71.3%</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, marginTop: 8, lineHeight: 1.3 }}>of all issues fall into 4 themes</div>
            <div style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: 4 }}>Support, accountability, training, and communication. The pattern is consistent.</div>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={80}><div style={{ marginBottom: 48 }}><QuoteCarousel /></div></AnimateIn>

      <AnimateIn delay={120}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: "var(--f-display)", fontSize: "1.9rem", fontWeight: 700, margin: "0 0 8px 0" }}>What keeps coming up — every single time</h2>
          <p style={{ fontSize: "0.95rem", color: "#6b7f99", lineHeight: 1.5, margin: "0 0 16px 0" }}>
            8 themes appeared across every session. Click any segment to jump to the detail. Tap any card to hear what members said — and how Ram responded.
          </p>
        </div>
      </AnimateIn>

      {/* STACKED BAR */}
      <AnimateIn delay={140}>
        <div style={{ marginBottom: 16 }}>
          <StackedBar activeIndex={exp} onSelect={handleBarClick} />
        </div>
      </AnimateIn>

      {/* THEME INDEX — clickable 1–8 list */}
      <AnimateIn delay={160}>
        <div style={{
          background: "#fff", borderRadius: 16, padding: "20px 24px",
          marginBottom: 28, border: "1px solid rgba(15,34,78,0.08)",
        }}>
          {THEMES.map((t, i) => (
            <div
              key={i}
              onClick={() => handleBarClick(i)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 8px", cursor: "pointer",
                borderBottom: i < THEMES.length - 1 ? "1px solid rgba(15,34,78,0.06)" : "none",
                transition: "background 0.15s",
                borderRadius: 8,
                background: exp === i ? "rgba(62,81,132,0.06)" : "transparent",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(62,81,132,0.04)"}
              onMouseLeave={e => e.currentTarget.style.background = exp === i ? "rgba(62,81,132,0.06)" : "transparent"}
            >
              <span style={{
                fontFamily: "var(--f-display)", fontSize: "0.85rem", fontWeight: 700,
                color: "#fff", background: t.color, width: 28, height: 28,
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>{i + 1}</span>
              <span style={{
                fontSize: "0.88rem", fontWeight: 600, color: "#0f224e", flex: 1,
              }}>{t.name}</span>
              <span style={{
                fontFamily: "var(--f-display)", fontSize: "1rem", fontWeight: 700,
                color: t.color,
              }}>{t.pct}%</span>
            </div>
          ))}
        </div>
      </AnimateIn>

      {/* THEME GRID — 2-col top 4, then list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 56 }}>
        {THEMES.map((t, i) => (
          <AnimateIn key={i} delay={160 + i * 35}>
            <ThemeCard
              theme={t}
              index={i}
              expanded={exp === i}
              onToggle={() => setExp(exp === i ? null : i)}
              cardRef={el => cardRefs.current[i] = el}
            />
          </AnimateIn>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   METHOD SECTION (collapsible)
   ═══════════════════════════════════════════ */

function MethodSection() {
  const [open, setOpen] = useState(false);
  return (
    <AnimateIn>
      <div style={{
        background: "rgba(15,34,78,0.04)", borderRadius: 16,
        marginBottom: 56, overflow: "hidden",
        border: "1px solid rgba(15,34,78,0.06)",
      }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%", padding: "20px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "var(--f-display)", fontWeight: 700, color: "#0f224e",
            fontSize: "0.9rem", letterSpacing: "0.04em", textTransform: "uppercase",
            textAlign: "left",
          }}
        >
          <span>How this report was built</span>
          <span style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "rgba(15,34,78,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.85rem", color: "#6b7f99", flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}>&#9662;</span>
        </button>
        <div style={{
          maxHeight: open ? 600 : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s ease, opacity 0.4s ease",
        }}>
          <div style={{ padding: "0 28px 28px", fontSize: "0.88rem", color: "#574b4f", lineHeight: 1.7 }}>
            <p style={{ margin: "0 0 14px 0" }}>
              This report is built from everything members shared across Ram's town halls: live conversations, Zoom chat, and pre-registration comments. All of it is coded the same way, every single time.
            </p>
            <p style={{ margin: "0 0 14px 0" }}>
              What you see here are aggregate themes and trends over time. We do it this way on purpose. It protects member privacy, and it means no one gets to handpick quotes that make them look good. What participants said is kept separate from what Ram said. Same method, every cycle. Clear totals are published so you can see what is consistent and what is changing.
            </p>
            <p style={{ margin: "0 0 14px 0" }}>
              Our town halls run between 1.5 and 2 hours and have drawn diverse membership across regions, divisions, and sectors. This offers a compelling, data-driven view of what members are facing. That said, this is participation-based data, not a membership-wide survey.
            </p>
            <p style={{ margin: 0, color: "#0f224e", fontWeight: 600 }}>
              The range is real, the signal is strong, and if Ram is elected, you can count on this kind of member-driven data and insights extending beyond a campaign — into bargaining, budgets, and how leadership reports back to you.
            </p>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}

/* ═══════════════════════════════════════════
   ISSUE CARDS PAGE
   ═══════════════════════════════════════════ */

function IssueCardsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? ISSUE_CARDS : ISSUE_CARDS.filter(c => c.urgency === filter);
  const filters = [
    { key: "all", label: "All Issues", count: ISSUE_CARDS.length },
    { key: "critical", label: "Critical", count: ISSUE_CARDS.filter(c => c.urgency === "critical").length },
    { key: "high", label: "High Priority", count: ISSUE_CARDS.filter(c => c.urgency === "high").length },
    { key: "medium", label: "Recurring", count: ISSUE_CARDS.filter(c => c.urgency === "medium").length },
  ];

  return (
    <>
      <AnimateIn>
        <div style={{ margin: "40px 0 20px" }}>
          <h2 style={{ fontFamily: "var(--f-display)", fontSize: "1.9rem", fontWeight: 700, margin: "0 0 8px 0" }}>12 issues. Members' words. Ram's position.</h2>
          <p style={{ fontSize: "0.95rem", color: "#6b7f99", lineHeight: 1.55, margin: "0 0 4px 0" }}>
            Each card captures a specific, recurring concern — what members are saying, how often it came up, what needs to change, and where Ram stands. Tap any card for the full picture.
          </p>
          <p style={{ fontSize: "0.78rem", color: "#8b8b8b", margin: 0 }}>Frequency reflects distinct times raised across all sessions, Nov 2025 – Mar 2026.</p>
        </div>
      </AnimateIn>

      <AnimateIn delay={40}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "0 0 28px 0" }}>
          {filters.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: "8px 18px", borderRadius: 24, border: "1.5px solid",
              borderColor: filter === f.key ? "#0f224e" : "rgba(27,58,92,0.15)",
              background: filter === f.key ? "#0f224e" : "transparent",
              color: filter === f.key ? "#fff" : "#0f224e",
              fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
            }}>{f.label} <span style={{ opacity: 0.6 }}>({f.count})</span></button>
          ))}
        </div>
      </AnimateIn>

      <AnimateIn delay={60}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
          {[
            { bg: "#DC2626", n: "2", label: "Critical issues", sub: "Raised 20+ times across all townhalls" },
            { bg: "#EA580C", n: "4", label: "High priority", sub: "14–18× raised, structural issues" },
            { bg: "#3e5184", n: "6", label: "Recurring + emerging", sub: "7–12× raised, persistent concerns" },
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, color: "#fff", borderRadius: 12, padding: "16px 20px", flex: "1 1 140px", minWidth: 140 }}>
              <div style={{ fontFamily: "var(--f-display)", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: "0.78rem", fontWeight: 600, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: "0.7rem", opacity: 0.8, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </AnimateIn>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 56 }}>
        {filtered.map((card, i) => <AnimateIn key={card.title} delay={80 + i * 40}><IssueCard card={card} /></AnimateIn>)}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */

export default function MemberVoiceDashboard() {
  const [view, setView] = useState("overview");

  return (
    <div style={{ "--f-display": "'Oswald', sans-serif", "--f-body": "'Open Sans', sans-serif", fontFamily: "'Open Sans', sans-serif", background: "#e8ecf0", minHeight: "100vh", color: "#0f224e" }}>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <header style={{ background: "linear-gradient(135deg, #0a0e18 0%, #0f224e 40%, #3e5184 100%)", padding: "56px 32px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 80%, rgba(220,166,148,0.12) 0%, transparent 60%)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#dca694", marginBottom: 18 }}>Ram4Change &middot; Member Voice Report</div>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 18px 0", textTransform: "uppercase", letterSpacing: "0.02em" }}>
            You told us what's broken.<br /><span style={{ color: "#dca694" }}>We heard every word.</span>
          </h1>
          <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#dca694", margin: "0 0 10px 0", letterSpacing: "0.01em" }}>
            A member-driven mandate isn't a slogan. It's a practice.
          </p>
          <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: 600, margin: "0 0 32px 0" }}>
            Real change starts with real information — not slogans, not speeches, not campaign promises. Over five months and six open sessions, OPSEU members told us what's working, what's failing, and what they need. This is what they said — and what Ram had to say back.
          </p>
          <div style={{ display: "flex", gap: 0 }}>
            {[{ key: "overview", label: "The Big Picture" }, { key: "issues", label: "Issue Cards" }].map(tab => (
              <button key={tab.key} onClick={() => { setView(tab.key); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{
                padding: "14px 28px", background: view === tab.key ? "#e8ecf0" : "rgba(255,255,255,0.08)",
                color: view === tab.key ? "#0f224e" : "rgba(255,255,255,0.6)",
                border: "none", borderRadius: "12px 12px 0 0", fontSize: "0.9rem", fontWeight: 700,
                cursor: "pointer", fontFamily: "var(--f-display)", transition: "all 0.2s", textTransform: "uppercase", letterSpacing: "0.04em",
              }}>{tab.label}</button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        {view === "overview" ? <OverviewPage /> : <IssueCardsPage />}
        <MethodSection />
      </main>

      <footer style={{ background: "#0a0e18", padding: "24px 32px" }}>
        <div style={{
          maxWidth: 800, margin: "0 auto",
          display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center",
          gap: "6px 16px",
          fontSize: "0.68rem", color: "rgba(255,255,255,0.35)",
        }}>
          <span>Ram4Change</span>
          <span style={{ opacity: 0.4 }}>&middot;</span>
          <span>Member Voice Report</span>
          <span style={{ opacity: 0.4 }}>&middot;</span>
          <span>Last Updated March 2026</span>
          <span style={{ opacity: 0.4 }}>&middot;</span>
          <span>Designed by <a href="https://www.groupproject.ca" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Group Project Initiatives</a></span>
        </div>
      </footer>
    </div>
  );
}
