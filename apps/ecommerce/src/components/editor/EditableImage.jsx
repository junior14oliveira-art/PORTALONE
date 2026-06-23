'use client';

import { useEditor } from '@/context/EditorContext';
import { useState } from 'react';

export function EditableImage({ id, field, defaults, className = '', ...props }) {
  const { editorMode, getContent, updateContent } = useEditor();
  const content = getContent(id, defaults);
  const src = content[field] ?? defaults[field] ?? '';

  const [editing, setEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(src);

  if (!editorMode) {
    return <img src={src} className={className} {...props} />;
  }

  const handleSave = () => {
    updateContent(id, { [field]: tempUrl });
    setEditing(false);
  };

  return (
    <div className={`relative inline-block ${className}`} style={{ width: props.width || '100%', height: props.height || '100%' }}>
      <img
        src={src}
        className={`w-full h-full object-contain ${props.imgClassName || ''}`}
        {...props}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setEditing(true);
        }}
      />
      
      {/* Overlay to indicate editability */}
      <div 
        className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all flex items-center justify-center cursor-pointer group"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setEditing(true);
        }}
      >
        <div className="bg-[#23A79D] text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
      </div>

      {editing && (
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a1a2e] p-4 rounded-xl shadow-2xl z-[9999] w-[300px] border border-white/10"
          onClick={e => e.stopPropagation()}
        >
          <p className="text-white text-xs font-bold mb-2">Alterar Imagem</p>
          <input
            type="text"
            value={tempUrl}
            onChange={e => setTempUrl(e.target.value)}
            placeholder="URL da imagem..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs mb-3 focus:outline-none focus:ring-2 focus:ring-[#23A79D]"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(false)}
              className="flex-1 px-3 py-1.5 rounded bg-white/10 text-white/70 hover:bg-white/20 hover:text-white text-xs font-bold transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-1.5 rounded bg-[#23A79D] text-white hover:bg-[#1b867e] text-xs font-bold transition-all"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
