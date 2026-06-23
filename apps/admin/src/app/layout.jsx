import './globals.css';

export const metadata = {
  title: 'Admin PORTALONE',
  description: 'Painel Administrativo PORTALONE',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, display: 'flex', minHeight: '100vh', background: '#111111', fontFamily: "'Inter', sans-serif" }}>
        <AdminSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
          <AdminHeader />
          <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', background: '#111111' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

function AdminSidebar() {
  const navItems = [
    { href: '/', label: 'Dashboard', icon: IconDashboard },
    { href: '/products', label: 'Produtos', icon: IconProducts },
    { href: '/categories', label: 'Categorias', icon: IconCategories },
    { href: '/orders', label: 'Pedidos', icon: IconOrders },
    { href: '/pieces', label: 'Estoque (Peças)', icon: IconStock },
    { href: '/clients', label: 'Clientes', icon: IconClients },
    { href: '/integracoes', label: 'Integrações', icon: IconIntegrations },
    { href: '/configuracoes', label: 'Configurações', icon: IconSettings },
  ];

  return (
    <aside style={{
      width: '240px',
      minWidth: '240px',
      background: '#0D0D0D',
      borderRight: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #FF6600, #FF8C00)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: '900', fontSize: '14px', color: '#fff',
            boxShadow: '0 4px 12px rgba(255,102,0,0.4)',
            flexShrink: 0,
          }}>P</div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              PORT<span style={{ color: '#FF6600' }}>ALONE</span>
            </div>
            <div style={{ fontSize: '10px', color: '#555', fontWeight: '500', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        <div style={{ fontSize: '10px', fontWeight: '600', color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 8px', marginBottom: '8px' }}>Menu Principal</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="sidebar-link"
              style={{ textDecoration: 'none' }}
            >
              <Icon className="sidebar-icon" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '9px 12px', borderRadius: '10px',
            background: 'rgba(255,102,0,0.08)', border: '1px solid rgba(255,102,0,0.15)',
            color: '#FF6600', textDecoration: 'none',
            fontSize: '13px', fontWeight: '600',
            transition: 'all 0.15s',
            marginBottom: '12px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Ver Loja
        </a>
        <div style={{ fontSize: '11px', color: '#3a3a3a', textAlign: 'center' }}>v1.0.0 — PORTALONE Admin</div>
      </div>
    </aside>
  );
}

function AdminHeader() {
  return (
    <header style={{
      height: '60px',
      background: '#111111',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '13px', color: '#555' }}>Painel</span>
        <span style={{ color: '#333' }}>/</span>
        <span style={{ fontSize: '13px', color: '#aaa', fontWeight: '500' }}>Administrativo</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Notification bell */}
        <button style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'transparent', border: '1px solid rgba(255,255,255,0.08)',
          color: '#888', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          position: 'relative', transition: 'all 0.15s',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span style={{
            position: 'absolute', top: '6px', right: '6px',
            width: '7px', height: '7px', background: '#FF6600',
            borderRadius: '50%', border: '1.5px solid #111111',
          }} />
        </button>
        {/* Avatar */}
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #FF6600, #FF8C00)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: '700', fontSize: '13px', color: '#fff',
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,102,0,0.3)',
          letterSpacing: '0.02em',
        }}>A</div>
      </div>
    </header>
  );
}

/* ---- INLINE SVG ICONS ---- */
function IconDashboard({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconProducts({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
function IconCategories({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function IconOrders({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function IconStock({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function IconClients({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconIntegrations({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93A10 10 0 1 1 4.93 19.07" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  );
}
function IconSettings({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
