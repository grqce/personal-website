/* ─── TRANSIT CARDS ─────────────────────────────────────────
 * A small collection of transit cards from places Grace has
 * been to. Rendered as styled divs (no external imagery) so
 * they can be swapped in as the "front" of the splash card.
 *
 * To add a new city:
 *   1. Add an entry to TRANSIT_CARDS below.
 *   2. If the type is 'css', add a matching <case> in
 *      TransitCardFront that renders its design.
 * ───────────────────────────────────────────────────────── */

const TRANSIT_CARDS = [
  {
    id: 'nyc',
    name: 'MetroCard',
    city: 'New York',
    agency: 'MTA',
    year: '2023',
    type: 'image',
    src: 'assets/metrocard.png',
  },
  {
    id: 'chicago',
    name: 'Ventra',
    city: 'Chicago',
    agency: 'CTA',
    year: '2023',
    type: 'image',
    src: 'assets/chicago.png',
    rotate: 90,
  },
  {
    id: 'dc',
    name: 'SmarTrip',
    city: 'Washington',
    agency: 'WMATA',
    year: '2022',
    type: 'image',
    src: 'assets/dc.png',
  },
  {
    id: 'london',
    name: 'Oyster',
    city: 'London',
    agency: 'TfL',
    year: '2024',
    type: 'image',
    src: 'assets/oyster_card.svg',
  },
  {
    id: 'paris',
    name: 'Navigo',
    city: 'Paris',
    agency: 'IDFM',
    year: '2022',
    type: 'image',
    src: 'assets/navigo.jpg',
    rotate: 90,
  },
  {
    id: 'madrid',
    name: 'TTP',
    city: 'Madrid',
    agency: 'CRTM',
    year: '2023',
    type: 'image',
    src: 'assets/madrid.png',
  },
  {
    id: 'barcelona',
    name: 'T-mobilitat',
    city: 'Barcelona',
    agency: 'ATM',
    year: '2024',
    type: 'image',
    src: 'assets/barcelona.jpg',
  },
  {
    id: 'beijing',
    name: 'Yikatong',
    city: 'Beijing',
    agency: '市政交通',
    year: '2019',
    type: 'image',
    src: 'assets/beijing.png',
  },
  {
    id: 'shanghai',
    name: 'Public Transport',
    city: 'Shanghai',
    agency: '公共交通卡',
    year: '2019',
    type: 'image',
    src: 'assets/shanghai.png',
  },
  {
    id: 'boston',
    name: 'CharlieCard',
    city: 'Boston',
    agency: 'MBTA',
    year: '2023',
    type: 'image',
    src: 'assets/boston.png',
  },
  {
    id: 'lisbon',
    name: 'Navegante',
    city: 'Lisbon',
    agency: 'Carris Metro.',
    year: '2024',
    type: 'image',
    src: 'assets/lisbon.png',
  },
  {
    id: 'tokyo',
    name: 'Suica',
    city: 'Tokyo',
    agency: 'JR East',
    year: '2023',
    type: 'image',
    src: 'assets/suica.png',
  },
];

/* ─── Individual card fronts (all 1.586:1, fill parent) ──── */

function OysterCard() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #0019A8 0%, #00125e 100%)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    }}>
      {/* TfL roundel */}
      <div style={{
        position: 'absolute', top: 18, left: 20,
        width: 34, height: 34, borderRadius: '50%',
        background: '#DC241F',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '120%', height: 7,
          background: '#0019A8',
        }} />
      </div>
      {/* decorative wave */}
      <svg viewBox="0 0 400 250" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, opacity: 0.22 }}>
        <path d="M0 180 Q100 140 200 170 T400 160 L400 250 L0 250 Z" fill="#fff" />
      </svg>
      <div style={{
        position: 'absolute', right: 22, bottom: 18,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 900, fontSize: '11cqi',
        letterSpacing: '-0.02em',
        fontStyle: 'italic',
      }}>oyster</div>
      <div style={{
        position: 'absolute', left: 22, bottom: 20,
        fontSize: '3.2cqi', letterSpacing: '0.26em',
        textTransform: 'uppercase', fontWeight: 700, opacity: 0.8,
      }}>Transport for London</div>
    </div>
  );
}

