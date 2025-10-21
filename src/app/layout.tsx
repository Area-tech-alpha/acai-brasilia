import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const playfair = Fraunces({
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '700']
});
const lato = Manrope({
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
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${playfair.variable} ${lato.variable} font-lato bg-brand-light text-brand-dark`}>
        {children}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
