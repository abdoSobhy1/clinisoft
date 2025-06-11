'use client'
import { useState, useEffect } from "react";
import { ChevronsDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedAccordionProps {
    children: React.ReactNode;
    className?: string;
    isOpen?: boolean;
    onToggle?: () => void;
    hideButton?: string;
    animationDuration?: number;
}

export default function AnimatedAccordion({
    children,
    className,
    isOpen,
    onToggle,
    hideButton,
    animationDuration = 0.3,
}: AnimatedAccordionProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Check on mount
        checkMobile();

        // Add event listener for resize
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Determine if accordion should be open
    const shouldBeOpen = isMobile ? isOpen : true;

    const handleClick = () => {
        if (onToggle && !isMobile) {
            onToggle();
        }
    };

    const contentVariants = {
        closed: {
            height: 0,
            opacity: 0,
            transition: {
                duration: animationDuration,
                ease: "easeInOut"
            }
        },
        open: {
            height: "auto",
            opacity: 1,
            transition: {
                duration: animationDuration,
                ease: "easeInOut"
            }
        }
    };

    const iconVariants = {
        closed: {
            rotate: 0,
            transition: {
                duration: animationDuration,
                ease: "easeInOut"
            }
        },
        open: {
            rotate: 180,
            transition: {
                duration: animationDuration,
                ease: "easeInOut"
            }
        }
    };

    return (
        <>
            <motion.div
                className={cn("overflow-hidden grow-1", className)}
                variants={contentVariants}
                initial="closed"
                animate={shouldBeOpen ? "open" : "closed"}
            >
                {children}
            </motion.div>
            {!isMobile && (
                <motion.button
                    onClick={handleClick}
                    className={cn("mx-auto", hideButton)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        variants={iconVariants}
                        animate={shouldBeOpen ? "open" : "closed"}
                    >
                        <ChevronsDown className="text-[#616161] w-8 h-8" />
                    </motion.div>
                </motion.button>
            )}
        </>
    );
} 