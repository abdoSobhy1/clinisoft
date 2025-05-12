import Hero from "./components/hero";
import StatsSection from "./components/counters";
import SpecialtiesCaroussel from "./components/specialties-caroussel";
import Features from "./components/features";
import Innovations from "./components/Innovations";
import ValueSection from "./components/value-section";
export default function Home() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <SpecialtiesCaroussel />
      <Features />
      <Innovations />
      <ValueSection />
    </main>
  );
}
