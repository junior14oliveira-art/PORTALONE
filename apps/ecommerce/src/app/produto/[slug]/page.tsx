"use client";

import React, { useState, use } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [activeImage, setActiveImage] = useState(0);
  const [zipCode, setZipCode] = useState('');

  // Mock product data based on premium specs
  const product = {
    name: "Workstation Dell Precision 3000 Series MT Core i7 32GB RAM 1TB SSD NVMe",
    sku: "4MC-DELL-3000",
    brand: "Dell",
    price: 12500.00,
    promotionalPrice: 10625.00,
    installments: 10,
    images: [
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=800&auto=format&fit=crop", // Case placeholder
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop", // Interior
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop"  // Apple-like macro
    ],
    videoUrl: "https://www.youtube.com/embed/dummy",
    inStock: true,
    warranty: "3 Anos de Garantia On-Site ProSupport",
    description: "A Workstation Dell Precision foi projetada para profissionais que não aceitam gargalos. Com refrigeração avançada, certificação ISV e arquitetura escalável, ela entrega a estabilidade necessária para modelagem 3D, engenharia de dados e edição de vídeo em 4K/8K.",
    specs: [
      { name: "Processador", value: "Intel Core i7-13700K (16-Core, 30MB Cache, até 5.4GHz)" },
      { name: "Memória RAM", value: "32GB (2x16GB) DDR5 4800MHz Non-ECC" },
      { name: "Armazenamento", value: "1TB PCIe NVMe Gen4 M.2 SSD" },
      { name: "Placa de Vídeo", value: "NVIDIA RTX A2000 12GB GDDR6" },
      { name: "Sistema Operacional", value: "Windows 11 Pro para Workstations" }
    ],
    reviews: {
      score: 4.8,
      count: 124
    }
  };

  return (
    <div className="bg-background min-h-screen pb-20 animate-in fade-in duration-500">
      {/* Breadcrumb */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
          <span className="hover:text-primary cursor-pointer transition-colors">Home</span> &gt; 
          <span className="hover:text-primary cursor-pointer transition-colors ml-2">Computadores</span> &gt; 
          <span className="hover:text-primary cursor-pointer transition-colors ml-2">Workstations</span> &gt; 
          <span className="text-foreground ml-2">{product.brand}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* GALERIA AVANÇADA (Esquerda) */}
          <div className="lg:w-3/5 space-y-4">
            <div className="flex gap-4">
              {/* Thumbnails (Vertical on Desktop) */}
              <div className="hidden md:flex flex-col gap-4 w-24">
                {product.images.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${activeImage === i ? 'border-primary ring-2 ring-primary/30 ring-offset-1 ring-offset-background' : 'border-transparent hover:border-primary/50'}`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
                <button className="relative rounded-lg overflow-hidden aspect-square border-2 border-transparent hover:border-primary/50 flex items-center justify-center bg-accent text-accent-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect width="15" height="14" x="1" y="5" rx="2" ry="2"/></svg>
                </button>
              </div>

              {/* Main Image Viewer */}
              <div className="flex-1 bg-card rounded-2xl border border-border/50 overflow-hidden relative group cursor-zoom-in">
                {/* Simulated Zoom on Hover */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <Badge variant="destructive">15% OFF</Badge>
                  <Badge variant="secondary">Lançamento</Badge>
                </div>
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  className="w-full h-[500px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
                />
              </div>
            </div>
            {/* Mobile Thumbnails */}
            <div className="flex md:hidden gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary' : 'border-transparent'}`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ÁREA DE COMPRA / UX B2C-B2B (Direita) */}
          <div className="lg:w-2/5 flex flex-col">
            <Badge className="w-fit mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">{product.brand}</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-muted-foreground mb-4">SKU: {product.sku}</p>
            
            {/* Avaliações */}
            <div className="flex items-center gap-2 mb-6 cursor-pointer group">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={star <= 4.8 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.reviews.score}</span>
              <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">({product.reviews.count} avaliações)</span>
            </div>

            {/* Pricing Section (Kabum/Mercado Livre inspired) */}
            <div className="bg-card border border-border/50 rounded-xl p-6 mb-6 shadow-sm">
              <div className="line-through text-muted-foreground text-sm">De R$ {product.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})} por:</div>
              <div className="flex items-end gap-3 mt-1">
                <span className="text-4xl font-extrabold text-primary">R$ {product.promotionalPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
              </div>
              <div className="text-sm font-medium text-success mt-1">à vista no PIX com 15% de desconto</div>
              
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="text-sm">
                  ou <span className="font-bold text-foreground">R$ {product.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span> em até <span className="font-bold">{product.installments}x de R$ {(product.price / product.installments).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span> sem juros no cartão
                </div>
              </div>
            </div>

            {/* Shipping Calculator */}
            <div className="mb-6 space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Calcular Frete e Prazo
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="00000-000" 
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="flex h-10 w-full md:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button variant="secondary" className="font-semibold">OK</Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button size="lg" className="flex-1 text-lg h-14 bg-success hover:bg-success/90 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all hover:-translate-y-1">
                COMPRAR AGORA
              </Button>
              <Button size="lg" variant="outline" className="flex-1 text-lg h-14 border-primary text-primary hover:bg-primary/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                ADICIONAR
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="bg-accent/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm font-medium">
                <svg className="text-primary h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Compra Segura e Criptografada
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <svg className="text-primary h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                {product.warranty}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <svg className="text-primary h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>
                Peças Rastreáveis 4M&C (Garantia de Origem)
              </div>
            </div>
          </div>
        </div>

        {/* TABS: Descrição / Ficha Técnica / Q&A */}
        <div className="mt-16 bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm">
          <div className="flex border-b border-border/50 overflow-x-auto hide-scrollbar">
            <button className="px-8 py-4 font-semibold text-primary border-b-2 border-primary bg-primary/5 whitespace-nowrap">Descrição Geral</button>
            <button className="px-8 py-4 font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors whitespace-nowrap">Ficha Técnica</button>
            <button className="px-8 py-4 font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors whitespace-nowrap">Avaliações (124)</button>
            <button className="px-8 py-4 font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors whitespace-nowrap">Dúvidas Frequentes</button>
          </div>
          <div className="p-8 lg:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Marketing Description (Apple Style) */}
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">O poder de fazer muito mais.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="pt-8">
                   {/* Full width feature image mockup */}
                   <div className="w-full h-64 md:h-96 bg-slate-50 rounded-3xl flex items-center justify-center border border-border shadow-sm relative overflow-hidden group">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-1000"></div>
                     <h3 className="text-4xl md:text-6xl font-extrabold text-white z-10 tracking-widest drop-shadow-2xl">PRECISION</h3>
                   </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 pt-10 border-t border-border/40">
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="8" x2="8" y1="3" y2="21"/><line x1="16" x2="16" y1="3" y2="21"/></svg>
                    Especificações Principais
                  </h3>
                  <ul className="space-y-4">
                    {product.specs.map((s, i) => (
                      <li key={i} className="flex justify-between items-start pb-4 border-b border-border/30 last:border-0">
                        <span className="text-muted-foreground font-medium w-1/3">{s.name}</span>
                        <span className="text-foreground text-right w-2/3">{s.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-accent/50 p-6 rounded-xl border border-border/50 h-fit">
                  <h4 className="font-bold mb-2">Por que comprar na 4M&C?</h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span className="text-primary">✓</span> Especialistas corporativos à disposição</li>
                    <li className="flex gap-2"><span className="text-primary">✓</span> SLA de reparo on-site em até D+1</li>
                    <li className="flex gap-2"><span className="text-primary">✓</span> Faturamento B2B via Boleto Net 30/60/90</li>
                    <li className="flex gap-2"><span className="text-primary">✓</span> Logística Reversa Gratuita</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 h-16 w-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:scale-110 hover:shadow-green-500/50 transition-all z-50 animate-bounce group">
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
           <span className="absolute right-20 bg-background text-foreground text-sm font-semibold py-2 px-4 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border pointer-events-none">
             Precisa de um orçamento?
           </span>
        </a>
      </div>
    </div>
  );
}
