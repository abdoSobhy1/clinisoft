import { cn } from "@/lib/utils";

export default function Seperator({ vertical, className }: { vertical?: boolean, className?: string }) {
    return (
        <span className={cn(`absolute  from-[#FFFFFF00] via-[#FFFFFF33] to-[#FFFFFF00] top-0 right-0 ${vertical ? "w-0.25 h-full bg-linear-to-b" : "w-full h-0.25 bg-linear-to-l"}`, className)} />
    );
} 
