import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileNavButton, { buttonVariants } from './mobile-nav-button';
import DemoButton from '../demo-button';
import SubMenu from '../sub-menu';
import { useState, useEffect } from 'react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import DermatologyIcon from '@/public/images/icons/dermatology.svg';
import DentistryIcon from '@/public/images/icons/dentistry.svg';
import ENTIcon from '@/public/images/icons/ent.svg';
import InternalMedicineIcon from '@/public/images/icons/internal medicine.svg';
import NeuroSurgeryIcon from '@/public/images/icons/neuro surgery.svg';
import OphthalmologyIcon from '@/public/images/icons/ophthalmology.svg';
import OrthopedicSurgeryIcon from '@/public/images/icons/orthopedic surgery.svg';
import PediatricsIcon from '@/public/images/icons/pediatrics.svg';
import PhysiotherapyIcon from '@/public/images/icons/physiotherapy.svg';
import UrologyIcon from '@/public/images/icons/urology.svg';


interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

type NavLink = {
    name: string;
    path: string;
    subMenu?: { path: string; name: string; icon?: React.ElementType }[];
};

const navLinks: NavLink[] = [
    { name: 'home', path: '/' },

    { name: 'aboutUs', path: '/about' },
    { name: 'reviews', path: '/reviews' },
    { name: 'customerCare', path: '/customer-care' },
    {
        name: 'specialties', path: '/specialties', subMenu: [
            { path: "/specialties/dermatology", name: "specialtyNames.dermatology", icon: DermatologyIcon },
            { path: "/specialties/ophthalmology", name: "specialtyNames.ophthalmology", icon: OphthalmologyIcon },
            { path: "/specialties/dentistry", name: "specialtyNames.dentistry", icon: DentistryIcon },
            { path: "/specialties/orthopedic-surgery", name: "specialtyNames.orthopedicSurgery", icon: OrthopedicSurgeryIcon },
            { path: "/specialties/e-n-t", name: "specialtyNames.ENT", icon: ENTIcon },
            { path: "/specialties/pediatrics", name: "specialtyNames.pediatrics", icon: PediatricsIcon },
            { path: "/specialties/internal-medicine", name: "specialtyNames.internalMedicine", icon: InternalMedicineIcon },
            { path: "/specialties/physiotherapy", name: "specialtyNames.physiotherapy", icon: PhysiotherapyIcon },
            { path: "/specialties/neuro-surgery", name: "specialtyNames.neuroSurgery", icon: NeuroSurgeryIcon },
            { path: "/specialties/urology", name: "specialtyNames.urology", icon: UrologyIcon }
        ]
    },
];


export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
    const pathname = usePathname();
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const screen = typeof window !== 'undefined' ? window.innerHeight : 0;
    const t = useTranslations();


    useEffect(() => {
        if (isOpen) {
            history.pushState({ menu: true }, "", "");
        }

        const handlePopState = () => {
            if (isOpen) {
                setIsOpen(false);

            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [isOpen]);

    useLockBodyScroll(isOpen)

    const menuVariants = {
        initial: { maxHeight: 0, opacity: 0.5 },
        animate: {
            maxHeight: screen,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0]
            }
        },
        exit: {
            maxHeight: 0,
            opacity: 0.5,
            transition: {
                duration: 0.5,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1]
            }
        },
    }

    const containerVariants = {
        initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
        animate: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } },
    }

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        },
        exit: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 2
            }
        }
    }

    return (
        <>
            <button
                className={`cursor-pointer z-50 relative ${isOpen ? 'opacity-0' : ''} transition-opacity duration-300`}
                onClick={() => setIsOpen(true)}
            >
                <Image src="/images/ham-menu.svg" alt="Menu" width={24} height={24} />
            </button>
            {createPortal(
                <AnimatePresence mode='wait'>
                    {isOpen && (
                        <motion.div
                            className="fixed top-0 left-0 h-dvh w-full bg-linear-135 [background-size:100%_300%] from-[#27838e] via-[#56bf95] to-[#82e8ed] z-50 shadow-lg transform transition-transform duration-300 ease-in-out origin-top overflow-hidden"
                            variants={menuVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <motion.nav className='flex flex-col gap-8 items-center justify-center h-full p-6 pt-40' variants={containerVariants} initial="initial" animate="animate" exit="initial">
                                {navLinks.map(link => (link.subMenu ? (
                                    <motion.div className='group overflow-hidden' key={link.name} variants={itemVariants}>
                                        <button className='w-full' onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
                                            <MobileNavButton
                                                href={link.path}
                                                label={link.name}
                                                isActive={pathname === link.path}
                                                isSubMenu={true}
                                                onClick={(e) => {
                                                    setIsSubMenuOpen(!isSubMenuOpen);
                                                    e.preventDefault();
                                                }}
                                            />
                                        </button>
                                        <SubMenu isMobile={true} isOpen={isSubMenuOpen}>
                                            {link.subMenu?.map((subItem) => (
                                                // <MobileNavButton
                                                //     specialtyKey="specialtyNames"
                                                //     key={subItem.name}
                                                //     href={subItem.path}
                                                //     label={subItem.name}
                                                //     isActive={pathname === subItem.path}
                                                //     onClick={() => setIsSubMenuOpen(false)}
                                                //     className='text-left fs-var-xl'
                                                //     icon={subItem.icon}
                                                // />
                                                <motion.li key={subItem.name} variants={buttonVariants} initial="initial" animate="open" exit="initial" className="list-none">
                                                    {subItem.icon &&
                                                        <div className="size-8 flex items-center justify-center text-white mx-auto">
                                                            <subItem.icon className="w-full h-full" />
                                                        </div>
                                                    }
                                                    <Link href={subItem.path} className={`flex items-center gap-2 text-white fs-var-base opacity-70 font-medium justify-center px-2 uppercase transition duration-300  hover:opacity-100  ${pathname === subItem.path ? 'opacity-100' : ''}`} onClick={() => setIsSubMenuOpen(false)} >

                                                        {t(subItem.name)}
                                                    </Link>
                                                </motion.li>
                                            ))}
                                        </SubMenu>
                                    </motion.div>
                                ) : (
                                    <motion.div className="overflow-hidden" key={link.name} variants={itemVariants}>
                                        <MobileNavButton href={link.path} label={link.name} isActive={pathname === link.path} />
                                    </motion.div>
                                )))}
                                <motion.div variants={itemVariants} className="mt-auto w-[60%]">
                                    <DemoButton className="w-full text-center tracking-widest" />
                                </motion.div>
                            </motion.nav>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
} 