import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
type Props = {
    href: string;
    label: string;
    isActive?: boolean;
    isSubMenu?: boolean;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export const buttonVariants = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.7, 0, 0.63, 1] } },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } },
}

export default function MobileNavButton(props: Props) {
    return (
        <motion.div variants={buttonVariants} initial="initial" animate="open" exit="initial">
            <Link href={props.href} className={`flex items-center gap-2 text-white fs-var-2xl opacity-70 font-medium justify-center px-2 uppercase transition duration-300  hover:opacity-100  ${props.isActive ? 'opacity-100' : ''}`} onClick={props.onClick} >
                {props.label}
                {props.isSubMenu && <ChevronDown size={14} />}
            </Link>
        </motion.div>
    );
};
