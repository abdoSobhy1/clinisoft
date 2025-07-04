'use client'
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ContactOptionProps {
    icon: string;
    label: string;
    link: string;
    bgColor: string;
}

const ContactOption = ({ icon, label, link, bgColor }: ContactOptionProps) => {

    const isDemo = icon.split("/")[3] === "demo.svg";

    const t = useTranslations('contactOptions');
    return (
        <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center space-x-2 p-2 rounded-full text-white size-20 hover:scale-105 transition-transform`}
            style={{ backgroundColor: bgColor }}
        >
            <div className="relative group">
                <div className={`relative w-10 h-10 ${isDemo ? "bottom-1.5 md:bottom-0" : ""}`}>
                    <Image src={icon} alt={label} fill className="object-contain" priority />
                </div>
                {isDemo && <span className="fs-var-sm font-semibold scale-75 absolute -bottom-2 md:hidden">{t('demo')}</span>}
                <span className="absolute right-full top-1/2 -translate-y-1/2 scale-x-0 mr-8 whitespace-nowrap bg-white text-black text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-x-100 hidden md:inline">
                    {t(label)}
                </span>
            </div>
        </Link>
    );
};

export default ContactOption;
