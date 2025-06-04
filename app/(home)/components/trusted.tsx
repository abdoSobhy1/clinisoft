'use client'
import Title from "@/components/title";
import SlideIn from "../../../components/slide-in";

export default function Trusted() {
    const trustPoints = [
        "100% Offline Operation",
        "One-Time Purchase Model",
        "Role-Based Security Access",
        "Reliable, and durable",
        "20+ Specialty-Specific Interfaces",
    ];

    return (
        <section className="max-w-7xl mx-auto py-6 px-4 overflow-x-hidden">
            <div className="text-center">
                <Title className="py-0 text-3xl mb-2">
                    Why Thousands of Clinics Trust CliniSoft
                </Title>
                <p className="text-sm md:text-2xl text-textTeal font-medium leading-normal">
                    With over 19 years of expertise, CliniSoft supports thousands of doctors
                    across Egypt, the Gulf, and beyond.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-8 mt-4 ">
                {trustPoints.map((point, index) => (
                    <SlideIn
                        key={index}
                        direction={index % 2 === 0 ? 'left' : 'right'}
                        className={`content-center bg-[#d7fff6] px-4 py-1.5 md:py-6 border border-[#9fe5d5] rounded-full max-w-m text-textTeal text-center text-lg md:text-[40px] font-medium ${index === trustPoints.length - 1 ? 'col-span-1 lg:col-span-2' : 'col-span-1'}`}
                        delay={index * 0.3}
                        as="p"
                    >
                        {point}
                    </SlideIn>
                ))}
            </div>
        </section >
    )
}

