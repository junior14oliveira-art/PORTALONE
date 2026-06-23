"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import { Package, MapPin, Edit3 } from 'lucide-react';
import Link from 'next/link';

export default function MinhaContaPage() {
  const { data: session } = useSession();

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Resumo da Conta</h1>
      
      <div className="bg-brand/5 border border-brand/20 rounded-xl p-6 mb-8 flex items-center gap-4">
        {session?.user?.image ? (
          <img src={session.user.image} alt="Perfil" className="w-16 h-16 rounded-full shadow-sm" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center text-brand text-xl font-bold">
            {session?.user?.name?.charAt(0) || 'U'}
          </div>
        )}
        <div>
          <h2 className="text-lg font-bold text-foreground">Olá, {session?.user?.name || 'Cliente'}!</h2>
          <p className="text-muted">{session?.user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/minha-conta/pedidos" className="block group">
          <div className="border border-border rounded-xl p-6 h-full hover:border-brand hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-lg bg-muted-bg flex items-center justify-center text-foreground group-hover:bg-brand/10 group-hover:text-brand transition-colors mb-4">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Meus Pedidos</h3>
            <p className="text-sm text-muted">Acompanhe o status e histórico das suas locações e compras.</p>
          </div>
        </Link>

        <Link href="/minha-conta/dados" className="block group">
          <div className="border border-border rounded-xl p-6 h-full hover:border-brand hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-lg bg-muted-bg flex items-center justify-center text-foreground group-hover:bg-brand/10 group-hover:text-brand transition-colors mb-4">
              <Edit3 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Dados Pessoais</h3>
            <p className="text-sm text-muted">Atualize suas informações de contato e senha de acesso.</p>
          </div>
        </Link>

        <Link href="/minha-conta/enderecos" className="block group">
          <div className="border border-border rounded-xl p-6 h-full hover:border-brand hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-lg bg-muted-bg flex items-center justify-center text-foreground group-hover:bg-brand/10 group-hover:text-brand transition-colors mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Endereços</h3>
            <p className="text-sm text-muted">Gerencie seus endereços para entrega e cobrança.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
