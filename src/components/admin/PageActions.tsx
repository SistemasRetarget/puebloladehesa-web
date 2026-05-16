'use client'

import { useFormFields } from '@payloadcms/ui'

/**
 * UI field para la collection `Pages`.
 * Muestra dos botones de acción:
 *   1. Ver landing — abre la URL en el sitio
 *   2. Editar landing visualmente — abre el editor de Builder.io
 *
 * Lee los campos `route` y `builderContentId` del formulario actual.
 */
export default function PageActions() {
  // useFormFields permite reaccionar a cambios de campos vecinos
  const route = useFormFields(([fields]) => fields?.route?.value as string | undefined)
  const contentId = useFormFields(([fields]) => fields?.builderContentId?.value as string | undefined)
  const modelName = useFormFields(([fields]) => (fields?.builderModelName?.value as string) || 'pueblo-home')

  // URL del QA (en prod: leer de env)
  const siteBase = typeof window !== 'undefined' && window.location.hostname.includes('localhost')
    ? 'http://localhost:3000'
    : 'https://puebloladehesa-web-635392253567.europe-west1.run.app'

  const viewUrl = route ? `${siteBase}${route}` : null
  const editUrl = contentId
    ? `https://builder.io/content/${contentId}`
    : `https://builder.io/content?model=${modelName}`

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '8px 0 24px' }}>
      <a
        href={viewUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 18px',
          borderRadius: 6,
          background: 'var(--theme-elevation-100)',
          color: 'var(--theme-text)',
          border: '1px solid var(--theme-border-color)',
          fontSize: 13,
          fontWeight: 500,
          textDecoration: 'none',
          opacity: viewUrl ? 1 : 0.4,
          pointerEvents: viewUrl ? 'auto' : 'none',
          transition: 'background 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--theme-elevation-150)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--theme-elevation-100)')}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        Ver landing
      </a>

      <a
        href={editUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 18px',
          borderRadius: 6,
          background: '#C8551F',
          color: 'white',
          border: '1px solid #C8551F',
          fontSize: 13,
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'background 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#A8451A')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#C8551F')}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        Editar landing visualmente
      </a>
    </div>
  )
}
