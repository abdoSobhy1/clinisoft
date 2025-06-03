'use client'
import ReviewCard from "@/components/review-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useCallback, useEffect } from "react";
import { ReviewDialog } from "./review-dialog";
import reviews from '@/public/reviews.json'

type Review = {
    doctor: string;
    review: string;
    image: string;
    specialty: string;
}

export default function Testimonials() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const autoplayRef = useRef(
        Autoplay({ delay: 2000 })
    )

    // Stop carousel when dialog is open
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isOpen) {
                autoplayRef.current?.stop()
            } else if (!isHovered) {
                autoplayRef.current?.play()
            }
        }, 100) // Small delay to ensure carousel is initialized

        return () => clearTimeout(timer)
    }, [isOpen, isHovered])

    const handleReviewClick = (review: Review, index: number) => {
        setCurrentIndex(index)
        setIsOpen(true)
    }

    const handleDialogClose = useCallback((open: boolean) => {
        setIsOpen(open)
    }, [])

    const handlePreviousReview = () => {
        setCurrentIndex((prev) => {
            if (prev === 0) {
                return reviews.length - 1
            }
            return prev - 1
        })
    }

    const handleNextReview = () => {
        setCurrentIndex((prev) => {
            if (prev === reviews.length - 1) {
                return 0
            }
            return prev + 1
        })
    }

    return (
        <section className="py-6 px-4">
            <h2 className="max-w-7xl mx-auto py-12 text-center text-textTeal text-3xl font-semibold leading-[48px]">Doctors across specialties share their real-world experiences with CliniSoft</h2>
            <Carousel
                plugins={[autoplayRef.current]}
                className="w-full"
                onMouseEnter={() => {
                    setIsHovered(true)
                    autoplayRef.current?.stop()
                }}
                onMouseLeave={() => {
                    setIsHovered(false)
                    autoplayRef.current?.play()
                }}
                opts={{ loop: true }}
            >
                <CarouselNext />
                <CarouselPrevious />
                <CarouselContent>
                    {reviews.map((review, index) => (
                        <CarouselItem key={review.doctor} className="min-w-[350px] basis-1 md:basis-1/3 lg:basis-1/5 mb-6">
                            <ReviewCard doctor={review.doctor} review={review.review} image={review.image} onClick={() => handleReviewClick(review, index)} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <ReviewDialog
                isOpen={isOpen}
                onClose={handleDialogClose}
                reviews={reviews}
                currentIndex={currentIndex}
                onPrevious={handlePreviousReview}
                onNext={handleNextReview}
            />
        </section>
    );
}
