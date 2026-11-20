import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ar-Rahmah Care — Amanah, Transparan, Berkelanjutan",
    template: "%s | Ar-Rahmah Care",
  },
  description:
    "Platform donasi dan kepedulian sosial di bawah naungan Yayasan Ar-Rahmah Sulawesi (Makassar). Menyalurkan beasiswa santri yatim, pangan, sarana ibadah, dan tanggap bencana.",
  icons: {
    icon: "/brand/ar-rahmah-care.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white text-text-primary antialiased selection:bg-brand-sky-soft selection:text-brand-sky-deep">
        {children}
      </body>
    </html>
  );
}
