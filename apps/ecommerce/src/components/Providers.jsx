"use client";

import React from 'react';
import { AuthProvider } from './AuthProvider';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from './Toast';
import { EditorProvider } from '@/context/EditorContext';
import { ProductsProvider } from '@/context/ProductsContext';

export function Providers({ children }) {
  return (
    <EditorProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </EditorProvider>
  );
}
