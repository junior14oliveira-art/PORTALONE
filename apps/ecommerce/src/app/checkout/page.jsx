'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const STEPS = [
  { id: 1, label: 'Identificação', icon: 'user' },
  { id: 2, label: 'Endereço & Frete', icon: 'map' },
  { id: 3, label: 'Pagamento', icon: 'card' },
];

const SHIPPING_MOCK = [
  { code: 'PAC', name: 'PAC', days: '5 a 8 dias úteis', price: 38.90 },
  { code: 'SEDEX', name: 'SEDEX', days: '1 a 3 dias úteis', price: 89.50 },
  { code: 'SEDEX10', name: 'SEDEX 10', days: '1 dia útil (até 10h)', price: 145.00 },
];

const CART_ITEMS = [
  { id: 1, name: 'Dell Latitude 5420 — i7, 16GB, SSD 512GB', price: 7499.90, qty: 1 },
  { id: 2, name: 'Monitor Dell P2422H — 24" Full HD', price: 1890.00, qty: 2 },
  { id: 3, name: 'Switch Dell S4048-ON — 48p SFP+', price: 12350.00, qty: 1 },
];

function formatBRL(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }

function StepIcon({ type, active }) {
  const color = active ? '#0052B4' : '#656565';
  if (type === 'user') return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  if (type === 'map') return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
}

