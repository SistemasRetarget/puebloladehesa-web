import type { Metadata } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Pueblo La Dehesa | Tu refugio en la ciudad',
  description: 'Casas amobladas para estadías flexibles en La Dehesa, rodeadas de naturaleza, diseño y calma.',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://puebloladehesa.cl',
    siteName: 'Pueblo La Dehesa',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
