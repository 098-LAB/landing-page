import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const anekLatin = localFont({
  src: [
    {
      path: "./fonts/anek-latin/AnekLatin-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/anek-latin/AnekLatin-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/anek-latin/AnekLatin-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/anek-latin/AnekLatin-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-anek-latin",
});

const anekLatinSemiExpanded = localFont({
  src: [
    {
      path: "./fonts/anek-latin-semi-expanded/AnekLatin_SemiExpanded-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/anek-latin-semi-expanded/AnekLatin_SemiExpanded-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/anek-latin-semi-expanded/AnekLatin_SemiExpanded-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/anek-latin-semi-expanded/AnekLatin_SemiExpanded-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-anek-latin-semi-expanded",
});

export const metadata: Metadata = {
  title: "098lab — UX/UI Design & Desenvolvimento Digital",
  description:
    "Laboratório de UX/UI Design e desenvolvimento digital. Criamos soluções acessíveis, humanas e estratégicas para pessoas, negócios e startups.",
  keywords:
    "UX design, UI design, desenvolvimento digital, acessibilidade, produtos digitais, startups",
  openGraph: {
    title: "098lab — Soluções digitais humanas, acessíveis e estratégicas",
    description:
      "Laboratório de UX/UI Design e desenvolvimento digital focado em criar experiências que unem design, tecnologia e visão de negócio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${anekLatin.variable} ${anekLatinSemiExpanded.variable} h-full antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-grafite text-offwhite font-anek-latin">
        {children}
      </body>
    </html>
  );
}
