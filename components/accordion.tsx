'use client'
import { useRef, useState, useEffect } from "react";
import { ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
    children: React.ReactNode;
    initialHeight?: number;
    className?: string;
}

export default function Accordion({ children, initialHeight = 0, className }: AccordionProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(initialHeight);

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [isOpen]);

    return (
        <>
            <div
                ref={contentRef}
                className={cn(`transition-all duration-300 ease-in-out overflow-hidden relative`, className)}
                style={{
                    maxHeight: isOpen ? `${height}px` : `${initialHeight}px`,
                    opacity: !initialHeight ? isOpen ? 1 : 0 : 1,
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
    );
}
