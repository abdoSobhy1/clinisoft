"use client"
import React from "react";
import FooterSection from "./FooterSection";
import FooterList from "./FooterList";
import FooterContactCard from "./FooterContactCard";
import FooterSocialIcons from "./FooterSocialIcons";
import Image from "next/image";
import DemoButton from "../demo-button";
import Seperator from "./seperator";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/contexts/LanguageContext";

const specialties = [
    [
        { label: "specialtyNames.dentistry", href: "/specialties/dentistry" },
        { label: "specialtyNames.dermatology", href: "/specialties/dermatology" },
        { label: "specialtyNames.ENT", href: "/specialties/ent" },
        { label: "specialtyNames.internalMedicine", href: "/specialties/internal-medicine" },
        { label: "specialtyNames.neuroSurgery", href: "/specialties/neuro-surgery" },
    ],
    [
        { label: "specialtyNames.ophthalmology", href: "/specialties/ophthalmology" },
        { label: "specialtyNames.orthopedicSurgery", href: "/specialties/orthopedic-surgery" },
        { label: "specialtyNames.pediatrics", href: "/specialties/pediatrics" },
        { label: "specialtyNames.physiotherapy", href: "/specialties/physiotherapy" },
        { label: "specialtyNames.urology", href: "/specialties/urology" }
    ]
];

const otherLinks = [
    { label: "footer.links.home", href: "/" },
    { label: "footer.links.aboutUs", href: "/about-us" },
    { label: "footer.links.blogs", href: "/blogs" },
    { label: "footer.links.reviews", href: "/reviews" },
    { label: "footer.links.customerCare", href: "/contact-us" }
];

const contactInfo = [
    { label: "footer.contactInfo.address", },
    { label: "footer.contactInfo.phone", href: "tel:+201204698888" },
    { label: "info@clinisoft.com.eg", href: "mailto:info@clinisoft.com.eg" }
];

const Footer: React.FC = () => {
    const t = useTranslations("footer");
    const year = new Date().getFullYear();
    const { currentLanguage } = useLanguage();
    return (
        <footer className="bg-[#1A2632] pt-12 pb-4 px-4 fs-var-sm relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr_1fr_1.5fr] gap-4 items-start">
                <div className="flex flex-col items-center h-full gap-4 col-span-2 md:col-span-1 relative">
                    <Image src="/images/icons/white-footer-logo.svg" alt="CliniSoft Logo" width={110} height={110} />
                    <DemoButton />
                    <Seperator className="hidden md:block" vertical />
                </div>
                <FooterSection title={t("links.specialties")}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                        <FooterList items={specialties[0]} />
                        <FooterList items={specialties[1]} />
                        <Seperator className={`${currentLanguage === 'ar' ? 'left-0 md:left-4' : 'right-4 md:right-0'} `} vertical />
                    </div>
                </FooterSection>
                <FooterSection title={t("links.otherLinks")} >
                    <FooterList items={otherLinks} />
                    <Seperator className="hidden md:block" vertical />
                </FooterSection>
                <FooterSection title={t("links.contactUs")} className={`col-span-2 md:col-span-1 text-center ${currentLanguage === 'ar' ? 'text-right' : 'text-left'} my-4 md:my-0`} >
                    <Seperator className="block md:hidden -top-2" />
                    <FooterList items={contactInfo} className="space-y-4" />
                    <Seperator className={`hidden md:block ${currentLanguage === 'ar' ? '-left-2' : ''} `} vertical />
                    <Seperator className="block md:hidden top-auto -bottom-4 " />
                </FooterSection>
                <FooterContactCard />
            </div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-10 pt-6 gap-4 relative">
                <Seperator />
                <span className="text-[#d0cfec] fs-var-2xl lg:fs-var-base">{t("copyright", { year })}</span>
                <FooterSocialIcons />
            </div>
            <span className="hidden md:block absolute bg-linear-90 from-[#163ECB1F] to-[#FFFFFF00] w-[130px] h-[130px] rounded-full -top-10 -right-20 z-0 pointer-events-none" />
            <span className="hidden md:block absolute -bg-linear-15 from-[#163ECB1F] to-[#FFFFFF00] w-[290px] h-[290px] rounded-full -bottom-30 -left-10 z-0 pointer-events-none" />
            <span className="hidden md:block absolute bg-linear-135 from-[#163ECB1F] to-[#FFFFFF00] w-[250px] h-[250px] rounded-full -bottom-40 -right-10 z-0 pointer-events-none" />
        </footer>
    );
};

export default Footer; 