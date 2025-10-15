import type { HighlightSlide, ProductLine } from "./types";

export const ALLOWED_IMAGE_HOSTS = [
    "images.unsplash.com",
    "4qozbotg9nhsxukb.public.blob.vercel-storage.com",
    "nfwfolrcpaxqwgkzzfok.supabase.co",
    "drive.google.com",
    "lh3.googleusercontent.com",
] as const;

export const HIGHLIGHT_ANCHOR_MAP: Record<string, string> = {
    "highlight-acai": "acai",
    "highlight-cremes": "cremes",
    "highlight-sorvetes": "sorvetes",
    "highlight-sorbets": "sorbets",
    "highlight-picoles": "picoles",
    "highlight-polpas": "polpas",
};

export const HIGHLIGHT_SLIDES: HighlightSlide[] = [
    {
        id: "highlight-acai",
        title: "Açaí",
        description:
            "Linha completa com texturas cremosas, variações tradicionais, premium e zero açúcar para qualquer cardápio.",
        image:
            "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-1/Acai-pREMIUM.png",
    },
    {
        id: "highlight-sorvetes",
        title: "Sorvetes",
        description:
            "Sabores cremosos e estáveis para vitrine, buffet e delivery, com visual irresistível.",
        image:
            "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-1/Sorvetes.png",
    },
    {
        id: "highlight-cremes",
        title: "Cremes",
        description:
            "Receitas exclusivas que combinam com toppings, taças especiais e sobremesas autorais.",
        image:
            "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-1/Cremes.png",
    },
    {
        id: "highlight-sorbets",
        title: "Sorbets Zero Lactose",
        description:
            "Fórmulas leves, vibrantes e sem lactose para encantar um público mais amplo.",
        image:
            "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-sorbet/sorbet.png",
    },
    {
        id: "highlight-picoles",
        title: "Picolés",
        description:
            "Recheados, premium, especiais e frutas para vitrines coloridas e rentáveis.",
        image:
            "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-1/picole.png",
    },
    {
        id: "highlight-polpas",
        title: "Polpas de frutas",
        description:
            "Polpas de 100g, barras de 1kg e frutas congeladas prontas para preparo rápido.",
        image:
            "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-1/polpa.png",
    },
];

