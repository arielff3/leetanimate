import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Algoritmos LeetCode Animados",
  description: "Visualize e aprenda algoritmos do LeetCode através de animações interativas educativas. Open source.",
  keywords: "algoritmos, leetcode, animações, programação, estruturas de dados, visualização",
  authors: [{ name: "Algoritmos Animados Team" }],
  openGraph: {
    title: "Algoritmos LeetCode Animados",
    description: "Visualize e aprenda algoritmos do LeetCode através de animações interativas educativas",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
