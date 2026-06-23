'use client';

import { useState } from 'react';

const KPI_CARDS = [
  {
    label: 'Vendas Hoje',
    value: 'R$ 4.820,00',
    change: '+12,4%',
    positive: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bg: 'bg-blue-50',
    color: 'text-[#0052B4]',
  },
  {
    label: 'Pedidos Pendentes',
    value: '18',
    change: '+3 hoje',
    positive: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    bg: 'bg-yellow-50',
    color: 'text-yellow-600',
  },
  {
    label: 'Produtos Ativos',
    value: '342',
    change: '+7 este mês',
    positive: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    bg: 'bg-teal-50',
    color: 'text-[#23A79D]',
  },
  {
    label: 'Clientes Novos',
    value: '89',
    change: '-2,1% vs semana passada',
    positive: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    bg: 'bg-purple-50',
    color: 'text-purple-600',
  },
];

const RECENT_ORDERS = [
  { id: '#ORD-8821', customer: 'Carlos Mendes', product: 'Notebook Dell Inspiron 15', total: 'R$ 3.499,00', status: 'Enviado', date: '23/06/2026' },
  { id: '#ORD-8820', customer: 'Ana Souza', product: 'Mouse Logitech MX Master 3', total: 'R$ 399,00', status: 'Em Processamento', date: '23/06/2026' },
  { id: '#ORD-8819', customer: 'João Pereira', product: 'Monitor Samsung 27" 4K', total: 'R$ 1.850,00', status: 'Aguardando Pagamento', date: '22/06/2026' },
  { id: '#ORD-8818', customer: 'Fernanda Lima', product: 'Teclado Mecânico Redragon', total: 'R$ 289,00', status: 'Entregue', date: '22/06/2026' },
  { id: '#ORD-8817', customer: 'Ricardo Torres', product: 'Headset HyperX Cloud II', total: 'R$ 459,00', status: 'Cancelado', date: '21/06/2026' },
];

const CHART_DATA = [
  { day: 'Seg', value: 62, amount: 'R$3.2k' },
  { day: 'Ter', value: 45, amount: 'R$2.3k' },
  { day: 'Qua', value: 78, amount: 'R$4.1k' },
  { day: 'Qui', value: 53, amount: 'R$2.8k' },
  { day: 'Sex', value: 91, amount: 'R$4.8k' },
  { day: 'Sáb', value: 70, amount: 'R$3.7k' },
  { day: 'Dom', value: 38, amount: 'R$2.0k' },
];

const STATUS_STYLES = {
  'Enviado': 'bg-purple-100 text-purple-700',
  'Em Processamento': 'bg-blue-100 text-blue-700',
  'Aguardando Pagamento': 'bg-yellow-100 text-yellow-700',
  'Entregue': 'bg-green-100 text-green-700',
  'Cancelado': 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const [hoveredBar, setHoveredBar] = useState(null);

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Bem-vindo de volta! Aqui está o resumo de hoje.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI_CARDS.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                <p className={`text-xs mt-1 font-medium ${card.positive ? 'text-green-600' : 'text-red-500'}`}>
                  {card.positive ? '↑' : '↓'} {card.change}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center flex-shrink-0`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Quick Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-gray-900 font-semibold">Vendas da Semana</h3>
              <p className="text-gray-400 text-xs mt-0.5">Últimos 7 dias</p>
            </div>
            <span className="text-[#23A79D] font-bold text-sm bg-teal-50 px-3 py-1 rounded-full">
              R$ 22.900,00
            </span>
          </div>

          {/* CSS Bar Chart */}
          <div className="flex items-end gap-3 h-48 px-2">
            {CHART_DATA.map((item, idx) => (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center gap-1.5 group"
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                <div className={`text-xs font-semibold text-gray-700 bg-gray-900 text-white px-2 py-1 rounded-md transition-opacity ${hoveredBar === idx ? 'opacity-100' : 'opacity-0'}`}>
                  {item.amount}
                </div>
                {/* Bar */}
                <div className="w-full relative flex items-end" style={{ height: '160px' }}>
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 cursor-pointer
                      ${hoveredBar === idx ? 'bg-[#0052B4]' : 'bg-[#23A79D]/60 group-hover:bg-[#23A79D]'}`}
                    style={{ height: `${item.value}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 font-medium">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">Resumo do Mês</h3>
          <div className="space-y-4">
            {[
              { label: 'Receita Total', value: 'R$ 98.320,00', pct: 85 },
              { label: 'Ticket Médio', value: 'R$ 287,50', pct: 62 },
              { label: 'Taxa de Conversão', value: '3,8%', pct: 38 },
              { label: 'Devoluções', value: '12 pedidos', pct: 12 },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{stat.label}</span>
                  <span className="font-semibold text-gray-900">{stat.value}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0052B4] to-[#23A79D] rounded-full"
                    style={{ width: `${stat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-gray-900 font-semibold">Pedidos Recentes</h3>
          <a href="/admin/pedidos" className="text-[#0052B4] text-sm font-medium hover:underline">
            Ver todos →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wide">
                <th className="text-left px-6 py-3 font-medium">Pedido</th>
                <th className="text-left px-6 py-3 font-medium">Cliente</th>
                <th className="text-left px-6 py-3 font-medium">Produto</th>
                <th className="text-left px-6 py-3 font-medium">Total</th>
                <th className="text-left px-6 py-3 font-medium">Status</th>
                <th className="text-left px-6 py-3 font-medium">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-semibold text-[#0052B4]">{order.id}</td>
                  <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500 truncate max-w-[180px]">{order.product}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
