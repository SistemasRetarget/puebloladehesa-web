#!/usr/bin/env node
/**
 * Smoke tests para Pueblo La Dehesa — CMS + Builder.io
 * Valida que las rutas críticas respondan correctamente en producción.
 *
 * Usage: node scripts/smoke_test.mjs [BASE_URL]
 */

const BASE = process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const BUILDER_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY || '20aec2e2db69478da3bc634785cb696c';

let passed = 0;
let failed = 0;

async function check(label, fn) {
  try {
    await fn();
    console.log(`  ✅ ${label}`);
    passed++;
  } catch (e) {
    console.log(`  ❌ ${label}: ${e.message}`);
    failed++;
  }
}

async function get(url, expectedStatus = 200) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (res.status !== expectedStatus) {
    throw new Error(`HTTP ${res.status} (esperado ${expectedStatus})`);
  }
  return res;
}

console.log(`\n🔍 Smoke tests — ${BASE}\n`);

// ─── Frontend: rutas ES ────────────────────────────────────────────────────
console.log('📄 Páginas frontend (ES):');
const esRoutes = [
  ['Home ES', '/'],
  ['Casas', '/casas'],
  ['Experiencias', '/experiencias'],
  ['Estadías', '/estadias'],
  ['Nosotros', '/nosotros'],
  ['Contacto', '/contacto'],
  ['Ubicación', '/ubicacion'],
  ['Temporada', '/temporada'],
  ['Mensual', '/mensual'],
  ['Departamento amoblado', '/departamento-amoblado'],
  ['La Casita', '/la-casita'],
  ['Pueblito', '/pueblito'],
  ['Privacidad', '/legal/politicas-de-privacidad'],
  ['Términos', '/legal/terminos-y-condiciones'],
];
for (const [label, path] of esRoutes) {
  await check(label, () => get(`${BASE}${path}`));
}

// ─── Frontend: rutas EN ────────────────────────────────────────────────────
console.log('\n📄 Páginas frontend (EN):');
const enRoutes = [
  ['Home EN', '/en'],
  ['Houses EN', '/en/houses'],
  ['Experiences EN', '/en/experiences'],
  ['About EN', '/en/about'],
  ['Contact EN', '/en/contact'],
  ['Location EN', '/en/location'],
];
for (const [label, path] of enRoutes) {
  await check(label, () => get(`${BASE}${path}`));
}

// ─── CMS Admin ────────────────────────────────────────────────────────────
console.log('\n🔐 CMS Admin (Payload):');
await check('Admin login page', () => get(`${BASE}/admin/login`));
await check('Admin root redirect', async () => {
  const res = await fetch(`${BASE}/admin`, { redirect: 'manual', signal: AbortSignal.timeout(10000) });
  if (res.status !== 200 && res.status !== 302 && res.status !== 307) {
    throw new Error(`HTTP ${res.status}`);
  }
});
await check('API collections/users protegida', async () => {
  const res = await fetch(`${BASE}/api/users`, { signal: AbortSignal.timeout(10000) });
  if (res.status !== 401 && res.status !== 403) throw new Error(`HTTP ${res.status} — debería ser 401/403`);
});
await check('API collections/houses pública (read: true)', () => get(`${BASE}/api/houses`, 200));

// ─── Builder.io API ───────────────────────────────────────────────────────
console.log('\n🏗️  Builder.io:');
await check('API key válida (content API responde)', async () => {
  const url = `https://cdn.builder.io/api/v3/content/page?apiKey=${BUILDER_KEY}&limit=1`;
  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!('results' in data)) throw new Error('Respuesta inesperada de Builder.io');
});
const BUILDER_MODELS = [
  'pueblo-hero', 'pueblo-narrativa', 'pueblo-imagen-texto', 'pueblo-cta',
  'pueblo-casas', 'pueblo-nosotros', 'pueblo-experiencias', 'pueblo-estadias',
  'pueblo-contacto', 'pueblo-temporada', 'pueblo-mensual', 'pueblo-ubicacion',
  'pueblo-pueblito', 'pueblo-la-casita', 'pueblo-departamento-amoblado',
];
let builderWarnings = 0;
for (const model of BUILDER_MODELS) {
  const url = `https://cdn.builder.io/api/v3/content/${model}?apiKey=${BUILDER_KEY}&limit=1`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!('results' in data)) throw new Error('Respuesta inesperada');
    if (data.results.length === 0) {
      // Modelo existe en Builder.io pero sin contenido todavía — warning, no falla
      console.log(`  ⚠️  Builder.io "${model}": modelo OK, sin contenido aún (páginas usan fallback)`);
      builderWarnings++;
    } else {
      console.log(`  ✅ Builder.io "${model}": ${data.results.length} entradas`);
      passed++;
    }
  } catch (e) {
    console.log(`  ❌ Builder.io "${model}": ${e.message}`);
    failed++;
  }
}

// ─── SEO crítico ──────────────────────────────────────────────────────────
console.log('\n🔍 SEO:');
await check('sitemap.xml existe', () => get(`${BASE}/sitemap.xml`));
await check('robots.txt existe', () => get(`${BASE}/robots.txt`));

// ─── Resumen ──────────────────────────────────────────────────────────────
const total = passed + failed;
console.log(`\n${'─'.repeat(45)}`);
console.log(`Resultado: ${passed}/${total} passed ${failed > 0 ? `— ${failed} FAILED` : '✅'}`);
console.log(`URL: ${BASE}\n`);

if (failed > 0) process.exit(1);
