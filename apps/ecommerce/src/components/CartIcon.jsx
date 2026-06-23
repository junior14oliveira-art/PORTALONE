"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export function CartIcon() {
  const { totalItems, isMounted } = useCart();

  return (
    <Link href="/carrinho" className="flex items-center gap-3 cursor-pointer hover:text-brand transition-colors group">
      <div className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="21" r="1"/>
          <circle cx="19" cy="21" r="1"/>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
        {isMounted && totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
            {totalItems}
          </span>
        )}
        {isMounted && totalItems === 0 && (
           <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
             0
           </span>
        )}
      </div>
      <div className="hidden lg:block text-sm font-bold">
        Carrinho
      </div>
    </Link>
  );
}
