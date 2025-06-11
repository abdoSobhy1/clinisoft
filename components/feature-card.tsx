import Image from "next/image";
import ScaleAnim from "./scale-anim";

type FeatureCardProps = {
    description: string;
    icon: string;
    title: string;
    index: number;
    className?: string;
}

export default function FeatureCard({ description, icon, title, index }: FeatureCardProps) {
    const imageAlt = icon.split("/").pop()?.split(".")[0].toString() ?? "";

    return (
        <div className="md:min-w-60">
            <ScaleAnim delay={index * 0.3} className="h-full rounded-3xl bg-linear-45 md:-bg-linear-135 from-[#c4fef0] via-[#d7e4f2] to-[rgba(255,255,255,0.5)] p-8 shadow-lg shadow-[#c9f1f4] flex flex-col items-start md:items-center justify-between stroke-1 stroke-[#D7E4F2] text-center ">
                <div className="flex flex-row md:flex-col items-center justify-between flex-1 gap-4 md:gap-8">
                    <div className="w-full flex-1 flex items-center justify-center">
                        {/* <div className="rounded-xl p-4 bg-[#ffffff33] bg-radial from-[#bcfff3] to-[#BAE5E900] border-1 border-[#E4FFFD] aspect-square flex items-center justify-center"> */}
                        <div className="relative h-full w-full ">
                            <Image src={icon} alt={imageAlt} fill className="object-contain" />
                        </div>
                    </div>
                    <h3 className="text-black font-medium text-lg md:text-3xl">{title}</h3>
                </div>
                <p className="text-[#4d504f] leading-8 mx-auto text-center text-sm md:text-2xl">{description}</p>
            </ScaleAnim>
        </div>
    );
}