function SuicaCard() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, #00A63F 0%, #007A2E 100%)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    }}>
      {/* frosty ice pattern */}
      <svg viewBox="0 0 400 250" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, opacity: 0.14 }}>
        <circle cx="60" cy="180" r="30" fill="#fff" />
        <circle cx="110" cy="210" r="22" fill="#fff" />
        <circle cx="330" cy="190" r="40" fill="#fff" />
        <circle cx="280" cy="220" r="18" fill="#fff" />
      </svg>
      <div style={{
        position: 'absolute', top: 18, left: 22,
        fontSize: '3.2cqi', letterSpacing: '0.3em',
        textTransform: 'uppercase', fontWeight: 700, opacity: 0.85,
      }}>JR East</div>
      <div style={{
        position: 'absolute', top: 16, right: 20,
        width: 30, height: 22, borderRadius: 3,
        background: '#E60012',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 900, letterSpacing: '0.05em',
      }}>IC</div>
      <div style={{
        position: 'absolute', left: '50%', top: '52%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 800, fontSize: '14cqi',
        letterSpacing: '-0.01em',
      }}>Suica</div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 16,
        textAlign: 'center',
        fontSize: '2.7cqi', letterSpacing: '0.32em',
        textTransform: 'uppercase', fontWeight: 700, opacity: 0.8,
      }}>スイカ · スマートカード</div>
    </div>
  );
}

function NavigoCard() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #6B1E74 0%, #3E0F4A 100%)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    }}>
      {/* stripe */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '42%',
        height: '6%', background: 'linear-gradient(90deg, #E10025, #0055A4)',
      }} />
      <div style={{
        position: 'absolute', top: 18, left: 22,
        fontSize: '3.2cqi', letterSpacing: '0.3em',
        textTransform: 'uppercase', fontWeight: 700, opacity: 0.85,
      }}>Île-de-France</div>
      <div style={{
        position: 'absolute', left: 22, bottom: 36,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 800, fontSize: '12cqi',
        letterSpacing: '-0.015em',
        fontStyle: 'italic',
      }}>Navigo</div>
      <div style={{
        position: 'absolute', left: 22, bottom: 18,
        fontSize: '2.7cqi', letterSpacing: '0.28em',
        textTransform: 'uppercase', fontWeight: 700, opacity: 0.7,
      }}>Pass · Paris</div>
      <div style={{
        position: 'absolute', right: 20, bottom: 18,
        width: 34, height: 24, borderRadius: 3,
        background: 'linear-gradient(135deg, #f5d16b, #c89a2e)',
      }} />
    </div>
  );
}

function OctopusCard() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #FF7A1A 0%, #E83517 100%)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    }}>
      {/* wave pattern */}
      <svg viewBox="0 0 400 250" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, opacity: 0.22 }}>
        <path d="M0 60 Q100 20 200 55 T400 45" stroke="#fff" strokeWidth="2" fill="none" />
        <path d="M0 95 Q100 55 200 90 T400 80" stroke="#fff" strokeWidth="2" fill="none" />
        <path d="M0 130 Q100 90 200 125 T400 115" stroke="#fff" strokeWidth="2" fill="none" />
      </svg>
      {/* octopus silhouette */}
      <svg viewBox="0 0 100 100"
        style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', width: '22%', opacity: 0.9 }}>
        <g fill="#fff">
          <ellipse cx="50" cy="38" rx="24" ry="22" />
          <path d="M26 48 Q18 72 10 82 Q22 76 28 66 Z" />
          <path d="M36 54 Q30 82 24 94 Q38 86 42 70 Z" />
          <path d="M50 58 Q50 88 48 98 Q56 90 58 72 Z" />
          <path d="M64 54 Q70 82 76 94 Q62 86 58 70 Z" />
          <path d="M74 48 Q82 72 90 82 Q78 76 72 66 Z" />
        </g>
      </svg>
      <div style={{
        position: 'absolute', left: 22, top: 22,
        fontSize: '8cqi', fontWeight: 900,
        letterSpacing: '-0.01em',
      }}>八達通</div>
      <div style={{
        position: 'absolute', left: 22, bottom: 20,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 800, fontSize: '9.5cqi',
        letterSpacing: '-0.01em',
      }}>Octopus</div>
    </div>
  );
}

