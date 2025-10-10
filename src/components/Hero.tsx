"use client";

import Image from 'next/image';

const Hero = () => {
    return (
        <section
            className="relative w-full h-[60vh] md:h-[80vh] bg-brand-purple texture-noise-dark flex items-center justify-center text-white"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/heroimagem.jpg"
                    alt="Açaí na tigela e produtos - Açaí Brasília"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold font-playfair leading-tight drop-shadow-lg">
                    O segredo das melhores açaíterias e sorveterias começa aqui
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                    Fornecemos açaís, sorvetes, cremes e polpas com qualidade Amazzon Easy para você encantar seus clientes e vender mais.
                </p>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('scroll-to-products'))}
                    className="mt-8 inline-block bg-brand-yellow text-brand-dark font-bold text-lg py-3 px-8 rounded-full hover:bg-opacity-90 transition-transform transform hover:scale-105"
                >
                    Conheça Nossos Produtos
                </button>
            </div>
        </section>
    );
};

export default Hero;
