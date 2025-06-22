'use client'
import Title from "@/components/title";
import ValueCard from "@/components/value-card";
import useAccordionRows from "@/hooks/useAccordionRows";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

const valueCards = [
    {
        stat: 0,
        title: "dataLeakage",
        description: "dataLeakageDescription",
        icon: "/images/icons/data-leakage.svg"
    },
    {
        stat: 99,
        title: "dataRetention",
        description: "dataRetentionDescription",
        icon: "/images/icons/retention.svg"
    },
    {
        stat: 100,
        title: "costEffectiveness",
        description: "costEffectivenessDescription",
        icon: "/images/icons/cost-effectiveness.svg"
    },
    {
        stat: 99,
        title: "timeSaving",
        description: "timeSavingDescription",
        icon: "/images/icons/time-saving.svg"
    }
]

interface ValueSectionProps {
    bgColor?: string;
}

export default function ValueSection({ bgColor = "" }: ValueSectionProps) {
    const t = useTranslations("value");
    const sectionRef = useRef<HTMLDivElement>(null);
    const [startCounting, setStartCounting] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);
    const {
        containerRef,
        getItemRef,
        toggleItem,
        isOpen,
    } = useAccordionRows(valueCards.length, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isAnimated) {
                    setStartCounting(true);
                    setIsAnimated(true);
                }
            },
            { threshold: 0.4 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, [isAnimated]);

    const handleToggle = (index: number) => {
        toggleItem(index);
    }

    return (
        <section ref={sectionRef} className={`min-h-vph py-12 px-4 flex flex-col justify-between ${bgColor}`}>
            <Title className="pb-12 ">{t("howWeBringValue")}</Title>
            <div ref={containerRef} className="max-w-7xl mx-auto h-full grow-1 grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(min(250px,95%),1fr))] gap-8 ">
                {valueCards.map((card, index) => (
                    <ValueCard
                        key={card.title}
                        ref={getItemRef(index)}
                        stat={card.stat}
                        title={t(card.title)}
                        description={t(card.description)}
                        icon={card.icon}
                        shouldCount={startCounting}
                        isOpen={isOpen(index)}
                        onToggle={() => handleToggle(index)}
                        className="value-card"
                        index={index}
                    />
                ))}
            </div>
        </section>
    )
}
