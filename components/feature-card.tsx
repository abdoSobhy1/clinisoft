import Image from "next/image";
import ScaleAnim from "./scale-anim";
import { useTranslations } from "next-intl";
type FeatureCardProps = {
    description: string;
    icon: string;
    title: string;
    index: number;
    className?: string;
}

export default function FeatureCard({ description, icon, title, index }: FeatureCardProps) {
    const imageAlt = icon.split("/").pop()?.split(".")[0].toString() ?? "";
    const t = useTranslations("features");
    return (
        <div className="md:min-w-60">
            <ScaleAnim delay={index * 0.3} className="h-full rounded-3xl bg-linear-45 md:-bg-linear-135 from-[#c4fef0] via-[#d7e4f2] to-[rgba(255,255,255,0.5)] p-8 shadow-lg shadow-[#c9f1f4] flex flex-row md:flex-col items-center gap-4 md:items-center md:justify-between stroke-1 stroke-[#D7E4F2] text-center ">
                <div className="relative h-full max-w-12 md:max-w-full w-full md:mb-8">
                    <Image src={icon} alt={imageAlt} fill className="object-contain" />
                </div>
                <div className="md:mx-auto">
                    <h3 className="text-black font-medium fs-var-lg md:fs-var-3xl">{t(title)}</h3>
                    <p className="text-[#4d504f] leading-8 mx-auto text-center fs-var-sm md:fs-var-2xl">{t(description)}</p>
                </div>
            </ScaleAnim>
        </div>
    );
}
