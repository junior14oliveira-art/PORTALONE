'use client';

import { useParams, useRouter } from 'next/navigation';
import { ALL_PRODUCTS } from '@/lib/mock-data';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Heart, Share2, Star, Shield, ArrowDownUp, ShieldCheck, MapPin, Search, PlusCircle, CheckCircle, Store, RotateCcw, ImageIcon, Truck } from 'lucide-react';
import { useState } from 'react';
import { EditableText } from '@/components/editor/EditableText';
import { EditableImage } from '@/components/editor/EditableImage';

// Variantes de demonstração para a UI do Mercado Livre
const MOCK_VARIANTS = {
  resolucao: ['1366 px x 768 px', '1920 px x 1080 px'],
  ram: ['8 GB', '16 GB', '32 GB'],
  capacidade: ['256 GB HDD', '256 GB SSD', '512 GB SSD'],
  sistema: ['Windows-Home-10', 'Windows-Pro-10', 'Windows Pro 11'],
  processador: ['Intel Core i5', 'Intel Core i5 1135G7', 'Intel Core i5 1145G7', 'Intel Core i7'],
  cor: ['Prateado', 'Cinza', 'Preto']
};

export default function ProdutoPage() {
  const { id } = useParams();
  const router = useRouter();
  
  // States para Variantes
  const [adding, setAdding] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selections, setSelections] = useState({
    resolucao: '1920 px x 1080 px',
    ram: '8 GB',
    capacidade: '256 GB SSD',
    sistema: 'Windows-Pro-10',
    processador: 'Intel Core i5 1145G7',
    cor: 'Cinza'
  });
  
  // State para Avaliações
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewPhotos, setReviewPhotos] = useState([]);
  const [reviews, setReviews] = useState([
    { id: 1, author: 'Carlos S.', rating: 5, date: '22 jun. 2026', text: 'Produto excelente, atendeu todas as minhas expectativas. O notebook é muito rápido e a bateria dura o dia todo. Recomendo o vendedor.', photos: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=150&h=150&fit=crop'] },
    { id: 2, author: 'Juliana P.', rating: 4, date: '15 jun. 2026', text: 'Chegou bem embalado e funcionando perfeitamente. Só a transportadora que atrasou 1 dia, mas o produto em si é ótimo.', photos: [] }
  ]);

  const decodedId = decodeURIComponent(id || '');
  const product = ALL_PRODUCTS.find(p => p.id === decodedId || p.id === parseInt(decodedId) || p.title.toLowerCase().replace(/ /g, '-') === decodedId) || ALL_PRODUCTS[0];

  if (!product) return null;

  // Imagens simuladas para a galeria
  const galleryImages = [
    product.img,
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80'
  ];

  const handleAddCart = () => {
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      alert('Produto adicionado ao carrinho com sucesso!');
    }, 600);
  };

  const handleVariantChange = (key, value) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const handleAddReview = () => {
    if (reviewRating === 0 || !reviewText) return alert('Por favor, dê uma nota e escreva um comentário.');
    const newReview = {
      id: Date.now(),
      author: 'Você',
      rating: reviewRating,
      date: 'Hoje',
      text: reviewText,
      photos: reviewPhotos.map(p => URL.createObjectURL(p))
    };
    setReviews([newReview, ...reviews]);
    setReviewText('');
    setReviewRating(0);
    setReviewPhotos([]);
    alert('Sua avaliação foi enviada com sucesso!');
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setReviewPhotos([...reviewPhotos, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="min-h-screen bg-[#ebebeb]">
      
      {/* Busca / Topo Simulado (No ML a busca já tá no navbar, aqui ajustamos breadcrumb) */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex text-sm text-[#333]">
          <span className="font-semibold mr-2">Você também pode gostar:</span>
          <a href="#" className="text-[#3483fa] hover:text-[#2968c8] mr-3">notebook dell i5</a>
          <a href="#" className="text-[#3483fa] hover:text-[#2968c8] mr-3">macbook air m1</a>
          <a href="#" className="text-[#3483fa] hover:text-[#2968c8]">lenovo thinkpad</a>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-4 text-[13px] text-[#3483fa] flex items-center gap-1">
        <a href="/catalogo" className="hover:text-[#2968c8]">Voltar à lista</a>
        <span className="text-[#666] mx-2">|</span>
        <a href={`/catalogo?categoria=${product.category}`} className="hover:text-[#2968c8] capitalize">{product.category}</a>
        <ChevronRight className="w-4 h-4 text-[#bfbfbf]" />
        <span className="text-[#666] truncate max-w-[200px]"><EditableText id={product.id} field="title" defaults={product} /></span>
      </div>

      {/* Main Content Card */}
      <div className="max-w-[1200px] mx-auto bg-white rounded shadow-sm flex flex-col md:flex-row pb-12 mb-20">
        
        {/* Left Side: Images & Product description */}
        <div className="flex-1 p-4 md:p-8 border-r border-gray-200 overflow-hidden">
          
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-2 w-12 flex-shrink-0">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setActiveImage(idx)}
                  className={`w-12 h-12 border rounded cursor-pointer overflow-hidden flex items-center justify-center p-1 ${activeImage === idx ? 'border-[#3483fa] border-2' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt={`Thumbnail ${idx}`} />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative flex items-center justify-center bg-white h-[300px] md:h-[500px]">
              <EditableImage 
                id={product.id} 
                field={`img_${activeImage}`} 
                defaults={{[`img_${activeImage}`]: galleryImages[activeImage]}} 
                className="max-w-full max-h-full" 
                imgClassName="object-contain mix-blend-multiply" 
                alt={product.title} 
              />
            </div>
          </div>

          <hr className="my-10 border-gray-200" />

          {/* Características Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-normal text-[#333] mb-6">Características do produto</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {/* Highlight cards */}
              <div className="border border-gray-200 rounded-lg p-4 flex gap-3 bg-[#f5f5f5]">
                <svg className="w-6 h-6 text-[#666] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <div>
                  <div className="text-[#333] mb-1 flex items-center gap-1">Tamanho da tela: <span className="font-semibold"><EditableText id={product.id} field="screen_size" defaults={{screen_size: "Não informado"}} /></span></div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 flex gap-3 bg-[#f5f5f5]">
                <svg className="w-6 h-6 text-[#666] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                <div>
                  <div className="text-[#333] mb-1 flex items-center gap-1">Capacidade: <span className="font-semibold"><EditableText id={product.id} field="storage_capacity" defaults={{storage_capacity: "Não informado"}} /></span></div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 flex gap-3 bg-[#f5f5f5]">
                <svg className="w-6 h-6 text-[#666] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                <div>
                  <div className="text-[#333] mb-1 flex items-center gap-1">Memória RAM: <span className="font-semibold"><EditableText id={product.id} field="ram_memory" defaults={{ram_memory: "Não informado"}} /></span></div>
                </div>
              </div>
            </div>

            {/* Tabela de especificacoes */}
            <div className="mt-8">
              <h3 className="text-lg font-normal mb-4">Características principais</h3>
              <div className="bg-[#f5f5f5] rounded-lg border border-gray-200 overflow-hidden text-sm">
                <div className="flex border-b border-gray-200">
                  <div className="w-1/3 bg-[#ebebeb] p-3 font-semibold text-[#333]">Marca</div>
                  <div className="w-2/3 p-3 bg-white text-[#333]"><EditableText id={product.id} field="brand" defaults={product} /></div>
                </div>
                <div className="flex border-b border-gray-200">
                  <div className="w-1/3 bg-[#ebebeb] p-3 font-semibold text-[#333]">Processador</div>
                  <div className="w-2/3 p-3 bg-white text-[#333]"><EditableText id={product.id} field="processor" defaults={{processor: product.specs?.[0] || 'Não informado'}} /></div>
                </div>
                <div className="flex border-b border-gray-200">
                  <div className="w-1/3 bg-[#ebebeb] p-3 font-semibold text-[#333]">SO</div>
                  <div className="w-2/3 p-3 bg-white text-[#333]"><EditableText id={product.id} field="os" defaults={{os: "Windows 10 Pro"}} /></div>
                </div>
                <div className="flex border-b border-gray-200">
                  <div className="w-1/3 bg-[#ebebeb] p-3 font-semibold text-[#333]">Resolução</div>
                  <div className="w-2/3 p-3 bg-white text-[#333]"><EditableText id={product.id} field="resolution" defaults={{resolution: "Não informada"}} /></div>
                </div>
                <div className="flex border-b border-gray-200">
                  <div className="w-1/3 bg-[#ebebeb] p-3 font-semibold text-[#333]">Garantia</div>
                  <div className="w-2/3 p-3 bg-white text-[#333]"><EditableText id={product.id} field="warranty" defaults={{warranty: "6 meses direto com a loja"}} /></div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-10 border-gray-200" />

          {/* Seção de Opiniões / Reviews */}
          <div className="mb-10">
            <h2 className="text-2xl font-normal text-[#333] mb-6">Opiniões do Produto</h2>
            
            {/* Avaliação Geral */}
            <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-12 mb-10">
              <div className="flex flex-col items-center">
                <div className="text-6xl font-semibold text-[#333] mb-2">4.5</div>
                <div className="flex text-[#3483fa] mb-1">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 text-gray-300 fill-current" />
                </div>
                <p className="text-[#666] text-sm">2 avaliações</p>
              </div>

              {/* Barras de rating */}
              <div className="flex-1 w-full flex flex-col gap-1.5 text-sm text-[#666]">
                {[5,4,3,2,1].map((star, i) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-[60px] text-right">{star} estrela{star>1?'s':''}</span>
                    <div className="flex-1 h-1 bg-[#ebebeb] rounded-full overflow-hidden">
                      <div className={`h-full bg-[#3483fa] ${star===5?'w-1/2':star===4?'w-1/2':'w-0'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Criar Avaliação */}
            <div className="bg-[#f5f5f5] rounded-xl p-6 mb-10 border border-gray-200">
              <h3 className="text-lg font-semibold text-[#333] mb-4">Deixe sua avaliação</h3>
              
              <div className="flex text-[#3483fa] mb-4 cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-8 h-8 ${reviewRating >= star ? 'fill-current' : 'text-gray-300 fill-current hover:text-blue-300'}`}
                    onClick={() => setReviewRating(star)}
                  />
                ))}
              </div>

              <textarea 
                placeholder="O que achou deste produto?"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3483fa] focus:ring-1 focus:ring-[#3483fa] resize-none h-24 mb-3 text-sm"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer flex items-center gap-2 text-sm text-[#3483fa] font-semibold hover:text-[#2968c8]">
                    <ImageIcon className="w-5 h-5" />
                    <span>Adicionar fotos</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                  {reviewPhotos.length > 0 && (
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{reviewPhotos.length} selecionada(s)</span>
                  )}
                </div>
                <button 
                  onClick={handleAddReview}
                  className="bg-[#3483fa] hover:bg-[#2968c8] text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors w-full sm:w-auto"
                >
                  Enviar
                </button>
              </div>

              {/* Fotos Preview */}
              {reviewPhotos.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {reviewPhotos.map((p, idx) => (
                    <div key={idx} className="w-16 h-16 rounded border overflow-hidden relative">
                      <img src={URL.createObjectURL(p)} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Lista de Avaliações */}
            <div className="space-y-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-[#3483fa]">
                      {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${rev.rating >= s ? 'fill-current' : 'text-gray-300 fill-current'}`} />)}
                    </div>
                    <span className="text-xs text-gray-400">{rev.date}</span>
                  </div>
                  <p className="text-[#333] text-sm mb-3">{rev.text}</p>
                  
                  {rev.photos && rev.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {rev.photos.map((img, i) => (
                        <div key={i} className="w-20 h-20 rounded border overflow-hidden cursor-pointer">
                          <img src={img} className="w-full h-full object-cover" alt="Review Photo" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="font-semibold">{rev.author}</span>
                    <button className="flex items-center gap-1 hover:text-[#3483fa] ml-4">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                      Útil
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Side: Price, Options & Buy Box */}
        <div className="w-full md:w-[380px] p-4 md:p-6 md:pl-8 flex flex-col pt-8 flex-shrink-0">
          
          <div className="text-[13px] text-[#999] mb-1">
            Novo  |  +1000 vendidos
          </div>
          
          <h1 className="text-[22px] font-semibold text-[#333] leading-tight mb-2">
            <EditableText id={product.id} field="title" defaults={product} />
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex text-[#3483fa]">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 text-gray-300 fill-current" />
            </div>
            <span className="text-xs text-[#3483fa] ml-2 font-medium">(136)</span>
          </div>

          <div className="mb-6">
            {product.oldPrice && <p className="text-[#999] text-sm line-through">R$ {product.oldPrice}</p>}
            <p className="text-4xl text-[#333] font-light tracking-tight">R$ {product.price}</p>
            <p className="text-[#00a650] text-[15px] mt-1">{product.installments || '10x de R$ 219,90 sem juros'}</p>
            <a href="#" className="text-sm text-[#3483fa] mt-1 inline-block hover:text-[#2968c8]">Ver os meios de pagamento</a>
          </div>

          {/* Variantes (Specs selector) - Removed as characteristics are now handled by Editable fields */}

          <div className="border border-gray-200 rounded-lg p-5">
            {/* Entrega Info */}
            <div className="flex gap-3 items-start mb-6">
              <Truck className="w-6 h-6 text-[#00a650] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#00a650] text-sm font-semibold">Chegará grátis amanhã</p>
                <p className="text-[#999] text-[13px] mt-0.5">Comprando dentro das próximas 2 h</p>
                <a href="#" className="text-[#3483fa] text-[13px] hover:text-[#2968c8] mt-1 inline-block">Mais formas de entrega</a>
              </div>
            </div>

            {/* Estoque */}
            <p className="text-[#333] font-semibold text-[15px] mb-4">Estoque disponível</p>
            <div className="flex items-center gap-2 mb-6 text-[15px]">
              <span>Quantidade:</span>
              <span className="font-semibold bg-gray-100 px-2 py-1 rounded cursor-pointer flex items-center gap-1 hover:bg-gray-200">1 unidade <ChevronRight className="w-4 h-4 rotate-90" /></span>
              <span className="text-[#999] text-[13px]">(+25 disponíveis)</span>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col gap-2 mb-6">
              <Button 
                size="lg" 
                className="bg-[#3483fa] hover:bg-[#2968c8] text-white text-[16px] h-12 rounded-lg font-semibold transition-colors w-full"
              >
                Comprar agora
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleAddCart}
                disabled={adding}
                className="bg-[#e3edfb] hover:bg-[#d0e3fc] text-[#3483fa] border-none text-[16px] h-12 rounded-lg font-semibold transition-colors w-full"
              >
                {adding ? 'Adicionando...' : 'Adicionar ao carrinho'}
              </Button>
            </div>

            {/* Beneficios Info */}
            <div className="space-y-4 text-[13px] text-[#999]">
              <div className="flex gap-2">
                <RotateCcw className="w-4 h-4 text-[#666] flex-shrink-0 mt-0.5" />
                <p><a href="#" className="text-[#3483fa] hover:text-[#2968c8]">Devolução grátis.</a> Você tem 30 dias a partir da data de recebimento.</p>
              </div>
              <div className="flex gap-2">
                <ShieldCheck className="w-4 h-4 text-[#666] flex-shrink-0 mt-0.5" />
                <p><a href="#" className="text-[#3483fa] hover:text-[#2968c8]">Compra Garantida</a>, receba o produto que está esperando ou devolvemos o dinheiro.</p>
              </div>
              <div className="flex gap-2">
                <Store className="w-4 h-4 text-[#666] flex-shrink-0 mt-0.5" />
                <p>Vendido por <a href="#" className="text-[#3483fa] font-medium hover:text-[#2968c8]">PORTALONE INFORMÁTICA</a></p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
