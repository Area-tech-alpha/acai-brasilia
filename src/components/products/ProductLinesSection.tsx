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

type SlideTheme = {
    container: string;
    accent: string;
    accentDot: string;
    description: string;
    listItem: string;
    listDot: string;
    listText: string;
};

const DEFAULT_THEME: SlideTheme = {
    container: "bg-brand-purple/95 text-white texture-dots-dark ring-1 ring-brand-purple/25",
    accent: "bg-brand-yellow text-brand-purple ring-2 ring-brand-yellow/40",
    accentDot: "bg-brand-purple",
    description: "text-white/90",
    listItem: "bg-white/10 ring-1 ring-white/15 text-white backdrop-blur-sm",
    listDot: "bg-brand-yellow",
    listText: "text-white",
};

const createTheme = (overrides: Partial<SlideTheme>): SlideTheme => ({
    ...DEFAULT_THEME,
    ...overrides,
});

const LINE_THEMES: Partial<Record<string, SlideTheme>> = {
    "line-cremes": createTheme({
        container: "bg-[#DEB86D] text-brand-purple texture-dots-light ring-1 ring-white/40",
        accent: "bg-brand-purple text-white ring-2 ring-brand-purple/35",
        accentDot: "bg-brand-yellow",
        description: "text-brand-purple/90",
        listItem: "bg-brand-purple/10 ring-1 ring-brand-purple/15 text-brand-purple backdrop-blur-sm",
        listDot: "bg-brand-purple",
        listText: "text-brand-purple",
    }),
    "line-sorvetes": createTheme({
        container: "bg-[#263A8E] text-white texture-dots-dark ring-1 ring-white/35",
        accent: "bg-white/90 text-[#263A8E] ring-2 ring-white/50",
        accentDot: "bg-[#263A8E]",
        listItem: "bg-white/15 ring-1 ring-white/20 text-white backdrop-blur-sm",
        listDot: "bg-white",
    }),
    "line-sorbets": createTheme({
        container: "bg-[#F9D976] text-brand-purple texture-dots-light ring-1 ring-white/40",
        accent: "bg-brand-purple text-white ring-2 ring-brand-purple/35",
        accentDot: "bg-brand-yellow",
        description: "text-brand-purple/90",
        listItem: "bg-brand-purple/10 ring-1 ring-brand-purple/15 text-brand-purple backdrop-blur-sm",
        listDot: "bg-brand-purple",
        listText: "text-brand-purple",
    }),
    "line-polpas": createTheme({
        container: "bg-orange-500 text-white texture-dots-dark ring-1 ring-orange-300/50",
        accent: "bg-white/90 text-orange-600 ring-2 ring-white/50",
        accentDot: "bg-orange-500",
        listItem: "bg-white/15 ring-1 ring-white/20 text-white backdrop-blur-sm",
        listDot: "bg-white",
    }),
};

