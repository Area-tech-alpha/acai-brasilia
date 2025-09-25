"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ProductModal from './ProductModal';

type Product = {
    id: string;
    name: string;
    description: string;
    mainImage: string;
    carouselImages: string[];
};

const productsData: Product[] = [
    {
        id: 'acai',
        name: 'Açaí',
        description: 'Açaí autêntico do Pará, cremoso e energético. Ideal puro ou com acompanhamentos.',
        mainImage: 'https://images.unsplash.com/photo-1594149929915-1c37fce4bb7b?q=80&w=1974&auto=format&fit=crop',
        carouselImages: [
            'https://images.unsplash.com/photo-1594149929915-1c37fce4bb7b?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617137968427-85924c800a6d?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1974&auto=format&fit=crop'
        ]
    },
    {
        id: 'polpas',
        name: 'Polpas',
        description: 'Polpas de frutas 100% naturais e sem conservantes. Leve o sabor da Amazônia para suas receitas com nossas polpas de cupuaçu, acerola, e mais.',
        mainImage: 'https://images.unsplash.com/photo-1619539268323-053773b0c049?q=80&w=2070&auto=format&fit=crop',
        carouselImages: [
            'https://images.unsplash.com/photo-1619539268323-053773b0c049?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1625862249823-7a6a03f883a3?q=80&w=1974&auto=format&fit=crop',
        ]
    },
    {
        id: 'picoles',
        name: 'Picolés',
        description: 'Refrescantes e cheios de sabor. Nossos picolés são feitos com frutas de verdade, perfeitos para qualquer hora do dia.',
        mainImage: 'https://images.unsplash.com/photo-1535384343332-98c23a2b7af9?q=80&w=1974&auto=format&fit=crop',
        carouselImages: [
            'https://images.unsplash.com/photo-1535384343332-98c23a2b7af9?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1501432594218-ac914ba7e25a?q=80&w=1974&auto=format&fit=crop',
        ]
    },
    {
        id: 'cremes',
        name: 'Cremes',
        description: 'Cremes de frutas com uma textura inigualável. Experimente nosso famoso creme de cupuaçu e outras delícias tropicais.',
        mainImage: 'https://images.unsplash.com/photo-1628563398399-e6a3c28638a1?q=80&w=1974&auto=format&fit=crop',
        carouselImages: [
            'https://images.unsplash.com/photo-1628563398399-e6a3c28638a1?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1628563398398-9572f3535c5f?q=80&w=1974&auto=format&fit=crop',
        ]
    }
];

const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {productsData.map((product) => (
                        <div
                            key={product.id}
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
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-white text-3xl font-bold font-playfair">{product.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
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
