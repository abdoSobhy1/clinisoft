"use client";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DemoButton(props: { shortHand?: boolean, className?: string }) {
    const t = useTranslations("other");
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
        <Link href="/request-a-demo" className={cn(`inline-block uppercase bg-maroon  font-semibold py-2 px-6 rounded-full transition  text-white fs-var-base`, props.className)}>
            {isMobile && props.shortHand ? t("demo") : t("requestDemo")}
        </Link>
    )
}
