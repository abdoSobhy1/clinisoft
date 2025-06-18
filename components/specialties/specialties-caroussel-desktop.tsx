"use client"
import SpecialtyCard from "@/components/specialty-card";
import { motion, useTransform, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import SpecialtiesWrapper from "@/components/specialties/specialties-wrapper";


const HorizontalScrollCarousel = ({ didAnimate, setDidAnimate }: { didAnimate: boolean, setDidAnimate: (didAnimate: boolean) => void }) => {
    const t = useTranslations("specialties");
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress, scrollY } = useScroll({
        target: targetRef,
    });

    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
    const lastScrollY = useRef<number>(0);


    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            const direction = latest > lastScrollY.current ? 'down' : 'up';

            if (direction !== scrollDirection) {
                setScrollDirection(direction);

                if (direction === 'up') {
                    // setHeight("h-vph");
                } else {
                    // setHeight("h-vph-2xl");
                }
            }

            lastScrollY.current = latest;
        });

        return () => unsubscribe();
    }, [scrollDirection, scrollY]);

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);

    const commonClasses = "min-w-96 shrink-0 grow-0 basis-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 mb-6 h-auto"


    return (
        <section ref={targetRef} className={`relative h-vph-2xl py-12 px-4 `}>
            <div className="sticky top-[12.8vh] h-vph py-12 flex flex-col justify-between overflow-hidden">
                <SpecialtiesWrapper didAnimate={didAnimate} setDidAnimate={setDidAnimate}>
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
                            return <SpecialtyCard key={index} className={commonClasses} title={card.title} description={card.description} icon={card.icon} />
                        })}
                        <div className={cn("rounded-3xl bg-white p-4 shadow-md h-full flex flex-col justify-center items-center bg-linear-270 from-[#1d949e] to-[#12656d]", commonClasses)}>
                            <p className="text-white fs-var-6xl font-semibold text-center">
                                <Link href="/specialties">{t("moreSpecialties")}</Link>
                            </p>
                        </div>
                        {specialties.slice(0, 2).map((card, index) => {
                            return <SpecialtyCard key={index} className={commonClasses} title={card.title} description={card.description} icon={card.icon} />
                        })}
                    </motion.div>
                </SpecialtiesWrapper>
            </div>
        </section>
    );
};


export default HorizontalScrollCarousel;

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