'use client'
import { motion } from 'framer-motion';
import { ElementType, ReactNode } from 'react';

interface ScaleAnimProps {
    children: ReactNode;
    as?: ElementType;
    className?: string;
    delay?: number;
    duration?: number;
    amount?: number;
    initialScale?: number;
}



export default function ScaleAnim({
    children,
    as: Component = 'div',
    className = '',
    delay = 0.3,
    duration = 0.5,
    amount = 0.05,
    initialScale = 1.2
}: ScaleAnimProps) {
    const MotionComponent = motion(Component);

    return (
        <MotionComponent
            initial={{ scale: initialScale, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount }}
            transition={{ duration, delay }}
            className={className}
            style={{ transformOrigin: 'center' }}
        >
            {children}
        </MotionComponent>
    );
}
