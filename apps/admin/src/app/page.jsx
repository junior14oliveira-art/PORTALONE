"use client";
import { useState, useEffect } from "react";

const MOCK_ORDERS = [
  { id: "PED-0128", client: "Lucas Ferreira", value: 1299.9, status: "ENTREGUE", date: "23/06/2026", items: 3, payment: "Cartão Crédito" },
  { id: "PED-0127", client: "Mariana Silva", value: 459.5, status: "ENVIADO", date: "23/06/2026", items: 1, payment: "PIX" },
  { id: "PED-0126", client: "Carlos Oliveira", value: 3890.0, status: "PROCESSANDO", date: "22/06/2026", items: 5, payment: "Cartão Débito" },
  { id: "PED-0125", client: "Ana Beatriz Costa", value: 769.9, status: "PAGO", date: "22/06/2026", items: 2, payment: "PIX" },
  { id: "PED-0124", client: "Rodrigo Santos", value: 199.9, status: "PENDENTE", date: "21/06/2026", items: 1, payment: "Boleto" },
];

const SALES_DATA = [
  { day: "Seg", value: 3200 },
  { day: "Ter", value: 5100 },
  { day: "Qua", value: 4300 },
  { day: "Qui", value: 7800 },
  { day: "Sex", value: 6200 },
  { day: "Sáb", value: 8900 },
  { day: "Dom", value: 4100 },
];

const QUICK_STATS = [
  { label: "Produtos Ativos", value: 48, icon: "📦", color: "#3B82F6" },
  { label: "Estoque Baixo", value: 3, icon: "⚠️", color: "#EF4444", alert: true },
  { label: "Avaliações Pendentes", value: 7, icon: "⭐", color: "#F59E0B" },
  { label: "Categorias", value: 12, icon: "🏷️", color: "#A855F7" },
];

const STATUS_MAP = {
  PENDENTE:    { label: "Pendente",    cls: "badge-warning" },
  PAGO:        { label: "Pago",        cls: "badge-info" },
  PROCESSANDO: { label: "Processando", cls: "badge-purple" },
  ENVIADO:     { label: "Enviado",     cls: "badge-orange" },
  ENTREGUE:    { label: "Entregue",    cls: "badge-success" },
  CANCELADO:   { label: "Cancelado",   cls: "badge-error" },
};

const SPARKLINE_ORANGE  = [30, 55, 40, 80, 60, 75, 90];
const SPARKLINE_BLUE    = [50, 60, 45, 70, 55, 80, 65];
const SPARKLINE_PURPLE  = [40, 50, 60, 45, 70, 55, 68];
const SPARKLINE_GREEN   = [20, 35, 50, 40, 60, 70, 55];

function Sparkline({ data, color }) {
  const max = Math.max(...data);
  return (
    <div className="sparkline" style={{ color }}>
      {data.map((v, i) => (
        <div key={i} className="sparkline-bar" style={{ height: `${(v / max) * 100}%` }} />
      ))}
    </div>
  );
}

function KPICard({ title, value, change, positive, icon, color, sparkline, delay }) {
  return (
    <div className="glass-card animate-fadeIn" style={{
      padding: "22px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      animationDelay: delay,
      borderTop: `2px solid ${color}`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>{title}</div>
          <div className="stat-number" style={{ color: "var(--text-primary)" }}>{value}</div>
        </div>
        <div style={{
          width: "42px", height: "42px", borderRadius: "12px",
          background: `${color}1a`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "20px", flexShrink: 0,
        }}>{icon}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "3px",
            padding: "2px 8px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
            background: positive ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
            color: positive ? "#22C55E" : "#EF4444",
          }}>
            {positive ? "↑" : "↓"} {change}
          </span>
          <span style={{ fontSize: "11px", color: "var(--text-faint)" }}>vs mês anterior</span>
        </div>
        <Sparkline data={sparkline} color={color} />
      </div>
    </div>
  );
}

