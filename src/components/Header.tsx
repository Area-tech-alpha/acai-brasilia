"use client";
import Image from "next/image";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Header = () => {
    const logoSrc =
        "https://nfwfolrcpaxqwgkzzfok.supabase.co/storage/v1/object/public/acai-brasilia%20(temporariamente%20aqui)/logo-amarela.png";

    const navLinks = [
        { label: "Açaí", type: "product", id: "acai" },
        { label: "Polpas", type: "product", id: "polpas" },
        { label: "Picolés", type: "product", id: "picoles" },
        { label: "Cremes", type: "product", id: "cremes" },
        { label: "Contato", type: "contact" },
    ] as const;

    const onNavClick = (item: typeof navLinks[number]) => {
        if (item.type === 'product' && item.id) {
            const event = new CustomEvent('scroll-to-product-line', { detail: { productId: item.id } });
            window.dispatchEvent(event);
        } else if (item.type === 'contact') {
            const event = new CustomEvent('open-contact-form', { detail: { subject: 'geral' } });
            window.dispatchEvent(event);
        }
    };

    return (
        <header className="w-full shadow-md sticky top-0 z-50 bg-brand-purple">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Image
                        src={logoSrc}
                        alt="Amazzon Easy"
                        width={250}
                        height={125}
                        priority
                        className="h-12 md:h-14 lg:h-16 w-auto object-contain"
                    />
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navLinks.map(link => (
                                <NavigationMenuItem key={link.label}>
                                    <NavigationMenuLink asChild>
                                        <button onClick={() => onNavClick(link)} className="px-2 py-1 text-brand-light/90 hover:text-brand-yellow transition-colors">
                                            {link.label}
                                        </button>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <Button onClick={() => window.dispatchEvent(new CustomEvent('open-contact-form', { detail: { subject: 'revenda' } }))} className="bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90 font-bold">
                        Seja um Revendedor
                    </Button>
                </div>
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="text-brand-light hover:text-brand-yellow p-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-brand-purple texture-dots-dark text-brand-light">
                            <SheetHeader>
                                <SheetTitle className="font-playfair text-brand-light">Menu</SheetTitle>
                            </SheetHeader>
                            <div className="mt-6 flex flex-col space-y-3">
                                {navLinks.map(link => (
                                    <SheetClose asChild key={link.label}>
                                        <Button variant="ghost" className="justify-start text-brand-light hover:text-brand-yellow" onClick={() => onNavClick(link)}>
                                            {link.label}
                                        </Button>
                                    </SheetClose>
                                ))}
                                <SheetClose asChild>
                                    <Button className="bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90 mx-3" onClick={() => window.dispatchEvent(new CustomEvent('open-contact-form', { detail: { subject: 'revenda' } }))}>
                                        Seja um Revendedor
                                    </Button>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;
