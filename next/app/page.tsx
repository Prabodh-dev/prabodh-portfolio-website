export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        textAlign: 'center',
        padding: '0 16px',
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Under construction</h1>
      <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
        The new site is being built. Check back soon.
      </p>
      {/* plain anchor: /old is outside this app's basePath */}
      <a href="/old" className="old-site-button">
        View old site
      </a>
    </main>
  );
}
