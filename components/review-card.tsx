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
                <Image src="/images/icons/quote.svg" alt="quote" width={50} height={35} className="mx-auto mb-8" />
                <div className="space-y-2 flex flex-col justify-start">
                    <Image src={image} alt={doctor} width={225} height={225} className="mx-auto rounded-full" />
                    <h4 className="text-[#1e2531] text-xl font-semibold">{doctor}</h4>
                    <Image src="/images/icons/stars.svg" alt="stars" width={150} height={20} className="mx-auto" />
                </div>
                {/* <p className="text-sm leading-8 mb-8">{review.length > 150 ? review.slice(0, 150) + " ..." : review}</p> */}
                <p className="text-xl leading-8 mb-8 font-['Tahoma'] grow-1 mt-4">{review.slice(0, 150)}</p>
            </div>
        </div>
    )
}
