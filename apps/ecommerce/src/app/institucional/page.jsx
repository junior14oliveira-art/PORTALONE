export default function InstitucionalPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-black text-foreground mb-6">Sobre a 4M&C Informática</h1>
        <div className="bg-white rounded-2xl p-8 border border-border shadow-sm prose prose-neutral max-w-none">
          <p className="text-lg text-muted mb-6">
            A <strong>PORTALONE</strong> (4M&C Informática) é uma empresa especializada no fornecimento de soluções corporativas de tecnologia, 
            desde notebooks e desktops de alta performance até servidores avançados.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Nossa Missão</h2>
          <p className="text-muted mb-6">
            Prover infraestrutura de TI confiável e de alta qualidade para empresas de todos os portes, 
            garantindo o melhor desempenho e segurança para os negócios de nossos clientes.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Por que nos escolher?</h2>
          <ul className="list-disc pl-6 text-muted space-y-2 mb-6">
            <li>Parceria com as maiores marcas do mercado (Dell, HP, Lenovo).</li>
            <li>Atendimento especializado e consultoria de TI.</li>
            <li>Garantia e suporte técnico dedicado.</li>
            <li>Logística eficiente para todo o Brasil.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
