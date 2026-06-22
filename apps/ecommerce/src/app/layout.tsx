import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '4M&C Informática',
  description: 'Compre computadores, notebooks e servidores de alta performance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="bg-background text-foreground">
      <body className={`font-sans antialiased min-h-screen flex flex-col`}>
        
        {/* TOP HEADER (Black) */}
        <header className="bg-[#111111] text-white py-3">
          <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="text-2xl font-bold italic tracking-tighter">
                <span className="text-white">4M&C</span>
              </div>
            </div>

            {/* Location (Hidden on mobile) */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <div className="leading-tight">
                <div className="font-bold">Atualizar Local</div>
                <div className="text-xs text-gray-400">Por favor, ins... o seu CEP</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 flex max-w-3xl">
              <div className="hidden md:flex items-center bg-gray-200 text-black px-3 rounded-l-sm text-sm border-r border-gray-300">
                Todos <span className="ml-1 text-xs">▼</span>
              </div>
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="flex-1 px-4 py-2 text-black bg-white focus:outline-none md:rounded-none rounded-l-sm"
              />
              <button className="bg-[#ff6600] text-white px-6 rounded-r-sm hover:bg-[#e65c00] transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
            </div>

            {/* Account & Cart */}
            <div className="flex items-center gap-6">
              <div className="hidden md:block text-sm leading-tight text-right cursor-pointer">
                <div>Minha conta</div>
                <div className="font-bold">Entrar/Cadastro</div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  <span className="absolute -top-1 -right-2 bg-transparent text-white text-xs font-bold w-4 h-4 text-center">0</span>
                </div>
                <div className="hidden lg:block text-sm">
                  Carrinho <span className="text-xs">▼</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* BOTTOM NAV (Dark Slate) */}
        <nav className="bg-[#2d3748] text-white text-sm">
          <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between py-2 overflow-x-auto hide-scrollbar whitespace-nowrap">
            <div className="flex items-center gap-6 font-medium">
              <a href="#" className="flex items-center gap-2 font-bold uppercase"><span className="text-lg">≡</span> Categorias</a>
              <a href="#" className="hover:text-gray-300">Computador</a>
              <a href="#" className="hover:text-gray-300">Notebook</a>
              <a href="#" className="hover:text-gray-300">Acessórios</a>
              <a href="#" className="hover:text-gray-300">Peças para Computador</a>
              <a href="#" className="hover:text-gray-300">Servidores</a>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="flex items-center gap-1 hover:text-gray-300 text-xs"><span className="text-gray-400">v</span> Institucional</a>
              <a href="#" className="flex items-center gap-1 hover:text-gray-300 text-xs"><span className="text-gray-400">v</span> Atendimento</a>
              <a href="#" className="flex items-center gap-1 hover:text-gray-300 text-xs font-bold"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="m12 8 4 4-4 4"/></svg> Ofertas do dia</a>
            </div>
          </div>
        </nav>

        <main className="flex-1 w-full bg-[#f3f3f3]">
          {children}
        </main>
        
        {/* Floating WhatsApp Base */}
        <a href="#" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>

      </body>
    </html>
  );
}
