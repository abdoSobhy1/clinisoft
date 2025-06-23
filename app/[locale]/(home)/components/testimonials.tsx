'use client'
import ReviewCard from "@/components/review-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useCallback, useEffect } from "react";
import { ReviewDialog } from "./review-dialog";
import reviews from '@/public/reviews.json'
import Seperator from "@/components/footer/seperator";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import Title from "@/components/title";
type Review = {
    doctor: string;
    review: string;
    image: string;
    specialty: string;
}

interface TestimonialsProps {
    bgColor?: string;
}

export default function Testimonials({ bgColor = "" }: TestimonialsProps) {
    const t = useTranslations("testimonials");
    const [isOpen, setIsOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const carouselRef = useRef<HTMLDivElement>(null)
    const autoplayRef = useRef(
        Autoplay({ delay: 2000 })
    )

    autoplayRef.current?.stop()

    const carousselInView = useInView(carouselRef, {
        amount: 0.5
    })

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

    const handleDialogClose = useCallback((bool: boolean) => {
        setIsOpen(bool)
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

    useEffect(() => {
        if (carousselInView && !isOpen) {
            console.log("focus")
            carouselRef.current?.focus()
        } else {
            console.log("blur")
            carouselRef.current?.blur()
        }
    }, [isOpen, carousselInView])

    return (
        <section className={`py-12 px-4 min-h-vph relative flex flex-col justify-between ${bgColor}`}>
            <Seperator vertical={false} className="from-[transparent] via-[black] to-[transparent] bg-linear-to-r opacity-15" />
            <Title className="max-w-[80%] lg:max-w-7xl mx-auto pb-12">{t("doctorsAcrossSpecialties")}</Title>
            <Carousel
                plugins={[autoplayRef.current]}
                className="w-full flex-1 [&>*:last-child]:h-full"
                onMouseEnter={() => {
                    setIsHovered(true)
                    autoplayRef.current?.stop()
                }}
                onMouseLeave={() => {
                    setIsHovered(false)
                    autoplayRef.current?.play()
                }}
                opts={{ loop: true }}
                autoFocus={true}
            >
                <div ref={carouselRef} tabIndex={0} className="w-full h-full flex justify-between items-center">
                    <CarouselNext className="w-16 h-16 fs-var-2xl right-10 hidden md:flex text-white" />
                    <CarouselPrevious className="w-16 h-16 fs-var-2xl left-10 hidden md:flex text-white" />
                </div>
                <CarouselContent className="h-full flex-1" >
                    {reviews.map((review, index) => (
                        <CarouselItem key={review.doctor} className="min-w-[350px] basis-1 md:basis-1/3 lg:basis-1/5 mb-6  min-h-full ">
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
