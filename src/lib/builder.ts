import { builder } from '@builder.io/react';

const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY || 'dev-key-placeholder';

// Only initialize on the client — calling builder.init() during SSR
// causes a server-side exception that crashes /admin and other dynamic routes.
if (typeof window !== 'undefined') {
  builder.init(BUILDER_API_KEY);
}

export { builder };

// El registro de componentes se mueve a un archivo client-only
// para evitar errores en server-side rendering
