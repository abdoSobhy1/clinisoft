import React from "react";
import Image from "next/image";

const icons = [
    {
        href: "https://www.linkedin.com/company/clinisoft-hr",
        label: "LinkedIn",
        icon: "/images/icons/linkedin.svg"
    },
    {
        href: "https://www.instagram.com/clinisoft.insta",
        label: "Instagram",
        icon: "/images/icons/instagram.svg"

    },
    {
        href: "https://www.facebook.com/CliniSoft",
        label: "Facebook",
        icon: "/images/icons/facebook.svg"

    }
];

const FooterSocialIcons: React.FC = () => (

    <div className="flex gap-4 mt-2">
        {icons.map((icon) => (
            <a
                key={icon.label}
                href={icon.href}
                aria-label={icon.label}
                className="text-[#d0cfec] hover:text-white transition-colors h-[25px] w-[25px]"
                target="_blank"
            >
                <Image src={icon.icon} alt={icon.label} width={25} height={25} className="max-h-full" />
            </a>
        ))}
    </div>
);

export default FooterSocialIcons; 