import { tv } from "tailwind-variants";

export const aboutSectionStyles = tv({
  slots: {
    section:
      "py-24 md:py-40 bg-offwhite text-grafite flex flex-col items-center justify-center relative z-10",
    container:
      "w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-20",
    grid: "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full",
    card: "flex flex-col p-8 md:p-10 lg:p-12 gap-16 relative group overflow-hidden rounded-2xl border min-h-[420px] lg:min-h-[480px] transition-all duration-300 hover:-translate-y-2 cursor-default",
    hoverOverlay:
      "absolute inset-0 transition-colors duration-700 pointer-events-none",
    cardIndex: "font-mono text-xs uppercase tracking-widest text-grafite/50",
    cardContent: "flex flex-col gap-5 mt-auto relative z-10",
    cardTitle: "text-2xl lg:text-3xl font-bold tracking-tight",
    cardText: "text-base lg:text-lg leading-relaxed text-grafite/70",
  },
  variants: {
    isPrimary: {
      true: {
        card: "bg-verde text-grafite border-grafite/20",
        hoverOverlay: "group-hover:bg-black/[0.04]",
      },
      false: {
        card: "bg-white text-grafite border-grafite/10",
        hoverOverlay: "group-hover:bg-black/[0.02]",
      },
    },
  },
  defaultVariants: {
    isPrimary: false,
  },
});
