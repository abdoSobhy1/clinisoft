import { cn } from "@/lib/utils";
import Image from "next/image";
import Accordion from "@/components/accordion";
import { ChevronsDown } from "lucide-react";
// import { useAutoOpenOnView } from "@/hooks/useAutoOpenOnView";

type FeatureCardProps = {
    description: string;
    icon: string;
    title: string;
    className?: string;
}

export default function FeatureCard({ description, icon, title }: FeatureCardProps) {
    const imageAlt = icon.split("/").pop()?.split(".")[0].toString() ?? "";

    return (
        <div className="flex-1 md:min-w-60  h-full rounded-3xl bg-linear-45 md:-bg-linear-135 from-[#c4fef0] via-[#d7e4f2] to-[rgba(255,255,255,0.5)] p-4 shadow-lg shadow-[#c9f1f4] flex flex-col items-center justify-between stroke-1 stroke-[#D7E4F2] text-center space-y-8">
            <div className="rounded-lg p-4 bg-[#ffffff33] bg-radial from-[#bcfff3] to-[#BAE5E900] border-1 border-[#E4FFFD] aspect-square flex items-center justify-center">
                <Image src={icon} alt={imageAlt} width={64} height={64} />
            </div>
            <h3 className="text-black font-medium text-3xl">{title}</h3>
            <p className="text-[#4d504f] leading-8 text-xl ">{description}</p>
        </div>
    );
}
