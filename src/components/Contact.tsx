"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Contact = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whats, setWhats] = useState("");
    const [subject, setSubject] = useState<"geral" | "revenda">("geral");
    const [negocio, setNegocio] = useState("Açaiteria");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const handleOpen = (e: Event) => {
            const detail = (e as CustomEvent<{ subject?: "geral" | "revenda" }>).detail;
            if (detail?.subject) setSubject(detail.subject);
            if (sectionRef.current) sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        window.addEventListener('open-contact-form', handleOpen as EventListener);
        return () => window.removeEventListener('open-contact-form', handleOpen as EventListener);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const phone = "5561996027864";
        const text = `Olá!%0A%0ANome: ${name}%0AWhatsApp: ${whats}%0AE-mail: ${email}%0AAssunto: ${subject}%0ANegócio: ${negocio}%0AMensagem: ${message}`;
        const url = `https://wa.me/${phone}?text=${text}`;
        window.open(url, '_blank');
    };

    return (
        <section id="contato" ref={sectionRef} className="w-full py-20 bg-brand-yellow texture-dots-light">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-brand-purple font-playfair">Fale Conosco</h2>
                    <p className="text-brand-dark mt-2">Adoraríamos ouvir você. Envie-nos uma mensagem!</p>
                </div>
                <div className="max-w-3xl mx-auto rounded-2xl border border-brand-purple/20 bg-white/90 backdrop-blur-sm shadow-xl p-6 md:p-8">
                    {/* Form */}
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Label htmlFor="name" className="text-brand-dark">Nome</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 bg-white/95 text-brand-dark placeholder:text-brand-dark/60 border-brand-purple/30 focus-visible:ring-brand-purple" required />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="text-brand-dark">E-mail</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 bg-white/95 text-brand-dark placeholder:text-brand-dark/60 border-brand-purple/30 focus-visible:ring-brand-purple" required />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="whats" className="text-brand-dark">WhatsApp</Label>
                            <Input id="whats" type="tel" value={whats} onChange={(e) => setWhats(e.target.value)} className="mt-2 bg-white/95 text-brand-dark placeholder:text-brand-dark/60 border-brand-purple/30 focus-visible:ring-brand-purple" required />
                        </div>
                        <div className="mb-4">
                            <Label className="text-brand-dark mb-2">Assunto</Label>
                            <RadioGroup value={subject} onValueChange={(v) => setSubject(v as "geral" | "revenda")} className="flex items-center space-x-6 mt-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="geral" id="ass-geral" />
                                    <Label htmlFor="ass-geral">Dúvida Geral</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="revenda" id="ass-revenda" />
                                    <Label htmlFor="ass-revenda">Quero Revender</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="negocio" className="text-brand-dark">Tipo de Negócio</Label>
                            <Select value={negocio} onValueChange={setNegocio}>
                                <SelectTrigger id="negocio" className="mt-2 w-full bg-white/95 text-brand-dark border-brand-purple/30 focus-visible:ring-brand-purple">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Açaiteria">Açaiteria</SelectItem>
                                    <SelectItem value="Sorveteria">Sorveteria</SelectItem>
                                    <SelectItem value="Lanchonete">Lanchonete</SelectItem>
                                    <SelectItem value="Restaurante">Restaurante</SelectItem>
                                    <SelectItem value="Hotelaria">Hotelaria</SelectItem>
                                    <SelectItem value="Pizzaria">Pizzaria</SelectItem>
                                    <SelectItem value="Temakeria">Temakeria</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mb-6">
                            <Label htmlFor="message" className="text-brand-dark">Mensagem</Label>
                            <Textarea id="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 bg-white/95 text-brand-dark placeholder:text-brand-dark/60 border-brand-purple/30 focus-visible:ring-brand-purple" />
                        </div>
                        <Button type="submit" className="w-full bg-brand-purple text-white hover:bg-brand-purple/90">Enviar pelo WhatsApp</Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;



