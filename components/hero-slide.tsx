import { CarouselItem } from "./ui/carousel";
import DemoButton from "./demo-button";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HeroSlide({
    title,
    description,
    image,
}: {
    title: string;
    description: string;
    image: string;
}) {
    const t = useTranslations("hero.slides");
    return (
        <CarouselItem className="p-0">
            <div
                className="w-full pl-2 md:pl-0 h-svh flex flex-col items-center justify-start md:justify-center relative overflow-hidden"
            >
                <Image
                    src={image}
                    alt={`Hero background for ${title}`}
                    fill
                    className="select-none w-full h-full object-cover object-center"
                />
                <div className="before:content-[''] before:absolute before:inset-0 before:bg-linear-0 before:from-[#F0FFFF] before:from-10% before:md:from-20% before:to-[#F0FFFF00] before:to-50% md:before:to-80% before:z-2 before:pointer-events-none after:content-[''] after:absolute after:inset-0 after:bg-linear-135 after:from-[#29858de6] after:to-[#29858d4d] after:z-1 after:pointer-events-none" />
                <div className="relative z-5 text-center px-4 top-40 md:top-auto">
                    <h1 className="leading-[1] md:leading-[96px] fs-var-5xl lg:fs-var-7xl font-bold relative text-[#A2E2E9] bg-linear-0 from-[#A2E2E9] to-[#FFFFFF] supports-[background-clip:text]:text-transparent supports-[background-clip:text]:bg-clip-text">
                        {t(title)}
                    </h1>
                    {/* <h1 className="absolute px-4 leading-10 md:leading-[96px] inset-0 fs-var-2xl md:fs-var-5xl lg:fs-var-7xl font-bold -z-1 [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)] select-none">
                        {t(title)}
                    </h1> */}
                    <p className="font-[400] fs-var-xl md:text-[2.17vh] md:leading-8 mt-6 max-w-[95%] md:max-w-3xl m-auto">{t(description)}</p>
                    <DemoButton className="inline-block my-4 md:my-10 py-3 px-8" />
                    <p className="text-[#277A83] text-[2.17vh] font-medium">{t("trusted")}</p>
                </div>
            </div>
        </CarouselItem>
    );
}
