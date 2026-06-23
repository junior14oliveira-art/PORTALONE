'use client';

import { useState } from 'react';

const MOCK_CLIENTES = [
  { id: 1, nome: 'João Silva', email: 'joao@empresa.com.br', telefone: '(11) 91234-5678', pedidos: 4, totalGasto: 28700, cidade: 'São Paulo / SP', status: 'ativo', desde: '15/01/2025' },
  { id: 2, nome: 'Maria Oliveira', email: 'maria@corp.com', telefone: '(21) 98765-4321', pedidos: 2, totalGasto: 9400, cidade: 'Rio de Janeiro / RJ', status: 'ativo', desde: '03/03/2025' },
  { id: 3, nome: 'Carlos Pereira', email: 'carlos@tech.io', telefone: '(31) 97654-3210', pedidos: 7, totalGasto: 62300, cidade: 'Belo Horizonte / MG', status: 'vip', desde: '20/09/2024' },
  { id: 4, nome: 'Ana Lima', email: 'ana@startup.com', telefone: '(51) 96543-2109', pedidos: 1, totalGasto: 1890, cidade: 'Porto Alegre / RS', status: 'ativo', desde: '10/06/2025' },
  { id: 5, nome: 'Pedro Santos', email: 'pedro@industria.com', telefone: '(11) 95432-1098', pedidos: 0, totalGasto: 0, cidade: 'São Paulo / SP', status: 'inativo', desde: '01/06/2025' },
  { id: 6, nome: 'Fernanda Costa', email: 'fernanda@gov.br', telefone: '(61) 94321-0987', pedidos: 12, totalGasto: 148500, cidade: 'Brasília / DF', status: 'vip', desde: '12/03/2024' },
];

function formatBRL(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const STATUS_BADGE = {
  ativo: 'bg-green-100 text-green-700',
  vip: 'bg-amber-100 text-amber-700',
  inativo: 'bg-gray-100 text-gray-500',
};

export default function ClientesPage() {
  const [search, setSearch] = useState('');
  const [selectedCliente, setSelectedCliente] = useState(null);

  const filtered = MOCK_CLIENTES.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.cidade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Clientes</h1>
          <p className="text-sm text-gray-500 mt-1">{MOCK_CLIENTES.length} clientes cadastrados</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0052B4] text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#003F8A] transition-all shadow-sm text-sm">
          + Exportar CSV
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total de Clientes', value: MOCK_CLIENTES.length, color: 'text-[#0052B4]' },
          { label: 'Clientes VIP', value: MOCK_CLIENTES.filter(c => c.status === 'vip').length, color: 'text-amber-600' },
          { label: 'Ticket Médio', value: formatBRL(MOCK_CLIENTES.reduce((s, c) => s + c.totalGasto, 0) / MOCK_CLIENTES.filter(c => c.pedidos > 0).length), color: 'text-green-600' },
          { label: 'Receita Total', value: formatBRL(MOCK_CLIENTES.reduce((s, c) => s + c.totalGasto, 0)), color: 'text-purple-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">{k.label}</p>
            <p className={`text-xl font-black mt-1 ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nome, e-mail ou cidade..."
          className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4] bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3.5 font-bold text-gray-600 text-xs uppercase tracking-wide">Cliente</th>
                <th className="text-left px-5 py-3.5 font-bold text-gray-600 text-xs uppercase tracking-wide">Contato</th>
                <th className="text-left px-5 py-3.5 font-bold text-gray-600 text-xs uppercase tracking-wide">Cidade</th>
                <th className="text-center px-5 py-3.5 font-bold text-gray-600 text-xs uppercase tracking-wide">Pedidos</th>
                <th className="text-right px-5 py-3.5 font-bold text-gray-600 text-xs uppercase tracking-wide">Total Gasto</th>
                <th className="text-center px-5 py-3.5 font-bold text-gray-600 text-xs uppercase tracking-wide">Status</th>
                <th className="text-center px-5 py-3.5 font-bold text-gray-600 text-xs uppercase tracking-wide">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0052B4] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {c.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{c.nome}</p>
                        <p className="text-xs text-gray-400">Desde {c.desde}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-gray-700">{c.email}</p>
                    <p className="text-xs text-gray-400">{c.telefone}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{c.cidade}</td>
                  <td className="px-5 py-4 text-center">
                    <span className="font-bold text-gray-900">{c.pedidos}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="font-bold text-gray-900">{formatBRL(c.totalGasto)}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${STATUS_BADGE[c.status]}`}>
                      {c.status === 'vip' ? '⭐ VIP' : c.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => setSelectedCliente(c)}
                      className="text-[#0052B4] hover:underline font-medium text-xs"
                    >
                      Ver perfil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de perfil */}
      {selectedCliente && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCliente(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#0052B4] text-white flex items-center justify-center font-black text-xl">
                {selectedCliente.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">{selectedCliente.nome}</h2>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_BADGE[selectedCliente.status]}`}>
                  {selectedCliente.status.toUpperCase()}
                </span>
              </div>
              <button onClick={() => setSelectedCliente(null)} className="ml-auto text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['E-mail', selectedCliente.email],
                ['Telefone', selectedCliente.telefone],
                ['Cidade', selectedCliente.cidade],
                ['Cliente desde', selectedCliente.desde],
                ['Pedidos realizados', selectedCliente.pedidos],
                ['Total gasto', formatBRL(selectedCliente.totalGasto)],
              ].map(([k, v]) => (
                <div key={k} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 font-medium">{k}</p>
                  <p className="font-bold text-gray-900 mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <a href={`mailto:${selectedCliente.email}`} className="flex-1 bg-[#0052B4] text-white font-bold py-2.5 rounded-xl hover:bg-[#003F8A] transition-all text-sm text-center">
                Enviar E-mail
              </a>
              <a href={`https://wa.me/55${selectedCliente.telefone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white font-bold py-2.5 rounded-xl hover:bg-[#20BB5A] transition-all text-sm text-center">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
