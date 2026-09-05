import './globals.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gülbanu ve Furkan Düğün Davetiyesi",
  description: "Varlığınızla günümüzü güzelleştirmeniz, mutluluğumuza ortak olmanız dileğiyle.",
  openGraph: {
    title: "Gülbanu ve Furkan Düğün Davetiyesi",
    description: "Varlığınızla günümüzü güzelleştirmeniz, mutluluğumuza ortak olmanız dileğiyle.",
    url: 'https://gulbanu-furkan.vercel.app/',
    siteName: 'G&F Düğün Davetiyesi',
    images: [{
      url: 'https://gulbanu-furkan.vercel.app/davetiye-arkaplan.png',
      width: 1200,
      height: 630,
      alt: 'G&F Düğün Davetiyesi',
    }],
    locale: 'tr_TR',
    type: 'website',
  },  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
