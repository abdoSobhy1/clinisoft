import Image from "next/image";
import ScaleAnim from "./scale-anim";
import { useTranslations } from "next-intl";
import { forwardRef } from "react";
import { useMobile } from "@/hooks/useMobile";
type FeatureCardProps = {
    description: string;
    icon: string;
    title: string;
    index: number;
    className?: string;
    animate?: boolean;
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
    ({ description, icon, title, index, animate }, ref) => {
        const t = useTranslations("features");
        const imageAlt = t(title) + " icon";
        if (!useMobile()) animate = true;
        return (
            <div className="md:min-w-60" ref={ref}>
                <ScaleAnim
                    // delay={index * 0.3}
                    className="h-full rounded-3xl bg-linear-45 md:-bg-linear-135 from-[#c4fef0] via-[#d7e4f2] to-[rgba(255,255,255,0.5)] p-8 shadow-lg shadow-[#c9f1f4] flex flex-row md:flex-col items-center gap-4 md:items-center md:justify-between stroke-1 stroke-[#D7E4F2] md:text-center "
                    trigger={animate}
                >
                    <div className="relative h-full max-w-12 md:max-w-full w-full md:mb-8">
                        <Image src={icon} alt={imageAlt} fill className="object-contain" priority />
                    </div>
                    <div className="md:mx-auto">
                        <h3 className="text-black font-medium fs-var-lg md:fs-var-3xl">{t(title)}</h3>
                        <p className="text-[#4d504f] leading-8 mx-auto text-center fs-var-sm md:fs-var-2xl">{t(description)}</p>
                    </div>
                </ScaleAnim>
            </div>
        );
    }
);
FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
