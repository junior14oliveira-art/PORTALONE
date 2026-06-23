"use client";

import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Edit } from 'lucide-react';

export default function EnderecosPage() {
  const [enderecos] = useState([
    {
      id: 1,
      titulo: 'Empresa Matriz',
      rua: 'Av. Paulista, 1000',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01310-100',
      padrao: true
    }
  ]);

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Meus Endereços</h1>
        <button className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-hover transition-colors">
          <Plus className="w-4 h-4" />
          Novo Endereço
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enderecos.map(endereco => (
          <div key={endereco.id} className="border border-border rounded-xl p-6 relative group hover:border-brand transition-colors">
            {endereco.padrao && (
              <span className="absolute top-4 right-4 bg-brand/10 text-brand text-xs font-bold px-2 py-1 rounded">
                Padrão
              </span>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-muted-bg flex items-center justify-center text-foreground group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-foreground">{endereco.titulo}</h3>
            </div>
            
            <div className="text-muted-foreground text-sm space-y-1 mb-6">
              <p>{endereco.rua}</p>
              <p>{endereco.bairro}</p>
              <p>{endereco.cidade} - {endereco.estado}</p>
              <p>CEP: {endereco.cep}</p>
            </div>
            
            <div className="flex gap-3 border-t border-border pt-4">
              <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand transition-colors">
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors ml-auto">
                <Trash2 className="w-4 h-4" />
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
