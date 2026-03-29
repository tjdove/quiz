# Study Guide: "The Open Loop Audit" — Claude Dispatch, Computer Use & Asynchronous AI Labor
*Complete reference for quiz preparation — all key facts, frameworks, and figures*

---

## PART 1 — The Core Thesis: Asynchronous AI Labor

### The Central Distinction
- The article's organizing question: **does work land on your desk or leave it?**
- The #1 mistake with Dispatch: pointing it at **simulated work** — triage reports, email summaries, proactive briefings that add a document to read rather than removing a task
- The agent looks busy. Your life doesn't change. That's the failure mode.

### The Primitive That Matters
- Not chatbots, not copilots, not AI you operate in real time
- The primitive is: **asynchronous AI labor** — work that happens on a schedule or on a trigger, without you present, producing results you consume later
- **Chatbots** are impressive. **Copilots** improve throughput. A system that **works while you sleep** is a different category — not a tool, but labor.

### The Prime Video Analogy
The author was Head of Product for **Amazon Prime Video**, leading the ML-powered personalization system that served **200 million viewers**:
- Every night: pipelines ingested viewing data, retrained recommendation models, re-ranked the entire content catalog, pushed fresh results to every device in every market
- The engineering team **didn't babysit it** — they set logic, guardrails, and monitoring, then went home
- Concept called **"overnight bake"**: models trained overnight; by morning every user's home screen was rebuilt with fresh predictions
- This is the exact primitive Dispatch delivers to individual knowledge workers

### Why Three Announcements Were Covered as One
- Cloud scheduled tasks, Dispatch, and computer use were covered as separate launches
- The article's argument: they are **layers of a single architecture** — the asynchronous agent platform only makes sense when you see how the layers connect
- Together they deliver what OpenClaw did, without requiring self-hosted infrastructure

---

## PART 2 — The Three-Layer Architecture

### Layer 1 — Cloud Scheduled Tasks (The Base: "Always-On Execution")

**What it is:** Cron for knowledge work — a natural language prompt that runs on a schedule on Anthropic's infrastructure, not your machine

**Key specs:**
- **Minimum interval:** one hour (through Cowork interface); more granular scheduling available through Claude Code
- **Where it runs:** Anthropic's controlled cloud environment with configurable network access, environment variables, and setup scripts
- **Connector carryover:** connects to any MCP server already wired to claude.ai — Linear, GitHub, Slack, Google Drive, Open Brain — you don't configure them twice
- **Entry point URL:** `claude.ai/code/scheduled`

**The Zweben production example:**
- A Go/Python twin library used internally at Anthropic
- Maintained **entirely by a scheduled Claude job with no human in the loop**
- A codebase in one language that automatically stays in sync with a codebase in another
- Normally requires a dedicated engineer spending a few hours a week on a task that is important but never urgent — exactly the work that falls through the cracks

**Mental model:** The prompt is the program. The schedule is the trigger. The MCP connectors are the I/O.

**Practical examples:**
- Daily AI news briefing → parsed and researched overnight, delivered to Open Brain
- Airline price monitoring → run hourly on a specific route, alert when fare drops below threshold
- Bill payment reminders → scheduled check-and-notify before due dates on services that don't support auto-pay

**Design principle:** Built for **durable automation, not tight polling loops**

---

### Layer 2 — Dispatch (The Remote Control: "Persistent Sessions")

**What it is:** Not "persistent chat from your phone" — an **orchestration layer** accessed from mobile that spawns and manages multiple parallel Cowork task sessions on your desktop

**How it works:**
- Pair your phone with Claude Desktop via **QR code**
- **Phone = command surface; Desktop = execution surface**
- One conversation on your phone spawns multiple sessions running simultaneously on your desktop
- Each session: its own context, its own file access, its own connectors
- Sessions run in parallel, sandboxed, not interfering with each other

**The Huryn 48-hour test (documented real-world evidence):**
- **Paweł Huryn**, a product manager, ran Dispatch for 48 consecutive hours on real work
- Directed work from a **kids' bounce house** — went because the work ran without him
- From the sidelines: directed 4 rounds of iteration on a visual asset in one session while 2 other sessions ran competitor analysis and stakeholder page drafting in parallel at home
- **Total human direction time:** roughly 25 minutes
- **Claude execution running in parallel:** over 3 hours of work
- Task split across 60+ sessions: thinking/strategic judgment = **90% human**; takes/opinions = **100% human**; research, formatting, execution = **90% Claude**

**Behavioral shift Dispatch trains:**
- Old pattern (every previous interface): synchronous — I type, it responds, I type again → conversation pattern
- New pattern (Dispatch): asynchronous — I assign, I leave, I return to results → **management pattern**
- The best managers set parameters, went about their day, trusted the work to get done — Dispatch mirrors this exactly

