import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600"]
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
  weight: ["400", "500"]
});

export const viewport: Viewport = {
  themeColor: "#faf8f5",
  width: "device-width",
  initialScale: 1
};

// Resolver dominio canónico:
// 1) NEXT_PUBLIC_SITE_URL (preferido)
// 2) Si estamos en producción y la env no está, usar el dominio público (NUNCA localhost en build de prod)
// 3) Solo localhost en dev local
const SITE_URL = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NODE_ENV === "production") return "https://puebloladehesa.cl";
  return "http://localhost:3000";
})();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
