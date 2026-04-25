import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { listHouses, imageForPage, extractParagraphs, loadImages, pageKey } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import { accommodationSchema, breadcrumbSchema } from "@/lib/schema";
import { t } from "@/lib/i18n";

export const revalidate = 3600;

export async function generateStaticParams() {
  return listHouses("en").map((h) => ({ slug: h.path.split("/").pop()! }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = listHouses("en").find((x) => x.path.endsWith(slug));
  const title = h?.meta.title?.split("|")[0].trim() || "House";
  const description = h?.meta.description || "Furnished home in La Dehesa";
  const image = imageForPage(`en_${h?.path.replace(/\//g, "_")}`);

  return {
    title: `${title} | Pueblo La Dehesa`,
    description,
    keywords: `${title}, furnished house La Dehesa, rental`,
    openGraph: {
      title: `${title} | Pueblo La Dehesa`,
      description,
      type: "website",
      locale: "en_US",
      url: `https://puebloladehesa.cl/en/houses/${slug}`,
      images: [{ url: image, alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Pueblo La Dehesa`,
      description,
      images: [image]
    }
  } as Metadata;
}

export default async function HouseEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const house = listHouses("en").find((h) => h.path.endsWith(slug));
  if (!house) notFound();
  const key = pageKey(house.lang, house.path);
  const hero = imageForPage(key);
  const paragraphs = extractParagraphs(house, 4);
  const gallery = loadImages().filter((i) => i.pages.includes(key) && /\.(jpg|jpeg|webp)$/i.test(i.file) && !/logo|icon|sprite/i.test(i.file)).slice(0, 6);
  const title = house.meta.title?.split("|")[0].trim() || "House";
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const L = t.en;

  return (
    <article>
      <JsonLd data={accommodationSchema({ name: title, description: house.meta.description || "", slug: slug, image: hero, lang: "en" })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/en" }, { name: "Houses", url: "/en/houses" }, { name: title, url: `/en/houses/${slug}` }])} />
      <section className="relative aspect-[16/9] max-h-[70vh]">
        <Image src={hero} alt={title} fill priority sizes="100vw" className="object-cover" />
      </section>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-5xl mb-6">{title}</h1>
        <div className="prose prose-lg max-w-none space-y-5 text-brand-muted leading-relaxed">
          {paragraphs.length > 0 ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p>{house.meta.description}</p>}
        </div>
        {wa && <a href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hello, I am interested in ${title}`)}`} target="_blank" rel="noopener" className="mt-10 inline-block px-8 py-3 bg-brand-ink text-white hover:bg-brand-accent transition">{L.consult}</a>}
      </div>
      {gallery.length > 1 && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="font-serif text-3xl mb-8">{L.gallery}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((g) => (
              <div key={g.file} className="relative aspect-square overflow-hidden bg-brand-soft">
                <Image src={`/media/${g.file}`} alt={g.alt || title} fill sizes="(max-width:768px)50vw,33vw" className="object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
