import { HOME_CONTENT } from '@/config/home-content';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center pb-20">
      
      {/* HERO BANNER (Replica exata do design original) */}
      <section className="w-full h-[300px] md:h-[450px] relative bg-[#005cbf] overflow-hidden">
         {/* Arrows */}
         <div className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center cursor-pointer z-30 shadow-md hover:bg-white"><span className="text-2xl text-black">&larr;</span></div>
         <div className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center cursor-pointer z-30 shadow-md hover:bg-white"><span className="text-2xl text-black">&rarr;</span></div>
         
         {/* Banner Composition */}
         <div className="w-full h-full relative flex items-center">
            
            {/* Left: Laptop Image */}
            <div className="absolute left-10 md:left-20 bottom-0 z-20 w-[30%] md:w-[400px] h-[90%] flex items-end">
               {/* Simulating an isolated laptop with an unsplash image that has clean background */}
               <img src={HOME_CONTENT.hero.laptopImage} alt="Notebook" className="w-full h-auto object-contain drop-shadow-2xl mix-blend-luminosity opacity-90" />
            </div>

            {/* Center: Dark Blue Parallelogram with Text */}
            <div className="absolute left-[20%] md:left-[30%] top-0 h-full w-[60%] md:w-[50%] bg-[#002a80] transform -skew-x-[30deg] z-10 flex flex-col justify-center items-center shadow-2xl border-l-8 border-[#004a99]">
               <div className="transform skew-x-[30deg] text-center ml-10 flex flex-col items-center">
                  <h2 className="text-white font-bold text-3xl md:text-5xl italic drop-shadow-md tracking-tight">Notebook DELL</h2>
                  <div className="flex items-center justify-center mt-2">
                     <h3 className="text-white font-black text-4xl md:text-7xl italic drop-shadow-lg">Latitude</h3>
                     <span className="bg-white text-[#002a80] px-4 py-0 md:py-1 not-italic ml-3 text-4xl md:text-7xl font-black shadow-inner">5420</span>
                  </div>
               </div>
            </div>

            {/* Right: White Parallelogram with DELL Logo */}
            <div className="absolute right-[-20%] md:right-[-10%] top-0 h-full w-[45%] md:w-[35%] bg-white transform -skew-x-[30deg] z-10 flex justify-center items-center shadow-xl">
               <div className="transform skew-x-[30deg] mr-20 md:mr-32">
                  <h1 className="font-black text-6xl md:text-[100px] text-black tracking-tighter">DELL</h1>
               </div>
            </div>
         </div>

         {/* Dots */}
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            <div className="w-3 h-3 rounded-full bg-[#ff6600]"></div>
            <div className="w-3 h-3 rounded-full bg-white/70"></div>
            <div className="w-3 h-3 rounded-full bg-white/70"></div>
            <div className="w-3 h-3 rounded-full bg-white/70"></div>
            <div className="w-3 h-3 rounded-full bg-white/70"></div>
         </div>
      </section>

      {/* TRUST BADGES SECTION */}
      <section className="w-full py-6 bg-[#f3f3f3] border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl flex flex-wrap justify-center gap-8 md:gap-24">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center text-white shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>
            </div>
            <div>
              <h4 className="font-bold text-[#111111] text-sm">SAC</h4>
              <p className="text-xs text-gray-500">Sem complicações e sem custos</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center text-white shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="2" y="6" rx="2" ry="2"/><path d="M18 13h3a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3"/><path d="M6 19v2"/><path d="M14 19v2"/><path d="M10 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><circle cx="7" cy="19" r="2"/><circle cx="15" cy="19" r="2"/></svg>
            </div>
            <div>
              <h4 className="font-bold text-[#111111] text-sm">Entrega Nacional</h4>
              <p className="text-xs text-gray-500">Frete para todo Brasil.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center text-white shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div>
              <h4 className="font-bold text-[#111111] text-sm">Site seguro</h4>
              <p className="text-xs text-gray-500">Compre com Segurança</p>
            </div>
          </div>

        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 mt-8">
        
        {/* QUAL TIPO DE PRODUTO... TITLE BAR */}
        <div className="w-full bg-[#111111] rounded-xl text-white px-6 py-4 flex items-center justify-between mb-8 shadow-md">
          <div className="flex items-center gap-3">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>
             <h2 className="font-bold tracking-wide uppercase">Qual tipo de produto você deseja</h2>
          </div>
          <div className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 8 4 4-4 4"/></svg>
             <span className="font-bold text-sm">Ofertas do Dia</span>
          </div>
        </div>

        {/* CIRCLE CATEGORIES */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16">
          {HOME_CONTENT.categories.map((cat, i) => (
            <div key={i} className="flex flex-col items-center cursor-pointer group">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-md mb-3 border border-gray-100 group-hover:shadow-lg transition-shadow overflow-hidden p-2 md:p-4">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-contain rounded-full mix-blend-multiply" />
              </div>
              <span className="text-xs text-gray-600 font-medium group-hover:text-[#ff6600] text-center w-24">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* RECOMENDADOS PARA VOCÊ SECTION */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16">
           
           {/* Sidebar Title */}
           <div className="lg:w-1/4 bg-[#111111] rounded-xl flex flex-col justify-end p-8 text-white relative overflow-hidden shadow-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#ff6600]"></div>
              <div className="w-24 h-1 bg-[#ff6600] mb-4"></div>
              <h2 className="text-3xl font-black uppercase leading-tight">Recomendados<br/>Para Você</h2>
              <div className="w-32 h-1 bg-[#ff6600] mt-4"></div>
           </div>

           {/* Products Carousel */}
           <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              
              {HOME_CONTENT.produtosRecomendados.map((prod, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col relative group">
                   <div className="flex justify-between items-start mb-2">
                      {prod.estoque ? <span className="bg-[#ff6600] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">APENAS {prod.estoque} UNID.</span> : <div></div>}
                      <div className="flex text-[#ffcc00]">
                         {[1,2,3,4,5].map(s => <span key={s} className="text-xs">★</span>)}
                      </div>
                   </div>
                   <div className="h-40 w-full flex items-center justify-center mb-4 p-2">
                      <img src={prod.img} alt={prod.name} className="w-full h-full object-contain" />
                   </div>
                   <div className="border border-orange-200 text-[#ff6600] text-[10px] font-medium px-2 py-0.5 rounded-sm w-fit mb-2 flex items-center gap-1">
                      <span className="text-xs">🏆</span> Muito Bom
                   </div>
                   <h3 className="text-xs text-gray-600 font-medium mb-3 line-clamp-3 h-[45px]">{prod.name}</h3>
                   <div className="mt-auto relative">
                      <div className="text-xl font-bold text-[#111111]">R$ {prod.price}</div>
                      {!prod.estoque && (
                        <button className="absolute right-0 bottom-0 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                           <span className="text-xs">&rarr;</span>
                        </button>
                      )}
                   </div>
                </div>
              ))}

           </div>
        </div>

        {/* MOSAIC BANNERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
           <div className="bg-[#005cbf] rounded-2xl overflow-hidden relative shadow-md flex items-end p-8 h-[350px]">
              <div className="absolute top-4 left-4 z-10 font-bold text-white text-3xl">DELL</div>
              <img src={HOME_CONTENT.bannersMosaico.notebookBg} alt="Notebook Banner" className="absolute right-[-10%] bottom-0 w-[80%] h-auto object-contain z-0 mix-blend-luminosity opacity-80" />
              <div className="absolute left-0 bottom-0 w-full p-6 text-white text-center bg-gradient-to-t from-[#004a99] to-transparent z-10">
                 <h3 className="font-light italic text-xl">NOTEBOOK DELL</h3>
                 <h2 className="font-black italic text-3xl">LATITUDE 5420</h2>
              </div>
           </div>
           
           <div className="flex flex-col gap-4 h-[350px]">
              <div className="bg-[#e6e6e6] rounded-2xl overflow-hidden relative shadow-md flex-1 flex items-center justify-center">
                 <img src={HOME_CONTENT.bannersMosaico.monitor} alt="Monitor Banner" className="w-[40%] absolute bottom-4 right-10 z-0 object-contain mix-blend-multiply" />
                 <div className="absolute top-6 left-6 z-10 text-center">
                    <h3 className="text-[#005cbf] font-medium italic text-xl">Monitor</h3>
                    <h2 className="text-[#005cbf] font-black italic text-2xl">P2422H</h2>
                 </div>
                 <div className="absolute top-6 right-6 z-10 text-right text-white">
                    <h3 className="font-bold italic text-xl">DELL</h3>
                    <h2 className="font-black italic text-2xl">FULL HD</h2>
                 </div>
                 {/* Blue angled shapes */}
                 <div className="absolute left-0 top-0 w-1/3 h-full bg-[#005cbf] transform -skew-x-[30deg] -translate-x-20"></div>
                 <div className="absolute right-0 top-0 w-1/3 h-full bg-[#005cbf] transform -skew-x-[30deg] translate-x-20"></div>
                 <div className="absolute bottom-4 text-black font-black text-2xl z-10 text-center w-full">DELL</div>
              </div>
              
              <div className="bg-[#005cbf] rounded-2xl overflow-hidden relative shadow-md h-[120px] flex items-center justify-center">
                 <img src={HOME_CONTENT.bannersMosaico.switch} alt="Switch Banner" className="w-1/2 absolute top-2 z-0 object-contain mix-blend-luminosity opacity-80" />
                 <div className="absolute bottom-2 text-white font-black italic text-xl z-10">Switch Dell S4048-ON</div>
                 {/* White angled shapes */}
                 <div className="absolute left-0 bottom-0 w-1/4 h-full bg-white transform -skew-x-[45deg] -translate-x-10"></div>
                 <div className="absolute right-0 top-0 w-1/4 h-full bg-white transform -skew-x-[45deg] translate-x-10"></div>
              </div>
           </div>
        </div>

        {/* HYPE OFERTAS */}
        <div className="w-full bg-[#111111] rounded-xl text-white px-6 py-4 flex items-center justify-between mb-8 shadow-md">
          <div className="flex items-center gap-3">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
             <h2 className="font-bold tracking-wide uppercase">HYPE OFERTAS</h2>
          </div>
          <div className="text-sm">
             <span className="text-gray-400 mr-2">TERMINA EM:</span>
             <span className="font-bold text-lg">13:21:39</span>
          </div>
        </div>

        {/* HYPE PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
           
           {HOME_CONTENT.produtosHype.map((item, i) => (
             <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col relative group">
                 <div className="flex justify-between items-start mb-2">
                    {item.estoque ? <span className="bg-[#ff6600] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">APENAS {item.estoque} UNID.</span> : <div></div>}
                    <div className="flex text-[#ffcc00]">
                       {[1,2,3,4,5].map(s => <span key={s} className="text-xs">★</span>)}
                    </div>
                 </div>
                 <div className="h-32 w-full flex items-center justify-center mb-4 p-2">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                 </div>
                 <div className="border border-orange-200 text-[#ff6600] text-[10px] font-medium px-2 py-0.5 rounded-sm w-fit mb-2 flex items-center gap-1">
                    <span className="text-xs">🏆</span> Muito Bom
                 </div>
                 <h3 className="text-xs text-gray-600 font-medium mb-3 line-clamp-3 h-[45px]">{item.name}</h3>
                 
                 <div className="mt-auto">
                    <div className="text-lg font-bold text-[#111111]">R$ {item.price}</div>
                    <div className="text-[10px] text-gray-400 mb-2">No pix com 5% de desconto</div>
                    <div className="text-[10px] text-gray-600 mb-4">ou <span className="font-bold text-black text-xs">R$ {(parseFloat(item.price.replace('.','').replace(',','.')) * 1.05).toLocaleString('pt-BR', {minimumFractionDigits:2})}</span><br/>em até 12x sem juros</div>
                    
                    <div className="flex gap-2">
                       <button className="flex-1 bg-[#111111] text-white font-bold text-xs py-2 rounded-sm hover:bg-gray-800 transition-colors">
                         Comprar
                       </button>
                       <button className="bg-gray-300 w-10 h-10 flex items-center justify-center rounded-sm hover:bg-gray-400 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/><path d="M9 11h6"/><path d="M12 8v6"/></svg>
                       </button>
                    </div>
                 </div>
              </div>
           ))}

        </div>

      </div>
    </div>
  );
}
