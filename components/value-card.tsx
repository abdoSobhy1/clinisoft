import { useCountUp } from "@/hooks/useCountup";
import Image from "next/image";
import Accordion from "./accordion";
import { cn } from "@/lib/utils";
import { ChevronsDown } from "lucide-react";
// import { useAutoOpenOnView } from "@/hooks/useAutoOpenOnView";

type ValueCardProps = {
    stat: number;
    title: string;
    description: string;
    icon: string;
    shouldCount: boolean;
    isOpen?: boolean;
    onToggle?: () => void;
    className?: string;
    index: number;
}

export default function ValueCard({ stat, title, description, icon, shouldCount, isOpen, onToggle, className, index }: ValueCardProps) {
    // const cardRef = useAutoOpenOnView(isOpen, onToggle);
    const count = useCountUp(shouldCount ? stat : 0, 1500);
    console.log(index);
    return (
        <div className={cn("rounded-3xl bg-white p-4 shadow-md h-full text-center flex flex-col", className)}>
            <div className="md:mb-8 flex justify-between items-center md:block">
                <Image src={icon} alt={title} width={60} height={60} className="md:mx-auto md:mb-4" />
                <div>
                    <p className="text-teal text-5xl font-semibold">{count} %</p>
                    <h3 className="text-[24px] font-semibold text-[#1e949e]">{title}</h3>
                </div>
                <button
                    onClick={onToggle}
                    className="md:hidden"
                >
                    <ChevronsDown
                        className={`text-[#1E949E] w-8 h-8 ${isOpen ? "rotate-180" : ""} opacity-50`}
                    />
                </button>
            </div>
            <Accordion isOpen={isOpen} onToggle={onToggle} hideButton="hidden md:block">
                <p className="text-[#4d504f] text-lg leading-8">{description}</p>
            </Accordion>
        </div>
    )
}
