import Image from "next/image";

type ReviewCardProps = {
    doctor: string;
    review: string;
    image: string;
    onClick: (review: string) => void;
}

export default function ReviewCard({ doctor, review, image, onClick }: ReviewCardProps) {


    return (
        <div className="rounded-2xl bg-white p-4 shadow-md h-full text-center" onClick={() => onClick(review)}>
            <div className="flex flex-col justify-between items-stretch h-full">
                <Image src="/images/icons/quote.svg" alt="quote" width={50} height={35} className="mx-auto mb-8" />
                <p className="text-sm leading-8 mb-8">{review.length > 150 ? review.slice(0, 150) + " ..." : review}</p>
                <div className="space-y-2 grow-1 flex flex-col justify-end">
                    <Image src="/images/icons/stars.svg" alt="stars" width={100} height={20} className="mx-auto" />
                    <Image src={image} alt={doctor} width={70} height={70} className="mx-auto rounded-full" />
                    <h4 className="text-[#1e2531] text-sm font-semibold">{doctor}</h4>
                </div>
            </div>
        </div>
    )
}
