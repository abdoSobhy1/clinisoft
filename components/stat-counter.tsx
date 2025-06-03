import { useCountUp } from "@/hooks/useCountup";
import Image from "next/image";

type Stat = {
    icon: string;
    value: number;
    suffix?: string;
    label: string;
};

export default function StatCounter({ stat, shouldCount }: { stat: Stat; shouldCount: boolean }) {

    const count = useCountUp(shouldCount ? stat.value : 0, 1500);

    return (
        <div className="flex justify-center items-center gap-4">
            <Image src={stat.icon} alt={stat.label} width={90} height={90} />
            <div>
                <p className="text-6xl font-semibold min-w-[200px]">
                    {count}
                    {stat.suffix}
                </p>
                <div className="text-3xl font-medium">{stat.label}</div>
            </div>
        </div>
    );
}