function SalesChart() {
  const max = Math.max(...SALES_DATA.map(d => d.value));
  const today = new Date().getDay(); // 0=Sun,1=Mon...
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Seg=0...Dom=6
  const todayIdx = dayMap[today] ?? 5;

  return (
    <div className="glass-card" style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <div className="section-title">Vendas — Últimos 7 Dias</div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>Total: R$ 39.600,00</div>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {["7D","1M","3M"].map((t, i) => (
            <button key={t} style={{
              padding: "4px 12px", borderRadius: "6px", fontSize: "11.5px", fontWeight: 600,
              background: i === 0 ? "var(--accent-orange-dim)" : "transparent",
              color: i === 0 ? "var(--accent-orange)" : "var(--text-muted)",
              border: i === 0 ? "1px solid rgba(255,102,0,0.2)" : "1px solid var(--border)",
              cursor: "pointer", fontFamily: "inherit",
            }}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "140px", padding: "0 4px" }}>
        {SALES_DATA.map((d, i) => {
          const isToday = i === todayIdx;
          const pct = (d.value / max) * 100;
          return (
            <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                <div style={{
                  width: "100%",
                  height: `${pct}%`,
                  minHeight: "8px",
                  background: isToday
                    ? "linear-gradient(180deg, #FF6600, #FF8C00)"
                    : "rgba(255,255,255,0.08)",
                  borderRadius: "5px 5px 3px 3px",
                  transition: "height 0.5s ease",
                  position: "relative",
                  boxShadow: isToday ? "0 0 12px rgba(255,102,0,0.4)" : "none",
                }}>
                  {isToday && (
                    <div style={{
                      position: "absolute", top: "-22px", left: "50%", transform: "translateX(-50%)",
                      background: "#FF6600", color: "#fff", fontSize: "10px", fontWeight: 700,
                      padding: "2px 6px", borderRadius: "4px", whiteSpace: "nowrap",
                    }}>R$ {(d.value/1000).toFixed(1)}k</div>
                  )}
                </div>
              </div>
              <div style={{ fontSize: "10.5px", color: isToday ? "#FF6600" : "var(--text-faint)", fontWeight: isToday ? 700 : 400 }}>{d.day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }}>
          {[1,2,3,4].map(i => (
            <div key={i} className="skeleton" style={{ height: "140px", borderRadius: "14px" }} />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
          <div className="skeleton" style={{ height: "240px", borderRadius: "14px" }} />
          <div className="skeleton" style={{ height: "240px", borderRadius: "14px" }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Low stock alert */}
      <div className="animate-fadeIn" style={{
        background: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.2)",
        borderRadius: "12px",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <span style={{ fontSize: "20px" }}>🔴</span>
        <div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#EF4444" }}>Alerta de Estoque Baixo</div>
          <div style={{ fontSize: "12px", color: "#fca5a5", marginTop: "1px" }}>3 produtos com estoque crítico precisam de atenção imediata. <a href="/pieces" style={{ color: "#EF4444", textDecoration: "underline" }}>Ver produtos →</a></div>
        </div>
      </div>

      {/* Page header */}
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Visão geral do seu negócio — Segunda-feira, 23 de junho de 2026</p>
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }} className="animate-stagger">
        <KPICard title="Vendas do Mês" value="R$ 47.320" change="23%" positive icon="💰" color="#FF6600" sparkline={SPARKLINE_ORANGE} delay="0ms" />
        <KPICard title="Pedidos Totais" value="128" change="12%" positive icon="📋" color="#3B82F6" sparkline={SPARKLINE_BLUE} delay="60ms" />
        <KPICard title="Ticket Médio" value="R$ 369,69" change="5%" positive icon="🎯" color="#A855F7" sparkline={SPARKLINE_PURPLE} delay="120ms" />
        <KPICard title="Clientes Novos" value="34" change="8%" positive icon="👥" color="#22C55E" sparkline={SPARKLINE_GREEN} delay="180ms" />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
        <SalesChart />

        {/* Quick Stats */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div className="section-title" style={{ marginBottom: "18px" }}>Resumo Rápido</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {QUICK_STATS.map((s, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 14px",
                background: s.alert ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.02)",
                borderRadius: "10px",
                border: `1px solid ${s.alert ? "rgba(239,68,68,0.15)" : "var(--border)"}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "18px" }}>{s.icon}</span>
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>{s.label}</span>
                </div>
                <span style={{ fontSize: "20px", fontWeight: 800, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="section-title">Pedidos Recentes</div>
          <a href="/orders" style={{ fontSize: "12.5px", color: "var(--accent-orange)", textDecoration: "none", fontWeight: 600 }}>Ver todos →</a>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>#Pedido</th>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Pagamento</th>
              <th>Data</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((o) => {
              const st = STATUS_MAP[o.status];
              return (
                <tr key={o.id}>
                  <td style={{ fontFamily: "monospace", fontSize: "12px", color: "var(--text-muted)" }}>{o.id}</td>
                  <td style={{ fontWeight: 600 }}>{o.client}</td>
                  <td style={{ fontWeight: 700, color: "#22C55E" }}>R$ {o.value.toFixed(2).replace(".", ",")}</td>
                  <td><span className={`status-badge ${st.cls}`}>{st.label}</span></td>
                  <td style={{ color: "var(--text-muted)", fontSize: "12.5px" }}>{o.payment}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "12.5px" }}>{o.date}</td>
                  <td>
                    <a href="/orders" style={{
                      display: "inline-flex", alignItems: "center", gap: "4px",
                      padding: "5px 12px", borderRadius: "7px", fontSize: "11.5px", fontWeight: 600,
                      background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
                      color: "var(--text-secondary)", textDecoration: "none",
                      transition: "all 0.15s",
                    }}>Ver</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