function InputField({ label, value, onChange, placeholder, type = 'text', required, half }) {
  return (
    <div className={half ? 'flex flex-col gap-1.5' : 'flex flex-col gap-1.5'}>
      <label className="text-sm font-semibold text-foreground">{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all bg-white text-foreground placeholder:text-muted" />
    </div>
  );
}

/* -------- STEP 1 -------- */
function Step1({ onNext }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const handleSubmit = () => {
    if (mode === 'login' && (!email || !password)) return;
    if (mode === 'guest' && (!nome || !guestEmail)) return;
    onNext();
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
      <h2 className="text-2xl font-black text-foreground mb-6">Identificação</h2>
      <div className="flex gap-3 mb-8">
        {[{ key: 'login', label: 'Já tenho cadastro' }, { key: 'guest', label: 'Continuar como Visitante' }].map(opt => (
          <button key={opt.key} onClick={() => setMode(opt.key)}
            className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${mode === opt.key ? 'border-brand bg-brand text-white shadow-md' : 'border-border text-muted hover:border-brand/40'}`}>
            {opt.label}
          </button>
        ))}
      </div>

      {mode === 'login' ? (
        <div className="flex flex-col gap-4">
          <InputField label="E-mail" value={email} onChange={setEmail} placeholder="seuemail@empresa.com.br" type="email" required />
          <InputField label="Senha" value={password} onChange={setPassword} placeholder="••••••••" type="password" required />
          <a href="#" className="text-brand text-sm font-medium hover:underline text-right">Esqueci minha senha</a>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <InputField label="Nome Completo" value={nome} onChange={setNome} placeholder="João Silva" required />
          <InputField label="E-mail" value={guestEmail} onChange={setGuestEmail} placeholder="seuemail@empresa.com.br" type="email" required />
          <InputField label="Telefone / WhatsApp" value={telefone} onChange={setTelefone} placeholder="(11) 91234-5678" type="tel" />
        </div>
      )}

      <button onClick={handleSubmit} className="mt-8 w-full bg-brand text-white font-black py-4 rounded-xl hover:bg-brand-hover transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base shadow-md">
        Continuar
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </button>
    </div>
  );
}

/* -------- STEP 2 -------- */
function Step2({ onNext, shipping, setShipping }) {
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  const formatCep = (v) => { const d = v.replace(/\D/g, '').slice(0, 8); return d.length > 5 ? `${d.slice(0,5)}-${d.slice(5)}` : d; };

  const fetchCep = async () => {
    const c = cep.replace(/\D/g, '');
    if (c.length !== 8) return;
    setLoadingCep(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      setRua('Rua das Palmeiras');
      setBairro('Centro');
      setCidade('São Paulo');
      setEstado('SP');
    } finally { setLoadingCep(false); }
  };

  const calcFrete = async () => {
    setLoadingShipping(true);
    setShippingOptions([]);
    setShipping(null);
    await new Promise(r => setTimeout(r, 1200));
    setShippingOptions(SHIPPING_MOCK);
    setShipping(SHIPPING_MOCK[0]);
    setLoadingShipping(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
      <h2 className="text-2xl font-black text-foreground mb-6">Endereço de Entrega</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="sm:col-span-2 flex gap-3">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-foreground">CEP <span className="text-red-400">*</span></label>
            <div className="flex gap-2">
              <input type="text" value={cep} onChange={e => setCep(formatCep(e.target.value))} onBlur={fetchCep} placeholder="00000-000" maxLength={9}
                className="flex-1 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all bg-white" />
              <button onClick={fetchCep} disabled={loadingCep} className="bg-muted-bg text-foreground font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-brand hover:text-white transition-all disabled:opacity-60">
                {loadingCep ? '...' : 'Buscar'}
              </button>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2"><InputField label="Rua / Logradouro" value={rua} onChange={setRua} placeholder="Rua das Palmeiras" required /></div>
        <InputField label="Número" value={numero} onChange={setNumero} placeholder="123" required />
        <InputField label="Complemento" value={complemento} onChange={setComplemento} placeholder="Apto 4B, Bloco C" />
        <InputField label="Bairro" value={bairro} onChange={setBairro} placeholder="Centro" required />
        <InputField label="Cidade" value={cidade} onChange={setCidade} placeholder="São Paulo" required />
        <InputField label="Estado" value={estado} onChange={setEstado} placeholder="SP" required />
      </div>

      <button onClick={calcFrete} disabled={loadingShipping}
        className="w-full border-2 border-brand text-brand font-bold py-3 rounded-xl hover:bg-brand hover:text-white transition-all flex items-center justify-center gap-2 mb-6 disabled:opacity-60">
        {loadingShipping ? <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> : null}
        {loadingShipping ? 'Calculando Frete...' : 'Calcular Frete'}
      </button>

      {shippingOptions.length > 0 && (
        <div className="flex flex-col gap-3 mb-6">
          <p className="text-sm font-bold text-foreground">Escolha o Tipo de Entrega</p>
          {shippingOptions.map(opt => (
            <label key={opt.code} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${shipping?.code === opt.code ? 'border-brand bg-brand/5 shadow-sm' : 'border-border hover:border-brand/40'}`}>
              <input type="radio" name="ship" value={opt.code} checked={shipping?.code === opt.code} onChange={() => setShipping(opt)} className="accent-brand w-4 h-4" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-black text-foreground">{opt.name}</span>
                    <span className="ml-2 text-xs text-muted bg-muted-bg px-2 py-0.5 rounded-full">{opt.days}</span>
                  </div>
                  <span className="font-black text-brand text-lg">{formatBRL(opt.price)}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      )}

      <button onClick={onNext} disabled={!shipping}
        className="w-full bg-brand text-white font-black py-4 rounded-xl hover:bg-brand-hover transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-md disabled:opacity-40 disabled:cursor-not-allowed text-base">
        Confirmar Endereço e Frete
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </button>
    </div>
  );
}

/* -------- STEP 3 -------- */
function Step3({ shipping }) {
  const [payMethod, setPayMethod] = useState('pix');
  const [cardNum, setCardNum] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardFlipped, setCardFlipped] = useState(false);
  const [installments, setInstallments] = useState(1);
  const [pixTimer, setPixTimer] = useState(900);

  useEffect(() => {
    if (payMethod !== 'pix') return;
    const t = setInterval(() => setPixTimer(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, [payMethod]);

  const subtotal = CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost = shipping ? shipping.price : 0;
  const total = subtotal + shippingCost;

  const pixKey = 'pagamentos@portalone.com.br';
  const formatTimer = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const formatCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d; };

  const TABS = [
    { key: 'pix', label: 'PIX', icon: '⚡' },
    { key: 'card', label: 'Cartão de Crédito', icon: '💳' },
    { key: 'boleto', label: 'Boleto', icon: '📄' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
      <h2 className="text-2xl font-black text-foreground mb-2">Pagamento</h2>
      <p className="text-sm text-muted mb-6 flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        Pagamento processado com segurança pelo Mercado Pago
      </p>

      {/* Payment Method Tabs */}
      <div className="flex gap-2 mb-8 bg-muted-bg p-1.5 rounded-2xl">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setPayMethod(t.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${payMethod === t.key ? 'bg-white text-brand shadow-sm' : 'text-muted hover:text-foreground'}`}>
            <span>{t.icon}</span> <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* PIX */}
      {payMethod === 'pix' && (
        <div className="flex flex-col items-center gap-6">
          <div className={`border-2 border-dashed rounded-2xl p-8 text-center ${pixTimer < 60 ? 'border-red-300 bg-red-50' : 'border-border bg-muted-bg'}`}>
            <div className="w-44 h-44 mx-auto bg-white rounded-xl flex items-center justify-center border border-border shadow-sm mb-4">
              <div className="grid grid-cols-7 gap-0.5 w-32 h-32 p-2">
                {Array.from({length: 49}, (_, i) => (
                  <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-foreground' : 'bg-white'}`} style={{borderRadius: '1px'}} />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted mb-2">QR Code válido por</p>
            <div className={`text-3xl font-black tabular-nums ${pixTimer < 60 ? 'text-red-500' : 'text-brand'}`}>{formatTimer(pixTimer)}</div>
          </div>
          <div className="w-full bg-muted-bg rounded-xl p-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted mb-0.5">Chave PIX (e-mail)</p>
              <p className="font-bold text-sm text-foreground">{pixKey}</p>
            </div>
            <button onClick={() => navigator.clipboard?.writeText(pixKey)}
              className="bg-brand text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-brand-hover transition-colors flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              Copiar
            </button>
          </div>
          <div className="w-full">
            <p className="text-sm font-bold text-foreground mb-3">Como pagar:</p>
            {['Abra o app do seu banco', 'Acesse Pix → Pagar → QR Code', 'Escaneie o código ou use a chave', 'Confirme o pagamento'].map((s, i) => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center text-xs font-black flex-shrink-0">{i + 1}</div>
                <p className="text-sm text-foreground">{s}</p>
              </div>
            ))}
          </div>
          <div className="w-full border-t border-border pt-4 flex items-center justify-between">
            <span className="font-bold text-foreground">Total a pagar:</span>
            <span className="text-2xl font-black text-brand">{formatBRL(total)}</span>
          </div>
        </div>
      )}

      {/* CARTÃO */}
      {payMethod === 'card' && (
        <div className="flex flex-col gap-6">
          {/* Card Preview */}
          <div className="relative h-48 w-full max-w-sm mx-auto" style={{ perspective: '1000px' }}>
            <div style={{ transformStyle: 'preserve-3d', transform: cardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.6s ease', width: '100%', height: '100%', position: 'relative' }}>
              {/* Front */}
              <div style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
                className="bg-gradient-to-br from-brand to-brand-hover rounded-2xl p-6 shadow-xl text-white">
                <div className="flex justify-between items-start mb-8">
                  <div className="text-xl font-black opacity-90">PORTALONE</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                </div>
                <div className="text-lg font-mono tracking-widest mb-4 opacity-90">{cardNum || '•••• •••• •••• ••••'}</div>
                <div className="flex items-end justify-between">
                  <div><p className="text-xs opacity-70">Titular</p><p className="font-bold text-sm uppercase">{cardName || 'SEU NOME'}</p></div>
                  <div><p className="text-xs opacity-70">Validade</p><p className="font-bold text-sm">{cardExpiry || 'MM/AA'}</p></div>
                </div>
              </div>
              {/* Back */}
              <div style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0, transform: 'rotateY(180deg)' }}
                className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-xl overflow-hidden">
                <div className="h-12 bg-gray-900 mt-6 mb-4" />
                <div className="px-6 flex items-center gap-3">
                  <div className="flex-1 h-10 bg-gray-100 rounded" />
                  <div className="w-14 h-10 bg-white rounded flex items-center justify-center font-black text-gray-800">{cardCvv || '•••'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Número do Cartão</label>
              <input type="text" value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))} placeholder="0000 0000 0000 0000" maxLength={19}
                className="border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all font-mono tracking-widest" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Nome no Cartão</label>
              <input type="text" value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} placeholder="NOME SOBRENOME"
                className="border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all uppercase" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">Validade</label>
                <input type="text" value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))} placeholder="MM/AA" maxLength={5}
                  className="border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">CVV</label>
                <input type="text" value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g,'').slice(0,4))}
                  onFocus={() => setCardFlipped(true)} onBlur={() => setCardFlipped(false)} placeholder="•••" maxLength={4}
                  className="border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Parcelas</label>
              <select value={installments} onChange={e => setInstallments(Number(e.target.value))}
                className="border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all bg-white">
                {Array.from({length: 12}, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}× de {formatBRL(total / n)}{n === 1 ? ' à vista' : ' sem juros'}</option>
                ))}
              </select>
            </div>
          </div>
          <Link href="/checkout/confirmacao" className="w-full bg-brand text-white font-black py-4 rounded-xl hover:bg-brand-hover transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-md text-base">
            Finalizar Pedido
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      )}

      {/* BOLETO */}
      {payMethod === 'boleto' && (
        <div className="flex flex-col items-center gap-6">
          <div className="w-24 h-24 bg-muted-bg rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#0052B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm font-bold text-amber-800 mb-1">⚠️ Atenção</p>
            <p className="text-xs text-amber-700">O boleto vence em <strong>3 dias úteis</strong>. Após o pagamento, a compensação pode levar até 2 dias úteis.</p>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center justify-between p-4 bg-muted-bg rounded-xl">
              <span className="text-muted text-sm">Vencimento</span>
              <span className="font-bold text-foreground">
                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted-bg rounded-xl">
              <span className="text-muted text-sm">Valor Total</span>
              <span className="font-black text-2xl text-brand">{formatBRL(total)}</span>
            </div>
          </div>
          <button className="w-full bg-brand text-white font-black py-4 rounded-xl hover:bg-brand-hover transition-all hover:shadow-lg flex items-center justify-center gap-2 shadow-md text-base">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Gerar Boleto
          </button>
        </div>
      )}
    </div>
  );
}

