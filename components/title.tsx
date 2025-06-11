import { cn } from "@/lib/utils"

export default function Title({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <h2 className={cn(`text-center text-2xl md:text-5xl font-semibold text-textTeal`, className)}>{children}</h2>
    )

}