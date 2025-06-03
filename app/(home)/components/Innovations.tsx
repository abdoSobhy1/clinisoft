import InnovationCard from "@/components/innovation-card/innovation-card"
import Title from "@/components/title"

const innovations = [
    {
        title: "QTV Display",
        description: "Queue management on top of satellite channels for better waiting experience.",
        image: "/images/qtv.webp",
        link: "/innovations/queue-management"
    },
    {
        title: "PVC Smart Card",
        description: "QR-BarCode patient identification & loyalty enhancement.",
        image: "/images/smart-card.webp",
        link: "/innovations/smart-card"
    },
    {
        title: "Security Key",
        description: "Prevent staff misuse and trace all activity securely.",
        image: "/images/Security-Key.webp",
        link: "/innovations/security-key"
    },
    {
        title: "Coloring Book (Pediatrics)",
        description: "Unique engagement tool for child patients.",
        image: "/images/children-coloring-book.webp",
        link: "/innovations/children-coloring-book"
    }
]



export default function Innovations() {
    return (
        <section>
            <Title className="py-8">Built-in Tools that Truly Make a Difference</Title>
            <div className="text-center justify-center text-textTeal text-4xl font-medium leading-loose mb-16">
                <p>These are not just features</p>
                <p>they&apos;re operational game-changers.</p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(600px,1fr))] gap-8">
                {
                    innovations.map((innovation, index) => (
                        <InnovationCard key={index} title={innovation.title} description={innovation.description} image={innovation.image} link={innovation.link} />
                    ))
                }
            </div>
        </section>
    )
}
