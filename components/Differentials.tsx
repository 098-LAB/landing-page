"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Telescope, UserCheck, Accessibility, Merge, Users2, CheckCircle } from "lucide-react";

const items = [
  {
    icon: Telescope,
    title: "Visão estratégica",
    description: "Não entregamos apenas design. Entregamos soluções pensadas para o negócio, o produto e os usuários ao mesmo tempo.",
  },
  {
    icon: UserCheck,
    title: "Design centrado no usuário",
    description: "Cada decisão é embasada em pesquisa, dados e empatia. O usuário está no centro de todo o processo.",
  },
  {
    icon: Accessibility,
    title: "Acessibilidade como prioridade",
    description: "Projetamos para todas as pessoas, desde o início. Acessibilidade não é ajuste final — é fundação.",
  },
  {
    icon: Merge,
    title: "Design + Desenvolvimento unidos",
    description: "Uma equipe que pensa em design e escreve código. Menos ruído, mais fidelidade, melhor resultado.",
  },
  {
    icon: Users2,
    title: "Processo colaborativo",
    description: "Trabalhamos com o cliente, não para o cliente. Cada etapa é transparente, iterativa e validada em conjunto.",
  },
  {
    icon: CheckCircle,
    title: "Compromisso com qualidade",
    description: "Cada entrega passa por revisão criteriosa. Não enviamos trabalho mediano. Nunca.",
  },
];

export default function Differentials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00FB64 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-verde/80 text-xs font-mono tracking-[0.2em] uppercase">Diferenciais</span>
            <div className="h-px flex-1 max-w-12 bg-verde/30" />
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight text-offwhite max-w-2xl">
            Por que trabalhar com a 098lab?
          </h2>
        </motion.div>

        {/* Asymmetric layout: 2-col on left + 1 tall card on right */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left 2-col grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {items.slice(0, 4).map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group border border-concreto/30 bg-concreto/10 rounded-2xl p-6 hover:border-verde/30 hover:bg-verde/5 transition-all duration-400"
                >
                  <div className="w-9 h-9 rounded-lg bg-verde/10 flex items-center justify-center mb-4 group-hover:bg-verde/20 transition-colors duration-300">
                    <Icon size={16} className="text-verde" />
                  </div>
                  <h3 className="text-offwhite font-semibold text-sm mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-offwhite/40 text-xs leading-relaxed font-light">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {items.slice(4).map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="group border border-concreto/30 bg-concreto/10 rounded-2xl p-6 hover:border-amarelo/30 hover:bg-amarelo/5 transition-all duration-400 flex-1"
                >
                  <div className="w-9 h-9 rounded-lg bg-amarelo/10 flex items-center justify-center mb-4 group-hover:bg-amarelo/20 transition-colors duration-300">
                    <Icon size={16} className="text-amarelo" />
                  </div>
                  <h3 className="text-offwhite font-semibold text-sm mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-offwhite/40 text-xs leading-relaxed font-light">{item.description}</p>
                </motion.div>
              );
            })}

            {/* CTA card */}
            <motion.a
              href="#contato"
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="group border border-verde/30 bg-verde/5 rounded-2xl p-6 hover:bg-verde/10 hover:border-verde/50 transition-all duration-400 flex items-center justify-between"
            >
              <span className="text-verde font-semibold text-sm">Vamos conversar?</span>
              <span className="w-8 h-8 rounded-full bg-verde/10 flex items-center justify-center group-hover:bg-verde/20 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="#00FB64" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
