"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Processo", href: "#processo" },
  { label: "Referências", href: "#referencias" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-grafite/90 backdrop-blur-md border-b border-concreto/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-verde font-mono text-sm font-bold tracking-widest group-hover:text-amarelo transition-colors duration-300">
              098
            </span>
            <span className="text-offwhite font-semibold text-base tracking-tight">
              lab
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-offwhite/60 hover:text-verde text-sm font-medium tracking-wide transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-verde group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contato"
              className="text-sm font-semibold px-5 py-2.5 bg-verde text-grafite rounded-full hover:bg-amarelo transition-colors duration-300 tracking-wide"
            >
              Falar com a 098lab
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-offwhite/80 hover:text-verde transition-colors"
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-grafite flex flex-col"
          >
            <div className="px-6 h-16 flex items-center justify-between border-b border-concreto/30">
              <span className="text-verde font-mono text-sm font-bold tracking-widest">
                098lab
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-offwhite/80 hover:text-verde transition-colors"
                aria-label="Fechar menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-2 p-6 flex-1">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="text-offwhite/70 hover:text-verde text-2xl font-medium py-3 border-b border-concreto/20 transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contato"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6 text-center text-sm font-semibold px-5 py-3 bg-verde text-grafite rounded-full hover:bg-amarelo transition-colors duration-300"
              >
                Falar com a 098lab
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
