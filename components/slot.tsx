import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Slot({ title, href }: { title: string, href: string }) {
    return (
        <Link href={href} className="inline-block w-full">
            <div className="bg-[#f4f3f6] rounded-[20px] border-2 border-white p-4 flex items-center justify-between text-[#203e71] ">
                <p className="font-medium">{title}</p>
                <ChevronRight size={24} />
            </div>
        </Link>
    )
}
