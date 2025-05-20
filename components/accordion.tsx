'use client'
import { useRef, useState, useEffect } from "react";
import { ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
    children: React.ReactNode;
    initialHeight?: number;
    className?: string;
    isOpen?: boolean;
    onToggle?: () => void;
    hideButton?: string;
}

export default function Accordion({ children, initialHeight = 0, className, isOpen: controlledIsOpen, onToggle, hideButton }: AccordionProps) {
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(initialHeight);

    const isOpen = controlledIsOpen ?? uncontrolledIsOpen;

    const handleClick = () => {
        if (onToggle) {
            onToggle();
        } else {
            setUncontrolledIsOpen(prev => !prev);
        }
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
                className={cn(`transition-all duration-300 ease-in-out overflow-hidden relative grow-1`, className)}
                style={{
                    height: isOpen ? `${height}px` : `${initialHeight}px`,
                    opacity: !initialHeight ? isOpen ? 1 : 0 : 1,
                }}
            >
                {children}
            </div>
            <button
                onClick={handleClick}
                className={cn("mx-auto", hideButton)}
            >
                <ChevronsDown
                    className={`text-[#616161] w-8 h-8 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
        </>
    );
}
