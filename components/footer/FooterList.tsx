import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
interface FooterListItem {
    label: string;
    href?: string;
}

interface FooterListProps {
    items: FooterListItem[];
    className?: string;
}

const FooterList: React.FC<FooterListProps> = ({ items, className }) => {
    return (
        <ul className={cn("space-y-8", className)}>
            {items.map((item, idx) => {
                return item.href ? (
                    <li key={idx}>
                        <Link href={item.href} className="fs-var-base font-bold text-white">
                            {item.label}
                        </Link>
                    </li>
                ) : (
                    <li key={idx} className="fs-var-base font-bold text-white">{item.label}</li>
                );
            })}
        </ul>
    );
}
export default FooterList; 