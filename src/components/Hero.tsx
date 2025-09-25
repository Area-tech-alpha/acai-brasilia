"use client";

const Hero = () => {
    return (
        <section
            className="relative w-full h-[60vh] md:h-[80vh] bg-brand-purple texture-noise-dark flex items-center justify-center text-white"
        >
            <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold font-playfair leading-tight">
                    O Sabor Autêntico do Pará, em Brasília.
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                    Açaí puro, cremes e polpas de frutas feitos com a tradição e a riqueza da Amazônia.
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
