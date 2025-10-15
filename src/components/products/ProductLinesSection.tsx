'use client';

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

import { isSupportedImageUrl } from "./utils";
import type { ProductLine } from "./types";

type ProductLinesSectionProps = {
    lines: ProductLine[];
    registerLineRef: (anchor: string, element: HTMLDivElement | null) => void;
};

const AUTOPLAY_INTERVAL = 7000;

const stripLinePrefix = (title?: string) => {
    if (!title) return "";
    return title.replace(/^Linha\s+/i, "").trim();
};

const shouldUseMultiColumnList = (slideId: string) =>
    slideId === "line-polpas-100g" || slideId === "line-polpas-1kg";

const renderSlideItems = (items: string[], multiColumn: boolean) => {
    if (items.length === 0) return null;

    const layoutClass = multiColumn
        ? "max-w-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        : "max-w-xl space-y-3";

    return (
        <ul className={`mt-4 w-full self-center ${layoutClass}`}>
            {items.map((item) => (
                <li
                    key={item}
                    className="flex w-full items-center gap-3 rounded-full bg-white/10 px-5 py-3 ring-1 ring-white/15"
                >
                    <span className="h-2 w-2 rounded-full bg-brand-yellow" aria-hidden />
                    <span className="flex-1 text-sm md:text-base">{item}</span>
                </li>
            ))}
        </ul>
    );
};

