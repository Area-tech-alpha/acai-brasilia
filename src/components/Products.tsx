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
    slides: LineSlide[];
};

const isSupportedImageUrl = (url?: string) => {
    if (!url) return false;
    try {
        const path = url.split('?')[0];
        return /\.(png|jpe?g|webp|gif|avif|svg|bmp)$/i.test(path);
    } catch {
        return false;
    }
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
        backgroundImage:
            "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai/capa-acai.ARW",
        slides: [
            {
                id: "line-acai-tradicional",
                heading: "Linha Tradicional",
                description: "Adoçado com açúcar, sem guaraná, ideal para receitas base e copos montados.",
                items: ["Tradicional", "Tradicional com banana"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai/acai-tradicional.ARW",
            },
            {
                id: "line-acai-premium",
                heading: "Linha Premium",
                description: "Com guaraná para ganhar energia extra e destaque no sabor.",
                items: ["Premium", "Premium com banana", "Premium com morango"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai/acai-premium.ARW",
            },
            {
                id: "line-acai-super",
                heading: "Super Premium",
                description: "Formulação mais cremosa e rica, perfeita para taças especiais.",
                items: ["Super premium"],
            },
            {
                id: "line-acai-zero",
                heading: "Zero Açúcar",
                description: "Opção adoçada naturalmente para públicos com restrições, mantendo sabor e textura.",
                items: ["Zero açúcar com banana"],
                image: "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai/acai-zero-acucar.ARW",
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
                items: ["Cupuaçu", "Amazzoninho (creme de leite ninho)"],
            },
            {
                id: "line-cremes-mesclados",
                heading: "Mesclados",
                description: "Combinações com contraste visual e sabor marcante.",
                items: ["Amazzoninho Trufado", "Iogurte grego com amarena"],
            },
        ],
    },
    {
        id: "line-sorvetes",
        anchor: "sorvetes",
        title: "Linha Sorvetes",
        subtitle: "Mix versátil com sabores clássicos e diferenciados para potes, casquinhas e sobremesas.",
        theme: "from-blue-900 via-sky-700 to-cyan-500",
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
            },
            {
                id: "line-picoles-premium",
                heading: "Premium",
                description: "Bases nobres e recheios cremosos.",
                items: ["Pistache", "Snickers"],
            },
            {
                id: "line-picoles-recheados",
                heading: "Recheados",
                description: "Contrastes de fruta e leite condensado para surpreender.",
                items: ["Maracujá com leite condensado", "Morango com leite condensado", "Ninho trufado"],
            },
            {
                id: "line-picoles-ao-leite",
                heading: "Ao leite",
                description: "Sabores regionais que vendem o ano inteiro.",
                items: ["Cupuaçu", "Milho"],
            },
            {
                id: "line-picoles-frutas",
                heading: "Frutas",
                description: "Frutas amazônicas e clássicas com refrescância natural.",
                items: ["Açaí com guaraná", "Maracujá", "Morango"],
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
            },
            {
                id: "line-polpas-1kg",
                heading: "Polpa Barra 1kg",
                description: "Barras congeladas para produção em escala.",
                items: ["Polpa Barra 1kg"],
            },
            {
                id: "line-polpas-frutas",
                heading: "Frutas Congeladas",
                description: "Cortes selecionados para receitas premium.",
                items: ["Morango"],
            },
            {
                id: "line-polpas-cremes",
                heading: "Cremes 1 Litro",
                description: "Opções cremosas que aceleram o preparo de sobremesas.",
                items: ["Morango", "Graviola", "Cajá"],
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
            },
            {
                id: "line-acai-cremes-1500-zero",
                heading: "Zero Açúcar",
                description: "Opções sem açúcar para clientes com restrições.",
                items: ["Zero açúcar (com guaraná)", "Zero açúcar (sem guaraná)"],
            },
            {
                id: "line-acai-cremes-1500-cremes",
                heading: "Cremes",
                description: "Sabores prontos para sobremesas na colher.",
                items: ["Cupuaçu", "Iogurte grego com amarena", "Ninho trufado"],
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

    // Auto-play apenas para o primeiro carrossel (destaques)
    useEffect(() => {
        if (!autoCarouselApi) return;
        const id = window.setInterval(() => {
            try {
                autoCarouselApi.scrollNext();
            } catch {
                /* noop */
            }
        }, 4200);
        return () => window.clearInterval(id);
    }, [autoCarouselApi]);

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
                            {highlightSlides.map((slide) => (
                                <CarouselItem key={slide.id} className="pl-6 basis-full">
                                    <div className="group">
                                        <div className="relative h-[480px] md:h-[62vh] max-h-[760px] flex items-center justify-center p-6">
                                            <Image
                                                src={slide.image}
                                                alt={`Linha ${slide.title}`}
                                                fill
                                                sizes="100vw"
                                                className="object-contain drop-shadow-xl"
                                            />
                                        </div>
                                        <div className="px-6 pb-6 mt-4 md:mt-6 flex justify-center">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-brand-purple text-white px-6 py-2.5 shadow-md ring-2 ring-brand-purple/20">
                                                <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow" aria-hidden />
                                                <span className="text-2xl md:text-3xl font-playfair font-semibold tracking-tight">
                                                    {slide.title}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                <div
                    id="revendedor"
                    className="mt-16 max-w-4xl mx-auto px-8 py-10 text-center"
                >
                    <h3 className="text-3xl font-playfair text-brand-purple">
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
                    {productLines.map((line) => (
                        <div
                            key={line.id}
                            id={line.anchor}
                            ref={(el) => {
                                lineRefs.current[line.anchor] = el;
                            }}
                            className="scroll-mt-28"
                        >
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
                                    <div className="flex flex-col gap-3 text-brand-dark">
                                        <h4 className="text-3xl font-playfair text-brand-purple sm:text-4xl">{(line.title || '').replace(/^Linha\s+/i, '').trim()}</h4>
                                        <p className="text-base md:text-lg text-brand-dark/90">{line.subtitle}</p>
                                    </div>
                                    <Carousel className="px-2" opts={{ align: "start", loop: true }}>
                                        <CarouselContent className="-ml-6">
                                            {line.slides.map((slide) => (
                                                <CarouselItem
                                                    key={slide.id}
                                                    className="pl-6 basis-full"
                                                >
                                                    <div className="flex h-full flex-col gap-4">
                                                        {isSupportedImageUrl(slide.image) ? (
                                                            <div className="relative h-[360px] md:h-[48vh] max-h-[640px] flex items-center justify-center p-4">
                                                                <Image
                                                                    src={slide.image as string}
                                                                    alt={`${(line.title || '').replace(/^Linha\s+/i, '').trim()} - ${slide.heading}`}
                                                                    fill
                                                                    sizes="100vw"
                                                                    className="object-contain drop-shadow-xl"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="flex h-[360px] md:h-[48vh] max-h-[640px] items-center justify-center p-4">
                                                                Arte desta categoria em breve.
                                                            </div>
                                                        )}
                                                        <div className="flex justify-center">
                                                            <span className="inline-flex items-center gap-2 rounded-full bg-brand-purple text-white px-6 py-2.5 ring-2 ring-brand-purple/20">
                                                                <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow" aria-hidden />
                                                                <span className="text-xl md:text-2xl font-playfair font-semibold tracking-tight">
                                                                    {slide.heading}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="-left-3 md:-left-4" />
                                        <CarouselNext className="-right-3 md:-right-4" />
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
