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
import {
  Search,
  Target,
  Paintbrush,
  LayoutGrid,
  Layers,
  Code2,
  Globe,
  Smartphone,
  Accessibility,
} from "lucide-react";

const services = [
  { icon: Search, title: "UX Research", description: "Investigação do contexto, comportamentos e necessidades dos usuários para embasar decisões com dados reais.", tag: "Estratégia", accent: "#00FB64" },
  { icon: Target, title: "UX Strategy", description: "Diretrizes de experiência alinhadas ao negócio, produto e usuários — antes de qualquer pixel.", tag: "Estratégia", accent: "#00FB64" },
  { icon: Paintbrush, title: "UI Design", description: "Interfaces visuais coerentes, modernas e funcionais que comunicam com clareza e guiam com naturalidade.", tag: "Design", accent: "#E6FF00" },
  { icon: LayoutGrid, title: "Design Systems", description: "Sistemas escaláveis com componentes documentados, tokens e guidelines para consistência total.", tag: "Design", accent: "#E6FF00" },
  { icon: Layers, title: "Prototipação", description: "Protótipos de alta fidelidade para validar hipóteses e testar fluxos antes do desenvolvimento.", tag: "Design", accent: "#E6FF00" },
  { icon: Code2, title: "Dev Front-end", description: "Código limpo e performático com React/Next.js. Design implementado com fidelidade obsessiva.", tag: "Dev", accent: "#00FB64" },
  { icon: Globe, title: "Landing Pages & Sites", description: "Páginas com foco em conversão, performance e identidade visual sólida. Do conceito ao deploy.", tag: "Dev", accent: "#00FB64" },
  { icon: Smartphone, title: "Produtos Digitais", description: "Desenvolvimento de produtos do zero: pesquisa, design e código com visão integrada de produto.", tag: "Produto", accent: "#00FB64" },
  { icon: Accessibility, title: "Consultoria em Acessibilidade", description: "Auditoria e implementação de WCAG para garantir experiências inclusivas para todas as pessoas.", tag: "A11y", accent: "#E6FF00" },
];

function TiltCard({
  service,
  index,
  inView,
}: {
  service: (typeof services)[0];
  index: number;
  inView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 180, damping: 22 });
  const sRotY = useSpring(rotY, { stiffness: 180, damping: 22 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-py * 12);
    rotY.set(px * 12);
  };
  const handleLeave = () => { rotX.set(0); rotY.set(0); };

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.065, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="group relative border border-concreto/25 bg-concreto/8 rounded-2xl p-6 cursor-default transition-colors duration-400 hover:border-opacity-60"
    >
      {/* Hover surface glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${service.accent}10, transparent 55%)`,
        }}
      />

      {/* Content — translateZ for depth illusion */}
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
            style={{ background: `${service.accent}14` }}
          >
            <Icon size={17} style={{ color: service.accent }} />
          </div>
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full border tracking-widest uppercase"
            style={{ color: `${service.accent}80`, borderColor: `${service.accent}20`, background: `${service.accent}06` }}
          >
            {service.tag}
          </span>
        </div>
        <h3 className="text-offwhite font-semibold text-sm mb-2.5 tracking-tight">{service.title}</h3>
        <p className="text-offwhite/38 text-xs leading-relaxed font-light">{service.description}</p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section id="servicos" ref={ref} className="py-28 md:py-36 relative overflow-hidden">
      {/* Parallax bg text */}
      <motion.div
        style={{ x: bgX }}
        className="absolute -bottom-8 left-0 pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-black text-[14rem] leading-none tracking-tighter text-offwhite/[0.018]">
          SERVIÇOS
        </span>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headRef} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-verde" />
              <span className="text-verde/70 text-xs font-mono tracking-[0.22em] uppercase">Serviços</span>
            </div>
            <h2 className="text-[clamp(1.8rem,3.8vw,3rem)] font-black leading-tight tracking-tight text-offwhite">
              Do conceito ao produto,{" "}
              <span className="text-verde">com intenção</span>.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-offwhite/35 text-sm max-w-xs leading-relaxed font-light"
          >
            Cada serviço é uma camada de valor. Trabalhamos de forma integrada ou pontual, conforme a necessidade do projeto.
          </motion.p>
        </div>

        {/* 3D tilt grid */}
        <div
          style={{ perspective: "1200px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
