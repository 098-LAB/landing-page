"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Heart, Star } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Responsabilidade",
    accent: "verde",
    description:
      "Compromisso com entregas consistentes, estratégicas e bem construídas. Cada linha de código e cada pixel carregam o nosso nome.",
    detail: "Processos claros, prazos respeitados e qualidade que não negocia.",
  },
  {
    icon: Heart,
    title: "Respeito",
    accent: "amarelo",
    description:
      "Atenção às pessoas, aos contextos, às marcas e às necessidades reais dos usuários. Design que parte da escuta e da compreensão.",
    detail: "Cada projeto tem sua singularidade. Respeitamos isso.",
  },
  {
    icon: Star,
    title: "Satisfação do cliente",
    accent: "verde",
    description:
      "Foco em criar soluções que realmente resolvem problemas e geram valor. O sucesso do cliente é a única métrica que importa.",
    detail: "Medimos resultado. Não vaidade de portfólio.",
  },
];

const accentMap: Record<string, string> = {
  verde: "text-verde border-verde/20 bg-verde/5 hover:border-verde/40 hover:bg-verde/10",
  amarelo: "text-amarelo border-amarelo/20 bg-amarelo/5 hover:border-amarelo/40 hover:bg-amarelo/10",
};

export default function Values() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-concreto/10 relative">
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(#F1F7F1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-verde/80 text-xs font-mono tracking-[0.2em] uppercase">Pilares</span>
            <div className="h-px flex-1 max-w-12 bg-verde/30" />
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight text-offwhite">
            Valores que guiam cada entrega
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`group border rounded-2xl p-8 transition-all duration-500 cursor-default ${accentMap[value.accent]}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    value.accent === "verde"
                      ? "bg-verde/10 group-hover:bg-verde/20"
                      : "bg-amarelo/10 group-hover:bg-amarelo/20"
                  }`}
                >
                  <Icon
                    size={20}
                    className={value.accent === "verde" ? "text-verde" : "text-amarelo"}
                  />
                </div>

                <h3 className="text-offwhite font-semibold text-xl mb-3 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-offwhite/60 text-sm leading-relaxed mb-4 font-light">
                  {value.description}
                </p>
                <p
                  className={`text-xs font-medium tracking-wide ${
                    value.accent === "verde" ? "text-verde/70" : "text-amarelo/70"
                  }`}
                >
                  {value.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
