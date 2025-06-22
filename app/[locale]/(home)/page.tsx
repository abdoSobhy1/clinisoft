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



  return (<>
    <Hero />
    <div className="overflow-x-hidden">
      <Features />
    </div>
    <Trusted bgColor="bg-black/1 " />
    <Specialties />
    <Innovations bgColor="bg-black/1 " />
    <div className="overflow-x-hidden">
      <ValueSection bgColor="bg-transparent " />
    </div>
    <Testimonials bgColor="bg-black/1 " />
    <SuccessPartners bgColor="bg-transparent " />
    <ContactUs bgColor="bg-black/1 " />
  </>
  );
}
