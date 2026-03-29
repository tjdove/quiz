import { useState, useCallback } from "react";

const ALL_QUESTIONS = [
  // ━━━ 🧠 Core Thesis & The Primitive ━━━
  {
    section: "🧠 Core Thesis & The Primitive",
    q: "What does the article identify as the #1 mistake people are about to make with Dispatch?",
    options: [
      "Setting up complex multi-agent workflows before mastering simple ones",
      "Pointing it at simulated work — triage reports and briefings that add a document to read rather than removing a task",
      "Leaving their computers on overnight, creating security exposure",
      "Using computer use before setting up proper MCP connectors",
    ],
    answer: 1,
  },
  {
    section: "🧠 Core Thesis & The Primitive",
    q: "What is the article's organizing question for deciding what to delegate to Dispatch?",
    options: [
      "Is this task repeatable enough to automate?",
      "Does the agent have the connectors needed to complete this?",
      "Does work land on your desk or leave it?",
      "Is the output verifiable without domain expertise?",
    ],
    answer: 2,
  },
  {
    section: "🧠 Core Thesis & The Primitive",
    q: "How does the article distinguish asynchronous AI labor from chatbots and copilots?",
    options: [
      "Chatbots and copilots require API access; asynchronous AI labor uses computer use",
      "Chatbots are impressive, copilots improve throughput, but asynchronous AI labor is a different category — not a tool, but labor",
      "Chatbots and copilots are free; asynchronous AI labor requires a paid subscription",
      "Chatbots process text; copilots write code; asynchronous AI labor handles both simultaneously",
    ],
    answer: 1,
  },
  {
    section: "🧠 Core Thesis & The Primitive",
    q: "The author argues that cloud scheduled tasks, Dispatch, and computer use were covered as three separate launches. What is the article's actual claim about them?",
    options: [
      "They are three competing approaches to the same problem that users must choose between",
      "They are layers of a single architecture that form the first fully functional asynchronous agent platform available without self-hosting",
      "They are sequential releases, each replacing the previous one",
      "They are independent tools that happen to share the same model",
    ],
    answer: 1,
  },
  {
    section: "🧠 Core Thesis & The Primitive",
    q: "What test does the article say is the only one worth running when evaluating whether an agent task is worth building?",
    options: [
      "Can the agent complete it without any human intervention?",
      "Does it run faster than a human would?",
      "When the agent finishes, is your plate lighter or heavier?",
      "Does it save more than one hour of work per week?",
    ],
    answer: 2,
  },
  {
    section: "🧠 Core Thesis & The Primitive",
    q: "The article says if the output is a document you now have to read or a draft you now have to edit, what has happened?",
    options: [
      "The agent succeeded at a preliminary step and further delegation is needed",
      "Your plate got heavier and you just paid for a fancier to-do list",
      "The task was too complex and needs to be decomposed further",
      "The connector configuration needs to be updated",
    ],
    answer: 1,
  },

  // ━━━ 📺 The Prime Video Analogy ━━━
  {
    section: "📺 The Prime Video Analogy",
    q: "What role did the author hold at Amazon Prime Video?",
    options: [
      "VP of Engineering",
      "Head of Product for Amazon Prime Video",
      "Chief Data Scientist",
      "Director of AI Research",
    ],
    answer: 1,
  },
  {
    section: "📺 The Prime Video Analogy",
    q: "How many viewers did the Prime Video ML personalization system serve?",
    options: ["50 million", "100 million", "200 million", "500 million"],
    answer: 2,
  },
  {
    section: "📺 The Prime Video Analogy",
    q: "What did the Prime Video 'overnight bake' concept involve?",
    options: [
      "Engineers staying late to manually review recommendations before publishing",
      "Models training overnight so every user's home screen was rebuilt with fresh predictions by morning",
      "A/B tests running overnight to select winning content arrangements",
      "Compliance reviews running overnight before content went live in each market",
    ],
    answer: 1,
  },
  {
    section: "📺 The Prime Video Analogy",
    q: "What does the author say was the hardest part of the Prime Video job — and why it applies to Dispatch?",
    options: [
      "Training the models accurately enough to compete with Netflix",
      "Getting licensing agreements across global markets",
      "Convincing people that a system they couldn't watch was actually working",
      "Scaling infrastructure to handle peak streaming demand",
    ],
    answer: 2,
  },
  {
    section: "📺 The Prime Video Analogy",
    q: "The Prime Video engineering team's approach — set logic, set guardrails, set monitoring, then go home — maps to which Dispatch behavior?",
    options: [
      "Running computer use on internal dashboards",
      "Configuring MCP connectors once for all three surfaces",
      "The management pattern: assign, leave, return to results — trusting the process without hovering",
      "Using the Open Loop Audit before building automation",
    ],
    answer: 2,
  },

  // ━━━ ☁️ Cloud Scheduled Tasks ━━━
  {
    section: "☁️ Cloud Scheduled Tasks",
    q: "What is the minimum scheduling interval available through the Cowork interface for cloud tasks?",
    options: ["5 minutes", "15 minutes", "30 minutes", "One hour"],
    answer: 3,
  },
  {
    section: "☁️ Cloud Scheduled Tasks",
    q: "How does the article describe the mental model for cloud scheduled tasks?",
    options: [
      "A project manager that assigns work to available agents",
      "Cron for knowledge work — the prompt is the program, the schedule is the trigger, the MCP connectors are the I/O",
      "A serverless function that triggers on events from connected tools",
      "A recurring meeting invite that automatically generates agenda items",
    ],
    answer: 1,
  },
  {
    section: "☁️ Cloud Scheduled Tasks",
    q: "What is the Zweben production example used to illustrate cloud scheduled tasks?",
    options: [
      "A daily news briefing that summarizes AI developments overnight",
      "A Go/Python twin library used internally at Anthropic, maintained entirely by a scheduled Claude job with no human in the loop",
      "An automated PR review system that runs every night at midnight",
      "A competitive intelligence report generated weekly from public sources",
    ],
    answer: 1,
  },
  {
    section: "☁️ Cloud Scheduled Tasks",
    q: "What happens to MCP connectors you've already set up in claude.ai when you use cloud scheduled tasks?",
    options: [
      "They need to be reconfigured separately for cloud task access",
      "Only API-based connectors carry over; computer use connectors must be re-authorized",
      "They carry over automatically — you connect them to any MCP server you've already wired, and don't configure them twice",
      "They expire after 30 days and must be re-authenticated",
    ],
    answer: 2,
  },
  {
    section: "☁️ Cloud Scheduled Tasks",
    q: "Why does the article say cloud scheduled tasks are designed for durable automation, not tight polling loops?",
    options: [
      "Tight polling would consume too many tokens and exceed monthly limits",
      "The minimum interval of one hour makes it inappropriate for tasks requiring real-time responses",
      "Anthropic's infrastructure cannot handle more than 24 tasks per day per user",
      "MCP connectors are too slow for sub-minute polling frequencies",
    ],
    answer: 1,
  },
  {
    section: "☁️ Cloud Scheduled Tasks",
    q: "Which of these is given as a practical example of a cloud scheduled task for a non-developer?",
    options: [
      "Running automated unit tests on a GitHub repository",
      "Monitoring airline prices hourly on a specific route and alerting when the fare drops below a threshold",
      "Generating daily standup reports from Linear tickets",
      "Refactoring code modules according to style guidelines",
    ],
    answer: 1,
  },

  // ━━━ 📱 Dispatch & The Orchestration Layer ━━━
  {
    section: "📱 Dispatch & The Orchestration Layer",
    q: "The article says calling Dispatch 'persistent chat from your phone' undersells what's actually happening. What is Dispatch actually?",
    options: [
      "A mobile-optimized version of Claude Desktop with larger context",
      "An orchestration layer from which you spawn and manage multiple parallel Cowork task sessions on your desktop",
      "A voice interface that converts speech to prompts for Claude Desktop",
      "A notification system that alerts you when Claude completes desktop tasks",
    ],
    answer: 1,
  },
  {
    section: "📱 Dispatch & The Orchestration Layer",
    q: "In the Dispatch architecture, what are the phone and desktop respectively?",
    options: [
      "Phone = backup surface; Desktop = primary surface",
      "Phone = display surface; Desktop = input surface",
      "Phone = command surface; Desktop = execution surface",
      "Phone = authentication surface; Desktop = storage surface",
    ],
    answer: 2,
  },
  {
    section: "📱 Dispatch & The Orchestration Layer",
    q: "How do you pair your phone with Claude Desktop to enable Dispatch?",
    options: [
      "Enter a six-digit code displayed in Claude Desktop settings",
      "Log in with the same Anthropic account on both devices",
      "Scan a QR code from Claude Desktop on your phone",
      "Link devices through your Apple ID or Google account",
    ],
    answer: 2,
  },
  {
    section: "📱 Dispatch & The Orchestration Layer",
    q: "What did Paweł Huryn find in his 48-hour Dispatch test regarding total human direction time versus Claude execution time?",
    options: [
      "Roughly equal time — about 90 minutes each",
      "Roughly 25 minutes of human direction time versus over 3 hours of Claude execution running in parallel",
      "About 2 hours of human direction versus 6 hours of Claude execution",
      "About 10 minutes of human direction versus 1 hour of Claude execution",
    ],
    answer: 1,
  },
  {
    section: "📱 Dispatch & The Orchestration Layer",
    q: "In Huryn's 48-hour Dispatch test, what was the task split between human and Claude across 60+ sessions?",
    options: [
      "Thinking/judgment 50% human; research/execution 50% Claude",
      "Thinking/judgment 70% human; research/execution 70% Claude",
      "Thinking/judgment and takes/opinions 90–100% human; research, formatting, execution 90% Claude",
      "All categories split roughly 60/40 human/Claude",
    ],
    answer: 2,
  },
  {
    section: "📱 Dispatch & The Orchestration Layer",
    q: "What key constraint must you account for when relying on Dispatch for away-from-desk work?",
    options: [
      "Dispatch tasks expire after 4 hours if not manually extended",
      "Only one session can run at a time to prevent resource conflicts",
      "Your computer must be awake and Claude Desktop must be open — it is a desktop agent, not a cloud service",
      "Dispatch can only access files within designated Cowork folders",
    ],
    answer: 2,
  },
  {
    section: "📱 Dispatch & The Orchestration Layer",
    q: "What is the recommended workaround for the inability to receive output files directly on your phone from Dispatch?",
    options: [
      "Use email integration to send files to yourself when tasks complete",
      "Sync your Cowork workspace via Google Drive or Dropbox so files flow both directions automatically",
      "Set Claude to compress files and paste them as text in the chat thread",
      "Use a shared network drive accessible from both devices",
    ],
    answer: 1,
  },
  {
    section: "📱 Dispatch & The Orchestration Layer",
    q: "What success rate does the article cite for complex multi-app Dispatch tasks, based on early independent testing?",
    options: [
      "About 80% of the time",
      "About 70% of the time",
      "About 60% of the time",
      "Roughly half the time",
    ],
    answer: 3,
  },
  {
    section: "📱 Dispatch & The Orchestration Layer",
    q: "The behavioral shift Dispatch creates is described as moving from a conversation pattern to a management pattern. What does the management pattern look like?",
    options: [
      "I type, it responds, I type again — tighter feedback loops",
      "I assign, I leave, I return to results",
      "I review output, give corrections, resubmit — iterative refinement",
      "I monitor in real time, intervene when needed, approve at checkpoints",
    ],
    answer: 1,
  },

  // ━━━ 🖥️ Computer Use ━━━
  {
    section: "🖥️ Computer Use",
    q: "When does Claude activate computer use instead of using a connector?",
    options: [
      "Whenever the task involves a visual interface",
      "Only when explicitly instructed to use the mouse and keyboard",
      "Only when no connector exists for the application — connectors are always tried first",
      "When the connector is available but slower than direct screen interaction",
    ],
    answer: 2,
  },
  {
    section: "🖥️ Computer Use",
    q: "Why does the article call screen-scraping (computer use) the slowest, most fragile way to interact with software?",
    options: [
      "Because it requires significantly more compute than API calls",
      "Because pointing, clicking, scrolling, and reading pixels is inherently more fragile and slower than structured connector access",
      "Because screen layouts change too frequently for reliable automation",
      "Because the model must be much larger to process visual information",
    ],
    answer: 1,
  },
  {
    section: "🖥️ Computer Use",
    q: "What does the article call the enterprise software that computer use is specifically designed to unlock?",
    options: [
      "Legacy infrastructure",
      "Unstructured data repositories",
      "The dark matter of enterprise software — internal tools, legacy dashboards, and proprietary apps that will never get an API",
      "Shadow IT — employee-installed software not sanctioned by IT",
    ],
    answer: 2,
  },
  {
    section: "🖥️ Computer Use",
    q: "What does Anthropic's safety model require before computer use can access a new application?",
    options: [
      "IT administrator approval through an enterprise dashboard",
      "A pre-defined whitelist configured at setup time",
      "Explicit permission — Claude asks before accessing new applications",
      "Two-factor authentication from the user on their phone",
    ],
    answer: 2,
  },
  {
    section: "🖥️ Computer Use",
    q: "What operating system does computer use support today, with Windows support coming?",
    options: ["Linux", "ChromeOS", "macOS", "Windows"],
    answer: 2,
  },
  {
    section: "🖥️ Computer Use",
    q: "Which of these is the right application for computer use today, versus a research experiment?",
    options: [
      "Right: 'Figure out how to use this internal app I've never shown you.' Research: 'Download the weekly report from this dashboard.'",
      "Right: 'Go to this internal dashboard every Monday, download the weekly report PDF, and summarize it.' Research: 'Figure out how to use this app I've never shown you.'",
      "Both are reliable as long as the UI is modern and browser-based",
      "Both work equally well; complexity is handled by the model's vision capabilities",
    ],
    answer: 1,
  },

  // ━━━ 🔌 Self-Hosted vs. Managed ━━━
  {
    section: "🔌 Self-Hosted vs. Managed",
    q: "The article says the real difference between OpenClaw and Anthropic's stack is not safety versus danger. What is the actual distinction?",
    options: [
      "Open source versus proprietary",
      "Real-time versus asynchronous",
      "Self-hosted versus managed",
      "Local models versus cloud models",
    ],
    answer: 2,
  },
  {
    section: "🔌 Self-Hosted vs. Managed",
    q: "What was OpenClaw's practical limitation that Anthropic's cloud scheduled tasks close?",
    options: [
      "OpenClaw could only run one task at a time",
      "OpenClaw required a Mac mini (or equivalent) to stay on, stay connected, and stay yours — you were your own IT department",
      "OpenClaw only worked with a limited set of pre-approved connectors",
      "OpenClaw had no way to interact with visual interfaces",
    ],
    answer: 1,
  },
  {
    section: "🔌 Self-Hosted vs. Managed",
    q: "What does OpenClaw offer that Anthropic's managed stack does not?",
    options: [
      "Better security through local data processing",
      "Lower cost because it avoids API fees",
      "More raw freedom — any LLM, any messaging platform, any extension, including wiring into WhatsApp, Telegram, and Discord with a local Ollama model",
      "More reliable uptime because it doesn't depend on Anthropic's servers",
    ],
    answer: 2,
  },
  {
    section: "🔌 Self-Hosted vs. Managed",
    q: "The article matches the OpenClaw-to-Dispatch transition to which historical infrastructure pattern?",
    options: [
      "Mainframes to personal computers",
      "Self-hosted Sendmail to Gmail; rack servers to AWS; Jenkins to GitHub Actions",
      "On-premise CRM to Salesforce cloud",
      "Physical media to streaming services",
    ],
    answer: 1,
  },
  {
    section: "🔌 Self-Hosted vs. Managed",
    q: "The article says managed infrastructure lowered the bar 'from needing to be your own sysadmin' to what?",
    options: [
      "Needing a basic understanding of API configuration",
      "Needing to scan a QR code",
      "Needing a paid Anthropic subscription",
      "Needing to install Claude Desktop on a Mac",
    ],
    answer: 1,
  },

  // ━━━ 🔁 The Four Open Loops ━━━
  {
    section: "🔁 The Four Open Loops",
    q: "What is the real tax on knowledge workers according to the article — not hours or tasks?",
    options: [
      "The cognitive overhead of context switching between tools",
      "The open loops — background processes consuming attention even when you're not actively working on them",
      "The time spent in meetings that could be handled asynchronously",
      "The mental load of managing priorities across multiple projects",
    ],
    answer: 1,
  },
  {
    section: "🔁 The Four Open Loops",
    q: "The commitment loop says most people track approximately what percentage of promises they make in email, Slack, and meetings?",
    options: ["About 40%", "About 60%", "About 80%", "About 90%"],
    answer: 1,
  },
  {
    section: "🔁 The Four Open Loops",
    q: "Why does the article call commitment tracking 'relationship infrastructure' rather than just productivity?",
    options: [
      "Because it requires maintaining contact lists and communication histories",
      "Because dropped commitments compound over months into an erosion of trust that you can't see — people stop relying on you without telling you",
      "Because relationship management is the primary bottleneck in most knowledge work roles",
      "Because it involves coordinating across teams rather than individual work",
    ],
    answer: 1,
  },
  {
    section: "🔁 The Four Open Loops",
    q: "Most strategic decisions get made on what percentage of available information, according to the article?",
    options: ["About 10%", "About 30%", "About 50%", "About 70%"],
    answer: 1,
  },
  {
    section: "🔁 The Four Open Loops",
    q: "What is the 'bad way' to use an AI agent for decision research?",
    options: [
      "Letting the agent choose which sources to consult without direction",
      "Asking the agent to find evidence that supports your existing opinion — using AI for confirmation rather than genuine inquiry",
      "Relying on a single session rather than breaking the research into multiple focused tasks",
      "Using computer use for research when MCP connectors are available",
    ],
    answer: 1,
  },
  {
    section: "🔁 The Four Open Loops",
    q: "What instruction does the article say you should give an agent for decision research to do it the right way?",
    options: [
      "'Summarize the top three perspectives on this decision and recommend the best one'",
      "'I need more data and more information than I would normally use to make this decision. Go fishing for data that would help me make a better choice, including data that might contradict what I currently believe.'",
      "'Research this topic thoroughly and present findings in a structured executive summary'",
      "'Review all available sources and identify any risks I may have missed'",
    ],
    answer: 1,
  },
  {
    section: "🔁 The Four Open Loops",
    q: "The compound signal detection open loop illustrates what structural limitation of human attention?",
    options: [
      "People can only track about seven items simultaneously in working memory",
      "Humans cannot process signals from multiple industries at once",
      "The signal from three weeks ago falls out of working memory to make room for whatever was urgent — this is not a discipline problem, it is how human attention works by design",
      "Humans are biased toward recent information and discount older signals",
    ],
    answer: 2,
  },
  {
    section: "🔁 The Four Open Loops",
    q: "In the competitive signal example, what does the combination of three separate signals indicate that no single signal reveals?",
    options: [
      "That the competitor is struggling financially and making desperate moves",
      "A coordinated market entry — giving you a week's head start on everyone who will read about it when TechCrunch notices",
      "That regulatory pressure is forcing the competitor to diversify into new markets",
      "An acquisition target is being identified in the Southeast Asian banking space",
    ],
    answer: 1,
  },
  {
    section: "🔁 The Four Open Loops",
    q: "What does the article call the real open loop in the overnight engineering scenario — not the tasks on the backlog, but what?",
    options: [
      "The velocity gap between what the team can ship and what the roadmap requires",
      "The technical debt that makes new features increasingly expensive to build",
      "The backlog guilt — the weight of knowing the team is carrying debt that compounds every sprint and no amount of planning creates capacity to address",
      "The attrition risk from engineers frustrated by unmaintainable code",
    ],
    answer: 2,
  },
  {
    section: "🔁 The Four Open Loops",
    q: "Who does the article mention as an example of someone with no coding experience who used overnight engineering to build something nobody had built for her in twenty years?",
    options: [
      "A compliance officer who automated her regulatory filing workflow",
      "Someone the author knows who built a complete calendar app in two weeks with zero coding experience",
      "A marketing manager who built a content scheduling system",
      "A financial analyst who built an automated due diligence tool",
    ],
    answer: 1,
  },
  {
    section: "🔁 The Four Open Loops",
    q: "The Tobi Lütke overnight engineering example involved how many experiments?",
    options: ["12 experiments", "37 experiments", "75 experiments", "120 experiments"],
    answer: 1,
  },

  // ━━━ 🏗️ Architecture Layers & Compounding ━━━
  {
    section: "🏗️ Architecture Layers & Compounding",
    q: "The article describes four layers of the complete async agent architecture. Which layer is described as 'the memory'?",
    options: [
      "Cloud scheduled tasks",
      "Dispatch",
      "Open Brain — the personal knowledge database connected via MCP",
      "Computer use",
    ],
    answer: 2,
  },
  {
    section: "🏗️ Architecture Layers & Compounding",
    q: "What does the article say is the difference between a tool and a colleague in the context of Open Brain?",
    options: [
      "A tool follows instructions; a colleague makes suggestions",
      "The compound value of an agent that accumulates context over time — it remembers what it learned yesterday, last week, three weeks ago",
      "A tool is reactive; a colleague is proactive about flagging issues",
      "A tool handles single tasks; a colleague coordinates across multiple workflows",
    ],
    answer: 1,
  },
  {
    section: "🏗️ Architecture Layers & Compounding",
    q: "The article says Open Brain runs on Supabase for approximately how much per month?",
    options: ["Free", "About $0.10 per month", "About $1 per month", "About $5 per month"],
    answer: 1,
  },
  {
    section: "🏗️ Architecture Layers & Compounding",
    q: "How does the article describe the relationship between local loops and cloud tasks in the scheduling layer?",
    options: [
      "Local loops are for simple tasks; cloud tasks are for complex multi-step workflows",
      "Local loops run while your terminal is open; cloud tasks run while your laptop is closed — same primitive, different uptime guarantee",
      "Local loops process faster; cloud tasks are more reliable but have higher latency",
      "Local loops use your machine's compute; cloud tasks use Anthropic's — they serve different security requirements",
    ],
    answer: 1,
  },
  {
    section: "🏗️ Architecture Layers & Compounding",
    q: "The article says 'when Opus 4.6 shipped in February with 5x context expansion, every scheduled task, every Dispatch workflow, every computer use session got better.' What principle does this illustrate?",
    options: [
      "That Claude's capabilities are improving faster than competitors",
      "That the stack is self-updating and doesn't require user configuration changes",
      "That building layers compounds — improvements to any layer improve the whole thing without you touching anything",
      "That Anthropic prioritizes backward compatibility across all product surfaces",
    ],
    answer: 2,
  },

  // ━━━ 🔓 Trust, Judgment & The Bottleneck Skills ━━━
  {
    section: "🔓 Trust, Judgment & Bottleneck Skills",
    q: "How is evaluating an asynchronous agent fundamentally different from evaluating a chatbot?",
    options: [
      "Asynchronous agents require more technical knowledge to evaluate accurately",
      "Chatbots you evaluate in real time; asynchronous agents you evaluate by output — you must trust the process without having watched it being produced",
      "Chatbots produce text; asynchronous agents produce files, which are harder to assess",
      "Asynchronous agents require domain expertise to evaluate; chatbots can be evaluated by anyone",
    ],
    answer: 1,
  },
  {
    section: "🔓 Trust, Judgment & Bottleneck Skills",
    q: "What are the two bottleneck skills the article identifies as the new requirement for everyone — not just managers?",
    options: [
      "Prompt engineering and technical integration",
      "System design and failure pattern recognition",
      "Clarity of intent (specify clearly enough for unsupervised execution) and quality of taste (evaluate whether what came back is actually right)",
      "Cost modeling and context architecture",
    ],
    answer: 2,
  },
  {
    section: "🔓 Trust, Judgment & Bottleneck Skills",
    q: "The article describes feeling 'itchy' after walking away from Dispatch. What does it say everyone will need to learn?",
    options: [
      "How to monitor agent sessions remotely without disrupting execution",
      "How to design better guardrails so they can trust the system without anxiety",
      "To untether — to resist the urge to go back and check if it's working",
      "How to interpret partial results while the agent is still running",
    ],
    answer: 2,
  },
  {
    section: "🔓 Trust, Judgment & Bottleneck Skills",
    q: "From Huryn's data, what share of work in the agent era remains 100% human?",
    options: [
      "Strategic judgment and planning",
      "Takes and opinions",
      "Domain expertise and quality evaluation",
      "Final review and approval",
    ],
    answer: 1,
  },
  {
    section: "🔓 Trust, Judgment & Bottleneck Skills",
    q: "What does the article say will happen to most people who set up Dispatch and point it at a triage summary?",
    options: [
      "They will quickly discover better use cases through experimentation",
      "They will feel briefly impressed, then wonder six weeks later why their workload feels exactly the same",
      "They will hit the complexity ceiling and need developer help to go further",
      "They will encounter accuracy problems that discourage continued use",
    ],
    answer: 1,
  },
  {
    section: "🔓 Trust, Judgment & Bottleneck Skills",
    q: "What is the article's closing question — the one it suggests starting with before building anything on Dispatch?",
    options: [
      "What is the highest-leverage automation I can build this week?",
      "Which of my current tasks is most repetitive and automatable?",
      "What am I carrying right now that I shouldn't be — the commitment about to lapse, the decision I keep deferring, the three-week pattern I can feel but can't name?",
      "How much of my current work could theoretically be delegated to an agent?",
    ],
    answer: 2,
  },
  {
    section: "🔓 Trust, Judgment & Bottleneck Skills",
    q: "The article ends by stating: 'If you have nothing worth saying before you open Claude, the agent just makes your nothing faster.' What principle does this express?",
    options: [
      "AI tools are only valuable for people who already produce high-quality work",
      "The output quality of agents is bounded by the quality of the model they run on",
      "The agent amplifies what you bring — direction and taste remain human responsibilities; automation without substance just accelerates emptiness",
      "Real-time interaction is more valuable than asynchronous delegation for creative work",
    ],
    answer: 2,
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

export default function DispatchOpenLoopQuiz() {
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

        .dq{
          min-height:100vh;
          background:radial-gradient(ellipse at 70% 10%, #00100f 0%, #000d0c 40%, #000 100%);
          display:flex;justify-content:center;align-items:flex-start;
          padding:36px 16px 80px;
          font-family:'Nunito',sans-serif;color:#d8f5f0;
        }
        .dq-w{width:100%;max-width:640px;}

        .dq-head{text-align:center;margin-bottom:28px;}
        .dq-eye{font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:#00c4b4;margin-bottom:6px;}
        .dq-title{font-family:'Playfair Display',serif;font-size:clamp(22px,5.5vw,34px);font-weight:900;color:#edfaf8;line-height:1.2;}
        .dq-title em{color:#00c4b4;font-style:italic;}

        .dq-study-btn{display:inline-block;margin-top:12px;padding:7px 20px;font-family:'Nunito',sans-serif;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#edfaf8;background:#00c4b422;border:1px solid #00c4b455;border-radius:99px;cursor:pointer;transition:background .2s,border-color .2s;}
        .dq-study-btn:hover{background:#00c4b444;border-color:#00c4b4;}

        .dq-study{
          background:linear-gradient(160deg,#000f0e,#001613);border:1px solid #003a35;border-radius:18px;padding:30px;margin-bottom:24px;
          box-shadow:0 12px 48px #00000077,inset 0 1px 0 #00c4b422;max-height:60vh;overflow-y:auto;
          animation:dqUp .32s ease both;font-size:14px;line-height:1.7;color:#aae8e0;
        }
        .dq-study h2{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:#edfaf8;margin:24px 0 8px;}
        .dq-study h2:first-child{margin-top:0;}
        .dq-study h3{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#00c4b4;margin:20px 0 6px;}
        .dq-study h4{font-size:14px;font-weight:800;color:#0a9990;margin:14px 0 4px;}
        .dq-study p{margin:8px 0;}
        .dq-study strong{color:#edfaf8;}
        .dq-study em{color:#00c4b4;font-style:italic;}
        .dq-study hr{border:none;border-top:1px solid #003a35;margin:20px 0;}
        .dq-study ul{margin:8px 0;padding-left:20px;}
        .dq-study li{margin:4px 0;}
        .dq-study table{width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;}
        .dq-study th{text-align:left;padding:8px 10px;background:#00c4b422;color:#00c4b4;border:1px solid #003a35;font-weight:800;letter-spacing:.5px;}
        .dq-study td{padding:8px 10px;border:1px solid #003a35;color:#aae8e0;}
        .dq-study::-webkit-scrollbar{width:6px;}
        .dq-study::-webkit-scrollbar-track{background:transparent;}
        .dq-study::-webkit-scrollbar-thumb{background:#00c4b444;border-radius:99px;}

        .dq-track{height:5px;background:#001a18;border-radius:99px;overflow:hidden;margin-bottom:10px;border:1px solid #003a35;}
        .dq-fill{height:100%;background:linear-gradient(90deg,#005c55,#00c4b4,#6ffff5);border-radius:99px;transition:width .4s ease;box-shadow:0 0 10px #00c4b466;}
        .dq-meta{display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:#0a5550;margin-bottom:20px;}
        .dq-meta .hi{color:#00c4b4;}

        .dq-card{
          background:linear-gradient(155deg,#000f0e,#001613);
          border:1px solid #003a35;border-radius:18px;padding:28px;
          box-shadow:0 2px 0 #003a35,0 14px 50px #00000088,inset 0 1px 0 #00c4b415;
          animation:dqUp .3s ease both;
        }
        @keyframes dqUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

        .dq-tag{
          display:inline-block;font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;
          color:#00c4b4;background:#00c4b412;border:1px solid #00c4b428;border-radius:99px;
          padding:3px 11px;margin-bottom:14px;
        }
        .dq-q{font-family:'Playfair Display',serif;font-size:clamp(15px,3.5vw,19px);font-weight:700;line-height:1.55;color:#edfaf8;margin-bottom:22px;}

        .dq-opts{display:flex;flex-direction:column;gap:9px;}
        .dq-opt{
          display:flex;align-items:flex-start;gap:11px;
          background:#000d0c;border:1.5px solid #002e29;border-radius:11px;
          padding:12px 13px;cursor:pointer;
          font-family:'Nunito',sans-serif;font-size:13.5px;font-weight:600;
          color:#aae8e0;text-align:left;line-height:1.5;
          transition:transform .15s,border-color .15s,background .15s,box-shadow .15s;
        }
        .dq-opt:not(:disabled):hover{transform:translateX(3px);border-color:#00c4b4;background:#001a18;box-shadow:0 0 12px #00c4b418;}
        .dq-opt:disabled{cursor:default;}
        .dq-opt.ok{background:#001a0a;border-color:#22bb66;color:#88ffcc;box-shadow:0 0 16px #22bb6630;}
        .dq-opt.no{background:#180000;border-color:#cc3322;color:#ffbbaa;box-shadow:0 0 16px #cc332230;}
        .dq-opt.rv{background:#001a0a;border-color:#33dd88;color:#aaffdd;animation:dqPulse .5s ease;}
        @keyframes dqPulse{0%{box-shadow:0 0 0 #33dd8800}50%{box-shadow:0 0 20px #33dd8877}100%{box-shadow:0 0 10px #33dd8833}}

        .dq-badge{
          flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;
          min-width:25px;height:25px;border-radius:6px;
          background:#001613;border:1px solid #003a35;
          font-size:11px;font-weight:900;color:#00c4b4;
          transition:background .15s,border-color .15s,color .15s;
        }
        .dq-opt.ok .dq-badge,.dq-opt.rv .dq-badge{background:#001f0a;border-color:#22bb66;color:#55ffaa;}
        .dq-opt.no .dq-badge{background:#1e0000;border-color:#cc3322;color:#ff7766;}

        .dq-fb{margin-top:15px;padding:10px 13px;border-radius:9px;font-size:13px;font-weight:700;animation:dqUp .2s ease;}
        .dq-fb.ok{background:#001a0a;border:1px solid #22bb6638;color:#55ffaa;}
        .dq-fb.no{background:#180000;border:1px solid #cc332238;color:#ffbbaa;}

        .dq-next{
          margin-top:18px;width:100%;padding:14px;
          background:linear-gradient(135deg,#005c55,#009e92,#6ffff5);
          border:none;border-radius:11px;
          font-family:'Nunito',sans-serif;font-size:15px;font-weight:900;
          color:#000f0e;cursor:pointer;letter-spacing:.3px;
          box-shadow:0 4px 22px #00c4b440;
          transition:transform .14s,box-shadow .14s;
          animation:dqUp .22s ease;
        }
        .dq-next:hover{transform:translateY(-2px);box-shadow:0 8px 30px #00c4b470;}

        .dq-res{
          background:linear-gradient(155deg,#000f0e,#001613);
          border:1px solid #003a35;border-radius:18px;padding:34px 28px;
          box-shadow:0 14px 50px #00000088,inset 0 1px 0 #00c4b415;
          animation:dqUp .4s ease;
        }
        .dq-res-title{font-family:'Playfair Display',serif;font-size:clamp(20px,5vw,28px);font-weight:900;text-align:center;color:#edfaf8;margin-bottom:4px;}
        .dq-pct{font-family:'Playfair Display',serif;font-size:clamp(60px,17vw,92px);font-weight:900;text-align:center;color:#00c4b4;line-height:1;text-shadow:0 0 55px #00c4b455;margin:8px 0 14px;}
        .dq-verd{text-align:center;font-size:14px;font-weight:800;padding:8px 20px;border-radius:99px;margin-bottom:22px;}
        .dq-verd.pass{background:#001a0a;border:1px solid #22bb6638;color:#55ffaa;}
        .dq-verd.fail{background:#180000;border:1px solid #cc332238;color:#ffbbaa;}

        .dq-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:26px;}
        .dq-stat{background:#000d0c;border:1px solid #002e29;border-radius:12px;padding:15px 10px;text-align:center;}
        .dq-stat-n{font-family:'Playfair Display',serif;font-size:30px;font-weight:900;color:#00c4b4;display:block;}
        .dq-stat-l{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#0a3a35;display:block;margin-top:2px;}

        .dq-mh{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#00c4b4;margin-bottom:13px;padding-top:18px;border-top:1px solid #003a35;}
        .dq-mi{background:#000d0c;border:1px solid #002e29;border-radius:10px;padding:13px;margin-bottom:9px;}
        .dq-mq{font-family:'Playfair Display',serif;font-size:13.5px;font-weight:700;color:#aae8e0;line-height:1.45;margin-bottom:7px;}
        .dq-mw{font-size:12px;font-weight:700;color:#ffbbaa;margin-bottom:3px;}
        .dq-mr{font-size:12px;font-weight:700;color:#55ffaa;}

        .dq-retry{
          margin-top:24px;width:100%;padding:15px;
          background:linear-gradient(135deg,#005c55,#009e92,#6ffff5);
          border:none;border-radius:11px;
          font-family:'Nunito',sans-serif;font-size:15px;font-weight:900;
          color:#000f0e;cursor:pointer;letter-spacing:.3px;
          box-shadow:0 4px 26px #00c4b450;
          transition:transform .14s,box-shadow .14s;
        }
        .dq-retry:hover{transform:translateY(-2px);box-shadow:0 10px 34px #00c4b480;}

        @media(max-width:460px){
          .dq-card,.dq-res{padding:18px 14px;}
          .dq-stat-n{font-size:25px;}
        }
      `}</style>

      <div className="dq">
        <div className="dq-w">
          <div className="dq-head">
            <div className="dq-eye">Dispatch · Computer Use · Async AI Labor</div>
            <h1 className="dq-title">The <em>Open Loop</em><br/>Audit</h1>
            <button className="dq-study-btn" onClick={() => setShowStudy(s => !s)}>
              {showStudy ? '✕ Close Study Material' : '📖 Study Material'}
            </button>
          </div>

          {showStudy && (
            <div className="dq-study">
              <h2>The Open Loop Audit</h2>
              <p><strong>Source:</strong> Claude Dispatch, Computer Use &amp; Asynchronous AI Labor</p>

              <h2>Part 1 — The Core Thesis: Asynchronous AI Labor</h2>
              <h3>The Central Distinction</h3>
              <ul>
                <li>The organizing question: <strong>does work land on your desk or leave it?</strong></li>
                <li>The #1 mistake with Dispatch: pointing it at <strong>simulated work</strong> — triage reports, email summaries, proactive briefings that add a document to read rather than removing a task</li>
                <li>The agent looks busy. Your life doesn't change. That's the failure mode.</li>
              </ul>
              <h3>The Primitive That Matters</h3>
              <p>Not chatbots, not copilots. The primitive is: <strong>asynchronous AI labor</strong> — work that happens on a schedule or trigger, without you present, producing results you consume later. A system that <strong>works while you sleep</strong> is not a tool, but labor.</p>
              <h3>The Prime Video Analogy</h3>
              <p>The author was Head of Product for <strong>Amazon Prime Video</strong>, leading ML-powered personalization for <strong>200 million viewers</strong>. Every night: pipelines ingested data, retrained models, re-ranked the catalog, pushed fresh results. The concept: <strong>"overnight bake"</strong>. This is the exact primitive Dispatch delivers to individual knowledge workers.</p>
              <h3>Why Three Announcements Were One</h3>
              <p>Cloud scheduled tasks, Dispatch, and computer use are <strong>layers of a single architecture</strong> — the asynchronous agent platform only makes sense when you see how they connect.</p>

              <hr />

              <h2>Part 2 — The Three-Layer Architecture</h2>
              <h3>Layer 1 — Cloud Scheduled Tasks</h3>
              <p><strong>What:</strong> Cron for knowledge work — a natural language prompt on a schedule on Anthropic's infrastructure.</p>
              <ul>
                <li>Minimum interval: <strong>one hour</strong> (Cowork); more granular via Claude Code</li>
                <li>Connects to any MCP server already wired to claude.ai</li>
                <li>Entry point: <strong>claude.ai/code/scheduled</strong></li>
              </ul>
              <p><strong>Zweben example:</strong> A Go/Python twin library maintained <strong>entirely by a scheduled Claude job</strong> with no human in the loop.</p>
              <p>Mental model: The prompt is the program. The schedule is the trigger. The MCP connectors are the I/O.</p>

              <h3>Layer 2 — Dispatch</h3>
              <p>An <strong>orchestration layer</strong> accessed from mobile that spawns and manages multiple parallel Cowork sessions on your desktop. Phone = command surface; Desktop = execution surface.</p>
              <h4>The Huryn 48-Hour Test</h4>
              <ul>
                <li><strong>Pawe&#322; Huryn</strong> ran Dispatch for 48 hours on real work</li>
                <li>Directed work from a <strong>kids' bounce house</strong></li>
                <li>Total human direction: <strong>~25 minutes</strong>; Claude execution: <strong>3+ hours</strong></li>
                <li>60+ sessions: thinking/judgment = <strong>90% human</strong>; research/execution = <strong>90% Claude</strong></li>
              </ul>
              <h4>Behavioral Shift</h4>
              <table>
                <thead><tr><th>Old pattern</th><th>New pattern</th></tr></thead>
                <tbody>
                  <tr><td>Synchronous: I type, it responds</td><td>Asynchronous: I assign, I leave, I return</td></tr>
                  <tr><td>Conversation pattern</td><td>Management pattern</td></tr>
                </tbody>
              </table>
              <h4>Current Constraints</h4>
              <ul>
                <li>Computer must be awake, Claude Desktop open</li>
                <li>No bulk approval for folder access</li>
                <li>Cannot attach/receive files from phone directly</li>
                <li>Complex multi-app tasks succeed <strong>~50%</strong> of the time</li>
                <li>This is a <strong>research preview</strong></li>
              </ul>

              <h3>Layer 3 — Computer Use</h3>
              <p>Claude reaches for <strong>connectors first</strong>; computer use only activates when no connector exists. Screen-scraping is the slowest, most fragile method.</p>
              <p>Why it matters: more than half of enterprise software has no API — internal JIRA clones, bespoke ERP screens, compliance dashboards. These <strong>will never get MCP servers</strong>.</p>
              <p>Safety: explicit permission, prompt injection detection, stoppable, some apps off-limits. <strong>macOS only</strong> today.</p>
              <p>The full loop: Assign from phone (Dispatch) → Claude uses desktop apps (computer use) → results when you're back.</p>

              <hr />

              <h2>Part 3 — Memory and Connectors</h2>
              <h3>Open Brain</h3>
              <p>Personal knowledge database via MCP. Runs on <strong>Supabase for ~$0.10/month</strong>. The agent remembers what it learned yesterday, last week, three weeks ago. The compound value: the difference between a tool and a colleague.</p>
              <h3>MCP: The Nervous System</h3>
              <p>Every connector carries over across all three surfaces. Configure once. <strong>"The universal USB of the AI age."</strong></p>
              <h3>The Compounding Architecture</h3>
              <p><em>"When Opus 4.6 shipped with 5x context expansion, every scheduled task, every Dispatch workflow got better without you touching a thing. That's how stacks work."</em></p>

              <hr />

              <h2>Part 4 — Self-Hosted vs. Managed</h2>
              <table>
                <thead><tr><th>Category</th><th>Self-hosted</th><th>Managed</th></tr></thead>
                <tbody>
                  <tr><td>Email</td><td>Sendmail</td><td>Gmail</td></tr>
                  <tr><td>Compute</td><td>Rack servers</td><td>AWS</td></tr>
                  <tr><td>CI/CD</td><td>Jenkins</td><td>GitHub Actions</td></tr>
                  <tr><td>AI agents</td><td>OpenClaw</td><td>Anthropic Dispatch</td></tr>
                </tbody>
              </table>
              <p>Self-hosted proves the category. Managed gets mass adoption.</p>

              <hr />

              <h2>Part 5 — The Four Open Loops</h2>
              <p><strong>The one test:</strong> When the agent finishes, is your plate lighter or heavier?</p>

              <h3>Loop 1 — The Commitment Loop</h3>
              <p>Every promise in email, Slack, or meetings is an open loop. Most people track ~60%. Dropped commitments compound into <strong>erosion of trust you can't see</strong>. The agent monitors commitments and flags them before they lapse.</p>

              <h3>Loop 2 — The Decision Loop</h3>
              <p>Most strategic calls get made on <strong>30% of available information</strong>. The agent spends the night pulling financials, reading analysts, assembling analysis. Key: tell the agent to go fishing for data that <strong>might contradict</strong> what you believe — use it for breadth, not confirmation.</p>

              <h3>Loop 3 — Compound Signal Detection</h3>
              <p>Your brain can't hold a three-week thread. Example: competitor hiring in payments (week 1) + patent filings (week 2) + partnership announcement (week 3) = coordinated market entry. Requires <strong>memory + proactivity</strong> working together.</p>

              <h3>Loop 4 — Overnight Engineering</h3>
              <p><strong>"The agent works a second shift that doesn't exist on your headcount plan."</strong> Migrate dependencies, improve test coverage, refactor auth layers. Lütke ran <strong>37 experiments</strong> overnight; result outperformed the human-configured version.</p>

              <hr />

              <h2>Part 6 — Trust Without Visibility</h2>
              <p>The hardest part: convincing people a system they can't watch is actually working.</p>
              <h3>The Two Bottleneck Skills</h3>
              <ul>
                <li><strong>Clarity of intent</strong> — specify what you want precisely enough for unsupervised execution</li>
                <li><strong>Quality of taste</strong> — evaluate output without having watched it being produced</li>
              </ul>
              <p><em>"Those are the bottleneck skills in every management role I've ever held. Now they're the bottleneck skills for everyone."</em></p>

              <hr />

              <h2>Part 7 — The Four Prompts</h2>
              <ul>
                <li><strong>The Open Loop Audit</strong> — name what you're carrying, separate work that leaves your desk from work that adds to it</li>
                <li><strong>The Dispatch Delegation Brief</strong> — turn audit findings into Dispatch handoffs</li>
                <li><strong>The Recurring Task Automator</strong> — for recurring tasks identified in the audit</li>
                <li><strong>The Decision Intelligence Brief</strong> — active counter-research to fight confirmation bias</li>
              </ul>
              <h3>The Anti-Pattern</h3>
              <p>Get tools running → waste them on a triage summary → feel briefly impressed → wonder six weeks later why workload feels the same. The prompts break this pattern.</p>

              <hr />

              <h2>Quick-Reference Cheat Sheet</h2>
              <h3>The Three Layers</h3>
              <table>
                <thead><tr><th>Layer</th><th>What</th><th>Gap it closes</th></tr></thead>
                <tbody>
                  <tr><td>Cloud scheduled tasks</td><td>Cron for knowledge work</td><td>No machine to keep on</td></tr>
                  <tr><td>Dispatch</td><td>Orchestration from mobile</td><td>No desk to sit at</td></tr>
                  <tr><td>Computer use</td><td>Fallback for apps without connectors</td><td>No API needed</td></tr>
                </tbody>
              </table>
              <h3>Key Numbers</h3>
              <ul>
                <li>Prime Video: <strong>200M viewers</strong></li>
                <li>Huryn: <strong>~25 min</strong> human → <strong>3+ hours</strong> Claude, <strong>60+ sessions</strong></li>
                <li>Open Brain: <strong>~$0.10/month</strong></li>
                <li>Computer use complex task success: <strong>~50%</strong></li>
                <li>Cloud tasks min interval: <strong>1 hour</strong></li>
                <li>Decisions made on: <strong>30%</strong> of available info</li>
                <li>Lütke: <strong>37 experiments</strong> overnight</li>
              </ul>
            </div>
          )}

          {!done ? (
            <>
              <div className="dq-track">
                <div className="dq-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="dq-meta">
                <span>{idx + 1} of {total}</span>
                <span className="hi">✓ {score} correct</span>
              </div>

              <div className="dq-card" key={animKey}>
                <div className="dq-tag">{q.section}</div>
                <div className="dq-q">{q.q}</div>
                <div className="dq-opts">
                  {q.options.map((opt, i) => {
                    let cls = "dq-opt";
                    if (answered) {
                      if (i === q.answer) cls += chosen === i ? " ok" : " rv";
                      else if (i === chosen) cls += " no";
                    }
                    return (
                      <button key={i} className={cls} onClick={() => handlePick(i)} disabled={answered}>
                        <span className="dq-badge">{LABELS[i]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <div className={`dq-fb ${chosen === q.answer ? "ok" : "no"}`}>
                    {chosen === q.answer
                      ? "✓ Correct — loop closed."
                      : `✗ Correct: ${q.options[q.answer]}`}
                  </div>
                )}

                {answered && (
                  <button className="dq-next" onClick={handleNext}>
                    {idx + 1 >= total ? "View Results →" : "Next Question →"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="dq-res">
              <div className="dq-res-title">Quiz Complete</div>
              <div className="dq-pct">{pct}%</div>
              <div className={`dq-verd ${passed ? "pass" : "fail"}`}>
                {passed ? "✓ Passed — loops closed, concepts clear." : "✗ Below 75% — review the study guide and retry."}
              </div>
              <div className="dq-stats">
                <div className="dq-stat"><span className="dq-stat-n">{score}</span><span className="dq-stat-l">Correct</span></div>
                <div className="dq-stat"><span className="dq-stat-n">{missed.length}</span><span className="dq-stat-l">Missed</span></div>
                <div className="dq-stat"><span className="dq-stat-n">{total}</span><span className="dq-stat-l">Total</span></div>
              </div>
              {missed.length > 0 && (
                <>
                  <div className="dq-mh">Review: {missed.length} Missed</div>
                  {missed.map((m, i) => (
                    <div className="dq-mi" key={i}>
                      <div className="dq-mq">{m.q}</div>
                      <div className="dq-mw">✗ You chose: {m.options[m.chosen]}</div>
                      <div className="dq-mr">✓ Correct: {m.options[m.answer]}</div>
                    </div>
                  ))}
                </>
              )}
              <button className="dq-retry" onClick={handleRetry}>🔀 Shuffle & Retry</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
