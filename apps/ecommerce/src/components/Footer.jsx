import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black to-[#062e2b] text-white pt-16 pb-8 mt-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Logo & About */}
          <div>
            <div className="bg-black/50 p-3 rounded-lg w-fit mb-6">
              <Logo className="w-40 h-auto" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              A Portal One Informática é uma empresa especializada em locação e venda de equipamentos de informática adequados aos mais diferentes cenários corporativos.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Navegação</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-brand transition-colors">Início</Link></li>
              <li><Link href="/institucional" className="text-gray-300 hover:text-brand transition-colors">Quem Somos</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-brand transition-colors">Catálogo de Produtos</Link></li>
              <li><Link href="/minha-conta" className="text-gray-300 hover:text-brand transition-colors">Minha Conta</Link></li>
            </ul>
          </div>

          {/* Column 3: Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Atendimento</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-300 hover:text-brand transition-colors">Fale Conosco</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-brand transition-colors">Política de Trocas</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-brand transition-colors">Prazos e Entregas</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-brand transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-brand mt-1"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
                <span className="text-gray-300">+55 (11) 91034-5060</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand mt-1"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg></span>
                <span className="text-gray-300">contato@portaloneinformatica.com</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand mt-1"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
                <span className="text-gray-300">São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Portal One Informática. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
            <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="Mastercard" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
            <img src="https://cdn-icons-png.flaticon.com/128/196/196566.png" alt="Boleto" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
            <img src="https://cdn-icons-png.flaticon.com/128/5968/5968115.png" alt="Pix" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
}
