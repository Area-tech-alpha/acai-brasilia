const Footer = () => {
    return (
        <footer className="bg-brand-purple text-brand-light w-full pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Coluna 1: Navegação */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 font-playfair">Navegação</h3>
                        <ul className="space-y-2">
                            <li><a href="#produtos" className="hover:text-brand-yellow">Produtos</a></li>
                            <li><a href="#contato" className="hover:text-brand-yellow">Contato</a></li>
                            <li><a href="#revendedor" className="hover:text-brand-yellow">Seja um Revendedor</a></li>
                        </ul>
                    </div>

                    {/* Coluna 2: Contato */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 font-playfair">Contato</h3>
                        <p>SIA Trecho 10, Conjunto 03</p>
                        <p>Brasília - DF</p>
                        <p>WhatsApp: (61) 99602-7864</p>
                        <p>comercial@amazzoneasy.com.br</p>
                    </div>

                    {/* Coluna 3: Redes Sociais */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 font-playfair">Conecte-se</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="https://www.instagram.com/amazzoneasy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Amazzon Easy" className="hover:text-brand-yellow">
                                {/* Ícone do Instagram */}
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.316 1.363.364 2.427.048 1.067.06 1.407.06 3.808s-.012 2.74-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.316-2.427.364-1.067.048-1.407.06-3.808.06s-2.74-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.316-1.363-.364-2.427C2.013 14.74 2 14.4 2 12s.012-2.74.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.48 3.68c.636-.247 1.363-.316 2.427-.364C8.937 2.013 9.277 2 12 2h.315zM12 6.848c-2.837 0-5.152 2.315-5.152 5.152s2.315 5.152 5.152 5.152 5.152-2.315 5.152-5.152S14.837 6.848 12 6.848zM12 15.354c-1.848 0-3.354-1.506-3.354-3.354s1.506-3.354 3.354-3.354 3.354 1.506 3.354 3.354-1.506 3.354-3.354 3.354zM16.949 8.194a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" /></svg>
                            </a>
                            {/* Ícone do Facebook */}
                            <a href="#" className="hover:text-brand-yellow">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Amazzon Easy. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
