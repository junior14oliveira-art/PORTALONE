export default function AtendimentoPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-black text-foreground mb-6">Atendimento ao Cliente</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Informações de Contato */}
          <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Como podemos ajudar?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Telefone / WhatsApp</h3>
                  <p className="text-muted text-sm">(11) 99999-9999</p>
                  <p className="text-xs text-muted mt-1">Seg. a Sex. das 9h às 18h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">E-mail</h3>
                  <p className="text-muted text-sm">contato@portalone.com.br</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Envie uma mensagem</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Nome completo</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-background" placeholder="Seu nome" />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">E-mail</label>
                <input type="email" className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-background" placeholder="seu@email.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Mensagem</label>
                <textarea className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all bg-background min-h-[120px]" placeholder="Como podemos te ajudar?"></textarea>
              </div>
              <button type="button" className="w-full bg-brand text-white font-bold py-3 rounded-xl hover:bg-brand-hover transition-colors">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
