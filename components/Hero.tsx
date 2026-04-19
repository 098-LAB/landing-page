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
          style={{ marginRight: "0.28em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 2 }}
            animate={inView ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 2 }}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* Parallax layers at different depths */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const scaleOut = useTransform(scrollYProgress, [0, 0.5], [1, 1.06]);

  /* Mouse parallax */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(((e.clientX - innerWidth / 2) / innerWidth) * 32);
      mouseY.set(((e.clientY - innerHeight / 2) / innerHeight) * 18);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh flex flex-col justify-end pb-20 overflow-hidden"
    >
      {/* ── Deep BG layer: large "098" ghost number ── */}
      <motion.div
        style={{ y: bgY, x: springX, scale: scaleOut }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="font-black text-[clamp(18rem,42vw,56rem)] leading-none tracking-tighter text-offwhite/[0.018] select-none"
          aria-hidden
        >
          098
        </span>
      </motion.div>

      {/* ── Mid layer: grid + glow circles ── */}
      <motion.div
        style={{ y: midY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-[0.032]"
          style={{
            backgroundImage:
              "linear-gradient(#F1F7F1 1px, transparent 1px), linear-gradient(90deg, #F1F7F1 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute top-[15%] right-[8%] w-72 h-72 rounded-full opacity-[0.12]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <div
            className="w-full h-full rounded-full"
            style={{ background: "radial-gradient(circle, #00FB64, transparent 70%)" }}
          />
        </motion.div>
        <motion.div
          style={{ x: useTransform(springX, (v) => -v * 0.6), y: springY }}
          className="absolute bottom-[20%] left-[5%] w-52 h-52 rounded-full opacity-[0.07]"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          aria-hidden
        >
          <div
            className="w-full h-full rounded-full"
            style={{ background: "radial-gradient(circle, #E6FF00, transparent 70%)" }}
          />
        </motion.div>
      </motion.div>

      {/* ── FG layer: floating status pill ── */}
      <motion.div
        style={{ y: fgY, x: useTransform(springX, (v) => v * 0.4) }}
        className="absolute top-28 right-6 md:right-16 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-verde/25 bg-verde/[0.06] backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-verde animate-pulse" />
          <span className="text-verde text-[11px] font-medium tracking-[0.18em] uppercase">
            Laboratório Digital
          </span>
        </motion.div>
      </motion.div>

      {/* ── Floating year tag ── */}
      <motion.div
        style={{ y: useTransform(midY, (v) => `calc(${v} + 0px)`) }}
        className="absolute top-28 left-6 md:left-16 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span className="text-offwhite/20 font-mono text-xs tracking-[0.25em]">EST. 2024</span>
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        ref={inViewRef}
        style={{ y: textY }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 mb-7"
        >
          <div className="h-px w-8 bg-verde" />
          <span className="text-verde/70 text-xs font-mono tracking-[0.22em] uppercase">
            UX/UI Design & Desenvolvimento Digital
          </span>
        </motion.div>

        {/* Headline — word by word */}
        <h1 className="text-[clamp(2.8rem,7.5vw,7rem)] font-black leading-[0.96] tracking-[-0.03em] text-offwhite mb-8 max-w-5xl">
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

        {/* Sub + CTAs side by side */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="text-offwhite/50 text-base md:text-lg leading-relaxed max-w-lg font-light"
          >
            A 098lab une design, tecnologia e visão de negócio para criar
            experiências digitais que geram valor real para{" "}
            <span className="text-offwhite/80 font-normal">pessoas</span>,{" "}
            <span className="text-offwhite/80 font-normal">marcas</span> e{" "}
            <span className="text-offwhite/80 font-normal">startups</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="flex flex-wrap gap-3 lg:ml-auto flex-shrink-0"
          >
            <MagneticButton
              href="#contato"
              primary
            >
              Falar com a 098lab
              <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton href="#servicos">
              Conhecer serviços
            </MagneticButton>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 pt-6 border-t border-concreto/25 grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {[
            { value: "UX First", label: "Centrado no usuário" },
            { value: "A11y+", label: "Acessível por padrão" },
            { value: "Design+Dev", label: "Integrado e consistente" },
            { value: "Estratégia", label: "Com propósito e resultado" },
          ].map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4 + i * 0.08 }}
              className="group"
            >
              <div className="text-verde font-mono text-xs font-bold tracking-widest mb-1 group-hover:text-amarelo transition-colors duration-300">
                {s.value}
              </div>
              <div className="text-offwhite/30 text-xs font-light">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll out overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-grafite pointer-events-none"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
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

/* ── Magnetic CTA button ── */
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
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

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
