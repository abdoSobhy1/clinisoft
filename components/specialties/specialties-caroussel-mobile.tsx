'use client'
import SpecialtyCard from "@/components/specialty-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import SpecialtiesWrapper from "@/components/specialties/specialties-wrapper";


interface SpecialtiesCarousselProps {
    bgColor?: string;
    didAnimate: boolean;
    setDidAnimate: (didAnimate: boolean) => void;
    specialties: { title: string, description: string, icon: React.ElementType }[];
}

export default function SpecialtiesCaroussel({ bgColor = "", didAnimate, setDidAnimate, specialties }: SpecialtiesCarousselProps) {
    const t = useTranslations("specialties");
    const plugin = useRef(
        Autoplay({ delay: 5000 })
    )
    return (
        <section className={`min-h-vph py-12 px-4 flex flex-col justify-between ${bgColor}`}>
            <SpecialtiesWrapper didAnimate={didAnimate} setDidAnimate={setDidAnimate}>
                <Carousel plugins={[plugin.current]}
                    className="w-full relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:bg-[linear-gradient(to_right,_white,_transparent_10%,_transparent_90%,_white)] md:before:bg-[linear-gradient(to_right,_white,_transparent_20%,_transparent_80%,_white)] before:z-1 before:pointer-events-none"
                    onMouseEnter={() => plugin.current.stop()}
                    onMouseLeave={() => plugin.current.play()}
                    opts={{ loop: true, align: "start", startIndex: 0 }}
                >
                    <CarouselNext className="w-16 h-16 fs-var-2xl right-10 hidden md:flex text-white" />
                    <CarouselPrevious className="w-16 h-16 fs-var-2xl left-10 hidden md:flex text-white" />
                    <CarouselContent >
                        {specialties.map((specialty) => (
                            <CarouselItem key={specialty.title} className="min-w-96 basis-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 mb-6">
                                <SpecialtyCard title={specialty.title} description={specialty.description} Icon={specialty.icon} />
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
            </SpecialtiesWrapper>
        </section>
    );
}