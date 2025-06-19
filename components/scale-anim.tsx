'use client'
import { motion, useAnimate, useInView } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

interface ScaleAnimProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    initialScale?: number;
    trigger?: boolean;
}

export default function ScaleAnim({
    children,
    className = '',
    delay = 0.3,
    duration = 0.5,
    initialScale = 1.1,
    trigger = true,
}: ScaleAnimProps) {
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope, { once: true });

    useEffect(() => {
        if (!scope.current) return;
        if (trigger && isInView) {
            animate(scope.current,
                { opacity: 1, scale: 1 },
                { duration, delay }
            );
        }
    }, [animate, scope, duration, delay, trigger, isInView]);

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
