"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const items = [
  "Responsabilidade",
  "Respeito",
  "Satisfação do Cliente",
  "UX Research",
  "UI Design",
  "Design Systems",
  "Acessibilidade",
  "Dev Front-end",
  "Produtos Digitais",
  "Estratégia",
];

function Strip({
  direction = 1,
  speed = 28,
  accent = false,
}: {
  direction?: 1 | -1;
  speed?: number;
  accent?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="flex gap-0 whitespace-nowrap w-max"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-4 px-6 text-sm font-medium tracking-[0.12em] uppercase ${
              accent
                ? "text-grafite"
                : "text-offwhite/40 hover:text-verde transition-colors duration-300"
            }`}
          >
            {item}
            <span
              className={`inline-block w-1 h-1 rounded-full flex-shrink-0 ${
                accent ? "bg-grafite/40" : "bg-verde/40"
              }`}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <div ref={ref} className="relative z-50 h-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-full -translate-y-1/2 overflow-visible">
        <motion.div 
          style={{ rotate }} 
          className="flex flex-col gap-0 pointer-events-auto "
        >
          <div className="py-4 md:py-5 bg-black border-t border-offwhite/5">
            <Strip direction={1} speed={30} />
          </div>
          <div className="py-4 md:py-5 bg-verde  relative z-10">
            <Strip direction={-1} speed={24} accent />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
