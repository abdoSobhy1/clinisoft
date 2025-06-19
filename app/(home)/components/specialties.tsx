'use client'

import { useMobile } from "@/hooks/useMobile";

import SpecialtiesCaroussel from "../../../components/specialties/specialties-caroussel-mobile";
import SpecialtiesCarousselDesktop from "../../../components/specialties/specialties-caroussel-desktop";
import { useEffect, useState } from "react";

import DentistryIcon from '@/public/images/icons/dentistry.svg';
import PhysiotherapyIcon from '@/public/images/icons/physiotherapy.svg';
import DermatologyIcon from '@/public/images/icons/dermatology.svg';
import OphthalmologyIcon from '@/public/images/icons/ophthalmology.svg';
import InternalMedicineIcon from '@/public/images/icons/internal medicine.svg';
import ENTIcon from '@/public/images/icons/ent.svg';
import PediatricsIcon from '@/public/images/icons/pediatrics.svg';

export default function Specialties() {
    const isMobile = useMobile();
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
    const [lastScrollY, setLastScrollY] = useState(0);


    const specialties = [{
        title: "dentistry",
        description: "dentistryDescription",
        icon: DentistryIcon
    },
    {
        title: "physiotherapy",
        description: "physiotherapyDescription",
        icon: PhysiotherapyIcon
    },
    {
        title: "dermatology",
        description: "dermatologyDescription",
        icon: DermatologyIcon
    },
    {
        title: "ophthalmology",
        description: "ophthalmologyDescription",
        icon: OphthalmologyIcon
    },
    {
        title: "internalMedicine",
        description: "internalMedicineDescription",
        icon: InternalMedicineIcon
    },
    {
        title: "ENT",
        description: "ENTDescription",
        icon: ENTIcon
    },
    {
        title: "pediatrics",
        description: "pediatricsDescription",
        icon: PediatricsIcon
    }
    ];

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
        return <SpecialtiesCaroussel didAnimate={didAnimate} setDidAnimate={setDidAnimate} specialties={specialties} />
    }
    if (!isMobile && scrollDirection === 'down') {
        return <SpecialtiesCarousselDesktop didAnimate={didAnimate} setDidAnimate={setDidAnimate} specialties={specialties} />
    }
    return null;
}