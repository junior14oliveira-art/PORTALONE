export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Placeholder for dynamic background image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        
        <div className="container relative z-20 mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex flex-col items-center md:items-start space-y-6">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm">
              Lançamento B2B & B2C
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              A Potência que <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Sua Empresa</span> Exige.
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              Equipamentos de alta performance para quem não pode parar. Servidores, Workstations e Notebooks corporativos com garantia estendida e rastreabilidade total.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="h-12 px-8 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover-lift shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Comprar Agora
              </button>
              <button className="h-12 px-8 rounded-md bg-transparent text-white border border-white/20 font-semibold hover:bg-white/10 transition-all backdrop-blur-md">
                Falar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Explore por Categorias</h2>
              <p className="text-muted-foreground">O ecossistema completo para sua infraestrutura</p>
            </div>
            <a href="/categorias" className="text-primary font-medium hover:underline hidden md:block">Ver todas as categorias &rarr;</a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {['Computadores', 'Notebooks', 'Servidores', 'Placas de Vídeo', 'Armazenamento'].map((cat, i) => (
              <a key={i} href={`/categoria/${cat.toLowerCase()}`} className="group relative rounded-xl overflow-hidden aspect-square flex items-end p-6 border border-border/50 hover:border-primary/50 transition-all hover-lift bg-card">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-slate-800/50 group-hover:scale-105 transition-transform duration-500" />
                <div className="relative z-20 w-full">
                  <h3 className="text-lg font-bold text-white group-hover:text-primary-foreground transition-colors">{cat}</h3>
                  <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">Explorar &rarr;</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS (Premium Cards) */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">Destaques Corporativos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Product Card Mockup */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col bg-card rounded-2xl border border-border/40 overflow-hidden hover-lift group">
                <div className="relative aspect-square p-6 flex items-center justify-center bg-white dark:bg-slate-800/50">
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">15% OFF</span>
                  <div className="w-3/4 h-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" /> {/* Placeholder Image */}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs text-muted-foreground mb-2">Workstation Dell</div>
                  <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2">Precision 3000 Series MT Core i7 32GB RAM 1TB SSD</h3>
                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground line-through">R$ 12.500,00</div>
                      <div className="text-xl font-bold text-primary">R$ 10.625,00</div>
                      <div className="text-xs text-muted-foreground mt-1">ou 10x de R$ 1.062,50</div>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-primary hover:text-primary-foreground transition-colors border border-border group-hover:border-primary/50">
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
