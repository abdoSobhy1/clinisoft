"use client";

import MainButton from "@/components/main-button";
import Slot from "@/components/slot";
import ContactForm from "../../../components/contact-form";
import Image from "next/image";

const slots = [
    { title: "About Us", href: "/about-us" },
    { title: "Technical Support", href: "/contact-us" },
    { title: "Customer Support", href: "/contact-us" }
];

export default function ContactUsForm() {
    return (
        <section className="py-12 px-4 grid max-w-7xl mx-auto grid-cols-1 lg:grid-cols-[2.8fr_1fr] gap-16">
            <ContactForm />
            <div className="flex flex-col justify-between gap-4">
                <div className="bg-white rounded-[20px] p-4 text-center space-y-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                    <Image src="/images/chat-image.webp" alt="Chat Image" width={300} height={300} className="rounded-20" />
                    <MainButton href="http://wa.me/+201208123222" className="lg:w-full bg-textTeal hover:bg-textTeal text-center flex items-center justify-center px-4 py-3 gap-2">
                        <span className="text-base">
                            Chat with us on WhatsApp
                        </span>
                        <Image src="/images/icons/whatsapp.svg" alt="Phone Call" width={24} height={24} />
                    </MainButton>
                    <MainButton href="tel:+201204698888" className="lg:w-full bg-maroon hover:bg-maroon-700 text-center py-3">Call Us</MainButton>
                </div>
                <div className="space-y-4">{slots.map((slot) => (
                    <Slot key={slot.title} title={slot.title} href={slot.href} />
                ))}</div>
            </div>
        </section>
    );
}