**Current constraints (honest state of product):**
- **Computer must be awake and Claude Desktop must be open** — this is a desktop agent, not a cloud service
- If laptop sleeps, work pauses; if you close the app, thread persists but execution stops
- Every subtask Dispatch spawns requests folder access individually — **no bulk approval**
- Cannot attach files from phone or receive output files back directly
- **Workaround:** sync Cowork workspace via Google Drive or Dropbox so files flow both directions
- Complex multi-app tasks: succeed **roughly half the time** based on early independent testing
- Simple tasks (file search, summaries, email analysis): work well
- Multi-step workflows across several connectors: where it gets shaky
- This is a **"research preview"** — expect a powerful but rough capability, not a polished consumer experience

**Historical parallels (synchronous → asynchronous shifts):**
- Email broke the need to be present for a conversation
- Slack broke it for decisions
- Cloud documents broke it for collaboration
- Dispatch breaks the need to be present while the tool operates

---

### Layer 3 — Computer Use (The Hands: "Reaching Anything on Your Screen")

**How the priority system works:**
- Claude reaches for **connectors first** — if Slack is wired, it uses the Slack MCP, not the mouse
- Computer use only activates when **no connector exists**
- This is deliberate: screen-scraping is the slowest, most fragile way to interact with software

**Why it matters for enterprise:**
- MCP may be the universal USB of the AI age, but **more than half the software world** is still not accessible through structured connectors
- The "dark matter" of enterprise software: internal JIRA clones from 2017, bespoke ERP screens in Internet Explorer, compliance dashboards requiring specific browser plugins, vendor portals not updated in years
- These tools **will never get MCP servers or API integrations**
- For everything in that category, Claude can now act: opens the app, navigates the UI, clicks buttons, fills fields, reads results

