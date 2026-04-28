"use client";

import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Compass, Map, Pen, Terminal, FlaskConical, RefreshCw } from "lucide-react";

const steps = [
  { icon: Compass, title: "Descoberta", description: "Imersão no contexto. Entendemos o negócio, os usuários e as oportunidades reais antes de escrever qualquer linha." },
  { icon: Map, title: "Estratégia", description: "Objetivos, princípios de design e roadmap definidos. Planejamos antes de executar — sempre." },
  { icon: Pen, title: "Design", description: "Do wireframe ao protótipo de alta fidelidade. Iteramos rápido, alinhamos e refinamos até acertar." },
  { icon: Terminal, title: "Desenvolvimento", description: "Código limpo, semântico e performático. Design implementado com fidelidade, responsividade e acessibilidade." },
  { icon: FlaskConical, title: "Validação", description: "Testes com usuários reais, revisões técnicas e análise de resultados. Validamos antes de considerar pronto." },
  { icon: RefreshCw, title: "Evolução", description: "Produto entregue não é projeto encerrado. Monitoramos, coletamos feedback e evoluímos com o negócio." },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const quoteInView = useInView(quoteRef, { once: true, margin: "-80px" });

  const [activeCount, setActiveCount] = useState(0);

  // Section height = (steps + 1) * 100vh → 700vh total, 600vh scrollable, 100vh per step
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Step i activates at progress = i / steps.length
    const count = Math.floor(latest * steps.length) + 1;
    setActiveCount(Math.min(count, steps.length));
  });

  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <>
      {/* Tall container that creates scroll room */}
      <div
        ref={sectionRef}
        style={{ height: `${(steps.length + 1) * 100}vh` }}
        className="relative"
      >
        {/* Sticky panel that stays locked in viewport */}
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-16">
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

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
            {/* Header */}
            <div ref={headRef} className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-verde" />
                  <span className="text-verde/70 text-xs font-mono tracking-[0.22em] uppercase">Processo</span>
                </div>
                <div className="flex items-end justify-between gap-6 flex-wrap">
                  <h2 className="text-[clamp(1.8rem,3.8vw,3rem)] font-black leading-tight tracking-tight text-offwhite max-w-xl">
                    Como trabalhamos,{" "}
                    <span className="text-verde">etapa a etapa</span>.
                  </h2>
                  {/* Progress indicator */}
                  <span className="text-offwhite/25 font-mono text-xs tabular-nums">
                    {String(activeCount).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Steps grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i < activeCount;
                return (
                  <div key={step.title} className="relative">
                    {/* Icon circle */}
                    <div
                      className={`relative w-14 h-14 rounded-full flex items-center justify-center mb-5 border transition-all duration-500 ${
                        isActive
                          ? "bg-verde border-verde"
                          : "bg-concreto/10 border-concreto/40"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`transition-colors duration-500 ${
                          isActive ? "text-grafite" : "text-offwhite/30"
                        }`}
                      />
                      <span
                        className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center transition-colors duration-500 ${
                          isActive ? "bg-grafite text-verde" : "bg-concreto/60 text-offwhite/40"
                        }`}
                      >
                        {i + 1}
                      </span>
                    </div>

                    <h3
                      className={`font-bold text-sm mb-2 tracking-tight transition-colors duration-500 ${
                        isActive ? "text-offwhite" : "text-offwhite/30"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed font-light transition-colors duration-500 ${
                        isActive ? "text-offwhite/50" : "text-offwhite/15"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            <div ref={quoteRef} className="mt-14 pt-8 border-t border-concreto/20">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={quoteInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col md:flex-row items-start md:items-center gap-8"
              >
                <blockquote className="text-offwhite/40 text-xl md:text-2xl font-light italic max-w-2xl leading-relaxed">
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
                </blockquote>
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
        </div>
      </div>
    </>
  );
}
