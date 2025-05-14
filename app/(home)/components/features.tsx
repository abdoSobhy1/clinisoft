import FeatureCard from "@/components/feature-card"

const featuresList = [
    {
        title: (
            <>
                Convenient, Quick<br />
                <strong>Easy</strong> to use
            </>
        ),
        description: "Your time is valuable, our software is designed to simplify your workflow, maximize your productivity and save you time and effort.",
        icon: "/images/icons/convenient.svg"
    },
    {
        title: (
            <>
                Patient data is encrypted & stored on <strong>secure</strong> servers
            </>
        ),
        description: "We prioritize patient privacy and data security, you can rest assured that your patients' sensitive information is protected from unauthorized access.",
        icon: "/images/icons/server.svg"
    },
    {
        title: (
            <>
                <strong>One time</strong> <br /> payment
            </>
        ),
        description: "Say goodbye to costly annual renewals. Our software is available for a single upfront payment.",
        icon: "/images/icons/wallet.svg"
    },
    {
        title: "Innovative functions and modules",
        description: "As industry leaders in innovation, our groundbreaking solutions revolutionize healthcare. Our continually evolving modules are designed to meet your specific needs.",
        icon: "/images/icons/rocket.svg"
    }
];



export default function Features() {
    return (
        <section className="py-12 px-4 relative before:content-[''] before:absolute before:w-full before:h-0.5  before:bg-linear-to-l before:from-[#1E949E00] before:via-[#1E949E] before:to-[#1E949E00] before:bottom-0 before:left-0">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
                {featuresList.map((feature, index) => (
                    <FeatureCard key={index.toString()} title={feature.title} description={feature.description} icon={feature.icon} isWide={index === 3} />
                ))}
            </div>
        </section>
    )
}