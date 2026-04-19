"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search, Paintbrush, Code2, Accessibility } from "lucide-react";

const features = [
  {
    index: "01",
    icon: Search,
    title: "Pesquisa profunda antes de qualquer pixel.",
    description:
      "Todo projeto começa com investigação. Entrevistamos usuários, mapeamos jornadas e analisamos contextos para garantir que o design parte de insights reais — não de suposições.",
    highlight: "UX Research & Strategy",
    color: "#00FB64",
    bg: "from-verde/8 to-transparent",
    metric: "100%",
    metricLabel: "Baseado em dados",
  },
  {
    index: "02",
    icon: Paintbrush,
    title: "Interfaces que comunicam antes de explicar.",
    description:
      "Design visual que vai além da estética. Criamos hierarquias claras, sistemas coerentes e interfaces que guiam o usuário com naturalidade e sem esforço cognitivo.",
    highlight: "UI Design & Design Systems",
    color: "#E6FF00",
    bg: "from-amarelo/8 to-transparent",
    metric: "A11y",
    metricLabel: "Acessível por padrão",
  },
  {
    index: "03",
    icon: Code2,
    title: "Do Figma ao código sem perdas de fidelidade.",
    description:
      "Implementamos o que foi desenhado. Com Next.js, Tailwind e atenção obsessiva ao detalhe, o produto final reflete exatamente a visão do design — responsivo, performático e limpo.",
    highlight: "Front-end Development",
    color: "#00FB64",
    bg: "from-verde/8 to-transparent",
    metric: "0",
    metricLabel: "Problemas de fidelidade",
  },
  {
    index: "04",
    icon: Accessibility,
    title: "Acessibilidade como ponto de partida, não de chegada.",
    description:
      "Projetamos para todas as pessoas desde a primeira decisão. WCAG, contraste, navegação por teclado, leitores de tela — não são checklist: são princípios que definem como trabalhamos.",
    highlight: "Acessibilidade Digital",
    color: "#E6FF00",
    bg: "from-amarelo/8 to-transparent",
    metric: "WCAG",
    metricLabel: "Conformidade 2.2",
  },
];

export default function StickyFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Map scroll progress → feature index */
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * features.length), features.length - 1);
      setActive(idx);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  /* Visual number scroll */
  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, features.length]);
  const smoothProgress = useSpring(rawProgress, { stiffness: 80, damping: 20 });
  const progressWidth = useTransform(smoothProgress, [0, features.length], ["0%", "100%"]);

  const feature = features[active];
  const Icon = feature.icon;

  return (
    /* Tall section = scroll distance per feature × number of features */
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${features.length * 100}vh` }}
      id="diferenciais"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 min-h-dvh flex flex-col overflow-hidden">
        {/* Background color transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: `radial-gradient(ellipse 70% 60% at 70% 50%, ${feature.color}09 0%, transparent 70%)`,
            }}
          />
        </AnimatePresence>

        {/* Progress bar */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-concreto/20 z-20">
          <motion.div
            className="h-full bg-verde"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Layout */}
        <div className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-16 items-center py-24">
          {/* LEFT — content */}
          <div className="relative z-10">
            {/* Feature counter nav */}
            <div className="flex items-center gap-3 mb-10">
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const el = sectionRef.current;
                    if (!el) return;
                    const top = el.getBoundingClientRect().top + window.scrollY;
                    const h = el.offsetHeight;
                    const target = top + (i / features.length) * h + 10;
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }}
                  className={`h-0.5 rounded-full transition-all duration-500 ${
                    i === active ? "bg-verde w-8" : "bg-concreto/40 w-4"
                  }`}
                  aria-label={`Feature ${i + 1}`}
                />
              ))}
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-verde/50 font-mono text-xs ml-2"
                >
                  {feature.index} / 0{features.length}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Tag */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${active}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.45 }}
                className="flex items-center gap-2.5 mb-6"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${feature.color}18` }}
                >
                  <Icon size={15} style={{ color: feature.color }} />
                </div>
                <span
                  className="text-xs font-medium tracking-[0.16em] uppercase"
                  style={{ color: `${feature.color}90` }}
                >
                  {feature.highlight}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Title */}
            <div className="overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`title-${active}`}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-60%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[clamp(1.75rem,3.8vw,3rem)] font-bold leading-tight tracking-tight text-offwhite"
                >
                  {feature.title}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${active}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="text-offwhite/50 text-base md:text-lg leading-relaxed font-light"
              >
                {feature.description}
              </motion.p>
            </AnimatePresence>

            {/* Metric */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`metric-${active}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-10 inline-flex items-center gap-4 px-5 py-3 rounded-xl border"
                style={{ borderColor: `${feature.color}25`, background: `${feature.color}06` }}
              >
                <span
                  className="font-mono text-2xl font-black tracking-tight"
                  style={{ color: feature.color }}
                >
                  {feature.metric}
                </span>
                <span className="text-offwhite/40 text-sm font-light">{feature.metricLabel}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — large visual number */}
          <div className="relative hidden lg:flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-${active}`}
                initial={{ scale: 0.88, opacity: 0, rotate: -4 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 1.1, opacity: 0, rotate: 4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-center justify-center"
              >
                {/* Ghost number */}
                <span
                  className="font-black text-[22rem] leading-none tracking-tighter select-none pointer-events-none"
                  style={{ color: `${feature.color}0a` }}
                  aria-hidden
                >
                  {feature.index}
                </span>

                {/* Center card */}
                <div
                  className="absolute flex flex-col items-center justify-center gap-4 w-56 h-56 rounded-3xl border backdrop-blur-sm"
                  style={{
                    borderColor: `${feature.color}20`,
                    background: `${feature.color}06`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: `${feature.color}15` }}
                  >
                    <Icon size={28} style={{ color: feature.color }} />
                  </div>
                  <div className="text-center px-4">
                    <div
                      className="font-mono text-xs font-bold tracking-widest uppercase mb-1"
                      style={{ color: feature.color }}
                    >
                      {feature.metric}
                    </div>
                    <div className="text-offwhite/40 text-xs">{feature.metricLabel}</div>
                  </div>
                </div>

                {/* Orbit dots */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      background: feature.color,
                      top: `${50 + 44 * Math.sin((deg * Math.PI) / 180)}%`,
                      left: `${50 + 44 * Math.cos((deg * Math.PI) / 180)}%`,
                      opacity: 0.18 + i * 0.05,
                    }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.18 + i * 0.05, 0.4, 0.18 + i * 0.05] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom hint */}
        <div className="pb-6 flex justify-center">
          <motion.span
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-offwhite/30 text-xs font-mono tracking-widest"
          >
            scroll para continuar
          </motion.span>
        </div>
      </div>
    </section>
  );
}
