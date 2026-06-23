"use client";
import { useState } from "react";

const MOCK_ORDERS = [
  {
    id: "PED-0128", client: "Lucas Ferreira", email: "lucas@email.com", phone: "(11) 98765-4321",
    items: [
      { name: "Notebook Dell Inspiron 15", qty: 1, price: 3499.9 },
      { name: "Mouse Logitech MX Master 3", qty: 1, price: 459.9 },
      { name: "Cabo USB-C 2m", qty: 2, price: 39.9 },
    ],
    value: 4039.6, status: "ENTREGUE", date: "23/06/2026 14:32", payment: "Cartão Crédito 6x",
    mpRef: "MP-123456789", address: "Rua das Flores, 123 - Apto 42 - Vila Mariana, São Paulo/SP - 04110-010",
    timeline: [
      { time: "23/06 14:32", status: "Pedido Criado", note: "Pedido recebido com sucesso" },
      { time: "23/06 14:45", status: "Pagamento Confirmado", note: "Pagamento aprovado via Mercado Pago" },
      { time: "23/06 15:00", status: "Em Processamento", note: "Pedido separado no estoque" },
      { time: "23/06 16:20", status: "Enviado", note: "Código de rastreio: BR123456789SP" },
      { time: "24/06 11:00", status: "Entregue", note: "Entrega confirmada pelo destinatário" },
    ],
  },
  {
    id: "PED-0127", client: "Mariana Silva", email: "mariana@email.com", phone: "(21) 91234-5678",
    items: [
      { name: "Teclado Mecânico Keychron K2", qty: 1, price: 459.5 },
    ],
    value: 459.5, status: "ENVIADO", date: "23/06/2026 10:15", payment: "PIX",
    mpRef: "PIX-987654321", address: "Av. Atlântica, 1000 - Copacabana, Rio de Janeiro/RJ - 22010-000",
    timeline: [
      { time: "23/06 10:15", status: "Pedido Criado", note: "Pedido recebido" },
      { time: "23/06 10:18", status: "Pagamento Confirmado", note: "PIX confirmado instantaneamente" },
      { time: "23/06 11:30", status: "Em Processamento", note: "Pedido sendo preparado" },
      { time: "23/06 14:00", status: "Enviado", note: "Código: OC123987654BR" },
    ],
  },
  {
    id: "PED-0126", client: "Carlos Oliveira", email: "carlos@empresa.com.br", phone: "(31) 99999-0000",
    items: [
      { name: "Monitor LG UltraWide 34\"", qty: 1, price: 2899.0 },
      { name: "Hub USB 7 Portas", qty: 1, price: 199.9 },
      { name: "Suporte de Monitor", qty: 1, price: 389.9 },
      { name: "Webcam Logitech C920", qty: 1, price: 359.9 },
      { name: "Headset Sony WH-1000XM5", qty: 1, price: 1199.9 },
    ],
    value: 5048.6, status: "PROCESSANDO", date: "22/06/2026 16:48", payment: "Cartão Débito",
    mpRef: "MP-555666777", address: "Rua Ouro Preto, 567 - Savassi, Belo Horizonte/MG - 30130-130",
    timeline: [
      { time: "22/06 16:48", status: "Pedido Criado", note: "Pedido recebido" },
      { time: "22/06 17:00", status: "Pagamento Confirmado", note: "Pagamento aprovado" },
      { time: "22/06 17:30", status: "Em Processamento", note: "Itens sendo separados no estoque" },
    ],
  },
  {
    id: "PED-0125", client: "Ana Beatriz Costa", email: "ana@email.com", phone: "(41) 98888-1111",
    items: [
      { name: "SSD Samsung 1TB NVMe", qty: 1, price: 549.9 },
      { name: "RAM Corsair 16GB DDR5", qty: 1, price: 389.9 },
    ],
    value: 939.8, status: "PAGO", date: "22/06/2026 09:22", payment: "PIX",
    mpRef: "PIX-111222333", address: "Rua XV de Novembro, 200 - Centro, Curitiba/PR - 80020-310",
    timeline: [
      { time: "22/06 09:22", status: "Pedido Criado", note: "Pedido recebido" },
      { time: "22/06 09:25", status: "Pagamento Confirmado", note: "PIX aprovado" },
    ],
  },
  {
    id: "PED-0124", client: "Rodrigo Santos", email: "rodrigo@email.com", phone: "(51) 97777-2222",
    items: [
      { name: "Mouse Pad XL Gamer", qty: 1, price: 89.9 },
      { name: "Organizador de Cabos", qty: 1, price: 49.9 },
    ],
    value: 139.8, status: "PENDENTE", date: "21/06/2026 22:10", payment: "Boleto",
    mpRef: "-", address: "Av. Ipiranga, 789 - Centro, Porto Alegre/RS - 90160-090",
    timeline: [
      { time: "21/06 22:10", status: "Pedido Criado", note: "Aguardando pagamento do boleto" },
    ],
  },
  {
    id: "PED-0123", client: "Fernanda Lima", email: "fernanda@email.com", phone: "(62) 96666-3333",
    items: [
      { name: "Notebook Lenovo ThinkPad X1", qty: 1, price: 7999.0 },
    ],
    value: 7999.0, status: "CANCELADO", date: "21/06/2026 15:33", payment: "Cartão Crédito 12x",
    mpRef: "MP-CANCELADO", address: "Rua T-28, 100 - Setor Bueno, Goiânia/GO - 74230-040",
    timeline: [
      { time: "21/06 15:33", status: "Pedido Criado", note: "Pedido recebido" },
      { time: "21/06 15:45", status: "Cancelado", note: "Cancelado a pedido do cliente" },
    ],
  },
  {
    id: "PED-0122", client: "Diego Martins", email: "diego@email.com", phone: "(85) 95555-4444",
    items: [
      { name: "Placa de Vídeo RTX 4070", qty: 1, price: 3299.9 },
    ],
    value: 3299.9, status: "ENTREGUE", date: "20/06/2026 11:00", payment: "Cartão Crédito 6x",
    mpRef: "MP-222333444", address: "Av. Washington Soares, 400 - Edson Queiroz, Fortaleza/CE - 60811-341",
    timeline: [
      { time: "20/06 11:00", status: "Pedido Criado", note: "Pedido recebido" },
      { time: "20/06 11:05", status: "Pagamento Confirmado", note: "Aprovado" },
      { time: "20/06 13:00", status: "Em Processamento", note: "Separado" },
      { time: "20/06 16:00", status: "Enviado", note: "Código: AM987654321BR" },
      { time: "22/06 14:30", status: "Entregue", note: "Entregue com sucesso" },
    ],
  },
  {
    id: "PED-0121", client: "Juliana Rocha", email: "juliana@email.com", phone: "(71) 94444-5555",
    items: [
      { name: "Impressora HP LaserJet Pro", qty: 1, price: 1899.9 },
      { name: "Cartucho HP Original Preto", qty: 2, price: 89.9 },
    ],
    value: 2079.7, status: "ENVIADO", date: "20/06/2026 09:45", payment: "PIX",
    mpRef: "PIX-333444555", address: "Rua Chile, 300 - Centro Histórico, Salvador/BA - 40020-270",
    timeline: [
      { time: "20/06 09:45", status: "Pedido Criado", note: "Pedido recebido" },
      { time: "20/06 09:48", status: "Pagamento Confirmado", note: "PIX confirmado" },
      { time: "20/06 11:00", status: "Em Processamento", note: "Separado" },
      { time: "20/06 14:00", status: "Enviado", note: "Código: CE654321987BR" },
    ],
  },
  {
    id: "PED-0120", client: "Paulo Mendes", email: "paulo@email.com", phone: "(92) 93333-6666",
    items: [
      { name: "Fonte ATX 750W 80 Plus Gold", qty: 1, price: 599.9 },
      { name: "Cooler CPU Noctua NH-D15", qty: 1, price: 799.9 },
    ],
    value: 1399.8, status: "PROCESSANDO", date: "19/06/2026 18:20", payment: "Cartão Crédito 3x",
    mpRef: "MP-444555666", address: "Av. Eduardo Ribeiro, 520 - Centro, Manaus/AM - 69010-001",
    timeline: [
      { time: "19/06 18:20", status: "Pedido Criado", note: "Pedido recebido" },
      { time: "19/06 18:30", status: "Pagamento Confirmado", note: "Aprovado" },
      { time: "20/06 09:00", status: "Em Processamento", note: "Sendo separado" },
    ],
  },
  {
    id: "PED-0119", client: "Camila Ferraz", email: "camila@email.com", phone: "(27) 92222-7777",
    items: [
      { name: "Smartphone Samsung Galaxy S24", qty: 1, price: 4299.9 },
    ],
    value: 4299.9, status: "PAGO", date: "19/06/2026 14:55", payment: "Cartão Crédito 12x",
    mpRef: "MP-555777888", address: "Av. Nossa Senhora da Penha, 800 - Santa Luíza, Vitória/ES - 29045-402",
    timeline: [
      { time: "19/06 14:55", status: "Pedido Criado", note: "Pedido recebido" },
      { time: "19/06 15:02", status: "Pagamento Confirmado", note: "Aprovado via Mercado Pago" },
    ],
  },
];

