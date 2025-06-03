"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ChevronRight, ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollSnaps: number[]
  selectedScrollSnap: number
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])
  const [selectedScrollSnap, setSelectedScrollSnap] = React.useState(0)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
    setSelectedScrollSnap(api.selectedScrollSnap())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    setScrollSnaps(api.scrollSnapList())
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        scrollSnaps,
        selectedScrollSnap,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({ className }: React.ComponentProps<"button">) {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <button
      data-slot="carousel-previous"
      className={cn(
        "inline-flex items-center justify-center absolute size-10 text-xl rounded-full top-1/2 left-0 -translate-y-1/2 z-20 bg-[rgba(0,0,0,0.25)] hover:bg-[rgba(0,0,0,0.50)] transition-all duration-300 text-white cursor-pointer",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
    >
      <ChevronLeft />
      <span className="sr-only">Previous slide</span>
    </button >
  )
}

function CarouselNext({ className, ...props }: React.ComponentProps<"button">) {
  const { scrollNext, canScrollNext } = useCarousel()

  return (

    <button
      data-slot="carousel-next"
      className={cn(
        "inline-flex items-center justify-center absolute size-10 text-xl rounded-full top-1/2 right-0 -translate-y-1/2 z-20 bg-[rgba(0,0,0,0.25)] hover:bg-[rgba(0,0,0,0.50)] transition-all duration-300 text-white cursor-pointer",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight />
      <span className="sr-only">Next slide</span>
    </button>
  )
}

function CarouselDots({ className, ...props }: React.ComponentProps<"div">) {
  const { api, scrollSnaps, selectedScrollSnap } = useCarousel()

  return (
    <div
      data-slot="carousel-dots"
      className={cn("flex items-center justify-center gap-2 mt-4", className)}
      {...props}
    >
      {scrollSnaps.map((_, index: number) => (
        <button
          key={index}
          className={cn(
            "w-6 md:w-10 h-2 md:h-3 rounded-full transition-all duration-300",
            selectedScrollSnap === index
              ? "bg-[#257981]/80 "
              : "bg-[#ABD1D4]/30 hover:bg-textTeal/50"
          )}
          onClick={() => api?.scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
}
