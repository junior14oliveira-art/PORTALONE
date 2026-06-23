"use client";

import React from 'react';
import { Package, Clock, CheckCircle } from 'lucide-react';

export default function PedidosPage() {
  const mockPedidos = [
    {
      id: '#10045',
      data: '20 Jun 2026',
      status: 'Entregue',
      total: 'R$ 3.450,00',
      items: 'Locação: 5 Notebooks Dell Latitude',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: '#10046',
      data: '22 Jun 2026',
      status: 'Em processamento',
      total: 'R$ 1.200,00',
      items: 'Locação: 2 All in One HP',
      icon: Clock,
      color: 'text-amber-500'
    }
  ];

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Meus Pedidos</h1>
      
      <div className="space-y-4">
        {mockPedidos.map((pedido) => {
          const StatusIcon = pedido.icon;
          return (
            <div key={pedido.id} className="border border-border rounded-xl p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:border-brand transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted-bg flex items-center justify-center text-foreground mt-1">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                    Pedido {pedido.id}
                  </h3>
                  <p className="text-sm text-muted mb-1">Realizado em {pedido.data}</p>
                  <p className="text-sm text-foreground">{pedido.items}</p>
                  <div className={`flex items-center gap-1.5 mt-2 text-sm font-medium ${pedido.color}`}>
                    <StatusIcon className="w-4 h-4" />
                    {pedido.status}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end w-full md:w-auto">
                <p className="text-lg font-bold text-foreground mb-3">{pedido.total}</p>
                <div className="flex gap-2 w-full md:w-auto">
                  <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted-bg transition-colors flex-1 md:flex-none">
                    Ver Detalhes
                  </button>
                  {pedido.status === 'Entregue' && (
                    <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-hover transition-colors flex-1 md:flex-none">
                      Renovar Locação
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
