"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

import HighlightCarousel from "./products/HighlightCarousel";
import ProductLinesSection from "./products/ProductLinesSection";
import {
    HIGHLIGHT_ANCHOR_MAP,
    HIGHLIGHT_SLIDES,
    PRODUCT_LINES,
} from "./products/constants";

const Products = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const lineRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [highlightCarouselApi, setHighlightCarouselApi] = useState<CarouselApi | null>(null);
    const [highlightIndex, setHighlightIndex] = useState(0);

    const registerLineRef = useCallback((anchor: string, element: HTMLDivElement | null) => {
        lineRefs.current[anchor] = element;
    }, []);

    useEffect(() => {
        const handleScrollToProducts = () => {
            sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        window.addEventListener("scroll-to-products", handleScrollToProducts);
        return () => window.removeEventListener("scroll-to-products", handleScrollToProducts);
    }, []);

    useEffect(() => {
        const handleScrollToLine = (event: Event) => {
            const detail = (event as CustomEvent<{ productId: string }>).detail;
            if (!detail) return;

            const target = lineRefs.current[detail.productId];
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        window.addEventListener("scroll-to-product-line", handleScrollToLine as EventListener);
        return () => window.removeEventListener("scroll-to-product-line", handleScrollToLine as EventListener);
    }, []);

    useEffect(() => {
        if (!highlightCarouselApi) return;

        const onSelect = () => {
            try {
                setHighlightIndex(highlightCarouselApi.selectedScrollSnap());
            } catch {
                // noop
            }
        };

        onSelect();
        highlightCarouselApi.on("select", onSelect);
        highlightCarouselApi.on("reInit", onSelect);

        const intervalId = window.setInterval(() => {
            try {
                highlightCarouselApi.scrollNext();
            } catch {
                // noop
            }
        }, 4200);

        return () => {
            window.clearInterval(intervalId);
            try {
                highlightCarouselApi.off("select", onSelect);
                highlightCarouselApi.off("reInit", onSelect);
            } catch {
                // noop
            }
        };
    }, [highlightCarouselApi]);

    const handleHighlightClick = (slideId: string) => {
        const anchor = HIGHLIGHT_ANCHOR_MAP[slideId];
        if (anchor) {
            window.dispatchEvent(
                new CustomEvent("scroll-to-product-line", { detail: { productId: anchor } }),
            );
        }
    };

    return (
        <section ref={sectionRef} id="produtos" className="w-full py-20 bg-brand-yellow texture-dots-light">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-brand-purple font-playfair text-center">Nossos Produtos</h2>
                <p className="mt-4 text-center text-brand-dark max-w-3xl mx-auto">
                    Possuímos diversas linhas para atender diferentes públicos. Clique no produto do carrossel e veja
                    mais detalhes de cada linha.
                </p>

                <HighlightCarousel
                    slides={HIGHLIGHT_SLIDES}
                    onSlideClick={handleHighlightClick}
                    setCarouselApi={setHighlightCarouselApi}
                    activeIndex={highlightIndex}
                />

                <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />

                <div id="revendedor" className="mt-16 max-w-4xl mx-auto px-8 py-10 text-center">
                    <h3 className="text-3xl font-playfair font-bold text-brand-purple">Seja um Revendedor Amazzon Easy</h3>
                    <p className="mt-4 text-brand-dark">
                        Se você tem uma loja de açaí, delivery, lanchonete ou outro ponto de venda, agende uma degustação gratuita e
                        descubra o diferencial do nosso açaí e cremes. Cadastre seu negócio de forma simples, receba lançamentos e
                        suporte direto da nossa equipe.
                    </p>
                    <p className="mt-4 text-brand-dark">
                        Experimente e leve a verdadeira experiência Amazzon Easy aos seus clientes!
                    </p>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent("open-contact-form", { detail: { subject: "revenda" } }))}
                        className="mt-8 inline-block rounded-full bg-brand-purple px-8 py-3 text-base font-semibold text-white transition-transform hover:scale-105 hover:bg-brand-purple/90"
                    >
                        Quero ser revendedor
                    </button>
                </div>

                <ProductLinesSection lines={PRODUCT_LINES} registerLineRef={registerLineRef} />
            </div>
        </section>
    );
};

export default Products;
