"use client";

import React from 'react';
import { AuthProvider } from './AuthProvider';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from './Toast';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}