const SLIDE_THEMES: Record<string, SlideTheme> = {
    "line-acai:line-acai-tradicional": createTheme({
        container: "bg-[#52A43A] text-white texture-dots-dark ring-1 ring-white/25",
        accent: "bg-white/85 text-[#52A43A] ring-2 ring-white/45",
        accentDot: "bg-[#52A43A]",
        listItem: "bg-white/12 ring-1 ring-white/20 text-white backdrop-blur-sm",
        listDot: "bg-white",
    }),
    "line-acai:line-acai-premium": createTheme({
        container: "bg-[#F3911A] text-brand-purple texture-dots-light ring-1 ring-white/40",
        accent: "bg-brand-purple text-white ring-2 ring-brand-purple/35",
        accentDot: "bg-brand-purple",
        description: "text-brand-purple/90",
        listItem: "bg-brand-purple/10 ring-1 ring-brand-purple/15 text-brand-purple backdrop-blur-sm",
        listDot: "bg-brand-purple",
        listText: "text-brand-purple",
    }),
    "line-picoles:line-picoles-especiais": createTheme({
        container: "bg-slate-50 text-brand-purple texture-dots-light ring-1 ring-slate-200/60",
        accent: "bg-brand-purple text-white ring-2 ring-brand-purple/35",
        accentDot: "bg-brand-yellow",
        description: "text-brand-purple/90",
        listItem: "bg-brand-purple/10 ring-1 ring-brand-purple/15 text-brand-purple backdrop-blur-sm",
        listDot: "bg-brand-purple",
        listText: "text-brand-purple",
    }),
    "line-picoles:line-picoles-premium": createTheme({
        container: "bg-lime-200 text-brand-purple texture-dots-light ring-1 ring-lime-200/70",
        accent: "bg-brand-purple text-white ring-2 ring-brand-purple/35",
        accentDot: "bg-brand-yellow",
        description: "text-brand-purple/90",
        listItem: "bg-brand-purple/10 ring-1 ring-brand-purple/15 text-brand-purple backdrop-blur-sm",
        listDot: "bg-brand-purple",
        listText: "text-brand-purple",
    }),
    "line-picoles:line-picoles-recheados": createTheme({
        container: "bg-rose-300 text-brand-purple texture-dots-light ring-1 ring-rose-200/60",
        accent: "bg-brand-purple text-white ring-2 ring-brand-purple/35",
        accentDot: "bg-brand-yellow",
        description: "text-brand-purple/90",
        listItem: "bg-brand-purple/10 ring-1 ring-brand-purple/15 text-brand-purple backdrop-blur-sm",
        listDot: "bg-brand-purple",
        listText: "text-brand-purple",
    }),
    "line-picoles:line-picoles-ao-leite": createTheme({
        container: "bg-[#C88F40] text-white texture-dots-dark ring-1 ring-white/35",
        accent: "bg-white/85 text-[#C88F40] ring-2 ring-white/45",
        accentDot: "bg-[#C88F40]",
        listItem: "bg-white/12 ring-1 ring-white/20 text-white backdrop-blur-sm",
        listDot: "bg-white",
    }),
    "line-polpas:line-polpas-100g": createTheme({
        container: "bg-orange-500 text-white texture-dots-dark ring-1 ring-orange-300/50",
        accent: "bg-white/90 text-orange-600 ring-2 ring-white/50",
        accentDot: "bg-orange-400",
        listItem: "bg-white/15 ring-1 ring-white/20 text-white backdrop-blur-sm",
        listDot: "bg-white",
    }),
    "line-polpas:line-polpas-1kg": createTheme({
        container: "bg-orange-500 text-white texture-dots-dark ring-1 ring-orange-300/50",
        accent: "bg-white/90 text-orange-600 ring-2 ring-white/50",
        accentDot: "bg-orange-400",
        listItem: "bg-white/15 ring-1 ring-white/20 text-white backdrop-blur-sm",
        listDot: "bg-white",
    }),
    "line-polpas:line-polpas-frutas": createTheme({
        container: "bg-rose-500 text-white texture-dots-dark ring-1 ring-rose-300/50",
        accent: "bg-white/90 text-rose-600 ring-2 ring-white/50",
        accentDot: "bg-rose-400",
        listItem: "bg-white/15 ring-1 ring-white/20 text-white backdrop-blur-sm",
        listDot: "bg-white",
    }),
    "line-polpas:line-polpas-cremes": createTheme({
        container: "bg-lime-300 text-brand-purple texture-dots-light ring-1 ring-lime-200/60",
        accent: "bg-brand-purple text-white ring-2 ring-brand-purple/35",
        accentDot: "bg-brand-yellow",
        description: "text-brand-purple/90",
        listItem: "bg-brand-purple/10 ring-1 ring-brand-purple/15 text-brand-purple backdrop-blur-sm",
        listDot: "bg-brand-purple",
        listText: "text-brand-purple",
    }),
    "line-acai-cremes-1500:line-acai-cremes-1500-guarana": createTheme({
        container: "bg-rose-500 text-white texture-dots-dark ring-1 ring-rose-300/50",
        accent: "bg-white/85 text-rose-700 ring-2 ring-white/40",
        accentDot: "bg-rose-400",
        listItem: "bg-white/12 ring-1 ring-white/20 text-white backdrop-blur-sm",
        listDot: "bg-white",
    }),
    "line-acai-cremes-1500:line-acai-cremes-1500-cremes": createTheme({
        container: "bg-slate-50 text-brand-purple texture-dots-light ring-1 ring-slate-200/60",
        accent: "bg-brand-purple text-white ring-2 ring-brand-purple/35",
        accentDot: "bg-brand-yellow",
        description: "text-brand-purple/90",
        listItem: "bg-brand-purple/10 ring-1 ring-brand-purple/15 text-brand-purple backdrop-blur-sm",
        listDot: "bg-brand-purple",
        listText: "text-brand-purple",
    }),
    "line-acai-cremes-250:line-acai-cremes-250-cremes": createTheme({
        container: "bg-[#3B1F09] text-white texture-dots-dark ring-1 ring-white/25",
        accent: "bg-white/85 text-[#3B1F09] ring-2 ring-white/40",
        accentDot: "bg-[#3B1F09]",
        listItem: "bg-white/12 ring-1 ring-white/20 text-white backdrop-blur-sm",
        listDot: "bg-white",
    }),
};

const getSlideTheme = (lineId: string, slideId: string): SlideTheme => {
    const specific = SLIDE_THEMES[`${lineId}:${slideId}`];
    if (specific) return specific;
    const lineTheme = LINE_THEMES[lineId];
    if (lineTheme) return lineTheme;
    return DEFAULT_THEME;
};

