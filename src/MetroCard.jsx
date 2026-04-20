/* ─── METROCARD ────────────────────────────────────────────
 * Splash screen. A single card sits center-stage:
 *   • Front  → the MetroCard image
 *   • Back   → a clean profile card (headshot, name, bio)
 *   • Tap    → enter the map
 *   • Swipe  → spin to the other face
 * Socials live in a frosted pill pinned to the bottom.
 * ────────────────────────────────────────────────────────── */
function MetroCard({ onEnter }) {
  // Accumulated Y rotation. Start at 180° so we land on the profile side.
  const [rotation, setRotation] = React.useState(180);
  const [dragging, setDragging] = React.useState(false);
  const [liveRotation, setLiveRotation] = React.useState(180);

  // Imperative drag state (refs avoid re-render on every pointermove)
  const drag = React.useRef({
    active: false, startX: 0, startRot: 0, movedPx: 0, dragged: false,
  });

  const stop = (e) => { e.stopPropagation(); };

  // ─── Gesture handlers ────────────────────────────────────
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drag.current = {
      active: true,
      startX: e.clientX,
      startRot: rotation,
      movedPx: 0,
      dragged: false,
    };
    setDragging(true);
    setLiveRotation(rotation);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.movedPx = Math.abs(dx);
    if (drag.current.movedPx > 6) drag.current.dragged = true;
    // 260px of drag ≈ 180° of rotation (nice 1:1-ish feel)
    const deg = dx * (180 / 260);
    setLiveRotation(drag.current.startRot + deg);
  };

  const endDrag = (e) => {
    if (!drag.current.active) return;
    const dx = (e.clientX ?? drag.current.startX) - drag.current.startX;
    const dragged = drag.current.dragged;
    drag.current.active = false;
    setDragging(false);

    if (!dragged) return; // plain tap → outer onClick handles enter

    const dir = dx >= 0 ? 1 : -1;
    const threshold = 40;
    const target = Math.abs(dx) > threshold
      ? drag.current.startRot + dir * 180   // commit → opposite face
      : drag.current.startRot;              // tiny swipe → snap back
    setRotation(target);
    setLiveRotation(target);
  };

  // Prevent a post-swipe click from also navigating to the map.
  const onCardClickCapture = (e) => {
    if (drag.current.dragged) {
      e.stopPropagation();
      drag.current.dragged = false;
    }
  };

  // ─── Socials ─────────────────────────────────────────────
  const SOCIALS = [
    {
      id: 'github', label: 'GitHub', href: '#',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
        </svg>
      ),
    },
    {
      id: 'linkedin', label: 'LinkedIn', href: '#',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/>
        </svg>
      ),
    },
    {
      id: 'email', label: 'Email', href: '#',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18v12H3z"/>
          <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6"/>
        </svg>
      ),
    },
  ];

  const displayedRotation = dragging ? liveRotation : rotation;

  return (
    <div
      onClick={onEnter}
      style={{
        position: 'relative',
        width: '100%', height: '100%', cursor: 'pointer',
        background: 'radial-gradient(ellipse at 50% 40%, #F4F3EF 0%, #E6E6E2 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 36,
        userSelect: 'none',
      }}
    >
      <p style={{
        fontSize: 10.5, letterSpacing: '0.32em', color: '#3a3c40',
        textTransform: 'uppercase', fontWeight: 600,
      }}>
        Grace Li · Transit Authority
      </p>

      {/* ─── Swipeable spinning card ─── */}
      <div
        style={{
          perspective: 1600,
          width: 'min(390px, 92vw)',
        }}
      >
        <div
          className="metrocard-swipe"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onCardClickCapture}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1.586 / 1',
            transformStyle: 'preserve-3d',
            transition: dragging
              ? 'none'
              : 'transform 1.05s cubic-bezier(0.22, 1, 0.32, 1)',
            transform: `rotateY(${displayedRotation}deg)`,
            cursor: dragging ? 'grabbing' : 'grab',
            touchAction: 'pan-y',
          }}
        >
          {/* FRONT — MetroCard image */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: 16,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}>
            <img
              src="assets/metrocard_front-Photoroom.png"
              alt="MTA MetroCard"
              draggable={false}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* BACK — muted tan profile card (slightly smaller than front) */}
          <div
            style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) scale(0.93)',
              transformOrigin: 'center center',
              background:
                'linear-gradient(180deg, #EFE7D3 0%, #E3D9C0 100%)',
              borderRadius: 16,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              pointerEvents: 'none',
            }}
          >
            {/* top-left member-since label */}
            <div style={{
              position: 'absolute', top: 22, left: 22,
              fontFamily: "'Inter', sans-serif",
              fontSize: 8, letterSpacing: '0.28em',
              textTransform: 'uppercase', fontWeight: 700,
              color: 'rgba(58, 46, 26, 0.6)',
              fontVariantNumeric: 'tabular-nums',
              whiteSpace: 'nowrap',
            }}>
              Member Since · 04 · 03
            </div>

            {/* top-right monogram badge */}
            <div style={{
              position: 'absolute', top: 14, right: 16,
              width: 30, height: 30, borderRadius: '50%',
              border: '1px solid rgba(71, 55, 20, 0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Inter', sans-serif",
              fontSize: 10, letterSpacing: '0.08em',
              fontWeight: 800,
              color: 'rgba(58, 46, 26, 0.75)',
            }}>GL</div>

            {/* body */}
            <div style={{
              flex: 1,
              display: 'flex', alignItems: 'center',
              padding: '32px 26px 10px 26px',
              gap: 22,
            }}>
              <div style={{
                width: 132, height: 132, borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                border: '1px solid rgba(71, 55, 20, 0.18)',
              }}>
                <img
                  src={"assets/" + encodeURIComponent('Grace Li - Headshot.png')}
                  alt="Grace Li"
                  draggable={false}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: '20% 50%',
                    transform: 'scale(1.08)',
                    transformOrigin: '50% 50%',
                    display: 'block',
                  }}
                />
              </div>

              <div style={{
                minWidth: 0, flex: 1,
                fontFamily: "'IBM Plex Mono', 'Menlo', 'Consolas', monospace",
              }}>
                <div style={{
                  fontSize: 19,
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                  color: '#1a120a',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  marginBottom: 10,
                }}>
                   Hi! I'm Grace 
                </div>
                <div style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: 10.5, letterSpacing: '0.34em',
                  textTransform: 'uppercase', fontWeight: 600,
                  color: '#3a2e1a',
                  lineHeight: 1.7,
                }}>
                  <div>CS, Finance/Stats</div>
                  <div>UPenn M&T</div>
                </div>
              </div>
            </div>

            {/* fine-print footer — tiny card details */}
            <div style={{
              margin: '0 22px',
              padding: '10px 0 12px',
              borderTop: '1px solid rgba(71, 55, 20, 0.18)',
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 8, letterSpacing: '0.26em',
              textTransform: 'uppercase', fontWeight: 700,
              color: 'rgba(58, 46, 26, 0.55)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              <span>Serial · 0000 0000</span>
              <span>Issued 04 · 26</span>
              <span>GL / NYC</span>
            </div>
          </div>
        </div>
      </div>

      {/* line dots */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {LINES.map(l => (
          <div
            key={l.id}
            style={{
              width: 10, height: 10, borderRadius: '50%',
              background: l.color,
            }}
          />
        ))}
      </div>

      {/* instructions */}
      <p style={{
        fontSize: 10.5, letterSpacing: '0.34em', color: '#3a3c40',
        textTransform: 'uppercase', fontWeight: 600,
        display: 'flex', gap: 14, alignItems: 'center',
      }}>
        <span>Tap to enter</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span>Swipe to spin</span>
      </p>

      {/* socials strip — pinned bottom, always reachable */}
      <div className="socials-strip" onClick={stop} onPointerDown={stop}>
        {SOCIALS.map(s => (
          <a
            key={s.id}
            className="social-link"
            href={s.href}
            target={s.id === 'email' ? undefined : '_blank'}
            rel={s.id === 'email' ? undefined : 'noopener noreferrer'}
            onClick={stop}
            aria-label={s.label}
            title={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
