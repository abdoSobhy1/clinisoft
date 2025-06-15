import { useCountUp } from "@/hooks/useCountup";
import Image from "next/image";
import { useTranslations } from "next-intl";
type Stat = {
    icon: string;
    value: number;
    suffix?: string;
    label: string;
    finish: string;
};

export default function StatCounter({ stat, shouldCount, finish }: { stat: Stat; shouldCount: boolean; finish: string }) {
    const t = useTranslations("counters");
    const [count, isFinished] = useCountUp(shouldCount ? stat.value : 0, 4500);

    return (
        <div className="flex justify-center items-center gap-4">
            <div className="relative w-24 h-24">
                <Image src={stat.icon} alt={stat.label} fill className="object-contain" />
            </div>
            <div>
                <p className="fs-var-6xl font-semibold min-w-[200px]">
                    {!isFinished ? count : finish}
                    {stat.suffix}
                </p>
                <div className="fs-var-3xl font-medium">{t(stat.label)}</div>
            </div>
        </div>
    );
}