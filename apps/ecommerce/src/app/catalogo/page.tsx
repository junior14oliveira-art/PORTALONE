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
              {[
                {
                  id: 1,
                  badge: '15% OFF',
                  badgeType: 'destructive',
                  brand: 'Workstation Dell',
                  title: 'Precision 3000 Series MT Core i7 32GB RAM 1TB SSD',
                  specs: ['Core i7-13700K', '32GB RAM DDR5', '1TB SSD NVMe'],
                  price: '10.625,00',
                  oldPrice: '12.500,00',
                  installments: '10x de R$ 1.062,50 sem juros',
                  img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=400&auto=format&fit=crop'
                },
                {
                  id: 2,
                  badge: 'Esgotado',
                  badgeType: 'secondary',
                  brand: 'Notebook Lenovo',
                  title: 'ThinkPad T14 Gen 2 Intel Core i5 16GB 512GB SSD',
                  specs: ['Core i5-1135G7', '16GB RAM DDR4', '512GB NVMe'],
                  price: '5.200,00',
                  oldPrice: null,
                  installments: '10x de R$ 520,00 sem juros',
                  img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400&auto=format&fit=crop'
                },
                {
                  id: 3,
                  badge: 'Pronta Entrega',
                  badgeType: 'success',
                  brand: 'Servidor Dell',
                  title: 'PowerEdge T150 Xeon E-2324G 16GB 2TB SATA',
                  specs: ['Xeon E-2324G', '16GB UDIMM ECC', '2TB SATA 7.2K'],
                  price: '8.450,00',
                  oldPrice: null,
                  installments: '10x de R$ 845,00 sem juros',
                  img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&auto=format&fit=crop'
                },
                {
                  id: 4,
                  badge: null,
                  brand: 'Monitor Dell',
                  title: 'P2422H 24" Full HD IPS Ajuste de Altura',
                  specs: ['24" IPS FHD', 'Ajuste de altura', 'DisplayPort/HDMI/VGA'],
                  price: '1.250,00',
                  oldPrice: null,
                  installments: '10x de R$ 125,00 sem juros',
                  img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&auto=format&fit=crop'
                },
                {
                  id: 5,
                  badge: 'Pronta Entrega',
                  badgeType: 'success',
                  brand: 'Computador HP',
                  title: 'ProDesk 400 G7 SFF Core i5 8GB 256GB SSD',
                  specs: ['Core i5-10500', '8GB RAM DDR4', '256GB NVMe'],
                  price: '3.150,00',
                  oldPrice: null,
                  installments: '10x de R$ 315,00 sem juros',
                  img: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=400&auto=format&fit=crop'
                },
                {
                  id: 6,
                  badge: null,
                  brand: 'Switch Cisco',
                  title: 'Catalyst 1000 Series 24x 10/100/1000',
                  specs: ['24 Portas GbE', '4x SFP Uplinks', 'Gerenciável'],
                  price: '4.890,00',
                  oldPrice: null,
                  installments: '10x de R$ 489,00 sem juros',
                  img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&auto=format&fit=crop'
                },
                {
                  id: 7,
                  badge: '10% OFF',
                  badgeType: 'destructive',
                  brand: 'Notebook Dell',
                  title: 'Latitude 5420 i7 11º Geração 16GB SSD 256GB',
                  specs: ['Core i7-1185G7', '16GB RAM DDR4', '256GB NVMe'],
                  price: '2.707,50',
                  oldPrice: '3.008,30',
                  installments: '10x de R$ 270,75 sem juros',
                  img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=400&auto=format&fit=crop'
                },
                {
                  id: 8,
                  badge: null,
                  brand: 'Workstation Lenovo',
                  title: 'ThinkStation P340 SFF Core i9 64GB 2TB SSD',
                  specs: ['Core i9-10900', '64GB RAM DDR4', '2TB SSD NVMe'],
                  price: '14.200,00',
                  oldPrice: null,
                  installments: '12x de R$ 1.183,33 sem juros',
                  img: 'https://images.unsplash.com/photo-1626218174358-7769486c4b79?q=80&w=400&auto=format&fit=crop'
                },
                {
                  id: 9,
                  badge: 'Esgotado',
                  badgeType: 'secondary',
                  brand: 'Monitor AOC',
                  title: 'M2470SW 24 Polegadas VGA HDMI',
                  specs: ['24" FHD', 'VGA / HDMI', 'Tempo de resposta 5ms'],
                  price: '617,50',
                  oldPrice: null,
                  installments: '10x de R$ 61,75 sem juros',
                  img: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?q=80&w=400&auto=format&fit=crop'
                }
              ].map((item) => (
                <div key={item.id} className="flex flex-col bg-card rounded-2xl border border-border/40 overflow-hidden hover-lift group relative">
                  {/* Status Overlay */}
                  {item.badge === 'Esgotado' && (
                    <div className="absolute top-0 left-0 w-full h-full bg-background/60 backdrop-blur-[2px] z-20 flex items-center justify-center">
                      <Badge variant="secondary" className="text-sm px-3 py-1 border-border shadow-lg">Esgotado</Badge>
                    </div>
                  )}
                  
                  <a href={`/produto/${item.title.toLowerCase().replace(/ /g, '-')}`} className="relative aspect-square p-6 flex items-center justify-center bg-white cursor-pointer overflow-hidden">
                    {item.badge && item.badge !== 'Esgotado' && (
                      <Badge variant={item.badgeType as "default" | "destructive" | "secondary" | "success"} className="absolute top-4 left-4 z-10 shadow-md">
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
