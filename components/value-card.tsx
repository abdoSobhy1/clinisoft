import { useCountUp } from "@/hooks/useCountup";
import Image from "next/image";

type ValueCardProps = {
    stat: number;
    title: string;
    description: string;
    icon: string;
    shouldCount: boolean;
}

export default function ValueCard({ stat, title, description, icon, shouldCount }: ValueCardProps) {


    const count = useCountUp(shouldCount ? stat : 0, 1500);

    return (
        <div className="rounded-3xl bg-white p-4 shadow-md h-full text-center">
            <div className="mb-8">
                <Image src={icon} alt={title} width={60} height={60} className="mx-auto" />
                <p className="text-teal text-5xl font-semibold">{count} %</p>
                <h3 className="text-[24px] font-semibold text-[#1e949e]">{title}</h3>
            </div>
            <p className="text-[#4d504f] text-lg leading-8">{description}</p>
        </div>
    )
}
