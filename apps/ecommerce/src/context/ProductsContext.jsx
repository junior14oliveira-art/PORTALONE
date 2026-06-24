"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/produtos/sync');
        const data = await res.json();
        
        if (data && data.success && data.produtos) {
          const mapped = data.produtos.map(p => {
            let cat = 'computadores';
            const mod = p.modelo?.toLowerCase() || '';
            if (mod.includes('notebook')) cat = 'notebooks';
            let precoReal = parseFloat(p.preco) || 0;

            // Injetar preço fake para simulações se for notebook e estiver zerado
            if (cat === 'notebooks' && precoReal <= 0) {
              const cpu = (p.processador || '').toLowerCase();
              if (cpu.includes('i7')) {
                precoReal = 4500 + Math.floor(Math.random() * 1500); // 4500 - 6000
              } else if (cpu.includes('i5')) {
                precoReal = 3000 + Math.floor(Math.random() * 1000); // 3000 - 4000
              } else if (cpu.includes('i3')) {
                precoReal = 2000 + Math.floor(Math.random() * 800);  // 2000 - 2800
              } else {
                precoReal = 2500 + Math.floor(Math.random() * 1000);
              }
            }

            const precoStr = precoReal > 0 
              ? precoReal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
              : "Sob Consulta";
            
            return {
              id: p.id_unico,
              category: cat,
              brand: p.marca || 'N/A',
              title: p.nome_exibicao || p.modelo || 'Produto',
              specs: [p.processador, p.ram].filter(Boolean),
              price: precoStr,
              oldPrice: null,
              installments: "",
              img: "https://placehold.co/800x800/f3f4f6/a1a1aa?text=Sem+Foto",
              raw: p
            };
          });
          setProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch real products", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
