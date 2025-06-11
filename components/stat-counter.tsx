import { useCountUp } from "@/hooks/useCountup";
import Image from "next/image";

type Stat = {
    icon: string;
    value: number;
    suffix?: string;
    label: string;
    finish: string;
};

export default function StatCounter({ stat, shouldCount, finish }: { stat: Stat; shouldCount: boolean; finish: string }) {

    const [count, isFinished] = useCountUp(shouldCount ? stat.value : 0, 4500);

    return (
        <div className="flex justify-center items-center gap-4">
            <Image src={stat.icon} alt={stat.label} width={90} height={90} />
            <div>
                <p className="text-6xl font-semibold min-w-[200px]">
                    {!isFinished ? count : finish}
                    {stat.suffix}
                </p>
                <div className="text-3xl font-medium">{stat.label}</div>
            </div>
        </div>
    );
}