function ClipperCard() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(160deg, #142B4F 0%, #0A1A33 100%)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    }}>
      {/* gold accent line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '62%',
        height: 2, background: '#E8B84A',
      }} />
      {/* stylized clipper ship */}
      <svg viewBox="0 0 200 100"
        style={{ position: 'absolute', right: 18, top: '18%', width: '30%', opacity: 0.9 }}>
        <g stroke="#E8B84A" strokeWidth="1.6" fill="none">
          <path d="M20 70 L180 70 L160 85 L40 85 Z" />
          <path d="M100 10 L100 70" />
          <path d="M100 15 L55 60 L100 55 Z" fill="#E8B84A" fillOpacity="0.25"/>
          <path d="M100 20 L150 62 L100 58 Z" fill="#E8B84A" fillOpacity="0.15"/>
        </g>
      </svg>
      <div style={{
        position: 'absolute', left: 22, bottom: 36,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 900, fontSize: '11.5cqi',
        letterSpacing: '0.02em',
        color: '#E8B84A',
      }}>CLIPPER</div>
      <div style={{
        position: 'absolute', left: 22, bottom: 18,
        fontSize: '2.7cqi', letterSpacing: '0.3em',
        textTransform: 'uppercase', fontWeight: 700,
        opacity: 0.75,
      }}>Bay Area Transit</div>
    </div>
  );
}

function CharlieCard() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #7C3A52 0%, #4E1F30 100%)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    }}>
      {/* MBTA "T" roundel */}
      <div style={{
        position: 'absolute', top: 18, left: 20,
        width: 34, height: 34, borderRadius: '50%',
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 900, fontSize: 22, color: '#4E1F30',
      }}>T</div>
      {/* diagonal stripe */}
      <div style={{
        position: 'absolute', left: '-20%', top: '55%',
        width: '140%', height: '12%',
        background: 'rgba(255,255,255,0.08)',
        transform: 'rotate(-6deg)',
      }} />
      <div style={{
        position: 'absolute', right: 22, bottom: 34,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 800, fontSize: '9.5cqi',
        letterSpacing: '-0.015em',
      }}>CharlieCard</div>
      <div style={{
        position: 'absolute', right: 22, bottom: 16,
        fontSize: '2.7cqi', letterSpacing: '0.3em',
        textTransform: 'uppercase', fontWeight: 700, opacity: 0.75,
      }}>MBTA · Boston</div>
    </div>
  );
}

function SmarTripCard() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #1A1A1A 0%, #000 100%)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    }}>
      {/* circuit-ish pattern */}
      <svg viewBox="0 0 400 250" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, opacity: 0.14 }}>
        <g stroke="#9AB7D6" strokeWidth="1" fill="none">
          <path d="M40 40 L120 40 L120 90 L200 90" />
          <path d="M240 50 L320 50 L320 110" />
          <path d="M60 160 L140 160 L140 210 L260 210" />
          <circle cx="120" cy="90" r="3" fill="#9AB7D6" />
          <circle cx="320" cy="110" r="3" fill="#9AB7D6" />
          <circle cx="140" cy="210" r="3" fill="#9AB7D6" />
        </g>
      </svg>
      {/* chip */}
      <div style={{
        position: 'absolute', top: 22, left: 22,
        width: 38, height: 28, borderRadius: 4,
        background: 'linear-gradient(135deg, #d4b874 0%, #8c6e2a 100%)',
        border: '1px solid rgba(255,255,255,0.12)',
      }} />
      <div style={{
        position: 'absolute', left: 22, bottom: 36,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 800, fontSize: '11cqi',
        letterSpacing: '-0.01em',
        background: 'linear-gradient(180deg, #f2f2f2, #9AB7D6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>SmarTrip</div>
      <div style={{
        position: 'absolute', left: 22, bottom: 18,
        fontSize: '2.7cqi', letterSpacing: '0.3em',
        textTransform: 'uppercase', fontWeight: 700, opacity: 0.6,
      }}>Metro · D.C.</div>
    </div>
  );
}

