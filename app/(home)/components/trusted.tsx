'use client'
import Title from "@/components/title";
import SlideIn from "../../../components/slide-in";
import Seperator from "@/components/footer/seperator";
import StatsSection from "./counters"
import { useTranslations } from "next-intl";
import { useSequentialCardAnimation } from "@/hooks/useSequentialCardAnimation";
interface TrustedProps {
    bgColor?: string;
}

export default function Trusted({ bgColor = "" }: TrustedProps) {
    const t = useTranslations("trusted");
    const trustPoints = [
        "offlineOperation",
        "oneTimePurchase",
        "roleBasedSecurity",
        "reliableAndDurable",
        "twentyPlusSpecialty",
    ];

    const { cardRefs, containerRef, animatedIndexes } = useSequentialCardAnimation({
        length: trustPoints.length,
    });


    return (
        <section ref={containerRef} className={`pt-12 overflow-x-hidden relative min-h-vph flex flex-col justify-between ${bgColor}`}>
            <Seperator vertical={false} className="from-[transparent] via-[black] to-[transparent] bg-linear-to-r opacity-15" />
            <div className="max-w-7xl px-4 mx-auto flex flex-col gap-4 mb-4">
                <div className="text-center">
                    <Title className="py-0 fs-var-3xl mb-2 text-textTeal">
                        {t("whyTrust")}
                    </Title>
                    <p className="fs-var-base md:fs-var-2xl text-textTeal font-medium leading-normal">
                        {t("over19Years")}
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 mt-auto">
                    {trustPoints.map((point, index) => (
                        <div ref={el => { cardRefs.current[index] = el; }} key={index}>
                            <SlideIn
                                direction={index % 2 === 0 ? 'left' : 'right'}
                                className={`content-center bg-[#d7fff6] px-4 py-1.5 md:py-6 border border-[#9fe5d5] rounded-full max-w-m text-textTeal text-center fs-var-lg md:text-[4.347vh] font-medium ${index === trustPoints.length - 1 ? 'col-span-1 lg:col-span-2' : 'col-span-1'}`}
                                // delay={index * 0.6}
                                duration={0.3}
                                trigger={animatedIndexes.includes(index)}
                            >
                                {t(point)}
                            </SlideIn>
                        </div>
                    ))}
                </div>
            </div>
            <StatsSection ref={(el: HTMLDivElement | null) => { cardRefs.current[trustPoints.length] = el; }} />
        </section >
    )
}

