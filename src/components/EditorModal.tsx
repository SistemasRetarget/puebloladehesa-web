'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const RETARGET_ORANGE = '#D7632C';

export default function EditorModal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isEditor, setIsEditor] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Detectar tema actual
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);

    // Override via query param o localStorage
    if (searchParams?.get('edit') === '1' || localStorage.getItem('editor-mode') === 'true') {
      setIsEditor(true);
      return;
    }

    // Detectar sesión activa de Payload — si está logueado, mostrar el modal
    fetch('/api/users/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setIsEditor(true);
      })
      .catch(() => {
        // No logueado o error — no mostrar
      });
  }, [searchParams]);

  if (!isMounted) return null;

  if (!isEditor) return null;

  const handleBackToAdmin = () => {
    window.location.href = '/admin';
  };

  const handleEditPage = () => {
    // TODO: Detectar el ID de la página actual y redirigir al editor
    window.location.href = '/admin/collections/pages';
  };

  const toggleTheme = (theme: 'dark' | 'light') => {
    setIsDark(theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <div
      className="editor-modal-container"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Icono flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: RETARGET_ORANGE,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 24,
          boxShadow: '0 4px 12px rgba(215, 99, 44, 0.3)',
          animation: isOpen ? 'none' : 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          transition: 'all 0.3s ease',
        }}
        title="Editor"
      >
        ✏️
      </button>

      {/* Panel expandido */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: 72,
            right: 0,
            background: RETARGET_ORANGE,
            borderRadius: 12,
            padding: 16,
            minWidth: 220,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            animation: 'slideUp 0.2s ease',
          }}
        >
          {/* Botones de acción */}
          <button
            onClick={handleBackToAdmin}
            style={{
              width: '100%',
              padding: '10px 12px',
              marginBottom: 8,
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            ← Volver al admin
          </button>

          <button
            onClick={handleEditPage}
            style={{
              width: '100%',
              padding: '10px 12px',
              marginBottom: 12,
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            ✏️ Editar página
          </button>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255, 255, 255, 0.2)', margin: '12px 0' }} />

          {/* Toggles tema */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => toggleTheme('light')}
              style={{
                flex: 1,
                padding: '8px',
                background: !isDark ? '#fff' : 'rgba(255, 255, 255, 0.1)',
                color: !isDark ? RETARGET_ORANGE : '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              ☀️ Día
            </button>
            <button
              onClick={() => toggleTheme('dark')}
              style={{
                flex: 1,
                padding: '8px',
                background: isDark ? '#fff' : 'rgba(255, 255, 255, 0.1)',
                color: isDark ? RETARGET_ORANGE : '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              🌙 Noche
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
