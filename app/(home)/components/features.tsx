'use client'
import FeatureCard from "@/components/feature-card"
import Title from "@/components/title";
import { useSequentialCardAnimation } from "@/hooks/useSequentialCardAnimation";

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
    const { cardRefs, containerRef, animatedIndexes } = useSequentialCardAnimation({
        length: featuresList.length,
    });

    return (
        <section className={`pb-12 md:py-12 px-4 min-h-vph flex flex-col ${bgColor}`}>
            <Title className="md:hidden mb-8">Why CliniSoft?</Title>
            <div
                ref={containerRef}
                className="max-w-7xl w-full h-full grow-1 mx-auto grid grid-cols-1 md:grid-cols-2 justify-center gap-8 scroll-m-2.5"
            >
                {featuresList.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        ref={el => { cardRefs.current[index] = el; }}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                        index={index}
                        animate={animatedIndexes.includes(index)}
                    />
                ))}
            </div>
        </section>
    )
}