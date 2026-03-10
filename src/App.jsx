import { useState, useEffect, useCallback } from "react";

const questions = [
  // Biology
  { q: "How many days does it take a worker bee to develop from egg to adult?", options: ["16 days", "21 days", "24 days", "18 days"], answer: 1, section: "🐝 Biology" },
  { q: "How many days does it take a QUEEN to develop from egg to adult?", options: ["16 days", "21 days", "24 days", "14 days"], answer: 0, section: "🐝 Biology" },
  { q: "How many days does it take a DRONE to develop from egg to adult?", options: ["16 days", "21 days", "24 days", "28 days"], answer: 2, section: "🐝 Biology" },
  { q: "What is the Nasanov gland used for?", options: ["Producing alarm pheromone", "Orientation/scent signaling to guide bees home", "Secreting royal jelly", "Producing beeswax"], answer: 1, section: "🐝 Biology" },
  { q: "What is the alarm pheromone chemical in honey bees?", options: ["9-ODA (queen substance)", "Isoamyl acetate (banana scent)", "Geraniol", "Propolis"], answer: 1, section: "🐝 Biology" },
  { q: "What are the pollen baskets on a bee's hind legs called?", options: ["Hamuli", "Spermatheca", "Corbicula", "Proboscis"], answer: 2, section: "🐝 Biology" },
  { q: "What connects the fore and hind wings of a honey bee in flight?", options: ["Corbicula", "Hamuli", "Ocelli", "Johnston's organ"], answer: 1, section: "🐝 Biology" },
  { q: "What organ stores sperm in the queen bee?", options: ["Ovariole", "Spermatheca", "Proventriculus", "Mandibular gland"], answer: 1, section: "🐝 Biology" },
  { q: "What triggers a larva to become a queen instead of a worker?", options: ["Genetics alone", "Being fed royal jelly exclusively throughout larval stage", "Being laid in a larger cell", "Temperature differences in the hive"], answer: 1, section: "🐝 Biology" },
  { q: "How many times can a worker bee sting?", options: ["Multiple times — smooth stinger", "Only once — barbed stinger tears out and kills the bee", "Three times maximum", "Depends on the bee's age"], answer: 1, section: "🐝 Biology" },

  // Behavior
  { q: "What does the WAGGLE DANCE communicate?", options: ["A food source within 50 meters", "A food source farther than 50 meters, with direction and distance", "An alarm signal", "A request for more foragers"], answer: 1, section: "🕺 Behavior" },
  { q: "Swarm cells are built on which part of the frame?", options: ["Center of the comb face", "Top bar of the frame", "Bottom edges of the frames", "Randomly throughout the hive"], answer: 2, section: "🕺 Behavior" },
  { q: "Supersedure cells are located where on the comb?", options: ["Bottom edges of frames", "Middle of the comb face", "Near the top bar", "Outside the brood nest"], answer: 1, section: "🕺 Behavior" },
  { q: "A queen cell with a hole punched in the SIDE means:", options: ["The queen emerged successfully", "A rival queen killed her before she emerged", "The cell was a false alarm cell", "The queen died of disease"], answer: 1, section: "🕺 Behavior" },
  { q: "What is a 'laying worker' colony?", options: ["A colony where workers are especially productive", "A queenless colony where unfertilized workers lay eggs, producing only drones", "A colony raising multiple queens simultaneously", "A colony that produces double the normal honey"], answer: 1, section: "🕺 Behavior" },

  // Pests
  { q: "Varroa mites reproduce in which type of brood?", options: ["Only in queen cells", "Only in open (uncapped) larval cells", "Only in capped brood cells", "On adult bees only"], answer: 2, section: "🔬 Pests" },
  { q: "When is oxalic acid MOST effective against Varroa?", options: ["During peak brood season in spring", "When the colony is broodless (winter)", "Right after honey supers are removed", "Only when combined with formic acid"], answer: 1, section: "🔬 Pests" },
  { q: "What is the most accurate method for monitoring Varroa mite levels?", options: ["Sticky board (natural mite fall)", "Visual inspection of brood", "Alcohol wash / sugar roll", "Counting mites on adult bees by eye"], answer: 2, section: "🔬 Pests" },
  { q: "Which pest causes larvae to be mummified and look like white chalk pellets?", options: ["Sacbrood virus", "European Foulbrood", "Chalkbrood (Ascosphaera apis)", "Nosema ceranae"], answer: 2, section: "🔬 Pests" },
  { q: "Small Hive Beetle larvae damage the hive by:", options: ["Eating adult bees", "Destroying comb and fermenting honey, causing bees to abscond", "Parasitizing the queen", "Spreading American Foulbrood spores"], answer: 1, section: "🔬 Pests" },
  { q: "Which hives are most vulnerable to wax moth damage?", options: ["Strong, populous colonies", "Weak or unoccupied hives", "Hives with screened bottom boards", "Hives treated with oxalic acid"], answer: 1, section: "🔬 Pests" },

  // Disease
  { q: "What test confirms American Foulbrood (AFB)?", options: ["The brood smells like almonds and stretches 2 inches", "A toothpick inserted into the cell pulls out ropy brown material ~1 inch long", "The capping turns white and fluffy", "The larvae turn green inside capped cells"], answer: 1, section: "🏥 Disease" },
  { q: "American Foulbrood (AFB) is caused by:", options: ["A virus (Sacbrood virus)", "A fungus (Ascosphaera apis)", "A bacterium (Paenibacillus larvae) with spores surviving 40+ years", "A microsporidian (Nosema ceranae)"], answer: 2, section: "🏥 Disease" },
  { q: "How should AFB-infected equipment be handled in North Carolina?", options: ["Treat with oxytetracycline (Terramycin) and reuse after 2 weeks", "Burn the infected equipment; it is a REPORTABLE disease in NC", "Freeze the equipment for 2 weeks to kill spores", "Soak in bleach solution, then dry in sun"], answer: 1, section: "🏥 Disease" },
  { q: "What virus is most commonly spread by Varroa mites?", options: ["Sacbrood Virus", "Kashmir Bee Virus", "Deformed Wing Virus (DWV)", "Black Queen Cell Virus"], answer: 2, section: "🏥 Disease" },
  { q: "European Foulbrood (EFB) affects which stage of brood?", options: ["Capped pupae (like AFB)", "Uncapped (younger) larvae", "Only eggs before hatching", "Only adult bees"], answer: 1, section: "🏥 Disease" },

  // Equipment & Management
  { q: "What is the 'bee space'?", options: ["The entrance opening in a Langstroth hive", "3/8 inch — the gap bees leave free; basis of the movable frame hive", "The space between the queen excluder and first super", "1/2 inch gap between frames"], answer: 1, section: "🛠 Equipment" },
  { q: "Who invented the movable-frame Langstroth hive?", options: ["Moses Quinby in 1830", "Karl von Frisch in 1920", "Amos Root in 1875", "Rev. Lorenzo Langstroth in 1851"], answer: 3, section: "🛠 Equipment" },
  { q: "A 1:1 sugar syrup ratio is used for:", options: ["Winter emergency feeding only", "Spring stimulation to encourage brood rearing", "Building up winter stores in fall", "Treating Nosema infections"], answer: 1, section: "🛠 Equipment" },
  { q: "A refractometer is used to measure:", options: ["The number of mites per 100 bees", "Moisture content of honey (must be below 18.6%)", "The pH level of honey", "Propolis purity"], answer: 1, section: "🛠 Equipment" },
  { q: "The queen color-coding system for 2026 uses which color?", options: ["Yellow", "Red", "White", "Green"], answer: 2, section: "🛠 Equipment" },

  // Honey & Products
  { q: "At what moisture percentage will honey ferment?", options: ["Above 20%", "Above 18.6%", "Above 22%", "Above 15%"], answer: 1, section: "🍯 Honey & Products" },
  { q: "What enzyme do bees add to honey that converts sucrose to glucose and fructose?", options: ["Amylase", "Lipase", "Invertase", "Protease"], answer: 2, section: "🍯 Honey & Products" },
  { q: "Which NC honey is considered the most prized and is produced in the mountains?", options: ["Tulip poplar honey", "Clover honey", "Sourwood honey", "Goldenrod honey"], answer: 2, section: "🍯 Honey & Products" },
  { q: "Why should honey never be fed to infants under 1 year old?", options: ["High sugar content damages developing teeth", "Risk of Clostridium botulinum spores causing infant botulism", "The fructose cannot be digested by infant kidneys", "Honey triggers severe allergic reactions in infants"], answer: 1, section: "🍯 Honey & Products" },
  { q: "What hive product is produced by the hypopharyngeal glands?", options: ["Beeswax", "Propolis", "Royal jelly", "Bee venom"], answer: 2, section: "🍯 Honey & Products" },

  // Pesticides & NC Regs
  { q: "Which pesticide formulation is MOST dangerous to honey bees?", options: ["Granules", "Emulsifiable concentrates (coarse spray)", "Dusts / powders", "Microencapsulated formulations"], answer: 2, section: "📋 NC & Pesticides" },
  { q: "In NC, ALL beehives must be registered with:", options: ["NCSBA (NC State Beekeepers Association)", "NCDA&CS (NC Department of Agriculture & Consumer Services)", "USDA local field office", "County Cooperative Extension"], answer: 1, section: "📋 NC & Pesticides" },
  { q: "Which NCDA&CS division conducts hive inspections in NC?", options: ["Food & Drug Protection Division", "Agricultural Statistics Division", "Plant Industry Division (Apiary Inspection Service)", "Veterinary Division"], answer: 2, section: "📋 NC & Pesticides" },
  { q: "The NC Master Beekeeper Program was established in what year?", options: ["1951", "1975", "1982", "1995"], answer: 2, section: "📋 NC & Pesticides" },
  { q: "Who decoded the honey bee waggle dance and won a Nobel Prize in 1973?", options: ["Rev. Lorenzo Langstroth", "Moses Quinby", "Amos Root", "Karl von Frisch"], answer: 3, section: "📋 NC & Pesticides" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const HEX = {
  bg: "#1a0f00",
  card: "#2a1a00",
  amber: "#f59e0b",
  amberLight: "#fcd34d",
  amberDim: "#92400e",
  text: "#fef3c7",
  textMuted: "#d97706",
  green: "#86efac",
  red: "#fca5a5",
  greenBg: "#14532d",
  redBg: "#450a0a",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Nunito:wght@400;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${HEX.bg}; font-family: 'Nunito', sans-serif; }

  .app {
    min-height: 100vh;
    background: radial-gradient(ellipse at top, #2d1500 0%, #1a0f00 60%);
    padding: 24px 16px 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header {
    text-align: center;
    margin-bottom: 28px;
  }

  .header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    color: ${HEX.amberLight};
    letter-spacing: 0.03em;
    text-shadow: 0 0 40px rgba(245,158,11,0.4);
    margin-bottom: 4px;
  }

  .header p {
    color: ${HEX.textMuted};
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .progress-bar-wrap {
    width: 100%;
    max-width: 640px;
    background: #3a2000;
    border-radius: 99px;
    height: 8px;
    margin-bottom: 8px;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, ${HEX.amber}, ${HEX.amberLight});
    border-radius: 99px;
    transition: width 0.4s ease;
  }
  .progress-label {
    width: 100%;
    max-width: 640px;
    display: flex;
    justify-content: space-between;
    color: ${HEX.textMuted};
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    margin-bottom: 20px;
  }

  .card {
    background: ${HEX.card};
    border: 1px solid #3d2200;
    border-radius: 20px;
    width: 100%;
    max-width: 640px;
    padding: 32px 28px 28px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(245,158,11,0.08);
  }

  .section-tag {
    display: inline-block;
    background: rgba(245,158,11,0.12);
    border: 1px solid rgba(245,158,11,0.25);
    color: ${HEX.amber};
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 99px;
    margin-bottom: 16px;
  }

  .question {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    color: ${HEX.text};
    line-height: 1.55;
    margin-bottom: 28px;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .option-btn {
    background: rgba(255,255,255,0.03);
    border: 1.5px solid #3d2200;
    border-radius: 12px;
    color: ${HEX.text};
    font-family: 'Nunito', sans-serif;
    font-size: 0.92rem;
    font-weight: 600;
    padding: 14px 18px;
    cursor: pointer;
    text-align: left;
    transition: all 0.15s ease;
    line-height: 1.4;
  }

  .option-btn:hover:not(:disabled) {
    background: rgba(245,158,11,0.08);
    border-color: ${HEX.amber};
    color: ${HEX.amberLight};
    transform: translateX(3px);
  }

  .option-btn.correct {
    background: rgba(134,239,172,0.1);
    border-color: ${HEX.green};
    color: ${HEX.green};
  }

  .option-btn.wrong {
    background: rgba(252,165,165,0.1);
    border-color: ${HEX.red};
    color: ${HEX.red};
  }

  .option-btn.reveal-correct {
    background: rgba(134,239,172,0.06);
    border-color: rgba(134,239,172,0.5);
    color: ${HEX.green};
  }

  .feedback {
    margin-top: 20px;
    padding: 14px 18px;
    border-radius: 12px;
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.5;
    animation: fadeIn 0.3s ease;
  }
  .feedback.correct {
    background: rgba(134,239,172,0.08);
    border: 1px solid rgba(134,239,172,0.3);
    color: ${HEX.green};
  }
  .feedback.wrong {
    background: rgba(252,165,165,0.08);
    border: 1px solid rgba(252,165,165,0.3);
    color: ${HEX.red};
  }

  .next-btn {
    margin-top: 20px;
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, ${HEX.amber}, #d97706);
    border: none;
    border-radius: 12px;
    color: #1a0f00;
    font-family: 'Nunito', sans-serif;
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
  }
  .next-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 24px rgba(245,158,11,0.4);
  }

  .score-card {
    text-align: center;
    background: ${HEX.card};
    border: 1px solid #3d2200;
    border-radius: 20px;
    width: 100%;
    max-width: 640px;
    padding: 48px 32px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.5);
  }

  .score-emoji { font-size: 3.5rem; margin-bottom: 16px; }

  .score-big {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: ${HEX.amberLight};
    text-shadow: 0 0 40px rgba(245,158,11,0.5);
    margin-bottom: 8px;
  }

  .score-label {
    color: ${HEX.textMuted};
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .score-breakdown {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-bottom: 32px;
  }

  .score-stat { display: flex; flex-direction: column; align-items: center; }
  .score-stat .num { font-size: 1.6rem; font-weight: 800; margin-bottom: 2px; }
  .score-stat .lbl { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${HEX.textMuted}; }
  .score-stat .num.g { color: ${HEX.green}; }
  .score-stat .num.r { color: ${HEX.red}; }

  .retry-btn {
    background: linear-gradient(135deg, ${HEX.amber}, #d97706);
    border: none;
    border-radius: 12px;
    color: #1a0f00;
    font-family: 'Nunito', sans-serif;
    font-size: 0.95rem;
    font-weight: 800;
    padding: 14px 36px;
    cursor: pointer;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition: all 0.2s;
  }
  .retry-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 24px rgba(245,158,11,0.4);
  }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
  .card-anim { animation: fadeIn 0.3s ease; }

  .missed-list {
    margin-top: 28px;
    text-align: left;
    border-top: 1px solid #3d2200;
    padding-top: 24px;
  }
  .missed-list h3 {
    font-family: 'Playfair Display', serif;
    color: ${HEX.red};
    font-size: 1rem;
    margin-bottom: 14px;
  }
  .missed-item {
    background: rgba(252,165,165,0.05);
    border: 1px solid rgba(252,165,165,0.15);
    border-radius: 10px;
    padding: 12px 14px;
    margin-bottom: 8px;
    font-size: 0.82rem;
    color: ${HEX.text};
  }
  .missed-item strong { color: ${HEX.red}; display: block; margin-bottom: 3px; }
  .missed-item span { color: ${HEX.green}; font-weight: 700; }
`;

export default function BeekeeperQuiz() {
  const [deck, setDeck] = useState(() => shuffle(questions));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [missed, setMissed] = useState([]);

  const current = deck[idx];
  const answered = selected !== null;

  const handleSelect = useCallback((i) => {
    if (answered) return;
    setSelected(i);
    if (i === current.answer) {
      setScore(s => s + 1);
    } else {
      setMissed(m => [...m, current]);
    }
  }, [answered, current]);

  const handleNext = () => {
    if (idx + 1 >= deck.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setSelected(null);
    }
  };

  const handleRetry = () => {
    setDeck(shuffle(questions));
    setIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setMissed([]);
  };

  const pct = Math.round((score / deck.length) * 100);
  const pass = pct >= 75;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <h1>🐝 NC Beekeepers Exam</h1>
          <p>Certified Level Practice Quiz</p>
        </div>

        {!done ? (
          <>
            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{ width: `${((idx) / deck.length) * 100}%` }} />
            </div>
            <div className="progress-label">
              <span>Question {idx + 1} of {deck.length}</span>
              <span>✓ {score} correct</span>
            </div>

            <div className="card card-anim" key={idx}>
              <div className="section-tag">{current.section}</div>
              <div className="question">{current.q}</div>
              <div className="options">
                {current.options.map((opt, i) => {
                  let cls = "option-btn";
                  if (answered) {
                    if (i === current.answer) cls += " reveal-correct";
                    if (i === selected && i !== current.answer) cls += " wrong";
                    if (i === selected && i === current.answer) cls = "option-btn correct";
                  }
                  return (
                    <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={answered}>
                      <span style={{ marginRight: 10, opacity: 0.5 }}>{["A","B","C","D"][i]}.</span>{opt}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className={`feedback ${selected === current.answer ? "correct" : "wrong"}`}>
                  {selected === current.answer
                    ? "✓ Correct! Well done."
                    : `✗ The correct answer is: "${current.options[current.answer]}"`}
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
            <div className="score-label">{pass ? "PASSING SCORE — You're ready!" : "Keep studying — 75% needed to pass"}</div>
            <div className="score-breakdown">
              <div className="score-stat">
                <span className="num g">{score}</span>
                <span className="lbl">Correct</span>
              </div>
              <div className="score-stat">
                <span className="num r">{deck.length - score}</span>
                <span className="lbl">Missed</span>
              </div>
              <div className="score-stat">
                <span className="num" style={{color: HEX.amberLight}}>{deck.length}</span>
                <span className="lbl">Total</span>
              </div>
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
