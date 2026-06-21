import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: '4M&C Informática | Premium Tech Store',
  description: 'Compre computadores, notebooks e servidores de alta performance. E-commerce completo para B2B e B2C.',
  keywords: 'computadores, notebooks, servidores, TI, B2B, B2C, hardware, ssd, memória ram',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        {/* Header placeholder */}
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 max-w-screen-2xl items-center px-4 mx-auto">
            <div className="mr-4 hidden md:flex font-bold text-xl tracking-tight text-primary">
              4M&C Informática
            </div>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a href="/computadores" className="transition-colors hover:text-foreground/80 text-foreground/60">Computadores</a>
              <a href="/notebooks" className="transition-colors hover:text-foreground/80 text-foreground/60">Notebooks</a>
              <a href="/servidores" className="transition-colors hover:text-foreground/80 text-foreground/60">Servidores</a>
              <a href="/pecas" className="transition-colors hover:text-foreground/80 text-foreground/60">Peças & Hardware</a>
            </nav>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                {/* Search placeholder */}
                <button className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
                  <span className="hidden lg:inline-flex">Buscar produtos...</span>
                  <span className="inline-flex lg:hidden">Busca...</span>
                </button>
              </div>
              {/* Cart / User placeholders */}
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9">
                {/* User Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 relative">
                {/* Cart Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">0</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        {/* Footer placeholder */}
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 mx-auto">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} 4M&C Informática. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
