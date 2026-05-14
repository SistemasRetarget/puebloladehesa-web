import { describe, it, expect, beforeEach } from 'vitest';
import { rateLimit } from './rateLimit';

// Cada test usa una key única para evitar colisiones entre tests
const key = (suffix: string) => `test:ratelimit:${Date.now()}:${suffix}`;

describe('rateLimit', () => {
  it('permite la primera solicitud', () => {
    const r = rateLimit(key('a'), 3, 60_000);
    expect(r.ok).toBe(true);
    expect(r.remaining).toBe(2);
  });

  it('cuenta solicitudes correctamente', () => {
    const k = key('b');
    rateLimit(k, 3, 60_000);
    const r2 = rateLimit(k, 3, 60_000);
    expect(r2.ok).toBe(true);
    expect(r2.remaining).toBe(1);
  });

  it('bloquea al superar el máximo', () => {
    const k = key('c');
    rateLimit(k, 2, 60_000);
    rateLimit(k, 2, 60_000);
    const r = rateLimit(k, 2, 60_000);
    expect(r.ok).toBe(false);
    expect(r.remaining).toBe(0);
  });

  it('reset después de la ventana de tiempo', async () => {
    const k = key('d');
    rateLimit(k, 1, 50);  // ventana de 50ms
    rateLimit(k, 1, 50);  // bloquea
    await new Promise(r => setTimeout(r, 60));  // esperar reset
    const r = rateLimit(k, 1, 50);
    expect(r.ok).toBe(true);
  });

  it('keys distintas son independientes', () => {
    const k1 = key('e1');
    const k2 = key('e2');
    rateLimit(k1, 1, 60_000);
    rateLimit(k1, 1, 60_000); // bloquea k1
    const r = rateLimit(k2, 1, 60_000);
    expect(r.ok).toBe(true); // k2 no afectada
  });

  it('max configurable por llamada', () => {
    const k = key('f');
    for (let i = 0; i < 10; i++) rateLimit(k, 10, 60_000);
    const r = rateLimit(k, 10, 60_000);
    expect(r.ok).toBe(false);
  });
});
