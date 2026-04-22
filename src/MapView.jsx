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

  /* ─── Train animation ─────────────────────────────────────
   * A single car rides along the active line. At interchange
   * points it has a chance to hop to a crossing line, and at a
   * terminal it reverses direction. getPointAtLength gives us
   * both the position and tangent so the rectangle stays aligned
   * with the track.
   * ───────────────────────────────────────────────────────── */
  const trainRef = React.useRef(null);
  const pathRefs = React.useRef({});

  React.useEffect(() => {
    const state = {
      lineId: 'about',
      t: 0,
      dir: 1,
      cooldown: 0, // frames until another transfer is allowed
    };
    const SPEED = 0.45; // path units per frame (~27 px/s at 60fps)

    // Find the length along `path` closest to the (x, y) anchor.
    const lengthAt = (path, x, y) => {
      const total = path.getTotalLength();
      let bestT = 0, bestD = Infinity;
      const SAMPLES = 500;
      for (let i = 0; i <= SAMPLES; i++) {
        const t = (i / SAMPLES) * total;
        const p = path.getPointAtLength(t);
        const d = (p.x - x) ** 2 + (p.y - y) ** 2;
        if (d < bestD) { bestD = d; bestT = t; }
      }
      return bestT;
    };

    let raf;
    const tick = () => {
      const path = pathRefs.current[state.lineId];
      if (!path) { raf = requestAnimationFrame(tick); return; }
      const total = path.getTotalLength();

      state.t += state.dir * SPEED;
      if (state.t <= 0)      { state.t = 0;     state.dir =  1; }
      else if (state.t >= total) { state.t = total; state.dir = -1; }

      const pos = path.getPointAtLength(state.t);

      if (state.cooldown <= 0) {
        for (const ic of INTERCHANGES) {
          if (!ic.lines.includes(state.lineId)) continue;
          const dx = pos.x - ic.x, dy = pos.y - ic.y;
          if (dx * dx + dy * dy < 64) { // within ~8 path units
            // One decision per interchange pass. 40% transfer, 60% straight
            // through. Cooldown is set either way so we don't re-roll while
            // still sitting inside the interchange zone.
            state.cooldown = 160;
            if (Math.random() < 0.4) {
              const otherId = ic.lines.find((l) => l !== state.lineId);
              const otherPath = pathRefs.current[otherId];
              if (otherPath) {
                state.t = lengthAt(otherPath, ic.x, ic.y);
                state.lineId = otherId;
                state.dir = Math.random() < 0.5 ? 1 : -1;
              }
            }
            break;
          }
        }
      }
      if (state.cooldown > 0) state.cooldown--;

      // Tangent via two samples around current t
      const step = 2;
      const p1 = path.getPointAtLength(Math.max(0, state.t - step));
      const p2 = path.getPointAtLength(Math.min(total, state.t + step));
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

      if (trainRef.current) {
        const color = LINE_MAP[state.lineId].color;
        trainRef.current.setAttribute(
          'transform',
          `translate(${pos.x} ${pos.y}) rotate(${angle})`
        );
        trainRef.current.setAttribute('fill', color);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="fade-in"
      style={{
        width: '100%', height: '100%',
        backgroundColor: '#EDEDEA',
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><path d='M 48 0 L 0 0 L 0 48' fill='none' stroke='rgba(44,48,58,0.05)' stroke-width='0.75'/></svg>\")," +
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='144' height='144'><path d='M 144 0 L 0 0 L 0 144' fill='none' stroke='rgba(44,48,58,0.09)' stroke-width='1'/></svg>\")",
        backgroundRepeat: 'repeat, repeat',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Legend — frosted card in the bottom-right */}
      <div style={{
        position: 'absolute', bottom: 50, right: 30, zIndex: 10,
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
              <div style={{
                width: 46, height: 6, borderRadius: 3,
                background: l.color, flexShrink: 0,
              }}/>
              <span style={{
                fontSize: 13, color: '#23262b', fontWeight: 600,
                letterSpacing: '0.02em',
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
            <span style={{
              fontSize: 13, color: '#8a8f97', fontWeight: 600,
              letterSpacing: '0.02em',
            }}>
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


        {/* Title — plain text + GYL roundel, click returns to MetroCard */}
        <g style={{ cursor: 'pointer' }} onClick={onGoHome}>
          <rect x={10} y={4} width={320} height={74} fill="transparent"/>

          {/* GYL logo image */}
          <image
            href={"assets/" + encodeURIComponent('Gemini_Generated_Image_k6ja8jk6ja8jk6ja-removebg-preview.png')}
            xlinkHref={"assets/" + encodeURIComponent('Gemini_Generated_Image_k6ja8jk6ja8jk6ja-removebg-preview.png')}
            x={22} y={16} width={45} height={45}
            preserveAspectRatio="none"
          />

          <text x={75} y={44} fill="#1a1a1a"
            style={{
              font: '900 30px Helvetica Neue,Helvetica,Arial',
              letterSpacing: '-0.5px',
              pointerEvents: 'none', userSelect: 'none',
            }}
          >
            Grace Li
          </text>
          <text x={75} y={62} fill="#615e5e"
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
          {/* Invisible geometry paths used by the train for getPointAtLength */}
          {LINES.map((line) => (
            <path
              key={'train-geo-' + line.id}
              ref={(el) => { pathRefs.current[line.id] = el; }}
              d={line.path}
              fill="none"
              stroke="none"
              pointerEvents="none"
            />
          ))}

          {/* Lines */}
          {LINES.map(line => (
            <g key={line.id}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectLine(line.id)}
            >
              <path d={line.path} fill="none" stroke="transparent" strokeWidth={64}/>
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

          {/* Train car — rides the active line, same color, slightly thicker.
              Rendered after stations so it visually passes over the dots. */}
          <rect
            ref={trainRef}
            x={-17} y={-11.5} width={34} height={23}
            rx={3} ry={3}
            fill={LINES[0].color}
            pointerEvents="none"
          />

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

          {/* Hover tooltip (only for stations, which have x/y coords) */}
          {hov && hov.x !== undefined && (
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
        width={72} height={76} viewBox="-36 -38 72 76"
        style={{
          position: 'absolute', bottom: 26, left: 26, zIndex: 11,
          pointerEvents: 'none', opacity: 0.7,
        }}
      >
        <line x1={0}   y1={-20} x2={0}  y2={20} stroke="#6d7381" strokeWidth={1.1}/>
        <line x1={-20} y1={0}   x2={20} y2={0}  stroke="#6d7381" strokeWidth={1.1}/>
        {[['N', 0, -28], ['S', 0, 34], ['W', -30, 4], ['E', 30, 4]].map(([d, dx, dy]) => (
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
