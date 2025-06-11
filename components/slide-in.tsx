'use client';
import { motion, useInView } from 'framer-motion';
import { ElementType, ReactNode, useEffect, useRef, useState } from 'react';

type Direction = 'left' | 'right' | 'top';

interface SlideInProps {
    children: ReactNode;
    direction: Direction;
    as?: ElementType;
    className?: string;
    delay?: number;
    duration?: number;
    amount?: number;
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
export function useScrollDirection() {
    const [scrollingDown, setScrollingDown] = useState(true);
    const lastY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setScrollingDown(currentY > lastY.current);
            lastY.current = currentY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollingDown;
}

export default function SlideIn({
    children,
    direction,
    as: Component = 'div',
    className = '',
    delay = 0.3,
    duration = 0.5,
    amount = 0.05
}: SlideInProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { amount, once: true });
    const scrollingDown = useScrollDirection();

    const MotionComponent = motion(Component);
    const initial = getInitialPosition(direction);

    return (
        <MotionComponent
            ref={ref}
            initial={scrollingDown ? { ...initial, opacity: 0 } : false}
            animate={inView ? { x: 0, y: 0, opacity: 1 } : undefined}
            transition={scrollingDown ? { duration, delay } : { duration: 0 }}
            className={className}
        >
            {children}
        </MotionComponent>
    );
}
