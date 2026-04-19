import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Values from "@/components/Values";
import StickyFeatures from "@/components/StickyFeatures";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import References from "@/components/References";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Noise from "@/components/Noise";

export default function Home() {
  return (
    <>
      <Noise />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Values />
        <StickyFeatures />
        <Services />
        <Portfolio />
        <Process />
        <References />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
