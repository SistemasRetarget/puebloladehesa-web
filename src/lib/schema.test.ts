import { describe, it, expect } from 'vitest';
import { organizationSchema, localBusinessSchema, accommodationSchema, breadcrumbSchema } from './schema';

describe('organizationSchema', () => {
  it('tiene @type Organization', () => {
    const s = organizationSchema();
    expect(s['@type']).toBe('Organization');
    expect(s['@context']).toBe('https://schema.org');
  });

  it('nombre es Pueblo La Dehesa', () => {
    expect(organizationSchema().name).toBe('Pueblo La Dehesa');
  });

  it('soporta ES y EN', () => {
    const langs = organizationSchema().contactPoint.availableLanguage;
    expect(langs).toContain('es');
    expect(langs).toContain('en');
  });
});

describe('localBusinessSchema', () => {
  it('tiene @type LocalBusiness', () => {
    expect(localBusinessSchema()['@type']).toBe('LocalBusiness');
  });

  it('coordenadas de La Dehesa correctas', () => {
    const { geo } = localBusinessSchema();
    expect(geo.latitude).toBeCloseTo(-33.3573, 3);
    expect(geo.longitude).toBeCloseTo(-70.5306, 3);
  });

  it('país es CL', () => {
    expect(localBusinessSchema().address.addressCountry).toBe('CL');
  });

  it('tiene horarios 7 días', () => {
    const hours = localBusinessSchema().openingHoursSpecification[0];
    expect(hours.dayOfWeek).toHaveLength(7);
    expect(hours.opens).toBe('09:00');
    expect(hours.closes).toBe('22:00');
  });
});

describe('accommodationSchema', () => {
  const opts = { name: 'Casa Almendro', description: 'Casa con jardín', slug: 'almendro', image: '/media/almendro.jpg' };

  it('tiene @type Accommodation', () => {
    expect(accommodationSchema(opts)['@type']).toBe('Accommodation');
  });

  it('URL en español usa /casas/', () => {
    const s = accommodationSchema({ ...opts, lang: 'es' });
    expect(s.url).toContain('/casas/almendro');
  });

  it('URL en inglés usa /en/houses/', () => {
    const s = accommodationSchema({ ...opts, lang: 'en' });
    expect(s.url).toContain('/en/houses/almendro');
  });

  it('acepta mascotas', () => {
    expect(accommodationSchema(opts).petsAllowed).toBe(true);
  });

  it('check-in 15:00, check-out 11:00', () => {
    const s = accommodationSchema(opts);
    expect(s.checkInTime).toBe('15:00');
    expect(s.checkOutTime).toBe('11:00');
  });
});

describe('breadcrumbSchema', () => {
  it('genera items en orden', () => {
    const s = breadcrumbSchema([
      { name: 'Inicio', url: '/' },
      { name: 'Casas', url: '/casas' },
      { name: 'Almendro', url: '/casas/almendro' },
    ]);
    expect(s['@type']).toBe('BreadcrumbList');
    expect(s.itemListElement).toHaveLength(3);
    expect(s.itemListElement[0].position).toBe(1);
    expect(s.itemListElement[2].position).toBe(3);
    expect(s.itemListElement[2].name).toBe('Almendro');
  });

  it('lista vacía genera array vacío', () => {
    expect(breadcrumbSchema([]).itemListElement).toHaveLength(0);
  });
});
