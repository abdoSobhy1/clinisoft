import { ArrowRightIcon } from "lucide-react";
import MainButton from "./main-button";
import { CarouselItem } from "./ui/carousel";
import DemoButton from "./demo-button";

export default function HeroSlide({
    title,
    description,
    image,
}: {
    title: string;
    description: string;
    image: string;
}) {
    return (
        <CarouselItem className="p-0">
            <div
                className="w-full pl-2 md:pl-0 h-dvh flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#F0FFFF] before:from-10% before:to-[#F0FFFF00] before:to-50% before:z-2 before:pointer-events-none after:content-[''] after:absolute after:inset-0 after:bg-linear-135 after:from-[#29858de6] after:to-[#29858d4d] after:z-1 after:pointer-events-none" />
                <div className="relative z-5 text-center px-4">
                    <h1 className="leading-[96px] text-3xl md:text-5xl lg:text-7xl font-bold relative text-[#A2E2E9] bg-gradient-to-t from-[#A2E2E9] to-[#FFFFFF] supports-[background-clip:text]:text-transparent supports-[background-clip:text]:bg-clip-text">
                        {title}
                    </h1>
                    <h1 className="absolute leading-[96px] inset-0 text-3xl md:text-5xl lg:text-7xl font-bold -z-1 [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)] select-none">
                        {title}
                    </h1>
                    <p className="font-[400] text-sm md:text-[20px] md:leading-8 mt-6 max-w-[95%] md:max-w-3xl m-auto">{description}</p>
                    <DemoButton className="inline-block my-4 md:my-10 py-3 px-8" />
                    <p className="text-[#277A83] text-[20px] font-medium hidden md:block">Trusted by Thousands of clinics across Egypt and the Middle East.</p>
                </div>
            </div>
        </CarouselItem>
    );
}
