import InnovationCard from "@/components/innovation-card/innovation-card"

const innovations = [
    {
        title: "Queue Management (QTV)",
        description: "Experience the future of queue management with our innovative screens, powered by Samsung. Our cutting-edge technology combines the latest advancements in display technology with intelligent queue management algorithms to deliver a superior experience for both businesses and customers.",
        image: "/images/qtv.png",
        link: "/innovations/queue-management"
    },
    {
        title: "Security Key",
        description: "Protect your sensitive data and ensure authorized access with our advanced security features. Robust encryption: Safeguard your patient records and financial information with industry-leading encryption standards. Granular access controls: Restrict access to specific files, features, and functionalities based on user roles and permissions. Experience the peace of mind that comes with knowing your data is protected. Sign up for a free demo today and discover the difference.",
        image: "/images/Security-Key.webp",
        link: "/innovations/security-key"
    },
    {
        title: "Smart Card",
        description: "Our innovative barcode clinic card offers a comprehensive solution to enhance patient loyalty and improve your practice’s efficiency. Made from durable PVC, our cards elevate your clinic’s image while providing practical benefits. Packed with features, it includes all clinic data, a QR code, and secure patient information. By providing a personalized and convenient experience, our clinic card fosters stronger patient engagement, simplifies appointment booking, and increases efficiency. Additionally, our clinic card allows you to easily recall patient files from your clinic computer, saving you time and improving the patient experience.",
        image: "/images/smart-card.webp",
        link: "/innovations/smart-card"
    }, {
        title: "Children Coloring book",
        description: "Keep young patients entertained and engaged with our fun and educational coloring books. Featuring over 90 unique designs, our printable coloring books are perfect for children of all ages. Key Benefits: Reduce anxiety: Help children relax and feel more comfortable in the waiting room. Stimulate creativity: Encourage imagination and artistic expression. Educational value: Incorporate educational elements into the designs, making learning fun. Enhanced patient experience: Create a positive and memorable experience for young patients and their families.",
        image: "/images/children-coloring-book.webp",
        link: "/innovations/children-coloring-book"
    }
]



export default function Innovations() {
    return (
        <section>
            <h2 className="py-12 px-4 text-center text-2xl md:text-5xl font-semibold text-teal">Unique Innovativations</h2>
            <div className="max-w-7xl mx-auto space-y-6">
                {
                    innovations.map((innovation, index) => (
                        <InnovationCard key={index} title={innovation.title} description={innovation.description} image={innovation.image} isEven={index % 2 === 0} link={innovation.link} />
                    ))
                }
            </div>
        </section>
    )
}
