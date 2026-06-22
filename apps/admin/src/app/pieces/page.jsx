"use client";
import { useState, useEffect } from 'react';

export default function PiecesPage() {
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Exemplo Mockado para inicialização visual
  useEffect(() => {
    // Quando houver endpoint /pieces
    // fetch('http://localhost:3000/pieces')
    //   .then(res => res.json())
    //   .then(data => { setPieces(data); setLoading(false); })
    //   .catch(err => { console.error(err); setLoading(false); });
    
    setTimeout(() => {
      setPieces([
        { id: '1', serialNumber: 'SN-X19001', name: 'SSD 512GB NVMe', type: 'SSD', status: 'IN_STOCK' },
        { id: '2', serialNumber: 'SN-M20912', name: 'Memória RAM 16GB DDR5', type: 'RAM', status: 'SEPARATED' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Estoque de Peças</h1>
        <button className="bg-[#ff6600] text-white px-4 py-2 rounded shadow hover:bg-[#e65c00]">Registrar Peça</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Serial Number</th>
              <th className="px-6 py-4 font-medium">Nome</th>
              <th className="px-6 py-4 font-medium">Tipo</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center">Carregando...</td></tr>
            ) : pieces.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center">Nenhuma peça registrada</td></tr>
            ) : (
              pieces.map((piece) => (
                <tr key={piece.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm text-gray-900">{piece.serialNumber}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{piece.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{piece.type}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span className={`px-2 py-1 rounded text-xs ${piece.status === 'IN_STOCK' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {piece.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</button>
                    <button className="text-red-600 hover:text-red-900">Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