**Safety model (from Anthropic's blog):**
- Triggers with **explicit permission** — Claude asks before accessing new applications
- System scans model activations to **detect prompt injection** during screen interactions
- You can stop Claude at any point
- Some apps are off-limits by default
- **macOS only today** — Windows support coming

**Right application today:** Automating known, repetitive flows in legacy apps where the UI is consistent
- ✅ "Go to this internal dashboard every Monday, download the weekly report PDF, and summarize it"
- ❌ "Figure out how to use this app I've never shown you" (research experiment, not reliable workflow)

**The full loop:** Assign the task from your phone (Dispatch) → Claude uses desktop apps to complete it (computer use) → you get the results when you're back

---

## PART 3 — The Memory and Connectors Foundation

### Memory: Open Brain
- If you've built an **Open Brain** (personal knowledge database connected via MCP), the agent that wakes via scheduled task or responds to a Dispatch command reads and writes to the **same persistent knowledge store**
- It remembers what it learned yesterday, last week, three weeks ago
- Runs on **Supabase for about ten cents a month**
- The compound value: the difference between a tool and a colleague
- Dispatch works without it, but memory is what creates compound value over time

### MCP: The Nervous System
- Every connector already wired — Linear, GitHub, Slack, Google Drive, Open Brain — **carries over across all three surfaces**
- Configure once; cloud tasks use it, Dispatch uses it, computer use fills in gaps for everything MCP can't reach
- MCP described as "the universal USB of the AI age"

### Scheduling: The Heartbeat
- Local loops (like `/loop`) run while your terminal is open
- Cloud tasks run while your laptop is **closed**
- Same primitive, **different uptime guarantee**
- The `/life-engine` skill (from the heartbeat guide) can now also be scheduled as a cloud version for overnight codebase maintenance without the machine being on

### The Compounding Architecture
- "When Opus 4.6 shipped in February with 5x context expansion and substantially improved reasoning, every scheduled task, every Dispatch workflow, every computer use session got better without you touching a thing. That's how stacks work. Build the layers. Let them compound."

---

## PART 4 — Self-Hosted vs. Managed

### OpenClaw (Self-Hosted)
- You set up the server, configure the network, manage credentials, vet the skills, troubleshoot WebSocket connections
- For developers who want control: powerful
- For everyone else: **a second job** — the Mac mini needs to be maintained by someone, and that someone is you
- Gives **more raw freedom**: any LLM, any messaging platform, any extension

### Anthropic's Stack (Managed)
- Cloud scheduled tasks run on Anthropic's servers, not yours
- Dispatch runs in a sandboxed environment
- You don't configure the network, vet a skill marketplace, or maintain a server
- Ceiling: **only runs on Claude**, only reaches what connectors and computer use can touch
- Lowered the bar from "you need to be your own sysadmin" to "you need to scan a QR code"

### The Historical Pattern (Every Infrastructure Shift)
| Category | Self-hosted first | Managed second (mass adoption) |
|----------|------------------|-------------------------------|
| Email | Sendmail | Gmail |
| Compute | Rack servers | AWS |
| CI/CD | Jenkins on your box | GitHub Actions |
| AI agents | OpenClaw | Anthropic's Dispatch stack |

- Self-hosted proves the category. Managed gets mass adoption.
- "The self-hosted version was right, and it's still right for people who want the control. The managed version just lowered the bar."

---

## PART 5 — The Four Open Loops Worth Closing

### The Test That Applies to Everything
**When the agent finishes, is your plate lighter or heavier?**
- Heavier: a document to read, a draft to edit, a triage to review → paid for a fancier to-do list
- Lighter: a commitment was met, a decision has the info it needed, a pattern surfaced, a codebase improved → this is the goal

---

### Open Loop 1 — The Commitment Loop
**The problem:** Every promise made in email, Slack, or meetings is an open loop. Most people track ~60% of them. The rest don't fail dramatically — they quietly lapse. Over months, dropped commitments compound into an **erosion of trust that you can't see** because nobody tells you they stopped relying on you.

**The agent solution:** Monitors your commitments, cross-references against calendar and what you've actually done, either fulfills them or flags them before they lapse

**This goes beyond productivity:** It's relationship infrastructure

**The objection:** "Agent output quality isn't good enough for real commitments"
**The answer:** That's a skill issue and it's fixable. The gap lives in system instructions, context layer, and the prompt — not in model capabilities. In 2026 it is not impossible to get a good draft of a memorandum of understanding out of AI. The people getting good results learned to specify clearly.

---

### Open Loop 2 — The Decision That's Ready When You Need It
**The problem:** Most strategic calls get made on **30% of available information** because gathering the other 70% takes longer than the decision window allows.

**The agent solution:** Spends the night pulling financials, reading analyst coverage, checking competitor positioning through computer use on browser-based tools with no API, assembling structured analysis

**Result:** You don't sit down to a briefing document. You sit down already knowing the answer to the question that was going to eat the first 20 minutes of the meeting.

**Doing it badly:** Using AI to confirm your existing opinion. You ask the agent to find evidence supporting what you already think — it obligingly does, because that's what language models are good at. You walk in feeling validated when you shouldn't.

**Doing it well:** Tell the agent explicitly: *"I need more data and more information than I would normally use to make this decision. Go fishing for data that would help me make a better choice, including data that might contradict what I currently believe."*

If you're normally making decisions with 30% of available information, why not make them with 70%? **The agent has the time you don't. Use it for breadth, not confirmation.**

---

### Open Loop 3 — Compound Signal Detection Across Weeks
**The problem:** Your brain structurally cannot hold a three-week thread while being present for what's in front of you today. The signal from three weeks ago fell out of working memory to make room for whatever was urgent that week. This is not a discipline problem — **human attention works this way by design**.

**Example pattern:**
- Week 1: competitor is hiring aggressively in payments
- Week 2: two patent filings in cross-border settlement
- Week 3 (this morning): partnership with a Southeast Asian bank
- No single signal means anything. All three connected = coordinated market entry → **one week's head start on everyone who will read about it when TechCrunch notices**

**The agent advantage:** The agent holds the thread natively, because nothing falls out. The open loop isn't a task — it's a pattern that would have stayed invisible. The agent makes it visible before it becomes someone else's advantage.

**Requires:** Memory + proactivity working together — impossible without both

---

### Open Loop 4 — Overnight Engineering That Ships Real Work
**The problem:** The backlog guilt. Engineering debt that compounds every sprint. No amount of planning creates capacity because the sprint is always full.

**The agent solution:** "The agent works a second shift that doesn't exist on your headcount plan."

**Examples:**
- Migrate a dependency overnight
- Improve test coverage from 0 to 80% across a module
- Refactor the authentication layer your team has been meaning to fix for two quarters

**The Lütke example:** Shopify's Tobi Lütke ran an agent overnight on 37 experiments, woke up to a model that outperformed the human-configured version.

**Not exclusively for engineers:** The author mentions someone who had never written a line of code who built a **complete calendar app** in two weeks with zero coding experience, achieving something nobody had been able to build for her for twenty years.

**The real open loop here:** Not a task on a to-do list — it's the **backlog guilt**, the weight of knowing your team is carrying technical debt that compounds every sprint.

---

## PART 6 — The Transition: Trust Without Visibility

### The Hardest Part of Asynchronous Work
At Prime Video: "The hardest part of my job wasn't the technology. It was convincing people that a system they couldn't watch was actually working."

### The New Trust Requirement
- Chatbot: you evaluate in real time
- Asynchronous agent: you evaluate by its output — you have to **trust the process**, trust the guardrails, know what "good" looks like without having watched it being produced
- "I walk away, I use Dispatch, and I'm itchy. I want to go back. I want to make sure it's working. We're all going to need to learn to untether."

### The Two Bottleneck Skills
Not technical proficiency. Not prompt engineering. The bottleneck skills are:
1. **Clarity of intent** — specify what you want clearly enough that an unsupervised system can produce it
2. **Quality of taste** — evaluate whether what came back is actually right

"Those are the bottleneck skills in every management role I've ever held. The difference is that now they're the bottleneck skills for everyone, not just managers."

### The Huryn Role Split (from 60+ task sessions)
| Work type | Human share | Claude share |
|-----------|-------------|-------------|
| Thinking and strategic judgment | 90% | 10% |
| Takes and opinions | 100% | 0% |
| Research, formatting, execution | 10% | 90% |

"The AI handled speed and breadth. The human handled direction and taste."

---

## PART 7 — The Prompts (What the Article Provides)

### The Four Prompts in the Prompt Kit

**1. The Open Loop Audit**
- Purpose: Forces you to name what you're actually carrying right now
- Separates work that genuinely leaves your desk from work that just adds to it
- Identifies: commitments about to lapse, decisions being made on 30% information, recurring tasks you keep forgetting

**2. The Dispatch Delegation Brief**
- Turns Open Loop Audit findings into something you can paste and walk away from
- For handoffs to Dispatch

**3. The Recurring Task Automator**
- For recurring tasks identified in the audit

**4. The Decision Intelligence Brief**
- For the "decision without information" pattern
- Specifically designed to **fight your own confirmation bias** — not just research but active counter-research

### The Anti-Pattern the Prompts Guard Against
Most people will:
1. Get the tools running
2. Immediately waste them on a triage summary
3. Feel briefly impressed
4. Wonder six weeks later why their workload feels exactly the same

The prompts exist to break this pattern.

---

## PART 8 — Companion Resources

### Setup Guide
- Covers: permissions, device pairing, the toggles that matter, constraints worth knowing before building
- Takes about **10 minutes** to get from zero to operational

### The Broader Competitive Landscape (as of article date)
- **Meta** shipped Manus
- **Perplexity** launched its own computer agent
- **Google** is building ambient capabilities into Gemini
- **OpenAI** hired the creator of OpenClaw
- "The next six months will determine who owns this layer"

---

## Quick-Reference Cheat Sheet

### The Three Layers
| Layer | What it is | Runs where | The gap it closes |
|-------|-----------|------------|------------------|
| Cloud scheduled tasks | Cron for knowledge work | Anthropic's servers | No machine to keep on |
| Dispatch | Orchestration layer from mobile | Desktop (remote-controlled) | No desk to sit at |
| Computer use | Fallback for apps without connectors | Your screen | No API needed |

### The Four Open Loops (in order of invisibility)
1. **Commitment loop** — promises quietly lapsing, trust eroding over months
2. **Decision loop** — strategic calls made on 30% of available information
3. **Signal loop** — three-week patterns your brain can't hold, becoming someone else's advantage
4. **Engineering loop** — backlog guilt, the second shift that doesn't exist on the headcount plan

### The One Test
**"When the agent finishes, is your plate lighter or heavier?"**

### The Two Bottleneck Skills
1. Clarity of intent (specify precisely enough for unsupervised execution)
2. Quality of taste (evaluate output without having watched it being produced)

### Key Numbers to Know
- Prime Video audience: **200 million viewers**
- Huryn bounce house experiment: **~25 minutes** human direction → **3+ hours** Claude execution
- Huryn sessions total: **60+ task sessions**
- Task split: 90% thinking/judgment = human; 90% research/formatting/execution = Claude
- Supabase Open Brain cost: **~$0.10/month**
- Computer use complex task success rate: **~50%** (early testing)
- Cloud tasks minimum interval: **1 hour** (Cowork); more granular via Claude Code
- Decisions typically made on: **30% of available information**
- Lütke overnight test: **37 experiments**, result outperformed human-configured version

### The Self-Hosted vs. Managed Pattern (Every Time)
Self-hosted proves the category → Managed gets mass adoption → Same shift, every infrastructure cycle

### The Behavioral Shift Dispatch Trains
| Old interface | New interface |
|--------------|--------------|
| Synchronous: I type, it responds | Asynchronous: I assign, I leave, I return |
| Conversation pattern | Management pattern |
| You hover | You trust the process |
| Throughput improvement | Labor replacement |
