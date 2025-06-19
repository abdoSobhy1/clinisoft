'use client'
import HeroSlide from "@/components/hero-slide";
import { Carousel, CarouselNext, CarouselPrevious, CarouselContent, CarouselDots } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const slides = [
    {
        title: "title01",
        description: "description01",
        image: '/images/hero/hero-1.webp'
    },
    {
        title: "title02",
        description: "description02",
        image: '/images/hero/hero-2.webp'
    },
    {
        title: "title03",
        description: "description03",
        image: '/images/hero/hero-3.webp'
    },
    {
        title: "title04",
        description: "description04",
        image: '/images/hero/hero-4.webp'
    },
]

interface HeroSectionProps {
    bgColor?: string;
}

export default function HeroSection({ bgColor = "" }: HeroSectionProps) {
    const plugin = useRef(
        Autoplay({ delay: 5000, })
    )
    return (<section className={`h-svh ${bgColor}`}>
        <Carousel plugins={[plugin.current]}
            opts={{ loop: true, }}
        >
            <CarouselNext className="size-16 fs-var-2xl right-10 hidden md:flex text-white" />
            <CarouselPrevious className="size-16 fs-var-2xl left-10 hidden md:flex text-white" />
            <CarouselContent>
                {slides.map((slide) => (
                    <HeroSlide key={slide.title} title={slide.title} description={slide.description} image={slide.image} />
                ))}
            </CarouselContent>
            <CarouselDots className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-10" />
        </Carousel>
    </section>)
}