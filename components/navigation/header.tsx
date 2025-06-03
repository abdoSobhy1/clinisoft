
import Image from "next/image";
import Navigation from "./navigation";
import DemoButton from "../demo-button";
import Link from "next/link";



export default function Header() {


    return (
        <header className="py-4 px-6 w-[calc(100%-2rem)] md:w-full max-w-screen-xl mx-auto bg-[#FFFFFFCC] border-white border-1 backdrop-blur-xs rounded-full fixed top-8 left-1/2 -translate-x-1/2 z-50 shadow-md">
            <div className="flex justify-between items-center  mx-auto">
                <div className="flex items-center space-x-2 order-2 md:order-1">
                    <Link href="/">
                        <Image src="/images/logo.png" alt="CliniSoft Logo" width={160} height={40} priority />
                    </Link>
                </div>
                <Navigation />
                <div className="order-3 md:order-3">
                    <DemoButton shortHand={true} />
                </div>
            </div>
        </header>
    )
}
