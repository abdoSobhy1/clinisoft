import Image from "next/image";
import DemoButton from "../demo-button";
import Link from "next/link";
import { useTranslations } from "next-intl";
type InnovationCardProps = {
    title: string;
    description: string;
    image: string;
    link: string;
}

export default function InnovationCard({ title, description, image, link }: InnovationCardProps) {
    const t = useTranslations("innovations");
    return (
        <div className={`rounded-3xl bg-linear-135 from-[#1E949E26] via-[#CBCBCB00] to-[#FFFFFFCC] p-5 shadow-lg shadow-[#c9f1f4] h-full flex flex-col justify-between stroke-1 stroke-[#FFFFFF33]`} >
            <div className={`flex flex-col h-full gap-4 items-center mb-4`}>
                <div className="w-full flex-1 flex flex-col gap-4 justify-between text-left items-start">
                    <div className="relative flex-1 w-full min-h-[37vh] self-center">
                        <Image className="self-center object-contain" src={image} alt={title} fill />
                    </div>
                    <h3 className="text-[#545778] font-semibold fs-var-3xl text-left">{t(title)}</h3>
                    <p className="text-[#4d504f] text-[2.17vh]  leading-8 text-left">{t(description)}</p>
                    <Link href={link} className="text-textTeal text-[2.17vh] underline  leading-8 text-left">{t("readMore")}</Link>
                </div>
            </div>
            <div className="mx-auto md:ml-auto md:mr-0 w-full md:w-fit">
                <DemoButton className="w-full inline-block text-center" />
            </div>
        </ div>
    );
}
