'use client'
import ValueCard from "@/components/value-card";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const valueCards = [
    {
        stat: 0,
        title: "Data Leakage",
        description: "Our system provides robust data protection through a combination of strong access controls, encryption, regular security assessments, and compliance with data privacy regulations.",
        icon: "/images/icons/data-leakage.svg"
    },
    {
        stat: 99,
        title: "Data Retention",
        description: "Never lose a byte: our automated, encrypted backups paired with a resilient system design, protecting your data from any eventuality.",
        icon: "/images/icons/retention.svg"
    },
    {
        stat: 100,
        title: "Cost Effectiveness",
        description: "Own premium features and performance with a single and smart investment (one time purchase).",
        icon: "/images/icons/cost-effectiveness.svg"
    },
    {
        stat: 99,
        title: "Time saving",
        description: "Streamlined data entry allows for more eye contact and meaningful interaction, while rapid retrieval and printouts minimize wait times.",
        icon: "/images/icons/time-saving.svg"
    }
]


export default function ValueSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [startCounting, setStartCounting] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);

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

    return (
        <section ref={sectionRef} className="py-12 px-4">
            <h2 className="py-12 text-center text-2xl md:text-5xl font-semibold text-teal">How We Bring Value</h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(min(250px,95%),1fr))] gap-8">
                {valueCards.map((card) => (
                    <ValueCard key={card.title} stat={card.stat} title={card.title} description={card.description} icon={card.icon} shouldCount={startCounting} />
                ))}
            </div>
        </section>
    )
}
