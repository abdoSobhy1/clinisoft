import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MainButton({ children, href, className }: { children: React.ReactNode, href: string, className?: string }) {
    return (
        <Link
            href={href}
            className={cn(`inline-block w-full lg:w-auto lg:self-end font-medium px-8 py-2 rounded-full transition cursor-pointer fs-var-base text-white bg-teal hover:bg-teal-700`, className)}>
            {children}
        </Link>
    );
}