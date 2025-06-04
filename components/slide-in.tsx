'use client'
import { motion } from 'framer-motion';
import { ElementType, ReactNode } from 'react';

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

export default function SlideIn({
    children,
    direction,
    as: Component = 'div',
    className = '',
    delay = 0.3,
    duration = 0.5,
    amount = 0.05
}: SlideInProps) {
    const initial = getInitialPosition(direction);

    const MotionComponent = motion(Component);

    return (
        <MotionComponent
            initial={{ ...initial, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: true, amount }}
            transition={{ duration, delay }}
            className={className}
        >
            {children}
        </MotionComponent>
    );
}
