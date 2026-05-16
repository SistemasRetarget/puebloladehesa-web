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
    idle: 'Purgar caché del sitio',
    loading: 'Purgando…',
    ok: 'Caché limpiada',
    error: 'Error al purgar',
  }[status];

  const bg = {
    idle: '#D7632C',
    loading: '#b85424',
    ok: '#16a34a',
    error: '#dc2626',
  }[status];

  const shadow = {
    idle: '0 2px 6px rgba(215,99,44,0.22), 0 1px 2px rgba(215,99,44,0.1)',
    loading: '0 1px 3px rgba(184,84,36,0.18)',
    ok: '0 2px 6px rgba(22,163,74,0.22)',
    error: '0 2px 6px rgba(220,38,38,0.22)',
  }[status];

  return (
    <button
      onClick={purge}
      disabled={status === 'loading'}
      style={{
        background: bg,
        color: '#ffffff',
        border: 'none',
        borderRadius: 10,
        padding: '0.7rem 1.4rem',
        fontSize: '0.875rem',
        fontWeight: 600,
        letterSpacing: '0.005em',
        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
        boxShadow: shadow,
        opacity: status === 'loading' ? 0.85 : 1,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
        lineHeight: 1.3,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
      onMouseEnter={(e) => {
        if (status !== 'loading') {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 6px 18px rgba(215,99,44,0.32), 0 2px 4px rgba(215,99,44,0.1)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = shadow;
      }}
    >
      <span aria-hidden="true" style={{ fontSize: '0.95rem', lineHeight: 1 }}>
        {status === 'idle' && '↻'}
        {status === 'loading' && '⏳'}
        {status === 'ok' && '✓'}
        {status === 'error' && '✕'}
      </span>
      <span>{label}</span>
    </button>
  );
}
