import { ArrowRightIcon } from "lucide-react";
import MainButton from "./main-button";
import { CarouselItem } from "./ui/carousel";

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
                className="w-full h-dvh flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: `url(${image})` }}>
                <div className="before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#F0FFFF] before:from-10% before:to-[#F0FFFF00] before:to-50% before:z-2 before:pointer-events-none after:content-[''] after:absolute after:inset-0 after:bg-linear-135 after:from-[#29858de6] after:to-[#29858d4d] after:z-1 after:pointer-events-none" />
                <div className="relative z-5 text-center">
                    <h1 className="text-transparent bg-clip-text bg-gradient-to-t from-[#A2E2E9] to-[#FFFFFF] text-3xl md:text-5xl lg:text-7xl font-bold max-w-7xl m-auto ">{title}</h1>
                    <p className="font-[400] text-[20px] leading-8 mt-6 max-w-[95%] md:max-w-3xl m-auto">{description}</p>
                    <MainButton href="#" className="my-10  bg-[#292929] hover:bg-[#292929]/80 w-auto">Explore Features <ArrowRightIcon className="inline-block ml-2 w-4 h-4" /></MainButton>
                    <p className="text-[#277A83] text-[20px] font-medium hidden md:block">Trusted by hundreds of clinics across Egypt and the Middle East.</p>
                </div>
            </div>
        </CarouselItem>
    );
}
