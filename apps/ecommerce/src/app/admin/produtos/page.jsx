'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const CATEGORIES = ['Notebooks', 'Monitores', 'Periféricos', 'Componentes', 'Impressoras', 'Redes', 'Acessórios'];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Notebook Dell Inspiron 15',
    sku: 'NB-DELL-I15-001',
    category: 'Notebooks',
    price: 3499.0,
    pricePromo: 3199.0,
    stock: 12,
    status: 'Ativo',
    image: 'https://placehold.co/60x60/0052B4/white?text=Dell',
    description: 'Notebook Dell com processador Intel Core i5, 8GB RAM, 256GB SSD.',
  },
  {
    id: 2,
    name: 'Monitor Samsung 27" 4K',
    sku: 'MON-SAM-27-4K',
    category: 'Monitores',
    price: 1849.9,
    pricePromo: '',
    stock: 8,
    status: 'Ativo',
    image: 'https://placehold.co/60x60/23A79D/white?text=Sam',
    description: 'Monitor Samsung 4K UHD, 60Hz, HDR10, HDMI e DisplayPort.',
  },
  {
    id: 3,
    name: 'Mouse Logitech MX Master 3',
    sku: 'PER-LOG-MX3-002',
    category: 'Periféricos',
    price: 399.0,
    pricePromo: 349.0,
    stock: 34,
    status: 'Ativo',
    image: 'https://placehold.co/60x60/6366f1/white?text=Log',
    description: 'Mouse sem fio ergonômico com scroll MagSpeed e Bluetooth.',
  },
  {
    id: 4,
    name: 'Teclado Mecânico Redragon K552',
    sku: 'PER-RED-K552-003',
    category: 'Periféricos',
    price: 289.9,
    pricePromo: '',
    stock: 21,
    status: 'Ativo',
    image: 'https://placehold.co/60x60/ef4444/white?text=Red',
    description: 'Teclado mecânico compacto TKL com switches Red e LED RGB.',
  },
  {
    id: 5,
    name: 'Headset HyperX Cloud II',
    sku: 'PER-HYP-CL2-004',
    category: 'Periféricos',
    price: 459.0,
    pricePromo: 399.0,
    stock: 0,
    status: 'Inativo',
    image: 'https://placehold.co/60x60/f59e0b/white?text=Hyp',
    description: 'Headset gamer 7.1 virtual surround, almofadas de espuma.',
  },
  {
    id: 6,
    name: 'Placa de Vídeo RTX 4060',
    sku: 'COMP-NV-RTX4060',
    category: 'Componentes',
    price: 2199.0,
    pricePromo: '',
    stock: 5,
    status: 'Ativo',
    image: 'https://placehold.co/60x60/1a1a2e/white?text=RTX',
    description: 'GPU NVIDIA GeForce RTX 4060 8GB GDDR6, DLSS 3.',
  },
];

