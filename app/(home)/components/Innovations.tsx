import Seperator from "@/components/footer/seperator";
import InnovationCard from "@/components/innovation-card/innovation-card"
// import SlideIn from "@/components/slide-in"
import Title from "@/components/title"
import Typewriter from "@/components/typewriter"

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

interface InnovationsProps {
    bgColor?: string;
}

export default function Innovations({ bgColor = "" }: InnovationsProps) {

    return (
        <section className={`py-12 relative h-vph-2xl ${bgColor}`}>
            <Seperator vertical={false} className="from-[transparent] via-[black] to-[transparent] bg-linear-to-r opacity-15" />
            <div className="max-w-7xl mx-auto h-full flex flex-col items-center justify-between">

                <Title className="py-b">Built-in Tools that Truly Make a Difference</Title>
                <div className="text-center justify-center text-textTeal text-sm md:text-2xl font-medium leading-loose mb-16 overflow-x-hidden">
                    <Typewriter text="These are not just features" />
                    <Typewriter text="they&apos;re operational game-changers." />
                </div>
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(600px,1fr))] gap-8">
                    {
                        innovations.map((innovation, index) => (
                            <InnovationCard key={index} title={innovation.title} description={innovation.description} image={innovation.image} link={innovation.link} />
                        ))
                    }
                </div>
            </div>
        </section >
    )
}
