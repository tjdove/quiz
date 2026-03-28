Here's your knowledge base entry for this video. Let me build the summary with a reference diagram first.---

## Knowledge Base: The Four Agent Species
**Source:** Nate B Jones, Substack video — "Wrong Kind of Agent"

### The foundational insight

"Agent" is not one thing. Every agent system is technically an LLM + tools + a feedback loop, but *how you configure that loop* — what it's optimizing for, who's involved, and at what scale — produces four completely different kinds of systems. Using the wrong one for a job is one of the most common and expensive mistakes in agentic engineering right now.

---

### Species 1 — Coding Harness

The simplest and most familiar form. A single agent takes the place of a developer: reading files, writing code, using tools like search, and looping on feedback. The human acts as a manager rather than an individual contributor.

The key unlock is **decomposition** — breaking a gnarly problem into well-scoped tasks that can each be handed to an agent independently. Karpathy runs agents 16 hours a day this way; Peter Steinberger managed multiple Codex agents simultaneously while each worked on its own 20-minute task.

When teams scale up (8–20 developers on a project), the right move is to shift from individual-centered to agent-centered architecture. This is what Cursor demonstrated by building browsers and compilers with millions of lines of code. Their architecture: a planner agent that tracks state and assigns tasks, plus short-running executor agents that each solve exactly one scoped problem. They tried three management levels and it broke — two levels (planner + executors) is the stable configuration. Cursor's explicit lesson: **simple scales, complicated doesn't.**

**Use when:** Your judgment is the quality gate, the work is software-shaped, and scale is individual-to-team.

---

### Species 2 — Dark Factory

A dark factory removes humans from the middle of the process entirely. The human is involved heavily at two points only: writing the spec at the start, and reviewing output at the end. Everything in between is automated agents running against evals.

The name comes from lights-off Chinese factories where robots do all the work. The key mechanism is **eval-driven iteration**: software is generated, tested against an evaluation, and looped until it passes. The harder problem is writing excellent non-functional requirements — enforeable rules of the road — and building evals that actually capture quality.

Most sophisticated enterprises still have a senior engineer review final output before production. Amazon learned this the hard way after AI-generated production incidents caused by junior engineers not catching model errors.

A useful framing: think of coding harnesses and dark factories as points on a spectrum of human involvement. As your evals get better and your trust in the system grows, you can slide toward darker and darker factory operation.

**Use when:** You trust your evals, your spec quality is excellent, and human involvement in the middle is a bottleneck rather than a safeguard.

---

### Species 3 — Auto Research

A different animal from the other three. This is not about producing software — it's about **optimizing a metric**. It descends from classical machine learning: run experiments, measure results, iterate toward a better score. The agent is hill-climbing a performance landscape.

Examples: Karpathy used it to auto-optimize LLM training settings toward GPT-2 scale. Toby Lutke used a similar approach to optimize Shopify's Liquid framework for runtime performance. Conversion rates, model tuning weights, benchmark scores — any measurable rate can theoretically be the target.

The critical question Nate poses: **is your problem software-shaped or metric-shaped?** These are usually intuitive once you ask the question directly. Auto research doesn't produce working software; it finds the configuration that makes a number go up.

**Use when:** You have a measurable rate you want to improve and sufficient data to run experiments against.

---

### Species 4 — Orchestration

The most setup-intensive species. Multiple specialized agents arranged in a workflow, with an orchestration layer managing handoffs. A researcher hands to a drafter; a ticket-reader hands to a resolver; a copywriter hands to a finance reviewer. The agents have genuinely different roles, unlike a coding harness where all agents are doing roughly the same kind of work.

The setup cost is real: every handoff requires careful context design, prompt engineering, and often human review at each joint. This human involvement at the seams is what makes orchestration feel "heavy" right now. It's worth it at scale — tens of thousands of tickets justify the investment; a few hundred probably don't.

The common confusion: people see a planner agent handing work to executor agents in a coding harness and think that's orchestration. The difference is that in a coding harness all agents serve one unified goal (build this code); in orchestration, agents have genuinely specialized roles and the routing between them is the product.

**Use when:** You have truly distinct specialized jobs that need to be routed between different agents, and the workflow volume justifies the coordination overhead.

---

### Quick-decision cheat sheet

| Situation | Agent species |
|---|---|
| You're coding and your judgment gates quality | Coding harness |
| Large team project, need parallel agentic work | Project-scale coding harness (planner + executors) |
| Your evals are solid, humans bottleneck the middle | Dark factory |
| You want to maximize a measurable rate | Auto research |
| You have genuinely specialized roles needing handoffs | Orchestration |

---

### Key terms to study next

**Decomposition** — breaking a large problem into independently scoped agent tasks. The core skill for coding harnesses.

**Evals** — automated tests that gate whether agentic output is good enough to proceed. The mechanism that makes dark factories function.

**Non-functional requirements** — rules constraining agent behavior that can be verified automatically. What makes dark factory pipelines actually reliable.

**Hill climbing** — the ML concept underlying auto research. Iterative experimentation toward a local optimum in a metric space.

**Planner/executor pattern** — the two-level architecture Cursor validated for large-scale harnesses. Planner maintains state and assigns tasks; executors are short-running and narrowly scoped.

**Context handoff design** — the hard problem in orchestration. What does each agent need to do its job, and how do you pass it cleanly without losing fidelity?
