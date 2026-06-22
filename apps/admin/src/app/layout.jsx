import './globals.css';

export const metadata = {
  title: 'Admin PORTALONE',
  description: 'Painel Administrativo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans min-h-screen flex bg-gray-50 text-gray-900">
        
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#111111] text-white flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-black text-[#ff6600]">ADMIN<span className="text-white">ONE</span></h1>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            <a href="/" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">Dashboard</a>
            <a href="/categories" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">Categorias</a>
            <a href="/products" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">Produtos</a>
            <a href="/users" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">Usuários</a>
            <a href="/pieces" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">Peças (Estoque)</a>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 shadow-sm">
            <h2 className="font-bold text-lg text-gray-700">Sistema de Gestão</h2>
          </header>
          <div className="flex-1 overflow-auto p-8">
            {children}
          </div>
        </main>
        
      </body>
    </html>
  );
}
