import React from "react";
interface FooterSectionProps {
    title: string;
    children: React.ReactNode;
    single?: boolean;
    className?: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, children, single, className }) => (
    <div className={`relative ${single ? "col-span-2 md:col-span-1" : ""} ${className}`}>
        <h4 className="text-[#B0B0BA] font-[400] mb-5 fs-var-base">{title}</h4>
        {children}
    </div>
);

export default FooterSection; 