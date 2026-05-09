'use client';

import { useEffect, useState } from 'react';
import { BuilderComponent, useIsPreviewing } from '@builder.io/react';
import { builder } from '@/lib/builder';
import '@/lib/builder-components'; // Importar registro de componentes client-only

interface BuilderPageProps {
  modelName: string;
  slug?: string;
  fallback?: React.ReactNode;
}

export default function BuilderPage({ modelName, slug = '', fallback }: BuilderPageProps) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isPreviewing = useIsPreviewing();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_BUILDER_API_KEY || process.env.NEXT_PUBLIC_BUILDER_API_KEY === 'dev-key-placeholder') {
      setLoading(false);
      return;
    }

    builder
      .get(modelName, {
        userAttributes: { urlPath: slug || '/' },
        ...(slug ? { query: { 'data.slug': slug } } : {}),
      })
      .promise()
      .then(setContent)
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, [modelName, slug]);

  if (loading) return null;

  if (content || isPreviewing) {
    return <BuilderComponent model={modelName} content={content} />;
  }

  return <>{fallback}</> || null;
}
