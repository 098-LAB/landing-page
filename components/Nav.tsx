"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

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
        className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <div
          className={`pointer-events-auto w-full max-w-5xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-grafite/60 backdrop-blur-xl border border-offwhite/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              : "bg-grafite/30 backdrop-blur-md border border-offwhite/5"
          }`}
        >
          {/* Logo updated to use the new animated component */}
          <a href="#" className="flex items-center group relative h-7 w-auto transition-transform hover:scale-105 duration-300">
            <Logo showFull={scrolled} className="h-full w-auto drop-shadow-md" />
          </a>

          {/* Nav links updated with pill hover effect */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-offwhite/70 hover:text-offwhite text-sm font-medium tracking-wide hover:bg-offwhite/10 rounded-full px-4 py-2 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA button inside the pill */}
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
            className="md:hidden text-offwhite/80 hover:text-verde transition-colors p-2"
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
            <div className="px-6 h-20 flex items-center justify-between border-b border-concreto/30">
              <div className="flex items-center">
                <Logo showFull={true} className="h-7 w-auto" />
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-offwhite/80 hover:text-verde transition-colors p-2"
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
