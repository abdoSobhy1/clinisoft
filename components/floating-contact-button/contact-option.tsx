
import Link from "next/link";
import Image from "next/image";

interface ContactOptionProps {
    icon: string;
    label: string;
    link: string;
    bgColor: string;
}

const ContactOption = ({ icon, label, link, bgColor }: ContactOptionProps) => {
    return (
        <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center space-x-2 p-2 rounded-full text-white ${bgColor} size-14 hover:scale-105 transition-transform`}
        >
            <div className="relative group">
                <div className="relative w-8 h-8">
                    <Image src={icon} alt={label} fill className="object-contain" />
                </div>
                <span className="absolute right-full top-1/2 -translate-y-1/2 mr-4 whitespace-nowrap bg-white text-black text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    {label}
                </span>
            </div>
        </Link>
    );
};

export default ContactOption;
