'use client';

import { useState } from 'react';

export default function CacheButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function purge() {
    setStatus('loading');
    try {
      const res = await fetch('/api/revalidate-cache', { method: 'POST' });
      const data = await res.json();
      setStatus(data.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 4000);
  }

  const label = {
    idle: '🔄 Purgar cache del sitio',
    loading: '⏳ Purgando...',
    ok: '✅ Cache limpiado',
    error: '❌ Error al purgar',
  }[status];

  const bg = {
    idle: '#D7632C',
    loading: '#b8501f',
    ok: '#4a7c3a',
    error: '#c0392b',
  }[status];

  return (
    <button
      onClick={purge}
      disabled={status === 'loading'}
      style={{
        background: bg,
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '0.75rem 1.5rem',
        fontSize: '0.95rem',
        fontWeight: 600,
        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      {label}
    </button>
  );
}
