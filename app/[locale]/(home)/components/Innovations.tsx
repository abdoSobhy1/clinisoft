'use client'
import Seperator from "@/components/footer/seperator";
import InnovationCard from "@/components/innovation-card/innovation-card"
import Title from "@/components/title"
import TypewriterText from "@/components/innovation-card/TypewriterText"
import { useTranslations } from "next-intl";

const innovations = [
    {
        title: "qtv",
        description: "qtvDescription",
        image: "/images/qtv.webp",
        link: "/innovations/queue-management"
    },
    {
        title: "pvcSmartCard",
        description: "smartCardDescription",
        image: "/images/smart-card.webp",
        link: "/innovations/smart-card"
    },
    {
        title: "securityKey",
        description: "securityKeyDescription",
        image: "/images/Security-Key.webp",
        link: "/innovations/security-key"
    },
    {
        title: "coloringBook",
        description: "coloringBookDescription",
        image: "/images/children-coloring-book.webp",
        link: "/innovations/children-coloring-book"
    }
]

interface InnovationsProps {
    bgColor?: string;
}

export default function Innovations({ bgColor = "" }: InnovationsProps) {
    const t = useTranslations("innovations");
    return (
        <section className={`py-12 relative min-h-vph-2xl flex flex-col ${bgColor}`}>
            <Seperator vertical={false} className="from-[transparent] via-[black] to-[transparent] bg-linear-to-r opacity-15" />
            <div className="max-w-7xl mx-auto size-full grow-1 flex flex-col items-center justify-between">
                <div className="w-fit mb-16">
                    <Title className="py-b">{t("builtInTools")}</Title>
                    <TypewriterText />
                </div>
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(600px,1fr))] gap-8">
                    {
                        innovations.map((innovation, index) => (
                            <InnovationCard key={index} title={innovation.title} description={innovation.description} image={innovation.image} link={innovation.link} />
                        ))
                    }
                </div>
            </div>
        </section >
    )
}
