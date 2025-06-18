"use client";

import MainButton from "@/components/main-button";
import Slot from "@/components/slot";
import ContactForm from "../../../components/contact-form";
import Image from "next/image";
import Seperator from "@/components/footer/seperator";
import { useTranslations } from "next-intl";

const slots = [
    { title: "slots.aboutUs", href: "/about-us" },
    { title: "slots.technicalSupport", href: "/contact-us" },
    { title: "slots.customerSupport", href: "/contact-us" }
];

interface ContactUsFormProps {
    bgColor?: string;
}

export default function ContactUsForm({ bgColor = "" }: ContactUsFormProps) {
    const t = useTranslations("contactUs");
    return (
        <section className={`py-6 px-4 relative ${bgColor}`}>
            <Seperator vertical={false} className="from-[transparent] via-[black] to-[transparent] bg-linear-to-r opacity-15" />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2.8fr_1fr] gap-8 ">
                <ContactForm />
                <div className="flex flex-col  gap-4">
                    <div className="flex flex-col  bg-white rounded-[20px] p-4 text-center space-y-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex-1">
                        <div className="relative flex-1 mx-auto rounded-[20px] w-full overflow-hidden">
                            <Image src="/images/chat-image.webp" alt="Chat Image" fill className=" object-cover" />
                        </div>
                        <MainButton href="http://wa.me/+201208123222" className="lg:w-full bg-textTeal hover:bg-textTeal text-center flex items-center justify-center px-4 py-3 gap-2">
                            <span className="fs-var-base">
                                {t("chatOnWhatsApp")}
                            </span>
                            <div className="relative size-6">
                                <Image src="/images/icons/whatsapp.svg" alt="Phone Call" fill className="object-contain" />
                            </div>
                        </MainButton>
                        <MainButton href="tel:+201204698888" className="lg:w-full bg-maroon hover:bg-maroon-700 text-center py-3">{t("callUs")}</MainButton>
                    </div>
                    {slots.map((slot) => (
                        <Slot key={slot.title} title={t(slot.title)} href={slot.href} />
                    ))}
                </div>
            </div>
        </section >
    );
}