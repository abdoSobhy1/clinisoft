import Title from "@/components/title"
import Image from "next/image"
import { useTranslations } from "next-intl";
import Link from "next/link";
const partners = [[
    { partner: "orange", logo: "/images/partners/orange.webp", link: "https://www.orange.com" },
    { partner: "microsoft", logo: "/images/partners/microsoft.webp", link: "https://www.microsoft.com" },
    { partner: "teamViewer", logo: "/images/partners/teamviewer.webp", link: "https://www.teamviewer.com" },
    { partner: "millensys", logo: "/images/partners/millensys.webp", link: "https://www.millensys.com" },
    { partner: "reporty", logo: "/images/partners/reporty.webp", link: "https://www.reporty.sa" },
    { partner: "samsung", logo: "/images/partners/samsung.webp", link: "https://www.samsung.com" },
    { partner: "meta", logo: "/images/partners/meta.webp", link: "https://www.meta.com" },
    { partner: "google", logo: "/images/partners/google.webp", link: "https://www.google.com" },
], [
    { partner: "mastercard", logo: "/images/partners/mastercard.webp", link: "https://www.mastercard.com" },
    { partner: "visa", logo: "/images/partners/visa.webp", link: "https://www.visa.com" },
    { partner: "banque-misr", logo: "/images/partners/banque-misr.webp", link: "https://www.banquemisr.com" },
    { partner: "paymob", logo: "/images/partners/paymob.webp", link: "https://www.paymob.com" },
]]

interface SuccessPartnersProps {
    bgColor?: string;
}

export default function SuccessPartners({ bgColor = "" }: SuccessPartnersProps) {
    const t = useTranslations("partners");
    return (
        <section className={`py-12 px-4 grid max-w-7xl mx-auto ${bgColor}`}>
            <Title className="pb-12">{t("successPartners")}</Title>
            <div className="space-y-10">
                {partners.map((item, index) => (
                    <div key={index} className="flex flex-wrap gap-10 justify-center items-center">
                        {item.map((partner) => (
                            <Link key={partner.partner} href={partner.link} target="_blank" className={` inline-block relative max-w-30 w-16 md:w-40 h-20`}>
                                <Image src={partner.logo} alt={partner.partner} fill className="object-contain" />
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}