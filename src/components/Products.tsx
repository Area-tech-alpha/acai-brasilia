"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type HighlightSlide = {
    id: string;
    title: string;
    description: string;
    image: string;
};

type LineSlide = {
    id: string;
    heading: string;
    description?: string;
    items: string[];
    image?: string;
};

type ProductLine = {
    id: string;
    anchor: string;
    title: string;
    subtitle: string;
    theme: string;
    backgroundImage?: string;
    sharedImage?: string;
    slides: LineSlide[];
};

const isSupportedImageUrl = (url?: string) => {
    if (!url) return false;
    try {
        const u = new URL(url);
        const allowedHosts = new Set([
            'images.unsplash.com',
            '4qozbotg9nhsxukb.public.blob.vercel-storage.com',
            'nfwfolrcpaxqwgkzzfok.supabase.co',
            'drive.google.com',
            'lh3.googleusercontent.com',
        ]);
        if (allowedHosts.has(u.hostname)) return true;
        const path = u.pathname;
        return /\.(png|jpe?g|webp|gif|avif|svg|bmp|arw)$/i.test(path);
    } catch {
        // Fallback: permissivo apenas por extensão simples
        const path = (url.split('?')[0] || '');
        return /\.(png|jpe?g|webp|gif|avif|svg|bmp|arw)$/i.test(path);
    }
};

// Mapeia o destaque do primeiro carrossel para a âncora da seção correspondente
const highlightAnchorMap: Record<string, string> = {
    "highlight-acai": "acai",
    "highlight-cremes": "cremes",
    "highlight-sorvetes": "sorvetes",
    "highlight-sorbets": "sorbets",
    "highlight-picoles": "picoles",
    "highlight-polpas": "polpas",
};

const highlightSlides: HighlightSlide[] = [
    {
        id: "highlight-acai",
        title: "Açaí",
        description: "Linha completa com texturas cremosas, variações tradicionais, premium e zero açúcar para qualquer cardápio.",
        image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-1/Acai-pREMIUM.png",
    },
    {
        id: "highlight-sorvetes",
        title: "Sorvetes",
        description: "Sabores cremosos e estáveis para vitrine, buffet e delivery, com visual irresistível.",
        image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-1/Sorvetes.png",
    },
    {
        id: "highlight-cremes",
        title: "Cremes",
        description: "Receitas exclusivas que combinam com toppings, taças especiais e sobremesas autorais.",
        image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-1/Cremes.png",
    },
    {
        id: "highlight-sorbets",
        title: "Sorbets Zero Lactose",
        description: "Fórmulas leves, vibrantes e sem lactose para encantar um público mais amplo.",
        image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-1/sorbet.PNG",
    },
    {
        id: "highlight-picoles",
        title: "Picolés",
        description: "Recheados, premium, especiais e frutas para vitrines coloridas e rentáveis.",
        image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-1/picole.png",
    },
    {
        id: "highlight-polpas",
        title: "Polpas de frutas",
        description: "Polpas de 100g, barras de 1kg e frutas congeladas prontas para preparo rápido.",
        image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-1/polpa.png",
    },
];