const STATUS_MAP = {
  PENDENTE:    { label: "Pendente",    cls: "badge-warning" },
  PAGO:        { label: "Pago",        cls: "badge-info" },
  PROCESSANDO: { label: "Processando", cls: "badge-purple" },
  ENVIADO:     { label: "Enviado",     cls: "badge-orange" },
  ENTREGUE:    { label: "Entregue",    cls: "badge-success" },
  CANCELADO:   { label: "Cancelado",   cls: "badge-error" },
};

const TABS = ["Todos", "Pendente", "Pago", "Processando", "Enviado", "Entregue", "Cancelado"];

const TIMELINE_COLORS = {
  "Pedido Criado": "#888",
  "Pagamento Confirmado": "#3B82F6",
  "Em Processamento": "#A855F7",
  "Enviado": "#FF6600",
  "Entregue": "#22C55E",
  "Cancelado": "#EF4444",
};

function Toast({ message, type, onClose }) {
  const colors = { success: "#22C55E", error: "#EF4444", info: "#3B82F6" };
  return (
    <div className={`toast toast-${type}`} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: colors[type], flexShrink: 0 }} />
      <span style={{ fontSize: "13.5px", color: "var(--text-primary)", flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "16px", lineHeight: 1, padding: "0 2px" }}>×</button>
    </div>
  );
}

