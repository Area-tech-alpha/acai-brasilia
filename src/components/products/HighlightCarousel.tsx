import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import type { HighlightSlide } from "./types";

type HighlightCarouselProps = {
    slides: HighlightSlide[];
    onSlideClick: (slideId: string) => void;
    setCarouselApi?: (api: CarouselApi) => void;
    activeIndex?: number;
};

const HighlightCarousel = ({
    slides,
    onSlideClick,
    setCarouselApi,
    activeIndex = 0,
}: HighlightCarouselProps) => {
    const navigationButtonClasses =
        "flex h-12 w-12 items-center justify-center rounded-full border border-brand-purple/30 bg-white/90 text-brand-purple shadow-xl backdrop-blur transition-all hover:bg-brand-yellow hover:text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/70";

    return (
        <div className="relative mt-12">
            <Carousel className="px-2" opts={{ align: "start", loop: true }} setApi={setCarouselApi}>
                <CarouselContent className="-ml-6">
                    {slides.map((slide, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <CarouselItem
                                key={slide.id}
                                className="pl-6 basis-full cursor-pointer"
                                aria-current={isActive}
                                data-active={isActive}
                            >
                                <button
                                    type="button"
                                    onClick={() => onSlideClick(slide.id)}
                                    className="group flex w-full justify-center transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                                    aria-label={`Ir para a seção ${slide.title}`}
                                >
                                    <div className="relative w-full max-w-[400px] sm:max-w-[520px] lg:max-w-[760px]">
                                        <div className="cursor-pointer relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[42px] transition-transform duration-700 group-hover:-translate-y-2">
                                            <div className="relative flex flex-1 flex-col gap-8 px-8 py-10 lg:flex-row lg:items-center lg:gap-16">
                                                <div className="w-full lg:w-[54%]">
                                                    <AspectRatio ratio={4 / 4.5} className="relative w-full rounded-[28px] bg-transparent overflow-hidden">
                                                        <Image
                                                            src={slide.image}
                                                            alt={`Linha ${slide.title}`}
                                                            fill
                                                            sizes="(min-width: 1024px) 54vw, 100vw"
                                                            className="object-contain p-4 drop-shadow-[0_24px_45px_rgba(0,0,0,0.25)]"
                                                        />
                                                    </AspectRatio>
                                                </div>
                                                <div className="flex w-full lg:w-[46%] flex-col items-center text-center text-brand-purple gap-5 lg:items-start lg:text-left">
                                                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-purple/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-brand-purple">
                                                        <span className="h-2 w-2 rounded-full bg-brand-purple" aria-hidden />
                                                        {slide.title}
                                                        <span className="h-2 w-2 rounded-full bg-brand-purple" aria-hidden />
                                                    </span>
                                                    <p className="text-sm md:text-base leading-relaxed text-brand-dark max-w-[320px] lg:max-w-none">
                                                        {slide.description}
                                                    </p>
                                                    <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.48em] text-brand-purple">
                                                        <span className="h-[3px] w-6 rounded-full bg-brand-purple" aria-hidden />
                                                        Amazzon Easy
                                                        <span className="h-[3px] w-6 rounded-full bg-brand-purple" aria-hidden />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className={`${navigationButtonClasses} -left-1 md:-left-4 lg:-left-8`} />
                <CarouselNext className={`${navigationButtonClasses} -right-1 md:-right-4 lg:-right-8`} />
            </Carousel>
        </div>
    );
};

export default HighlightCarousel;
