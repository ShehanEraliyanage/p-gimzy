import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import placeholder from "./assets/couple-placeholder.svg";

const prompts = [
  "Will you marry me?",
  "Are you sure you want to press no?",
  "Think again, Gimzy!",
  "Last chance before the universe votes yes.",
  "Fine, but yes still wins."
];

const HERO_DEFAULT = "/couple.jpg"; // place your photo at public/couple.jpg

function App() {
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [wiggle, setWiggle] = useState(0);
  const [heroSrc, setHeroSrc] = useState<string>(HERO_DEFAULT);
  const [noBursts, setNoBursts] = useState<Array<{ id: number; x: number; drift: number; delay: number }>>([]);

  const question = prompts[step % prompts.length];
  const mischievousShift = useMemo(() => {
    const x = Math.sin(wiggle * 1.6) * 34;
    const y = Math.cos(wiggle * 1.3) * 18;
    return `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  }, [wiggle]);

  const confetti = useMemo(() => {
    if (!accepted) return [] as Array<{ id: number; left: number; delay: number }>;
    return Array.from({ length: 42 }, (_, id) => ({
      id,
      left: Math.random() * 100,
      delay: Math.random() * 0.35
    }));
  }, [accepted]);

  const handleNo = () => {
    const hearts = Array.from({ length: 8 }, (_, idx) => ({
      id: Date.now() + idx,
      x: 10 + Math.random() * 80,
      drift: -20 + Math.random() * 40,
      delay: Math.random() * 0.25
    }));
    setNoBursts((prev) => [...prev, ...hearts].slice(-40));
    setStep((v) => v + 1);
    setWiggle((v) => v + 1);
  };

  const handleYes = () => {
    setAccepted(true);
  };

  const handleImageError = () => {
    setHeroSrc(placeholder);
  };

  return (
    <div className="app-shell">
      <div className="floating-hearts" aria-hidden />
      <header>
        <div className="brand-mark">G</div>
        <div className="title">
          <small>For my once-in-a-lifetime love, Gimzy ❤️</small>
          <span>Gimzy Proposal</span>
        </div>
      </header>

      <div className="card">
        <img src={heroSrc} alt="Us, looking adorable" onError={handleImageError} />
      </div>

      <div className="controls">
        {accepted ? (
          <div className="yes-burst">
            <h2 className="pulse">Yes</h2>
            <p>Lock it in: forever date unlocked. 💍</p>
          </div>
        ) : (
          <>
            <div className="caption">{question}</div>
            <div className="button-row">
              <button className="btn btn-primary" onClick={handleYes}>
                Yes
              </button>
              <button
                className="btn btn-ghost sneaky"
                onClick={handleNo}
                style={{ transform: mischievousShift }}
              >
                No (you sure?)
              </button>
            </div>
            {/* <div className="progress-note">Photo loads from public/couple.jpg (replace with us).</div> */}
          </>
        )}
      </div>

      {!accepted && (
        <div className="no-heart-layer" aria-hidden>
          <AnimatePresence>
            {noBursts.map((heart) => (
              <motion.span
                key={heart.id}
                className="no-heart"
                initial={{ opacity: 0, y: 20, scale: 0.6, x: heart.drift }}
                animate={{ opacity: 1, y: -80, scale: 1 }}
                exit={{ opacity: 0, y: -120 }}
                transition={{ duration: 1.4, delay: heart.delay, ease: "easeOut" }}
                style={{ left: `${heart.x}%` }}
              >
                ❤️
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      )}

      {accepted && (
        <div className="confetti" aria-hidden>
          {confetti.map((piece) => (
            <span
              key={piece.id}
              style={{ left: `${piece.left}%`, animationDelay: `${piece.delay}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
