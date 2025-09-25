import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '700']
});
const lato = Lato({
  subsets: ["latin"],
  variable: '--font-lato',
  weight: ['400', '700']
});

export const metadata: Metadata = {
  title: "Amazzon Easy Açaí",
  description: "O autêntico sabor natural do Pará em Brasília",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${lato.variable} font-lato bg-brand-light text-brand-dark`}>
        {children}
      </body>
    </html>
  );
}
