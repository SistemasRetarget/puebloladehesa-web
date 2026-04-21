import path from 'path';
import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import { fileURLToPath } from 'url';

// Collections
import { Casa } from './payload/collections/Casa';
import { Experiencia } from './payload/collections/Experiencia';
import { Pagina } from './payload/collections/Pagina';
import { Blog } from './payload/collections/Blog';
import { Configuracion } from './payload/collections/Configuracion';
import { Users } from './payload/collections/Users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Casa, Experiencia, Pagina, Blog, Configuracion],
  editor: slateEditor({}),
  db: postgresAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  secret: process.env.PAYLOAD_SECRET || 'secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
});
