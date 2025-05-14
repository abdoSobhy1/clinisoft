import React from "react";
import Link from "next/link";

interface FooterListItem {
    label: string;
    href?: string;
}

interface FooterListProps {
    items: FooterListItem[];
}

const FooterList: React.FC<FooterListProps> = ({ items }) => {
    return (
        <ul className="space-y-8">
            {items.map((item, idx) => {
                return item.href ? (
                    <li key={idx}>
                        <Link href={item.href} className="text-base font-bold text-white">
                            {item.label}
                        </Link>
                    </li>
                ) : (
                    <li key={idx} className="text-base font-bold text-white">{item.label}</li>
                );
            })}
        </ul>
    );
}
export default FooterList; 