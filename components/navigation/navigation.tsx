'use client';

import { Roboto } from 'next/font/google';
import { usePathname } from 'next/navigation';
import NavButton from '@/components/navigation/nav-button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import SubNav from '../submenu-button';
import SubMenu from '../sub-menu';
import { ChevronDown } from 'lucide-react';
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

export default function Navigation() {
    const pathname = usePathname();

    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 1024);
        });
        return () => {
            window.removeEventListener('resize', () => { });
        }
    }, []);


    if (isMobile) {
        return (<Sheet open={isOpen} onOpenChange={setIsOpen} >
            <SheetTrigger className='cursor-pointer'>
                <Image src="/ham-menu.svg" alt="Menu" width={24} height={24} />
            </SheetTrigger>

            <SheetContent side="left" title='Menu' className="[&>button.absolute]:text-teal [&>button.absolute:hover]:text-teal">
                <SheetTitle className="sr-only">
                    menu
                </SheetTitle>
                <nav className='flex flex-col gap-4 my-10'>
                    {navLinks.map(link => (link.subMenu ? (
                        <div className='group' key={link.name}>
                            <button className='w-full' onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
                                <span className={`flex items-center gap-2 text-teal text-sm opacity-70 font-medium relative px-2 transition duration-300 uppercase cursor-pointer after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:transition after:duration-300 hover:opacity-100 hover:after:bg-teal ${pathname === link.path ? 'after:bg-teal opacity-100' : ''}`}>{link.name} <ChevronDown size={14} className={`${isSubMenuOpen ? 'rotate-180' : ''} transition-transform duration-300`} /></span>
                            </button>
                            <SubMenu isMobile={isMobile} isOpen={isSubMenuOpen}>
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
                        <NavButton href={link.path} label={link.name} isActive={pathname === link.path} key={link.name} />)
                    ))}
                </nav>
            </SheetContent>
        </Sheet>)
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
