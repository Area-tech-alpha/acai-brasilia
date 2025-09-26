"use client";
import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

type Product = {
    name: string;
    description: string;
    carouselImages: string[];
    carouselCaptions?: string[];
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
            <DialogContent className="max-w-7xl w-[min(98vw,1400px)] max-h-[calc(100vh-2rem)] overflow-hidden p-0 bg-brand-yellow texture-dots-light text-brand-dark border-4 border-brand-purple rounded-lg backdrop-blur-none">
                <DialogHeader className="px-8 pt-6 pb-4 relative z-30 bg-brand-yellow texture-dots-light">
                    <DialogTitle className="text-brand-purple font-playfair text-3xl md:text-4xl tracking-tight border-b-4 border-brand-purple w-fit pb-1">
                        {product.name}
                    </DialogTitle>
                    <DialogDescription className="text-brand-dark/80 text-base md:text-lg mt-2">
                        {product.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 bg-brand-yellow texture-dots-light items-stretch relative z-20">
                    {/* Carousel */}
                    <div className="relative w-full h-[360px] md:h-[60vh] lg:h-[65vh] group">
                        <div className="relative w-full h-full">
                            <Image
                                src={product.carouselImages[currentIndex]}
                                alt={`${product.name} imagem ${currentIndex + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                            {product.carouselCaptions && product.carouselCaptions[currentIndex] && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm md:text-base px-4 py-2 z-20">
                                    {product.carouselCaptions[currentIndex]}
                                </div>
                            )}
                        </div>
                        {/* Left Arrow */}
                        <Button variant="secondary" className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-3 text-2xl rounded-full p-2 bg-black/60 text-white" onClick={prevSlide}>
                            &#10094;
                        </Button>
                        {/* Right Arrow */}
                        <Button variant="secondary" className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 right-3 text-2xl rounded-full p-2 bg-black/60 text-white" onClick={nextSlide}>
                            &#10095;
                        </Button>
                        {/* Dots */}
                        <div className="absolute top-3 right-3 flex items-center justify-end gap-2 z-10">
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
                    <div className="p-8 md:p-10 flex flex-col justify-between bg-brand-yellow texture-dots-light overflow-auto relative z-20">
                        <p className="text-brand-dark text-base md:text-lg leading-relaxed">{product.description}</p>
                        {/* Thumbnails */}
                        <div className="mt-6 grid grid-cols-5 gap-3">
                            {product.carouselImages.map((src: string, idx: number) => (
                                <button key={idx} onClick={() => setCurrentIndex(idx)} className={`relative aspect-square rounded overflow-hidden ring-2 ${idx === currentIndex ? 'ring-brand-purple' : 'ring-transparent'}`}>
                                    <div className="relative w-full h-full">
                                        <Image src={src} alt={`Thumb ${idx + 1}`} fill sizes="100px" className="object-cover" />
                                    </div>
                                </button>
                            ))}
                        </div>
                        <Button onClick={onClose} className="mt-6 self-start bg-brand-purple text-white hover:bg-brand-purple/90">Fechar</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
