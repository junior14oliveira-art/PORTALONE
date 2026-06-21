export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Executivo</h1>
        <p className="text-muted-foreground mt-1">Bem-vindo de volta! Aqui está o resumo das operações de hoje.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Faturamento Diário', value: 'R$ 45.231,80', change: '+12%', positive: true },
          { title: 'Pedidos Pendentes', value: '24', change: '-3%', positive: true },
          { title: 'Estoque Crítico', value: '8 itens', change: '+2', positive: false },
          { title: 'RMA / Garantia', value: '3', change: 'Estável', positive: true },
        ].map((kpi, i) => (
          <div key={i} className="bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-medium text-muted-foreground">{kpi.title}</h3>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold">{kpi.value}</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${kpi.positive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Rastreabilidade Rápida - Heurística: Flexibilidade e eficiência de uso */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Leitura de Rastreabilidade (WMS)</h2>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Bipe o Serial Number (SN) ou QR Code da Peça..." 
            className="flex-1 h-12 px-4 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            autoFocus
          />
          <button className="h-12 px-8 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors shadow-sm">
            Registrar Peça
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></span>
          Leitor USB / Bluetooth conectado e pronto.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pedidos Recentes */}
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Últimos Pedidos B2B</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div key={order} className="flex items-center justify-between p-4 rounded-lg border border-border/40 hover:bg-accent/50 transition-colors">
                <div>
                  <div className="font-semibold">Pedido #4M-{1000 + order}</div>
                  <div className="text-sm text-muted-foreground">Empresa XYZ Ltda.</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">R$ {12500 + (order * 1500)},00</div>
                  <div className="text-xs px-2 py-0.5 bg-warning/20 text-warning rounded-full inline-block mt-1">Aguardando Pagamento</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrações com Marketplaces */}
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Status Integrações Marketplaces</h2>
          <div className="space-y-4">
            {['Mercado Livre', 'Amazon', 'Shopee'].map((mkp) => (
              <div key={mkp} className="flex items-center justify-between p-4 rounded-lg border border-border/40">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center font-bold text-secondary-foreground">{mkp[0]}</div>
                  <div className="font-medium">{mkp}</div>
                </div>
                <div className="flex items-center text-sm text-success font-medium">
                  <span className="w-2 h-2 rounded-full bg-success mr-2"></span>
                  Sincronizado
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
