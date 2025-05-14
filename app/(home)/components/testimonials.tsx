'use client'
import ReviewCard from "@/components/review-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import Image from "next/image";

import reviews from '@/public/reviews.json'



type Review = {
    doctor: string;
    review: string;
    image: string;
    specialty: string;
}



export default function Testimonials() {
    const plugin = useRef(
        Autoplay({ delay: 2000 })
    )

    const [open, setOpen] = useState(false)
    const [selectedReview, setSelectedReview] = useState<Review | null>(null)

    const handleReviewClick = (review: Review) => {
        setSelectedReview(review)
        setOpen(true)
    }

    return (
        <section className="py-6 px-4 ">
            <h2 className="py-12 text-center text-2xl md:text-5xl font-semibold text-teal">Loved & Recommended by Physicians</h2>
            <Carousel plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => plugin.current.play()}
                opts={{ loop: true }}
            >
                <CarouselNext />
                <CarouselPrevious />
                <CarouselContent >
                    {reviews.map((review) => (
                        <CarouselItem key={review.doctor} className="min-w-[350px] basis-1 md:basis-1/3 lg:basis-1/5 mb-6">
                            <ReviewCard doctor={review.doctor} review={review.review} image={review.image} onClick={() => handleReviewClick(review)} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <Dialog open={open} onOpenChange={setOpen}>
                {
                    selectedReview &&
                    <DialogContent>
                        <DialogTitle className="sr-only">Testimonial</DialogTitle>
                        <div className="text-center">
                            <Image src={selectedReview?.image} alt={selectedReview?.doctor} width={100} height={100} className="mx-auto rounded-full mb-4" />
                            <p className="text-lg font-semibold mb-1">{selectedReview?.doctor}</p>
                            <p className="text-sm font-semibold text-gray-500 mb-2">{selectedReview?.specialty}</p>
                            <p className="text-lg text-gray-500" >{selectedReview?.review}</p>
                        </div>
                    </DialogContent>
                }
            </Dialog>
        </section>
    );
}
