import Image from 'next/image';
import MainButton from '@/components/main-button';
import Accordion from '@/components/accordion';

export default function Intro() {
    //<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

    return (
        <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center lg:items-start justify-between order-2 md:order-1 text-center lg:text-left">
                    <Image
                        src="/images/logo-small.png"
                        alt="CliniSoft logo"
                        width={64}
                        height={64}
                        className="mb-4"
                    />
                    <h1 className="fs-var-2xl md:fs-var-4xl font-bold text-[#464646] mb-6">
                        The Pioneers of <br />
                        Clinic Digital Transformation
                    </h1>
                    <Accordion initialHeight={70} className='flex flex-col'>
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
                        <MainButton href="/about" className='ml-auto'>Read More</MainButton >
                    </Accordion>

                </div>
                {/* <div className='w-full order-1 md:order-2 h-full' >
                    <Image
                        src="/images/hero-image.webp"
                        alt="Doctor using digital tablet with healthcare interface"
                        width={600}
                        height={600}
                        className="rounded-3xl object-cover w-full h-[300px] md:h-full"
                        priority
                    />
                </div> */}
            </div>
        </section>
    );
}
