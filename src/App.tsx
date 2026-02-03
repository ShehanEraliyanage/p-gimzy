import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import placeholder from "./assets/couple-placeholder.svg";
import HeartsBackground from "./HeartsBackground";

const prompts = [
  "Will you marry me?",
  "Are you sure you want to press no?",
  "Think again, Gimzy!",
  "Your forever starts right here.",
  "Last chance before the universe votes yes.",
  "Fine, but yes still wins."
];

const loveNotes = [
  "Every heartbeat says your name.",
  "You are my favorite forever.",
  "Let’s write the sweetest story together.",
  "Home is wherever your hand is in mine.",
  "One day, every day, always you."
];

const HERO_DEFAULT = `${import.meta.env.BASE_URL}couple.jpg`; // place your photo at public/couple.jpg

function App() {
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [wiggle, setWiggle] = useState(0);
  const [heroSrc, setHeroSrc] = useState<string>(HERO_DEFAULT);
  const [noBursts, setNoBursts] = useState<Array<{ id: number; x: number; drift: number; delay: number }>>([]);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const loveNoteRef = useRef<HTMLDivElement | null>(null);
  const yesBurstRef = useRef<HTMLDivElement | null>(null);

  const question = prompts[step % prompts.length];
  const loveNote = loveNotes[step % loveNotes.length];
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

  const yesEmojis = ["💗", "💖", "💘", "💞", "💕", "😘", "💋", "😍"];
  const yesHearts = useMemo(() => {
    if (!accepted)
      return [] as Array<{
        id: number;
        left: number;
        delay: number;
        size: number;
        duration: number;
        emoji: string;
      }>;
    return Array.from({ length: 22 }, (_, id) => ({
      id,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      size: 16 + Math.random() * 20,
      duration: 3 + Math.random() * 2.8,
      emoji: yesEmojis[Math.floor(Math.random() * yesEmojis.length)]
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

  useEffect(() => {
    if (!cardRef.current || !loveNoteRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(cardRef.current, {
        y: -6,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
      gsap.to(loveNoteRef.current, {
        y: 6,
        duration: 5.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!accepted || !yesBurstRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(
      yesBurstRef.current,
      { scale: 0.98, boxShadow: "0 0 0 rgba(244, 63, 94, 0)" },
      {
        scale: 1.02,
        boxShadow: "0 18px 70px rgba(244, 63, 94, 0.35)",
        duration: 1.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }
    );
  }, [accepted]);

  return (
    <div className="app-shell">
      <HeartsBackground intensity="high" />
      <div className="floating-hearts" aria-hidden />
      <div className="romance-glow" aria-hidden />
      <header>
        <div className="brand-mark brand-heart" aria-hidden>
          ❤️
        </div>
        <div className="title">
          <small>For my once-in-a-lifetime love, Gimzy ❤️</small>
          <span>Gimzy Proposal</span>
        </div>
      </header>

      <div className="card" ref={cardRef}>
        <img src={heroSrc} alt="Us, looking adorable" onError={handleImageError} />
      </div>

      <div className="controls">
        {accepted ? (
          <motion.div
            className="yes-burst"
            ref={yesBurstRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="pulse">Yes</h2>
            <p>Lock it in: forever date unlocked. 💍</p>
            <p className="love-vow flicker">I can’t wait to spend forever with you.</p>
          </motion.div>
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

      <div className="love-note" ref={loveNoteRef}>
        <span className="love-note__label">Little love note</span>
        <p>{accepted ? "Forever starts now. Hold my hand and never let go." : loveNote}</p>
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
        <div className="yes-hearts" aria-hidden>
          {yesHearts.map((heart) => (
            <span
              key={heart.id}
              className="yes-heart"
              style={{
                left: `${heart.left}%`,
                fontSize: `${heart.size}px`,
                animationDelay: `${heart.delay}s`,
                animationDuration: `${heart.duration}s`
              }}
            >
              {heart.emoji}
            </span>
          ))}
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
