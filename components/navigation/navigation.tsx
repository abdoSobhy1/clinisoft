'use client';

import { Roboto } from 'next/font/google';
import { usePathname } from 'next/navigation';
import NavButton from '@/components/navigation/nav-button';
import SubNav from '../submenu-button';
import SubMenu from '../sub-menu';
import MobileMenu from './mobile-menu';
import { useMobile } from '@/hooks/useMobile';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const roboto = Roboto({
    weight: ["500"],
    subsets: ["latin"],
})

const navLinks = [
    { name: 'home', path: '/' },
    {
        name: 'specialties', path: '/specialties', subMenu: [
            { path: "/specialties/dermatology", name: "specialtyNames.dermatology", icon: "/images/icons/dermatology.svg" },
            { path: "/specialties/dentistry", name: "specialtyNames.dentistry", icon: "/images/icons/dentistry.svg" },
            { path: "/specialties/e-n-t", name: "specialtyNames.ENT", icon: "/images/icons/ent.svg" },
            { path: "/specialties/internal-medicine", name: "specialtyNames.internalMedicine", icon: "/images/icons/internal medicine.svg" },
            { path: "/specialties/neuro-surgery", name: "specialtyNames.neuroSurgery", icon: "/images/icons/neuro surgery.svg" },
            { path: "/specialties/ophthalmology", name: "specialtyNames.ophthalmology", icon: "/images/icons/ophthalmology.svg" },
            { path: "/specialties/orthopedic-surgery", name: "specialtyNames.orthopedicSurgery", icon: "/images/icons/orthopedic surgery.svg" },
            { path: "/specialties/pediatrics", name: "specialtyNames.pediatrics", icon: "/images/icons/pediatrics.svg" },
            { path: "/specialties/physiotherapy", name: "specialtyNames.physiotherapy", icon: "/images/icons/physiotherapy.svg" },
            { path: "/specialties/urology", name: "specialtyNames.urology", icon: "/images/icons/urology.svg" }
        ]
    },
    { name: 'aboutUs', path: '/about' },
    { name: 'reviews', path: '/reviews' },
    { name: 'customerCare', path: '/customer-care' },
];

// Desktop Navigation Component
function DesktopNav() {
    const pathname = usePathname();

    return (
        <nav className={`${roboto.className} hidden lg:flex md:order-2`}>
            <div className="flex items-center space-x-6">
                {navLinks.map(link => (
                    link.subMenu ? (
                        <div className='relative flex items-center group' key={link.name}>
                            <NavButton href={link.path} label={link.name} isActive={pathname === link.path} isSubMenu={true} />
                            <SubMenu>
                                {link.subMenu?.map((subItem) => (
                                    <SubNav
                                        key={subItem.name}
                                        href={subItem.path}
                                        label={subItem.name}
                                        isActive={pathname === subItem.path}
                                    />
                                ))}
                            </SubMenu>
                        </div>
                    ) : (
                        <NavButton href={link.path} label={link.name} isActive={pathname === link.path} key={link.name} />
                    )
                ))}
            </div>
        </nav>
    );
}

export default function Navigation({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
    const isMobile = useMobile(setIsOpen);
    const [isHydrated, setIsHydrated] = useState(false);

    // Mark as hydrated after initial render
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Before hydration, render both menus with CSS hiding
    if (!isHydrated) {
        return (
            <>
                <DesktopNav />
                <div className="lg:hidden">
                    <Image src="/images/ham-menu.svg" alt="Menu" width={24} height={24} />
                </div>
            </>
        );
    }

    // After hydration, unmount unused menu for better performance
    if (isMobile) {
        return <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />;
    }

    return <DesktopNav />;
}