const ProductLinesSection = ({ lines, registerLineRef }: ProductLinesSectionProps) => {
    const carouselApis = useRef<Record<string, CarouselApi | null>>({});
    const autoplayTimers = useRef<Record<string, number>>({});
    const cleanupCallbacks = useRef<Record<string, (() => void) | undefined>>({});

    const clearAutoplay = useCallback((lineId: string) => {
        const timerId = autoplayTimers.current[lineId];
        if (typeof timerId === "number") {
            window.clearInterval(timerId);
            delete autoplayTimers.current[lineId];
        }
    }, []);

    const getRegisterCarouselApi = useCallback(
        (lineId: string, enableAutoplay: boolean) => (api: CarouselApi | null) => {
            const previousCleanup = cleanupCallbacks.current[lineId];

            if (!api || !enableAutoplay) {
                if (previousCleanup) {
                    previousCleanup();
                    delete cleanupCallbacks.current[lineId];
                } else {
                    clearAutoplay(lineId);
                }
                carouselApis.current[lineId] = api;
                return;
            }

            if (carouselApis.current[lineId] === api) {
                return;
            }

            if (previousCleanup) {
                previousCleanup();
            } else {
                clearAutoplay(lineId);
            }

            carouselApis.current[lineId] = api;

            const startAutoplay = () => {
                clearAutoplay(lineId);
                const intervalId = window.setInterval(() => {
                    try {
                        api.scrollNext();
                    } catch {
                        // noop
                    }
                }, AUTOPLAY_INTERVAL);
                autoplayTimers.current[lineId] = intervalId;
            };

            const onSelect = () => startAutoplay();
            const onReInit = () => startAutoplay();

            startAutoplay();
            api.on("select", onSelect);
            api.on("reInit", onReInit);

            cleanupCallbacks.current[lineId] = () => {
                api.off("select", onSelect);
                api.off("reInit", onReInit);
                clearAutoplay(lineId);
                delete carouselApis.current[lineId];
                delete cleanupCallbacks.current[lineId];
            };
        },
        [clearAutoplay],
    );

    useEffect(() => {
        return () => {
            Object.values(cleanupCallbacks.current).forEach((cleanup) => {
                if (cleanup) cleanup();
            });
        };
    }, []);

    const navigationButtonClasses =
        "h-12 w-12 rounded-full bg-white text-brand-purple shadow-xl border border-brand-purple/40 transition-all hover:bg-brand-yellow hover:text-brand-purple hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/80";

    return (
        <div className="mt-20 space-y-20">
            {lines.map((line) => {
                const sharedImage = isSupportedImageUrl(line.sharedImage) ? line.sharedImage : undefined;
                const usesSharedImage =
                    Boolean(sharedImage) &&
                    line.slides.every((slide) => {
                        const slideImage = slide.image;
                        return !isSupportedImageUrl(slideImage) || slideImage === sharedImage;
                    });
                const showNavigation = line.slides.length > 1;

                return (
                    <div
                        key={line.id}
                        id={line.anchor}
                        ref={(element) => registerLineRef(line.anchor, element)}
                        className="scroll-mt-28"
                    >
                        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
                        <div>
                            {isSupportedImageUrl(line.backgroundImage) && (
                                <div className="relative w-full aspect-[16/9] overflow-hidden">
                                    <Image
                                        src={line.backgroundImage as string}
                                        alt="Imagem de capa da seção"
                                        fill
                                        sizes="100vw"
                                        className="object-cover"
                                        priority={line.id === "line-acai"}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" aria-hidden />
                                </div>
                            )}

                            <div className="flex flex-col gap-10 p-8 sm:p-12">
                                <div className="flex flex-col gap-3 text-brand-dark text-center">
                                    <h4 className="text-3xl sm:text-4xl font-playfair font-bold text-brand-purple">
                                        {stripLinePrefix(line.title)}
                                    </h4>
                                    <p className="text-base md:text-lg text-brand-dark/90">{line.subtitle}</p>
                                </div>

                                {usesSharedImage ? (
                                    <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
                                        <div className="mx-auto w-full max-w-[360px] sm:max-w-[380px] lg:max-w-[320px] xl:max-w-[360px]">
                                            <AspectRatio
                                                ratio={4 / 5}
                                                className="group relative w-full overflow-hidden rounded-[36px] bg-brand-purple/90 texture-dots-dark shadow-2xl ring-1 ring-brand-purple/35"
                                            >
                                                <Image
                                                    src={sharedImage as string}
                                                    alt={`${stripLinePrefix(line.title)} - destaque visual`}
                                                    fill
                                                    sizes="100vw"
                                                    className="object-contain p-6 sm:p-8 lg:p-10 drop-shadow-[0_28px_60px_rgba(40,13,64,0.35)]"
                                                />
                                                <div
                                                    className="pointer-events-none absolute inset-x-8 inset-y-8 rounded-[30px] border border-white/25 shadow-inner shadow-black/10"
                                                    aria-hidden
                                                />
                                            </AspectRatio>
                                        </div>

                                        <Carousel
                                            className="relative flex-1 px-2"
                                            opts={{ align: "start", loop: showNavigation }}
                                            setApi={getRegisterCarouselApi(line.id, showNavigation)}
                                        >
                                            <CarouselContent className="-ml-6 lg:-ml-8">
                                                {line.slides.map((slide) => (
                                                    <CarouselItem key={slide.id} className="pl-6 basis-full">
                                                        <div className="flex h-full flex-col gap-6 rounded-[32px] bg-brand-purple/95 texture-dots-dark p-6 text-white shadow-xl ring-1 ring-brand-purple/25 backdrop-blur-sm">
                                                            <span className="inline-flex items-center gap-2 self-center rounded-full bg-brand-yellow text-brand-purple px-5 py-2 ring-2 ring-brand-yellow/40">
                                                                <span className="h-2.5 w-2.5 rounded-full bg-brand-purple" aria-hidden />
                                                                <span className="text-lg md:text-xl font-playfair font-bold tracking-tight">
                                                                    {slide.heading}
                                                                </span>
                                                            </span>

                                                            {slide.description && (
                                                                <p className="text-sm md:text-base text-white/90 leading-relaxed">
                                                                    {slide.description}
                                                                </p>
                                                            )}

                                                            {renderSlideItems(
                                                                slide.items ?? [],
                                                                shouldUseMultiColumnList(slide.id),
                                                            )}
                                                        </div>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            {showNavigation && (
                                                <CarouselPrevious className={`${navigationButtonClasses} -left-5 md:-left-6`} />
                                            )}
                                            {showNavigation && (
                                                <CarouselNext className={`${navigationButtonClasses} -right-5 md:-right-6`} />
                                            )}
                                        </Carousel>
                                    </div>
                                ) : (
                                    <Carousel
                                        className="px-2"
                                        opts={{ align: "start", loop: showNavigation }}
                                        setApi={getRegisterCarouselApi(line.id, showNavigation)}
                                    >
                                        <CarouselContent className="-ml-6 lg:-ml-8">
                                            {line.slides.map((slide) => {
                                                const slideImage = isSupportedImageUrl(slide.image) ? slide.image : undefined;
                                                const mediaSrc = slideImage ?? sharedImage;
                                                const hasImage = Boolean(mediaSrc);
                                                const items = slide.items ?? [];
                                                const useMultiColumn = shouldUseMultiColumnList(slide.id);

                                                return (
                                                    <CarouselItem key={slide.id} className="pl-6 basis-full">
                                                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
                                                            <div className="mx-auto w-full max-w-[360px] sm:max-w-[380px] lg:max-w-[320px] xl:max-w-[360px]">
                                                                <AspectRatio
                                                                    ratio={4 / 5}
                                                                    className="group relative w-full overflow-hidden rounded-[36px] bg-brand-purple/90 texture-dots-dark shadow-2xl ring-1 ring-brand-purple/35"
                                                                >
                                                                    {hasImage ? (
                                                                        <>
                                                                            <Image
                                                                                src={mediaSrc as string}
                                                                                alt={`${stripLinePrefix(line.title)} - ${slide.heading}`}
                                                                                fill
                                                                                sizes="100vw"
                                                                                className="object-contain p-6 sm:p-8 lg:p-10 drop-shadow-[0_28px_60px_rgba(40,13,64,0.35)] transition-transform duration-500 group-hover:scale-[1.04]"
                                                                            />
                                                                            <div
                                                                                className="pointer-events-none absolute inset-x-8 inset-y-8 rounded-[30px] border border-white/25 shadow-inner shadow-black/10"
                                                                                aria-hidden
                                                                            />
                                                                        </>
                                                                    ) : (
                                                                        <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-white/80">
                                                                            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-brand-yellow/90">
                                                                                Arte em preparação
                                                                            </span>
                                                                            <p className="text-xs md:text-sm text-white/80">
                                                                                Estamos finalizando a arte desta linha. Volte em breve para conferir.
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </AspectRatio>
                                                            </div>

                                                            <div className="flex-1">
                                                                <div className="flex h-full flex-col gap-6 rounded-[32px] bg-brand-purple/95 texture-dots-dark p-6 text-white shadow-xl ring-1 ring-brand-purple/25 backdrop-blur-sm">
                                                                    <span className="inline-flex items-center gap-2 self-center rounded-full bg-brand-yellow text-brand-purple px-5 py-2 ring-2 ring-brand-yellow/40">
                                                                        <span className="h-2.5 w-2.5 rounded-full bg-brand-purple" aria-hidden />
                                                                        <span className="text-lg md:text-xl font-playfair font-bold tracking-tight">
                                                                            {slide.heading}
                                                                        </span>
                                                                    </span>

                                                                    {slide.description && (
                                                                        <p className="text-sm md:text-base text-white/90 leading-relaxed text-center">
                                                                            {slide.description}
                                                                        </p>
                                                                    )}

                                                                    {renderSlideItems(items, useMultiColumn)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CarouselItem>
                                                );
                                            })}
                                        </CarouselContent>
                                        {showNavigation && (
                                            <CarouselPrevious className={`${navigationButtonClasses} -left-5 md:-left-6`} />
                                        )}
                                        {showNavigation && (
                                            <CarouselNext className={`${navigationButtonClasses} -right-5 md:-right-6`} />
                                        )}
                                    </Carousel>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductLinesSection;
