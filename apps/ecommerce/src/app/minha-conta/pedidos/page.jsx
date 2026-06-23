"use client";

import { useState } from "react";
import Link from "next/link";

const MOCK_ORDERS = [
  {
    id: "PO-2024-000001",
    date: "23/06/2026",
    status: "ENTREGUE",
    total: 9389.90,
    trackingCode: "BR123456789BR",
    items: [
      { name: 'Dell Latitude 5420 - i7, 16GB', quantity: 1, price: 7499.90 },
      { name: 'Monitor Dell P2422H', quantity: 1, price: 1890.00 }
    ]
  },
  {
    id: "PO-2024-000002",
    date: "24/06/2026",
    status: "SHIPPED",
    total: 12350.00,
    trackingCode: "BR987654321BR",
    items: [
      { name: 'Switch Dell S4048-ON', quantity: 1, price: 12350.00 }
    ]
  },
  {
    id: "PO-2024-000003",
    date: "25/06/2026",
    status: "PENDING",
    total: 350.00,
    trackingCode: null,
    items: [
      { name: 'Teclado Mecânico', quantity: 1, price: 350.00 }
    ]
  }
];

const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-orange-100 text-orange-800",
  ENTREGUE: "bg-green-100 text-green-800",
  CANCELED: "bg-red-100 text-red-800"
};

const STATUS_LABELS = {
  PENDING: "Pendente",
  PAID: "Pago",
  PROCESSING: "Processando",
  SHIPPED: "Enviado",
  ENTREGUE: "Entregue",
  CANCELED: "Cancelado"
};

export default function PedidosPage() {
  const [filter, setFilter] = useState("Todos");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const filteredOrders = MOCK_ORDERS.filter(order => {
    if (filter === "Todos") return true;
    if (filter === "Em Andamento") return ["PENDING", "PAID", "PROCESSING", "SHIPPED"].includes(order.status);
    if (filter === "Entregues") return order.status === "ENTREGUE";
    if (filter === "Cancelados") return order.status === "CANCELED";
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Meus Pedidos</h1>
            <p className="text-[var(--color-muted)] mt-1">Acompanhe o status das suas compras</p>
          </div>
          <Link href="/" className="text-[var(--color-brand)] font-medium hover:underline">
            Voltar para a loja
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {["Todos", "Em Andamento", "Entregues", "Cancelados"].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === tab 
                  ? "bg-[var(--color-brand)] text-white" 
                  : "bg-white text-[var(--color-muted)] hover:bg-[var(--color-muted-bg)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[var(--color-border)]">
              <div className="w-16 h-16 bg-[var(--color-muted-bg)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[var(--color-foreground)]">Nenhum pedido encontrado</h3>
              <p className="text-[var(--color-muted)] mt-1">Você ainda não possui pedidos com este status.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden transition-shadow hover:shadow-md">
                
                {/* Header */}
                <div className="p-6 border-b border-[var(--color-border)] flex flex-wrap gap-4 items-center justify-between bg-gray-50/50">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-[var(--color-muted)]">Pedido realizado</p>
                      <p className="font-medium">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--color-muted)]">Total</p>
                      <p className="font-medium">R$ {order.total.toLocaleString('pt-BR', {minimumFractionDigits:2})}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--color-muted)]">Nº do Pedido</p>
                      <p className="font-medium">{order.id}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[order.status]}`}>
                      {STATUS_LABELS[order.status]}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  {order.status === "SHIPPED" && order.trackingCode && (
                    <div className="mb-6 p-4 bg-[var(--color-muted-bg)] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-[var(--color-brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                        <div>
                          <p className="text-sm font-medium">Código de Rastreio</p>
                          <p className="font-mono text-[var(--color-brand)] font-bold">{order.trackingCode}</p>
                        </div>
                      </div>
                      <a href={`https://rastreamento.correios.com.br/app/index.php?codigo=${order.trackingCode}`} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white border border-[var(--color-border)] rounded-lg text-sm font-medium hover:bg-gray-50">
                        Rastrear
                      </a>
                    </div>
                  )}

                  <div className="space-y-4">
                    {order.items.slice(0, expandedOrder === order.id ? undefined : 2).map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[var(--color-muted-bg)] rounded flex items-center justify-center">
                            <svg className="w-6 h-6 text-[var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-[var(--color-muted)]">Qtd: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">R$ {item.price.toLocaleString('pt-BR', {minimumFractionDigits:2})}</p>
                      </div>
                    ))}
                    
                    {order.items.length > 2 && (
                      <button 
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                        className="text-[var(--color-brand)] text-sm font-medium mt-2 hover:underline"
                      >
                        {expandedOrder === order.id ? "Ver menos" : `Ver mais ${order.items.length - 2} itens`}
                      </button>
                    )}
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