export const PRODUCT_LINES: ProductLine[] = [
    {
        id: "line-acai",
        anchor: "acai",
        title: "Linha Açaí",
        subtitle:
            "Textura consistente, cor intensa e sabores pensados para taças, copos, barcas e baldes profissionais.",
        theme: "from-purple-900 via-purple-700 to-fuchsia-600",
        slides: [
            {
                id: "line-acai-tradicional",
                heading: "Linha Tradicional",
                description:
                    "Adoçado com açúcar, sem guaraná, ideal para receitas base e copos montados.",
                items: ["Tradicional", "Tradicional com banana", "Tradicional com guaraná"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai/acai-tradicional.png",
            },
            {
                id: "line-acai-premium",
                heading: "Linha Premium",
                description:
                    "Com guaraná para ganhar energia extra e destaque no sabor.",
                items: ["Premium", "Premium com banana", "Premium com morango"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai/acai-premium.png",
            },
            {
                id: "line-acai-super",
                heading: "Super Premium",
                description:
                    "Formulação mais cremosa e rica, perfeita para taças especiais.",
                items: ["Super premium"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai/acai-super-premium.png",
            },
            {
                id: "line-acai-zero",
                heading: "Zero Açúcar",
                description:
                    "Opção adoçada naturalmente para públicos com restrições, mantendo sabor e textura.",
                items: ["Zero açúcar com banana"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai/acai-super-premium.png",
            },
        ],
    },
    {
        id: "line-cremes",
        anchor: "cremes",
        title: "Linha Cremes",
        subtitle:
            "Cremes autorais para acompanhar açaí, montar sobremesas e turbinar vitrines temáticas.",
        theme: "from-amber-700 via-orange-500 to-yellow-400",
        contentTone: "dark",
        slides: [
            {
                id: "line-cremes-classicos",
                heading: "Clássicos",
                description:
                    "Sabores queridinhos que combinam com complementos doces e frutas frescas.",
                items: ["Cupuaçu", "Amazzoninho trufado"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-creme/creme-classico.png",
            },
            {
                id: "line-cremes-mesclados",
                heading: "Mesclados",
                description: "Combinações com contraste visual e sabor marcante.",
                items: ["Amazzoninho Trufado", "Iogurte grego com amarena"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-creme/creme-mesclado.png",
            },
        ],
    },
    {
        id: "line-sorvetes",
        anchor: "sorvetes",
        title: "Linha Sorvetes",
        subtitle:
            "Mix versátil com sabores clássicos e diferenciados para potes, casquinhas e sobremesas.",
        theme: "from-blue-900 via-sky-700 to-cyan-500",
        sharedImage:
            "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-sorvete/sorvete.png",
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
        subtitle:
            "Sabores refrescantes e sem lactose para ampliar o mix e atender novos públicos.",
        theme: "from-emerald-900 via-green-700 to-lime-500",
        contentTone: "dark",
        sharedImage:
            "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-sorbet/sorbet.png",
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
        subtitle:
            "Categorias para todas as vitrines: recheados, premium, especiais, ao leite e frutas.",
        theme: "from-rose-900 via-rose-700 to-pink-500",
        slides: [
            {
                id: "line-picoles-especiais",
                heading: "Especiais",
                description: "Sabores com recheios e coberturas diferenciadas.",
                items: ["Bombom com avelã", "Capuccino", "Raffaello", "Torta de limão"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-picoles/picole-especial.png",
            },
            {
                id: "line-picoles-premium",
                heading: "Premium",
                description: "Bases nobres e recheios cremosos.",
                items: ["Pistache", "Snickers"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-picoles/picole-premium.png",
            },
            {
                id: "line-picoles-recheados",
                heading: "Recheados",
                description: "Contrastes de fruta e leite condensado para surpreender.",
                items: ["Maracujá com leite condensado", "Morango com leite condensado", "Ninho trufado"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-picoles/picole-recheado.png",
            },
            {
                id: "line-picoles-ao-leite",
                heading: "Ao leite",
                description: "Sabores regionais que vendem o ano inteiro.",
                items: ["Cupuaçu", "Milho"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-picoles/picole-ao-leite.png",
            },
            {
                id: "line-picoles-frutas",
                heading: "Frutas",
                description: "Frutas amazônicas e clássicas com refrescância natural.",
                items: ["Açaí com guaraná", "Maracujá", "Morango"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-picoles/picole-fruta.png",
            },
        ],
    },
    {
        id: "line-polpas",
        anchor: "polpas",
        title: "Polpas de Frutas",
        subtitle:
            "Portfólio para sucos, sobremesas e preparo de caldas com rendimento garantido.",
        theme: "from-orange-900 via-amber-600 to-red-500",
        contentTone: "dark",
        slides: [
            {
                id: "line-polpas-100g",
                heading: "Polpas 100g",
                description: "Sachês individuais práticos para preparo imediato.",
                items: [
                    "Abacaxi",
                    "Abacaxi com Hortelã",
                    "Acerola",
                    "Caja",
                    "Caju",
                    "Goiaba",
                    "Graviola",
                    "Manga",
                    "Maracujá",
                    "Morango",
                    "Tangerina",
                    "Uva",
                ],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-polpas/polpa-100-g.png",
            },
            {
                id: "line-polpas-1kg",
                heading: "Polpa Barra 1kg",
                description: "Barras congeladas para produção em escala.",
                items: [
                    "Caja",
                    "Caju",
                    "Laranja",
                    "Goiaba",
                    "Abacaxi",
                    "Acerola",
                    "Graviola",
                    "Manga",
                    "Limão",
                    "Uva",
                    "Maracujá",
                ],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-polpas/polpa-1-kg.png",
            },
            {
                id: "line-polpas-frutas",
                heading: "Frutas Congeladas",
                description: "Cortes selecionados para receitas premium.",
                items: ["Morango"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-polpas/frutas-congeladas.png",
            },
            {
                id: "line-polpas-cremes",
                heading: "Cremes 1 Litro",
                description: "Opções cremosas que aceleram o preparo de sobremesas.",
                items: ["Morango", "Graviola", "Cajá"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-polpas/creme-1-litro.png",
            },
        ],
    },
    {
        id: "line-acai-cremes-1500",
        anchor: "acai-cremes-1500",
        title: "Açaí e Cremes - 1,5L",
        subtitle:
            "Baldes prontos para freezer e vitrine com mix de açaí e cremes de alto giro.",
        theme: "from-purple-800 via-purple-600 to-pink-500",
        slides: [
            {
                id: "line-acai-cremes-1500-guarana",
                heading: "Açaí com guaraná",
                description: "Energia extra para copos, barcas e açaí no balde.",
                items: ["Premium", "Premium com banana", "Premium com morango"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai-cremes-1500/acai-creme-1500-com-guarana.png",
            },
            {
                id: "line-acai-cremes-1500-zero",
                heading: "Zero Açúcar",
                description: "Opções sem açúcar para clientes com restrições.",
                items: ["Zero açúcar (com guaraná)", "Zero açúcar (sem guaraná)"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai-cremes-1500/acai-creme-1500-zero-acucar.png",
            },
            {
                id: "line-acai-cremes-1500-cremes",
                heading: "Cremes",
                description: "Sabores prontos para sobremesas na colher.",
                items: ["Cupuaçu", "Iogurte grego com amarena", "Ninho trufado"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai-cremes-1500/acai-creme-1500-cremes.png",
            },
        ],
    },
    {
        id: "line-acai-cremes-250",
        anchor: "acai-cremes-250",
        title: "Açaí e Cremes - 250ml",
        subtitle:
            "Porções individuais perfeitas para degustação, combos e delivery.",
        theme: "from-purple-700 via-fuchsia-600 to-rose-500",
        slides: [
            {
                id: "line-acai-cremes-250-acai",
                heading: "Açaí 250ml",
                description:
                    "Opções com e sem guaraná para presentes e combos rápidos.",
                items: ["Premium (com guaraná)", "Premium com morango", "Puro com banana zero açúcar"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai-cremes-250/acai-cremes-250-acai.png",
            },
            {
                id: "line-acai-cremes-250-cremes",
                heading: "Cremes 250ml",
                description: "Cremes clássicos em versão prática.",
                items: ["Cupuaçu"],
                image:
                    "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/carrossel-acai-cremes-250/acai-creme-250-cremes.png",
            },
        ],
    },
];
