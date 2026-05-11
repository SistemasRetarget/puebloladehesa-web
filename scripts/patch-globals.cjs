// Patch: undici intenta `new CacheStorage()` al cargarse, pero en Node 20.18
// el constructor global falla con "Illegal constructor". Este patch lo reemplaza
// con una implementación mínima válida antes de que undici lo use.
if (typeof globalThis.CacheStorage !== 'undefined') {
  try {
    globalThis.CacheStorage = class CacheStorage {};
    globalThis.caches = new globalThis.CacheStorage();
  } catch (_) {}
}
