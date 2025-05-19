'use client'
import { ChevronsDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function InnovationDescription({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 640);
        });
        return () => {
            window.removeEventListener('resize', () => { });
        }
    }, []);


    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [isOpen]);

    return (
        isMobile ?
            <>
                <div
                    ref={contentRef}
                    className={`transition-all duration-300 ease-in-out overflow-hidden relative ${!isOpen ? "mask-gradient" : ""}`}
                    style={{
                        maxHeight: isOpen ? `${height}px` : `${50}px`,
                    }}
                >

                    {children}
                </div>
                <button
                    onClick={handleClick}
                    className="mx-auto"
                >
                    <ChevronsDown
                        className={`text-[#616161] w-8 h-8 ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>
            </>
            : children
    )
}