function TransitCardFront({ card }) {
  if (card.type === 'image') {
    const rotate = card.rotate || 0;
    const sideways = Math.abs(rotate) % 180 === 90;
    const imgStyle = sideways
      ? {
          position: 'absolute',
          top: '50%', left: '50%',
          // Swap dims so the portrait image, once rotated 90°, fills the
          // landscape card slot. Requires container-type: size on parent.
          height: '100cqw',
          width: '100cqh',
          objectFit: card.objectFit || 'cover',
          transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
          display: 'block',
        }
      : {
          width: '100%', height: '100%',
          objectFit: card.objectFit || 'cover',
          display: 'block',
        };

    return (
      <div style={{
        position: 'absolute', inset: 0,
        overflow: 'hidden',
        background: card.background || 'transparent',
      }}>
        <img
          src={card.src}
          alt={card.name + ' · ' + card.city}
          draggable={false}
          style={imgStyle}
        />
      </div>
    );
  }
  switch (card.id) {
    case 'london': return <OysterCard />;
    case 'tokyo':  return <SuicaCard />;
    case 'paris':  return <NavigoCard />;
    case 'hk':     return <OctopusCard />;
    case 'sf':     return <ClipperCard />;
    case 'boston': return <CharlieCard />;
    case 'dc':     return <SmarTripCard />;
    default:       return null;
  }
}

/* ─── Top-right collection button ─────────────────────────── */
function CollectionButton({ onClick }) {
  return (
    <button
      className="collection-btn"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label="My transit card collection"
      title="My transit card collection"
    >
      {/* stacked cards icon */}
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <rect x="3" y="7"  width="15" height="10" rx="1.6"
          fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55"/>
        <rect x="6" y="10" width="15" height="10" rx="1.6"
          fill="none" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
      <span>Collection</span>
    </button>
  );
}

/* ─── Modal with the grid ─────────────────────────────────── */
function CollectionModal({ open, onClose, selectedId, onSelect }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="collection-backdrop fade-in"
      onClick={onClose}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        className="collection-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="collection-header">
          <div>
            <div className="collection-title">My Transit Card Collection</div>
            <div className="collection-subtitle">One card from every subway I&rsquo;ve ridden! </div>
            <div className="collection-hint">Tap a card to set it as your front</div>
          </div>
          <button
            className="collection-close"
            onClick={onClose}
            aria-label="Close collection"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            </svg>
          </button>
        </div>

        <div className="collection-grid">
          {TRANSIT_CARDS.map((card) => {
            const isSelected = card.id === selectedId;
            return (
              <button
                key={card.id}
                className={'collection-card' + (isSelected ? ' is-selected' : '')}
                onClick={() => { onSelect(card.id); onClose(); }}
              >
                <div className="collection-card-face">
                  <TransitCardFront card={card} />
                </div>
                <div className="collection-card-meta">
                  <div className="collection-card-name">{card.name}</div>
                  <div className="collection-card-city">
                    {card.city} · {card.year}
                  </div>
                </div>
                {isSelected && (
                  <div className="collection-card-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="12" height="12">
                      <path d="M5 12l5 5L20 7" stroke="currentColor"
                        strokeWidth="2.4" strokeLinecap="round"
                        strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
