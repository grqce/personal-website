/* ─── PORTFOLIO PAGE ────────────────────────────────────────
 * One page per subway line. Features:
 * - Subway-sign header (black sign with name + four roundels)
 * - Thick white "exit arrow" integrated into the sign
 * - Grid of project cards below
 * ─────────────────────────────────────────────────────────── */
function PortfolioPage({ line, onBack }) {
  return (
    <div style={{ minHeight: '100%', background: '#EDEDEA' }}>

      {/* Subway-sign header */}
      <div style={{
        background: '#EDEDEA',
        padding: '32px 48px 26px',
        position: 'sticky', top: 0, zIndex: 10,
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', gap: 22,
      }}>
        {/* Subway station sign */}
        <div style={{
          position: 'relative',
          background: '#111',
          borderRadius: 3,
          padding: '20px 20px 28px 18px',
          display: 'flex', alignItems: 'flex-start', gap: 24,
          minWidth: 620,
        }}>
          {/* White accent stripe — thin band above the main content */}
          <div style={{
            position: 'absolute', top: 8, left: 5, right: 5, height: 1.5,
            background: '#fff', pointerEvents: 'none',
          }}/>

          {/* Exit arrow — thick NYC-transit-style left triangle */}
          <button
            onClick={onBack}
            aria-label="Exit to map"
            className="exit-arrow"
            style={{
              background: 'transparent', border: 'none', padding: 0, margin: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
              marginTop: 6,
            }}
          >
            <svg width={36} height={36} viewBox="0 0 36 36" style={{ display: 'block' }}>
              <path d="M 6 18 L 30 4 L 30 32 Z" fill="#fff"/>
            </svg>
          </button>

          {/* Thin divider between the arrow and the text */}
          <div style={{
            width: 1, alignSelf: 'stretch',
            background: 'rgba(255,255,255,0.22)',
            margin: '6px 0 2px',
          }}/>

          {/* Line name + caption */}
          <div style={{ paddingTop: 10, flex: 1 }}>
            <div style={{
              color: '#fff', fontSize: 36, fontWeight: 900,
              letterSpacing: '-0.4px', lineHeight: 1.02,
              fontFamily: 'Helvetica Neue,Helvetica,Arial',
            }}>
              {line.name}
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.45)', fontSize: 11,
              fontWeight: 700, letterSpacing: '3.2px',
              textTransform: 'uppercase', marginTop: 6,
            }}>
              Grace Li Transit Authority
            </div>
          </div>

          {/* Four line roundels — active one gets a white ring */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, paddingTop: 14,
          }}>
            {LINES.map(l => (
              <div
                key={l.id}
                style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: l.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: l.id === line.id ? 1 : 0.92,
                  boxShadow: l.id === line.id
                    ? '0 0 0 2px rgba(255,255,255,0.85)' : 'none',
                }}
              >
                <span style={{
                  color: '#fff', fontSize: 13, fontWeight: 900,
                  letterSpacing: 0.2,
                  fontFamily: 'Helvetica Neue,Helvetica,Arial',
                }}>
                  {l.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of project cards */}
      <div style={{
        padding: '44px 52px 72px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))',
        gap: 20, alignContent: 'start',
      }}>
        {line.items.map((item, i) => (
          <div
            key={i}
            className="project-card"
            style={{
              background: '#ffffff',
              borderRadius: 16,
              padding: '24px 26px',
              border: '1px solid rgba(15,17,20,0.08)',
              position: 'relative',
            }}
          >
            {/* Subtle colored accent — small pill at the top-left */}
            <div style={{
              position: 'absolute', top: 0, left: 24,
              width: 36, height: 3,
              background: line.color,
              borderRadius: '0 0 3px 3px',
            }}/>

            {/* Title + year */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-start', marginBottom: 10, marginTop: 4,
            }}>
              <h2 style={{
                fontSize: 15.5, fontWeight: 700,
                letterSpacing: '-0.015em',
                color: '#0f1114', lineHeight: 1.25,
              }}>
                {item.title}
              </h2>
              <span style={{
                fontSize: 10.5, color: '#9aa0a8',
                fontFamily: "'JetBrains Mono','SF Mono',ui-monospace,Menlo,monospace",
                flexShrink: 0, marginLeft: 12,
                fontWeight: 500, letterSpacing: '0.02em',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {item.year}
              </span>
            </div>

            {/* Description */}
            <p style={{
              fontSize: 13, color: '#5a606b', lineHeight: 1.7,
              marginBottom: 16, letterSpacing: '-0.005em',
            }}>
              {item.desc}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {item.tags.map(t => (
                <span
                  key={t}
                  style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
                    color: line.color,
                    background: `${line.color}12`,
                    padding: '4px 10px', borderRadius: 999,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
