import { useState, useCallback } from "react";

// ─── Question Bank ─────────────────────────────────────────────────────────────
const ALL_QUESTIONS = [

  // ━━━ 🌐 The AI Labor Market ━━━
  {
    section: "🌐 The AI Labor Market",
    q: "What is the article's central claim about how to get hired in AI?",
    options: [
      "Certifications from top institutions are the fastest path to AI jobs",
      "Artifacts outweigh resumes — what you've built matters more than what you claim",
      "Networking and referrals are the primary driver of AI hiring",
      "A CS degree remains the baseline requirement for most AI roles",
    ],
    answer: 1,
  },
  {
    section: "🌐 The AI Labor Market",
    q: "How does the article characterize the current AI job supply?",
    options: [
      "Growing demand — a hot sector with significant competition",
      "A bubble likely to correct within 18 months",
      "Infinite — every company has uncapped budget and still can't find enough qualified people",
      "Moderate — roughly doubling each year from a small base",
    ],
    answer: 2,
  },
  {
    section: "🌐 The AI Labor Market",
    q: "What does the ManpowerGroup 2026 survey of 39,000 employers across 41 countries conclude about AI skills?",
    options: [
      "AI skills rank second behind cybersecurity as the hardest capability to hire",
      "AI skills are the single hardest capability to find on Earth, surpassing all others for the first time",
      "AI skills are in high demand but behind traditional software engineering",
      "AI skills are increasingly common due to widespread upskilling programs",
    ],
    answer: 1,
  },
  {
    section: "🌐 The AI Labor Market",
    q: "What is the global demand-to-supply ratio for AI roles?",
    options: ["1.8 to 1", "2.5 to 1", "3.2 to 1", "5.0 to 1"],
    answer: 2,
  },
  {
    section: "🌐 The AI Labor Market",
    q: "Approximately how many open AI positions exist globally, and how many qualified candidates are available?",
    options: [
      "800,000 open positions, 400,000 qualified candidates",
      "1.6 million open positions, roughly 518,000 qualified candidates",
      "2.5 million open positions, 1 million qualified candidates",
      "500,000 open positions, 150,000 qualified candidates",
    ],
    answer: 1,
  },
  {
    section: "🌐 The AI Labor Market",
    q: "What is the average time to fill an AI role?",
    options: ["45 days", "90 days", "142 days", "210 days"],
    answer: 2,
  },
  {
    section: "🌐 The AI Labor Market",
    q: "What critique does Poggio cofounder Matt Slotnick make about the 'taste' framing?",
    options: [
      "Taste is too subjective to be taught in any structured curriculum",
      "'The taste thing works because it's nebulous, unassailable, and it feeds the ego' — it's not an actual skill",
      "Taste is a valid concept but impossible to evaluate during hiring",
      "Taste is a useful shorthand that only applies to senior-level roles",
    ],
    answer: 1,
  },
  {
    section: "🌐 The AI Labor Market",
    q: "Why does the article argue that most AI upskilling content fails to close the skills gap?",
    options: [
      "It is too technically advanced for most learners to complete",
      "It focuses on tools when employers are hiring for judgment, and misses the entire middle layer of the curriculum",
      "It is priced too high for individual learners to access",
      "It is produced too slowly to keep pace with model improvements",
    ],
    answer: 1,
  },

  // ━━━ ✂️ The K-Shaped Split ━━━
  {
    section: "✂️ The K-Shaped Split",
    q: "What does the 'K-shaped split' describe in the AI labor market?",
    options: [
      "The divide between AI engineers who code and AI PMs who don't",
      "Two simultaneous markets moving in opposite directions — one contracting, one expanding",
      "The gap between AI skills taught in academia vs. those used in industry",
      "The divergence between US and global AI hiring trends",
    ],
    answer: 1,
  },
  {
    section: "✂️ The K-Shaped Split",
    q: "Which types of roles belong to Market One (the contracting side)?",
    options: [
      "AI product managers, agentic engineers, and AI reliability engineers",
      "Generalist PMs, standard software engineers, conventional business analysts, run-the-playbook marketing managers",
      "Data scientists, ML researchers, and prompt engineers",
      "Compliance officers, legal professionals, and domain specialists with AI skills",
    ],
    answer: 1,
  },
  {
    section: "✂️ The K-Shaped Split",
    q: "By how much did US job postings for routine, automation-prone roles fall after ChatGPT launched?",
    options: ["5%", "13%", "22%", "35%"],
    answer: 1,
  },
  {
    section: "✂️ The K-Shaped Split",
    q: "What did Accenture do simultaneously that best illustrates the K-shaped split within a single company?",
    options: [
      "Paused all hiring while retraining its entire workforce on AI",
      "Cut roughly 11,000 roles while committing $3B to AI and nearly doubling AI/data specialists to 77,000",
      "Shifted all software engineers into AI roles without any layoffs",
      "Acquired three AI startups while reducing its consulting headcount by half",
    ],
    answer: 1,
  },
  {
    section: "✂️ The K-Shaped Split",
    q: "Why can someone in Market One and someone in Market Two both seem correct when describing the job market?",
    options: [
      "Because AI budgets are unevenly distributed across industries and geographies",
      "Because they're each describing a different market — both realities are accurate simultaneously",
      "Because job postings are inflated and don't reflect actual hiring intent",
      "Because the premium for AI roles makes them feel abundant to insiders but scarce to outsiders",
    ],
    answer: 1,
  },
  {
    section: "✂️ The K-Shaped Split",
    q: "What is the fundamental nature of the gap between Market One and Market Two?",
    options: [
      "A credentials gap — Market Two roles require advanced degrees not widely held",
      "A network gap — Market Two jobs are filled through referrals before posting publicly",
      "A specific, measurable, addressable skills gap centered on capabilities most programs don't teach",
      "A geography gap — Market Two jobs are concentrated in cities most candidates can't relocate to",
    ],
    answer: 2,
  },

  // ━━━ 🏢 The Hiring Side Is Broken ━━━
  {
    section: "🏢 The Hiring Side Is Broken",
    q: "What does the article claim a 'meaningful percentage' of AI job postings actually are?",
    options: [
      "Entry-level roles mislabeled as senior positions to attract more applicants",
      "Market research disguised as hiring — companies using postings to figure out what they want",
      "Contract roles misrepresented as full-time positions",
      "Ghost postings left active after the role was filled internally",
    ],
    answer: 1,
  },
  {
    section: "🏢 The Hiring Side Is Broken",
    q: "What does the article call the real problem when a company posts an incoherent AI role and rejects all 100 applicants?",
    options: [
      "A talent shortage — too few qualified people in the market",
      "A budget shortage — companies can't actually afford the talent they claim to want",
      "A specification shortage — the company hasn't decided what it actually needs",
      "A pipeline shortage — recruiters don't know where to source AI talent",
    ],
    answer: 2,
  },
  {
    section: "🏢 The Hiring Side Is Broken",
    q: "What is the first rule in the article's code of conduct for AI hiring?",
    options: [
      "Pick one track, not four — build, specify, operate, or apply",
      "Publish your evaluation criteria with measurable outcomes",
      "Define the outcome before you define the role — specific business outcomes, not 'we need an AI person'",
      "Respect the time — if using interviews as discovery, call it a consulting engagement",
    ],
    answer: 2,
  },
  {
    section: "🏢 The Hiring Side Is Broken",
    q: "What does the article's GM observe about who companies attract when they can't articulate what success looks like in a role?",
    options: [
      "They attract overqualified candidates who quickly become bored and leave",
      "They attract candidates who are good at interviews and bad at delivery",
      "They attract candidates from adjacent fields who lack the core technical skills",
      "They attract candidates primarily motivated by compensation rather than the mission",
    ],
    answer: 1,
  },
  {
    section: "🏢 The Hiring Side Is Broken",
    q: "The article says posting a role asking for ML engineering AND executive communications AND model fine-tuning AND go-to-market strategy reveals what about the hiring company?",
    options: [
      "They are looking for a unicorn candidate who genuinely has all these skills",
      "They haven't decided whether they need an engineer or an executive, so skilled candidates move on",
      "They have budget for multiple hires and are testing the market simultaneously",
      "They are filling a newly-created role and writing the job description in real time",
    ],
    answer: 1,
  },

  // ━━━ ✍️ Skill 1: Specification Precision ━━━
  {
    section: "✍️ Skill 1: Specification Precision",
    q: "Why does specification precision become critical with agents in a way it never was with human colleagues?",
    options: [
      "Agents work faster than humans, so errors compound more quickly before they're caught",
      "Agents take your specification literally — they don't infer intent, read between lines, or fill gaps with common sense",
      "Agents require legal documentation of every instruction for audit purposes",
      "Agents can't ask clarifying questions, so ambiguity causes them to halt and wait for input",
    ],
    answer: 1,
  },
  {
    section: "✍️ Skill 1: Specification Precision",
    q: "What is fundamentally wrong with 'Make our customer support better' as an agent specification?",
    options: [
      "It is too technically specific and would confuse a general-purpose agent",
      "It lacks a timeline, which agents require to prioritize tasks correctly",
      "It is vague — the agent handles ambiguous edge cases randomly at scale with no way to verify success",
      "It is fine for simple agents but requires decomposition for multi-agent systems",
    ],
    answer: 2,
  },
  {
    section: "✍️ Skill 1: Specification Precision",
    q: "In the good customer support specification example, what triggers human escalation besides low sentiment?",
    options: [
      "Any question about a product not listed in the FAQ",
      "Billing disputes over $500",
      "Repeat contacts within 24 hours on the same issue",
      "Any request involving account deletion",
    ],
    answer: 1,
  },
  {
    section: "✍️ Skill 1: Specification Precision",
    q: "What is the key distinction between a hard constraint and a soft preference in a specification?",
    options: [
      "Hard constraints apply to safety-critical systems; soft preferences apply to non-critical workflows",
      "Hard constraints must never be violated; soft preferences are guidelines the agent follows unless the situation calls for flexibility",
      "Hard constraints are defined in the system prompt; soft preferences are added at the user turn",
      "Hard constraints require human sign-off on each instance; soft preferences can be evaluated autonomously",
    ],
    answer: 1,
  },
  {
    section: "✍️ Skill 1: Specification Precision",
    q: "What existing professional background makes someone closer to specification precision skill than they might think?",
    options: [
      "Experience with agile sprint planning and user story writing",
      "Experience writing detailed contracts, comprehensive test plans, or regulatory filings",
      "Experience presenting business cases to executive stakeholders",
      "Experience managing cross-functional projects with distributed teams",
    ],
    answer: 1,
  },
  {
    section: "✍️ Skill 1: Specification Precision",
    q: "What practical exercise does the article recommend to make your specification gap visible?",
    options: [
      "Compare your prompts to published prompt engineering frameworks and score the delta",
      "Write a spec precise enough for someone who can't ask questions to complete the task, then hand it to an AI agent and observe the gap",
      "Take the AiCred assessment before writing any specifications",
      "Pair with an engineer to write specs together, then review discrepancies afterward",
    ],
    answer: 1,
  },

  // ━━━ 🔍 Skill 2: Evaluation & Quality Judgment ━━━
  {
    section: "🔍 Skill 2: Evaluation & Quality Judgment",
    q: "Why is AI error fundamentally different from human error, making it harder to catch?",
    options: [
      "AI errors occur at higher frequency than human errors on equivalent tasks",
      "AI produces errors that are confidently, fluently, and plausibly wrong — indistinguishable from correct output by tone or style",
      "AI errors tend to cluster in predictable areas that domain experts already know to check",
      "AI errors are invisible in the output but traceable in the model's reasoning chain",
    ],
    answer: 1,
  },
  {
    section: "🔍 Skill 2: Evaluation & Quality Judgment",
    q: "What cognitive bias does the article name as the primary risk when reviewing AI output?",
    options: [
      "Automation bias — over-trusting any automated system regardless of error rate",
      "Confirmation bias — finding what you expected to find in the output",
      "The fluency heuristic — 'if it reads well, it must be right'",
      "Anchoring bias — over-weighting the first output seen",
    ],
    answer: 2,
  },
  {
    section: "🔍 Skill 2: Evaluation & Quality Judgment",
    q: "What is Anthropic's stated standard for what makes a 'good evaluation task'?",
    options: [
      "A task that can be scored automatically without any human review",
      "A task where two domain experts would independently reach the same pass/fail verdict",
      "A task that mirrors the single most common user request in production",
      "A task with a binary correct/incorrect answer verifiable against a ground truth database",
    ],
    answer: 1,
  },
  {
    section: "🔍 Skill 2: Evaluation & Quality Judgment",
    q: "How does the article describe the fourth and most neglected component of evaluation?",
    options: [
      "Adversarial testing — deliberately trying to break the system before launch",
      "Regression testing — verifying new versions don't degrade on previously-passing tasks",
      "Monitoring — continuous evaluation in production, tracking metrics, and detecting quality drift",
      "Red-teaming — using a separate model to attack the primary agent's outputs",
    ],
    answer: 2,
  },
  {
    section: "🔍 Skill 2: Evaluation & Quality Judgment",
    q: "What practical method does the article recommend to build all four evaluation sub-skills simultaneously?",
    options: [
      "Complete Anthropic's model evaluation certification course in sequence",
      "Run an AI system on real domain tasks, review every output as if your name is on it, keep a categorized error log for two weeks",
      "Shadow a senior AI engineer through a full production evaluation cycle",
      "Reproduce published AI failure case studies and identify which evaluation technique would have caught each",
    ],
    answer: 1,
  },

  // ━━━ 🧩 Skill 3: Decomposition for Delegation ━━━
  {
    section: "🧩 Skill 3: Decomposition for Delegation",
    q: "What fundamental shift does Skill 3 represent in how you work with AI?",
    options: [
      "From writing prompts to writing code",
      "From working alone to managing AI teams",
      "From using an AI tool to architecting AI systems",
      "From single-agent workflows to multi-model pipelines",
    ],
    answer: 2,
  },
  {
    section: "🧩 Skill 3: Decomposition for Delegation",
    q: "In the good compliance review decomposition, where does the human checkpoint appear and what does it involve?",
    options: [
      "At the start, before any agent touches the filings, where a manager approves the scope",
      "After the classification agent flags unusual structures, before risk assessment begins",
      "After the risk assessment produces preliminary ratings, where a senior compliance officer reviews all high-risk filings",
      "At the very end, reviewing the final compiled report before it is sent to regulators",
    ],
    answer: 2,
  },
  {
    section: "🧩 Skill 3: Decomposition for Delegation",
    q: "Why is agent decomposition NOT the same as regular project management, even though they look similar?",
    options: [
      "Agents work in parallel by default whereas human teams typically work sequentially",
      "Agents have defined context windows, are non-deterministic, need explicit per-subtask success criteria, and can't hold ambiguity or use unstated background knowledge",
      "Agents require formal handoff documentation with schema validation that human teams don't need",
      "Agent tasks cannot be reassigned mid-project the way human team tasks can be",
    ],
    answer: 1,
  },
  {
    section: "🧩 Skill 3: Decomposition for Delegation",
    q: "What four categories should you use when classifying each piece of a workflow for agent decomposition?",
    options: [
      "Input tasks, processing tasks, output tasks, and escalation tasks",
      "Reasoning tasks, retrieval tasks, judgment calls needing a human checkpoint, and coordination tasks needing an orchestrator",
      "Simple tasks, complex tasks, creative tasks, and verification tasks",
      "Agent tasks, tool-call tasks, API tasks, and human review tasks",
    ],
    answer: 1,
  },

  // ━━━ 💥 Skill 4: Failure Pattern Recognition ━━━
  {
    section: "💥 Skill 4: Failure Pattern Recognition",
    q: "What does Context Degradation describe as an agent failure mode?",
    options: [
      "The agent loses access to its tool belt after a certain number of API calls",
      "Quality drops as sessions get long because effective attention on early context weakens",
      "The agent's context window fills with irrelevant information that was never cleared",
      "Two agents writing to the same context simultaneously overwrite each other's state",
    ],
    answer: 1,
  },
  {
    section: "💥 Skill 4: Failure Pattern Recognition",
    q: "Specification Drift is best described as what?",
    options: [
      "The agent changes its output format mid-task without being instructed to",
      "The agent's interpretation gradually deviates from the original intent until, by step fifty, it's solving a subtly different problem",
      "The original specification becomes outdated as external conditions change during a long run",
      "Multiple agents receiving slightly different versions of the same specification produce conflicting outputs",
    ],
    answer: 1,
  },
  {
    section: "💥 Skill 4: Failure Pattern Recognition",
    q: "How do you test specifically for Sycophantic Confirmation in an agent system?",
    options: [
      "Ask the agent increasingly leading questions and check whether it ever disagrees",
      "Deliberately introduce factual errors (like a wrong conversion rate) and see if the agent catches and corrects them",
      "Ask the agent to evaluate its own prior outputs for accuracy and consistency",
      "Run the same query twice with different phrasing and check for consistency",
    ],
    answer: 1,
  },
  {
    section: "💥 Skill 4: Failure Pattern Recognition",
    q: "What does the article identify as the single highest-impact intervention for preventing Tool Selection Errors?",
    options: [
      "Adding a dedicated tool-routing agent before any multi-tool call",
      "Reducing the total number of tools available so the agent has fewer choices",
      "Tool description quality — how each available tool is described to the agent",
      "Running all tool calls through a validation agent that verifies the selection before execution",
    ],
    answer: 2,
  },
  {
    section: "💥 Skill 4: Failure Pattern Recognition",
    q: "What makes Cascade Failure particularly insidious compared to other failure patterns?",
    options: [
      "It happens instantaneously, giving no time for human intervention",
      "No single agent fails catastrophically — one error propagates through the chain until the system-level output is garbage while each agent appears functional",
      "It is caused by model updates and cannot be predicted from system design alone",
      "It only occurs in systems with more than five agents, making it easy to scope during planning",
    ],
    answer: 1,
  },
  {
    section: "💥 Skill 4: Failure Pattern Recognition",
    q: "Why is Silent Failure the most dangerous of the six patterns?",
    options: [
      "It occurs at the highest frequency across all agent system types",
      "It corrupts the agent's memory in ways that cascade into future sessions",
      "The agent produces plausible-looking wrong output with no error signal — indistinguishable from correct output, detectable only through sampling or human review",
      "It is caused by adversarial attacks rather than model limitations, making it unpredictable",
    ],
    answer: 2,
  },
  {
    section: "💥 Skill 4: Failure Pattern Recognition",
    q: "The article names Tool Selection Errors as specifically tested on which credential?",
    options: [
      "Upwork's internal AI engineering proficiency assessment",
      "The Claude Certified Architect exam",
      "Anthropic's engineering blog evaluation framework",
      "Scale AI's PM competency rubric",
    ],
    answer: 1,
  },

  // ━━━ 🔐 Skill 5: Trust Boundary & Security ━━━
  {
    section: "🔐 Skill 5: Trust Boundary & Security",
    q: "What single diagnostic question does the article's compliance officer apply to every new AI workflow?",
    options: [
      "'Who is responsible if this output is wrong, and have they signed off?'",
      "'What's the worst thing that happens if this is wrong, and can I undo it?'",
      "'Has this workflow been validated by a human expert in this domain?'",
      "'Does the model have access to any data it shouldn't see in this context?'",
    ],
    answer: 1,
  },
  {
    section: "🔐 Skill 5: Trust Boundary & Security",
    q: "When does frequency as a trust boundary variable make full human review impossible?",
    options: [
      "When a task runs more than once per hour across any time zone",
      "When a task runs across multiple parallel agent threads simultaneously",
      "When a task runs ten thousand times daily — automated evaluation with human sampling is required instead",
      "When a task involves more than three different agents in sequence",
    ],
    answer: 2,
  },
  {
    section: "🔐 Skill 5: Trust Boundary & Security",
    q: "What is the key difference in required oversight between a task consumed immediately vs. one that can be checked afterward?",
    options: [
      "Immediate consumption requires higher-quality models; post-hoc verifiable tasks can use smaller models",
      "Immediate consumption (live chat, real-time trading) requires synchronous oversight; post-hoc verifiable output allows lighter real-time monitoring",
      "Immediate consumption tasks need more agents; post-hoc tasks can use a single agent with batching",
      "Immediate consumption requires human sign-off before each agent action; post-hoc tasks can use statistical sampling",
    ],
    answer: 1,
  },
  {
    section: "🔐 Skill 5: Trust Boundary & Security",
    q: "Which three specific security threats does the article name as the growing adversarial dimension of agent systems?",
    options: [
      "SQL injection, cross-site scripting, and man-in-the-middle attacks",
      "Model theft, training data poisoning, and output manipulation",
      "Prompt injection, data exfiltration through tool calls, and privilege escalation",
      "Hallucination attacks, context overflow, and unauthorized fine-tuning",
    ],
    answer: 2,
  },
  {
    section: "🔐 Skill 5: Trust Boundary & Security",
    q: "What existing professional background translates most directly into trust boundary design skill?",
    options: [
      "Software architects who have designed access control systems",
      "Risk, compliance, and information security professionals who've designed trust boundaries for human workers",
      "Legal professionals who draft liability clauses into software contracts",
      "Operations managers who maintain quality control in regulated manufacturing",
    ],
    answer: 1,
  },

  // ━━━ 🗂️ Skills 6 & 7: Context Architecture & Cost Economics ━━━
  {
    section: "🗂️ Context Architecture & Cost Economics",
    q: "What is Anthropic's internal term for the skill of managing what information an agent receives, when, and in what form?",
    options: ["Context design", "Context engineering", "Retrieval architecture", "Memory management"],
    answer: 1,
  },
  {
    section: "🗂️ Context Architecture & Cost Economics",
    q: "What percentage of the Claude Certified Architect exam weight is dedicated to context architecture?",
    options: ["5%", "10%", "15%", "25%"],
    answer: 2,
  },
  {
    section: "🗂️ Context Architecture & Cost Economics",
    q: "What is the practical distinction between 'persistent context' and 'per-session context'?",
    options: [
      "Persistent context is stored in model weights; per-session context lives in the system prompt",
      "Persistent context is always loaded (coding standards, compliance rules, brand voice); per-session context is loaded when relevant (this customer's history, this specific document)",
      "Persistent context cannot be changed during a run; per-session context is fully editable by the user",
      "Persistent context is shared across all agents in a system; per-session context is private to a single agent",
    ],
    answer: 1,
  },
  {
    section: "🗂️ Context Architecture & Cost Economics",
    q: "Why does including irrelevant information in a context window actively harm performance — not merely waste tokens?",
    options: [
      "It causes the model to switch to a different internal reasoning mode that's less accurate",
      "It triggers safety filters that slow the model's output generation rate",
      "It's noise that dilutes signal — irrelevant information actively degrades the quality of attention on what matters",
      "It pushes critical instructions past the model's effective attention range at the end of the window",
    ],
    answer: 2,
  },
  {
    section: "🗂️ Context Architecture & Cost Economics",
    q: "Approximately how much more expensive per token is a senior model (Claude Opus, GPT-4) versus a smaller model (Haiku, GPT-4o Mini)?",
    options: [
      "2 to 5 times more expensive",
      "10 to 50 times more expensive",
      "100 to 200 times more expensive",
      "Roughly the same — cost differences are primarily in context window size, not per-token rates",
    ],
    answer: 1,
  },
  {
    section: "🗂️ Context Architecture & Cost Economics",
    q: "What concrete scale example does the article use to show the business impact of cost and token economics?",
    options: [
      "A $50/task workflow redesigned to $3/task at the same quality — trivial once, decisive when run 10,000 times daily",
      "A $1/task workflow that becomes $100/task when upgraded to a senior model for all steps",
      "A workflow costing $0.10/task that enables a business model impossible at $1/task",
      "A workflow where 80% of tasks can be handled at $0.01/task using a distilled model",
    ],
    answer: 0,
  },
  {
    section: "🗂️ Context Architecture & Cost Economics",
    q: "Upwork's job posting requires engineers to optimize cost/performance through which specific techniques?",
    options: [
      "Caching, batching, prefilling, and parallel sampling",
      "Quantization, distillation, model-routing, and autoscaling",
      "Prompt compression, context pruning, embedding optimization, and retrieval tuning",
      "Fine-tuning, RLHF, constitutional AI, and knowledge distillation",
    ],
    answer: 1,
  },

  // ━━━ 🎯 Artifacts, Career Tracks & The Learning Path ━━━
  {
    section: "🎯 Artifacts, Career Tracks & Learning Path",
    q: "Why does the article say artifacts produce 'inbound recruiter messages' rather than job applications in Market Two?",
    options: [
      "Market Two companies exclusively source from GitHub and don't post jobs publicly",
      "The ecosystem is young enough that publishing real work gets noticed — you demonstrate capability rather than claim it",
      "AI hiring managers spend more time on social media than reviewing traditional resumes",
      "Credentialing bodies have certified that artifacts are the standard evaluation method for AI roles",
    ],
    answer: 1,
  },
  {
    section: "🎯 Artifacts, Career Tracks & Learning Path",
    q: "What does the article call the 'most underused and almost unfakeable' artifact that works across all career tracks?",
    options: [
      "An open-source agent system with a detailed README and architecture diagram",
      "A domain evaluation framework published on a professional blog",
      "A narrated real working session where you specify, run, evaluate, troubleshoot, and iterate — explaining each decision in real time",
      "A failure post-mortem documenting a system that broke and the specific fix applied",
    ],
    answer: 2,
  },
  {
    section: "🎯 Artifacts, Career Tracks & Learning Path",
    q: "What salary range does the article give for the AI Product Manager track?",
    options: [
      "$80K–$150K",
      "$133K–$437K+",
      "$150K–$250K",
      "$200K–$500K",
    ],
    answer: 1,
  },
  {
    section: "🎯 Artifacts, Career Tracks & Learning Path",
    q: "Research on 12,000+ AI PM hires found what percentage do NOT come from CS backgrounds?",
    options: ["20%", "40%", "60%", "80%"],
    answer: 2,
  },
  {
    section: "🎯 Artifacts, Career Tracks & Learning Path",
    q: "Why is the Agent Operations / AI Reliability track described as having 'the most open running room'?",
    options: [
      "It has the highest salary ceiling of the four tracks",
      "It is the least defined track — ops, SRE, QA, and PM backgrounds translate shorter than expected, and few people have staked out this identity yet",
      "It requires the fewest of the seven skills, making it the easiest to enter",
      "It is the fastest-growing track because every AI deployment creates an immediate ops function need",
    ],
    answer: 1,
  },
  {
    section: "🎯 Artifacts, Career Tracks & Learning Path",
    q: "What happens in Weeks 10–11 of the twelve-week Engineer/Architect track?",
    options: [
      "Sitting the Claude Certified Architect exam and reviewing results",
      "Completing MCP tool integration courses and publishing the integration",
      "Building a multi-agent system for a real workflow and publishing the architecture document, cost model, and failure post-mortem",
      "Running multi-agent Claude Code sessions and building a first agent cost model",
    ],
    answer: 2,
  },
  {
    section: "🎯 Artifacts, Career Tracks & Learning Path",
    q: "What does the article identify as the most common stall point in the PM/Ops/Domain Specialist 12-week track?",
    options: [
      "Weeks 1–3, because the conceptual material is more technical than most PMs expect",
      "Weeks 4–6, because this is where you stop learning about AI and start using it on real tasks from your own domain",
      "Weeks 7–9, because writing an agent product spec requires engineering collaboration most PMs can't do alone",
      "Weeks 10–12, because publishing publicly requires overcoming imposter syndrome",
    ],
    answer: 1,
  },
  {
    section: "🎯 Artifacts, Career Tracks & Learning Path",
    q: "What salary premium does an AI-Augmented Domain Specialist command over an equivalent non-AI role?",
    options: ["10–15%", "23–35%", "50–60%", "75–100%"],
    answer: 1,
  },
  {
    section: "🎯 Artifacts, Career Tracks & Learning Path",
    q: "The article draws an analogy to AWS cloud certifications to make which point about the AI skill window?",
    options: [
      "AI certifications will follow the same pricing trajectory as cloud certifications did",
      "AWS certifications are the best structural model for how AI certifications should be designed",
      "When AWS launched certifications in 2013 they were optional; by 2018 they were required — the AI skill cycle is compressing faster",
      "AI roles will consolidate around a few dominant platforms the way cloud consolidated around AWS, Azure, and GCP",
    ],
    answer: 2,
  },
];

