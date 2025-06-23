import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface FooterListItemWithIcon {
    label: string;
    href?: string;
    icon?: React.ReactNode;
}

interface FooterListWithIconsProps {
    items: FooterListItemWithIcon[];
    className?: string;
}

const FooterListWithIcons: React.FC<FooterListWithIconsProps> = ({ items, className }) => {
    const t = useTranslations();

    const displayText = (text: string) => {
        if (text.includes('@') || text.includes('+') || /^\d/.test(text)) {
            return text;
        }
        return t(text);
    };

    return (
        <ul className={cn("space-y-8", className)}>
            {items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                    {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                    {item.href ? (
                        <Link href={item.href} className="fs-var-xl lg:fs-var-base font-bold text-white">
                            {displayText(item.label)}
                        </Link>
                    ) : (
                        <span className="fs-var-xl lg:fs-var-base font-bold text-white">{displayText(item.label)}</span>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default FooterListWithIcons; 