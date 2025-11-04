"use client";

import Image from "next/image";
import heroImage from "../../public/heroimagem.webp";

const Hero = () => {
    return (
        <section className="relative w-full min-h-[70vh] md:min-h-[85vh] overflow-hidden text-white flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={heroImage}
                    alt="Açaí na tigela e produtos - Açaí Brasília"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
                {/* Overlay 1: escurecimento principal */}
                <div
                    className="absolute inset-0 bg-black/65 mix-blend-multiply"
                    aria-hidden="true"
                />

                {/* Overlay 2: gradiente suave lateral (dá foco ao texto) */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"
                    aria-hidden="true"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-10">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold font-playfair leading-tight drop-shadow-xl">
                        O segredo das melhores açaíterias e sorveterias começa aqui
                    </h1>

                    <p className="mt-4 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                        Fornecemos açaís, sorvetes, cremes e polpas com qualidade Amazzon
                        Easy para você encantar seus clientes e vender mais.
                    </p>

                    <button
                        onClick={() =>
                            window.dispatchEvent(new CustomEvent("scroll-to-products"))
                        }
                        className="mt-8 inline-block bg-brand-yellow text-brand-dark font-bold text-lg py-3 px-8 rounded-full hover:bg-opacity-90 transition-transform hover:scale-105"
                    >
                        Conheça Nossos Produtos
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
