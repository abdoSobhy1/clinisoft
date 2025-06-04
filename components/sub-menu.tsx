type Props = {
    isMobile?: boolean;
    isOpen?: boolean;
    children: React.ReactNode;
}

export default function SubMenu(props: Props) {

    if (props.isMobile) {
        return (
            <div className={`max-h-0 opacity-0 overflow-hidden transition-all duration-300 ${props.isOpen ? 'max-h-[100%] opacity-100' : ''}`}>
                <div className="pl-4 py-2  flex flex-col items-center">
                    {props.children}
                </div>
            </div>
        )
    }

    return (
        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto user-select-none group-hover:user-select-auto">
            <div className="bg-[#F4F4F4] shadow-lg rounded-lg py-2 min-w-[200px] flex flex-col">
                {props.children}
            </div>
        </div>
    )
}