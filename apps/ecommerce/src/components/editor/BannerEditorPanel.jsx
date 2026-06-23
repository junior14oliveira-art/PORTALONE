'use client';

import { useState, useEffect } from 'react';
import { useEditor } from '@/context/EditorContext';

/**
 * Painel lateral que aparece ao lado direito quando um banner é selecionado no editor.
 * Permite editar: título, subtítulo, CTA, cor de fundo, imagem.
 */
export function BannerEditorPanel({ slideId, slideData, onUpdate, onClose }) {
  const [form, setForm] = useState({
    headline0: slideData.headline?.[0] ?? '',
    headline1: slideData.headline?.[1] ?? '',
    sub:       slideData.sub ?? '',
    cta:       slideData.cta ?? '',
    bgColor:   slideData.bgColor ?? '#0052B4',
  });

  const set = (key) => (val) => {
    setForm(f => ({ ...f, [key]: val }));
    onUpdate(slideId, {
      ...slideData,
      headline: key.startsWith('headline') ? (key === 'headline0' ? [val, form.headline1] : [form.headline0, val]) : slideData.headline,
      sub:      key === 'sub'      ? val : form.sub,
      cta:      key === 'cta'      ? val : form.cta,
      bgColor:  key === 'bgColor'  ? val : form.bgColor,
    });
  };

  return (
    <div className="fixed right-0 top-[52px] bottom-0 w-80 bg-[#1a1a2e] border-l border-white/10 z-[9998] flex flex-col shadow-2xl overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div>
          <p className="text-white font-bold text-sm">Editar Banner</p>
          <p className="text-white/40 text-xs">Slide {(slideId ?? 0) + 1}</p>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-5 p-5">
        {/* Título linha 1 */}
        <Field label="Título (linha 1)" value={form.headline0} onChange={set('headline0')} />
        {/* Título linha 2 */}
        <Field label="Título (linha 2)" value={form.headline1} onChange={set('headline1')} />
        {/* Subtítulo */}
        <Field label="Subtítulo" value={form.sub} onChange={set('sub')} />
        {/* CTA */}
        <Field label="Botão CTA" value={form.cta} onChange={set('cta')} />

        {/* Cor de fundo */}
        <div className="flex flex-col gap-2">
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wide">Cor de Fundo</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={form.bgColor}
              onChange={e => set('bgColor')(e.target.value)}
              className="w-12 h-10 rounded-lg border-0 cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={form.bgColor}
              onChange={e => set('bgColor')(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#23A79D]"
            />
          </div>
          {/* Paleta de cores rápidas */}
          <div className="flex gap-2 flex-wrap mt-1">
            {['#0052B4','#003F8A','#1a1a2e','#0e7a74','#23A79D','#7c3aed','#b91c1c','#d97706'].map(c => (
              <button key={c} onClick={() => set('bgColor')(c)}
                title={c}
                className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 ${form.bgColor === c ? 'border-white scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="text-white/30 text-xs text-center">
            💡 As alterações são aplicadas em tempo real. Clique em <strong className="text-white/50">Salvar</strong> na barra superior para persistir.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/50 text-xs font-semibold uppercase tracking-wide">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#23A79D] focus:border-transparent transition-all placeholder:text-white/20"
      />
    </div>
  );
}
