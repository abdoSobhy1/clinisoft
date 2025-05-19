import Image from "next/image"

const partners = [[
    { partner: "orange", logo: "/images/partners/orange.webp" },
    { partner: "microsoft", logo: "/images/partners/microsoft.webp" },
    { partner: "teamViewer", logo: "/images/partners/teamviewer.webp" },
    { partner: "samsung", logo: "/images/partners/samsung.webp" },
    { partner: "meta", logo: "/images/partners/meta.webp" },
    { partner: "google", logo: "/images/partners/google.webp" },
], [
    { partner: "mastercard", logo: "/images/partners/mastercard.webp" },
    { partner: "visa", logo: "/images/partners/visa.webp" },
    { partner: "cib", logo: "/images/partners/cib.webp", w: "105px" },
    { partner: "nbe", logo: "/images/partners/nbe.webp", w: "105px" },
    { partner: "banque-misr", logo: "/images/partners/banque-misr.webp" },
    { partner: "paymob", logo: "/images/partners/paymob.webp" },
]]

export default function SuccessPartners() {
    return (
        <section className="py-12 px-4 grid max-w-7xl mx-auto ">
            <h2 className="py-12 text-center text-2xl md:text-5xl font-semibold text-teal">Success Partners</h2>
            <div className="space-y-10">
                {partners.map((item, index) => (
                    <div key={index} className="flex flex-wrap gap-10 justify-center items-center">
                        {item.map((partner) => (
                            <div key={partner.partner} className={`relative ${partner.w ? `w-[105px]` : "w-40"} h-20`}>
                                <Image src={partner.logo} alt={partner.partner} fill className="object-contain" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}