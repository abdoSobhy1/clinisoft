import Image from "next/image";
import MainButton from "@/components/main-button";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type SpecialtyCardProps = {
    title: string;
    description: string;
    icon: string;
    className?: string;
}

export default function SpecialtyCard({ title, description, icon, className }: SpecialtyCardProps) {
    const t = useTranslations();
    return (
        <div className={cn("rounded-3xl bg-white p-4 shadow-md h-full flex flex-col justify-between", className)}>
            <div className="flex items-center gap-6">
                <div className="rounded-lg bg-[#EBFDFF] border-2 border-[#BAE5E9] aspect-square w-22 flex items-center justify-center">
                    <div className="relative w-14 h-14">
                        <Image src={icon} alt={title} fill className="object-contain" />
                    </div>
                </div>
                <h3 className="text-[#29858D] font-bold fs-var-3xl">{t("specialtyNames." + title)}</h3>
            </div>
            <p className="text-[#242424] py-8 leading-8 fs-var-base">{t("specialties.specialtiesInfo." + description)}</p>
            <MainButton href={`/specialties/${title.toLowerCase().replace(/\s+/g, '-')}`} className="bg-teal hover:bg-teal-700 text-center">{t("specialties.specialtiesInfo.exploreMore")}</MainButton>
        </div>
    );
}