/* -------- ORDER SIDEBAR -------- */
function OrderSidebar({ shipping }) {
  const subtotal = CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost = shipping ? shipping.price : 0;
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden sticky top-6">
      <div className="bg-gradient-to-r from-brand to-brand-hover p-5">
        <h3 className="text-white font-black">Seu Pedido</h3>
      </div>
      <div className="p-5 flex flex-col gap-3">
        {CART_ITEMS.map(item => (
          <div key={item.id} className="flex items-start justify-between gap-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="bg-brand text-white text-xs font-bold px-1.5 py-0.5 rounded">{item.qty}×</span>
              <p className="text-foreground font-medium leading-tight line-clamp-2">{item.name}</p>
            </div>
            <p className="font-bold text-foreground flex-shrink-0">{formatBRL(item.price * item.qty)}</p>
          </div>
        ))}
        <div className="border-t border-border pt-3 mt-1 flex flex-col gap-2">
          <div className="flex justify-between text-sm"><span className="text-muted">Subtotal</span><span className="font-semibold">{formatBRL(subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted">Frete</span><span className="font-semibold">{shipping ? formatBRL(shippingCost) : '—'}</span></div>
          <div className="flex justify-between border-t border-border pt-2 mt-1">
            <span className="font-black text-foreground">Total</span>
            <span className="font-black text-xl text-foreground">{formatBRL(subtotal + shippingCost)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- MAIN -------- */
export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12 gap-0">
          {STEPS.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <button onClick={() => s.id < step && setStep(s.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-bold text-sm ${step === s.id ? 'bg-brand text-white shadow-md' : step > s.id ? 'bg-success/10 text-success cursor-pointer hover:bg-success/20' : 'bg-white text-muted border border-border'}`}>
                {step > s.id ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                ) : (
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${step === s.id ? 'bg-white text-brand' : 'border-2 border-current'}`}>{s.id}</div>
                )}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {idx < STEPS.length - 1 && (
                <div className={`h-0.5 w-8 md:w-16 transition-colors ${step > s.id ? 'bg-success' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Content */}
          <div className="flex-1 min-w-0" key={step} style={{ animation: 'slideIn 0.3s ease' }}>
            {step === 1 && <Step1 onNext={() => setStep(2)} />}
            {step === 2 && <Step2 onNext={() => setStep(3)} shipping={shipping} setShipping={setShipping} />}
            {step === 3 && <Step3 shipping={shipping} />}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <OrderSidebar shipping={shipping} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
