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

// ── CUSTOM EASING (Awwwards-Level Physics) ───────────────────────
const customEase = [0.16, 1, 0.3, 1]; // Very smooth, heavy, Apple-like easing

// ── WORD-BY-WORD REVEAL ──────────────────────────────────────────
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
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span 
          key={i} 
          className="inline-block overflow-hidden" 
          style={{ 
            marginRight: "0.08em", 
            paddingBottom: "0.2em",
            paddingTop: "0.1em",
            paddingRight: "0.1em",
            marginLeft: "-0.05em"
          }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "150%", rotate: 8, opacity: 0, filter: "blur(12px)" }}
            animate={inView ? { y: "0%", rotate: 0, opacity: 1, filter: "blur(0px)" } : {}}
            transition={{
              duration: 1.2,
              delay: delay + i * 0.08,
              ease: customEase,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}



// ── HERO COMPONENT ───────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: "-10% 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse physics for parallax elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(((e.clientX - innerWidth / 2) / innerWidth) * 30);
      mouseY.set(((e.clientY - innerHeight / 2) / innerHeight) * 30);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90dvh] flex flex-col justify-center items-center overflow-hidden pt-20 pb-32 md:pt-24 md:pb-40 bg-[#000000] w-full"
    >


      {/* 3. MAIN CONTENT (Cinematic Center) */}
      <motion.div
        ref={inViewRef}
        style={{ y: textY, opacity: opacityFade }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center mt-12"
      >
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.1, ease: customEase }}
          className="flex flex-col items-center mb-4"
        >
          {/* [ 098lab ] scroll-like label */}
          <div className="flex gap-2 text-xs md:text-sm uppercase tracking-widest text-offwhite/50">
            <span>[</span> 098lab <span>]</span>
          </div>
        </motion.div>

        {/* Massive H1 (Max 2 lines) */}
        <h1 className="text-[clamp(2.5rem,7vw,6.5rem)] font-anek-semi font-black leading-[0.80] tracking-[-0.04em] text-offwhite mb-10 w-full max-w-5xl text-center">
          <WordReveal text="Construindo o futuro com" inView={inView} delay={0.2} />
          
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { 
              opacity: 1, 
              scale: 1,
              y: [0, -8, 0],
              rotate: [0, -1, 0]
            } : {}}
            transition={{ 
              initial: { duration: 0.8, delay: 0.8 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="inline-flex items-center ml-2 align-middle"
          >
            <span className="bg-verde text-black px-3 py-1 md:px-4 md:py-1.5 rounded-none shadow-[4px_4px_0px_#E6FF00] text-[0.85em] md:text-[0.9em] tracking-tight leading-none font-bold">
              UI/UX
            </span>
          </motion.span>
        </h1>

        {/* Subtitle / Promise */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, delay: 0.9, ease: customEase }}
          className="text-offwhite/50 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl font-light mb-16"
        >
          Criamos soluções digitais <strong className="text-offwhite font-medium">humanas</strong>,{" "}
          <strong className="text-offwhite font-medium">acessíveis</strong> e{" "}
          <strong className="text-offwhite font-medium">estratégicas</strong> para 
          pessoas, negócios e startups.
        </motion.p>

        {/* CTA Group (Double-Bezel Button Architecture) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.1, ease: customEase }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Primary Double-Bezel Button */}
          <a
            href="#contato"
            className="group relative inline-flex items-center justify-center p-1.5 rounded-full bg-offwhite/5 border border-offwhite/10 hover:border-verde/30 transition-colors duration-500 w-full sm:w-auto"
          >
            <div className="flex items-center gap-3 bg-offwhite text-[#0a0a0a] px-5 py-2.5 rounded-full font-semibold text-sm tracking-wide shadow-[inset_0_1px_1px_rgba(255,255,255,1)] group-hover:bg-verde transition-colors duration-500 w-full justify-center">
              Falar com a 098lab
              <div className="w-6 h-6 rounded-full bg-[#0a0a0a]/10 flex items-center justify-center group-hover:translate-x-1 group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <ArrowRight size={14} className="text-[#0a0a0a]" />
              </div>
            </div>
          </a>

          {/* Secondary Button */}
          <a
            href="#servicos"
            className="group px-8 py-5 rounded-[2rem] text-sm font-medium text-offwhite/60 hover:text-offwhite hover:bg-offwhite/5 transition-all duration-500 w-full sm:w-auto"
          >
            Conhecer serviços
          </a>
        </motion.div>
      </motion.div>

      {/* 4. SCROLL INDICATOR (Tactical) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none hidden sm:flex"
      >
        <div className="flex gap-2 text-[10px] uppercase tracking-widest text-offwhite/30">
          <span>[</span> Scroll <span>]</span>
        </div>
        <div className="w-px h-12 bg-offwhite/10 overflow-hidden relative">
          <motion.div
            className="w-full h-1/2 bg-verde/60"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

