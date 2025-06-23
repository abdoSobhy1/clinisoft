import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Slot({ title, href }: { title: string, href: string }) {
    const { currentLanguage } = useLanguage();
    return (
        <Link href={href} className="inline-block w-full">
            <div className="bg-white rounded-[20px] border-2 border-[#f4f3f6] p-4 flex items-center justify-between text-[#203e71] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <p className="font-medium">{title}</p>
                {currentLanguage === "ar" ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </div>
        </Link>
    )
}
