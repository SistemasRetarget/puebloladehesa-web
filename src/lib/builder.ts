import { builder } from '@builder.io/react';

const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY || 'dev-key-placeholder';

builder.init(BUILDER_API_KEY);

export { builder };

// El registro de componentes se mueve a un archivo client-only
// para evitar errores en server-side rendering
