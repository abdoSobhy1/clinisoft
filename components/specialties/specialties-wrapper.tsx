import Title from "../title";
import { useTranslations } from "next-intl";
import Typewriter from "../typewriter";
import MainButton from "../main-button";

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
                <Title className="fs-var-3xl leading-[67px] mb-4">
                    {t("specialtiesWeServe")}
                </Title>
                <p className="fs-var-sm md:fs-var-3xl text-textTeal font-medium leading-normal">
                    {t("specialInterface")}
                </p>
                {didAnimate ?
                    <p className="fs-var-sm md:fs-var-3xl text-[#ea7f70] font-medium leading-normal">{t("noGenericLayouts")}</p>
                    :
                    <Typewriter text={t("noGenericLayouts")} className="fs-var-sm md:fs-var-3xl text-[#ea7f70] font-medium leading-normal translate-x-0" setIsFirstLineFinished={setDidAnimate} />
                }
            </div >
            {children}
            <MainButton href="/specialties" className="block  md:px-[141px] py-3 bg-maroon hover:bg-maroon-500  text-center lg:w-fit mx-auto fs-var-lg md:fs-var-3xl font-bold mt-4 text-[#f5fffa] " >{t("moreSpecialties")}</MainButton>
        </>
    )
}