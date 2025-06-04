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
    { name: 'Home', path: '/' },
    {
        name: 'Specialties', path: '/specialties', subMenu: [
            { path: "/specialties/dermatology", name: "Dermatology" },
            { path: "/specialties/dentistry", name: "Dentistry" },
            { path: "/specialties/e-n-t", name: "E.N.T" },
            { path: "/specialties/internal-medicine", name: "Internal Medicine" },
            { path: "/specialties/neuro-surgery", name: "Neuro Surgery" },
            { path: "/specialties/ophthalmology", name: "Ophthalmology" },
            { path: "/specialties/orthopedic-surgery", name: "Orthopedic Surgery" },
            { path: "/specialties/pediatrics", name: "Pediatrics" },
            { path: "/specialties/physiotherapy", name: "Physiotherapy" },
            { path: "/specialties/urology", name: "Urology" }
        ]
    },
    { name: 'About Us', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Customer Care', path: '/customer-care' },
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
