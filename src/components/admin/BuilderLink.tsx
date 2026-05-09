'use client'

export default function BuilderLink() {
  return (
    <div style={{ padding: '0 16px 8px' }}>
      <a
        href="https://builder.io/content"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          borderRadius: '4px',
          color: 'var(--theme-text)',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 500,
          border: '1px solid var(--theme-border-color)',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--theme-bg)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
        </svg>
        Constructor de páginas
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto', opacity: 0.5 }}>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
    </div>
  )
}
