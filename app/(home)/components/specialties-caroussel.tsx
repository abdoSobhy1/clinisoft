'use client'
import SpecialtyCard from "@/components/specialty-card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const specialties = [
    {
        title: "Ophthalmology",
        description: "We offer Eye Clinic Management Software in addition to Medical Software for Diagnosing & Treating Vision Disorders.",
        buttonLabel: "Explore More",
        icon: "/icons/ophthalmology.svg"
    },
    {
        title: "Dermatology",
        description: "We offer Dermatology Clinic Management Software in addition to Medical Software for Diagnosing & Treating Skin Conditions.",
        buttonLabel: "Explore More",
        icon: "/icons/dermatology.svg"
    },
    {
        title: "Dentistry",
        description: "We offer Dental Clinic Management Software in addition to Medical Software for Diagnosing & Treating Dental Conditions.",
        buttonLabel: "Explore More",
        icon: "/icons/dentistry.svg"
    },
    {
        title: "E.N.T",
        description: "We offer ENT Clinic Management Software in addition to Medical Software for Diagnosing & Treating ENT Conditions.",
        buttonLabel: "Explore More",
        icon: "/icons/ent.svg"
    },
    {
        title: "Internal Medicine",
        description: "We offer Internal Medicine Clinic Management Software in addition to Medical Software for Diagnosing & Treating Internal Diseases.",
        buttonLabel: "Explore More",
        icon: "/icons/internal-medicine.svg"
    },
    {
        title: "Neuro Surgery",
        description: "We offer Neurosurgery Clinic Management Software in addition to Medical Software for Diagnosing & Treating Neurological Disorders.",
        buttonLabel: "Explore More",
        icon: "/icons/neuro-surgery.svg"
    },
    {
        title: "Orthopedic Surgery",
        description: "We offer Orthopedic Clinic Management Software in addition to Medical Software for Diagnosing & Treating Bone & Joint Conditions.",
        buttonLabel: "Explore More",
        icon: "/icons/orthopedic-surgery.svg"
    },
    {
        title: "Pediatrics",
        description: "We offer Pediatric Clinic Management Software in addition to Medical Software for Diagnosing & Treating Children's Health Conditions.",
        buttonLabel: "Explore More",
        icon: "/icons/pediatrics.svg"
    },
    {
        title: "Physiotherapy",
        description: "We offer Physiotherapy Center Management Software in addition to Medical Software for Diagnosing & Treating Physical Rehabilitations.",
        buttonLabel: "Explore More",
        icon: "/icons/physiotherapy.svg"
    },
    {
        title: "Urology",
        description: "We offer Urology Clinic Management Software in addition to Medical Software for Diagnosing & Treating Urinary System Conditions.",
        buttonLabel: "Explore More",
        icon: "/icons/urology.svg"
    },
];


export default function SpecialtiesCaroussel() {
    const plugin = useRef(
        Autoplay({ delay: 200, })
    )
    return (
        <section>
            <Carousel plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => plugin.current.play()}
                opts={{ loop: true }}
            >
                <CarouselContent >
                    {specialties.map((specialty) => (
                        <CarouselItem key={specialty.title} className=" basis-1 md:basis-1/2 lg:basis-1/3">
                            <SpecialtyCard title={specialty.title} description={specialty.description} icon={specialty.icon} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

        </section>
    );
}
