"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ALL_PRODUCTS = [
  // Computadores
  { id: 1, category: 'computadores', badge: '15% OFF', badgeType: 'destructive', brand: 'Workstation Dell', title: 'Precision 3000 Series MT Core i7 32GB RAM 1TB SSD', specs: ['Core i7-13700K', '32GB RAM DDR5', '1TB SSD NVMe'], price: '10.625,00', oldPrice: '12.500,00', installments: '10x de R$ 1.062,50 sem juros', img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=400&auto=format&fit=crop' },
  { id: 5, category: 'computadores', badge: 'Pronta Entrega', badgeType: 'success', brand: 'Computador HP', title: 'ProDesk 400 G7 SFF Core i5 8GB 256GB SSD', specs: ['Core i5-10500', '8GB RAM DDR4', '256GB NVMe'], price: '3.150,00', oldPrice: null, installments: '10x de R$ 315,00 sem juros', img: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=400&auto=format&fit=crop' },
  { id: 10, category: 'computadores', badge: null, brand: 'Apple', title: 'Mac Studio M2 Max 32GB RAM 512GB SSD', specs: ['M2 Max 12-Core', '32GB Unified Memory', '512GB SSD'], price: '22.999,00', oldPrice: null, installments: '12x de R$ 1.916,58 sem juros', img: 'https://images.unsplash.com/photo-1690280453303-339cb1bfb5c0?q=80&w=400&auto=format&fit=crop' },
  { id: 11, category: 'computadores', badge: 'Novidade', badgeType: 'default', brand: 'Lenovo', title: 'ThinkCentre M70q Tiny Core i3 8GB 256GB SSD', specs: ['Core i3-10100T', '8GB RAM DDR4', '256GB NVMe'], price: '2.850,00', oldPrice: null, installments: '10x de R$ 285,00 sem juros', img: 'https://images.unsplash.com/photo-1620288627228-569bd8cb7ab6?q=80&w=400&auto=format&fit=crop' },

  // Notebooks
  { id: 2, category: 'notebooks', badge: 'Esgotado', badgeType: 'secondary', brand: 'Notebook Lenovo', title: 'ThinkPad T14 Gen 2 Intel Core i5 16GB 512GB SSD', specs: ['Core i5-1135G7', '16GB RAM DDR4', '512GB NVMe'], price: '5.200,00', oldPrice: null, installments: '10x de R$ 520,00 sem juros', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400&auto=format&fit=crop' },
  { id: 7, category: 'notebooks', badge: '10% OFF', badgeType: 'destructive', brand: 'Notebook Dell', title: 'Latitude 5420 i7 11º Geração 16GB SSD 256GB', specs: ['Core i7-1185G7', '16GB RAM DDR4', '256GB NVMe'], price: '2.707,50', oldPrice: '3.008,30', installments: '10x de R$ 270,75 sem juros', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=400&auto=format&fit=crop' },
  { id: 12, category: 'notebooks', badge: null, brand: 'Apple', title: 'MacBook Pro 14" M3 Pro 18GB RAM 512GB SSD', specs: ['M3 Pro 11-Core', '18GB Unified Memory', '512GB SSD'], price: '18.999,00', oldPrice: null, installments: '12x de R$ 1.583,25 sem juros', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop' },
  { id: 13, category: 'notebooks', badge: 'Pronta Entrega', badgeType: 'success', brand: 'HP', title: 'EliteBook 840 G8 Core i7 16GB 512GB SSD', specs: ['Core i7-1165G7', '16GB RAM DDR4', '512GB NVMe'], price: '7.150,00', oldPrice: null, installments: '10x de R$ 715,00 sem juros', img: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=400&auto=format&fit=crop' },

  // Acessórios
  { id: 4, category: 'acessorios', badge: null, brand: 'Monitor Dell', title: 'P2422H 24" Full HD IPS Ajuste de Altura', specs: ['24" IPS FHD', 'Ajuste de altura', 'DisplayPort/HDMI/VGA'], price: '1.250,00', oldPrice: null, installments: '10x de R$ 125,00 sem juros', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&auto=format&fit=crop' },
  { id: 9, category: 'acessorios', badge: 'Esgotado', badgeType: 'secondary', brand: 'Monitor AOC', title: 'M2470SW 24 Polegadas VGA HDMI', specs: ['24" FHD', 'VGA / HDMI', 'Tempo de resposta 5ms'], price: '617,50', oldPrice: null, installments: '10x de R$ 61,75 sem juros', img: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?q=80&w=400&auto=format&fit=crop' },
  { id: 14, category: 'acessorios', badge: null, brand: 'Logitech', title: 'Mouse MX Master 3S Sem Fio', specs: ['Sensor 8K DPI', 'Clique Silencioso', 'USB-C e Bluetooth'], price: '650,00', oldPrice: null, installments: '10x de R$ 65,00 sem juros', img: 'https://images.unsplash.com/photo-1527814050087-37938154733d?q=80&w=400&auto=format&fit=crop' },
  { id: 15, category: 'acessorios', badge: 'Promoção', badgeType: 'destructive', brand: 'Keychron', title: 'Teclado Mecânico K8 Pro TKL', specs: ['Switches Red', 'Bluetooth 5.1', 'Mac/Windows'], price: '850,00', oldPrice: '1.050,00', installments: '10x de R$ 85,00 sem juros', img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=400&auto=format&fit=crop' },

  // Hardware
  { id: 6, category: 'hardware', badge: null, brand: 'Switch Cisco', title: 'Catalyst 1000 Series 24x 10/100/1000', specs: ['24 Portas GbE', '4x SFP Uplinks', 'Gerenciável'], price: '4.890,00', oldPrice: null, installments: '10x de R$ 489,00 sem juros', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&auto=format&fit=crop' },
  { id: 16, category: 'hardware', badge: 'Pronta Entrega', badgeType: 'success', brand: 'Intel', title: 'Processador Core i9-13900K', specs: ['24 Cores / 32 Threads', 'Até 5.8 GHz', 'LGA 1700'], price: '4.150,00', oldPrice: null, installments: '10x de R$ 415,00 sem juros', img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=400&auto=format&fit=crop' },
  { id: 17, category: 'hardware', badge: null, brand: 'NVIDIA', title: 'Placa de Vídeo RTX 4070 Ti 12GB', specs: ['12GB GDDR6X', 'Ray Tracing', 'DLSS 3'], price: '6.200,00', oldPrice: null, installments: '10x de R$ 620,00 sem juros', img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=400&auto=format&fit=crop' },
  { id: 18, category: 'hardware', badge: null, brand: 'Corsair', title: 'Memória RAM Vengeance 32GB (2x16GB)', specs: ['DDR5 5600MHz', 'CL36', 'XMP 3.0'], price: '1.050,00', oldPrice: null, installments: '10x de R$ 105,00 sem juros', img: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?q=80&w=400&auto=format&fit=crop' },

  // Servidores
  { id: 3, category: 'servidores', badge: 'Pronta Entrega', badgeType: 'success', brand: 'Servidor Dell', title: 'PowerEdge T150 Xeon E-2324G 16GB 2TB SATA', specs: ['Xeon E-2324G', '16GB UDIMM ECC', '2TB SATA 7.2K'], price: '8.450,00', oldPrice: null, installments: '10x de R$ 845,00 sem juros', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&auto=format&fit=crop' },
  { id: 8, category: 'servidores', badge: null, brand: 'Workstation Lenovo', title: 'ThinkStation P340 SFF Core i9 64GB 2TB SSD', specs: ['Core i9-10900', '64GB RAM DDR4', '2TB SSD NVMe'], price: '14.200,00', oldPrice: null, installments: '12x de R$ 1.183,33 sem juros', img: 'https://images.unsplash.com/photo-1626218174358-7769486c4b79?q=80&w=400&auto=format&fit=crop' },
  { id: 19, category: 'servidores', badge: 'Esgotado', badgeType: 'secondary', brand: 'HPE', title: 'ProLiant DL380 Gen10 Xeon Silver 4208', specs: ['Xeon Silver 4208', '32GB RAM', 'Rack 2U'], price: '21.500,00', oldPrice: null, installments: '12x de R$ 1.791,66 sem juros', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop' },
  { id: 20, category: 'servidores', badge: 'Novidade', badgeType: 'default', brand: 'Dell', title: 'PowerEdge R250 Rack 1U Xeon E-2314', specs: ['Xeon E-2314', '16GB RAM ECC', '1TB HDD'], price: '9.800,00', oldPrice: null, installments: '10x de R$ 980,00 sem juros', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&auto=format&fit=crop' }
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categoria');
  const [priceRange, setPriceRange] = useState(50000);

  // Filter logic
  const filteredProducts = ALL_PRODUCTS.filter(item => {
    // Filter by category if present
    if (categoryParam && item.category !== categoryParam) {
      return false;
    }
    // Filter by price
    const priceNum = parseFloat(item.price.replace(/\./g, '').replace(',', '.'));
    if (priceNum > priceRange) {
      return false;
    }
    return true;
  });

  // Dynamic titles
  const categoryTitles: Record<string, { title: string, subtitle: string }> = {
    'computadores': { title: 'Computadores & Workstations', subtitle: 'Equipamentos de alta performance para o seu negócio.' },
    'notebooks': { title: 'Notebooks Corporativos', subtitle: 'Mobilidade sem abrir mão do desempenho.' },
    'acessorios': { title: 'Acessórios & Periféricos', subtitle: 'Monitores, teclados, mouses e muito mais.' },
    'hardware': { title: 'Peças & Hardware', subtitle: 'Componentes avulsos para upgrade e manutenção.' },
    'servidores': { title: 'Servidores & Datacenter', subtitle: 'Infraestrutura robusta para sua empresa.' }
  };

  const currentTitle = categoryParam && categoryTitles[categoryParam] 
    ? categoryTitles[categoryParam].title 
    : 'Catálogo de Produtos';
    
  const currentSubtitle = categoryParam && categoryTitles[categoryParam]
    ? categoryTitles[categoryParam].subtitle
    : 'Filtre as melhores configurações para sua necessidade.';

  return (
    <div className="bg-background min-h-screen pb-20 animate-in fade-in duration-500">
      <div className="border-b border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground flex justify-between items-center">
          <div>
            <span className="hover:text-primary cursor-pointer transition-colors">Home</span> &gt; 
            <span className="text-foreground ml-2 font-medium">{currentTitle}</span>
          </div>
          <div className="hidden md:flex text-xs items-center gap-2">
            Mostrando 1-{filteredProducts.length} de {filteredProducts.length} produtos
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{currentTitle}</h1>
            <p className="text-muted-foreground mt-1">{currentSubtitle}</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar por:</span>
            <select className="h-10 px-3 rounded-md border border-input bg-background text-sm flex-1 md:w-48 focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Relevância</option>
              <option>Menor Preço</option>
              <option>Maior Preço</option>
              <option>Mais Vendidos</option>
              <option>Mais Vistos</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* FILTROS AVANÇADOS (Sidebar) */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 bg-card border border-border/40 p-5 rounded-xl h-fit sticky top-24 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-border/40">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                Filtros
              </h2>
              <button className="text-xs text-primary hover:underline">Limpar</button>
            </div>

            {/* Preço */}
            <div className="space-y-3 pt-4 border-t border-border/40">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-sm">Preço (Até)</h3>
                <span className="text-xs font-bold text-primary">R$ {priceRange.toLocaleString('pt-BR')}</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="50000" 
                step="500" 
                value={priceRange} 
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full accent-primary" 
              />
            </div>

            {/* Marcas */}
            <div className="space-y-3 pt-4 border-t border-border/40">
              <h3 className="font-medium text-sm">Marca</h3>
              <div className="space-y-2">
                {['Dell', 'Lenovo', 'HP', 'Apple', 'Intel', 'Cisco'].map(brand => (
                  <label key={brand} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    <input type="checkbox" className="rounded border-input bg-background text-primary focus:ring-primary w-4 h-4" />
                    {brand}
                  </label>
                ))}
              </div>
            </div>
            
            {/* Outros Filtros ... */}
          </aside>

          {/* LISTAGEM DINÂMICA DE PRODUTOS (Grid Direita) */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border/60 rounded-2xl bg-muted/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <h3 className="text-lg font-semibold">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground mt-2">Tente ajustar seus filtros para ver mais resultados.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((item) => (
                  <div key={item.id} className="flex flex-col bg-card rounded-2xl border border-border/40 overflow-hidden hover-lift group relative">
                    {/* Status Overlay */}
                    {item.badge === 'Esgotado' && (
                      <div className="absolute top-0 left-0 w-full h-full bg-background/60 backdrop-blur-[2px] z-20 flex items-center justify-center">
                        <Badge variant="secondary" className="text-sm px-3 py-1 border-border shadow-lg">Esgotado</Badge>
                      </div>
                    )}
                    
                    <a href={`/produto/${item.title.toLowerCase().replace(/ /g, '-')}`} className="relative aspect-square p-6 flex items-center justify-center bg-white cursor-pointer overflow-hidden">
                      {item.badge && item.badge !== 'Esgotado' && (
                        <Badge variant={item.badgeType as "default" | "destructive" | "secondary" | "success" | "outline"} className="absolute top-4 left-4 z-10 shadow-md">
                          {item.badge}
                        </Badge>
                      )}
                      
                      {/* Real Image */}
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <img src={item.img} alt={item.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" /> 
                      </div>
                      
                      {/* Quick View Button on Hover */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <button className="px-4 py-2 bg-background/90 backdrop-blur text-foreground text-xs font-semibold rounded-full border border-border shadow-xl hover:bg-brand hover:text-white transition-colors whitespace-nowrap flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                          Visualização Rápida
                        </button>
                      </div>
                    </a>
                    
                    <div className="p-5 flex flex-col flex-1 border-t border-border/10">
                      <div className="text-xs text-muted-foreground mb-1 font-medium tracking-wide">{item.brand}</div>
                      <a href={`/produto/${item.title.toLowerCase().replace(/ /g, '-')}`} className="font-semibold text-base leading-tight mb-3 line-clamp-2 hover:text-brand transition-colors cursor-pointer">
                        {item.title}
                      </a>
                      
                      {/* Features list */}
                      <ul className="text-xs text-muted-foreground mb-4 space-y-1">
                        {item.specs.map((spec, i) => <li key={i}>• {spec}</li>)}
                      </ul>

                      <div className="mt-auto pt-2 flex items-end justify-between">
                        <div>
                          {item.oldPrice && <div className="text-xs text-muted-foreground line-through">R$ {item.oldPrice}</div>}
                          <div className="text-xl font-extrabold text-brand">R$ {item.price}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{item.installments}</div>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-5 rounded-lg font-semibold hover:bg-brand hover:text-white transition-all bg-foreground text-background">
                        Adicionar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex gap-2">
                  <Button variant="outline" className="w-10 h-10 p-0 rounded-md" disabled>&lt;</Button>
                  <Button variant="default" className="w-10 h-10 p-0 rounded-md">1</Button>
                  <Button variant="outline" className="w-10 h-10 p-0 rounded-md" disabled>&gt;</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
