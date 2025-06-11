'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { XIcon } from 'lucide-react'

type Review = {
    doctor: string
    review: string
    image: string
    specialty: string
}

interface ReviewDialogProps {
    isOpen: boolean
    onClose: (open: boolean) => void
    reviews: Review[]
    currentIndex: number
    onPrevious: () => void
    onNext: () => void
}

const ReviewDialog = memo(function ReviewDialog({
    isOpen,
    onClose,
    reviews,
    currentIndex,
    onPrevious,
    onNext
}: ReviewDialogProps) {
    const currentReview = reviews[currentIndex]
    const [direction, setDirection] = useState(0)

    const variants = {
        enter: (direction: number) => ({
            x: direction * -100,
            scale: 0.95,
            opacity: 0
        }),
        center: {
            x: 0,
            scale: 1,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction * 100,
            scale: 0.95,
            opacity: 0
        })
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50
        const velocity = info.velocity.x
        if (info.offset.x > swipeThreshold || velocity > 500) {
            setDirection(1)
            onPrevious()
        } else if (info.offset.x < -swipeThreshold || velocity < -500) {
            setDirection(-1)
            onNext()
        }
    }, [onPrevious, onNext])

    const handlePrevious = useCallback(() => {
        setDirection(-1)
        onPrevious()
    }, [onPrevious])

    const handleNext = useCallback(() => {
        setDirection(1)
        onNext()
    }, [onNext])

    const handleClose = useCallback(() => {
        onClose(false)
    }, [onClose])

    if (!isOpen) return null

    return createPortal(
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-55"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/50"
                    onClick={handleClose}
                />

                <div className="absolute w-full max-w-[min(95vw,800px)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-between px-4">
                    <button
                        onClick={handlePrevious}
                        aria-label="Previous review"
                        className="transition-opacity"
                    >
                        <Image src="/images/icons/chevron-left.svg" alt="Previous" width={100} height={100} />
                    </button>
                    <button
                        onClick={handleNext}
                        aria-label="Next review"
                        className="transition-opacity"
                    >
                        <Image src="/images/icons/chevron-right.svg" alt="Next" width={100} height={100} />
                    </button>
                </div>

                <div className="fixed max-w-[min(95%,600px)] w-full overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4">
                    <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 40,
                                mass: 0.5,
                                velocity: 0,
                                duration: 0.3
                            }}
                            className="relative w-full bg-white rounded-lg shadow-xl overflow-hidden select-none"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.05}
                            dragTransition={{ bounceStiffness: 500, bounceDamping: 40 }}
                            onDragEnd={handleDragEnd}>
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                                aria-label="Close dialog"
                            >
                                <XIcon className="w-5 h-5" />
                            </button>

                            <div className="relative p-6">
                                <div className="text-center">
                                    <Image
                                        src={currentReview.image}
                                        alt={currentReview.doctor}
                                        width={100}
                                        height={100}
                                        className="mx-auto rounded-full mb-4"
                                        priority
                                    />
                                    <p className="text-lg font-semibold mb-1">{currentReview.doctor}</p>
                                    <p className="text-sm font-semibold text-gray-500 mb-2">{currentReview.specialty}</p>
                                    <p className="text-lg text-gray-500">{currentReview.review}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    )
})

export { ReviewDialog }