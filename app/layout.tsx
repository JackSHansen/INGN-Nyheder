import type { Metadata } from "next";
import { Righteous, Roboto_Flex } from "next/font/google";
import "./globals.scss";

// Registrerer hovedskrifttypen til brødtekst via CSS-variabel.
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});

// Registrerer display-skrifttypen til overskrifter via CSS-variabel.
const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
});

export const metadata: Metadata = {
  title: "INGN Nyheder",
  description: "Din kilde til de seneste nyheder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lægger font-variabler på html, så de kan bruges globalt i SCSS.
  return (
    <html lang="da" className={`${robotoFlex.variable} ${righteous.variable}`}>
      <body>{children}</body>
    </html>
  );
}
