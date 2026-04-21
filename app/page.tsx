import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pueblo La Dehesa | Tu refugio en la ciudad',
  description: 'Casas amobladas para estadías flexibles en La Dehesa, rodeadas de naturaleza, diseño y calma.',
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Pueblo La Dehesa</h1>
          <p className="text-xl text-slate-300 mb-8">Tu refugio en la ciudad</p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Casas amobladas para estadías flexibles, rodeadas de naturaleza, diseño y calma.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Próximamente</h2>
        <p className="text-center text-slate-600 text-lg">
          Estamos rediseñando el sitio con tecnología moderna para ofrecerte una mejor experiencia.
        </p>
      </section>
    </main>
  );
}
