'use client'
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import React from "react";

interface TypewriterProps {
    text: string;
    speed?: number;
    className?: string;
}

export default function Typewriter({ text, speed = 0.05, className = "" }: TypewriterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [animationComplete, setAnimationComplete] = useState(false);

    const letters = text.split('');

    const totalDuration = letters.length * speed;
    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setAnimationComplete(true);
            }, totalDuration * 1000 + 500);
            return () => clearTimeout(timer);
        }
    }, [isInView, totalDuration]);

    return (
        <p ref={ref} className={`overflow-hidden whitespace-nowrap ${className}`}>
            {!animationComplete ? (
                <>
                    {letters.map((letter, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{
                                duration: 0.1,
                                delay: isInView ? index * speed : 0,
                                ease: "easeInOut"
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{
                            duration: 0.1,
                            delay: isInView ? letters.length * speed : 0
                        }}
                        style={{
                            display: "inline-block",
                            marginLeft: "2px"
                        }}
                    >
                        <motion.span
                            animate={isInView ? { opacity: [1, 0, 1] } : { opacity: 0 }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                repeatDelay: 0.5
                            }}
                        >
                            _
                        </motion.span>
                    </motion.span>
                </>
            ) : (
                <>
                    {text}
                </>
            )}
        </p>
    );
} 