import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { isSupportedImageUrl } from "./utils";
import type { ProductLine } from "./types";

type ProductLinesSectionProps = {
    lines: ProductLine[];
    registerLineRef: (anchor: string, element: HTMLDivElement | null) => void;
};

const stripLinePrefix = (title?: string) => {
    if (!title) return "";
    return title.replace(/^Linha\s+/i, "").trim();
};

const ProductLinesSection = ({ lines, registerLineRef }: ProductLinesSectionProps) => {
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
                                    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
                                        <div className="mx-auto w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[420px] xl:max-w-[520px]">
                                            <AspectRatio
                                                ratio={5 / 6}
                                                className="group relative w-full overflow-hidden rounded-[36px] bg-brand-purple/90 texture-dots-dark shadow-2xl ring-1 ring-brand-purple/35"
                                            >
                                                <Image
                                                    src={sharedImage as string}
                                                    alt={`${stripLinePrefix(line.title)} - destaque visual`}
                                                    fill
                                                    sizes="100vw"
                                                    className="object-contain drop-shadow-[0_28px_60px_rgba(40,13,64,0.35)]"
                                                />
                                                <div
                                                    className="pointer-events-none absolute inset-x-8 inset-y-8 rounded-[30px] border border-white/25 shadow-inner shadow-black/10"
                                                    aria-hidden
                                                />
                                            </AspectRatio>
                                        </div>

                                        <Carousel className="flex-1 px-2" opts={{ align: "start", loop: showNavigation }}>
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

                                                            {slide.items?.length > 0 && (
                                                                <ul className="mt-4 space-y-3 w-full max-w-xl self-center">
                                                                    {slide.items.map((item) => (
                                                                        <li
                                                                            key={item}
                                                                            className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 ring-1 ring-white/15"
                                                                        >
                                                                            <span className="h-2 w-2 rounded-full bg-brand-yellow" aria-hidden />
                                                                            <span className="flex-1 text-sm md:text-base">{item}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            {showNavigation && <CarouselPrevious className="-left-3 md:-left-4" />}
                                            {showNavigation && <CarouselNext className="-right-3 md:-right-4" />}
                                        </Carousel>
                                    </div>
                                ) : (
                                    <Carousel className="px-2" opts={{ align: "start", loop: showNavigation }}>
                                        <CarouselContent className="-ml-6">
                                            {line.slides.map((slide) => {
                                                const mediaSrc = slide.image;
                                                const hasImage = isSupportedImageUrl(mediaSrc);
                                                const items = slide.items ?? [];

                                                return (
                                                    <CarouselItem key={slide.id} className="pl-6 basis-full">
                                                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
                                                            <div className="mx-auto w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[420px] xl:max-w-[520px]">
                                                                <AspectRatio
                                                                    ratio={5 / 6}
                                                                    className="group relative w-full overflow-hidden rounded-[36px] bg-brand-purple/90 texture-dots-dark shadow-2xl ring-1 ring-brand-purple/35"
                                                                >
                                                                    {hasImage ? (
                                                                        <>
                                                                            <Image
                                                                                src={mediaSrc as string}
                                                                                alt={`${stripLinePrefix(line.title)} - ${slide.heading}`}
                                                                                fill
                                                                                sizes="100vw"
                                                                                className="object-contain drop-shadow-[0_28px_60px_rgba(40,13,64,0.35)] transition-transform duration-500 group-hover:scale-[1.04]"
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

                                                                    {items.length > 0 && (
                                                                        <ul className="mt-4 space-y-3 w-full max-w-xl self-center">
                                                                            {items.map((item) => (
                                                                                <li
                                                                                    key={item}
                                                                                    className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 ring-1 ring-white/15"
                                                                                >
                                                                                    <span className="h-2 w-2 rounded-full bg-brand-yellow" aria-hidden />
                                                                                    <span className="flex-1 text-sm md:text-base">{item}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CarouselItem>
                                                );
                                            })}
                                        </CarouselContent>
                                        {showNavigation && <CarouselPrevious className="-left-3 md:-left-4" />}
                                        {showNavigation && <CarouselNext className="-right-3 md:-right-4" />}
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
