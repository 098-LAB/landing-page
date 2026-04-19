"use client";

import { motion } from "framer-motion";
import { Globe, Link, AtSign, Send } from "lucide-react";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Processo", href: "#processo" },
  { label: "Referências", href: "#referencias" },
  { label: "Contato", href: "#contato" },
];

const socials = [
  { icon: Globe, href: "#", label: "Site" },
  { icon: Link, href: "#", label: "LinkedIn" },
  { icon: AtSign, href: "#", label: "Instagram" },
  { icon: Send, href: "#", label: "Behance" },
];

export default function Footer() {
  return (
    <footer className="border-t border-concreto/30 bg-grafite">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4 group w-fit">
              <span className="text-verde font-mono text-sm font-bold tracking-widest group-hover:text-amarelo transition-colors duration-300">
                098
              </span>
              <span className="text-offwhite font-semibold text-base tracking-tight">lab</span>
            </a>
            <p className="text-offwhite/40 text-sm leading-relaxed max-w-xs font-light">
              Laboratório de UX/UI Design e desenvolvimento digital. Criamos experiências que unem design, tecnologia e visão de negócio.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-concreto/40 flex items-center justify-center text-offwhite/40 hover:text-verde hover:border-verde/40 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-offwhite/70 text-xs font-mono tracking-widest uppercase mb-5">
              Navegação
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-offwhite/40 text-sm hover:text-verde transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-offwhite/70 text-xs font-mono tracking-widest uppercase mb-5">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contato@098lab.com"
                className="text-offwhite/40 text-sm hover:text-verde transition-colors duration-300 w-fit"
              >
                contato@098lab.com
              </a>
              <div className="mt-4">
                <span className="text-offwhite/20 text-xs font-mono">São Paulo, Brasil</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl border border-verde/20 bg-verde/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-verde animate-pulse" />
                <span className="text-verde text-xs font-medium">Disponível para novos projetos</span>
              </div>
              <span className="text-offwhite/30 text-xs">Aberto para conversas e parcerias</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-concreto/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-offwhite/20 text-xs font-light italic text-center md:text-left">
            "Design com responsabilidade, respeito e compromisso com quem usa."
          </p>
          <div className="flex items-center gap-4">
            <span className="text-offwhite/20 text-xs">
              © {new Date().getFullYear()} 098lab. Todos os direitos reservados.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
