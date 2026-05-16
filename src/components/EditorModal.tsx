'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const RETARGET_ORANGE = '#D7632C';

export default function EditorModal() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

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
    window.location.href = '/admin/collections/pages';
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
        className={isOpen ? '' : 'pld-editor-fab'}
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
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          position: 'relative',
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
        </div>
      )}

      <style>{`
        @keyframes pld-fab-ring {
          0% {
            box-shadow:
              0 4px 12px rgba(215, 99, 44, 0.3),
              0 0 0 0 rgba(215, 99, 44, 0.45);
          }
          70% {
            box-shadow:
              0 4px 12px rgba(215, 99, 44, 0.3),
              0 0 0 14px rgba(215, 99, 44, 0);
          }
          100% {
            box-shadow:
              0 4px 12px rgba(215, 99, 44, 0.3),
              0 0 0 0 rgba(215, 99, 44, 0);
          }
        }
        .pld-editor-fab {
          animation: pld-fab-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .pld-editor-fab:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(215, 99, 44, 0.42) !important;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
