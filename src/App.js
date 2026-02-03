import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    const [heroSrc, setHeroSrc] = useState(HERO_DEFAULT);
    const [noBursts, setNoBursts] = useState([]);
    const cardRef = useRef(null);
    const loveNoteRef = useRef(null);
    const yesBurstRef = useRef(null);
    const question = prompts[step % prompts.length];
    const loveNote = loveNotes[step % loveNotes.length];
    const mischievousShift = useMemo(() => {
        const x = Math.sin(wiggle * 1.6) * 34;
        const y = Math.cos(wiggle * 1.3) * 18;
        return `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    }, [wiggle]);
    const confetti = useMemo(() => {
        if (!accepted)
            return [];
        return Array.from({ length: 42 }, (_, id) => ({
            id,
            left: Math.random() * 100,
            delay: Math.random() * 0.35
        }));
    }, [accepted]);
    const yesEmojis = ["💗", "💖", "💘", "💞", "💕", "😘", "💋", "😍"];
    const yesHearts = useMemo(() => {
        if (!accepted)
            return [];
        return Array.from({ length: 48 }, (_, id) => ({
            id,
            left: Math.random() * 100,
            delay: Math.random() * 1.8,
            size: 20 + Math.random() * 24,
            duration: 5 + Math.random() * 3.5,
            emoji: yesEmojis[Math.floor(Math.random() * yesEmojis.length)]
        }));
    }, [accepted]);
    const noEmojis = ["😢", "😭", "🥺"];
    const handleNo = () => {
        const hearts = Array.from({ length: 14 }, (_, idx) => ({
            id: Date.now() + idx,
            x: 10 + Math.random() * 80,
            drift: -20 + Math.random() * 40,
            delay: Math.random() * 0.25,
            emoji: noEmojis[Math.floor(Math.random() * noEmojis.length)]
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
        if (!cardRef.current || !loveNoteRef.current)
            return;
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
        if (!accepted || !yesBurstRef.current)
            return;
        const tl = gsap.timeline();
        tl.fromTo(yesBurstRef.current, { scale: 0.98, boxShadow: "0 0 0 rgba(244, 63, 94, 0)" }, {
            scale: 1.02,
            boxShadow: "0 18px 70px rgba(244, 63, 94, 0.35)",
            duration: 1.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    }, [accepted]);
    return (_jsxs("div", { className: "app-shell", children: [_jsx(HeartsBackground, { intensity: "high" }), _jsx("div", { className: "floating-hearts", "aria-hidden": true }), _jsx("div", { className: "romance-glow", "aria-hidden": true }), _jsxs("header", { children: [_jsx("div", { className: "brand-mark brand-heart", "aria-hidden": true, children: "\u2764\uFE0F" }), _jsxs("div", { className: "title", children: [_jsx("small", { children: "For my once-in-a-lifetime love, Gimzy \u2764\uFE0F" }), _jsx("span", { children: "Gimzy Proposal" })] })] }), _jsx("div", { className: "card", ref: cardRef, children: _jsx("img", { src: heroSrc, alt: "Us, looking adorable", onError: handleImageError }) }), _jsx("div", { className: "controls", children: accepted ? (_jsxs(motion.div, { className: "yes-burst", ref: yesBurstRef, initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut" }, children: [_jsx("h2", { className: "pulse", children: "Yes" }), _jsx("p", { children: "Lock it in: forever date unlocked. \uD83D\uDC8D" }), _jsx("p", { className: "love-vow flicker", children: "I can\u2019t wait to spend forever with you." })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "caption", children: question }), _jsxs("div", { className: "button-row", children: [_jsx("button", { className: "btn btn-primary", onClick: handleYes, children: "Yes" }), _jsx("button", { className: "btn btn-ghost sneaky", onClick: handleNo, style: { transform: mischievousShift }, children: "No (you sure?)" })] })] })) }), _jsxs("div", { className: "love-note", ref: loveNoteRef, children: [_jsx("span", { className: "love-note__label", children: "Little love note" }), _jsx("p", { children: accepted ? "Forever starts now. Hold my hand and never let go." : loveNote })] }), !accepted && (_jsx("div", { className: "no-heart-layer", "aria-hidden": true, children: _jsx(AnimatePresence, { children: noBursts.map((heart) => (_jsx(motion.span, { className: "no-heart", initial: { opacity: 0, y: 20, scale: 0.6, x: heart.drift }, animate: { opacity: 1, y: -80, scale: 1 }, exit: { opacity: 0, y: -120 }, transition: { duration: 1.4, delay: heart.delay, ease: "easeOut" }, style: { left: `${heart.x}%` }, children: heart.emoji }, heart.id))) }) })), accepted && (_jsx("div", { className: "yes-hearts", "aria-hidden": true, children: yesHearts.map((heart) => (_jsx("span", { className: "yes-heart", style: {
                        left: `${heart.left}%`,
                        fontSize: `${heart.size}px`,
                        animationDelay: `${heart.delay}s`,
                        animationDuration: `${heart.duration}s`
                    }, children: heart.emoji }, heart.id))) })), accepted && (_jsx("div", { className: "confetti", "aria-hidden": true, children: confetti.map((piece) => (_jsx("span", { style: { left: `${piece.left}%`, animationDelay: `${piece.delay}s` } }, piece.id))) }))] }));
}
export default App;
