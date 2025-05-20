'use client'
import SpecialtyCard from "@/components/specialty-card";
import MainButton from "@/components/main-button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const specialties = [
    {
        title: "Ophthalmology",
        description: "We offer Eye Clinic Management Software in addition to Medical Software for Diagnosing & Treating Vision Disorders.",
        icon: "/images/icons/ophthalmology.svg"
    },
    {
        title: "Dermatology",
        description: "We offer Dermatology Clinic Management Software in addition to Medical Software for Diagnosing & Treating Skin Conditions.",
        icon: "/images/icons/dermatology.svg"
    },
    {
        title: "Dentistry",
        description: "We offer Dental Clinic Management Software in addition to Medical Software for Diagnosing & Treating Dental Conditions.",
        icon: "/images/icons/dentistry.svg"
    },
    {
        title: "E.N.T",
        description: "We offer ENT Clinic Management Software in addition to Medical Software for Diagnosing & Treating ENT Conditions.",
        icon: "/images/icons/ent.svg"
    },
    {
        title: "Internal Medicine",
        description: "We offer Internal Medicine Clinic Management Software in addition to Medical Software for Diagnosing & Treating Internal Diseases.",
        icon: "/images/icons/internal medicine.svg"
    },
    {
        title: "Neuro Surgery",
        description: "We offer Neurosurgery Clinic Management Software in addition to Medical Software for Diagnosing & Treating Neurological Disorders.",
        icon: "/images/icons/neuro surgery.svg"
    },
    {
        title: "Orthopedic Surgery",
        description: "We offer Orthopedic Clinic Management Software in addition to Medical Software for Diagnosing & Treating Bone & Joint Conditions.",
        icon: "/images/icons/orthopedic surgery.svg"
    },
    {
        title: "Pediatrics",
        description: "We offer Pediatric Clinic Management Software in addition to Medical Software for Diagnosing & Treating Children's Health Conditions.",
        icon: "/images/icons/pediatrics.svg"
    },
    {
        title: "Physiotherapy",
        description: "We offer Physiotherapy Center Management Software in addition to Medical Software for Diagnosing & Treating Physical Rehabilitations.",
        icon: "/images/icons/physiotherapy.svg"
    },
    {
        title: "Urology",
        description: "We offer Urology Clinic Management Software in addition to Medical Software for Diagnosing & Treating Urinary System Conditions.",
        icon: "/images/icons/urology.svg"
    },
];


export default function SpecialtiesCaroussel() {
    const plugin = useRef(
        Autoplay({ delay: 5000, })
    )
    return (
        <section className="py-6 px-4 ">
            <Carousel plugins={[plugin.current]}
                className="w-full relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:bg-[linear-gradient(to_right,_white,_transparent_10%,_transparent_90%,_white)] md:before:bg-[linear-gradient(to_right,_white,_transparent_20%,_transparent_80%,_white)] before:z-1 before:pointer-events-none"
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => plugin.current.play()}
                opts={{ loop: true }}
            >
                <CarouselNext />
                <CarouselPrevious />
                <CarouselContent >
                    {specialties.map((specialty) => (
                        <CarouselItem key={specialty.title} className="min-w-[350px] basis-1 md:basis-1/2 lg:basis-1/3 mb-6">
                            <SpecialtyCard title={specialty.title} description={specialty.description} icon={specialty.icon} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-[2rem] text-[#1A6D74] text-center font-semibold">
                    More Medical Specialties
                </h2>
                <p className="font-semibold text-[#1A6D74] max-w-[500px] text-center"> &quot;Discover our specialized medical software solutions tailored for various healthcare fields.&quot;</p>
                <MainButton href="/specialties" className="bg-maroon hover:bg-maroon-500 lg:self-center w-max" >View All Specialties</MainButton>
            </div>
        </section>
    );
}
