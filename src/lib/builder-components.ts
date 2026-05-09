'use client';

import { Builder } from '@builder.io/react';

// Solo ejecutar en el cliente para evitar errores SSR
if (typeof window !== 'undefined') {
  Builder.registerComponent(
    async () => (await import('@/components/sections/Hero')).default,
    {
      name: 'Hero',
      inputs: [
        { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], helperText: 'Imagen de fondo' },
        { name: 'imageAlt', type: 'string', defaultValue: 'Pueblo La Dehesa' },
        { name: 'title', type: 'string', defaultValue: 'Tu refugio en la ciudad' },
        { name: 'subtitle', type: 'string', defaultValue: 'Arriendo de casas amobladas inmersas en la naturaleza con vistas a la cordillera y al valle de la Dehesa.' },
      ],
    }
  );

  Builder.registerComponent(
    async () => (await import('@/components/sections/Narrativa')).default,
    {
      name: 'Narrativa',
      inputs: [
        { name: 'title', type: 'string', defaultValue: 'Pueblo nace de la idea de volver a lo esencial.' },
        {
          name: 'paragraphs',
          type: 'list',
          subFields: [{ name: 'text', type: 'longText' }],
          defaultValue: [{ text: 'Un lugar donde la naturaleza, el diseño y la calma se cruzan para crear un nuevo sentido de habitar la ciudad.' }],
        },
      ],
    }
  );

  Builder.registerComponent(
    async () => (await import('@/components/sections/ImageWithText')).default,
    {
      name: 'ImageWithText',
      inputs: [
        { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
        { name: 'imageAlt', type: 'string', defaultValue: 'Pueblo La Dehesa' },
        { name: 'title', type: 'string', defaultValue: 'Un lugar para quedarte el tiempo que necesites' },
        {
          name: 'paragraphs',
          type: 'list',
          subFields: [{ name: 'text', type: 'longText' }],
          defaultValue: [{ text: 'Arriendo de casas amobladas integradas al paisaje.' }],
        },
        { name: 'reverse', type: 'boolean', defaultValue: false },
      ],
    }
  );

  Builder.registerComponent(
    async () => (await import('@/components/sections/CTABlock')).default,
    {
      name: 'CTABlock',
      inputs: [
        { name: 'title', type: 'string', defaultValue: 'Estadías flexibles' },
        { name: 'description', type: 'string', defaultValue: 'Reserva para nuestras estadías de corto, mediano y largo plazo.' },
        { name: 'bookingLabel', type: 'string', defaultValue: 'Reservar' },
        { name: 'contactLabel', type: 'string', defaultValue: 'Contáctanos' },
        { name: 'locale', type: 'string', enum: ['es', 'en'], defaultValue: 'es' },
      ],
    }
  );
}
