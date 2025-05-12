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
            <Image src={stat.icon} alt={stat.label} width={60} height={60} />
            <div>
                <p className="text-4xl font-semibold min-w-[120px]">
                    {count}
                    {stat.suffix}
                </p>
                <div className="text-lg font-medium">{stat.label}</div>
            </div>
        </div>
    );
}