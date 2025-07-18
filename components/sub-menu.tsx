import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
    isMobile?: boolean;
    isOpen?: boolean;
    children: React.ReactNode;
}

export default function SubMenu(props: Props) {
    const { isRTL } = useLanguage();

    const direction = isRTL ? 'right-0' : 'left-0';

    if (props.isMobile) {
        return (
            <div className={cn(`opacity-0 overflow-hidden transition-all duration-300 pointer-events-none user-select-none ${props.isOpen ? 'opacity-100 pointer-events-auto user-select-auto' : ''}`)}>
                <ul className="pl-4 py-2  grid grid-cols-2 place-items-center gap-x-4 gap-y-2">
                    {props.children}
                </ul>
            </div>
        )
    }

    return (
        <div className={`absolute top-full ${direction} pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto user-select-none group-hover:user-select-auto`}>
            <ul className="bg-[#F4F4F4] shadow-lg rounded-lg py-2 min-w-[200px] flex flex-col">
                {props.children}
            </ul>
        </div>
    )
}