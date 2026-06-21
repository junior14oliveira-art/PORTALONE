"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CatalogoPage() {
  const [priceRange, setPriceRange] = useState(15000);

  return (
    <div className="bg-background min-h-screen pb-20 animate-in fade-in duration-500">
      <div className="border-b border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground flex justify-between items-center">
          <div>
            <span className="hover:text-primary cursor-pointer transition-colors">Home</span> &gt; 
            <span className="text-foreground ml-2 font-medium">Catálogo de Produtos</span>
          </div>
          <div className="hidden md:flex text-xs items-center gap-2">
            Mostrando 1-12 de 124 produtos
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Equipamentos Corporativos</h1>
            <p className="text-muted-foreground mt-1">Filtre as melhores configurações para sua necessidade.</p>
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

            {/* Categorias */}
            <div className="space-y-3">
              <h3 className="font-medium text-sm">Categoria</h3>
              <div className="space-y-2">
                {['Computadores', 'Notebooks', 'Servidores', 'Monitores', 'Armazenamento'].map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors group">
                    <input type="checkbox" className="rounded border-input bg-background text-primary focus:ring-primary w-4 h-4" />
                    <span className="group-hover:translate-x-1 transition-transform">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Marcas */}
            <div className="space-y-3 pt-4 border-t border-border/40">
              <h3 className="font-medium text-sm">Marca</h3>
              <div className="space-y-2">
                {['Dell', 'Lenovo', 'HP', 'Apple'].map(brand => (
                  <label key={brand} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    <input type="checkbox" className="rounded border-input bg-background text-primary focus:ring-primary w-4 h-4" />
                    {brand}
                  </label>
                ))}
              </div>
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

            {/* Processador */}
            <div className="space-y-3 pt-4 border-t border-border/40">
              <h3 className="font-medium text-sm">Processador</h3>
              <div className="flex flex-wrap gap-2">
                {['i5', 'i7', 'i9', 'Ryzen 5', 'Ryzen 7', 'Xeon'].map(proc => (
                  <button key={proc} className="px-3 py-1 text-xs border border-border/60 rounded-md hover:border-primary hover:text-primary bg-background transition-colors">
                    {proc}
                  </button>
                ))}
              </div>
            </div>

            {/* Memória RAM */}
            <div className="space-y-3 pt-4 border-t border-border/40">
              <h3 className="font-medium text-sm">Memória RAM</h3>
              <div className="flex flex-wrap gap-2">
                {['8GB', '16GB', '32GB', '64GB'].map(ram => (
                  <button key={ram} className="px-3 py-1 text-xs border border-border/60 rounded-md hover:border-primary hover:text-primary bg-background transition-colors">
                    {ram}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* LISTAGEM DINÂMICA DE PRODUTOS (Grid Direita) */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <div key={item} className="flex flex-col bg-card rounded-2xl border border-border/40 overflow-hidden hover-lift group relative">
                  {/* Status Overlay */}
                  {item === 2 && (
                    <div className="absolute top-0 left-0 w-full h-full bg-background/60 backdrop-blur-[2px] z-20 flex items-center justify-center">
                      <Badge variant="secondary" className="text-sm px-3 py-1 border-border shadow-lg">Esgotado</Badge>
                    </div>
                  )}
                  
                  <a href={`/produto/workstation-dell-3000-i7-${item}`} className="relative aspect-square p-6 flex items-center justify-center bg-white dark:bg-slate-800/50 cursor-pointer overflow-hidden">
                    {item === 1 && <Badge variant="destructive" className="absolute top-4 left-4 z-10 shadow-md">15% OFF</Badge>}
                    {item === 3 && <Badge variant="success" className="absolute top-4 left-4 z-10 shadow-md">Pronta Entrega</Badge>}
                    
                    {/* Placeholder Image */}
                    <div className="w-3/4 h-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse transition-transform duration-500 group-hover:scale-110" /> 
                    
                    {/* Quick View Button on Hover */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button className="px-4 py-2 bg-background/90 backdrop-blur text-foreground text-xs font-semibold rounded-full border border-border shadow-xl hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        Visualização Rápida
                      </button>
                    </div>
                  </a>
                  
                  <div className="p-5 flex flex-col flex-1 border-t border-border/10">
                    <div className="text-xs text-muted-foreground mb-1 font-medium tracking-wide">Workstation Dell</div>
                    <a href={`/produto/workstation-dell-3000-i7-${item}`} className="font-semibold text-base leading-tight mb-3 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                      Precision 3000 Series MT Core i7 32GB RAM 1TB SSD
                    </a>
                    
                    {/* Features list tiny */}
                    <ul className="text-xs text-muted-foreground mb-4 space-y-1">
                      <li>• Core i7-13700K</li>
                      <li>• 32GB RAM DDR5</li>
                      <li>• 1TB SSD NVMe</li>
                    </ul>

                    <div className="mt-auto pt-2 flex items-end justify-between">
                      <div>
                        {item === 1 && <div className="text-xs text-muted-foreground line-through">R$ 12.500,00</div>}
                        <div className="text-xl font-extrabold text-primary">R$ 10.625,00</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">ou 10x de R$ 1.062,50 sem juros</div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-5 rounded-lg font-semibold group-hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
                      Adicionar
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" className="w-10 h-10 p-0 rounded-md" disabled>&lt;</Button>
                <Button variant="default" className="w-10 h-10 p-0 rounded-md">1</Button>
                <Button variant="outline" className="w-10 h-10 p-0 rounded-md">2</Button>
                <Button variant="outline" className="w-10 h-10 p-0 rounded-md">3</Button>
                <Button variant="outline" className="w-10 h-10 p-0 rounded-md">...</Button>
                <Button variant="outline" className="w-10 h-10 p-0 rounded-md">10</Button>
                <Button variant="outline" className="w-10 h-10 p-0 rounded-md">&gt;</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
