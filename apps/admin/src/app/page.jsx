export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium">Vendas no Mês</h3>
          <p className="text-3xl font-bold mt-2">R$ 14.500</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium">Usuários Ativos</h3>
          <p className="text-3xl font-bold mt-2">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium">Pedidos Pendentes</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
      </div>
    </div>
  );
}
