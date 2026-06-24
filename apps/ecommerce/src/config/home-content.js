/**
 * ARQUIVO DE CONFIGURAÇÃO DE IMAGENS E CONTEÚDOS DA HOME
 * 
 * Como editar as fotos:
 * 1. Salve suas imagens reais na pasta: d:\PORTALONE\apps\ecommerce\public\images\
 * 2. Altere os links abaixo de "https://images.unsplash..." para o caminho do seu arquivo local.
 *    Exemplo: Se você salvou "meu-banner.jpg" na pasta public/images, 
 *    mude o link abaixo para "/images/meu-banner.jpg"
 */

import { ALL_PRODUCTS } from '../lib/mock-data';

export const HOME_CONTENT = {
  hero: {
    // Foto do Notebook do Banner Principal
    laptopImage: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop",
  },
  
  categories: [
    { name: 'Computadores', img: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=200&auto=format&fit=crop' },
    { name: 'Monitores', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=200&auto=format&fit=crop' },
    { name: 'Notebooks', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=200&auto=format&fit=crop' },
    { name: 'Servidores', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=200&auto=format&fit=crop' },
    { name: 'Switch de Rede', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=200&auto=format&fit=crop' }
  ],

  bannersMosaico: {
    notebookBg: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop",
    monitor: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&auto=format&fit=crop",
    switch: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&auto=format&fit=crop",
  },

  produtosRecomendados: ALL_PRODUCTS.slice(0, 3).map(p => ({
    name: p.title,
    price: p.price,
    estoque: 10,
    img: p.img
  })),

  produtosHype: ALL_PRODUCTS.slice(3, 8).map(p => ({
    name: p.title,
    price: p.price,
    estoque: true,
    img: p.img
  }))
};
