import { describe, it, expect } from 'vitest';
import { validateContact } from './validation';

describe('validateContact', () => {
  const valid = { nombre: 'Luis García', email: 'luis@retarget.cl', mensaje: 'Quiero consultar sobre estadías en Pueblo La Dehesa.' };

  it('acepta input válido', () => {
    const result = validateContact(valid);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.nombre).toBe('Luis García');
      expect(result.data.email).toBe('luis@retarget.cl');
    }
  });

  it('rechaza honeypot relleno (bot)', () => {
    const result = validateContact({ ...valid, website: 'http://spam.com' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toContain('bot');
  });

  it('rechaza nombre muy corto', () => {
    const result = validateContact({ ...valid, nombre: 'A' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toContain('nombre inválido');
  });

  it('rechaza nombre muy largo', () => {
    const result = validateContact({ ...valid, nombre: 'A'.repeat(101) });
    expect(result.ok).toBe(false);
  });

  it('rechaza email inválido', () => {
    const cases = ['noatemail', 'sin@dominio', '@sinusuario.cl'];
    for (const email of cases) {
      const result = validateContact({ ...valid, email });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.errors).toContain('email inválido');
    }
  });

  it('acepta emails válidos', () => {
    const cases = ['usuario@dominio.com', 'a@b.cl', 'test+tag@ejemplo.org'];
    for (const email of cases) {
      const result = validateContact({ ...valid, email });
      expect(result.ok).toBe(true);
    }
  });

  it('rechaza mensaje muy corto', () => {
    const result = validateContact({ ...valid, mensaje: 'Hola' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toContain('mensaje debe tener entre 10 y 2000 caracteres');
  });

  it('rechaza mensaje muy largo', () => {
    const result = validateContact({ ...valid, mensaje: 'A'.repeat(2001) });
    expect(result.ok).toBe(false);
  });

  it('trimea espacios en nombre y email', () => {
    const result = validateContact({ ...valid, nombre: '  Luis García  ', email: '  luis@retarget.cl  ' });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.nombre).toBe('Luis García');
      expect(result.data.email).toBe('luis@retarget.cl');
    }
  });

  it('retorna múltiples errores juntos', () => {
    const result = validateContact({ nombre: 'A', email: 'malo', mensaje: 'corto' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.length).toBeGreaterThan(1);
  });
});
