'use client';

import { useEffect, useState } from 'react';
import { BuilderComponent, useIsPreviewing } from '@builder.io/react';
import { builder } from '@/lib/builder';

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
    const fetchContent = async () => {
      if (!process.env.NEXT_PUBLIC_BUILDER_API_KEY || process.env.NEXT_PUBLIC_BUILDER_API_KEY === 'dev-key-placeholder') {
        setContent(null);
        setLoading(false);
        return;
      }

      try {
        const content = await builder.get(modelName, { query: { 'data.slug': slug } }).promise();
        setContent(content);
      } catch (error) {
        console.warn(`Builder.io ${modelName} not found for slug: ${slug}`, error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [modelName, slug]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando contenido...</div>;
  }

  if (content) {
    return <BuilderComponent model={modelName} content={content} />;
  }

  return fallback || null;
}
