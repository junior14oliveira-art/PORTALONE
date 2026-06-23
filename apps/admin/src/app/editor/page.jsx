"use client";

import { useState } from 'react';

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState('banners');

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0A]">
      
      {/* Sidebar Editor */}
      <div className="w-[320px] min-w-[320px] border-r border-[rgba(255,255,255,0.08)] bg-[#111111] flex flex-col">
        <div className="p-5 border-b border-[rgba(255,255,255,0.08)]">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF6600]">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
            </svg>
            Editor Visual
          </h2>
          <p className="text-xs text-[#888888] mt-1">Altere o conteúdo do seu site em tempo real.</p>
        </div>

        <div className="flex border-b border-[rgba(255,255,255,0.08)]">
          <button 
            onClick={() => setActiveTab('banners')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'banners' ? 'text-[#FF6600] border-b-2 border-[#FF6600]' : 'text-[#666] hover:text-[#aaa]'}`}
          >
            Banners
          </button>
          <button 
            onClick={() => setActiveTab('theme')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'theme' ? 'text-[#FF6600] border-b-2 border-[#FF6600]' : 'text-[#666] hover:text-[#aaa]'}`}
          >
            Tema & Cores
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div className="glass-card p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-white">Banner Principal 1</h3>
                  <div className="w-8 h-4 bg-[#FF6600] rounded-full relative cursor-pointer">
                    <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-[#888] mb-1 block">URL da Imagem</label>
                    <input type="text" defaultValue="https://images.unsplash.com/photo-1517336714731-489689fd1ca8" className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-white focus:border-[#FF6600] focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-[#888] mb-1 block">Título</label>
                    <input type="text" defaultValue="Tecnologia de Ponta para sua Empresa" className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-white focus:border-[#FF6600] focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-[#888] mb-1 block">Subtítulo</label>
                    <textarea rows="2" defaultValue="Servidores, Workstations e Redes com o melhor custo-benefício." className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-white focus:border-[#FF6600] focus:outline-none"></textarea>
                  </div>
                  <div>
                    <label className="text-xs text-[#888] mb-1 block">Link do Botão</label>
                    <input type="text" defaultValue="/catalogo" className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-white focus:border-[#FF6600] focus:outline-none" />
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 opacity-70">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-white">Banner Principal 2</h3>
                  <div className="w-8 h-4 bg-[#333] rounded-full relative cursor-pointer">
                    <div className="w-3 h-3 bg-[#888] rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                  </div>
                </div>
                <div className="text-xs text-[#888] text-center py-4">
                  Ative este banner para editá-lo.
                </div>
              </div>

              <button className="w-full border border-dashed border-[rgba(255,255,255,0.2)] rounded-lg py-3 text-sm font-medium text-[#888] hover:text-white hover:border-[rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Adicionar Slide
              </button>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Cores da Marca</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-[#888]">Cor Principal</label>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#0052B4] shadow-sm border border-[rgba(255,255,255,0.1)]"></div>
                      <span className="text-xs font-mono text-white">#0052B4</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-[#888]">Cor de Destaque</label>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#FF6B00] shadow-sm border border-[rgba(255,255,255,0.1)]"></div>
                      <span className="text-xs font-mono text-white">#FF6B00</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-[#888]">Fundo da Página</label>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#F7F8FA] shadow-sm border border-[rgba(255,255,255,0.1)]"></div>
                      <span className="text-xs font-mono text-white">#F7F8FA</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[rgba(255,255,255,0.08)] my-4"></div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Tipografia</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-[#888] mb-1 block">Fonte Principal</label>
                    <select className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-white focus:border-[#FF6600] focus:outline-none">
                      <option>Inter</option>
                      <option>Roboto</option>
                      <option>Poppins</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-[rgba(255,255,255,0.08)] bg-[#0D0D0D]">
          <button className="w-full bg-[#FF6600] hover:bg-[#E65C00] text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(255,102,0,0.3)] hover:shadow-[0_0_20px_rgba(255,102,0,0.5)]">
            Publicar Alterações
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-[#050505] relative flex flex-col items-center justify-center p-8">
        
        {/* Device Switcher */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] p-1.5 rounded-full z-10 shadow-lg">
          <button className="w-8 h-8 rounded-full bg-[#333] text-white flex items-center justify-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-[#222] text-[#888] flex items-center justify-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>
          </button>
        </div>

        {/* Browser Mockup */}
        <div className="w-full max-w-[1280px] h-full flex flex-col bg-white rounded-t-xl overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.1)]">
          <div className="h-10 bg-[#e0e0e0] border-b border-[#ccc] flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="flex-1 ml-4 flex justify-center">
              <div className="bg-white text-xs text-[#555] px-4 py-1 rounded-md w-full max-w-sm text-center flex items-center justify-center gap-2 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                portalone.com.br
              </div>
            </div>
          </div>
          
          {/* Iframe to local frontend */}
          <iframe 
            src="http://localhost:3000" 
            className="w-full flex-1 bg-[#F7F8FA] border-none"
            title="Preview PORTALONE"
          />
        </div>

      </div>

    </div>
  );
}
