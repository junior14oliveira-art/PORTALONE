"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { HOME_CONTENT } from '../config/home-content';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/Toast';
import { useEditor } from '@/context/EditorContext';
import { BannerEditorPanel } from '@/components/editor/BannerEditorPanel';
import { EditableText } from '@/components/editor/EditableText';
import { EditableImage } from '@/components/editor/EditableImage';

/* ─── Hero Carousel Data ──────────────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    id: 0,
    headline: ['Soluções', 'Corporativas'],
    sub: 'Tecnologia Dell para o seu negócio',
    cta: 'Conheça a Linha Latitude',
    bgColor: '#0052B4',         // brand blue
    shapeColor: '#003F8A',      // brand-hover
    textWatermark: '4M&C',
    showLaptop: true,
  },
  {
    id: 1,
    headline: ['Notebooks para', 'Empresas'],
    sub: 'Linha Latitude com suporte ProSupport',
    cta: 'Ver Notebooks',
    bgColor: '#003F8A',
    shapeColor: '#002060',
    textWatermark: 'DELL',
    showLaptop: true,
  },
  {
    id: 2,
    headline: ['Servidores de', 'Alta Performance'],
    sub: 'PowerEdge — escalabilidade e confiabilidade',
    cta: 'Explorar Servidores',
    bgColor: '#1a1a2e',
    shapeColor: '#16213e',
    textWatermark: 'SRV',
    showLaptop: false,
  },
  {
    id: 3,
    headline: ['Locação de', 'Equipamentos'],
    sub: 'Frota gerenciada, suporte incluso, sem imobilizar capital',
    cta: 'Solicitar Proposta',
    bgColor: '#0e7a74',         // teal
    shapeColor: '#23A79D',
    textWatermark: 'RENT',
    showLaptop: false,
  },
];

/* ─── Hero Carousel ───────────────────────────────────────────────────────── */
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const { editorMode, selectedElement, selectElement, getContent, updateContent } = useEditor();

  const goTo = useCallback((idx) => {
    if (animating || editorMode) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 600);
  }, [animating, editorMode]);

  const prev = () => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = useCallback(() => goTo((current + 1) % HERO_SLIDES.length), [current, goTo]);

  // Auto-advance every 5 seconds (only if not in editor mode)
  useEffect(() => {
    if (editorMode) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next, editorMode]);

  // Handle slide selection in editor mode
  const handleSelect = (e) => {
    if (editorMode) {
      e.preventDefault();
      e.stopPropagation();
      selectElement({ id: `hero_slide_${current}`, type: 'hero_slide', index: current, label: `Hero Slide ${current + 1}` });
    }
  };

  // Merge default slide with editor content
  const slide = getContent(`hero_slide_${current}`, HERO_SLIDES[current]);

  return (
    <section
      className="w-full h-[300px] md:h-[450px] relative overflow-hidden shadow-sm"
      style={{ backgroundColor: slide.bgColor, transition: 'background-color 0.6s ease' }}
    >
      {/* ── Left arrow ──────────────────────────────────────────────────── */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center cursor-pointer z-30 shadow-md hover:bg-white hover:scale-105 transition-all group"
        aria-label="Anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-gray-700 group-hover:text-brand">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      {/* ── Right arrow ─────────────────────────────────────────────────── */}
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center cursor-pointer z-30 shadow-md hover:bg-white hover:scale-105 transition-all group"
        aria-label="Próximo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-gray-700 group-hover:text-brand">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>

      {/* ── Slide content ───────────────────────────────────────────────── */}
      <div
        key={current}
        onClick={handleSelect}
        className={`w-full h-full relative flex items-center ${editorMode ? 'cursor-pointer hover:outline hover:outline-4 hover:outline-[#23A79D] hover:outline-offset-[-4px]' : ''}`}
        style={{ animation: 'heroCrossfade 0.6s ease forwards' }}
      >
        {/* Laptop image (slides 0 & 1) */}
        {slide.showLaptop && (
          <div className="absolute left-10 md:left-20 bottom-0 z-20 w-[30%] md:w-[400px] h-[90%] flex items-end">
            <img
              src={slide.image || HOME_CONTENT.hero.laptopImage}
              alt="Notebook em destaque"
              className="w-full h-auto object-contain drop-shadow-2xl mix-blend-luminosity opacity-95 transition-transform hover:scale-105 duration-700"
            />
          </div>
        )}

        {/* Server / Equipment illustration (slides 2 & 3) */}
        {!slide.showLaptop && (
          <div className="absolute left-10 md:left-20 bottom-0 z-20 w-[28%] md:w-[320px] h-[85%] flex items-end opacity-80">
            <div
              className="w-full h-full rounded-2xl flex items-center justify-center"
              style={{ background: `${slide.shapeColor}99` }}
            >
              <span className="text-white/20 font-black text-6xl md:text-8xl tracking-tighter select-none">
                {slide.textWatermark}
              </span>
            </div>
          </div>
        )}

        {/* Center dark parallelogram */}
        <div
          className="absolute left-[20%] md:left-[30%] top-0 h-full w-[60%] md:w-[50%] transform -skew-x-[30deg] z-10 flex flex-col justify-center items-center shadow-2xl border-l-8"
          style={{
            backgroundColor: slide.shapeColor,
            borderLeftColor: `${slide.bgColor}99`,
            transition: 'background-color 0.6s ease',
          }}
        >
          <div className="transform skew-x-[30deg] text-center ml-10 flex flex-col items-center gap-3">
            <h2 className="text-white font-bold text-3xl md:text-5xl tracking-tight leading-tight text-shadow">
              {slide.headline[0]}<br/>{slide.headline[1]}
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-[200px] text-center hidden md:block">
              {slide.sub}
            </p>
            <button className="mt-2 bg-white px-6 py-3 rounded-md font-bold hover:opacity-90 transition-colors shadow-lg text-sm"
              style={{ color: slide.bgColor }}>
              {slide.cta}
            </button>
          </div>
        </div>

        {/* Right white parallelogram with watermark */}
        <div className="absolute right-[-20%] md:right-[-10%] top-0 h-full w-[45%] md:w-[35%] bg-white transform -skew-x-[30deg] z-10 flex justify-center items-center shadow-xl">
          <div className="transform skew-x-[30deg] mr-20 md:mr-32">
            <h1 className="font-black text-6xl md:text-[80px] tracking-tighter opacity-10"
              style={{ color: slide.bgColor }}>
              {slide.textWatermark}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Dots ────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30" role="tablist">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            aria-selected={idx === current}
            className="transition-all duration-300 rounded-full"
            style={{
              width: idx === current ? '28px' : '12px',
              height: '12px',
              backgroundColor: idx === current ? 'white' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>

      {/* ── Keyframe style injection ─────────────────────────────────────── */}
      <style>{`
        @keyframes heroCrossfade {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes cartBounce {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.35) rotate(-8deg); }
          60%  { transform: scale(0.9) rotate(4deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .cart-animate {
          animation: cartBounce 0.4s ease forwards;
        }
      `}</style>
      
      {/* Editor Panel Render */}
      {selectedElement?.type === 'hero_slide' && (
        <BannerEditorPanel
          slideId={`hero_slide_${selectedElement.index}`}
          slideData={getContent(`hero_slide_${selectedElement.index}`, HERO_SLIDES[selectedElement.index])}
          onUpdate={updateContent}
          onClose={selectElement} // passing clearSelection essentially
        />
      )}
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function Home() {
  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddToCart = (item, btnRef) => {
    const numericPrice = parseFloat(item.price.replace('.', '').replace(',', '.'));
    addToCart({
      id: item.id || item.name.replace(/\s+/g, '-').toLowerCase(),
      name: item.name,
      price: numericPrice,
      img: item.img,
    });

    // Toast notification
    const label = item.name.length > 30 ? item.name.slice(0, 30) + '...' : item.name;
    toast.success(`${label} adicionado ao carrinho! 🛒`);

    // Button bounce animation
    if (btnRef?.current) {
      btnRef.current.classList.add('cart-animate');
      setTimeout(() => btnRef.current?.classList.remove('cart-animate'), 400);
    }
  };

  return (
    <div className="w-full flex flex-col items-center pb-20 bg-background text-foreground">

      {/* HERO BANNER */}
      <HeroCarousel />

      {/* TRUST BADGES SECTION */}
      <section className="w-full py-8 bg-white border-b border-border shadow-sm relative z-10">
        <div className="container mx-auto px-4 max-w-5xl flex flex-wrap justify-center gap-8 md:gap-24">
          
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-14 h-14 rounded-full bg-muted-bg flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm">Suporte Especializado</h4>
              <p className="text-xs text-muted">Sem complicações e sem custos</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-14 h-14 rounded-full bg-muted-bg flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="2" y="6" rx="2" ry="2"/><path d="M18 13h3a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3"/><path d="M6 19v2"/><path d="M14 19v2"/><path d="M10 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><circle cx="7" cy="19" r="2"/><circle cx="15" cy="19" r="2"/></svg>
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm">Entrega Nacional</h4>
              <p className="text-xs text-muted">Frete para todo o Brasil</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-14 h-14 rounded-full bg-muted-bg flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm">Site Seguro</h4>
              <p className="text-xs text-muted">Compre com total segurança</p>
            </div>
          </div>

        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 mt-12 relative z-0">
        
        {/* CATEGORIES SECTION */}
        <div className="w-full bg-white border border-border rounded-xl px-6 py-4 flex items-center justify-between mb-10 shadow-sm">
          <div className="flex items-center gap-3 text-brand">
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>
             <EditableText id="sec_cat_title" field="title" defaults={{title: 'O que você procura hoje?'}} tag="h2" className="font-bold tracking-wide uppercase text-foreground" />
          </div>
          <div className="hidden sm:flex items-center gap-2 text-brand cursor-pointer hover:underline">
             <span className="font-bold text-sm">Ver todas as categorias</span>
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
        </div>

        {/* CIRCLE CATEGORIES */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-20">
          {HOME_CONTENT.categories.map((cat, i) => (
            <div key={i} className="flex flex-col items-center cursor-pointer group">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-border group-hover:border-brand group-hover:shadow-md transition-all overflow-hidden p-4">
                <EditableImage id={`cat_${i}`} field="img" defaults={cat} className="w-full h-full" imgClassName="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
              </div>
              <EditableText id={`cat_${i}`} field="name" defaults={cat} tag="span" className="text-sm text-foreground font-medium group-hover:text-brand text-center w-28 block" />
            </div>
          ))}
        </div>

        {/* RECOMENDADOS PARA VOCÊ SECTION */}
        <div className="flex flex-col lg:flex-row gap-6 mb-20">
           
           {/* Sidebar Title */}
           <div className="lg:w-1/4 bg-brand rounded-2xl flex flex-col justify-center p-8 text-white relative overflow-hidden shadow-lg">
              <div className="absolute right-0 top-0 w-32 h-32 bg-brand-hover rounded-bl-full opacity-50"></div>
              <div className="absolute left-0 bottom-0 w-24 h-24 bg-white/10 rounded-tr-full"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-1 bg-white mb-6 rounded-full"></div>
                <EditableText id="sec_rec_title" field="title" defaults={{title: 'Recomendados\nPara Você'}} tag="h2" className="text-3xl lg:text-4xl font-black uppercase leading-tight mb-4 whitespace-pre-line" />
                <EditableText id="sec_rec_sub" field="sub" defaults={{sub: 'Seleção exclusiva baseada no seu perfil corporativo.'}} tag="p" className="text-white/90 text-sm opacity-90" />
                <button className="mt-8 border border-white/30 hover:bg-white hover:text-brand px-6 py-2 rounded-full text-sm font-bold transition-colors w-fit">
                  Ver Mais
                </button>
              </div>
           </div>

           {/* Products Grid */}
           <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {HOME_CONTENT.produtosRecomendados.map((prod, i) => {
                const btnRef = { current: null };
                return (
                  <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-border flex flex-col relative group hover:shadow-md hover:border-brand/30 transition-all">
                     <div className="flex justify-between items-start mb-3">
                        {prod.estoque ? <span className="bg-brand text-white text-[10px] font-bold px-2 py-1 rounded">RESTAM {prod.estoque}</span> : <div></div>}
                        <div className="flex text-warning">
                           {[1,2,3,4,5].map(s => <svg key={s} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                        </div>
                     </div>
                     <div className="h-44 w-full flex items-center justify-center mb-4 p-4">
                        <EditableImage id={`rec_${i}`} field="img" defaults={prod} className="w-full h-full" imgClassName="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                     </div>
                     <EditableText id={`rec_${i}`} field="name" defaults={prod} tag="h3" className="text-sm text-foreground font-medium mb-4 line-clamp-2 h-[40px] group-hover:text-brand transition-colors" />
                      <div className="mt-auto border-t border-border pt-4 relative">
                        <div className="text-xl font-black text-[#25D366]">R$ <EditableText id={`rec_${i}`} field="price" defaults={prod} /> <span className="text-xs font-bold text-[#25D366]">no PIX</span></div>
                        <div className="text-xs text-muted mt-1">ou 10x sem juros</div>
                        {!prod.estoque && (
                          <button
                            ref={el => btnRef.current = el}
                            onClick={() => handleAddToCart(prod, btnRef)}
                            className="absolute right-0 bottom-0 w-10 h-10 rounded-full bg-brand text-white shadow-md flex items-center justify-center hover:bg-brand-hover transition-colors"
                            aria-label="Adicionar ao carrinho"
                          >
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                          </button>
                        )}
                     </div>
                  </div>
                );
              })}
           </div>
        </div>

        {/* MOSAIC BANNERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
           <div className="bg-foreground rounded-2xl overflow-hidden relative shadow-lg flex items-end p-8 h-[350px] group cursor-pointer">
              <div className="absolute top-6 left-6 z-10 font-bold text-white text-3xl opacity-20">DELL</div>
              <EditableImage id="mosaic_1" field="notebookBg" defaults={HOME_CONTENT.bannersMosaico} className="absolute right-[-5%] bottom-0 w-[80%] h-auto z-0" imgClassName="w-full h-full object-contain mix-blend-luminosity opacity-60 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute left-0 bottom-0 w-full p-8 text-white text-left bg-gradient-to-t from-black/80 to-transparent z-10">
                 <EditableText id="mosaic_1_sub" field="sub" defaults={{sub: 'Destaque Corporativo'}} tag="h3" className="font-medium text-brand text-sm tracking-widest uppercase mb-1" />
                 <EditableText id="mosaic_1_title" field="title" defaults={{title: 'LATITUDE 5420'}} tag="h2" className="font-black text-3xl mb-4" />
                 <span className="inline-block bg-brand text-white px-4 py-2 rounded text-sm font-bold hover:bg-white hover:text-brand transition-colors">Conferir</span>
              </div>
           </div>
           
           <div className="flex flex-col gap-6 h-[350px]">
              <div className="bg-white border border-border rounded-2xl overflow-hidden relative shadow-sm hover:shadow-md transition-shadow flex-1 flex items-center justify-center p-6 group cursor-pointer">
                 <EditableImage id="mosaic_2" field="monitor" defaults={HOME_CONTENT.bannersMosaico} className="w-[45%] absolute right-6 z-0" imgClassName="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                 <div className="absolute left-8 z-10">
                    <EditableText id="mosaic_2_sub" field="sub" defaults={{sub: 'Monitores'}} tag="h3" className="text-muted font-medium text-sm tracking-wider uppercase mb-1" />
                    <EditableText id="mosaic_2_title" field="title" defaults={{title: 'P2422H'}} tag="h2" className="text-foreground font-black text-2xl mb-2" />
                    <EditableText id="mosaic_2_desc" field="desc" defaults={{desc: 'Resolução Full HD'}} tag="p" className="text-sm text-brand font-bold" />
                 </div>
              </div>
              
              <div className="bg-brand rounded-2xl overflow-hidden relative shadow-sm hover:shadow-md transition-shadow h-[140px] flex items-center p-6 group cursor-pointer">
                 <div className="z-10 w-1/2">
                    <EditableText id="mosaic_3_sub" field="sub" defaults={{sub: 'Redes'}} tag="h3" className="text-white/80 font-medium text-xs tracking-wider uppercase mb-1" />
                    <EditableText id="mosaic_3_title" field="title" defaults={{title: 'Switch Dell\nS4048-ON'}} tag="h2" className="text-white font-black text-xl leading-tight whitespace-pre-line" />
                 </div>
                 <EditableImage id="mosaic_3" field="switch" defaults={HOME_CONTENT.bannersMosaico} className="w-[55%] absolute right-[-5%] z-0" imgClassName="w-full h-full object-contain mix-blend-luminosity opacity-80 group-hover:scale-105 transition-transform" />
              </div>
           </div>
        </div>

        {/* DESTAQUES SECTION */}
        <div className="w-full bg-white border border-border rounded-xl px-6 py-4 flex items-center justify-between mb-8 shadow-sm">
          <div className="flex items-center gap-3">
             <div className="w-2 h-6 bg-brand rounded-full"></div>
             <EditableText id="sec_hype_title" field="title" defaults={{title: 'Destaques da Semana'}} tag="h2" className="font-bold tracking-wide uppercase text-foreground" />
          </div>
          <div className="text-sm flex items-center gap-2">
             <span className="text-muted">Aproveite as ofertas</span>
          </div>
        </div>

        {/* HIGHLIGHT PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
           {HOME_CONTENT.produtosHype.map((item, i) => {
             const btnRef = { current: null };
             return (
               <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-border flex flex-col relative group hover:border-brand hover:shadow-md transition-all">
                   <div className="flex justify-between items-start mb-3">
                      {item.estoque ? <span className="bg-warning text-foreground text-[10px] font-bold px-2 py-1 rounded">OFERTA</span> : <div></div>}
                   </div>
                   <div className="h-36 w-full flex items-center justify-center mb-6 p-2">
                      <EditableImage id={`hype_${i}`} field="img" defaults={item} className="w-full h-full" imgClassName="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                   </div>
                   <EditableText id={`hype_${i}`} field="name" defaults={item} tag="h3" className="text-sm text-foreground font-medium mb-4 line-clamp-2 h-[40px] group-hover:text-brand transition-colors" />
                   
                   <div className="mt-auto border-t border-border pt-4">
                      <div className="text-xs text-muted mb-1 line-through">R$ {(parseFloat(item.price.replace('.','').replace(',','.')) * 1.15).toLocaleString('pt-BR', {minimumFractionDigits:2})}</div>
                      <div className="text-2xl font-black text-[#25D366]">R$ {item.price}</div>
                      <div className="text-xs font-bold text-[#25D366] mb-4 mt-0.5">no PIX ou até 12x no cartão</div>
                      
                      <button
                        ref={el => btnRef.current = el}
                        onClick={() => handleAddToCart(item, btnRef)}
                        className="w-full bg-brand text-white font-bold text-sm py-3 rounded-lg hover:bg-brand-hover transition-colors flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        Comprar
                      </button>
                   </div>
                </div>
             );
           })}
        </div>

      </div>
    </div>
  );
}
