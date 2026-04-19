import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-grafite text-offwhite">
        {children}
      </body>
    </html>
  );
}
