import Link from "next/link";
import Image from "next/image";

type SpecialtyCardProps = {
    title: string;
    description: string;
    icon: string;
}

export default function SpecialtyCard({ title, description, icon }: SpecialtyCardProps) {
    return (
        <div className="rounded-3xl bg-white p-4 shadow-md h-full">
            <div className="flex items-center gap-6">
                <div className="rounded-lg">
                    <Image src={icon} alt={title} width={100} height={100} />
                </div>
                <h3 className="text-teal">{title}</h3>
            </div>
            <p className="text-gray-700">{description}</p>
            <button>
                <Link href={`/specialties/${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-teal">Explore More</Link>
            </button>

        </div>
    );
}
