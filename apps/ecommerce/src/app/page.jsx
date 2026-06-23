"use client";

import { HOME_CONTENT } from '../config/home-content';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    // Generate a simple ID and clean price to number
    const numericPrice = parseFloat(item.price.replace('.', '').replace(',', '.'));
    addToCart({
      id: item.id || item.name.replace(/\s+/g, '-').toLowerCase(),
      name: item.name,
      price: numericPrice,
      img: item.img
    });
  };

  return (
    <div className="w-full flex flex-col items-center pb-20 bg-background text-foreground">
      
      {/* HERO BANNER - Heuristic: Aesthetic and minimalist design */}
      <section className="w-full h-[300px] md:h-[450px] relative bg-brand overflow-hidden shadow-sm">
         {/* Arrows - Heuristic: User control and freedom */}
         <button className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center cursor-pointer z-30 shadow-md hover:bg-white hover:scale-105 transition-all group" aria-label="Anterior">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground group-hover:text-brand"><path d="m15 18-6-6 6-6"/></svg>
         </button>
         <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center cursor-pointer z-30 shadow-md hover:bg-white hover:scale-105 transition-all group" aria-label="Próximo">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground group-hover:text-brand"><path d="m9 18 6-6-6-6"/></svg>
         </button>
         
         {/* Banner Composition */}
         <div className="w-full h-full relative flex items-center">
            
            {/* Left: Laptop Image */}
            <div className="absolute left-10 md:left-20 bottom-0 z-20 w-[30%] md:w-[400px] h-[90%] flex items-end">
               <img src={HOME_CONTENT.hero.laptopImage} alt="Notebook em destaque" className="w-full h-auto object-contain drop-shadow-2xl mix-blend-luminosity opacity-95 transition-transform hover:scale-105 duration-700" />
            </div>

            {/* Center: Dark Blue Parallelogram */}
            <div className="absolute left-[20%] md:left-[30%] top-0 h-full w-[60%] md:w-[50%] bg-brand-hover transform -skew-x-[30deg] z-10 flex flex-col justify-center items-center shadow-2xl border-l-8 border-brand">
               <div className="transform skew-x-[30deg] text-center ml-10 flex flex-col items-center">
                  <h2 className="text-white font-bold text-3xl md:text-5xl tracking-tight leading-tight">Soluções<br/>Corporativas</h2>
                  <div className="flex items-center justify-center mt-4">
                     <button className="bg-white text-brand px-6 py-3 rounded-md font-bold hover:bg-muted-bg transition-colors shadow-lg">
                       Conheça a Linha Latitude
                     </button>
                  </div>
               </div>
            </div>

            {/* Right: White Parallelogram */}
            <div className="absolute right-[-20%] md:right-[-10%] top-0 h-full w-[45%] md:w-[35%] bg-white transform -skew-x-[30deg] z-10 flex justify-center items-center shadow-xl">
               <div className="transform skew-x-[30deg] mr-20 md:mr-32">
                  <h1 className="font-black text-6xl md:text-[80px] text-brand tracking-tighter opacity-10">4M&C</h1>
               </div>
            </div>
         </div>

         {/* Dots - Heuristic: Visibility of system status */}
         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30" role="tablist">
            <button className="w-3 h-3 rounded-full bg-white transition-colors" aria-label="Slide 1" aria-selected="true"></button>
            <button className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/70 transition-colors" aria-label="Slide 2"></button>
            <button className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/70 transition-colors" aria-label="Slide 3"></button>
            <button className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/70 transition-colors" aria-label="Slide 4"></button>
         </div>
      </section>

      {/* TRUST BADGES SECTION - Heuristic: Error prevention (building trust) */}
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
             <h2 className="font-bold tracking-wide uppercase text-foreground">O que você procura hoje?</h2>
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
                <img src={cat.img} alt={cat.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-sm text-foreground font-medium group-hover:text-brand text-center w-28">{cat.name}</span>
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
                <h2 className="text-3xl lg:text-4xl font-black uppercase leading-tight mb-4">Recomendados<br/>Para Você</h2>
                <p className="text-white/90 text-sm opacity-90">Seleção exclusiva baseada no seu perfil corporativo.</p>
                <button className="mt-8 border border-white/30 hover:bg-white hover:text-brand px-6 py-2 rounded-full text-sm font-bold transition-colors w-fit">
                  Ver Mais
                </button>
              </div>
           </div>

           {/* Products Carousel */}
           <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              
              {HOME_CONTENT.produtosRecomendados.map((prod, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-border flex flex-col relative group hover:shadow-md hover:border-brand/30 transition-all">
                   <div className="flex justify-between items-start mb-3">
                      {prod.estoque ? <span className="bg-brand text-white text-[10px] font-bold px-2 py-1 rounded">RESTAM {prod.estoque}</span> : <div></div>}
                      <div className="flex text-warning">
                         {[1,2,3,4,5].map(s => <svg key={s} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                      </div>
                   </div>
                   <div className="h-44 w-full flex items-center justify-center mb-4 p-4">
                      <img src={prod.img} alt={prod.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                   </div>
                   <h3 className="text-sm text-foreground font-medium mb-4 line-clamp-2 h-[40px] group-hover:text-brand transition-colors">{prod.name}</h3>
                    <div className="mt-auto border-t border-border pt-4 relative">
                      <div className="text-xl font-black text-[#25D366]">R$ {prod.price} <span className="text-xs font-bold text-[#25D366]">no PIX</span></div>
                      <div className="text-xs text-muted mt-1">ou 10x sem juros</div>
                      {!prod.estoque && (
                        <button 
                          onClick={() => handleAddToCart(prod)}
                          className="absolute right-0 bottom-0 w-10 h-10 rounded-full bg-brand text-white shadow-md flex items-center justify-center hover:bg-brand-hover transition-colors" 
                          aria-label="Adicionar ao carrinho"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        </button>
                      )}
                   </div>
                </div>
              ))}

           </div>
        </div>

        {/* MOSAIC BANNERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
           <div className="bg-foreground rounded-2xl overflow-hidden relative shadow-lg flex items-end p-8 h-[350px] group cursor-pointer">
              <div className="absolute top-6 left-6 z-10 font-bold text-white text-3xl opacity-20">DELL</div>
              <img src={HOME_CONTENT.bannersMosaico.notebookBg} alt="Notebook Banner" className="absolute right-[-5%] bottom-0 w-[80%] h-auto object-contain z-0 mix-blend-luminosity opacity-60 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute left-0 bottom-0 w-full p-8 text-white text-left bg-gradient-to-t from-black/80 to-transparent z-10">
                 <h3 className="font-medium text-brand text-sm tracking-widest uppercase mb-1">Destaque Corporativo</h3>
                 <h2 className="font-black text-3xl mb-4">LATITUDE 5420</h2>
                 <span className="inline-block bg-brand text-white px-4 py-2 rounded text-sm font-bold hover:bg-white hover:text-brand transition-colors">Conferir</span>
              </div>
           </div>
           
           <div className="flex flex-col gap-6 h-[350px]">
              <div className="bg-white border border-border rounded-2xl overflow-hidden relative shadow-sm hover:shadow-md transition-shadow flex-1 flex items-center justify-center p-6 group cursor-pointer">
                 <img src={HOME_CONTENT.bannersMosaico.monitor} alt="Monitor Banner" className="w-[45%] absolute right-6 z-0 object-contain group-hover:scale-105 transition-transform" />
                 <div className="absolute left-8 z-10">
                    <h3 className="text-muted font-medium text-sm tracking-wider uppercase mb-1">Monitores</h3>
                    <h2 className="text-foreground font-black text-2xl mb-2">P2422H</h2>
                    <p className="text-sm text-brand font-bold">Resolução Full HD</p>
                 </div>
              </div>
              
              <div className="bg-brand rounded-2xl overflow-hidden relative shadow-sm hover:shadow-md transition-shadow h-[140px] flex items-center p-6 group cursor-pointer">
                 <div className="z-10 w-1/2">
                    <h3 className="text-white/80 font-medium text-xs tracking-wider uppercase mb-1">Redes</h3>
                    <h2 className="text-white font-black text-xl leading-tight">Switch Dell<br/>S4048-ON</h2>
                 </div>
                 <img src={HOME_CONTENT.bannersMosaico.switch} alt="Switch Banner" className="w-[55%] absolute right-[-5%] z-0 object-contain mix-blend-luminosity opacity-80 group-hover:scale-105 transition-transform" />
              </div>
           </div>
        </div>

        {/* DESTAQUES SECTION */}
        <div className="w-full bg-white border border-border rounded-xl px-6 py-4 flex items-center justify-between mb-8 shadow-sm">
          <div className="flex items-center gap-3">
             <div className="w-2 h-6 bg-brand rounded-full"></div>
             <h2 className="font-bold tracking-wide uppercase text-foreground">Destaques da Semana</h2>
          </div>
          <div className="text-sm flex items-center gap-2">
             <span className="text-muted">Aproveite as ofertas</span>
          </div>
        </div>

        {/* HIGHLIGHT PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
           
           {HOME_CONTENT.produtosHype.map((item, i) => (
             <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-border flex flex-col relative group hover:border-brand hover:shadow-md transition-all">
                 <div className="flex justify-between items-start mb-3">
                    {item.estoque ? <span className="bg-warning text-foreground text-[10px] font-bold px-2 py-1 rounded">OFERTA</span> : <div></div>}
                 </div>
                 <div className="h-36 w-full flex items-center justify-center mb-6 p-2">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                 </div>
                 <h3 className="text-sm text-foreground font-medium mb-4 line-clamp-2 h-[40px] group-hover:text-brand transition-colors">{item.name}</h3>
                 
                 <div className="mt-auto border-t border-border pt-4">
                    <div className="text-xs text-muted mb-1 line-through">R$ {(parseFloat(item.price.replace('.','').replace(',','.')) * 1.15).toLocaleString('pt-BR', {minimumFractionDigits:2})}</div>
                    <div className="text-2xl font-black text-[#25D366]">R$ {item.price}</div>
                    <div className="text-xs font-bold text-[#25D366] mb-4 mt-0.5">no PIX ou até 12x no cartão</div>
                    
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-brand text-white font-bold text-sm py-3 rounded-lg hover:bg-brand-hover transition-colors flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                      Comprar
                    </button>
                 </div>
              </div>
           ))}

        </div>

      </div>
    </div>
  );
}
