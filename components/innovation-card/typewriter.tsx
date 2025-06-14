'use client'
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TypewriterProps {
    text: string;
    speed?: number;
    className?: string;
    setIsFirstLineFinished?: (isFinished: boolean) => void;
}

export default function Typewriter({ text, speed = 0.05, className = "", setIsFirstLineFinished }: TypewriterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [animationComplete, setAnimationComplete] = useState(false);
    const [animatedText, setAnimatedText] = useState("");

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isInView) {
            interval = setInterval(() => {
                if (animatedText.length < text.length) {
                    setAnimatedText(prev => prev + text[prev.length]);
                }
                else {
                    handleAnimationComplete();
                    clearInterval(interval);
                }
            }, speed * 300);
        }
        return () => clearInterval(interval);
    }, [isInView, text, speed, animatedText]);

    const handleAnimationComplete = () => {
        setIsFirstLineFinished?.(true);
        setAnimationComplete(true);
    }

    return (
        <>
            <p ref={ref} className={`relative text-center text-textTeal fs-var-sm md:fs-var-2xl font-medium leading-loose w-fit translate-x-1/3 ${className}`}>
                {animatedText}
                {!animationComplete && <motion.span className="absolute bottom-0 right-0 translate-x-full"
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
            </p>
        </>
    )

} 