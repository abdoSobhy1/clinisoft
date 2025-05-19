import Image from "next/image";
import DemoButton from "../demo-button";
import Link from "next/link";
import InnovationDescription from "./innovation-description";
type InnovationCardProps = {
    title: string;
    description: string;
    image: string;
    isEven: boolean;
    link: string;
}

export default function InnovationCard({ title, description, image, isEven, link }: InnovationCardProps) {
    return (
        <div className={`rounded-3xl ${isEven ? "-bg-linear-135" : "bg-linear-135"} from-[#1E949E26] via-[#CBCBCB00] to-[#FFFFFFCC] py-4 px-8 shadow-lg shadow-[#c9f1f4] h-full flex flex-col stroke-1 stroke-[#FFFFFF33]`} >
            <div className={`flex flex-col-reverse ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-4 items-center mb-4`}>
                <div className="flex flex-col gap-4 justify-between text-center md:text-left">
                    <h3 className="text-[#545778] font-semibold text-3xl ">{title}</h3>
                    <InnovationDescription>
                        <p className="text-[#4d504f] text-[20px]  leading-8">{description}</p>
                        <Link href={link} className="text-[#1A6D74] text-[20px] underline  leading-8">Read More</Link>
                    </InnovationDescription>
                </div>
                <Image src={image} alt={title} width={350} height={350} />
            </div>
            <div className="mx-auto md:ml-auto md:mr-0">
                <DemoButton className="w-full" />
            </div>
        </ div>
    );
}
