"use client";
import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

type Product = {
    name: string;
    description: string;
    carouselImages: string[];
};

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? product.carouselImages.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, product.carouselImages.length]);

    const nextSlide = useCallback(() => {
        const isLastSlide = currentIndex === product.carouselImages.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, product.carouselImages.length]);

    // Close modal on 'Escape' key press
    useEffect(() => {
        const handleKeys = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
            if (event.key === 'ArrowLeft') prevSlide();
            if (event.key === 'ArrowRight') nextSlide();
        };
        window.addEventListener('keydown', handleKeys);

        return () => {
            window.removeEventListener('keydown', handleKeys);
        };
    }, [onClose, prevSlide, nextSlide]);

    return (
        <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="max-w-4xl p-0">
                <DialogHeader className="px-8 pt-6">
                    <DialogTitle className="text-brand-purple font-playfair">{product.name}</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2">
                    {/* Carousel */}
                    <div className="relative w-full h-80 md:h-full group">
                        <div className="relative w-full h-full">
                            <Image
                                src={product.carouselImages[currentIndex]}
                                alt={`${product.name} imagem ${currentIndex + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Left Arrow */}
                        <Button variant="secondary" className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-3 text-2xl rounded-full p-2 bg-black/40 text-white" onClick={prevSlide}>
                            &#10094;
                        </Button>
                        {/* Right Arrow */}
                        <Button variant="secondary" className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 right-3 text-2xl rounded-full p-2 bg-black/40 text-white" onClick={nextSlide}>
                            &#10095;
                        </Button>
                        {/* Dots */}
                        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                            {product.carouselImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    aria-label={`Ir para slide ${idx + 1}`}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-2.5 w-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-brand-yellow w-6' : 'bg-white/70'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                        <p className="text-brand-dark text-base">{product.description}</p>
                        {/* Thumbnails */}
                        <div className="mt-6 grid grid-cols-5 gap-2">
                            {product.carouselImages.map((src: string, idx: number) => (
                                <button key={idx} onClick={() => setCurrentIndex(idx)} className={`relative aspect-square rounded overflow-hidden ring-2 ${idx === currentIndex ? 'ring-brand-yellow' : 'ring-transparent'}`}>
                                    <div className="relative w-full h-full">
                                        <Image src={src} alt={`Thumb ${idx + 1}`} fill sizes="100px" className="object-cover" />
                                    </div>
                                </button>
                            ))}
                        </div>
                        <Button onClick={onClose} className="mt-6 self-start bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90">Fechar</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
