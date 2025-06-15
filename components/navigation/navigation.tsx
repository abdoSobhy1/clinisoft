'use client';

import { Roboto } from 'next/font/google';
import { usePathname } from 'next/navigation';
import NavButton from '@/components/navigation/nav-button';
import { useEffect, useState } from 'react';
import SubNav from '../submenu-button';
import SubMenu from '../sub-menu';
import MobileMenu from './mobile-menu';

const roboto = Roboto({
    weight: ["500"],
    subsets: ["latin"],
})

const navLinks = [
    { name: 'home', path: '/' },
    {
        name: 'specialties', path: '/specialties', subMenu: [
            { path: "/specialties/dermatology", name: "specialtyNames.dermatology" },
            { path: "/specialties/dentistry", name: "specialtyNames.dentistry" },
            { path: "/specialties/e-n-t", name: "specialtyNames.ENT" },
            { path: "/specialties/internal-medicine", name: "specialtyNames.internalMedicine" },
            { path: "/specialties/neuro-surgery", name: "specialtyNames.neuroSurgery" },
            { path: "/specialties/ophthalmology", name: "specialtyNames.ophthalmology" },
            { path: "/specialties/orthopedic-surgery", name: "specialtyNames.orthopedicSurgery" },
            { path: "/specialties/pediatrics", name: "specialtyNames.pediatrics" },
            { path: "/specialties/physiotherapy", name: "specialtyNames.physiotherapy" },
            { path: "/specialties/urology", name: "specialtyNames.urology" }
        ]
    },
    { name: 'aboutUs', path: '/about' },
    { name: 'reviews', path: '/reviews' },
    { name: 'customerCare', path: '/customer-care' },
];

export default function Navigation({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth > 1024) {
                setIsOpen(false);
            }
        });
        return () => {
            window.removeEventListener('resize', () => { });
        }
    }, [setIsOpen]);

    if (isMobile) {
        return <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} />;
    }

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
