import Image from "next/image";

type ReviewCardProps = {
    doctor: string;
    review: string;
    image: string;
    onClick: (review: string) => void;
}

export default function ReviewCard({ doctor, review, image, onClick }: ReviewCardProps) {


    return (
        <div className="rounded-2xl bg-white p-4 shadow-md text-center h-full self-stretch" onClick={() => onClick(review)}>
            <div className="flex flex-col justify-between items-stretch h-full">
                <div className="relative size-12 mx-auto mb-8">
                    <Image src="/images/icons/quote.svg" alt="quote" fill className="object-contain" />
                </div>
                <div className="space-y-2 flex flex-col justify-start">
                    <div className="relative size-52 mx-auto">
                        <Image src={image} alt={doctor} fill className="object-contain rounded-full" />
                    </div>
                    <h4 className="text-[#1e2531] fs-var-xl font-semibold">{doctor}</h4>
                    <div className="relative w-36 h-5 mx-auto">
                        <Image src="/images/icons/stars.svg" alt="stars" fill className="object-contain" />
                    </div>
                </div>
                {/* <p className="fs-var-sm leading-8 mb-8">{review.length > 150 ? review.slice(0, 150) + " ..." : review}</p> */}
                <p className="fs-var-xl leading-8 mb-8 font-['Tahoma'] grow-1 mt-4">{review.slice(0, 150)}</p>
            </div>
        </div>
    )
}
