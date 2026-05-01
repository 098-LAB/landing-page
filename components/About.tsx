"use client";

import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect } from "react";

function CountUp({
  target,
  suffix = "",
  inView,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  inView: boolean;
  delay?: number;
}) {
  const val = useMotionValue(0);
  const spring = useSpring(val, { stiffness: 60, damping: 18 });
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      animate(val, target, { duration: 2, ease: "easeOut" });
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, target, val, delay]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${Math.round(v)}${suffix}`;
      }
    });
  }, [spring, suffix]);

  return <span ref={displayRef}>0{suffix}</span>;
}

const stats = [
  { value: 40, suffix: "+", label: "Projetos entregues", color: "#00C44D" },
  { value: 100, suffix: "%", label: "Comprometimento", color: "#3E5151" },
  { value: 3, suffix: "x", label: "Mais rápido com Design Systems", color: "#00C44D" },
  { value: 0, suffix: "", label: "Vaidade sem propósito", color: "#3E5151" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textX = useTransform(scrollYProgress, [0, 0.5], [-24, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="sobre" ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden bg-white">
      {/* Subtle left border accent */}
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-verde/60 origin-top"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top: eyebrow + headline */}
        <div ref={inViewRef} className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <motion.div style={{ x: textX, opacity }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-verde" />
              <span className="text-concreto text-xs font-mono tracking-[0.22em] uppercase">
                Sobre a 098lab
              </span>
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-[1.02] tracking-tight text-grafite">
              Um laboratório onde{" "}
              <span className="relative">
                <span className="text-verde">design</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-verde/70 origin-left"
                />
              </span>{" "}
              e{" "}
              <span className="text-concreto">tecnologia</span>{" "}
              se encontram.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-grafite/60 text-base md:text-lg leading-relaxed font-light mb-4">
              A 098lab é um laboratório de UX/UI Design e desenvolvimento digital especializado
              em criar produtos e experiências com foco em{" "}
              <span className="text-grafite font-normal">qualidade</span>,{" "}
              <span className="text-grafite font-normal">clareza</span> e{" "}
              <span className="text-grafite font-normal">impacto</span>.
            </p>
            <p className="text-grafite/50 text-sm leading-relaxed font-light">
              Trabalhamos na interseção entre experiência do usuário, design de interfaces,
              acessibilidade e desenvolvimento — transformando necessidades reais em soluções
              que geram resultado.
            </p>
          </motion.div>
        </div>

        {/* Parallax visual strip */}
        

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative border border-concreto/30 rounded-2xl p-6 overflow-hidden hover:border-verde/50 transition-colors duration-500"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 30% 30%, ${stat.color}08, transparent 60%)` }}
              />
              <div
                className="text-5xl font-black tracking-tighter mb-1 tabular-nums"
                style={{ color: stat.color }}
              >
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={statsInView}
                  delay={i * 0.2}
                />
              </div>
              <div className="text-grafite/50 text-xs font-light leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