const EMPTY_FORM = {
  name: '',
  sku: '',
  category: '',
  price: '',
  pricePromo: '',
  stock: '',
  description: '',
  image: '',
  status: 'Ativo',
};

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4">
      <svg className="w-5 h-5 text-[#23A79D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function ConfirmModal({ product, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-gray-900 font-bold text-center text-lg">Excluir Produto</h3>
        <p className="text-gray-500 text-sm text-center mt-2">
          Tem certeza que deseja excluir <strong>{product?.name}</strong>? Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50">
            Cancelar
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, models, onSave, onClose }) {
  const [form, setForm] = useState(product ? { ...product } : { ...EMPTY_FORM });

  const handleModelSelect = (e) => {
    const modelId = parseInt(e.target.value, 10);
    const model = models?.find(m => m.id === modelId);
    if (model) {
      setForm(prev => ({
        ...prev,
        name: model.modelName || '',
        category: model.category || '',
        image: model.image || '',
        price: model.price || '',
        description: model.description || '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-gray-900 font-bold text-lg">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Selecionar Modelo (Apenas para Novos) */}
          {!product && models && models.length > 0 && (
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6">
              <label className="block text-xs font-semibold text-[#0052B4] mb-1.5 uppercase tracking-wide">Usar Modelo Predefinido</label>
              <select onChange={handleModelSelect} className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0052B4]">
                <option value="">Preencher manualmente...</option>
                {models.map(m => <option key={m.id} value={m.id}>{m.modelName}</option>)}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nome */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Nome do Produto *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Ex: Notebook Dell Inspiron 15"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4]"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">SKU *</label>
              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                required
                placeholder="Ex: NB-DELL-001"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4]"
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Categoria *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4] bg-white"
              >
                <option value="">Selecione...</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Preço */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Preço (R$) *</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4]"
              />
            </div>

            {/* Preço Promocional */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Preço Promocional (R$)</label>
              <input
                name="pricePromo"
                value={form.pricePromo}
                onChange={handleChange}
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00 (opcional)"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4]"
              />
            </div>

            {/* Estoque */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Estoque *</label>
              <input
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                type="number"
                min="0"
                placeholder="0"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4]"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4] bg-white"
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>

            {/* URL da Imagem */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">URL da Imagem</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4]"
              />
            </div>

            {/* Descrição */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Descrição</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Descrição detalhada do produto..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4] resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#0052B4] text-white text-sm font-semibold hover:bg-[#003d8a] transition-colors"
            >
              {product ? 'Salvar Alterações' : 'Adicionar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProdutosPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ecommerce_models');
    if (saved) {
      try {
        setModels(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    if (editProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editProduct.id ? { ...p, ...form } : p)));
    } else {
      setProducts((prev) => [
        ...prev,
        { ...form, id: Date.now(), price: parseFloat(form.price), stock: parseInt(form.stock, 10) },
      ]);
    }
    setModalOpen(false);
    setEditProduct(null);
    setToast('Produto salvo com sucesso!');
  };

  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    setToast('Produto excluído com sucesso!');
  };

  const syncAPI = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/produtos/sync', { cache: 'no-store' });
      const data = await res.json();
      console.log('Sync API Response:', data);

      if (data && data.success && data.produtos) {
        // Find products that are not yet imported
        const newProducts = [];
        data.produtos.forEach(p => {
          // Check if SKU (id_unico) already exists
          const exists = products.find(existing => existing.sku === p.id_unico);
          if (!exists) {
            newProducts.push({
              id: p.id_unico,
              name: p.nome_exibicao || p.modelo || 'Produto sem nome',
              sku: p.id_unico,
              category: 'Computadores', // default
              price: parseFloat(p.preco) || parseFloat(p.preco_venda) || 0,
              pricePromo: '',
              stock: parseInt(p.quantidade_disponivel) || parseInt(p.quantidade_estoque) || 0,
              description: `Marca: ${p.marca || 'N/A'} | Processador: ${p.processador || 'N/A'}`,
              image: '',
              status: 'Ativo' // Adds as Ativo automatically
            });
          }
        });
        if (newProducts.length > 0) {
          setProducts(prev => {
            const updated = [...prev, ...newProducts];
            console.log('Updated products length:', updated.length);
            return updated;
          });
          setToast(`${newProducts.length} produtos importados automaticamente do estoque!`);
        } else {
          setToast('Estoque já está sincronizado.');
        }
      } else {
        console.error('Invalid API data format:', data);
        setToast('Formato de dados inválido da API.');
      }
    } catch (e) {
      console.error('Sync Error:', e);
      setToast('Erro ao sincronizar com estoque: ' + e.message);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    // Auto sync on mount
    syncAPI();
  }, []);

  const openEdit = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const openNew = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Produtos</h2>
          <p className="text-gray-500 text-sm mt-1">{products.length} produtos cadastrados</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/admin/modelos"
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            Gerenciar Modelos
          </Link>
          <button
            onClick={syncAPI}
            disabled={syncing}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {syncing ? (
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-[#23A79D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            Sincronizar Estoque
          </button>
          <button
            onClick={openNew}
            className="flex items-center justify-center gap-2 bg-[#0052B4] hover:bg-[#003d8a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md shadow-blue-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Produto
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, SKU ou categoria..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="text-left px-6 py-3 font-medium">Imagem</th>
                <th className="text-left px-6 py-3 font-medium">Nome / SKU</th>
                <th className="text-left px-6 py-3 font-medium">Categoria</th>
                <th className="text-left px-6 py-3 font-medium">Preço</th>
                <th className="text-left px-6 py-3 font-medium">Estoque</th>
                <th className="text-left px-6 py-3 font-medium">Status</th>
                <th className="text-right px-6 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={product.image || 'https://placehold.co/48x48/e5e7eb/9ca3af?text=?'}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                      <p className="text-gray-400 text-xs font-mono mt-0.5">{product.sku}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-[#0052B4] text-xs font-medium px-2.5 py-1 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        R$ {Number(product.price).toFixed(2).replace('.', ',')}
                      </p>
                      {product.pricePromo && (
                        <p className="text-[#23A79D] text-xs font-medium mt-0.5">
                          Promo: R$ {Number(product.pricePromo).toFixed(2).replace('.', ',')}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold text-sm ${product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-yellow-600' : 'text-gray-900'}`}>
                        {product.stock}
                        {product.stock === 0 && <span className="text-xs font-normal ml-1">(Esgotado)</span>}
                        {product.stock > 0 && product.stock <= 5 && <span className="text-xs font-normal ml-1">(Baixo)</span>}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${product.status === 'Ativo' ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 text-gray-400 hover:text-[#0052B4] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteTarget(product)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {modalOpen && (
        <ProductModal
          product={editProduct}
          models={models}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditProduct(null); }}
        />
      )}
      {deleteTarget && (
        <ConfirmModal
          product={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
