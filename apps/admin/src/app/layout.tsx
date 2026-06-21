import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: '4M&C Informática | ERP Administrativo',
  description: 'Sistema integrado de gestão, vendas e rastreabilidade B2B.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex`}>
        {/* Sidebar Admin Placeholder */}
        <aside className="w-64 border-r border-border/40 bg-card hidden md:flex flex-col h-screen sticky top-0">
          <div className="h-16 flex items-center px-6 border-b border-border/40">
            <span className="font-bold text-lg text-primary tracking-tight">4M&C ERP</span>
          </div>
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <a href="/" className="flex items-center px-4 py-3 text-sm font-medium rounded-md bg-primary/10 text-primary">Dashboard</a>
            <a href="/vendas" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">Vendas & Pedidos</a>
            <a href="/estoque" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">Estoque</a>
            <a href="/rastreabilidade" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors border border-transparent hover:border-border">
              <span className="mr-2">🔍</span> Rastreabilidade (SN)
            </a>
            <a href="/produtos" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">Produtos</a>
            <a href="/clientes" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">Clientes B2B</a>
            <a href="/fiscal" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">Emissão Fiscal</a>
          </nav>
          <div className="p-4 border-t border-border/40">
            <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors">
              Sair
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 flex items-center justify-between px-6 border-b border-border/40 bg-background/95 backdrop-blur z-10 sticky top-0">
            <div className="md:hidden font-bold text-lg text-primary">4M&C ERP</div>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-muted-foreground hidden sm:block">Operador: <span className="text-foreground">Administrador</span></div>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">A</div>
            </div>
          </header>
          <main className="flex-1 p-6 lg:p-10 bg-slate-50 dark:bg-background overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
