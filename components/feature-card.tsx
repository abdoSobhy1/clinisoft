import { cn } from "@/lib/utils";
import Image from "next/image";
import Accordion from "@/components/accordion";
import { ChevronsDown } from "lucide-react";
import { useAutoOpenOnView } from "@/hooks/useAutoOpenOnView";

type FeatureCardProps = {
    description: string;
    icon: string;
    isWide?: boolean;
    title: React.ReactNode;
    isOpen?: boolean;
    onToggle?: () => void;
    className?: string;
}

export default function FeatureCard({ description, icon, isWide, title, isOpen, onToggle, className }: FeatureCardProps) {
    const imageAlt = icon.split("/").pop()?.split(".")[0].toString() ?? "";
    const cardRef = useAutoOpenOnView(isOpen, onToggle);

    return (
        <div ref={cardRef} className={cn(
            "rounded-3xl bg-linear-45 md:-bg-linear-135 from-[#c4fef0] via-[#d7e4f2] to-[rgba(255,255,255,0.5)] p-4 shadow-lg shadow-[#c9f1f4] h-full flex flex-col justify-between stroke-1 stroke-[#D7E4F2]",
            isWide ? "lg:col-span-3 lg:items-center lg:text-center" : "",
            className
        )}>
            <div className="flex gap-4 items-center justify-between md:justify-start">
                <div className={cn(
                    "rounded-lg bg-[#ffffff33] bg-radial from-[#bcfff3] to-[#BAE5E900] border-1 border-[#E4FFFD] aspect-square w-[84px] flex items-center justify-center",
                    isWide ? "lg:mx-auto" : ""
                )}>
                    <Image src={icon} alt={imageAlt} width={42} height={42} />
                </div>
                <h3 className="text-black font-medium text-3xl">{title}</h3>
                <button
                    onClick={onToggle}
                    className="md:hidden"
                >
                    <ChevronsDown
                        className={`text-[#616161] w-8 h-8 ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>
            </div>
            <Accordion isOpen={isOpen} onToggle={onToggle} hideButton="hidden md:block">
                <p className="text-[#4d504f] leading-8 pt-4">{description}</p>
            </Accordion>
        </div>
    );
}
