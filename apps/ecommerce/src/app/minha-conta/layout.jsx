"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, User, MapPin, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function MinhaContaLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Resumo da Conta', href: '/minha-conta', icon: LayoutDashboard },
    { name: 'Meus Pedidos', href: '/minha-conta/pedidos', icon: ShoppingBag },
    { name: 'Meus Dados', href: '/minha-conta/dados', icon: User },
    { name: 'Endereços', href: '/minha-conta/enderecos', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-border p-4 sticky top-6">
              <div className="mb-6 px-4">
                <h2 className="text-xl font-bold text-foreground">Minha Conta</h2>
                <p className="text-sm text-muted">Bem-vindo de volta!</p>
              </div>
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? 'bg-brand/10 text-brand' 
                          : 'text-foreground hover:bg-muted-bg hover:text-brand'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  );
                })}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  Sair da Conta
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-border min-h-[500px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
