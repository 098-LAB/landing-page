"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const cards = [
    {
      id: "Humano",
      icon: "/assets/icons/asterisco-black.png",
      title: "Pessoas antes de processos",
      text: "Criamos experiências pensadas para pessoas reais, com clareza, acessibilidade e intenção.",
    },
    {
      id: "Estratégico",
      icon: "/assets/icons/codigo-black.png",
      title: "Design com direção",
      text: "Cada interface, fluxo e decisão possui propósito, contexto e visão de negócio.",
    },
    {
      id: "Laboratório",
      icon: "/assets/icons/bar-black.png",
      title: "Construção contínua",
      text: "O 098lab funciona como um laboratório vivo: testamos, refinamos e evoluímos soluções constantemente.",
    },
  ];

  return (
    <section 
      id="sobre" 
      ref={sectionRef} 
      className="py-24 md:py-40 bg-offwhite text-grafite flex flex-col items-center justify-center relative z-10"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-20">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8 max-w-[85ch]"
        >
          <span className="font-mono uppercase tracking-[0.2em] text-sm text-concreto">
            [ sobre ]
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-grafite">
            Acreditamos que produtos digitais não devem apenas funcionar.
            <br />
            <br />
            Eles precisam ser <span className="text-concreto/70">claros</span>, <span className="text-concreto/70">humanos</span> e fazer sentido para quem usa.
          </h2>
        </motion.div>

        {/* Brutalist Grid Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full border-t border-b border-grafite/10"
        >
          {/* Mathematical Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-grafite/10">
            {cards.map((card, index) => (
              <motion.div 
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1), ease: [0.22, 1, 0.36, 1] }}
                className="bg-offwhite flex flex-col p-8 md:p-12 gap-16 relative group overflow-hidden"
              >
                {/* Subtle Hover effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500 pointer-events-none" />

                {/* Card Header */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 relative flex items-center justify-center">
                    <Image 
                      src={card.icon} 
                      alt={card.id} 
                      width={32} 
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-concreto/60">
                    {index + 1}. {card.id}
                  </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-col gap-4 mt-auto relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-grafite">
                    {card.title}
                  </h3>
                  <p className="text-base text-concreto/80 leading-relaxed max-w-[30ch]">
                    {card.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
