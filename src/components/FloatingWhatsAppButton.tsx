import Image from "next/image";

const WHATSAPP_PHONE = "5561983082101";
const DEFAULT_MESSAGE = "Ola! Gostaria de saber mais sobre os produtos Amazzon Easy.";

const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

const FloatingWhatsAppButton = () => (
    <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar pelo WhatsApp"
        className="group fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-brand-green px-5 py-3 text-white shadow-xl transition-all hover:translate-y-[-2px] hover:bg-brand-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
    >
        <Image
            src="https://svgrepo.com/show/473829/whatsapp.svg"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6"
            style={{ filter: "brightness(0) invert(1)" }}
            aria-hidden="true"
        />
        <span className="text-sm font-semibold leading-none">WhatsApp</span>
    </a>
);

export default FloatingWhatsAppButton;