function OrderDrawer({ order, onClose, onStatusUpdate }) {
  const [trackingCode, setTrackingCode] = useState("");
  const [showTracking, setShowTracking] = useState(false);
  const [loading, setLoading] = useState(false);

  const st = STATUS_MAP[order.status];
  const total = order.items.reduce((s, i) => s + i.price * i.qty, 0);

  const handleAction = async (newStatus, note) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    onStatusUpdate(order.id, newStatus, note);
    setLoading(false);
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer-panel">
        {/* Header */}
        <div style={{ padding: "24px", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, background: "var(--bg-card)", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>{order.id}</div>
              <div style={{ fontSize: "18px", fontWeight: 700 }}>Detalhes do Pedido</div>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span className={`status-badge ${st.cls}`}>{st.label}</span>
              <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)", color: "var(--text-muted)", borderRadius: "8px", width: "32px", height: "32px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>
          </div>
        </div>

        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Items */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Itens do Pedido</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {order.items.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>Qtd: {item.qty}</div>
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#22C55E" }}>R$ {(item.price * item.qty).toFixed(2).replace(".", ",")}</div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px" }}>
                <span style={{ fontWeight: 700, fontSize: "14px" }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: "16px", color: "#22C55E" }}>R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>
            </div>
          </div>

          {/* Client */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Cliente</div>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid var(--border)", padding: "14px" }}>
              <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>{order.client}</div>
              <div style={{ fontSize: "12.5px", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "4px" }}>
                <span>✉️ {order.email}</span>
                <span>📞 {order.phone}</span>
                <span>📍 {order.address}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Pagamento</div>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid var(--border)", padding: "14px", display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>{order.payment}</div>
                <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "3px" }}>Ref: {order.mpRef}</div>
              </div>
              <span className={`status-badge ${st.cls}`}>{st.label}</span>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "14px" }}>Histórico do Pedido</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {order.timeline.map((entry, i) => {
                const color = TIMELINE_COLORS[entry.status] || "#888";
                const isLast = i === order.timeline.length - 1;
                return (
                  <div key={i} style={{ display: "flex", gap: "14px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: color, border: `2px solid ${color}`, flexShrink: 0, marginTop: "3px", boxShadow: `0 0 6px ${color}50` }} />
                      {!isLast && <div style={{ width: "2px", flex: 1, background: "var(--border)", margin: "4px 0" }} />}
                    </div>
                    <div style={{ paddingBottom: isLast ? "0" : "16px" }}>
                      <div style={{ fontSize: "12.5px", fontWeight: 700, color }}>{entry.status}</div>
                      <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "1px" }}>{entry.note}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-faint)", marginTop: "3px" }}>{entry.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          {order.status !== "ENTREGUE" && order.status !== "CANCELADO" && (
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Ações</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {order.status === "PENDENTE" && (
                  <button className="btn-primary" onClick={() => handleAction("PAGO", "Pagamento confirmado manualmente")} disabled={loading} style={{ justifyContent: "center" }}>
                    {loading ? "Processando..." : "✅ Confirmar Pagamento"}
                  </button>
                )}
                {order.status === "PAGO" && (
                  <button className="btn-primary" onClick={() => handleAction("PROCESSANDO", "Pedido em processamento")} disabled={loading} style={{ justifyContent: "center" }}>
                    {loading ? "Processando..." : "⚙️ Marcar como Processando"}
                  </button>
                )}
                {order.status === "PROCESSANDO" && (
                  <>
                    {showTracking ? (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input className="admin-input" placeholder="Código de rastreio..." value={trackingCode} onChange={e => setTrackingCode(e.target.value)} style={{ flex: 1 }} />
                        <button className="btn-primary" onClick={() => handleAction("ENVIADO", `Enviado — rastreio: ${trackingCode || "N/A"}`)} disabled={loading}>
                          {loading ? "..." : "Confirmar"}
                        </button>
                      </div>
                    ) : (
                      <button className="btn-primary" onClick={() => setShowTracking(true)} style={{ justifyContent: "center" }}>
                        🚚 Marcar como Enviado
                      </button>
                    )}
                  </>
                )}
                {order.status === "ENVIADO" && (
                  <button className="btn-primary" onClick={() => handleAction("ENTREGUE", "Entrega confirmada")} disabled={loading} style={{ justifyContent: "center" }}>
                    {loading ? "Processando..." : "📦 Marcar como Entregue"}
                  </button>
                )}
                <button className="btn-secondary" onClick={() => handleAction("CANCELADO", "Pedido cancelado pelo administrador")} disabled={loading} style={{ justifyContent: "center", borderColor: "rgba(239,68,68,0.3)", color: "#EF4444" }}>
                  {loading ? "Processando..." : "❌ Cancelar Pedido"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState("Todos");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  };

  const handleStatusUpdate = (orderId, newStatus, note) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      return {
        ...o,
        status: newStatus,
        timeline: [...o.timeline, { time: new Date().toLocaleString("pt-BR").slice(0,14), status: STATUS_MAP[newStatus]?.label || newStatus, note }],
      };
    }));
    setSelectedOrder(prev => prev ? {
      ...prev,
      status: newStatus,
      timeline: [...prev.timeline, { time: new Date().toLocaleString("pt-BR").slice(0,14), status: STATUS_MAP[newStatus]?.label || newStatus, note }],
    } : null);
    addToast(`Pedido atualizado para: ${STATUS_MAP[newStatus]?.label || newStatus}`, "success");
  };

  const filtered = activeTab === "Todos" ? orders : orders.filter(o => o.status === activeTab.toUpperCase());

  const stats = [
    { label: "Total de Pedidos", value: orders.length, color: "var(--text-primary)" },
    { label: "Aguardando", value: orders.filter(o => o.status === "PENDENTE" || o.status === "PAGO").length, color: "#F59E0B" },
    { label: "Enviados Hoje", value: orders.filter(o => o.status === "ENVIADO").length, color: "#FF6600" },
    { label: "Entregues", value: orders.filter(o => o.status === "ENTREGUE").length, color: "#22C55E" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="page-title">Gestão de Pedidos</h1>
          <p className="page-subtitle">Acompanhe e gerencie todos os pedidos da sua loja</p>
        </div>
        <button className="btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Exportar
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
        {stats.map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</span>
            <span style={{ fontSize: "24px", fontWeight: 800, color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Tabs + Table */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px 0", borderBottom: "1px solid var(--border)" }}>
          <div className="tab-nav" style={{ marginBottom: 0, borderBottom: "none" }}>
            {TABS.map(tab => (
              <button key={tab} className={`tab-item ${activeTab === tab ? "tab-item-active" : ""}`} onClick={() => setActiveTab(tab)}>
                {tab}
                {tab !== "Todos" && (
                  <span style={{ marginLeft: "6px", fontSize: "10px", background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: "99px", fontWeight: 700 }}>
                    {orders.filter(o => tab === "Todos" || o.status === tab.toUpperCase()).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: "60px 24px", textAlign: "center", color: "var(--text-muted)" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>📋</div>
            <div style={{ fontSize: "14px" }}>Nenhum pedido encontrado neste status.</div>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>#Pedido</th>
                <th>Cliente</th>
                <th>Itens</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Forma Pag.</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => {
                const st = STATUS_MAP[order.status];
                return (
                  <tr key={order.id}>
                    <td style={{ fontFamily: "monospace", fontSize: "12px", color: "#FF6600", fontWeight: 700 }}>{order.id}</td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: "13.5px" }}>{order.client}</div>
                      <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>{order.email}</div>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{order.items.length} {order.items.length === 1 ? "item" : "itens"}</td>
                    <td style={{ fontWeight: 700, color: "#22C55E", fontSize: "14px" }}>R$ {order.value.toFixed(2).replace(".", ",")}</td>
                    <td><span className={`status-badge ${st.cls}`}>{st.label}</span></td>
                    <td style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>{order.payment}</td>
                    <td style={{ fontSize: "12px", color: "var(--text-muted)" }}>{order.date}</td>
                    <td>
                      <button className="btn-ghost" onClick={() => setSelectedOrder(order)} style={{ color: "var(--accent-orange)", fontWeight: 600, fontSize: "12.5px" }}>
                        Detalhes →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {selectedOrder && (
        <OrderDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      {/* Toast container */}
      <div className="toast-container">
        {toasts.map(t => (
          <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts(p => p.filter(x => x.id !== t.id))} />
        ))}
      </div>
    </div>
  );
}
