"use client";

import React, { useState } from 'react';

export default function DadosPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Meus Dados</h1>
      
      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Nome Completo</label>
            <input type="text" defaultValue="Cliente Demonstração" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">E-mail</label>
            <input type="email" defaultValue="cliente@exemplo.com" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">CPF / CNPJ</label>
            <input type="text" defaultValue="000.000.000-00" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Celular</label>
            <input type="tel" defaultValue="(11) 90000-0000" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand" />
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Alterar Senha</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nova Senha</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Confirmar Nova Senha</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-brand text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}
