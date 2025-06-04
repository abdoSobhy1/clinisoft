import Hero from "./components/hero";
import StatsSection from "./components/counters";
import SpecialtiesCaroussel from "./components/specialties-caroussel";
import Features from "./components/features";
import Innovations from "./components/Innovations";
import ValueSection from "./components/value-section";
import Testimonials from "./components/testimonials";
import ContactUs from "./components/contact-us";
import SuccessPartners from "./components/scuccess-partners";
import Trusted from "./components/trusted";
// import Intro from "./components/intro";
export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      {/* <Intro /> */}
      <Trusted />
      <StatsSection />
      <SpecialtiesCaroussel />
      <Innovations />
      <ValueSection />
      <Testimonials />
      <SuccessPartners />
      <ContactUs />
    </main>
  );
}
