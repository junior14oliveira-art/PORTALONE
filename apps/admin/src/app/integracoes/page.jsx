"use client";

import { useState } from 'react';

const TABS = ['Loja', 'Correios', 'Mercado Pago', 'Nota Fiscal (NF-e)', 'WhatsApp'];

export default function IntegracoesPage() {
  const [activeTab, setActiveTab] = useState('Mercado Pago');
  const [toast, setToast] = useState(false);

  const handleSave = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">Integrações e Configurações</h1>
        <p className="text-sm text-[#888888] mt-1">Configure meios de pagamento, frete e comunicação.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-[rgba(255,255,255,0.08)] mb-6">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab 
                ? 'border-[#FF6600] text-white' 
                : 'border-transparent text-[#888888] hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass-card max-w-3xl">
        {/* === ABA LOJA === */}
        {activeTab === 'Loja' && (
          <div className="p-6 space-y-6" style={{ animation: 'fadeIn 0.3s' }}>
            <h2 className="text-lg font-medium text-white mb-4">Informações da Loja</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#888888] mb-1">Nome da Loja</label>
                <input type="text" defaultValue="PORTALONE" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-[#888888] mb-1">CEP de Origem</label>
                <input type="text" defaultValue="01310-100" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#888888] mb-1">E-mail de Contato</label>
                <input type="email" defaultValue="contato@portalone.com.br" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-[#888888] mb-1">Telefone Principal</label>
                <input type="text" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none" />
              </div>
            </div>
          </div>
        )}

        {/* === ABA CORREIOS === */}
        {activeTab === 'Correios' && (
          <div className="p-6 space-y-6" style={{ animation: 'fadeIn 0.3s' }}>
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
              <div>
                <h2 className="text-lg font-medium text-white">Integração Correios (SIGEP)</h2>
                <p className="text-sm text-[#888888]">Calcule frete e emita etiquetas automaticamente.</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="block bg-[#FF6600] w-10 h-6 rounded-full"></div>
                  <div className="dot absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
              </label>
            </div>
            
            <div className="p-4 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg mb-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p className="text-sm text-[#888888]">Para utilizar esta integração você precisa de um contrato corporativo com os Correios. Entre em contato com seu gerente comercial para obter as credenciais do SIGEP Web.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#888888] mb-1">Usuário Correios</label>
                <input type="text" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-[#888888] mb-1">Senha</label>
                <input type="password" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#888888] mb-1">Número do Contrato</label>
                <input type="text" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-[#888888] mb-1">Cartão de Postagem</label>
                <input type="text" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#888888] mb-1">Ambiente</label>
              <select className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none">
                <option>Homologação</option>
                <option>Produção</option>
              </select>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button className="px-4 py-2 border border-[rgba(255,255,255,0.08)] rounded-lg text-sm text-white hover:bg-[#111111]">Testar Conexão</button>
            </div>
          </div>
        )}

        {/* === ABA MERCADO PAGO === */}
        {activeTab === 'Mercado Pago' && (
          <div className="p-6 space-y-6" style={{ animation: 'fadeIn 0.3s' }}>
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
              <div>
                <h2 className="text-lg font-medium text-white">Mercado Pago Checkout Pro</h2>
                <p className="text-sm text-[#888888]">Receba por PIX, Cartão e Boleto.</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="block bg-[#FF6600] w-10 h-6 rounded-full"></div>
                  <div className="dot absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
              </label>
            </div>

            <div className="p-4 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg flex items-start gap-3">
              <span className="text-[#FF6600] font-bold">1</span>
              <p className="text-sm text-[#888888]">Crie uma conta no <a href="https://www.mercadopago.com.br/developers" target="_blank" className="text-[#FF6600] hover:underline">Painel de Desenvolvedor</a>, crie uma aplicação e copie suas credenciais abaixo.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <input type="checkbox" id="sandbox" defaultChecked className="accent-[#FF6600]" />
                <label htmlFor="sandbox" className="text-sm text-white">Modo Sandbox (Testes)</label>
              </div>

              <div>
                <label className="block text-sm text-[#888888] mb-1">Public Key</label>
                <input type="text" placeholder="TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none font-mono text-sm" />
              </div>
              <div>
                <label className="block text-sm text-[#888888] mb-1">Access Token</label>
                <input type="password" placeholder="TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none font-mono text-sm" />
              </div>
              <div>
                <label className="block text-sm text-[#888888] mb-1">URL de Notificação (Webhook IPN)</label>
                <div className="flex gap-2">
                  <input type="text" readOnly value="https://api.portalone.com.br/api/payments/mp/webhook" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-[#888888] cursor-not-allowed font-mono text-sm" />
                  <button className="px-3 py-2 border border-[rgba(255,255,255,0.08)] rounded-lg text-white hover:bg-[#111111]">Copiar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === ABA NFE === */}
        {activeTab === 'Nota Fiscal (NF-e)' && (
          <div className="p-6 space-y-6" style={{ animation: 'fadeIn 0.3s' }}>
             <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
              <div>
                <h2 className="text-lg font-medium text-white">Emissão de NF-e</h2>
                <p className="text-sm text-[#888888]">Emissão automática de notas fiscais após pagamento.</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" />
                  <div className="block bg-[#111111] w-10 h-6 rounded-full border border-[rgba(255,255,255,0.08)]"></div>
                  <div className="dot absolute left-1 top-1 bg-[#888888] w-4 h-4 rounded-full transition"></div>
                </div>
              </label>
            </div>

            <div className="p-4 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-lg flex items-start gap-3">
              <svg className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              <p className="text-sm text-[#EF4444]">A emissão de NF-e requer um certificado digital A1 válido e acompanhamento do seu contador responsável.</p>
            </div>

            <div>
              <label className="block text-sm text-[#888888] mb-1">Provedor de Emissão</label>
              <select className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none">
                <option>Focus NFe (Recomendado)</option>
                <option>WebmaniaBR</option>
                <option>Emissão Direta (Certificado A1)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#888888] mb-1">CNPJ da Empresa</label>
                <input type="text" placeholder="00.000.000/0000-00" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none font-mono text-sm" />
              </div>
              <div>
                <label className="block text-sm text-[#888888] mb-1">Série NF-e</label>
                <input type="number" defaultValue="1" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#888888] mb-1">API Token (Provedor)</label>
              <input type="password" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none font-mono text-sm" />
            </div>
          </div>
        )}

        {/* === ABA WHATSAPP === */}
        {activeTab === 'WhatsApp' && (
          <div className="p-6 space-y-6" style={{ animation: 'fadeIn 0.3s' }}>
             <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
              <div>
                <h2 className="text-lg font-medium text-white">Notificações por WhatsApp</h2>
                <p className="text-sm text-[#888888]">Avisos automatizados para os clientes.</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" />
                  <div className="block bg-[#111111] w-10 h-6 rounded-full border border-[rgba(255,255,255,0.08)]"></div>
                  <div className="dot absolute left-1 top-1 bg-[#888888] w-4 h-4 rounded-full transition"></div>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm text-[#888888] mb-1">WhatsApp Business API Token</label>
              <input type="password" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none font-mono text-sm" />
            </div>
            <div>
              <label className="block text-sm text-[#888888] mb-1">Número Registrado (+55)</label>
              <input type="text" placeholder="5511999999999" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-white focus:border-[#FF6600] focus:outline-none font-mono text-sm" />
            </div>

            <div>
              <h3 className="text-sm font-medium text-white mb-2">Gatilhos de Envio</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-[#888888] cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#FF6600]" />
                  Pedido Confirmado (Pagamento aprovado)
                </label>
                <label className="flex items-center gap-2 text-sm text-[#888888] cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#FF6600]" />
                  Pedido Enviado (Com código de rastreio)
                </label>
                <label className="flex items-center gap-2 text-sm text-[#888888] cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#FF6600]" />
                  Pedido Entregue
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="px-4 py-2 border border-[rgba(255,255,255,0.08)] rounded-lg text-sm text-white hover:bg-[#111111]">Enviar Mensagem Teste</button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-6 bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.08)] rounded-b-xl flex justify-end">
          <button onClick={handleSave} className="bg-[#FF6600] hover:bg-[#E65C00] text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Salvar Configurações
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#22C55E] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50" style={{ animation: 'slideInLeft 0.3s' }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          <p className="font-medium">Configurações salvas com sucesso!</p>
        </div>
      )}

    </div>
  );
}
