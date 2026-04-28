"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    label: "UX Research + UI Design",
    title: "Plataforma de Gestão Educacional",
    description:
      "Redesenho completo da experiência de uma plataforma educacional. Research com professores e alunos, novo fluxo de onboarding e sistema de componentes escalável.",
    tags: ["UX Research", "UI Design", "Design System"],
    accent: "#00FB64",
    span: "lg:col-span-2",
  },
  {
    label: "Produto Digital",
    title: "App de Finanças Pessoais",
    description:
      "Design e prototipação mobile-first com foco em acessibilidade e clareza para todos os perfis de usuário.",
    tags: ["UX Strategy", "UI Design", "Prototipação"],
    accent: "#E6FF00",
    span: "",
  },
  {
    label: "Desenvolvimento Front-end",
    title: "Site Institucional para Startup B2B",
    description:
      "Landing page de alta conversão com animações fluidas e performance otimizada.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    accent: "#00FB64",
    span: "",
  },
  {
    label: "Consultoria em Acessibilidade",
    title: "Auditoria WCAG — E-commerce",
    description:
      "Diagnóstico completo, relatório técnico e acompanhamento da implementação de WCAG 2.2.",
    tags: ["WCAG 2.2", "Acessibilidade", "Auditoria"],
    accent: "#E6FF00",
    span: "lg:col-span-2",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.0]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.01, delay: index * 0.1 }}
      className={`group relative border border-concreto/25 rounded-2xl overflow-hidden ${project.span}`}
    >
      {/* Clip-path wipe reveal — starts covering card, wipes right to reveal */}
      <motion.div
        initial={{ clipPath: "inset(0 0% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 100%)" } : {}}
        transition={{ duration: 0.9, delay: 0.1 + index * 0.12, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 z-10 bg-grafite pointer-events-none"
      />

      {/* Visual area with parallax */}
      <div className="relative h-52 md:h-60 overflow-hidden">
        <motion.div
          style={{ scale: imgScale, background: "#1a1a1a" }}
          className="absolute inset-0"
        >
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "linear-gradient(#F1F7F1 1px, transparent 1px), linear-gradient(90deg, #F1F7F1 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Accent glow */}
          <div
            className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-700"
            style={{
              background: `linear-gradient(135deg, ${project.accent}28, transparent 55%)`,
            }}
          />
          {/* Label chip */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="text-[10px] font-mono font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border backdrop-blur-sm"
              style={{
                color: `${project.accent}cc`,
                borderColor: `${project.accent}30`,
                background: `${project.accent}0a`,
              }}
            >
              {project.label}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3
            className="text-offwhite font-bold text-lg tracking-tight transition-colors duration-300"
            style={{ lineHeight: 1.2 }}
          >
            <span className="group-hover:text-verde transition-colors duration-300">
              {project.title}
            </span>
          </h3>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="w-9 h-9 shrink-0 rounded-full border border-concreto/40 flex items-center justify-center group-hover:border-verde/50 group-hover:bg-verde/5 transition-all duration-300"
          >
            <ArrowUpRight
              size={15}
              className="text-offwhite/30 group-hover:text-verde transition-colors duration-300"
            />
          </motion.div>
        </div>
        <p className="text-offwhite/40 text-sm leading-relaxed mb-4 font-light">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-offwhite/25 px-2.5 py-1 rounded-md border border-concreto/25"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: headRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section id="projetos" className="py-28 md:py-36 relative overflow-hidden">
      {/* Parallax label */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-4 right-0 pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-black text-[11rem] leading-none tracking-tighter text-offwhite/[0.016]">
          WORK
        </span>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headRef} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-verde" />
              <span className="text-verde/70 text-xs font-mono tracking-[0.22em] uppercase">Projetos</span>
            </div>
            <h2 className="text-[clamp(1.8rem,3.8vw,3rem)] font-black leading-tight tracking-tight text-offwhite">
              Trabalho com{" "}
              <span className="text-verde">propósito</span>.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-offwhite/35 text-sm max-w-xs leading-relaxed"
          >
            Casos e conceitos desenvolvidos com atenção ao detalhe e compromisso total com resultado.
          </motion.p>
        </div>

        {/* Asymmetric grid with clip-path reveal */}
        <div className="grid lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
