import { useState, useCallback } from "react";

const ALL_QUESTIONS = [
  // ━━━ 🏭 The Five Levels Framework ━━━
  {
    section: "🏭 The Five Levels Framework",
    q: "Who published the Five Levels of Vibe Coding framework, and what is his day job?",
    options: [
      "Boris Cherny, who leads the Claude Code project at Anthropic",
      "Dan Shapiro, CEO of Glowforge and veteran of companies at the software/physical products boundary",
      "Justin McCarthy, CTO of StrongDM",
      "Simon Willison, developer tooling observer and blogger",
    ],
    answer: 1,
  },
  {
    section: "🏭 The Five Levels Framework",
    q: "What does the article say Level 2 (Junior Developer) actually looks like in practice, and what is its most striking statistic?",
    options: [
      "AI writes complete features; the human only reviews final output. About 50% of developers are here.",
      "AI handles multi-file changes and the developer reads every diff. Shapiro estimates 90% of developers who call themselves 'AI-native' are operating at this level — and think they're further along.",
      "AI and human pair-program in real time. About 70% of enterprise developers are here.",
      "AI handles architecture; the human handles implementation. About 30% of self-described AI-native developers are here.",
    ],
    answer: 1,
  },
  {
    section: "🏭 The Five Levels Framework",
    q: "What is the defining characteristic of Level 3 (Developer as Manager) that distinguishes it from Level 2?",
    options: [
      "The developer no longer writes any code and only evaluates test results",
      "The developer uses multiple AI models simultaneously rather than one",
      "The relationship flips — you direct AI and review what it produces; your day is diffs rather than code",
      "The developer only works on architecture and hands off all implementation to junior AI agents",
    ],
    answer: 2,
  },
  {
    section: "🏭 The Five Levels Framework",
    q: "What ceiling does the article say most developers hit, and what does it attribute the ceiling to?",
    options: [
      "Level 2 — because AI models are not yet reliable enough for multi-file changes",
      "Level 4 — because specification writing is too difficult without formal training",
      "Level 3 — less to do with the tools than with the organizational and psychological difficulty of letting go of the code",
      "Level 1 — because most developers haven't yet adopted AI coding assistants at all",
    ],
    answer: 2,
  },
  {
    section: "🏭 The Five Levels Framework",
    q: "How does the article say vendor marketing language maps to the Five Levels framework?",
    options: [
      "Vendors claiming 'agentic development' are usually at Level 4 or 5; 'AI copilots' are at Level 1 or 2",
      "When a vendor says their tool 'writes code for you' they mean Level 1; 'agentic software development' startups usually mean Level 2 or 3; only StrongDM-type teams actually mean Level 5",
      "Vendor language is roughly accurate — 'agentic' means Level 4 or higher",
      "All vendor claims map to Level 2 regardless of framing",
    ],
    answer: 1,
  },
  {
    section: "🏭 The Five Levels Framework",
    q: "What is Level 4 (Developer as PM) and why does the article say almost no one has reached it?",
    options: [
      "You write a specification, leave, come back hours later and check whether tests pass — evaluating outcomes, not reading diffs. It requires a level of trust in the system, and a quality of specification writing, that almost no one has developed yet.",
      "You manage a team of junior AI agents rather than a team of human developers. Almost no one has reached it because the required tooling doesn't exist yet.",
      "You write product requirements and a separate AI team translates them into specifications. Almost no one has reached it because it requires two coordinated AI systems.",
      "You evaluate AI output using automated metrics rather than manual review. Almost no one has reached it because the evaluation frameworks are immature.",
    ],
    answer: 0,
  },
  {
    section: "🏭 The Five Levels Framework",
    q: "According to Shapiro's assessment, how many teams globally are operating at Level 5?",
    options: [
      "Hundreds of teams at major tech companies",
      "About fifty well-funded startups",
      "A handful of small teams, fewer than five people each",
      "Only StrongDM — one team in the entire industry",
    ],
    answer: 2,
  },

  // ━━━ ⚙️ StrongDM's Software Factory ━━━
  {
    section: "⚙️ StrongDM's Software Factory",
    q: "What are the first two principles of StrongDM's Software Factory?",
    options: [
      "'Specifications must be complete. Tests must be comprehensive.'",
      "'Code must not be written by humans. Code must not be reviewed by humans.'",
      "'Agents must not touch production. Humans must approve all deployments.'",
      "'All software must be tested. All tests must be automated.'",
    ],
    answer: 1,
  },
  {
    section: "⚙️ StrongDM's Software Factory",
    q: "What model inflection point did the StrongDM team identify as enabling their dark factory, and when did it ship?",
    options: [
      "GPT-4 Turbo, which shipped in November 2023",
      "Claude 3 Opus, which shipped in March 2024",
      "Claude 3.5 Sonnet rev 2, which shipped in October 2024 — when long-horizon agentic coding started compounding correctness rather than compounding errors",
      "Gemini 2.0, which shipped in December 2024",
    ],
    answer: 2,
  },
  {
    section: "⚙️ StrongDM's Software Factory",
    q: "What is the open-source coding agent that StrongDM's factory runs on?",
    options: ["Claude Code", "Devin", "Attractor", "Cursor Agent"],
    answer: 2,
  },
  {
    section: "⚙️ StrongDM's Software Factory",
    q: "What is the critical difference between traditional software tests and the 'scenarios' StrongDM uses?",
    options: [
      "Tests are written in code; scenarios are written in natural language",
      "Tests are run before deployment; scenarios are run in production",
      "Tests live inside the codebase where the agent can read and game them; scenarios live outside the codebase as a holdout set the agent cannot access or optimize against",
      "Tests check individual functions; scenarios check the entire system end-to-end",
    ],
    answer: 2,
  },
  {
    section: "⚙️ StrongDM's Software Factory",
    q: "The article compares StrongDM's scenario architecture to a concept from machine learning. What is it?",
    options: [
      "Gradient descent — iteratively improving toward a target",
      "Transfer learning — applying knowledge from one domain to another",
      "A holdout set — evaluation data kept separate from training data to prevent overfitting",
      "Regularization — constraining the model to prevent overly specific solutions",
    ],
    answer: 2,
  },
  {
    section: "⚙️ StrongDM's Software Factory",
    q: "What is StrongDM's Digital Twin Universe, and why does it matter for autonomous development?",
    options: [
      "A version control system that maintains parallel copies of each spec for rollback purposes",
      "Behavioral clones of external services (Okta, Jira, Slack, Google Drive etc.) that let AI agents run full integration scenarios without touching real production systems, APIs, or data",
      "A simulation environment where human developers can test specifications before handing them to agents",
      "A monitoring dashboard that tracks agent behavior against expected outputs in real time",
    ],
    answer: 1,
  },
  {
    section: "⚙️ StrongDM's Software Factory",
    q: "What is CXDB, and what languages was it written in?",
    options: [
      "The agent orchestration layer — written entirely in Python",
      "The CI/CD pipeline — written in Go and YAML",
      "The AI Context Store — 16,000 lines of Rust, 9,500 lines of Go, and 6,700 lines of TypeScript. Shipped. In production. Built by agents.",
      "The scenario evaluation framework — written in TypeScript and JavaScript",
    ],
    answer: 2,
  },
  {
    section: "⚙️ StrongDM's Software Factory",
    q: "What is StrongDM's token spend benchmark, and what does it signal about the economics of the dark factory?",
    options: [
      "$100/engineer/day — signaling that compute is the primary cost and should be minimized",
      "$500/engineer/day — signaling rough parity between AI and human labor costs",
      "$1,000/engineer/day — signaling that the AI agents are running at a volume that makes compute cost meaningful and still cheaper than the humans they're replacing",
      "$10,000/engineer/day — signaling that only the largest companies can afford this approach",
    ],
    answer: 2,
  },
  {
    section: "⚙️ StrongDM's Software Factory",
    q: "What specific problem does storing scenarios outside the codebase solve that didn't exist when humans wrote code?",
    options: [
      "It prevents junior developers from copying senior developers' test patterns",
      "When AI writes code, optimizing for test passage is the default behavior — the agent can read in-codebase tests and hardcode passing values. Scenarios the agent can't see prevent this.",
      "It ensures compliance auditors can review test criteria without accessing source code",
      "It prevents the agent from using tests as documentation to understand legacy behavior",
    ],
    answer: 1,
  },

  // ━━━ 🤖 Machines Building Themselves ━━━
  {
    section: "🤖 Machines Building Themselves",
    q: "What makes Codex 5.3 historically significant, and how did earlier builds of Codex contribute?",
    options: [
      "It is the first model to pass all major coding benchmarks; earlier builds wrote the evaluation framework",
      "It is the first frontier AI model instrumental in creating itself — earlier builds analyzed training logs, flagged failing tests, suggested fixes to training scripts, generated deployment recipes, and summarized evaluation anomalies",
      "It is the first model trained entirely on synthetic data; earlier builds generated that training data",
      "It is the first model to outperform human developers on all task types; earlier builds identified which tasks to benchmark",
    ],
    answer: 1,
  },
  {
    section: "🤖 Machines Building Themselves",
    q: "What performance improvements does the article attribute to Codex 5.3's self-referential development process?",
    options: [
      "10% speed improvement and better accuracy on reasoning tasks",
      "50% reduction in hallucination rate and improved code quality",
      "25% speed improvement and dramatically reduced token waste",
      "40% improvement on benchmark scores and faster inference",
    ],
    answer: 2,
  },
  {
    section: "🤖 Machines Building Themselves",
    q: "What percentage of Claude Code's own codebase was written by Claude Code, and what has Boris Cherny's role become?",
    options: [
      "50% of Claude Code was self-written; Cherny still writes architecture-level code",
      "75% was self-written; Cherny reviews all AI-generated code",
      "90% was self-written; Cherny hasn't personally written code in over two months — his role has shifted entirely to specification, direction, and judgment",
      "100% was self-written; Cherny manages the agent fleet without any direct product involvement",
    ],
    answer: 2,
  },
  {
    section: "🤖 Machines Building Themselves",
    q: "How long did it take to build Cowork (Anthropic's desktop automation product) and what team built it?",
    options: [
      "3 months, 12 engineers, with code primarily human-written",
      "10 days, 4 engineers, with all code written by Claude Code",
      "6 weeks, 8 engineers, using a hybrid human/AI development approach",
      "2 weeks, 2 engineers, using Claude Code for 50% of the implementation",
    ],
    answer: 1,
  },
  {
    section: "🤖 Machines Building Themselves",
    q: "What share of public GitHub commits does the article say Claude Code currently authors, and what does Anthropic project for end of 2026?",
    options: [
      "1% now; projected 10% by end of 2026",
      "4% now; projected to exceed 20% by end of 2026",
      "10% now; projected to exceed 40% by end of 2026",
      "2% now; projected 15% by end of 2026",
    ],
    answer: 1,
  },

  // ━━━ 📉 The Honest Distance ━━━
  {
    section: "📉 The Honest Distance",
    q: "What was the METR study's finding about experienced developers using AI tools, and what made this result particularly striking?",
    options: [
      "Developers were 5% slower — a small effect that was within the study's margin of error",
      "Developers were 19% slower. Striking because: they predicted AI would make them 24% faster before the study, and still believed it had made them 20% faster after — wrong about the direction, not just the magnitude",
      "Developers were 19% slower on complex tasks but 15% faster on simple ones",
      "Developers were 10% slower — striking because the study used hand-picked pro-AI participants",
    ],
    answer: 1,
  },
  {
    section: "📉 The Honest Distance",
    q: "What type of study was the METR research, and why does that matter for interpreting the results?",
    options: [
      "An industry survey — which means selection bias may affect results",
      "A series of case studies — which means results may not generalize",
      "A randomized controlled trial — not a survey, not a case study, with controls for task difficulty, developer experience, and tool familiarity",
      "A longitudinal cohort study — tracking the same developers over 12 months",
    ],
    answer: 2,
  },
  {
    section: "📉 The Honest Distance",
    q: "The article identifies four specific reasons why AI coding tools made experienced developers slower. Which of these is one of them?",
    options: [
      "The AI tools required significant configuration time before each session",
      "Context-switching between their own mental model and the model's output, and debugging subtle errors in generated code that looked correct but wasn't",
      "The AI frequently refused tasks that violated safety guidelines, requiring manual workarounds",
      "The developers had to learn a new programming language to use the AI tools effectively",
    ],
    answer: 1,
  },
  {
    section: "📉 The Honest Distance",
    q: "What is the J-curve of AI tool adoption, and what mistake do organizations make when they're in it?",
    options: [
      "An initial surge in productivity followed by a plateau — organizations mistake the plateau for the ceiling and stop investing",
      "A productivity dip before improvement when AI is bolted onto an existing workflow without redesigning it — organizations interpret the dip as evidence AI tools don't work rather than evidence their workflows haven't adapted",
      "A slow start that accelerates exponentially — organizations mistake early slowness for permanent underperformance",
      "A rapid initial gain that fades as novelty wears off — organizations mistake the fade for a skills problem rather than a motivation problem",
    ],
    answer: 1,
  },
  {
    section: "📉 The Honest Distance",
    q: "What did one senior engineering leader say about GitHub Copilot that captures the dual-sided economics of AI coding tools?",
    options: [
      "'Copilot speeds up writing but slows down thinking.'",
      "'Copilot is great for new code but dangerous for legacy systems.'",
      "'Copilot makes writing code cheaper, but it makes owning code more expensive.'",
      "'Copilot adds features faster but removes developer understanding.'",
    ],
    answer: 2,
  },
  {
    section: "📉 The Honest Distance",
    q: "What does the Stack Overflow 2025 developer survey say about AI-generated code trust?",
    options: [
      "About 20% of developers say they don't fully trust AI-generated code",
      "About 46% of developers say they don't fully trust AI-generated code",
      "About 65% of developers say they don't fully trust AI-generated code",
      "About 80% of developers say they don't fully trust AI-generated code",
    ],
    answer: 1,
  },
  {
    section: "📉 The Honest Distance",
    q: "What distinguishes the organizations seeing 25–30% productivity gains from those stuck in the J-curve?",
    options: [
      "They adopted AI tools earlier and have had more time to learn them",
      "They use more expensive enterprise-tier AI tools with better accuracy",
      "End-to-end process transformation — changed how they write specs, review code, use juniors vs. seniors, and structure CI/CD — not just tool adoption",
      "They have more experienced senior engineers who can catch AI errors more efficiently",
    ],
    answer: 2,
  },

  // ━━━ 🏢 The Org Chart Problem ━━━
  {
    section: "🏢 The Org Chart Problem",
    q: "Why do stand-up meetings, sprint planning, code review, and Jira boards exist in traditional software organizations?",
    options: [
      "They are regulatory requirements for ISO-certified software development processes",
      "They were imported from manufacturing and have persisted even though they don't fit software development",
      "They are all responses to the same underlying reality: humans building software in teams make mistakes, lose context, and need visibility into each other's work",
      "They exist because distributed teams cannot communicate effectively through written documentation alone",
    ],
    answer: 2,
  },
  {
    section: "🏢 The Org Chart Problem",
    q: "What is StrongDM's operating model, and why doesn't it have sprints, standups, or Jira boards?",
    options: [
      "It is fully remote, which makes synchronous ceremonies impractical",
      "It is a three-person team that writes specifications and evaluates outcomes — the entire coordination layer serves no purpose when agents do the implementation",
      "It follows a kanban pull model rather than a scrum sprint model",
      "It has replaced these with daily video calls between its three engineers",
    ],
    answer: 1,
  },
  {
    section: "🏢 The Org Chart Problem",
    q: "How does the article say the engineering manager's value proposition shifts in the dark factory world?",
    options: [
      "From managing people to managing cloud infrastructure budgets",
      "From coordinating the team building the feature to defining the specification clearly enough that agents build the right feature",
      "From writing architecture documents to reviewing all AI-generated code",
      "From hiring and retaining engineers to hiring and evaluating AI coding tools",
    ],
    answer: 1,
  },
  {
    section: "🏢 The Org Chart Problem",
    q: "What does the article say happens when you try to give an AI agent an ambiguous specification?",
    options: [
      "The agent asks clarifying questions and waits for human input",
      "The agent produces its best interpretation and flags uncertainty in comments",
      "Machines don't ask clarifying questions — they build what you described, and if what you described was ambiguous, you get ambiguous software",
      "The agent refuses the task and returns an error requesting more detail",
    ],
    answer: 2,
  },
  {
    section: "🏢 The Org Chart Problem",
    q: "What does the article say the broader skill shift from Level 2 to Level 5 requires from the organization?",
    options: [
      "From waterfall to agile methodology",
      "From in-house development to outsourced AI vendors",
      "From coordination (making sure people row in the same direction) to articulation (making sure the direction is described precisely enough that machines can execute on it)",
      "From centralized architecture teams to federated squad-based development",
    ],
    answer: 2,
  },
  {
    section: "🏢 The Org Chart Problem",
    q: "What does the article say about the scarcest resource in software engineering, and how does the dark factory change its demand?",
    options: [
      "The scarcest resource is senior engineers — the dark factory increases demand for them as reviewers of AI output",
      "The scarcest resource is deep understanding of the system, the user, and the problem. The dark factory doesn't reduce demand for it — it makes the demand absolute.",
      "The scarcest resource is compute — the dark factory reduces demand for human engineers but increases demand for GPUs",
      "The scarcest resource is customer relationships — the dark factory shifts value from engineering to sales",
    ],
    answer: 1,
  },

  // ━━━ 🧱 The Legacy Problem ━━━
  {
    section: "🧱 The Legacy Problem",
    q: "Why can't you 'dark-factory your way through a legacy system'?",
    options: [
      "Legacy systems use programming languages that AI agents cannot generate",
      "The specification doesn't exist — the system itself is the only complete description of what the software does, because no one ever wrote down the thousand implicit decisions accumulated over years of patches and workarounds",
      "Legacy systems are too large for current AI models to hold in their context window",
      "The regulatory requirements around legacy systems prohibit autonomous code generation",
    ],
    answer: 1,
  },
  {
    section: "🧱 The Legacy Problem",
    q: "What does the article say is the typical test coverage situation in legacy enterprise codebases?",
    options: [
      "Tests cover about 80% of the code; the remaining 20% is well-understood but untested",
      "Tests are comprehensive but written in outdated frameworks agents can't run",
      "Tests cover about 30% of the code; the other 70% runs on institutional knowledge and tribal lore",
      "Tests cover close to 100% of the code but test the wrong behaviors",
    ],
    answer: 2,
  },
  {
    section: "🧱 The Legacy Problem",
    q: "What type of human expertise does the article say is required for legacy system migration that AI cannot replace?",
    options: [
      "Expertise in modern cloud architecture patterns to redesign the system cleanly",
      "Domain expertise and customer understanding — the engineer who knows why the billing module has that edge case, the architect who remembers which microservice was carved out under duress, the product person who knows what the software actually does for users vs. what the PRD says",
      "Deep knowledge of the legacy programming language to translate code into modern specifications",
      "Project management expertise to coordinate the multi-year migration effort",
    ],
    answer: 1,
  },
  {
    section: "🧱 The Legacy Problem",
    q: "What is Step 2 of the four-step legacy migration path, and why is it different from what most teams do?",
    options: [
      "Redesign the CI/CD pipeline — most teams skip this because it's not visible to executives",
      "Use AI to document what your system actually does — generate specs from code, build scenario suites, create holdout sets. Most teams skip this because it's unglamorous prerequisite work with no visible output.",
      "Shift new development to Level 4 or 5 — most teams skip this because they overestimate their Level 3 capabilities",
      "Train all engineers on specification writing — most teams skip this because they conflate it with documentation work they already do",
    ],
    answer: 1,
  },
  {
    section: "🧱 The Legacy Problem",
    q: "What timeline does the article give for the legacy-to-dark-factory migration path?",
    options: [
      "Weeks to months with the right tools and organizational commitment",
      "About six months for a typical enterprise with strong engineering leadership",
      "Years, not months — and anyone telling you otherwise is selling something",
      "Exactly eighteen months based on observed migration patterns",
    ],
    answer: 2,
  },

  // ━━━ 🎓 The Talent Reckoning ━━━
  {
    section: "🎓 The Talent Reckoning",
    q: "What did Harvard research find about early-career developer employment after widespread AI coding tool adoption?",
    options: [
      "Employment grew 5% as new AI-adjacent roles offset losses in traditional coding roles",
      "Employment dropped 7–10% within six quarters of widespread AI coding tool adoption",
      "Employment stayed flat as demand growth offset automation of junior tasks",
      "Employment dropped 25% within two years of widespread AI adoption",
    ],
    answer: 1,
  },
  {
    section: "🎓 The Talent Reckoning",
    q: "What did the Institute of Student Employers find about UK graduate technology roles in 2024, and what further decline was projected?",
    options: [
      "A 20% decline in 2024 with a further 30% projected by 2026",
      "A 46% decline in 2024 with a further 53% drop projected by 2026",
      "A 15% decline in 2024 with a further 20% projected by 2026",
      "A 33% decline in 2024 with the market expected to stabilize by 2026",
    ],
    answer: 1,
  },
  {
    section: "🎓 The Talent Reckoning",
    q: "How does the article describe the traditional software engineering career ladder, and how does AI break it?",
    options: [
      "The ladder worked through credentials and certifications; AI breaks it by making certifications obsolete",
      "The ladder worked through specialization; AI breaks it by making specialists less valuable than generalists",
      "The ladder was an apprenticeship model — juniors learn by doing simple features and bug fixes while seniors mentor them. AI breaks it at the bottom: if AI handles the simple work, where do juniors learn?",
      "The ladder worked through seniority and tenure; AI breaks it by accelerating the skills timeline",
    ],
    answer: 2,
  },
  {
    section: "🎓 The Talent Reckoning",
    q: "What does the article say 'adequate' means in the new engineering landscape?",
    options: [
      "Adequate engineers now need to learn at least one AI coding tool thoroughly",
      "Adequate is no longer a viable career position, because adequate is what the models do",
      "Adequate engineers can now be more productive by leveraging AI for routine tasks",
      "Adequate engineers need to specialize more deeply to remain differentiated from AI",
    ],
    answer: 1,
  },
  {
    section: "🎓 The Talent Reckoning",
    q: "What hiring shift has Anthropic made, and what is the reasoning behind it?",
    options: [
      "Preferring specialists over generalists — because implementation quality requires deep expertise in specific domains",
      "Preferring generalists over specialists — because when AI handles implementation, human value is in understanding the problem space broadly enough to direct implementation correctly",
      "Preferring managers over engineers — because the primary skill needed is coordinating AI agents",
      "Preferring researchers over practitioners — because advancing the frontier matters more than deploying current tools",
    ],
    answer: 1,
  },
  {
    section: "🎓 The Talent Reckoning",
    q: "What is the 'medical residency model' for junior engineers that some organizations are moving toward?",
    options: [
      "A structured two-year program where juniors rotate through different AI tool specializations before choosing a focus",
      "Simulated environments where early-career developers learn by working alongside AI systems, reviewing AI output, and developing judgment about what's correct and what's subtly wrong",
      "A mentorship program where senior engineers teach juniors to spot AI hallucinations through intensive practice",
      "A certification pathway that replaces traditional on-the-job training with standardized AI-assisted projects",
    ],
    answer: 1,
  },
  {
    section: "🎓 The Talent Reckoning",
    q: "What does Gartner project about AI upskilling, and how does the article characterize that projection?",
    options: [
      "50% of software engineers will need to upskill by 2026; the article calls this accurate",
      "80% of software engineers will need to upskill in AI-assisted development tools by 2027; the article says this number is probably conservative",
      "All software engineers will need to upskill by 2028; the article says this is accurate but the timeline is too long",
      "60% of software engineers will need to upskill by 2027; the article says this underestimates mid-level engineers",
    ],
    answer: 1,
  },

  // ━━━ 💰 The Shape of the New Org ━━━
  {
    section: "💰 The Shape of the New Org",
    q: "What was Cursor's ARR trajectory, and what does the revenue-per-employee figure indicate?",
    options: [
      "$50M ARR in 18 months with 100 employees — roughly $500K per employee",
      "$100M ARR in 12 months with fewer than 20 employees, then reportedly $500M+ ARR with ~40 people — over $12M revenue per employee at the higher figure",
      "$200M ARR in 24 months with 50 employees — $4M per employee",
      "$500M ARR in 36 months with 200 employees — $2.5M per employee",
    ],
    answer: 1,
  },
  {
    section: "💰 The Shape of the New Org",
    q: "How fast did Lovable reach $100M ARR and with what team size?",
    options: [
      "$100M ARR in 18 months with 100 people",
      "$100M ARR in 12 months with 80 people",
      "$100M ARR in 8 months with roughly 45 people",
      "$100M ARR in 6 months with 20 people",
    ],
    answer: 2,
  },
  {
    section: "💰 The Shape of the New Org",
    q: "What does the article say a new-model organization looks like when a small team can build a $100M product?",
    options: [
      "A traditional company with all departments intact but each department dramatically smaller",
      "A flat org with no middle management, where a small group of people are exceptionally good at understanding what users need, translating it into specifications, and directing AI systems that handle implementation",
      "A network of freelance specialists coordinated by a small core team",
      "A traditional startup structure that scales through automation rather than hiring",
    ],
    answer: 1,
  },
  {
    section: "💰 The Shape of the New Org",
    q: "What historical pattern does the article use to argue that cheaper AI production won't reduce total demand for software?",
    options: [
      "Every time labor costs drop in manufacturing, total output increases proportionally",
      "Every time the cost of computing dropped (mainframes → PCs → cloud → serverless), the total amount of software the world produced didn't stay flat — it exploded into new categories that were economically impossible at the old cost structure",
      "Every time a new programming paradigm emerged, total developer employment increased",
      "Every time open-source software replaced paid software, paid software markets grew to serve new segments",
    ],
    answer: 1,
  },
  {
    section: "💰 The Shape of the New Org",
    q: "What specific examples of unmet enterprise software demand does the article give, and what prevents that demand from being addressed today?",
    options: [
      "Small businesses need CRM software ($10K-$50K range); prevented by lack of technical staff to implement it",
      "A regional hospital needs a custom inventory system ($500K, 18 months); a patient portal integration costs $200K; a supply chain dashboard costs six figures minimum — economically out of reach at current labor costs",
      "Startups need enterprise security software ($100K-$500K); prevented by complex regulatory requirements",
      "Non-profits need donor management systems ($50K-$200K); prevented by budget constraints and lack of AI talent",
    ],
    answer: 1,
  },
  {
    section: "💰 The Shape of the New Org",
    q: "What does the article say the dark factory does for 'a great product thinker with five engineers'?",
    options: [
      "It reduces their team to three by automating two engineering roles",
      "It amplifies them — turning a great product thinker with five engineers into a great product thinker with unlimited engineering capacity",
      "It replaces the engineers entirely and lets the product thinker direct agents directly",
      "It allows the team to hire more junior engineers at lower cost",
    ],
    answer: 1,
  },
  {
    section: "💰 The Shape of the New Org",
    q: "What constraint does the dark factory shift, and why does the article call the new constraint 'the harder, more valuable question'?",
    options: [
      "From 'can we hire it' to 'can we train it' — hiring is harder but less valuable than training",
      "From 'when can we ship it' to 'how do we market it' — marketing has always been harder than engineering",
      "From 'can we build it' to 'should we build it' — and 'should we build it' has always been the harder, more valuable question",
      "From 'can we afford it' to 'can we scale it' — scaling was always more valuable than initial build",
    ],
    answer: 2,
  },

  // ━━━ 🔮 The Tension & Synthesis ━━━
  {
    section: "🔮 The Tension & Synthesis",
    q: "The article explicitly refuses to resolve the central tension. What are the two simultaneously true things it holds?",
    options: [
      "AI tools are improving fast / Most tools are not yet good enough for production use",
      "The dark factory works and the frontier is further ahead than most realize / Most companies are stuck at Level 2, getting measurably slower, and the distance isn't primarily a technology gap",
      "Specification writing is learnable / Most organizations won't invest in learning it",
      "Junior developer jobs are disappearing / New categories of AI-adjacent jobs are being created faster",
    ],
    answer: 1,
  },
  {
    section: "🔮 The Tension & Synthesis",
    q: "The article says the gap between frontier teams and everyone else is not primarily a technology gap. What four types of gaps does it identify instead?",
    options: [
      "Budget gap, talent gap, tooling gap, and leadership gap",
      "Specification gap, organizational gap, talent gap, and willingness-to-change gap",
      "Infrastructure gap, process gap, culture gap, and incentive gap",
      "Knowledge gap, skills gap, resource gap, and time gap",
    ],
    answer: 1,
  },
  {
    section: "🔮 The Tension & Synthesis",
    q: "What does the article say about who the 'people who thrive' will be in the dark factory era?",
    options: [
      "The people who master the most popular AI coding tools first and build the deepest tool expertise",
      "The people who understand customers deeply, think in systems, hold ambiguity and make decisions under uncertainty, and can articulate what needs to exist before it exists",
      "The people who transition earliest from writing code to managing AI agents",
      "The people who specialize in the specific domains that are hardest to automate",
    ],
    answer: 1,
  },
  {
    section: "🔮 The Tension & Synthesis",
    q: "What does the article say the implementation complexity of traditional software engineering was hiding?",
    options: [
      "The true cost of technical debt in large organizations",
      "The competitive advantage that specification quality provides",
      "How few people were actually good at understanding the system, the user, and the problem — the hardest part that the dark factory now makes visible",
      "The amount of rework caused by poor requirements gathering",
    ],
    answer: 2,
  },
  {
    section: "🔮 The Tension & Synthesis",
    q: "What is the article's closing observation, and what transition does it name?",
    options: [
      "'The machines will eventually handle the hard parts too. The humans just need to stay ahead of them.'",
      "'The machines stripped the camouflage. Now we'll find out.' — the implementation complexity that hid how few people were actually good at the hard parts is gone.",
      "'The future belongs to those who specify precisely. Everyone else should retrain now.'",
      "'The dark factory is inevitable. The only question is whether your organization leads or follows.'",
    ],
    answer: 1,
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LABELS = ["A", "B", "C", "D"];

export default function DarkFactoryQuiz() {
  const [deck, setDeck] = useState(() => shuffle(ALL_QUESTIONS));
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState([]);
  const [done, setDone] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [showStudy, setShowStudy] = useState(false);

  const q = deck[idx];
  const total = deck.length;
  const answered = chosen !== null;
  const progress = ((idx + (answered ? 1 : 0)) / total) * 100;

  const handlePick = useCallback((i) => {
    if (answered) return;
    setChosen(i);
    if (i === q.answer) setScore(s => s + 1);
    else setMissed(m => [...m, { ...q, chosen: i }]);
  }, [answered, q]);

  const handleNext = useCallback(() => {
    if (idx + 1 >= total) { setDone(true); return; }
    setIdx(n => n + 1);
    setChosen(null);
    setAnimKey(k => k + 1);
  }, [idx, total]);

  const handleRetry = useCallback(() => {
    setDeck(shuffle(ALL_QUESTIONS));
    setIdx(0); setChosen(null); setScore(0); setMissed([]); setDone(false);
    setAnimKey(k => k + 1);
  }, []);

  const pct = done ? Math.round((score / total) * 100) : 0;
  const passed = pct >= 75;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Nunito:wght@600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        .fq{
          min-height:100vh;
          background:radial-gradient(ellipse at 20% 80%, #120200 0%, #0a0100 40%, #000 100%);
          display:flex;justify-content:center;align-items:flex-start;
          padding:36px 16px 80px;
          font-family:'Nunito',sans-serif;color:#f0e0d8;
        }
        .fq-w{width:100%;max-width:640px;}

        .fq-head{text-align:center;margin-bottom:28px;}
        .fq-eye{font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:#cc4400;margin-bottom:6px;}
        .fq-title{font-family:'Playfair Display',serif;font-size:clamp(22px,5.5vw,34px);font-weight:900;color:#fff0ea;line-height:1.2;}
        .fq-title em{color:#cc4400;font-style:italic;}

        .fq-study-btn{display:inline-block;margin-top:12px;padding:7px 20px;font-family:'Nunito',sans-serif;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#fff0ea;background:#cc440022;border:1px solid #cc440055;border-radius:99px;cursor:pointer;transition:background .2s,border-color .2s;}
        .fq-study-btn:hover{background:#cc440044;border-color:#cc4400;}

        .fq-study{
          background:linear-gradient(160deg,#0f0200,#160400);border:1px solid #3a0e00;border-radius:18px;padding:30px;margin-bottom:24px;
          box-shadow:0 12px 48px #00000077,inset 0 1px 0 #cc440022;max-height:60vh;overflow-y:auto;
          animation:fqUp .32s ease both;font-size:14px;line-height:1.7;color:#e0bfb0;
        }
        .fq-study h2{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:#fff0ea;margin:24px 0 8px;}
        .fq-study h2:first-child{margin-top:0;}
        .fq-study h3{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#cc4400;margin:20px 0 6px;}
        .fq-study h4{font-size:14px;font-weight:800;color:#993300;margin:14px 0 4px;}
        .fq-study p{margin:8px 0;}
        .fq-study strong{color:#fff0ea;}
        .fq-study em{color:#cc4400;font-style:italic;}
        .fq-study hr{border:none;border-top:1px solid #3a0e00;margin:20px 0;}
        .fq-study ul{margin:8px 0;padding-left:20px;}
        .fq-study li{margin:4px 0;}
        .fq-study table{width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;}
        .fq-study th{text-align:left;padding:8px 10px;background:#cc440022;color:#cc4400;border:1px solid #3a0e00;font-weight:800;letter-spacing:.5px;}
        .fq-study td{padding:8px 10px;border:1px solid #3a0e00;color:#e0bfb0;}
        .fq-study::-webkit-scrollbar{width:6px;}
        .fq-study::-webkit-scrollbar-track{background:transparent;}
        .fq-study::-webkit-scrollbar-thumb{background:#cc440044;border-radius:99px;}

        .fq-track{height:5px;background:#180500;border-radius:99px;overflow:hidden;margin-bottom:10px;border:1px solid #3a0e00;}
        .fq-fill{height:100%;background:linear-gradient(90deg,#7a1f00,#cc4400,#ff8055);border-radius:99px;transition:width .4s ease;box-shadow:0 0 10px #cc440066;}
        .fq-meta{display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:#661a00;margin-bottom:20px;}
        .fq-meta .hi{color:#cc4400;}

        .fq-card{
          background:linear-gradient(155deg,#0f0200,#160400);
          border:1px solid #3a0e00;border-radius:18px;padding:28px;
          box-shadow:0 2px 0 #3a0e00,0 14px 50px #00000088,inset 0 1px 0 #cc440015;
          animation:fqUp .3s ease both;
        }
        @keyframes fqUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

        .fq-tag{
          display:inline-block;font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;
          color:#cc4400;background:#cc440012;border:1px solid #cc440028;border-radius:99px;
          padding:3px 11px;margin-bottom:14px;
        }
        .fq-q{font-family:'Playfair Display',serif;font-size:clamp(15px,3.5vw,19px);font-weight:700;line-height:1.55;color:#fff0ea;margin-bottom:22px;}

        .fq-opts{display:flex;flex-direction:column;gap:9px;}
        .fq-opt{
          display:flex;align-items:flex-start;gap:11px;
          background:#0c0100;border:1.5px solid #2e0a00;border-radius:11px;
          padding:12px 13px;cursor:pointer;
          font-family:'Nunito',sans-serif;font-size:13.5px;font-weight:600;
          color:#e0bfb0;text-align:left;line-height:1.5;
          transition:transform .15s,border-color .15s,background .15s,box-shadow .15s;
        }
        .fq-opt:not(:disabled):hover{transform:translateX(3px);border-color:#cc4400;background:#180500;box-shadow:0 0 12px #cc440018;}
        .fq-opt:disabled{cursor:default;}
        .fq-opt.ok{background:#001a0a;border-color:#22bb66;color:#88ffcc;box-shadow:0 0 16px #22bb6630;}
        .fq-opt.no{background:#1c0000;border-color:#cc2211;color:#ffbbaa;box-shadow:0 0 16px #cc221130;}
        .fq-opt.rv{background:#001a0a;border-color:#33dd88;color:#aaffdd;animation:fqPulse .5s ease;}
        @keyframes fqPulse{0%{box-shadow:0 0 0 #33dd8800}50%{box-shadow:0 0 20px #33dd8877}100%{box-shadow:0 0 10px #33dd8833}}

        .fq-badge{
          flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;
          min-width:25px;height:25px;border-radius:6px;
          background:#160400;border:1px solid #3a0e00;
          font-size:11px;font-weight:900;color:#cc4400;
          transition:background .15s,border-color .15s,color .15s;
        }
        .fq-opt.ok .fq-badge,.fq-opt.rv .fq-badge{background:#001f0a;border-color:#22bb66;color:#55ffaa;}
        .fq-opt.no .fq-badge{background:#1e0000;border-color:#cc2211;color:#ff7766;}

        .fq-fb{margin-top:15px;padding:10px 13px;border-radius:9px;font-size:13px;font-weight:700;animation:fqUp .2s ease;}
        .fq-fb.ok{background:#001a0a;border:1px solid #22bb6638;color:#55ffaa;}
        .fq-fb.no{background:#1c0000;border:1px solid #cc221138;color:#ffbbaa;}

        .fq-next{
          margin-top:18px;width:100%;padding:14px;
          background:linear-gradient(135deg,#7a1f00,#bb3a00,#ff6633);
          border:none;border-radius:11px;
          font-family:'Nunito',sans-serif;font-size:15px;font-weight:900;
          color:#fff0ea;cursor:pointer;letter-spacing:.3px;
          box-shadow:0 4px 22px #cc440040;
          transition:transform .14s,box-shadow .14s;
          animation:fqUp .22s ease;
        }
        .fq-next:hover{transform:translateY(-2px);box-shadow:0 8px 30px #cc440070;}

        .fq-res{
          background:linear-gradient(155deg,#0f0200,#160400);
          border:1px solid #3a0e00;border-radius:18px;padding:34px 28px;
          box-shadow:0 14px 50px #00000088,inset 0 1px 0 #cc440015;
          animation:fqUp .4s ease;
        }
        .fq-res-title{font-family:'Playfair Display',serif;font-size:clamp(20px,5vw,28px);font-weight:900;text-align:center;color:#fff0ea;margin-bottom:4px;}
        .fq-pct{font-family:'Playfair Display',serif;font-size:clamp(60px,17vw,92px);font-weight:900;text-align:center;color:#cc4400;line-height:1;text-shadow:0 0 55px #cc440055;margin:8px 0 14px;}
        .fq-verd{text-align:center;font-size:14px;font-weight:800;padding:8px 20px;border-radius:99px;margin-bottom:22px;}
        .fq-verd.pass{background:#001a0a;border:1px solid #22bb6638;color:#55ffaa;}
        .fq-verd.fail{background:#1c0000;border:1px solid #cc221138;color:#ffbbaa;}

        .fq-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:26px;}
        .fq-stat{background:#0c0100;border:1px solid #2e0a00;border-radius:12px;padding:15px 10px;text-align:center;}
        .fq-stat-n{font-family:'Playfair Display',serif;font-size:30px;font-weight:900;color:#cc4400;display:block;}
        .fq-stat-l{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#4a1400;display:block;margin-top:2px;}

        .fq-mh{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#cc4400;margin-bottom:13px;padding-top:18px;border-top:1px solid #3a0e00;}
        .fq-mi{background:#0c0100;border:1px solid #2e0a00;border-radius:10px;padding:13px;margin-bottom:9px;}
        .fq-mq{font-family:'Playfair Display',serif;font-size:13.5px;font-weight:700;color:#e0bfb0;line-height:1.45;margin-bottom:7px;}
        .fq-mw{font-size:12px;font-weight:700;color:#ffbbaa;margin-bottom:3px;}
        .fq-mr{font-size:12px;font-weight:700;color:#55ffaa;}

        .fq-retry{
          margin-top:24px;width:100%;padding:15px;
          background:linear-gradient(135deg,#7a1f00,#bb3a00,#ff6633);
          border:none;border-radius:11px;
          font-family:'Nunito',sans-serif;font-size:15px;font-weight:900;
          color:#fff0ea;cursor:pointer;letter-spacing:.3px;
          box-shadow:0 4px 26px #cc440050;
          transition:transform .14s,box-shadow .14s;
        }
        .fq-retry:hover{transform:translateY(-2px);box-shadow:0 10px 34px #cc440080;}

        @media(max-width:460px){
          .fq-card,.fq-res{padding:18px 14px;}
          .fq-stat-n{font-size:25px;}
        }
      `}</style>

      <div className="fq">
        <div className="fq-w">
          <div className="fq-head">
            <div className="fq-eye">Five Levels · Spec-Driven Dev · The New Org</div>
            <h1 className="fq-title">The <em>Dark Factory</em></h1>
            <button className="fq-study-btn" onClick={() => setShowStudy(s => !s)}>
              {showStudy ? '✕ Close Study Material' : '📖 Study Material'}
            </button>
          </div>

          {showStudy && (
            <div className="fq-study">
              <h2>The Dark Factory</h2>
              <p><strong>Source:</strong> Five Levels of AI Coding, Spec-Driven Development &amp; the New Engineering Org</p>

              <h2>Part 1 — The Central Tension</h2>
              <h3>Three Simultaneous Realities</h3>
              <ul>
                <li><strong>StrongDM's Software Factory</strong> — three engineers, no human writes code, no human reviews code. A markdown spec goes in; shippable software comes out.</li>
                <li><strong>Claude Code's codebase</strong> — 90% written by Claude Code itself. Boris Cherny hasn't personally written code in over two months.</li>
                <li><strong>The METR study</strong> — experienced devs completed tasks <strong>19% slower</strong> with AI tools. They predicted 24% faster before, still believed 20% faster after. Wrong about the <em>direction</em>.</li>
              </ul>
              <h3>The Core Claim</h3>
              <p>"The frontier teams aren't just using better AI tools. They've rebuilt everything around a fundamentally different workflow — one where the bottleneck has moved from how fast you can write code to how precisely you can describe what should exist."</p>

              <hr />

              <h2>Part 2 — The Five Levels Framework</h2>
              <h3>Author</h3>
              <p><strong>Dan Shapiro</strong> — CEO of Glowforge — published the framework in early 2026. Called "Five Levels of Vibe Coding."</p>
              <table>
                <thead><tr><th>Level</th><th>Name</th><th>What It Means</th></tr></thead>
                <tbody>
                  <tr><td>0</td><td>Spicy Autocomplete</td><td>Faster tab key. Human still writes software.</td></tr>
                  <tr><td>1</td><td>Coding Intern</td><td>AI handles discrete, well-scoped tasks. Human reviews everything.</td></tr>
                  <tr><td>2</td><td>Junior Developer</td><td>AI handles multi-file changes. Human reads every diff. <strong>90% of "AI-native" devs are here.</strong></td></tr>
                  <tr><td>3</td><td>Developer as Manager</td><td>Relationship flips. Your day is diffs. <strong>Most developers top out here.</strong></td></tr>
                  <tr><td>4</td><td>Developer as PM</td><td>Write spec, leave, check tests. Evaluating outcomes, not diffs.</td></tr>
                  <tr><td>5</td><td>The Dark Factory</td><td>Spec in, software out. No human writes or reviews code. <strong>A handful of small teams, &lt;5 people each.</strong></td></tr>
                </tbody>
              </table>
              <p><strong>Key:</strong> "Most developers hit a ceiling at Level 3 — less to do with the tools than with the organizational and psychological difficulty of letting go of the code."</p>

              <hr />

              <h2>Part 3 — StrongDM's Software Factory (Level 5)</h2>
              <h3>The Team</h3>
              <ul>
                <li><strong>Three people:</strong> Justin McCarthy (CTO), Jay Taylor, Navan Chauhan</li>
                <li>Running since <strong>July 2025</strong></li>
                <li>Inflection point: <strong>Claude 3.5 Sonnet rev 2</strong> (October 2024)</li>
              </ul>
              <h3>Two Core Principles</h3>
              <ul>
                <li>"Code must not be written by humans."</li>
                <li>"Code must not be reviewed by humans."</li>
              </ul>
              <h3>Scenarios vs. Tests</h3>
              <table>
                <thead><tr><th>Traditional Tests</th><th>Scenarios (StrongDM)</th></tr></thead>
                <tbody>
                  <tr><td>Live inside the codebase</td><td>Live <strong>outside</strong> the codebase</td></tr>
                  <tr><td>Agent can read them</td><td>Agent <strong>cannot</strong> see them</td></tr>
                  <tr><td>Agent can optimize for passage</td><td>Agent cannot game them</td></tr>
                  <tr><td>Risk: teaching to the test</td><td>Functions as a <strong>holdout set</strong></td></tr>
                </tbody>
              </table>
              <h3>Digital Twin Universe</h3>
              <p>Behavioral clones of every external service: <strong>Okta, Jira, Slack, Google Docs/Drive/Sheets</strong>. Full integration scenarios without touching production.</p>
              <h3>Real Output</h3>
              <p><strong>CXDB:</strong> 16,000 lines Rust + 9,500 lines Go + 6,700 lines TypeScript. Shipped. In production.</p>
              <h3>Token Spend Benchmark</h3>
              <p>"If you haven't spent at least <strong>$1,000 on tokens today per human engineer</strong>, your software factory has room for improvement."</p>

              <hr />

              <h2>Part 4 — The Machines Building Themselves</h2>
              <ul>
                <li><strong>Codex 5.3:</strong> First frontier AI model instrumental in creating itself. <strong>25% speed improvement</strong>.</li>
                <li><strong>Claude Code:</strong> 90% self-written. Boris Cherny code-free for 2+ months.</li>
                <li><strong>Cowork:</strong> Built in <strong>10 days</strong> by <strong>4 engineers</strong> — all code by Claude Code.</li>
                <li><strong>GitHub:</strong> ~4% of public commits by Claude Code now → expected 20% by end of 2026.</li>
                <li>Claude Code hit <strong>billion-dollar run rate</strong> six months after launch.</li>
              </ul>

              <hr />

              <h2>Part 5 — Why Most Devs Are Getting Slower</h2>
              <h3>The METR Study</h3>
              <ul>
                <li><strong>Randomized controlled trial</strong> (not survey or case study)</li>
                <li>Experienced devs in codebases they already knew</li>
                <li><strong>19% slower</strong> with AI tools</li>
                <li>Predicted 24% faster; believed 20% faster after — wrong about the <em>direction</em></li>
              </ul>
              <h3>Why Slower?</h3>
              <ul>
                <li>Evaluating AI suggestions takes time</li>
                <li>Correcting almost-right code</li>
                <li>Context-switching between mental models</li>
                <li>Debugging subtle errors in generated code</li>
              </ul>
              <h3>The J-Curve</h3>
              <p>"When you bolt an AI assistant onto an existing workflow, productivity dips before it improves — sometimes for months." Most orgs are in the <strong>bottom of the J-curve</strong>.</p>
              <h3>Copilot Pattern</h3>
              <p>20M users. Faster on isolated tasks. But: larger PRs, higher review costs, more security vulnerabilities. <em>"Copilot makes writing code cheaper, but it makes owning code more expensive."</em></p>
              <h3>Who Sees 25–30% Gains?</h3>
              <p>Not tool adopters — those who did <strong>end-to-end process transformation</strong>: changed specs, reviews, expectations, CI/CD pipelines.</p>

              <hr />

              <h2>Part 6 — The Org Chart Problem</h2>
              <p>"When the human is no longer writing the code, coordination structures don't just become optional — they become friction."</p>
              <h3>StrongDM's Model</h3>
              <p>No sprints. No standups. No Jira board. Write specifications, evaluate outcomes.</p>
              <h3>How Roles Shift</h3>
              <table>
                <thead><tr><th>Old Value</th><th>New Value</th></tr></thead>
                <tbody>
                  <tr><td>Coordinate the team building the feature</td><td>Define the specification clearly enough that agents build the right feature</td></tr>
                  <tr><td>Track dependencies between human teams</td><td>Architect the pipeline of specifications</td></tr>
                  <tr><td>Skills: <strong>coordination</strong></td><td>Skills: <strong>articulation</strong></td></tr>
                </tbody>
              </table>
              <h3>The Key Asymmetry</h3>
              <p><strong>Machines don't ask clarifying questions.</strong> They build what you described. If ambiguous, you get ambiguous software.</p>

              <hr />

              <h2>Part 7 — The Legacy Problem</h2>
              <ul>
                <li>Most enterprise software is <strong>brownfield</strong></li>
                <li>"The system is the specification" — no one wrote down the thousand implicit decisions</li>
                <li>Docs are wrong; tests cover ~30%; the rest runs on tribal lore</li>
              </ul>
              <h3>The Four-Step Migration Path</h3>
              <ul>
                <li>1. Use AI at Level 2–3 to accelerate existing work</li>
                <li>2. Use AI to <strong>document what your system actually does</strong></li>
                <li>3. Redesign CI/CD for AI-generated code at volume</li>
                <li>4. Shift new development to Level 4–5</li>
              </ul>
              <p><strong>Timeline:</strong> "That path takes years, not months. Anyone telling you otherwise is selling something."</p>
              <p><strong>Unsexy prerequisite:</strong> Best specifications, deepest domain understanding, discipline to document.</p>

              <hr />

              <h2>Part 8 — The Talent Reckoning</h2>
              <table>
                <thead><tr><th>Metric</th><th>Figure</th></tr></thead>
                <tbody>
                  <tr><td>Early-career dev employment drop (Harvard)</td><td><strong>7–10%</strong> within 6 quarters</td></tr>
                  <tr><td>UK graduate tech roles fall 2024</td><td><strong>46%</strong></td></tr>
                  <tr><td>UK projected further drop by 2026</td><td><strong>53%</strong></td></tr>
                  <tr><td>US junior dev postings decline</td><td><strong>&gt;60%</strong></td></tr>
                </tbody>
              </table>
              <h3>The Apprenticeship Model Breaking</h3>
              <p>"The career ladder is getting hollowed out from below: seniors at the top, AI at the bottom, and a thinning middle where the learning used to happen."</p>
              <h3>What "Better" Now Means</h3>
              <ul>
                <li>Systems thinking</li>
                <li>Customer intuition</li>
                <li>Holding a whole product in your head</li>
                <li>Writing specs clear enough for autonomous agents</li>
                <li>Anticipating questions the agent won't ask</li>
              </ul>
              <h3>Anthropic's Hiring Shift</h3>
              <p>Preferring <strong>generalists over specialists</strong>. When AI handles implementation, human value is in understanding the problem space broadly enough to direct it correctly.</p>
              <p><strong>Gartner:</strong> 80% of software engineers will need to upskill by 2027.</p>

              <hr />

              <h2>Part 9 — The Shape of the New Org</h2>
              <table>
                <thead><tr><th>Company</th><th>ARR</th><th>Team Size</th><th>Rev/Employee</th></tr></thead>
                <tbody>
                  <tr><td>Cursor</td><td>$500M+</td><td>~40</td><td>$12M+</td></tr>
                  <tr><td>Midjourney</td><td>~$500M</td><td>107–163</td><td>$3M–$5M</td></tr>
                  <tr><td>Lovable</td><td>$100M</td><td>~45</td><td>~$2.2M</td></tr>
                  <tr><td>Bolt</td><td>$20M</td><td>&lt;20</td><td>$1M+</td></tr>
                </tbody>
              </table>
              <h3>The New Org</h3>
              <p>A small group exceptionally good at: understanding user needs, translating to specs, directing AI. "The org chart flattens radically."</p>
              <h3>The Demand Argument</h3>
              <p>Every time computing cost dropped, total software produced <strong>exploded</strong>. Massive unmet demand exists — custom inventory ($500K), patient portals ($200K), supply chain dashboards (six figures). Drop cost by 10x → addressable.</p>
              <p><em>"The dark factory doesn't replace those people. It amplifies them. It turns a great product thinker with five engineers into a great product thinker with unlimited engineering capacity."</em></p>

              <hr />

              <h2>Part 10 — The Tension That Won't Resolve</h2>
              <p>The gap is <strong>not primarily a technology gap</strong>. It is:</p>
              <ul>
                <li>A <strong>specification</strong> gap</li>
                <li>An <strong>organizational</strong> gap</li>
                <li>A <strong>talent</strong> gap</li>
                <li>A <strong>willingness-to-change</strong> gap that no software update closes automatically</li>
              </ul>
            </div>
          )}

          {!done ? (
            <>
              <div className="fq-track">
                <div className="fq-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="fq-meta">
                <span>{idx + 1} of {total}</span>
                <span className="hi">✓ {score} correct</span>
              </div>

              <div className="fq-card" key={animKey}>
                <div className="fq-tag">{q.section}</div>
                <div className="fq-q">{q.q}</div>
                <div className="fq-opts">
                  {q.options.map((opt, i) => {
                    let cls = "fq-opt";
                    if (answered) {
                      if (i === q.answer) cls += chosen === i ? " ok" : " rv";
                      else if (i === chosen) cls += " no";
                    }
                    return (
                      <button key={i} className={cls} onClick={() => handlePick(i)} disabled={answered}>
                        <span className="fq-badge">{LABELS[i]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <div className={`fq-fb ${chosen === q.answer ? "ok" : "no"}`}>
                    {chosen === q.answer
                      ? "✓ Correct — spec accepted."
                      : `✗ Correct: ${q.options[q.answer]}`}
                  </div>
                )}

                {answered && (
                  <button className="fq-next" onClick={handleNext}>
                    {idx + 1 >= total ? "View Results →" : "Next Question →"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="fq-res">
              <div className="fq-res-title">Quiz Complete</div>
              <div className="fq-pct">{pct}%</div>
              <div className={`fq-verd ${passed ? "pass" : "fail"}`}>
                {passed ? "✓ Passed — factory cleared." : "✗ Below 75% — review the study guide and retry."}
              </div>
              <div className="fq-stats">
                <div className="fq-stat"><span className="fq-stat-n">{score}</span><span className="fq-stat-l">Correct</span></div>
                <div className="fq-stat"><span className="fq-stat-n">{missed.length}</span><span className="fq-stat-l">Missed</span></div>
                <div className="fq-stat"><span className="fq-stat-n">{total}</span><span className="fq-stat-l">Total</span></div>
              </div>
              {missed.length > 0 && (
                <>
                  <div className="fq-mh">Review: {missed.length} Missed</div>
                  {missed.map((m, i) => (
                    <div className="fq-mi" key={i}>
                      <div className="fq-mq">{m.q}</div>
                      <div className="fq-mw">✗ You chose: {m.options[m.chosen]}</div>
                      <div className="fq-mr">✓ Correct: {m.options[m.answer]}</div>
                    </div>
                  ))}
                </>
              )}
              <button className="fq-retry" onClick={handleRetry}>🔀 Shuffle & Retry</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
