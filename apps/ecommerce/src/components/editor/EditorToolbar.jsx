'use client';

import { useEditor } from '@/context/EditorContext';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function EditorToolbar() {
  const { editorMode, exitEditor, saveAll, resetAll, hasUnsaved, selectedElement, clearSelection } = useEditor();
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  if (!editorMode) return null;

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    saveAll();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      {/* ── Top Toolbar ─────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-[9999] flex items-center gap-3 px-4 py-2 shadow-xl select-none"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0052B4 100%)', height: '52px' }}
      >
        {/* Mode badge */}
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
          <span className="w-2 h-2 rounded-full bg-[#23A79D] animate-pulse" />
          <span className="text-white text-xs font-bold uppercase tracking-widest">Modo Editor</span>
        </div>

        {/* Hint */}
        <p className="text-white/50 text-xs hidden lg:block">
          {selectedElement ? `Editando: ${selectedElement.label}` : 'Clique em qualquer elemento para editar'}
        </p>

        {/* Page Selector */}
        <div className="hidden md:flex items-center gap-2 ml-4">
          <span className="text-white/50 text-xs">Página:</span>
          <select 
            value={pathname} 
            onChange={e => router.push(e.target.value)}
            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-md px-2 py-1 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#23A79D] cursor-pointer transition-colors"
          >
            <option value="/" className="text-black">Página Inicial</option>
            <option value="/catalogo" className="text-black">Catálogo</option>
            <option value="/carrinho" className="text-black">Carrinho</option>
            <option value="/checkout" className="text-black">Checkout</option>
          </select>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Desfazer seleção */}
          {selectedElement && (
            <button onClick={clearSelection}
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/><path d="m12 5-7 7 7 7"/>
              </svg>
              Voltar
            </button>
          )}

          {/* Reset */}
          <button onClick={() => { if (confirm('Resetar todas as edições?')) resetAll(); }}
            className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs px-3 py-1.5 rounded-lg border border-red-500/30 hover:border-red-400/50 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
            </svg>
            Resetar
          </button>

          {/* Sair */}
          <button onClick={exitEditor}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
            Sair do Editor
          </button>

          {/* Salvar */}
          <button onClick={handleSave} disabled={saving || !hasUnsaved}
            className={`flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-lg font-bold transition-all shadow-sm
              ${saved ? 'bg-green-500 text-white' : hasUnsaved
                ? 'bg-white text-[#0052B4] hover:bg-gray-100'
                : 'bg-white/20 text-white/40 cursor-not-allowed'}`}>
            {saving ? (
              <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            ) : saved ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
              </svg>
            )}
            {saved ? 'Salvo!' : saving ? 'Salvando...' : 'Salvar'}
            {hasUnsaved && !saved && <span className="w-1.5 h-1.5 rounded-full bg-orange-400 ml-1" />}
          </button>
        </div>
      </div>

      {/* Spacer para não sobrepor conteúdo */}
      <div style={{ height: '52px' }} />
    </>
  );
}
