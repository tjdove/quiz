import { useState, useCallback } from "react";

const questions = [
  // Body Regions
  { q: "What are the three main body regions of a honey bee?", options: ["Head, thorax, abdomen", "Head, thorax, legs", "Cephalon, mesosoma, metasoma", "Rostrum, trunk, tail"], answer: 0, section: "🫀 Body Regions" },
  { q: "Which body region contains the flight muscles?", options: ["Head", "Abdomen", "Thorax", "Proventriculus"], answer: 2, section: "🫀 Body Regions" },
  { q: "Which body region contains the wax glands, stinger, and digestive organs?", options: ["Head", "Thorax", "Abdomen", "Pedicel"], answer: 2, section: "🫀 Body Regions" },
  { q: "How many legs does a honey bee have and where do they attach?", options: ["4 legs — attached to the abdomen", "6 legs — all attached to the thorax", "6 legs — two pairs on thorax, one pair on abdomen", "8 legs — attached to the thorax"], answer: 1, section: "🫀 Body Regions" },
  { q: "How many pairs of wings does a honey bee have?", options: ["1 pair", "2 pairs", "3 pairs", "4 pairs"], answer: 1, section: "🫀 Body Regions" },

  // Head Structures
  { q: "What is the proboscis?", options: ["The bee's compound eye", "The bee's tongue used to collect nectar and water", "The bee's antenna used for smell", "The pollen basket on the hind leg"], answer: 1, section: "🧠 Head" },
  { q: "Approximately how long is a honey bee's proboscis?", options: ["1-2mm", "3-4mm", "6-7mm", "10-12mm"], answer: 2, section: "🧠 Head" },
  { q: "What are the mandibles used for in worker bees?", options: ["Collecting nectar only", "Manipulating wax, propolis, and pollen; grooming; fighting", "Producing royal jelly", "Detecting pheromones"], answer: 1, section: "🧠 Head" },
  { q: "Which part of the antenna contains Johnston's organ?", options: ["The tip (flagellum)", "The first segment (scape)", "The second segment (pedicel)", "The base where it attaches to the head"], answer: 2, section: "🧠 Head" },
  { q: "How many segments does a bee antenna have?", options: ["5 segments", "10 segments (workers/queens) or 11 (drones)", "7 segments all castes", "3 segments: scape, pedicel, flagellum as one"], answer: 1, section: "🧠 Head" },
  { q: "What is the scape?", options: ["The tip of the antenna that detects UV light", "The long first segment of the antenna that connects to the head", "A scent gland near the entrance of the hive", "The wax plate on the abdomen"], answer: 1, section: "🧠 Head" },
  { q: "What do the compound eyes detect that human eyes cannot?", options: ["Infrared heat signatures from flowers", "Ultraviolet light and polarized light patterns", "Sound vibrations in the 200-300hz range", "Magnetic north for navigation"], answer: 1, section: "🧠 Head" },
  { q: "How many ommatidia (individual lenses) does a worker bee's compound eye have approximately?", options: ["~1,000", "~3,500", "~6,900", "~12,000"], answer: 2, section: "🧠 Head" },
  { q: "Why do drones have significantly larger compound eyes than workers?", options: ["They need to navigate long distances to find flowers", "To spot fast-flying virgin queens during aerial mating", "They have no Johnston's organ so rely entirely on vision", "Their larger body requires proportionally larger sensory organs"], answer: 1, section: "🧠 Head" },
  { q: "The ocelli are best described as:", options: ["Highly detailed image-forming cameras for close-up work", "Simple light-intensity detectors — measure brightness, not form images", "UV-specific lenses used to find nectar guides on flowers", "Infrared sensors used inside the dark hive"], answer: 1, section: "🧠 Head" },

  // Glands
  { q: "Where are the hypopharyngeal glands located?", options: ["In the abdomen near the wax glands", "In the head of nurse bees — produce royal jelly", "In the thorax near the flight muscles", "At the base of the stinger"], answer: 1, section: "🧪 Glands" },
  { q: "Which gland produces 9-ODA (queen substance)?", options: ["Nasanov gland", "Hypopharyngeal gland", "Mandibular gland", "Dufour's gland"], answer: 2, section: "🧪 Glands" },
  { q: "What does 9-ODA primarily do in the colony?", options: ["Marks the hive entrance for returning foragers", "Inhibits worker ovary development and suppresses swarming impulse", "Triggers the alarm response in guard bees", "Signals nurse bees to begin capping brood cells"], answer: 1, section: "🧪 Glands" },
  { q: "The Nasanov gland is located where?", options: ["In the head, between the compound eyes", "At the tip of the abdomen on the dorsal surface — workers fan it to release orientation scent", "Inside the tracheal tube of the thorax", "On the hind leg near the corbicula"], answer: 1, section: "🧪 Glands" },
  { q: "What is the Nasanov gland's primary function?", options: ["Producing alarm pheromone to recruit guard bees", "Orientation signaling — guides bees to the hive entrance, water, or new home", "Secreting wax for comb construction", "Producing royal jelly for queen larvae"], answer: 1, section: "🧪 Glands" },
  { q: "Which gland produces the alarm pheromone (isoamyl acetate)?", options: ["Nasanov gland", "Mandibular gland", "Sting/Dufour's gland", "Tarsal gland"], answer: 2, section: "🧪 Glands" },
  { q: "How many pairs of wax glands does a worker bee have?", options: ["2 pairs", "4 pairs on the ventral abdomen", "6 pairs", "8 pairs"], answer: 1, section: "🧪 Glands" },
  { q: "Which bees produce beeswax?", options: ["Only the queen", "Only young nurse bees under 10 days old", "Worker bees — wax glands are most productive in young workers (12-18 days old)", "Drones produce wax during winter clustering"], answer: 2, section: "🧪 Glands" },
  { q: "The tarsal gland leaves footprint pheromones on surfaces. What does this do?", options: ["Marks flowers as already visited to prevent double-foraging", "Leaves a landing signal at the hive entrance and on foraged flowers", "Triggers defensive behavior in guard bees", "Communicates the distance to food sources"], answer: 1, section: "🧪 Glands" },

  // Digestive System
  { q: "What is the correct order of the bee's digestive tract?", options: ["Mouth → true stomach → honey stomach → proventriculus → intestine", "Mouth → honey stomach → proventriculus → true stomach → intestine", "Mouth → proventriculus → honey stomach → true stomach → intestine", "Mouth → honey stomach → true stomach → proventriculus → intestine"], answer: 1, section: "🍽 Digestive" },
  { q: "The honey stomach (crop) holds approximately how much nectar?", options: ["0.01ml — just a drop", "~40mg — about the bee's own body weight in nectar", "~5ml — roughly a teaspoon", "~1ml — a fifth of a teaspoon"], answer: 1, section: "🍽 Digestive" },
  { q: "What is the true stomach (ventriculus) responsible for?", options: ["Storing nectar for transport back to the hive", "Actual digestion and nutrient absorption for the bee's own energy", "Filtering pollen before it reaches the intestine", "Producing digestive enzymes that are added to honey"], answer: 1, section: "🍽 Digestive" },
  { q: "The proventriculus filters what out of nectar passing toward the true stomach?", options: ["Pesticide residues and heavy metals", "Pollen grains — separating them out for the bee's own nutrition", "Water — concentrating the nectar before storage", "Wax particles that contaminate nectar"], answer: 1, section: "🍽 Digestive" },
  { q: "Invertase is an enzyme added to nectar by bees. What does it do?", options: ["Reduces moisture content by absorbing water from nectar", "Converts sucrose into glucose and fructose — the sugars found in honey", "Kills bacteria and prevents honey from fermenting", "Breaks down pollen walls to release nutrients"], answer: 1, section: "🍽 Digestive" },
  { q: "Where is invertase produced?", options: ["Wax glands in the abdomen", "Hypopharyngeal and mandibular glands in the head", "The proventriculus valve lining", "Specialized cells in the honey stomach wall"], answer: 1, section: "🍽 Digestive" },

  // Reproductive Anatomy
  { q: "What is the spermatheca?", options: ["The queen's egg-laying organ", "A sperm storage organ in the queen that allows her to fertilize eggs for years", "A gland that produces royal jelly exclusively for the queen", "The organ that determines egg size in the queen"], answer: 1, section: "🫀 Reproductive" },
  { q: "How many ovarioles (egg tubes) does a queen have compared to a worker?", options: ["Same number — queens just use them more actively", "Queen: ~150-180 ovarioles; Worker: ~2-12 ovarioles", "Queen: 2 ovarioles; Worker: 0 ovarioles", "Queen: 50 ovarioles; Worker: 50 ovarioles (workers just don't activate them)"], answer: 1, section: "🫀 Reproductive" },
  { q: "How does the queen determine whether to lay a fertilized or unfertilized egg?", options: ["She lays all eggs unfertilized and workers choose which to fertilize", "She controls the spermatheca valve — open releases sperm (worker/queen egg), closed produces unfertilized (drone) egg", "The cell size determines fertilization — she detects it with her front legs", "Both B and C are correct"], answer: 3, section: "🫀 Reproductive" },
  { q: "What do drones lack that workers and queens have?", options: ["Compound eyes and antennae", "A stinger — drones have no stinger at all", "Wings — drones cannot fly", "Legs — drones have only 4 legs"], answer: 1, section: "🫀 Reproductive" },
  { q: "Where does a queen mate?", options: ["Inside the hive in a special mating chamber", "In the air at a drone congregation area — up to 100 feet high", "On flowers where drones also forage", "At the hive entrance on warm afternoons"], answer: 1, section: "🫀 Reproductive" },
  { q: "How long can sperm stored in a queen's spermatheca remain viable?", options: ["A few weeks only", "Up to 6 months maximum", "Up to 5 years or more — the length of the queen's productive life", "Exactly one season — she must re-mate each spring"], answer: 2, section: "🫀 Reproductive" },

  // Wings & Flight
  { q: "What are hamuli?", options: ["The pollen baskets on hind legs", "Tiny hooks that couple the fore and hind wings together during flight", "Sensory hairs on the antenna", "The finger-like projections in the proventriculus"], answer: 1, section: "✈️ Wings & Flight" },
  { q: "How many wing beats per second does a honey bee produce?", options: ["~50 per second", "~130 per second", "~230 per second", "~400 per second"], answer: 2, section: "✈️ Wings & Flight" },
  { q: "K-wing is caused by:", options: ["Deformed Wing Virus shrinking the wings during pupal development", "Tracheal mites — the hamuli disengage causing wings to splay at an angle", "A genetic defect in newly mated queens", "Varroa mite feeding damage on developing pupae"], answer: 1, section: "✈️ Wings & Flight" },
  { q: "At what approximate temperature do bees stop foraging?", options: ["Below 70°F", "Below 55°F", "Below 40°F", "Below 32°F only"], answer: 1, section: "✈️ Wings & Flight" },
  { q: "How do bees thermoregulate the hive in winter?", options: ["They burn stored fat reserves that generate heat as a byproduct", "They cluster together and vibrate flight muscles to generate heat — consuming honey as fuel", "They seal all entrances with propolis to trap existing warmth", "They reduce the colony to just the queen and 50 workers to minimize heat loss"], answer: 1, section: "✈️ Wings & Flight" },

  // Legs & Corbicula
  { q: "What is the corbicula?", options: ["The hook that joins the fore and hind wings", "A smooth concave surface on the hind leg surrounded by stiff hairs — the pollen basket", "The sensory organ at the tip of the antenna", "A gland on the leg that marks surfaces with pheromone"], answer: 1, section: "🦵 Legs" },
  { q: "Which pair of legs carries the pollen baskets (corbicula)?", options: ["Front legs", "Middle legs", "Hind legs", "All three pairs share pollen carrying duty"], answer: 2, section: "🦵 Legs" },
  { q: "What is the pollen press?", options: ["A structure in the mouth that compacts pollen before swallowing", "A joint between leg segments used to pack pollen into the corbicula", "A cell in the hive where bees compact pollen into bee bread", "The mandible structure that crushes pollen grains"], answer: 1, section: "🦵 Legs" },
  { q: "The front legs have a special notch used for:", options: ["Gripping the corbicula during pollen loading", "Cleaning the antennae — the notch fits around the antenna and pulls debris off", "Detecting vibrations from the waggle dance", "Grasping the queen during the mating process"], answer: 1, section: "🦵 Legs" },

  // Stinger
  { q: "Why does a worker bee die after stinging a mammal?", options: ["The venom is toxic to the bee herself", "The barbed stinger lodges in elastic skin, tearing the bee's abdomen as she pulls away", "She exhausts all her venom in one sting causing organ failure", "She is killed by other bees in the colony as a defensive protocol"], answer: 1, section: "☠️ Stinger" },
  { q: "Can a queen sting multiple times?", options: ["No — queens have the same barbed stinger as workers", "Yes — the queen has a smooth curved stinger used mainly against rival queens", "No — queens have no stinger at all", "Yes — but only when laying eggs, not in defense"], answer: 1, section: "☠️ Stinger" },
  { q: "The stinger is evolutionarily derived from which structure?", options: ["A modified leg appendage", "A modified ovipositor (egg-laying organ) — which is why drones have no stinger", "A modified mandible", "A specialized wax gland that hardened over time"], answer: 1, section: "☠️ Stinger" },
  { q: "What is the correct first response when a bee stinger is embedded in skin?", options: ["Squeeze it out with fingers or tweezers", "Scrape it out quickly with a fingernail or card — squeezing pumps more venom", "Leave it — removing it makes the wound worse", "Apply heat immediately to neutralize the venom"], answer: 1, section: "☠️ Stinger" },
  { q: "Bee venom's primary protein that causes allergic reactions is:", options: ["Isoamyl acetate", "Melittin — makes up ~50% of dry venom weight; disrupts cell membranes", "Phospholipase A2 — the main allergen triggering IgE response", "Apamin — a neurotoxin component"], answer: 2, section: "☠️ Stinger" },

  // Tracheal / Respiratory
  { q: "How do bees breathe?", options: ["Through small pores on the abdomen called spiracles connected to a tracheal tube system", "Through gill-like structures on the thorax", "Through the proboscis — which doubles as a breathing tube", "Through a single large lung in the thorax"], answer: 0, section: "💨 Respiratory" },
  { q: "Tracheal mites (Acarapis woodi) infest which structure?", options: ["The spiracles on the outside of the abdomen", "The large tracheal tubes of the thorax near the first pair of spiracles", "The honey stomach reducing the bee's energy intake", "The tarsus of the front leg where they feed on hemolymph"], answer: 1, section: "💨 Respiratory" },
  { q: "What is hemolymph?", options: ["The bee's equivalent of blood — an open circulatory fluid that bathes organs", "The digestive fluid produced in the true stomach", "The secretion of the hypopharyngeal glands", "Fermented pollen stored as bee bread"], answer: 0, section: "💨 Respiratory" },

  // Caste Anatomy Differences
  { q: "Which caste has the most developed ovaries?", options: ["Workers — they are the most numerous", "Drones — reproductive pressure drives ovary development", "Queens — ~150-180 ovarioles vs worker's 2-12", "All castes have identical ovary development; queens just activate theirs"], answer: 2, section: "👑 Caste Differences" },
  { q: "Workers differ anatomically from queens in which key way?", options: ["Workers have compound eyes; queens only have ocelli", "Workers have a corbicula and wax glands; queens have neither", "Workers have 6 legs; queens have 4", "Workers have a barbed stinger; queens have no stinger"], answer: 1, section: "👑 Caste Differences" },
  { q: "What body feature helps identify a drone bee visually?", options: ["Larger abdomen and visible pollen baskets on hind legs", "Very large rounded compound eyes that wrap around the top of the head", "Distinctive yellow and black banding absent in workers", "Longer proboscis than workers for reaching deep flowers"], answer: 1, section: "👑 Caste Differences" },
  { q: "A queen bee is longer than a worker primarily because:", options: ["She consumes more food so grows larger overall", "Her abdomen is elongated to accommodate her large ovaries and egg-laying capacity", "She develops in a larger cell giving her more room to grow", "Both B and C contribute to her larger size"], answer: 3, section: "👑 Caste Differences" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Nunito:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .app {
    min-height: 100vh;
    background: radial-gradient(ellipse at top, #1a0a2e 0%, #0a0614 70%);
    font-family: 'Nunito', sans-serif;
    padding: 24px 16px 48px;
    display: flex; flex-direction: column; align-items: center;
  }

  .header { text-align: center; margin-bottom: 28px; }
  .header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 1.9rem; color: #d8b4fe;
    text-shadow: 0 0 40px rgba(216,180,254,0.35);
    margin-bottom: 4px; letter-spacing: 0.02em;
  }
  .header p {
    color: #a78bfa; font-size: 0.8rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.7;
  }

  .progress-wrap {
    width: 100%; max-width: 640px;
    background: #1a0a2e; border-radius: 99px;
    height: 7px; margin-bottom: 8px; overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #7c3aed, #d8b4fe);
    border-radius: 99px; transition: width 0.4s ease;
  }
  .progress-label {
    width: 100%; max-width: 640px;
    display: flex; justify-content: space-between;
    color: #a78bfa; font-size: 0.78rem;
    font-weight: 700; letter-spacing: 0.05em;
    margin-bottom: 20px; opacity: 0.8;
  }

  .card {
    background: #110820;
    border: 1px solid #2d1457;
    border-radius: 20px; width: 100%; max-width: 640px;
    padding: 30px 26px 26px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.7), inset 0 1px 0 rgba(216,180,254,0.05);
    animation: fadeIn 0.3s ease;
  }

  .section-tag {
    display: inline-block;
    background: rgba(124,58,237,0.12);
    border: 1px solid rgba(124,58,237,0.3);
    color: #a78bfa; font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 99px; margin-bottom: 16px;
  }

  .question {
    font-family: 'Playfair Display', serif;
    font-size: 1.18rem; color: #f5f3ff;
    line-height: 1.55; margin-bottom: 26px;
  }

  .options { display: flex; flex-direction: column; gap: 10px; }

  .opt {
    background: rgba(255,255,255,0.02);
    border: 1.5px solid #2d1457; border-radius: 12px;
    color: #ddd6fe; font-family: 'Nunito', sans-serif;
    font-size: 0.91rem; font-weight: 600;
    padding: 13px 16px; cursor: pointer;
    text-align: left; transition: all 0.15s ease; line-height: 1.4;
  }
  .opt:hover:not(:disabled) {
    background: rgba(124,58,237,0.1);
    border-color: #7c3aed; color: #d8b4fe;
    transform: translateX(3px);
  }
  .opt.correct { background: rgba(134,239,172,0.09); border-color: #86efac; color: #86efac; }
  .opt.wrong   { background: rgba(252,165,165,0.08); border-color: #fca5a5; color: #fca5a5; }
  .opt.reveal  { background: rgba(134,239,172,0.04); border-color: rgba(134,239,172,0.35); color: #86efac; }

  .letter { margin-right: 10px; opacity: 0.4; }

  .feedback {
    margin-top: 18px; padding: 13px 16px; border-radius: 12px;
    font-size: 0.87rem; font-weight: 600; line-height: 1.5;
    animation: fadeIn 0.25s ease;
  }
  .feedback.correct { background: rgba(134,239,172,0.06); border: 1px solid rgba(134,239,172,0.22); color: #86efac; }
  .feedback.wrong   { background: rgba(252,165,165,0.06); border: 1px solid rgba(252,165,165,0.22); color: #fca5a5; }

  .next-btn {
    margin-top: 18px; width: 100%; padding: 13px;
    background: linear-gradient(135deg, #7c3aed, #5b21b6);
    border: none; border-radius: 12px;
    color: #f5f3ff; font-family: 'Nunito', sans-serif;
    font-size: 0.93rem; font-weight: 800;
    letter-spacing: 0.05em; cursor: pointer;
    text-transform: uppercase; transition: all 0.2s;
  }
  .next-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 24px rgba(124,58,237,0.4); }

  .score-card {
    text-align: center; background: #110820;
    border: 1px solid #2d1457; border-radius: 20px;
    width: 100%; max-width: 640px; padding: 44px 28px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.7);
    animation: fadeIn 0.4s ease;
  }
  .score-emoji { font-size: 3.2rem; margin-bottom: 14px; }
  .score-big {
    font-family: 'Playfair Display', serif; font-size: 3rem;
    color: #d8b4fe; text-shadow: 0 0 40px rgba(216,180,254,0.4);
    margin-bottom: 6px;
  }
  .score-sub {
    color: #a78bfa; font-size: 0.88rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    opacity: 0.8; margin-bottom: 28px;
  }
  .breakdown { display: flex; justify-content: center; gap: 36px; margin-bottom: 32px; }
  .stat { display: flex; flex-direction: column; align-items: center; }
  .stat .n { font-size: 1.7rem; font-weight: 800; margin-bottom: 2px; }
  .stat .l { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #a78bfa; opacity: 0.7; }
  .stat .n.g { color: #86efac; }
  .stat .n.r { color: #fca5a5; }
  .stat .n.a { color: #ddd6fe; }

  .retry-btn {
    background: linear-gradient(135deg, #7c3aed, #5b21b6);
    border: none; border-radius: 12px; color: #f5f3ff;
    font-family: 'Nunito', sans-serif; font-size: 0.93rem; font-weight: 800;
    padding: 13px 36px; cursor: pointer;
    letter-spacing: 0.05em; text-transform: uppercase; transition: all 0.2s;
  }
  .retry-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 24px rgba(124,58,237,0.4); }

  .missed-list {
    margin-top: 28px; text-align: left;
    border-top: 1px solid #2d1457; padding-top: 24px;
  }
  .missed-list h3 { font-family: 'Playfair Display', serif; color: #fca5a5; font-size: 1rem; margin-bottom: 14px; }
  .missed-item {
    background: rgba(252,165,165,0.04); border: 1px solid rgba(252,165,165,0.12);
    border-radius: 10px; padding: 12px 14px; margin-bottom: 8px;
    font-size: 0.82rem; color: #ddd6fe;
  }
  .missed-item strong { color: #fca5a5; display: block; margin-bottom: 4px; }
  .missed-item span { color: #86efac; font-weight: 700; }

  @keyframes fadeIn { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
`;

export default function BeekeeperQuiz4() {
  const [deck] = useState(() => shuffle(questions));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [missed, setMissed] = useState([]);
  const [key, setKey] = useState(0);

  const current = deck[idx];
  const answered = selected !== null;

  const handleSelect = useCallback((i) => {
    if (answered) return;
    setSelected(i);
    if (i === current.answer) setScore(s => s + 1);
    else setMissed(m => [...m, current]);
  }, [answered, current]);

  const handleNext = () => {
    if (idx + 1 >= deck.length) setDone(true);
    else { setIdx(i => i + 1); setSelected(null); }
  };

  const handleRetry = () => {
    setIdx(0); setSelected(null);
    setScore(0); setDone(false);
    setMissed([]); setKey(k => k + 1);
  };

  const pct = Math.round((score / deck.length) * 100);
  const pass = pct >= 75;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <h1>🐝 NC Beekeepers — Round 4</h1>
          <p>Bee Anatomy Deep Dive</p>
        </div>

        {!done ? (
          <>
            <div className="progress-wrap">
              <div className="progress-fill" style={{ width: `${(idx / deck.length) * 100}%` }} />
            </div>
            <div className="progress-label">
              <span>Question {idx + 1} of {deck.length}</span>
              <span>✓ {score} correct</span>
            </div>

            <div className="card" key={`${key}-${idx}`}>
              <div className="section-tag">{current.section}</div>
              <div className="question">{current.q}</div>
              <div className="options">
                {current.options.map((opt, i) => {
                  let cls = "opt";
                  if (answered) {
                    if (i === current.answer && i === selected) cls = "opt correct";
                    else if (i === selected) cls = "opt wrong";
                    else if (i === current.answer) cls = "opt reveal";
                  }
                  return (
                    <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={answered}>
                      <span className="letter">{["A","B","C","D"][i]}.</span>{opt}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className={`feedback ${selected === current.answer ? "correct" : "wrong"}`}>
                  {selected === current.answer
                    ? "✓ Correct!"
                    : `✗ Correct answer: "${current.options[current.answer]}"`}
                </div>
              )}
              {answered && (
                <button className="next-btn" onClick={handleNext}>
                  {idx + 1 >= deck.length ? "See Results →" : "Next Question →"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="score-card">
            <div className="score-emoji">{pass ? "🏆" : "📚"}</div>
            <div className="score-big">{pct}%</div>
            <div className="score-sub">{pass ? "Passing Score — Exam ready!" : "Keep going — 75% needed to pass"}</div>
            <div className="breakdown">
              <div className="stat"><span className="n g">{score}</span><span className="l">Correct</span></div>
              <div className="stat"><span className="n r">{deck.length - score}</span><span className="l">Missed</span></div>
              <div className="stat"><span className="n a">{deck.length}</span><span className="l">Total</span></div>
            </div>
            <button className="retry-btn" onClick={handleRetry}>🔄 Shuffle & Retry</button>

            {missed.length > 0 && (
              <div className="missed-list">
                <h3>❌ Review These ({missed.length})</h3>
                {missed.map((m, i) => (
                  <div className="missed-item" key={i}>
                    <strong>{m.q}</strong>
                    <span>✓ {m.options[m.answer]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
