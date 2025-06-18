import Hero from "./components/hero";
import Features from "./components/features";
import Innovations from "./components/Innovations";
import ValueSection from "./components/value-section";
import Testimonials from "./components/testimonials";
import ContactUs from "./components/contact-us";
import SuccessPartners from "./components/scuccess-partners";
import Trusted from "./components/trusted";
import Specialties from "./components/specialties";

export default function Home() {

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Features />
      <Trusted bgColor="bg-black/1 " />
      <Specialties />
      <Innovations bgColor="bg-black/1 " />
      <ValueSection bgColor="bg-transparent " />
      <Testimonials bgColor="bg-black/1 " />
      <SuccessPartners bgColor="bg-transparent " />
      <ContactUs bgColor="bg-black/1 " />
    </main>
  );
}
