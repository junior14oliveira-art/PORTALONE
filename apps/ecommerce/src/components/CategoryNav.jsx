"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const CATEGORIES = [
  { label: 'Computadores Desktop', href: '/catalogo?categoria=computadores', icon: '🖥️' },
  { label: 'Notebooks', href: '/catalogo?categoria=notebooks', icon: '💻' },
  { label: 'Monitores', href: '/catalogo?categoria=monitores', icon: '🖵' },
  { label: 'Acessórios', href: '/catalogo?categoria=acessorios', icon: '🖱️' },
  { label: 'Hardware', href: '/catalogo?categoria=hardware', icon: '⚙️' },
  { label: 'Servidores', href: '/catalogo?categoria=servidores', icon: '🗄️' },
  { label: 'Redes', href: '/catalogo?categoria=redes', icon: '📡' },
];

const navItems = [
  { label: 'Computadores', href: '/catalogo?categoria=computadores', slug: 'computadores' },
  { label: 'Notebooks', href: '/catalogo?categoria=notebooks', slug: 'notebooks' },
  { label: 'Acessórios', href: '/catalogo?categoria=acessorios', slug: 'acessorios' },
  { label: 'Hardware', href: '/catalogo?categoria=hardware', slug: 'hardware' },
  { label: 'Servidores', href: '/catalogo?categoria=servidores', slug: 'servidores' },
];

export function CategoryNav() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('categoria');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-border text-foreground text-sm shadow-sm relative z-[100]">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between py-2.5 overflow-x-auto hide-scrollbar whitespace-nowrap">
        <div className="flex items-center gap-6 font-medium">

          {/* Botão CATEGORIAS com Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(prev => !prev)}
              className={`flex items-center gap-2.5 font-extrabold uppercase px-4 py-2 rounded-lg tracking-widest text-xs shadow-sm transition-all select-none ${
                open ? 'bg-[#23A79D] text-white' : 'bg-[#1a1a2e] text-white hover:bg-[#23A79D]'
              }`}
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              {/* Ícone hamburger / X — SVGs separados para evitar conflito de fill */}
              {open ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="flex-shrink-0">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="flex-shrink-0">
                  <rect x="2" y="4" width="20" height="3" rx="1.5" />
                  <rect x="2" y="10.5" width="20" height="3" rx="1.5" />
                  <rect x="2" y="17" width="20" height="3" rx="1.5" />
                </svg>
              )}
              CATEGORIAS
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-border z-[200] overflow-hidden">
                <div className="bg-[#1a1a2e] px-4 py-3">
                  <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold">Todas as Categorias</p>
                </div>
                <ul className="py-1">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.href}>
                      <Link
                        href={cat.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-[#23A79D]/10 hover:text-[#23A79D] transition-colors group ${
                          currentCategory === cat.href.split('=')[1] ? 'bg-[#23A79D]/10 text-[#23A79D] font-bold' : 'text-foreground'
                        }`}
                      >
                        <span className="text-lg w-6 text-center flex-shrink-0">{cat.icon}</span>
                        <span className="font-medium text-sm">{cat.label}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border px-4 py-3 bg-gray-50">
                  <Link
                    href="/catalogo"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-1 text-[#23A79D] font-bold text-xs hover:underline"
                  >
                    Ver todos os produtos →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Links rápidos de categorias */}
          {navItems.map((item) => {
            const isActive = currentCategory === item.slug;
            return (
              <Link
                key={item.slug}
                href={item.href}
                className={`transition-colors px-3 py-1.5 rounded-md border-2 ${
                  isActive
                    ? 'border-foreground font-bold text-foreground bg-muted/10'
                    : 'border-transparent hover:text-[#23A79D]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Links da direita */}
        <div className="flex items-center gap-6">
          <Link href="/minha-conta/pedidos" className="flex items-center gap-1 hover:text-[#23A79D] transition-colors text-xs font-bold uppercase tracking-wide text-gray-700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/>
            </svg>
            Rastrear Pedido
          </Link>
          <Link href="/catalogo?promocao=true" className="flex items-center gap-1 text-brand hover:text-brand-hover transition-colors text-xs font-bold bg-brand/5 px-3 py-1.5 rounded-full">
            🔥 Ofertas do dia
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
