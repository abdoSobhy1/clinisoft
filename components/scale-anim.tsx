'use client'
import { motion, useAnimate, useInView } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

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
    const [scope, animate] = useAnimate();
    const [shouldSkip, setShouldSkip] = useState(false);
    const isInView = useInView(scope, { once: true });

    useEffect(() => {
        if (!scope.current) return;

        const rect = scope.current.getBoundingClientRect();
        const isScrolledPast = (rect.top + rect.height) < 0;

        if (isScrolledPast && !shouldSkip) {
            setShouldSkip(true);
            animate(scope.current, { opacity: 1, scale: 1 }, { duration: 0 });
        } else if (isInView || shouldSkip) {
            const animationDuration = shouldSkip ? 0 : duration;
            const animationDelay = shouldSkip ? 0 : delay;
            animate(scope.current,
                { opacity: 1, scale: 1 },
                { duration: animationDuration, delay: animationDelay }
            );
        }
    }, [isInView, animate, scope, shouldSkip, duration, delay]);

    return (
        <motion.div
            ref={scope}
            initial={{ opacity: 0, scale: initialScale }}
            className={className}
            style={{ transformOrigin: 'center' }}
        >
            {children}
        </motion.div>
    );
}