export type HighlightSlide = {
    id: string;
    title: string;
    description: string;
    image: string;
};

export type LineSlide = {
    id: string;
    heading: string;
    description?: string;
    items: string[];
    image?: string;
};

export type ProductLine = {
    id: string;
    anchor: string;
    title: string;
    subtitle: string;
    theme: string;
    contentTone?: "light" | "dark";
    backgroundImage?: string;
    sharedImage?: string;
    slides: LineSlide[];
};
