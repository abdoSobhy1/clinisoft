import Hero from "./components/hero";
import StatsSection from "./components/counters";
import SpecialtiesCaroussel from "./components/specialties-caroussel";
export default function Home() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <SpecialtiesCaroussel />
    </main>
  );
}
