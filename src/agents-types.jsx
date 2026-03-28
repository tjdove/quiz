import { useState, useCallback } from "react";

// ─── Question Bank ────────────────────────────────────────────────────────────
const ALL_QUESTIONS = [

  // ━━━ 🗺️ The Four Architectures ━━━
  {
    section: "🗺️ The Four Architectures",
    q: "What single question does the framework say resolves ambiguity when someone proposes using agents?",
    options: [
      "How many agents do we need?",
      "Which framework should we use?",
      "What are you optimizing against?",
      "How long will this take to build?",
    ],
    answer: 2,
  },
  {
    section: "🗺️ The Four Architectures",
    q: "According to the framework, the four architectures are fundamentally defined by what?",
    options: [
      "The number of models running simultaneously",
      "Where verification happens and who does it",
      "The programming language and infrastructure used",
      "The size of the engineering team involved",
    ],
    answer: 1,
  },
  {
    section: "🗺️ The Four Architectures",
    q: "Which of these is NOT one of the four architectures described in the taxonomy?",
    options: [
      "Coding harnesses",
      "Dark factories",
      "Auto research",
      "Supervised fine-tuning pipelines",
    ],
    answer: 3,
  },
  {
    section: "🗺️ The Four Architectures",
    q: "The author compares saying 'let's use agents' to saying what?",
    options: [
      "'Let's use electricity' without naming the device",
      "'Let's use a vehicle' without knowing if it's a forklift, sedan, cargo ship, or bicycle",
      "'Let's build software' without agreeing on a language",
      "'Let's hire someone' without writing a job description",
    ],
    answer: 1,
  },
  {
    section: "🗺️ The Four Architectures",
    q: "What does the author call the 'cure for psychosis' when teams are confused about which agent architecture to use?",
    options: [
      "More prototyping and experimentation",
      "Bringing in outside consultants",
      "Taxonomy — naming the things and drawing the lines",
      "Slowing down AI adoption until the field matures",
    ],
    answer: 2,
  },
  {
    section: "🗺️ The Four Architectures",
    q: "The Architecture Diagnostic, Readiness Assessment, and Mismatch Detector are described as what?",
    options: [
      "The three stages of any agentic deployment",
      "Three prompts that make the taxonomy usable before your next planning cycle",
      "Three failure modes that teams must avoid",
      "The three components of a dark factory pipeline",
    ],
    answer: 1,
  },

  // ━━━ 💻 Coding Harnesses – Fundamentals ━━━
  {
    section: "💻 Coding Harnesses – Fundamentals",
    q: "Which tools are cited as examples of coding harnesses?",
    options: [
      "CrewAI, LangGraph, AutoGen, OpenAI Agents SDK",
      "TensorFlow, PyTorch, JAX, and Keras",
      "Claude Code, Cursor, Codex, Windsurf, Cline",
      "Okta, Jira, Slack, and Google Drive",
    ],
    answer: 2,
  },
  {
    section: "💻 Coding Harnesses – Fundamentals",
    q: "At the task level, coding harnesses share what design pattern?",
    options: [
      "Multi-agent role-based crews with shared memory",
      "A single powerful language model with a tool belt running in an agentic loop",
      "Planner-worker hierarchies with recursive sub-planners",
      "Deterministic pipelines with predefined handoff schemas",
    ],
    answer: 1,
  },
  {
    section: "💻 Coding Harnesses – Fundamentals",
    q: "What are the four steps of the agentic loop in a coding harness?",
    options: [
      "Spec, implement, test, deploy",
      "Prompt, generate, critique, merge",
      "Think, act, observe, repeat",
      "Plan, delegate, review, commit",
    ],
    answer: 2,
  },
  {
    section: "💻 Coding Harnesses – Fundamentals",
    q: "What tool belt capabilities does a task-level coding harness model typically have?",
    options: [
      "Spawn agents, allocate memory, call APIs, write reports",
      "Read file, write file, execute bash, search code",
      "Pull requests, code review, deployment, monitoring",
      "Train models, run evals, score outputs, rollback",
    ],
    answer: 1,
  },
  {
    section: "💻 Coding Harnesses – Fundamentals",
    q: "The governing principle for coding harnesses is 'decompose on boundaries of isolation.' What does this mean in practice?",
    options: [
      "Each agent should work in complete secrecy from the others",
      "Two agents on the same file will fight; two agents on independent modules will compound",
      "Decompose specs before writing any code",
      "Agents should only work on isolated test environments, never production",
    ],
    answer: 1,
  },
  {
    section: "💻 Coding Harnesses – Fundamentals",
    q: "What task-scale time range is typically covered by a single coding harness agent session?",
    options: [
      "A few seconds to a minute",
      "Twenty minutes to an hour",
      "One to three days",
      "One to three weeks",
    ],
    answer: 1,
  },

  // ━━━ 🔬 Coding Harnesses – Project Scale ━━━
  {
    section: "🔬 Coding Harnesses – Project Scale",
    q: "What happened when Cursor tried flat peer coordination with twenty equal-status agents?",
    options: [
      "Throughput scaled linearly — twenty agents produced twenty times the output",
      "Agents produced duplicate work and required extra merging overhead",
      "Effective throughput collapsed to two or three agents; agents became risk-averse and churned",
      "The agents self-organized into a hierarchy without human intervention",
    ],
    answer: 2,
  },
  {
    section: "🔬 Coding Harnesses – Project Scale",
    q: "What coordination pattern did Cursor find effective at project scale?",
    options: [
      "Flat peer coordination via shared files",
      "A single god-agent that spawns and kills sub-agents",
      "Planner-worker hierarchy with a judge agent evaluating each cycle",
      "Round-robin task assignment across identical agents",
    ],
    answer: 2,
  },
  {
    section: "🔬 Coding Harnesses – Project Scale",
    q: "In Cursor's project-scale research, which role was made recursive — able to spawn sub-instances of itself?",
    options: ["The worker agent", "The judge agent", "The planner agent", "The coordinator agent"],
    answer: 2,
  },
  {
    section: "🔬 Coding Harnesses – Project Scale",
    q: "What surprising finding did Cursor's research reveal about model selection?",
    options: [
      "The smallest model was the most cost-effective for all roles",
      "GPT-5.2 was a better planner than GPT-5.1-Codex, despite Codex being trained specifically for coding",
      "All models performed identically when given clear role definitions",
      "Codex was better at planning because it understood code architecture",
    ],
    answer: 1,
  },
  {
    section: "🔬 Coding Harnesses – Project Scale",
    q: "What was the scale of Cursor's migration of their own codebase from Solid to React?",
    options: [
      "50,000 lines added, 20,000 removed over one week",
      "266,000 lines added, 193,000 removed over three weeks",
      "1,000,000 lines added, 800,000 removed over three months",
      "10,000 lines added, 8,000 removed over two days",
    ],
    answer: 1,
  },
  {
    section: "🔬 Coding Harnesses – Project Scale",
    q: "Cursor's research demo pointed agents at building what from scratch?",
    options: ["A compiler", "A relational database", "A web browser", "An operating system kernel"],
    answer: 2,
  },

  // ━━━ 🏭 Dark Factories – Core Concepts ━━━
  {
    section: "🏭 Dark Factories – Core Concepts",
    q: "Where does the term 'dark factory' originate?",
    options: [
      "Military black-site operations where secrecy is paramount",
      "Manufacturing — factories run entirely by robots where lights aren't needed",
      "The 'dark web' analogy for unmonitored AI activity",
      "Dan Shapiro's reference to factories producing invisible digital goods",
    ],
    answer: 1,
  },
  {
    section: "🏭 Dark Factories – Core Concepts",
    q: "Dan Shapiro's five-level taxonomy of AI-assisted programming was borrowed from which framework?",
    options: [
      "The FAA's aircraft automation standards",
      "The ISO software quality model",
      "The NHTSA's self-driving vehicle framework",
      "The DARPA autonomy challenge levels",
    ],
    answer: 2,
  },
  {
    section: "🏭 Dark Factories – Core Concepts",
    q: "In Dan Shapiro's taxonomy, Level 0 is 'spicy autocomplete' and Level 5 is the dark factory. What does this imply?",
    options: [
      "Dark factories are the most dangerous and least recommended",
      "Dark factories represent the most autonomous end of AI-assisted programming",
      "Levels 1–4 are all equivalent to coding harnesses",
      "Most companies should aim for Level 3 as the sweet spot",
    ],
    answer: 1,
  },
  {
    section: "🏭 Dark Factories – Core Concepts",
    q: "What is the distinguishing feature of a *true* dark factory versus a very capable coding harness?",
    options: [
      "The dark factory uses more agents running in parallel",
      "The dark factory uses proprietary models not available via API",
      "The validation is fully automated — no human in the quality gate loop at all",
      "The dark factory produces formal proofs of correctness rather than tests",
    ],
    answer: 2,
  },
  {
    section: "🏭 Dark Factories – Core Concepts",
    q: "What is the governing principle of dark factories?",
    options: [
      "Code is the product; agents are the authors",
      "The specification is the product; code becomes disposable",
      "Automation is the product; engineers become obsolete",
      "Tests are the product; all other artifacts are secondary",
    ],
    answer: 1,
  },
  {
    section: "🏭 Dark Factories – Core Concepts",
    q: "Where does engineering skill relocate in a dark factory compared to traditional software development?",
    options: [
      "From writing code to reviewing code more carefully",
      "From individual contributors to a centralized architecture team",
      "From writing and reviewing code to writing specs precise enough for agents to converge without human intervention",
      "From implementation to infrastructure and DevOps",
    ],
    answer: 2,
  },

  // ━━━ 🔒 Dark Factories – StrongDM Case Study ━━━
  {
    section: "🔒 Dark Factories – StrongDM Case Study",
    q: "What was StrongDM's charter when they built their dark factory?",
    options: [
      "No human-written code; human review required only for security-critical paths",
      "No human-written code, no human-reviewed code",
      "Agents write code; humans write tests",
      "Agents write code; humans approve all pull requests",
    ],
    answer: 1,
  },
  {
    section: "🔒 Dark Factories – StrongDM Case Study",
    q: "How many engineers were on StrongDM's founding dark factory team?",
    options: ["One", "Three", "Seven", "Fifteen"],
    answer: 1,
  },
  {
    section: "🔒 Dark Factories – StrongDM Case Study",
    q: "What was StrongDM CTO Justin McCarthy's daily token-spend benchmark per human engineer?",
    options: ["$100", "$500", "$1,000", "$10,000"],
    answer: 2,
  },
  {
    section: "🔒 Dark Factories – StrongDM Case Study",
    q: "Why did StrongDM need to store test scenarios *outside* the codebase agents could access?",
    options: [
      "To meet regulatory compliance requirements for security software",
      "Because agents cheated — they hardcoded values that passed narrowly written tests without solving the real problem",
      "To keep the codebase smaller and faster to clone",
      "Because scenario files were too large to store in a standard repo",
    ],
    answer: 1,
  },
  {
    section: "🔒 Dark Factories – StrongDM Case Study",
    q: "What did StrongDM call their behavioral clones of third-party services like Okta and Jira?",
    options: [
      "Service Mirrors",
      "Synthetic API Replicas",
      "Digital Twin Universe",
      "Shadow Service Layer",
    ],
    answer: 2,
  },
  {
    section: "🔒 Dark Factories – StrongDM Case Study",
    q: "StrongDM's Digital Twin Universe binaries were written in which language?",
    options: ["Python", "TypeScript", "Rust", "Go"],
    answer: 3,
  },
  {
    section: "🔒 Dark Factories – StrongDM Case Study",
    q: "What does StrongDM's GitHub repo for Attractor (their core coding agent) contain?",
    options: [
      "Over one million lines of auto-generated production code",
      "Only three markdown files describing the spec in meticulous detail",
      "A comprehensive automated test suite with no implementation",
      "A configuration file pointing to a private repo",
    ],
    answer: 1,
  },
  {
    section: "🔒 Dark Factories – StrongDM Case Study",
    q: "What legal concern did Stanford Law's CodeX program raise about StrongDM's approach?",
    options: [
      "Auto-generated code may be uncopyrightable",
      "Existing legal frameworks assume someone, somewhere, looked at the work — here, nobody did",
      "Using AI for security software may violate export control laws",
      "Open-source licenses may not apply to AI-generated code",
    ],
    answer: 1,
  },

  // ━━━ 📊 Auto Research – Core Concepts ━━━
  {
    section: "📊 Auto Research – Core Concepts",
    q: "What is the simplest diagnostic question to distinguish auto research from the other architectures?",
    options: [
      "Is this a new codebase or an existing one?",
      "Is your problem software-shaped or metric-shaped?",
      "Is the team large enough to review the output?",
      "Is the domain verifiable by a human expert?",
    ],
    answer: 1,
  },
  {
    section: "📊 Auto Research – Core Concepts",
    q: "Auto research is described as 'gradient descent scaled across problem spaces.' What does the agent produce?",
    options: [
      "New software built from specifications",
      "Optimized pipeline schemas for orchestration",
      "Optimization — a better version of whatever you pointed it at",
      "Documentation and behavioral scenarios for future agents",
    ],
    answer: 2,
  },
  {
    section: "📊 Auto Research – Core Concepts",
    q: "What is the governing principle of auto research?",
    options: [
      "Specification plus validation",
      "Metric plus guardrail",
      "Parallelism plus isolation",
      "Decomposition plus hierarchy",
    ],
    answer: 1,
  },
  {
    section: "📊 Auto Research – Core Concepts",
    q: "Why does auto research need *both* a benchmark *and* a test suite?",
    options: [
      "The benchmark measures speed while the test suite measures correctness",
      "Without tests, the agent 'optimizes' by deleting functionality — faster because it does less",
      "The benchmark is for humans and the test suite is for agents",
      "Regulators require dual validation for autonomous optimization systems",
    ],
    answer: 1,
  },
  {
    section: "📊 Auto Research – Core Concepts",
    q: "What happens if you point auto research at building new software from scratch?",
    options: [
      "It defaults to coding harness behavior automatically",
      "It produces a specification instead of code",
      "There's no metric to measure, no gradient to follow — you're just wandering",
      "It runs orchestration framework patterns instead",
    ],
    answer: 2,
  },
  {
    section: "📊 Auto Research – Core Concepts",
    q: "According to Karpathy, which of the following is a perfect fit for auto research?",
    options: [
      "Writing CUDA kernels for faster inference",
      "Designing a compelling user interface",
      "Producing a well-structured technical blog post",
      "Building a new microservice from scratch",
    ],
    answer: 0,
  },

  // ━━━ ⚗️ Auto Research – Case Studies ━━━
  {
    section: "⚗️ Auto Research – Case Studies",
    q: "Karpathy's canonical auto research implementation was approximately how long?",
    options: ["100 lines of Python", "630 lines of Python", "3,000 lines of Python", "10,000 lines of Python"],
    answer: 1,
  },
  {
    section: "⚗️ Auto Research – Case Studies",
    q: "In Karpathy's nanochat project, what did the auto research agent discover that he'd missed?",
    options: [
      "His learning rate schedule was incorrect for the dataset size",
      "Miscalibrated weight decay on value embeddings and insufficiently tuned Adam betas",
      "His tokenizer had a critical bug causing vocabulary leakage",
      "His batch size was too large for the GPU memory configuration",
    ],
    answer: 1,
  },
  {
    section: "⚗️ Auto Research – Case Studies",
    q: "What did Tobi Lütke give the auto research agent when running it on Shopify's Liquid codebase?",
    options: [
      "A full specification of the desired improvements",
      "A benchmark script and 974 unit tests",
      "A list of 50 known performance bottlenecks to investigate",
      "A Docker environment and unlimited cloud compute budget",
    ],
    answer: 1,
  },
  {
    section: "⚗️ Auto Research – Case Studies",
    q: "What performance results did auto research achieve on Shopify's Liquid over two days?",
    options: [
      "10% faster, 15% fewer allocations, 2 test failures",
      "30% faster, 40% fewer allocations, 0 test failures",
      "53% faster, 61% fewer object allocations, 0 test failures",
      "200% faster, 90% fewer allocations, 12 test failures",
    ],
    answer: 2,
  },
  {
    section: "⚗️ Auto Research – Case Studies",
    q: "One key optimization the Liquid auto research agent found was replacing the StringScanner tokenizer with what?",
    options: [
      "A Ragel-generated state machine parser",
      "String#byteindex — single-byte searching roughly 40% faster",
      "A pre-compiled C extension via FFI",
      "A memoized regex with frozen pattern objects",
    ],
    answer: 1,
  },
  {
    section: "⚗️ Auto Research – Case Studies",
    q: "How many experiments did the auto research agent run on Liquid, and how many commits did it produce?",
    options: [
      "20 experiments, 15 commits",
      "120 experiments, 93 commits",
      "500 experiments, 200 commits",
      "50 experiments, 50 commits",
    ],
    answer: 1,
  },
  {
    section: "⚗️ Auto Research – Case Studies",
    q: "OpenAI's 'North Star' as described by Jakub Pachocki targets which domains by 2028?",
    options: [
      "Software engineering, DevOps, QA, and security",
      "Math, physics, biology, chemistry, and potentially economics and policy",
      "Natural language, vision, robotics, and code",
      "Legal research, medical diagnosis, financial modeling, and policy analysis",
    ],
    answer: 1,
  },

  // ━━━ 🔗 Orchestration Frameworks ━━━
  {
    section: "🔗 Orchestration Frameworks",
    q: "What problem did DocuSign face that prompted them to build a multi-agent orchestration system?",
    options: [
      "Their codebase needed a large-scale migration to a new framework",
      "Their models needed performance optimization against a benchmark",
      "Sales reps were spending hours manually researching prospects before drafting outreach emails",
      "Their release pipeline was too slow and required automated code review",
    ],
    answer: 2,
  },
  {
    section: "🔗 Orchestration Frameworks",
    q: "What framework did DocuSign use to build their five-agent outreach system?",
    options: ["LangGraph", "AutoGen", "OpenAI Agents SDK", "CrewAI Flows"],
    answer: 3,
  },
  {
    section: "🔗 Orchestration Frameworks",
    q: "What are the five agent roles in DocuSign's outreach pipeline?",
    options: [
      "Planner, Researcher, Writer, Editor, Publisher",
      "Identifier, Researcher, Composer, Validator, Orchestrator",
      "Scout, Analyst, Drafter, Reviewer, Sender",
      "Lead, Data, Content, Quality, Delivery",
    ],
    answer: 1,
  },
  {
    section: "🔗 Orchestration Frameworks",
    q: "The governing principle for orchestration frameworks is 'design the handoffs first.' What's the consequence if you don't?",
    options: [
      "The pipeline runs slowly due to retries and schema mismatches",
      "The second agent processes garbage and returns confident-sounding garbage",
      "The orchestrator rejects mismatched inputs with a loud error",
      "Agents default to asking the human for the correct input format",
    ],
    answer: 1,
  },
  {
    section: "🔗 Orchestration Frameworks",
    q: "What is CrewAI's GitHub star count and developer certification count as mentioned in the transcript?",
    options: [
      "5,000 stars, 10,000 certified developers",
      "45,000 stars, 100,000 certified developers",
      "200,000 stars, 500,000 certified developers",
      "10,000 stars, 50,000 certified developers",
    ],
    answer: 1,
  },
  {
    section: "🔗 Orchestration Frameworks",
    q: "What is the core value proposition of orchestration frameworks like CrewAI, LangGraph, and AutoGen?",
    options: [
      "Intelligence — they improve the reasoning quality of each model call",
      "Speed — they parallelize model calls to reduce latency",
      "Coordination — sequencing LLM calls, routing between them, maintaining state, and handling failures",
      "Security — they enforce access control between agent roles",
    ],
    answer: 2,
  },
  {
    section: "🔗 Orchestration Frameworks",
    q: "What is the key structural difference between Cursor's multi-agent coding system and DocuSign's orchestration system?",
    options: [
      "Cursor uses more agents than DocuSign",
      "Cursor coordinates agents around deep reasoning on shared code; DocuSign routes specialized steps passing structured outputs",
      "DocuSign's agents are stateless; Cursor's agents maintain persistent memory",
      "Cursor's system has a human in the loop; DocuSign's is fully autonomous",
    ],
    answer: 1,
  },

  // ━━━ ⚠️ Mismatches & Failure Modes ━━━
  {
    section: "⚠️ Mismatches & Failure Modes",
    q: "What is the shared root cause the author identifies behind every costly agent architecture mistake?",
    options: [
      "Teams underestimate compute costs",
      "Models are less capable than vendors claim",
      "The decision-maker couldn't distinguish the four architectures and pattern-matched on the word 'agents'",
      "Stakeholders demand results too quickly for proper architecture design",
    ],
    answer: 2,
  },
  {
    section: "⚠️ Mismatches & Failure Modes",
    q: "Why can't a dark factory pattern work for producing novels?",
    options: [
      "LLMs aren't capable of producing long-form coherent narratives",
      "Novel production requires real-time collaboration that agents can't provide",
      "Content quality is subjective — there's no holdout set to validate whether chapter seven works",
      "Copyright law prevents AI systems from producing commercially viable fiction",
    ],
    answer: 2,
  },
  {
    section: "⚠️ Mismatches & Failure Modes",
    q: "A team builds a CrewAI pipeline for code generation when they actually needed Claude Code. What went wrong?",
    options: [
      "They over-engineered a workflow problem as a coding problem",
      "They spent months on orchestration overhead for a problem requiring one agent with good tools",
      "They under-invested in model quality for their use case",
      "They used the wrong evaluation metric for their pipeline",
    ],
    answer: 1,
  },
  {
    section: "⚠️ Mismatches & Failure Modes",
    q: "A PM roadmaps 'autonomous research capabilities' and engineers build an auto research loop in a domain with no computable metric. What happens?",
    options: [
      "The loop defaults to a dark factory pattern and produces software instead",
      "The loop succeeds but takes much longer than expected",
      "The loop runs experiments that can't be scored and produces nothing useful",
      "The loop asks the human to provide a metric before continuing",
    ],
    answer: 2,
  },
  {
    section: "⚠️ Mismatches & Failure Modes",
    q: "According to Karpathy, why is humor stuck while frontier models improve rapidly on coding and math?",
    options: [
      "Humor requires embodiment and lived human experience models can't access",
      "Training data for humor is too sparse and culturally variable",
      "Humor lives outside the RL loop — it's not verifiable, so it's not being optimized",
      "Humor requires theory of mind which current architectures lack",
    ],
    answer: 2,
  },
  {
    section: "⚠️ Mismatches & Failure Modes",
    q: "The Readiness Assessment pressure-tests which precondition for a dark factory?",
    options: [
      "Whether the team has sufficient compute budget",
      "Whether the team can produce specs precise enough for agents to converge without human intervention",
      "Whether the codebase is large enough to justify automation",
      "Whether the legal team has signed off on autonomous code generation",
    ],
    answer: 1,
  },

  // ━━━ 🧠 Karpathy & Human Factors ━━━
  {
    section: "🧠 Karpathy & Human Factors",
    q: "What does Karpathy mean by 'AI psychosis'?",
    options: [
      "The fear that AI agents will replace all software engineers",
      "The sense that capability is expanding faster than anyone can map it, and you're always the bottleneck",
      "The mental health risks of relying on AI for all creative decisions",
      "The confusion caused by conflicting claims from AI vendors",
    ],
    answer: 1,
  },
  {
    section: "🧠 Karpathy & Human Factors",
    q: "When Karpathy describes directing multiple concurrent Codex agents, what does he emphasize about the task decomposition?",
    options: [
      "Each agent should receive the same instructions for redundancy",
      "Agents should be able to share files to collaborate more efficiently",
      "New functionality delegated to each agent must not interfere with what other agents are working on",
      "A master agent should coordinate all sub-agents rather than the human",
    ],
    answer: 2,
  },
  {
    section: "🧠 Karpathy & Human Factors",
    q: "In a coding harness workflow, what human skill replaces traditional coding as the primary bottleneck?",
    options: [
      "System architecture and database design",
      "Triage — knowing which output to scrutinize and which to accept",
      "Prompt engineering and model fine-tuning",
      "Infrastructure management and deployment operations",
    ],
    answer: 1,
  },
  {
    section: "🧠 Karpathy & Human Factors",
    q: "Karpathy says he hasn't typed a line of code since when?",
    options: ["October", "November", "December", "January"],
    answer: 2,
  },
  {
    section: "🧠 Karpathy & Human Factors",
    q: "What does Karpathy say he does all day on the No Priors podcast regarding Claude Code?",
    options: [
      "Writing detailed specifications for agents to implement",
      "Running Claude Code sessions for sixteen hours a day, directing single-agent sessions",
      "Reviewing every line of agent-generated code before merging",
      "Training custom models on his codebase for better performance",
    ],
    answer: 1,
  },
  {
    section: "🧠 Karpathy & Human Factors",
    q: "Karpathy frames the human skill needed for coding harnesses as developing what?",
    options: [
      "Deep knowledge of model internals and failure modes",
      "'Muscle memory' for a new kind of work — a learnable but necessary skill",
      "Formal verification methods for AI-generated code",
      "Statistical intuition for when to trust model output",
    ],
    answer: 1,
  },
];

