import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
type Props = {
    href: string;
    label: string;
    isActive?: boolean;
    isSubMenu?: boolean;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
    specialtyKey?: string;
    icon?: string;
};

export const buttonVariants = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.7, 0, 0.63, 1] } },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } },
}

export default function MobileNavButton(props: Props) {

    const t = useTranslations(props.specialtyKey ? "" : "navMenu");
    return (
        <motion.li variants={buttonVariants} initial="initial" animate="open" exit="initial" className="list-none">
            <Link href={props.href} className={cn(`flex items-center gap-2 text-white fs-var-2xl opacity-70 font-medium justify-center px-2 uppercase transition duration-300  hover:opacity-100  ${props.isActive ? 'opacity-100' : ''}`, props.className)} onClick={props.onClick} >
                {props.icon && <Image src={props.icon} alt={props.label} width={14} height={14} className="size-4 text-red-500" />}
                {t(props.label)}
                {props.isSubMenu && <ChevronDown size={14} />}
            </Link>
        </motion.li>
    );
};
