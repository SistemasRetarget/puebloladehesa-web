'use client'

import { useDocumentInfo } from '@payloadcms/ui'

/**
 * UI field para la collection `Pages`.
 * Muestra dos botones de acción:
 *   1. Ver landing — abre la URL en el sitio
 *   2. Editar landing visualmente — abre el editor de Builder.io
 */
export default function PageActions() {
  let route: string | undefined
  let contentId: string | undefined
  let modelName = 'pueblo-home'

  try {
    // useDocumentInfo expone los datos guardados del documento actual
    const info = useDocumentInfo() as any
    const data = info?.savedDocumentData || info?.docPermissions?.fields || {}
    route = data.route
    contentId = data.builderContentId
    if (data.builderModelName) modelName = data.builderModelName
  } catch (e) {
    // En caso de error, el botón "Editar" sigue funcionando con el listado del modelo
  }

  const siteBase =
    typeof window !== 'undefined' && window.location.hostname.includes('localhost')
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
        }}
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
        }}
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
