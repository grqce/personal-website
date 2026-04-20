/* ─── METROCARD ────────────────────────────────────────────
 * Splash screen. Shows the MetroCard image; clicking anywhere
 * on the screen enters the map view.
 * ────────────────────────────────────────────────────────── */
function MetroCard({ onEnter }) {
  return (
    <div
      onClick={onEnter}
      style={{
        width: '100%', height: '100%', cursor: 'pointer',
        background: 'radial-gradient(ellipse at 50% 40%, #F4F3EF 0%, #E6E6E2 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 32,
        userSelect: 'none',
      }}
    >
      <p style={{
        fontSize: 10.5, letterSpacing: '0.32em', color: '#8a8f97',
        textTransform: 'uppercase', fontWeight: 600,
      }}>
        Grace Li · Transit Authority
      </p>

      <img
        className="metrocard-img"
        src="assets/metrocard_front-Photoroom.png"
        alt="MTA MetroCard"
        draggable={false}
        style={{
          width: 320, maxWidth: 'min(320px, 92vw)', height: 'auto',
          borderRadius: 14,
        }}
      />

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

      <p style={{
        fontSize: 10.5, letterSpacing: '0.34em', color: '#9aa0a8',
        textTransform: 'uppercase', fontWeight: 600,
      }}>
        Tap to enter
      </p>
    </div>
  );
}
