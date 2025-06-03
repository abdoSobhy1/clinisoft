import Image from "next/image";
import DemoButton from "../demo-button";
import Link from "next/link";
type InnovationCardProps = {
    title: string;
    description: string;
    image: string;
    link: string;
}

export default function InnovationCard({ title, description, image, link }: InnovationCardProps) {
    return (
        <div className={`rounded-3xl  bg-linear-135 from-[#1E949E26] via-[#CBCBCB00] to-[#FFFFFFCC] p-5 shadow-lg shadow-[#c9f1f4] h-full flex flex-col justify-between stroke-1 stroke-[#FFFFFF33]`} >
            <div className={`flex flex-col gap-4 items-center mb-4`}>
                <div className="flex flex-col gap-4 justify-between text-center md:text-left">
                    <div className="relative h-80">
                        <Image className="self-center object-contain" src={image} alt={title} fill />
                    </div>
                    <h3 className="text-[#545778] font-semibold text-3xl ">{title}</h3>
                    {/* <InnovationDescription> */}
                    <p className="text-[#4d504f] text-[20px]  leading-8">{description}</p>
                    <Link href={link} className="text-textTeal text-[20px] underline  leading-8">Read More</Link>
                    {/* </InnovationDescription> */}
                </div>
            </div>
            <div className="mx-auto md:ml-auto md:mr-0 w-full md:w-fit">
                <DemoButton className="w-full inline-block text-center" />
            </div>
        </ div>
    );
}
