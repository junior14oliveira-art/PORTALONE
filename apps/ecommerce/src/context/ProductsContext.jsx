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
            else if (mod.includes('monitor') || mod.includes('teclado') || mod.includes('mouse')) cat = 'acessorios';
            else if (mod.includes('servidor')) cat = 'servidores';

            const precoStr = parseFloat(p.preco) > 0 ? p.preco : "Sob Consulta";
            
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
