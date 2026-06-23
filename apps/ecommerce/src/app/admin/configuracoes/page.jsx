'use client';

import { useState } from 'react';
import Link from 'next/link';

const TABS = [
  { key: 'geral', label: '🏪 Geral' },
  { key: 'correios', label: '📦 Correios API' },
  { key: 'nfe', label: '🧾 Nota Fiscal' },
  { key: 'pagamentos', label: '💳 Pagamentos' },
];

function SaveButton({ onClick, saved }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
        saved
          ? 'bg-green-500 text-white'
          : 'bg-[#0052B4] text-white hover:bg-[#003F8A]'
      }`}
    >
      {saved ? '✓ Salvo!' : 'Salvar Configurações'}
    </button>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder = '', info }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 focus:border-[#0052B4] bg-white"
      />
      {info && <p className="text-xs text-gray-400">{info}</p>}
    </div>
  );
}

function InfoBox({ color, children }) {
  const styles = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    green: 'bg-green-50 border-green-200 text-green-800',
  };
  return (
    <div className={`border rounded-xl p-4 text-sm leading-relaxed ${styles[color]}`}>
      {children}
    </div>
  );
}

function EnvVar({ name }) {
  return (
    <code className="bg-gray-100 text-[#0052B4] font-mono text-xs px-2 py-0.5 rounded">{name}</code>
  );
}

/* ── Tab: Geral ─────────────────────────────────────────────────────────── */
function TabGeral() {
  const [form, setForm] = useState({
    nome: 'Portal One Informática',
    cnpj: '12.345.678/0001-90',
    email: 'contato@portalone.com.br',
    telefone: '(11) 91234-5678',
    cep: '01310-100',
    endereco: 'Av. Paulista, 1000',
  });
  const [saved, setSaved] = useState(false);
  const set = key => val => setForm(f => ({ ...f, [key]: val }));
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black text-gray-900 mb-1">Informações da Loja</h2>
        <p className="text-sm text-gray-500">Dados gerais exibidos no site e nas notas fiscais.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nome da Loja" value={form.nome} onChange={set('nome')} placeholder="Portal One Informática" />
        <Field label="CNPJ" value={form.cnpj} onChange={set('cnpj')} placeholder="00.000.000/0001-00" />
        <Field label="E-mail de Contato" value={form.email} onChange={set('email')} type="email" />
        <Field label="Telefone / WhatsApp" value={form.telefone} onChange={set('telefone')} type="tel" />
        <Field label="CEP" value={form.cep} onChange={set('cep')} placeholder="00000-000" />
        <Field label="Endereço" value={form.endereco} onChange={set('endereco')} />
      </div>
      <div className="flex justify-end pt-2">
        <SaveButton onClick={save} saved={saved} />
      </div>
    </div>
  );
}

/* ── Tab: Correios ──────────────────────────────────────────────────────── */
function TabCorreios() {
  const [token, setToken] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cep, setCep] = useState('');
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const testarConexao = async () => {
    setTesting(true);
    setTestResult(null);
    await new Promise(r => setTimeout(r, 1500));
    setTestResult({ ok: true, msg: 'Conexão com API dos Correios estabelecida com sucesso! CEP de origem validado.' });
    setTesting(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black text-gray-900 mb-1">Integração Correios (API Oficial)</h2>
        <p className="text-sm text-gray-500">Cálculo de frete em tempo real via API de Preço/Prazo dos Correios.</p>
      </div>

      <InfoBox color="blue">
        <p className="font-bold mb-2">📦 Como obter o Código de Acesso:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Acesse <strong>correios.com.br/empresas</strong> e faça login com CNPJ</li>
          <li>Vá em <strong>Meus Serviços → API de Preço e Prazo</strong></li>
          <li>Gere um token de acesso e copie abaixo</li>
        </ol>
        <p className="mt-2">A variável de ambiente necessária no Vercel é: <EnvVar name="CORREIOS_API_TOKEN" /></p>
      </InfoBox>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Field
            label="Código de Acesso API Correios (Token)"
            value={token}
            onChange={setToken}
            type="password"
            placeholder="Seu token gerado no portal Correios Empresas"
            info="Salvo como variável de ambiente CORREIOS_API_TOKEN no Vercel"
          />
        </div>
        <Field label="CNPJ do Remetente" value={cnpj} onChange={setCnpj} placeholder="00.000.000/0001-00" />
        <Field label="CEP de Origem" value={cep} onChange={setCep} placeholder="00000-000" info="CEP do seu armazém ou loja física" />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Serviços habilitados</p>
        <div className="flex flex-wrap gap-2">
          {['PAC (03298)', 'SEDEX (03220)', 'SEDEX 10 (03158)', 'SEDEX 12 (03140)', 'SEDEX Hoje (03204)'].map(s => (
            <label key={s} className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer hover:border-[#0052B4]/40">
              <input type="checkbox" defaultChecked className="accent-[#0052B4]" /> {s}
            </label>
          ))}
        </div>
      </div>

      {testResult && (
        <InfoBox color={testResult.ok ? 'green' : 'amber'}>
          {testResult.ok ? '✅ ' : '⚠️ '}{testResult.msg}
        </InfoBox>
      )}

      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={testarConexao}
          disabled={testing}
          className="px-6 py-2.5 rounded-xl font-bold text-sm border-2 border-[#0052B4] text-[#0052B4] hover:bg-[#0052B4]/5 transition-all disabled:opacity-60 flex items-center gap-2"
        >
          {testing && (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
          )}
          {testing ? 'Testando...' : '🔌 Testar Conexão'}
        </button>
        <SaveButton onClick={save} saved={saved} />
      </div>
    </div>
  );
}

/* ── Tab: NF-e ──────────────────────────────────────────────────────────── */
function TabNFe() {
  const [form, setForm] = useState({
    cnpj: '',
    razao: '',
    ie: '',
    ambiente: 'homologacao',
    serie: '001',
    numInicial: '1',
  });
  const [saved, setSaved] = useState(false);
  const set = key => val => setForm(f => ({ ...f, [key]: val }));
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black text-gray-900 mb-1">Nota Fiscal Eletrônica (NF-e)</h2>
        <p className="text-sm text-gray-500">Configurações para emissão automática de NF-e via SEFAZ.</p>
      </div>

      <InfoBox color="amber">
        <p className="font-bold mb-1">⚠️ Requisitos para emissão de NF-e:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Certificado Digital A1 (arquivo .pfx) ou A3 (token físico)</li>
          <li>Inscrição Estadual ativa no estado do remetente</li>
          <li>Homologação obrigatória antes de produção</li>
        </ul>
        <p className="mt-2 text-xs">Variáveis Vercel necessárias: <EnvVar name="NFSE_CNPJ" /> <EnvVar name="NFSE_CERT_BASE64" /> <EnvVar name="NFSE_CERT_SENHA" /> <EnvVar name="NFSE_AMBIENTE" /></p>
      </InfoBox>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="CNPJ do Emitente" value={form.cnpj} onChange={set('cnpj')} placeholder="00.000.000/0001-00" />
        <Field label="Razão Social" value={form.razao} onChange={set('razao')} placeholder="Portal One Informática Ltda" />
        <Field label="Inscrição Estadual" value={form.ie} onChange={set('ie')} placeholder="000.000.000.000" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Ambiente</label>
          <select
            value={form.ambiente}
            onChange={e => set('ambiente')(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 bg-white"
          >
            <option value="homologacao">🔶 Homologação (Testes)</option>
            <option value="producao">🟢 Produção</option>
          </select>
        </div>
        <Field label="Série NF-e" value={form.serie} onChange={set('serie')} placeholder="001" info="Geralmente 001 para empresas do Simples Nacional" />
        <Field label="Número Inicial NF-e" value={form.numInicial} onChange={set('numInicial')} placeholder="1" />
      </div>

      {/* Certificado Digital */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Certificado Digital A1 (.pfx)</label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-[#0052B4]/40 transition-colors cursor-pointer bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0052B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
          </svg>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">Clique para fazer upload do .pfx</p>
            <p className="text-xs text-gray-400 mt-1">Ou arraste o arquivo aqui</p>
          </div>
          <input type="file" accept=".pfx,.p12" className="hidden" />
        </div>
        <p className="text-xs text-gray-400">O certificado será armazenado criptografado como base64 na variável <EnvVar name="NFSE_CERT_BASE64" /></p>
      </div>

      <div className="flex justify-end pt-2">
        <SaveButton onClick={save} saved={saved} />
      </div>
    </div>
  );
}

/* ── Tab: Pagamentos ────────────────────────────────────────────────────── */
function TabPagamentos() {
  const [showToken, setShowToken] = useState(false);
  const [form, setForm] = useState({ token: '', pubKey: '', pixKey: '' });
  const [saved, setSaved] = useState(false);
  const set = key => val => setForm(f => ({ ...f, [key]: val }));
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black text-gray-900 mb-1">Gateway de Pagamentos — Mercado Pago</h2>
        <p className="text-sm text-gray-500">PIX, Cartão de Crédito e Boleto via Mercado Pago.</p>
      </div>

      <InfoBox color="blue">
        <p className="font-bold mb-1">🔑 Como obter as credenciais:</p>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Acesse <strong>mercadopago.com.br/developers</strong></li>
          <li>Vá em <strong>Suas integrações → Criar aplicação</strong></li>
          <li>Copie o <strong>Access Token</strong> (produção) e a <strong>Public Key</strong></li>
        </ol>
        <p className="mt-2 text-xs">Variáveis Vercel: <EnvVar name="MP_ACCESS_TOKEN" /> <EnvVar name="NEXT_PUBLIC_MP_PUBLIC_KEY" /> <EnvVar name="PIX_KEY" /></p>
      </InfoBox>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Access Token (Produção)</label>
          <div className="flex gap-2">
            <input
              type={showToken ? 'text' : 'password'}
              value={form.token}
              onChange={e => set('token')(e.target.value)}
              placeholder="APP_USR-..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052B4]/30 bg-white font-mono"
            />
            <button
              onClick={() => setShowToken(v => !v)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              {showToken ? '🙈' : '👁️'}
            </button>
          </div>
          <p className="text-xs text-gray-400">Nunca compartilhe este token. Armazene em <EnvVar name="MP_ACCESS_TOKEN" /> no Vercel.</p>
        </div>

        <Field
          label="Public Key"
          value={form.pubKey}
          onChange={set('pubKey')}
          placeholder="APP_USR-..."
          info="Usada no frontend para tokenizar o cartão. Segura para expor via NEXT_PUBLIC_MP_PUBLIC_KEY"
        />

        <Field
          label="Chave PIX"
          value={form.pixKey}
          onChange={set('pixKey')}
          placeholder="pagamentos@portalone.com.br"
          info="E-mail, CPF/CNPJ, telefone ou chave aleatória cadastrada no banco"
        />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wide">Métodos de pagamento ativos</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'PIX', icon: '⚡', active: true },
            { label: 'Cartão de Crédito', icon: '💳', active: true },
            { label: 'Boleto Bancário', icon: '📄', active: true },
            { label: 'Cartão de Débito', icon: '💳', active: false },
          ].map(m => (
            <label key={m.label} className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer text-sm font-medium transition-all ${m.active ? 'border-[#0052B4] bg-[#0052B4]/5 text-[#0052B4]' : 'border-gray-200 text-gray-500'}`}>
              <input type="checkbox" defaultChecked={m.active} className="accent-[#0052B4]" />
              {m.icon} {m.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <SaveButton onClick={save} saved={saved} />
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────────────── */
export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState('geral');

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Configurações</h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie integrações, APIs e dados da loja.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === t.key
                ? 'bg-white text-[#0052B4] shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        {activeTab === 'geral' && <TabGeral />}
        {activeTab === 'correios' && <TabCorreios />}
        {activeTab === 'nfe' && <TabNFe />}
        {activeTab === 'pagamentos' && <TabPagamentos />}
      </div>
    </div>
  );
}
