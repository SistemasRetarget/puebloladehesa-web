import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "content-extracted");

export type Page = {
  url: string;
  lang: "es" | "en";
  path: string;
  meta: Record<string, string>;
  texts: { tag: string; class?: string; text: string }[];
  images_count: number;
};

export type ContentIndex = Record<string, Page>;

let cache: ContentIndex | null = null;
export function loadContent(): ContentIndex {
  if (cache) return cache;
  try {
    const raw = fs.readFileSync(path.join(ROOT, "content.json"), "utf8");
    cache = JSON.parse(raw);
    return cache!;
  } catch {
    return {};
  }
}

export function getPage(lang: "es" | "en", slug: string): Page | null {
  const idx = loadContent();
  const prefix = lang === "en" ? "/en" : "";
  const wanted = `${prefix}${slug === "home" ? (lang === "en" ? "/en" : "/") : slug}`;
  for (const p of Object.values(idx)) if (p.path === wanted && p.lang === lang) return p;
  return null;
}

export function listHouses(lang: "es" | "en"): Page[] {
  const idx = loadContent();
  return Object.values(idx).filter(
    (p) => p.lang === lang && p.path.includes("/products/casa")
  );
}

export type ImageEntry = { url: string; file: string; alt: string; pages: string[]; size: number };
let imgCache: ImageEntry[] | null = null;
export function loadImages(): ImageEntry[] {
  if (imgCache) return imgCache;
  try {
    imgCache = JSON.parse(fs.readFileSync(path.join(ROOT, "images.json"), "utf8"));
    return imgCache!;
  } catch {
    return [];
  }
}

export function pageKey(lang: "es" | "en", pagePath: string): string {
  // images.json uses: "es_", "es_products_casa-x", "en_en", "en_en_products_casa-x"
  const trimmed = pagePath.replace(/^\/+/, "").replace(/\/+/g, "_");
  return `${lang}_${trimmed}`;
}

export function imageForPage(keyOrLangPath: string, fallback?: string): string {
  const imgs = loadImages();
  // Acepta claves con doble "__" legadas: normaliza
  const candidates = new Set<string>([
    keyOrLangPath,
    keyOrLangPath.replace(/__+/g, "_"),
    keyOrLangPath.replace(/_home$/, "").replace(/_+$/, "_")
  ]);
  const isContent = (f: string) => /\.(jpg|jpeg|png|webp)$/i.test(f) && !/logo|icon|sprite/i.test(f);
  for (const key of candidates) {
    const hit = imgs.find((i) => i.pages.includes(key) && isContent(i.file));
    if (hit) return `/media/${hit.file}`;
  }
  // Último recurso: primera imagen que contenga el slug
  const slug = keyOrLangPath.split("_").filter(Boolean).pop();
  if (slug) {
    const hit = imgs.find((i) => isContent(i.file) && i.file.toLowerCase().includes(slug.toLowerCase()));
    if (hit) return `/media/${hit.file}`;
  }
  return fallback || "/media/placeholder.svg";
}

export function extractHeadings(page: Page, max = 3): string[] {
  const headings = page.texts
    .filter((t) => /^h[1-3]$/.test(t.tag))
    .map((t) => t.text.trim())
    .filter((t) => t.length > 2 && t.length < 120);
  return Array.from(new Set(headings)).slice(0, max);
}

export function extractParagraphs(page: Page, max = 5): string[] {
  const paras = page.texts
    .filter((t) => t.tag === "p" || t.tag === "div" || t.tag === "span")
    .map((t) => t.text.trim())
    .filter((t) => t.length > 40 && t.length < 500);
  return Array.from(new Set(paras)).slice(0, max);
}
