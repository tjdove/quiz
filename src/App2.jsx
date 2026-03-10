import { useState, useCallback } from "react";

const questions = [
  // Biology
  { q: "How many pairs of wax glands does a worker bee have?", options: ["2 pairs", "4 pairs", "6 pairs", "8 pairs"], answer: 1, section: "🐝 Biology" },
  { q: "What is the function of the proventriculus?", options: ["Produces royal jelly", "One-way valve between honey stomach and true stomach; filters pollen", "Stores sperm in the queen", "Detects vibrations from the waggle dance"], answer: 1, section: "🐝 Biology" },
  { q: "Which bees have a barbed stinger that lodges in skin?", options: ["Queens only", "Drones only", "Worker bees only", "Both queens and workers"], answer: 2, section: "🐝 Biology" },
  { q: "What are the three simple eyes on top of a bee's head called?", options: ["Compound eyes", "Ocelli", "Antennae", "Corbicula"], answer: 1, section: "🐝 Biology" },
  { q: "What is the proboscis?", options: ["The bee's pollen basket", "The bee's tongue used for collecting nectar", "The organ that stores sperm", "A type of wax gland"], answer: 1, section: "🐝 Biology" },
  { q: "What is the primary role of the hypopharyngeal gland in nurse bees?", options: ["Produce alarm pheromone", "Produce royal jelly to feed larvae", "Secrete beeswax", "Detect pheromones from the queen"], answer: 1, section: "🐝 Biology" },
  { q: "How many wings does a honey bee have?", options: ["2 wings", "4 wings connected by hamuli", "6 wings", "4 wings that operate independently"], answer: 1, section: "🐝 Biology" },
  { q: "The queen's mandibular gland produces which key substance?", options: ["Isoamyl acetate (alarm pheromone)", "9-ODA (queen substance) — inhibits worker ovaries and swarming", "Geraniol — orientation signal", "Beeswax precursor"], answer: 1, section: "🐝 Biology" },
  { q: "What color can honey bees NOT see?", options: ["Blue", "Ultraviolet", "Red", "Yellow"], answer: 2, section: "🐝 Biology" },
  { q: "At what temperature (approximately) do bees stop flying?", options: ["Below 32°F", "Below 55°F", "Below 70°F", "Below 45°F"], answer: 1, section: "🐝 Biology" },

  // Behavior
  { q: "What behavior describes bees from one colony stealing honey from a weaker hive?", options: ["Drifting", "Absconding", "Robbing", "Supersedure"], answer: 2, section: "🕺 Behavior" },
  { q: "What is 'bearding' and should you be concerned?", options: ["Bees fighting at the entrance — sign of robbing, very concerning", "Bees clustering on the outside of the hive in heat — normal behavior, not swarming", "A propolis buildup around the entrance — minor maintenance issue", "Worker bees surrounding the queen — sign of supersedure"], answer: 1, section: "🕺 Behavior" },
  { q: "What triggers a colony to swarm?", options: ["Disease pressure and mite overload", "Congestion, lack of space, and strong swarm impulse", "Loss of the queen", "Cold weather approaching"], answer: 1, section: "🕺 Behavior" },
  { q: "In the waggle dance, what does the DURATION of the waggle run represent?", options: ["The quality of the food source", "The distance to the food source", "The direction relative to the sun", "The number of bees needed to forage there"], answer: 1, section: "🕺 Behavior" },
  { q: "What is 'absconding'?", options: ["A small swarm from a weak colony", "The entire colony abandoning the hive, often due to pests, disease, or heat", "Worker bees evicting drones in fall", "Bees drifting into a neighboring hive"], answer: 1, section: "🕺 Behavior" },
  { q: "How do bees communicate that a food source is VERY close (within ~50 meters)?", options: ["Waggle dance", "Round dance", "Tremble dance", "Sickle dance"], answer: 1, section: "🕺 Behavior" },
  { q: "What are multiple eggs per cell in a capped brood pattern a sign of?", options: ["A highly productive queen", "Laying workers — a queenless colony", "European Foulbrood infection", "Africanized honey bee genetics"], answer: 1, section: "🕺 Behavior" },

  // Pests
  { q: "Which pest lives inside the TRACHEA (breathing tubes) of adult bees?", options: ["Varroa mite", "Small Hive Beetle", "Tracheal mite (Acarapis woodi)", "Nosema ceranae"], answer: 2, section: "🔬 Pests" },
  { q: "What symptom is associated with tracheal mite infestation?", options: ["Ropy brown brood inside cells", "K-wing (dislocated wings) and crawling bees near entrance", "White mummified larvae on the bottom board", "Sunken, discolored cappings"], answer: 1, section: "🔬 Pests" },
  { q: "Varroa mites prefer to reproduce in which type of brood and why?", options: ["Worker brood — because there are more worker cells available", "Drone brood — because the longer capping period (24 days) gives more mite generations", "Queen cells — because of the rich royal jelly environment", "Uncapped larvae — for easier access"], answer: 1, section: "🔬 Pests" },
  { q: "What is the sticky board used for in Varroa monitoring?", options: ["Trapping adult mites that fall off bees — counts natural mite drop", "Collecting bees for an alcohol wash", "Measuring moisture in the hive", "Trapping small hive beetles"], answer: 0, section: "🔬 Pests" },
  { q: "Which treatment for Varroa is approved for use even with honey supers on?", options: ["Apivar (Amitraz)", "Apistan (Fluvalinate)", "Oxalic Acid vaporization", "Coumaphos (CheckMite+)"], answer: 2, section: "🔬 Pests" },
  { q: "Small Hive Beetles are WORST in which conditions?", options: ["Cold, dry climates in northern states", "Hot, humid climates — like NC and the Southeast US", "High altitude mountain regions", "Arid desert conditions"], answer: 1, section: "🔬 Pests" },

  // Disease
  { q: "Which disease causes larvae to form a fluid-filled sac and dry into a 'gondola-shaped' scale?", options: ["American Foulbrood", "European Foulbrood", "Sacbrood virus", "Chalkbrood"], answer: 2, section: "🏥 Disease" },
  { q: "What does a 'shotgun' brood pattern typically indicate?", options: ["A very productive queen laying rapidly", "Disease, a failing queen, or pest damage causing spotty capped brood", "Normal brood pattern in a newly established colony", "The hive preparing to swarm"], answer: 1, section: "🏥 Disease" },
  { q: "Nosema ceranae is classified as:", options: ["A bacterium treated with antibiotics", "A virus spread by Varroa", "A microsporidian fungus affecting adult bee guts", "An external mite parasite"], answer: 2, section: "🏥 Disease" },
  { q: "Chalkbrood can best be reduced by:", options: ["Applying Terramycin to the hive", "Improving hive ventilation, reducing moisture, and requeening", "Using oxalic acid treatments in broodless period", "Burning all infected equipment"], answer: 1, section: "🏥 Disease" },
  { q: "What is 'purple brood' and what causes it?", options: ["A rare disorder caused by titi plant nectar in the SE United States", "An advanced stage of American Foulbrood", "A symptom of pesticide poisoning", "A sign of Nosema ceranae infestation"], answer: 0, section: "🏥 Disease" },
  { q: "How can you distinguish chilled brood from a disease like AFB?", options: ["Chilled brood has the ropy brown pull test; AFB does not", "Chilled brood affects only uncapped larvae in a solid mass; no foul smell; caused by cold snap or colony weakness", "Chilled brood only occurs in drone cells", "There is no way to distinguish them without a lab test"], answer: 1, section: "🏥 Disease" },
  { q: "Deformed Wing Virus (DWV) is best controlled by:", options: ["Applying Terramycin in spring and fall", "Treating with fumagillin", "Controlling Varroa mite populations — DWV is primarily vectored by Varroa", "Replacing brood frames annually"], answer: 2, section: "🏥 Disease" },

  // Equipment & Management
  { q: "What is the primary purpose of a queen excluder?", options: ["Keep the queen from leaving during a swarm", "Prevent the queen from entering honey supers while workers pass freely", "Block small hive beetles from entering the hive", "Separate the brood nest into two chambers"], answer: 1, section: "🛠 Equipment" },
  { q: "What is the difference between a deep and a medium hive body?", options: ["Deep = 9-5/8 inches tall (brood); Medium = 6-5/8 inches tall (honey)", "Deep = 6-5/8 inches; Medium = 9-5/8 inches", "They are the same height but different widths", "Deep holds 8 frames; Medium holds 10 frames"], answer: 0, section: "🛠 Equipment" },
  { q: "Why is a screened bottom board used in Integrated Pest Management (IPM)?", options: ["It prevents the queen from leaving", "It allows Varroa mites that fall off bees to drop out of the hive rather than reattach", "It improves honey production by increasing airflow", "It keeps small hive beetles from entering"], answer: 1, section: "🛠 Equipment" },
  { q: "What is the recommended action when inspecting a hive on a rainy, cold day?", options: ["Always inspect regardless of weather — bees adjust", "Avoid inspection — bees are more defensive and brood can be chilled", "Inspect quickly with extra smoke", "Only inspect the top super, never the brood box"], answer: 1, section: "🛠 Equipment" },
  { q: "What does smoke DO physiologically to honey bees?", options: ["It sedates them with carbon dioxide", "It triggers a feeding response (bees gorge on honey) and masks alarm pheromone", "It kills mites on contact", "It signals the bees that the hive is moving"], answer: 1, section: "🛠 Equipment" },
  { q: "When should you add honey supers to a hive?", options: ["Only in fall when bees need to store for winter", "Before the main nectar flow begins, when bees are running out of space", "After the nectar flow ends to catch late season honey", "Only after treating for Varroa"], answer: 1, section: "🛠 Equipment" },

  // Honey, Products & Plants
  { q: "What is 'floral fidelity' in honey bees?", options: ["Bees that only forage within 1 mile of their hive", "A forager bee works only one flower species per trip, making them superior pollinators", "Bees that return to the same flower patch every year", "The preference honey bees have for white or yellow flowers"], answer: 1, section: "🍯 Honey & Plants" },
  { q: "Goldenrod is important to NC beekeepers primarily because:", options: ["It produces the sweetest, lightest honey of any NC plant", "It is a critical FALL pollen source that helps colonies build up winter bees", "It is the only plant that blooms in winter", "It provides propolis used to seal the hive"], answer: 1, section: "🍯 Honey & Plants" },
  { q: "What process creates 'creamed' (spun) honey?", options: ["Heating honey above 120°F until it changes texture", "Whipping air into honey at high speed", "Seeding honey with fine crystals and controlling temperature to produce smooth, spreadable texture", "Filtering out all pollen to prevent crystallization"], answer: 2, section: "🍯 Honey & Plants" },
  { q: "What NC agency regulates honey labeling and sales?", options: ["NCSBA (NC State Beekeepers Association)", "NCDA&CS Food & Drug Protection Division", "NC Department of Health", "USDA Agricultural Marketing Service only"], answer: 1, section: "🍯 Honey & Plants" },
  { q: "Propolis is gathered by bees from:", options: ["Secretions of other worker bees", "Plant resins — used to seal cracks and has antimicrobial properties", "Fermented pollen mixed with nectar", "The waxy coating on flower petals"], answer: 1, section: "🍯 Honey & Plants" },

  // NC Regs & History
  { q: "Who invented the modern bee smoker?", options: ["Rev. Lorenzo Langstroth", "Karl von Frisch", "Moses Quinby", "Amos Root"], answer: 2, section: "📋 NC & History" },
  { q: "What is the passing score for the NCSBA Certified level written exam?", options: ["70%", "75%", "80%", "85%"], answer: 1, section: "📋 NC & History" },
  { q: "Africanized honey bees are described at the Certified level as:", options: ["Killer bees that attack without provocation", "'Africanized' honey bees — NOT 'killer bees'; biologically similar to European bees but more defensive", "A separate species from Apis mellifera", "Extinct outside of South America"], answer: 1, section: "📋 NC & History" },
  { q: "How long can American Foulbrood spores survive in equipment?", options: ["Up to 2 years", "Up to 10 years", "40+ years", "They die when exposed to sunlight within weeks"], answer: 2, section: "📋 NC & History" },
  { q: "What should a beekeeper do FIRST if they suspect a pesticide kill?", options: ["Immediately move the hive to a new location", "Document with photos and collect ~100 dead bees in sealed bags; contact NCDA&CS Apiary Inspection", "Treat the colony with antibiotics", "Combine the affected colony with a strong hive"], answer: 1, section: "📋 NC & History" },
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
    background: radial-gradient(ellipse at top, #0d1f0f 0%, #050d06 70%);
    font-family: 'Nunito', sans-serif;
    padding: 24px 16px 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header { text-align: center; margin-bottom: 28px; }
  .header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 1.9rem;
    color: #86efac;
    text-shadow: 0 0 40px rgba(134,239,172,0.35);
    margin-bottom: 4px;
    letter-spacing: 0.02em;
  }
  .header p {
    color: #4ade80;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.7;
  }

  .progress-wrap {
    width: 100%; max-width: 640px;
    background: #0a2010;
    border-radius: 99px; height: 7px;
    margin-bottom: 8px; overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #22c55e, #86efac);
    border-radius: 99px;
    transition: width 0.4s ease;
  }
  .progress-label {
    width: 100%; max-width: 640px;
    display: flex; justify-content: space-between;
    color: #4ade80; font-size: 0.78rem;
    font-weight: 700; letter-spacing: 0.05em;
    margin-bottom: 20px; opacity: 0.8;
  }

  .card {
    background: #0a1f0c;
    border: 1px solid #1a4020;
    border-radius: 20px;
    width: 100%; max-width: 640px;
    padding: 30px 26px 26px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(134,239,172,0.06);
    animation: fadeIn 0.3s ease;
  }

  .section-tag {
    display: inline-block;
    background: rgba(34,197,94,0.1);
    border: 1px solid rgba(34,197,94,0.25);
    color: #4ade80;
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 99px;
    margin-bottom: 16px;
  }

  .question {
    font-family: 'Playfair Display', serif;
    font-size: 1.18rem; color: #ecfdf5;
    line-height: 1.55; margin-bottom: 26px;
  }

  .options { display: flex; flex-direction: column; gap: 10px; }

  .opt {
    background: rgba(255,255,255,0.02);
    border: 1.5px solid #1a4020;
    border-radius: 12px;
    color: #d1fae5;
    font-family: 'Nunito', sans-serif;
    font-size: 0.91rem; font-weight: 600;
    padding: 13px 16px; cursor: pointer;
    text-align: left; transition: all 0.15s ease;
    line-height: 1.4;
  }
  .opt:hover:not(:disabled) {
    background: rgba(34,197,94,0.08);
    border-color: #22c55e; color: #86efac;
    transform: translateX(3px);
  }
  .opt.correct { background: rgba(134,239,172,0.1); border-color: #86efac; color: #86efac; }
  .opt.wrong   { background: rgba(252,165,165,0.08); border-color: #fca5a5; color: #fca5a5; }
  .opt.reveal  { background: rgba(134,239,172,0.05); border-color: rgba(134,239,172,0.4); color: #86efac; }

  .letter { margin-right: 10px; opacity: 0.45; }

  .feedback {
    margin-top: 18px; padding: 13px 16px;
    border-radius: 12px; font-size: 0.87rem;
    font-weight: 600; line-height: 1.5;
    animation: fadeIn 0.25s ease;
  }
  .feedback.correct { background: rgba(134,239,172,0.07); border: 1px solid rgba(134,239,172,0.25); color: #86efac; }
  .feedback.wrong   { background: rgba(252,165,165,0.07); border: 1px solid rgba(252,165,165,0.25); color: #fca5a5; }

  .next-btn {
    margin-top: 18px; width: 100%; padding: 13px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    border: none; border-radius: 12px;
    color: #052e16; font-family: 'Nunito', sans-serif;
    font-size: 0.93rem; font-weight: 800;
    letter-spacing: 0.05em; cursor: pointer;
    text-transform: uppercase; transition: all 0.2s;
  }
  .next-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 24px rgba(34,197,94,0.35); }

  .score-card {
    text-align: center;
    background: #0a1f0c; border: 1px solid #1a4020;
    border-radius: 20px; width: 100%; max-width: 640px;
    padding: 44px 28px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.6);
    animation: fadeIn 0.4s ease;
  }
  .score-emoji { font-size: 3.2rem; margin-bottom: 14px; }
  .score-big {
    font-family: 'Playfair Display', serif;
    font-size: 3rem; color: #86efac;
    text-shadow: 0 0 40px rgba(134,239,172,0.4);
    margin-bottom: 6px;
  }
  .score-sub {
    color: #4ade80; font-size: 0.88rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    opacity: 0.8; margin-bottom: 28px;
  }
  .breakdown { display: flex; justify-content: center; gap: 36px; margin-bottom: 32px; }
  .stat { display: flex; flex-direction: column; align-items: center; }
  .stat .n { font-size: 1.7rem; font-weight: 800; margin-bottom: 2px; }
  .stat .l { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #4ade80; opacity: 0.7; }
  .stat .n.g { color: #86efac; }
  .stat .n.r { color: #fca5a5; }
  .stat .n.a { color: #d1fae5; }

  .retry-btn {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    border: none; border-radius: 12px;
    color: #052e16; font-family: 'Nunito', sans-serif;
    font-size: 0.93rem; font-weight: 800;
    padding: 13px 36px; cursor: pointer;
    letter-spacing: 0.05em; text-transform: uppercase;
    transition: all 0.2s;
  }
  .retry-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 24px rgba(34,197,94,0.35); }

  .missed-list {
    margin-top: 28px; text-align: left;
    border-top: 1px solid #1a4020; padding-top: 24px;
  }
  .missed-list h3 {
    font-family: 'Playfair Display', serif;
    color: #fca5a5; font-size: 1rem; margin-bottom: 14px;
  }
  .missed-item {
    background: rgba(252,165,165,0.04);
    border: 1px solid rgba(252,165,165,0.13);
    border-radius: 10px; padding: 12px 14px;
    margin-bottom: 8px; font-size: 0.82rem; color: #d1fae5;
  }
  .missed-item strong { color: #fca5a5; display: block; margin-bottom: 4px; }
  .missed-item span { color: #86efac; font-weight: 700; }

  @keyframes fadeIn { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
`;

export default function BeekeeperQuiz2() {
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
          <h1>🐝 NC Beekeepers — Round 2</h1>
          <p>Certified Level Practice Quiz</p>
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
