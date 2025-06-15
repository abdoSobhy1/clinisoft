'use client'
import SpecialtyCard from "@/components/specialty-card";
import MainButton from "@/components/main-button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Link from "next/link";
import Title from "@/components/title";
import { useTranslations } from "next-intl";

const specialties = [{
    title: "dentistry",
    description: "dentistryDescription",
    icon: "/images/icons/dentistry.svg"
},
{
    title: "physiotherapy",
    description: "physiotherapyDescription",
    icon: "/images/icons/physiotherapy.svg"
},
{
    title: "dermatology",
    description: "dermatologyDescription",
    icon: "/images/icons/dermatology.svg"
},
{
    title: "ophthalmology",
    description: "ophthalmologyDescription",
    icon: "/images/icons/ophthalmology.svg"
},
{
    title: "internalMedicine",
    description: "internalMedicineDescription",
    icon: "/images/icons/internal medicine.svg"
},
{
    title: "ENT",
    description: "ENTDescription",
    icon: "/images/icons/ent.svg"
},
{
    title: "pediatrics",
    description: "pediatricsDescription",
    icon: "/images/icons/pediatrics.svg"
}
];

interface SpecialtiesCarousselProps {
    bgColor?: string;
}

export default function SpecialtiesCaroussel({ bgColor = "" }: SpecialtiesCarousselProps) {
    const t = useTranslations("specialties");
    const plugin = useRef(
        Autoplay({ delay: 5000 })
    )
    return (
        <section className={`min-h-vph py-12 px-4 flex flex-col justify-between ${bgColor}`}>
            <div className=" flex flex-col items-center text-textTeal text-center mb-8">
                <Title className="fs-var-3xl leading-[67px] mb-4">
                    {t("specialtiesWeServe")}
                </Title>
                <p className="fs-var-sm md:fs-var-2xl text-textTeal font-medium leading-normal">
                    {t("specialInterface")}
                </p>
                <p className="fs-var-sm md:fs-var-2xl text-[#ea7f70] font-medium leading-normal">{t("noGenericLayouts")}</p>
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
                            <p className="text-white fs-var-6xl font-semibold text-center">
                                <Link href="/specialties">{t("moreSpecialties")}</Link>
                            </p>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <MainButton href="/specialties" className="block px-[141px] py-3 bg-maroon hover:bg-maroon-500  text-center lg:w-fit mx-auto fs-var-lg md:fs-var-3xl font-bold mt-4 text-[#f5fffa] " >{t("moreSpecialties")}</MainButton>
        </section>
    );
}