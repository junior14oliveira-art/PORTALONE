"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function CategoryNav() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('categoria');

  const navItems = [
    { label: 'Computadores', href: '/catalogo?categoria=computadores', slug: 'computadores' },
    { label: 'Notebooks', href: '/catalogo?categoria=notebooks', slug: 'notebooks' },
    { label: 'Acessórios', href: '/catalogo?categoria=acessorios', slug: 'acessorios' },
    { label: 'Hardware', href: '/catalogo?categoria=hardware', slug: 'hardware' },
    { label: 'Servidores', href: '/catalogo?categoria=servidores', slug: 'servidores' },
  ];

  return (
    <nav className="bg-white border-b border-border text-foreground text-sm shadow-sm relative z-10">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between py-3 overflow-x-auto hide-scrollbar whitespace-nowrap">
        <div className="flex items-center gap-6 font-medium">
          <Link href="/catalogo" className="flex items-center gap-2.5 font-extrabold uppercase bg-[#1a1a2e] text-white hover:bg-[#23A79D] transition-all px-4 py-2.5 rounded-lg tracking-widest text-xs shadow-sm group">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <rect x="2" y="4" width="20" height="3" rx="1.5" />
              <rect x="2" y="10.5" width="20" height="3" rx="1.5" />
              <rect x="2" y="17" width="20" height="3" rx="1.5" />
            </svg>
            CATEGORIAS
          </Link>
          
          {navItems.map((item) => {
            const isActive = currentCategory === item.slug;
            return (
              <Link 
                key={item.slug}
                href={item.href} 
                className={`transition-colors px-3 py-1.5 rounded-md border-2 ${
                  isActive 
                    ? 'border-foreground font-bold text-foreground bg-muted/10' 
                    : 'border-transparent hover:text-brand'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-6">
          <Link href="/minha-conta/pedidos" className="flex items-center gap-1 hover:text-brand transition-colors text-xs font-bold uppercase tracking-wide text-gray-700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/></svg>
            Rastrear Pedido
          </Link>
          <Link href="/catalogo?promocao=true" className="flex items-center gap-1 text-brand hover:text-brand-hover transition-colors text-xs font-bold bg-brand/5 px-3 py-1.5 rounded-full">
            <span className="text-brand">🔥</span> Ofertas do dia
          </Link>
          <Link href="/institucional" className="flex items-center gap-1 hover:text-brand transition-colors text-xs font-medium">
            <span className="text-muted">▾</span> Institucional
          </Link>
          <Link href="/atendimento" className="flex items-center gap-1 hover:text-brand transition-colors text-xs font-medium">
            <span className="text-muted">▾</span> Atendimento
          </Link>
        </div>
      </div>
    </nav>
  );
}
