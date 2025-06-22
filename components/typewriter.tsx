'use client'
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Paragraph from "./paragraph";
import { useLanguage } from "@/contexts/LanguageContext";

interface TypewriterProps {
    text: string;
    speed?: number;
    className?: string;
    setIsFirstLineFinished?: (isFinished: boolean) => void;
    shouldStart?: boolean;
}

export default function Typewriter({ text, speed = 0.05, className = "", setIsFirstLineFinished, shouldStart = true }: TypewriterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: "all" });
    const [animationComplete, setAnimationComplete] = useState(false);
    const [animatedText, setAnimatedText] = useState("");
    const { currentLanguage } = useLanguage();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isInView && shouldStart) {
            interval = setInterval(() => {
                if (animatedText.length < text.length) {
                    setAnimatedText(prev => prev + text[prev.length]);
                }
                else {
                    handleAnimationComplete();
                    clearInterval(interval);
                }
            }, speed * 600);
        }
        return () => clearInterval(interval);
    }, [isInView, text, speed, animatedText, shouldStart]);

    const handleAnimationComplete = () => {
        setIsFirstLineFinished?.(true);
        setAnimationComplete(true);
    }

    return (
        <>
            <Paragraph ref={ref} className={cn(`relative text-center text-textTeal fs-var-base md:fs-var-3xl font-medium leading-loose w-fit ${currentLanguage === 'ar' ? '-translate-x-1/4 md:-translate-x-1/3' : 'translate-x-1/4 md:translate-x-1/3'} ${className}`)}>
                {animatedText.length === 0 && <motion.span initial={{ width: "100%" }} animate={{ width: animatedText.length > 0 ? 0 : "100%", height: animatedText.length > 0 ? "0" : "100%" }} transition={{ duration: 0.5 }} className=" opacity-0 overflow-hidden">p</motion.span>}
                {animatedText}
                {!animationComplete && shouldStart && <motion.span className={`absolute bottom-0 ${currentLanguage === 'ar' ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} `}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    _
                </motion.span>}
            </Paragraph>
        </>
    )
} 