// ─── Fisher-Yates Shuffle ─────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LABELS = ["A", "B", "C", "D"];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AgentTypesQuiz() {
  const [deck, setDeck] = useState(() => shuffle(ALL_QUESTIONS));
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState([]);
  const [done, setDone] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const q = deck[idx];
  const total = deck.length;
  const answered = chosen !== null;
  const progress = ((idx + (answered ? 1 : 0)) / total) * 100;

  const handlePick = useCallback(
    (i) => {
      if (answered) return;
      setChosen(i);
      if (i === q.answer) {
        setScore((s) => s + 1);
      } else {
        setMissed((m) => [...m, { ...q, chosen: i }]);
      }
    },
    [answered, q]
  );

  const handleNext = useCallback(() => {
    if (idx + 1 >= total) {
      setDone(true);
    } else {
      setIdx((n) => n + 1);
      setChosen(null);
      setAnimKey((k) => k + 1);
    }
  }, [idx, total]);

  const handleRetry = useCallback(() => {
    setDeck(shuffle(ALL_QUESTIONS));
    setIdx(0);
    setChosen(null);
    setScore(0);
    setMissed([]);
    setDone(false);
    setAnimKey((k) => k + 1);
  }, []);

  const pct = done ? Math.round((score / total) * 100) : 0;
  const passed = pct >= 75;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Nunito:wght@400;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .aq-root {
          min-height: 100vh;
          background: radial-gradient(ellipse at 60% 10%, #1f0010 0%, #0e0008 45%, #000 100%);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 36px 16px 80px;
          font-family: 'Nunito', sans-serif;
          color: #f0dde8;
        }

        .aq-wrap {
          width: 100%;
          max-width: 640px;
        }

        /* ── Masthead ── */
        .aq-masthead {
          text-align: center;
          margin-bottom: 30px;
        }
        .aq-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #d4246a;
          margin-bottom: 6px;
        }
        .aq-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 6vw, 38px);
          font-weight: 900;
          color: #f8eef3;
          line-height: 1.15;
        }
        .aq-title em {
          color: #d4246a;
          font-style: italic;
        }

        /* ── Progress ── */
        .aq-progress-track {
          height: 5px;
          background: #1e0015;
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 10px;
          border: 1px solid #3a0028;
        }
        .aq-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #8b0040, #d4246a, #ff6aaa);
          border-radius: 99px;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px #d4246a88;
        }
        .aq-meta {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 700;
          color: #8a4a6a;
          margin-bottom: 22px;
          letter-spacing: 0.3px;
        }
        .aq-meta .aq-correct { color: #ff6aaa; }

        /* ── Card ── */
        .aq-card {
          background: linear-gradient(160deg, #170010 0%, #1e0018 100%);
          border: 1px solid #3a0028;
          border-radius: 18px;
          padding: 30px;
          box-shadow:
            0 2px 0 #3a0028,
            0 12px 48px #00000077,
            inset 0 1px 0 #d4246a22;
          animation: aqFadeUp 0.32s ease both;
        }

        @keyframes aqFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .aq-section-tag {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d4246a;
          background: #d4246a18;
          border: 1px solid #d4246a33;
          border-radius: 99px;
          padding: 3px 12px;
          margin-bottom: 16px;
        }

        .aq-question {
          font-family: 'Playfair Display', serif;
          font-size: clamp(16px, 3.8vw, 21px);
          font-weight: 700;
          line-height: 1.55;
          color: #f0dde8;
          margin-bottom: 26px;
        }

        /* ── Options ── */
        .aq-options {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .aq-option {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #110009;
          border: 1.5px solid #2e0020;
          border-radius: 11px;
          padding: 12px 14px;
          cursor: pointer;
          font-family: 'Nunito', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #d8b8cc;
          text-align: left;
          transition:
            transform 0.16s ease,
            border-color 0.16s ease,
            background 0.16s ease,
            box-shadow 0.16s ease;
          line-height: 1.45;
        }

        .aq-option:not(:disabled):hover {
          transform: translateX(3px);
          border-color: #d4246a;
          background: #200015;
          box-shadow: 0 0 14px #d4246a1a, inset 0 0 0 1px #d4246a22;
        }

        .aq-option:disabled { cursor: default; }

        .aq-option.aq-correct {
          background: #002210;
          border-color: #22cc66;
          color: #aaffe0;
          box-shadow: 0 0 18px #22cc6633;
        }
        .aq-option.aq-wrong {
          background: #200005;
          border-color: #cc2244;
          color: #ffaabb;
          box-shadow: 0 0 18px #cc224433;
        }
        .aq-option.aq-reveal {
          background: #00220f;
          border-color: #44dd88;
          color: #bbffdd;
          animation: aqPulseReveal 0.6s ease;
        }

        @keyframes aqPulseReveal {
          0%   { box-shadow: 0 0 0 #44dd8800; }
          40%  { box-shadow: 0 0 22px #44dd8877; }
          100% { box-shadow: 0 0 12px #44dd8833; }
        }

        .aq-badge {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 26px;
          height: 26px;
          border-radius: 7px;
          background: #1e0015;
          border: 1px solid #3a0028;
          font-size: 11px;
          font-weight: 900;
          color: #d4246a;
          transition: background 0.16s, border-color 0.16s, color 0.16s;
        }

        .aq-option.aq-correct .aq-badge,
        .aq-option.aq-reveal .aq-badge {
          background: #003318;
          border-color: #22cc66;
          color: #55ffaa;
        }
        .aq-option.aq-wrong .aq-badge {
          background: #220008;
          border-color: #cc2244;
          color: #ff6688;
        }

        /* ── Feedback ── */
        .aq-feedback {
          margin-top: 16px;
          padding: 10px 14px;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 700;
          animation: aqFadeUp 0.2s ease;
        }
        .aq-feedback.ok {
          background: #002210;
          border: 1px solid #22cc6644;
          color: #66ffbb;
        }
        .aq-feedback.bad {
          background: #200005;
          border: 1px solid #cc224444;
          color: #ff99aa;
        }

        /* ── Next button ── */
        .aq-next {
          margin-top: 20px;
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #8b0040 0%, #d4246a 60%, #ff6aaa 100%);
          border: none;
          border-radius: 11px;
          font-family: 'Nunito', sans-serif;
          font-size: 15px;
          font-weight: 900;
          color: #fff;
          cursor: pointer;
          letter-spacing: 0.4px;
          box-shadow: 0 4px 24px #d4246a44;
          transition: transform 0.14s ease, box-shadow 0.14s ease;
          animation: aqFadeUp 0.22s ease;
        }
        .aq-next:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px #d4246a77;
        }
        .aq-next:active { transform: translateY(0); }

        /* ── Results ── */
        .aq-results {
          background: linear-gradient(160deg, #170010 0%, #1e0018 100%);
          border: 1px solid #3a0028;
          border-radius: 18px;
          padding: 36px 30px;
          box-shadow: 0 12px 48px #00000077, inset 0 1px 0 #d4246a22;
          animation: aqFadeUp 0.4s ease;
        }

        .aq-res-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 5vw, 28px);
          font-weight: 900;
          text-align: center;
          color: #f0dde8;
          margin-bottom: 4px;
        }

        .aq-res-pct {
          font-family: 'Playfair Display', serif;
          font-size: clamp(64px, 18vw, 96px);
          font-weight: 900;
          text-align: center;
          color: #d4246a;
          line-height: 1;
          text-shadow: 0 0 60px #d4246a55;
          margin: 8px 0 14px;
        }

        .aq-verdict {
          text-align: center;
          font-size: 14px;
          font-weight: 800;
          padding: 8px 20px;
          border-radius: 99px;
          margin-bottom: 24px;
        }
        .aq-verdict.pass {
          background: #002210;
          border: 1px solid #22cc6644;
          color: #66ffbb;
        }
        .aq-verdict.fail {
          background: #200005;
          border: 1px solid #cc224444;
          color: #ff99aa;
        }

        .aq-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 28px;
        }
        .aq-stat {
          background: #0e0009;
          border: 1px solid #2e0020;
          border-radius: 12px;
          padding: 16px 10px;
          text-align: center;
        }
        .aq-stat-n {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 900;
          color: #d4246a;
          display: block;
        }
        .aq-stat-l {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #8a4a6a;
          display: block;
          margin-top: 2px;
        }

        .aq-missed-heading {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #d4246a;
          margin-bottom: 14px;
          padding-top: 20px;
          border-top: 1px solid #2e0020;
        }

        .aq-missed-item {
          background: #0e0009;
          border: 1px solid #2e0020;
          border-radius: 11px;
          padding: 14px;
          margin-bottom: 10px;
        }
        .aq-missed-q {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-weight: 700;
          color: #d8b8cc;
          line-height: 1.45;
          margin-bottom: 8px;
        }
        .aq-missed-wrong {
          font-size: 12px;
          font-weight: 700;
          color: #ff8899;
          margin-bottom: 4px;
        }
        .aq-missed-right {
          font-size: 12px;
          font-weight: 700;
          color: #66ffbb;
        }

        .aq-retry {
          margin-top: 26px;
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #8b0040 0%, #d4246a 60%, #ff6aaa 100%);
          border: none;
          border-radius: 11px;
          font-family: 'Nunito', sans-serif;
          font-size: 16px;
          font-weight: 900;
          color: #fff;
          cursor: pointer;
          letter-spacing: 0.4px;
          box-shadow: 0 4px 28px #d4246a55;
          transition: transform 0.14s ease, box-shadow 0.14s ease;
        }
        .aq-retry:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 36px #d4246a88;
        }

        @media (max-width: 460px) {
          .aq-card, .aq-results { padding: 20px 16px; }
          .aq-stats { grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .aq-stat-n { font-size: 26px; }
        }
      `}</style>

      <div className="aq-root">
        <div className="aq-wrap">

          {/* Masthead */}
          <div className="aq-masthead">
            <div className="aq-eyebrow">Agent Architecture · Study Quiz</div>
            <h1 className="aq-title">Types of <em>Agents</em></h1>
          </div>

          {!done ? (
            <>
              {/* Progress */}
              <div className="aq-progress-track">
                <div className="aq-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="aq-meta">
                <span>{idx + 1} of {total}</span>
                <span className="aq-correct">✓ {score} correct</span>
              </div>

              {/* Question Card */}
              <div className="aq-card" key={animKey}>
                <div className="aq-section-tag">{q.section}</div>
                <div className="aq-question">{q.q}</div>

                <div className="aq-options">
                  {q.options.map((opt, i) => {
                    let cls = "aq-option";
                    if (answered) {
                      if (i === q.answer) cls += chosen === i ? " aq-correct" : " aq-reveal";
                      else if (i === chosen) cls += " aq-wrong";
                    }
                    return (
                      <button
                        key={i}
                        className={cls}
                        onClick={() => handlePick(i)}
                        disabled={answered}
                      >
                        <span className="aq-badge">{LABELS[i]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <div className={`aq-feedback ${chosen === q.answer ? "ok" : "bad"}`}>
                    {chosen === q.answer
                      ? "✓ Correct — you know this one."
                      : `✗ Correct answer: ${q.options[q.answer]}`}
                  </div>
                )}

                {answered && (
                  <button className="aq-next" onClick={handleNext}>
                    {idx + 1 >= total ? "View Results →" : "Next Question →"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="aq-results">
              <div className="aq-res-title">Quiz Complete</div>
              <div className="aq-res-pct">{pct}%</div>
              <div className={`aq-verdict ${passed ? "pass" : "fail"}`}>
                {passed
                  ? "✓ Passed — architecture taxonomy understood."
                  : "✗ Not yet — review missed questions and retry."}
              </div>

              <div className="aq-stats">
                <div className="aq-stat">
                  <span className="aq-stat-n">{score}</span>
                  <span className="aq-stat-l">Correct</span>
                </div>
                <div className="aq-stat">
                  <span className="aq-stat-n">{missed.length}</span>
                  <span className="aq-stat-l">Missed</span>
                </div>
                <div className="aq-stat">
                  <span className="aq-stat-n">{total}</span>
                  <span className="aq-stat-l">Total</span>
                </div>
              </div>

              {missed.length > 0 && (
                <>
                  <div className="aq-missed-heading">Review: {missed.length} Missed</div>
                  {missed.map((m, i) => (
                    <div className="aq-missed-item" key={i}>
                      <div className="aq-missed-q">{m.q}</div>
                      <div className="aq-missed-wrong">✗ You chose: {m.options[m.chosen]}</div>
                      <div className="aq-missed-right">✓ Correct: {m.options[m.answer]}</div>
                    </div>
                  ))}
                </>
              )}

              <button className="aq-retry" onClick={handleRetry}>🔀 Shuffle & Retry</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
