'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const INITIAL_ITEMS = [
  { id: 1, name: 'Dell Latitude 5420 — Intel Core i7, 16GB RAM, SSD 512GB', sku: 'DL-LAT5420-I7', price: 7499.90, quantity: 1, category: 'Notebooks', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Monitor Dell P2422H — Full HD 24" IPS, DisplayPort, HDMI', sku: 'DL-P2422H', price: 1890.00, quantity: 2, category: 'Monitores', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Switch Dell Networking S4048-ON — 48 portas SFP+', sku: 'DL-S4048ON', price: 12350.00, quantity: 1, category: 'Redes', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&auto=format&fit=crop' },
];

const SHIPPING_OPTIONS_MOCK = [
  { code: 'PAC', name: 'PAC', days: '5 a 8 dias úteis', price: 38.90 },
  { code: 'SEDEX', name: 'SEDEX', days: '1 a 3 dias úteis', price: 89.50 },
  { code: 'SEDEX10', name: 'SEDEX 10', days: '1 dia útil (até 10h)', price: 145.00 },
];

const COLORS = ['#0052B4', '#003F8A', '#1a6fce'];

function formatBRL(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function CarrinhoPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [mounted, setMounted] = useState(false);
  const [cep, setCep] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [shippingError, setShippingError] = useState('');
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => { setMounted(true); }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const total = subtotal + shippingCost;

  const updateQty = (id, delta) =>
    setItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));

  const removeItem = (id) => {
    setRemovingId(id);
    setTimeout(() => { setItems(prev => prev.filter(i => i.id !== id)); setRemovingId(null); }, 350);
  };

  const calcularFrete = async () => {
    const c = cep.replace(/\D/g, '');
    if (c.length !== 8) { setShippingError('CEP inválido. Insira 8 dígitos.'); return; }
    setShippingError(''); setLoadingShipping(true); setShippingOptions([]); setSelectedShipping(null);
    try {
      await new Promise(r => setTimeout(r, 1400));
      setShippingOptions(SHIPPING_OPTIONS_MOCK);
      setSelectedShipping(SHIPPING_OPTIONS_MOCK[0]);
    } catch { setShippingError('Erro ao calcular frete. Tente novamente.'); }
    finally { setLoadingShipping(false); }
  };

  const formatCep = (v) => { const d = v.replace(/\D/g, '').slice(0, 8); return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d; };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-black text-foreground">Seu Carrinho</h1>
          {items.length > 0 && (
            <span className="bg-brand text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
              {items.reduce((s, i) => s + i.quantity, 0)} {items.reduce((s, i) => s + i.quantity, 0) === 1 ? 'item' : 'itens'}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6 bg-white rounded-2xl border border-border shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-border">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            <h2 className="text-2xl font-bold text-foreground">Seu carrinho está vazio</h2>
            <p className="text-muted text-center max-w-xs">Adicione produtos incríveis ao seu carrinho e aproveite nossas condições exclusivas para empresas.</p>
            <Link href="/" className="bg-brand text-white font-bold px-8 py-3 rounded-xl hover:bg-brand-hover transition-all hover:shadow-lg hover:-translate-y-0.5">Explorar Produtos</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {items.map((item, idx) => (
                <div key={item.id} className="bg-white rounded-2xl border border-border shadow-sm p-5 flex gap-5 items-start group hover:border-brand/30 hover:shadow-md transition-all"
                  style={{ opacity: removingId === item.id ? 0 : 1, transform: removingId === item.id ? 'translateX(60px)' : 'translateX(0)', transition: 'opacity 0.35s ease, transform 0.35s ease' }}>
                  <div className="w-28 h-28 rounded-xl flex items-center justify-center flex-shrink-0 bg-white border border-border/50 overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain p-2 hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted font-medium mb-0.5">{item.category}</p>
                        <h3 className="font-bold text-foreground text-sm leading-snug group-hover:text-brand transition-colors">{item.name}</h3>
                        <p className="text-xs text-muted mt-1">SKU: {item.sku}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 flex-shrink-0" aria-label="Remover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                      <div className="flex items-center border border-border rounded-xl overflow-hidden shadow-sm">
                        <button onClick={() => updateQty(item.id, -1)} className="w-10 h-10 flex items-center justify-center hover:bg-muted-bg transition-colors font-bold text-lg">−</button>
                        <div className="w-12 h-10 flex items-center justify-center font-bold text-sm border-x border-border bg-background">{item.quantity}</div>
                        <button onClick={() => updateQty(item.id, 1)} className="w-10 h-10 flex items-center justify-center hover:bg-muted-bg transition-colors font-bold text-lg">+</button>
                      </div>
                      <div className="text-right">
                        {item.quantity > 1 && <p className="text-xs text-muted">{item.quantity} × {formatBRL(item.price)}</p>}
                        <p className="text-lg font-black text-foreground">{formatBRL(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between mt-2">
                <Link href="/" className="flex items-center gap-2 text-brand text-sm font-bold hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Continuar Comprando
                </Link>
                <p className="text-sm text-muted">Subtotal: <span className="font-bold text-foreground">{formatBRL(subtotal)}</span></p>
              </div>
            </div>

            <div className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-6">
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-brand to-brand-hover p-5">
                  <h2 className="text-white font-black text-lg">Resumo do Pedido</h2>
                </div>
                <div className="p-6 flex flex-col gap-5">
                  <div>
                    <label className="text-sm font-bold text-foreground mb-2 block">Calcular Frete e Prazo</label>
                    <div className="flex gap-2">
                      <input type="text" value={cep} onChange={e => setCep(formatCep(e.target.value))} placeholder="00000-000" maxLength={9}
                        className="flex-1 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all bg-background text-foreground placeholder:text-muted" />
                      <button onClick={calcularFrete} disabled={loadingShipping}
                        className="bg-brand text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-brand-hover transition-all disabled:opacity-60 flex items-center gap-2 shadow-sm">
                        {loadingShipping ? (
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect width="7" height="7" x="14" y="10" rx="1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                        )}
                        {loadingShipping ? 'Calculando...' : 'Calcular'}
                      </button>
                    </div>
                    {shippingError && <p className="text-red-500 text-xs mt-1.5 font-medium">{shippingError}</p>}
                  </div>

                  {shippingOptions.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-bold text-muted uppercase tracking-wide">Opções de Frete</p>
                      {shippingOptions.map(opt => (
                        <label key={opt.code} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedShipping?.code === opt.code ? 'border-brand bg-brand/5' : 'border-border hover:border-brand/40'}`}>
                          <input type="radio" name="shipping" value={opt.code} checked={selectedShipping?.code === opt.code} onChange={() => setSelectedShipping(opt)} className="accent-brand" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-sm text-foreground">{opt.name}</span>
                              <span className="font-black text-sm text-brand">{formatBRL(opt.price)}</span>
                            </div>
                            <p className="text-xs text-muted mt-0.5">{opt.days}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-border pt-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">Subtotal</span>
                      <span className="font-semibold text-foreground">{formatBRL(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">Frete</span>
                      <span className={`font-semibold ${selectedShipping ? 'text-foreground' : 'text-muted'}`}>{selectedShipping ? formatBRL(shippingCost) : 'A calcular'}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <span className="font-black text-foreground text-lg">Total</span>
                      <span className="font-black text-foreground text-2xl">{formatBRL(total)}</span>
                    </div>
                    <p className="text-xs text-muted text-right">ou até 12× de {formatBRL(total / 12)} sem juros</p>
                  </div>

                  <Link href="/checkout" className="w-full bg-brand text-white font-black text-base py-4 rounded-xl hover:bg-brand-hover transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    Ir para Checkout
                  </Link>

                  <div className="flex items-center justify-center gap-6 pt-1">
                    <div className="flex items-center gap-1.5 text-muted text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      SSL Seguro
                    </div>
                    <div className="flex items-center gap-1.5 text-muted text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                      Compra Protegida
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
