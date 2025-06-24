// 'use client'
import { useCountUp } from "@/hooks/useCountup";
import Image from "next/image";
import AnimatedAccordion from "./animated-accordion";
import { cn } from "@/lib/utils";
import { ChevronsDown } from "lucide-react";
import ScaleAnim from "./scale-anim";
import { useLanguage } from "@/contexts/LanguageContext";
// import { useState } from "react";
type ValueCardProps = {
    stat: number;
    title: string;
    description: string;
    icon: string;
    shouldCount: boolean;
    isOpen?: boolean;
    onToggle: () => void;
    className?: string;
    index: number;
    ref: (el: HTMLElement | null) => void;
}

export default function ValueCard({ stat, title, description, icon, shouldCount, isOpen, onToggle, className, index, ref }: ValueCardProps) {

    const count = useCountUp(shouldCount ? stat : 0, 1500);
    const { isRTL } = useLanguage();

    const alignment = {
        title: isRTL ? "text-right" : "text-left",
        paragraph: isRTL ? "text-right" : "text-left",
        chevron: isRTL ? "mr-auto" : "ml-auto"
    }

    return (
        <div ref={ref} >
            <ScaleAnim delay={index * 0.3} className={cn("rounded-3xl bg-white p-4 shadow-md h-full text-center flex flex-col ", className)} >
                <div className="mb-4 md:mb-8 flex items-center lg:justify-between gap-4 md:block">
                    <div className="relative size-24 lg:mx-auto">
                        <Image src={icon} alt={title} fill className="object-contain object-left md:object-center" />
                    </div>
                    <div className={`${alignment.title} md:text-center leading-none self-end md:self-center md:leading-normal `}>
                        <p className="text-teal fs-var-6xl font-semibold mb-2 md:mb-0">{count} %</p>
                        <p className="text-[2.4vh] md:fs-var-2xl font-semibold text-[#1e949e]">{title}</p>
                    </div>
                    <button
                        onClick={onToggle}
                        className={`md:hidden ${alignment.chevron}`}
                    >
                        <ChevronsDown
                            className={`text-[#1E949E] w-8 h-8 ${isOpen ? "rotate-180" : ""} opacity-50`}
                        />
                    </button>
                </div>
                <AnimatedAccordion
                    isOpen={isOpen}
                    onToggle={onToggle}
                    hideButton="hidden"
                    animationDuration={0.4}
                >
                    <p className={`${alignment.paragraph} text-[#4d504f] fs-var-lg leading-8 md:text-center`}>{description}</p>
                </AnimatedAccordion>
            </ScaleAnim>
        </div>
    )
}
