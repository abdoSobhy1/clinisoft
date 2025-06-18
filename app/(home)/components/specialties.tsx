'use client'

import { useMobile } from "@/hooks/useMobile";

import SpecialtiesCaroussel from "../../../components/specialties/specialties-caroussel";
import SpecialtiesCarousselDesktop from "../../../components/specialties/specialties-caroussel-desktop";
import { useEffect, useState } from "react";

export default function Specialties() {
    const isMobile = useMobile();
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection('up');
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const [didAnimate, setDidAnimate] = useState<boolean>(false);

    if (isMobile || scrollDirection === 'up') {
        return <SpecialtiesCaroussel didAnimate={didAnimate} setDidAnimate={setDidAnimate} />
    }
    if (!isMobile && scrollDirection === 'down') {
        return <SpecialtiesCarousselDesktop didAnimate={didAnimate} setDidAnimate={setDidAnimate} />
    }
    return null;
}