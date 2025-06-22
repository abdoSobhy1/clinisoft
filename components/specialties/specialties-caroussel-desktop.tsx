"use client"
import SpecialtyCard from "@/components/specialty-card";
import { motion, useTransform, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import SpecialtiesWrapper from "@/components/specialties/specialties-wrapper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";


const HorizontalScrollCarousel = ({ didAnimate, setDidAnimate, specialties }: { didAnimate: boolean, setDidAnimate: (didAnimate: boolean) => void, specialties: { title: string, description: string, icon: React.ElementType }[] }) => {
    const { currentLanguage } = useLanguage();
    const t = useTranslations("specialties");
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });


    const x = useTransform(scrollYProgress, [0, 1], ["0%", currentLanguage === 'ar' ? "120%" : "-120%"]);

    const commonClasses = "min-w-96 shrink-0 grow-0 basis-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 mb-6 h-auto"


    return (
        <section ref={targetRef} className={`relative h-vph-2xl px-4 `}>
            <div className="sticky top-[12.8vh] h-vph py-12 flex flex-col justify-between overflow-hidden">
                <SpecialtiesWrapper didAnimate={didAnimate} setDidAnimate={setDidAnimate}>
                    <button className={
                        "items-center justify-center absolute size-10 rounded-full top-1/2  -translate-y-1/2 z-20 bg-[rgba(0,0,0,0.25)] hover:bg-[rgba(0,0,0,0.50)] transition-all duration-300  cursor-pointer w-16 h-16 fs-var-2xl right-10 hidden md:flex text-white"}>
                        <ChevronRight />
                        <span className="sr-only">Next slide</span>
                    </button>
                    <button className={
                        "items-center justify-center absolute size-10 rounded-full top-1/2  -translate-y-1/2 z-20 bg-[rgba(0,0,0,0.25)] hover:bg-[rgba(0,0,0,0.50)] transition-all duration-300  cursor-pointer w-16 h-16 fs-var-2xl left-10 hidden md:flex text-white"}>
                        <ChevronLeft />
                        <span className="sr-only">Previous slide</span>
                    </button>
                    {/* <CarouselNext className="w-16 h-16 fs-var-2xl right-10 hidden md:flex text-white" /> */}
                    {/* <CarouselPrevious className="w-16 h-16 fs-var-2xl left-10 hidden md:flex text-white" /> */}
                    <div className="relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:bg-[linear-gradient(to_right,_white,_transparent_10%,_transparent_90%,_white)] md:before:bg-[linear-gradient(to_right,_white,_transparent_20%,_transparent_80%,_white)] before:z-1 before:pointer-events-none">
                        <motion.div
                            style={{ x }}
                            className="flex gap-4 h-fit"
                            drag="x"
                            dragConstraints={{ left: -2000, right: 0 }}
                            dragElastic={0.1}
                            dragMomentum={true}
                            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                        >
                            {specialties.map((card, index) => {
                                return <SpecialtyCard key={index} className={commonClasses} title={card.title} description={card.description} Icon={card.icon} />
                            })}
                            <div className={cn("rounded-3xl bg-white p-4 shadow-md h-full flex flex-col justify-center items-center bg-linear-270 from-[#1d949e] to-[#12656d]", commonClasses)}>
                                <p className="text-white fs-var-6xl font-semibold text-center">
                                    <Link href="/specialties">{t("moreSpecialties")}</Link>
                                </p>
                            </div>
                            {specialties.slice(0, 1).map((card, index) => {
                                return <SpecialtyCard key={index} className={commonClasses} title={card.title} description={card.description} Icon={card.icon} />
                            })}
                        </motion.div>
                    </div>
                </SpecialtiesWrapper>
            </div>
        </section >
    );
};


export default HorizontalScrollCarousel;
