"use client";

import { useState } from 'react';

const MOCK_PRODUCTS = [
  { id: '1', name: 'MacBook Pro 14" M3 Pro', sku: 'MBP-14-M3', price: 18999.00, stock: 12, category: 'Laptops', active: true, img: 'https://placehold.co/100x100/1A1A1A/FFFFFF?text=MBP' },
  { id: '2', name: 'iPhone 15 Pro Max 256GB', sku: 'IP15-PM-256', price: 9299.00, stock: 5, category: 'Smartphones', active: true, img: 'https://placehold.co/100x100/1A1A1A/FFFFFF?text=IP15' },
  { id: '3', name: 'Dell UltraSharp 32" 4K', sku: 'DELL-U3223QE', price: 4500.00, stock: 3, category: 'Monitores', active: false, img: 'https://placehold.co/100x100/1A1A1A/FFFFFF?text=DELL' },
  { id: '4', name: 'Logitech MX Master 3S', sku: 'LOGI-MX3S', price: 650.00, stock: 45, category: 'Periféricos', active: true, img: 'https://placehold.co/100x100/1A1A1A/FFFFFF?text=MX' },
  { id: '5', name: 'Keychron Q1 Pro', sku: 'KEY-Q1P', price: 1290.00, stock: 8, category: 'Periféricos', active: true, img: 'https://placehold.co/100x100/1A1A1A/FFFFFF?text=Q1' },
  { id: '6', name: 'PlayStation 5 Slim', sku: 'PS5-SLIM', price: 3800.00, stock: 0, category: 'Consoles', active: true, img: 'https://placehold.co/100x100/1A1A1A/FFFFFF?text=PS5' },
  { id: '7', name: 'AirPods Pro 2ª Geração', sku: 'APP-2G', price: 1890.00, stock: 22, category: 'Áudio', active: true, img: 'https://placehold.co/100x100/1A1A1A/FFFFFF?text=APP' },
  { id: '8', name: 'iPad Air 5ª Geração', sku: 'IPAD-A5', price: 4999.00, stock: 15, category: 'Tablets', active: true, img: 'https://placehold.co/100x100/1A1A1A/FFFFFF?text=IPAD' },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Produtos</h1>
          <p className="text-sm text-[#888888] mt-1">Gerencie seu catálogo de produtos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#FF6600] hover:bg-[#E65C00] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Novo Produto
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex gap-4">
        <input 
          type="text" 
          placeholder="Buscar produtos..." 
          className="bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-2 text-sm text-white w-full max-w-sm focus:outline-none focus:border-[#FF6600]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF6600]">
          <option>Todas as Categorias</option>
          <option>Laptops</option>
          <option>Smartphones</option>
          <option>Periféricos</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>SKU</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Categoria</th>
              <th>Status</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(prod => (
              <tr key={prod.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={prod.img} alt={prod.name} className="w-10 h-10 rounded-md border border-[rgba(255,255,255,0.08)]" />
                    <span className="font-medium text-white">{prod.name}</span>
                  </div>
                </td>
                <td className="text-sm">{prod.sku}</td>
                <td className="font-medium text-white">R$ {prod.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                <td>
                  <span className={`text-sm ${prod.stock === 0 ? 'text-[#EF4444] font-bold' : prod.stock < 10 ? 'text-[#F59E0B]' : ''}`}>
                    {prod.stock} un
                  </span>
                </td>
                <td className="text-sm">{prod.category}</td>
                <td>
                  <span className={`status-badge ${prod.active ? 'status-green' : 'status-yellow'}`}>
                    {prod.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="text-right space-x-3">
                  <button className="text-[#3B82F6] hover:text-white transition-colors text-sm">Editar</button>
                  <button className="text-[#EF4444] hover:text-white transition-colors text-sm">Excluir</button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 text-[#888888]">Nenhum produto encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Slide Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm" style={{ animation: 'fadeIn 0.2s' }}>
          <div className="w-[500px] h-full bg-[#1A1A1A] border-l border-[rgba(255,255,255,0.08)] shadow-2xl p-6 flex flex-col" style={{ animation: 'slideInLeft 0.3s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Novo Produto</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#888888] hover:text-white text-2xl">&times;</button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <div>
                <label className="block text-sm text-[#888888] mb-1">Nome</label>
                <input type="text" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FF6600]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#888888] mb-1">SKU</label>
                  <input type="text" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FF6600]" />
                </div>
                <div>
                  <label className="block text-sm text-[#888888] mb-1">Categoria</label>
                  <select className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FF6600]">
                    <option>Laptops</option>
                    <option>Smartphones</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#888888] mb-1">Preço (R$)</label>
                <input type="number" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FF6600]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#888888] mb-1">Estoque</label>
                  <input type="number" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FF6600]" />
                </div>
                <div>
                  <label className="block text-sm text-[#888888] mb-1">Peso (g)</label>
                  <input type="number" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FF6600]" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#888888] mb-1">Descrição</label>
                <textarea rows="4" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FF6600]"></textarea>
              </div>
            </div>
            
            <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.08)] flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-[#888888] hover:text-white transition-colors">Cancelar</button>
              <button className="bg-[#FF6600] hover:bg-[#E65C00] px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors">Salvar Produto</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
