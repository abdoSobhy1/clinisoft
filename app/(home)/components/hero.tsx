'use client'
import HeroSlide from "@/components/hero-slide";
import { Carousel, CarouselNext, CarouselPrevious, CarouselContent, CarouselDots } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const slides = [
    {
        title: "Smart Medical Software Built for Doctors, Clinics, and Patients",
        description: "All-in-one digital solutions for over 20 medical specialties from patient records to queue management and barcode systems.",
        image: '/images/hero/hero-1.webp'
    },
    {
        title: "Streamline Your Practice with Advanced EMR Solutions",
        description: "Experience seamless electronic medical records management with intuitive interfaces designed specifically for your specialty.",
        image: '/images/hero/hero-2.webp'
    },
    {
        title: "Enhance Patient Care with Integrated Healthcare Tools",
        description: "From appointment scheduling to treatment planning, our comprehensive suite of tools helps you deliver better patient outcomes.",
        image: '/images/hero/hero-3.webp'
    },
    {
        title: "Transform Your Clinic with Digital Innovation",
        description: "Join thousands of healthcare providers who have revolutionized their practice with our cutting-edge medical software solutions.",
        image: '/images/hero/hero-4.webp'
    },
]

export default function HeroSection() {
    const plugin = useRef(
        Autoplay({ delay: 5000, })
    )
    return (<section>
        <Carousel plugins={[plugin.current]}
            opts={{ loop: true, }}
        >
            <CarouselNext className="right-10 hidden md:flex" />
            <CarouselPrevious className="left-10 hidden md:flex" />
            <CarouselContent>
                {slides.map((slide) => (
                    <HeroSlide key={slide.title} title={slide.title} description={slide.description} image={slide.image} />
                ))}
            </CarouselContent>
            <CarouselDots className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" />
        </Carousel>
    </section>)
}