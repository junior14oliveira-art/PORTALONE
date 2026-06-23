"use client";

import React from 'react';

export default function InstitucionalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-black to-[#062e2b] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Quem Somos?</h1>
        <p className="text-brand text-lg font-medium">Conheça a história e a missão da PORTALONE</p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </span>
            Nossa Empresa
          </h2>
          <div className="prose max-w-none text-muted-foreground text-lg leading-relaxed">
            <p>
              A <strong>Portal One Informática</strong> é uma empresa especializada em locação de equipamentos de informática adequados aos mais diferentes cenários corporativos. Com uma equipe altamente especializada e qualificada, oferecemos serviços com pro atividade, suporte remoto, telefônico e on site para atender com excelência nossos clientes e que desta forma possamos gerar melhor relação custo/benefício do mercado.
            </p>
            <p className="mt-4">
              Priorizamos a eficiência e inovação, auxiliando na otimização de processos e melhoria nos resultados e redução de custos, além de permitir que o foco do cliente seja direcionado ao seu negócio.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
            </span>
            História
          </h2>
          <div className="prose max-w-none text-muted-foreground text-lg leading-relaxed">
            <p>
              A <strong>Portal One Informática</strong> foi fundada em 2021, tendo como principal objetivo fornecer tecnologia às pequenas, médias e grandes empresas, para alavancar suas vendas e reduzir seus custos, oferecendo aos seus clientes, equipamentos que se adequem as necessidades de cada perfil empreendedor, visando a qualidade e flexibilidade de seus produtos e serviços.
            </p>
            <p className="mt-4">
              Com base em pesquisas de mercado e com a crescente demanda na área de prestação de serviços em locação de equipamentos, a Portal one percebeu a necessidade das empresas em cada vez mais buscar na informática maneiras para aprimorar seus processos, obter melhores resultados e ter maior controle sobre a organização, visando este crescimento.
            </p>
            <p className="mt-4">
              A <strong>PORTALONE</strong> existe para ajudar a sua empresa a alcançar seus objetivos focando apenas em sua produtividade. Com amplo know how no setor a empresa oferece aos clientes flexibilidade e agilidade nos atendimentos. Desde sua fundação a PORTALONE vem consolidando parcerias de sucesso, trabalhando com grandes empresas de diferentes segmentos.
            </p>
            <div className="mt-8 p-6 bg-brand/5 border border-brand/20 rounded-xl text-center">
              <p className="text-xl font-bold text-brand">Seja um parceiro Portal One e faça parte dessa história de sucesso!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