// ─── Fisher-Yates Shuffle ──────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LABELS = ["A", "B", "C", "D"];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function AICredentialsQuiz() {
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
    if (i === q.answer) {
      setScore(s => s + 1);
    } else {
      setMissed(m => [...m, { ...q, chosen: i }]);
    }
  }, [answered, q]);

  const handleNext = useCallback(() => {
    if (idx + 1 >= total) {
      setDone(true);
    } else {
      setIdx(n => n + 1);
      setChosen(null);
      setAnimKey(k => k + 1);
    }
  }, [idx, total]);

  const handleRetry = useCallback(() => {
    setDeck(shuffle(ALL_QUESTIONS));
    setIdx(0);
    setChosen(null);
    setScore(0);
    setMissed([]);
    setDone(false);
    setAnimKey(k => k + 1);
  }, []);

  const pct = done ? Math.round((score / total) * 100) : 0;
  const passed = pct >= 75;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Nunito:wght@400;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cq-root {
          min-height: 100vh;
          background: radial-gradient(ellipse at 30% 0%, #0f0c00 0%, #080700 50%, #000 100%);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 40px 16px 80px;
          font-family: 'Nunito', sans-serif;
          color: #f2e8c8;
        }

        .cq-wrap {
          width: 100%;
          max-width: 640px;
        }

        .cq-masthead {
          text-align: center;
          margin-bottom: 32px;
        }
        .cq-kicker {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #c89a00;
          margin-bottom: 8px;
          opacity: 0.9;
        }
        .cq-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 5.5vw, 36px);
          font-weight: 900;
          color: #fff8e7;
          line-height: 1.18;
          letter-spacing: -0.3px;
        }
        .cq-title span {
          color: #e6b800;
          font-style: italic;
        }
        .cq-subtitle {
          margin-top: 8px;
          font-size: 12px;
          font-weight: 700;
          color: #7a6820;
          letter-spacing: 1px;
        }

        /* ── Study Button ── */
        .cq-study-btn {
          display: inline-block;
          margin-top: 12px;
          padding: 7px 20px;
          font-family: 'Nunito', sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #fff8e7;
          background: #e6b80022;
          border: 1px solid #e6b80055;
          border-radius: 99px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .cq-study-btn:hover {
          background: #e6b80044;
          border-color: #e6b800;
        }

        /* ── Study Panel ── */
        .cq-study-panel {
          background: linear-gradient(160deg, #151000 0%, #1a1500 100%);
          border: 1px solid #332800;
          border-radius: 18px;
          padding: 30px;
          margin-bottom: 24px;
          box-shadow: 0 12px 48px #00000077, inset 0 1px 0 #e6b80022;
          max-height: 60vh;
          overflow-y: auto;
          animation: cqFadeUp 0.32s ease both;
          font-size: 14px;
          line-height: 1.7;
          color: #d8ccb8;
        }
        @keyframes cqFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cq-study-panel h2 {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 900;
          color: #fff8e7;
          margin: 24px 0 8px;
        }
        .cq-study-panel h2:first-child { margin-top: 0; }
        .cq-study-panel h3 {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 700;
          color: #e6b800;
          margin: 20px 0 6px;
        }
        .cq-study-panel h4 {
          font-size: 14px;
          font-weight: 800;
          color: #c89a00;
          margin: 14px 0 4px;
        }
        .cq-study-panel p {
          margin: 8px 0;
        }
        .cq-study-panel strong {
          color: #fff8e7;
        }
        .cq-study-panel em {
          color: #e6b800;
          font-style: italic;
        }
        .cq-study-panel hr {
          border: none;
          border-top: 1px solid #332800;
          margin: 20px 0;
        }
        .cq-study-panel ul {
          margin: 8px 0;
          padding-left: 20px;
        }
        .cq-study-panel li {
          margin: 4px 0;
        }
        .cq-study-panel table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0;
          font-size: 13px;
        }
        .cq-study-panel th {
          text-align: left;
          padding: 8px 10px;
          background: #e6b80022;
          color: #e6b800;
          border: 1px solid #332800;
          font-weight: 800;
          letter-spacing: 0.5px;
        }
        .cq-study-panel td {
          padding: 8px 10px;
          border: 1px solid #332800;
          color: #d8ccb8;
        }
        .cq-study-panel::-webkit-scrollbar { width: 6px; }
        .cq-study-panel::-webkit-scrollbar-track { background: transparent; }
        .cq-study-panel::-webkit-scrollbar-thumb {
          background: #e6b80044;
          border-radius: 99px;
        }

        .cq-progress-rail {
          height: 4px;
          background: #1a1500;
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 10px;
          border: 1px solid #332800;
        }
        .cq-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #7a5500, #e6b800, #ffe566);
          border-radius: 99px;
          transition: width 0.45s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 0 10px #e6b80066;
        }
        .cq-meta {
          display: flex;
          justify-content: space-between;
          font-size: 11.5px;
          font-weight: 800;
          color: #7a6820;
          margin-bottom: 22px;
          letter-spacing: 0.3px;
        }
        .cq-meta .hi { color: #e6b800; }

        .cq-card {
          background: linear-gradient(155deg, #0f0c00 0%, #161200 60%, #1a1500 100%);
          border: 1px solid #2e2600;
          border-radius: 20px;
          padding: 30px;
          box-shadow:
            0 1px 0 #332800,
            0 16px 56px #00000088,
            inset 0 1px 0 #e6b80018;
          animation: cqFadeUp .3s ease both;
        }

        @keyframes cqFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cq-section {
          display: inline-block;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #e6b800;
          background: #e6b80014;
          border: 1px solid #e6b80030;
          border-radius: 99px;
          padding: 3px 12px;
          margin-bottom: 16px;
        }

        .cq-question {
          font-family: 'Playfair Display', serif;
          font-size: clamp(15px, 3.6vw, 19px);
          font-weight: 700;
          line-height: 1.55;
          color: #f2e8c8;
          margin-bottom: 24px;
        }

        .cq-options {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .cq-option {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #0d0b00;
          border: 1.5px solid #2a2200;
          border-radius: 12px;
          padding: 12px 15px;
          cursor: pointer;
          font-family: 'Nunito', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #c8ba88;
          text-align: left;
          line-height: 1.45;
          transition:
            transform 0.16s ease,
            border-color 0.16s ease,
            background 0.16s ease,
            box-shadow 0.16s ease;
        }
        .cq-option:not(:disabled):hover {
          transform: translateX(3px);
          border-color: #e6b800;
          background: #181300;
          box-shadow: 0 0 16px #e6b80018, inset 0 0 0 1px #e6b80020;
        }
        .cq-option:disabled { cursor: default; }

        .cq-option.cq-correct {
          background: #001a08;
          border-color: #33cc77;
          color: #aaffcc;
          box-shadow: 0 0 18px #33cc7733;
        }
        .cq-option.cq-wrong {
          background: #180000;
          border-color: #cc3344;
          color: #ffaaaa;
          box-shadow: 0 0 18px #cc334433;
        }
        .cq-option.cq-reveal {
          background: #001a08;
          border-color: #55dd99;
          color: #ccffdd;
          animation: cqPulse .55s ease;
        }

        @keyframes cqPulse {
          0%   { box-shadow: 0 0 0 #55dd9900; }
          45%  { box-shadow: 0 0 24px #55dd9966; }
          100% { box-shadow: 0 0 12px #55dd9933; }
        }

        .cq-badge {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 26px;
          height: 26px;
          border-radius: 7px;
          background: #1a1500;
          border: 1px solid #332800;
          font-size: 11px;
          font-weight: 900;
          color: #e6b800;
          transition: background .16s, border-color .16s, color .16s;
        }
        .cq-option.cq-correct .cq-badge,
        .cq-option.cq-reveal .cq-badge {
          background: #002210;
          border-color: #33cc77;
          color: #77ffaa;
        }
        .cq-option.cq-wrong .cq-badge {
          background: #1a0000;
          border-color: #cc3344;
          color: #ff7788;
        }

        .cq-feedback {
          margin-top: 16px;
          padding: 10px 14px;
          border-radius: 9px;
          font-size: 12.5px;
          font-weight: 700;
          animation: cqFadeUp .2s ease;
          line-height: 1.45;
        }
        .cq-feedback.ok {
          background: #001a08;
          border: 1px solid #33cc7744;
          color: #77ffaa;
        }
        .cq-feedback.bad {
          background: #180000;
          border: 1px solid #cc334444;
          color: #ffaaaa;
        }

        .cq-next {
          margin-top: 20px;
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #7a5500 0%, #c89a00 55%, #e6b800 100%);
          border: none;
          border-radius: 12px;
          font-family: 'Nunito', sans-serif;
          font-size: 15px;
          font-weight: 900;
          color: #0d0b00;
          cursor: pointer;
          box-shadow: 0 4px 24px #e6b80033;
          transition: transform .14s ease, box-shadow .14s ease;
          animation: cqFadeUp .22s ease;
        }
        .cq-next:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px #e6b80066;
        }
        .cq-next:active { transform: translateY(0); }

        .cq-results {
          background: linear-gradient(155deg, #0f0c00 0%, #161200 100%);
          border: 1px solid #2e2600;
          border-radius: 20px;
          padding: 36px 30px;
          box-shadow: 0 16px 56px #00000088, inset 0 1px 0 #e6b80018;
          animation: cqFadeUp .4s ease;
        }
        .cq-res-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 5vw, 28px);
          font-weight: 900;
          text-align: center;
          color: #f2e8c8;
          margin-bottom: 4px;
        }
        .cq-res-pct {
          font-family: 'Playfair Display', serif;
          font-size: clamp(68px, 19vw, 100px);
          font-weight: 900;
          text-align: center;
          color: #e6b800;
          line-height: 1;
          text-shadow: 0 0 60px #e6b80044;
          margin: 8px 0 14px;
        }
        .cq-verdict {
          text-align: center;
          font-size: 14px;
          font-weight: 800;
          padding: 9px 20px;
          border-radius: 99px;
          margin-bottom: 24px;
        }
        .cq-verdict.pass {
          background: #001a08;
          border: 1px solid #33cc7744;
          color: #77ffaa;
        }
        .cq-verdict.fail {
          background: #180000;
          border: 1px solid #cc334444;
          color: #ffaaaa;
        }

        .cq-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 28px;
        }
        .cq-stat {
          background: #0a0800;
          border: 1px solid #2a2200;
          border-radius: 12px;
          padding: 16px 10px;
          text-align: center;
        }
        .cq-stat-n {
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          font-weight: 900;
          color: #e6b800;
          display: block;
        }
        .cq-stat-l {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #7a6820;
          display: block;
          margin-top: 2px;
        }

        .cq-missed-heading {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #e6b800;
          margin-bottom: 14px;
          padding-top: 22px;
          border-top: 1px solid #2a2200;
        }
        .cq-missed-item {
          background: #0a0800;
          border: 1px solid #2a2200;
          border-radius: 11px;
          padding: 14px;
          margin-bottom: 10px;
        }
        .cq-missed-q {
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          font-weight: 700;
          color: #c8ba88;
          line-height: 1.45;
          margin-bottom: 8px;
        }
        .cq-missed-wrong {
          font-size: 12px;
          font-weight: 700;
          color: #ff9999;
          margin-bottom: 4px;
          line-height: 1.4;
        }
        .cq-missed-right {
          font-size: 12px;
          font-weight: 700;
          color: #77ffaa;
          line-height: 1.4;
        }

        .cq-retry {
          margin-top: 26px;
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #7a5500 0%, #c89a00 55%, #e6b800 100%);
          border: none;
          border-radius: 12px;
          font-family: 'Nunito', sans-serif;
          font-size: 16px;
          font-weight: 900;
          color: #0d0b00;
          cursor: pointer;
          box-shadow: 0 4px 28px #e6b80033;
          transition: transform .14s ease, box-shadow .14s ease;
        }
        .cq-retry:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 36px #e6b80066;
        }

        @media (max-width: 460px) {
          .cq-card, .cq-results { padding: 20px 16px; }
          .cq-stats { gap: 8px; }
          .cq-stat-n { font-size: 24px; }
        }
      `}</style>

      <div className="cq-root">
        <div className="cq-wrap">

          <div className="cq-masthead">
            <div className="cq-kicker">AI Career Mastery · Study Quiz</div>
            <h1 className="cq-title">Your <span>Artifacts</span> Are<br />Your Credential</h1>
            <div className="cq-subtitle">50 Questions · 10 Sections</div>
            <button className="cq-study-btn" onClick={() => setShowStudy(s => !s)}>
              {showStudy ? '✕ Close Study Material' : '📖 Study Material'}
            </button>
          </div>

          {showStudy && (
            <div className="cq-study-panel">
              <h2>Your AI Credentials Don't Matter. Your Artifacts Do.</h2>

              <h2>Part 1 — The AI Labor Market</h2>
              <h3>The Core Thesis</h3>
              <ul>
                <li><strong>Artifacts &gt; resumes</strong> when getting hired in AI</li>
                <li>There are essentially <strong>infinite AI jobs</strong> right now — uncapped budgets</li>
                <li>Companies <strong>cannot find enough qualified people</strong> despite high candidate volume</li>
              </ul>
              <h3>Key Statistics</h3>
              <table>
                <thead><tr><th>Fact</th><th>Detail</th></tr></thead>
                <tbody>
                  <tr><td>Accenture workforce training</td><td>700,000 people on agentic AI</td></tr>
                  <tr><td>ManpowerGroup survey</td><td>39,000 employers across 41 countries</td></tr>
                  <tr><td>AI skills ranking</td><td>Single hardest capability to find on Earth (2026)</td></tr>
                  <tr><td>Demand-to-supply ratio</td><td><strong>3.2 to 1</strong> globally</td></tr>
                  <tr><td>Open AI positions</td><td>Over <strong>1.6 million</strong></td></tr>
                  <tr><td>Qualified candidates</td><td>Roughly <strong>518,000</strong></td></tr>
                  <tr><td>Average time to fill</td><td><strong>142 days</strong></td></tr>
                  <tr><td>Employers reporting difficulty</td><td><strong>72%</strong></td></tr>
                  <tr><td>Salary range</td><td><strong>$150K–$400K</strong></td></tr>
                </tbody>
              </table>
              <h3>Why Upskilling Programs Fail</h3>
              <ul>
                <li>Taught at the <strong>wrong altitude</strong>: "AI for Everyone" at top, deep ML at bottom, <strong>middle layer barely exists</strong></li>
                <li>Teaches <strong>tools</strong> when employers hire for <strong>judgment</strong></li>
                <li><strong>40%</strong> of AI training is video courses; <strong>23%</strong> of leaders say training doesn't translate</li>
                <li>Only <strong>26%</strong> of workers had received training on collaborating with AI (2024)</li>
              </ul>
              <h3>The "Taste" Critique</h3>
              <p>Paul Graham and Sam Altman say the magic word is <strong>"taste"</strong>. Matt Slotnick called this out: <em>"The taste thing works because it's nebulous, unassailable, and it feeds the ego."</em> The counter: taste is not a skill — but the <strong>seven concrete things underneath it</strong> are.</p>

              <hr />

              <h2>Part 2 — The K-Shaped Split</h2>
              <h3>Market One (contracting)</h3>
              <ul>
                <li>Traditional knowledge-work roles: generalist PMs, standard engineers, conventional analysts</li>
                <li>US job postings for automation-prone roles fell <strong>13%</strong> after ChatGPT launched</li>
                <li>HSBC weighing <strong>20,000 job cuts</strong>; Accenture cut <strong>~11,000 roles</strong> while investing $3B in AI</li>
              </ul>
              <h3>Market Two (expanding)</h3>
              <ul>
                <li>Roles that design, build, operate, manage, or extend AI systems</li>
                <li>Demand-to-supply: <strong>3.2 to 1</strong></li>
                <li>The gap is a <strong>skills gap</strong> — not credentials, not network</li>
              </ul>

              <hr />

              <h2>Part 3 — The Hiring Side Is Broken Too</h2>
              <h3>The "Fake Posting" Problem</h3>
              <ul>
                <li>Many AI job postings are <strong>market research disguised as hiring</strong></li>
                <li>Root cause: <strong>specification shortage</strong>, not talent shortage</li>
              </ul>
              <h3>Code of Conduct for AI Hiring</h3>
              <ul>
                <li><strong>Define the outcome</strong> before defining the role</li>
                <li><strong>Pick one track</strong>, not four</li>
                <li><strong>Publish evaluation criteria</strong> — measurable outcomes</li>
                <li><strong>Respect the time</strong> — if using interviews as discovery, pay for it</li>
              </ul>

              <hr />

              <h2>Part 4 — The Seven Skills</h2>
              <p>Pulled from real job postings at Anthropic, Robinhood, Upwork, Glean, Scale AI, and others. They are a <strong>progression</strong>, not a checklist. Market-two premium comes from having <strong>five or more</strong>, with depth in at least three.</p>

              <h3>Skill 1 — Specification Precision</h3>
              <p>Learning to talk to a machine that takes you literally. Vague spec = vague output at scale.</p>
              <p><em>"Make our customer support better"</em> vs. <em>"Build an agent that handles tier-one tickets: password resets, order status, returns. Escalate when sentiment drops below threshold or billing disputes over $500."</em></p>
              <p>Key sub-skills: define success criteria before starting, anticipate edge cases, distinguish <strong>hard constraints</strong> from <strong>soft preferences</strong>.</p>

              <h3>Skill 2 — Evaluation and Quality Judgment</h3>
              <p>The core decomposition of "taste" — most frequently cited skill across all postings.</p>
              <h4>Part A — Error Detection Under Fluency</h4>
              <p>AI failure mode: <strong>confidently, fluently, plausibly wrong</strong>. Resist the <strong>fluency heuristic</strong>.</p>
              <h4>Part B — Edge Case Detection</h4>
              <p>AI handles the common case beautifully, the edge case terribly.</p>
              <h4>Part C — Test Case Design</h4>
              <p>Anthropic's standard: <em>"A good task is one where two domain experts would independently reach the same pass/fail verdict."</em></p>
              <h4>Part D — Monitoring</h4>
              <p>Evaluation is <strong>continuous</strong>, not a one-time gate.</p>

              <h3>Skill 3 — Decomposition for Delegation</h3>
              <p>From using an AI tool to <strong>architecting AI systems</strong>. Agents have fundamentally different constraints: defined context windows, non-deterministic, need explicit success criteria per sub-task.</p>
              <p>Classification skill: reasoning task / retrieval task / judgment call (human checkpoint) / coordination task (orchestrator).</p>

              <h3>Skill 4 — Failure Pattern Recognition</h3>
              <table>
                <thead><tr><th>Pattern</th><th>Description</th></tr></thead>
                <tbody>
                  <tr><td><strong>Context Degradation</strong></td><td>Quality drops as sessions get long</td></tr>
                  <tr><td><strong>Specification Drift</strong></td><td>Agent gradually deviates from original intent</td></tr>
                  <tr><td><strong>Sycophantic Confirmation</strong></td><td>Agent agrees with wrong premises</td></tr>
                  <tr><td><strong>Tool Selection Errors</strong></td><td>Wrong tool picked due to overlapping descriptions</td></tr>
                  <tr><td><strong>Cascade Failure</strong></td><td>One agent's error propagates through the chain</td></tr>
                  <tr><td><strong>Silent Failure</strong></td><td>Plausible-looking output that is wrong, no error signal</td></tr>
                </tbody>
              </table>
              <p>Most dangerous: <strong>Silent Failure</strong>. Tool Selection Errors tested on CCA exam; tool description quality = highest-impact intervention.</p>

              <h3>Skill 5 — Trust Boundary and Security Design</h3>
              <p>Diagnostic question: <em>"What's the worst thing that happens if this is wrong, and can I undo it?"</em></p>
              <p>Four variables: <strong>cost of error</strong>, <strong>reversibility</strong>, <strong>frequency</strong>, <strong>verifiability</strong>.</p>
              <p>Security dimension: prompt injection, data exfiltration through tool calls, privilege escalation.</p>

              <h3>Skill 6 — Context Architecture</h3>
              <p>Anthropic's term: <strong>"Context engineering"</strong>. CCA exam weight: <strong>15%</strong>.</p>
              <p><strong>Persistent context:</strong> always loaded (standards, rules, brand voice). <strong>Per-session context:</strong> loaded when relevant (customer history, specific document).</p>
              <p>Irrelevant information doesn't just waste space — it <strong>actively degrades performance</strong>.</p>

              <h3>Skill 7 — Cost and Token Economics</h3>
              <p>Senior models roughly <strong>10–50x more per token</strong> than smaller models. Same workflow: <strong>$50/task</strong> (all senior) vs. <strong>$3/task</strong> (routed) at same quality.</p>
              <p>Sub-skills: inference cost structure, total cost modeling, model routing, batch vs. real-time tradeoffs.</p>

              <hr />

              <h2>Part 5 — Career Tracks</h2>
              <table>
                <thead><tr><th>Track</th><th>Salary Range</th></tr></thead>
                <tbody>
                  <tr><td>AI Systems Architect / Agentic Engineer</td><td>$150K–$320K</td></tr>
                  <tr><td>AI Product Manager</td><td>$133K–$437K+</td></tr>
                  <tr><td>Agent Operations / AI Reliability</td><td>$130K–$250K</td></tr>
                  <tr><td>AI-Augmented Domain Specialist</td><td>23–35% premium</td></tr>
                </tbody>
              </table>
              <p><strong>60%</strong> of AI PM hires don't come from CS backgrounds. Agent Ops is the least defined track with the <strong>most open running room</strong>.</p>

              <hr />

              <h2>Part 6 — Artifacts Over Credentials</h2>
              <p>The ecosystem is young enough that publishing real work gets noticed. In market two, "noticed" means <strong>inbound recruiter messages</strong>.</p>
              <h3>Two Universal Artifacts</h3>
              <ul>
                <li><strong>Failure Post-Mortem:</strong> build a system, watch it fail, analyze using named failure patterns, document the fix</li>
                <li><strong>Narrated Working Session:</strong> record yourself working with an AI system in real time, narrating decisions — the transparency IS the credential</li>
              </ul>

              <hr />

              <h2>Part 7 — Twelve-Week Learning Path</h2>
              <p><strong>Engineer/Architect:</strong> Anthropic Academy foundations (weeks 1–2), first build with Claude API (3–5), tool integration via MCP (6–7), Claude Code training (8–9), capstone multi-agent system (10–11), CCA exam (week 12).</p>
              <p><strong>PM/Ops/Domain:</strong> Same foundations (1–3), real domain application (4–6), spec writing (7–9), evaluation framework (10–12). Publish everything.</p>
              <p>CCA Foundations exam: <strong>$99</strong>. All Anthropic Academy prep courses: <strong>free</strong>.</p>

              <hr />

              <h2>Quick-Reference Cheat Sheet</h2>
              <table>
                <thead><tr><th>#</th><th>Skill</th><th>One-line summary</th></tr></thead>
                <tbody>
                  <tr><td>1</td><td>Specification Precision</td><td>Define what the agent must do precisely enough that it can't go wrong at scale</td></tr>
                  <tr><td>2</td><td>Evaluation &amp; Quality Judgment</td><td>Detect fluent errors, find edge cases, design test tasks, monitor continuously</td></tr>
                  <tr><td>3</td><td>Decomposition for Delegation</td><td>Break workflows into isolated agent steps with explicit human checkpoints</td></tr>
                  <tr><td>4</td><td>Failure Pattern Recognition</td><td>Know the six ways agent systems break before they break in production</td></tr>
                  <tr><td>5</td><td>Trust Boundary &amp; Security</td><td>Map cost-of-error x reversibility x frequency x verifiability</td></tr>
                  <tr><td>6</td><td>Context Architecture</td><td>Know what info goes in, when, in what form; manage finite window capacity</td></tr>
                  <tr><td>7</td><td>Cost &amp; Token Economics</td><td>Model per-task inference cost; route work to cheapest capable model</td></tr>
                </tbody>
              </table>
              <p><strong>The six failure patterns: CSSTCS</strong> — Context Degradation, Specification Drift, Sycophantic Confirmation, Tool Selection Errors, Cascade Failure, Silent Failure.</p>
            </div>
          )}

          {!done ? (
            <>
              <div className="cq-progress-rail">
                <div className="cq-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="cq-meta">
                <span>{idx + 1} of {total}</span>
                <span className="hi">✓ {score} correct</span>
              </div>

              <div className="cq-card" key={animKey}>
                <div className="cq-section">{q.section}</div>
                <div className="cq-question">{q.q}</div>

                <div className="cq-options">
                  {q.options.map((opt, i) => {
                    let cls = "cq-option";
                    if (answered) {
                      if (i === q.answer) cls += chosen === i ? " cq-correct" : " cq-reveal";
                      else if (i === chosen) cls += " cq-wrong";
                    }
                    return (
                      <button
                        key={i}
                        className={cls}
                        onClick={() => handlePick(i)}
                        disabled={answered}
                      >
                        <span className="cq-badge">{LABELS[i]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <div className={`cq-feedback ${chosen === q.answer ? "ok" : "bad"}`}>
                    {chosen === q.answer
                      ? "✓ Correct."
                      : `✗ Correct: ${q.options[q.answer]}`}
                  </div>
                )}

                {answered && (
                  <button className="cq-next" onClick={handleNext}>
                    {idx + 1 >= total ? "See Results →" : "Next Question →"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="cq-results">
              <div className="cq-res-title">Quiz Complete</div>
              <div className="cq-res-pct">{pct}%</div>
              <div className={`cq-verdict ${passed ? "pass" : "fail"}`}>
                {passed
                  ? "✓ Passed — framework understood."
                  : "✗ Below threshold — review missed questions and retry."}
              </div>

              <div className="cq-stats">
                <div className="cq-stat">
                  <span className="cq-stat-n">{score}</span>
                  <span className="cq-stat-l">Correct</span>
                </div>
                <div className="cq-stat">
                  <span className="cq-stat-n">{missed.length}</span>
                  <span className="cq-stat-l">Missed</span>
                </div>
                <div className="cq-stat">
                  <span className="cq-stat-n">{total}</span>
                  <span className="cq-stat-l">Total</span>
                </div>
              </div>

              {missed.length > 0 && (
                <>
                  <div className="cq-missed-heading">Missed Questions ({missed.length})</div>
                  {missed.map((m, i) => (
                    <div className="cq-missed-item" key={i}>
                      <div className="cq-missed-q">{m.q}</div>
                      <div className="cq-missed-wrong">✗ You chose: {m.options[m.chosen]}</div>
                      <div className="cq-missed-right">✓ Correct: {m.options[m.answer]}</div>
                    </div>
                  ))}
                </>
              )}

              <button className="cq-retry" onClick={handleRetry}>🔀 Shuffle & Retry</button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
