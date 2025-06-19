import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileNavButton from './mobile-nav-button';
import DemoButton from '../demo-button';
import SubMenu from '../sub-menu';
import { useState, useEffect } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    navLinks: {
        name: string;
        path: string;
        subMenu?: { path: string; name: string; icon?: string }[];
    }[];
}

export default function MobileMenu({ isOpen, setIsOpen, navLinks }: MobileMenuProps) {
    const pathname = usePathname();
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const screen = typeof window !== 'undefined' ? window.innerHeight : 0;

    // Handle back button press when mobile menu is open

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
                            className="fixed top-0 left-0 h-full w-full bg-linear-135 [background-size:100%_300%] from-[#27838e] via-[#56bf95] to-[#82e8ed] z-50 shadow-lg transform transition-transform duration-300 ease-in-out origin-top overflow-hidden"
                            variants={menuVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <motion.nav className='flex flex-col gap-8 items-center justify-center h-full p-6' variants={containerVariants} initial="initial" animate="animate" exit="initial">
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
                                                <MobileNavButton
                                                    specialtyKey="specialtyNames"
                                                    key={subItem.name}
                                                    href={subItem.path}
                                                    label={subItem.name}
                                                    isActive={pathname === subItem.path}
                                                    onClick={() => setIsSubMenuOpen(false)}
                                                    className='text-left fs-var-xl'
                                                    icon={subItem.icon}
                                                />
                                            ))}
                                        </SubMenu>
                                    </motion.div>
                                ) : (
                                    <motion.div className="overflow-hidden" key={link.name} variants={itemVariants}>
                                        <MobileNavButton href={link.path} label={link.name} isActive={pathname === link.path} />
                                    </motion.div>
                                )))}
                                <motion.div variants={itemVariants}>
                                    <DemoButton />
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