import type { IAboutCardData } from "./types";

export const cards: IAboutCardData[] = [
  {
    id: "Humano",
    icon: "/assets/icons/colchetes-black.png",
    title: "Pessoas antes de processos",
    text: "Criamos experiências pensadas para pessoas reais, com clareza, acessibilidade e intenção.",
    isPrimary: true,
  },
  {
    id: "Estratégico",
    icon: "/assets/icons/asteriscos-green.png",
    title: "Design com direção",
    text: "Cada interface, fluxo e decisão possui propósito, contexto e visão de negócio.",
    isPrimary: false,
  },
  {
    id: "Laboratório",
    icon: "/assets/icons/codig-black-green.png",
    title: "Construção contínua",
    text: "O 098lab funciona como um laboratório vivo: testamos, refinamos e evoluímos soluções constantemente.",
    isPrimary: false,
  },
];
