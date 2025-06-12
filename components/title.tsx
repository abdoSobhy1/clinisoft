import { cn } from "@/lib/utils"

export default function Title({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <h2 className={cn(`text-center fs-var-2xl md:fs-var-5xl font-semibold text-textTeal`, className)}>{children}</h2>
    )

}