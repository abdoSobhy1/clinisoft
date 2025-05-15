import React from "react";
import FooterSection from "./FooterSection";
import FooterList from "./FooterList";
import FooterContactCard from "./FooterContactCard";
import FooterSocialIcons from "./FooterSocialIcons";
import Image from "next/image";
import DemoButton from "../demo-button";
import Seperator from "./seperator";

const specialties = [
    [
        { label: "Dentistry", href: "/specialties/dentistry" },
        { label: "Dermatology", href: "/specialties/dermatology" },
        { label: "E.N.T", href: "/specialties/ent" },
        { label: "Internal Medicine", href: "/specialties/internal-medicine" },
        { label: "Neuro Surgery", href: "/specialties/neuro-surgery" },
    ],
    [
        { label: "Ophthalmology", href: "/specialties/ophthalmology" },
        { label: "Orthopedic Surgery", href: "/specialties/orthopedic-surgery" },
        { label: "Pediatrics", href: "/specialties/pediatrics" },
        { label: "Physiotherapy", href: "/specialties/physiotherapy" },
        { label: "Urology", href: "/specialties/urology" }
    ]
];

const otherLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Blogs", href: "/blogs" },
    { label: "Reviews", href: "/reviews" },
    { label: "Customer Care", href: "/contact-us" }
];

const contactInfo = [
    { label: "5th Yathreb Towers, Acid City, Smouha, Alexandria" },
    { label: "+2 (120) 469 8888", href: "tel:+201204698888" },
    { label: "info@clinisoft.com.eg", href: "mailto:info@clinisoft.com.eg" }
];

const Footer: React.FC = () => (
    <footer className="bg-[#1A2632] pt-12 pb-4 px-4 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr_1fr_1.5fr] gap-4 items-start">
            <div className="flex flex-col items-center h-full gap-4 col-span-2 md:col-span-1 relative">
                <Image src="/images/icons/white-footer-logo.svg" alt="CliniSoft Logo" width={110} height={110} />
                <DemoButton />
                <Seperator className="hidden md:block" vertical />
            </div>
            <FooterSection title="Specialties">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                    <FooterList items={specialties[0]} />
                    <FooterList items={specialties[1]} />
                    <Seperator className="right-4 md:right-0" vertical />
                </div>
            </FooterSection>
            <FooterSection title="Other Links" >
                <FooterList items={otherLinks} />
                <Seperator className="hidden md:block" vertical />
            </FooterSection>
            <FooterSection title="Contact Us" className="col-span-2 md:col-span-1 text-center md:text-left my-4 md:my-0" >
                <Seperator className="block md:hidden -top-2" />
                <FooterList items={contactInfo} className="space-y-4" />
                <Seperator className="hidden md:block" vertical />
                <Seperator className="block md:hidden top-auto -bottom-4" />
            </FooterSection>
            <FooterContactCard />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-10 pt-6 gap-4 relative">
            <Seperator />
            <span className="text-[#d0cfec]">Copyright © {new Date().getFullYear()} CliniSoft. All rights reserved.</span>
            <FooterSocialIcons />
        </div>
    </footer>
);

export default Footer; 