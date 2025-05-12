import { cn } from "@/lib/utils";
import Image from "next/image";

type FeatureCardProps = {
    description: string;
    icon: string;
    isWide?: boolean
    title: React.ReactNode
}

export default function FeatureCard({ description, icon, isWide, title }: FeatureCardProps) {

    const imageAlt = icon.split("/").pop()?.split(".")[0].toString() ?? "";

    return (
        <div className={cn("rounded-3xl -bg-linear-135 from-[#c4fef0] via-[#d7e4f2] to-[rgba(255,255,255,0.5)] p-4 shadow-lg shadow-[#c9f1f4] h-full flex flex-col justify-between stroke-1 stroke-[#D7E4F2]", isWide ? "lg:col-span-3 lg:items-center lg:text-center" : "")} >
            <div className="rounded-lg bg-[#ffffff33] bg-radial from-[#bcfff3] to-[#BAE5E900] border-1 border-[#E4FFFD] aspect-square w-[84px] flex items-center justify-center mb-4">
                <Image src={icon} alt={imageAlt} width={42} height={42} />
            </div>
            <h3 className="text-black font-medium text-2xl">{title}</h3>
            <p className="text-[#4d504f]  leading-8">{description}</p>
        </ div>
    );
}
