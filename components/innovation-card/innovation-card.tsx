import Image from "next/image";
import DemoButton from "../demo-button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/contexts/LanguageContext";
type InnovationCardProps = {
    title: string;
    description: string;
    image: string;
    link: string;
}

export default function InnovationCard({ title, description, image, link }: InnovationCardProps) {
    const t = useTranslations("innovations");
    const { isRTL } = useLanguage();
    return (
        <div className={`rounded-3xl bg-linear-135 from-[#1E949E26] via-[#CBCBCB00] to-[#FFFFFFCC] p-8 shadow-lg shadow-[#c9f1f4] h-full flex flex-col justify-between stroke-1 stroke-[#FFFFFF33]`} >
            <div className={`flex flex-col h-full gap-2 items-center mb-4`}>
                <div className="w-full flex-1 flex flex-col gap-4 justify-between text-left items-start">
                    <div className="relative flex-1 w-full mx-auto min-h-[37vh] md:min-h-[48vh] lg:min-h-[37vh] self-center">
                        <Image className="self-center object-contain" src={image} alt={title} fill />
                    </div>
                    <h3 className="text-[#545778] font-semibold fs-var-3xl text-left">{t(title)}</h3>
                    <p className={`text-[#4d504f] text-[2.17vh] leading-8 ${isRTL ? 'text-right' : 'text-left'}`}>{t(description)} <Link href={link} className={`text-textTeal text-[2.17vh] underline  leading-8 ${isRTL ? 'ml-auto' : 'mr-auto'}`}>{t("readMore")}</Link></p>

                </div>
            </div>
            <div className="mx-auto md:ml-auto md:mr-0 w-full md:w-fit">
                <DemoButton className="w-full inline-block text-center py-4 mt-2 fs-var-xl" />
            </div>
        </ div>
    );
}
