"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ProductModal from './ProductModal';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

type Product = {
    id: string;
    name: string;
    description: string;
    mainImage: string;
    carouselImages: string[];
    carouselCaptions?: string[];
};

const productsData: Product[] = [
    {
        id: 'acai',
        name: 'Açaí',
        description: 'Linha completa de açaís: do tradicional ao premium, com e sem açúcar, tamanhos variados. Escolha o seu preferido.',
        mainImage: 'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/acais/IMG-20240909-WA0063.jpg',
        carouselImages: [
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/acais/IMG-20240909-WA0063.jpg',
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/cremes/IMG_2905.jpg',
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/cremes/chocolate.png',
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/acais/IMG_9860.jpg'
        ],
        carouselCaptions: [
            'Açaí Tradicional 500ml',
            'Cremes da Casa',
            'Linha de Picolés',
            'Polpas Selecionadas'
        ]
    },
    {
        id: 'polpas',
        name: 'Polpas',
        description: 'Polpas naturais de diversas frutas da Amazônia para sucos, sobremesas e receitas. Escolha os sabores.',
        mainImage: 'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/acais/IMG_9860.jpg',
        carouselImages: [
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/acais/IMG_9860.jpg',
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/acais/IMG-20240909-WA0063.jpg',
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/cremes/IMG_2905.jpg',
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/cremes/chocolate.png'
        ],
        carouselCaptions: [
            'Polpa de Cupuaçu 1kg',
            'Açaí para Preparo',
            'Cremes para Receitas',
            'Picolés de Frutas'
        ]
    },
    {
        id: 'picoles',
        name: 'Picolés',
        description: 'Vários picolés artesanais com sabores clássicos e regionais. Escolha o seu preferido.',
        mainImage: 'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/cremes/chocolate.png',
        carouselImages: [
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/cremes/chocolate.png',
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/acais/IMG-20240909-WA0063.jpg',
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/cremes/IMG_2905.jpg',
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/acais/IMG_9860.jpg'
        ],
        carouselCaptions: [
            'Picolé de Chocolate Tradicional',
            'Linha Açaí',
            'Linha Cremes',
            'Linha Polpas'
        ]
    },
    {
        id: 'cremes',
        name: 'Cremes',
        description: 'Cremes variados com texturas e sabores da Amazônia. Várias opções para montar sua taça.',
        mainImage: 'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/cremes/IMG_2905.jpg',
        carouselImages: [
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/cremes/IMG_2905.jpg',
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/acais/IMG-20240909-WA0063.jpg',
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/cremes/chocolate.png',
            'https://4qozbotg9nhsxukb.public.blob.vercel-storage.com/produtos/acais/IMG_9860.jpg'
        ],
        carouselCaptions: [
            'Creme de Cupuaçu',
            'Açaí da Casa',
            'Linha Picolés',
            'Polpas para Preparo'
        ]
    }
];

const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(undefined);

    const openModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const openListener = (e: Event) => {
            const detail = (e as CustomEvent<{ productId: string }>).detail;
            if (!detail) return;
            const product = productsData.find(p => p.id === detail.productId);
            if (product) {
                openModal(product);
            }
        };
        const scrollListener = () => {
            if (sectionRef.current) sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        window.addEventListener('open-product-modal', openListener as EventListener);
        window.addEventListener('scroll-to-products', scrollListener);
        return () => {
            window.removeEventListener('open-product-modal', openListener as EventListener);
            window.removeEventListener('scroll-to-products', scrollListener);
        };
    }, []);

    useEffect(() => {
        if (!carouselApi) return;
        const intervalId = window.setInterval(() => {
            try {
                carouselApi.scrollNext();
            } catch { }
        }, 3500);
        return () => window.clearInterval(intervalId);
    }, [carouselApi]);

    return (
        <section ref={sectionRef} id="produtos" className="w-full py-20 bg-brand-yellow texture-dots-light">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-brand-purple font-playfair mb-12">Nossos Produtos</h2>
                {/* Âncoras para navegação */}
                <div className="sr-only">
                    <span id="acai" />
                    <span id="polpas" />
                    <span id="picoles" />
                    <span id="cremes" />
                </div>
                <div className="relative">
                    <Carousel
                        className="px-6 md:px-12 w-full sm:max-w-[660px] mx-auto"
                        opts={{ align: "start", loop: true }}
                        setApi={setCarouselApi}
                    >
                        <CarouselContent className="-ml-6">
                            {productsData.map((product) => (
                                <CarouselItem
                                    key={product.id}
                                    className="pl-6 basis-full"
                                >
                                    <div
                                        className="group cursor-pointer"
                                        onClick={() => openModal(product)}
                                    >
                                        <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
                                            <div className="relative w-full h-80">
                                                <Image
                                                    src={product.mainImage}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h3 className="text-white text-3xl font-bold font-playfair">{product.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-3" />
                        <CarouselNext className="-right-3" />
                    </Carousel>
                </div>
                {/* Espaços reservados para imagens e instruções */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold font-playfair text-brand-purple mb-6">Galeria & Instruções</h3>
                    <p className="text-brand-dark max-w-3xl mx-auto mb-8">Separe aqui imagens de produtos, banners e instruções de preparo/serviço. Clique em um produto para ver o carrossel completo.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="aspect-square rounded-lg border-2 border-dashed border-brand-purple/40 bg-brand-yellow/10 flex items-center justify-center text-brand-purple/70">
                                Espaço para imagem {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && selectedProduct && (
                <ProductModal product={selectedProduct} onClose={closeModal} />
            )}
        </section>
    );
};

export default Products;
