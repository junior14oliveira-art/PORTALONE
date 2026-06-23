'use client';

import { useState } from 'react';

const STATUS_CONFIG = {
  'Aguardando Pagamento': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  'Em Processamento':    { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500' },
  'Enviado':             { bg: 'bg-purple-100',  text: 'text-purple-700', dot: 'bg-purple-500' },
  'Entregue':            { bg: 'bg-green-100',   text: 'text-green-700',  dot: 'bg-green-500' },
  'Cancelado':           { bg: 'bg-red-100',     text: 'text-red-700',    dot: 'bg-red-500' },
};

const MOCK_ORDERS = [
  {
    id: '#ORD-8821',
    date: '23/06/2026',
    customer: 'Carlos Mendes',
    email: 'carlos@email.com',
    total: 3499.0,
    status: 'Enviado',
    payment: 'Cartão de Crédito',
    items: [
      { name: 'Notebook Dell Inspiron 15', qty: 1, price: 3499.0 },
    ],
    address: 'Rua das Palmeiras, 142 – São Paulo, SP – 01234-567',
    tracking: 'BR9482719381BR',
  },
  {
    id: '#ORD-8820',
    date: '23/06/2026',
    customer: 'Ana Souza',
    email: 'ana.souza@email.com',
    total: 399.0,
    status: 'Em Processamento',
    payment: 'PIX',
    items: [
      { name: 'Mouse Logitech MX Master 3', qty: 1, price: 399.0 },
    ],
    address: 'Av. Paulista, 1000 – São Paulo, SP – 01310-100',
    tracking: null,
  },
  {
    id: '#ORD-8819',
    date: '22/06/2026',
    customer: 'João Pereira',
    email: 'joao.p@email.com',
    total: 1849.9,
    status: 'Aguardando Pagamento',
    payment: 'Boleto Bancário',
    items: [
      { name: 'Monitor Samsung 27" 4K', qty: 1, price: 1849.9 },
    ],
    address: 'Rua XV de Novembro, 50 – Curitiba, PR – 80020-310',
    tracking: null,
  },
  {
    id: '#ORD-8818',
    date: '22/06/2026',
    customer: 'Fernanda Lima',
    email: 'fernanda.l@email.com',
    total: 578.8,
    status: 'Entregue',
    payment: 'Cartão de Débito',
    items: [
      { name: 'Teclado Mecânico Redragon K552', qty: 1, price: 289.9 },
      { name: 'Mouse Pad XL Redragon', qty: 1, price: 288.9 },
    ],
    address: 'Rua das Flores, 33 – Belo Horizonte, MG – 30110-010',
    tracking: 'BR1234567890BR',
  },
  {
    id: '#ORD-8817',
    date: '21/06/2026',
    customer: 'Ricardo Torres',
    email: 'rtorres@email.com',
    total: 459.0,
    status: 'Cancelado',
    payment: 'PIX',
    items: [
      { name: 'Headset HyperX Cloud II', qty: 1, price: 459.0 },
    ],
    address: 'Rua da Consolação, 200 – São Paulo, SP – 01301-000',
    tracking: null,
  },
  {
    id: '#ORD-8816',
    date: '20/06/2026',
    customer: 'Mariana Costa',
    email: 'mari.costa@email.com',
    total: 2199.0,
    status: 'Enviado',
    payment: 'Cartão de Crédito',
    items: [
      { name: 'Placa de Vídeo RTX 4060', qty: 1, price: 2199.0 },
    ],
    address: 'Av. Rio Branco, 45 – Rio de Janeiro, RJ – 20040-004',
    tracking: 'BR0987654321BR',
  },
  {
    id: '#ORD-8815',
    date: '20/06/2026',
    customer: 'Lucas Ferreira',
    email: 'lucas.f@email.com',
    total: 689.7,
    status: 'Entregue',
    payment: 'PIX',
    items: [
      { name: 'SSD Kingston 480GB', qty: 1, price: 229.9 },
      { name: 'Memória RAM 8GB DDR4', qty: 2, price: 229.9 },
    ],
    address: 'Alameda Santos, 711 – São Paulo, SP – 01419-001',
    tracking: 'BR5544332211BR',
  },
];

const ALL_STATUS = ['Todos', ...Object.keys(STATUS_CONFIG)];

function OrderDetailModal({ order, onClose }) {
  const cfg = STATUS_CONFIG[order.status];
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white">
          <div>
            <h2 className="text-gray-900 font-bold text-lg">Pedido {order.id}</h2>
            <p className="text-gray-400 text-sm">{order.date}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Status */}
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${cfg.bg} ${cfg.text}`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${cfg.dot}`} />
              {order.status}
            </span>
            <span className="text-gray-400 text-sm">via {order.payment}</span>
          </div>

          {/* Cliente */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-2">Cliente</p>
            <p className="text-gray-900 font-semibold">{order.customer}</p>
            <p className="text-gray-500 text-sm">{order.email}</p>
            <p className="text-gray-500 text-sm mt-1">{order.address}</p>
          </div>

          {/* Itens */}
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-3">Itens do Pedido</p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-gray-900 text-sm font-medium">{item.name}</p>
                    <p className="text-gray-400 text-xs">Qtd: {item.qty}</p>
                  </div>
                  <p className="text-gray-900 font-semibold text-sm">
                    R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t-2 border-gray-200">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-[#0052B4] text-lg">
                R$ {order.total.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Rastreamento */}
          {order.tracking && (
            <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <div>
                <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide">Código de Rastreio</p>
                <p className="text-purple-900 font-mono font-bold text-sm">{order.tracking}</p>
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
              Fechar
            </button>
            <button className="flex-1 px-4 py-2.5 bg-[#0052B4] text-white rounded-lg text-sm font-semibold hover:bg-[#003d8a]">
              Imprimir Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PedidosPage() {
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = MOCK_ORDERS.filter((o) => {
    const matchStatus = statusFilter === 'Todos' || o.status === statusFilter;
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Pedidos</h2>
        <p className="text-gray-500 text-sm mt-1">{MOCK_ORDERS.length} pedidos no total</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(STATUS_CONFIG).map(([status, cfg]) => {
          const count = MOCK_ORDERS.filter((o) => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? 'Todos' : status)}
              className={`p-3 rounded-xl border text-left transition-all ${
                statusFilter === status
                  ? `${cfg.bg} border-transparent`
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
            >
              <p className={`text-xl font-bold ${cfg.text}`}>{count}</p>
              <p className="text-xs text-gray-500 leading-tight mt-0.5">{status}</p>
            </button>
          );
        })}
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por número ou cliente..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4] bg-white"
        >
          {ALL_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="text-left px-6 py-3 font-medium">Número</th>
                <th className="text-left px-6 py-3 font-medium">Data</th>
                <th className="text-left px-6 py-3 font-medium">Cliente</th>
                <th className="text-left px-6 py-3 font-medium">Total</th>
                <th className="text-left px-6 py-3 font-medium">Status</th>
                <th className="text-left px-6 py-3 font-medium">Pagamento</th>
                <th className="text-right px-6 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const cfg = STATUS_CONFIG[order.status];
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-[#0052B4]">{order.id}</td>
                      <td className="px-6 py-4 text-gray-500">{order.date}</td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{order.customer}</p>
                        <p className="text-gray-400 text-xs">{order.email}</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        R$ {order.total.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${cfg.dot}`} />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{order.payment}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1.5 text-[#0052B4] text-xs font-semibold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-blue-100"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
