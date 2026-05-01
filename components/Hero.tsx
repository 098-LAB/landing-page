"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

// ── Word-by-word reveal ──────────────────────────────────────────
function WordReveal({
  text,
  className,
  delay = 0,
  inView,
}: {
  text: string;
  className?: string;
  delay?: number;
  inView: boolean;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ marginRight: "0.28em" }}>
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 2 }}
            animate={inView ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 2 }}
            transition={{ duration: 0.75, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ── Lab Interface panel ──────────────────────────────────────────
const PROCESS_STEPS = [
  { label: "01 — UX Research",    status: "done"    },
  { label: "02 — Design System",  status: "done"    },
  { label: "03 — Prototipação",   status: "active"  },
  { label: "04 — Front-end Dev",  status: "pending" },
];

const METRICS = [
  { label: "UX Score", value: "98",  unit: "/100", color: "#00FB64" },
  { label: "A11y",     value: "AA+", unit: "",     color: "#E6FF00" },
  { label: "Perf",     value: "99",  unit: "%",    color: "#00FB64" },
];

// 8×5 grid — deterministic highlight pattern
type CellType = "verde" | "amarelo" | "dim" | "base";
const CELLS: CellType[] = Array.from({ length: 40 }, (_, i) => {
  if ([1, 2, 9, 10, 17, 18, 25].includes(i)) return "verde";
  if ([4, 5, 12, 13, 21, 29].includes(i))    return "amarelo";
  if ([30, 32, 38, 39].includes(i))           return "dim";
  return "base";
});

const CELL_OPACITY: Record<CellType, number> = {
  verde:   0.38,
  amarelo: 0.30,
  dim:     0.09,
  base:    0.05,
};
const CELL_COLOR: Record<CellType, string> = {
  verde:   "#00FB64",
  amarelo: "#E6FF00",
  dim:     "#F1F7F1",
  base:    "#F1F7F1",
};

function LabInterface({ inView }: { inView: boolean }) {
  return (
    <div className="relative">
      {/* Verde glow behind panel */}
      <div
        className="absolute inset-0 scale-110 blur-3xl opacity-[0.12] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 55% 35%, #00FB64, transparent 65%)" }}
        aria-hidden
      />

      {/* Main panel */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.95, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl border border-concreto/40 overflow-hidden"
        style={{
          background: "#181818",
          boxShadow: "0 0 0 1px rgba(0,251,100,0.05), 0 40px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-concreto/25"
          style={{ background: "#131313" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(0,251,100,0.55)" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(230,255,0,0.45)" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(241,247,241,0.18)" }} />
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: "rgba(241,247,241,0.22)" }}>
              098lab.workspace
            </span>
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="flex items-center gap-1.5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-verde" />
            <span className="font-mono text-[9px] tracking-widest text-verde/60">LIVE</span>
          </motion.div>
        </div>

        {/* Canvas: component grid */}
        <div className="p-4 border-b border-concreto/20">
          <div className="grid grid-cols-8 gap-[3px] mb-3">
            {CELLS.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: CELL_OPACITY[type] } : { opacity: 0 }}
                transition={{ delay: 0.9 + i * 0.016, duration: 0.35 }}
                className="aspect-square rounded-[2px]"
                style={{ background: CELL_COLOR[type] }}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-[2px]" style={{ background: "rgba(0,251,100,0.38)" }} />
              <span className="font-mono text-[9px]" style={{ color: "rgba(241,247,241,0.28)" }}>Design</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-[2px]" style={{ background: "rgba(230,255,0,0.30)" }} />
              <span className="font-mono text-[9px]" style={{ color: "rgba(241,247,241,0.28)" }}>Dev</span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="p-4 grid grid-cols-3 gap-2 border-b border-concreto/20">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.25 + i * 0.1 }}
              className="rounded-xl border border-concreto/25 p-3"
              style={{ background: "#131313" }}
            >
              <div className="font-mono text-sm font-bold" style={{ color: m.color }}>
                {m.value}
                <span className="text-[10px] opacity-50">{m.unit}</span>
              </div>
              <div className="font-mono text-[9px] mt-0.5" style={{ color: "rgba(241,247,241,0.35)" }}>
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process steps */}
        <div className="p-4 space-y-2.5">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.5 + i * 0.09 }}
              className="flex items-center gap-2.5"
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background:
                    step.status === "done"    ? "#00FB64" :
                    step.status === "active"  ? "#E6FF00" :
                    "#3E5151",
                }}
              />
              <span
                className="font-mono text-[10px] tracking-wide flex-1"
                style={{
                  color:
                    step.status === "active"  ? "#E6FF00" :
                    step.status === "done"    ? "rgba(241,247,241,0.55)" :
                    "#3E5151",
                }}
              >
                {step.label}
              </span>
              {step.status === "done" && (
                <span className="font-mono text-[9px]" style={{ color: "rgba(0,251,100,0.4)" }}>✓</span>
              )}
              {step.status === "active" && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="font-mono text-[10px] text-amarelo"
                >
                  ▋
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-t border-concreto/20"
          style={{ background: "#131313" }}
        >
          <span className="font-mono text-[9px] tracking-widest" style={{ color: "rgba(241,247,241,0.18)" }}>
            v2.4.1 · production
          </span>
          <div className="flex items-center gap-3">
            {["UI", "Dev", "A11y"].map((tag) => (
              <span key={tag} className="font-mono text-[9px]" style={{ color: "rgba(241,247,241,0.18)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-5 top-10 rounded-xl border border-verde/25 backdrop-blur-md px-3.5 py-2.5"
        style={{ background: "rgba(0,251,100,0.07)" }}
      >
        <div className="font-mono text-sm font-bold text-verde">40+</div>
        <div className="font-mono text-[9px]" style={{ color: "rgba(241,247,241,0.38)" }}>projetos</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-5 bottom-14 rounded-xl border border-amarelo/25 backdrop-blur-md px-3.5 py-2.5"
        style={{ background: "rgba(230,255,0,0.07)" }}
      >
        <div className="font-mono text-sm font-bold text-amarelo">WCAG</div>
        <div className="font-mono text-[9px]" style={{ color: "rgba(241,247,241,0.38)" }}>AA+ certified</div>
      </motion.div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef    = useRef<HTMLDivElement>(null);
  const inView       = useInView(inViewRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY            = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const midY           = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY          = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const scaleOut       = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const invertedSpringX = useTransform(springX, (v) => -v * 0.5);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(((e.clientX - innerWidth / 2) / innerWidth) * 24);
      mouseY.set(((e.clientY - innerHeight / 2) / innerHeight) * 14);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Ghost "098" background */}
      <motion.div
        style={{ y: bgY, x: springX, scale: scaleOut }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-black text-[clamp(16rem,38vw,52rem)] leading-none tracking-tighter text-offwhite/[0.015]">
          098
        </span>
      </motion.div>

      {/* Grid + glow orbs */}
      <motion.div style={{ y: midY }} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              "linear-gradient(#F1F7F1 1px, transparent 1px), linear-gradient(90deg, #F1F7F1 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute top-[10%] right-[4%] w-[28rem] h-[28rem] rounded-full opacity-[0.10]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #00FB64, transparent 70%)" }} />
        </motion.div>
        <motion.div
          style={{ x: invertedSpringX, y: springY }}
          className="absolute bottom-[14%] left-[2%] w-64 h-64 rounded-full opacity-[0.06]"
          animate={{ scale: [1, 1.14, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #E6FF00, transparent 70%)" }} />
        </motion.div>
      </motion.div>

      {/* Main content */}
      <motion.div
        ref={inViewRef}
        style={{ y: textY }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full"
      >
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center">

          {/* LEFT: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-8 bg-verde" />
              <span className="text-verde/70 text-xs font-mono tracking-[0.22em] uppercase">
                UX/UI Design & Desenvolvimento Digital
              </span>
            </motion.div>

            <h1 className="text-[clamp(2rem,4.5vw,4.2rem)] font-black leading-[0.95] tracking-[-0.03em] text-offwhite mb-8 max-w-2xl">
              <span className="block">
                <WordReveal text="Soluções digitais" inView={inView} delay={0.3} />
              </span>
              <span className="block text-verde">
                <WordReveal text="humanas," inView={inView} delay={0.5} />
              </span>
              <span className="block">
                <WordReveal text="acessíveis e" inView={inView} delay={0.64} />
              </span>
              <span className="block">
                <span className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block text-amarelo"
                    initial={{ y: "110%" }}
                    animate={inView ? { y: "0%" } : {}}
                    transition={{ duration: 0.75, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
                  >
                    estratégicas.
                  </motion.span>
                </span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="text-offwhite/50 text-sm md:text-base leading-relaxed max-w-lg font-light mb-10"
            >
              A 098lab une design, tecnologia e visão de negócio para criar
              experiências digitais que geram valor real para{" "}
              <span className="text-offwhite/80 font-normal">pessoas</span>,{" "}
              <span className="text-offwhite/80 font-normal">marcas</span> e{" "}
              <span className="text-offwhite/80 font-normal">startups</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.15 }}
              className="flex flex-wrap gap-3"
            >
              <MagneticButton href="#contato" primary>
                Falar com a 098lab
                <ArrowRight size={15} />
              </MagneticButton>
              <MagneticButton href="#servicos">
                Conhecer serviços
              </MagneticButton>
            </motion.div>
          </div>

          {/* RIGHT: lab interface (desktop only) */}
          <div className="hidden lg:block">
            <LabInterface inView={inView} />
          </div>
        </div>
      </motion.div>

      {/* Scroll-out overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-grafite pointer-events-none"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="text-offwhite/20 text-[10px] tracking-widest uppercase font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7 bg-linear-to-b from-verde/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ── Magnetic CTA button ──────────────────────────────────────────
function MagneticButton({
  children,
  href,
  primary = false,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-colors duration-300 select-none ${
        primary
          ? "bg-verde text-grafite hover:bg-amarelo"
          : "border border-offwhite/20 text-offwhite/70 hover:border-verde/50 hover:text-verde"
      }`}
    >
      {children}
    </motion.a>
  );
}
