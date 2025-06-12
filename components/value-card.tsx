// 'use client'
import { useCountUp } from "@/hooks/useCountup";
import Image from "next/image";
import AnimatedAccordion from "./animated-accordion";
import { cn } from "@/lib/utils";
import { ChevronsDown } from "lucide-react";
import ScaleAnim from "./scale-anim";
// import { useState } from "react";
type ValueCardProps = {
    stat: number;
    title: string;
    description: string;
    icon: string;
    shouldCount: boolean;
    isOpen?: boolean;
    onToggle: () => void;
    className?: string;
    index: number;
    ref: (el: HTMLElement | null) => void;
}

export default function ValueCard({ stat, title, description, icon, shouldCount, isOpen, onToggle, className, index, ref }: ValueCardProps) {
    // const [finishedAnimation, setFinishedAnimation] = useState<boolean>(false);
    // const [autoOpened, setAutoOpened] = useState<boolean>(false);
    const count = useCountUp(shouldCount ? stat : 0, 1500);

    // useEffect(() => {
    //     console.log("finishedAnimation", finishedAnimation, index);
    //     if (finishedAnimation && !autoOpened) {
    //         setTimeout(() => {
    //             console.log("auto opening");
    //             setAutoOpened(true);
    //             onToggle();
    //         }, 2400);
    //     }

    // }, [finishedAnimation]);

    return (
        <div ref={ref} >
            <ScaleAnim delay={index * 0.3} className={cn("rounded-3xl bg-white p-4 shadow-md h-full text-center flex flex-col ", className)} >
                <div className="md:mb-8 flex justify-between items-center md:block">
                    <Image src={icon} alt={title} width={100} height={100} className="md:mx-auto md:mb-4" />
                    <div>
                        <p className="text-teal text-6xl font-semibold">{count} %</p>
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
                <AnimatedAccordion
                    isOpen={isOpen}
                    onToggle={onToggle}
                    hideButton="hidden"
                    animationDuration={0.4}
                >
                    <p className="text-[#4d504f] text-lg leading-8">{description}</p>
                </AnimatedAccordion>
            </ScaleAnim>
        </div>
    )
}
