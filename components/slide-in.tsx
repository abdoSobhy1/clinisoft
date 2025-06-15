'use client';

import { motion, useAnimate, useInView } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

type Direction = 'left' | 'right' | 'top';

interface SlideInProps {
    children: ReactNode;
    direction: Direction;
    className?: string;
    delay?: number;
    duration?: number;
    shouldAnimate?: boolean;
}

const getInitialPosition = (direction: Direction) => {
    switch (direction) {
        case 'left':
            return { x: -200, y: 0 };
        case 'right':
            return { x: 200, y: 0 };
        case 'top':
            return { x: 0, y: -200 };
        default:
            return { x: 0, y: 0 };
    }
};

export default function SlideIn({
    children,
    direction,
    className = '',
    delay = 0.3,
    duration = 0.5,
    shouldAnimate = true
}: SlideInProps) {
    const [scope, animate] = useAnimate();
    const [shouldSkip, setShouldSkip] = useState(false);

    const inView = useInView(scope, {
        once: true,
        margin: '0px 0px -20% 0px',
    });

    const initial = getInitialPosition(direction);

    useEffect(() => {
        if (!scope.current) {
            return;
        }

        // If animation is explicitly disabled via prop, set to final state immediately and exit
        if (!shouldAnimate) {
            animate(scope.current, { x: 0, y: 0, opacity: 1 }, { duration: 0 })
            return;
        }

        const rect = scope.current.getBoundingClientRect();
        const isScrolledPast = (rect.top + rect.height) < 0;

        if (isScrolledPast && !shouldSkip) {
            setShouldSkip(true);
            animate(scope.current, { x: 0, y: 0, opacity: 1 }, { duration: 0 })
        } else if (inView || shouldSkip) {
            const animationDuration = shouldSkip ? 0 : duration;
            const animationDelay = shouldSkip ? 0 : delay;
            animate(scope.current,
                { x: 0, y: 0, opacity: 1 },
                { duration: animationDuration, delay: animationDelay }
            )
        }
    }, [inView, animate, scope, shouldSkip, duration, delay, shouldAnimate]);

    return (
        <motion.p
            ref={scope}
            initial={shouldAnimate ? { ...initial, opacity: 0 } : { x: 0, y: 0, opacity: 1 }}
            className={className}
        >
            {children}
        </motion.p>
    );
}
