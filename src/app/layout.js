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

const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('theme') || 'system';
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    } catch (e) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.add(systemTheme);
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
