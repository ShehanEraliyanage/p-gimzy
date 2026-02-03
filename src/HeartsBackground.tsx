import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";
import type { ISourceOptions } from "@tsparticles/engine";

interface Props {
  intensity?: "low" | "medium" | "high";
}

export default function HeartsBackground({ intensity = "medium" }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const particleCount = intensity === "high" ? 70 : intensity === "medium" ? 40 : 20;

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      fpsLimit: 60,
      particles: {
        number: { value: particleCount, density: { enable: true } },
        color: { value: ["#f43f5e", "#fb7185", "#fda4af", "#ff6b81"] },
        shape: {
          type: "char",
          options: {
            char: {
              value: ["❤", "💕", "💖", "💗", "💓"],
              font: "Segoe UI Emoji",
              style: "",
              weight: "400",
              fill: true
            }
          }
        },
        opacity: {
          value: { min: 0.3, max: 0.9 },
          animation: { enable: true, speed: 0.6, startValue: "random", sync: false }
        },
        size: {
          value: { min: 10, max: 24 },
          animation: { enable: true, speed: 2, startValue: "random", sync: false }
        },
        move: {
          enable: true,
          speed: { min: 0.6, max: 2 },
          direction: "top" as const,
          outModes: { default: "out" as const },
          random: true,
          straight: false
        },
        rotate: {
          value: { min: 0, max: 360 },
          animation: { enable: true, speed: 6, sync: false }
        },
        wobble: {
          enable: true,
          distance: 12,
          speed: 4
        }
      },
      detectRetina: true
    }),
    [particleCount]
  );

  if (!ready) return null;

  return <Particles id="hearts-bg" options={options} />;
}
