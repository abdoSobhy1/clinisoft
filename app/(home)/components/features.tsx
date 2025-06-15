'use client'
import FeatureCard from "@/components/feature-card"

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

    // spearator=before:content-[''] before:absolute before:w-full before:h-0.5  before:bg-linear-to-l before:from-[#1E949E00] before:via-[#1E949E] before:to-[#1E949E00] before:bottom-0 before:left-0

    return (
        <section className={`py-12 px-4 min-h-vph flex flex-col ${bgColor}`}>
            <div className="max-w-7xl w-full h-full grow-1 mx-auto grid grid-cols-1 md:grid-cols-2 justify-center gap-8">
                {featuresList.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                        index={index}
                    />
                ))}
            </div>
        </section>
    )
}