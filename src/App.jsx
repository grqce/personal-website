/* ─── APP ───────────────────────────────────────────────────
 * Top-level router. Tracks which "page" is active
 * (card / map / line) and which line is selected, and
 * persists both to localStorage across reloads.
 * ─────────────────────────────────────────────────────────── */
function App() {
  const [page,   setPage]   = React.useState(() => localStorage.getItem('gl-page') || 'card');
  const [lineId, setLineId] = React.useState(() => localStorage.getItem('gl-line') || null);

  const goToCard = React.useCallback(() => {
    localStorage.setItem('gl-page', 'card');
    setPage('card');
  }, []);

  const goToMap = React.useCallback(() => {
    localStorage.setItem('gl-page', 'map');
    setPage('map');
  }, []);

  const goToLine = React.useCallback((id) => {
    localStorage.setItem('gl-page', 'line');
    localStorage.setItem('gl-line', id);
    setLineId(id);
    setPage('line');
  }, []);

  const goBack = React.useCallback(() => {
    localStorage.setItem('gl-page', 'map');
    setPage('map');
  }, []);

  const line = LINE_MAP[lineId];

  return (
    <div style={{
      width: '100vw', height: '100vh',
      overflow: page === 'line' ? 'auto' : 'hidden',
    }}>
      {page === 'card' && <MetroCard onEnter={goToMap}/>}
      {page === 'map'  && <MapView onSelectLine={goToLine} onGoHome={goToCard}/>}
      {page === 'line' && line && <PortfolioPage line={line} onBack={goBack}/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
