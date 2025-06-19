'use client'
import FeatureCard from "@/components/feature-card"
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const featuresList = [
    {
        title: "offline",
        description: "offlineDescription",
        icon: "/images/icons/offline.svg"
    },
    {
        title: "payOnce",
        description: "payOnceDescription",
        icon: "/images/icons/wallet.svg"
    },
    {
        title: "secure",
        description: "secureDescription",
        icon: "/images/icons/patient-privacy.svg"
    },

    {
        title: "tailoredModules",
        description: "tailoredModulesDescription",
        icon: "/images/icons/modules.svg"
    }
];

interface FeaturesProps {
    bgColor?: string;
}

export default function Features({ bgColor = "" }: FeaturesProps) {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [animatedIndexes, setAnimatedIndexes] = useState<number[]>([]);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    const isInView = useInView(containerRef, { once: true });

    useEffect(() => {
        if (!isMobile || !isInView) return;
        let cancelled = false;
        const animateSequentially = async () => {
            for (let i = 0; i < featuresList.length; i++) {
                if (cancelled) break;
                const ref = cardRefs.current[i];
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    const bottomVisible = rect.bottom <= window.innerHeight;
                    if (!bottomVisible) {
                        ref.scrollIntoView({ behavior: 'smooth', block: 'end' });
                        await new Promise(res => setTimeout(res, 400));
                    }
                }
                setAnimatedIndexes(prev => [...prev, i]);
                await new Promise(res => setTimeout(res, 500));
            }
        };
        setAnimatedIndexes([]); // Reset on rerun
        animateSequentially();
        return () => { cancelled = true; };
    }, [isMobile, isInView]);

    return (
        <section className={`py-12 px-4 min-h-vph flex flex-col ${bgColor}`}>
            <div ref={containerRef} className="max-w-7xl w-full h-full grow-1 mx-auto grid grid-cols-1 md:grid-cols-2 justify-center gap-8">
                {featuresList.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        ref={el => { cardRefs.current[index] = el; }}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                        index={index}
                        animate={animatedIndexes.includes(index)}
                        className="md:min-w-60"
                    />
                ))}
            </div>
        </section>
    )
}