// components/HeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col justify-between">
                    <Image
                        src="/logo-small.png"
                        alt="CliniSoft logo"
                        width={64}
                        height={64}
                        className="mb-16"
                    />
                    <h1 className="text-2xl md:text-4xl font-bold text-[#464646] mb-6">
                        The Pioneers of <br />
                        Clinic Digital Transformation
                    </h1>

                    <div className="space-y-4 text-[#767676] mb-6">
                        <p>
                            Our journey began in <strong>2005</strong> with a vision to empower
                            healthcare professionals with intuitive and efficient tools.
                        </p>
                        <p>
                            We understood that the needs of each medical specialty are unique, and
                            a one-size-fits-all approach would not suffice.
                        </p>
                        <p>
                            To address this, we embarked on a mission to develop{' '}
                            <strong>tailored interfaces for every specialty</strong>.
                        </p>
                        <p>
                            This meticulous attention to detail has allowed us to create solutions
                            that seamlessly integrate into the workflows of physicians across
                            various fields.
                        </p>
                    </div>

                    <Link href="/about" className='self-end'>
                        <span className="inline-block bg-teal-600 text-white font-medium px-8 py-2 ml-auto rounded-full hover:bg-teal-700 transition cursor-pointer">
                            Read More
                        </span>
                    </Link>
                </div>
                <div className='w-full'>
                    <Image
                        src="/hero-image.webp"
                        alt="Doctor using digital tablet with healthcare interface"
                        width={600}
                        height={600}
                        className="rounded-3xl object-cover w-full h-auto"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
