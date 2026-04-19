"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Globe, Zap } from "lucide-react";

const references = [
  {
    category: "Inspiração de Produto",
    items: [
      {
        title: "Wise",
        url: "https://wise.com/?ref=saasframe.io",
        description:
          "Referência de produto digital com excelência em UX. Wise demonstra como simplificar fluxos complexos com clareza, confiança e design funcional de alto nível.",
        tags: ["UX de Produto", "Fintech", "Onboarding"],
        accent: "verde",
      },
    ],
  },
  {
    category: "Referência Visual & Motion",
    items: [
      {
        title: "Explow Studio",
        url: "https://explow.studio/",
        description:
          "Estúdio criativo com identidade visual forte. Referência de como narrativa visual, tipografia e motion podem criar experiências digitais memoráveis.",
        tags: ["Motion Design", "Branding", "Experiência Visual"],
        accent: "amarelo",
      },
    ],
  },
];

export default function References() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="referencias" ref={ref} className="py-24 md:py-32 bg-concreto/10 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(#F1F7F1 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-verde/80 text-xs font-mono tracking-[0.2em] uppercase">Referências</span>
            <div className="h-px flex-1 max-w-12 bg-verde/30" />
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight text-offwhite max-w-2xl">
            Repertório que{" "}
            <span className="text-verde">informa</span> e{" "}
            <span className="text-amarelo">inspira</span>.
          </h2>
          <p className="mt-4 text-offwhite/40 text-base font-light max-w-xl leading-relaxed">
            Referências que moldam nosso olhar sobre design, produto e experiência digital. Cada uma representa um padrão de qualidade que buscamos em cada entrega.
          </p>
        </motion.div>

        <div className="space-y-12">
          {references.map((group, gi) => (
            <div key={group.category}>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: gi * 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <Globe size={12} className="text-offwhite/30" />
                <span className="text-offwhite/30 text-xs font-mono tracking-widest uppercase">
                  {group.category}
                </span>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-5">
                {group.items.map((item, i) => (
                  <motion.a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: gi * 0.2 + i * 0.1 + 0.15 }}
                    className={`group block border rounded-2xl p-7 transition-all duration-400 ${
                      item.accent === "verde"
                        ? "border-concreto/30 hover:border-verde/40 hover:bg-verde/5"
                        : "border-concreto/30 hover:border-amarelo/30 hover:bg-amarelo/5"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                            item.accent === "verde"
                              ? "bg-verde/10 group-hover:bg-verde/20"
                              : "bg-amarelo/10 group-hover:bg-amarelo/20"
                          }`}
                        >
                          <Zap
                            size={16}
                            className={item.accent === "verde" ? "text-verde" : "text-amarelo"}
                          />
                        </div>
                        <div>
                          <h3 className="text-offwhite font-semibold text-base tracking-tight">
                            {item.title}
                          </h3>
                          <span className="text-offwhite/30 text-xs font-mono truncate max-w-[200px] block">
                            {item.url.replace("https://", "").replace("http://", "").split("/")[0]}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                          item.accent === "verde"
                            ? "border-verde/30 bg-verde/5"
                            : "border-amarelo/30 bg-amarelo/5"
                        }`}
                      >
                        <ExternalLink
                          size={13}
                          className={item.accent === "verde" ? "text-verde" : "text-amarelo"}
                        />
                      </div>
                    </div>

                    <p className="text-offwhite/50 text-sm leading-relaxed mb-4 font-light">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                            item.accent === "verde"
                              ? "text-verde/50 border-verde/15 bg-verde/5"
                              : "text-amarelo/50 border-amarelo/15 bg-amarelo/5"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
