'use client'
import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScaleAnimProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    initialScale?: number;
}

export default function ScaleAnim({
    children,
    className = '',
    delay = 0.3,
    duration = 0.5,
    initialScale = 1.2,
}: ScaleAnimProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });



    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: initialScale }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: initialScale }}
            transition={{ duration, delay }}
            className={className}
            style={{ transformOrigin: 'center' }}

        >
            {children}
        </motion.div>
    );
}