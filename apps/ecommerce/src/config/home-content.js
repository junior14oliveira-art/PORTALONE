/**
 * ARQUIVO DE CONFIGURAÇÃO DE IMAGENS E CONTEÚDOS DA HOME
 * 
 * Como editar as fotos:
 * 1. Salve suas imagens reais na pasta: d:\PORTALONE\apps\ecommerce\public\images\
 * 2. Altere os links abaixo de "https://images.unsplash..." para o caminho do seu arquivo local.
 *    Exemplo: Se você salvou "meu-banner.jpg" na pasta public/images, 
 *    mude o link abaixo para "/images/meu-banner.jpg"
 */

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

  produtosRecomendados: [
    { 
      name: 'Notebook Dell Latitude 5420 i7 11º Geração Ram 16gb Ssd 256gb NVMe Windows 11 Pro', 
      price: '2.707,50',
      img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=400&auto=format&fit=crop',
      estoque: 9
    },
    { 
      name: 'Notebook Dell Latitude 3420 i5 11º Geração 8gb Ssd 256gb M2 Windows 11 Pro', 
      price: '2.659,05',
      img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400&auto=format&fit=crop',
      estoque: 9
    },
    { 
      name: 'Servidor Dell Data Protection DP4400 2x Intel Xeon Gold 6138 20-Core 256GB DDR4...', 
      price: '68.495,00',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&auto=format&fit=crop',
      estoque: null
    }
  ],

  produtosHype: [
    { name: 'Monitor Itautec 19 Polegadas W196PW Base Ajustável Giratória', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&auto=format&fit=crop', price: '209,00' },
    { name: 'Monitor AOC M2470SW 24 Polegadas VGA HDMI', img: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?q=80&w=400&auto=format&fit=crop', price: '617,50' },
    { name: 'Thinclient Oki Atom D2550 Dual Core 8GB SSD 256GB Linux Ubuntu', img: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=400&auto=format&fit=crop', price: '356,25' },
    { name: 'Monitor Dell 21,5 Polegadas Se2216h Full HD Preto', img: 'https://images.unsplash.com/photo-1551645120-d70bfe84c826?q=80&w=400&auto=format&fit=crop', price: '569,05' },
    { name: 'Computador Lenovo ThinkCentre M900 Desktop Compacto Intel Core i5...', img: 'https://images.unsplash.com/photo-1626218174358-7769486c4b79?q=80&w=400&auto=format&fit=crop', price: '1.519,05', estoque: 9 }
  ]
};
