import Image from "next/image";

type Feature = {
  title: string;
  text: string;
  img: string;
};

const FEATURES_ES: Feature[] = [
  {
    title: "Inmersión en la naturaleza",
    text: "La cordillera no es un paisaje, es nuestra inspiración.",
    img: "https://puebloladehesa.cl/cdn/shop/files/inmersion.webp"
  },
  {
    title: "Ubicación",
    text: "Cerca de todo, envuelta en silencio.",
    img: "https://puebloladehesa.cl/cdn/shop/files/ubicacion.webp"
  },
  {
    title: "Seguridad y confianza",
    text: "Tu bienestar es nuestra prioridad.",
    img: "https://puebloladehesa.cl/cdn/shop/files/seguridad.webp"
  },
  {
    title: "Arriendo flexible",
    text: "Libertad para vivir a tu ritmo.",
    img: "https://puebloladehesa.cl/cdn/shop/files/flexible.webp"
  },
  {
    title: "Vida en comunidad",
    text: "Creemos en el valor de compartir.",
    img: "https://puebloladehesa.cl/cdn/shop/files/comunidad.webp"
  }
];

const FEATURES_EN: Feature[] = [
  {
    title: "Immersed in nature",
    text: "The Andes are not a view, they are our inspiration.",
    img: "https://puebloladehesa.cl/cdn/shop/files/inmersion.webp"
  },
  {
    title: "Location",
    text: "Close to everything, surrounded by silence.",
    img: "https://puebloladehesa.cl/cdn/shop/files/ubicacion.webp"
  },
  {
    title: "Safety & trust",
    text: "Your wellbeing is our priority.",
    img: "https://puebloladehesa.cl/cdn/shop/files/seguridad.webp"
  },
  {
    title: "Flexible stays",
    text: "Live at your own pace.",
    img: "https://puebloladehesa.cl/cdn/shop/files/flexible.webp"
  },
  {
    title: "Community",
    text: "We believe in sharing.",
    img: "https://puebloladehesa.cl/cdn/shop/files/comunidad.webp"
  }
];

type Props = { locale?: "es" | "en" };

export default function Features({ locale = "es" }: Props) {
  const items = locale === "en" ? FEATURES_EN : FEATURES_ES;
  return (
    <section className="w-full py-0 overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
        {items.map((f) => (
          <div key={f.title} className="flex flex-col">
            <div className="relative w-full h-[300px] overflow-hidden bg-brand-soft">
              <Image
                src={f.img}
                alt={f.title}
                fill
                sizes="(max-width:768px) 50vw, 20vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 bg-white flex flex-col flex-1">
              <h3 className="font-serif text-base uppercase tracking-wide font-light mb-2">{f.title}</h3>
              <p className="text-sm text-brand-muted leading-snug">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
