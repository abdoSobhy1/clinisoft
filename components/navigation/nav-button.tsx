import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
type Props = {
    href: string;
    label: string;
    isActive?: boolean;
    isSubMenu?: boolean;
};

export default function NavButton(props: Props) {
    const t = useTranslations("navMenu");
    return (
        <Link href={props.href} className={`flex items-center gap-2 text-teal fs-var-base opacity-70 font-medium relative px-2 transition duration-300 uppercase after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:transition after:duration-300 hover:opacity-100 hover:after:bg-teal ${props.isActive ? 'after:bg-teal opacity-100' : ''}`}>
            {t(props.label)}
            {props.isSubMenu && <ChevronDown size={14} />}
        </Link>
    );
};
