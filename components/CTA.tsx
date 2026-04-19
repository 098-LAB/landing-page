"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";

function MagneticButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20 });
  const sy = useSpring(y, { stiffness: 220, damping: 20 });

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.4);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={move}
      onMouseLeave={leave}
      whileTap={{ scale: 0.96 }}
      className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-colors duration-300 select-none ${
        primary
          ? "bg-verde text-grafite hover:bg-amarelo"
          : "border border-offwhite/20 text-offwhite/60 hover:border-verde/50 hover:text-verde"
      }`}
    >
      {children}
    </motion.a>
  );
}

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.1, 0.9]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 0.6]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const words = ["Vamos", "construir", "algo", "extraordinário", "juntos."];

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="py-32 md:py-48 relative overflow-hidden"
    >
      {/* Animated glow orb */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity, y: bgY }}
        className="absolute inset-0 flex items-end justify-center pointer-events-none"
        aria-hidden
      >
        <div
          className="w-175 h-100 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(0,251,100,0.12) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Ghost text parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-black text-[clamp(8rem,22vw,22rem)] leading-none tracking-tighter text-offwhite/[0.014]">
          NOW
        </span>
      </motion.div>

      <div ref={inViewRef} className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-verde/25 bg-verde/5 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-verde animate-pulse" />
          <span className="text-verde text-xs font-medium tracking-[0.18em] uppercase">
            Disponível para novos projetos
          </span>
        </motion.div>

        {/* Headline — word by word stagger */}
        <h2
          className="text-[clamp(2.4rem,6.5vw,6rem)] font-black leading-[0.96] tracking-[-0.03em] text-offwhite mb-8"
          aria-label={words.join(" ")}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden" style={{ marginRight: "0.22em" }}>
              <motion.span
                className={`inline-block ${word === "extraordinário" ? "text-verde" : ""}`}
                initial={{ y: "110%", rotate: 3 }}
                animate={inView ? { y: "0%", rotate: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-offwhite/45 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12 font-light"
        >
          Tem um projeto, uma ideia ou um problema digital para resolver? A 098lab está
          pronta para transformar isso em uma experiência que gera resultado real.
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton href="mailto:contato@098lab.com" primary>
            <Mail size={16} />
            Enviar uma mensagem
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </MagneticButton>
          <MagneticButton href="#servicos">
            Ver serviços
          </MagneticButton>
        </motion.div>

        {/* Micro stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-20 pt-8 border-t border-concreto/20 grid grid-cols-3 gap-6 max-w-sm mx-auto"
        >
          {[
            { value: "100%", label: "Comprometimento" },
            { value: "A11y", label: "Acessível por padrão" },
            { value: "Zero", label: "Vaidade sem propósito" },
          ].map((s) => (
            <div key={s.value} className="text-center">
              <div className="text-verde font-mono text-xs font-bold tracking-widest mb-1">
                {s.value}
              </div>
              <div className="text-offwhite/25 text-[11px] font-light">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
