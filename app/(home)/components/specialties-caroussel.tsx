'use client'
import SpecialtyCard from "@/components/specialty-card";
import MainButton from "@/components/main-button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Link from "next/link";
import Title from "@/components/title";

const specialties = [{
    title: "Dentistry",
    description: "We offer Dental Clinic Management Software in addition to Medical Software for Diagnosing & Treating Dental Conditions.",
    icon: "/images/icons/dentistry.svg"
},
{
    title: "Physiotherapy",
    description: "We offer Physiotherapy Center Management Software in addition to Medical Software for Diagnosing & Treating Physical Rehabilitations.",
    icon: "/images/icons/physiotherapy.svg"
},
{
    title: "Dermatology",
    description: "We offer Dermatology Clinic Management Software in addition to Medical Software for Diagnosing & Treating Skin Conditions.",
    icon: "/images/icons/dermatology.svg"
},
{
    title: "Ophthalmology",
    description: "We offer Eye Clinic Management Software in addition to Medical Software for Diagnosing & Treating Vision Disorders.",
    icon: "/images/icons/ophthalmology.svg"
},
{
    title: "Internal Medicine",
    description: "We offer Internal Medicine Clinic Management Software in addition to Medical Software for Diagnosing & Treating Internal Diseases.",
    icon: "/images/icons/internal medicine.svg"
},
{
    title: "E.N.T",
    description: "We offer ENT Clinic Management Software in addition to Medical Software for Diagnosing & Treating ENT Conditions.",
    icon: "/images/icons/ent.svg"
},
{
    title: "Pediatrics",
    description: "We offer Pediatric Clinic Management Software in addition to Medical Software for Diagnosing & Treating Children's Health Conditions.",
    icon: "/images/icons/pediatrics.svg"
}
];

interface SpecialtiesCarousselProps {
    bgColor?: string;
}

export default function SpecialtiesCaroussel({ bgColor = "" }: SpecialtiesCarousselProps) {
    const plugin = useRef(
        Autoplay({ delay: 5000 })
    )
    return (
        <section className={`h-vph py-12 px-4 flex flex-col justify-between ${bgColor}`}>
            <div className=" flex flex-col items-center text-textTeal text-center mb-8">
                <Title className="text-3xl leading-[67px] mb-4">
                    Specialties we serve
                </Title>
                <p className="text-sm md:text-2xl text-textTeal font-medium leading-normal">
                    Each specialty interface is uniquely built for the doctor&apos;s workflow
                </p>
                <p className="text-sm md:text-2xl text-[#ea7f70] font-medium leading-normal">No generic Layouts!</p>
            </div>
            <Carousel plugins={[plugin.current]}
                className="w-full relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:bg-[linear-gradient(to_right,_white,_transparent_10%,_transparent_90%,_white)] md:before:bg-[linear-gradient(to_right,_white,_transparent_20%,_transparent_80%,_white)] before:z-1 before:pointer-events-none"
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => plugin.current.play()}
                opts={{ loop: true, align: "start", startIndex: 0 }}
            >
                <CarouselNext />
                <CarouselPrevious />
                <CarouselContent >
                    {specialties.map((specialty) => (
                        <CarouselItem key={specialty.title} className="min-w-96 basis-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 mb-6">
                            <SpecialtyCard title={specialty.title} description={specialty.description} icon={specialty.icon} />
                        </CarouselItem>
                    ))}
                    <CarouselItem className="min-w-96 basis-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 mb-6">
                        <div className="rounded-3xl bg-white p-4 shadow-md h-full flex flex-col justify-center items-center bg-linear-270 from-[#1d949e] to-[#12656d]">
                            <p className="text-white text-6xl font-semibold text-center">
                                <Link href="/specialties">More Specialties</Link>
                            </p>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <MainButton href="/specialties" className="block px-[141px] py-3 bg-maroon hover:bg-maroon-500  text-center lg:w-fit mx-auto text-[#f5fffa] text-lg md:text-3xl font-bold mt-4" >More Specialties</MainButton>
        </section>
    );
}