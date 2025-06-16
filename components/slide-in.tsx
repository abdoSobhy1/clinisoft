'use client';

import { motion, useAnimate, useInView } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

type Direction = 'left' | 'right' | 'top';

interface SlideInProps {
    children: ReactNode;
    direction: Direction;
    className?: string;
    delay?: number;
    duration?: number;
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
}: SlideInProps) {
    const [scope, animate] = useAnimate();

    const inView = useInView(scope, {
        once: true,
        margin: '0px 0px -20% 0px',
    });

    const stillInView = useInView(scope, {
        once: false,
        margin: '0px 0px -20% 0px',
    });

    useEffect(() => {
        if (!stillInView && inView) {
            animate(scope.current, { x: 0, y: 0, opacity: 1 }, { duration: 0 })
        }
    }, [stillInView]);

    const initial = getInitialPosition(direction);

    useEffect(() => {
        console.log({ inView })
        if (!scope.current) {
            return;
        }

        const { top, height } = scope.current.getBoundingClientRect();
        const isScrolledPast = (top + height) < 0;

        if (isScrolledPast) {
            animate(scope.current, { x: 0, y: 0, opacity: 1 }, { duration: 0 })
        } else if (inView && !isScrolledPast) {
            const animationDuration = duration;
            const animationDelay = delay;
            animate(scope.current,
                { x: 0, y: 0, opacity: 1 },
                { duration: animationDuration, delay: animationDelay }
            )
        }
    }, [inView, animate, scope, duration, delay]);

    return (
        <motion.p
            ref={scope}
            initial={{ ...initial, opacity: 0 }}
            className={className}
        >
            {children}
        </motion.p>
    );
}
