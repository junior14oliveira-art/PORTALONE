import './globals.css';
import React from 'react';
import Link from 'next/link';
import { CategoryNav } from '@/components/CategoryNav';

export const metadata = {
  title: 'PORTALONE - 4M&C Informática',
  description: 'Compre computadores, notebooks e servidores de alta performance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="bg-background text-foreground">
      <body className={`font-sans antialiased min-h-screen flex flex-col`}>
        
        {/* TOP HEADER */}
        <header className="bg-nav-bg border-b border-border py-4 shadow-sm relative z-20">
          <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-90 transition-opacity" aria-label="Página Inicial">
              <div className="text-3xl font-black tracking-tighter">
                <span className="text-brand">PORTAL</span><span className="text-foreground">ONE</span>
              </div>
            </Link>

            {/* Location (Hidden on mobile) */}
            <div className="hidden lg:flex items-center gap-3 text-sm text-foreground cursor-pointer hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <div className="leading-tight">
                <div className="font-bold">Atualizar Local</div>
                <div className="text-xs text-muted">Por favor, insira o seu CEP</div>
              </div>
            </div>

            {/* Search Bar - Heuristic: User control and freedom */}
            <div className="flex-1 flex max-w-3xl border-2 border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand/20 focus-within:border-brand transition-all bg-white">
              <div className="hidden md:flex items-center bg-muted-bg text-foreground px-4 text-sm border-r border-border font-medium cursor-pointer hover:bg-gray-200 transition-colors">
                Todos <span className="ml-2 text-[10px] text-muted">▼</span>
              </div>
              <input 
                type="text" 
                placeholder="O que você está procurando?" 
                className="flex-1 px-4 py-2.5 text-foreground bg-transparent focus:outline-none placeholder:text-muted"
                aria-label="Campo de busca"
              />
              <button className="bg-brand text-white px-6 hover:bg-brand-hover transition-colors flex items-center justify-center" aria-label="Pesquisar">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
            </div>

            {/* Account & Cart - Heuristic: Visibility of system status */}
            <div className="flex items-center gap-6 text-foreground">
              <Link href="/minha-conta" className="hidden md:flex items-center gap-3 cursor-pointer hover:text-brand transition-colors group">
                <div className="w-10 h-10 rounded-full bg-muted-bg flex items-center justify-center group-hover:bg-brand/10 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="text-sm leading-tight">
                  <div className="text-muted text-xs">Minha conta</div>
                  <div className="font-bold">Entrar / Cadastro</div>
                </div>
              </Link>
              <Link href="/carrinho" className="flex items-center gap-3 cursor-pointer hover:text-brand transition-colors group">
                <div className="relative w-10 h-10 rounded-full bg-muted-bg flex items-center justify-center group-hover:bg-brand/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center group-hover:bg-brand-hover shadow-sm">0</span>
                </div>
                <div className="hidden lg:block text-sm font-bold">
                  Carrinho
                </div>
              </Link>
            </div>
          </div>
        </header>

        <React.Suspense fallback={<div className="h-12 bg-white border-b border-border w-full"></div>}>
          <CategoryNav />
        </React.Suspense>

        <main className="flex-1 w-full relative z-0">
          {children}
        </main>
        
        {/* Floating WhatsApp Base - Heuristic: Help and documentation */}
        <a href="#" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all" aria-label="Contato via WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>

      </body>
    </html>
  );
}
