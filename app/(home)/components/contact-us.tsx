"use client";

import MainButton from "@/components/main-button";
import Slot from "@/components/slot";
import ContactForm from "../../../components/contact-form";
import Image from "next/image";

const slots = [
    { title: "About Us", href: "/about-us" },
    { title: "Customer Care", href: "/contact-us" },
    { title: "Customer Support", href: "/contact-us" }
];

export default function ContactUsForm() {
    return (
        <section className="py-12 px-4 grid max-w-7xl mx-auto grid-cols-1 lg:grid-cols-[2.8fr_1fr] gap-16">
            <ContactForm />
            <div className="flex flex-col justify-between gap-4">
                <div className="space-y-4">{slots.map((slot) => (
                    <Slot key={slot.title} title={slot.title} href={slot.href} />
                ))}</div>
                <div className="bg-[#1e2334] rounded-[20px] px-8  pt-20 pb-5 text-center">
                    <Image src="/images/icons/phoneCall.svg" alt="Phone Call" width={48} height={48} className="mx-auto mb-8" />
                    <p className="text-white text-2xl font-semibold mb-3">Contact Us</p>
                    <p className="text-[#d0cfec] leading-6 mb-4">You can contact us for a free quote.</p>
                    <p className="text-white text-2xl font-semibold mb-20">+2 (120) 469 8888</p>

                    <MainButton href="/contact-us" className="lg:w-full bg-maroon hover:bg-maroon-700 text-center">Contact Us</MainButton>
                </div>
            </div>
        </section>
    );
}