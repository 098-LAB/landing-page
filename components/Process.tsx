"use client";

import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { useRef } from "react";
import { Compass, Map, Pen, Terminal, FlaskConical, RefreshCw } from "lucide-react";

const steps = [
  { number: "01", icon: Compass, title: "Descoberta", description: "Imersão no contexto. Entendemos o negócio, os usuários e as oportunidades reais antes de escrever qualquer linha." },
  { number: "02", icon: Map, title: "Estratégia", description: "Objetivos, princípios de design e roadmap definidos. Planejamos antes de executar — sempre." },
  { number: "03", icon: Pen, title: "Design", description: "Do wireframe ao protótipo de alta fidelidade. Iteramos rápido, alinhamos e refinamos até acertar." },
  { number: "04", icon: Terminal, title: "Desenvolvimento", description: "Código limpo, semântico e performático. Design implementado com fidelidade, responsividade e acessibilidade." },
  { number: "05", icon: FlaskConical, title: "Validação", description: "Testes com usuários reais, revisões técnicas e análise de resultados. Validamos antes de considerar pronto." },
  { number: "06", icon: RefreshCw, title: "Evolução", description: "Produto entregue não é projeto encerrado. Monitoramos, coletamos feedback e evoluímos com o negócio." },
];

function StepCard({
  step,
  index,
  total,
}: {
  step: (typeof steps)[0];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Connector line to next step (not on last) */}
      {index < total - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute top-7 left-[calc(100%+8px)] -right-2 h-px bg-verde/20 origin-left z-10"
          style={{ width: "calc(100% - 56px)" }}
        />
      )}

      {/* Icon circle */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="relative w-14 h-14 rounded-full border border-concreto/40 flex items-center justify-center mb-5 group-hover:border-verde/50 transition-colors duration-400 bg-concreto/10"
      >
        {/* Active ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          className="absolute inset-0 rounded-full border border-verde/0 group-hover:border-verde/25 transition-colors duration-400"
        />
        <Icon
          size={18}
          className="text-offwhite/40 group-hover:text-verde transition-colors duration-400"
        />
        {/* Step number badge */}
        <motion.span
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, delay: index * 0.1 + 0.45 }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-verde text-grafite text-[9px] font-black flex items-center justify-center"
        >
          {index + 1}
        </motion.span>
      </motion.div>

      <h3 className="text-offwhite font-bold text-sm mb-2 tracking-tight">{step.title}</h3>
      <p className="text-offwhite/35 text-xs leading-relaxed font-light">{step.description}</p>
    </motion.div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-80px" });
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  /* SVG line progress */
  const rawPathLen = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);
  const pathLen = useSpring(rawPathLen, { stiffness: 60, damping: 22 });

  /* Parallax ghost word */
  const ghostY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section id="processo" ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden">
      {/* Ghost word parallax */}
      <motion.div
        style={{ y: ghostY }}
        className="absolute left-0 top-1/4 pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-black text-[12rem] leading-none tracking-tighter text-offwhite/[0.016]">
          PROCESSO
        </span>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-verde" />
              <span className="text-verde/70 text-xs font-mono tracking-[0.22em] uppercase">Processo</span>
            </div>
            <h2 className="text-[clamp(1.8rem,3.8vw,3rem)] font-black leading-tight tracking-tight text-offwhite max-w-xl">
              Como trabalhamos,{" "}
              <span className="text-verde">etapa a etapa</span>.
            </h2>
          </motion.div>

          {/* SVG progress line (desktop) */}
          <div className="hidden lg:block mt-10 relative h-0.5">
            <div className="absolute inset-0 bg-concreto/20 rounded-full" />
            <motion.div
              className="absolute inset-y-0 left-0 bg-verde rounded-full"
              style={{ scaleX: pathLen, transformOrigin: "left" }}
            />
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} total={steps.length} />
          ))}
        </div>

        {/* Quote */}
        <div ref={quoteRef} className="mt-20 pt-10 border-t border-concreto/20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row items-start md:items-center gap-8"
          >
            <motion.blockquote
              className="text-offwhite/40 text-xl md:text-2xl font-light italic max-w-2xl leading-relaxed"
            >
              "Um processo claro não limita a criatividade —{" "}
              <motion.span
                initial={{ color: "rgba(241,247,241,0.4)" }}
                animate={quoteInView ? { color: "rgba(241,247,241,0.85)" } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="not-italic font-semibold"
              >
                ele cria as condições para ela acontecer
              </motion.span>
              ."
            </motion.blockquote>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={quoteInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="md:ml-auto shrink-0 flex flex-col items-center gap-1"
            >
              <div className="w-10 h-10 rounded-full border border-verde/30 flex items-center justify-center bg-verde/5">
                <span className="text-verde font-mono text-[11px] font-bold">098</span>
              </div>
              <span className="text-offwhite/25 font-mono text-[10px] tracking-widest">lab</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
