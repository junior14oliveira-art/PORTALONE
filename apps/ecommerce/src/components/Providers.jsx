"use client";

import React from 'react';
import { AuthProvider } from './AuthProvider';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from './Toast';
import { EditorProvider } from '@/context/EditorContext';

export function Providers({ children }) {
  return (
    <EditorProvider>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </EditorProvider>
  );
}
