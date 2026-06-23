'use client';

import { useState, useEffect } from 'react';

const CATEGORIES = ['Notebooks', 'Monitores', 'Periféricos', 'Componentes', 'Impressoras', 'Redes', 'Acessórios', 'Desktops', 'Servidores'];

// Mock inicial de modelos pré-definidos (que normalmente viriam do banco de dados)
const INITIAL_MODELS = [
  {
    id: 1,
    modelName: 'Molde Desktop Dell Core i5',
    category: 'Desktops',
    image: 'https://placehold.co/150x150/0052B4/white?text=Dell+I5',
    price: 2500,
    description: 'Desktop Dell Optiplex Core i5, ideal para escritório.',
  },
  {
    id: 2,
    modelName: 'Molde Monitor Lenovo 19"',
    category: 'Monitores',
    image: 'https://placehold.co/150x150/23A79D/white?text=Lenovo+19',
    price: 450,
    description: 'Monitor Lenovo 19 polegadas com conexão VGA e DisplayPort.',
  },
  {
    id: 3,
    modelName: 'Molde Servidor HP Proliant',
    category: 'Servidores',
    image: 'https://placehold.co/150x150/1a1a2e/white?text=HP+Server',
    price: 8000,
    description: 'Servidor HP Proliant Rack, processador Xeon.',
  }
];

const EMPTY_MODEL = {
  modelName: '',
  category: '',
  image: '',
  price: '',
  description: '',
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

function ModelModal({ model, onSave, onClose }) {
  const [form, setForm] = useState(model ? { ...model } : { ...EMPTY_MODEL });

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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-gray-900 font-bold text-lg">
            {model ? 'Editar Modelo' : 'Novo Modelo'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nome do Molde */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Nome do Molde (Identificação) *</label>
              <input
                name="modelName"
                value={form.modelName}
                onChange={handleChange}
                required
                placeholder="Ex: Molde Padrão Notebook Dell"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4]"
              />
            </div>

            {/* Categoria Padrão */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Categoria Padrão</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4] bg-white"
              >
                <option value="">Nenhuma</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Preço Padrão */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Preço Padrão (R$)</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4]"
              />
            </div>

            {/* Imagem Padrão */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">URL da Imagem Padrão</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4]"
              />
            </div>

            {/* Descrição Padrão */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Descrição Padrão</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Esta descrição será preenchida automaticamente ao usar este molde..."
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
              {model ? 'Salvar Alterações' : 'Criar Modelo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ModelosPage() {
  const [models, setModels] = useState(INITIAL_MODELS);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editModel, setEditModel] = useState(null);
  const [toast, setToast] = useState(null);

  // Expor modelos para outros componentes através do localStorage (apenas para demonstração)
  useEffect(() => {
    localStorage.setItem('ecommerce_models', JSON.stringify(models));
  }, [models]);

  const filtered = models.filter((m) =>
    m.modelName.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    if (editModel) {
      setModels((prev) => prev.map((m) => (m.id === editModel.id ? { ...m, ...form } : m)));
    } else {
      setModels((prev) => [
        ...prev,
        { ...form, id: Date.now(), price: parseFloat(form.price || 0) },
      ]);
    }
    setModalOpen(false);
    setEditModel(null);
    setToast('Modelo salvo com sucesso!');
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir este modelo?')) {
      setModels((prev) => prev.filter((m) => m.id !== id));
      setToast('Modelo excluído!');
    }
  };

  const openEdit = (model) => {
    setEditModel(model);
    setModalOpen(true);
  };

  const openNew = () => {
    setEditModel(null);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Modelos</h2>
          <p className="text-gray-500 text-sm mt-1">Crie templates para facilitar o cadastro de novos produtos no estoque.</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#0052B4] hover:bg-[#003d8a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md shadow-blue-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Modelo
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar modelos..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(model => (
          <div key={model.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="h-32 bg-gray-50 flex items-center justify-center border-b border-gray-100 relative">
               <img src={model.image || 'https://placehold.co/150x150/e5e7eb/9ca3af?text=Sem+Foto'} alt={model.modelName} className="h-full object-contain mix-blend-multiply p-2" />
               <div className="absolute top-2 right-2 flex gap-1">
                 <button onClick={() => openEdit(model)} className="p-1.5 bg-white/90 hover:bg-white text-gray-600 hover:text-[#0052B4] rounded-md shadow-sm">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                 </button>
                 <button onClick={() => handleDelete(model.id)} className="p-1.5 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 rounded-md shadow-sm">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                 </button>
               </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-gray-900">{model.modelName}</h3>
              <p className="text-xs text-[#0052B4] font-semibold mt-1">{model.category || 'Sem Categoria'}</p>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{model.description || 'Sem descrição.'}</p>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">Preço Padrão:</span>
                <span className="font-bold text-gray-900">R$ {Number(model.price || 0).toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">Nenhum modelo encontrado.</p>
        </div>
      )}

      {modalOpen && (
        <ModelModal
          model={editModel}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditModel(null); }}
        />
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
