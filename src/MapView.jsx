/* ─── MAP VIEW ──────────────────────────────────────────────
 * The main subway map with all four lines, station dots,
 * interchange markers, compass, and floating legend.
 * ─────────────────────────────────────────────────────────── */
function MapView({ onSelectLine, onGoHome }) {
  const [hov, setHov] = React.useState(null);

  /* viewBox dimensions + overall map condense transform */
  const W = 1200, H = 680;
  const MAP_SX = 1;
  const MAP_SCALE = 0.87;
  const MAP_WIDE = 1.06;
  const cx = W / 2, cy = H / 2;
  const mapCondense =
    `translate(${cx} ${cy}) scale(${MAP_SX * MAP_SCALE * MAP_WIDE} ${MAP_SCALE}) translate(${-cx} ${-cy})`;

  return (
    <div
      className="fade-in"
      style={{
        width: '100%', height: '100%', background: '#EDEDEA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Legend — frosted card in the bottom-right */}
      <div style={{
        position: 'absolute', bottom: 22, right: 22, zIndex: 10,
        background: 'rgba(252,251,248,0.82)',
        backdropFilter: 'blur(12px) saturate(1.1)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.1)',
        border: '1px solid rgba(15,17,20,0.08)',
        borderRadius: 14, padding: '16px 20px',
      }}>
        <p style={{
          fontSize: 10.5, letterSpacing: '0.28em', color: '#9aa0a8',
          fontWeight: 700, textTransform: 'uppercase', marginBottom: 14,
        }}>Key</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          {LINES.map(l => (
            <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 8,  height: 8, borderRadius: '50%', background: l.color }}/>
                <div style={{ width: 30, height: 6,                        background: l.color }}/>
                <div style={{ width: 8,  height: 8, borderRadius: '50%', background: l.color }}/>
              </div>
              <span style={{
                fontSize: 14, color: '#23262b', fontWeight: 500,
                letterSpacing: '-0.005em',
              }}>{l.name}</span>
            </div>
          ))}

          <div style={{
            borderTop: '1px solid rgba(15,17,20,0.08)',
            marginTop: 5, paddingTop: 13,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 19, height: 19, borderRadius: '50%', flexShrink: 0,
              border: '2.5px solid #3b424d',
              background: 'rgba(252,251,248,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b424d' }}/>
            </div>
            <span style={{ fontSize: 14, color: '#8a8f97', fontWeight: 500 }}>
              Transfer station
            </span>
          </div>
        </div>
      </div>

      {/* The map itself */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: '100%', display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
        onMouseLeave={() => setHov(null)}
      >
        {/* Background: paper + atlas gridlines */}
        <defs>
          <pattern id="gridFine" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 L 0 48" fill="none"
              stroke="rgba(44,48,58,0.05)" strokeWidth="0.75"/>
          </pattern>
          <pattern id="gridAccent" x="0" y="0" width="144" height="144" patternUnits="userSpaceOnUse">
            <path d="M 144 0 L 0 0 L 0 144" fill="none"
              stroke="rgba(44,48,58,0.09)" strokeWidth="1"/>
          </pattern>
        </defs>

        <rect width={W} height={H} fill="#EDEDEA"/>
        <rect width={W} height={H} fill="url(#gridAccent)"/>
        <rect width={W} height={H} fill="url(#gridFine)"/>

        {/* Title — plain text, click returns to MetroCard */}
        <g style={{ cursor: 'pointer' }} onClick={onGoHome}>
          <rect x={10} y={4} width={280} height={74} fill="transparent"/>
          <text x={30} y={44} fill="#1a1a1a"
            style={{
              font: '900 30px Helvetica Neue,Helvetica,Arial',
              letterSpacing: '-0.5px',
              pointerEvents: 'none', userSelect: 'none',
            }}
          >
            Grace Li
          </text>
          <text x={30} y={62} fill="#bbb"
            style={{
              font: '600 10px Helvetica Neue,Helvetica,Arial',
              letterSpacing: '3px',
              pointerEvents: 'none', userSelect: 'none',
            }}
          >
            TRANSIT AUTHORITY
          </text>
        </g>

        {/* Condensed map: lines, interchanges, stations, labels */}
        <g transform={mapCondense}>
          {/* Lines */}
          {LINES.map(line => (
            <g key={line.id}>
              <path d={line.path} fill="none" stroke="transparent" strokeWidth={46}
                style={{ cursor: 'pointer' }} onClick={() => onSelectLine(line.id)}/>
              <path d={line.path} fill="none"
                stroke={line.color} strokeWidth={17}
                strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          ))}

          {/* Interchange markers */}
          {INTERCHANGES.map((ic, i) => (
            <g key={i}>
              <circle cx={ic.x} cy={ic.y} r={9}
                fill="#EDEDEA" stroke="#333" strokeWidth={2.5}/>
              <circle cx={ic.x} cy={ic.y} r={3.5} fill="#333"/>
            </g>
          ))}

          {/* Station dots */}
          {LINES.map(line => line.stations.map(s => {
            const isHov = hov?.id === s.id;
            const r = s.terminal ? 8 : 6;
            return (
              <g key={s.id} style={{ cursor: 'pointer' }}
                onClick={() => onSelectLine(line.id)}
                onMouseEnter={() => setHov({ ...s, color: line.color, lineName: line.name })}
                onMouseLeave={() => setHov(null)}>
                <circle cx={s.x} cy={s.y} r={r + 6} fill="transparent"/>
                <circle cx={s.x} cy={s.y} r={r}
                  fill={isHov ? line.color : '#EDEDEA'}
                  stroke={line.color} strokeWidth={2.5}
                  style={{ transition: 'fill 0.12s' }}/>
                {s.terminal && (
                  <circle cx={s.x} cy={s.y} r={3}
                    fill={isHov ? '#EDEDEA' : line.color}/>
                )}
              </g>
            );
          }))}

          {/* Terminal line-name labels */}
          {LINES.map(line => {
            const s0 = line.stations[0];
            const cfg = {
              about:   { x: s0.x + 14, y: s0.y + 20, a: 'start'  },
              coding:  { x: s0.x + 18, y: s0.y + 14, a: 'start'  },
              product: { x: s0.x +  4, y: s0.y - 14, a: 'middle' },
              art:     { x: s0.x + 14, y: s0.y + 20, a: 'start'  },
            }[line.id];
            return (
              <text key={line.id} x={cfg.x} y={cfg.y} textAnchor={cfg.a}
                fill={line.color}
                style={{
                  font: '800 9px Helvetica Neue,Helvetica,Arial',
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  pointerEvents: 'none', userSelect: 'none',
                }}
              >
                {line.name}
              </text>
            );
          })}

          {/* Hover tooltip */}
          {hov && (
            <g>
              <rect x={hov.x - 52} y={hov.y - 36} width={104} height={22} rx={3}
                fill={hov.color}/>
              <text x={hov.x} y={hov.y - 21} textAnchor="middle" fill="white"
                style={{
                  font: '700 10px Helvetica Neue,Helvetica,Arial',
                  pointerEvents: 'none', userSelect: 'none',
                }}
              >
                {hov.name}
              </text>
            </g>
          )}
        </g>
      </svg>

      {/* Compass — bare SVG anchored to the bottom-left */}
      <svg
        width={64} height={68} viewBox="-32 -34 64 68"
        style={{
          position: 'absolute', bottom: 26, left: 26, zIndex: 11,
          pointerEvents: 'none', opacity: 0.7,
        }}
      >
        <line x1={0}   y1={-22} x2={0}  y2={22} stroke="#6d7381" strokeWidth={1.1}/>
        <line x1={-22} y1={0}   x2={22} y2={0}  stroke="#6d7381" strokeWidth={1.1}/>
        {[['N', 0, -26], ['S', 0, 30], ['W', -26, 4], ['E', 26, 4]].map(([d, dx, dy]) => (
          <text key={d} x={dx} y={dy} fill="#6d7381" textAnchor="middle"
            style={{
              font: "700 11px 'Inter',-apple-system,Helvetica Neue,Helvetica,Arial",
              letterSpacing: '0.08em',
            }}
          >
            {d}
          </text>
        ))}
      </svg>
    </div>
  );
}
