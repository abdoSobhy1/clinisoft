import Image from "next/image";
import MainButton from "@/components/main-button";

type SpecialtyCardProps = {
    title: string;
    description: string;
    icon: string;
}

export default function SpecialtyCard({ title, description, icon }: SpecialtyCardProps) {
    return (
        <div className="rounded-3xl bg-white p-4 shadow-md h-full flex flex-col justify-between">
            <div className="flex items-center gap-6">
                <div className="rounded-lg bg-[#EBFDFF] border-2 border-[#BAE5E9] aspect-square w-[90px] flex items-center justify-center">
                    <Image src={icon} alt={title} width={60} height={60} />
                </div>
                <h3 className="text-[#29858D] font-bold fs-var-3xl">{title}</h3>
            </div>
            <p className="text-[#242424] py-8 leading-8">{description}</p>
            <MainButton href={`/specialties/${title.toLowerCase().replace(/\s+/g, '-')}`} className="bg-teal hover:bg-teal-700 text-center">Explore More</MainButton>
        </div>
    );
}
