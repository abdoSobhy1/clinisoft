"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DemoButton(props: { shortHand?: boolean }) {

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (!props.shortHand) {
            return;
        }
        setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 1024);
        });
        return () => {
            window.removeEventListener('resize', () => { });
        }
    }, []);

    return (
        <Link href="/request-a-demo" className="uppercase bg-maroon text-white font-semibold py-2 px-6 rounded-full transition">
            {isMobile && props.shortHand ? "Demo" : "Request a Demo"}
        </Link>
    )
}
