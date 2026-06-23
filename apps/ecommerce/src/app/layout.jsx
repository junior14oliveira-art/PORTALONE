import './globals.css';
import React from 'react';
import Link from 'next/link';
import { CategoryNav } from '@/components/CategoryNav';
import { Logo } from '@/components/Logo';
import { Providers } from '@/components/Providers';
import { Footer } from '@/components/Footer';
import { CartIcon } from '@/components/CartIcon';

export const metadata = {
  title: 'PORTALONE - 4M&C Informática',
  description: 'Compre computadores, notebooks e servidores de alta performance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="bg-background text-foreground">
      <body className={`font-sans antialiased min-h-screen flex flex-col`}>
        <Providers>
        
        {/* TOP PROMO BAR */}
        <div className="bg-brand text-white text-[11px] md:text-xs font-bold py-1.5 px-4 text-center tracking-wide flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
          <span className="flex items-center gap-1">💰 ATÉ 10% DE DESCONTO NO PIX</span>
          <span className="hidden md:inline">•</span>
          <span className="flex items-center gap-1">💳 PARCELE EM ATÉ 10X SEM JUROS</span>
          <span className="hidden md:inline">•</span>
          <span className="flex items-center gap-1">🚚 ENTREGA PARA TODO BRASIL</span>
        </div>

        {/* TOP HEADER */}
        <header className="bg-gradient-to-r from-black to-[#062e2b] py-4 shadow-sm relative z-20">
          <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-90 transition-opacity" aria-label="Página Inicial">
              <Logo className="w-32 md:w-48 h-auto -ml-3" />
            </Link>

            {/* Location (Hidden on mobile) */}
            <div className="hidden lg:flex items-center gap-3 text-sm text-white cursor-pointer hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <div className="leading-tight">
                <div className="font-bold">Atualizar Local</div>
                <div className="text-xs text-white/70">Por favor, insira o seu CEP</div>
              </div>
            </div>

            {/* Search Bar - Heuristic: User control and freedom */}
            <div className="flex-1 flex max-w-3xl border-2 border-transparent rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand/50 focus-within:border-brand transition-all bg-white text-foreground">
              <div className="hidden md:flex items-center bg-gray-100 px-4 text-sm border-r border-border font-medium cursor-pointer hover:bg-gray-200 transition-colors">
                Todos <span className="ml-2 text-[10px] text-muted">▼</span>
              </div>
              <input 
                type="text" 
                placeholder="O que você está procurando?" 
                className="flex-1 px-4 py-2.5 bg-transparent focus:outline-none placeholder:text-muted"
                aria-label="Campo de busca"
              />
              <button className="bg-brand text-white px-6 hover:bg-brand-hover transition-colors flex items-center justify-center" aria-label="Pesquisar">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
            </div>

            {/* Account & Cart - Heuristic: Visibility of system status */}
            <div className="flex items-center gap-6 text-white">
              <Link href="/minha-conta" className="hidden md:flex items-center gap-3 cursor-pointer hover:text-brand transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="text-sm leading-tight">
                  <div className="text-white/70 text-xs">Minha conta</div>
                  <div className="font-bold">Entrar / Cadastro</div>
                </div>
              </Link>
              <CartIcon />
            </div>
          </div>
        </header>

        <React.Suspense fallback={<div className="h-12 bg-white border-b border-border w-full"></div>}>
          <CategoryNav />
        </React.Suspense>

        <main className="flex-1 w-full relative z-0">
          {children}
        </main>
        
        <a href="https://wa.me/5511910345060" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center" aria-label="Contato via WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
        <Footer />

        </Providers>
      </body>
    </html>
  );
}