const productLines: ProductLine[] = [
    {
        id: "line-acai",
        anchor: "acai",
        title: "Linha Açaí",
        subtitle: "Textura consistente, cor intensa e sabores pensados para taças, copos, barcas e baldes profissionais.",
        theme: "from-purple-900 via-purple-700 to-fuchsia-600",
        slides: [
            {
                id: "line-acai-tradicional",
                heading: "Linha Tradicional",
                description: "Adoçado com açúcar, sem guaraná, ideal para receitas base e copos montados.",
                items: ["Tradicional", "Tradicional com banana", "Tradicional com guaraná"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai/acai-tradicional.png",
            },
            {
                id: "line-acai-premium",
                heading: "Linha Premium",
                description: "Com guaraná para ganhar energia extra e destaque no sabor.",
                items: ["Premium", "Premium com banana", "Premium com morango"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai/acai-premium.png",
            },
            {
                id: "line-acai-super",
                heading: "Super Premium",
                description: "Formulação mais cremosa e rica, perfeita para taças especiais.",
                items: ["Super premium"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai/acai-super-premium.jpg",
            },
            {
                id: "line-acai-zero",
                heading: "Zero Açúcar",
                description: "Opção adoçada naturalmente para públicos com restrições, mantendo sabor e textura.",
                items: ["Zero açúcar com banana"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai/acai-super-premium.jpg",
            },
        ],
    },
    {
        id: "line-cremes",
        anchor: "cremes",
        title: "Linha Cremes",
        subtitle: "Cremes autorais para acompanhar açaí, montar sobremesas e turbinar vitrines temáticas.",
        theme: "from-amber-700 via-orange-500 to-yellow-400",
        slides: [
            {
                id: "line-cremes-classicos",
                heading: "Clássicos",
                description: "Sabores queridinhos que combinam com complementos doces e frutas frescas.",
                items: ["Cupuaçu", "Amazzoninho trufado"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-creme/creme-classico.png",
            },
            {
                id: "line-cremes-mesclados",
                heading: "Mesclados",
                description: "Combinações com contraste visual e sabor marcante.",
                items: ["Amazzoninho Trufado", "Iogurte grego com amarena"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-creme/creme-mesclado.png",
            },
        ],
    },
    {
        id: "line-sorvetes",
        anchor: "sorvetes",
        title: "Linha Sorvetes",
        subtitle: "Mix versátil com sabores clássicos e diferenciados para potes, casquinhas e sobremesas.",
        theme: "from-blue-900 via-sky-700 to-cyan-500",
        sharedImage: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-sorvete/sorvete.png",
        slides: [
            {
                id: "line-sorvetes-classicos",
                heading: "Sabores Clássicos",
                description: "Base ideal para milk-shakes, taças e casquinhas tradicionais.",
                items: ["Chocolate", "Morango", "Flocos", "Creme"],
            },
            {
                id: "line-sorvetes-especiais",
                heading: "Sabores Especiais",
                description: "Combinações criativas que chamam atenção na vitrine.",
                items: ["Blue Ice", "Avelã", "Chiclete", "Unicórnio"],
            },
        ],
    },
    {
        id: "line-sorbets",
        anchor: "sorbets",
        title: "Linha Sorbets Zero Lactose",
        subtitle: "Sabores refrescantes e sem lactose para ampliar o mix e atender novos públicos.",
        theme: "from-emerald-900 via-green-700 to-lime-500",
        sharedImage: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-sorbet/sorbet.png",
        slides: [
            {
                id: "line-sorbets-sabores",
                heading: "Sabores",
                description: "Opções com fruta intensa e final refrescante.",
                items: ["Cupuaçu", "Cajá", "Maracujá", "Manga", "Morango"],
            },
        ],
    },
    {
        id: "line-picoles",
        anchor: "picoles",
        title: "Linha Picolés",
        subtitle: "Categorias para todas as vitrines: recheados, premium, especiais, ao leite e frutas.",
        theme: "from-rose-900 via-rose-700 to-pink-500",
        slides: [
            {
                id: "line-picoles-especiais",
                heading: "Especiais",
                description: "Sabores com recheios e coberturas diferenciadas.",
                items: ["Bombom com avelã", "Capuccino", "Raffaello", "Torta de limão"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-picoles/picole-especial.png",
            },
            {
                id: "line-picoles-premium",
                heading: "Premium",
                description: "Bases nobres e recheios cremosos.",
                items: ["Pistache", "Snickers"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-picoles/picole-premium.png",
            },
            {
                id: "line-picoles-recheados",
                heading: "Recheados",
                description: "Contrastes de fruta e leite condensado para surpreender.",
                items: ["Maracujá com leite condensado", "Morango com leite condensado", "Ninho trufado"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-picoles/picole-recheado.png",
            },
            {
                id: "line-picoles-ao-leite",
                heading: "Ao leite",
                description: "Sabores regionais que vendem o ano inteiro.",
                items: ["Cupuaçu", "Milho"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-picoles/picole-ao-leite.png",
            },
            {
                id: "line-picoles-frutas",
                heading: "Frutas",
                description: "Frutas amazônicas e clássicas com refrescância natural.",
                items: ["Açaí com guaraná", "Maracujá", "Morango"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-picoles/picole-fruta.png",
            },
        ],
    },
    {
        id: "line-polpas",
        anchor: "polpas",
        title: "Polpas de Frutas",
        subtitle: "Portfólio para sucos, sobremesas e preparo de caldas com rendimento garantido.",
        theme: "from-orange-900 via-amber-600 to-red-500",
        slides: [
            {
                id: "line-polpas-100g",
                heading: "Polpas 100g",
                description: "Sachês individuais práticos para preparo imediato.",
                items: ["Polpa 100g"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-polpas/polpa-100-g.png",
            },
            {
                id: "line-polpas-1kg",
                heading: "Polpa Barra 1kg",
                description: "Barras congeladas para produção em escala.",
                items: ["Polpa Barra 1kg"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-polpas/polpa-1-kg.png",
            },
            {
                id: "line-polpas-frutas",
                heading: "Frutas Congeladas",
                description: "Cortes selecionados para receitas premium.",
                items: ["Morango"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-polpas/frutas-congeladas.png",
            },
            {
                id: "line-polpas-cremes",
                heading: "Cremes 1 Litro",
                description: "Opções cremosas que aceleram o preparo de sobremesas.",
                items: ["Morango", "Graviola", "Cajá"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-polpas/creme-1-litro.png",
            },
        ],
    },
    {
        id: "line-acai-cremes-1500",
        anchor: "acai-cremes-1500",
        title: "Açaí e Cremes - 1,5L",
        subtitle: "Baldes prontos para freezer e vitrine com mix de açaí e cremes de alto giro.",
        theme: "from-purple-800 via-purple-600 to-pink-500",
        slides: [
            {
                id: "line-acai-cremes-1500-guarana",
                heading: "Açaí com guaraná",
                description: "Energia extra para copos, barcas e açaí no balde.",
                items: ["Premium", "Premium com banana", "Premium com morango"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai-cremes-1500/acai-creme-1500-com-guarana.png",
            },
            {
                id: "line-acai-cremes-1500-zero",
                heading: "Zero Açúcar",
                description: "Opções sem açúcar para clientes com restrições.",
                items: ["Zero açúcar (com guaraná)", "Zero açúcar (sem guaraná)"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai-cremes-1500/acai-creme-1500-zero-acucar.png",
            },
            {
                id: "line-acai-cremes-1500-cremes",
                heading: "Cremes",
                description: "Sabores prontos para sobremesas na colher.",
                items: ["Cupuaçu", "Iogurte grego com amarena", "Ninho trufado"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai-cremes-1500/acai-creme-1500-cremes.png",
            },
        ],
    },
    {
        id: "line-acai-cremes-250",
        anchor: "acai-cremes-250",
        title: "Açaí e Cremes - 250ml",
        subtitle: "Porções individuais perfeitas para degustação, combos e delivery.",
        theme: "from-purple-700 via-fuchsia-600 to-rose-500",
        slides: [
            {
                id: "line-acai-cremes-250-acai",
                heading: "Açaí 250ml",
                description: "Opções com e sem guaraná para presentes e combos rápidos.",
                items: ["Premium (com guaraná)", "Premium com morango", "Puro com banana zero açúcar"],
            },
            {
                id: "line-acai-cremes-250-cremes",
                heading: "Cremes 250ml",
                description: "Cremes clássicos em versão prática.",
                items: ["Cupuaçu"],
            },
        ],
    },
];

const Products = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const lineRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [autoCarouselApi, setAutoCarouselApi] = useState<CarouselApi | null>(null);
    const [highlightIndex, setHighlightIndex] = useState(0);

    useEffect(() => {
        const handleScrollToProducts = () => {
            if (sectionRef.current) {
                sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };
        window.addEventListener("scroll-to-products", handleScrollToProducts);
        return () => window.removeEventListener("scroll-to-products", handleScrollToProducts);
    }, []);

    useEffect(() => {
        const handleScrollToLine = (event: Event) => {
            const detail = (event as CustomEvent<{ productId: string }>).detail;
            if (!detail) return;
            const target = lineRefs.current[detail.productId];
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };
        window.addEventListener("scroll-to-product-line", handleScrollToLine as EventListener);
        return () => window.removeEventListener("scroll-to-product-line", handleScrollToLine as EventListener);
    }, []);

    // Auto-play + acompanhar índice ativo do primeiro carrossel (destaques)
    useEffect(() => {
        if (!autoCarouselApi) return;
        const onSelect = () => {
            try { setHighlightIndex(autoCarouselApi.selectedScrollSnap()); } catch { }
        };
        onSelect();
        autoCarouselApi.on('select', onSelect);
        autoCarouselApi.on('reInit', onSelect);
        const id = window.setInterval(() => {
            try { autoCarouselApi.scrollNext(); } catch { }
        }, 4200);
        return () => {
            window.clearInterval(id);
            try {
                autoCarouselApi.off('select', onSelect);
                autoCarouselApi.off('reInit', onSelect);
            } catch { }
        };
    }, [autoCarouselApi]);

    const handleHighlightClick = (slideId: string) => {
        const anchor = highlightAnchorMap[slideId];
        if (anchor) {
            window.dispatchEvent(new CustomEvent('scroll-to-product-line', { detail: { productId: anchor } }));
        }
    };

    return (
        <section ref={sectionRef} id="produtos" className="w-full py-20 bg-brand-yellow texture-dots-light">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-brand-purple font-playfair text-center">
                    Nossos Produtos
                </h2>
                <p className="mt-4 text-center text-brand-dark max-w-3xl mx-auto">
                    Organização pensada para que você apresente o mix Amazzon Easy com clareza. Cada carrossel
                    destaca a linha, a arte de capa e os sabores correspondentes para acelerar a escolha do cliente.
                </p>

                <div className="relative mt-12">
                    <Carousel className="px-2" opts={{ align: "start", loop: true }} setApi={setAutoCarouselApi}>
                        <CarouselContent className="-ml-6">
                            {highlightSlides.map((slide, idx) => (
                                <CarouselItem key={slide.id} className="pl-6 basis-full cursor-pointer">
                                    <button
                                        type="button"
                                        onClick={() => handleHighlightClick(slide.id)}
                                        className={`w-full text-left group cursor-pointer rounded-3xl hover:shadow-xl hover:ring-2 hover:ring-brand-yellow/40 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${highlightIndex === idx ? 'opacity-100 scale-100' : 'opacity-60 scale-95 blur-[0.2px]'} `}
                                        aria-label={`Ir para a seção ${slide.title}`}
                                    >
                                        <div className="relative h-[480px] md:h-[62vh] max-h-[760px] flex items-center justify-center p-6 cursor-pointer">
                                            <Image
                                                src={slide.image}
                                                alt={`Linha ${slide.title}`}
                                                fill
                                                sizes="100vw"
                                                className={`cursor-pointer object-contain drop-shadow-xl transition-transform duration-700 group-hover:scale-105 ${highlightIndex === idx ? 'scale-100' : 'scale-95'}`}
                                            />
                                        </div>
                                        <div className="px-6 pb-6 mt-4 md:mt-6 flex justify-center cursor-pointer">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-brand-purple text-white px-6 py-2.5 shadow-md ring-2 ring-brand-purple/20 transition-colors group-hover:bg-brand-yellow group-hover:text-brand-dark">
                                                <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow" aria-hidden />
                                                <span className="text-2xl md:text-3xl font-playfair font-semibold tracking-tight">
                                                    {slide.title}
                                                </span>
                                            </span>
                                        </div>
                                    </button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                {/* Divisor sutil entre seções */}
                <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />

                <div
                    id="revendedor"
                    className="mt-16 max-w-4xl mx-auto px-8 py-10 text-center"
                >
                    <h3 className="text-3xl font-playfair font-bold text-brand-purple">
                        Seja um Revendedor Amazzon Easy
                    </h3>
                    <p className="mt-4 text-brand-dark">
                        Se você tem uma loja de açaí, delivery, lanchonete ou outro ponto de venda, agende uma
                        degustação gratuita e descubra o diferencial do nosso açaí e cremes. Cadastre seu negócio de forma
                        simples, receba lançamentos e suporte direto da nossa equipe.
                    </p>
                    <p className="mt-4 text-brand-dark">
                        Experimente e leve a verdadeira experiência Amazzon Easy aos seus clientes!
                    </p>
                    <button
                        onClick={() =>
                            window.dispatchEvent(
                                new CustomEvent("open-contact-form", { detail: { subject: "revenda" } })
                            )
                        }
                        className="mt-8 inline-block rounded-full bg-brand-purple px-8 py-3 text-base font-semibold text-white transition-transform hover:scale-105 hover:bg-brand-purple/90"
                    >
                        Quero ser revendedor
                    </button>
                </div>

                <div className="mt-20 space-y-20">
                    {productLines.map((line) => {
                        const sharedImage = isSupportedImageUrl(line.sharedImage) ? line.sharedImage : undefined;
                        const usesSharedImage = Boolean(sharedImage) && line.slides.every((slide) => {
                            const slideImage = slide.image;
                            return !isSupportedImageUrl(slideImage) || slideImage === sharedImage;
                        });
                        const showNavigation = line.slides.length > 1;

                        return (
                            <div
                                key={line.id}
                                id={line.anchor}
                                ref={(el) => {
                                    lineRefs.current[line.anchor] = el;
                                }}
                                className="scroll-mt-28"
                            >
                                {/* Divisor sutil antes de cada seção de produto */}
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
                                            <h4 className="text-3xl sm:text-4xl font-playfair font-bold text-brand-purple">{(line.title || '').replace(/^Linha\s+/i, '').trim()}</h4>
                                            <p className="text-base md:text-lg text-brand-dark/90">{line.subtitle}</p>
                                        </div>

                                        <div className={`flex flex-col gap-10 ${usesSharedImage ? "lg:flex-row lg:items-center lg:gap-12" : ""}`}>
                                            {usesSharedImage && (
                                                <div className="mx-auto w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[420px] xl:max-w-[520px]">
                                                    <AspectRatio
                                                        ratio={5 / 6}
                                                        className="group relative w-full overflow-hidden rounded-[36px] bg-brand-purple/90 texture-dots-dark shadow-2xl ring-1 ring-brand-purple/35"
                                                    >
                                                        <Image
                                                            src={sharedImage as string}
                                                            alt={`${(line.title || '').replace(/^Linha\s+/i, '').trim()} - destaque visual`}
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
                                            )}

                                            <Carousel className={`${usesSharedImage ? "flex-1 " : ""}px-2`} opts={{ align: "start", loop: showNavigation }}>
                                                <CarouselContent className={usesSharedImage ? "-ml-6 lg:-ml-8" : "-ml-6"}>
                                                    {line.slides.map((slide) => {
                                                        if (usesSharedImage) {
                                                            return (
                                                                <CarouselItem
                                                                    key={slide.id}
                                                                    className="pl-6 basis-full"
                                                                >
                                                                    <div className="flex h-full flex-col gap-6 rounded-[32px] bg-brand-purple/95 texture-dots-dark p-6 text-center text-white shadow-xl ring-1 ring-brand-purple/25 backdrop-blur-sm">
                                                                        <span className="inline-flex items-center gap-2 self-center rounded-full bg-brand-yellow text-brand-purple px-5 py-2 ring-2 ring-brand-yellow/40">
                                                                            <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow" aria-hidden />
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
                                                                            <ul className="mt-2 grid grid-cols-1 gap-2 text-sm md:text-base text-white">
                                                                                {slide.items.map((it) => (
                                                                                    <li key={it} className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 ring-1 ring-white/20">
                                                                                        <span className="h-2 w-2 rounded-full bg-brand-yellow" aria-hidden />
                                                                                        <span>{it}</span>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        )}
                                                                    </div>
                                                                </CarouselItem>
                                                            );
                                                        }

                                                        const mediaSrc = slide.image ?? sharedImage;
                                                        const hasImage = isSupportedImageUrl(mediaSrc);

                                                        return (
                                                            <CarouselItem
                                                                key={slide.id}
                                                                className="pl-6 basis-full"
                                                            >
                                                                <div className="flex h-full flex-col gap-6">
                                                                    <div className="mx-auto flex w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[640px] flex-1">
                                                                        <AspectRatio
                                                                            ratio={5 / 6}
                                                                            className="group relative w-full overflow-hidden rounded-[36px] bg-brand-purple/90 texture-dots-dark shadow-2xl ring-1 ring-brand-purple/35"
                                                                        >
                                                                            {hasImage ? (
                                                                                <>
                                                                                    <Image
                                                                                        src={mediaSrc as string}
                                                                                        alt={`${(line.title || '').replace(/^Linha\s+/i, '').trim()} - ${slide.heading}`}
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

                                                                    <div className="flex flex-col items-center gap-3">
                                                                        <span className="inline-flex items-center gap-2 rounded-full bg-brand-purple text-white px-6 py-2.5 ring-2 ring-brand-purple/20">
                                                                            <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow" aria-hidden />
                                                                            <span className="text-xl md:text-2xl font-playfair font-bold tracking-tight">
                                                                                {slide.heading}
                                                                            </span>
                                                                        </span>

                                                                        {slide.description && (
                                                                            <p className="text-center text-white/85 text-sm md:text-base max-w-2xl mx-auto">
                                                                                {slide.description}
                                                                            </p>
                                                                        )}

                                                                        {slide.items?.length > 0 && (
                                                                            <div className="mt-1 flex flex-wrap justify-center gap-2 md:gap-3">
                                                                                {slide.items.map((it) => (
                                                                                    <span
                                                                                        key={it}
                                                                                        className="inline-flex items-center gap-2 rounded-full bg-white text-brand-dark px-3 py-1.5 text-xs md:text-sm shadow-sm ring-1 ring-brand-purple/20"
                                                                                    >
                                                                                        <span className="h-2 w-2 rounded-full bg-brand-yellow" aria-hidden />
                                                                                        {it}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </CarouselItem>
                                                        );
                                                    })}
                                                </CarouselContent>
                                                {showNavigation && <CarouselPrevious className="-left-3 md:-left-4" />}
                                                {showNavigation && <CarouselNext className="-right-3 md:-right-4" />}
                                            </Carousel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Products;



