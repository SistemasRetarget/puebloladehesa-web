'use client'

import { useDocumentInfo } from '@payloadcms/ui'

/**
 * Banner de acciones para la collection `Pages`.
 *   1. Ver landing — abre la URL en el sitio
 *   2. Editar landing visualmente — abre el editor de Builder.io
 */
export default function PageActions() {
  let route: string | undefined
  let contentId: string | undefined
  let modelName = 'pueblo-home'
  let title = ''

  try {
    const info = useDocumentInfo() as any
    const data = info?.savedDocumentData || info?.docPermissions?.fields || {}
    route = data.route
    contentId = data.builderContentId
    title = data.title || ''
    if (data.builderModelName) modelName = data.builderModelName
  } catch {
    // Listing context — no document info
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
        margin: '0.5rem 0 1.75rem',
        padding: '1.1rem 1.35rem',
        borderRadius: 14,
        background: 'linear-gradient(135deg, #D7632C 0%, #b85424 100%)',
        boxShadow: '0 4px 14px rgba(215,99,44,0.25), 0 1px 3px rgba(0,0,0,0.06)',
        color: '#ffffff',
      }}
    >
      <div style={{ minWidth: 0, flex: '1 1 240px' }}>
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.05rem',
            fontWeight: 600,
            marginBottom: 2,
            lineHeight: 1.2,
          }}
        >
          Edición visual en Builder.io
        </div>
        <div style={{ fontSize: '0.82rem', opacity: 0.9, lineHeight: 1.45 }}>
          {title
            ? `Editá visualmente «${title}» o previsualizá la landing publicada.`
            : 'Editá visualmente esta landing o previsualizá la publicada.'}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <a
          href={viewUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '0.65rem 1.1rem',
            borderRadius: 9,
            background: 'rgba(255,255,255,0.14)',
            color: '#ffffff',
            border: '1.5px solid rgba(255,255,255,0.3)',
            fontSize: '0.86rem',
            fontWeight: 600,
            textDecoration: 'none',
            opacity: viewUrl ? 1 : 0.45,
            pointerEvents: viewUrl ? 'auto' : 'none',
            transition: 'background 0.2s ease, transform 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.22)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.14)'
            e.currentTarget.style.transform = 'translateY(0)'
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
            padding: '0.7rem 1.25rem',
            borderRadius: 9,
            background: '#ffffff',
            color: '#b85424',
            border: 'none',
            fontSize: '0.88rem',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.22)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)'
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          Editar landing visualmente
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.7 }}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  )
}
