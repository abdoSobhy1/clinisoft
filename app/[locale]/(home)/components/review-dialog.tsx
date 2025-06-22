'use client'

import { useState, useEffect, useCallback, memo, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { XIcon } from 'lucide-react'
import { isArabic } from '@/lib/utils'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

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
    const [direction, setDirection] = useState<number>(0)
    const reviewRef = useRef<HTMLParagraphElement>(null)

    useLockBodyScroll(isOpen)

    useEffect(() => {
        if (reviewRef.current) {
            reviewRef.current.focus()
        }
    }, [currentReview, isOpen])

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

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                handleClose()
            }
            if (event.key === 'ArrowLeft' && isOpen) {
                handlePrevious()
            }
            if (event.key === 'ArrowRight' && isOpen) {
                handleNext()
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => {
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [isOpen, handleClose])

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

                <div className="absolute w-full max-w-[min(95vw,1000px)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-between px-4">
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

                <div className="fixed max-w-[min(95%,800px)] w-full overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4">
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

                            <div className="relative p-6 text-center" autoFocus>
                                <div className="absolute w-[90%]  left-1/2 -translate-x-1/2 translate-y-1/2 flex md:hidden items-center justify-between px-4">
                                    <button
                                        onClick={handlePrevious}
                                        aria-label="Previous review"
                                        className="transition-opacity h-[100px] w-[50px]"
                                        style={{
                                            backgroundColor: 'black',
                                            opacity: 0.7,
                                            cursor: 'pointer',
                                            mask: 'url(/images/icons/chevron-left.svg) no-repeat center center',
                                            maskSize: 'contain',
                                        }}
                                    >
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        aria-label="Next review"
                                        className="transition-opacity h-[100px] w-[50px]"
                                        style={{
                                            backgroundColor: 'black',
                                            opacity: 0.7,
                                            cursor: 'pointer',
                                            mask: 'url(/images/icons/chevron-right.svg) no-repeat center center',
                                            maskSize: 'contain',
                                        }}
                                    >
                                    </button>
                                </div>
                                <div className="relative size-52 mx-auto">
                                    <Image src={currentReview.image} alt={currentReview.doctor} fill className="object-contain rounded-full" priority />
                                </div>
                                <p className="fs-var-lg font-semibold mb-1">{currentReview.doctor}</p>
                                <p className="fs-var-sm font-semibold text-gray-500 mb-2">{currentReview.specialty}</p>
                                <p ref={reviewRef} tabIndex={0} dir={isArabic(currentReview.review) ? "rtl" : "ltr"} className="fs-var-2xl leading-8 mb-8 font-['Tahoma'] grow-1 mt-4 max-h-96 overflow-y-auto focus:outline-none">{currentReview.review}</p>

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