'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ORDER = {
  number: 'PO-2024-000001',
  date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
  paymentMethod: 'Cartão de Crédito — Visa •••• 4321',
  shipping: {
    address: 'Rua das Palmeiras, 123, Apto 4B — Centro, São Paulo / SP, 01310-100',
    method: 'SEDEX — 1 a 3 dias úteis',
  },
  estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }),
  items: [
    { name: 'Dell Latitude 5420 — i7, 16GB, SSD 512GB', qty: 1, price: 7499.90 },
    { name: 'Monitor Dell P2422H — 24" Full HD', qty: 2, price: 1890.00 },
    { name: 'Switch Dell S4048-ON — 48p SFP+', qty: 1, price: 12350.00 },
  ],
  total: 23629.40,
};

const TIMELINE = [
  { id: 1, label: 'Pedido Recebido', sublabel: 'Seu pedido foi confirmado', icon: 'check', status: 'done', date: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) },
  { id: 2, label: 'Pagamento Confirmado', sublabel: 'Aguardando confirmação do pagamento', icon: 'pulse', status: 'active', date: 'Em andamento...' },
  { id: 3, label: 'Em Processamento', sublabel: 'Separação e embalagem do pedido', icon: 'box', status: 'pending', date: '' },
  { id: 4, label: 'Enviado', sublabel: 'Rastreamento disponível em breve', icon: 'truck', status: 'pending', date: '' },
  { id: 5, label: 'Entregue', sublabel: 'Pedido entregue com sucesso', icon: 'home', status: 'pending', date: '' },
];

function formatBRL(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }

function TimelineIcon({ type, status }) {
  const color = status === 'done' ? '#6DA544' : status === 'active' ? '#0052B4' : '#E2E8F0';
  const stroke = status === 'pending' ? '#656565' : 'white';
  if (type === 'check') return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;
  if (type === 'box') return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>;
  if (type === 'truck') return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect width="7" height="7" x="14" y="10" rx="1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>;
  if (type === 'home') return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

export default function ConfirmacaoPage() {
  const [checkDone, setCheckDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setCheckDone(true), 200);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  const subtotal = ORDER.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto max-w-5xl px-4">

        {/* SUCCESS HERO */}
        <div className="text-center mb-12">
          {/* Animated Checkmark */}
          <div className="relative w-28 h-28 mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="w-28 h-28">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#E2E8F0" strokeWidth="8" />
              <circle cx="50" cy="50" r="46" fill="none" stroke="#6DA544" strokeWidth="8" strokeLinecap="round"
                style={{
                  strokeDasharray: '289',
                  strokeDashoffset: checkDone ? '0' : '289',
                  transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)',
                  transformOrigin: '50% 50%',
                  transform: 'rotate(-90deg)',
                }}
              />
              <path d="M 30 52 L 44 66 L 70 38" fill="none" stroke="#6DA544" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  strokeDasharray: '60',
                  strokeDashoffset: checkDone ? '0' : '60',
                  transition: 'stroke-dashoffset 0.5s 0.7s cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            </svg>
          </div>

          <h1 className="text-4xl font-black text-foreground mb-3">Pedido Confirmado!</h1>
          <p className="text-muted text-lg mb-4">Obrigado pela sua compra. Você receberá um e-mail com os detalhes do pedido.</p>
          <div className="inline-flex items-center gap-3 bg-brand/5 border border-brand/20 rounded-2xl px-6 py-3">
            <span className="text-muted text-sm">Número do Pedido:</span>
            <span className="font-black text-brand text-xl tracking-wide">{ORDER.number}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* LEFT: Timeline + Summary */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            {/* Order Timeline */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-lg font-black text-foreground mb-6">Status do Pedido</h2>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border" />
                <div className="flex flex-col gap-6">
                  {TIMELINE.map((step) => (
                    <div key={step.id} className="flex items-start gap-4 relative">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-sm transition-all ${
                        step.status === 'done' ? 'bg-success shadow-success/30' :
                        step.status === 'active' ? 'bg-brand shadow-brand/30' :
                        'bg-white border-2 border-border'
                      } ${step.status === 'active' ? 'ring-4 ring-brand/20' : ''}`}
                        style={step.status === 'active' ? { animation: 'pulse 2s infinite' } : {}}>
                        <TimelineIcon type={step.icon} status={step.status} />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-2">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <h3 className={`font-bold text-sm ${step.status === 'pending' ? 'text-muted' : 'text-foreground'}`}>{step.label}</h3>
                          {step.date && <span className="text-xs text-muted">{step.date}</span>}
                        </div>
                        <p className="text-xs text-muted mt-0.5">{step.sublabel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Details Card */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-lg font-black text-foreground mb-4">Detalhes do Pedido</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-background rounded-xl p-4">
                  <p className="text-xs text-muted mb-1 font-semibold uppercase tracking-wide">Pagamento</p>
                  <p className="text-sm font-bold text-foreground">{ORDER.paymentMethod}</p>
                </div>
                <div className="bg-background rounded-xl p-4">
                  <p className="text-xs text-muted mb-1 font-semibold uppercase tracking-wide">Entrega Estimada</p>
                  <p className="text-sm font-bold text-foreground">{ORDER.estimatedDelivery}</p>
                </div>
                <div className="bg-background rounded-xl p-4 sm:col-span-2">
                  <p className="text-xs text-muted mb-1 font-semibold uppercase tracking-wide">Endereço de Entrega</p>
                  <p className="text-sm font-bold text-foreground">{ORDER.shipping.address}</p>
                  <p className="text-xs text-muted mt-1">{ORDER.shipping.method}</p>
                </div>
              </div>

              {/* Items */}
              <div className="border-t border-border pt-4">
                <p className="text-sm font-bold text-foreground mb-3">Itens do Pedido</p>
                {ORDER.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="bg-brand text-white text-xs font-bold px-2 py-0.5 rounded flex-shrink-0">{item.qty}×</span>
                      <p className="text-sm text-foreground font-medium line-clamp-1">{item.name}</p>
                    </div>
                    <p className="font-bold text-sm text-foreground flex-shrink-0">{formatBRL(item.price * item.qty)}</p>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 mt-1">
                  <span className="font-black text-foreground">Total</span>
                  <span className="font-black text-xl text-brand">{formatBRL(ORDER.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="lg:col-span-2 flex flex-col gap-4 lg:sticky lg:top-6">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h3 className="font-black text-foreground mb-4">Próximos Passos</h3>
              <div className="flex flex-col gap-3">
                <Link href="/minha-conta/pedidos"
                  className="w-full bg-brand text-white font-bold py-3.5 rounded-xl hover:bg-brand-hover transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Acompanhar Pedido
                </Link>
                <Link href="/"
                  className="w-full border-2 border-brand text-brand font-bold py-3.5 rounded-xl hover:bg-brand/5 transition-all flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Continuar Comprando
                </Link>
                <a href="https://wa.me/5511999999999?text=Olá!%20Tenho%20dúvidas%20sobre%20meu%20pedido%20PO-2024-000001"
                  target="_blank" rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl hover:bg-[#20BB5A] transition-all flex items-center justify-center gap-2 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Falar com Suporte
                </a>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-success/5 border border-success/20 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6DA544" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">Compra Garantida</p>
                <p className="text-xs text-muted mt-0.5">Seus dados estão protegidos e o pagamento foi processado com segurança via Mercado Pago.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,82,180,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(0,82,180,0); }
        }
      `}</style>
    </div>
  );
}