const renderSlideItems = (items: string[], multiColumn: boolean, styles: Pick<SlideTheme, "listItem" | "listDot" | "listText">) => {
    if (items.length === 0) return null;

    const layoutClass = multiColumn
        ? "max-w-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        : "max-w-xs space-y-3";

    const baseItemClass = multiColumn
        ? "flex w-full items-center gap-2 rounded-full px-4 py-2"
        : "flex w-full items-center justify-center gap-2 rounded-full px-4 py-2";

    return (
        <ul className={`mt-4 w-full self-center text-center ${layoutClass}`}>
            {items.map((item) => (
                <li
                    key={item}
                    className={`${baseItemClass} ${styles.listItem}`}
                >
                    <span className={`h-2 w-2 rounded-full ${styles.listDot}`} aria-hidden />
                    <span className={`text-sm md:text-base ${styles.listText}`}>{item}</span>
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
                                                className="group relative w-full overflow-hidden rounded-[36px]"
                                            >
                                                <Image
                                                    src={sharedImage as string}
                                                    alt={`${stripLinePrefix(line.title)} - destaque visual`}
                                                    fill
                                                    sizes="100vw"
                                                    className="object-contain p-6 sm:p-8 lg:p-10"
                                                />
                                                <div
                                                    className="pointer-events-none absolute inset-x-8 inset-y-8 rounded-[30px]"
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
                                                {line.slides.map((slide) => {
                                                    const theme = getSlideTheme(line.id, slide.id);
                                                    return (
                                                        <CarouselItem key={slide.id} className="pl-6 basis-full">
                                                            <div
                                                                className={`flex h-full flex-col gap-6 rounded-[32px] p-6 shadow-xl backdrop-blur-sm ${theme.container}`}
                                                            >
                                                                <span
                                                                    className={`inline-flex items-center gap-2 self-center rounded-full px-5 py-2 ${theme.accent}`}
                                                                >
                                                                    <span className={`h-2.5 w-2.5 rounded-full ${theme.accentDot}`} aria-hidden />
                                                                    <span className="text-lg md:text-xl font-playfair font-bold tracking-tight">
                                                                        {slide.heading}
                                                                    </span>
                                                                </span>

                                                                {slide.description && (
                                                                    <p
                                                                        className={`text-sm md:text-base leading-relaxed text-center ${theme.description}`}
                                                                    >
                                                                        {slide.description}
                                                                    </p>
                                                                )}

                                                                {renderSlideItems(
                                                                    slide.items ?? [],
                                                                    shouldUseMultiColumnList(slide.id),
                                                                    theme,
                                                                )}
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
                                                const theme = getSlideTheme(line.id, slide.id);

                                                return (
                                                    <CarouselItem key={slide.id} className="pl-6 basis-full">
                                                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
                                                            <div className="mx-auto w-full max-w-[360px] sm:max-w-[380px] lg:max-w-[320px] xl:max-w-[360px]">
                                                                <AspectRatio
                                                                    ratio={4 / 5}
                                                                    className="group relative w-full overflow-hidden rounded-[36px]"
                                                                >
                                                                    {hasImage ? (
                                                                        <>
                                                                            <Image
                                                                                src={mediaSrc as string}
                                                                                alt={`${stripLinePrefix(line.title)} - ${slide.heading}`}
                                                                                fill
                                                                                sizes="100vw"
                                                                                className="object-contain p-6 sm:p-8 lg:p-10 transition-transform duration-500 group-hover:scale-[1.04]"
                                                                            />
                                                                            <div
                                                                                className="pointer-events-none absolute inset-x-8 inset-y-8 rounded-[30px]"
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
                                                                <div
                                                                    className={`flex h-full flex-col gap-6 rounded-[32px] p-6 shadow-xl backdrop-blur-sm ${theme.container}`}
                                                                >
                                                                    <span
                                                                        className={`inline-flex items-center gap-2 self-center rounded-full px-5 py-2 ${theme.accent}`}
                                                                    >
                                                                        <span className={`h-2.5 w-2.5 rounded-full ${theme.accentDot}`} aria-hidden />
                                                                        <span className="text-lg md:text-xl font-playfair font-bold tracking-tight">
                                                                            {slide.heading}
                                                                        </span>
                                                                    </span>

                                                                    {slide.description && (
                                                                        <p
                                                                            className={`text-sm md:text-base leading-relaxed text-center ${theme.description}`}
                                                                        >
                                                                            {slide.description}
                                                                        </p>
                                                                    )}

                                                                    {renderSlideItems(items, useMultiColumn, theme)}
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
