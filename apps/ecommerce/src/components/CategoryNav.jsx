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
          <Link href="/catalogo" className="flex items-center gap-2 font-extrabold uppercase text-[#23A79D] hover:text-[#1c8c83] transition-colors tracking-wide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="5" width="20" height="3" />
              <rect x="2" y="11" width="20" height="3" />
              <rect x="2" y="17" width="20" height="3" />
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
