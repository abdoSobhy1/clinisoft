import Title from "../title";
import { useTranslations } from "next-intl";
import Typewriter from "../typewriter";
import MainButton from "../main-button";
import Paragraph from "../paragraph";

interface SpecialtiesWrapperProps {
    children: React.ReactNode;
    didAnimate: boolean;
    setDidAnimate: (didAnimate: boolean) => void;
}

export default function SpecialtiesWrapper({ children, didAnimate, setDidAnimate }: SpecialtiesWrapperProps) {
    const t = useTranslations("specialties");
    return (
        <>
            <div className=" flex flex-col items-center text-textTeal text-center mb-8">
                <Title className="leading-[67px] mb-4">
                    {t("specialtiesWeServe")}
                </Title>
                <Paragraph className="md:fs-var-3xl text-textTeal font-medium leading-normal">
                    {t("specialInterface")}
                </Paragraph>
                {didAnimate ?
                    <Paragraph className="md:fs-var-3xl text-[#ea7f70] font-medium leading-normal italic">{t("noGenericLayouts")}</Paragraph>
                    :
                    <Typewriter text={t("noGenericLayouts")} className="md:fs-var-3xl text-[#ea7f70] font-medium leading-normal md:translate-x-0 italic" setIsFirstLineFinished={setDidAnimate} />
                }
            </div >
            {children}
            <MainButton href="/specialties" className="block  md:px-[141px] py-3 bg-maroon hover:bg-maroon-500  text-center lg:w-fit mx-auto fs-var-lg md:fs-var-3xl font-bold mt-4 text-[#f5fffa] " >{t("moreSpecialties")}</MainButton>
        </>
    )
}