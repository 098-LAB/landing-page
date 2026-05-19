import Hero from "@/presentation/components/Hero";
import Marquee from "@/presentation/components/Marquee";
import Nav from "@/presentation/components/Nav";
import Noise from "@/presentation/components/Noise";
import { AboutSection } from "@/presentation/flows/landing/components/about-section";

export default function LandingPage() {
  return (
    <>
      <Noise />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <AboutSection />
      </main>
    </>
  );
}
