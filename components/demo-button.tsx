"use client";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function DemoButton(props: { shortHand?: boolean, className?: string }) {
    const t = useTranslations("other");

    return (
        <Link href="/request-a-demo" className={cn(`inline-block uppercase bg-maroon font-semibold py-2 px-6 rounded-full transition text-white fs-var-base`, props.className)}>
            {props.shortHand ? (
                <>
                    <span className="lg:hidden">{t("demo")}</span>
                    <span className="hidden lg:inline">{t("requestDemo")}</span>
                </>
            ) : (
                t("requestDemo")
            )}
        </Link>
    )
}
