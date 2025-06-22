'use client'
import Image from "next/image";
import Navigation from "./navigation";
import DemoButton from "../demo-button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";



export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        if (isFirstLoad) {
            setIsFirstLoad(false);
        }
    }, []);

    const demoButtonVariants = {
        hidden: {
            opacity: 0,
            scaleX: 0,
            x: 100
        },
        visible: {
            opacity: 1,
            scaleX: 1,
            x: 0
        }
    }

    const closeButtonVariants = {
        hidden: { rotate: 180, x: -50 },
        visible: { rotate: 0, x: 0 }
    }


    return (
        <header className="py-4 px-6 w-[calc(100%-2rem)] lg:w-full max-w-screen-xl mx-auto bg-[#FFFFFFCC] border-white border-1 backdrop-blur-[4px] rounded-full fixed top-8 left-1/2 -translate-x-1/2 z-52 shadow-md h-[9.34vh] flex">
            <div className="flex justify-between items-center w-full mx-auto">
                <div className="flex items-center space-x-2 order-2 md:order-1">
                    <Link href="/" className="w-[17.4vh] h-16 relative">
                        <Image src="/images/logo.png" alt="CliniSoft Logo" fill className="object-contain" />
                    </Link>
                </div>
                <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
                <AnimatePresence mode="sync">
                    {!isOpen && <motion.div className="order-3 md:order-3 origin-right block" variants={demoButtonVariants} initial={isFirstLoad ? "visible" : "hidden"} animate="visible" exit="hidden">
                        <DemoButton shortHand={true} />
                    </motion.div>}
                    {isOpen && <motion.button className="order-3 md:order-3" onClick={() => setIsOpen(false)} variants={closeButtonVariants} initial="hidden" animate="visible" exit="hidden">
                        <Image src="/images/icons/close.svg" alt="Close" width={24} height={24} />
                    </motion.button>}
                </AnimatePresence>
            </div>
        </header>
    )
}
