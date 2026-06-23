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
  { label: 'Notebooks',    href: '/catalogo?categoria=notebooks',    slug: 'notebooks' },
  { label: 'Acessórios',  href: '/catalogo?categoria=acessorios',   slug: 'acessorios' },
  { label: 'Hardware',    href: '/catalogo?categoria=hardware',     slug: 'hardware' },
  { label: 'Servidores',  href: '/catalogo?categoria=servidores',   slug: 'servidores' },
];

/* ── Ícone Hamburger ─────────────────────────────────────────── */
function IconHamburger() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <rect x="2" y="4"    width="20" height="3" rx="1.5" fill="white" />
      <rect x="2" y="10.5" width="20" height="3" rx="1.5" fill="white" />
      <rect x="2" y="17"   width="20" height="3" rx="1.5" fill="white" />
    </svg>
  );
}

/* ── Ícone X ─────────────────────────────────────────────────── */
function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="flex-shrink-0">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6"  y2="18" />
    </svg>
  );
}

/* ── Chevron ─────────────────────────────────────────────────── */
function IconChevron({ up }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white"
      strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: up ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ── Dropdown interno (só renderizado no client) ─────────────── */
function CategoryDropdown() {
  const searchParams  = useSearchParams();
  const currentCategory = searchParams.get('categoria');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Fechar ao clicar fora
  useEffect(() => {
    function onDown(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  // Fechar ao pressionar Escape
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-2.5 font-extrabold uppercase px-4 py-2 rounded-lg
          tracking-widest text-xs shadow-sm transition-colors select-none
          ${open ? 'bg-[#23A79D]' : 'bg-[#1a1a2e] hover:bg-[#23A79D]'} text-white`}
      >
        {open ? <IconClose /> : <IconHamburger />}
        CATEGORIAS
        <IconChevron up={open} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-[9999] overflow-hidden">
          <div className="bg-[#1a1a2e] px-4 py-3">
            <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Todas as Categorias</p>
          </div>
          <ul className="py-1">
            {CATEGORIES.map(cat => {
              const slug = cat.href.split('=')[1];
              const active = currentCategory === slug;
              return (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors group
                      ${active ? 'bg-[#23A79D]/10 text-[#23A79D] font-bold' : 'text-gray-700 hover:bg-[#23A79D]/10 hover:text-[#23A79D]'}`}
                  >
                    <span className="text-lg w-6 text-center flex-shrink-0">{cat.icon}</span>
                    <span className="font-medium text-sm">{cat.label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
            <Link href="/catalogo" onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1 text-[#23A79D] font-bold text-xs hover:underline">
              Ver todos os produtos →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Nav completo ────────────────────────────────────────────── */
export function CategoryNav() {
  const searchParams    = useSearchParams();
  const currentCategory = searchParams.get('categoria');

  return (
    <nav className="bg-white border-b border-gray-100 text-sm shadow-sm relative z-[999]">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between py-2.5">

        <div className="flex items-center gap-5 font-medium">
          {/* Dropdown de categorias */}
          <CategoryDropdown />

          {/* Links rápidos */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map(item => {
              const active = currentCategory === item.slug;
              return (
                <Link key={item.slug} href={item.href}
                  className={`transition-colors px-3 py-1.5 rounded-md text-sm
                    ${active ? 'font-bold text-gray-900 bg-gray-100' : 'text-gray-600 hover:text-[#23A79D]'}`}>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Links direita */}
        <div className="flex items-center gap-4 md:gap-5">
          <Link href="/minha-conta/pedidos"
            className="flex items-center gap-1.5 text-gray-600 hover:text-[#23A79D] transition-colors text-xs font-bold uppercase tracking-wide">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/>
            </svg>
            Rastrear
          </Link>

          <Link href="/catalogo?promocao=true"
            className="flex items-center gap-1 text-[#0052B4] font-bold text-xs bg-[#0052B4]/5 px-3 py-1.5 rounded-full hover:bg-[#0052B4]/10 transition-colors">
            🔥 Ofertas
          </Link>

          <Link href="/institucional" className="text-gray-500 hover:text-gray-800 transition-colors text-xs font-medium hidden md:block">
            Institucional
          </Link>
          <Link href="/atendimento" className="text-gray-500 hover:text-gray-800 transition-colors text-xs font-medium hidden md:block">
            Atendimento
          </Link>
        </div>
      </div>
    </nav>
  );
}
