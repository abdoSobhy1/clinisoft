import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface FooterListItem {
    label: string;
    href?: string;
}

interface FooterListProps {
    items: FooterListItem[];
    className?: string;
}

const FooterList: React.FC<FooterListProps> = ({ items, className }) => {
    const t = useTranslations();

    const displayText = (text: string) => {
        // If text contains @ or + or is a phone number, return as is
        if (text.includes('@') || text.includes('+') || /^\d/.test(text)) {
            return text;
        }

        return t(text)
    }

    return (
        <ul className={cn("space-y-8", className)}>
            {items.map((item, idx) => {
                return item.href ? (
                    <li key={idx}>
                        <Link href={item.href} className="fs-var-xl lg:fs-var-base font-bold text-white">
                            {displayText(item.label)}
                        </Link>
                    </li>
                ) : (
                    <li key={idx} className="fs-var-xl  lg:fs-var-basefont-bold text-white">{displayText(item.label)}</li>
                );
            })}
        </ul>
    );
}

export default FooterList; 